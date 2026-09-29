import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  RefreshCw,
  Menu,
  ChevronRight,
  Shield,
  User,
  LogOut,
  SlidersHorizontal,
  FileSpreadsheet,
  Building,
  Sparkles,
  Palette
} from 'lucide-react';
import { NavTab } from './Sidebar';
import { Project, UserProfile, Alert } from '../../types';
import { ThemeSelector } from '../common/ThemeSelector';

interface HeaderProps {
  activeTab: NavTab;
  selectedProject: Project | null;
  onNavigate: (tab: NavTab) => void;
  onSelectProject: (p: Project) => void;
  projects: Project[];
  alerts: Alert[];
  userProfile: UserProfile;
  lastRefreshTime: string;
  onRefreshData: () => void;
  isRefreshing: boolean;
  onOpenMobileSidebar: () => void;
  onOpenNotifications: () => void;
  onLogout: () => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onThemeChanged?: (themeName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  selectedProject,
  onNavigate,
  onSelectProject,
  projects,
  alerts,
  userProfile,
  lastRefreshTime,
  onRefreshData,
  isRefreshing,
  onOpenMobileSidebar,
  onOpenNotifications,
  onLogout,
  isDemoMode,
  onToggleDemoMode,
  onThemeChanged
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadAlerts = alerts.filter((a) => !a.read && !a.dismissed);

  const filteredSearchResults = searchQuery.trim()
    ? projects
        .filter(
          (p) =>
            p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.agency.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Executive Overview';
      case 'projects':
        return selectedProject ? `Project Details: ${selectedProject.id}` : 'National Infrastructure Registry';
      case 'risk-monitor':
        return 'Risk Monitor & Matrix';
      case 'early-warnings':
        return 'Early Warning Center';
      case 'analytics':
        return 'Sector & Agency Analytics';
      case 'geographic':
        return 'Geographic Risk Distribution';
      case 'upload':
        return 'Import & Validate Data';
      case 'assistant':
        return 'AI Intelligence Assistant';
      case 'model-performance':
        return 'Model Evaluation & Benchmarks';
      case 'settings':
        return 'Platform Governance';
      default:
        return 'Project Monitoring';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#0C101A] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 shadow-sm transition-colors duration-150">
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          id="mobile-menu-btn"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">
            Project Monitoring {selectedProject && activeTab === 'projects' ? `• ${selectedProject.id}` : ''}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight truncate">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Right: Search, Refresh, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Search Input */}
        <div ref={searchRef} className="relative hidden md:block w-48 lg:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              id="global-project-search"
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-900/90 border border-transparent dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Quick Search Dropdown */}
          {isSearchOpen && filteredSearchResults.length > 0 && (
            <div className="absolute top-full mt-1.5 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 py-1.5 max-h-80 overflow-y-auto">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                Matching Projects ({filteredSearchResults.length})
              </div>
              {filteredSearchResults.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project);
                    onNavigate('projects');
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors flex items-center justify-between gap-2 border-b border-slate-50 dark:border-slate-800/50 last:border-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono-num">
                        {project.id}
                      </span>
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                        {project.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{project.state}</span>
                      <span>•</span>
                      <span>{project.sector}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase font-mono-num ${
                      project.riskLevel === 'CRITICAL'
                        ? 'text-red-700 bg-red-50 border border-red-200 dark:bg-red-950/70 dark:text-red-300 dark:border-red-900/60'
                        : project.riskLevel === 'HIGH'
                        ? 'text-amber-700 bg-amber-50 border border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-900/60'
                        : project.riskLevel === 'MEDIUM'
                        ? 'text-yellow-700 bg-yellow-50 border border-yellow-200 dark:bg-yellow-950/70 dark:text-yellow-300 dark:border-yellow-900/60'
                        : 'text-emerald-700 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-900/60'
                    }`}
                  >
                    {project.overallRisk}/100
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Selector */}
        <ThemeSelector onThemeChanged={onThemeChanged} />

        {/* Refresh button */}
        <button
          id="refresh-data-btn"
          onClick={onRefreshData}
          disabled={isRefreshing}
          className={`p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${
            isRefreshing ? 'animate-spin text-sky-600 dark:text-sky-400' : ''
          }`}
          title="Refresh telemetry"
          aria-label="Refresh telemetry data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notifications Button */}
        <button
          id="header-notifications-btn"
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadAlerts.length > 0 && (
            <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white font-mono-num shadow-sm">
              {unreadAlerts.length}
            </span>
          )}
        </button>

        {/* Profile */}
        <div ref={profileRef} className="relative pl-3 border-l border-slate-200 dark:border-slate-800">
          <button
            id="user-profile-menu-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 text-left group"
          >
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {userProfile.name}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {userProfile.department.includes('IPMD') ? 'MoSPI Headquarters' : userProfile.role}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-xs shadow-inner">
              {userProfile.avatar || 'AO'}
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
              <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{userProfile.name}</p>
                <p className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">{userProfile.role}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{userProfile.email}</p>
              </div>

              <div className="p-1 space-y-0.5">
                <button
                  onClick={() => {
                    onNavigate('settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-lg flex items-center gap-2.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Platform Preferences</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('upload');
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-lg flex items-center gap-2.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
                  <span>Data Ingestion</span>
                </button>
              </div>

              <div className="p-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  id="logout-btn"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg flex items-center gap-2.5 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
