const fs = require('fs');
const path = 'src/components/analytics/AnalyticsPage.tsx';
let content = fs.readFileSync(path, 'utf-8');

content = content.replace("if (!val) return '₹0 Cr';", "if (val == null) return 'N/A';\n    if (val === 0) return '₹0 Cr';");

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched AnalyticsPage.tsx.');
