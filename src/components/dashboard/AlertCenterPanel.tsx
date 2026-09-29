import React, { useState } from 'react';
import { Alert, AlertSeverity } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { BellRing, ExternalLink, Check, Trash2, ChevronRight, Sparkles } from 'lucide-react';

interface AlertCenterPanelProps {
  alerts: Alert[];
  onSelectProjectById: (projectId: string) => void;
  onMarkAsRead: (alertId: string) => void;
  onDismissAlert: (alertId: string) => void;
  onViewAllAlerts: () => void;
  id?: string;
}

export const AlertCenterPanel: React.FC<AlertCenterPanelProps> = ({
  alerts,
  onSelectProjectById,
  onMarkAsRead,
  onDismissAlert,
  onViewAllAlerts,
  id
}) => {
  const [severityFilter, setSeverityFilter] = useState<'ALL' | AlertSeverity>('ALL');

  const activeAlerts = alerts.filter((a) => !a.dismissed);
  const filteredAlerts = severityFilter === 'ALL'
    ? activeAlerts
    : activeAlerts.filter((a) => a.severity === severityFilter);

  return (
    <div id={id || 'overview-alert-center-panel'} className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col h-full text-slate-800 dark:text-slate-100 overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/70 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60">
            <BellRing className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Early Warning Center</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Automated AI anomaly escalation triggers</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-red-50 dark:bg-red-950/70 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold border border-red-200 dark:border-red-900/60 font-mono-num">
            Real-time
          </span>
        </div>
      </div>

      {/* Severity Filter Tabs */}
      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 flex items-center justify-between gap-2 text-xs">
        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Filter:</span>
        <div className="flex items-center gap-1">
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                severityFilter === sev
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px] custom-scrollbar-dark">
        {filteredAlerts.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-center text-slate-400">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">No active triggers in this category</p>
          </div>
        ) : (
          filteredAlerts.slice(0, 4).map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';
            
            return (
              <div
                key={alert.id}
                className={`p-3 bg-slate-50/90 dark:bg-slate-800/60 rounded-lg border transition-all ${
                  isCritical
                    ? 'border-red-200 dark:border-red-900/50'
                    : isHigh
                    ? 'border-amber-200 dark:border-amber-900/50'
                    : 'border-slate-200 dark:border-slate-700/60'
                } ${alert.read ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase font-mono-num ${
                        isCritical ? 'text-red-600 dark:text-red-400' : isHigh ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <span className="text-slate-400 dark:text-slate-600 text-[10px]">•</span>
                    <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold font-mono-num">
                      {alert.projectId}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[9px] text-slate-400 dark:text-slate-500 uppercase font-mono-num">
                    <span>{alert.timestamp}</span>
                    {!alert.read && (
                      <button
                        onClick={() => onMarkAsRead(alert.id)}
                        className="p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ml-1"
                        title="Mark as read"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={() => onDismissAlert(alert.id)}
                      className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Dismiss"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                  {alert.projectName}
                </h5>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                  {alert.trigger}
                </p>

                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Risk: <strong className="text-slate-900 dark:text-white font-mono-num font-bold">{alert.currentRiskScore}/100</strong>
                  </span>
                  <button
                    onClick={() => onSelectProjectById(alert.projectId)}
                    className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors uppercase tracking-wider"
                  >
                    View Analysis →
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer link */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Showing {Math.min(4, filteredAlerts.length)} of {activeAlerts.length}
        </span>
        <button
          onClick={onViewAllAlerts}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 uppercase tracking-wide"
        >
          <span>All Early Warnings</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
