import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const BusinessSectorPage = ({ language = "GE" }) => {
  return (
    <StatisticsSectionPage language={language} sectionKey="business-sector" />
  );
};

export default BusinessSectorPage;
