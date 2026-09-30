const fs = require('fs');
const path = 'src/components/analytics/AnalyticsPage.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Imports
content = content.replace("import React, { useState, useEffect } from 'react';", "import React from 'react';\nimport { useApiQuery } from '../../hooks/useApiQuery';\nimport { DataSection } from '../common/DataSection';");

// Replace state and useEffect
const oldLogic = `  const [sectors, setSectors] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [ministries, setMinistries] = useState<any[]>([]);
  const [delays, setDelays] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const [secRes, stateRes, minRes, delRes] = await Promise.all([
          api.getSectorAnalytics(filters),
          api.getStateAnalytics(filters),
          api.getMinistryAnalytics(filters),
          api.getDelayAnalytics(filters)
        ]);
        setSectors(secRes.data || []);
        setStates(stateRes.data || []);
        setMinistries(minRes.data || []);
        setDelays(delRes.data || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [filters]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading analytics...</div>;
  }`;

const newLogic = `  const filterKey = JSON.stringify(filters);
  const { data: sectors = [], isLoading: secLoading, error: secError, refetch: refetchSec } = useApiQuery('sectors-'+filterKey, () => api.getSectorAnalytics(filters));
  const { data: states = [], isLoading: stateLoading, error: stateError, refetch: refetchState } = useApiQuery('states-'+filterKey, () => api.getStateAnalytics(filters));
  const { data: ministries = [], isLoading: minLoading, error: minError, refetch: refetchMin } = useApiQuery('ministries-'+filterKey, () => api.getMinistryAnalytics(filters));
  const { data: delays = {}, isLoading: delLoading, error: delError, refetch: refetchDel } = useApiQuery('delays-'+filterKey, () => api.getDelayAnalytics(filters));`;

content = content.replace(oldLogic, newLogic);

// Replace mapping to wrap with DataSection
// Sectors (around Line 63 probably)
content = content.replace(
  /<div className="h-64 sm:h-80 w-full mt-4">([\s\S]*?)<\/div>/g, 
  (match, p1) => {
    if (match.includes('BarChart') && match.includes('sectors')) {
      return `<div className="h-64 sm:h-80 w-full mt-4"><DataSection isLoading={secLoading} error={secError} onRetry={refetchSec}>${p1}</DataSection></div>`;
    }
    if (match.includes('BarChart') && match.includes('ministries')) {
      return `<div className="h-64 sm:h-80 w-full mt-4"><DataSection isLoading={minLoading} error={minError} onRetry={refetchMin}>${p1}</DataSection></div>`;
    }
    return match;
  }
);

// Delays pie chart
content = content.replace(
  /<div className="h-64 flex items-center justify-center relative">([\s\S]*?)<\/div>/,
  `<div className="h-64 flex items-center justify-center relative"><DataSection isLoading={delLoading} error={delError} onRetry={refetchDel}>$1</DataSection></div>`
);

// Top State section
content = content.replace(
  /<div className="text-lg font-bold text-slate-900 dark:text-white">\{states\[0\]\?.state \|\| 'N\/A'\}<\/div>\s*<div className="text-xs text-slate-500">\{formatCr\(states\[0\]\?.revisedCost\)\} Exposure<\/div>/,
  `<DataSection isLoading={stateLoading} error={stateError} onRetry={refetchState} minHeight="min-h-[40px]">
              <div className="text-lg font-bold text-slate-900 dark:text-white">{states[0]?.state || 'N/A'}</div>
              <div className="text-xs text-slate-500">{formatCr(states[0]?.revisedCost)} Exposure</div>
            </DataSection>`
);

// Top Sector section
content = content.replace(
  /<div className="text-lg font-bold text-slate-900 dark:text-white">\{sectors\[0\]\?.sector \|\| 'N\/A'\}<\/div>\s*<div className="text-xs text-slate-500">\{sectors\[0\]\?.projectCount \|\| 0\} Projects<\/div>/,
  `<DataSection isLoading={secLoading} error={secError} onRetry={refetchSec} minHeight="min-h-[40px]">
              <div className="text-lg font-bold text-slate-900 dark:text-white">{sectors[0]?.sector || 'N/A'}</div>
              <div className="text-xs text-slate-500">{sectors[0]?.projectCount || 0} Projects</div>
            </DataSection>`
);

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched AnalyticsPage.tsx.');
