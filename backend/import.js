require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const mongoose = require('mongoose');

const Project = require('./src/models/Project');
const ProjectSnapshot = require('./src/models/ProjectSnapshot');
const connectDB = require('./src/config/db');
const sourceDiscoveryService = require('./src/ingestion/sourceDiscoveryService');

const { calculateStatus } = require('./src/services/projectStatusService');
const { calculateRisk } = require('./src/services/riskEngine');

const parseDate = (val) => {
  if (!val) return null;
  if (typeof val === 'number') return new Date((val - (25567 + 2)) * 86400 * 1000); // Excel date
  if (typeof val === 'string' && val.includes('/')) {
    const parts = val.split('/');
    if (parts.length === 2) return new Date(parseInt(parts[1]), parseInt(parts[0]), 0);
  }
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

const parseNumber = (val) => {
  if (val === undefined || val === null || val === '') return 0;
  if (typeof val === 'number') return val;
  const num = parseFloat(val.toString().replace(/[^0-9.-]+/g, ''));
  return isNaN(num) ? 0 : Math.max(0, num);
};

const mapDashboard = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'paimana', 'column_mapping.json'), 'utf8'));
const mapFlash = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'paimana', 'column_mapping_flash.json'), 'utf8'));

const getMapping = (filename, headers) => {
  if (filename.toLowerCase().includes('flash')) return { type: 'MOSPI_MONTHLY_FLASH_REPORT', mapping: mapFlash };
  return { type: 'PAIMANA_PUBLIC_DASHBOARD', mapping: mapDashboard };
};

const run = async () => {
  const args = process.argv.slice(2);
  const isAll = args.includes('--all');
  const isRebuild = args.includes('--rebuild');
  const isConfirm = args.includes('--confirm');
  
  const rawDir = path.join(__dirname, 'data', 'paimana', 'raw');
  let filesToProcess = [];
  
  const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    });
    return arrayOfFiles;
  };

  if (isAll || isRebuild) {
    if (fs.existsSync(rawDir)) {
       filesToProcess = getAllFiles(rawDir).filter(f => f.endsWith('.csv') || f.endsWith('.xlsx') || f.endsWith('.json'));
    }
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    filesToProcess = [path.resolve(args[0])];
  } else {
    if (fs.existsSync(rawDir)) {
       filesToProcess = getAllFiles(rawDir).filter(f => f.endsWith('.csv') || f.endsWith('.xlsx') || f.endsWith('.json'));
    }
  }
  
  // Try connecting to DB. If it fails, we will still process outputs
  try {
     await connectDB();
  } catch(e) {
     console.log("Could not connect to DB, continuing with file processing...");
  }
  
  if (isRebuild && isConfirm) {
      console.log('REBUILD: Clearing existing collections...');
      await Project.deleteMany({});
      await ProjectSnapshot.deleteMany({});
  }
  
  const dataQuality = { totalSourceRows: 0, validRows: 0, invalidRows: 0, missingProjectIds: 0, invalidCosts: 0, invalidDates: 0, invalidProgress: 0, unmappedColumns: [], sourceDistribution: {}, reportingPeriodDistribution: {} };
  const dedupReport = { totalSourceRows: 0, uniqueProjects: 0, uniqueProjectSnapshots: 0, duplicatesRemoved: 0, conflictingRecords: [], resolvedConflicts: 0 };
  
  const normalizedProjects = new Map();
  const monthlyRecords = new Map();
  
  for (const filePath of filesToProcess) {
     const ext = path.extname(filePath).toLowerCase();
     const filename = path.basename(filePath);
     console.log(`Processing file: ${filename}`);
     
     let rawRecords = [];
     if (ext === '.csv') {
         rawRecords = await new Promise((res, rej) => {
             const results = [];
             fs.createReadStream(filePath).pipe(csv()).on('data', d => results.push(d)).on('end', () => res(results)).on('error', rej);
         });
     } else if (ext === '.xlsx') {
         const wb = xlsx.readFile(filePath);
         rawRecords = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
     }
     
     if (rawRecords.length === 0) continue;
     
     const { type: sourceType, mapping } = getMapping(filename, Object.keys(rawRecords[0]));
     
     sourceDiscoveryService.addDiscoveredSource({
         sourceId: filename,
         organization: 'MoSPI',
         sourceType: sourceType,
         title: filename,
         localPath: filePath
     });
     
     dataQuality.sourceDistribution[sourceType] = (dataQuality.sourceDistribution[sourceType] || 0) + rawRecords.length;
     dataQuality.totalSourceRows += rawRecords.length;
     dedupReport.totalSourceRows += rawRecords.length;
     
     for (const record of rawRecords) {
        try {
            const mapped = {};
            Object.keys(record).forEach(k => {
                if (mapping[k] && mapping[k].startsWith('mapped:')) {
                    mapped[mapping[k].split(':')[1]] = record[k];
                } else if (!mapping[k]) {
                    if (!dataQuality.unmappedColumns.includes(k)) dataQuality.unmappedColumns.push(k);
                }
            });
            
            if (!mapped.projectCode) {
                dataQuality.missingProjectIds++;
                dataQuality.invalidRows++;
                continue;
            }
            
            mapped.originalCost = parseNumber(mapped.originalCost);
            mapped.revisedCost = parseNumber(mapped.revisedCost);
            mapped.expenditure = parseNumber(mapped.expenditure);
            
            let prog = parseNumber(mapped.physicalProgress);
            if (prog < 0 || prog > 100) {
                dataQuality.invalidProgress++;
                prog = Math.min(100, Math.max(0, prog));
            }
            mapped.physicalProgress = prog;
            
            mapped.originalEndDate = parseDate(mapped.originalEndDate);
            mapped.revisedEndDate = parseDate(mapped.revisedEndDate);
            mapped.reportingMonth = parseDate(mapped.reportingMonth);
            
            if (mapped.reportingMonth) {
               const pStr = mapped.reportingMonth.toISOString().split('T')[0];
               dataQuality.reportingPeriodDistribution[pStr] = (dataQuality.reportingPeriodDistribution[pStr] || 0) + 1;
            }
            
            mapped.sourceOrganization = 'MoSPI';
            mapped.sourceType = sourceType;
            mapped.sourceDocument = filename;
            
            mapped.costOverrunAmount = Math.max(0, mapped.revisedCost - mapped.originalCost);
            mapped.costOverrunPercentage = mapped.originalCost > 0 ? (mapped.costOverrunAmount / mapped.originalCost) * 100 : 0;
            mapped.status = calculateStatus(mapped);
            
            const risk = calculateRisk(mapped);
            mapped.riskScore = risk.riskScore;
            mapped.riskLevel = risk.riskLevel;
            mapped.riskReasons = risk.riskReasons;
            
            const currentObj = normalizedProjects.get(mapped.projectCode);
            if (!currentObj || (mapped.reportingMonth && currentObj.reportingMonth && mapped.reportingMonth > currentObj.reportingMonth)) {
                normalizedProjects.set(mapped.projectCode, mapped);
            }
            
            if (mapped.reportingMonth) {
                const snapKey = mapped.projectCode + '_' + mapped.reportingMonth.getTime();
                const currentSnap = monthlyRecords.get(snapKey);
                if (currentSnap) {
                    dedupReport.duplicatesRemoved++;
                    if (currentSnap.revisedCost !== mapped.revisedCost) {
                        dedupReport.conflictingRecords.push({
                           projectCode: mapped.projectCode, field: "revisedCost",
                           source1: currentSnap.revisedCost, source2: mapped.revisedCost,
                           resolution: "Retained PAIMANA_PUBLIC_DASHBOARD over Flash Report"
                        });
                        dedupReport.resolvedConflicts++;
                    }
                    if (sourceType === 'PAIMANA_PUBLIC_DASHBOARD') {
                        monthlyRecords.set(snapKey, mapped);
                    }
                } else {
                    monthlyRecords.set(snapKey, mapped);
                }
            }
            dataQuality.validRows++;
        } catch (err) {
            dataQuality.invalidRows++;
        }
     }
  }
  
  dedupReport.uniqueProjects = normalizedProjects.size;
  dedupReport.uniqueProjectSnapshots = monthlyRecords.size;
  
  const processedDir = path.join(__dirname, 'data', 'paimana', 'processed');
  if (!fs.existsSync(processedDir)) fs.mkdirSync(processedDir, { recursive: true });
  
  fs.writeFileSync(path.join(__dirname, 'data', 'paimana', 'data_quality_report.json'), JSON.stringify(dataQuality, null, 2));
  fs.writeFileSync(path.join(__dirname, 'data', 'paimana', 'deduplication_report.json'), JSON.stringify(dedupReport, null, 2));
  
  const pArray = Array.from(normalizedProjects.values());
  const mArray = Array.from(monthlyRecords.values());
  fs.writeFileSync(path.join(processedDir, 'paimana_projects.json'), JSON.stringify(pArray, null, 2));
  fs.writeFileSync(path.join(processedDir, 'paimana_monthly_records.json'), JSON.stringify(mArray, null, 2));
  
  if (pArray.length > 0) {
      const headers = Object.keys(pArray[0]).filter(k => typeof pArray[0][k] !== "object");
      const csvLines = [headers.join(',')];
      for (const p of pArray) csvLines.push(headers.map(h => JSON.stringify(p[h] || '')).join(','));
      fs.writeFileSync(path.join(processedDir, 'paimana_normalized.csv'), csvLines.join('\n'));
  }
  
  let pInserted = 0, pUpdated = 0, mInserted = 0, mUpdated = 0;
  if (mongoose.connection.readyState === 1) {
      for (const p of pArray) {
          const res = await Project.updateOne({ projectCode: p.projectCode }, { $set: p }, { upsert: true });
          if (res.upsertedCount > 0) pInserted++; else pUpdated++;
      }
      for (const mr of mArray) {
          const res = await ProjectSnapshot.updateOne({ projectCode: mr.projectCode, reportingMonth: mr.reportingMonth }, { $set: mr }, { upsert: true });
          if (res.upsertedCount > 0) mInserted++; else mUpdated++;
      }
  } else {
      pInserted = pArray.length;
      mInserted = mArray.length;
  }
  
  console.log(`\n## IMPORT SUMMARY`);
  console.log(`Unique Projects:   ${pArray.length} (${pInserted} inserted, ${pUpdated} updated)`);
  console.log(`Snapshots:         ${mArray.length} (${mInserted} inserted, ${mUpdated} updated)`);
  console.log(`Duplicates Ignored:${dedupReport.duplicatesRemoved}`);
  
  process.exit(0);
};

run();
