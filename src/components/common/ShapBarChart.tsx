import React from 'react';
import { ShapDriver } from '../../types';
import { Info, Sparkles } from 'lucide-react';

interface ShapBarChartProps {
  drivers: ShapDriver[];
  modelSummary?: string;
  id?: string;
}

export const ShapBarChart: React.FC<ShapBarChartProps> = ({
  drivers,
  modelSummary,
  id
}) => {
  const maxImpact = Math.max(...drivers.map((d) => d.impactPercent), 1);

  return (
    <div id={id || 'shap-explainability-panel'} className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/50">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Why is this project high risk?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SHAP (SHapley Additive exPlanations) Global Feature Attribution
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase tracking-wider font-mono-num">
          XAI Engine v2.4
        </span>
      </div>

      {/* Horizontal Bar Visualizations */}
      <div className="space-y-3.5 my-5">
        {drivers.map((driver, index) => {
          const widthPercent = Math.min(100, Math.round((driver.impactPercent / maxImpact) * 100));

          let categoryColor = 'bg-sky-500';
          if (driver.category === 'Physical') categoryColor = 'bg-red-500';
          else if (driver.category === 'Administrative') categoryColor = 'bg-amber-500';
          else if (driver.category === 'Regulatory') categoryColor = 'bg-purple-500';
          else if (driver.category === 'Contractor') categoryColor = 'bg-orange-500';
          else if (driver.category === 'Financial') categoryColor = 'bg-cyan-500';
          else if (driver.category === 'Environmental') categoryColor = 'bg-emerald-500';

          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{driver.factor}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                    {driver.category}
                  </span>
                </div>
                <span className="font-mono-num font-bold text-red-600 dark:text-red-400">
                  +{driver.impactPercent}%
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${categoryColor}`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {driver.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Natural Language AI Synthesis */}
      {modelSummary && (
        <div className="p-3.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 text-xs text-sky-900 dark:text-sky-200 leading-relaxed mb-4">
          <div className="font-bold text-sky-950 dark:text-sky-100 flex items-center gap-1.5 mb-1">
            <Info className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>AI Narrative Interpretation</span>
          </div>
          {modelSummary}
        </div>
      )}

      {/* Legal & Review Disclaimer */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 italic">
        <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
        <span>
          Predictions and feature weights are model estimates based on historical project variance patterns and should support, not replace, official MoSPI project review.
        </span>
      </div>
    </div>
  );
};
