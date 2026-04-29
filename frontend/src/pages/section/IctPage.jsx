import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const IctPage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="ict" />;
};

export default IctPage;
