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

/**
 * @param {string} sectionId e.g. gender-health
 * @param {string} groupName API group label (GE or EN)
 * @returns {{ url: string, stem: string } | null}
 */
export function getGroupChartImage(sectionId, groupName) {
  const section = sectionId.replace(/^gender-/, "");
  const images = imagesBySection[section];
  if (!images?.length || !groupName) return null;

  const normGroup = normalizeKey(groupName);
  if (!normGroup) return null;

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
