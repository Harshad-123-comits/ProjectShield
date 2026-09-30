const fs = require('fs');
const path = 'src/components/projects/ProjectTable.tsx';
let content = fs.readFileSync(path, 'utf-8');

const regex = /const \[projects, setProjects\] = useState<any\[\]>\(\[\]\);[\s\S]*?\}, \[filters, page, limit, search\]\);/m;

const newLogic = `  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  
  const queryFilters = { ...filters, q: search };
  const queryKey = 'projects-' + JSON.stringify(queryFilters) + '-' + page + '-' + limit;
  const { data: res, isLoading: loading, error, refetch } = useApiQuery(queryKey, () => api.getProjects(queryFilters, page, limit));
  
  const projects = res?.data || [];
  const totalPages = res?.pagination?.totalPages || 1;
  const totalRecords = res?.pagination?.totalRecords || 0;`;

if (content.match(regex)) {
  content = content.replace(regex, newLogic);
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Fixed ProjectTable.tsx logic.');
} else {
  console.log('Regex did not match ProjectTable.tsx.');
}
