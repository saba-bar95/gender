import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import AboutGenderModal from "./AboutGenderModal";
import sakstatLogoGe from "../assets/images/sakstat-logo.svg";
import sakstatLogoEn from "../assets/images/sakstat-logo-en.png";
import logo2 from "../assets/images/logo2.png";
import unWomenLogo from "../assets/images/un.png";
import sdgIcon1 from "../assets/images/sgd1.svg";
import sdgIcon2 from "../assets/images/sgd2.svg";
import georgianFlag from "../assets/images/georgian-flag.svg";
import britishFlag from "../assets/images/british-flag.png";
import facebookIcon from "../assets/images/facebook.svg";
import twitterIcon from "../assets/images/twitter.svg";
import linkedinIcon from "../assets/images/linkedin.svg";

const Header = ({ language = "GE", setLanguage = () => {}, onGlossaryOpen = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [mobileStatsOpen, setMobileStatsOpen] = useState(false);
  const [sdgHover, setSdgHover] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const langRef = useRef(null);

  const sections = [
    { ge: "მოსახლეობა", en: "Population", route: "/statistics/population" },
    { ge: "ჯანმრთელობის დაცვა", en: "Health", route: "/statistics/health" },
    { ge: "განათლება", en: "Education", route: "/statistics/education" },
    { ge: "სოციალური უზრუნველყოფა", en: "Social Protection", route: "/statistics/social-protection" },
    { ge: "შინამეურნეობები", en: "Households", route: "/statistics/households" },
    { ge: "დასაქმება და უმუშევრობა", en: "Employment", route: "/statistics/employment" },
    { ge: "შემოსავლები და ხარჯები", en: "Income and Expenditure", route: "/statistics/income-and-expenditure" },
    { ge: "ICT", en: "ICT", route: "/statistics/ict" },
    { ge: "ბიზნეს სექტორი", en: "Business Sector", route: "/statistics/business-sector" },
    { ge: "სოფლის მეურნეობა", en: "Agriculture", route: "/statistics/agriculture" },
    { ge: "სამართალდარღვევები", en: "Offences", route: "/statistics/offences" },
    { ge: "ხელისუფლება", en: "Governance", route: "/statistics/governance" },
    { ge: "სპორტი", en: "Sport", route: "/statistics/sport" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "GE", label: "ქარ", flag: georgianFlag },
    { code: "EN", label: "ENG",  flag: britishFlag  },
  ];

  const current = languages.find((l) => l.code === language);

  const t = {
    GE: {
      portalLine1: "ქალისა და კაცის სტატისტიკა",
      nav: [
        "სტატისტიკური ინფორმაცია",
        "პუბლიკაციები",
        "კანონმდებლობა",
        "ბმულები",
        "გლოსარიუმი",
        "გენდერის შესახებ",
        "ინფოგრაფიკა",
      ],
    },
    EN: {
      portalLine1: "GENDER STATISTICS",
      portalLine2: "PORTAL",
      nav: [
        "MAIN STATISTICS",
        "PUBLICATIONS",
        "LEGISLATION",
        "LINKS",
        "GLOSSARY",
        "ABOUT GENDER",
        "INFOGRAPHIC",
      ],
    },
  };

  const txt = t[language] ?? t.GE;

  const goToHomeSection = (sectionId) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    navigate(`/#${sectionId}`);
  };

  return (
    <>
    <header className="w-full" style={{ fontFamily: "bpg-nino, sans-serif", fontFeatureSettings: '"case" on' }}>
      {/* TOP BAR */}
      <div style={{display: "flex", alignItems: "center", maxWidth: "1340px", margin: "0 auto", width: "100%" }}>

        {/* COL 1 (col-sm-8): logo2 + genderText + SDG */}
        <div style={{ flex: "0 0 66.66%", display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img src={logo2} alt="LOGO" style={{ verticalAlign: "middle" }} />
          </Link>

          <div style={{ paddingLeft: "10px", color: "#e4535f", fontSize: "24px", fontFamily: "bpg-nino, sans-serif" }}>
            {txt.portalLine1}
          </div>

          <div style={{ flex: "0 0 16.66%", paddingLeft: "12px" }}>
            <a
              href="#sdg"
              title="მდგრადი განვითარების მიზნები"
              onClick={(e) => {
                e.preventDefault();
                goToHomeSection("sdg");
              }}
            >
              <img
                src={sdgHover ? sdgIcon2 : sdgIcon1}
                alt="SDG"
                onMouseEnter={() => setSdgHover(true)}
                onMouseLeave={() => setSdgHover(false)}
                style={{ width: "46%", verticalAlign: "middle" }}
              />
            </a>
          </div>
        </div>

        {/* COL 2 (col-sm-2): Geostat logo + border-right */}
        <div style={{ flex: "0 0 16.66%", borderRight: "1px solid #009ddc", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "12px" }}>
          <a href="http://geostat.ge" target="_blank" rel="noreferrer">
            <img
              src={language === "GE" ? sakstatLogoGe : sakstatLogoEn}
              alt="Geostat"
              style={{ height: "52px", width: "auto", display: "block", marginLeft: "auto", verticalAlign: "middle" }}
            />
          </a>
        </div>

        {/* COL 3 (col-sm-2): UN Women logo + lang + hamburger */}
        <div style={{ flex: "0 0 16.66%", paddingRight: 0, display: "flex", alignItems: "center", gap: "12px", paddingLeft: "12px" }}>
          <a href="https://www.unwomen.org/en" target="_blank" rel="noreferrer" className="hidden md:block">
            <img
              src={unWomenLogo}
              alt="UN Women"
              style={{ width: "100%", verticalAlign: "middle" }}
            />
          </a>

          {/* Language Dropdown */}
          <div className="relative hidden md:block" ref={langRef}>
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 text-sm bg-white hover:bg-gray-50 cursor-pointer"
            >
              <img src={current.flag} alt={current.code} className="w-5 h-4 object-cover rounded-sm" />
              <span>{current.label}</span>
              <svg className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                      language === lang.code ? "bg-blue-50 font-semibold text-blue-700" : ""
                    }`}
                  >
                    <img src={lang.flag} alt={lang.code} className="w-5 h-4 object-cover rounded-sm" />
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* HAMBURGER — mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="მენიუ"
          >
            <span className={`block w-6 h-[2px] bg-gray-700 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[2px] bg-gray-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-gray-700 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 px-6 pb-4 flex flex-col gap-3">
          {/* Language */}
          <div className="flex items-center gap-3 pt-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setMenuOpen(false); }}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm cursor-pointer ${
                  language === lang.code ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
                }`}
              >
                <img src={lang.flag} alt={lang.code} className="w-5 h-4 object-cover rounded-sm" />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
          {/* Nav links */}
          {txt.nav.map((item, idx) =>
            idx === 0 ? (
              <div key={item}>
                <button
                  onClick={() => setMobileStatsOpen((prev) => !prev)}
                  className="flex items-center justify-between w-full text-[15px] text-gray-800 py-2 border-b border-gray-200 hover:text-blue-700 cursor-pointer"
                >
                  {item}
                  <svg className={`w-3 h-3 transition-transform ${mobileStatsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileStatsOpen && (
                  <div className="pl-4 flex flex-col">
                    {sections.map((s) => (
                      <Link
                        key={s.route}
                        to={s.route}
                        onClick={() => { setMenuOpen(false); setMobileStatsOpen(false); }}
                        className="text-[14px] text-gray-700 py-2 border-b border-gray-100 hover:text-blue-700"
                        style={{ fontFamily: "bpg-nino, sans-serif", fontFeatureSettings: '"case" on' }}
                      >
                        {language === "EN" ? s.en : s.ge}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item}
                href={idx === 1 ? "#publications" : idx === 2 ? "#legislation" : idx === 3 ? "#links" : "#"}
                onClick={(e) => {
                  e.preventDefault();
                  if (idx === 1 || idx === 2 || idx === 3) {
                    const ids = { 1: "publications", 2: "legislation", 3: "links" };
                    goToHomeSection(ids[idx]);
                    setMenuOpen(false);
                  } else if (idx === 4) {
                    onGlossaryOpen();
                    setMenuOpen(false);
                  } else if (idx === 5) {
                    setAboutOpen(true);
                    setMenuOpen(false);
                  } else if (idx === 6) {
                    navigate("/infographic");
                    setMenuOpen(false);
                  } else {
                    setMenuOpen(false);
                  }
                }}
                className="text-[15px] text-gray-800 py-2 border-b border-gray-200 hover:text-blue-700"
              >
                {item}
              </a>
            )
          )}
          {/* Socials */}
          <div className="flex items-center gap-4 pt-2">
            <a href="https://www.facebook.com/geostat.ge/" target="_blank" rel="noreferrer">
              <img src={facebookIcon} alt="Facebook" className="w-5 h-5 object-contain" />
            </a>
            <a href="https://twitter.com/Geostat100" target="_blank" rel="noreferrer">
              <img src={twitterIcon} alt="Twitter" className="w-5 h-5 object-contain" />
            </a>
            <a href="https://www.linkedin.com/company/national-statistics-office-of-georgia/mycompany/" target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 object-contain" />
            </a>
          </div>
        </div>
      )}

      {/* NAVBAR — desktop only */}
      <nav className="hidden md:block text-white" style={{ background: "#009ddc" }}>
        <div className="flex justify-center items-stretch gap-10 text-[16px]">
          {txt.nav.map((item, idx) =>
            idx === 0 ? (
              <div
                key={item}
                className="relative flex items-stretch"
                onMouseEnter={() => setStatsOpen(true)}
                onMouseLeave={() => setStatsOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-[20px] transition-colors duration-200 hover:bg-white hover:text-gray-900 cursor-pointer">
                  {item}
                  <svg className={`w-3 h-3 transition-transform ${statsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {statsOpen && (
                  <div className="absolute top-full left-0 bg-white text-gray-800 shadow-xl rounded-b-lg z-50 min-w-[280px] py-1" style={{ border: "1px solid #e5e7eb" }}>
                    {sections.map((s) => (
                      <Link
                        key={s.route}
                        to={s.route}
                        onClick={() => setStatsOpen(false)}
                        className="block px-4 py-2 text-[14px] hover:bg-blue-50 hover:text-blue-700"
                        style={{ fontFamily: "bpg-nino, sans-serif", fontFeatureSettings: '"case" on' }}
                      >
                        {language === "EN" ? s.en : s.ge}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item}
                href={idx === 1 ? "#publications" : idx === 2 ? "#legislation" : idx === 3 ? "#links" : "#"}
                onClick={(e) => {
                  e.preventDefault();
                  if (idx === 1 || idx === 2 || idx === 3) {
                    const ids = { 1: "publications", 2: "legislation", 3: "links" };
                    goToHomeSection(ids[idx]);
                  } else if (idx === 4) {
                    onGlossaryOpen();
                  } else if (idx === 5) {
                    setAboutOpen(true);
                  } else if (idx === 6) {
                    navigate("/infographic");
                  }
                }}
                className="flex items-center px-3 py-[20px] transition-colors duration-200 hover:bg-white hover:text-gray-900"
              >
                {item}
              </a>
            )
          )}
        </div>
      </nav>
    </header>

    {aboutOpen && (
      <AboutGenderModal language={language} onClose={() => setAboutOpen(false)} />
    )}
    </>
  );
};

export default Header;
