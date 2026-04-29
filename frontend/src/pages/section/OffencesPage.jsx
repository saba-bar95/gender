import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const OffencesPage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="offences" />;
};

export default OffencesPage;
