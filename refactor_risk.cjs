const fs = require('fs');
const path = 'src/components/risk/RiskMonitorPage.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Imports
content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState } from 'react';\nimport { useApiQuery } from '../../hooks/useApiQuery';\nimport { DataSection } from '../common/DataSection';");

const oldLogic = `  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Local sub-filters
  const [minRisk, setMinRisk] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Fetch max 500 for the scatter plot
        const res = await api.getProjects(filters, 1, 500);
        setProjects(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [filters]);`;

const newLogic = `  // Local sub-filters
  const [minRisk, setMinRisk] = useState(0);

  const queryKey = 'risk-monitor-' + JSON.stringify(filters);
  const { data: projects = [], isLoading: loading, error, refetch } = useApiQuery(queryKey, () => api.getProjects(filters, 1, 500));`;

content = content.replace(oldLogic, newLogic);

// Wrap main content
content = content.replace(
  /<div className="bg-white dark:bg-\[#111827\] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-\[500px\]">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
  (match, p1) => {
    return `<div className="bg-white dark:bg-[#111827] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[500px]"><DataSection isLoading={loading} error={error} onRetry={refetch}>${p1}</DataSection></div>\n      </div>\n    </div>`;
  }
);

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched RiskMonitorPage.tsx.');
