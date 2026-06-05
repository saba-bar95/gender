/** @type {Record<string, string>} */
const groupImageModules = import.meta.glob(
  "../assets/charts/*/*.png",
  { eager: true, import: "default" },
);

/** @type {Record<string, { stem: string, url: string, normalized: string }[]>} */
const imagesBySection = {};

for (const [path, url] of Object.entries(groupImageModules)) {
  const match = path.match(/\/charts\/([^/]+)\/(.+)\.png$/i);
  if (!match) continue;
  const [, section, stem] = match;
  if (!imagesBySection[section]) imagesBySection[section] = [];
  imagesBySection[section].push({
    stem,
    url,
    normalized: normalizeKey(stem),
  });
}

/**
 * @param {string} value
 */
function normalizeKey(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9\u10a0-\u10ff]+/gi, "");
}

/**
 * Keywords (EN/GE fragments) mapped to image file stems per section.
 * @type {Record<string, Record<string, string[]>>}
 */
const STEM_KEYWORDS = {
  health: {
    diseases: ["disease", "diseases", "დაავად"],
    medicalStaff: ["medical", "staff", "პერსონალი", "სამედიცინო", "ექიმ"],
    other: ["other", "სხვა"],
  },
  demography: {
    birth: ["birth", "დაბად"],
    death: ["death", "გარდაცვალ", "სიკვდილ"],
    marriage: ["marriage", "ქორწინ"],
    divorce: ["divorce", "განქორწ"],
    migration: ["migrat", "მიგრ"],
    population: ["populat", "მოსახლ"],
  },
  education: {
    genderalIndicators: ["indicator", "ინდიკატორ", "general"],
    genderalEducation: ["general", "ზოგად", "education", "განათლ"],
    highEducation: ["high", "უმაღ", "tertiary", "უმაღლ"],
  },
  crime: {
    domesticViolence: ["domestic", "ვიოლენც", "ძალად"],
    trafficking: ["traffick", "ტრეფიკ"],
    courtStatistics: ["court", "სასამართ", "საკონ"],
  },
  power: {
    government: ["government", "მთავრობ"],
    parliament: ["parliament", "პარლამენტ"],
    "localSelf-governance": [
      "local",
      "self",
      "governance",
      "თვითმმართ",
      "მუნიციპალ",
    ],
    "president'sOffice": ["president", "პრეზიდენტ", "ადმინისტრ"],
    other: ["other", "სხვა"],
  },
  business: { business: ["business", "ბიზნეს"] },
  agriculture: { agriculture: ["agricult", "სოფლის", "მეურნ"] },
  ict: { ict: ["ict", "ინფორმ", "ტექნოლ"] },
  income: { income: ["income", "შემოსავ"] },
  employment: { employment: ["employ", "დასაქმ", "სამუშაო"] },
  households: { households: ["household", "households", "საყოფ", "ოჯახ"] },
  "social-protection": {
    socialProtection: ["social", "protection", "სოციალ", "დაცვ"],
  },
  sport: { sportStatistics: ["sport", "სპორტ"] },
};

/** First two charts in the higher-education group use education1-2.png. */
const EDUCATION_HIGH_EDUCATION_CHARTS_1_2 = new Set([
  "gender-education-higher-students-2011-2014",
  "gender-education-higher-students",
]);

const HIGH_EDUCATION_GROUP_KEYWORDS = ["high", "უმაღ", "tertiary", "უმაღლ"];

/** Employment charts 1–3, chart 4, and the rest use separate images. */
const EMPLOYMENT_CHARTS_1_3 = new Set([
  "gender-employment-lf-by-sex",
  "gender-employment-lf-urban-rural",
  "gender-employment-lf-by-age",
]);

const EMPLOYMENT_CHART_4 = "gender-employment-employed-unemployed-age";

/**
 * @param {string} datasetId
 */
function employmentImageStem(datasetId) {
  if (EMPLOYMENT_CHARTS_1_3.has(datasetId)) return "employment1-3";
  if (datasetId === EMPLOYMENT_CHART_4) return "employment4";
  return "employment";
}

/** First two ICT charts use ict1-2.png. */
const ICT_CHARTS_1_2 = new Set([
  "gender-ict-computer-internet",
  "gender-ict-households-access",
]);

/**
 * @param {string} datasetId
 */
function ictImageStem(datasetId) {
  return ICT_CHARTS_1_2.has(datasetId) ? "ict1-2" : "ict";
}

const AGRICULTURE_CHART_1 = "gender-agriculture-production-volume";

/**
 * @param {string} datasetId
 */
function agricultureImageStem(datasetId) {
  return datasetId === AGRICULTURE_CHART_1 ? "agriculture1" : "agriculture";
}

const CRIME_OTHER_GROUP_KEYWORDS = ["other", "სხვა"];

/** Crime “other” subcategory charts map to numbered images. */
const CRIME_OTHER_CHARTS_2_3 = new Set([
  "gender-crime-victim-statistics",
  "gender-crime-road-accidents",
]);

const CRIME_OTHER_CHARTS_7_8 = new Set([
  "gender-crime-prison-population",
  "gender-crime-driving-licenses",
]);

/**
 * @param {string} datasetId
 * @returns {string | null}
 */
function crimeOtherImageStem(datasetId) {
  if (datasetId === "gender-crime-trafficking-shelters") return "other1";
  if (CRIME_OTHER_CHARTS_2_3.has(datasetId)) return "other2-3";
  if (datasetId === "gender-crime-road-accidents-2010-2014") return "other4";
  if (datasetId === "gender-crime-registered-vehicles") return "other5";
  if (datasetId === "gender-crime-police-officers") return "other6";
  if (CRIME_OTHER_CHARTS_7_8.has(datasetId)) return "other7-8";
  return null;
}

/**
 * @param {string} sectionId e.g. gender-health
 * @param {string} groupName API group label (GE or EN)
 * @param {string} [datasetId]
 * @returns {{ url: string, stem: string } | null}
 */
export function getGroupChartImage(sectionId, groupName, datasetId = "") {
  const section = sectionId.replace(/^gender-/, "");
  const images = imagesBySection[section];
  if (!images?.length) return null;

  if (section === "employment" && datasetId) {
    const image = images.find(
      (item) => item.stem === employmentImageStem(datasetId),
    );
    if (image) return { url: image.url, stem: image.stem };
  }

  if (section === "ict" && datasetId) {
    const image = images.find((item) => item.stem === ictImageStem(datasetId));
    if (image) return { url: image.url, stem: image.stem };
  }

  if (section === "agriculture" && datasetId) {
    const image = images.find(
      (item) => item.stem === agricultureImageStem(datasetId),
    );
    if (image) return { url: image.url, stem: image.stem };
  }

  if (!groupName || !normalizeKey(groupName)) {
    if (images.length === 1) {
      return { url: images[0].url, stem: images[0].stem };
    }
    return null;
  }

  const normGroup = normalizeKey(groupName);

  if (section === "crime" && datasetId) {
    const isOtherGroup = CRIME_OTHER_GROUP_KEYWORDS.some((kw) =>
      normGroup.includes(normalizeKey(kw)),
    );
    if (isOtherGroup) {
      const stem = crimeOtherImageStem(datasetId);
      if (stem) {
        const image = images.find((item) => item.stem === stem);
        if (image) return { url: image.url, stem: image.stem };
      }
    }
  }

  if (section === "education") {
    const isHighEducationGroup = HIGH_EDUCATION_GROUP_KEYWORDS.some((kw) =>
      normGroup.includes(normalizeKey(kw)),
    );
    if (isHighEducationGroup) {
      const stem = datasetId && EDUCATION_HIGH_EDUCATION_CHARTS_1_2.has(datasetId)
        ? "education1-2"
        : "highEducation";
      const image = images.find((item) => item.stem === stem);
      if (image) return { url: image.url, stem: image.stem };
    }
  }

  const keywords = STEM_KEYWORDS[section] ?? {};

  for (const image of images) {
    const stems = keywords[image.stem];
    if (stems?.some((kw) => normGroup.includes(normalizeKey(kw)))) {
      return { url: image.url, stem: image.stem };
    }
  }

  for (const image of images) {
    if (
      normGroup.includes(image.normalized) ||
      image.normalized.includes(normGroup)
    ) {
      return { url: image.url, stem: image.stem };
    }
  }

  if (images.length === 1) {
    return { url: images[0].url, stem: images[0].stem };
  }

  return null;
}
