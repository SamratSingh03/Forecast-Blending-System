import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { WeightBars } from '../components/common/WeightBars';
import { IndiaMap } from '../components/map/IndiaMap';
import { RegionDetailModal } from '../components/map/RegionDetailModal';
import { PipelineStepper } from '../components/common/PipelineStepper';
import { 
  getForecast, 
  getWeights, 
  getRegimes, 
  getExtremes, 
  getPipelineStages 
} from '../services/weatherService';
import { 
  LeadTime, 
  LocationOption, 
  DynamicWeightItem, 
  WeatherRegimeInfo, 
  ExtremeEventSignal, 
  PipelineStageInfo 
} from '../types';
import { 
  Activity, 
  CloudRain, 
  Thermometer, 
  Wind, 
  ShieldAlert, 
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';

export const CommandCenterPage: React.FC = () => {
  const { 
    selectedLocation, 
    setSelectedLocation, 
    selectedLeadTime, 
    setSelectedLeadTime,
    locations,
    selectedRegime
  } = useApp();

  const [forecastPoint, setForecastPoint] = useState<any>(null);
  const [weights, setWeights] = useState<DynamicWeightItem[]>([]);
  const [regimes, setRegimes] = useState<WeatherRegimeInfo[]>([]);
  const [extremes, setExtremes] = useState<ExtremeEventSignal[]>([]);
  const [pipelineStages, setPipelineStages] = useState<PipelineStageInfo[]>([]);
  const [detailModalLoc, setDetailModalLoc] = useState<LocationOption | null>(null);

  const leadTimes: LeadTime[] = ['Now', '6h', '12h', '24h', '48h', '72h', '7d'];

  useEffect(() => {
    getForecast('rainfall', selectedLocation.id, selectedLeadTime).then(pts => {
      if (pts.length > 4) setForecastPoint(pts[4]);
    });

    getWeights(selectedLocation.id, selectedLeadTime, selectedRegime).then(res => {
      setWeights(res.weights);
    });

    getRegimes().then(setRegimes);
    getExtremes().then(setExtremes);
    getPipelineStages().then(setPipelineStages);
  }, [selectedLocation, selectedLeadTime, selectedRegime]);

  const activeRegimeInfo = regimes.find(r => r.id === selectedRegime) || regimes[0];

  return (
    <div className="space-y-8 py-2">
      
      {/* Top Selector Bar: Location & Lead Times */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Active Region Summary */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 shrink-0">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Target Region</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                {selectedLocation.state}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
              {selectedLocation.name}
            </h2>
          </div>
        </div>

        {/* Lead-Time Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto max-w-full no-scrollbar">
          <div className="flex items-center gap-1.5 px-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
            <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Lead:</span>
          </div>
          {leadTimes.map(lt => (
            <button
              key={lt}
              onClick={() => setSelectedLeadTime(lt)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedLeadTime === lt
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-900'
              }`}
            >
              {lt}
            </button>
          ))}
        </div>

      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Hero Blended Card + India Map + Pipeline */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Priority 1: Primary Blended Forecast Hero Card */}
          <div className="bg-white dark:bg-slate-900 border-2 border-cyan-500/50 rounded-2xl p-7 shadow-lg dark:shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 px-3 py-1 rounded-full">
                  Primary Blended Forecast • {selectedLeadTime} Lead Time
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
                  Unified Dynamic Multi-Model Output
                </h3>
              </div>

              {/* Confidence Badge */}
              <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-500/50 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div className="text-left font-mono">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Confidence</div>
                  <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">88.4%</div>
                </div>
              </div>
            </div>

            {/* Core Metrics Row */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="bg-slate-50 dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase mb-2">
                  <CloudRain className="w-5 h-5" />
                  Precipitation
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-slate-100">
                  {forecastPoint ? forecastPoint.blended : selectedLocation.currentRain}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal ml-1">mm/h</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block font-medium">Convective Intensity</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase mb-2">
                  <Thermometer className="w-5 h-5" />
                  Temperature
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-slate-100">
                  {selectedLocation.currentTemp}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal ml-1">°C</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block font-medium">2m Surface Temp</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-2">
                  <Wind className="w-5 h-5" />
                  Wind Speed
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-slate-100">
                  {selectedLocation.currentWind}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal ml-1">km/h</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block font-medium">Vector Gust Shear</span>
              </div>
            </div>
          </div>

          {/* Interactive Spatial Intelligence Map */}
          <IndiaMap
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            onOpenDetailModal={setDetailModalLoc}
          />

          {/* 9-Step Compact Pipeline Strip */}
          <PipelineStepper stages={pipelineStages} compact={true} />

        </div>

        {/* Right Column (4 cols): Model Weights, Regime Card, Extreme Signals */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Priority 2: Dynamic Model Weights Summary */}
          <Card title="Dynamic Model Weights" subtitle="Contextually calculated via Bayesian Softmax">
            <WeightBars weights={weights} showDetails={true} />
            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 leading-relaxed font-mono">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold block mb-1">Weight Shift Rationale:</span> 
              AI Model weight increased to 38% for short lead mesoscale convective rain bands.
            </div>
          </Card>

          {/* Priority 3: Current Weather Regime Card */}
          <Card title="Active Weather Regime" subtitle={`Active since ${activeRegimeInfo ? activeRegimeInfo.activeSince : '04h ago'}`}>
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-purple-900 dark:text-purple-300">
                  {activeRegimeInfo ? activeRegimeInfo.name : 'Heavy Rainfall Regime'}
                </span>
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400">
                  {activeRegimeInfo ? activeRegimeInfo.confidence : 87}% Conf
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                {activeRegimeInfo ? activeRegimeInfo.description : 'High moisture convergence'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Detection Indicators:
              </span>
              {activeRegimeInfo && activeRegimeInfo.detectionFactors.map((df, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[180px]">{df.factor}</span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{(df.score * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Priority 4: Severe Weather Risk Signals */}
          <Card title="Severe Weather Signals" subtitle="Probabilistic hazard threshold alerts">
            <div className="space-y-3.5">
              {extremes.slice(0, 3).map(sig => (
                <div 
                  key={sig.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    sig.level === 'EXTREME'
                      ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                      : sig.level === 'HIGH RISK'
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                      : 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      {sig.title}
                    </span>
                    <span className="font-mono font-extrabold text-sm">{sig.probability}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mt-1">
                    <span>{sig.expectedMagnitude}</span>
                    <span className="font-bold uppercase">{sig.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

      {/* Regional Detail Modal */}
      <RegionDetailModal
        location={detailModalLoc}
        onClose={() => setDetailModalLoc(null)}
      />

    </div>
  );
};
