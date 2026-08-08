import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { TodayPage } from './pages/TodayPage';
import { MapPage } from './pages/MapPage';
import { PasturesPage } from './pages/PasturesPage';
import { PastureDetailPage } from './pages/PastureDetailPage';
import { HerdPage } from './pages/HerdPage';
import { HerdDetailPage } from './pages/HerdDetailPage';
import { TrackersPage } from './pages/TrackersPage';
import { SafetyPage } from './pages/SafetyPage';
import { WorkersPage } from './pages/WorkersPage';
import { WorkerDetailPage } from './pages/WorkerDetailPage';
import { ContractsPage } from './pages/ContractsPage';
import { ContractCreatePage } from './pages/ContractCreatePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { FarmPage } from './pages/FarmPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Authenticated Farmer App Layout */}
          <Route element={<Layout />}>
            <Route path="/app" element={<TodayPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/pastures" element={<PasturesPage />} />
            <Route path="/pastures/:id" element={<PastureDetailPage />} />
            <Route path="/herd" element={<HerdPage />} />
            <Route path="/herd/:id" element={<HerdDetailPage />} />
            <Route path="/trackers" element={<TrackersPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/workers" element={<WorkersPage />} />
            <Route path="/workers/:id" element={<WorkerDetailPage />} />
            <Route path="/contracts" element={<ContractsPage />} />
            <Route path="/contracts/create" element={<ContractCreatePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/farm" element={<FarmPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
