import { useMemo, useState } from "react";
import "./DatasetLineChart.scss";

const SERIES_COLORS = [
  "#e4535f",
  "#009ddc",
  "#6b7280",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
];

const CHART_WIDTH = 960;
const CHART_HEIGHT = 380;
const PADDING = { top: 18, right: 18, bottom: 40, left: 58 };

const toNumber = (value) => (typeof value === "number" && !Number.isNaN(value) ? value : null);
const formatYear = (value) => String(value ?? "");
const formatValue = (value) => (typeof value === "number" ? value.toLocaleString() : "—");

const makePath = (points) => {
  const valid = points.filter((p) => p.y !== null);
  if (!valid.length) return "";
  return valid
    .map((p, index) => `${index === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
};

/**
 * @param {{
 *   chartModel: {
 *     title: string;
 *     unit: string;
 *     seriesKeys: string[];
 *     chartData: Record<string, number | null>[];
 *     yearLabel: string;
 *   };
 *   language: string;
 * }} props
 */
const DatasetLineChart = ({ chartModel, language }) => {
  const { title, unit, seriesKeys, chartData, yearLabel } = chartModel;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleLines, setVisibleLines] = useState(
    Object.fromEntries(seriesKeys.map((key) => [key, true])),
  );

  if (!chartData.length || !seriesKeys.length) {
    return (
      <div className="chart-wrapper dataset-chart-wrapper">
        <div className="dlc-header">
          <div className="dlc-right">
            <div className="dlc-accent" />
            <div className="dlc-title-wrap">
              <h3>{unit ? `${title} (${unit})` : title}</h3>
            </div>
          </div>
        </div>
        <div className="empty-state">
          {language === "EN"
            ? "No chart data available for this indicator."
            : "ამ ინდიკატორისთვის გრაფიკის მონაცემები არ არის."}
        </div>
      </div>
    );
  }

  const years = chartData.map((d) => d.year).filter((year) => typeof year === "number");
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const allValues = seriesKeys
    .flatMap((key) => chartData.map((row) => toNumber(row[key])))
    .filter((v) => v !== null);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue || 1;
  const yearRange = maxYear - minYear || 1;

  const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const yTicks = 5;

  const xForYear = (year) =>
    PADDING.left + ((year - minYear) / yearRange) * innerWidth;
  const yForValue = (value) =>
    PADDING.top + ((maxValue - value) / valueRange) * innerHeight;

  const xTickYears = [minYear, Math.round((minYear + maxYear) / 2), maxYear].filter(
    (year, index, arr) => arr.indexOf(year) === index,
  );
  const visibleSeriesKeys = seriesKeys.filter((key) => visibleLines[key]);

  const xPositions = useMemo(
    () => chartData.map((row) => xForYear(row.year)),
    [chartData, yearRange, minYear],
  );

  const hoveredRow = hoveredIndex === null ? null : chartData[hoveredIndex];

  const handleLegendToggle = (key) => {
    const visibleCount = Object.values(visibleLines).filter(Boolean).length;
    if (visibleLines[key] && visibleCount === 1) return;
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="chart-wrapper dataset-chart-wrapper">
      <div className="dlc-header">
        <div className="dlc-right">
          <div className="dlc-accent" />
          <div className="dlc-title-wrap">
            <h3>{unit ? `${title} (${unit})` : title}</h3>
            <p>
              {language === "EN" ? "Interactive line chart" : "ინტერაქტიული ხაზოვანი დიაგრამა"}
            </p>
          </div>
        </div>
      </div>

      <div className="chart-canvas w-full overflow-x-auto relative">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="w-full min-w-[680px] h-[400px] bg-white border border-[#e5e7eb] rounded"
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const ratio = CHART_WIDTH / bounds.width;
            const localX = (event.clientX - bounds.left) * ratio;
            let closestIndex = 0;
            let minDistance = Math.abs(localX - xPositions[0]);
            for (let i = 1; i < xPositions.length; i += 1) {
              const distance = Math.abs(localX - xPositions[i]);
              if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
              }
            }
            setHoveredIndex(closestIndex);
          }}
        >
          {Array.from({ length: yTicks + 1 }).map((_, i) => {
            const ratio = i / yTicks;
            const y = PADDING.top + ratio * innerHeight;
            const value = maxValue - ratio * valueRange;
            return (
              <g key={`y-${i}`}>
                <line x1={PADDING.left} y1={y} x2={CHART_WIDTH - PADDING.right} y2={y} stroke="#e5e7eb" />
                <text
                  x={PADDING.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#6b7280"
                  style={{ fontFamily: "myFont, sans-serif" }}
                >
                  {formatValue(value)}
                </text>
              </g>
            );
          })}

          <line
            x1={PADDING.left}
            y1={PADDING.top + innerHeight}
            x2={CHART_WIDTH - PADDING.right}
            y2={PADDING.top + innerHeight}
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
                <line x1={x} y1={PADDING.top} x2={x} y2={PADDING.top + innerHeight} stroke="#f3f4f6" />
                <text
                  x={x}
                  y={CHART_HEIGHT - 14}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6b7280"
                  style={{ fontFamily: "myFont, sans-serif" }}
                >
                  {formatYear(year)}
                </text>
              </g>
            );
          })}

          {visibleSeriesKeys.map((key, index) => {
            const color = SERIES_COLORS[index % SERIES_COLORS.length];
            const points = chartData.map((row) => {
              const yValue = toNumber(row[key]);
              return {
                x: xForYear(row.year),
                y: yValue === null ? null : yForValue(yValue),
              };
            });
            const path = makePath(points);
            if (!path) return null;
            return (
              <g key={key}>
                <path d={path} fill="none" stroke={color} strokeWidth="2.5" />
                {points.map((point, pointIndex) =>
                  point.y === null ? null : (
                    <circle
                      key={`${key}-${pointIndex}`}
                      cx={point.x}
                      cy={point.y}
                      r={hoveredIndex === pointIndex ? 4 : 2.5}
                      fill={color}
                    />
                  ),
                )}
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
            x={CHART_WIDTH / 2}
            y={CHART_HEIGHT - 4}
            textAnchor="middle"
            fontSize="12"
            fill="#374151"
            style={{ fontFamily: "myFont, sans-serif" }}
          >
            {yearLabel}
          </text>
        </svg>

        {hoveredRow ? (
          <div
            className="custom-tooltip absolute top-3 right-3 text-xs shadow-sm"
          >
            <div className="tooltip-container">
              <p className="tooltip-label">
              {formatYear(hoveredRow.year)} {language === "EN" ? "Year" : "წელი"}
              </p>
              {visibleSeriesKeys.map((key, index) => (
                <p key={`tooltip-${key}`} className="text">
                  <span>
                  <span
                      className="before-span"
                    style={{ backgroundColor: SERIES_COLORS[index % SERIES_COLORS.length] }}
                  />
                  {key}:
                  </span>
                  <span className="value">{formatValue(toNumber(hoveredRow[key]))}</span>
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <ul className="recharts-default-legend">
        {seriesKeys.map((key, index) => (
          <li
            key={key}
            onClick={() => handleLegendToggle(key)}
            className="recharts-legend-item"
            style={{ opacity: visibleLines[key] ? 1 : 0.45 }}
          >
            <span
              className="recharts-legend-item-icon"
              style={{ backgroundColor: SERIES_COLORS[index % SERIES_COLORS.length] }}
            />
            <span className="recharts-legend-item-text">{key}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DatasetLineChart;
