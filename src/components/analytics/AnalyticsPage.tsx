import React from 'react';
import { useApiQuery } from '../../hooks/useApiQuery';
import { DataSection } from '../common/DataSection';
import { IndianRupee, Clock, Building2, Landmark, TrendingUp } from 'lucide-react';
import { api } from '../../services/api';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useNavigate, useSearchParams } from 'react-router-dom';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

const formatCr = (val: number) => `₹${(val || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })} Cr`;
const formatPercent = (val: number) => `${(val || 0).toFixed(1)}%`;

export const AnalyticsPage: React.FC<any> = ({ filters, activeTab }) => {
  const queryKey = 'analytics-' + JSON.stringify(filters);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: costRes, isLoading: costLoading, error: costError } = useApiQuery(queryKey + 'cost', () => api.getCostAnalytics(filters));
  const { data: progRes, isLoading: progLoading, error: progError } = useApiQuery(queryKey + 'prog', () => api.getProgressAnalytics(filters));
  const { data: secRes, isLoading: secLoading, error: secError } = useApiQuery(queryKey + 'sec', () => api.getSectorAnalytics(filters));
  const { data: minRes, isLoading: minLoading, error: minError } = useApiQuery(queryKey + 'min', () => api.getMinistryAnalytics(filters));
  const { data: trendsRes, isLoading: trendsLoading, error: trendsError } = useApiQuery(queryKey + 'trends', () => api.getTrendsAnalytics(filters));

  const handleDrilldown = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    navigate(`/projects?${newParams.toString()}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cost': {
        const rawCost = costRes?.data || { originalCost: 0, revisedCost: 0, expenditure: 0, costOverrunAmount: 0 };
        const data = [
          { category: 'Original Cost', value: rawCost.originalCost || 0 },
          { category: 'Revised Cost', value: rawCost.revisedCost || 0 },
          { category: 'Expenditure', value: rawCost.expenditure || 0 },
          { category: 'Cost Overrun', value: rawCost.costOverrunAmount || 0 }
        ];
        return (
          <DataSection isLoading={costLoading} error={costError} onRetry={() => {}} minHeight="min-h-[400px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Original vs Revised Project Cost</h3>
                <p className="text-sm text-slate-500 mb-6">Compares planned original cost with revised cost and expenditure to highlight changes in financial exposure.</p>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.5} />
                      <XAxis type="number" tickFormatter={(val) => `₹${val/1000}k`} stroke="#94a3b8" />
                      <YAxis dataKey="category" type="category" width={110} tick={{fontSize: 12}} stroke="#94a3b8" />
                      <RechartsTooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} formatter={(val: number) => [formatCr(val), 'Amount']} />
                      <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]}>
                        {data.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <strong>What this shows:</strong> Overall portfolio expenditure is {formatCr(rawCost.expenditure)}, which is {formatPercent((rawCost.expenditure / (rawCost.revisedCost || 1)) * 100)} of the total revised cost.
                </div>
              </div>
            </div>
          </DataSection>
        );
      }
      case 'progress': {
        const data = progRes?.data || [];
        return (
          <DataSection isLoading={progLoading} error={progError} onRetry={() => {}} minHeight="min-h-[400px]">
            <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Distribution of Project Physical Progress</h3>
              <p className="text-sm text-slate-500 mb-6">Groups projects by their reported physical progress percentage into functional bands.</p>
              <div className="h-[400px]">
                {data.length === 0 ? <div className="flex items-center justify-center h-full text-slate-500">No data available.</div> :
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                      <XAxis dataKey="range" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <RechartsTooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} formatter={(val: number) => [val, 'Projects']} />
                      <Bar dataKey="projectCount" name="Number of Projects" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                        {data.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                }
              </div>
            </div>
          </DataSection>
        );
      }
      case 'sector': {
        const data = secRes?.data || [];
        return (
          <DataSection isLoading={secLoading} error={secError} onRetry={() => {}} minHeight="min-h-[400px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Projects by Sector</h3>
                <p className="text-sm text-slate-500 mb-6">Distribution of active projects across major infrastructure sectors.</p>
                <div className="h-[350px]">
                  {data.length === 0 ? <div className="flex items-center justify-center h-full text-slate-500">No data available.</div> :
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.slice(0, 15)} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }} onClick={(d) => { if(d?.activePayload?.[0]?.payload?.sector) handleDrilldown('sector', d.activePayload[0].payload.sector) }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.5} />
                        <XAxis type="number" stroke="#94a3b8" />
                        <YAxis dataKey="sector" type="category" width={140} tick={{fontSize: 11}} stroke="#94a3b8" />
                        <RechartsTooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} formatter={(val: number) => [val, 'Projects']} />
                        <Bar dataKey="projectCount" fill="#0ea5e9" radius={[0, 4, 4, 0]} className="cursor-pointer hover:opacity-80" />
                      </BarChart>
                    </ResponsiveContainer>
                  }
                </div>
              </div>
              <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sector Cost vs Expenditure</h3>
                 <p className="text-sm text-slate-500 mb-6">Compares total revised cost with actual expenditure for each sector.</p>
                 <div className="h-[350px] overflow-y-auto pr-2">
                   {data.length === 0 ? <div className="flex items-center justify-center h-full text-slate-500">No data available.</div> :
                     <div className="space-y-4">
                       {data.map((sec: any, i: number) => (
                         <div key={i} onClick={() => handleDrilldown('sector', sec.sector)} className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded transition-colors">
                           <div className="flex-1 min-w-0 pr-4">
                             <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{sec.sector || 'Unspecified'}</div>
                             <div className="text-xs text-slate-500">{sec.projectCount} Projects</div>
                           </div>
                           <div className="text-right">
                             <div className="text-sm font-bold text-slate-900 dark:text-white">{formatCr(sec.revisedCost)}</div>
                             <div className="text-xs text-emerald-500">Exp: {formatCr(sec.expenditure)}</div>
                           </div>
                         </div>
                       ))}
                     </div>
                   }
                 </div>
              </div>
            </div>
          </DataSection>
        );
      }
      case 'ministry': {
        const data = minRes?.data || [];
        return (
          <DataSection isLoading={minLoading} error={minError} onRetry={() => {}} minHeight="min-h-[400px]">
            <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Projects by Ministry</h3>
              <p className="text-sm text-slate-500 mb-6">Distribution of active projects across managing ministries.</p>
              <div className="h-[500px]">
                {data.length === 0 ? <div className="flex items-center justify-center h-full text-slate-500">No data available.</div> :
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={data.slice(0, 15)} 
                      layout="vertical" 
                      margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                      onClick={(state) => {
                        if (state && state.activePayload && state.activePayload.length) {
                          handleDrilldown('ministry', state.activePayload[0].payload.ministry);
                        }
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.5} />
                      <XAxis type="number" stroke="#94a3b8" />
                      <YAxis dataKey="ministry" type="category" width={200} tick={{fontSize: 11}} stroke="#94a3b8" />
                      <RechartsTooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} formatter={(val: number) => [val, 'Projects']} />
                      <Bar dataKey="projectCount" fill="#8b5cf6" radius={[0, 4, 4, 0]} className="cursor-pointer hover:opacity-80">
                        {data.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                }
              </div>
            </div>
          </DataSection>
        );
      }
      case 'trends': {
        const data = trendsRes?.data || [];
        return (
          <DataSection isLoading={trendsLoading} error={trendsError} onRetry={() => {}} minHeight="min-h-[400px]">
            <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Portfolio Trends by Reporting Period</h3>
              <p className="text-sm text-slate-500 mb-6">Tracks the active project count and total financial exposure across available reporting periods.</p>
              <div className="h-[400px]">
                {data.length === 0 ? <div className="flex items-center justify-center h-full text-slate-500">Historical trend data is not available.</div> :
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis yAxisId="left" stroke="#94a3b8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tickFormatter={(val) => `₹${val/1000}k`} />
                      <RechartsTooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Line yAxisId="left" type="monotone" dataKey="projectCount" stroke="#3b82f6" activeDot={{ r: 8 }} name="Projects" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="revisedCost" stroke="#10b981" name="Revised Cost (Cr)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                }
              </div>
            </div>
          </DataSection>
        );
      }
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'cost': return 'Cost & Financial Analysis';
      case 'progress': return 'Progress & Schedule';
      case 'sector': return 'Sector Analysis';
      case 'ministry': return 'Ministry Analysis';
      case 'trends': return 'Historical Trends';
      default: return 'Analytics';
    }
  };

  const getDescription = () => {
    switch (activeTab) {
      case 'cost': return 'Compare original and revised costs, expenditure, and project cost-overrun patterns.';
      case 'progress': return 'Review reported physical progress and schedule indicators across projects.';
      case 'sector': return 'Distribution of active projects and financial exposure across infrastructure sectors.';
      case 'ministry': return 'Distribution of active projects across managing ministries.';
      case 'trends': return 'Historical movement of key project portfolio metrics over available reporting periods.';
      default: return 'Detailed insights and data visualization.';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{getTitle()}</h2>
          <p className="text-sm text-slate-500">{getDescription()}</p>
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
};
