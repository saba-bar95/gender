import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import StatisticsSectionPage from "./StatisticsSectionPage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import legislationSideIcon from "../assets/images/kanonmdebloba.png";
import linksSideIcon from "../assets/images/links.png";
import matsneLogo from "../assets/img/lnk/macne.png";
import defenderLogo from "../assets/img/lnk/damcveli.png";
import arrLeft from "../assets/img/new/arr-left.png";
import arrRight from "../assets/img/new/arr-right.png";
import sectionImage from "../assets/images/section.png";
import { useGenderStatisticsSections } from "../hooks/useGenderStatisticsSections";
import { hasSectionPdfs, openSectionPdfs } from "../utils/sectionPdfs";

// SDG goal images
const sdgImagesKa = Object.fromEntries(
  Array.from({ length: 17 }, (_, i) => [
    i + 1,
    new URL(`../assets/images/goal-${i + 1}-ka.png`, import.meta.url).href,
  ]),
);
const sdgImagesEn = Object.fromEntries(
  Array.from({ length: 17 }, (_, i) => [
    i + 1,
    new URL(`../assets/images/goal-${i + 1}-en.png`, import.meta.url).href,
  ]),
);

const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
};

const SDGSection = ({ language }) => {
  const [hovered, setHovered] = React.useState(null);
  const isMobile = useWindowWidth() < 768;
  const images = language === "EN" ? sdgImagesEn : sdgImagesKa;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "repeat(3, 1fr)"
          : "repeat(auto-fill, 150px)",
        gap: isMobile ? "10px" : "30px",
        justifyContent: isMobile ? "stretch" : "space-between",
        maxWidth: isMobile ? "100%" : "1151px",
        margin: isMobile ? "24px auto" : "70px auto",
        padding: isMobile ? "0 8px" : "0",
      }}
    >
      {Array.from({ length: 17 }, (_, i) => (
        <Link
          key={i}
          to={`/goals/${i + 1}`}
          style={{
            cursor: "pointer",
            borderRadius: "10px",
            overflow: "hidden",
            display: "block",
            transform: hovered === i ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.2s",
            boxShadow: hovered === i ? "0 4px 16px rgba(0,0,0,0.18)" : "none",
            textDecoration: "none",
          }}
          // ...existing code...
          title={``}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src={images[i + 1]}
            alt="SDG Goal"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Link>
      ))}
    </div>
  );
};

const slides = Array.from({ length: 7 }, (_, index) => ({
  srcGE: new URL(`../assets/img/cover/${index + 1}-ge.png`, import.meta.url)
    .href,
  srcEN: new URL(`../assets/img/cover/${index + 1}-en.png`, import.meta.url)
    .href,
}));

const t = {
  GE: {
    sections: [
      "სტატისტიკური ინფორმაცია",
      "პუბლიკაციები",
      "კანონმდებლობა",
      "ბმულები",
      "მდგრადი განვითარების მიზნები",
    ],
  },
  EN: {
    sections: [
      "MAIN STATISTICS",
      "PUBLICATIONS",
      "LEGISLATION",
      "LINKS",
      "SUSTAINABLE DEVELOPMENT GOALS",
    ],
  },
};

const SectionTitle = ({ title, statisticsSectionId, language = "GE" }) => {
  const sectionPdfAvailable =
    statisticsSectionId && hasSectionPdfs(statisticsSectionId, language);

  const sectionImageEl = (
    <img src={sectionImage} alt="" className="block w-full h-auto" />
  );

  return (
    <div className="w-full flex justify-center py-4 sm:py-5 md:py-6 px-3 sm:px-4">
      <div className="flex flex-col items-center gap-2 sm:gap-3 max-w-full">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 max-w-full">
          <img
            src={arrLeft}
            alt="Left decoration"
            className="w-14 sm:w-24 md:w-32 lg:w-[163px] h-auto shrink"
          />
          <h2
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#e4535f] text-center px-1 sm:px-2 min-w-0"
            style={{
              fontFamily: "bpg-nino, sans-serif",
              fontFeatureSettings: '"case" on',
            }}
          >
            {title}
          </h2>
          <img
            src={arrRight}
            alt="Right decoration"
            className="w-14 sm:w-24 md:w-32 lg:w-[163px] h-auto shrink"
          />
        </div>
        {sectionPdfAvailable ? (
          <button
            type="button"
            className="border-0 bg-transparent p-0 cursor-pointer max-w-[48px] sm:max-w-[56px] md:max-w-none"
            onClick={() => openSectionPdfs(statisticsSectionId, language)}
            aria-label={
              language === "EN"
                ? "Open section PDF documents"
                : "სექციის PDF დოკუმენტების გახსნა"
            }
            title={
              language === "EN"
                ? "Open section PDF documents"
                : "სექციის PDF დოკუმენტების გახსნა"
            }
          >
            {sectionImageEl}
          </button>
        ) : null}
      </div>
    </div>
  );
};

const Publications = ({ language }) => {
  const publicationTitles =
    language === "EN"
      ? [
          "Women And Men In Georgia 2025",
          "Women And Men In Georgia 2024",
          "Women and Men in Georgia, 2023",
          "Women and Men in Georgia, 2022",
          "National Study on Violence against Women in Georgia 2022-Main Results",
          "National Study on Violence against Women in Georgia 2022-Presentation",
          "TIME USE SURVEY IN GEORGIA 2020-2021",
          "User Satisfaction with Gender Statistics, 2021",
          "Women and Men in Georgia, 2020",
          "Women and Men in Georgia, 2019",
          "Women and Men in Georgia, 2021",
          "Women and Men in Georgia, 2017",
          "National Study on Violence Against Women in Georgia 2017",
          "Women and Men in Georgia, 2018",
          "Pilot Survey on Measuring Asset Ownership and Entrepreneurship from a Gender Perspective in Georgia 2015",
          "Women and Men in Georgia, 2013",
          "Women and Men in Georgia, 2015",
          "Women and Men in Georgia, 2011",
          "Gender in Trade Assessment in Georgia",
        ]
      : [
          "ქალი და კაცი საქართველოში 2025",
          "ქალი და კაცი საქართველოში 2024",
          "ქალი და კაცი საქართველოში, 2023 წელი",
          "ქალი და კაცი საქართველოში, 2022 წელი",
          "ქალთა მიმართ ძალადობის ეროვნული კვლევა საქართველოში 2022-ძირითადი შედეგები",
          "ქალთა მიმართ ძალადობის ეროვნული კვლევა საქართველოში 2022-პრეზენტაცია",
          "დროის გამოყენების გამოკვლევა საქართველოში 2020-2021",
          "მომხმარებელთა კმაყოფილება გენდერული სტატისტიკით, 2021 წელი",
          "ქალი და კაცი საქართველოში, 2020 წელი",
          "ქალი და კაცი საქართველოში, 2019 წელი",
          "ქალი და კაცი საქართველოში, 2021 წელი",
          "ქალი და კაცი საქართველოში, 2017 წელი",
          "ქალთა მიმართ ძალადობის ეროვნული კვლევა საქართველოში 2017",
          "ქალი და კაცი საქართველოში, 2018 წელი",
          "პილოტური კვლევა გენდერულად დიფერენცირებული მონაცემების შეგროვებაზე აქტივების ფლობასა და მეწარმეობაზე საქართველოში 2015",
          "ქალი და კაცი საქართველოში, 2013 წელი",
          "ქალი და კაცი საქართველოში, 2015 წელი",
          "ქალი და კაცი საქართველოში, 2011 წელი",
          "ვაჭრობასთან დაკავშირებული გენდერული სტატისტიკის შეფასება საქართველოში",
        ];

  const publicationTitleClass =
    "font-[myFont,sans-serif] text-sm sm:text-base md:text-[17px] lg:text-[19px] leading-snug font-bold text-[#337ab7] m-0 break-words";

  return (
    <div className="w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-16">
      <SectionTitle
        title={language === "EN" ? "PUBLICATIONS" : "პუბლიკაციები"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mt-5 sm:mt-6 md:mt-8 max-w-6xl mx-auto">
        {publicationTitles.map((title, idx) => {
          // Add links for the first sixteen publications
          let link = null;
          if (idx === 0) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/74962/WOMEN-AND-MEN---2025.pdf"
                : "https://www.geostat.ge/media/74961/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98---2025.pdf";
          } else if (idx === 1) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/67728/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98---2024_Eng.pdf"
                : "https://www.geostat.ge/media/66675/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98-%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A8%E1%83%98_2024.pdf";
          } else if (idx === 2) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/58119/Women_And_Men_In_Georgia_2023_ENG.PDF"
                : "https://www.geostat.ge/media/58118/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98_%E1%83%93%E1%83%90_%E1%83%99%E1%83%90%E1%83%AA%E1%83%98_%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A8%E1%83%98_2023.pdf";
          } else if (idx === 3) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/51156/Women_And_Men_In_Georgia_2022_ENG.PDF"
                : "https://www.geostat.ge/media/51155/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98_%E1%83%93%E1%83%90_%E1%83%99%E1%83%90%E1%83%AA%E1%83%98_%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A8%E1%83%98_2022.pdf";
          } else if (idx === 4) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/59556/VAW-ENG-WEB4-2_28.12.pdf"
                : "https://www.geostat.ge/media/59555/VAW-GEO-WEB4-3_28.12.pdf";
          } else if (idx === 5) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/59323/VAW_Results_GEO.PDF"
                : "https://www.geostat.ge/media/59323/VAW_Results_GEO.PDF";
          } else if (idx === 6) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/50118/GTUS-Report-ENG.PDF"
                : "https://www.geostat.ge/media/50117/GTUS-Report-GEO.PDF";
          } else if (idx === 7) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/pdf/User-Satisfaction-with-Gender-Statistics-Study-Report.pdf"
                : "https://www.geostat.ge/pdf/momxmarebelTa_kmayofileba_genderuli_statistikiT-2021.pdf";
          } else if (idx === 8) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/38263/Women-and-Men-in-georgia%2C-2020.pdf"
                : "https://www.geostat.ge/media/38262/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98%2C-2020.pdf";
          } else if (idx === 9) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/27545/W%26M-GEO_2019.pdf"
                : "https://www.geostat.ge/media/27546/W%26M-ENG_2019.pdf";
          } else if (idx === 10) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/41855/WOMEN-AND-MEN-IN-GEORGIAN_-2021.pdf"
                : "https://www.geostat.ge/media/41854/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98-%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A8%E1%83%98_2021.pdf";
          } else if (idx === 11) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/21016/W%26M-in-ENG_2017.pdf"
                : "https://www.geostat.ge/media/27454/W%26M-in-GEO_2017.pdf";
          } else if (idx === 12) {
            link =
              language === "EN"
                ? "https://gender.geostat.ge/gender/img/publicationspdf_en/National%20VAW%20Study%20Report%20ENG.pdf#view=fit"
                : "https://www.geostat.ge/media/27454/W%26M-in-GEO_2017.pdf";
          } else if (idx === 13) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/21015/W%26M-ENG-2018.pdf"
                : "https://www.geostat.ge/media/23369/WM_ge-2018.pdf";
          } else if (idx === 14) {
            link =
              language === "GE"
                ? "https://gender.geostat.ge/gender/img/publicationspdf_en/EDGE-Report-ENG-Final.pdf#view=fit"
                : "https://gender.geostat.ge/gender/img/publicationspdf/EDGE-Report-GEO-Final.pdf#view=fit";
          } else if (idx === 15) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/21018/women-and-men-2013.pdf"
                : "https://www.geostat.ge/media/13600/qali-da-kaci-2013.pdf";
          } else if (idx === 16) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/21017/Women-and-Men_2015.pdf"
                : "https://www.geostat.ge/media/13637/Qali-da-kaci_2015.pdf";
          } else if (idx === 17) {
            link =
              language === "EN"
                ? "https://www.geostat.ge/media/21014/Woman-and-Man-in-Georgia-2011.pdf"
                : "https://www.geostat.ge/media/13581/qali-da-kaci.pdf";
          } else if (idx === 18) {
            link =
              language === "EN"
                ? "https://gender.geostat.ge/gender/doc/GenderTradeAssessmentInGeorgia_en.pdf"
                : "https://gender.geostat.ge/gender/doc/GenderTradeAssessmentInGeorgia_en.pdf";
          }
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center w-full min-h-[120px] sm:min-h-[135px] md:min-h-[150px] p-3 sm:p-4 md:p-5 rounded-lg border border-gray-300 bg-white text-center transition-all hover:border-blue-500 hover:shadow-lg cursor-pointer"
            >
              <i className="fa-solid fa-book text-[#e4535f] text-2xl sm:text-[28px] md:text-[32px] mb-2 sm:mb-2.5 md:mb-3 shrink-0" />
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${publicationTitleClass} underline`}
                >
                  {title}
                </a>
              ) : (
                <p className={publicationTitleClass}>{title}</p>
              )}
              <p className="font-[myFont,sans-serif] text-[10px] sm:text-[11px] md:text-xs leading-snug text-black mt-2 sm:mt-2.5 md:mt-3 mb-0 pb-2 sm:pb-2.5 md:pb-[11px]">
                {language === "EN"
                  ? "Statistical Publication"
                  : "სტატისტიკური პუბლიკაცია"}
              </p>
            </div>
          );
        })}
      </div>
      {/* Empty section - publications content coming soon */}
    </div>
  );
};

const legislationData = [
  {
    href: "https://matsne.gov.ge/ka/document/view/1399901?publication=0",
    titleGE: "საქართველოს კანონი ქალისა და მამაკაცის თანასწორობის შესახებ",
    titleEN: "The Legislative Herald of Georgia",
  },
  {
    href: "https://matsne.gov.ge/ka/document/view/4613854?publication=4",
    titleGE:
      "ქალთა მიმართ ძალადობისა და ოჯახში ძალადობის პრევენციისა და აღკვეთის შესახებ ევროპის საბჭოს კონვენცია",
    titleEN:
      "Council of Europe Convention on preventing and combating violence against women and domestic violence",
  },
  {
    href: "https://matsne.gov.ge/ka/document/view/4936402?publication=0",
    titleGE:
      "საქართველოს კანონი ადამიანით ვაჭრობის (ტრეფიკინგის) წინააღმდეგ ბრძოლის შესახებ",
    titleEN: "Law of Georgia on Combating Human Trafficking",
  },
  {
    href: "https://matsne.gov.ge/ka/document/view/5675992?publication=0",
    titleGE:
      "საქართველოს კანონი ქალთა მიმართ ძალადობის ან/და ოჯახში ძალადობის აღკვეთის, ძალადობის მსხვერპლთა დაცვისა და დახმარების შესახებ",
    titleEN:
      "Law of Georgia on Elimination of Domestic Violence, Protection and Support of Victims of Domestic Violence",
  },
];

const legislationDividerClass =
  "my-2 sm:my-2.5 md:my-[10px] h-px border-0 bg-[#d9edf7]";

const Legislation = ({ language }) => {
  const matsneItems = legislationData.slice(0, 4);
  const defenderItems = legislationData.slice(4);

  return (
    <div className="relative mx-auto max-w-[1200px] bg-white py-2 sm:py-2.5 md:py-3 pb-4 sm:pb-5 rounded-lg sm:rounded-[10px] shadow-[1px_1px_10px_1px_#ccc] transition-[0.3s] ease-[ease]">
      <div className="flex flex-col md:flex-row items-stretch md:items-start gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5">
        <div className="flex shrink-0 md:flex-[0_0_32%] items-center justify-center mt-0 sm:mt-2 md:mt-[6%]">
          <img
            src={legislationSideIcon}
            alt="legislation"
            className="h-auto w-[140px] sm:w-[180px] md:w-[220px] lg:w-[75%] max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[320px]"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="rounded bg-white p-2.5 sm:p-3 md:px-3.5 md:py-3 text-left">
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-[10px] mb-1.5 sm:mb-2">
              <img
                src={matsneLogo}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain shrink-0"
                alt=""
              />
              <p
                className="text-sm sm:text-base md:text-lg font-bold m-0"
                style={{
                  color: "#0080bd",
                  fontFamily: "bpg-nino, sans-serif",
                }}
              >
                {language === "EN"
                  ? "Matsne"
                  : "საქართველოს კანონი ქალისა და მამაკაცის თანასწორობის შესახებ"}
              </p>
            </div>

            <ul className="m-0 p-0">
              {matsneItems.map((item, i) => (
                <React.Fragment key={i}>
                  <li className="list-none m-0 py-2 sm:py-2.5 font-[myFont,sans-serif] text-xs sm:text-sm leading-snug">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#337ab7] no-underline text-sm sm:text-[15px] leading-snug"
                      dangerouslySetInnerHTML={{
                        __html: language === "EN" ? item.titleEN : item.titleGE,
                      }}
                    />
                  </li>
                  <hr
                    className={legislationDividerClass}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, cyan, #d3b1ff, #ffcced)",
                    }}
                  />
                </React.Fragment>
              ))}
            </ul>
          </div>

          <div className="rounded bg-white p-2.5 sm:p-3 md:px-3.5 md:py-3 text-left mt-3 sm:mt-4">
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-[10px] mb-1.5 sm:mb-2">
              <img
                src={defenderLogo}
                alt={language === "EN" ? "Public Defender" : "სახალხო დამცველი"}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain shrink-0"
              />
              <p
                className="text-sm sm:text-base md:text-lg font-bold m-0"
                style={{
                  color: "#0080bd",
                  fontFamily: "bpg-nino, sans-serif",
                }}
              >
                {language === "EN"
                  ? "Public Defender"
                  : "საქართველოს სახალხო დამცველი"}
              </p>
            </div>
            <a
              href="https://ombudsman.ge/geo/genderuli-tanastsoroba"
              target="_blank"
              rel="noreferrer"
              className="inline-block mb-2 sm:mb-2.5 text-[#337ab7] no-underline font-[myFont,sans-serif] text-sm sm:text-[15px] leading-snug"
            >
              {language === "EN" ? "Gender equality" : "გენდერის დეპარტამენტი"}
            </a>
            <hr
              className={legislationDividerClass}
              style={{
                backgroundImage:
                  "linear-gradient(to right, cyan, #d3b1ff, #ffcced)",
              }}
            />

            <ul className="m-0 p-0">
              {defenderItems.map((item, i) => (
                <React.Fragment key={i}>
                  <li className="list-none m-0 py-2 sm:py-2.5 font-[myFont,sans-serif] text-xs sm:text-sm leading-snug">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#337ab7] no-underline text-sm sm:text-[15px] leading-snug"
                      dangerouslySetInnerHTML={{
                        __html: language === "EN" ? item.titleEN : item.titleGE,
                      }}
                    />
                  </li>
                  {i !== defenderItems.length - 1 ? (
                    <hr
                      className={legislationDividerClass}
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, cyan, #d3b1ff, #ffcced)",
                      }}
                    />
                  ) : null}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Links = ({ language }) => {
  const isMobile = useWindowWidth() < 768;
  const linksData = [
    {
      href: "http://www.parliament.ge/ge/saparlamento-saqmianoba/komisiebi-da-sabchoebi-8/genderuli-tanasworobis-sabcho",
      titleGE: "საქართველოს პარლამენტი",
      titleEN: "The parliament of Georgia",
      img: new URL(`../assets/img/newlink/1.png`, import.meta.url).href,
    },
    {
      href: "http://police.ge/ge/projects/odjakhshi-dzaladoba",
      titleGE: "შინაგან საქმეთა სამინისტრო",
      titleEN: " Ministry of Internal Affairs",
      img: new URL(`../assets/img/newlink/2.png`, import.meta.url).href,
    },
    {
      href: "http://www.undp.org/content/undp/en/home/gender-equality.html",
      titleGE: "United Nations Development Programme",
      titleEN: "United Nations Development Programme",
      img: new URL(`../assets/img/newlink/3.png`, import.meta.url).href,
    },
    {
      href: "http://www.unwomen.org/en",
      titleGE: "UN WOMEN",
      titleEN: "UN WOMEN",
      img: new URL(`../assets/img/newlink/4.png`, import.meta.url).href,
    },
    {
      href: "https://www.unfpa.org/gender-equality",
      titleGE: "United Nations Population Fund",
      titleEN: "United Nations Population Fund",
      img: new URL(`../assets/img/newlink/5.png`, import.meta.url).href,
    },
    {
      href: "https://www.unece.org/gender/welcome.html",
      titleGE: "United Nations Economic Commission for Europe",
      titleEN: "United Nations Economic Commission for Europe",
      img: new URL(`../assets/img/newlink/6.png`, import.meta.url).href,
    },
    {
      href: "http://www.oecd.org/gender/data/",
      titleGE: "OECD",
      titleEN: "OECD",
      img: new URL(`../assets/img/newlink/7.png`, import.meta.url).href,
    },
    {
      href: "https://www.genderindex.org/",
      titleGE: "Social Institutions and Gender Index",
      titleEN: "Social Institutions and Gender Index",
      img: new URL(`../assets/img/newlink/8.png`, import.meta.url).href,
    },
    {
      href: "https://www.ohchr.org/en/hrbodies/cedaw/pages/cedawindex.aspx",
      titleGE: "United Nations Human Rights",
      titleEN: "United Nations Human Rights",
      img: new URL(`../assets/img/newlink/9.png`, import.meta.url).href,
    },
    {
      href: "https://www.adb.org/themes/gender/main",
      titleGE: "Asian Development Bank",
      titleEN: "Asian Development Bank",
      img: new URL(`../assets/img/newlink/10.png`, import.meta.url).href,
    },
  ];

  const panelStyle = {
    borderRadius: "4px",
    background: "#fff",
    padding: "12px 14px",
    textAlign: "left",
  };

  const listItemStyle = {
    listStyle: "none",
    margin: 0,
    padding: "10px 0",
    fontFamily: "myFont, sans-serif",
    fontSize: "14px",
    lineHeight: "1.4",
  };

  const hrStyle = {
    margin: "10px 0",
    height: "1px",
    border: "none",
    backgroundColor: "#d9edf7",
    backgroundImage: "linear-gradient(to right, cyan, #d3b1ff, #ffcced)",
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "10px 0 20px",
        boxShadow: "1px 1px 10px 1px rgb(204, 204, 204)",
        backgroundColor: "#fff",
        borderRadius: "10px",
        position: "relative",
        opacity: 1,
        transition: "0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
          alignItems: isMobile ? "stretch" : "flex-start",
          padding: "20px",
        }}
      >
        <div
          style={{
            flex: isMobile ? "0 0 auto" : "0 0 32%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: isMobile ? 0 : "17%",
          }}
        >
          <img
            src={linksSideIcon}
            alt="links"
            style={{ width: isMobile ? "220px" : "75%", maxWidth: "320px" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={panelStyle}>
            <ul style={{ margin: 0, padding: 0 }}>
              {linksData.map((item, i) => (
                <React.Fragment key={i}>
                  <li style={listItemStyle}>
                    <div
                      style={{
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={item.img}
                        alt="logo"
                        className="mr-2 sm:mr-2.5 ml-0 sm:ml-0 md:ml-[-60px] h-8 w-8 sm:h-9 sm:w-9 md:h-[45px] md:w-[45px] object-contain shrink-0"
                      />
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm sm:text-[15px] leading-snug"
                        style={{
                          color: "#337ab7",
                          textDecoration: "none",
                        }}
                      >
                        {language === "EN" ? item.titleEN : item.titleGE}
                      </a>
                    </div>
                  </li>
                  <hr style={hrStyle} />
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const statCardImagesGe = Object.fromEntries(
  Array.from({ length: 13 }, (_, i) => [
    i + 1,
    new URL(`../assets/img/new/bttns/${i + 1}.png`, import.meta.url).href,
  ]),
);

const statCardImagesEn = {
  ...Object.fromEntries(
    Array.from({ length: 13 }, (_, i) => [
      i + 1,
      new URL(`../assets/img/new/bttns_en/${i + 1}.png`, import.meta.url).href,
    ]),
  ),
};

const StatCards = ({ language }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const navigate = useNavigate();
  const { sections, loading } = useGenderStatisticsSections();

  if (loading) {
    return (
      <div
        className="mt-6 text-center text-gray-500"
        style={{ fontFamily: "myFont, sans-serif" }}
      >
        {language === "EN" ? "Loading sections…" : "სექციები იტვირთება…"}
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {sections.map((section, i) => (
        <div
          key={section.id}
          className="flex flex-col items-center justify-center gap-4 rounded-2xl cursor-pointer"
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => navigate(`/statistics/${section.id}`)}
          style={{
            border:
              hoveredIndex === i ? "1px solid #0066e0" : "1px solid #e5e7eb",
            padding: "16px 10px",
            background: "#fff",
            transform: hoveredIndex === i ? "scale(1.05)" : "scale(1)",
            transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
            boxShadow:
              hoveredIndex === i ? "0 4px 16px rgba(0,102,224,0.12)" : "none",
          }}
        >
          <img
            src={
              language === "EN"
                ? statCardImagesEn[i + 1]
                : statCardImagesGe[i + 1]
            }
            alt={`Statistics card ${i + 1}`}
            style={{
              width: "100%",
              maxWidth: "220px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      ))}
    </div>
  );
};

const Hero = ({ language }) => {
  const isMobile = useWindowWidth() < 768;
  const swiperRef = useRef(null);

  // PDF link paths for slides 1-6 (index 0-5)
  const getPdfLink = (idx) => {
    if (idx < 6) {
      return language === "EN"
        ? new URL(`../assets/img/coverPdf_en/${idx + 1}.pdf`, import.meta.url)
            .href
        : new URL(`../assets/img/coverPdf/${idx + 1}.pdf`, import.meta.url)
            .href;
    }
    return null;
  };

  // Helper to scroll to SDG section
  const scrollToSDG = () => {
    const section = document.getElementById("sdg");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full">
      <div
        className={`relative w-full overflow-hidden ${isMobile ? "h-[160px]" : "h-[300px]"}`}
        style={{
          boxShadow: "0 18px 50px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {slides.map((slide, i) => {
            const pdfLink = getPdfLink(i);
            const isSeventh = i === 6;
            const slideContent = (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${language === "EN" ? slide.srcEN : slide.srcGE})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundColor: "transparent",
                  cursor: pdfLink || isSeventh ? "pointer" : "default",
                }}
                title={
                  pdfLink
                    ? language === "EN"
                      ? "Open PDF"
                      : "გახსენი PDF"
                    : isSeventh
                      ? language === "EN"
                        ? "Go to SDG section"
                        : "გადადით SDG სექციაზე"
                      : undefined
                }
                onClick={() => {
                  if (pdfLink) {
                    window.open(pdfLink, "_blank");
                  } else if (isSeventh) {
                    scrollToSDG();
                  }
                }}
              />
            );
            return <SwiperSlide key={i}>{slideContent}</SwiperSlide>;
          })}
        </Swiper>

        <div className="absolute inset-0 z-20 flex items-center justify-between px-12 md:px-20 pointer-events-none">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer pointer-events-auto bg-[#8fd0ff] hover:bg-[#0066e0] text-white transition-colors duration-200"
            aria-label={language === "EN" ? "Previous slide" : "წინა სლაიდი"}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer pointer-events-auto bg-[#8fd0ff] hover:bg-[#0066e0] text-white transition-colors duration-200"
            aria-label={language === "EN" ? "Next slide" : "შემდეგი სლაიდი"}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

const Main = ({ language = "GE" }) => {
  const location = useLocation();
  const { section: statisticsSectionId } = useParams();
  const txt = t[language] ?? t.GE;

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace("#", "");
    const timer = setTimeout(() => {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [location.hash]);

  useEffect(() => {
    if (!statisticsSectionId) return;
    const timer = setTimeout(() => {
      document
        .getElementById("statistics")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [statisticsSectionId, language]);

  return (
    <main
      className="w-full"
      style={{
        fontFamily: "bpg-nino, sans-serif",
        fontFeatureSettings: '"case" on',
      }}
    >
      {/* ── HERO ── */}
      <div
        className="px-6 md:px-16 py-10"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <Hero language={language} />
      </div>

      {/* ── SECTIONS ── */}
      {txt.sections.map((title, idx) => {
        const sectionIds = [
          "statistics",
          "publications",
          "legislation",
          "links",
          "sdg",
        ];
        // Publications (idx 1) and Links (idx 3) get gray background
        const sectionBg =
          idx === 1 || idx === 3 ? { backgroundColor: "#f6f6f6" } : {};
        return (
          <section
            key={idx}
            id={sectionIds[idx]}
            className={`w-full ${idx === 1 ? "" : "py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-16"}`}
            style={{ borderBottom: "1px solid #e5e7eb", ...sectionBg }}
          >
            {idx === 1 ? (
              <Publications language={language} />
            ) : (
              <>
                <SectionTitle
                  title={title}
                  language={language}
                  statisticsSectionId={
                    idx === 0 ? statisticsSectionId : undefined
                  }
                />
                {idx === 0 ? (
                  statisticsSectionId ? (
                    <StatisticsSectionPage
                      key={`${statisticsSectionId}-${language}`}
                      language={language}
                      sectionId={statisticsSectionId}
                      embedded
                    />
                  ) : (
                    <StatCards language={language} />
                  )
                ) : idx === 2 ? (
                  <Legislation language={language} />
                ) : idx === 3 ? (
                  <Links language={language} />
                ) : idx === 4 ? (
                  <SDGSection language={language} />
                ) : (
                  <div className="mt-4 text-gray-400 text-sm italic text-center">
                    {language === "GE"
                      ? "კონტენტი მალე დაემატება..."
                      : "Content coming soon..."}
                  </div>
                )}
              </>
            )}
          </section>
        );
      })}
    </main>
  );
};

export default Main;
