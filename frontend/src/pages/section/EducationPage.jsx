import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const EducationPage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="education" />;
};

export default EducationPage;
