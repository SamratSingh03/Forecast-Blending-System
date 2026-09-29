import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { PipelineStepper } from '../components/common/PipelineStepper';
import { BiasCorrectionChart } from '../components/charts/BiasCorrectionChart';
import { BayesianChart } from '../components/charts/BayesianChart';
import { PhysicsValidationCard } from '../components/lab/PhysicsValidationCard';
import { AnomalyOverrideToggle } from '../components/lab/AnomalyOverrideToggle';
import { DataSourcesStatus } from '../components/lab/DataSourcesStatus';
import { getPipelineStages, getPhysicsChecks } from '../services/weatherService';
import { PipelineStageInfo, PhysicsCheckItem } from '../types';
import { GitCommit, Play, Cpu, ShieldCheck, Database, Sliders, CheckCircle2 } from 'lucide-react';

export const PipelineModelLabPage: React.FC = () => {
  const [pipelineStages, setPipelineStages] = useState<PipelineStageInfo[]>([]);
  const [physicsChecks, setPhysicsChecks] = useState<PhysicsCheckItem[]>([]);
  const [activeStageStep, setActiveStageStep] = useState<number>(4); // Default Stage 4 Dynamic Weights
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeLabTab, setActiveLabTab] = useState<'bias' | 'bayesian' | 'physics' | 'anomaly' | 'datasources'>('physics');

  useEffect(() => {
    getPipelineStages().then(setPipelineStages);
    getPhysicsChecks().then(setPhysicsChecks);
  }, []);

  const runSimulation = () => {
    setIsSimulating(true);
    setActiveStageStep(1);
    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current > 9) {
        clearInterval(interval);
        setIsSimulating(false);
      } else {
        setActiveStageStep(current);
      }
    }, 1500); // 1.5s per stage
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
            Architectural Engine Inspection
          </div>
          <h2 className="text-2xl font-black text-slate-100 uppercase tracking-wider">
            Pipeline & Model Lab
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Interactive 9-stage data processing pipeline and model sandbox for bias correction, Bayesian updates, physics validation, and anomaly override testing.
          </p>
        </div>

        {/* Run Simulation CTA */}
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 shrink-0 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isSimulating ? 'Simulating Pipeline...' : 'Run Full Pipeline Simulation'}</span>
        </button>
      </div>

      {/* 9-Stage Interactive Pipeline Stepper */}
      <Card title="9-Stage Multi-Model Blending Pipeline" subtitle="Click any stage to view purpose, inputs, processing algorithm, output & technology stack">
        <PipelineStepper 
          stages={pipelineStages} 
          currentStep={activeStageStep}
          onSelectStage={(stg) => setActiveStageStep(stg.id)}
          isSimulating={isSimulating}
        />
      </Card>

      {/* Model Lab Sandbox Sub-Tabs */}
      <Card 
        title="Model Lab Experimental Sandbox" 
        subtitle="Interactive verification of algorithms & data pipeline health"
      >
        {/* Lab Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'physics', label: 'Physics Validation', icon: ShieldCheck },
            { id: 'bias', label: 'Quantile Bias Correction', icon: Cpu },
            { id: 'bayesian', label: 'Bayesian Updating', icon: Sliders },
            { id: 'anomaly', label: 'Anomaly Override Test', icon: GitCommit },
            { id: 'datasources', label: 'Data Sources Status', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeLabTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLabTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive 
                    ? 'bg-cyan-500 text-slate-950 shadow-lg font-extrabold' 
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-900 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Physics Validation */}
        {activeLabTab === 'physics' && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
              <span className="font-bold text-emerald-400 block mb-1">Physics Safeguard System:</span>
              Ensures data-driven neural AI predictions strictly conform to thermodynamic conservation of mass, energy, and hydrostatic balance.
            </div>
            <PhysicsValidationCard checks={physicsChecks} />
          </div>
        )}

        {/* Tab 2: Quantile Bias Correction */}
        {activeLabTab === 'bias' && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
              <span className="font-bold text-cyan-400 block mb-1">Empirical Quantile Mapping (EQM):</span>
              Corrects raw AI neural model over-estimation of extreme convective precipitation spikes against AWS station observations.
            </div>
            <BiasCorrectionChart />
          </div>
        )}

        {/* Tab 3: Bayesian Updating */}
        {activeLabTab === 'bayesian' && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
              <span className="font-bold text-purple-400 block mb-1">Bayesian Probability Updating:</span>
              P(Extreme | AWS Radar Signal) dynamically updates prior climatological probabilities as live Doppler radar data arrives.
            </div>
            <BayesianChart />
          </div>
        )}

        {/* Tab 4: Anomaly Override Test */}
        {activeLabTab === 'anomaly' && (
          <AnomalyOverrideToggle />
        )}

        {/* Tab 5: Data Sources Status */}
        {activeLabTab === 'datasources' && (
          <DataSourcesStatus />
        )}
      </Card>

    </div>
  );
};
