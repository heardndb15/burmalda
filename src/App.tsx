import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';

// Dashboard Pages
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { MarketPage } from './pages/MarketPage';
import { ResumesPage } from './pages/ResumesPage';
import { ResumeCreatePage } from './pages/ResumeCreatePage';
import { ResumeDetailPage } from './pages/ResumeDetailPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AtsPage } from './pages/AtsPage';
import { HistoryPage } from './pages/HistoryPage';
import { ExportPage } from './pages/ExportPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { EducationPage } from './pages/EducationPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { LanguagesPage } from './pages/LanguagesPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { CoverLettersPage } from './pages/CoverLettersPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { InterviewPage } from './pages/InterviewPage';
import { CareerPage } from './pages/CareerPage';
import { BrandPage } from './pages/BrandPage';
import { LinkedInPage } from './pages/LinkedInPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { BillingPage } from './pages/BillingPage';
import { SupportPage } from './pages/SupportPage';

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

          {/* Authenticated CVGen App Layout */}
          <Route element={<Layout />}>
            <Route path="/app" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/resumes" element={<ResumesPage />} />
            <Route path="/resumes/new" element={<ResumeCreatePage />} />
            <Route path="/resumes/:id" element={<ResumeDetailPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/ats" element={<AtsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/languages" element={<LanguagesPage />} />
            <Route path="/references" element={<ReferencesPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/cover-letters" element={<CoverLettersPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/linkedin" element={<LinkedInPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
