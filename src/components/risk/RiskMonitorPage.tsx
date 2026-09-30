import React from 'react';
import { useApiQuery } from '../../hooks/useApiQuery';
import { DataSection } from '../common/DataSection';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { Project } from '../../types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
const RISK_COLORS: Record<string, string> = {
  'CRITICAL': '#b91c1c',
  'HIGH': '#ef4444',
  'MEDIUM': '#f59e0b',
  'LOW': '#10b981'
};

export const RiskMonitorPage: React.FC<any> = ({ filters, onSelectProject }) => {
  const queryKey = 'risk-monitor-' + JSON.stringify(filters);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const { data: trendRes, isLoading: trendLoading, error: trendErr } = useApiQuery(queryKey + '-trend', () => api.getTrendsAnalytics(filters));
  const { data: distRes, isLoading: distLoading, error: distErr } = useApiQuery(queryKey + '-dist', () => api.getRiskAnalytics(filters));
  const { data: driverRes, isLoading: driverLoading, error: driverErr } = useApiQuery(queryKey + '-driver', () => api.getRiskDrivers(filters));
  const { data: stateRes, isLoading: stateLoading, error: stateErr } = useApiQuery(queryKey + '-state', () => api.getRiskByState(filters));
  const { data: sectorRes, isLoading: sectorLoading, error: sectorErr } = useApiQuery(queryKey + '-sector', () => api.getRiskBySector(filters));
  const { data: highRiskRes, isLoading: highRiskLoading, error: highRiskErr } = useApiQuery(queryKey + '-high', () => api.getHighRiskProjects(filters));

  const trends = trendRes?.data || [];
  const distribution = distRes?.data || [];
  const drivers = driverRes?.data || [];
  const stateData = stateRes?.data || [];
  const sectorData = sectorRes?.data || [];
  const highRiskProjects = highRiskRes?.data || [];

  const handleDrilldown = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    navigate(`/projects?${newParams.toString()}`);
  };

  const currentHigh = distribution.find((d: any) => d.riskLevel === 'HIGH' || d.riskLevel === 'CRITICAL')?.projectCount || 0;
  const currentMedium = distribution.find((d: any) => d.riskLevel === 'MEDIUM')?.projectCount || 0;
  const currentLow = distribution.find((d: any) => d.riskLevel === 'LOW')?.projectCount || 0;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Risk Analysis</h2>
          <p className="text-sm text-slate-500">Review current risk indicators and historical risk movement across available reporting periods.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-red-200 dark:border-red-900/50 p-5 shadow-sm">
          <div className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">High & Critical Risk</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{currentHigh} <span className="text-sm font-normal text-slate-500">Projects</span></div>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-amber-200 dark:border-amber-900/50 p-5 shadow-sm">
          <div className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-1">Medium Risk</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{currentMedium} <span className="text-sm font-normal text-slate-500">Projects</span></div>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-emerald-200 dark:border-emerald-900/50 p-5 shadow-sm">
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1">Low Risk</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{currentLow} <span className="text-sm font-normal text-slate-500">Projects</span></div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Risk Trend by Reporting Period</h3>
        <p className="text-sm text-slate-500 mb-6">Shows how project risk categories have changed across the available reporting snapshots.</p>
        <DataSection isLoading={trendLoading} error={trendErr} onRetry={() => {}} minHeight="min-h-[350px]">
          {trends.length === 0 ? <div className="flex justify-center items-center h-[350px] text-slate-500">Not enough reporting periods for a meaningful trend comparison.</div> : (
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <RechartsTooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} formatter={(val: number) => [val, 'Projects']} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="totalHighRisk" name="High/Critical Risk" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="mediumRisk" name="Medium Risk" stroke="#f59e0b" strokeWidth={3} />
                  <Line type="monotone" dataKey="lowRisk" name="Low Risk" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {trends.length > 0 && (
             <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
               <strong>Risk movement:</strong> High-risk project count changed from {trends[0]?.totalHighRisk || 0} to {trends[trends.length - 1]?.totalHighRisk || 0} between the earliest and latest available reporting periods.
             </div>
          )}
        </DataSection>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Current Portfolio Risk Distribution</h3>
          <p className="text-sm text-slate-500 mb-6">How many projects are currently in each risk category?</p>
          <DataSection isLoading={distLoading} error={distErr} onRetry={() => {}} minHeight="min-h-[300px]">
            {distribution.length === 0 ? <div className="flex justify-center items-center h-[300px] text-slate-500">No data available.</div> : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={distribution} dataKey="projectCount" nameKey="riskLevel" cx="50%" cy="50%" outerRadius={100} label={(e) => e.riskLevel}>
                      {distribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.riskLevel] || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} formatter={(val: number) => [val, 'Projects']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </DataSection>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Risk Drivers</h3>
          <p className="text-sm text-slate-500 mb-6">Primary recorded reasons for elevated project risk.</p>
          <DataSection isLoading={driverLoading} error={driverErr} onRetry={() => {}} minHeight="min-h-[300px]">
            {drivers.length === 0 ? <div className="flex justify-center items-center h-[300px] text-slate-500">No risk drivers recorded.</div> : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={drivers} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.5} />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="reason" type="category" width={140} tick={{fontSize: 11}} stroke="#94a3b8" />
                    <RechartsTooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} formatter={(val: number) => [val, 'Projects']} />
                    <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </DataSection>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">High-Risk Projects by State</h3>
          <p className="text-sm text-slate-500 mb-6">Concentration of high/critical risk projects geographically.</p>
          <DataSection isLoading={stateLoading} error={stateErr} onRetry={() => {}} minHeight="min-h-[350px]">
            {stateData.length === 0 ? <div className="flex justify-center items-center h-[350px] text-slate-500">No high-risk projects by state.</div> : (
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }} onClick={(d) => { if(d?.activePayload?.[0]?.payload?.state) handleDrilldown('state', d.activePayload[0].payload.state) }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.5} />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="state" type="category" width={120} tick={{fontSize: 12}} stroke="#94a3b8" />
                    <RechartsTooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} formatter={(val: number) => [val, 'High Risk Projects']} />
                    <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} className="cursor-pointer hover:opacity-80" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </DataSection>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">High-Risk Projects by Sector</h3>
          <p className="text-sm text-slate-500 mb-6">Concentration of high/critical risk projects by sector.</p>
          <DataSection isLoading={sectorLoading} error={sectorErr} onRetry={() => {}} minHeight="min-h-[350px]">
            {sectorData.length === 0 ? <div className="flex justify-center items-center h-[350px] text-slate-500">No high-risk projects by sector.</div> : (
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }} onClick={(d) => { if(d?.activePayload?.[0]?.payload?.sector) handleDrilldown('sector', d.activePayload[0].payload.sector) }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.5} />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="sector" type="category" width={120} tick={{fontSize: 12}} stroke="#94a3b8" />
                    <RechartsTooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} formatter={(val: number) => [val, 'High Risk Projects']} />
                    <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} className="cursor-pointer hover:opacity-80" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </DataSection>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" /> High-Risk Project List</h3>
            <p className="text-sm text-slate-500">Currently active projects flagged as high or critical risk.</p>
         </div>
         <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
           <DataSection isLoading={highRiskLoading} error={highRiskErr} onRetry={() => {}}>
             {highRiskProjects.map((p: Project, i: number) => (
               <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border border-slate-100 dark:border-slate-700/50 transition-colors" onClick={() => navigate(`/projects/${p.projectCode}`)}>
                  <div className="flex-1 min-w-0 pr-4 mb-2 sm:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{p.projectCode}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-red-100 text-red-700'}`}>{p.riskLevel}</span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 truncate w-full">{p.projectName}</div>
                    <div className="mt-2 text-xs text-slate-500 flex flex-wrap gap-1">
                      {p.riskReasons && p.riskReasons.length > 0 ? (
                        p.riskReasons.map((reason, idx) => (
                          <span key={idx} className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-[10px]">{reason}</span>
                        ))
                      ) : (
                        <span className="italic text-slate-400">General delays and cost factors</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                       <div className="font-bold font-mono-num text-lg text-red-500">{p.riskScore}</div>
                       <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Score</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-sky-500 transition-colors" />
                  </div>
               </div>
             ))}
             {highRiskProjects.length === 0 && <div className="text-center text-slate-500 py-8">No high risk projects found.</div>}
           </DataSection>
         </div>
      </div>
    </div>
  );
};
