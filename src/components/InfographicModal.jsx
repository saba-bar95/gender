import { useEffect, useCallback, useState } from "react";
import "./modalShared.scss";
import "./InfographicModal.scss";

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
      <div onClick={handleBackdrop} className="modal-overlay">
        <div className="modal-dialog">
          <div className="modal-header">
            <h2 className="modal-title modal-title--nino">
              {language === "EN" ? "Infographic" : "ინფოგრაფიკა"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="modal-close-btn modal-close-btn--plain"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="modal-body infographic-body">
            <div className="infographic-filter">
              <select
                id="infographic-section-select"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="modal-select"
                style={{ fontFamily: "myFont, sans-serif" }}
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
                    {language === "EN" ? pair.en : pair.ge}
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
              <button
                type="button"
                className="pdf-modal-close"
                onClick={() => setActivePdf(null)}
                aria-label="Close PDF"
              >
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
