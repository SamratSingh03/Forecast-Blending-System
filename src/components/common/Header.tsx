import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sun, 
  Moon, 
  Play, 
  MapPin, 
  ShieldAlert, 
  Activity,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    selectedLocation, 
    setSelectedLocation, 
    locations, 
    startDemo, 
    isDemoPlaying,
    setActivePage
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-navy-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3.5 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Brand & Team Tagline */}
        <div className="flex items-center gap-3.5">
          <div 
            onClick={() => setActivePage('landing')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-md group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-slate-900 dark:bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-wider text-slate-900 dark:text-slate-100">
                  FORECASTBRIDGE
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800">
                  v2.4
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                AI × NWP Weather Intelligence • <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Team InnovateX1</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Location Selector & Persistent Safety Badge */}
        <div className="flex items-center gap-4">
          
          {/* Location Selector */}
          <div className="relative flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-inner">
            <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <select
              value={selectedLocation.id}
              onChange={(e) => {
                const found = locations.find(l => l.id === e.target.value);
                if (found) setSelectedLocation(found);
              }}
              className="bg-transparent font-semibold border-none outline-none cursor-pointer text-xs pr-2 text-slate-900 dark:text-slate-100"
            >
              {locations.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {loc.name} ({loc.state})
                </option>
              ))}
            </select>
          </div>

          {/* SIMULATED DATA Persistent Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 text-xs font-semibold tracking-wide">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span>DEMO DATA</span>
          </div>

        </div>

        {/* Right Controls: Light / Dark Mode Toggle & System Demo Launcher */}
        <div className="flex items-center gap-3">
          
          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="hidden md:inline">Dark Mode</span>
              </>
            )}
          </button>

          {/* System Demo Launcher */}
          <button
            onClick={startDemo}
            disabled={isDemoPlaying}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow-md ${
              isDemoPlaying 
                ? 'bg-purple-900/60 text-purple-300 border border-purple-700 cursor-wait'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/30'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span className="hidden sm:inline">System Demo</span>
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>

        </div>

      </div>
    </header>
  );
};
