export type PageId =
  | 'landing'
  | 'command'
  | 'forecast'
  | 'explainability'
  | 'regime'
  | 'weights'
  | 'pipeline'
  | 'confidence'
  | 'extreme'
  | 'impact';

export type LeadTime = 'Now' | '6h' | '12h' | '24h' | '48h' | '72h' | '7d';

export type WeatherVariable = 'rainfall' | 'temperature' | 'wind';

export type Season = 'Monsoon' | 'Pre-Monsoon' | 'Winter' | 'Post-Monsoon';

export interface LocationOption {
  id: string;
  name: string;
  state: string;
  type: 'national' | 'state' | 'district';
  lat: number;
  lng: number;
  regime: string;
  currentTemp: number;
  currentRain: number;
  currentWind: number;
  alertLevel: 'NONE' | 'WATCH' | 'ADVISORY' | 'HIGH RISK' | 'EXTREME';
}

export interface ModelForecastPoint {
  time: string;
  nwpa: number;
  nwpb: number;
  ai: number;
  ensemble: number;
  blended: number;
  observed?: number;
  lowerBound: number;
  upperBound: number;
}

export interface DynamicWeightItem {
  modelId: string;
  modelName: string;
  type: 'NWP' | 'AI' | 'Ensemble';
  weight: number;
  previousWeight: number;
  color: string;
  historicalSkill: number;
  regimeFit: number;
}

export interface WeatherRegimeInfo {
  id: string;
  name: string;
  confidence: number;
  activeSince: string;
  detectionFactors: { factor: string; score: number; description: string }[];
  historicalFrequency: number;
  description: string;
  recommendedModelPreference: string;
}

export interface ExtremeEventSignal {
  id: string;
  title: string;
  type: 'rainfall' | 'heatwave' | 'wind';
  level: 'WATCH' | 'ADVISORY' | 'HIGH RISK' | 'EXTREME';
  probability: number;
  expectedMagnitude: string;
  confidence: number;
  affectedRegions: string[];
  timeline: string;
  monitoringStatus: string;
  description: string;
}

export interface PipelineStageInfo {
  id: number;
  stepNumber: string;
  title: string;
  purpose: string;
  inputs: string[];
  processing: string;
  output: string;
  keyTech: string;
  status: 'completed' | 'processing' | 'pending';
}

export interface ModelMetricRow {
  modelName: string;
  category: 'NWP' | 'AI' | 'Ensemble' | 'ForecastBridge';
  mae: number;
  rmse: number;
  bias: number;
  skillScore: number;
  reliability: number;
}

export interface PhysicsCheckItem {
  id: string;
  name: string;
  status: 'PASS' | 'WARNING' | 'FAIL';
  description: string;
  value: string;
  threshold: string;
}

export interface ReferenceItem {
  id: string;
  title: string;
  organization: string;
  year: number;
  url: string;
  demonstrates: string;
  howUsed: string;
}
