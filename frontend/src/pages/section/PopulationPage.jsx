import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const PopulationPage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="population" />;
};

export default PopulationPage;
