const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const Project = require('../models/Project');
const ProjectSnapshot = require('../models/ProjectSnapshot');
const { mapRecord } = require('./columnMapper');
const { calculateStatus } = require('../services/projectStatusService');
const { calculateRisk } = require('../services/riskEngine');

const parseDate = (val) => {
  if (!val) return null;
  // If Excel serial date
  if (!isNaN(val) && typeof val === 'number') {
    return new Date((val - (25567 + 2)) * 86400 * 1000);
  }
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

const parseNumber = (val) => {
  if (val === undefined || val === null || val === '') return 0;
  if (typeof val === 'number') return val;
  const num = parseFloat(val.toString().replace(/,/g, ''));
  return isNaN(num) ? 0 : Math.max(0, num);
};

exports.importData = async (filePath) => {
  console.log(`Starting import from: ${filePath}`);
  const ext = path.extname(filePath).toLowerCase();
  
  let records = [];
  
  if (ext === '.csv') {
      records = await new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', reject);
      });
  } else if (ext === '.xlsx' || ext === '.xls') {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      records = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  } else {
      throw new Error(`Unsupported file type: ${ext}`);
  }

  const stats = {
    read: records.length,
    valid: 0,
    invalid: 0,
    duplicates: 0,
    inserted: 0,
    updated: 0
  };

  for (const record of records) {
    try {
      const mapped = mapRecord(record);
      
      if (!mapped.projectCode) {
        stats.invalid++;
        continue;
      }
      
      mapped.originalCost = parseNumber(mapped.originalCost);
      mapped.revisedCost = parseNumber(mapped.revisedCost);
      mapped.expenditure = parseNumber(mapped.expenditure);
      mapped.physicalProgress = Math.min(100, Math.max(0, parseNumber(mapped.physicalProgress)));
      
      mapped.originalStartDate = parseDate(mapped.originalStartDate);
      mapped.originalEndDate = parseDate(mapped.originalEndDate);
      mapped.revisedEndDate = parseDate(mapped.revisedEndDate);
      mapped.reportingMonth = parseDate(mapped.reportingMonth);
      
      mapped.costOverrunAmount = Math.max(0, mapped.revisedCost - mapped.originalCost);
      mapped.costOverrunPercentage = mapped.originalCost > 0 ? (mapped.costOverrunAmount / mapped.originalCost) * 100 : 0;
      
      mapped.status = calculateStatus(mapped);
      
      const risk = calculateRisk(mapped);
      mapped.riskScore = risk.riskScore;
      mapped.riskLevel = risk.riskLevel;
      mapped.riskReasons = risk.riskReasons;
      
      stats.valid++;
      
      // Upsert Project Snapshot if reporting month exists
      if (mapped.reportingMonth) {
        await ProjectSnapshot.findOneAndUpdate(
          { projectCode: mapped.projectCode, reportingMonth: mapped.reportingMonth },
          { $set: {
              originalCost: mapped.originalCost,
              revisedCost: mapped.revisedCost,
              expenditure: mapped.expenditure,
              physicalProgress: mapped.physicalProgress,
              originalEndDate: mapped.originalEndDate,
              revisedEndDate: mapped.revisedEndDate
            } 
          },
          { upsert: true }
        );
      }
      
      // Upsert Main Project
      // We will only update if it's the latest data (simplified for this exercise)
      const existing = await Project.findOne({ projectCode: mapped.projectCode });
      
      if (existing) {
        // If we have time dimension, we might only want to update if the incoming record is newer
        // For simplicity, we just update all derived fields to match this record.
        await Project.updateOne({ _id: existing._id }, { $set: mapped });
        stats.updated++;
      } else {
        await Project.create(mapped);
        stats.inserted++;
      }
      
    } catch (err) {
      console.error(`Error processing record:`, err.message);
      stats.invalid++;
    }
  }
  
  console.log(`\n## PAIMANA IMPORT`);
  console.log(`Rows read: ${stats.read}`);
  console.log(`Valid: ${stats.valid}`);
  console.log(`Invalid: ${stats.invalid}`);
  console.log(`Duplicates: ${stats.duplicates}`);
  console.log(`Inserted: ${stats.inserted}`);
  console.log(`Updated: ${stats.updated}\n`);
  
  return stats;
};
