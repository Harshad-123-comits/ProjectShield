import React, { useEffect,  useState } from 'react';
import { useApiQuery } from '../../hooks/useApiQuery';
import { DataSection } from '../common/DataSection';
import { Search, ChevronDown, ChevronUp, Download, Eye } from 'lucide-react';
import { api } from '../../services/api';

export const ProjectTable: React.FC<any> = ({ filters, onSelectProject, onOpenUpload }) => {
    const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  
  const queryFilters = { ...filters, q: search };
  const queryKey = 'projects-' + JSON.stringify(queryFilters) + '-' + page + '-' + limit;
  const { data: res, isLoading: loading, error, refetch } = useApiQuery(queryKey, () => api.getProjects(queryFilters, page, limit));
  
  const projects = res?.data || [];
  const totalPages = res?.pagination?.totalPages || 1;
  const totalRecords = res?.pagination?.totalRecords || 0;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>
        <div className="flex gap-2 text-sm">
          <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading records...</div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3 min-w-[250px]">Project Name</th>
                <th className="px-4 py-3">Sector</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3 text-right">Cost (Cr)</th>
                <th className="px-4 py-3 text-right">Progress</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Risk</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {projects.map((p) => (
                <tr key={p._id || p.projectCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono-num text-xs font-bold">{p.projectCode}</td>
                  <td className="px-4 py-3 whitespace-normal min-w-[250px] font-medium text-slate-800 dark:text-slate-200 line-clamp-2">{p.projectName}</td>
                  <td className="px-4 py-3">{p.sector}</td>
                  <td className="px-4 py-3">{p.state}</td>
                  <td className="px-4 py-3 text-right font-mono-num">{p.revisedCost ? `₹${p.revisedCost.toLocaleString()}` : 'N/A'}</td>
                  <td className="px-4 py-3 text-right font-mono-num">{p.physicalProgress}%</td>
                  <td className="px-4 py-3 text-center text-[10px] font-bold">
                    <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-[10px] font-bold">
                    <span className={`px-2 py-1 rounded-full ${p.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{p.riskLevel}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => onSelectProject(p)} className="p-1.5 rounded bg-sky-50 dark:bg-sky-900/30 text-sky-600 hover:bg-sky-100 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">No projects found. Try adjusting filters or search.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Pagination */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
        <div className="text-slate-500">
          Showing <span className="font-bold text-slate-800 dark:text-slate-200">{projects.length > 0 ? (page - 1) * limit + 1 : 0}</span> to <span className="font-bold text-slate-800 dark:text-slate-200">{Math.min(page * limit, totalRecords)}</span> of <span className="font-bold text-slate-800 dark:text-slate-200">{totalRecords}</span> entries
        </div>
        <div className="flex gap-1">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded disabled:opacity-50">Prev</button>
          <span className="px-3 py-1.5 font-mono-num">{page} / {totalPages || 1}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0} className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};
