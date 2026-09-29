import React from 'react';
import { RiskLevel } from '../../types';

interface RiskGaugeProps {
  score: number; // 0 - 100
  riskLevel: RiskLevel;
  scheduleRisk?: number;
  costRisk?: number;
  size?: number; // size in px
  id?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  riskLevel,
  scheduleRisk,
  costRisk,
  size = 200,
  id
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Let's make an arc gauge or circular gauge
  const progressOffset = circumference - (score / 100) * circumference;

  let strokeColor = '#10b981'; // green
  if (score >= 80) strokeColor = '#f43f5e'; // rose-500
  else if (score >= 65) strokeColor = '#f59e0b'; // amber-500
  else if (score >= 40) strokeColor = '#eab308'; // yellow-500

  return (
    <div id={id || 'risk-gauge-container'} className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="rotate-[-90deg] transition-all duration-700" width={size} height={size}>
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-200 dark:text-slate-800"
          />
          {/* Active progress stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono-num tracking-tight">
            {score}
          </span>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
            / 100
          </span>
          <span
            className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 mt-1.5 rounded ${
              riskLevel === 'CRITICAL'
                ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/20'
                : riskLevel === 'HIGH'
                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/20'
                : riskLevel === 'MEDIUM'
                ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/20'
                : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/20'
            }`}
          >
            {riskLevel}
          </span>
        </div>
      </div>

      {/* Sub-risks breakdown if provided */}
      {(scheduleRisk !== undefined || costRisk !== undefined) && (
        <div className="mt-4 grid grid-cols-2 gap-4 w-full pt-3 border-t border-slate-200 dark:border-slate-800/80 text-center">
          {scheduleRisk !== undefined && (
            <div className="px-2">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Schedule Risk
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono-num mt-0.5">
                {scheduleRisk}%
              </div>
            </div>
          )}
          {costRisk !== undefined && (
            <div className="px-2 border-l border-slate-200 dark:border-slate-800/80">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Cost Risk
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono-num mt-0.5">
                {costRisk}%
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
