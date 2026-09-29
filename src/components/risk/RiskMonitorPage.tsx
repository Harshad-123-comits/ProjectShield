import React, { useState, useEffect } from 'react';
import { Target, Filter, Download, Activity, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';
import { CostScheduleScatter } from '../dashboard/CostScheduleScatter';

export const RiskMonitorPage: React.FC<any> = ({ filters, onSelectProject }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Local sub-filters
  const [minRisk, setMinRisk] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Fetch max 500 for the scatter plot
        const res = await api.getProjects(filters, 1, 500);
        setProjects(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [filters]);

  const filteredProjects = projects.filter(p => p.riskScore >= minRisk);
  const criticalCount = filteredProjects.filter(p => p.riskLevel === 'CRITICAL').length;
  const highCount = filteredProjects.filter(p => p.riskLevel === 'HIGH').length;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Risk Monitor</h2>
          <p className="text-sm text-slate-500">Interactive threshold analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-6 h-fit">
           <h3 className="font-bold text-sm flex items-center gap-2"><Filter className="w-4 h-4"/> Local Filters</h3>
           
           <div className="space-y-3">
             <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
               Min Risk Score
               <span className="text-sky-600">{minRisk}</span>
             </label>
             <input type="range" min="0" max="100" value={minRisk} onChange={(e) => setMinRisk(parseInt(e.target.value))} className="w-full accent-sky-500" />
           </div>

           <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
             <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Matching Projects</span>
                <span className="font-bold font-mono-num">{filteredProjects.length}</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Critical</span>
                <span className="font-bold font-mono-num text-red-500">{criticalCount}</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">High Risk</span>
                <span className="font-bold font-mono-num text-amber-500">{highCount}</span>
             </div>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm h-96">
            <h3 className="font-bold text-sm mb-4">Cost Overrun vs Schedule Delay Scatter</h3>
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-500">Loading scatter data...</div>
            ) : (
              <CostScheduleScatter projects={filteredProjects} onSelectProject={onSelectProject} />
            )}
          </div>
          
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 dark:border-slate-800 font-bold text-sm">Filtered Results List</div>
             <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
               {filteredProjects.map((p, i) => (
                 <div key={i} className="flex justify-between items-center p-3 rounded bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" onClick={() => onSelectProject(p)}>
                    <div>
                      <div className="font-bold text-sm">{p.projectCode}</div>
                      <div className="text-xs text-slate-500 truncate w-64">{p.projectName}</div>
                    </div>
                    <div className="text-right">
                       <div className={`font-bold font-mono-num ${p.riskScore >= 80 ? 'text-red-500' : 'text-amber-500'}`}>Score: {p.riskScore}</div>
                       <div className="text-[10px] text-slate-500">{p.status}</div>
                    </div>
                 </div>
               ))}
               {filteredProjects.length === 0 && <div className="text-center text-slate-500 text-sm">No projects match filters</div>}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
