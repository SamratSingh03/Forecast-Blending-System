import React, { useState } from 'react';
import { LocationOption } from '../../types';
import { Layers, MapPin, Eye, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

interface IndiaMapProps {
  locations: LocationOption[];
  selectedLocation: LocationOption;
  onSelectLocation: (loc: LocationOption) => void;
  onOpenDetailModal?: (loc: LocationOption) => void;
}

export type MapLayer = 'rainfall' | 'temperature' | 'wind' | 'risk' | 'weight' | 'confidence';

export const IndiaMap: React.FC<IndiaMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  onOpenDetailModal
}) => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('risk');

  // Custom SVG paths for major Indian regions
  const regionPaths: { id: string; name: string; path: string; cx: number; cy: number }[] = [
    {
      id: "ladakh",
      name: "Ladakh & J&K",
      path: "M 130 50 L 170 30 L 210 55 L 190 95 L 140 90 Z",
      cx: 165,
      cy: 60
    },
    {
      id: "thar_desert",
      name: "Rajasthan",
      path: "M 100 130 L 150 110 L 170 170 L 110 190 L 80 160 Z",
      cx: 125,
      cy: 150
    },
    {
      id: "punjab_hail",
      name: "Punjab & Haryana",
      path: "M 150 100 L 190 95 L 185 125 L 150 120 Z",
      cx: 168,
      cy: 110
    },
    {
      id: "gujarat",
      name: "Gujarat",
      path: "M 75 195 L 120 190 L 135 240 L 90 250 L 60 215 Z",
      cx: 95,
      cy: 220
    },
    {
      id: "maharashtra",
      name: "Maharashtra",
      path: "M 125 240 L 200 230 L 210 295 L 135 290 Z",
      cx: 165,
      cy: 265
    },
    {
      id: "odisha",
      name: "Odisha Coastal",
      path: "M 240 220 L 285 210 L 295 265 L 245 270 Z",
      cx: 265,
      cy: 240
    },
    {
      id: "kerala",
      name: "Kerala & South",
      path: "M 145 340 L 175 330 L 170 390 L 140 370 Z",
      cx: 155,
      cy: 360
    },
    {
      id: "assam",
      name: "Assam & North East",
      path: "M 320 140 L 370 130 L 380 180 L 325 190 Z",
      cx: 345,
      cy: 160
    }
  ];

  const getRegionColor = (locId: string) => {
    const loc = locations.find(l => l.id === locId);
    if (!loc) return '#1E293B';

    if (activeLayer === 'risk') {
      switch (loc.alertLevel) {
        case 'EXTREME': return '#EF4444'; // Red
        case 'HIGH RISK': return '#F97316'; // Orange
        case 'ADVISORY': return '#F59E0B'; // Amber
        case 'WATCH': return '#06B6D4'; // Cyan
        default: return '#10B981'; // Green
      }
    } else if (activeLayer === 'rainfall') {
      if (loc.currentRain > 80) return '#0284C7';
      if (loc.currentRain > 40) return '#06B6D4';
      return '#38BDF8';
    } else if (activeLayer === 'temperature') {
      if (loc.currentTemp > 40) return '#EF4444';
      if (loc.currentTemp < 0) return '#38BDF8';
      return '#F59E0B';
    } else if (activeLayer === 'weight') {
      if (loc.id === 'odisha' || loc.id === 'punjab_hail') return '#8B5CF6'; // AI dominant
      return '#3B82F6'; // NWP dominant
    }
    return '#3B82F6';
  };

  return (
    <div className="bg-slate-900/90 dark:bg-navy-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 shadow-xl">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Interactive Spatial Intelligence Map
          </h3>
          <p className="text-xs text-slate-400">
            Select layers and click any climate zone for dynamic regime and model weighting breakdown.
          </p>
        </div>

        {/* Map Layer Toggles */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto max-w-full no-scrollbar">
          {(['risk', 'rainfall', 'temperature', 'wind', 'weight'] as MapLayer[]).map(lyr => (
            <button
              key={lyr}
              onClick={() => setActiveLayer(lyr)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider transition-all ${
                activeLayer === lyr
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {lyr}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full h-[380px] sm:h-[420px] bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-center p-2 overflow-hidden">
        
        {/* Subtle grid background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        <svg viewBox="0 0 420 440" className="w-full h-full max-h-[400px]">
          {/* India Boundary Background Base */}
          <g>
            {regionPaths.map((reg) => {
              const loc = locations.find(l => l.id === reg.id) || selectedLocation;
              const isSelected = selectedLocation.id === reg.id;
              const color = getRegionColor(reg.id);

              return (
                <g key={reg.id} className="group cursor-pointer">
                  <path
                    d={reg.path}
                    fill={color}
                    fillOpacity={isSelected ? 0.85 : 0.55}
                    stroke={isSelected ? '#06B6D4' : '#334155'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-300 group-hover:fill-opacity-95 group-hover:stroke-cyan-400"
                    onClick={() => {
                      onSelectLocation(loc);
                      if (onOpenDetailModal) onOpenDetailModal(loc);
                    }}
                  />

                  {/* Marker Pin */}
                  <circle
                    cx={reg.cx}
                    cy={reg.cy}
                    r={isSelected ? 6 : 4}
                    className={`transition-all ${
                      isSelected ? 'fill-cyan-300 animate-ping' : 'fill-white'
                    }`}
                  />

                  {/* Region Name Label */}
                  <text
                    x={reg.cx}
                    y={reg.cy + 14}
                    textAnchor="middle"
                    className="text-[9px] font-bold fill-slate-200 pointer-events-none drop-shadow"
                  >
                    {reg.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating Selected Region Indicator Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/95 backdrop-blur-md border border-cyan-500/50 rounded-lg p-2.5 shadow-2xl max-w-xs text-xs">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {selectedLocation.name}
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              selectedLocation.alertLevel === 'EXTREME' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300'
            }`}>
              {selectedLocation.alertLevel}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300 mt-1 font-mono">
            <div>Regime: <span className="text-purple-300 font-bold">{selectedLocation.regime}</span></div>
            <div>Rain: <span className="text-cyan-300 font-bold">{selectedLocation.currentRain}mm</span></div>
            <div>Wind: <span className="text-emerald-300 font-bold">{selectedLocation.currentWind}km/h</span></div>
          </div>
        </div>

      </div>
    </div>
  );
};
