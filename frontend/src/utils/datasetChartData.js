import { getFilterDimensionCodes } from "./datasetFilters";

const YEAR_KEYS = ["year", "Year", "წელი"];

/**
 * @param {Record<string, unknown>} row
 */
const getYearFromRow = (row) => {
  for (const key of YEAR_KEYS) {
    if (key in row && row[key] != null) {
      return Number(row[key]);
    }
  }
  return null;
};

const isDimensionColumn = (key, dimensionSet) => {
  if (YEAR_KEYS.includes(key)) return true;
  const lower = key.toLowerCase();
  return dimensionSet.has(key) || dimensionSet.has(lower);
};

/**
 * Series keys = value columns in each row (exclude year / PX dimension codes).
 * @param {Record<string, unknown>[]} rows
 * @param {string[]} categories
 * @param {string[]} dimensions
 */
const resolveSeriesKeys = (rows, categories, dimensions) => {
  const sample = rows[0];
  if (!sample) return [];

  const dimensionSet = new Set([
    ...(dimensions ?? []).map((d) => d.toLowerCase()),
    ...(dimensions ?? []),
  ]);

  const keysFromRows = Object.keys(sample).filter(
    (key) => !isDimensionColumn(key, dimensionSet),
  );

  if (categories?.length) {
    const present = categories.filter((cat) => cat in sample);
    if (present.length) return present;
  }

  return keysFromRows;
};

/**
 * @param {{ data: Record<string, unknown>; metadata: Record<string, unknown> }} payload
 */
export function buildChartModelFromPayload({ data, metadata }) {
  const rows = Array.isArray(data?.data) ? data.data : [];
  const categories = Array.isArray(data?.categories) ? data.categories : [];
  const apiDimensions = Array.isArray(data?.dimensions) ? data.dimensions : [];
  const filterCodes = getFilterDimensionCodes(
    metadata?.metadata?.variables ?? [],
  );
  const dimensions = [...new Set([...apiDimensions, ...filterCodes])];
  const seriesKeys = resolveSeriesKeys(rows, categories, dimensions);

  const byYear = new Map();
  for (const row of rows) {
    const year = getYearFromRow(row);
    if (year == null || Number.isNaN(year)) continue;
    byYear.set(year, row);
  }

  const chartData = Array.from(byYear.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, row]) => {
      const point = { year };
      for (const key of seriesKeys) {
        const value = row[key];
        point[key] =
          value === null || value === undefined || value === ""
            ? null
            : Number(value);
      }
      return point;
    });

  const metaTitle = metadata?.metadata?.title;
  const title = data?.title || metaTitle || data?.name || metadata?.name || "";

  const variableLabels = (metadata?.metadata?.variables ?? []).reduce(
    (acc, variable) => {
      if (variable?.code) acc[variable.code] = variable.text ?? variable.code;
      return acc;
    },
    /** @type {Record<string, string>} */ ({}),
  );

  return {
    title,
    unit: data?.unit ?? "",
    seriesKeys,
    chartData,
    variableLabels,
    yearLabel: variableLabels.Year ?? variableLabels.year ?? "Year",
  };
}
