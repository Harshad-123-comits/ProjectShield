import React from 'react';

export interface Filters {
  state: string;
  sector: string;
  ministry: string;
  status: string;
  riskLevel: string;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export const GlobalFilterBar: React.FC<Props> = ({ filters, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex gap-4 text-sm flex-wrap items-center">
      <span className="font-bold text-slate-700 dark:text-slate-300">Global Filters:</span>
      <select name="state" value={filters.state} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500">
        <option value="">All States</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Delhi">Delhi</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
      </select>
      <select name="sector" value={filters.sector} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500">
        <option value="">All Sectors</option>
        <option value="Railways">Railways</option>
        <option value="Roads">Roads</option>
        <option value="Energy">Energy</option>
        <option value="Transport">Transport</option>
      </select>
      <select name="ministry" value={filters.ministry} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500">
        <option value="">All Ministries</option>
        <option value="Ministry of Railways">Ministry of Railways</option>
        <option value="Ministry of Road Transport">Ministry of Road Transport</option>
        <option value="Ministry of Power">Ministry of Power</option>
      </select>
      <select name="status" value={filters.status} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500">
        <option value="">All Statuses</option>
        <option value="ON_TRACK">On Track</option>
        <option value="DELAYED">Delayed</option>
        <option value="CRITICAL">Critical</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <select name="riskLevel" value={filters.riskLevel} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500">
        <option value="">All Risks</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="CRITICAL">Critical</option>
      </select>
      <button onClick={() => onChange({ state: '', sector: '', ministry: '', status: '', riskLevel: '' })} className="text-sky-600 dark:text-sky-400 hover:underline font-medium ml-auto">
        Clear All
      </button>
    </div>
  );
};
