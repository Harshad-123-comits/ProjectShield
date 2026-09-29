import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export const CostScheduleScatter: React.FC<any> = ({
  projects,
  onSelectProject,
  id
}) => {
  const data = projects.map((p: any) => {
    // Map backend data to visual representation
    // Assuming costOverrunPercentage is numeric (0-100+)
    const x = Math.min(100, Math.max(0, p.costOverrunPercentage || (p.riskScore / 2))); 
    
    // Calculate a rough schedule delay percentage for visual purposes
    let y = 0;
    if (p.originalEndDate && p.revisedEndDate) {
      const orig = new Date(p.originalEndDate).getTime();
      const rev = new Date(p.revisedEndDate).getTime();
      const delay = rev - orig;
      // Assuming a 2 year project, 1 year delay is 50%
      y = Math.min(100, Math.max(0, (delay / (365 * 24 * 60 * 60 * 1000)) * 50));
    }
    if (y === 0 && p.riskScore > 0) y = p.riskScore / 1.5;

    return {
      x,
      y,
      z: p.riskScore,
      id: p.projectCode,
      name: p.projectName,
      state: p.state,
      sector: p.sector,
      cost: p.revisedCost,
      riskLevel: p.riskLevel,
      originalProject: p
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs max-w-xs z-50 text-white">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
            <span className="font-mono-num font-bold text-blue-400">{p.id}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                p.riskLevel === 'CRITICAL'
                  ? 'bg-red-500/20 text-red-300'
                  : p.riskLevel === 'HIGH'
                  ? 'bg-amber-500/20 text-amber-300'
                  : p.riskLevel === 'MEDIUM'
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}
            >
              {p.riskLevel}
            </span>
          </div>
          <p className="font-semibold text-white leading-tight mb-2">{p.name}</p>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 mb-2">
            <div>
              <span className="text-slate-400 block">Schedule Delay:</span>
              <span className="font-mono-num font-bold text-red-400">{Math.round(p.y)}%</span>
            </div>
            <div>
              <span className="text-slate-400 block">Cost Overrun:</span>
              <span className="font-mono-num font-bold text-amber-400">{Math.round(p.x)}%</span>
            </div>
            <div>
              <span className="text-slate-400 block">State:</span>
              <span className="text-slate-200">{p.state}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Sector:</span>
              <span className="text-slate-200">{p.sector}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id={id || 'cost-schedule-risk-scatter'} className="relative w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            type="number"
            dataKey="x"
            name="Cost Overrun"
            domain={[0, 100]}
            unit="%"
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            axisLine={{ stroke: '#475569' }}
            label={{ value: 'Cost Overrun (%)', position: 'insideBottom', offset: -12, fill: '#94A3B8', fontSize: 11 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Schedule Delay"
            domain={[0, 100]}
            unit="%"
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            axisLine={{ stroke: '#475569' }}
            label={{ value: 'Schedule Delay Proxy (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#94A3B8', fontSize: 11 }}
          />
          <ZAxis type="number" dataKey="z" range={[60, 240]} />
          
          <ReferenceLine x={50} stroke="#64748B" strokeDasharray="4 4" />
          <ReferenceLine y={50} stroke="#64748B" strokeDasharray="4 4" />

          <Tooltip content={<CustomTooltip />} />
          
          <Scatter
            name="Infrastructure Projects"
            data={data}
            onClick={(entry) => {
              if (entry && entry.originalProject) {
                onSelectProject(entry.originalProject);
              }
            }}
            cursor="pointer"
            shape={(props: any) => {
              const { cx, cy, payload } = props;
              let fill = '#10B981';
              if (payload.riskLevel === 'CRITICAL') fill = '#EF4444';
              else if (payload.riskLevel === 'HIGH') fill = '#F59E0B';
              else if (payload.riskLevel === 'MEDIUM') fill = '#EAB308';

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={payload.riskLevel === 'CRITICAL' ? 7 : 5.5}
                  fill={fill}
                  fillOpacity={0.9}
                  stroke="#1E293B"
                  strokeWidth={payload.riskLevel === 'CRITICAL' ? 2 : 1.5}
                  className="transition-all hover:scale-150 hover:fill-opacity-100"
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
