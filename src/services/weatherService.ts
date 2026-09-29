import locationsData from '../data/locations.json';
import forecastsData from '../data/forecasts.json';
import weightsData from '../data/weights.json';
import regimesData from '../data/regimes.json';
import extremesData from '../data/extremes.json';
import pipelineData from '../data/pipeline.json';
import modelMetricsData from '../data/modelMetrics.json';
import referencesData from '../data/references.json';

import {
  LocationOption,
  ModelForecastPoint,
  DynamicWeightItem,
  WeatherRegimeInfo,
  ExtremeEventSignal,
  PipelineStageInfo,
  ModelMetricRow,
  PhysicsCheckItem,
  ReferenceItem,
  WeatherVariable,
  LeadTime,
  Season
} from '../types';

export async function getLocations(): Promise<LocationOption[]> {
  return Promise.resolve(locationsData as LocationOption[]);
}

export async function getForecast(
  variable: WeatherVariable = 'rainfall',
  _locationId: string = 'national',
  _leadTime: LeadTime = 'Now'
): Promise<ModelForecastPoint[]> {
  const data = forecastsData[variable] || forecastsData.rainfall;
  return Promise.resolve(data as ModelForecastPoint[]);
}

export async function getWeights(
  regionId: string = 'national',
  leadTime: LeadTime = 'Now',
  regimeId: string = 'heavy_rain',
  _season: Season = 'Monsoon'
): Promise<{
  weights: DynamicWeightItem[];
  leadTimeCurve: any[];
  heatMap: any[];
  explanation: string;
}> {
  let weights: DynamicWeightItem[] = JSON.parse(JSON.stringify(weightsData.defaultWeights));
  let explanation = "Standard multi-model weighting matrix applied based on historical 30-day skill.";

  if (regimeId === 'heavy_rain' || regionId === 'odisha' || regionId === 'assam') {
    weights = weights.map(w => {
      if (w.modelId === 'ai') return { ...w, weight: 38, previousWeight: w.weight, regimeFit: 0.94 };
      if (w.modelId === 'nwpa') return { ...w, weight: 32, previousWeight: w.weight, regimeFit: 0.88 };
      if (w.modelId === 'nwpb') return { ...w, weight: 18, previousWeight: w.weight, regimeFit: 0.72 };
      if (w.modelId === 'ensemble') return { ...w, weight: 12, previousWeight: w.weight, regimeFit: 0.78 };
      return w;
    });
    explanation = "AI Model weight increased to 38% because it historically outperforms physics NWP at short lead times (<12h) during high convective moisture flux regimes.";
  } else if (regimeId === 'hailstorm') {
    weights = weights.map(w => {
      if (w.modelId === 'ai') return { ...w, weight: 42, previousWeight: w.weight, regimeFit: 0.96 };
      if (w.modelId === 'nwpa') return { ...w, weight: 28, previousWeight: w.weight, regimeFit: 0.82 };
      if (w.modelId === 'nwpb') return { ...w, weight: 15, previousWeight: w.weight, regimeFit: 0.70 };
      if (w.modelId === 'ensemble') return { ...w, weight: 15, previousWeight: w.weight, regimeFit: 0.75 };
      return w;
    });
    explanation = "Severe Hailstorm Regime: AI Neural Model weight boosted to 42% due to rapid pattern matching of radar reflectivity ZDR drops and severe convective updrafts.";
  } else if (regimeId === 'snow_blizzard' || regionId === 'ladakh') {
    weights = weights.map(w => {
      if (w.modelId === 'nwpa') return { ...w, weight: 45, previousWeight: w.weight, regimeFit: 0.95 };
      if (w.modelId === 'nwpb') return { ...w, weight: 25, previousWeight: w.weight, regimeFit: 0.80 };
      if (w.modelId === 'ai') return { ...w, weight: 15, previousWeight: w.weight, regimeFit: 0.65 };
      if (w.modelId === 'ensemble') return { ...w, weight: 15, previousWeight: w.weight, regimeFit: 0.78 };
      return w;
    });
    explanation = "Snow & Blizzard Regime: ECMWF NWP-A weight increased to 45% because high-resolution physical thermodynamic equations handle snow accumulation & mountain orographic uplift better than purely data-driven AI models.";
  } else if (regimeId === 'sandstorm' || regionId === 'thar_desert') {
    weights = weights.map(w => {
      if (w.modelId === 'nwpb') return { ...w, weight: 36, previousWeight: w.weight, regimeFit: 0.90 };
      if (w.modelId === 'ai') return { ...w, weight: 30, previousWeight: w.weight, regimeFit: 0.88 };
      if (w.modelId === 'nwpa') return { ...w, weight: 20, previousWeight: w.weight, regimeFit: 0.75 };
      if (w.modelId === 'ensemble') return { ...w, weight: 14, previousWeight: w.weight, regimeFit: 0.70 };
      return w;
    });
    explanation = "Sandstorm & Dust Storm Regime: GFS (NWP-B) weight increased to 36% for desert boundary layer wind shear, combined with 30% AI aerosol satellite tracking.";
  } else if (regimeId === 'extreme') {
    weights = weights.map(w => {
      if (w.modelId === 'nwpa') return { ...w, weight: 48, previousWeight: w.weight, regimeFit: 0.95 };
      if (w.modelId === 'nwpb') return { ...w, weight: 22, previousWeight: w.weight, regimeFit: 0.85 };
      if (w.modelId === 'ai') return { ...w, weight: 10, previousWeight: w.weight, regimeFit: 0.30 };
      if (w.modelId === 'ensemble') return { ...w, weight: 20, previousWeight: w.weight, regimeFit: 0.80 };
      return w;
    });
    explanation = "ANOMALY OVERRIDE ACTIVE: AI weight reduced to 10% due to out-of-distribution meteorological parameters. ECMWF NWP-A baseline strengthened to 48% to enforce thermodynamic physics constraints.";
  } else if (leadTime === '7d' || leadTime === '72h') {
    weights = weights.map(w => {
      if (w.modelId === 'ensemble') return { ...w, weight: 35, previousWeight: w.weight, regimeFit: 0.90 };
      if (w.modelId === 'nwpa') return { ...w, weight: 30, previousWeight: w.weight, regimeFit: 0.85 };
      if (w.modelId === 'nwpb') return { ...w, weight: 25, previousWeight: w.weight, regimeFit: 0.75 };
      if (w.modelId === 'ai') return { ...w, weight: 10, previousWeight: w.weight, regimeFit: 0.60 };
      return w;
    });
    explanation = "At longer lead times (72h - 7d), Ensemble weight increases to 35% to capture atmospheric chaos and spread, while single AI model weight naturally decreases.";
  }

  return Promise.resolve({
    weights,
    leadTimeCurve: weightsData.weightByLeadTime,
    heatMap: weightsData.heatMapMatrix,
    explanation
  });
}

export async function getRegimes(): Promise<WeatherRegimeInfo[]> {
  return Promise.resolve(regimesData as WeatherRegimeInfo[]);
}

export async function getExtremes(): Promise<ExtremeEventSignal[]> {
  return Promise.resolve(extremesData as ExtremeEventSignal[]);
}

export async function getPipelineStages(): Promise<PipelineStageInfo[]> {
  return Promise.resolve(pipelineData as PipelineStageInfo[]);
}

export async function getModelMetrics(): Promise<ModelMetricRow[]> {
  return Promise.resolve(modelMetricsData as ModelMetricRow[]);
}

export async function getReferences(): Promise<ReferenceItem[]> {
  return Promise.resolve(referencesData as ReferenceItem[]);
}

export async function getPhysicsChecks(): Promise<PhysicsCheckItem[]> {
  return Promise.resolve([
    {
      id: "chk-1",
      name: "2m Temperature Range Boundary",
      status: "PASS",
      description: "Temperature prediction stays strictly within physical thermodynamic limits (-10°C to +55°C).",
      value: "33.4 °C",
      threshold: "Within [-10°C, 55°C]"
    },
    {
      id: "chk-2",
      name: "Wind Speed & Directional Continuity",
      status: "PASS",
      description: "Vector gradient between adjacent spatial cells satisfies Navier-Stokes mass continuity equations.",
      value: "du/dx = 0.002 s⁻¹",
      threshold: "< 0.01 s⁻¹ max divergence"
    },
    {
      id: "chk-3",
      name: "Precipitation Non-Negative Constraint",
      status: "PASS",
      description: "Neural network output floor set to 0.0 mm/h with zero negative precip anomalies.",
      value: "0.00 mm/h min",
      threshold: "≥ 0.00 mm/h floor"
    },
    {
      id: "chk-4",
      name: "Hydrostatic Dewpoint Non-Exceedance",
      status: "WARNING",
      description: "Dewpoint temperature approaches 98% relative humidity boundary in coastal Odisha zone.",
      value: "Td = 27.2°C (T = 27.5°C)",
      threshold: "Td ≤ T strictly"
    }
  ]);
}
