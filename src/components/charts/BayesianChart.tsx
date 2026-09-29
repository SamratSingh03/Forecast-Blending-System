import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export const BayesianChart: React.FC = () => {
  const data = [
    { time: 'T-6h', prior: 52, observation: 58, posterior: 54 },
    { time: 'T-4h', prior: 54, observation: 68, posterior: 62 },
    { time: 'T-2h', prior: 62, observation: 76, posterior: 71 },
    { time: 'Current', prior: 71, observation: 84, posterior: 81 },
    { time: '+2h', prior: 81, observation: 89, posterior: 87 }
  ];

  return (
    <div className="w-full h-[240px] relative">
      <div className="absolute top-0 right-2 z-10 text-[10px] font-mono text-slate-400">
        Demo benchmark • Bayesian Posterior Update P(Extreme | Obs)
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          
          <XAxis dataKey="time" stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
          <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} unit="%" domain={[40, 100]} />

          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#10B981',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F8FAFC'
            }}
          />

          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

          <Line type="monotone" dataKey="prior" name="Prior Prob" stroke="#64748B" strokeWidth={1.5} strokeDasharray="3 3" />
          <Line type="monotone" dataKey="observation" name="New AWS Signal" stroke="#06B6D4" strokeWidth={2} />
          <Line type="monotone" dataKey="posterior" name="Updated Posterior" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
