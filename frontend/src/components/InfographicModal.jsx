import { useEffect, useCallback, useState } from "react";

const statisticSections = [
  { value: "population", ge: "მოსახლეობა", en: "Population" },
  { value: "health", ge: "ჯანმრთელობის დაცვა", en: "Health" },
  { value: "education", ge: "განათლება", en: "Education" },
  { value: "social-protection", ge: "სოციალური უზრუნველყოფა", en: "Social Protection" },
  { value: "households", ge: "შინამეურნეობები", en: "Households" },
  { value: "employment", ge: "დასაქმება და უმუშევრობა", en: "Employment" },
  { value: "income-and-expenditure", ge: "შემოსავლები და ხარჯები", en: "Income and Expenditure" },
  { value: "ict", ge: "ICT", en: "ICT" },
  { value: "business-sector", ge: "ბიზნეს სექტორი", en: "Business Sector" },
  { value: "agriculture", ge: "სოფლის მეურნეობა", en: "Agriculture" },
  { value: "offences", ge: "სამართალდარღვევები", en: "Offences" },
  { value: "governance", ge: "ხელისუფლება", en: "Governance" },
  { value: "sport", ge: "სპორტი", en: "Sport" },
];

const geImageFiles = [
  "1.PNG",
  "2.PNG",
  "3.PNG",
  "4.PNG",
  "5.PNG",
  "6.PNG",
  "7.PNG",
  "8.PNG",
  "9.PNG",
  "10.PNG",
  "11.PNG",
  "12.PNG",
  "13.PNG",
];

const enImageFiles = [
  "1.PNG",
  "2.PNG",
  "3.PNG",
  "4.PNG",
  "5.PNG",
  "6.PNG",
  "7.PNG",
  "8.PNG",
  "9.PNG",
  "10.PNG",
  "11.PNG",
  "12.png",
  "13.PNG",
];

const gePdfFiles = [
  "1.pdf",
  "2.pdf",
  "3.pdf",
  "4.pdf",
  "5.pdf",
  "6.pdf",
  "7.pdf",
  "8.pdf",
  "9.pdf",
  "10.pdf",
  "11.pdf",
  "12.pdf",
  "13.pdf",
];

const enPdfFiles = [
  "1.pdf",
  "2.pdf",
  "3.pdf",
  "4.pdf",
  "5.pdf",
  "6.pdf",
  "7.pdf",
  "8.pdf",
  "9.pdf",
  "10.pdf",
  "11.pdf",
  "12.pdf",
  "13.pdf",
];

const modalStyles = `
  @keyframes infographicFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes infographicSlideUp {
    from { opacity: 0; transform: translateY(40px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }
  .infographic-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 14px;
    margin-top: 10px;
  }
  .infographic-card {
    border: 1px solid #e5e9f0;
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  }
  .infographic-card:hover {
    transform: translateY(-3px);
    border-color: #9cc2de;
    box-shadow: 0 10px 20px rgba(0, 92, 151, 0.18);
  }
  .infographic-card img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
  }
  .infographic-index {
    padding: 8px 10px;
    font-size: 13px;
    color: #2f4e74;
    font-family: myFont, sans-serif;
    background: #f8fbff;
    border-top: 1px solid #edf2f8;
  }
  .infographic-body p {
    font-size: 14px;
    color: #37496d;
    line-height: 1.7;
    margin: 0;
    font-family: myFont, sans-serif;
  }
  .pdf-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.72);
    z-index: 1200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .pdf-modal-content {
    width: min(1100px, 96vw);
    height: min(86vh, 900px);
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.42);
    display: flex;
    flex-direction: column;
  }
  .pdf-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #005c97;
  }
  .pdf-modal-title {
    margin: 0;
    color: #fff;
    font-size: 14px;
    font-family: myFont, sans-serif;
    font-weight: 500;
  }
  .pdf-modal-close {
    background: transparent;
    border: 0;
    color: #fff;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    padding: 2px 8px;
  }
  .pdf-frame {
    width: 100%;
    height: 100%;
    border: 0;
    flex: 1;
    background: #f5f7fb;
  }
`;

const InfographicModal = ({ language, onClose }) => {
  const [selectedSection, setSelectedSection] = useState("");
  const [activePdf, setActivePdf] = useState(null);

  const imageFiles = language === "EN" ? enImageFiles : geImageFiles;
  const imageFolder = language === "EN" ? "info_en" : "info";
  const pdfFiles = language === "EN" ? enPdfFiles : gePdfFiles;
  const pdfFolder = language === "EN" ? "genderinfographics_en" : "genderinfographics";
  const sectionImagePairs = statisticSections.map((section, idx) => ({
    ...section,
    imageFile: imageFiles[idx],
    pdfFile: pdfFiles[idx],
    imageIndex: idx + 1,
  }));
  const filteredPairs = selectedSection
    ? sectionImagePairs.filter((pair) => pair.value === selectedSection)
    : sectionImagePairs;

  const handleBackdrop = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (activePdf) {
          setActivePdf(null);
          return;
        }
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activePdf, onClose]);

  return (
    <>
      <style>{modalStyles}</style>
      <div
        onClick={handleBackdrop}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          animation: "infographicFadeIn 0.2s ease",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "960px",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            overflow: "hidden",
            animation: "infographicSlideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px 16px",
              background: "#005c97",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "700",
                color: "#fff",
                fontFeatureSettings: '"case" on',
                fontFamily: "bpg-nino, sans-serif",
              }}
            >
              {language === "EN" ? "Infographic" : "ინფოგრაფიკა"}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontSize: "22px",
                lineHeight: 1,
                padding: "4px 8px",
              }}
            >
              ✕
            </button>
          </div>

          <div className="infographic-body" style={{ overflowY: "auto", padding: "24px 28px" }}>
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="infographic-section-select"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  color: "#37496d",
                  fontFamily: "myFont, sans-serif",
                }}
              >
              </label>
              <select
                id="infographic-section-select"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #c5cfe0",
                  background: "#fff",
                  color: "#37496d",
                  fontSize: "14px",
                  fontFamily: "myFont, sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              >
                <option value="">
                  {language === "EN" ? "All categories" : "ყველა კატეგორია"}
                </option>
                {statisticSections.map((section) => (
                  <option key={section.value} value={section.value}>
                    {language === "EN" ? section.en : section.ge}
                  </option>
                ))}
              </select>
            </div>

            <div className="infographic-grid">
              {filteredPairs.map((pair) => (
                <div
                  key={pair.value}
                  className="infographic-card"
                  onClick={() => setActivePdf(pair)}
                >
                  <img
                    src={new URL(`../assets/img/new/${imageFolder}/${pair.imageFile}`, import.meta.url).href}
                    alt={`${language === "EN" ? "Infographic" : "ინფოგრაფიკა"} ${pair.imageIndex}`}
                    loading="lazy"
                  />
                  <div className="infographic-index">
                    {language === "EN"
                      ? `${pair.en}`
                      : `${pair.ge}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activePdf && (
        <div className="pdf-modal-overlay" onClick={() => setActivePdf(null)}>
          <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <h3 className="pdf-modal-title">
                {language === "EN" ? activePdf.en : activePdf.ge}
              </h3>
              <button className="pdf-modal-close" onClick={() => setActivePdf(null)} aria-label="Close PDF">
                ✕
              </button>
            </div>
            <iframe
              className="pdf-frame"
              src={new URL(`../assets/img/${pdfFolder}/${activePdf.pdfFile}`, import.meta.url).href}
              title={`${language === "EN" ? "Infographic PDF" : "ინფოგრაფიკის PDF"} ${activePdf.imageIndex}`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InfographicModal;
