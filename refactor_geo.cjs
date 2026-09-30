const fs = require('fs');
const path = 'src/components/geographic/GeographicViewPage.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Imports
content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState } from 'react';\nimport { useApiQuery } from '../../hooks/useApiQuery';\nimport { DataSection } from '../common/DataSection';");

const oldLogic = `  const [states, setStates] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      setLoading(true);
      try {
        const res = await api.getStateAnalytics(filters);
        setStates(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, [filters]);`;

const newLogic = `  const [search, setSearch] = useState('');
  const queryKey = 'states-' + JSON.stringify(filters);
  const { data: states = [], isLoading: loading, error, refetch } = useApiQuery(queryKey, () => api.getStateAnalytics(filters));`;

content = content.replace(oldLogic, newLogic);

content = content.replace("states.filter(s => s.state.toLowerCase().includes(search.toLowerCase()))", "(states || []).filter(s => (s.state || '').toLowerCase().includes(search.toLowerCase()))");
content = content.replace("if (!val) return '₹0 Cr';", "if (val == null) return 'N/A';\n    if (val === 0) return '₹0 Cr';");

// Wrap main content block
content = content.replace(
  /<div className="bg-white dark:bg-\[#111827\] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-\[400px\]">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
  (match, p1) => {
    return `<div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]"><DataSection isLoading={loading} error={error} onRetry={refetch}>${p1}</DataSection></div>\n      </div>\n    </div>`;
  }
);

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched GeographicViewPage.tsx.');
