import React from 'react';
import { AlertTriangle, RefreshCw, Loader2 } from 'lucide-react';

interface DataSectionProps {
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  children: React.ReactNode;
  minHeight?: string;
}

export const DataSection: React.FC<DataSectionProps> = ({ 
  isLoading, 
  error, 
  onRetry, 
  children,
  minHeight = 'min-h-[200px]'
}) => {
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-800 ${minHeight}`}>
        <AlertTriangle className="w-8 h-8 text-slate-400 mb-3" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded border shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center p-6 text-slate-400 ${minHeight}`}>
        <Loader2 className="w-6 h-6 animate-spin mb-2 opacity-50" />
        <span className="text-xs font-medium opacity-70">Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
};
