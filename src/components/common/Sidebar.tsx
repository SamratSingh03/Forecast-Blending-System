import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { 
  LayoutDashboard, 
  LineChart, 
  Sliders, 
  CloudLightning, 
  AlertTriangle, 
  ShieldCheck, 
  GitCommit, 
  BookOpen, 
  Home
} from 'lucide-react';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.FC<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: 'landing', label: 'Overview & Home', icon: Home },
  { id: 'command', label: 'Command Center', icon: LayoutDashboard, badge: 'Main' },
  { id: 'forecast', label: 'Forecast Analysis', icon: LineChart },
  { id: 'weights', label: 'Model Weights (USP)', icon: Sliders, badge: 'AI Engine' },
  { id: 'regime', label: 'Weather Regime', icon: CloudLightning },
  { id: 'extreme', label: 'Extreme Weather', icon: AlertTriangle, badge: 'Alerts' },
  { id: 'confidence', label: 'Confidence & DNA', icon: ShieldCheck },
  { id: 'pipeline', label: 'Pipeline & Model Lab', icon: GitCommit, badge: '9 Steps' },
  { id: 'impact', label: 'Impact & References', icon: BookOpen },
];

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  return (
    <aside className="w-64 shrink-0 hidden md:block bg-white dark:bg-navy-950/80 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-61px)] p-3">
      <nav className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Navigation Directory
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-cyan-50 dark:bg-gradient-to-r dark:from-cyan-950/80 dark:to-slate-900 text-cyan-700 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800/60 font-semibold shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                }`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isActive
                    ? 'bg-cyan-100 dark:bg-cyan-900/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Info */}
      <div className="mt-8 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
          <span>Engine Status</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            ACTIVE
          </span>
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Dynamic Bayesian weighting algorithm processing 4 model streams.
        </p>
      </div>
    </aside>
  );
};
