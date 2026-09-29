import React, { useState, useMemo } from 'react';
import {
  BellRing,
  Search,
  CheckCheck,
  Trash2,
  ExternalLink,
  Send
} from 'lucide-react';
import { Alert, AlertSeverity } from '../../types';
import { RiskBadge } from '../common/RiskBadge';

interface EarlyWarningsPageProps {
  alerts: Alert[];
  onSelectProjectById: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismissAlert: (id: string) => void;
  onAddToast: (type: 'success' | 'warning' | 'info', title: string, message: string) => void;
}

export const EarlyWarningsPage: React.FC<EarlyWarningsPageProps> = ({
  alerts,
  onSelectProjectById,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismissAlert,
  onAddToast
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<'ALL' | AlertSeverity>('ALL');
  const [selectedReadStatus, setSelectedReadStatus] = useState<'ALL' | 'UNREAD' | 'READ'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const activeAlerts = useMemo(() => alerts.filter((a) => !a.dismissed), [alerts]);

  const filteredAlerts = useMemo(() => {
    return activeAlerts.filter((a) => {
      const matchSearch =
        !searchQuery ||
        a.projectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.details.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSeverity = selectedSeverity === 'ALL' || a.severity === selectedSeverity;
      const matchRead =
        selectedReadStatus === 'ALL' ||
        (selectedReadStatus === 'UNREAD' && !a.read) ||
        (selectedReadStatus === 'READ' && a.read);

      return matchSearch && matchSeverity && matchRead;
    });
  }, [activeAlerts, searchQuery, selectedSeverity, selectedReadStatus]);

  const unreadCount = activeAlerts.filter((a) => !a.read).length;

  const handleEscalate = (alert: Alert) => {
    onAddToast(
      'warning',
      'Escalation Notice Dispatched',
      `Emergency review triggered for ${alert.projectId} (${alert.projectName}). MoSPI Oversight Committee notified.`
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
              <BellRing className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Automated Early Warning & Escalation Center
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time multi-factor anomaly triggers identifying variance gaps before formal contractor milestone breaches.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <CheckCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Mark All Read ({unreadCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search alert triggers, project ID, details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          {/* Quick Severity Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedSeverity === sev
                    ? sev === 'CRITICAL'
                      ? 'bg-red-600 text-white shadow-xs'
                      : sev === 'HIGH'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : sev === 'MEDIUM'
                      ? 'bg-yellow-600 text-white shadow-xs'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Read Status Sub-Filter */}
        <div className="flex items-center gap-4 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            Status Filter:
          </span>
          <div className="flex items-center gap-2">
            {(['ALL', 'UNREAD', 'READ'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedReadStatus(status)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  selectedReadStatus === status
                    ? 'bg-slate-800 dark:bg-blue-600 text-white font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-slate-400 shadow-sm">
            <BellRing className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No alerts match filter criteria</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try broadening your search or clearing filters</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-xl border transition-all duration-200 ${
                alert.read
                  ? 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-2xs'
                  : 'bg-white dark:bg-[#111827] border-blue-400 dark:border-blue-500/80 shadow-sm ring-1 ring-blue-400/20 dark:ring-blue-500/20'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    <RiskBadge level={alert.severity} size="md" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-num text-xs font-bold text-blue-600 dark:text-blue-400">
                        {alert.projectId}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {alert.projectName}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                      {alert.trigger}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed max-w-4xl">
                      {alert.details}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span>
                        Current Risk Score:{' '}
                        <strong className="text-slate-900 dark:text-white font-mono-num font-bold">
                          {alert.currentRiskScore}/100
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        Timestamp: <strong className="text-slate-700 dark:text-slate-300 font-mono-num">{alert.timestamp}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2 self-end md:self-start shrink-0 pt-1">
                  <button
                    onClick={() => handleEscalate(alert)}
                    className="px-2.5 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Escalate to MoSPI</span>
                  </button>

                  <button
                    onClick={() => onSelectProjectById(alert.projectId)}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  {!alert.read && (
                    <button
                      onClick={() => onMarkAsRead(alert.id)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      title="Mark as Read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => onDismissAlert(alert.id)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Dismiss Alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
