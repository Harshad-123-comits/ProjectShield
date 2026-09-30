const fs = require('fs');
const path = 'src/components/dashboard/OverviewDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Imports
content = content.replace("import React, { useState, useEffect } from 'react';", "import React from 'react';\nimport { useApiQuery } from '../../hooks/useApiQuery';\nimport { DataSection } from '../common/DataSection';");

const oldLogic = `  const [summary, setSummary] = useState<any>({});
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
        
        if (sumRes.errorCode === 'DATABASE_UNAVAILABLE' || sumRes.success === false) {
          setError('Analytics temporarily unavailable because the data service is unavailable.');
          return;
        }

        setSummary(sumRes.data || {});
        setRiskData(riskRes.data || []);
        setStatusData(statusRes.data || []);
        setTopRisks(topRiskRes.data || []);
        setMonthlyData(monthlyRes.data || []);
        if (covRes) setCoverage(covRes);
      } catch (err) {
        console.error('Error fetching dashboard analytics:', err);
        setError('Analytics temporarily unavailable because the data service is unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);`;

const newLogic = `  const filterKey = JSON.stringify(filters);
  const { data: summary = {}, isLoading: sumLoading, error: sumError, refetch: refetchSum } = useApiQuery('summary-'+filterKey, () => api.getSummaryAnalytics(filters));
  const { data: riskData = [], isLoading: riskLoading, error: riskError, refetch: refetchRisk } = useApiQuery('risk-'+filterKey, () => api.getRiskAnalytics(filters));
  const { data: statusData = [], isLoading: statusLoading, error: statusError, refetch: refetchStatus } = useApiQuery('status-'+filterKey, () => api.getStatusAnalytics(filters));
  const { data: topRisks = [], isLoading: topRiskLoading, error: topRiskError, refetch: refetchTopRisk } = useApiQuery('toprisk-'+filterKey, () => api.getHighRiskProjects(filters));
  const { data: monthlyData = [], isLoading: monthlyLoading, error: monthlyError, refetch: refetchMonthly } = useApiQuery('monthly-'+filterKey, () => api.getMonthlyAnalytics(filters));
  const { data: coverage = null } = useApiQuery('coverage', () => api.getCoverage());`;

content = content.replace(oldLogic, newLogic);

const oldIfLoading = `  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading live telemetry...</div>;
  }

  if (error) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Service Unavailable</h3>
        <p className="text-slate-500 dark:text-slate-400">{error}</p>
      </div>
    );
  }`;

const newIfLoading = `  // We don't block the whole dashboard anymore. 
  // We use DataSection wrappers.`;

content = content.replace(oldIfLoading, newIfLoading);

// Wrap KPIs in a conditional if error for summary?
// Actually we can just let KPIs render N/A when they have no data.
// But we should wrap the charts.
content = content.replace(
  /<div className="h-48 relative flex items-center justify-center">([\s\S]*?)<\/div>/g,
  (match, p1) => {
    if (match.includes('PieChart') && match.includes('riskDistributionData')) {
      return `<div className="h-48 relative flex items-center justify-center"><DataSection isLoading={riskLoading} error={riskError} onRetry={refetchRisk}>${p1}</DataSection></div>`;
    }
    return match;
  }
);

content = content.replace(
  /<div className="h-64 sm:h-72 relative w-full">([\s\S]*?)<\/div>/g,
  (match, p1) => {
    if (match.includes('RiskTrendChart')) {
      return `<div className="h-64 sm:h-72 relative w-full"><DataSection isLoading={monthlyLoading} error={monthlyError} onRetry={refetchMonthly}>${p1}</DataSection></div>`;
    }
    return match;
  }
);

content = content.replace(
  /<div className="bg-white dark:bg-\[#111827\] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-1 lg:col-span-8 flex flex-col min-h-\[300px\]">([\s\S]*?)<\/div>/,
  `<div className="bg-white dark:bg-[#111827] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-1 lg:col-span-8 flex flex-col min-h-[300px]"><DataSection isLoading={statusLoading} error={statusError} onRetry={refetchStatus}>$1</DataSection></div>`
);

content = content.replace(
  /<AlertCenterPanel[\s\S]*?\/>/,
  (match) => `<DataSection isLoading={topRiskLoading} error={topRiskError} onRetry={refetchTopRisk}>${match}</DataSection>`
);

// We need to fix the case where coverage is used
content = content.replace('if (covRes) setCoverage(covRes);', '');

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched OverviewDashboard.tsx.');
