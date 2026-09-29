import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { getReferences } from '../services/weatherService';
import { ReferenceItem } from '../types';
import { BookOpen, Shield, Globe, Award, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ImpactReferencesPage: React.FC = () => {
  const [references, setReferences] = useState<ReferenceItem[]>([]);

  useEffect(() => {
    getReferences().then(setReferences);
  }, []);

  const impacts = [
    {
      title: "Meteorological & Operational Value",
      category: "Meteorology",
      color: "cyan",
      points: [
        "Provides meteorologists with transparent, multi-model decision support.",
        "Eliminates reliance on arbitrary single-model deterministic runs.",
        "Combines mesoscale AI pattern recognition with synoptic NWP physics."
      ]
    },
    {
      title: "Social Protection & Early Warning",
      category: "Social",
      color: "purple",
      points: [
        "Delivers contextual district-level extreme risk probabilities (WATCH to EXTREME).",
        "Supports state disaster management authorities (SDMAs) with early staging windows.",
        "Facilitates localized evacuation planning during flash floods & cyclones."
      ]
    },
    {
      title: "Economic Resilience & Agriculture",
      category: "Economy",
      color: "emerald",
      points: [
        "Supplies localized micro-climate forecasts for precision agricultural irrigation.",
        "Protects power grid infrastructure against sudden gust & squall damage.",
        "Reduces urban supply-chain disruptions during severe monsoonal inundation."
      ]
    },
    {
      title: "Environmental & Climate Adaptation",
      category: "Environment",
      color: "blue",
      points: [
        "Enhances regional reservoir water management & river basin inflow tracking.",
        "Supports long-term climate adaptation benchmarks for drought & heat dome monitoring.",
        "Provides verifiable open-data schemas for academic & civil research."
      ]
    }
  ];

  const riskMitigations = [
    {
      risk: "Unprecedented Climate Events & Out-of-Distribution Weather",
      mitigation: "Automatic Anomaly Override reduces AI model weight to 10% and enforces ECMWF NWP-A physics baseline."
    },
    {
      risk: "Black-Box AI Trust & Lack of Operational Transparency",
      mitigation: "Explainable Forecast DNA provides full mathematical contribution breakdowns (Skill 35%, Regime 25%, Region 18%)."
    },
    {
      risk: "Data-Sparse Regions & Sparse Station Density",
      mitigation: "Combines spatial satellite radiance regridding with transfer learning and gridded ERA5 climatology."
    },
    {
      risk: "Unphysical AI Outputs & Negative Precipitation Hallucinations",
      mitigation: "Physics-Informed Validation stage enforces mass conservation, thermodynamic non-negativity, and dewpoint limits."
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          Impact, Risk Framework & Citations
        </div>
        <h2 className="text-2xl font-black text-slate-100 uppercase tracking-wider">
          Strategic Impact & Real References
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1">
          Measurable domain contributions, risk mitigation matrix, and verified scientific literature behind ForecastBridge.
        </p>
      </div>

      {/* Impact Domains Grid (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {impacts.map((imp, idx) => (
          <div key={idx} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                {imp.title}
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 uppercase">
                {imp.category}
              </span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {imp.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Risks ↔ Mitigation Two-Column Mapping Table */}
      <Card title="Risks ↔ Mitigation Framework" subtitle="Technical strategies ensuring operational reliability and safety">
        <div className="space-y-3">
          {riskMitigations.map((rm, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs">
              <div className="space-y-1 border-b md:border-b-0 md:border-r border-slate-800/80 pb-2 md:pb-0 md:pr-3">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Potential Risk Factor</span>
                <p className="font-bold text-slate-200">{rm.risk}</p>
              </div>
              <div className="space-y-1 pt-1 md:pt-0">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">ForecastBridge Mitigation</span>
                <p className="text-slate-300 leading-relaxed font-mono">{rm.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Verified Scientific References */}
      <Card title="Verified Scientific & Technical References" subtitle="Real-world operational research guiding our architecture">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {references.map((ref) => (
            <div key={ref.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    {ref.organization} ({ref.year})
                  </span>
                  <a 
                    href={ref.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1 font-mono font-bold"
                  >
                    <span>View Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h4 className="text-sm font-bold text-slate-100">{ref.title}</h4>
              </div>

              <div className="space-y-2 text-[11px] font-mono pt-2 border-t border-slate-900">
                <div>
                  <span className="text-purple-400 font-bold block">What It Demonstrates:</span>
                  <p className="text-slate-300 leading-tight">{ref.demonstrates}</p>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block">How ForecastBridge Uses The Idea:</span>
                  <p className="text-slate-300 leading-tight">{ref.howUsed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};
