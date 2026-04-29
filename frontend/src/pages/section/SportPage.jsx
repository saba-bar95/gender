import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const SportPage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="sport" />;
};

export default SportPage;
