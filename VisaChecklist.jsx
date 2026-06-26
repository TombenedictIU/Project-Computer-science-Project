import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import WorkflowPage from './pages/WorkflowPage';
import VisaPage from './pages/VisaPage';
import OverviewPage from './pages/OverviewPage';
import AiAssistantPage from './pages/AiAssistantPage';
import AdminPage from './pages/AdminPage';
import DashboardLayout from './components/DashboardLayout';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <DashboardLayout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'landing' && <LandingPage onStart={() => setCurrentView('anmeldung')} />}
      {currentView === 'overview' && <OverviewPage />}
      {currentView === 'anmeldung' && <WorkflowPage />}
      {currentView === 'visa' && <VisaPage />}
      {currentView === 'ai' && <AiAssistantPage />}
      {currentView === 'admin' && <AdminPage />}
    </DashboardLayout>
  );
}

export default App;

