export const GENDER_STATISTICS_CATEGORY = "gender-statistics";

export const GENDER_STATISTICS_API_BASE =
  "https://pcaxis-api.geostat.ge/api/navigation/categories";

export const GENDER_STATISTICS_CATEGORIES_URL = `${GENDER_STATISTICS_API_BASE}?gender-statistics`;

/** App language code → API lang query value */
export const apiLangFromAppLanguage = (language) =>
  language === "EN" ? "en" : "ka";

/** @param {string} subcategoryId e.g. gender-demography */
export const buildGenderStatisticsDatasetsUrl = (subcategoryId, language) => {
  const params = new URLSearchParams();
  params.set(GENDER_STATISTICS_CATEGORY, subcategoryId);
  if (language === "EN") {
    params.set("lang", "en");
  }
  return `${GENDER_STATISTICS_API_BASE}?${params.toString()}`;
};

export const GENDER_STATISTICS_DATASET_API_BASE =
  "https://pcaxis-api.geostat.ge/api/datasets";

/**
 * @param {string} datasetId
 * @param {string} language
 * @param {string} [filterQuery] - Pre-encoded filter query (no leading ? or &)
 */
export const buildDatasetDataUrl = (datasetId, language, filterQuery = "") => {
  const parts = [filterQuery].filter(Boolean);
  if (language === "EN") {
    parts.push("lang=en");
  }
  const query = parts.join("&");
  const base = `${GENDER_STATISTICS_DATASET_API_BASE}/${datasetId}/data`;
  return query ? `${base}?${query}` : base;
};

/** @param {string} datasetId */
export const buildDatasetMetadataUrl = (datasetId, language) => {
  const base = `${GENDER_STATISTICS_DATASET_API_BASE}/${datasetId}/metadata`;
  return language === "EN" ? `${base}?lang=en` : base;
};
