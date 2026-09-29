import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { getExtremes } from '../services/weatherService';
import { ExtremeEventSignal } from '../types';
import { ShieldAlert, AlertTriangle, Clock, MapPin, Eye, Radio } from 'lucide-react';

export const ExtremeWeatherPage: React.FC = () => {
  const [extremes, setExtremes] = useState<ExtremeEventSignal[]>([]);

  useEffect(() => {
    getExtremes().then(setExtremes);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Simulation Safety Warning Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-500 rounded-2xl p-4 text-amber-200 shadow-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 animate-pulse" />
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-amber-300">
              SIMULATION / DEMO DATA — NOT AN OPERATIONAL ALERT
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              All severe weather threshold probabilities and warning vectors are synthetic benchmark representations for hackathon evaluation.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-700 shrink-0 hidden sm:inline">
          DISASTER SIMULATION MODE
        </span>
      </div>

      {/* 4 Visually Distinct Warning Level Cards Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800 text-cyan-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Level 1</div>
          <div className="text-lg font-extrabold mt-0.5">WATCH</div>
          <p className="text-[11px] text-slate-400 mt-1">60-70% Probability • Early Monitoring</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800 text-amber-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Level 2</div>
          <div className="text-lg font-extrabold mt-0.5">ADVISORY</div>
          <p className="text-[11px] text-slate-400 mt-1">70-80% Probability • Sector Guidance</p>
        </div>

        <div className="p-4 rounded-xl bg-orange-950/40 border border-orange-800 text-orange-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Level 3</div>
          <div className="text-lg font-extrabold mt-0.5">HIGH RISK</div>
          <p className="text-[11px] text-slate-400 mt-1">80-90% Probability • Resource Staging</p>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/60 border-2 border-rose-600 text-rose-200 animate-pulse-subtle shadow-xl shadow-rose-950/50">
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Level 4</div>
          <div className="text-lg font-extrabold mt-0.5">EXTREME</div>
          <p className="text-[11px] text-slate-300 mt-1">&gt;90% Probability • Immediate Action</p>
        </div>
      </div>

      {/* Extreme Weather Signals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {extremes.map((sig) => {
          const isExtreme = sig.level === 'EXTREME';
          return (
            <div
              key={sig.id}
              className={`p-6 rounded-2xl border transition-all relative overflow-hidden ${
                isExtreme
                  ? 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-slate-950 border-rose-600 shadow-2xl ring-1 ring-rose-500/50'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full font-mono uppercase tracking-wider ${
                  isExtreme ? 'bg-rose-600 text-white animate-pulse' : 'bg-amber-950 text-amber-300 border border-amber-700'
                }`}>
                  {sig.level} ALERT
                </span>

                <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{sig.timeline}</span>
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-slate-100 mb-2 flex items-center gap-2">
                <AlertTriangle className={`w-5 h-5 ${isExtreme ? 'text-rose-400' : 'text-amber-400'}`} />
                {sig.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {sig.description}
              </p>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans uppercase font-bold">Signal Probability</span>
                  <span className="text-base font-extrabold text-cyan-400">{sig.probability}%</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans uppercase font-bold">Expected Intensity</span>
                  <span className="text-xs font-bold text-amber-300 truncate block mt-0.5">{sig.expectedMagnitude}</span>
                </div>
              </div>

              {/* Affected Regions */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Affected Sub-Regions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sig.affectedRegions.map((reg, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {reg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Monitoring Protocol */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300 font-mono">
                <span className="font-bold text-emerald-400 block mb-1 flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Monitoring Protocol:
                </span>
                {sig.monitoringStatus}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
