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

/** @param {string} datasetId */
export const buildDatasetDataUrl = (datasetId, language) => {
  const base = `${GENDER_STATISTICS_DATASET_API_BASE}/${datasetId}/data`;
  return language === "EN" ? `${base}?lang=en` : base;
};

/** @param {string} datasetId */
export const buildDatasetMetadataUrl = (datasetId, language) => {
  const base = `${GENDER_STATISTICS_DATASET_API_BASE}/${datasetId}/metadata`;
  return language === "EN" ? `${base}?lang=en` : base;
};
