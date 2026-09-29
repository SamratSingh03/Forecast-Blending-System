import React from 'react';
import { PipelineStageInfo } from '../../types';
import { CheckCircle2, Circle, ArrowRight, Play } from 'lucide-react';

interface PipelineStepperProps {
  stages: PipelineStageInfo[];
  currentStep?: number;
  onSelectStage?: (stage: PipelineStageInfo) => void;
  compact?: boolean;
  onRunSimulation?: () => void;
  isSimulating?: boolean;
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({
  stages,
  currentStep = 9,
  onSelectStage,
  compact = false,
  onRunSimulation,
  isSimulating = false
}) => {
  if (compact) {
    return (
      <div className="w-full bg-slate-900/90 dark:bg-navy-900/90 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl p-3 shadow-md">
        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              9-Stage Intelligence Pipeline
            </span>
          </div>
          {onRunSimulation && (
            <button
              onClick={onRunSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 text-[11px] font-semibold transition-all"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isSimulating ? 'Processing...' : 'Run Simulation'}</span>
            </button>
          )}
        </div>

        {/* Compact Horizontal Steps */}
        <div className="flex items-center justify-between overflow-x-auto py-1 gap-1 no-scrollbar">
          {stages.map((stg) => {
            const isActive = stg.id === currentStep;
            const isCompleted = stg.id < currentStep || currentStep === 9;
            return (
              <div
                key={stg.id}
                onClick={() => onSelectStage && onSelectStage(stg)}
                className={`flex-1 min-w-[75px] flex flex-col items-center text-center p-1.5 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'bg-cyan-950/80 border border-cyan-500 shadow-md scale-105'
                    : 'bg-slate-950/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <span className={`text-[10px] font-mono font-bold px-1 rounded ${
                    isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {stg.stepNumber}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-300 truncate max-w-[70px] leading-tight">
                  {stg.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Expanded View for Pipeline & Model Lab Page
  return (
    <div className="space-y-3">
      {stages.map((stg) => {
        const isActive = stg.id === currentStep;
        return (
          <div
            key={stg.id}
            onClick={() => onSelectStage && onSelectStage(stg)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-cyan-950/90 to-slate-900 border-cyan-500 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-500/50'
                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                  isActive 
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' 
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {stg.stepNumber}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    {stg.title}
                    {isActive && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 font-mono">
                        ACTIVE STAGE
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {stg.purpose}
                  </p>
                </div>
              </div>
            </div>

            {/* Inputs & Output Info when active */}
            {isActive && (
              <div className="mt-3 pt-3 border-t border-cyan-900/60 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Stage Inputs
                  </span>
                  <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                    {stg.inputs.map((inp, idx) => (
                      <li key={idx} className="truncate">{inp}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Processing Algorithm
                  </span>
                  <p className="text-cyan-300 text-[11px] font-mono leading-tight">
                    {stg.processing}
                  </p>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Stage Output & Tech
                  </span>
                  <p className="text-emerald-400 text-[11px] font-semibold mb-1">
                    {stg.output}
                  </p>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Tech: {stg.keyTech}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
