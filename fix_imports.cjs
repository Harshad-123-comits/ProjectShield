const fs = require('fs');

function getFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      files_.push(name);
    }
  }
  return files_;
}

const files = getFiles('src');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;
  
  const hooks = ['useState', 'useEffect', 'useMemo', 'useCallback', 'useRef', 'useContext', 'useReducer'];
  const reactImportMatch = content.match(/import React(?:[^'"]*)from ['"]react['"];?/);
  let importStatement = reactImportMatch ? reactImportMatch[0] : '';
  
  // also check for `import { ... } from 'react'` without React
  const namedImportMatch = content.match(/import \{[^}]*\}\s*from ['"]react['"];?/);
  
  if (importStatement || namedImportMatch) {
    let baseImport = importStatement || namedImportMatch[0];
    let missingHooks = [];
    for (const hook of hooks) {
      // Very naive check for word boundary. Better: check \bhook\b
      const regex = new RegExp('\\b' + hook + '\\b');
      if (regex.test(content)) {
        if (!baseImport.includes(hook)) {
          missingHooks.push(hook);
        }
      }
    }
    
    if (missingHooks.length > 0) {
      let newImportStatement = baseImport;
      if (newImportStatement.includes('{')) {
        newImportStatement = newImportStatement.replace('{', '{ ' + missingHooks.join(', ') + ', ');
      } else {
        newImportStatement = newImportStatement.replace(/from ['"]react['"];?/, `, { ${missingHooks.join(', ')} } from 'react';`);
      }
      content = content.replace(baseImport, newImportStatement);
      fs.writeFileSync(file, content, 'utf-8');
      console.log('Fixed imports in:', file);
    }
  }
}
