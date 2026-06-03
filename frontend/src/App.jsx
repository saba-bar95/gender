import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/footer";
import ErrorBoundary from "./components/ErrorBoundary";
import GlossaryModal from "./components/GlossaryModal";
import SdgPage from "./components/SdgPage";
import "./App.scss";

function App() {
  // Persist language in localStorage
  const getInitialLanguage = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("gender_language") || "GE";
    }
    return "GE";
  };
  const [language, setLanguageState] = useState(getInitialLanguage());
  const setLanguage = (lang) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("gender_language", lang);
    }
  };
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const renderWithLayout = (content) => (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--app-bg)", color: "var(--app-text)" }}
    >
      <div
        className="w-full flex justify-center"
        style={{ backgroundColor: "var(--app-bg)" }}
      >
        <div className="w-full">
          <Header
            language={language}
            setLanguage={setLanguage}
            onGlossaryOpen={() => setGlossaryOpen(true)}
          />
        </div>
      </div>
      {glossaryOpen && (
        <GlossaryModal
          language={language}
          onClose={() => setGlossaryOpen(false)}
        />
      )}
      <div
        className="w-full flex flex-1 justify-center"
        style={{ marginTop: 0 }}
      >
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
            path="/goals/:goalId"
            element={renderWithLayout(<SdgPage language={language} />)}
          />
          <Route
            path="/statistics/:section"
            element={renderWithLayout(
              <Main language={language} setLanguage={setLanguage} />,
            )}
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
