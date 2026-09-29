import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { 
  LayoutDashboard, 
  LineChart, 
  Sliders, 
  AlertTriangle, 
  GitCommit 
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  const mobileTabs: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'command', label: 'Command', icon: LayoutDashboard },
    { id: 'forecast', label: 'Forecast', icon: LineChart },
    { id: 'weights', label: 'Weights', icon: Sliders },
    { id: 'extreme', label: 'Extreme', icon: AlertTriangle },
    { id: 'pipeline', label: 'Pipeline', icon: GitCommit },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 dark:bg-navy-950/95 light:bg-white/95 backdrop-blur-lg border-t border-slate-800 dark:border-slate-800 light:border-slate-200 px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-5 gap-1">
        {mobileTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePage(tab.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all ${
                isActive 
                  ? 'text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-800/50' 
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
