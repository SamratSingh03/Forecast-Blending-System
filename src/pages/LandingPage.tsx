import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Cloud, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Activity,
  Sliders,
  Globe
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActivePage, startDemo } = useApp();

  return (
    <div className="space-y-12 py-6">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-slate-900 via-navy-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl text-center">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold tracking-wide shadow-inner">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Smart India Hackathon 2026 • Disaster Management Prototype</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 leading-tight">
            Where AI Meets Physics to Build a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              More Adaptive Weather Forecast
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            An intelligent multi-model framework that dynamically blends AI, NWP, and ensemble predictions according to region, weather regime, season, and forecast lead time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActivePage('command')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={startDemo}
              className="px-6 py-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-purple-200 font-bold text-sm tracking-wide shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Watch System Demo</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Architecture Flow */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-700 text-blue-400 flex items-center justify-center mb-2">
              <Cloud className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200">1. Model Streams</span>
            <span className="text-[11px] text-slate-400 mt-1">ECMWF, GFS, AI Models, Ensembles</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-700 text-purple-400 flex items-center justify-center mb-2">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200">2. Regime Analysis</span>
            <span className="text-[11px] text-slate-400 mt-1">Monsoon, Heavy Rain, Snow, Sandstorm</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 flex items-center justify-center mb-2">
              <Sliders className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200">3. Dynamic Weighting</span>
            <span className="text-[11px] text-slate-400 mt-1">Contextual Bayesian Softmax Engine</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200">4. Hybrid Forecast</span>
            <span className="text-[11px] text-slate-400 mt-1">Physics Validated + Confidence DNA</span>
          </div>
        </div>
      </div>

      {/* Why ForecastBridge Section */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-100 uppercase tracking-wider">
            Why ForecastBridge?
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Different models perform differently under changing weather regimes. FORECASTBRIDGE dynamically decides which forecast deserves more trust in each situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-slate-100">No Blind Model Trust</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Traditional platforms rely on a single model or simple unweighted averaging. FORECASTBRIDGE evaluates historical skill matrices across 50+ weather regimes.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 text-purple-400 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-slate-100">AI + Physics Safeguards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              While AI weather models excel at short-term pattern recognition, out-of-distribution events trigger our Physics Override to revert to thermodynamic NWP baselines.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-slate-100">Full Explainability DNA</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every prediction is accompanied by a transparent decision trace: showing why ECMWF, GFS, or GraphCast was assigned specific weights.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
