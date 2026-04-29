import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const GovernancePage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="governance" />;
};

export default GovernancePage;
