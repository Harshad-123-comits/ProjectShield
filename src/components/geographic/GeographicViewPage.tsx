import React, { useState, useEffect } from 'react';
import { Map, List, Search, Layers, ChevronRight, AlertTriangle, IndianRupee } from 'lucide-react';
import { api } from '../../services/api';

export const GeographicViewPage: React.FC<any> = ({ filters, onSelectProject }) => {
  const [states, setStates] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      setLoading(true);
      try {
        const res = await api.getStateAnalytics(filters);
        setStates(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, [filters]);

  const filteredStates = states.filter(s => s.state.toLowerCase().includes(search.toLowerCase()));

  const formatCr = (val: number) => {
    if (!val) return '₹0 Cr';
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}k Cr`;
    return `₹${val.toLocaleString()} Cr`;
  };

  return (
    <div className="space-y-6 pb-8 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Geographic Distribution</h2>
          <p className="text-sm text-slate-500">State-wise infrastructure monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-4">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search states..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
               />
             </div>
          </div>
          <div className="overflow-y-auto flex-1 p-2">
            {loading ? (
              <div className="p-4 text-center text-slate-500">Loading states...</div>
            ) : filteredStates.length === 0 ? (
              <div className="p-4 text-center text-slate-500">No states found</div>
            ) : (
              filteredStates.map((s, idx) => (
                <div key={idx} className="p-3 mb-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 hover:border-sky-500/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{s.state}</h3>
                    <span className="text-xs font-mono-num font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">{s.projectCount} Proj</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                     <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        <IndianRupee className="w-3 h-3 text-emerald-500" />
                        <span>{formatCr(s.revisedCost)}</span>
                     </div>
                     <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <span>{s.highRiskCount} High Risk</span>
                     </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="lg:col-span-8 bg-slate-100 dark:bg-[#0C101A] border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
           <div className="text-center space-y-3 z-10 p-8 bg-white/10 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <Map className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Geospatial Map Visualization</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Geographical coordinates are not available for the current dataset.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
