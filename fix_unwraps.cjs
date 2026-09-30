const fs = require('fs');

// --- OVERVIEW DASHBOARD ---
let dashPath = 'src/components/dashboard/OverviewDashboard.tsx';
let dashContent = fs.readFileSync(dashPath, 'utf-8');

dashContent = dashContent.replace(/const \{ data: summary = \{\}, (isLoading: sumLoading.*?) \} = useApiQuery/g, "const { data: sumRes, $1 } = useApiQuery");
dashContent = dashContent.replace(/const \{ data: riskData = \[\], (isLoading: riskLoading.*?) \} = useApiQuery/g, "const { data: riskRes, $1 } = useApiQuery");
dashContent = dashContent.replace(/const \{ data: statusData = \[\], (isLoading: statusLoading.*?) \} = useApiQuery/g, "const { data: statusRes, $1 } = useApiQuery");
dashContent = dashContent.replace(/const \{ data: topRisks = \[\], (isLoading: topRiskLoading.*?) \} = useApiQuery/g, "const { data: topRiskRes, $1 } = useApiQuery");
dashContent = dashContent.replace(/const \{ data: monthlyData = \[\], (isLoading: monthlyLoading.*?) \} = useApiQuery/g, "const { data: monthlyRes, $1 } = useApiQuery");
dashContent = dashContent.replace(/const \{ data: coverage = null \} = useApiQuery/g, "const { data: covRes } = useApiQuery");

let unwrapDash = `
  const summary = sumRes?.data || {};
  const riskData = riskRes?.data || [];
  const statusData = statusRes?.data || [];
  const topRisks = topRiskRes?.data || [];
  const monthlyData = monthlyRes?.data || [];
  const coverage = covRes?.data || covRes || null;
`;
// insert after the last useApiQuery
dashContent = dashContent.replace(/(useApiQuery\('coverage', \(\) => api\.getCoverage\(\)\);)/, "$1\n" + unwrapDash);
fs.writeFileSync(dashPath, dashContent, 'utf-8');
console.log('Patched OverviewDashboard.tsx');

// --- ANALYTICS PAGE ---
let analyticsPath = 'src/components/analytics/AnalyticsPage.tsx';
let analyticsContent = fs.readFileSync(analyticsPath, 'utf-8');

analyticsContent = analyticsContent.replace(/const \{ data: sectors = \[\], (isLoading: secLoading.*?) \} = useApiQuery/g, "const { data: secRes, $1 } = useApiQuery");
analyticsContent = analyticsContent.replace(/const \{ data: states = \[\], (isLoading: stateLoading.*?) \} = useApiQuery/g, "const { data: stateRes, $1 } = useApiQuery");
analyticsContent = analyticsContent.replace(/const \{ data: ministries = \[\], (isLoading: minLoading.*?) \} = useApiQuery/g, "const { data: minRes, $1 } = useApiQuery");
analyticsContent = analyticsContent.replace(/const \{ data: delays = \{\}, (isLoading: delLoading.*?) \} = useApiQuery/g, "const { data: delRes, $1 } = useApiQuery");

let unwrapAnalytics = `
  const sectors = secRes?.data || [];
  const states = stateRes?.data || [];
  const ministries = minRes?.data || [];
  const delays = delRes?.data || {};
`;
analyticsContent = analyticsContent.replace(/(useApiQuery\('delays-'\+filterKey, \(\) => api\.getDelayAnalytics\(filters\)\);)/, "$1\n" + unwrapAnalytics);
fs.writeFileSync(analyticsPath, analyticsContent, 'utf-8');
console.log('Patched AnalyticsPage.tsx');

// --- GEOGRAPHIC VIEW PAGE ---
let geoPath = 'src/components/geographic/GeographicViewPage.tsx';
let geoContent = fs.readFileSync(geoPath, 'utf-8');

geoContent = geoContent.replace(/const \{ data: states = \[\], (isLoading: loading.*?) \} = useApiQuery/g, "const { data: stateRes, $1 } = useApiQuery");
let unwrapGeo = `\n  const states = stateRes?.data || [];`;
geoContent = geoContent.replace(/(useApiQuery\(queryKey, \(\) => api\.getStateAnalytics\(filters\)\);)/, "$1" + unwrapGeo);
fs.writeFileSync(geoPath, geoContent, 'utf-8');
console.log('Patched GeographicViewPage.tsx');

// --- RISK MONITOR PAGE ---
let riskPath = 'src/components/risk/RiskMonitorPage.tsx';
let riskContent = fs.readFileSync(riskPath, 'utf-8');

riskContent = riskContent.replace(/const \{ data: projects = \[\], (isLoading: loading.*?) \} = useApiQuery/g, "const { data: projRes, $1 } = useApiQuery");
let unwrapRisk = `\n  const projects = projRes?.data || [];`;
riskContent = riskContent.replace(/(useApiQuery\(queryKey, \(\) => api\.getProjects\(filters, 1, 500\)\);)/, "$1" + unwrapRisk);
fs.writeFileSync(riskPath, riskContent, 'utf-8');
console.log('Patched RiskMonitorPage.tsx');
