import React, { useState } from 'react';
import {
  Cpu,
  Award
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  SCHEDULE_RISK_MODELS,
  COST_OVERRUN_MODELS,
  GLOBAL_FEATURE_IMPORTANCE,
  CONFUSION_MATRIX
} from '../../data/modelPerformance';

export const ModelPerformancePage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'cost'>('schedule');

  const featureChartData = GLOBAL_FEATURE_IMPORTANCE.map((f) => ({
    name: f.feature,
    Weight: f.weight,
    category: f.category
  }));

  const activeModels = activeSubTab === 'schedule' ? SCHEDULE_RISK_MODELS : COST_OVERRUN_MODELS;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Predictive ML Model Evaluation & Benchmarking
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Standardized validation metrics, backtesting performance on 4,800+ historical MoSPI projects, and feature importance attribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Champion Model: XGBoost v2.4</span>
          </span>
        </div>
      </div>

      {/* Top High-level Metric Cards for Champion Model */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            ROC-AUC Score
          </span>
          <span className="text-xl font-bold font-mono-num text-emerald-600 dark:text-emerald-400 mt-1 block">
            0.884
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Class separation</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Model Recall
          </span>
          <span className="text-xl font-bold font-mono-num text-blue-600 dark:text-blue-400 mt-1 block">
            86.5%
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Delay detection</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Precision
          </span>
          <span className="text-xl font-bold font-mono-num text-amber-600 dark:text-amber-400 mt-1 block">
            87.4%
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Alert accuracy</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            F1 Score
          </span>
          <span className="text-xl font-bold font-mono-num text-purple-600 dark:text-purple-400 mt-1 block">
            86.9%
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Balanced harmonic</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Cost RMSE
          </span>
          <span className="text-xl font-bold font-mono-num text-slate-900 dark:text-white mt-1 block">
            ₹21.4 Cr
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Root mean squared</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Cost MAE
          </span>
          <span className="text-xl font-bold font-mono-num text-slate-900 dark:text-white mt-1 block">
            ₹14.8 Cr
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Mean absolute err</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Inference Latency
          </span>
          <span className="text-xl font-bold font-mono-num text-emerald-600 dark:text-emerald-400 mt-1 block">
            2.1 ms
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Real-time edge</span>
        </div>
      </div>

      {/* Row 1: Model Comparison Table & Confusion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Model Comparison Table */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Algorithm Benchmark Comparison</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">5-Fold cross-validation on historical MoSPI dataset</p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveSubTab('schedule')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  activeSubTab === 'schedule'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Schedule Models
              </button>
              <button
                onClick={() => setActiveSubTab('cost')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  activeSubTab === 'cost'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Cost Models
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
                  <th className="py-3 px-3">Architecture</th>
                  <th className="py-3 px-3 text-center">Type</th>
                  <th className="py-3 px-3 text-center">Accuracy</th>
                  <th className="py-3 px-3 text-center">Recall</th>
                  <th className="py-3 px-3 text-center">Precision</th>
                  <th className="py-3 px-3 text-center">F1</th>
                  <th className="py-3 px-3 text-right">Inference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono-num">
                {activeModels.map((m, idx) => (
                  <tr
                    key={m.modelName}
                    className={`transition-colors ${
                      idx === 0 ? 'bg-blue-50/50 dark:bg-blue-950/30 text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-3 font-sans flex items-center gap-1.5">
                      {idx === 0 && <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                      <span className="text-slate-900 dark:text-white">{m.modelName}</span>
                    </td>
                    <td className="py-3 px-3 text-center font-sans text-slate-500 dark:text-slate-400">{m.type}</td>
                    <td className="py-3 px-3 text-center">{(m.accuracy * 100).toFixed(1)}%</td>
                    <td className="py-3 px-3 text-center text-blue-600 dark:text-blue-400">{(m.recall * 100).toFixed(1)}%</td>
                    <td className="py-3 px-3 text-center">{(m.precision * 100).toFixed(1)}%</td>
                    <td className="py-3 px-3 text-center text-emerald-600 dark:text-emerald-400">{(m.f1Score * 100).toFixed(1)}%</td>
                    <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-400">{m.inferenceTimeMs} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confusion Matrix Visualization */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Validation Confusion Matrix</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">XGBoost on Holdout Test Set (N = 1,248)</p>
            </div>
            <span className="text-[11px] font-mono-num text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 px-2 py-0.5 rounded font-bold">
              Spec: {CONFUSION_MATRIX.specificity}
            </span>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 my-2">
            {/* True Positive */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block">
                True Positive (TP)
              </span>
              <span className="text-2xl font-bold font-mono-num text-emerald-900 dark:text-emerald-200 mt-1 block">
                {CONFUSION_MATRIX.truePositive}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">Correctly Flagged Delays</span>
            </div>

            {/* False Positive */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block">
                False Positive (FP)
              </span>
              <span className="text-2xl font-bold font-mono-num text-amber-900 dark:text-amber-200 mt-1 block">
                {CONFUSION_MATRIX.falsePositive}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">False Alarm Triggers</span>
            </div>

            {/* False Negative */}
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-center">
              <span className="text-[10px] uppercase font-bold text-red-700 dark:text-red-400 block">
                False Negative (FN)
              </span>
              <span className="text-2xl font-bold font-mono-num text-red-900 dark:text-red-200 mt-1 block">
                {CONFUSION_MATRIX.falseNegative}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">Missed Delay Risks</span>
            </div>

            {/* True Negative */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 block">
                True Negative (TN)
              </span>
              <span className="text-2xl font-bold font-mono-num text-blue-900 dark:text-blue-200 mt-1 block">
                {CONFUSION_MATRIX.trueNegative}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">Correctly Verified On-Track</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            High sensitivity ensures MoSPI officers receive proactive warning before cost escalations occur.
          </p>
        </div>
      </div>

      {/* Row 2: Global Feature Importance Attributions */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Global Feature Importance (Gain Weight)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Primary predictors driving schedule and cost overrun variance calculations
            </p>
          </div>
          <span className="text-[11px] font-mono-num text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 px-2 py-0.5 rounded font-bold">
            Tree-SHAP Attributions
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featureChartData} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={{ stroke: '#475569' }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={{ stroke: '#475569' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#FFFFFF', borderRadius: '8px', fontSize: '11px' }} />
              <Bar dataKey="Weight" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
