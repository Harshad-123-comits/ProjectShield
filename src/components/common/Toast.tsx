import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        let borderClasses = 'border-slate-200 bg-white text-slate-800 shadow-xl';
        let Icon = Info;
        let iconColor = 'text-blue-600 bg-blue-50 border-blue-200';

        if (toast.type === 'success') {
          borderClasses = 'border-emerald-200 bg-white shadow-xl shadow-emerald-500/10';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
        } else if (toast.type === 'warning') {
          borderClasses = 'border-amber-200 bg-white shadow-xl shadow-amber-500/10';
          Icon = AlertTriangle;
          iconColor = 'text-amber-600 bg-amber-50 border-amber-200';
        } else if (toast.type === 'error') {
          borderClasses = 'border-red-200 bg-white shadow-xl shadow-red-500/10';
          Icon = AlertCircle;
          iconColor = 'text-red-600 bg-red-50 border-red-200';
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${borderClasses} transition-all duration-300 transform translate-y-0`}
          >
            <div className={`p-1.5 rounded-lg border shrink-0 ${iconColor} mt-0.5`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
