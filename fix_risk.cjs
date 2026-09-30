const fs = require('fs');
const path = 'src/components/risk/RiskMonitorPage.tsx';
let content = fs.readFileSync(path, 'utf-8');

const regex = /const \[projects, setProjects\] = useState<any\[\]>\(\[\]\);[\s\S]*?\}, \[filters\]\);/m;

const newLogic = `  // Local sub-filters
  const [minRisk, setMinRisk] = useState(0);

  const queryKey = 'risk-monitor-' + JSON.stringify(filters);
  const { data: projects = [], isLoading: loading, error, refetch } = useApiQuery(queryKey, () => api.getProjects(filters, 1, 500));`;

if (content.match(regex)) {
  content = content.replace(regex, newLogic);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Fixed RiskMonitorPage.tsx logic.');
} else {
  console.log('Regex did not match RiskMonitorPage.tsx.');
}
