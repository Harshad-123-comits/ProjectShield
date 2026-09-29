import React, { useState, useEffect } from 'react';
import { NavTab, Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { ProjectTable } from './components/projects/ProjectTable';
import { ProjectDetailPage } from './components/projects/ProjectDetailPage';
import { RiskMonitorPage } from './components/risk/RiskMonitorPage';
import { EarlyWarningsPage } from './components/alerts/EarlyWarningsPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { GeographicViewPage } from './components/geographic/GeographicViewPage';
import { DataUploadPage } from './components/upload/DataUploadPage';
import { AiAssistantPage } from './components/assistant/AiAssistantPage';
import { ModelPerformancePage } from './components/model/ModelPerformancePage';
import { SettingsPage } from './components/settings/SettingsPage';
import { LoginPage } from './components/auth/LoginPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { GlobalFilterBar, Filters } from './components/common/GlobalFilterBar';
import { Project, Alert, UserProfile } from './types';
import { api } from './services/api';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string | undefined>(undefined);
  
  const [filters, setFilters] = useState<Filters>({
    state: '',
    sector: '',
    ministry: '',
    status: '',
    riskLevel: ''
  });

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.getAlerts(filters);
        if (res.success && res.data) {
          setAlerts(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch alerts', err);
      }
    };
    fetchAlerts();
  }, [filters]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Admin',
    email: 'admin@paimana.gov.in',
    role: 'Senior Project Monitoring Officer',
    department: 'IPMD',
    avatar: 'AD'
  });

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'warning' | 'info' | 'error', title: string, message: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      title,
      message
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => dismissToast(newToast.id), 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('projects');
  };

  const handleSelectProjectById = async (projectId: string) => {
    try {
      const res = await api.getProject(projectId);
      if (res.success) {
        setSelectedProject(res.data);
        setActiveTab('projects');
      } else {
        addToast('error', 'Error', 'Project not found');
      }
    } catch (err) {
      addToast('error', 'Error', 'Failed to fetch project');
    }
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setFilters({...filters}); // Trigger re-render
      addToast('success', 'Telemetry Refreshed', 'Latest data fetched.');
    }, 900);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={(p) => { setUserProfile(p); setIsLoggedIn(true); }} />;
  }

  const unreadAlertsCount = alerts.filter((a) => !a.read && !a.dismissed).length;

  return (
    <div className="min-h-screen bg-[var(--app-bg,#0B0F17)] text-[var(--app-text,#F8FAFC)] dark:bg-[#0B0F17] dark:text-slate-100 flex flex-col antialiased selection:bg-sky-500 selection:text-white transition-colors duration-150">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        unreadAlertsCount={unreadAlertsCount}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <Header
          activeTab={activeTab}
          selectedProject={selectedProject}
          onNavigate={(tab) => setActiveTab(tab)}
          onSelectProject={handleSelectProject}
          projects={[]} // No longer passing all projects
          alerts={alerts}
          userProfile={userProfile}
          lastRefreshTime={lastRefreshTime}
          onRefreshData={handleRefreshData}
          isRefreshing={isRefreshing}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
          onLogout={() => setIsLoggedIn(false)}
          isDemoMode={isDemoMode}
          onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
        />
        
        {/* Global Filter Bar */}
        {(activeTab === 'overview' || activeTab === 'analytics' || activeTab === 'projects' || activeTab === 'risk-monitor' || activeTab === 'geographic') && !selectedProject && (
          <GlobalFilterBar filters={filters} onChange={setFilters} />
        )}

        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
            <ErrorBoundary>
          {activeTab === 'overview' && (
            <OverviewDashboard
              filters={filters}
              projects={[]}
              alerts={alerts}
              onSelectProject={handleSelectProject}
              onSelectProjectById={handleSelectProjectById}
              onNavigate={(tab) => setActiveTab(tab)}
              onMarkAlertAsRead={() => {}}
              onDismissAlert={() => {}}
            />
          )}

          {activeTab === 'projects' && (
            selectedProject ? (
              <ProjectDetailPage
                project={selectedProject}
                onBack={() => setSelectedProject(null)}
                onAskAi={() => {}}
                onAddToast={addToast}
              />
            ) : (
              <ProjectTable
                filters={filters}
                onSelectProject={handleSelectProject}
                onOpenUpload={() => setActiveTab('upload')}
              />
            )
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPage
              filters={filters}
              onSelectProject={handleSelectProject}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'risk-monitor' && (
            <RiskMonitorPage
              filters={filters}
              onSelectProject={handleSelectProject}
            />
          )}

          {activeTab === 'geographic' && (
            <GeographicViewPage
              filters={filters}
              onSelectProject={handleSelectProject}
            />
          )}

          {activeTab === 'early-warnings' && (
            <EarlyWarningsPage
              alerts={alerts}
              onSelectProjectById={handleSelectProjectById}
              onMarkAsRead={() => {}}
              onMarkAllAsRead={() => {}}
              onDismissAlert={() => {}}
              onAddToast={addToast}
            />
          )}

          {activeTab === 'assistant' && (
             <AiAssistantPage
               projects={[]}
               onSelectProjectById={handleSelectProjectById}
               initialQuery={assistantInitialQuery}
             />
          )}

          {activeTab === 'model-performance' && (
            <ModelPerformancePage />
          )}

          {activeTab === 'upload' && (
            <DataUploadPage
              onIngestProjects={() => {}}
              onAddToast={addToast}
            />
          )}
          
          {activeTab === 'settings' && (
             <SettingsPage userProfile={userProfile} onUpdateProfile={setUserProfile} onAddToast={addToast} />
          )}
                    </ErrorBoundary>
          </main>
      </div>
    </div>
  );
}
export default App;
