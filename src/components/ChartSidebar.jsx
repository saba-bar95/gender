import GroupChartImage from "./GroupChartImage";
import "./ChartSidebar.scss";

const LineChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 19V6M5 19H19"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      opacity="0.35"
    />
    <path
      d="M7 15.5C9.2 12.8 10.4 13.6 12.2 11.2C14 8.8 15.2 9.4 17.5 6.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M7 15.5L7 19M12.2 11.2L12.2 19M17.5 6.5L17.5 19"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.2"
    />
    <circle cx="7" cy="15.5" r="1.75" fill="currentColor" />
    <circle cx="12.2" cy="11.2" r="1.75" fill="currentColor" />
    <circle cx="17.5" cy="6.5" r="1.75" fill="currentColor" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 19V6M5 19H19"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      opacity="0.35"
    />
    <rect x="7" y="13" width="3.5" height="6" rx="1.25" fill="currentColor" opacity="0.85" />
    <rect x="11.25" y="9.5" width="3.5" height="9.5" rx="1.25" fill="currentColor" />
    <rect x="15.5" y="6" width="3.5" height="13" rx="1.25" fill="currentColor" opacity="0.85" />
  </svg>
);

/**
 * @param {{
 *   sectionId: string;
 *   groupName: string;
 *   datasetId?: string;
 *   pxwebUrl?: string;
 *   chartType: "line" | "bar";
 *   onChartTypeChange: (type: "line" | "bar") => void;
 *   chartFilters?: { code: string; text: string; valueTexts: string[] }[];
 *   filterSelections?: Record<string, string>;
 *   onFilterChange?: (code: string, value: string) => void;
 *   onDownloadCsv: () => void;
 * }} props
 */
const ChartSidebar = ({
  sectionId,
  groupName,
  datasetId,
  pxwebUrl,
  chartType,
  onChartTypeChange,
  chartFilters = [],
  filterSelections = {},
  onFilterChange,
  onDownloadCsv,
}) => (
  <div className="statistics-chart-sidebar">
    <div className="statistics-chart-sidebar__actions">
      <div className="statistics-chart-type-toggle">
        <button
          type="button"
          className={`statistics-chart-type-btn${chartType === "line" ? " statistics-chart-type-btn--active" : ""}`}
          onClick={() => onChartTypeChange("line")}
          aria-label="Line chart"
          aria-pressed={chartType === "line"}
        >
          <LineChartIcon />
        </button>
        <button
          type="button"
          className={`statistics-chart-type-btn${chartType === "bar" ? " statistics-chart-type-btn--active" : ""}`}
          onClick={() => onChartTypeChange("bar")}
          aria-label="Bar chart"
          aria-pressed={chartType === "bar"}
        >
          <BarChartIcon />
        </button>
      </div>
      {pxwebUrl ? (
        <a
          href={pxwebUrl}
          target="_blank"
          rel="noreferrer"
          className="statistics-pxweb-btn"
        >
          pc-axis
        </a>
      ) : null}
      <button
        type="button"
        className="statistics-csv-btn"
        onClick={onDownloadCsv}
      >
        CSV
      </button>
      {chartFilters.length > 0 ? (
        <div className="statistics-chart-filters">
          {chartFilters.map((variable) => (
            <label key={variable.code} className="statistics-chart-filter">
              <span className="statistics-chart-filter__label">
                {variable.text}
              </span>
              <select
                className="statistics-chart-filter__select"
                value={filterSelections[variable.code] ?? variable.valueTexts[0]}
                onChange={(e) =>
                  onFilterChange?.(variable.code, e.target.value)
                }
              >
                {variable.valueTexts.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      ) : null}
    </div>
    <GroupChartImage
      sectionId={sectionId}
      groupName={groupName}
      datasetId={datasetId}
    />
  </div>
);

export default ChartSidebar;
