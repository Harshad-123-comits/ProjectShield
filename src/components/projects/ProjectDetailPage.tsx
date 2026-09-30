import React, { useState } from 'react';
import { ArrowLeft, MapPin, Building, Target, IndianRupee, Clock, AlertTriangle, MessageSquare, ShieldAlert, CheckCircle2, TrendingDown, Home, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Link, useSearchParams } from 'react-router-dom';

export const ProjectDetailPage: React.FC<any> = ({ project, onBack }) => {
  const [searchParams] = useSearchParams();
  const backLink = `/projects?${searchParams.toString()}`;

  // Graceful fallbacks for missing data
  const progressGap = (project.plannedProgress || 0) - (project.physicalProgress || 0);
  const costEscalationCr = (project.revisedCost || 0) - (project.originalCost || 0);
  const currentEscalationPct = project.originalCost > 0 ? ((costEscalationCr / project.originalCost) * 100).toFixed(1) : 0;
  
  const riskTrajectoryData = project.monthlyProgress || [];
  
  const costData = [
    { stage: 'Original Sanctioned', cost: project.originalCost || 0, fill: '#3b82f6' },
    { stage: 'Current Revised', cost: project.revisedCost || 0, fill: '#f59e0b' },
    { stage: 'Expenditure', cost: project.expenditure || 0, fill: '#10b981' }
  ];

  const formatDate = (d: any) => d ? new Date(d).toLocaleDateString() : 'N/A';

  return (
    <div className="space-y-6 pb-8">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to={`/?${searchParams.toString()}`} className="inline-flex items-center text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white">
              <Home className="w-4 h-4 mr-2" />
              Overview
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <Link to={backLink} className="ml-1 text-slate-700 hover:text-blue-600 md:ml-2 dark:text-slate-300 dark:hover:text-white">Projects</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="ml-1 text-slate-400 md:ml-2">{project.projectCode}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
        <Link to={backLink} className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-xs font-bold mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Registry
        </Link>
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono-num font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded text-sm">{project.projectCode}</span>
              <span className={`px-2 py-1 rounded text-xs font-bold ${project.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{project.riskLevel} RISK</span>
              <span className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-700">{project.status}</span>
            </div>
            <h1 className="text-2xl font-bold">{project.projectName}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
               <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/>{project.state || 'N/A'}</div>
               <div className="flex items-center gap-1.5"><Building className="w-4 h-4"/>{project.ministry || 'N/A'}</div>
               <div className="flex items-center gap-1.5"><Target className="w-4 h-4"/>{project.sector || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: KPI Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
             <h3 className="font-bold flex items-center gap-2"><IndianRupee className="w-4 h-4"/> Cost Profile</h3>
             <div className="flex justify-between border-b pb-2">
               <span className="text-slate-500 text-sm">Original</span>
               <span className="font-bold">₹{project.originalCost?.toLocaleString()} Cr</span>
             </div>
             <div className="flex justify-between border-b pb-2">
               <span className="text-slate-500 text-sm">Revised</span>
               <span className="font-bold">₹{project.revisedCost?.toLocaleString()} Cr</span>
             </div>
             <div className="flex justify-between border-b pb-2">
               <span className="text-slate-500 text-sm">Expenditure</span>
               <span className="font-bold">₹{project.expenditure?.toLocaleString()} Cr</span>
             </div>
             <div className="flex justify-between text-red-600">
               <span className="text-sm font-bold">Overrun</span>
               <span className="font-bold">₹{costEscalationCr.toLocaleString()} Cr ({currentEscalationPct}%)</span>
             </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
             <h3 className="font-bold flex items-center gap-2"><Clock className="w-4 h-4"/> Schedule</h3>
             <div className="flex justify-between border-b pb-2">
               <span className="text-slate-500 text-sm">Original End Date</span>
               <span className="font-bold">{formatDate(project.originalEndDate)}</span>
             </div>
             <div className="flex justify-between border-b pb-2">
               <span className="text-slate-500 text-sm">Revised End Date</span>
               <span className="font-bold">{formatDate(project.revisedEndDate)}</span>
             </div>
             <div className="flex justify-between border-b pb-2">
               <span className="text-slate-500 text-sm">Physical Progress</span>
               <span className="font-bold">{project.physicalProgress}%</span>
             </div>
          </div>
        </div>

        {/* Right Col: Charts & Explainability */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500"/> Risk Analysis Engine</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                   <div className="text-xs text-slate-500 mb-1">Overall Risk Score</div>
                   <div className="text-3xl font-bold text-red-600">{project.riskScore} <span className="text-sm text-slate-400 font-normal">/ 100</span></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Detected Risk Factors</div>
                {project.riskReasons?.length > 0 ? (
                  project.riskReasons.map((reason: string, i: number) => (
                    <div key={i} className="flex gap-2 items-start p-2 rounded bg-red-50 text-red-800 text-sm">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-2 items-start p-2 rounded bg-green-50 text-green-800 text-sm">
                     <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                     <span>No significant risk factors detected based on current telemetry.</span>
                  </div>
                )}
             </div>
           </div>

           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold mb-4">Cost Comparison (Crores)</h3>
             <div className="h-48">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={costData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="stage" />
                   <YAxis />
                   <RechartsTooltip />
                   <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                     {costData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.fill} />
                     ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </div>
           
           {!project.monthlyProgress && (
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center py-8">
               <TrendingDown className="w-8 h-8 text-slate-300 mx-auto mb-2" />
               <h3 className="font-bold text-slate-700">No Historical Timeseries Available</h3>
               <p className="text-sm text-slate-500 mt-1">The imported PAIMANA dataset does not contain historical reporting month data for this project.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
