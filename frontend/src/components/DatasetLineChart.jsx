import { useEffect, useRef, useState } from "react";
import maleIcon from "../assets/charts/male.png";
import femaleIcon from "../assets/charts/female.png";
import totalIcon from "../assets/charts/total.png";
import {
  downloadChartPdf,
  downloadChartPng,
  downloadChartXls,
} from "../utils/chartDownloads";
import "./DatasetLineChart.scss";

const SERIES_FALLBACK_COLORS = ["#6b7280", "#10b981", "#f59e0b", "#8b5cf6"];

const SERIES_COLORS_BY_TYPE = {
  male: "rgb(0, 164, 223)",
  female: "rgb(241, 119, 59)",
  total: "rgb(52, 181, 90)",
};

const CHART_WIDTH = 960;
const CHART_HEIGHT = 400;
const PADDING = { top: 14, right: 10, bottom: 62, left: 48 };
const X_AXIS_INSET = 18;
const X_LABEL_GAP = 12;
const MIN_DISPLAY_YEAR = 2000;
const MARKER_SIZE = 14;
const MARKER_SIZE_HOVER = 18;

const SERIES_MARKER_ICONS = {
  male: maleIcon,
  female: femaleIcon,
  total: totalIcon,
};

/** @param {string} key */
const getSeriesMarkerType = (key) => {
  const s = key.toLowerCase();
  if (/ქალი|გოგო|female|woman|women|girl/.test(s)) return "female";
  if (/კაც|ბიჭი|male|\bman\b|\bmen\b|boy/.test(s)) return "male";
  if (/total|სულ|ჯამ/.test(s)) return "total";
  return null;
};

/** @param {string} key */
const getSeriesMarkerIcon = (key) => {
  const type = getSeriesMarkerType(key);
  return type ? SERIES_MARKER_ICONS[type] : null;
};

/** @param {string} key @param {number} [fallbackIndex] @param {number} [seriesCount] */
const getSeriesColor = (key, fallbackIndex = 0, seriesCount = 1) => {
  const type = getSeriesMarkerType(key);
  if (type && SERIES_COLORS_BY_TYPE[type]) return SERIES_COLORS_BY_TYPE[type];
  if (seriesCount === 1) return SERIES_COLORS_BY_TYPE.female;
  return SERIES_FALLBACK_COLORS[fallbackIndex % SERIES_FALLBACK_COLORS.length];
};

const toNumber = (value) =>
  typeof value === "number" && !Number.isNaN(value) ? value : null;
const formatYear = (value) => String(value ?? "");
const formatValue = (value) =>
  typeof value === "number" ? value.toLocaleString() : "—";
const formatAxisNumber = (value) =>
  Math.round(value).toLocaleString(undefined, { maximumFractionDigits: 0 });

/**
 * Maps viewBox x to pixel offset inside the chart canvas (handles SVG letterboxing).
 * @param {SVGSVGElement} svg
 * @param {HTMLElement} canvasEl
 * @param {number} viewBoxX
 */
const mapViewBoxXToCanvas = (svg, canvasEl, viewBoxX) => {
  const svgRect = svg.getBoundingClientRect();
  const canvasRect = canvasEl.getBoundingClientRect();
  const scale = Math.min(
    svgRect.width / CHART_WIDTH,
    svgRect.height / CHART_HEIGHT,
  );
  const renderedWidth = CHART_WIDTH * scale;
  const offsetX = (svgRect.width - renderedWidth) / 2;
  const xInSvg = offsetX + viewBoxX * scale;
  return svgRect.left - canvasRect.left + xInSvg;
};

/**
 * @param {SVGSVGElement} svg
 * @param {number} clientX
 */
const clientXToViewBoxX = (svg, clientX) => {
  const bounds = svg.getBoundingClientRect();
  const scale = Math.min(
    bounds.width / CHART_WIDTH,
    bounds.height / CHART_HEIGHT,
  );
  const renderedWidth = CHART_WIDTH * scale;
  const offsetX = (bounds.width - renderedWidth) / 2;
  return (clientX - bounds.left - offsetX) / scale;
};

/** @param {number} roughStep */
const niceStep = (roughStep) => {
  if (!Number.isFinite(roughStep) || roughStep <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;
  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
};

/**
 * Y-axis scale from 0 upward with nice integer ticks.
 * @param {number} dataMax
 * @param {number} [targetTickCount]
 */
const computeYAxisScale = (dataMax, targetTickCount = 5) => {
  const maxVal = Math.max(dataMax, 0);
  if (maxVal === 0) {
    return { min: 0, max: 1, ticks: [0, 1], step: 1 };
  }

  const step = niceStep(maxVal / Math.max(targetTickCount - 1, 1));
  let scaleMax = Math.ceil(maxVal / step) * step;
  if (scaleMax <= 0) scaleMax = step;

  const ticks = [];
  for (let v = 0; v <= scaleMax + step * 0.001; v += step) {
    ticks.push(Math.round(v * 1e6) / 1e6);
  }

  return { min: 0, max: scaleMax, ticks, step };
};

const ChartHeader = ({
  displayTitle,
  language,
  showDownloads,
  onDownloadPng,
  onDownloadPdf,
  onDownloadXls,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const labels =
    language === "EN"
      ? {
          png: "Download PNG image",
          pdf: "Download PDF document",
          xls: "Download xls",
        }
      : {
          png: "PNG სურათის გადმოწერა",
          pdf: "PDF დოკუმენტის გადმოწერა",
          xls: "xls გადმოწერა",
        };

  return (
    <div className="dlc-header">
      <div className="dlc-title-wrap">
        <h3>{displayTitle}</h3>
      </div>
      {showDownloads ? (
        <div className="dlc-menu-wrap" ref={menuRef}>
          <button
            type="button"
            className="dlc-menu-btn"
            aria-label={
              language === "EN" ? "Download options" : "გადმოწერის ვარიანტები"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              className="dlc-menu-icon"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <rect y="1" width="14" height="2" rx="1" fill="currentColor" />
              <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
              <rect y="11" width="14" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
          {menuOpen ? (
            <ul className="dlc-menu-dropdown">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDownloadPng();
                  }}
                >
                  {labels.png}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDownloadPdf();
                  }}
                >
                  {labels.pdf}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDownloadXls();
                  }}
                >
                  {labels.xls}
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

/**
 * @param {{
 *   chartModel: {
 *     title: string;
 *     unit: string;
 *     seriesKeys: string[];
 *     seriesExportLabels?: string[];
 *     chartData: Record<string, number | null>[];
 *     yearLabel: string;
 *   };
 *   language: string;
 *   displayTitle?: string;
 *   chartType?: "line" | "bar";
 * }} props
 */
const DatasetLineChart = ({
  chartModel,
  language,
  displayTitle,
  chartType = "line",
}) => {
  const { title, unit, seriesKeys, seriesExportLabels, chartData, yearLabel } =
    chartModel;
  const exportLabels = seriesExportLabels ?? seriesKeys;
  const pointsWithYear = chartData.filter(
    (row) => typeof row.year === "number",
  );
  const recentPoints = pointsWithYear.filter(
    (row) => row.year >= MIN_DISPLAY_YEAR,
  );
  const displayChartData =
    recentPoints.length > 0 ? recentPoints : pointsWithYear;
  const chartTitle = displayTitle ?? (unit ? `${title} (${unit})` : title);
  const svgRef = useRef(null);
  const canvasRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipAnchor, setTooltipAnchor] = useState(
    /** @type {{ x: number; flipLeft: boolean } | null} */ (null),
  );
  const [visibleLines, setVisibleLines] = useState(
    Object.fromEntries(seriesKeys.map((key) => [key, true])),
  );

  const handleDownloadPng = () => {
    if (svgRef.current) downloadChartPng(svgRef.current, chartTitle);
  };

  const handleDownloadPdf = () => {
    if (svgRef.current) downloadChartPdf(svgRef.current, chartTitle);
  };

  const handleDownloadXls = () => {
    downloadChartXls(
      displayChartData,
      seriesKeys,
      yearLabel,
      chartTitle,
      exportLabels,
    );
  };

  if (!displayChartData.length || !seriesKeys.length) {
    return (
      <div className="chart-wrapper dataset-chart-wrapper">
        <ChartHeader
          displayTitle={chartTitle}
          language={language}
          showDownloads={false}
        />
        <div className="empty-state">
          {language === "EN"
            ? "No chart data available for this indicator."
            : "ამ ინდიკატორისთვის გრაფიკის მონაცემები არ არის."}
        </div>
      </div>
    );
  }

  const years = displayChartData
    .map((d) => d.year)
    .filter((year) => typeof year === "number");
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const visibleSeriesKeys = seriesKeys.filter(
    (key) => visibleLines[key] !== false,
  );
  const visibleValues = visibleSeriesKeys
    .flatMap((key) => displayChartData.map((row) => toNumber(row[key])))
    .filter((v) => v !== null);

  const maxValue = visibleValues.length ? Math.max(...visibleValues) : 1;
  const yAxisScale = computeYAxisScale(maxValue, 5);
  const yScaleMin = yAxisScale.min;
  const yScaleMax = yAxisScale.max;
  const valueRange = yScaleMax - yScaleMin || 1;
  const yearRange = maxYear - minYear || 1;

  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const xPlotLeft = PADDING.left + X_AXIS_INSET;
  const xPlotRight = CHART_WIDTH - PADDING.right - X_AXIS_INSET;
  const xPlotWidth = xPlotRight - xPlotLeft;

  const xForYear = (year) => {
    if (yearRange === 0) return xPlotLeft + xPlotWidth / 2;
    return xPlotLeft + ((year - minYear) / yearRange) * xPlotWidth;
  };
  const yForValue = (value) =>
    PADDING.top + ((yScaleMax - value) / valueRange) * innerHeight;

  const xTickYears = (() => {
    const sorted = [...years].sort((a, b) => a - b);
    if (sorted.length <= 18) return sorted;
    const step = Math.max(1, Math.ceil(sorted.length / 16));
    return sorted.filter(
      (_, index) => index % step === 0 || index === sorted.length - 1,
    );
  })();

  const xPositions = displayChartData.map((row) => xForYear(row.year));

  const xAxisY = PADDING.top + innerHeight;
  const xTickLabelY = xAxisY + X_LABEL_GAP;
  const xAxisTitleX = xPlotLeft + xPlotWidth / 2;
  const xAxisTitleY = xAxisY + 48;
  const xLabelRotation = -42;

  const hoveredRow =
    hoveredIndex === null ? null : displayChartData[hoveredIndex];

  const handleLegendToggle = (key) => {
    const visibleCount = seriesKeys.filter(
      (k) => visibleLines[k] !== false,
    ).length;
    if (visibleLines[key] !== false && visibleCount === 1) return;
    setVisibleLines((prev) => {
      const isVisible = prev[key] !== false;
      return { ...prev, [key]: isVisible ? false : true };
    });
  };

  const visibleCount = visibleSeriesKeys.length;
  const yearCount = displayChartData.length;
  const clusterWidth =
    yearCount > 1
      ? Math.min(56, (xPlotWidth / Math.max(yearCount - 1, 1)) * 0.55)
      : 48;
  const barWidth = Math.max(
    4,
    (clusterWidth / Math.max(visibleCount, 1)) * 0.88,
  );

  return (
    <div className="chart-wrapper dataset-chart-wrapper">
      <ChartHeader
        displayTitle={chartTitle}
        language={language}
        showDownloads
        onDownloadPng={handleDownloadPng}
        onDownloadPdf={handleDownloadPdf}
        onDownloadXls={handleDownloadXls}
      />

      <div
        ref={canvasRef}
        className="chart-canvas w-full overflow-x-auto relative"
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          className="dataset-chart-svg w-full h-auto block"
          onMouseLeave={() => {
            setHoveredIndex(null);
            setTooltipAnchor(null);
          }}
          onMouseMove={(event) => {
            const svg = event.currentTarget;
            const localX = clientXToViewBoxX(svg, event.clientX);
            let closestIndex = 0;
            let minDistance = Math.abs(localX - xPositions[0]);
            for (let i = 1; i < xPositions.length; i += 1) {
              const distance = Math.abs(localX - xPositions[i]);
              if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
              }
            }
            const hoveredX = xPositions[closestIndex];
            const canvasEl = canvasRef.current;
            if (canvasEl) {
              setTooltipAnchor({
                x: mapViewBoxXToCanvas(svg, canvasEl, hoveredX),
                flipLeft: hoveredX > xPlotLeft + xPlotWidth / 2,
              });
            }
            setHoveredIndex(closestIndex);
          }}
        >
          {yAxisScale.ticks.map((tickValue) => {
            const y =
              PADDING.top +
              ((yScaleMax - tickValue) / valueRange) * innerHeight;
            return (
              <g key={`y-${tickValue}`}>
                <line
                  x1={xPlotLeft}
                  y1={y}
                  x2={xPlotRight}
                  y2={y}
                  stroke="#e5e7eb"
                />
                <text
                  x={PADDING.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#6b7280"
                  style={{ fontFamily: "myFont, sans-serif" }}
                >
                  {formatAxisNumber(tickValue)}
                </text>
              </g>
            );
          })}

          <line
            x1={PADDING.left}
            y1={xAxisY}
            x2={CHART_WIDTH - PADDING.right}
            y2={xAxisY}
            stroke="#9ca3af"
          />
          <line
            x1={PADDING.left}
            y1={PADDING.top}
            x2={PADDING.left}
            y2={PADDING.top + innerHeight}
            stroke="#9ca3af"
          />

          {xTickYears.map((year) => {
            const x = xForYear(year);
            return (
              <g key={`x-${year}`}>
                <line
                  x1={x}
                  y1={PADDING.top}
                  x2={x}
                  y2={PADDING.top + innerHeight}
                  stroke="#f3f4f6"
                />
                <text
                  x={x}
                  y={xTickLabelY}
                  textAnchor="end"
                  fontSize="9"
                  fill="#6b7280"
                  transform={`rotate(${xLabelRotation}, ${x}, ${xTickLabelY})`}
                  style={{ fontFamily: "myFont, sans-serif" }}
                >
                  {formatYear(year)}
                </text>
              </g>
            );
          })}

          {chartType === "bar"
            ? visibleSeriesKeys.map((key, seriesIndex) => {
                const color = getSeriesColor(
                  key,
                  seriesIndex,
                  visibleSeriesKeys.length,
                );
                return (
                  <g key={key}>
                    {displayChartData.map((row, pointIndex) => {
                      const yValue = toNumber(row[key]);
                      if (yValue === null) return null;
                      const centerX = xForYear(row.year);
                      const x =
                        centerX -
                        (visibleCount * barWidth) / 2 +
                        seriesIndex * barWidth;
                      const y = yForValue(yValue);
                      const height = xAxisY - y;
                      const dimmed =
                        hoveredIndex !== null && hoveredIndex !== pointIndex;
                      return (
                        <rect
                          key={`${key}-${pointIndex}`}
                          x={x}
                          y={y}
                          width={barWidth}
                          height={height}
                          fill={color}
                          opacity={dimmed ? 0.35 : 1}
                          rx={2}
                        />
                      );
                    })}
                  </g>
                );
              })
            : visibleSeriesKeys.map((key, index) => {
                const color = getSeriesColor(
                  key,
                  index,
                  visibleSeriesKeys.length,
                );
                const points = displayChartData.map((row) => {
                  const yValue = toNumber(row[key]);
                  return {
                    x: xForYear(row.year),
                    y: yValue === null ? null : yForValue(yValue),
                  };
                });
                const hasPoint = points.some((p) => p.y !== null);
                if (!hasPoint) return null;
                return (
                  <g key={key}>
                    {points.map((point, pointIndex) => {
                      if (pointIndex === 0 || point.y === null) return null;
                      const prev = points[pointIndex - 1];
                      if (prev.y === null) return null;
                      const segmentDimmed =
                        hoveredIndex !== null &&
                        hoveredIndex !== pointIndex &&
                        hoveredIndex !== pointIndex - 1;
                      return (
                        <line
                          key={`${key}-seg-${pointIndex}`}
                          x1={prev.x}
                          y1={prev.y}
                          x2={point.x}
                          y2={point.y}
                          stroke={color}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          opacity={segmentDimmed ? 0.35 : 1}
                        />
                      );
                    })}
                    {points.map((point, pointIndex) => {
                      if (point.y === null) return null;
                      const pointDimmed =
                        hoveredIndex !== null && hoveredIndex !== pointIndex;
                      const icon = getSeriesMarkerIcon(key);
                      const size =
                        hoveredIndex === pointIndex
                          ? MARKER_SIZE_HOVER
                          : MARKER_SIZE;
                      if (icon) {
                        return (
                          <image
                            key={`${key}-${pointIndex}`}
                            href={icon}
                            x={point.x - size / 2}
                            y={point.y - size / 2}
                            width={size}
                            height={size}
                            opacity={pointDimmed ? 0.35 : 1}
                            preserveAspectRatio="xMidYMid meet"
                          />
                        );
                      }
                      return (
                        <circle
                          key={`${key}-${pointIndex}`}
                          cx={point.x}
                          cy={point.y}
                          r={hoveredIndex === pointIndex ? 4 : 2.5}
                          fill={color}
                          opacity={pointDimmed ? 0.35 : 1}
                        />
                      );
                    })}
                  </g>
                );
              })}

          {hoveredRow ? (
            <line
              x1={xForYear(hoveredRow.year)}
              y1={PADDING.top}
              x2={xForYear(hoveredRow.year)}
              y2={PADDING.top + innerHeight}
              stroke="#9ca3af"
              strokeDasharray="4 4"
            />
          ) : null}

          <text
            x={xAxisTitleX}
            y={xAxisTitleY}
            textAnchor="middle"
            fontSize="11"
            fill="#6b7280"
            style={{ fontFamily: "myFont, sans-serif" }}
          >
            {yearLabel}
          </text>
        </svg>

        {hoveredRow && tooltipAnchor ? (
          <div
            className={`custom-tooltip absolute text-xs shadow-sm${
              tooltipAnchor.flipLeft
                ? " custom-tooltip--flip-left"
                : " custom-tooltip--flip-right"
            }`}
            style={{ top: 12, left: tooltipAnchor.x }}
          >
            <div className="tooltip-container">
              <p className="tooltip-label">
                {formatYear(hoveredRow.year)}{" "}
                {language === "EN" ? "Year" : "წელი"}
              </p>
              {visibleSeriesKeys.map((key, index) => {
                const markerIcon = getSeriesMarkerIcon(key);
                return (
                  <p key={`tooltip-${key}`} className="text">
                    <span>
                      {markerIcon ? (
                        <img
                          src={markerIcon}
                          alt=""
                          className="tooltip-marker-icon"
                        />
                      ) : (
                        <span
                          className="before-span"
                          style={{
                            backgroundColor: getSeriesColor(
                              key,
                              index,
                              visibleSeriesKeys.length,
                            ),
                          }}
                        />
                      )}
                      {key}:
                    </span>
                    <span className="value">
                      {formatValue(toNumber(hoveredRow[key]))}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <ul className="recharts-default-legend">
        {seriesKeys.map((key, index) => {
          const markerIcon = getSeriesMarkerIcon(key);
          return (
            <li
              key={key}
              onClick={() => handleLegendToggle(key)}
              className="recharts-legend-item"
              style={{ opacity: visibleLines[key] !== false ? 1 : 0.45 }}
            >
              {markerIcon ? (
                <img
                  src={markerIcon}
                  alt=""
                  className="recharts-legend-item-icon-img"
                />
              ) : (
                <span
                  className="recharts-legend-item-icon"
                  style={{
                    backgroundColor: getSeriesColor(
                      key,
                      index,
                      seriesKeys.length,
                    ),
                  }}
                />
              )}
              <span className="recharts-legend-item-text">{key}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DatasetLineChart;
