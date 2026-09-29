import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface DynamicWeightChartProps {
  data: any[];
}

export const DynamicWeightChart: React.FC<DynamicWeightChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[280px] relative">
      <div className="absolute top-0 right-2 z-10 text-[10px] font-mono text-slate-400">
        Demo benchmark • Model Weight Shift over Lead Time (%)
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          
          <XAxis dataKey="leadTime" stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
          <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} unit="%" domain={[0, 100]} />

          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#8B5CF6',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F8FAFC'
            }}
          />

          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

          <Area type="monotone" dataKey="ai" stackId="1" name="AI Model (GraphCast)" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.8} />
          <Area type="monotone" dataKey="nwpa" stackId="1" name="ECMWF (NWP-A)" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.8} />
          <Area type="monotone" dataKey="nwpb" stackId="1" name="GFS (NWP-B)" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.8} />
          <Area type="monotone" dataKey="ensemble" stackId="1" name="Ensemble" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
