import React from "react";
import StatisticsSectionPage from "../../components/StatisticsSectionPage";

const IncomeAndExpenditurePage = ({ language = "GE" }) => {
  return (
    <StatisticsSectionPage
      language={language}
      sectionKey="income-and-expenditure"
    />
  );
};

export default IncomeAndExpenditurePage;
