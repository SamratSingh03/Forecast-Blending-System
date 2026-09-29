import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, RefreshCw, Zap } from 'lucide-react';

export const AnomalyOverrideToggle: React.FC = () => {
  const { anomalyOverride, setAnomalyOverride, setSelectedRegime } = useApp();

  const handleToggle = () => {
    const nextState = !anomalyOverride;
    setAnomalyOverride(nextState);
    if (nextState) {
      setSelectedRegime('extreme');
    } else {
      setSelectedRegime('heavy_rain');
    }
  };

  return (
    <div className="space-y-4">
      {/* Control Box */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            Out-of-Distribution Anomaly Safeguard
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate an unphysical or unprecedented extreme weather event to test physics override fallback.
          </p>
        </div>

        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 shadow-lg ${
            anomalyOverride
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/50 animate-pulse'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${anomalyOverride ? 'animate-spin' : ''}`} />
          <span>{anomalyOverride ? 'OVERRIDE ACTIVE' : 'TEST ANOMALY'}</span>
        </button>
      </div>

      {/* Override Banner */}
      {anomalyOverride && (
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-2 border-rose-600 rounded-xl p-4 text-rose-200 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm uppercase tracking-wider text-rose-300">
                  ANOMALY DETECTED / OVERRIDE ACTIVE
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-900 text-rose-200 border border-rose-700">
                  Fallback: NWP Physics Baseline
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Atmospheric parameters exceed 99.9th historical percentile. AI Neural Weather Model weight automatically reduced from 38% to 10% to prevent hallucinations. ECMWF HRES NWP-A baseline strengthened to 48% with strict thermodynamic mass conservation checks.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
