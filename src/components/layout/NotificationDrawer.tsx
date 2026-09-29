import React from 'react';
import { X, Check, BellRing, ExternalLink, Trash2 } from 'lucide-react';
import { Alert } from '../../types';
import { RiskBadge } from '../common/RiskBadge';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: Alert[];
  onMarkAsRead: (alertId: string) => void;
  onMarkAllAsRead: () => void;
  onDismissAlert: (alertId: string) => void;
  onSelectProjectById: (projectId: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismissAlert,
  onSelectProjectById
}) => {
  if (!isOpen) return null;

  const activeAlerts = alerts.filter((a) => !a.dismissed);
  const unreadCount = activeAlerts.filter((a) => !a.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0E1524] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col text-slate-800 dark:text-slate-100">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#0E1524]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
                <BellRing className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Early Warning Alerts
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {unreadCount} unread • {activeAlerts.length} total active triggers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold px-2 py-1 rounded-md hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Alerts List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeAlerts.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <BellRing className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">All caught up</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">No active early warning triggers pending</p>
              </div>
            ) : (
              activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    alert.read
                      ? 'bg-slate-50/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      : 'bg-white dark:bg-slate-900 border-sky-200 dark:border-sky-800/80 shadow-sm ring-1 ring-sky-500/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <RiskBadge level={alert.severity} size="sm" />
                      <span className="text-[11px] font-mono-num text-sky-600 dark:text-sky-400 font-bold">
                        {alert.projectId}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono-num">
                      {alert.timestamp}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2 leading-snug">
                    {alert.projectName}
                  </h4>

                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 font-medium leading-relaxed">
                    {alert.trigger}
                  </p>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {alert.details}
                  </p>

                  <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectProjectById(alert.projectId);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                    >
                      <span>View Project Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {!alert.read && (
                        <button
                          onClick={() => onMarkAsRead(alert.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onDismissAlert(alert.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Dismiss alert"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
