import { useParams, Link } from "react-router-dom";
import { useGenderStatisticsSections } from "../hooks/useGenderStatisticsSections";
import { useGenderStatisticsDatasets } from "../hooks/useGenderStatisticsDatasets";
import { useGenderStatisticsDatasetChart } from "../hooks/useGenderStatisticsDatasetChart";
import DatasetLineChart from "./DatasetLineChart";

const hrStyle = {
  margin: "10px 0",
  height: "1px",
  border: "none",
  backgroundColor: "#d9edf7",
  backgroundImage: "linear-gradient(to right, cyan, #d3b1ff, #ffcced)",
};

const datasetDisplayName = (dataset, language) =>
  language === "EN" ? dataset.englishName || dataset.name : dataset.name;

const StatisticsSectionPage = ({ language = "GE", sectionId }) => {
  const { sections, loading: sectionsLoading, error: sectionsError } =
    useGenderStatisticsSections();
  const {
    byGroup,
    loading: datasetsLoading,
    error: datasetsError,
  } = useGenderStatisticsDatasets(sectionId, language);
  const {
    selectedId,
    chartModel,
    loading: chartLoading,
    error: chartError,
    loadDataset,
  } = useGenderStatisticsDatasetChart(language);

  const meta = sections.find((s) => s.id === sectionId);
  const loading = sectionsLoading || datasetsLoading;

  if (loading) {
    return (
      <div className="px-6 md:px-16 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <p
            className="text-gray-500"
            style={{ fontFamily: "myFont, sans-serif" }}
          >
            {language === "EN" ? "Loading…" : "იტვირთება…"}
          </p>
        </div>
      </div>
    );
  }

  if (sectionsError || datasetsError || !meta) {
    return (
      <div className="px-6 md:px-16 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-[#e4535f] mb-4">
            {language === "EN" ? "Section not found" : "სექცია ვერ მოიძებნა"}
          </h1>
          <Link to="/" className="text-[#337ab7] underline">
            {language === "EN" ? "Back to home" : "მთავარ გვერდზე დაბრუნება"}
          </Link>
        </div>
      </div>
    );
  }

  const title = language === "EN" ? meta.en : meta.ge;
  const description =
    language === "EN" ? meta.descriptionEn : meta.descriptionGe;
  const groupEntries = byGroup ? Object.entries(byGroup) : [];

  return (
    <div className="px-6 md:px-16 py-10" style={{ backgroundColor: "#f6f6f6" }}>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <h1
          className="text-3xl font-semibold mb-4"
          style={{ color: "#e4535f", fontFamily: "bpg-nino, sans-serif" }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="text-gray-600 mb-8"
            style={{ fontFamily: "myFont, sans-serif" }}
          >
            {description}
          </p>
        ) : null}

        {groupEntries.length === 0 ? (
          <p className="text-gray-500" style={{ fontFamily: "myFont, sans-serif" }}>
            {language === "EN" ? "No datasets found." : "მონაცემები ვერ მოიძებნა."}
          </p>
        ) : (
          <div className="space-y-8">
            {groupEntries.map(([groupName, items]) => (
              <section key={groupName}>
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{
                    color: "#009ddc",
                    fontFamily: "bpg-nino, sans-serif",
                  }}
                >
                  {groupName}
                </h2>
                <ul className="space-y-0">
                  {items.map((dataset) => {
                    const label = datasetDisplayName(dataset, language);
                    const isSelected = selectedId === dataset.id;

                    return (
                      <li key={dataset.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 py-2">
                          <div className="flex-1 min-w-[200px] text-sm">
                            <button
                              type="button"
                              onClick={() => loadDataset(dataset.id)}
                              className={`text-left transition-colors hover:text-[#e4535f] ${
                                isSelected
                                  ? "text-[#e4535f] font-semibold"
                                  : "text-[#009ddc]"
                              }`}
                              style={{ fontFamily: "myFont, sans-serif" }}
                            >
                              {label}
                            </button>
                          </div>
                          {dataset.unit ? (
                            <span
                              className="text-sm text-gray-500 shrink-0"
                              style={{ fontFamily: "myFont, sans-serif" }}
                            >
                              {language === "EN" ? "Unit: " : "საზომი ერთეული: "}
                              {dataset.unit}
                            </span>
                          ) : null}
                        </div>
                        {isSelected ? (
                          <div className="my-3 rounded-lg border border-[#d9edf7] bg-[#fafcff] p-4">
                            {chartLoading ? (
                              <p
                                className="text-gray-500 text-sm"
                                style={{ fontFamily: "myFont, sans-serif" }}
                              >
                                {language === "EN" ? "Loading chart…" : "გრაფიკი იტვირთება…"}
                              </p>
                            ) : null}
                            {chartError ? (
                              <p
                                className="text-[#e4535f] text-sm"
                                style={{ fontFamily: "myFont, sans-serif" }}
                              >
                                {language === "EN"
                                  ? "Could not load chart data."
                                  : "გრაფიკის მონაცემები ვერ ჩაიტვირთა."}
                              </p>
                            ) : null}
                            {chartModel && !chartLoading ? (
                              <DatasetLineChart chartModel={chartModel} language={language} />
                            ) : null}
                          </div>
                        ) : null}
                        <hr style={hrStyle} />
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/** Remounts section page when route or language changes so dataset fetch restarts cleanly. */
export function StatisticsSectionRoute({ language }) {
  const { section } = useParams();
  return (
    <StatisticsSectionPage
      key={`${section}-${language}`}
      language={language}
      sectionId={section}
    />
  );
}

export default StatisticsSectionPage;
