const fs = require('fs');

// 1. Sidebar.tsx
let sidebarPath = 'src/components/layout/Sidebar.tsx';
let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
sidebarContent = sidebarContent.replace(/\|\s*'reports'/g, '');
sidebarContent = sidebarContent.replace(/\{\s*id:\s*'reports',\s*label:\s*'Reports & Export',\s*icon:\s*FileText\s*\},?/g, '');
fs.writeFileSync(sidebarPath, sidebarContent, 'utf8');
console.log('Sidebar patched');

// 2. SectionNavigation.tsx
let navPath = 'src/components/common/SectionNavigation.tsx';
let navContent = fs.readFileSync(navPath, 'utf8');
navContent = navContent.replace(/\{\s*id:\s*'reports',\s*label:\s*'Reports & Export'\s*\},?/g, '');
fs.writeFileSync(navPath, navContent, 'utf8');
console.log('SectionNavigation patched');

// 3. App.tsx
let appPath = 'src/App.tsx';
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/,\s*'\/reports'/g, '');
appContent = appContent.replace(/else if \(path\.startsWith\('\/reports'\)\) activeTab = 'reports';/g, '');
fs.writeFileSync(appPath, appContent, 'utf8');
console.log('App patched');

// 4. AnalyticsPage.tsx
let analyticsPath = 'src/components/analytics/AnalyticsPage.tsx';
let analyticsContent = fs.readFileSync(analyticsPath, 'utf8');
analyticsContent = analyticsContent.replace(/case 'reports':[\s\S]*?(?=default:)/, '');
fs.writeFileSync(analyticsPath, analyticsContent, 'utf8');
console.log('AnalyticsPage patched');
