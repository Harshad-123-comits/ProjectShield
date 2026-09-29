import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sun, Moon, Sparkles, Flag, Leaf, Eye, ChevronDown, Terminal } from 'lucide-react';
import { useTheme, AppTheme, ThemeOption } from '../../context/ThemeContext';

interface ThemeSelectorProps {
  onThemeChanged?: (themeName: string) => void;
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  onThemeChanged,
  compact = false
}) => {
  const { theme, setTheme, currentThemeConfig, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = (themeId: AppTheme) => {
    switch (themeId) {
      case 'clarity-light':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-600" />;
      case 'clarity-dark':
        return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
      case 'slate-light':
        return <Sun className="w-3.5 h-3.5 text-blue-600" />;
      case 'command-dark':
        return <Terminal className="w-3.5 h-3.5 text-sky-400" />;
      case 'bharat-navy':
        return <Flag className="w-3.5 h-3.5 text-amber-400" />;
      case 'emerald-forest':
        return <Leaf className="w-3.5 h-3.5 text-emerald-500" />;
      case 'high-contrast':
        return <Eye className="w-3.5 h-3.5 text-amber-300" />;
      default:
        return <Palette className="w-3.5 h-3.5 text-indigo-500" />;
    }
  };

  const handleSelect = (t: ThemeOption) => {
    setTheme(t.id);
    setIsOpen(false);
    if (onThemeChanged) {
      onThemeChanged(t.name);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      {/* Theme Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          id="theme-selector-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500 transition-all text-xs font-medium shadow-2xs"
          title="Change App Theme"
          aria-label="Theme selector"
        >
          <div className="flex items-center gap-1.5">
            {getThemeIcon(theme)}
            {!compact && (
              <span className="hidden sm:inline-block font-medium truncate max-w-[110px]">
                {currentThemeConfig.name.split(' ')[0]}
              </span>
            )}
          </div>
          <div
            className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600 shrink-0"
            style={{ backgroundColor: currentThemeConfig.colors.primary }}
          />
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-76 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 p-2 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Header */}
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold">Visual Themes</span>
              </div>
              <span className="text-[10px] font-mono-num font-semibold text-slate-500 dark:text-slate-400">
                {availableThemes.length} Schemes
              </span>
            </div>

            {/* Themes list */}
            <div className="py-1 space-y-1 max-h-80 overflow-y-auto">
              {availableThemes.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(t)}
                    className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors text-xs ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 font-semibold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 shrink-0">
                        {getThemeIcon(t.id)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-xs font-bold text-slate-900 dark:text-white">
                            {t.name}
                          </span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono-num">
                            {t.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
                          {t.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pl-2 shrink-0">
                      {/* Color Swatch */}
                      <div className="flex -space-x-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-800 shadow-2xs"
                          style={{ backgroundColor: t.colors.bg }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-800 shadow-2xs"
                          style={{ backgroundColor: t.colors.primary }}
                        />
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 ml-1" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
