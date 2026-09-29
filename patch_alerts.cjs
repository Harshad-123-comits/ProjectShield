const fs = require('fs');
const path = 'src/components/alerts/EarlyWarningsPage.tsx';
let content = fs.readFileSync(path, 'utf-8');

content = content.replace("No alerts match filter criteria", "No verified warnings for the current data.");
content = content.replace("a.projectId.toLowerCase()", "(a.projectId || '').toLowerCase()");

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched EarlyWarningsPage.');
