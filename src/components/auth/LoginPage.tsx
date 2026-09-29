import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../../types';

interface LoginPageProps {
  onLogin: (profile: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('shubham.helkar@mospi.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('Senior Project Monitoring Officer');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: 'Shubham Helkar',
      email: email || 'shubham.helkar@mospi.gov.in',
      role: role || 'Senior Project Monitoring Officer',
      department: 'Infrastructure & Project Monitoring Division (IPMD)',
      avatar: 'SH'
    });
  };

  const handleQuickDemo = (officerRole: string, officerName: string) => {
    onLogin({
      name: officerName,
      email: `${officerName.toLowerCase().replace(' ', '.')}@mospi.gov.in`,
      role: officerRole,
      department: 'Infrastructure & Project Monitoring Division (IPMD)',
      avatar: officerName.split(' ').map((n) => n[0]).join('')
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0b0f19] flex flex-col justify-center items-center p-4 relative overflow-hidden transition-colors">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-blue-100/60 dark:from-blue-950/20 to-transparent pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8 relative z-10 space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 mb-3">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            PROJECTSHIELD <span className="text-blue-600 dark:text-blue-400">AI</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Ministry of Statistics and Programme Implementation (MoSPI)
          </p>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
            <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span>SIH 2026 Problem Statement #26103</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold mb-1">
              MoSPI Official Email / ID
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@mospi.gov.in"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 font-mono-num"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold mb-1">
              Secure Passcode / SSO Token
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 mt-2"
          >
            <span>Enter MoSPI Monitoring Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Personas */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block text-center">
            One-Click Demo Officer Profiles
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemo('Senior Monitoring Officer', 'Shubham Helkar')}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 text-left transition-colors shadow-2xs"
            >
              <span className="font-bold text-slate-900 dark:text-white block text-[11px]">Shubham Helkar</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Senior MoSPI Officer</span>
            </button>
            <button
              onClick={() => handleQuickDemo('Chief Project Director', 'Dr. Rajesh Verma')}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-white dark:hover:bg-slate-800 text-left transition-colors shadow-2xs"
            >
              <span className="font-bold text-slate-900 dark:text-white block text-[11px]">Dr. Rajesh Verma</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Project Director</span>
            </button>
          </div>
        </div>

        {/* Security watermark */}
        <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-mono-num">
          Protected by Government of India IPMD Enterprise Security
        </div>
      </div>
    </div>
  );
};
