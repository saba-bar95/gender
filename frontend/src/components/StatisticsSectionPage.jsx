import React from "react";
import { useParams, Link } from "react-router-dom";

export const sectionMeta = {
  population: { ge: "მოსახლეობა", en: "Population" },
  health: { ge: "ჯანმრთელობა", en: "Health" },
  education: { ge: "განათლება", en: "Education" },
  "social-protection": { ge: "სოციალური დაცვა", en: "Social Protection" },
  households: { ge: "შინამეურნეობები", en: "Households" },
  employment: { ge: "დასაქმება", en: "Employment" },
  "income-and-expenditure": {
    ge: "შემოსავლები და ხარჯები",
    en: "Income and Expenditure",
  },
  ict: { ge: "ICT", en: "ICT" },
  "business-sector": { ge: "ბიზნეს სექტორი", en: "Business Sector" },
  agriculture: { ge: "სოფლის მეურნეობა", en: "Agriculture" },
  offences: { ge: "დანაშაულები", en: "Offences" },
  governance: { ge: "მმართველობა", en: "Governance" },
  sport: { ge: "სპორტი", en: "Sport" },
};

const StatisticsSectionPage = ({ language = "GE", sectionKey }) => {
  const { section } = useParams();
  const resolvedSection = sectionKey || section;
  const meta = sectionMeta[resolvedSection];

  if (!meta) {
    return (
      <div className="px-6 md:px-16 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-[#e4535f] mb-4">
            {language === "EN" ? "Section not found" : "სექცია ვერ მოიძებნა"}
          </h1>
          <Link to="/" className="text-[#337ab7] underline">
            {language === "EN" ? "Back to home" : "მთავარ გვერდზე დაბრუნება"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-10" style={{ backgroundColor: "#f6f6f6" }}>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <h1
          className="text-3xl font-semibold mb-4"
          style={{ color: "#e4535f", fontFamily: "bpg-nino, sans-serif" }}
        >
          {language === "EN" ? meta.en : meta.ge}
        </h1>
        <p className="text-gray-600 mb-6" style={{ fontFamily: "myFont, sans-serif" }}>
          {language === "EN"
            ? "This section page is ready. Data will be loaded from API in the next step."
            : "ეს სექციის გვერდი მზადაა. შემდეგ ეტაპზე მონაცემები API-დან ჩაიტვირთება."}
        </p>
        <div className="rounded-lg border border-[#d9edf7] p-5 bg-[#fafcff]">
          <p className="text-sm text-gray-500" style={{ fontFamily: "myFont, sans-serif" }}>
            {language === "EN"
              ? "Placeholder area for charts, tables, and indicators."
              : "დროებითი ბლოკი გრაფიკებისთვის, ცხრილებისთვის და ინდიკატორებისთვის."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSectionPage;
