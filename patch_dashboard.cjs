const fs = require('fs');
const path = 'src/components/dashboard/OverviewDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');

// 1. Add error state
content = content.replace(
  "const [loading, setLoading] = useState(true);",
  "const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<string | null>(null);"
);

// 2. Set error state to null on fetch start
content = content.replace(
  "setLoading(true);",
  "setLoading(true);\n      setError(null);"
);

// 3. Catch error condition
const catchBlock = "      } catch (err) {\n        console.error('Error fetching dashboard analytics:', err);\n        setError('Analytics temporarily unavailable because the data service is unavailable.');\n      } finally {";
content = content.replace(
  /      \} catch \(err\) \{\n        console\.error\('Error fetching dashboard analytics:', err\);\n      \} finally \{/,
  catchBlock
);

// 4. Handle sumRes success check
const apiCallBlock = `        const [sumRes, riskRes, statusRes, topRiskRes, covRes, monthlyRes] = await Promise.all([
          api.getSummaryAnalytics(filters),
          api.getRiskAnalytics(filters),
          api.getStatusAnalytics(filters),
          api.getHighRiskProjects(filters),
          api.getCoverage(),
          api.getMonthlyAnalytics(filters)
        ]);`;
const newApiCallBlock = apiCallBlock + `
        
        if (sumRes.errorCode === 'DATABASE_UNAVAILABLE' || sumRes.success === false) {
          setError('Analytics temporarily unavailable because the data service is unavailable.');
          return;
        }`;
content = content.replace(apiCallBlock, newApiCallBlock);

// 5. Add error UI rendering
const loadingUI = '  if (loading) {\n    return <div className="p-8 text-center text-slate-500">Loading live telemetry...</div>;\n  }';
const errorUI = loadingUI + `\n\n  if (error) {\n    return (\n      <div className="p-12 text-center">\n        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-4">\n          <AlertTriangle className="w-8 h-8" />\n        </div>\n        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Service Unavailable</h3>\n        <p className="text-slate-500 dark:text-slate-400">{error}</p>\n      </div>\n    );\n  }`;
content = content.replace(loadingUI, errorUI);

// 6. Fix KPI 0s
content = content.replace("value={summary.totalProjects?.toLocaleString() || '0'}", "value={summary.totalProjects != null ? summary.totalProjects.toLocaleString() : 'N/A'}");
content = content.replace("value={`${Math.round(summary.averagePhysicalProgress || 0)}%`}", "value={summary.averagePhysicalProgress != null ? `${Math.round(summary.averagePhysicalProgress)}%` : 'N/A'}");
content = content.replace("value={summary.highRiskProjects?.toString() || '0'}", "value={summary.highRiskProjects != null ? summary.highRiskProjects.toString() : 'N/A'}");
content = content.replace("value={summary.delayedProjects?.toString() || '0'}", "value={summary.delayedProjects != null ? summary.delayedProjects.toString() : 'N/A'}");
content = content.replace("value={summary.completedProjects?.toString() || '0'}", "value={summary.completedProjects != null ? summary.completedProjects.toString() : 'N/A'}");
content = content.replace("if (!amount) return '₹0 Cr';", "if (amount == null) return 'N/A';\n    if (amount === 0) return '₹0 Cr';");

if (!content.includes('AlertTriangle')) {
  content = content.replace("import {", "import { AlertTriangle,");
}

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched correctly.');
