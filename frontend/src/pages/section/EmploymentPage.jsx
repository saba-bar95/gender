import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const EmploymentPage = ({ language = "GE" }) => {
  return <StatisticsSectionPage language={language} sectionKey="employment" />;
};

export default EmploymentPage;
