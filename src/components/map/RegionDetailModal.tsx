import React from 'react';
import { LocationOption } from '../../types';
import { X, MapPin, ShieldAlert, Cpu, Cloud, Activity } from 'lucide-react';
import { WeightBars } from '../common/WeightBars';
import { ConfidenceGauge } from '../common/ConfidenceGauge';

interface RegionDetailModalProps {
  location: LocationOption | null;
  onClose: () => void;
}

export const RegionDetailModal: React.FC<RegionDetailModalProps> = ({ location, onClose }) => {
  if (!location) return null;

  const mockWeights = [
    { modelId: 'nwpa', modelName: 'ECMWF HRES (NWP-A)', type: 'NWP' as const, weight: 38, previousWeight: 35, color: '#3B82F6', historicalSkill: 0.88, regimeFit: 0.85 },
    { modelId: 'ai', modelName: 'GraphCast / AIFS (AI)', type: 'AI' as const, weight: 32, previousWeight: 24, color: '#8B5CF6', historicalSkill: 0.92, regimeFit: 0.94 },
    { modelId: 'nwpb', modelName: 'GFS Global (NWP-B)', type: 'NWP' as const, weight: 18, previousWeight: 22, color: '#06B6D4', historicalSkill: 0.79, regimeFit: 0.74 },
    { modelId: 'ensemble', modelName: 'Multi-Model Ensemble', type: 'Ensemble' as const, weight: 12, previousWeight: 19, color: '#10B981', historicalSkill: 0.84, regimeFit: 0.80 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-700 text-cyan-400">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-slate-100">{location.name}</h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {location.state}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Regional Climate Diagnostic & Multi-Model Weights Analysis
            </p>
          </div>
        </div>

        {/* Grid Diagnostics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Left: Weather Regime & Current Conditions */}
          <div className="space-y-4">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Detected Weather Regime
              </span>
              <div className="text-base font-extrabold text-purple-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                {location.regime}
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Atmospheric pattern detected via 850hPa moisture flux convergence and vorticity index anomalies.
              </p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Live Parameter Metrics
              </span>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Temp</div>
                  <div className="text-sm font-bold text-amber-400">{location.currentTemp}°C</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Rainfall</div>
                  <div className="text-sm font-bold text-cyan-400">{location.currentRain}mm</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Wind</div>
                  <div className="text-sm font-bold text-emerald-400">{location.currentWind}km/h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Weights & Confidence */}
          <div className="space-y-4">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Regional Dynamic Weights
              </span>
              <WeightBars weights={mockWeights} showDetails={true} />
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <ConfidenceGauge confidence={88} modelAgreement={86} spread="Low" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
