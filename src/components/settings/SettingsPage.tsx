import React, { useState } from 'react';
import {
  Settings,
  User,
  Sliders,
  Save,
  Palette,
  Check,
  Sun,
  Moon,
  Flag,
  Leaf,
  Sparkles,
  Eye,
  Terminal
} from 'lucide-react';
import { UserProfile } from '../../types';
import { useTheme, AppTheme, ThemeOption } from '../../context/ThemeContext';

interface SettingsPageProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onAddToast: (type: 'success' | 'warning' | 'info', title: string, message: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  userProfile,
  onUpdateProfile,
  onAddToast
}) => {
  const { theme, setTheme, availableThemes, currentThemeConfig } = useTheme();
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [criticalThreshold, setCriticalThreshold] = useState<number>(80);
  const [highThreshold, setHighThreshold] = useState<number>(65);
  const [progressGapThreshold, setProgressGapThreshold] = useState<number>(15);
  const [emailDigest, setEmailDigest] = useState<boolean>(true);
  const [smsUrgentAlerts, setSmsUrgentAlerts] = useState<boolean>(true);

  const handleSave = () => {
    onUpdateProfile(profile);
    onAddToast(
      'success',
      'Settings Saved',
      'Platform preferences, theme settings and early-warning trigger thresholds updated successfully.'
    );
  };

  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme.id);
    onAddToast(
      'info',
      'Theme Applied',
      `Switched visual appearance to ${newTheme.name}`
    );
  };

  const getThemeIcon = (themeId: AppTheme) => {
    switch (themeId) {
      case 'clarity-light':
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
      case 'clarity-dark':
        return <Moon className="w-4 h-4 text-indigo-400" />;
      case 'slate-light':
        return <Sun className="w-4 h-4 text-blue-600" />;
      case 'command-dark':
        return <Terminal className="w-4 h-4 text-sky-400" />;
      case 'bharat-navy':
        return <Flag className="w-4 h-4 text-amber-400" />;
      case 'emerald-forest':
        return <Leaf className="w-4 h-4 text-emerald-500" />;
      case 'high-contrast':
        return <Eye className="w-4 h-4 text-amber-300" />;
      default:
        return <Palette className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Platform Configuration & Governance Settings
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure automated risk threshold triggers, visual themes, and MoSPI officer preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 self-end md:self-center"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* Theme & Visual Appearance Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Appearance & Visual Themes</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visual presentation schemes for surveillance dashboards, executive reviews, and field audits.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-num font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
              Active: <span className="text-blue-600 dark:text-blue-400 font-bold">{currentThemeConfig.name}</span>
            </span>
          </div>
        </div>

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {availableThemes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => handleThemeChange(t)}
                className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                        {getThemeIcon(t.id)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                        <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                          {t.category}
                        </span>
                      </div>
                    </div>

                    {isSelected ? (
                      <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400 hover:text-blue-600">
                        Select
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {t.description}
                  </p>
                </div>

                {/* Color Palette Micro-preview */}
                <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Palette:</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-md border border-slate-300 dark:border-slate-700 shadow-2xs"
                      style={{ backgroundColor: t.colors.bg }}
                      title="Background"
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-md border border-slate-300 dark:border-slate-700 shadow-2xs"
                      style={{ backgroundColor: t.colors.surface }}
                      title="Surface"
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-md border border-slate-300 dark:border-slate-700 shadow-2xs"
                      style={{ backgroundColor: t.colors.primary }}
                      title="Primary Brand"
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-md border border-slate-300 dark:border-slate-700 shadow-2xs"
                      style={{ backgroundColor: t.colors.accent }}
                      title="Accent"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Officer Profile */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">MoSPI Officer Profile</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold mb-1">
                Designation & Role
              </label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold mb-1">
                Department / Ministry Division
              </label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold mb-1">
                Official Government Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 font-mono-num"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Predictive Alert Threshold Tuning */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Sliders className="w-4 h-4 text-red-600 dark:text-red-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Automated Risk Threshold Calibration</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Critical Risk Trigger Score</span>
                <span className="font-mono-num font-bold text-red-600 dark:text-red-400">{criticalThreshold} / 100</span>
              </div>
              <input
                type="range"
                min="70"
                max="95"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                className="w-full accent-red-600 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-700 dark:text-slate-300 font-medium">High Risk Trigger Score</span>
                <span className="font-mono-num font-bold text-amber-600 dark:text-amber-400">{highThreshold} / 100</span>
              </div>
              <input
                type="range"
                min="50"
                max="75"
                value={highThreshold}
                onChange={(e) => setHighThreshold(Number(e.target.value))}
                className="w-full accent-amber-600 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Progress Deficit Trigger</span>
                <span className="font-mono-num font-bold text-blue-600 dark:text-blue-400">{progressGapThreshold}% Gap</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={progressGapThreshold}
                onChange={(e) => setProgressGapThreshold(Number(e.target.value))}
                className="w-full accent-blue-600 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="block text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
                Notification Channels
              </span>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailDigest}
                  onChange={(e) => setEmailDigest(e.target.checked)}
                  className="rounded accent-blue-600"
                />
                <span>Send Daily Executive MoSPI Early-Warning Digest</span>
              </label>

              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsUrgentAlerts}
                  onChange={(e) => setSmsUrgentAlerts(e.target.checked)}
                  className="rounded accent-blue-600"
                />
                <span>Urgent SMS & Flash Alerts for Critical Escalations</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
