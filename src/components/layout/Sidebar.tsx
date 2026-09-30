import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  ShieldAlert,
  BarChart3,
  MapPin,
  FileText,
  IndianRupee,
  Clock,
  Building2,
  Landmark,
  TrendingUp,
  Radio,
  Settings
} from 'lucide-react';

export type NavTab =
  | 'overview'
  | 'projects'
  | 'risk'
  | 'gis'
  
  | 'cost'
  | 'progress'
  | 'sector'
  | 'ministry'
  | 'trends'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  unreadAlertsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isMobileOpen,
  onCloseMobile,
  unreadAlertsCount = 0
}) => {
  const mainNavItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Project Portfolio', icon: FolderGit2 },
    { id: 'risk', label: 'Risk & Early Warning', icon: ShieldAlert, badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined },
    { id: 'gis', label: 'Geographic Intelligence', icon: MapPin },
    
  ];

  const analysisItems = [
    { id: 'cost', label: 'Cost & Financial', icon: IndianRupee },
    { id: 'progress', label: 'Schedule & Progress', icon: Clock },
    { id: 'sector', label: 'Sector Analysis', icon: Building2 },
    { id: 'ministry', label: 'Ministry Analysis', icon: Landmark },
    { id: 'trends', label: 'Reporting Trends', icon: TrendingUp }
  ];

  const bottomItems = [
    { id: 'settings', label: 'Platform Settings', icon: Settings }
  ];

  const renderNavList = (items: any[]) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <li key={item.id}>
            <button
              onClick={() => {
                onTabChange(item.id as NavTab);
                if (window.innerWidth < 1024) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-400'
                  }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono-num ml-2 shrink-0 ${
                    item.id === 'risk' && unreadAlertsCount > 0
                      ? 'bg-rose-500 text-white'
                      : 'bg-indigo-500/20 text-indigo-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#070A10] text-white border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 pb-4">
          {/* Logo Section */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <Radio className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5 font-sans">
                  <span>PROJECTSHIELD</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="px-4 space-y-6">
            {/* Main Navigation */}
            <div>
              <div className="px-3 mb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Main</p>
              </div>
              {renderNavList(mainNavItems)}
            </div>
            
            {/* Analysis Navigation */}
            <div>
              <div className="px-3 mb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Analysis</p>
              </div>
              {renderNavList(analysisItems)}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800/80 bg-[#070A10]">
          {renderNavList(bottomItems)}
        </div>
      </aside>
    </>
  );
};
