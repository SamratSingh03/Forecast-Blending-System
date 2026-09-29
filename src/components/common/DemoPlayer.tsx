import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Pause, 
  Square, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  Layers
} from 'lucide-react';

export const DemoPlayer: React.FC = () => {
  const { 
    isDemoPlaying, 
    demoStep, 
    pauseDemo, 
    startDemo, 
    stopDemo, 
    nextDemoStep, 
    prevDemoStep 
  } = useApp();

  if (demoStep === 0 && !isDemoPlaying) return null;

  const stageTitles = [
    "Overview & Setup",
    "Stage 01-02: Multi-Model Ingestion & Skill Analysis",
    "Stage 03: Synoptic Weather Regime Detection",
    "Stage 04: Contextual Dynamic Model Weighting",
    "Stage 05: AI + NWP Weighted Blending Engine",
    "Stage 06-07: Bias Correction & Physics Verification",
    "Stage 08: Multi-Tiered Confidence & Explainability DNA",
    "Stage 09: Hazard Threshold Check & Extreme Alerting",
    "Final ForecastBridge Decision Support Package"
  ];

  const progressPercent = Math.round((demoStep / 8) * 100);

  return (
    <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl bg-slate-950/95 dark:bg-navy-950/95 light:bg-slate-900/95 backdrop-blur-xl border border-purple-500/50 shadow-2xl shadow-purple-950/80 rounded-2xl p-3 text-slate-100 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Top Banner Bar */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-purple-900/80 border border-purple-600 text-purple-300">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                SYSTEM DEMO MODE
              </span>
              <span className="text-[10px] bg-purple-950 text-purple-400 border border-purple-800 px-1.5 py-0.5 rounded font-mono font-semibold">
                Step {demoStep} / 8
              </span>
            </div>
            <p className="text-xs font-semibold text-cyan-300 tracking-wide truncate max-w-sm sm:max-w-md">
              {stageTitles[demoStep] || stageTitles[0]}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevDemoStep}
            disabled={demoStep <= 1}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40"
            title="Previous Stage"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {isDemoPlaying ? (
            <button
              onClick={pauseDemo}
              className="p-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold"
              title="Pause Guided Tour"
            >
              <Pause className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={startDemo}
              className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold"
              title="Resume Guided Tour"
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
          )}

          <button
            onClick={nextDemoStep}
            disabled={demoStep >= 8}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40"
            title="Next Stage"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={stopDemo}
            className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 ml-1"
            title="Exit Demo Mode"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
        <div 
          className="bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

    </div>
  );
};
