const fs = require('fs');
const path = 'src/components/projects/ProjectTable.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Imports
content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState } from 'react';\nimport { useApiQuery } from '../../hooks/useApiQuery';\nimport { DataSection } from '../common/DataSection';");

const oldLogic = `  const [projects, setProjects] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const queryFilters = { ...filters, q: search };
        const res = await api.getProjects(queryFilters, page, limit);
        if (res.success) {
          setProjects(res.data);
          setTotalPages(res.pagination.totalPages);
          setTotalRecords(res.pagination.totalRecords);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchProjects, 300);
    return () => clearTimeout(debounce);
  }, [filters, search, page, limit]);`;

const newLogic = `  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  
  const queryFilters = { ...filters, q: search };
  const queryKey = 'projects-' + JSON.stringify(queryFilters) + '-' + page + '-' + limit;
  const { data: res, isLoading: loading, error, refetch } = useApiQuery(queryKey, () => api.getProjects(queryFilters, page, limit));
  
  const projects = res?.data || [];
  const totalPages = res?.pagination?.totalPages || 1;
  const totalRecords = res?.pagination?.totalRecords || 0;`;

content = content.replace(oldLogic, newLogic);

// Replace mapping to wrap with DataSection
content = content.replace(
  /<div className="overflow-x-auto rounded-t-xl">([\s\S]*?)<\/div>\s*<div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800\/50 rounded-b-xl">/,
  (match, p1) => {
    return `<div className="overflow-x-auto rounded-t-xl"><DataSection isLoading={loading} error={error} onRetry={refetch}>${p1}</DataSection></div>\n        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl">`;
  }
);

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched ProjectTable.tsx.');
