import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ModelForecastPoint, WeatherVariable } from '../../types';

interface ForecastChartProps {
  data: ModelForecastPoint[];
  variable: WeatherVariable;
  showObserved?: boolean;
  showUncertainty?: boolean;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({
  data,
  variable,
  showObserved = true,
  showUncertainty = true
}) => {
  const getUnit = () => {
    switch (variable) {
      case 'rainfall': return 'mm/h';
      case 'temperature': return '°C';
      case 'wind': return 'km/h';
    }
  };

  const getLabel = () => {
    switch (variable) {
      case 'rainfall': return 'Precipitation Intensity';
      case 'temperature': return '2m Air Temperature';
      case 'wind': return '10m Wind Speed';
    }
  };

  return (
    <div className="w-full h-[340px] relative">
      <div className="absolute top-0 right-2 z-10 text-[10px] font-mono text-slate-400">
        Demo benchmark • {getLabel()} ({getUnit()})
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          
          <XAxis 
            dataKey="time" 
            stroke="#64748B" 
            tick={{ fontSize: 11, fill: '#94A3B8' }}
          />
          
          <YAxis 
            stroke="#64748B" 
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            unit={` ${getUnit()}`}
          />

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

          {/* Uncertainty Band */}
          {showUncertainty && (
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="#06B6D4"
              fillOpacity={0.15}
              name="Uncertainty Range"
            />
          )}

          {/* Individual Model Lines */}
          <Line
            type="monotone"
            dataKey="nwpa"
            name="ECMWF (NWP-A)"
            stroke="#3B82F6"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="nwpb"
            name="GFS (NWP-B)"
            stroke="#06B6D4"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="ai"
            name="GraphCast / AIFS (AI)"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="ensemble"
            name="Multi-Model Ensemble"
            stroke="#10B981"
            strokeWidth={1.5}
            strokeDasharray="2 2"
            dot={false}
          />

          {/* ForecastBridge Blended Line - Thickest & Highlighted */}
          <Line
            type="monotone"
            dataKey="blended"
            name="FORECASTBRIDGE Blended"
            stroke="#06B6D4"
            strokeWidth={3.5}
            dot={{ r: 4, fill: '#06B6D4' }}
          />

          {/* Observed Points if available */}
          {showObserved && (
            <Line
              type="monotone"
              dataKey="observed"
              name="Observed AWS"
              stroke="#F43F5E"
              strokeWidth={2}
              dot={{ r: 5, fill: '#F43F5E' }}
              connectNulls={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
