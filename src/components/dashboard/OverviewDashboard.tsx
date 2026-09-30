import React from 'react';
import { useApiQuery } from '../../hooks/useApiQuery';
import { DataSection } from '../common/DataSection';
import { FolderGit2, Activity, AlertOctagon, ClockAlert, BellRing, IndianRupee } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Project, Alert } from '../../types';
import { KpiCard } from '../common/KpiCard';
import { RiskTrendChart } from './RiskTrendChart';
import { AlertCenterPanel } from './AlertCenterPanel';
import { api } from '../../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface OverviewDashboardProps {
  filters: any;
  alerts?: Alert[];
  onSelectProject?: (p: Project) => void;
  onSelectProjectById?: (id: string) => void;
  onNavigate: (tab: any) => void;
  onMarkAlertAsRead?: (alertId: string) => void;
  onDismissAlert?: (alertId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  filters,
  alerts = [],
  onSelectProject,
  onSelectProjectById = () => {},
  onNavigate,
  onMarkAlertAsRead = () => {},
  onDismissAlert = () => {}
}) => {
  const filterKey = JSON.stringify(filters);
  const { data: sumRes, isLoading: sumLoading, error: sumError, refetch: refetchSum } = useApiQuery('summary-'+filterKey, () => api.getSummaryAnalytics(filters));
  const { data: riskRes, isLoading: riskLoading, error: riskError, refetch: refetchRisk } = useApiQuery('risk-'+filterKey, () => api.getRiskAnalytics(filters));
  const { data: statusRes, isLoading: statusLoading, error: statusError, refetch: refetchStatus } = useApiQuery('status-'+filterKey, () => api.getStatusAnalytics(filters));
  const { data: topRiskRes, isLoading: topRiskLoading, error: topRiskError, refetch: refetchTopRisk } = useApiQuery('toprisk-'+filterKey, () => api.getHighRiskProjects(filters));
  const { data: monthlyRes, isLoading: monthlyLoading, error: monthlyError, refetch: refetchMonthly } = useApiQuery('monthly-'+filterKey, () => api.getMonthlyAnalytics(filters));
  const { data: covRes } = useApiQuery('coverage', () => api.getCoverage());

  const summary = sumRes?.data || {};
  const riskData = riskRes?.data || [];
  const statusData = statusRes?.data || [];
  const topRisks = topRiskRes?.data || [];
  const monthlyData = monthlyRes?.data || [];
  const coverage = covRes || {};

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleDrilldown = (paramKey: string, paramValue: string, route: string = '/projects') => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramKey, paramValue);
    navigate(`${route}?${newParams.toString()}`);
  };

  const formatCurrencyCr = (value: number | undefined) => {
    if (value === undefined || value === null) return 'N/A';
    if (value === 0) return '₹0 Cr';
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k Cr`;
    return `₹${value.toLocaleString()} Cr`;
  };

  const riskDistributionData = riskData.map((r: any) => ({
    name: r.riskLevel,
    value: r.projectCount,
    color: r.riskLevel === 'CRITICAL' ? '#ef4444' : r.riskLevel === 'HIGH' ? '#f97316' : r.riskLevel === 'MEDIUM' ? '#eab308' : '#22c55e'
  }));

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-2 rounded shadow-lg border border-slate-700 text-xs">
          <p className="font-bold mb-1">{payload[0].name}</p>
          <p>Projects: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Executive Dashboard</h2>
          <p className="text-sm text-slate-500">
            Real-time infrastructure analytics
            {coverage.oldestReportingPeriod && ` (${coverage.oldestReportingPeriod} to ${coverage.newestReportingPeriod})`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard
          id="kpi-total-projects"
          title="Total Projects"
          value={summary.totalProjects != null ? summary.totalProjects.toString() : 'N/A'}
          trend="Coverage"
          isPositiveTrend={true}
          comparisonLabel="Monitored items"
          icon={FolderGit2}
          variant="default"
          onClick={() => navigate(`/projects?${searchParams.toString()}`)}
        />
        <KpiCard
          id="kpi-active-projects"
          title="Avg Progress"
          value={summary.averagePhysicalProgress != null ? `${Math.round(summary.averagePhysicalProgress)}%` : 'N/A'}
          trend="Overall"
          isPositiveTrend={true}
          comparisonLabel="Physical Progress"
          icon={Activity}
          variant="blue"
          onClick={() => navigate(`/progress?${searchParams.toString()}`)}
        />
        <KpiCard
          id="kpi-high-risk-projects"
          title="High Risk Projects"
          value={summary.highRiskProjects != null ? summary.highRiskProjects.toString() : 'N/A'}
          trend="Attention"
          isPositiveTrend={false}
          comparisonLabel="Immediate review req."
          icon={AlertOctagon}
          variant="high"
          onClick={() => handleDrilldown('riskLevel', 'HIGH', '/projects')}
        />
        <KpiCard
          id="kpi-delayed-projects"
          title="Delayed Projects"
          value={summary.delayedProjects != null ? summary.delayedProjects.toString() : 'N/A'}
          trend="Behind"
          isPositiveTrend={false}
          comparisonLabel="Schedule deviation"
          icon={ClockAlert}
          variant="critical"
          onClick={() => handleDrilldown('status', 'DELAYED', '/projects')}
        />
        <KpiCard
          id="kpi-critical-alerts"
          title="Completed"
          value={summary.completedProjects != null ? summary.completedProjects.toString() : 'N/A'}
          trend="Success"
          isPositiveTrend={true}
          comparisonLabel="Successfully finished"
          icon={BellRing}
          variant="blue"
          onClick={() => handleDrilldown('status', 'COMPLETED', '/projects')}
        />
        <KpiCard
          id="kpi-cost-exposure"
          title="Cost Overrun"
          value={formatCurrencyCr(summary.totalCostOverrun)}
          trend="Excess"
          isPositiveTrend={false}
          comparisonLabel="Over original budget"
          icon={IndianRupee}
          variant="warning"
          onClick={() => navigate(`/cost?${searchParams.toString()}`)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          <div className="bg-white dark:bg-[#111827] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Risk Distribution & Health</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Portfolio categorization from PAIMANA dataset</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="h-48 relative flex items-center justify-center cursor-pointer">
                <DataSection isLoading={riskLoading} error={riskError} onRetry={refetchRisk}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip content={<CustomPieTooltip />} />
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={78}
                        paddingAngle={4}
                        dataKey="value"
                        onClick={(data) => handleDrilldown('riskLevel', data.name, '/projects')}
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" strokeWidth={0} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </DataSection>
              </div>

              <div className="space-y-3">
                {riskDistributionData.map((r: any, i: number) => (
                  <div key={i} onClick={() => handleDrilldown('riskLevel', r.name, '/projects')} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm shadow-xs" style={{ backgroundColor: r.color }}></span>
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{r.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono-num">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111827] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Monthly Risk Trend</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Historical trajectory from official ProjectSnapshots</p>
              </div>
            </div>
            {monthlyData.length > 0 ? (
               <RiskTrendChart data={monthlyData} />
            ) : (
               <div className="h-48 flex items-center justify-center text-slate-500 text-sm italic">Insufficient historical data</div>
            )}
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Top Highest Risk Projects</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Projects with highest analytical risk score</p>
              </div>
              <button onClick={() => navigate(`/risk?${searchParams.toString()}`)} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                View details &rarr;
              </button>
            </div>

            <div className="p-5 space-y-3.5">
              <DataSection isLoading={topRiskLoading} error={topRiskError} onRetry={refetchTopRisk}>
                {topRisks.length === 0 && <p className="text-xs text-slate-500">No high risk projects found.</p>}
                {topRisks.map((proj: any, idx: number) => (
                  <div key={idx} className="space-y-1.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded" onClick={() => navigate(`/projects/${proj._id || proj.projectCode}?${searchParams.toString()}`)}>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300 truncate">{proj.projectName}</span>
                      <span className="text-red-600 dark:text-red-400 font-mono-num flex-shrink-0">Score: {proj.riskScore}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1">{proj.riskReasons?.[0] || 'High risk factors detected'}</div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-red-500 rounded-full`} style={{ width: `${Math.min(100, Math.max(0, proj.riskScore))}%` }}></div>
                    </div>
                  </div>
                ))}
              </DataSection>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <AlertCenterPanel
            alerts={alerts}
            onSelectProjectById={(id) => navigate(`/projects/${id}?${searchParams.toString()}`)}
            onMarkAsRead={onMarkAlertAsRead}
            onDismissAlert={onDismissAlert}
            onViewAllAlerts={() => navigate(`/risk?${searchParams.toString()}`)}
          />
        </div>
      </div>
    </div>
  );
};
