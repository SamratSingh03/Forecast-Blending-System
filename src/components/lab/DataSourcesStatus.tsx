import React from 'react';
import { Database, Wifi, CheckCircle2, Server } from 'lucide-react';

export const DataSourcesStatus: React.FC = () => {
  const sources = [
    { name: "ECMWF HRES (NWP-A)", format: "GRIB2 (0.1° Grid)", latency: "12 min ago", status: "CONNECTED", quality: "99.8%" },
    { name: "GFS Global (NWP-B)", format: "GRIB2 (0.25° Grid)", latency: "18 min ago", status: "CONNECTED", quality: "99.4%" },
    { name: "GraphCast / AIFS (AI)", format: "NetCDF4 Tensors", latency: "04 min ago", status: "PROCESSING", quality: "99.9%" },
    { name: "Multi-Model Ensemble", format: "50-Member GRIB", latency: "25 min ago", status: "CONNECTED", quality: "98.9%" },
    { name: "IMD AWS Station Network", format: "JSON REST API", latency: "02 min ago", status: "CONNECTED", quality: "99.2%" },
    { name: "INSAT-3D Doppler Radar", format: "GeoTIFF Imagery", latency: "01 min ago", status: "CONNECTED", quality: "99.7%" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {sources.map((src, i) => (
        <div key={i} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Server className="w-4 h-4 text-cyan-400" />
              <h5 className="text-xs font-bold text-slate-100">{src.name}</h5>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">{src.format}</p>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-2">
              <span>Latency: <strong className="text-slate-300">{src.latency}</strong></span>
              <span>Quality: <strong className="text-emerald-400">{src.quality}</strong></span>
            </div>
          </div>

          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
            src.status === 'CONNECTED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse'
          }`}>
            {src.status}
          </span>
        </div>
      ))}
    </div>
  );
};
