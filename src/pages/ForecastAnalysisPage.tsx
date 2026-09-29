import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { ForecastChart } from '../components/charts/ForecastChart';
import { getForecast, getModelMetrics } from '../services/weatherService';
import { ModelForecastPoint, ModelMetricRow, WeatherVariable } from '../types';
import { LineChart, Filter, HelpCircle, CheckCircle2, Award } from 'lucide-react';

export const ForecastAnalysisPage: React.FC = () => {
  const { 
    selectedLocation, 
    selectedLeadTime, 
    selectedVariable, 
    setSelectedVariable,
    selectedRegime
  } = useApp();

  const [forecastData, setForecastData] = useState<ModelForecastPoint[]>([]);
  const [modelMetrics, setModelMetrics] = useState<ModelMetricRow[]>([]);
  const [metricFilterCategory, setMetricFilterCategory] = useState<string>('all');

  useEffect(() => {
    getForecast(selectedVariable, selectedLocation.id, selectedLeadTime).then(setForecastData);
    getModelMetrics().then(setModelMetrics);
  }, [selectedVariable, selectedLocation, selectedLeadTime]);

  const filteredMetrics = metricFilterCategory === 'all' 
    ? modelMetrics 
    : modelMetrics.filter(m => m.category === metricFilterCategory);

  return (
    <div className="space-y-6">
      
      {/* Top Header Controls: Variable Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 dark:bg-navy-900/90 light:bg-white p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
        <div>
          <h2 className="text-lg font-extrabold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <LineChart className="w-5 h-5 text-cyan-400" />
            Multi-Model Forecast Intelligence Analysis
          </h2>
          <p className="text-xs text-slate-400">
            Compare deterministic physics runs, AI neural models, ensemble spread, and ForecastBridge blended output against observations.
          </p>
        </div>

        {/* Variable Switcher Buttons */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {(['rainfall', 'temperature', 'wind'] as WeatherVariable[]).map(v => (
            <button
              key={v}
              onClick={() => setSelectedVariable(v)}
              className={`px-3 py-1.5 rounded text-xs font-extrabold uppercase tracking-wider transition-all ${
                selectedVariable === v
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Forecast Chart & Why Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (8 cols): Multi-Model Comparison Chart */}
        <div className="lg:col-span-8">
          <Card 
            title={`Multi-Model Time-Series Comparison — ${selectedVariable.toUpperCase()}`}
            subtitle={`${selectedLocation.name} • ${selectedLeadTime} Lead Time • ${selectedRegime.replace('_', ' ').toUpperCase()}`}
          >
            <ForecastChart 
              data={forecastData} 
              variable={selectedVariable} 
              showObserved={true} 
              showUncertainty={true} 
            />
          </Card>
        </div>

        {/* Right (4 cols): Why this Forecast? Explanation Panel */}
        <div className="lg:col-span-4 space-y-4">
          <Card title="Why This Forecast?" subtitle="Natural Language Rationale">
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 leading-relaxed">
                <span className="font-bold text-cyan-400 block mb-1">Contextual Blending Rationale:</span>
                ForecastBridge blended line gives <strong className="text-purple-400">38% weight to AI (GraphCast)</strong> due to superior short-term mesoscale pattern recognition during convective spells, combined with <strong className="text-blue-400">32% ECMWF HRES</strong> for upper-air steering bounds.
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-slate-200 block">Verification Metrics Highlights:</span>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span>Blended MAE:</span>
                  <strong className="text-emerald-400">2.45 mm/h (vs 3.82 NWP)</strong>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span>Skill Score:</span>
                  <strong className="text-cyan-400">0.96 (+8.7% boost)</strong>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span>Reliability Index:</span>
                  <strong className="text-purple-400">0.97 Calibrated</strong>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Model Benchmark Performance Table */}
      <Card 
        title="Model Skill Benchmark Table" 
        subtitle="30-Day verification metrics across lead times & weather regimes"
        action={
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded border border-slate-800 text-[10px] font-mono">
            <Filter className="w-3 h-3 text-cyan-400" />
            <select
              value={metricFilterCategory}
              onChange={(e) => setMetricFilterCategory(e.target.value)}
              className="bg-transparent text-slate-300 outline-none cursor-pointer"
            >
              <option value="all">All Models</option>
              <option value="NWP">NWP Physics</option>
              <option value="AI">AI Neural</option>
              <option value="ForecastBridge">ForecastBridge Blended</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="p-3">Model Name</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-right">MAE (Error)</th>
                <th className="p-3 text-right">RMSE</th>
                <th className="p-3 text-right">Bias</th>
                <th className="p-3 text-right">Skill Score</th>
                <th className="p-3 text-right">Reliability</th>
              </tr>
            </thead>
            <tbody>
              {filteredMetrics.map((row, i) => (
                <tr 
                  key={i} 
                  className={`border-b border-slate-800/50 hover:bg-slate-900/60 ${
                    row.category === 'ForecastBridge' ? 'bg-cyan-950/30 text-cyan-300 font-bold border-cyan-800' : 'text-slate-200'
                  }`}
                >
                  <td className="p-3 font-bold flex items-center gap-2">
                    {row.category === 'ForecastBridge' && <Award className="w-4 h-4 text-cyan-400" />}
                    {row.modelName}
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-sans">
                      {row.category}
                    </span>
                  </td>
                  <td className="p-3 text-right">{row.mae.toFixed(2)}</td>
                  <td className="p-3 text-right">{row.rmse.toFixed(2)}</td>
                  <td className={`p-3 text-right ${row.bias > 0 ? 'text-amber-400' : 'text-blue-400'}`}>
                    {row.bias > 0 ? `+${row.bias.toFixed(2)}` : row.bias.toFixed(2)}
                  </td>
                  <td className="p-3 text-right text-emerald-400 font-bold">{(row.skillScore * 100).toFixed(0)}%</td>
                  <td className="p-3 text-right text-purple-400">{(row.reliability * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};
