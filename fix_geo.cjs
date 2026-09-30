const fs = require('fs');
const path = 'src/components/geographic/GeographicViewPage.tsx';
let content = fs.readFileSync(path, 'utf-8');

const regex = /const \[states, setStates\] = useState<any\[\]>\(\[\]\);[\s\S]*?\}, \[filters\]\);/m;

const newLogic = `  const [search, setSearch] = useState('');
  const queryKey = 'states-' + JSON.stringify(filters);
  const { data: states = [], isLoading: loading, error, refetch } = useApiQuery(queryKey, () => api.getStateAnalytics(filters));`;

if (content.match(regex)) {
  content = content.replace(regex, newLogic);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Fixed GeographicViewPage.tsx logic.');
} else {
  console.log('Regex did not match GeographicViewPage.tsx.');
}
