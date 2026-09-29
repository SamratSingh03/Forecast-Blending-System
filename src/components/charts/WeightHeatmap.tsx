import React from 'react';

interface WeightHeatmapProps {
  matrix: any[];
}

export const WeightHeatmap: React.FC<WeightHeatmapProps> = ({ matrix }) => {
  const getIntensityColor = (val: number) => {
    if (val >= 40) return 'bg-cyan-500/80 text-slate-950 font-extrabold border-cyan-400';
    if (val >= 30) return 'bg-cyan-900/80 text-cyan-300 border-cyan-700 font-bold';
    if (val >= 20) return 'bg-purple-950/80 text-purple-300 border-purple-800 font-semibold';
    return 'bg-slate-950/60 text-slate-400 border-slate-800';
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="text-[10px] font-mono text-slate-400 mb-2 flex justify-between">
        <span>Dynamic Weight Matrix by Weather Regime</span>
        <span>Demo Benchmark</span>
      </div>

      <table className="w-full text-xs text-left border-collapse font-mono">
        <thead>
          <tr className="border-b border-slate-800 text-slate-400">
            <th className="p-2">Regime</th>
            <th className="p-2 text-center">ECMWF (NWP-A)</th>
            <th className="p-2 text-center">GFS (NWP-B)</th>
            <th className="p-2 text-center">AI Model</th>
            <th className="p-2 text-center">Ensemble</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, idx) => (
            <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-900/60">
              <td className="p-2 font-bold text-slate-200">{row.regime}</td>
              <td className="p-1.5 text-center">
                <div className={`p-1.5 rounded border text-xs ${getIntensityColor(row.nwpa)}`}>
                  {row.nwpa}%
                </div>
              </td>
              <td className="p-1.5 text-center">
                <div className={`p-1.5 rounded border text-xs ${getIntensityColor(row.nwpb)}`}>
                  {row.nwpb}%
                </div>
              </td>
              <td className="p-1.5 text-center">
                <div className={`p-1.5 rounded border text-xs ${getIntensityColor(row.ai)}`}>
                  {row.ai}%
                </div>
              </td>
              <td className="p-1.5 text-center">
                <div className={`p-1.5 rounded border text-xs ${getIntensityColor(row.ensemble)}`}>
                  {row.ensemble}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
