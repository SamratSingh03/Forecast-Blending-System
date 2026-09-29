import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { DemoPlayer } from './components/common/DemoPlayer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { ForecastAnalysisPage } from './pages/ForecastAnalysisPage';
import { ModelWeightsPage } from './pages/ModelWeightsPage';
import { WeatherRegimePage } from './pages/WeatherRegimePage';
import { ExtremeWeatherPage } from './pages/ExtremeWeatherPage';
import { ConfidenceExplainabilityPage } from './pages/ConfidenceExplainabilityPage';
import { PipelineModelLabPage } from './pages/PipelineModelLabPage';
import { ImpactReferencesPage } from './pages/ImpactReferencesPage';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'landing': return <LandingPage />;
      case 'command': return <CommandCenterPage />;
      case 'forecast': return <ForecastAnalysisPage />;
      case 'weights': return <ModelWeightsPage />;
      case 'regime': return <WeatherRegimePage />;
      case 'extreme': return <ExtremeWeatherPage />;
      case 'confidence': return <ConfidenceExplainabilityPage />;
      case 'pipeline': return <PipelineModelLabPage />;
      case 'impact': return <ImpactReferencesPage />;
      default: return <CommandCenterPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 dark:bg-navy-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors">
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 pb-24 md:pb-12 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>

      <MobileBottomNav />
      <DemoPlayer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
