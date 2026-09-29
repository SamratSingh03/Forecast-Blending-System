import React from 'react';
import { Card } from '../components/common/Card';
import { ConfidenceGauge } from '../components/common/ConfidenceGauge';
import { ShieldCheck, Activity, Dna, GitCommit, CheckCircle2, ArrowRight } from 'lucide-react';

export const ConfidenceExplainabilityPage: React.FC = () => {
  const factorContributions = [
    { factor: "Historical Model Skill (30-Day)", percentage: 35, color: "#3B82F6", description: "Evaluated RMSE & Threat score across lead times." },
    { factor: "Synoptic Weather Regime Fit", percentage: 25, color: "#8B5CF6", description: "Match with active convective moisture convergence regime." },
    { factor: "Regional Climatological Alignment", percentage: 18, color: "#06B6D4", description: "Odisha coastal topography micro-climate adjustment." },
    { factor: "Forecast Lead Time Decay", percentage: 12, color: "#10B981", description: "Lead time 6h gives higher weight to high-resolution AI." },
    { factor: "Recent 72h AWS Station Verification", percentage: 10, color: "#F59E0B", description: "Rolling bias correction against station surface sensors." }
  ];

  const decisionTrace = [
    { step: "01", time: "T-00:15m", title: "Multi-Model Data Ingest Complete", text: "Successfully parsed ECMWF HRES GRIB2, GFS, and AIFS tensor fields." },
    { step: "02", time: "T-00:10m", title: "Heavy Rainfall Regime Confirmed (87%)", text: "Moisture flux convergence anomaly triggers short-lead convective ruleset." },
    { step: "03", time: "T-00:05m", title: "Dynamic Weights Calculated", text: "GraphCast AI assigned 38%, ECMWF 32%, GFS 18%, Ensemble 12%." },
    { step: "04", time: "T-00:02m", title: "Physics Validation Passed", text: "Thermodynamic mass conservation & dewpoint non-exceedance checks validated." },
    { step: "05", time: "Current", title: "Blended Intelligence Dispatched", text: "Final forecast generated with 88.4% confidence score." }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Transparent Explainability Engine
          </div>
          <h2 className="text-2xl font-black text-slate-100 uppercase tracking-wider">
            Confidence & Explainable Forecast DNA
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Break down exactly why ForecastBridge trusts each model prediction with mathematical factor contributions and auditable decision traces.
          </p>
        </div>

        {/* Diagram: Models -> Agreement -> Confidence */}
        <div className="flex items-center gap-2 text-[11px] font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0">
          <span className="text-blue-300 font-bold">4 Model Streams</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-purple-300 font-bold">Inter-Model Agreement</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-300 font-bold">Confidence Score</span>
        </div>
      </div>

      {/* Main Grid: Gauge + DNA Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (4 cols): Confidence Score Gauge */}
        <div className="lg:col-span-4 space-y-6">
          <Card title="Multi-Tiered Confidence Index" subtitle="Probabilistic consensus evaluation">
            <ConfidenceGauge confidence={88} modelAgreement={86} spread="Low" />
          </Card>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <span className="font-bold text-slate-200 block uppercase tracking-wider">
              High vs Low Confidence Guide:
            </span>
            <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300 leading-relaxed">
              <strong className="block mb-0.5 text-emerald-200">High Confidence (&gt;80%):</strong>
              High inter-model consensus between physics NWP and AI neural predictions. Low ensemble spread variance.
            </div>
            <div className="p-2.5 rounded bg-amber-950/40 border border-amber-800 text-amber-300 leading-relaxed">
              <strong className="block mb-0.5 text-amber-200">Low Confidence (&lt;60%):</strong>
              Significant divergence between NWP dynamics and AI models. Triggering Physics Override fallback.
            </div>
          </div>
        </div>

        {/* Right (8 cols): Explainable Forecast DNA Contribution Breakdown */}
        <div className="lg:col-span-8 space-y-6">
          <Card 
            title="Explainable Forecast DNA Breakdown" 
            subtitle="Mathematical weighting factor contributions to final prediction trust"
          >
            <div className="space-y-4">
              {factorContributions.map((fc, i) => (
                <div key={i} className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-200 flex items-center gap-2">
                      <Dna className="w-4 h-4 text-cyan-400" />
                      {fc.factor}
                    </span>
                    <span className="font-mono text-sm" style={{ color: fc.color }}>
                      {fc.percentage}% Contribution
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="h-full rounded-full transition-all duration-700" 
                      style={{ width: `${fc.percentage * 2.5}%`, backgroundColor: fc.color }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono pt-1">
                    {fc.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>

      {/* Decision Trace Timeline */}
      <Card title="Auditable Decision Trace Timeline" subtitle="Plain-language execution log for every forecast step">
        <div className="relative border-l-2 border-slate-800 pl-6 ml-4 space-y-6">
          {decisionTrace.map((dt, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Marker Circle */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900 shadow-md group-hover:scale-125 transition-transform" />

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                    <span className="font-mono text-cyan-400 font-extrabold">{dt.step}.</span>
                    {dt.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {dt.time}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {dt.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};
