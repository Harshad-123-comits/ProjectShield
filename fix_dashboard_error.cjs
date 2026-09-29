const fs = require('fs');
const path = 'src/components/dashboard/OverviewDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');

const replacement = `  const [loading, setLoading] = useState(true);
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
  }, [filters]);

  if (loading) {
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

const pattern = /  const \[loading, setLoading\] = useState\(true\);\s*useEffect\(\(\) => \{\s*const fetchData = async \(\) => \{[\s\S]*?if \(loading\) \{\s*return <div.*?<\/div>;\s*\}/m;
content = content.replace(pattern, replacement);

if (!content.includes('AlertTriangle')) {
  content = content.replace("import {", "import { AlertTriangle,");
}

fs.writeFileSync(path, content, 'utf-8');
console.log('Fixed OverviewDashboard error state');
