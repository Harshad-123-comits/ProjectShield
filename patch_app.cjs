const fs = require('fs');
const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Import ErrorBoundary
if (!content.includes('ErrorBoundary')) {
  content = content.replace("import { ToastContainer", "import { ErrorBoundary } from './components/common/ErrorBoundary';\nimport { ToastContainer");
}

// Wrap <main> content
const mainOpen = '<main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">';
content = content.replace(mainOpen, mainOpen + '\n            <ErrorBoundary>');

// Close before </main>
const mainClose = '</main>';
content = content.replace(mainClose, '            </ErrorBoundary>\n          </main>');

fs.writeFileSync(path, content, 'utf-8');
console.log('Patched App.tsx with ErrorBoundary.');
