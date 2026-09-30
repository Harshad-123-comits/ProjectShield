const fs = require('fs');
const path = 'src/hooks/useApiQuery.ts';
let content = fs.readFileSync(path, 'utf-8');

// Remove the unwrapping logic
content = content.replace(
  'const finalData = res && res.success !== undefined ? res.data : res;',
  'const finalData = res;'
);

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched useApiQuery.ts to stop unwrapping.');
