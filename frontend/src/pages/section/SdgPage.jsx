import React from "react";
import { useParams } from "react-router-dom";
import arrLeft from "../../assets/img/new/arr-left.png";
import arrRight from "../../assets/img/new/arr-right.png";

// Horizontal line style for SDG file entries
const hrStyle = {
  margin: "10px 0",
  height: "1px",
  border: "none",
  backgroundColor: "#d9edf7",
  backgroundImage: "linear-gradient(to right, cyan, #d3b1ff, #ffcced)",
};

// SDG titles and downloadable files mapping (partial, can be extended)
const SDG_TITLES = {
  GE: {
    1: [
      {
        key: "sdg1",
        file: "1.3.1-Number_of_Persons_Receiving_Pension_and_Social_packages.xlsx",
      },
    ],
    2: [
      { key: "sdg2", file: "2.2.1-2.2.2-Nutritional status of children.xlsx" },
      {
        key: "sdg2.3.1",
        file: "2.3.1 Production_volume_of_agricultural_holdings_per_labour_day.xlsx",
      },
      {
        key: "sdg2.3.2",
        file: "2.3.2 Average_Annual_Income_of_agricultural_holdings.xlsx",
      },
    ],
    3: [
      { key: "sdg3", file: "3.2.2-Infant_Mortality.xlsx" },
      { key: "sdg3.1", file: "3.3.1-New_Cases_of AIDS.xlsx" },
      { key: "sdg3.2", file: "3.3.2-Tuberculosis_Influence.xlsx" },
      { key: "sdg3.3", file: "3.4.1-Mortality_by_Causes_of_Death.xlsx" },
      { key: "sdg3.4", file: "3.4.2-Suicides.xlsx" },
      {
        key: "sdg3.5",
        file: "3.6.1-Number_of_Persons_Injured_or_Killed_by_Road_Accidents.xlsx",
      },
      { key: "sdg3.6", file: "3.7.1-Use of contraception.xlsx" },
      {
        key: "sdg3.7",
        file: "3.7.2-Live_Births_per_1000_Women_of_Relevant_Age.xlsx",
      },
      {
        key: "sdg3.8.1",
        file: "3.8.1-Use of improved sanitation facilities.xlsx",
      },
      { key: "sdg3.8", file: "3.c.1-Number_of_Medical_Doctors.xlsx" },
    ],
    4: [
      {
        key: "sdg4",
        file: "4.1.1-Graduates from primary, basic and secondary schools.xlsx",
      },
      { key: "sdg4.1", file: "4.2.1-Early child development index.xlsx" },
      {
        key: "sdg4.2",
        file: "4.2.2-Participation rate in organised learning.xlsx",
      },
      { key: "sdg4.3", file: "4.3.1-Number of Pupils and Students.xlsx" },
      { key: "sdg4.6", file: "4.5.1-Parity Indices.xlsx" },
      {
        key: "sdg4.7",
        file: "4.5.1-Participation rate in organised learning.xlsx",
      },
      {
        key: "sdg4.5",
        file: "4.c.1-Number_of_schoolteachers,_professors_and_lecturers.xlsx",
      },
    ],
    5: [
      { key: "sdg5.2.1", file: "5.2.1.xlsx" },
      { key: "sdg5.2.2", file: "5.2.2.xlsx" },
      { key: "sdg5.1", file: "5.3.1-Child marriage.xlsx" },
      {
        key: "sdg5.2",
        file: "5.5.1-Number_of_Majoritarian_Members_of_Parlament_of_Georgia.xlsx",
      },
      {
        key: "sdg5.4",
        file: "5.5.1-Number_of_Parliament_Members_of_Georgia.xlsx",
      },
      {
        key: "sdg5.3",
        file: "5.5.1-Number_of_Parliament_Members_by_Faction_of_Convocation.xlsx",
      },
      { key: "sdg5.5.2.3", file: "5.5.2.3 GPG.XLSX" },
      { key: "sdg5.6.1", file: "5.6.1.xlsx" },
      { key: "sdg5.5a", file: "5.a.1.a.XLSX" },
      { key: "sdg5.5b", file: "5.a.1.b.XLSX" },
      {
        key: "sdg5.6",
        file: "5.b.1_Share_of_population_aged_6_and_older_who_own_mobile_phone.xlsx",
      },
    ],
    6: [],
    7: [{ key: "sdg3", file: "3.2.2-Infant_Mortality.xlsx" }],
    8: [{ key: "sdg8", file: "8.5.2-Unemployment rate  by Age.XLSX" }],
    9: [],
    10: [{ key: "sdg10", file: "10.3.1- Discrimination and harassment.xlsx" }],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [
      { key: "sdg16.0", file: "16.1.4-Feelings of safety.xlsx" },
      { key: "sdg16.1", file: "16.2.1-Child discipline.xlsx" },
      {
        key: "sdg16.2",
        file: "16.2.2-Number_of_Victims_(with_dependant_persons)_in_Shelters_under_Domestic_Violence.xlsx",
      },
      {
        key: "sdg16.3",
        file: "16.3.1-Number_of_issued_restrictive_orders.xlsx",
      },
      {
        key: "sdg16.10",
        file: "16.3.1-Reporting of robbery and assault in the last one year (women).xlsx",
      },
      {
        key: "sdg16.4",
        file: "16.7.1-Composition_of_the_Government_of_Georgia.xlsx",
      },
      { key: "sdg16.5", file: "16.7.1-Number_of_Ambassadors_of_Georgia.xlsx" },
      {
        key: "sdg16.6",
        file: "16.7.1-Number_of_Employees_at_the_Administration_of_the_President_of_Georgia.xlsx",
      },
      {
        key: "sdg16.7",
        file: "16.7.1-Number_of_Employees_at_the_office_of_the_Parliament_of_Georgia.xlsx",
      },
      {
        key: "sdg16.8",
        file: "16.7.1-Number_of_Judges_in_common_law_courts_of_Georgia.xlsx",
      },
      {
        key: "sdg16.9",
        file: "16.7.1-Staff_of_the_Administration_of_the_Goverment_of_Georgia.xlsx",
      },
    ],
    17: [
      {
        key: "sdg17",
        file: "17.8.1_Proportion of individuals aged 6 and older using the Internet.xlsx",
      },
    ],
  },
  EN: {
    1: [
      {
        key: "sdg1",
        file: "1.3.1-Number_of_Persons_Receiving_Pension_and_Social_packages.xlsx",
      },
    ],
    2: [
      { key: "sdg2", file: "2.2.1-2.2.2-Nutritional status of children.xlsx" },
      {
        key: "sdg2.3.1",
        file: "2.3.1 Production_volume_of_agricultural_holdings_per_labour_day.xlsx",
      },
      {
        key: "sdg2.3.2",
        file: "2.3.2 Average_Annual_Income_of_agricultural_holdings.xlsx",
      },
    ],
    3: [
      { key: "sdg3", file: "3.2.2-Infant_Mortality.xlsx" },
      { key: "sdg3.1", file: "3.3.1-New_Cases_of AIDS.xlsx" },
      { key: "sdg3.2", file: "3.3.2-Tuberculosis_Influence.xlsx" },
      { key: "sdg3.3", file: "3.4.1-Mortality_by_Causes_of_Death.xlsx" },
      { key: "sdg3.4", file: "3.4.2-Suicides.xlsx" },
      {
        key: "sdg3.5",
        file: "3.6.1-Number_of_Persons_Injured_or_Killed_by_Road_Accidents.xlsx",
      },
      { key: "sdg3.6", file: "3.7.1-Use of contraception.xlsx" },
      {
        key: "sdg3.7",
        file: "3.7.2-Live_Births_per_1000_Women_of_Relevant_Age.xlsx",
      },
      {
        key: "sdg3.8.1",
        file: "3.8.1-Use of improved sanitation facilities.xlsx",
      },
      { key: "sdg3.8", file: "3.c.1-Number_of_Medical_Doctors.xlsx" },
    ],
    4: [
      {
        key: "sdg4",
        file: "4.1.1-Graduates from primary, basic and secondary schools.xlsx",
      },
      { key: "sdg4.1", file: "4.2.1-Early child development index.xlsx" },
      {
        key: "sdg4.2",
        file: "4.2.2-Participation rate in organised learning.xlsx",
      },
      { key: "sdg4.3", file: "4.3.1-Number of Pupils and Students.xlsx" },
      { key: "sdg4.6", file: "4.5.1-Parity Indices.xlsx" },
      {
        key: "sdg4.7",
        file: "4.5.1-Participation rate in organised learning.xlsx",
      },
      {
        key: "sdg4.5",
        file: "4.c.1-Number_of_schoolteachers,_professors_and_lecturers.xlsx",
      },
    ],
    5: [
      { key: "sdg5.2.1", file: "5.2.1.xlsx" },
      { key: "sdg5.2.2", file: "5.2.2.xlsx" },
      { key: "sdg5.1", file: "5.3.1-Child marriage.xlsx" },
      {
        key: "sdg5.2",
        file: "5.5.1-Number_of_Majoritarian_Members_of_Parlament_of_Georgia.xlsx",
      },
      {
        key: "sdg5.4",
        file: "5.5.1-Number_of_Parliament_Members_of_Georgia.xlsx",
      },
      {
        key: "sdg5.3",
        file: "5.5.1-Number_of_Parliament_Members_by_Faction_of_Convocation.xlsx",
      },
      { key: "sdg5.5.2.3", file: "5.5.2.3 GPG.XLSX" },
      { key: "sdg5.6.1", file: "5.6.1.xlsx" },
      { key: "sdg5.5a", file: "5.a.1.a.XLSX" },
      { key: "sdg5.5b", file: "5.a.1.b.XLSX" },
      {
        key: "sdg5.6",
        file: "5.b.1_Share_of_population_aged_6_and_older_who_own_mobile_phone.xlsx",
      },
    ],
    6: [],
    7: [{ key: "sdg3", file: "3.2.2-Infant_Mortality.xlsx" }],
    8: [{ key: "sdg8", file: "8.5.2-Unemployment rate  by Age.XLSX" }],
    9: [],
    10: [{ key: "sdg10", file: "10.3.1- Discrimination and harassment.xlsx" }],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [
      { key: "sdg16.0", file: "16.1.4-Feelings of safety.xlsx" },
      { key: "sdg16.1", file: "16.2.1-Child discipline.xlsx" },
      {
        key: "sdg16.2",
        file: "16.2.2-Number_of_Victims_(with_dependant_persons)_in_Shelters_under_Domestic_Violence.xlsx",
      },
      {
        key: "sdg16.3",
        file: "16.3.1-Number_of_issued_restrictive_orders.xlsx",
      },
      {
        key: "sdg16.10",
        file: "16.3.1-Reporting of robbery and assault in the last one year (women).xlsx",
      },
      {
        key: "sdg16.4",
        file: "16.7.1-Composition_of_the_Government_of_Georgia.xlsx",
      },
      { key: "sdg16.5", file: "16.7.1-Number_of_Ambassadors_of_Georgia.xlsx" },
      {
        key: "sdg16.6",
        file: "16.7.1-Number_of_Employees_at_the_Administration_of_the_President_of_Georgia.xlsx",
      },
      {
        key: "sdg16.7",
        file: "16.7.1-Number_of_Employees_at_the_office_of_the_Parliament_of_Georgia.xlsx",
      },
      {
        key: "sdg16.8",
        file: "16.7.1-Number_of_Judges_in_common_law_courts_of_Georgia.xlsx",
      },
      {
        key: "sdg16.9",
        file: "16.7.1-Staff_of_the_Administration_of_the_Goverment_of_Georgia.xlsx",
      },
    ],
    17: [
      {
        key: "sdg17",
        file: "17.8.1_Proportion of individuals aged 6 and older using the Internet.xlsx",
      },
    ],
  },
};

// SDG titles (should be completed for all keys)
const SDG_LABELS = {
  GE: {
    sdg1: "1.3.1 პენსიის და სოციალური პაკეტის მიმღებთა რიცხოვნობა",
    sdg2: "2.2.1-2.2.2. ბავშვთა ნუტრიციული სტატუსი",
    "sdg2.3.1":
      "2.3.1. სასოფლო მეურნეობების წარმოების მოცულობა შრომის დანახარჯის ერთეულზე, მეურნეობის ზომის და მეურნის სქესის მიხედვით",
    "sdg2.3.2":
      "2.3.2. სასოფლო მეურნეობების საშუალო წლიური მოგება მეურნეობის ზომის და მეურნის სქესის მიხედვით",
    sdg3: "3.2.2 ჩვილ ბავშვთა მოკვდაობა",
    "sdg3.1":
      "3.3.1 შიდსის შემთხვევები ცხოვრებაში პირველად დადგენილი დიაგნოზით",
    "sdg3.2": "3.3.2 ტუბერკულოზის გავრცელება ",
    "sdg3.3": "3.4.1 გარდაცვლილთა რიცხოვნობა გარდაცვალების მიზეზების მიხედვით ",
    "sdg3.4": "3.4.2 თვითმკვლელობები",
    "sdg3.5":
      "3.6.1 ავტო საგზაო შემთხვევების შედეგად დაღუპულთა და დაშავებულთა რაოდენობა",
    "sdg3.6": "3.7.1 კონტრაცეფციების გამოყენება",
    "sdg3.7": "3.7.2 შობადობის ასკობრივი კოეფიციენტი",
    "sdg3.8.1":
      "3.8.1 შინამეურნეობებში მცხოვრები მოსახლეობის პროცენტული განაწილება შინამეურნეობის მიერ გამოყენებული სანიტარული კვანძის ტიპის მიხედვით, 2018 წ",
    "sdg3.8": "3.c.1 ექიმების რიცხოვნობა",
    sdg4: "4.1.1 დაწყებითი, საბაზო და საშუალო განათლების მიღების მაჩვენებლები",
    "sdg4.1": "4.2.1 ადრეული განვითარების ინდექსი",
    "sdg4.2": "4.2.2 ორგანიზებულ სწავლებაში ჩართულობის დონე",
    "sdg4.3": "4.3.1 მოსწავლეთა და სტუდენტთა რიცხოვნობა ",
    "sdg4.6": "4.5.1 ორგანიზებული სწავლება ",
    "sdg4.7": "4.5.1 თანასწორობის ინდექსი ",
    "sdg4.5": "4.c.1 პედაგოგების და პროფესორ მასწავლებელთა რიცხოვნობა ",
    "sdg5.2.1":
      "5.2.1 15 წლის და უფროსი ასაკის იმ ქალების პროცენტული წილი, რომელთაც ამჟამინდელი ან ყოფილი ინტიმური პარტნიორის მხრიდან ბოლო 12 თვის განმავლობაში განიცადეს ფიზიკური, სექსუალური ან ფსიქოლოგიური ძალადობა ",
    "sdg5.2.2":
      "5.2.2 15 წლის და უფროსი ასაკის იმ ქალების პროცენტული წილი, რომელთაც არაინტიმური პარტნიორის მხრიდან ბოლო 12 თვის განმავლობაში განიცადეს სექსუალურ ძალადობა",
    "sdg5.1": "5.3.1 ადრეული ქორწინება ",
    "sdg5.2": "5.5.1 მაჟორიტარი დეპუტატების რიცხოვნობა საქართველოს პარლამენტში",
    "sdg5.4": "5.5.1 დეპუტატთა რიცხოვნობა საქართველოს პარლამენტში",
    "sdg5.3":
      "5.5.1 დეპუტატთა რიცხოვნობა ფრაქციების მიხედვით საქართველოს პარლამენტში",
    "sdg5.5.2.3": "5.5.2.3 გენდერული სახელფასო სხვაობა",
    "sdg5.6.1":
      "5.6.1 15-49 წლის იმ ქალთა პროცენტული წილი, ვინც სექსუალურ ურთიერთობებთან, კონტრაცეპტივების გამოყენებასთან და რეპროდუქციული ჯანმრთელობის დაცვასთან დაკავშირებით საკუთარ, ინფორმირებულ გადაწყვეტილებას იღებს",
    "sdg5.5a":
      "5.a.1.a სასოფლო-სამეურნეო მოსახლეობის წილი, რომელსაც აქვს საკუთრება ან დაცული უფლებები სასოფლო-სამეურნეო მიწაზე სქესის მიხედვით ",
    "sdg5.5b":
      "5.a.1.b სასოფლო-სამეურნეო მიწაზე საკუთრების ან დაცული უფლებების მქონე პირთა განაწილება სქესის მიხედვით ",
    "sdg5.6":
      "5.b.1 6 წლის და უფროსი ასაკის მოსახლეობის წილი, ვინც ფლობს მობილურ ტელეფონს",
    sdg8: "8.5.2 უმუშევრობის დონე ასაკობრივი ჯგუფების მიხედვით",
    sdg10: "10.3.1 დისკრიმინაცია და შევიწროება",
    "sdg16.0": "16.1.4 უსაფრთხოება და დაცულობა ",
    "sdg16.1": "16.2.1 ბავშვის აღზრდა",
    "sdg16.2":
      "16.2.2 ოჯახში ძალადობის მსხვერპლთა (დამოკიდებულ პირებთან ერთად) თავშესაფარში განთავსების სტატისტიკა",
    "sdg16.3": "16.3.1 გამოცემული შემაკავებელი ორდერების რაოდენობა",
    "sdg16.4": "16.7.1 საქართველოს მთავრობის შემადგენლობა",
    "sdg16.5":
      "16.7.1 საქართველოს საგანგებო და სრულუფლებიანი ელჩების რიცხოვნობა",
    "sdg16.6":
      "16.7.1 საქართველოს პრეზიდენტის ადმინისტრაციაში დასაქმებულთა რიცხოვნობა",
    "sdg16.7":
      "16.7.1 საქართველოს პარლამენტის აპარატში დასაქმებულთა რიცხოვნობა",
    "sdg16.8":
      "16.7.1 საქართველოს საერთო სასამართლოების მოსამართლეთა რიცხოვნობა",
    "sdg16.9":
      "16.7.1 საქართველოს მთავრობის ადმინისტრაციაში დასაქმებულთა რიცხოვნობა",
    "sdg16.10": "16.3.1 ძარცვა_თავდასხმა",
    sdg17:
      "17.8.1 6 წლის და უფროსი ასაკის მოსახლეობის წილი, ვინც გამოიყენა ინტერნეტი ბოლო 3 თვის განმავლობაში",
  },
  EN: {
    sdg1: "1.3.1 Number of Persons Receiving Pension and Social package",
    sdg2: "2.2.1-2.2.2. Nutritional Status of Children",
    "sdg2.3.1":
      "2.3.1. Production volume of agricultural holding per labor day, by holding size and gender of holder",
    "sdg2.3.2":
      "2.3.2. Average annual income of agricultural holdings, by holding size and gender of holder",
    sdg3: "3.2.2 Infant Mortality",
    "sdg3.1": "3.3.1 New Cases of AIDS",
    "sdg3.2": "3.3.2 Tuberculosis Influence",
    "sdg3.3": "3.4.1 Mortality by Causes of Death",
    "sdg3.4": "3.4.2 Suicides",
    "sdg3.5": "3.6.1 Number of Persons Injured or Killed in Road Accidents",
    "sdg3.6": "3.7.1 Use of contraception",
    "sdg3.7": "3.7.2 Live Births per 1 000 Women of Relevant Age",
    "sdg3.8.1":
      "3.8.1 Percent distribution of household population according to type of sanitation facility used by the household, 2018",
    "sdg3.8": "3.c.1 Number of Medical Doctors",
    sdg4: "4.1.1 Graduates from primary, basic and secondary schools",
    "sdg4.1": "4.2.1 Early Child Development Index",
    "sdg4.2": "4.2.2 Participation Rate in Organised Learning",
    "sdg4.3": "4.3.1 Number of Pupils and Students",
    "sdg4.6": "4.5.1-Parity Indices ",
    "sdg4.7": "4.5.1-Participation rate in organised learning ",
    "sdg4.5": "4.c.1 Number of Schoolteachers, Professors and Lecturers",
    "sdg5.2.1":
      "5.2.1 Prevalence of All Forms of Intimate Partner Violence among Ever-Partnered Women",
    "sdg5.2.2": "5.2.2 Prevalence of Non-Partner Sexual Violence among Women",
    "sdg5.1": "5.3.1 Child Marriage ",
    "sdg5.2": "5.5.1 Number of Majoritarian Members of Parliament of Georgia",
    "sdg5.4": "5.5.1 Number of Parliament Members of Georgia",
    "sdg5.3": "5.5.1 Number of Parliament Members by Faction of Convocation",
    "sdg5.5.2.3": "5.5.2.3 Gender Pay Gap",
    "sdg5.6.1":
      "5.6.1 Percentage of women aged 15-49 years who make their own informed decisions regarding sexual relations, contraceptive use and reproductive health care",
    "sdg5.5a":
      "5.a.1.a Proportion of total agricultural population with ownership or secure rights over agricultural land by sex",
    "sdg5.5b":
      "5.a.1.b Distribution of persons with ownership or secure rights over agricultural land by sex",
    "sdg5.6": "5.b.1 Share of Population Aged 6 and Older who Own Mobile Phone",
    sdg8: "8.5.2 Unemployment rate by age groups",
    sdg10: "10.3.1- Discrimination and harassment",
    "sdg16.0": "16.1.4 Feelings of Safety",
    "sdg16.1": "16.2.1 Child Discipline",
    "sdg16.2":
      "16.2.2 Number of Victims (with dependant persons) in Shelters under Domestic Violence",
    "sdg16.3": "16.3.1 Number of Issued Restrictive Orders",
    "sdg16.4": "16.7.1 Composition of the Government of Georgia ",
    "sdg16.5": "16.7.1 Number of Ambassadors of Georgia",
    "sdg16.6":
      "16.7.1 Number of Employees at the Administration of the President of Georgia",
    "sdg16.7":
      "16.7.1 Number of Employees at the Office of the Parliament of Georgia",
    "sdg16.8": "16.7.1 Number of Judges in Common Law Courts of Georgia",
    "sdg16.9": "16.7.1 Staff of the Administration of the Goverment of Georgia",
    "sdg16.10":
      "16.3.1-Reporting of robbery and assault in the last one year (women)",
    sdg17:
      "17.8.1 Proportion of individuals aged 6 and older using the Internet",
  },
};

const SdgPage = ({ language = "GE" }) => {
  const { goalId } = useParams();
  const lang = language === "EN" ? "EN" : "GE";
  const files = SDG_TITLES[lang][goalId] || [];

  // Download path
  const basePath = lang === "EN" ? "/files/sdg_en/" : "/files/sdg/";

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2
        className="text-2xl font-bold mb-6 text-center"
        style={{ color: "#009ddc" }}
      >
        <div className="w-full flex justify-center py-6">
          <div className="flex items-center gap-3 md:gap-5">
            <img
              src={arrLeft}
              alt="Left decoration"
              style={{ width: "163px", height: "12px" }}
            />
            <h2
              style={{
                fontSize: "24px",
                color: "#e4535f",
                fontFamily: "bpg-nino, sans-serif",
                fontFeatureSettings: '"case" on',
                whiteSpace: "nowrap",
              }}
            >
              {lang === "EN"
                ? "Sustainable Development Goals"
                : "მდგრადი განვითარების მიზნები"}
            </h2>
            <img
              src={arrRight}
              alt="Right decoration"
              style={{ width: "163px", height: "12px" }}
            />
          </div>
        </div>
      </h2>
      {files.length === 0 ? (
        <div className="text-center text-gray-500">
          {lang === "EN" ? "No data found" : "მონაცემები არ მოიძებნა"}
        </div>
      ) : (
        <div className="space-y-1">
          {files.map(({ key, file }, idx) => (
            <React.Fragment key={key}>
              <div
                className="p-1 bg-white flex items-center justify-between"
                style={{ border: "none" }}
              >
                <span
                  onClick={() => {
                    window.open(basePath + file, '_blank');
                  }}
                  style={{
                    whiteSpace: 'inherit',
                    textAlign: 'justify',
                    color: '#009ddc',
                    width: '100%',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                    fontFamily: 'myFont, sans-serif',
                  }}
                  onMouseOver={e => (e.currentTarget.style.color = '#e4535f')}
                  onMouseOut={e => (e.currentTarget.style.color = '#009ddc')}
                  title={lang === 'EN' ? 'Download Excel' : 'გადმოწერა'}
                >
                  {SDG_LABELS[lang][key]}
                </span>
              </div>
              <hr style={hrStyle} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default SdgPage;
