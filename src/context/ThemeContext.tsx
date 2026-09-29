import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme =
  | 'clarity-light'
  | 'clarity-dark'
  | 'slate-light'
  | 'command-dark'
  | 'bharat-navy'
  | 'emerald-forest'
  | 'high-contrast';

export interface ThemeOption {
  id: AppTheme;
  name: string;
  category: 'Light' | 'Dark' | 'Specialized';
  description: string;
  colors: {
    primary: string;
    bg: string;
    surface: string;
    accent: string;
    border: string;
    text: string;
  };
  iconName: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'clarity-light',
    name: 'Clarity Astro (Light)',
    category: 'Light',
    description: 'Minimalist SaaS aesthetic with electric indigo accents, clean pure white cards, and refined typography.',
    colors: {
      primary: '#4F46E5',
      bg: '#FAFAFC',
      surface: '#FFFFFF',
      accent: '#6366F1',
      border: '#E2E8F0',
      text: '#0F172A'
    },
    iconName: 'Sparkles'
  },
  {
    id: 'clarity-dark',
    name: 'Clarity Astro (Dark)',
    category: 'Dark',
    description: 'Deep midnight slate with radiant indigo & cyan highlights, crisp micro-borders, and high-clarity telemetry.',
    colors: {
      primary: '#6366F1',
      bg: '#0A0F1D',
      surface: '#111827',
      accent: '#38BDF8',
      border: '#1E293B',
      text: '#F8FAFC'
    },
    iconName: 'Moon'
  },
  {
    id: 'slate-light',
    name: 'Executive Slate (Light)',
    category: 'Light',
    description: 'Crisp corporate slate palette with royal blue primary focus and clean, balanced white cards.',
    colors: {
      primary: '#2563EB',
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      accent: '#3B82F6',
      border: '#E2E8F0',
      text: '#0F172A'
    },
    iconName: 'Sun'
  },
  {
    id: 'command-dark',
    name: 'Command Center (Dark)',
    category: 'Dark',
    description: 'Deep navy and midnight slate surfaces with cyan telemetry highlights for 24/7 operations.',
    colors: {
      primary: '#38BDF8',
      bg: '#0B1120',
      surface: '#111C33',
      accent: '#0284C7',
      border: '#1E2E4E',
      text: '#F8FAFC'
    },
    iconName: 'Terminal'
  },
  {
    id: 'bharat-navy',
    name: 'Bharat Executive (MoSPI)',
    category: 'Dark',
    description: 'Distinguished Indian National infrastructure theme with deep navy, saffron amber & emerald.',
    colors: {
      primary: '#F59E0B',
      bg: '#071326',
      surface: '#0E223D',
      accent: '#10B981',
      border: '#1D3B63',
      text: '#FFFFFF'
    },
    iconName: 'Flag'
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Eco (Green Infra)',
    category: 'Light',
    description: 'Fresh sage and botanical emerald palette tailored for sustainable infrastructure assets.',
    colors: {
      primary: '#059669',
      bg: '#F2F8F5',
      surface: '#FFFFFF',
      accent: '#10B981',
      border: '#CFE4D9',
      text: '#064E3B'
    },
    iconName: 'Leaf'
  },
  {
    id: 'high-contrast',
    name: 'High-Contrast Terminal',
    category: 'Specialized',
    description: 'Ultra-accessible monochrome & safety amber contrast for outdoor site inspections & glare.',
    colors: {
      primary: '#FBBF24',
      bg: '#000000',
      surface: '#121212',
      accent: '#F59E0B',
      border: '#52525B',
      text: '#FFFFFF'
    },
    iconName: 'Eye'
  }
];

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  currentThemeConfig: ThemeOption;
  isDarkMode: boolean;
  availableThemes: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default theme set to clarity-light or saved theme
  const [theme, setThemeState] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('projectshield_theme');
    if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
      return saved as AppTheme;
    }
    return 'clarity-light';
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('projectshield_theme', newTheme);
  };

  const currentThemeConfig = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];
  const isDarkMode = currentThemeConfig.category === 'Dark' || currentThemeConfig.id === 'high-contrast';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.removeAttribute('data-density');
    root.classList.remove('high-density');
    
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        currentThemeConfig,
        isDarkMode,
        availableThemes: THEME_OPTIONS
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
