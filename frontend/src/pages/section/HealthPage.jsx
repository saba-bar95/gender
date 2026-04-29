import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const HealthPage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="health" />;
};

export default HealthPage;
