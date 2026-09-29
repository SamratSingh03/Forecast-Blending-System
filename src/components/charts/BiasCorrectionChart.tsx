import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export const BiasCorrectionChart: React.FC = () => {
  const data = [
    { time: '00:00', raw: 34.0, corrected: 26.5, observed: 25.8 },
    { time: '04:00', raw: 52.0, corrected: 41.2, observed: 40.5 },
    { time: '08:00', raw: 88.0, corrected: 69.4, observed: 71.0 },
    { time: '12:00', raw: 124.0, corrected: 96.8, observed: 95.0 },
    { time: '16:00', raw: 94.0, corrected: 76.0, observed: 74.5 },
    { time: '20:00', raw: 45.0, corrected: 36.2, observed: 35.0 }
  ];

  return (
    <div className="w-full h-[240px] relative">
      <div className="absolute top-0 right-2 z-10 text-[10px] font-mono text-slate-400">
        Demo benchmark • Empirical Quantile Mapping (mm/h)
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          
          <XAxis dataKey="time" stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
          <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} unit=" mm" />

          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#06B6D4',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F8FAFC'
            }}
          />

          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

          <Area type="monotone" dataKey="raw" name="Raw AI Output (Over-predicting)" stroke="#F43F5E" fill="#F43F5E" fillOpacity={0.15} strokeDasharray="4 4" />
          <Area type="monotone" dataKey="corrected" name="Quantile Corrected" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.25} />
          <Line type="monotone" dataKey="observed" name="Observed AWS" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
