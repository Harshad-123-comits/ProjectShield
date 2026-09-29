import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  id?: string;
  title: string;
  value: string | number;
  trend?: string;
  isPositiveTrend?: boolean; // e.g. for high risk, increase is bad (red)
  comparisonLabel?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'critical' | 'high' | 'warning' | 'success' | 'blue';
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  id,
  title,
  value,
  trend,
  isPositiveTrend,
  comparisonLabel = 'vs last month',
  icon: Icon,
  variant = 'default',
  onClick
}) => {
  let valueColor = 'text-slate-900 dark:text-slate-100';
  let iconBg = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60';

  if (variant === 'critical') {
    valueColor = 'text-red-600 dark:text-red-400';
    iconBg = 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/60';
  } else if (variant === 'high' || variant === 'warning') {
    valueColor = 'text-amber-600 dark:text-amber-400';
    iconBg = 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/60';
  } else if (variant === 'success') {
    valueColor = 'text-emerald-600 dark:text-emerald-400';
    iconBg = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60';
  } else if (variant === 'blue') {
    valueColor = 'text-slate-900 dark:text-slate-100';
    iconBg = 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/60';
  }

  return (
    <div
      id={id || `kpi-${title.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick}
      className={`bg-white dark:bg-[#111827] p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5' : ''
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">
            {title}
          </p>
          {Icon && (
            <div className={`p-1.5 rounded-lg ${iconBg} shrink-0`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight font-mono-num ${valueColor}`}>
            {value}
          </h3>
          {trend && (
            <span
              className={`text-xs font-bold font-mono-num ${
                isPositiveTrend ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      </div>

      {comparisonLabel && (
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-2 truncate">
          {comparisonLabel}
        </p>
      )}
    </div>
  );
};
