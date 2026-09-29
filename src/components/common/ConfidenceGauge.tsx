import React from 'react';
import { ShieldCheck, Layers, AlertTriangle } from 'lucide-react';

interface ConfidenceGaugeProps {
  confidence: number;
  modelAgreement: number;
  spread: 'Low' | 'Medium' | 'High';
}

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({
  confidence,
  modelAgreement,
  spread
}) => {
  const radius = 42;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 85) return '#10B981'; // Emerald
    if (val >= 70) return '#06B6D4'; // Cyan
    if (val >= 50) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  return (
    <div className="flex flex-col items-center justify-center p-3">
      {/* Gauge Circle */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-800 dark:text-slate-800 light:text-slate-200"
            fill="transparent"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={getColor(confidence)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold font-mono tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900">
            {confidence}%
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Confidence
          </span>
        </div>
      </div>

      {/* Sub Metrics */}
      <div className="w-full grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800 text-center text-xs">
        <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-medium">Model Consensus</div>
          <div className="font-mono font-bold text-cyan-400">{modelAgreement}%</div>
        </div>
        <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-medium">Ensemble Spread</div>
          <div className={`font-mono font-bold ${
            spread === 'Low' ? 'text-emerald-400' : spread === 'Medium' ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {spread} Variance
          </div>
        </div>
      </div>
    </div>
  );
};
