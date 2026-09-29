const fs = require('fs');
const path = 'src/components/layout/Header.tsx';
let content = fs.readFileSync(path, 'utf-8');

content = content.replace(/p\.id\.toLowerCase\(\)/g, "(p.id || '').toLowerCase()");
content = content.replace(/p\.name\.toLowerCase\(\)/g, "(p.name || '').toLowerCase()");
content = content.replace(/p\.state\.toLowerCase\(\)/g, "(p.state || '').toLowerCase()");
content = content.replace(/p\.sector\.toLowerCase\(\)/g, "(p.sector || '').toLowerCase()");
content = content.replace(/p\.agency\.toLowerCase\(\)/g, "(p.agency || '').toLowerCase()");

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched Header.tsx.');
