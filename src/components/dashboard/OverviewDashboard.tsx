import React, { useState, useEffect } from 'react';
import { AlertTriangle,
  FolderGit2,
  Activity,
  AlertOctagon,
  ClockAlert,
  BellRing,
  IndianRupee,
  Sparkles,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Project, Alert } from '../../types';
import { KpiCard } from '../common/KpiCard';
import { CostScheduleScatter } from './CostScheduleScatter';
import { RiskTrendChart } from './RiskTrendChart';
import { AlertCenterPanel } from './AlertCenterPanel';
import { api } from '../../services/api';

interface OverviewDashboardProps {
  filters: any;
  projects: Project[]; // Note: might not be needed if all data is via API now
  alerts: Alert[];
  onSelectProject: (p: Project) => void;
  onSelectProjectById: (id: string) => void;
  onNavigate: (tab: any) => void;
  onMarkAlertAsRead: (alertId: string) => void;
  onDismissAlert: (alertId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  filters,
  alerts,
  onSelectProject,
  onSelectProjectById,
  onNavigate,
  onMarkAlertAsRead,
  onDismissAlert
}) => {
  const [summary, setSummary] = useState<any>({});
  const [riskData, setRiskData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [topRisks, setTopRisks] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [coverage, setCoverage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [sumRes, riskRes, statusRes, topRiskRes, covRes, monthlyRes] = await Promise.all([
          api.getSummaryAnalytics(filters),
          api.getRiskAnalytics(filters),
          api.getStatusAnalytics(filters),
          api.getHighRiskProjects(filters),
          api.getCoverage(),
          api.getMonthlyAnalytics(filters)
        ]);
        setSummary(sumRes.data || {});
        setRiskData(riskRes.data || []);
        setStatusData(statusRes.data || []);
        setTopRisks(topRiskRes.data ? topRiskRes.data.slice(0, 4) : []);
        setMonthlyData(monthlyRes.data || []);
        if (covRes) setCoverage(covRes);
      } catch (err) {
        console.error('Error fetching dashboard analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const riskDistributionData = riskData.map(r => ({
    name: r.riskLevel,
    value: r.projectCount,
    color: r.riskLevel === 'CRITICAL' ? '#EF4444' : r.riskLevel === 'HIGH' ? '#F59E0B' : r.riskLevel === 'MEDIUM' ? '#EAB308' : '#10B981'
  }));

  const formatCurrencyCr = (amount: number) => {
    if (amount == null) return 'N/A';
    if (amount === 0) return '₹0 Cr';
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(2)}k Cr`;
    return `₹${amount.toLocaleString()} Cr`;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = summary.totalProjects || 1;
      const pct = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-xs shadow-xl text-white">
          <p className="font-bold">{data.name}</p>
          <p className="text-slate-300 font-mono-num">
            {data.value} projects ({pct}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading live telemetry...</div>;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/60 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>National Infrastructure Early Warning System</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 font-mono-num font-bold">
                DATA-DRIVEN MODE
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live automated telemetry pipeline pulling from PAIMANA dataset.
            </p>
          </div>
        </div>
      </div>

      {coverage && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/50 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-center text-sm shadow-sm">
          <div>
            <span className="font-semibold text-indigo-800 dark:text-indigo-300">Data Coverage: </span>
            <span className="text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm">{coverage.coverageDescription}</span>
          </div>
          <div className="flex space-x-3 mt-2 sm:mt-0 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm whitespace-nowrap overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
            <span className="bg-white/60 dark:bg-black/20 px-2 py-0.5 rounded border border-indigo-200/50 dark:border-indigo-700/30">Projects: <b className="font-mono-num">{coverage.uniqueProjects}</b></span>
            <span className="bg-white/60 dark:bg-black/20 px-2 py-0.5 rounded border border-indigo-200/50 dark:border-indigo-700/30">Snapshots: <b className="font-mono-num">{coverage.totalSnapshots}</b></span>
            <span className="bg-white/60 dark:bg-black/20 px-2 py-0.5 rounded border border-indigo-200/50 dark:border-indigo-700/30">Periods: <b className="font-mono-num">{coverage.reportingPeriods?.length || 0}</b></span>
            <span className="bg-white/60 dark:bg-black/20 px-2 py-0.5 rounded border border-indigo-200/50 dark:border-indigo-700/30">Latest: <b className="font-mono-num">{coverage.newestReportingPeriod?.substring(0, 7) || 'N/A'}</b></span>
          </div>
        </div>
      )}

      {/* Top Executive KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <KpiCard
          id="kpi-total-projects"
          title="Total Projects"
          value={summary.totalProjects != null ? summary.totalProjects.toLocaleString() : 'N/A'}
          trend="Live"
          isPositiveTrend={true}
          comparisonLabel="Active Monitoring"
          icon={FolderGit2}
          variant="default"
          onClick={() => onNavigate('projects')}
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
          onClick={() => onNavigate('projects')}
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
          onClick={() => onNavigate('risk-monitor')}
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
          onClick={() => onNavigate('projects')}
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
          onClick={() => onNavigate('projects')}
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
          onClick={() => onNavigate('analytics')}
        />
      </div>

      {/* Primary Analytics Section: Risk Distribution + XAI Drivers + Alert Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 8 Cols */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {/* Risk Distribution Donut */}
          <div className="bg-white dark:bg-[#111827] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Risk Distribution & Health</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Portfolio categorization from PAIMANA dataset</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="h-48 relative flex items-center justify-center">
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
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" strokeWidth={0} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3">
                {riskDistributionData.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
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

          {/* Monthly Trend Chart */}
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

          {/* Top Risky Projects */}
          <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Top Highest Risk Projects</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Projects with highest analytical risk score</p>
              </div>
            </div>

            <div className="p-5 space-y-3.5">
              {topRisks.length === 0 && <p className="text-xs text-slate-500">No high risk projects found.</p>}
              {topRisks.map((proj, idx) => (
                <div key={idx} className="space-y-1.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded" onClick={() => { onSelectProjectById(proj._id || proj.projectCode); onNavigate('projects'); }}>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300 truncate">{proj.projectName}</span>
                    <span className="text-red-600 dark:text-red-400 font-mono-num flex-shrink-0">Score: {proj.riskScore}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-1">{proj.riskReasons?.[0] || 'High risk factors detected'}</div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-red-500 rounded-full`} style={{ width: `${proj.riskScore}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4">
          <AlertCenterPanel
            alerts={alerts}
            onSelectProjectById={onSelectProjectById}
            onMarkAsRead={onMarkAlertAsRead}
            onDismissAlert={onDismissAlert}
            onViewAllAlerts={() => onNavigate('early-warnings')}
          />
        </div>
      </div>
    </div>
  );
};
