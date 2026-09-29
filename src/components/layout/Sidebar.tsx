import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  ShieldAlert,
  BellRing,
  BarChart3,
  MapPin,
  UploadCloud,
  Bot,
  Cpu,
  Settings,
  ShieldCheck,
  Building2,
  Radio,
  Sparkles
} from 'lucide-react';

export type NavTab =
  | 'overview'
  | 'projects'
  | 'risk-monitor'
  | 'early-warnings'
  | 'analytics'
  | 'geographic'
  | 'upload'
  | 'assistant'
  | 'model-performance'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadAlertsCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  unreadAlertsCount,
  isMobileOpen,
  onCloseMobile
}) => {
  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: string | number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2, badge: '50+' },
    { id: 'risk-monitor', label: 'Risk Monitor', icon: ShieldAlert, badge: 'Matrix' },
    { id: 'early-warnings', label: 'Early Warnings', icon: BellRing, badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'geographic', label: 'Geographic View', icon: MapPin },
    { id: 'upload', label: 'Data Upload', icon: UploadCloud },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, badge: 'AI' },
    { id: 'model-performance', label: 'Model Performance', icon: Cpu },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#070A10] text-white border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--app-sidebar-bg, #070A10)' }}
      >
        {/* Top Branding Section */}
        <div>
          <div className="p-4 sm:p-5 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/25">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5 font-sans">
                <span>PROJECTSHIELD</span>
                <span className="text-indigo-400 text-xs font-mono font-semibold">AI</span>
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold ml-10">
              MoSPI | SIH 2026
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="py-2.5 text-sm font-medium overflow-y-auto max-h-[calc(100vh-210px)] custom-scrollbar-dark">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-5 py-2.5 transition-colors text-left ${
                    isActive
                      ? 'bg-indigo-500/15 text-indigo-400 border-r-3 border-indigo-500 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="truncate text-xs sm:text-sm">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono-num ml-2 shrink-0 ${
                        item.id === 'early-warnings' && unreadAlertsCount > 0
                          ? 'bg-rose-500 text-white'
                          : isActive
                          ? 'bg-indigo-950/90 text-indigo-300 border border-indigo-700/60'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / System Status */}
        <div className="p-4 mt-auto border-t border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-2 text-[11px] mb-1 text-slate-300 uppercase font-bold tracking-tight">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            <span className="text-slate-200">System Operational</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span>MoSPI Central IPMD</span>
            <span className="font-mono-num font-medium text-slate-400">SIH26103</span>
          </div>
        </div>
      </aside>
    </>
  );
};
