import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { WeightBars } from '../components/common/WeightBars';
import { DynamicWeightChart } from '../components/charts/DynamicWeightChart';
import { WeightHeatmap } from '../components/charts/WeightHeatmap';
import { getWeights, getRegimes } from '../services/weatherService';
import { DynamicWeightItem, LeadTime, Season, WeatherRegimeInfo } from '../types';
import { Sliders, Filter, Sparkles, HelpCircle, Cpu, Cloud, Layers, Activity } from 'lucide-react';

export const ModelWeightsPage: React.FC = () => {
  const { 
    selectedLocation, 
    setSelectedLocation,
    locations,
    selectedLeadTime, 
    setSelectedLeadTime,
    selectedRegime, 
    setSelectedRegime,
    selectedSeason, 
    setSelectedSeason
  } = useApp();

  const [weights, setWeights] = useState<DynamicWeightItem[]>([]);
  const [leadTimeCurve, setLeadTimeCurve] = useState<any[]>([]);
  const [heatMap, setHeatMap] = useState<any[]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [regimes, setRegimes] = useState<WeatherRegimeInfo[]>([]);

  useEffect(() => {
    getRegimes().then(setRegimes);
  }, []);

  useEffect(() => {
    getWeights(selectedLocation.id, selectedLeadTime, selectedRegime, selectedSeason).then(res => {
      setWeights(res.weights);
      setLeadTimeCurve(res.leadTimeCurve);
      setHeatMap(res.heatMap);
      setExplanation(res.explanation);
    });
  }, [selectedLocation, selectedLeadTime, selectedRegime, selectedSeason]);

  return (
    <div className="space-y-6">
      
      {/* Title & Architecture Flow Diagram */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border-2 border-purple-500/60 rounded-2xl p-6 shadow-2xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Core Technology USP
          </div>
          <h2 className="text-2xl font-black text-slate-100 uppercase tracking-wider">
            Dynamic Model Weighting Engine
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl mt-1 leading-relaxed">
            Evaluates model skill vectors, synoptic regimes, lead times, and physical constraints in real-time to compute Bayesian Softmax weights across ECMWF, GFS, GraphCast, and Ensemble streams.
          </p>
        </div>

        {/* Engine Flow Diagram */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">Input 1</span>
            <span className="font-bold text-slate-200">Historical Skill</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">Input 2</span>
            <span className="font-bold text-purple-300">Weather Regime</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">Input 3</span>
            <span className="font-bold text-cyan-300">Region & Season</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">Input 4</span>
            <span className="font-bold text-blue-300">Lead Time</span>
          </div>
          <div className="p-2 rounded bg-purple-950 border border-purple-800 col-span-2">
            <span className="text-[10px] text-purple-400 block font-mono">Contextual Engine</span>
            <span className="font-extrabold text-purple-200">Dynamic Weights (Softmax)</span>
          </div>
        </div>
      </div>

      {/* Interactive Filters Panel */}
      <Card title="Interactive Contextual Filters" subtitle="Adjust parameters to witness simulated weight recalculation">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          
          {/* Region Filter */}
          <div>
            <label className="text-slate-400 block mb-1.5 font-bold uppercase">Region Target:</label>
            <select
              value={selectedLocation.id}
              onChange={(e) => {
                const found = locations.find(l => l.id === e.target.value);
                if (found) setSelectedLocation(found);
              }}
              className="w-full bg-slate-950 text-slate-200 p-2 rounded-lg border border-slate-800 outline-none focus:border-cyan-500"
            >
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name} ({loc.state})</option>
              ))}
            </select>
          </div>

          {/* Regime Filter */}
          <div>
            <label className="text-slate-400 block mb-1.5 font-bold uppercase">Weather Regime:</label>
            <select
              value={selectedRegime}
              onChange={(e) => setSelectedRegime(e.target.value)}
              className="w-full bg-slate-950 text-purple-300 p-2 rounded-lg border border-purple-800/80 outline-none font-bold"
            >
              {regimes.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Lead Time Filter */}
          <div>
            <label className="text-slate-400 block mb-1.5 font-bold uppercase">Forecast Lead Time:</label>
            <select
              value={selectedLeadTime}
              onChange={(e) => setSelectedLeadTime(e.target.value as LeadTime)}
              className="w-full bg-slate-950 text-cyan-300 p-2 rounded-lg border border-slate-800 outline-none font-bold"
            >
              {['Now', '6h', '12h', '24h', '48h', '72h', '7d'].map(lt => (
                <option key={lt} value={lt}>{lt} Lead</option>
              ))}
            </select>
          </div>

          {/* Season Filter */}
          <div>
            <label className="text-slate-400 block mb-1.5 font-bold uppercase">Climatological Season:</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value as Season)}
              className="w-full bg-slate-950 text-slate-200 p-2 rounded-lg border border-slate-800 outline-none"
            >
              {['Monsoon', 'Pre-Monsoon', 'Winter', 'Post-Monsoon'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

        </div>
      </Card>

      {/* Main Content Grid: Live Weight Bars + Explanation + Lead Time Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (5 cols): Live Calculated Weight Bars + Explanation Box */}
        <div className="lg:col-span-5 space-y-6">
          <Card title="Recalculated Dynamic Model Weights" subtitle="Live simulated Bayesian weights">
            <WeightBars weights={weights} showDetails={true} />
          </Card>

          {/* Why did weights change? Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/50 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              Why Did The Weights Change?
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {explanation}
            </p>
            <span className="text-[10px] text-slate-400 block italic pt-1 border-t border-slate-900">
              * Simulated contextual decision logic for hackathon demonstration benchmark.
            </span>
          </div>
        </div>

        {/* Right (7 cols): Lead Time Weight Shift Chart & Heatmap */}
        <div className="lg:col-span-7 space-y-6">
          <Card title="Model Weight Shift Across Lead Times" subtitle="Evolution of model trust as lead time extends">
            <DynamicWeightChart data={leadTimeCurve} />
          </Card>

          <Card title="Regime vs Model Weight Heatmap" subtitle="Full contextual matrix cross-tabulation">
            <WeightHeatmap matrix={heatMap} />
          </Card>
        </div>

      </div>

    </div>
  );
};
