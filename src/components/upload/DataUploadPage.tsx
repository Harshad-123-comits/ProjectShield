import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  Download,
  RefreshCw,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { Project } from '../../types';

interface DataUploadPageProps {
  onIngestProjects: (newProjects: Project[]) => void;
  onAddToast: (type: 'success' | 'warning' | 'info', title: string, message: string) => void;
}

export const DataUploadPage: React.FC<DataUploadPageProps> = ({
  onIngestProjects,
  onAddToast
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState<number>(0);
  const [uploadSummary, setUploadSummary] = useState<{
    fileName: string;
    totalRows: number;
    validRows: number;
    anomaliesDetected: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setUploading(true);
    setUploadStep(1);

    // Simulated ingestion pipeline with AI scoring
    setTimeout(() => {
      setUploadStep(2);
      setTimeout(() => {
        setUploadStep(3);
        setTimeout(() => {
          setUploadStep(4);
          setUploading(false);
          setUploadSummary({
            fileName: file.name,
            totalRows: 148,
            validRows: 148,
            anomaliesDetected: 14
          });
          onAddToast(
            'success',
            'Data Ingestion Complete',
            `Successfully processed ${file.name}. 148 infrastructure assets evaluated & risk scores updated.`
          );
        }, 800);
      }, 900);
    }, 900);
  };

  const downloadSampleTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Project_ID,Project_Name,State,Sector,Agency,Sanctioned_Cost_Cr,Revised_Cost_Cr,Planned_Progress_Pct,Physical_Progress_Pct,Financial_Progress_Pct,Original_Start_Date,Original_End_Date,Contractor_Name',
        'P-2101,Delhi-Dehradun Greenfield Expressway,Uttarakhand,Transport,NHAI,850,920,65,48,42,2023-01-15,2026-08-30,L&T Infrastructure',
        'P-2102,Kakrapar Nuclear Reactor Unit 4,Gujarat,Power,NPCIL,1200,1340,78,62,58,2022-06-01,2026-11-15,BHEL-L&T JV',
        'P-2103,Bhopal Metro Priority Corridor 2,Madhya Pradesh,Urban Dev,MPMRCL,420,490,55,34,30,2023-03-10,2026-12-31,Gulermak Infrastructure'
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ProjectShield_MoSPI_Ingestion_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Data Ingestion & Automated AI Model Scoring
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Import MoSPI project datasets (CSV / Excel / GeoJSON). The predictive model validates schemas and re-evaluates risk indices.
          </p>
        </div>

        <button
          onClick={downloadSampleTemplate}
          className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Download MoSPI CSV Template</span>
        </button>
      </div>

      {/* Main Upload Dropzone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upload New Monthly Reporting Cycle</h3>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
              dragActive
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.json"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 mb-4">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Drag and drop your project monitoring dataset here
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
              Supports CSV, Excel (.xlsx), and JSON exports from OCMS (Online Computerized Monitoring System)
            </p>
            <span className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm">
              Browse Local Files
            </span>
          </div>

          {/* Upload Progress Stepper */}
          {uploading && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600 dark:text-blue-400" />
                  Processing Ingestion Pipeline
                </span>
                <span className="font-mono-num font-bold text-blue-600 dark:text-blue-400">Step {uploadStep}/4</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className={`flex items-center gap-2 ${uploadStep >= 1 ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-slate-400 dark:text-slate-600'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>1. Parsing tabular structure & column schema verification</span>
                </div>
                <div className={`flex items-center gap-2 ${uploadStep >= 2 ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-slate-400 dark:text-slate-600'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>2. Verifying physical/financial milestone consistency & anomaly checks</span>
                </div>
                <div className={`flex items-center gap-2 ${uploadStep >= 3 ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-slate-400 dark:text-slate-600'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3. Running XGBoost & SHAP feature attribution inference engine</span>
                </div>
                <div className={`flex items-center gap-2 ${uploadStep >= 4 ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-slate-400 dark:text-slate-600'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>4. Synchronizing national dashboard & generating early warning triggers</span>
                </div>
              </div>
            </div>
          )}

          {/* Upload Summary Result */}
          {uploadSummary && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Ingestion & AI Re-scoring Successful</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-100 dark:border-emerald-900/40 font-mono-num text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">File Name:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{uploadSummary.fileName}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Total Records:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{uploadSummary.totalRows}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Valid Records:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">{uploadSummary.validRows}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">New Triggers:</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">{uploadSummary.anomaliesDetected} alerts</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Schema & Data Requirements */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">MoSPI Schema Requirements</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white">Mandatory Columns</h5>
              <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                <li><code className="text-blue-700 dark:text-blue-400 font-mono">Project_ID</code> (e.g. P-1042)</li>
                <li><code className="text-blue-700 dark:text-blue-400 font-mono">Sanctioned_Cost_Cr</code> (Numerical)</li>
                <li><code className="text-blue-700 dark:text-blue-400 font-mono">Planned_Progress_Pct</code> (0 - 100)</li>
                <li><code className="text-blue-700 dark:text-blue-400 font-mono">Physical_Progress_Pct</code> (0 - 100)</li>
                <li><code className="text-blue-700 dark:text-blue-400 font-mono">Financial_Progress_Pct</code> (0 - 100)</li>
                <li><code className="text-blue-700 dark:text-blue-400 font-mono">Original_End_Date</code> (YYYY-MM-DD)</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white">Quality Assurance</h5>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Automated validation flags negative variances greater than 10%, missing milestone completions, and unverified contractor disbursement claims.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
