import React from 'react';
import { RiskLevel, ProjectStatus } from '../../types';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', id }) => {
  let colorClasses = '';
  let dotColor = '';

  switch (level) {
    case 'CRITICAL':
      colorClasses = 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/70 dark:text-red-300 dark:border-red-900/60';
      dotColor = 'bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.5)]';
      break;
    case 'HIGH':
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-900/60';
      dotColor = 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]';
      break;
    case 'MEDIUM':
      colorClasses = 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950/70 dark:text-yellow-300 dark:border-yellow-900/60';
      dotColor = 'bg-yellow-500';
      break;
    case 'LOW':
    default:
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-900/60';
      dotColor = 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]';
      break;
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-bold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-bold tracking-tight',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold tracking-tight'
  }[size];

  return (
    <span
      id={id || `risk-badge-${level.toLowerCase()}`}
      className={`inline-flex items-center rounded-lg border ${colorClasses} ${sizeClasses} whitespace-nowrap`}
    >
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      <span>{level}</span>
    </span>
  );
};

export const StatusBadge: React.FC<{ status: ProjectStatus; id?: string }> = ({ status, id }) => {
  let statusText = '';
  let badgeStyle = '';

  switch (status) {
    case 'ON_TRACK':
      statusText = 'ON TRACK';
      badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-900/60';
      break;
    case 'AT_RISK':
      statusText = 'AT RISK';
      badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-900/60';
      break;
    case 'DELAYED':
      statusText = 'DELAYED';
      badgeStyle = 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/70 dark:text-red-300 dark:border-red-900/60';
      break;
    case 'COMPLETED':
      statusText = 'COMPLETED';
      badgeStyle = 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/70 dark:text-sky-300 dark:border-sky-900/60';
      break;
  }

  return (
    <span
      id={id || `status-badge-${status.toLowerCase()}`}
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${badgeStyle} whitespace-nowrap uppercase tracking-wider`}
    >
      {statusText}
    </span>
  );
};
