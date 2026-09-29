import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { getRegimes } from '../services/weatherService';
import { WeatherRegimeInfo } from '../types';
import { CloudLightning, Activity, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const WeatherRegimePage: React.FC = () => {
  const { selectedRegime, setSelectedRegime } = useApp();
  const [regimes, setRegimes] = useState<WeatherRegimeInfo[]>([]);

  useEffect(() => {
    getRegimes().then(setRegimes);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <CloudLightning className="w-3.5 h-3.5 text-purple-400" />
            Synoptic Classification Engine
          </div>
          <h2 className="text-2xl font-black text-slate-100 uppercase tracking-wider">
            Atmospheric Weather Regimes
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Detects synoptic weather patterns in real-time from 850hPa moisture flux, CAPE, geopotential height, and aerosol radar fields.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="flex items-center gap-2 text-[11px] font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0">
          <span className="text-purple-300 font-bold">Regime Detection</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-cyan-300 font-bold">Model Trust Adjustment</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-300 font-bold">Blended Forecast</span>
        </div>
      </div>

      {/* Grid of Regimes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regimes.map((reg) => {
          const isSelected = selectedRegime === reg.id;
          return (
            <div
              key={reg.id}
              onClick={() => setSelectedRegime(reg.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-purple-950/90 via-slate-900 to-slate-950 border-purple-500 shadow-2xl ring-2 ring-purple-500/50 scale-[1.02]'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                    isSelected ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {reg.confidence}% Detection Confidence
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Freq: {reg.historicalFrequency}%
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-100 mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  {reg.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {reg.description}
                </p>

                {/* Detection Factors */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Detection Criteria:
                  </span>
                  {reg.detectionFactors.map((df, i) => (
                    <div key={i} className="bg-slate-950 p-2 rounded border border-slate-800 text-[11px] flex items-center justify-between">
                      <span className="text-slate-300 truncate max-w-[180px]">{df.factor}</span>
                      <span className="font-mono font-bold text-cyan-400">{(df.score * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Model Preference Box */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed font-mono">
                <span className="font-bold text-purple-400 block mb-1">Model Trust Adjustment:</span>
                {reg.recommendedModelPreference}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
