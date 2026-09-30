const fs = require('fs');
const path = 'src/components/dashboard/OverviewDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');

// I will manually slice out the old state and useEffect.
const topRegex = /const \[summary, setSummary\] = useState<any>\(\{\}\);[\s\S]*?\}, \[filters\]\);/m;

const newLogic = `  const filterKey = JSON.stringify(filters);
  const { data: summary = {}, isLoading: sumLoading, error: sumError, refetch: refetchSum } = useApiQuery('summary-'+filterKey, () => api.getSummaryAnalytics(filters));
  const { data: riskData = [], isLoading: riskLoading, error: riskError, refetch: refetchRisk } = useApiQuery('risk-'+filterKey, () => api.getRiskAnalytics(filters));
  const { data: statusData = [], isLoading: statusLoading, error: statusError, refetch: refetchStatus } = useApiQuery('status-'+filterKey, () => api.getStatusAnalytics(filters));
  const { data: topRisks = [], isLoading: topRiskLoading, error: topRiskError, refetch: refetchTopRisk } = useApiQuery('toprisk-'+filterKey, () => api.getHighRiskProjects(filters));
  const { data: monthlyData = [], isLoading: monthlyLoading, error: monthlyError, refetch: refetchMonthly } = useApiQuery('monthly-'+filterKey, () => api.getMonthlyAnalytics(filters));
  const { data: coverage = null } = useApiQuery('coverage', () => api.getCoverage());`;

if (content.match(topRegex)) {
  content = content.replace(topRegex, newLogic);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Fixed OverviewDashboard.tsx logic.');
} else {
  console.log('Regex did not match OverviewDashboard.tsx.');
}
