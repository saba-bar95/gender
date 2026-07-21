import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGenderStatisticsSections } from "../hooks/useGenderStatisticsSections";
import { useGenderStatisticsDatasets } from "../hooks/useGenderStatisticsDatasets";
import { useGenderStatisticsDatasetChart } from "../hooks/useGenderStatisticsDatasetChart";
import { downloadChartCsv } from "../utils/chartDownloads";
import ChartSidebar from "./ChartSidebar";
import DatasetLineChart from "./DatasetLineChart";
import "./GroupChartImage.scss";

const hrStyle = {
  margin: "10px 0",
  height: "1px",
  border: "none",
  backgroundColor: "#d9edf7",
  backgroundImage: "linear-gradient(to right, cyan, #d3b1ff, #ffcced)",
};

const datasetDisplayName = (dataset, language) =>
  language === "EN" ? dataset.englishName || dataset.name : dataset.name;

const sectionDisplayName = (meta, language) =>
  language === "EN" ? meta.en || meta.ge : meta.ge;

/**
 * The datasets API returns group names only in Georgian (even with lang=en).
 * Each group name matches a section's Georgian name, so translate via sections.
 */
const groupDisplayName = (groupName, sections, language) => {
  if (language !== "EN") return groupName;
  const match = sections.find((s) => s.ge === groupName);
  return match?.en || groupName;
};

const StatisticsSectionPage = ({
  language = "GE",
  sectionId,
  embedded = false,
}) => {
  const navigate = useNavigate();
  const {
    sections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useGenderStatisticsSections();

  const {
    byGroup,
    loading: datasetsLoading,
    error: datasetsError,
  } = useGenderStatisticsDatasets(sectionId, language);

  const {
    selectedId,
    chartModel,
    loading: chartLoading,
    filterLoading: chartFilterLoading,
    error: chartError,
    chartFilters,
    filterSelections,
    loadDataset,
    updateFilter,
    clearDataset,
  } = useGenderStatisticsDatasetChart(language);

  const meta = sections.find((s) => s.id === sectionId);
  const loading = sectionsLoading || datasetsLoading;
  const [chartType, setChartType] = useState("line");
  const chartAnchorRef = useRef(null);

  const scrollChartIntoView = useCallback(() => {
    const el = chartAnchorRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    scrollChartIntoView();
  }, [selectedId, chartModel, chartLoading, scrollChartIntoView]);

  const panel = (children) => (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
      {children}
    </div>
  );

  const wrap = (children) => {
    if (embedded) {
      return <div className="mt-2">{children}</div>;
    }
    return (
      <div
        className="px-6 md:px-16 py-10"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        {children}
      </div>
    );
  };

  if (loading) {
    return wrap(
      panel(
        <p
          className="text-gray-500"
          style={{ fontFamily: "myFont, sans-serif" }}
        >
          {language === "EN" ? "Loading…" : "იტვირთება…"}
        </p>,
      ),
    );
  }

  if (sectionsError || datasetsError || !meta) {
    return wrap(
      panel(
        <>
          <h1 className="text-2xl font-semibold text-[#e4535f] mb-4">
            {language === "EN" ? "Section not found" : "სექცია ვერ მოიძებნა"}
          </h1>
          <Link to="/#statistics" className="text-[#337ab7] underline">
            {language === "EN" ? "Back to sections" : "სექციებზე დაბრუნება"}
          </Link>
        </>,
      ),
    );
  }

  const groupEntries = byGroup ? Object.entries(byGroup) : [];

  return wrap(
    <>
      {embedded ? (
        <div className="max-w-7xl mx-auto mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-2 sm:gap-3 px-1 sm:px-0">
          <button
            type="button"
            onClick={() => navigate("/#statistics")}
            className="text-xs sm:text-sm text-[#337ab7] hover:text-[#009ddc] underline cursor-pointer"
            style={{ fontFamily: "myFont, sans-serif" }}
          >
            {language === "EN" ? "← Back to sections" : "← სექციებზე დაბრუნება"}
          </button>
          {/* <h3
            className="text-sm sm:text-base md:text-lg font-semibold text-[#009ddc] text-right"
            style={{ fontFamily: "myFont, sans-serif" }}
          >
            {sectionDisplayName(meta, language)}
          </h3> */}
        </div>
      ) : null}
      {panel(
        groupEntries.length === 0 ? (
          <p
            className="text-gray-500"
            style={{ fontFamily: "myFont, sans-serif" }}
          >
            {language === "EN"
              ? "No datasets found."
              : "მონაცემები ვერ მოიძებნა."}
          </p>
        ) : (
          <div className="space-y-8">
            {groupEntries.map(([groupName, items]) => (
              <section key={groupName}>
                <h2
                  className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3"
                  style={{
                    color: "#35bb40",
                    fontFamily: "myFont, sans-serif",
                  }}
                >
                  {groupDisplayName(groupName, sections, language)}
                </h2>
                <ul className="space-y-0">
                  {items.map((dataset) => {
                    const label = datasetDisplayName(dataset, language);
                    const isSelected = selectedId === dataset.id;

                    return (
                      <li key={dataset.id}>
                        <div
                          className="flex flex-wrap items-baseline justify-between gap-1.5 sm:gap-2 py-1.5 px-1.5 sm:py-2 sm:px-2 rounded cursor-pointer"
                          onClick={() => {
                            if (isSelected) {
                              clearDataset();
                              return;
                            }
                            setChartType("line");
                            loadDataset(dataset.id);
                          }}
                          style={{
                            border: isSelected
                              ? "1px solid #000"
                              : "1px solid transparent",
                            backgroundColor: isSelected
                              ? "#e6e6e6"
                              : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected)
                              e.currentTarget.style.backgroundColor = "#e6e6e6";
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected)
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                          }}
                        >
                          <div className="flex-1 min-w-0 w-full text-xs sm:text-sm leading-snug sm:leading-normal">
                            <span
                              className={`block text-left wrap-break-word transition-colors hover:text-[#e4535f] ${
                                isSelected
                                  ? "text-[#e4535f] font-semibold"
                                  : "text-[#009ddc]"
                              }`}
                              style={{ fontFamily: "myFont, sans-serif" }}
                            >
                              {label}
                              {dataset.unit ? (
                                <span className="text-[0.92em] opacity-90">
                                  {" "}
                                  ({dataset.unit})
                                </span>
                              ) : null}
                            </span>
                          </div>
                        </div>
                        {isSelected ? (
                          <div
                            ref={chartAnchorRef}
                            className="my-3 statistics-chart-anchor"
                          >
                            {chartLoading && !chartModel ? (
                              <p
                                className="text-gray-500 text-sm"
                                style={{ fontFamily: "myFont, sans-serif" }}
                              >
                                {language === "EN"
                                  ? "Loading chart…"
                                  : "გრაფიკი იტვირთება…"}
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
                              <div
                                className={`statistics-chart-row${chartFilterLoading ? " statistics-chart-row--updating" : ""}`}
                              >
                                <div className="statistics-chart-main">
                                  {chartFilterLoading ? (
                                    <div
                                      className="statistics-chart-update-overlay"
                                      aria-hidden
                                    />
                                  ) : null}
                                  <DatasetLineChart
                                    chartModel={chartModel}
                                    language={language}
                                    chartType={chartType}
                                    displayTitle={`${label}${dataset.unit ? ` (${dataset.unit})` : ""}`}
                                  />
                                </div>
                                <ChartSidebar
                                  sectionId={sectionId}
                                  groupName={groupName}
                                  datasetId={dataset.id}
                                  pxwebUrl={dataset.pxwebUrl}
                                  chartType={chartType}
                                  onChartTypeChange={setChartType}
                                  chartFilters={chartFilters}
                                  filterSelections={filterSelections}
                                  onFilterChange={updateFilter}
                                  onDownloadCsv={() => {
                                    const chartTitle = `${label}${dataset.unit ? ` (${dataset.unit})` : ""}`;
                                    downloadChartCsv(
                                      chartModel.chartData.filter(
                                        (row) =>
                                          typeof row.year === "number" &&
                                          row.year >= 2000,
                                      ),
                                      chartModel.seriesKeys,
                                      chartModel.yearLabel,
                                      chartTitle,
                                      chartModel.seriesExportLabels,
                                    );
                                  }}
                                />
                              </div>
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
        ),
      )}
    </>,
  );
};

/** Standalone section view (home embed uses Main + embedded StatisticsSectionPage). */
export function StatisticsSectionRoute({ language }) {
  const { section } = useParams();
  return (
    <StatisticsSectionPage
      key={`${section}-${language}`}
      language={language}
      sectionId={section}
      embedded={false}
    />
  );
}

export default StatisticsSectionPage;
