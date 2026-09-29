import React from 'react';
import { Brain, AlertCircle } from 'lucide-react';

export const ModelPerformancePage: React.FC<any> = () => {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-500" />
            Model Performance
          </h2>
          <p className="text-sm text-slate-500">AI Risk Prediction Diagnostics</p>
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center">
        <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Predictive Modeling Unavailable</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          The current public-data subset does not contain sufficient historical examples or validated target labels to train and evaluate a reliable Machine Learning model. 
          <br/><br/>
          Risk analytics are currently powered by a deterministic, explainable rule-based engine.
        </p>
      </div>
    </div>
  );
};
