const fs = require('fs');

const path = 'src/components/dashboard/OverviewDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');

content = content.replace("value={summary.totalProjects?.toLocaleString() || '0'}", "value={summary.totalProjects != null ? summary.totalProjects.toLocaleString() : 'N/A'}");
content = content.replace("value={`${Math.round(summary.averagePhysicalProgress || 0)}%`}", "value={summary.averagePhysicalProgress != null ? `${Math.round(summary.averagePhysicalProgress)}%` : 'N/A'}");
content = content.replace("value={summary.highRiskProjects?.toString() || '0'}", "value={summary.highRiskProjects != null ? summary.highRiskProjects.toString() : 'N/A'}");
content = content.replace("value={summary.delayedProjects?.toString() || '0'}", "value={summary.delayedProjects != null ? summary.delayedProjects.toString() : 'N/A'}");
content = content.replace("value={summary.completedProjects?.toString() || '0'}", "value={summary.completedProjects != null ? summary.completedProjects.toString() : 'N/A'}");
content = content.replace("if (!val) return '₹0 Cr';", "if (val == null) return 'N/A';\n    if (val === 0) return '₹0 Cr';");

fs.writeFileSync(path, content, 'utf-8');
console.log('Fixed KPI values in OverviewDashboard.tsx');
