import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const HouseholdsPage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="households" />;
};

export default HouseholdsPage;
