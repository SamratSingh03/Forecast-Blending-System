# FORECASTBRIDGE — AI × NWP × Multi-Model Weather Intelligence Platform
**Smart India Hackathon 2026 (SIH PS 2 — Weather Disaster Management)**  
*Developed by Team InnovateX1*

---

## 🌟 Core Idea

**ForecastBridge does not blindly trust one weather model.** 

No single Numerical Weather Prediction (NWP) model or AI neural model is best across all regions, seasons, lead times, and synoptic weather regimes:
- **AI Models (GraphCast / AIFS)** excel at short-term (<12h) mesoscale convective pattern recognition.
- **Physics NWP (ECMWF HRES)** excels at synoptic upper-air steering bounds and thermodynamic mass conservation.
- **Ensemble Systems** capture long-range (>72h) atmospheric chaos and variance.

ForecastBridge continuously evaluates each model's historical skill matrix, detects active synoptic regimes (Heavy Rainfall, Snow & Blizzard, Severe Hailstorm, Sandstorm & Dust Storm, Monsoon Trough, Heat Wave), and applies a **Bayesian Softmax Dynamic Weighting Engine** to output a single unified blended forecast with confidence metrics, physics checks, and clear explainability.

---

## 🚀 Key Features & Pages

0. **Landing Page**: Hero architectural stream visual, CTAs ("Explore Platform", "Watch System Demo"), and "Why ForecastBridge?" rationale.
1. **Command Center**: Primary dashboard featuring lead-time tabs, final blended forecast hero, dynamic weight bars, regime card, extreme weather gauges, interactive SVG India Map (6 layer toggles & regional drilldown modal), and 9-step pipeline strip.
2. **Forecast Analysis**: Recharts multi-model line chart comparing NWP-A, NWP-B, AI Model, Ensemble, Blended line, observed AWS values, and uncertainty bands, plus model skill benchmark table (MAE, RMSE, Bias, Skill Score).
3. **Model Weights (Core USP)**: Dynamic Weighting Engine with interactive filters (Region, Season, Lead Time, Regime). Re-calculates weights in real-time with weight shift curves, heatmaps, and plain-language explanations.
4. **Weather Regime**: Synoptic classification engine with 9 distinct regimes (Heavy Rain, Snow & Blizzard, Hailstorm, Sandstorm, Heatwave, Monsoon, High Wind, Normal, Extreme Anomaly).
5. **Extreme Weather**: 4 warning tiers (WATCH, ADVISORY, HIGH RISK, EXTREME) with pulsing indicators, hazard threshold checks, and monitoring status.
6. **Confidence & Explainability**: Radial confidence gauge, inter-model consensus, "Explainable Forecast DNA" contribution cards, and auditable Decision Trace timeline.
7. **Pipeline & Model Lab**: Interactive 9-stage stepper with "Run Simulation" automated execution button, plus sandbox tabs for Quantile Bias Correction, Bayesian Updating, Physics Validation checks, Anomaly Override toggle, and Data Sources status.
8. **Impact, Risks & References**: 4 domain impact cards, Risks ↔ Mitigation matrix, and verified scientific references (ECMWF AIFS, NOAA/NCAR, IMD/MoES, GraphCast) with clickable source links.

---

## 🛠️ Local Development Setup

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **Start Vite development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🔌 FastAPI Backend Integration Guide

ForecastBridge features a **decoupled service layer** located in `src/services/weatherService.ts`. All UI components fetch data through standard async promises (`getForecast`, `getWeights`, `getRegimes`, `getExtremes`, `getPipelineStages`).

To replace the simulated local JSON files (`/src/data/*.json`) with a live Python FastAPI backend, follow these 3 simple steps:

### Step 1: Create FastAPI Service (`main.py`)
```python
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List

app = FastAPI(title="ForecastBridge Intelligence API", version="2.4")

# Enable CORS for React Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/forecast")
async def get_forecast(
    variable: str = Query("rainfall"),
    location_id: str = Query("odisha"),
    lead_time: str = Query("Now")
):
    # Execute Python xarray / PyTorch tensor blending pipeline
    return [
        {
            "time": "00:00",
            "nwpa": 14.2,
            "nwpb": 18.5,
            "ai": 24.1,
            "ensemble": 18.9,
            "blended": 21.8,
            "observed": 22.0,
            "lowerBound": 16.5,
            "upperBound": 26.2
        },
        # ... additional hourly forecast points
    ]

@app.get("/api/v1/weights")
async def get_dynamic_weights(
    region_id: str = "odisha",
    lead_time: str = "Now",
    regime_id: str = "heavy_rain",
    season: str = "Monsoon"
):
    # Run Bayesian Softmax weighting algorithm
    return {
        "weights": [
            {"modelId": "nwpa", "modelName": "ECMWF HRES", "type": "NWP", "weight": 32, "color": "#3B82F6", "historicalSkill": 0.88, "regimeFit": 0.85},
            {"modelId": "ai", "modelName": "GraphCast", "type": "AI", "weight": 38, "color": "#8B5CF6", "historicalSkill": 0.94, "regimeFit": 0.94},
            {"modelId": "nwpb", "modelName": "GFS Global", "type": "NWP", "weight": 18, "color": "#06B6D4", "historicalSkill": 0.79, "regimeFit": 0.72},
            {"modelId": "ensemble", "modelName": "Ensemble", "type": "Ensemble", "weight": 12, "color": "#10B981", "historicalSkill": 0.84, "regimeFit": 0.78}
        ],
        "explanation": "AI Model weight increased to 38% for short lead mesoscale convective rain bands."
    }
```

### Step 2: Update `src/services/weatherService.ts`
Replace the local JSON imports in `src/services/weatherService.ts` with `fetch()` calls to the FastAPI server:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export async function getForecast(variable = 'rainfall', locationId = 'national', leadTime = 'Now') {
  const res = await fetch(`${API_BASE_URL}/forecast?variable=${variable}&location_id=${locationId}&lead_time=${leadTime}`);
  return await res.json();
}

export async function getWeights(regionId = 'national', leadTime = 'Now', regimeId = 'heavy_rain', season = 'Monsoon') {
  const res = await fetch(`${API_BASE_URL}/weights?region_id=${regionId}&lead_time=${leadTime}&regime_id=${regimeId}&season=${season}`);
  return await res.json();
}
```

### Step 3: Zero UI Changes Required!
Because all UI components consume typed data from `weatherService.ts`, switching to FastAPI requires **zero changes** to React pages, charts, components, or map layers!

---

## 🛡️ Hackathon Safety & Demo Notice

All data displayed in this prototype is **simulated benchmark data**. Persistent `DEMO / SIMULATED DATA` badges are visible across cards and alert screens. No claims of official IMD integration or real-time operational alerts are made.

---

*Smart India Hackathon 2026 — Team InnovateX1*
