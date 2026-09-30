const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

const importsToAdd = `
import { SectionNavigation } from './components/common/SectionNavigation';
`;

content = content.replace("import { AnalyticsPage } from './components/analytics/AnalyticsPage';", "import { AnalyticsPage } from './components/analytics/AnalyticsPage';" + importsToAdd);

const regex = /\{activeTab === 'overview' && \([\s\S]*?\{activeTab === 'settings' && \(/m;
const replacement = `
          {activeTab === 'overview' && (
            <>
              <OverviewDashboard filters={filters} onSelectProject={handleSelectProject} onNavigate={setActiveTab} />
              <SectionNavigation currentTab={activeTab} onNavigate={setActiveTab} />
            </>
          )}

          {activeTab === 'projects' && (
            selectedProject ? (
              <ProjectDetailPage project={selectedProject} onBack={() => setSelectedProject(null)} onAddToast={addToast} />
            ) : (
              <>
                <ProjectTable filters={filters} onSelectProject={handleSelectProject} />
                <SectionNavigation currentTab={activeTab} onNavigate={setActiveTab} />
              </>
            )
          )}

          {activeTab === 'risk' && (
            <>
              <RiskMonitorPage filters={filters} onSelectProject={handleSelectProject} />
              <SectionNavigation currentTab={activeTab} onNavigate={setActiveTab} />
            </>
          )}

          {activeTab === 'gis' && (
            <>
              <GeographicViewPage filters={filters} onSelectProject={handleSelectProject} />
              <SectionNavigation currentTab={activeTab} onNavigate={setActiveTab} />
            </>
          )}
          
          {(activeTab === 'cost' || activeTab === 'progress' || activeTab === 'sector' || activeTab === 'ministry' || activeTab === 'trends' || activeTab === 'reports') && (
            <>
              <AnalyticsPage filters={filters} activeTab={activeTab} onSelectProject={handleSelectProject} onNavigate={setActiveTab} />
              <SectionNavigation currentTab={activeTab} onNavigate={setActiveTab} />
            </>
          )}

          {activeTab === 'settings' && (
`;

content = content.replace(regex, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log('App.tsx patched!');
