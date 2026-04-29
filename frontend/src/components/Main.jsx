import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const sdgTitlesKa = [
  "სიღარიბის აღმოფხვრა",
  "შიმშილის აღმოფხვრა",
  "ჯანმრთელობა და კეთილდღეობა",
  "ხარისხიანი განათლება",
  "გენდერული თანასწორობა",
  "სუფთა წყალი და სანიტარია",
  "ხელმისაწვდომი და სუფთა ენერგია",
  "ღირსეული სამუშაო და ეკონომიკური ზრდა",
  "ინდუსტრია, ინოვაცია და ინფრასტრუქტურა",
  "უთანასწორობის შემცირება",
  "მდგრადი ქალაქები და თემები",
  "პასუხისმგებლიანი მოხმარება და წარმოება",
  "კლიმატის ცვლილება",
  "წყლის ქვეშ სიცოცხლე",
  "სიცოცხლე ხმელეთზე",
  "მშვიდობა, მართლმსაჯულება და ძლიერი ინსტიტუტები",
  "პარტნიორობა მიზნების მისაღწევად",
];

const sdgTitlesEn = [
  "No Poverty",
  "Zero Hunger",
  "Good Health and Well-being",
  "Quality Education",
  "Gender Equality",
  "Clean Water and Sanitation",
  "Affordable and Clean Energy",
  "Decent Work and Economic Growth",
  "Industry, Innovation and Infrastructure",
  "Reduced Inequalities",
  "Sustainable Cities and Communities",
  "Responsible Consumption and Production",
  "Climate Action",
  "Life Below Water",
  "Life on Land",
  "Peace, Justice and Strong Institutions",
  "Partnerships for the Goals",
];

const SDGSection = ({ language }) => {
  const [hovered, setHovered] = React.useState(null);
  const navigate = useNavigate();
  const isMobile = useWindowWidth() < 768;
  const images = language === "EN" ? sdgImagesEn : sdgImagesKa;
  const titles = language === "EN" ? sdgTitlesEn : sdgTitlesKa;

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
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate(`/goals/${i + 1}`)}
          style={{
            cursor: "pointer",
            borderRadius: "10px",
            overflow: "hidden",
            transform: hovered === i ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.2s",
            boxShadow: hovered === i ? "0 4px 16px rgba(0,0,0,0.18)" : "none",
          }}
          title={titles[i]}
        >
          <img
            src={images[i + 1]}
            alt={titles[i]}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
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

const SectionTitle = ({ title }) => (
  <div className="w-full flex justify-center py-6">
    <div className="flex items-center gap-3 md:gap-5">
      <img
        src={arrLeft}
        alt="Left decoration"
        style={{ width: "163px", height: "12px" }}
      />
      <h2
        className="font-semibold"
        style={{
          fontSize: "24px",
          color: "#e4535f",
          fontFamily: "bpg-nino, sans-serif",
          fontFeatureSettings: '"case" on',
        }}
      >
        {title}
      </h2>
      <img
        src={arrRight}
        alt="Right decoration"
        style={{ width: "163px", height: "12px" }}
      />
    </div>
  </div>
);

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

  return (
    <div className="w-full py-10 px-6 md:px-16">
      <SectionTitle
        title={language === "EN" ? "PUBLICATIONS" : "პუბლიკაციები"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-6xl mx-auto">
        {publicationTitles.map((title, idx) => {
          // Add links for the first sixteen publications
          let link = null;
          if (idx === 0) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/74962/WOMEN-AND-MEN---2025.pdf"
              : "https://www.geostat.ge/media/74961/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98---2025.pdf";
          } else if (idx === 1) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/67728/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98---2024_Eng.pdf"
              : "https://www.geostat.ge/media/66675/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98-%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A8%E1%83%98_2024.pdf";
          } else if (idx === 2) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/58119/Women_And_Men_In_Georgia_2023_ENG.PDF"
              : "https://www.geostat.ge/media/58118/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98_%E1%83%93%E1%83%90_%E1%83%99%E1%83%90%E1%83%AA%E1%83%98_%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A8%E1%83%98_2023.pdf";
          } else if (idx === 3) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/51156/Women_And_Men_In_Georgia_2022_ENG.PDF"
              : "https://www.geostat.ge/media/51155/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98_%E1%83%93%E1%83%90_%E1%83%99%E1%83%90%E1%83%AA%E1%83%98_%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A8%E1%83%98_2022.pdf";
          } else if (idx === 4) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/59556/VAW-ENG-WEB4-2_28.12.pdf"
              : "https://www.geostat.ge/media/59555/VAW-GEO-WEB4-3_28.12.pdf";
          } else if (idx === 5) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/59323/VAW_Results_GEO.PDF"
              : "https://www.geostat.ge/media/59323/VAW_Results_GEO.PDF";
          } else if (idx === 6) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/50118/GTUS-Report-ENG.PDF"
              : "https://www.geostat.ge/media/50117/GTUS-Report-GEO.PDF";
          } else if (idx === 7) {
            link = language === "EN"
              ? "https://www.geostat.ge/pdf/User-Satisfaction-with-Gender-Statistics-Study-Report.pdf"
              : "https://www.geostat.ge/pdf/momxmarebelTa_kmayofileba_genderuli_statistikiT-2021.pdf";
          } else if (idx === 8) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/38263/Women-and-Men-in-georgia%2C-2020.pdf"
              : "https://www.geostat.ge/media/38262/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98%2C-2020.pdf";
          } else if (idx === 9) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/27545/W%26M-GEO_2019.pdf"
              : "https://www.geostat.ge/media/27546/W%26M-ENG_2019.pdf";
          } else if (idx === 10) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/41855/WOMEN-AND-MEN-IN-GEORGIAN_-2021.pdf"
              : "https://www.geostat.ge/media/41854/%E1%83%A5%E1%83%90%E1%83%9A%E1%83%98-%E1%83%93%E1%83%90-%E1%83%99%E1%83%90%E1%83%AA%E1%83%98-%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A8%E1%83%98_2021.pdf";
          } else if (idx === 11) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/21016/W%26M-in-ENG_2017.pdf"
              : "https://www.geostat.ge/media/27454/W%26M-in-GEO_2017.pdf";
          } else if (idx === 12) {
            link = language === "EN"
              ? "https://gender.geostat.ge/gender/img/publicationspdf_en/National%20VAW%20Study%20Report%20ENG.pdf#view=fit"
              : "https://www.geostat.ge/media/27454/W%26M-in-GEO_2017.pdf";
          } else if (idx === 13) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/21015/W%26M-ENG-2018.pdf"
              : "https://www.geostat.ge/media/23369/WM_ge-2018.pdf";
          } else if (idx === 14) {
            link = language === "GE"
              ? "https://gender.geostat.ge/gender/img/publicationspdf_en/EDGE-Report-ENG-Final.pdf#view=fit"
              : "https://gender.geostat.ge/gender/img/publicationspdf/EDGE-Report-GEO-Final.pdf#view=fit";
          } else if (idx === 15) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/21018/women-and-men-2013.pdf"
              : "https://www.geostat.ge/media/13600/qali-da-kaci-2013.pdf";
          } else if (idx === 16) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/21017/Women-and-Men_2015.pdf"
              : "https://www.geostat.ge/media/13637/Qali-da-kaci_2015.pdf";
          } else if (idx === 17) {
            link = language === "EN"
              ? "https://www.geostat.ge/media/21014/Woman-and-Man-in-Georgia-2011.pdf"
              : "https://www.geostat.ge/media/13581/qali-da-kaci.pdf";
          } else if (idx === 18) {
            link = language === "EN"
              ? "https://gender.geostat.ge/gender/doc/GenderTradeAssessmentInGeorgia_en.pdf"
              : "https://gender.geostat.ge/gender/doc/GenderTradeAssessmentInGeorgia_en.pdf";
          }
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-300 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer bg-white w-full"
              style={{
                minHeight: "150px",
                textAlign: "center",
              }}
            >
              <i
                className="fa-solid fa-book"
                style={{
                  fontSize: "32px",
                  color: "#e4535f",
                  marginBottom: "12px",
                }}
              />
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "myFont, sans-serif",
                    fontSize: "19px",
                    lineHeight: "1.375em",
                    fontWeight: "bold",
                    color: "#337ab7",
                    margin: 0,
                    wordBreak: "break-word",
                    textDecoration: "underline",
                  }}
                >
                  {title}
                </a>
              ) : (
                <p
                  style={{
                    fontFamily: "myFont, sans-serif",
                    fontSize: "19px",
                    lineHeight: "1.375em",
                    fontWeight: "bold",
                    color: "#337ab7",
                    margin: 0,
                    wordBreak: "break-word",
                  }}
                >
                  {title}
                </p>
              )}
              <p
                style={{
                  fontFamily: "myFont, sans-serif",
                  fontSize: "12px",
                  lineHeight: "1.375em",
                  color: "#000",
                  marginTop: "12px",
                  marginBottom: 0,
                  paddingBottom: "11px",
                }}
              >
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
    titleEN: "Council of Europe Convention on preventing and combating violence against women and domestic violence",
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
    titleEN: "Law of Georgia on Elimination of Domestic Violence, Protection and Support of Victims of Domestic Violence",
  },
];

const Legislation = ({ language }) => {
  const isMobile = useWindowWidth() < 768;
  const matsneItems = legislationData.slice(0, 4);
  const defenderItems = legislationData.slice(4);

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
            marginTop: "6%",
          }}
        >
          <img
            src={legislationSideIcon}
            alt="legislation"
            style={{ width: isMobile ? "220px" : "75%", maxWidth: "320px" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={panelStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <img
                src={matsneLogo}
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
              <p
                style={{
                  color: "#0080bd",
                  fontSize: "18px",
                  fontFamily: "bpg-nino, sans-serif",
                  margin: 0,
                  fontWeight: "bold",
                }}
              >
                {language === "EN"
                  ? "Matsne"
                  : "საქართველოს კანონი ქალისა და მამაკაცის თანასწორობის შესახებ"}
              </p>
            </div>

            <ul style={{ margin: 0, padding: 0 }}>
              {matsneItems.map((item, i) => (
                <React.Fragment key={i}>
                  <li style={listItemStyle}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#337ab7",
                        textDecoration: "none",
                        fontSize: "15px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: language === "EN" ? item.titleEN : item.titleGE,
                      }}
                    />
                  </li>
                  <hr style={hrStyle} />
                </React.Fragment>
              ))}
            </ul>
          </div>

          <div style={{ ...panelStyle, marginTop: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <img
                src={defenderLogo}
                alt={language === "EN" ? "Public Defender" : "სახალხო დამცველი"}
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
              <p
                style={{
                  color: "#0080bd",
                  fontSize: "18px",
                  fontFamily: "bpg-nino, sans-serif",
                  margin: 0,
                  fontWeight: "bold",
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
              style={{
                display: "inline-block",
                marginBottom: "10px",
                color: "#337ab7",
                textDecoration: "none",
                fontFamily: "myFont, sans-serif",
                fontSize: "15px",
                lineHeight: "1.4",
              }}
            >
              {language === "EN"
                ? "Gender equality"
                : "გენდერის დეპარტამენტი"}
            </a>
            <hr style={hrStyle} />

            <ul style={{ margin: 0, padding: 0 }}>
              {defenderItems.map((item, i) => (
                <React.Fragment key={i}>
                  <li style={listItemStyle}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#337ab7", textDecoration: "none" }}
                      dangerouslySetInnerHTML={{
                        __html: language === "EN" ? item.titleEN : item.titleGE,
                      }}
                    />
                  </li>
                  {i !== defenderItems.length - 1 ? <hr style={hrStyle} /> : null}
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
                    <div style={{ margin: "auto", display: "flex", alignItems: "center" }}>
                      <img
                        src={item.img}
                        alt="logo"
                        style={{
                          marginRight: "10px",
                          marginLeft: "-60px",
                          maxHeight: "45px",
                          width: "45px",
                          objectFit: "contain",
                        }}
                      />
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#337ab7",
                          textDecoration: "none",
                          fontSize: "15px",
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
  const statCardRoutes = [
    "/statistics/population",
    "/statistics/health",
    "/statistics/education",
    "/statistics/social-protection",
    "/statistics/households",
    "/statistics/employment",
    "/statistics/income-and-expenditure",
    "/statistics/ict",
    "/statistics/business-sector",
    "/statistics/agriculture",
    "/statistics/offences",
    "/statistics/governance",
    "/statistics/sport",
  ];

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {statCardRoutes.map((route, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center gap-4 rounded-2xl cursor-pointer"
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => route && navigate(route)}
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
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${language === "EN" ? slide.srcEN : slide.srcGE})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundColor: "transparent",
                }}
              />
            </SwiperSlide>
          ))}
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
        return (
          <section
            key={idx}
            id={sectionIds[idx]}
            className={`w-full ${idx === 1 ? "" : "py-10 px-6 md:px-16"}`}
            style={{ borderBottom: "1px solid #e5e7eb" }}
          >
            {idx === 1 ? (
              <Publications language={language} />
            ) : (
              <>
                <SectionTitle title={title} />
                {idx === 0 ? (
                  <StatCards language={language} />
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
