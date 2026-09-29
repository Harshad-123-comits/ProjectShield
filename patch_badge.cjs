const fs = require('fs');
const path = 'src/components/common/RiskBadge.tsx';
let content = fs.readFileSync(path, 'utf-8');

content = content.replace(/id=\{id \|\| `risk-badge-\$\{level\.toLowerCase\(\)\}`\}/g, "id={id || `risk-badge-${(level || 'unknown').toLowerCase()}`}");
content = content.replace(/id=\{id \|\| `status-badge-\$\{status\.toLowerCase\(\)\}`\}/g, "id={id || `status-badge-${(status || 'unknown').toLowerCase()}`}");

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched badges.');
