import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { NavTab, Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { ProjectTable } from './components/projects/ProjectTable';
import { ProjectDetailPage } from './components/projects/ProjectDetailPage';
import { RiskMonitorPage } from './components/risk/RiskMonitorPage';
import { EarlyWarningsPage } from './components/alerts/EarlyWarningsPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { SectionNavigation } from './components/common/SectionNavigation';

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
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string | undefined>(undefined);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const filters: Filters = {
    state: searchParams.get('state') || '',
    sector: searchParams.get('sector') || '',
    ministry: searchParams.get('ministry') || '',
    status: searchParams.get('status') || '',
    riskLevel: searchParams.get('riskLevel') || ''
  };

  const setFilters = (newFilters: Filters) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value as string);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  // Derive activeTab from pathname
  let activeTab: NavTab = 'overview';
  const path = location.pathname;
  if (path.startsWith('/projects')) activeTab = 'projects';
  else if (path.startsWith('/risk')) activeTab = 'risk';
  else if (path.startsWith('/gis')) activeTab = 'gis';
  
  else if (path.startsWith('/cost')) activeTab = 'cost';
  else if (path.startsWith('/progress')) activeTab = 'progress';
  else if (path.startsWith('/sector')) activeTab = 'sector';
  else if (path.startsWith('/ministry')) activeTab = 'ministry';
  else if (path.startsWith('/trends')) activeTab = 'trends';
  else if (path.startsWith('/settings')) activeTab = 'settings';

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
  }, [searchParams]);

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
    navigate(`/projects/${project.id}?${searchParams.toString()}`);
  };

  const handleNavigateTab = (tab: NavTab) => {
    if (tab === 'overview') navigate(`/?${searchParams.toString()}`);
    else navigate(`/${tab}?${searchParams.toString()}`);
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setSearchParams(new URLSearchParams(searchParams)); // Trigger re-render
      addToast('success', 'Telemetry Refreshed', 'Latest data fetched.');
    }, 900);
  };

  // Reset selectedProject when not on project detail route
  useEffect(() => {
    const match = location.pathname.match(/^\/projects\/([^/]+)$/);
    if (!match && selectedProject) {
      setSelectedProject(null);
    } else if (match && !selectedProject) {
      // Need to fetch project detail
      const fetchProject = async () => {
        try {
          const res = await api.getProject(match[1]);
          if (res.success) {
            setSelectedProject(res.data);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchProject();
    }
  }, [location.pathname]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={(p) => { setUserProfile(p); setIsLoggedIn(true); }} />;
  }

  const unreadAlertsCount = alerts.filter((a) => !a.read && !a.dismissed).length;

  const showGlobalFilter = !location.pathname.startsWith('/projects/') && !location.pathname.startsWith('/settings');

  return (
    <div className="min-h-screen bg-[var(--app-bg,#0B0F17)] text-[var(--app-text,#F8FAFC)] dark:bg-[#0B0F17] dark:text-slate-100 flex flex-col antialiased selection:bg-sky-500 selection:text-white transition-colors duration-150">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <Sidebar
        activeTab={activeTab}
        onTabChange={handleNavigateTab}
        unreadAlertsCount={unreadAlertsCount}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <Header
          activeTab={activeTab}
          selectedProject={selectedProject}
          onNavigate={handleNavigateTab}
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
        {showGlobalFilter && (
          <GlobalFilterBar filters={filters} onChange={setFilters} />
        )}

        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={
                <>
                  <OverviewDashboard filters={filters} onSelectProject={handleSelectProject} onNavigate={handleNavigateTab} />
                  <SectionNavigation currentTab={activeTab} onNavigate={handleNavigateTab} />
                </>
              } />
              
              <Route path="/projects" element={
                <>
                  <ProjectTable filters={filters} onSelectProject={handleSelectProject} />
                  <SectionNavigation currentTab={activeTab} onNavigate={handleNavigateTab} />
                </>
              } />
              
              <Route path="/projects/:id" element={
                selectedProject && <ProjectDetailPage project={selectedProject} onBack={() => navigate(`/projects?${searchParams.toString()}`)} onAddToast={addToast} />
              } />

              <Route path="/risk" element={
                <>
                  <RiskMonitorPage filters={filters} onSelectProject={handleSelectProject} />
                  <SectionNavigation currentTab={activeTab} onNavigate={handleNavigateTab} />
                </>
              } />

              <Route path="/gis" element={
                <>
                  <GeographicViewPage filters={filters} onSelectProject={handleSelectProject} />
                  <SectionNavigation currentTab={activeTab} onNavigate={handleNavigateTab} />
                </>
              } />

              {['/cost', '/progress', '/sector', '/ministry', '/trends'].map(path => (
                <Route key={path} path={path} element={
                  <>
                    <AnalyticsPage filters={filters} activeTab={activeTab} onSelectProject={handleSelectProject} onNavigate={handleNavigateTab} />
                    <SectionNavigation currentTab={activeTab} onNavigate={handleNavigateTab} />
                  </>
                } />
              ))}

              <Route path="/settings" element={
                <SettingsPage userProfile={userProfile} onUpdateProfile={setUserProfile} onAddToast={addToast} />
              } />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
export default App;
