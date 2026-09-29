import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
interface RiskTrendChartProps {
  id?: string;
  data?: any[];
}

export const RiskTrendChart: React.FC<RiskTrendChartProps> = ({ id, data = [] }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs z-50 text-white">
          <p className="font-bold text-white mb-1.5">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-amber-400">Total High-Risk:</span>
              <span className="font-mono-num font-bold text-white">{payload[0].value}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-red-400">Critical Priority:</span>
              <span className="font-mono-num font-bold text-white">{payload[1].value}</span>
            </div>
            <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-800 text-[11px]">
              <span className="text-blue-400">Cost Exposure:</span>
              <span className="font-mono-num font-semibold text-slate-200">₹{payload[0].payload.costExposureCr} Cr</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id={id || 'risk-trend-chart'} className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorHighRisk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={{ stroke: '#CBD5E1' }}
          />
          <YAxis
            domain={[0, 200]}
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={{ stroke: '#CBD5E1' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
          />
          <Area
            type="monotone"
            dataKey="totalHighRisk"
            name="High Risk Projects"
            stroke="#F59E0B"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorHighRisk)"
          />
          <Area
            type="monotone"
            dataKey="criticalRisk"
            name="Critical Priority"
            stroke="#EF4444"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCritical)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
