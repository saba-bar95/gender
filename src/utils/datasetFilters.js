/**
 * @typedef {Object} DatasetFilterVariable
 * @property {string} code - API query param name (e.g. "material status", "Gender", "age")
 * @property {string} text - Label for the select
 * @property {string[]} valueTexts - Option labels sent to the API
 */

const YEAR_PATTERN = /^(years?|წელი)$/i;
const GENDER_PATTERN = /^(gender|sex|სქესი)$/i;

/** Year/time dimensions map to the chart x-axis, not filter dropdowns. */
export const isYearVariable = (variable) => {
  if (variable?.time) return true;
  const code = String(variable?.code ?? "").trim();
  const text = String(variable?.text ?? "").trim();
  return YEAR_PATTERN.test(code) || YEAR_PATTERN.test(text);
};

/** Gender/sex breakdowns are chart series (lines), not sidebar filters. */
export const isGenderVariable = (variable) => {
  const code = String(variable?.code ?? "").trim();
  const text = String(variable?.text ?? "").trim();
  return GENDER_PATTERN.test(code) || GENDER_PATTERN.test(text);
};

/**
 * Normalizes metadata.variables entries into filter selects.
 * @param {unknown[]} variables
 * @returns {DatasetFilterVariable[]}
 */
export function getChartFilterVariables(variables) {
  if (!Array.isArray(variables)) return [];

  return variables
    .filter((v) => v && !isYearVariable(v) && !isGenderVariable(v))
    .map((v) => ({
      code: String(v.code ?? "").trim(),
      text: String(v.text ?? v.code ?? "").trim(),
      valueTexts: Array.isArray(v.valueTexts)
        ? v.valueTexts.map(String)
        : Array.isArray(v.values)
          ? v.values.map(String)
          : [],
    }))
    .filter((v) => v.code && v.valueTexts.length > 0);
}

/**
 * Dimension codes applied as query filters (excluded from chart series columns).
 * @param {unknown[]} variables
 * @returns {string[]}
 */
export function getFilterDimensionCodes(variables) {
  return getChartFilterVariables(variables).map((v) => v.code);
}

/**
 * @param {DatasetFilterVariable[]} filterVariables
 * @returns {Record<string, string>}
 */
export function getDefaultFilterSelections(filterVariables) {
  return Object.fromEntries(
    filterVariables.map((v) => [v.code, v.valueTexts[0] ?? ""]),
  );
}

/**
 * Builds query string for /data?Maritial%20status=...&Gender=...
 * Params are appended in metadata variable order.
 *
 * Uses encodeURIComponent (spaces as %20). URLSearchParams.toString() emits +
 * for spaces, which breaks filtering for some Geostat datasets when values
 * contain multiple words.
 *
 * @param {DatasetFilterVariable[]} filterVariables
 * @param {Record<string, string>} selections
 * @returns {string} e.g. "Maritial%20status=...&Gender=..."
 */
export function buildDatasetFilterQueryString(filterVariables, selections) {
  const parts = [];

  for (const variable of filterVariables) {
    const value = selections[variable.code];
    if (value != null && value !== "") {
      parts.push(
        `${encodeURIComponent(variable.code)}=${encodeURIComponent(value)}`,
      );
    }
  }

  return parts.join("&");
}
