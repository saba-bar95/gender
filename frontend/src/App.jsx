import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/footer";
import ErrorBoundary from "./components/ErrorBoundary";
import GlossaryModal from "./components/GlossaryModal";
import StatisticsSectionPage from "./components/StatisticsSectionPage";
import PopulationPage from "./pages/section/PopulationPage";
import HealthPage from "./pages/section/HealthPage";
import EducationPage from "./pages/section/EducationPage";
import SocialProtectionPage from "./pages/section/SocialProtectionPage";
import HouseholdsPage from "./pages/section/HouseholdsPage";
import EmploymentPage from "./pages/section/EmploymentPage";
import IncomeAndExpenditurePage from "./pages/section/IncomeAndExpenditurePage";
import IctPage from "./pages/section/IctPage";
import BusinessSectorPage from "./pages/section/BusinessSectorPage";
import AgriculturePage from "./pages/section/AgriculturePage";
import OffencesPage from "./pages/section/OffencesPage";
import GovernancePage from "./pages/section/GovernancePage";
import SportPage from "./pages/section/SportPage";
import SdgPage from "./pages/section/SdgPage";
import "./App.scss";

function App() {
  // Persist language in localStorage
  const getInitialLanguage = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gender_language') || 'GE';
    }
    return 'GE';
  };
  const [language, setLanguageState] = useState(getInitialLanguage());
  const setLanguage = (lang) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gender_language', lang);
    }
  };
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const renderWithLayout = (content) => (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--app-bg)", color: "var(--app-text)" }}
    >
      <div className="w-full flex justify-center" style={{ backgroundColor: "var(--app-bg)" }}>
        <div className="w-full">
          <Header
            language={language}
            setLanguage={setLanguage}
            onGlossaryOpen={() => setGlossaryOpen(true)}
          />
        </div>
      </div>
      {glossaryOpen && (
        <GlossaryModal language={language} onClose={() => setGlossaryOpen(false)} />
      )}
      <div className="w-full flex flex-1 justify-center" style={{ marginTop: 0 }}>
        <div className="w-full">{content}</div>
      </div>
      <Footer
        className="mt-auto"
        language={language}
        setLanguage={setLanguage}
        onGlossaryOpen={() => setGlossaryOpen(true)}
      />
    </div>
  );

  return (
    <ErrorBoundary language={language}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={renderWithLayout(
              <Main language={language} setLanguage={setLanguage} />,
            )}
          />
          <Route
            path="/statistics/population"
            element={renderWithLayout(<PopulationPage language={language} />)}
          />
          <Route
            path="/statistics/health"
            element={renderWithLayout(<HealthPage language={language} />)}
          />
          <Route
            path="/statistics/education"
            element={renderWithLayout(<EducationPage language={language} />)}
          />
          <Route
            path="/statistics/social-protection"
            element={renderWithLayout(<SocialProtectionPage language={language} />)}
          />
          <Route
            path="/statistics/households"
            element={renderWithLayout(<HouseholdsPage language={language} />)}
          />
          <Route
            path="/statistics/employment"
            element={renderWithLayout(<EmploymentPage language={language} />)}
          />
          <Route
            path="/statistics/income-and-expenditure"
            element={renderWithLayout(
              <IncomeAndExpenditurePage language={language} />,
            )}
          />
          <Route
            path="/statistics/ict"
            element={renderWithLayout(<IctPage language={language} />)}
          />
          <Route
            path="/statistics/business-sector"
            element={renderWithLayout(<BusinessSectorPage language={language} />)}
          />
          <Route
            path="/statistics/agriculture"
            element={renderWithLayout(<AgriculturePage language={language} />)}
          />
          <Route
            path="/statistics/offences"
            element={renderWithLayout(<OffencesPage language={language} />)}
          />
          <Route
            path="/statistics/governance"
            element={renderWithLayout(<GovernancePage language={language} />)}
          />
          <Route
            path="/statistics/sport"
            element={renderWithLayout(<SportPage language={language} />)}
          />
          <Route
            path="/goals/:goalId"
            element={renderWithLayout(<SdgPage language={language} />)}
          />
          <Route
            path="/statistics/:section"
            element={renderWithLayout(<StatisticsSectionPage language={language} />)}
          />
          <Route
            path="*"
            element={renderWithLayout(
              <Main language={language} setLanguage={setLanguage} />,
            )}
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
