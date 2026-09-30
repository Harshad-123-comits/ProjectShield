const fs = require('fs');
const path = 'src/components/dashboard/OverviewDashboard.tsx';
let content = fs.readFileSync(path, 'utf-8');

const regexLoadingError = /  if \(loading\) \{[\s\S]*?  \}/;
content = content.replace(regexLoadingError, '');

const regexError = /  if \(error\) \{[\s\S]*?  \}/;
content = content.replace(regexError, '');

fs.writeFileSync(path, content, 'utf-8');
console.log('Removed global loading/error from OverviewDashboard.tsx.');
