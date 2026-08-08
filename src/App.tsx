import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { GovernmentLayout } from './components/layout/GovernmentLayout';
import { BankLayout } from './components/layout/BankLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';

// Farmer Pages
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

// Financial Passport & Public Verification
import { FinancialPassportPage } from './pages/financial/FinancialPassportPage';
import { PassportVerificationPage } from './pages/financial/PassportVerificationPage';

// B2G Government Pages
import { GovernmentOverviewPage } from './pages/government/GovernmentOverviewPage';
import { GovernmentMapPage } from './pages/government/GovernmentMapPage';
import { GovernmentLandPage } from './pages/government/GovernmentLandPage';
import { GovernmentManagementPlanPage } from './pages/government/GovernmentManagementPlanPage';
import { GovernmentReportsPage } from './pages/government/GovernmentReportsPage';
import { GovernmentAlertsPage } from './pages/government/GovernmentAlertsPage';
import { GovernmentOrganizationsPage } from './pages/government/GovernmentOrganizationsPage';
import { GovernmentOrgDetailPage } from './pages/government/GovernmentOrgDetailPage';

// B2B Bank Portal Pages
import { BankOverviewPage } from './pages/bank/BankOverviewPage';
import { BankSearchPage } from './pages/bank/BankSearchPage';
import { BankApiPage } from './pages/bank/BankApiPage';
import { BankApiDocsPage } from './pages/bank/BankApiDocsPage';

// Ecosystem & Methodology Pages
import { EcosystemPage } from './pages/EcosystemPage';
import { LegalMethodologyPage } from './pages/LegalMethodologyPage';
import { AuditLogPage } from './pages/AuditLogPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Pages & QR Verification */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/verify/:id" element={<PassportVerificationPage />} />

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
            <Route path="/financial-passport" element={<FinancialPassportPage />} />
            <Route path="/ecosystem" element={<EcosystemPage />} />
            <Route path="/legal/data-methodology" element={<LegalMethodologyPage />} />
            <Route path="/settings/audit-log" element={<AuditLogPage />} />
          </Route>

          {/* B2G Government Layout */}
          <Route element={<GovernmentLayout />}>
            <Route path="/government" element={<GovernmentOverviewPage />} />
            <Route path="/government/map" element={<GovernmentMapPage />} />
            <Route path="/government/pastures" element={<GovernmentOverviewPage />} />
            <Route path="/government/land" element={<GovernmentLandPage />} />
            <Route path="/government/livestock" element={<GovernmentOverviewPage />} />
            <Route path="/government/alerts" element={<GovernmentAlertsPage />} />
            <Route path="/government/management-plan" element={<GovernmentManagementPlanPage />} />
            <Route path="/government/reports" element={<GovernmentReportsPage />} />
            <Route path="/government/organizations" element={<GovernmentOrganizationsPage />} />
            <Route path="/government/organizations/:id" element={<GovernmentOrgDetailPage />} />
            <Route path="/government/settings" element={<AuditLogPage />} />
          </Route>

          {/* B2B Bank Layout */}
          <Route element={<BankLayout />}>
            <Route path="/bank" element={<BankOverviewPage />} />
            <Route path="/bank/applications" element={<BankOverviewPage />} />
            <Route path="/bank/search" element={<BankSearchPage />} />
            <Route path="/bank/farms/:id" element={<BankSearchPage />} />
            <Route path="/bank/passports" element={<BankOverviewPage />} />
            <Route path="/bank/api" element={<BankApiPage />} />
            <Route path="/bank/api/docs" element={<BankApiDocsPage />} />
            <Route path="/bank/reports" element={<GovernmentReportsPage />} />
            <Route path="/bank/settings" element={<AuditLogPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
