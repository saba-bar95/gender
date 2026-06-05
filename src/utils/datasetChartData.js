import { getFilterDimensionCodes, isYearVariable } from "./datasetFilters";

const YEAR_ROW_KEYS = ["year", "Year", "Years", "years", "წელი"];
const GENERIC_VALUE_KEYS = new Set(["value", "Value", "VALUE"]);

/**
 * @param {unknown[]} variables
 */
const findYearMetadataVariable = (variables) => {
  if (!Array.isArray(variables)) return null;
  return variables.find((v) => v && isYearVariable(v)) ?? null;
};

/**
 * Maps PX index codes (0, 1, 2…) to calendar years from metadata valueTexts.
 * @param {Record<string, unknown> | null | undefined} yearVariable
 */
const buildYearIndexMap = (yearVariable) => {
  if (!yearVariable) return null;

  const codes = Array.isArray(yearVariable.values)
    ? yearVariable.values.map(String)
    : [];
  const labels = Array.isArray(yearVariable.valueTexts)
    ? yearVariable.valueTexts.map(String)
    : [];

  if (!codes.length || codes.length !== labels.length) return null;

  const map = new Map();
  for (let i = 0; i < codes.length; i += 1) {
    const calendarYear = Number(labels[i]);
    if (Number.isNaN(calendarYear)) continue;
    map.set(codes[i], calendarYear);
    const codeNum = Number(codes[i]);
    if (!Number.isNaN(codeNum)) map.set(codeNum, calendarYear);
  }

  return map.size ? map : null;
};

/**
 * @param {number} raw
 * @param {Map<string | number, number> | null} yearIndexMap
 */
const toCalendarYear = (raw, yearIndexMap) => {
  if (yearIndexMap?.has(raw)) return yearIndexMap.get(raw);
  if (yearIndexMap?.has(String(raw))) return yearIndexMap.get(String(raw));
  if (raw >= 1900 && raw <= 2100) return raw;
  return raw;
};

/**
 * @param {Record<string, unknown>} row
 * @param {Map<string | number, number> | null} yearIndexMap
 */
const getYearFromRow = (row, yearIndexMap) => {
  for (const key of YEAR_ROW_KEYS) {
    if (key in row && row[key] != null && row[key] !== "") {
      const raw = Number(row[key]);
      if (Number.isNaN(raw)) return null;
      return toCalendarYear(raw, yearIndexMap);
    }
  }
  return null;
};

/**
 * @param {string} title
 */
const stripYearSuffixFromTitle = (title) =>
  String(title ?? "")
    .replace(/\s*-\s*წელი\s*$/i, "")
    .trim();

/**
 * @param {string} key
 * @param {string[]} dimensionKeys
 */
const isDimensionColumn = (key, dimensionKeys) => {
  if (YEAR_ROW_KEYS.includes(key)) return true;
  const lower = key.toLowerCase();
  return dimensionKeys.some(
    (dim) => dim === key || dim.toLowerCase() === lower,
  );
};

/**
 * @param {Record<string, unknown>[]} rows
 * @param {string[]} categories
 * @param {string[]} dimensions
 */
const resolveRawSeriesKeys = (rows, categories, dimensions) => {
  const sample = rows[0];
  if (!sample) return [];

  const keysFromRows = Object.keys(sample).filter(
    (key) => !isDimensionColumn(key, dimensions),
  );

  if (categories?.length) {
    const present = categories.filter((cat) => cat in sample);
    if (present.length) return present;
  }

  return keysFromRows;
};

/**
 * Human-readable series label for single-series charts (filtered slice or value column).
 * @param {Record<string, unknown>} data
 * @param {Record<string, unknown>} metadata
 * @param {string} fallbackKey
 */
const getSingleSeriesLabel = (data, metadata, fallbackKey) =>
  String(
    stripYearSuffixFromTitle(data?.title) ||
      metadata?.metadata?.title ||
      data?.name ||
      metadata?.name ||
      data?.description ||
      metadata?.description ||
      fallbackKey,
  ).trim();

/**
 * Single-series charts: generic "value" column or API-filtered category slice.
 * Legend/tooltip use dataset title (language-aware), not the filter value or column name.
 *
 * @param {string[]} rawKeys
 * @param {string[]} categories
 * @param {Record<string, unknown>} data
 * @param {Record<string, unknown>} metadata
 */
const resolveSeriesKeysWithLabels = (rawKeys, categories, data, metadata) => {
  if (rawKeys.length !== 1) {
    return { seriesKeys: rawKeys, valueKey: null };
  }

  const rawKey = rawKeys[0];
  const isGenericValue = GENERIC_VALUE_KEYS.has(rawKey);
  const isFilteredSlice = data?.metadata?.filtered === true;

  if (!isGenericValue && !isFilteredSlice) {
    return { seriesKeys: rawKeys, valueKey: null };
  }

  const label = getSingleSeriesLabel(
    data,
    metadata,
    categories?.[0] ?? rawKey,
  );

  return { seriesKeys: [label], valueKey: rawKey };
};

/**
 * @param {{ data: Record<string, unknown>; metadata: Record<string, unknown> }} payload
 */
export function buildChartModelFromPayload({ data, metadata }) {
  const rows = Array.isArray(data?.data) ? data.data : [];
  const categories = Array.isArray(data?.categories) ? data.categories : [];
  const apiDimensions = Array.isArray(data?.dimensions) ? data.dimensions : [];
  const variables = metadata?.metadata?.variables ?? [];
  const filterCodes = getFilterDimensionCodes(variables);
  const dimensions = [...new Set([...apiDimensions, ...filterCodes])];

  const yearVariable = findYearMetadataVariable(variables);
  const yearIndexMap = buildYearIndexMap(yearVariable);

  const rawSeriesKeys = resolveRawSeriesKeys(rows, categories, dimensions);
  const { seriesKeys, valueKey } = resolveSeriesKeysWithLabels(
    rawSeriesKeys,
    categories,
    data,
    metadata,
  );

  const dataKeys = valueKey
    ? seriesKeys.map((label) => ({ label, sourceKey: valueKey }))
    : seriesKeys.map((key) => ({ label: key, sourceKey: key }));

  const byYear = new Map();
  for (const row of rows) {
    const year = getYearFromRow(row, yearIndexMap);
    if (year == null || Number.isNaN(year)) continue;
    byYear.set(year, row);
  }

  const chartData = Array.from(byYear.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, row]) => {
      const point = { year };
      for (const { label, sourceKey } of dataKeys) {
        const value = row[sourceKey];
        point[label] =
          value === null || value === undefined || value === ""
            ? null
            : Number(value);
      }
      return point;
    });

  const metaTitle = metadata?.metadata?.title;
  const title = data?.title || metaTitle || data?.name || metadata?.name || "";

  const variableLabels = variables.reduce(
    (acc, variable) => {
      if (variable?.code) acc[variable.code] = variable.text ?? variable.code;
      return acc;
    },
    /** @type {Record<string, string>} */ ({}),
  );

  const yearLabel =
    yearVariable?.text ??
    variableLabels.Years ??
    variableLabels.Year ??
    variableLabels.year ??
    "Year";

  const seriesExportLabels = valueKey
    ? seriesKeys.map(() => valueKey)
    : [...seriesKeys];

  return {
    title,
    unit: data?.unit ?? "",
    seriesKeys,
    seriesExportLabels,
    chartData,
    variableLabels,
    yearLabel,
  };
}
