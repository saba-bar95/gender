import React, { useEffect, useState } from "react";

const Footer = ({ language = "GE" }) => {
  const year = new Date().getFullYear();
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showGoTop && (
        <button
          onClick={handleGoTop}
          aria-label={language === "GE" ? "ზემოთ დაბრუნება" : "Go to top"}
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px",
            zIndex: 1000,
            width: "52px",
            height: "52px",
            borderRadius: "999px",
            border: "none",
            background: "#0066e0",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(0, 102, 224, 0.28)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          ↑
        </button>
      )}
      <footer className="w-full text-center text-sm text-gray-700 py-6 mt-auto app-footer">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm text-gray-600 leading-5 bpg_mrgvlovani_caps footer-text">
            {language === "GE"
              ? `© ${year} ყველა უფლება დაცულია.`
              : `© ${year} All rights reserved.`}
            <br />
            {language === "GE"
              ? "საქართველოს სტატისტიკის ეროვნული სამსახური (საქსტატი)"
              : "National Statistics Office of Georgia (Geostat)"}
            <br />
            <a
              href="https://www.geostat.ge/ka/page/monacemta-gamoyenebis-pirobebi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {language === "GE"
                ? "მონაცემთა გამოყენების პირობები"
                : "Terms of Use"}
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
