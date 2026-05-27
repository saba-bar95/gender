import { buildGenderStatisticsDatasetsUrl } from "../constants/genderStatistics";

/**
 * @typedef {Object} GenderStatisticsDataset
 * @property {string} id
 * @property {string} name
 * @property {string} englishName
 * @property {string} group
 * @property {string} unit
 * @property {string} pxwebUrl
 * @property {string} apiUrl
 */

/**
 * @typedef {Object} GenderStatisticsDatasetsResult
 * @property {string} subcategoryName
 * @property {GenderStatisticsDataset[]} datasets
 * @property {Record<string, GenderStatisticsDataset[]>} byGroup
 */

/**
 * @param {unknown} dataset
 * @returns {GenderStatisticsDataset}
 */
const normalizeDataset = (dataset) => ({
  id: dataset.id,
  name: dataset.name,
  englishName: dataset.englishName ?? dataset.name,
  group: dataset.group ?? "",
  unit: dataset.unit ?? "",
  pxwebUrl: dataset.pxwebUrl ?? "",
  apiUrl: dataset.apiUrl ?? "",
});

/**
 * @param {string} subcategoryId
 * @param {string} language - App language: "GE" | "EN"
 * @returns {Promise<GenderStatisticsDatasetsResult>}
 */
export async function fetchGenderStatisticsDatasets(subcategoryId, language) {
  const response = await fetch(
    buildGenderStatisticsDatasetsUrl(subcategoryId, language),
  );

  if (!response.ok) {
    throw new Error(`Datasets request failed (${response.status})`);
  }

  const json = await response.json();

  if (!json.success || !Array.isArray(json.data?.datasets)) {
    throw new Error(json.message || "Invalid datasets response");
  }

  const datasets = json.data.datasets.map(normalizeDataset);
  const byGroup = json.data.byGroup
    ? Object.fromEntries(
        Object.entries(json.data.byGroup).map(([group, items]) => [
          group,
          items.map(normalizeDataset),
        ]),
      )
    : datasets.reduce((acc, dataset) => {
        const key = dataset.group || "—";
        if (!acc[key]) acc[key] = [];
        acc[key].push(dataset);
        return acc;
      }, /** @type {Record<string, GenderStatisticsDataset[]>} */ ({}));

  return {
    subcategoryName: json.data.subcategoryName ?? "",
    datasets,
    byGroup,
  };
}
