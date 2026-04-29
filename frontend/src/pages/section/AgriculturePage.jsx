import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const AgriculturePage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="agriculture" />;
};

export default AgriculturePage;
