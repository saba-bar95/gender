import {
  buildDatasetDataUrl,
  buildDatasetMetadataUrl,
} from "../constants/genderStatistics";

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
 */
export function fetchDatasetData(datasetId, language) {
  return fetchJson(buildDatasetDataUrl(datasetId, language));
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
 */
export async function fetchDatasetChartPayload(datasetId, language) {
  const [data, metadata] = await Promise.all([
    fetchDatasetData(datasetId, language),
    fetchDatasetMetadata(datasetId, language),
  ]);
  return { data, metadata };
}
