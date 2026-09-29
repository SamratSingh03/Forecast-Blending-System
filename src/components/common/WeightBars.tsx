import React from 'react';
import { DynamicWeightItem } from '../../types';
import { Cpu, Cloud, Globe, Layers } from 'lucide-react';

interface WeightBarsProps {
  weights: DynamicWeightItem[];
  showDetails?: boolean;
}

export const WeightBars: React.FC<WeightBarsProps> = ({ weights, showDetails = false }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'AI': return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
      case 'NWP': return <Cloud className="w-3.5 h-3.5 text-blue-400" />;
      default: return <Layers className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-3">
      {weights.map((w) => {
        const delta = w.weight - (w.previousWeight || w.weight);
        return (
          <div key={w.modelId} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">
                {getIcon(w.type)}
                <span>{w.modelName}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                  {w.type}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono font-bold">
                {delta !== 0 && (
                  <span className={`text-[10px] ${delta > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {delta > 0 ? `+${delta}%` : `${delta}%`}
                  </span>
                )}
                <span className="text-slate-100 dark:text-slate-100 light:text-slate-900 text-sm">
                  {w.weight}%
                </span>
              </div>
            </div>

            {/* Bar */}
            <div className="w-full bg-slate-950 dark:bg-navy-950 light:bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full transition-all duration-700 shadow-sm"
                style={{
                  width: `${w.weight}%`,
                  backgroundColor: w.color
                }}
              />
            </div>

            {showDetails && (
              <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 font-mono">
                <span>Hist. Skill: {(w.historicalSkill * 100).toFixed(0)}%</span>
                <span>Regime Fit: {(w.regimeFit * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
