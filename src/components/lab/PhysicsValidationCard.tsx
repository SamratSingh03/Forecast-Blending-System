import React from 'react';
import { PhysicsCheckItem } from '../../types';
import { ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

interface PhysicsValidationCardProps {
  checks: PhysicsCheckItem[];
}

export const PhysicsValidationCard: React.FC<PhysicsValidationCardProps> = ({ checks }) => {
  return (
    <div className="space-y-3">
      {checks.map(chk => (
        <div 
          key={chk.id}
          className={`p-3.5 rounded-xl border transition-all ${
            chk.status === 'PASS' 
              ? 'bg-slate-950/80 border-emerald-900/60 text-slate-200' 
              : 'bg-amber-950/40 border-amber-800/80 text-amber-200'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              {chk.status === 'PASS' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className="font-bold text-xs">{chk.name}</span>
            </div>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              chk.status === 'PASS' 
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                : 'bg-amber-950 text-amber-300 border border-amber-800'
            }`}>
              {chk.status}
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed mb-2">
            {chk.description}
          </p>

          <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-800/80">
            <span className="text-slate-400">Value: <strong className="text-cyan-300">{chk.value}</strong></span>
            <span className="text-slate-400">Limit: <strong className="text-slate-300">{chk.threshold}</strong></span>
          </div>
        </div>
      ))}
    </div>
  );
};
