import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId, LeadTime, WeatherVariable, Season, LocationOption } from '../types';
import { getLocations } from '../services/weatherService';

interface AppContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  selectedLocation: LocationOption;
  setSelectedLocation: (loc: LocationOption) => void;
  locations: LocationOption[];
  selectedLeadTime: LeadTime;
  setSelectedLeadTime: (time: LeadTime) => void;
  selectedVariable: WeatherVariable;
  setSelectedVariable: (v: WeatherVariable) => void;
  selectedRegime: string;
  setSelectedRegime: (regimeId: string) => void;
  selectedSeason: Season;
  setSelectedSeason: (season: Season) => void;
  anomalyOverride: boolean;
  setAnomalyOverride: (active: boolean) => void;
  // Demo Mode controls
  isDemoPlaying: boolean;
  demoStep: number;
  startDemo: () => void;
  pauseDemo: () => void;
  stopDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('landing');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption>({
    id: "odisha",
    name: "Odisha Coastal Zone",
    state: "Odisha",
    type: "state",
    lat: 20.9517,
    lng: 85.0985,
    regime: "Heavy Rainfall",
    currentTemp: 28.1,
    currentRain: 92.4,
    currentWind: 58.0,
    alertLevel: "EXTREME"
  });
  const [selectedLeadTime, setSelectedLeadTime] = useState<LeadTime>('Now');
  const [selectedVariable, setSelectedVariable] = useState<WeatherVariable>('rainfall');
  const [selectedRegime, setSelectedRegime] = useState<string>('heavy_rain');
  const [selectedSeason, setSelectedSeason] = useState<Season>('Monsoon');
  const [anomalyOverride, setAnomalyOverride] = useState<boolean>(false);

  // Demo playback state
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);

  useEffect(() => {
    getLocations().then(locs => {
      setLocations(locs);
      if (locs.length > 1) {
        setSelectedLocation(locs[1]); // Default Odisha Coastal
      }
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Demo player timer
  useEffect(() => {
    let timer: any;
    if (isDemoPlaying) {
      timer = setInterval(() => {
        setDemoStep(prev => {
          const next = prev + 1;
          if (next > 8) {
            setIsDemoPlaying(false);
            return 8;
          }
          const demoPageMap: PageId[] = [
            'landing',     // Step 0: Overview
            'command',     // Step 1: Ingest & Multi-Model
            'regime',      // Step 2: Regime Detection
            'weights',     // Step 3: Dynamic Weighting
            'forecast',    // Step 4: AI + NWP Blending
            'pipeline',    // Step 5: Bias Correction & Physics
            'confidence',  // Step 6: Confidence & Explainability
            'extreme',     // Step 7: Extreme Weather Check
            'impact'       // Step 8: Final Decision Support
          ];
          setActivePage(demoPageMap[next] || 'command');
          return next;
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isDemoPlaying]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const startDemo = () => {
    setDemoStep(1);
    setActivePage('command');
    setIsDemoPlaying(true);
  };

  const pauseDemo = () => {
    setIsDemoPlaying(false);
  };

  const stopDemo = () => {
    setIsDemoPlaying(false);
    setDemoStep(0);
  };

  const nextDemoStep = () => {
    setDemoStep(prev => Math.min(prev + 1, 8));
  };

  const prevDemoStep = () => {
    setDemoStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        theme,
        toggleTheme,
        selectedLocation,
        setSelectedLocation,
        locations,
        selectedLeadTime,
        setSelectedLeadTime,
        selectedVariable,
        setSelectedVariable,
        selectedRegime,
        setSelectedRegime,
        selectedSeason,
        setSelectedSeason,
        anomalyOverride,
        setAnomalyOverride,
        isDemoPlaying,
        demoStep,
        startDemo,
        pauseDemo,
        stopDemo,
        nextDemoStep,
        prevDemoStep
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
