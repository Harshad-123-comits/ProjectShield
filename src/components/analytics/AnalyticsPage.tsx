import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { TrendingUp, AlertTriangle, Building2, Map, IndianRupee, Clock, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';

export const AnalyticsPage: React.FC<any> = ({ filters, onSelectProject, onNavigate }) => {
  const [sectors, setSectors] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [ministries, setMinistries] = useState<any[]>([]);
  const [delays, setDelays] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const [secRes, stateRes, minRes, delRes] = await Promise.all([
          api.getSectorAnalytics(filters),
          api.getStateAnalytics(filters),
          api.getMinistryAnalytics(filters),
          api.getDelayAnalytics(filters)
        ]);
        setSectors(secRes.data || []);
        setStates(stateRes.data || []);
        setMinistries(minRes.data || []);
        setDelays(delRes.data || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [filters]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading analytics...</div>;
  }

  const formatCr = (val: number) => {
    if (val == null) return 'N/A';
    if (val === 0) return '₹0 Cr';
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}k Cr`;
    return `₹${val.toLocaleString()} Cr`;
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Portfolio Analytics</h2>
          <p className="text-sm text-slate-500">Data-driven insights across sectors, states, and ministries.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#111827] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-sky-600 dark:text-sky-400">
             <Building2 className="w-5 h-5" />
             <span className="font-bold text-sm">Top Sector</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">{sectors[0]?.sector || 'N/A'}</div>
          <div className="text-xs text-slate-500">{sectors[0]?.projectCount || 0} Projects</div>
        </div>
        <div className="bg-white dark:bg-[#111827] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-indigo-600 dark:text-indigo-400">
             <Map className="w-5 h-5" />
             <span className="font-bold text-sm">Top State</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">{states[0]?.state || 'N/A'}</div>
          <div className="text-xs text-slate-500">{formatCr(states[0]?.revisedCost)} Exposure</div>
        </div>
        <div className="bg-white dark:bg-[#111827] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-amber-600 dark:text-amber-400">
             <AlertTriangle className="w-5 h-5" />
             <span className="font-bold text-sm">Most High Risk</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">
            {[...sectors].sort((a,b) => b.highRiskCount - a.highRiskCount)[0]?.sector || 'N/A'}
          </div>
        </div>
        <div className="bg-white dark:bg-[#111827] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-red-600 dark:text-red-400">
             <Clock className="w-5 h-5" />
             <span className="font-bold text-sm">Avg Delay</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">{Math.round(delays.averageDelay || 0)} Days</div>
          <div className="text-xs text-slate-500">Across {delays.delayedProjectCount || 0} delayed projects</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
          <h3 className="text-sm font-bold mb-4">Sector Distribution (Project Count)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectors.slice(0, 10)} layout="vertical" margin={{ left: 50, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                <XAxis type="number" />
                <YAxis dataKey="sector" type="category" width={100} tick={{ fontSize: 10 }} />
                <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="projectCount" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
          <h3 className="text-sm font-bold mb-4">State Distribution (Cost Exposure)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={states.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="state" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="revisedCost" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
