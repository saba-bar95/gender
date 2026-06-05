import { GENDER_STATISTICS_CATEGORIES_URL } from "../constants/genderStatistics";

/**
 * @typedef {Object} GenderStatisticsSection
 * @property {string} id - API category id (e.g. gender-demography), used in routes
 * @property {string} ge - Georgian display name
 * @property {string} en - English display name
 * @property {string} descriptionGe
 * @property {string} descriptionEn
 */

/**
 * @param {unknown} item
 * @returns {GenderStatisticsSection}
 */
const normalizeItem = (item) => ({
  id: item.id,
  ge: item.georgianName,
  en: item.englishName,
  descriptionGe: item.georgianDescription ?? item.description ?? "",
  descriptionEn: item.englishDescription ?? item.description ?? "",
});

/**
 * Fetches gender statistics navigation categories (order matches API `items`).
 * Each item includes both Georgian and English names.
 * @returns {Promise<GenderStatisticsSection[]>}
 */
export async function fetchGenderStatisticsSections() {
  const response = await fetch(GENDER_STATISTICS_CATEGORIES_URL);

  if (!response.ok) {
    throw new Error(`Categories request failed (${response.status})`);
  }

  const json = await response.json();

  if (!json.success || !Array.isArray(json.data?.items)) {
    throw new Error(json.message || "Invalid categories response");
  }

  return json.data.items.map(normalizeItem);
}
