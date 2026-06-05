import {
  buildDatasetDataUrl,
  buildDatasetMetadataUrl,
} from "../constants/genderStatistics";
import { buildDatasetFilterQueryString } from "../utils/datasetFilters";

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  const json = await response.json();
  if (!json.success || !json.data) {
    throw new Error(json.message || "Invalid API response");
  }
  return json.data;
}

/**
 * @param {string} datasetId
 * @param {string} language - App language: "GE" | "EN"
 * @param {import("../utils/datasetFilters").DatasetFilterVariable[]} [filterVariables]
 * @param {Record<string, string>} [selections]
 */
export function fetchDatasetData(
  datasetId,
  language,
  filterVariables = [],
  selections = {},
) {
  const filterQuery = buildDatasetFilterQueryString(
    filterVariables,
    selections,
  );
  return fetchJson(buildDatasetDataUrl(datasetId, language, filterQuery));
}

/**
 * @param {string} datasetId
 * @param {string} language - App language: "GE" | "EN"
 */
export function fetchDatasetMetadata(datasetId, language) {
  return fetchJson(buildDatasetMetadataUrl(datasetId, language));
}

/**
 * @param {string} datasetId
 * @param {string} language
 * @param {import("../utils/datasetFilters").DatasetFilterVariable[]} [filterVariables]
 * @param {Record<string, string>} [selections]
 */
export async function fetchDatasetChartPayload(
  datasetId,
  language,
  filterVariables = [],
  selections = {},
) {
  const [data, metadata] = await Promise.all([
    fetchDatasetData(datasetId, language, filterVariables, selections),
    fetchDatasetMetadata(datasetId, language),
  ]);
  return { data, metadata };
}
