import { useEffect, useCallback } from "react";

const modalStyles = `
  @keyframes aboutFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes aboutSlideUp {
    from { opacity: 0; transform: translateY(40px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }
  .about-body h1 {
    color: #005c97;
    font-size: 20px;
    font-weight: 700;
    margin: 20px 0 8px;
    font-family: myFont, sans-serif;
  }
  .about-body h1:first-child { margin-top: 0; }
  .about-body p {
    font-size: 13px;
    color: #37496d;
    line-height: 1.7;
    margin-bottom: 12px;
  }
  .about-body p:last-child { margin-bottom: 0; }
`;

const AboutGenderModal = ({ language, onClose }) => {
  const handleBackdrop = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      <style>{modalStyles}</style>
      <div
        onClick={handleBackdrop}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          animation: "aboutFadeIn 0.2s ease",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "960px",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            fontFamily: "myFont, sans-serif",
            overflow: "hidden",
            animation: "aboutSlideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px 16px",
              background: "#005c97",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "700",
                color: "#fff",
                fontFeatureSettings: '"case" on',
                fontFamily: "bpg-nino, sans-serif",
              }}
            >
              {language === "EN" ? "About Gender" : "გენდერის შესახებ"}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontSize: "22px",
                lineHeight: 1,
                padding: "4px 8px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div
            className="about-body"
            style={{ overflowY: "auto", padding: "24px 28px" }}
          >
            {language === "GE" ? (
              <>
                <h1>გენდერული თანასწორობა</h1>
                <p>
                  გენდერული თანასწორობა ნიშნავს ქალისა და კაცის, გოგოსა და ვაჟის
                  თანაბარ უფლებებს, პასუხისმგებლობებსა და შესაძლებლობებს.
                  თანასწორობა არ გულისხმობს, რომ ქალი და კაცი იდენტურნი უნდა
                  გახდნენ, თანასწორობა გულისხმობს იმას, რომ ადამიანის სქესი არ
                  განსაზღვრავდეს მის უფლებებს, პასუხისმგებლობასა და
                  შესაძლებლობებს. გენდერული თანასწორობა გულისხმობს, რომ როგორც
                  ქალების, ასევე კაცების ინტერესები, საჭიროებები და პრიორიტეტები
                  მიიღება მხედველობაში ქალებისა და კაცების ჯგუფების
                  მრავალფეროვნების გათვალისწინებით.
                </p>
                <p>
                  საქართველოს კონსტიტუციის მე-11 მუხლი (ცვლილებები დამტკიცებულია
                  საქართველოს პარლამენტის მიერ 2017 წელს) და კანონი გენდერული
                  თანასწორობის შესახებ (დამტკიცებულია საქართველოს პარლამენტის
                  მიერ 2010 წელს), უზრუნველყოფს ქალებისთვის და კაცებისთვის
                  თანაბარ უფლებებს და შესაძლებლობებს, ასევე აღიარებს
                  განსაკუთებული ზომების მიღების აუცილებლობას ქალებსა და კაცებს
                  შორის არსებითი თანასწორობის მისაღწევად და უთანასწორობის
                  აღოსაფხვრელად.
                </p>
                <p>
                  2006 წლის საქართველოს გენდერული თანასწორობის კონცეფციის
                  მიხედვით, გენდერული თანასწორობა ადამიანის უფლებათა განუყოფელი
                  ნაწილია. იგი გულისხმობს ქალთა და კაცთა თანაბარ წარმოჩენას,
                  უფლებამოსილებასა და თანასწორ მონაწილეობას საზოგადოებრივი და
                  პირადი ცხოვრების ყველა სფეროში. ამასთანავე, გენდერული
                  თანასწორობა მდგრადი და ადამიანზე ორიენტირებული განვითარების
                  წინაპირობა და მაჩვენებელია. გენდერული თანასწორობის მიღწევა და
                  ქალებისა და გოგონების გაძლიერება გაერთიანებული ერების
                  ორგანიზაციის მდგრადი განვითარების მიზნების (SDG) ნაწილია.
                </p>
                <h1>გენდერული სტატისტიკის აუცილებლობა</h1>
                <p>
                  გენდერული სტატისტიკა - ეს არის სტატისტიკა ქალისა და კაცის
                  მდგომარეობის შესახებ საზოგადოებრივი და ეკონომიკური საქმიანობის
                  ყველა სფეროში. ის წარმოადგენს ერთ-ერთ უმნიშვნელოვანეს
                  ინსტრუმენტს, რომელიც საშუალებას იძლევა ქალების, კაცების,
                  გოგოებისა და ვაჟების პრიორიტეტები და საჭიროებები იმგვარად იყოს
                  გათვალისწინებული პოლიტიკის შემუშავება-განხორციელების
                  პროცესებში, რომ უზრუნველვყოთ ამ პოლიტიკის მიერ მოტანილი
                  სიკეთეებისა და შედეგების თანასწორობა ყველასთვის.
                </p>
                <p>
                  გენდერული სტატისტიკის მიზანია უზრუნველყოს მიუკერძოებელი
                  მონაცემები შედარებისა და შეფასების გზით, ქალისა და კაცის
                  სტატუსის, გენდერული თანასწორობის რეალური ვითარების შესახებ.
                  სქესის ნიშნით დიფერენცირებული სტატისტიკური აღრიცხვის მიხედვით
                  მონაცემთა შეგროვების სრულყოფა და გაფართოება მეტად
                  მნიშვნელოვანია გენდერულ თემატიკაზე მომუშავე პირებისთვის,
                  საკანონმდებლო ორგანოს, სახელმწიფო სტრუქტურებისა და სამოქალაქო
                  საზოგადოების წარმომადგენლებისთვის.
                </p>
                <p>
                  გაეროს მდგრადი განვითარების (SDG) მიზნების ნაციონალიზაცია
                  საქართველოს მთავრობამ 2016 წელს დაიწყო, და გლობალური 17 მიზნის
                  ადაპტაციით, განსაზღვრა საქართველოსთვის პრიორიტეტული ამოცანები,
                  მაჩვენებლები და სამიზნეები. SDG დღის წესრიგის განხორციელებით,
                  2030 წლისთვის ქვეყანაში მნიშვნელოვნად გაუმჯობესდება
                  მდგომარეობა გენდერული თანასწორობის მიმართულებით; SDG მიზანი 5
                  თანმდევი ამოცანებით ითვალისწინებს გენდერული თანასწორობის
                  მიღწევას და ყველა ქალისა და გოგოს შესაძლებლობების
                  გაუმჯობესებას.
                </p>
              </>
            ) : (
              <>
                <h3>Gender Equality</h3>
                <p>
                  Gender equality refers to the equal rights, responsibilities
                  and opportunities of women and men and girls and boys.
                  Equality does not mean that women and men will become the same
                  but that women's and men's rights, responsibilities and
                  opportunities will not depend on whether they are born male or
                  female. Gender equality implies that the interests, needs and
                  priorities of both women and men are taken into consideration,
                  recognizing the diversity of different groups of women and
                  men.
                </p>
                <p>
                  Article 11 in the Constitution of Georgia (including
                  amendments approved by the Parliament in 2017) and the Law of
                  Georgia on Gender Equality (approved by the Parliament in
                  2010) provide women and men with equal rights and
                  opportunities and recognize the need for specific actions in
                  order to achieve equality between women and men and eliminate
                  inequality in Georgia.
                </p>
                <p>
                  According to the 2006 State Concept on Gender Equality,
                  equality between women and men is seen as a human rights issue
                  and refers to the equal representation of women and men, equal
                  rights and participation in every aspect of public and private
                  life. In addition, gender equality is a precondition for, and
                  indicator of, sustainable people-centred development.
                  Achieving gender equality and empowering women and girls is a
                  principal component of the United Nations 2030 Agenda for
                  Sustainable Development.
                </p>
                <h3>Need for Gender Statistics</h3>
                <p>
                  Gender statistics are defined as statistics that adequately
                  reflect the differences and inequalities in the situations of
                  women and men in all areas of life. It is one of the key
                  instruments to reflect and integrate the needs and priorities
                  of women and men and girls and boys in policy development and
                  to ensure equal distribution of its positive outcomes for
                  everyone.
                </p>
                <p>
                  Gender statistics are aimed at producing adequate data by
                  using advanced, gender-sensitive methodology to measure and
                  assess the actual situation with regard to the social status
                  of women and men and overall gender equality. Improvement of
                  content, methods, classifications and measurements with
                  respect to gender equality statistics is of utmost importance
                  for gender equality professionals, as it is for
                  representatives of legislative bodies, state authorities and
                  civil society.
                </p>
                <p>
                  The Government of Georgia began the nationalization of the
                  Sustainable Development Goals (SDGs) in 2016. The Government
                  identified the priority goals, targets and indicators through
                  the adaptation of the 2030 Agenda for Sustainable Development.
                  By implementing the SDG national agenda, by 2030 the situation
                  regarding gender equality will be significantly improved in
                  the country. Specifically, Goal 5 with its relevant objectives
                  and indicators focuses on achieving gender equality and
                  empowering all women and girls.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutGenderModal;
