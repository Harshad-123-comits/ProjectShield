import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavTab } from '../layout/Sidebar';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

export const SectionNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  let currentTab: NavTab = 'overview';
  const path = location.pathname;
  if (path.startsWith('/projects')) currentTab = 'projects';
  else if (path.startsWith('/risk')) currentTab = 'risk';
  else if (path.startsWith('/gis')) currentTab = 'gis';
  else if (path.startsWith('/reports')) currentTab = 'reports';
  else if (path.startsWith('/cost')) currentTab = 'cost';
  else if (path.startsWith('/progress')) currentTab = 'progress';
  else if (path.startsWith('/sector')) currentTab = 'sector';
  else if (path.startsWith('/ministry')) currentTab = 'ministry';
  else if (path.startsWith('/trends')) currentTab = 'trends';
  else if (path.startsWith('/settings')) currentTab = 'settings';

  const onNavigate = (tab: NavTab) => {
    if (tab === 'overview') navigate(`/?${searchParams.toString()}`);
    else navigate(`/${tab}?${searchParams.toString()}`);
  };

  const tabsInOrder: { id: NavTab; label: string }[] = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'projects', label: 'Project Portfolio' },
    { id: 'risk', label: 'Risk & Early Warning' },
    { id: 'gis', label: 'Geographic Intelligence' },
    
    { id: 'cost', label: 'Cost & Financial' },
    { id: 'progress', label: 'Schedule & Progress' },
    { id: 'sector', label: 'Sector Analysis' },
    { id: 'ministry', label: 'Ministry Analysis' },
    { id: 'trends', label: 'Reporting Trends' }
  ];

  const currentIndex = tabsInOrder.findIndex(t => t.id === currentTab);
  if (currentIndex === -1) return null;

  const prevTab = currentIndex > 0 ? tabsInOrder[currentIndex - 1] : null;
  const nextTab = currentIndex < tabsInOrder.length - 1 ? tabsInOrder[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 mt-8">
      <div>
        {prevTab ? (
          <button
            onClick={() => onNavigate(prevTab.id)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Previous</span>
              <span>{prevTab.label}</span>
            </div>
          </button>
        ) : (
          <div className="px-4 py-2 opacity-0">Placeholder</div>
        )}
      </div>

      <div className="text-xs font-medium text-slate-400 dark:text-slate-500">
        Section {currentIndex + 1} of {tabsInOrder.length}
      </div>

      <div>
        {nextTab ? (
          <button
            onClick={() => onNavigate(nextTab.id)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transition-colors"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Next</span>
              <span>{nextTab.label}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="px-4 py-2 opacity-0">Placeholder</div>
        )}
      </div>
    </div>
  );
};
