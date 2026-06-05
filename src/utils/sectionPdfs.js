/**
 * PDF folders under assets/pdf. Each maps to a statistics section id
 * (e.g. gender-demography → demography/).
 *
 * GE: *.pdf without " (1)" suffix
 * EN: *.pdf with " (1)" suffix before .pdf
 */
export const SECTION_PDF_SLUGS = [
  "demography", // gender-demography — population.pdf / population (1).pdf
  "health", // health.pdf / health (1).pdf
  "education", // education.pdf / education (1).pdf
  "social-protection", // soc.pdf / soc (1).pdf
  "households", // households.pdf / households (1).pdf
  "employment", // employment.pdf / employment (1).pdf
  "income", // incomes.pdf / incomes (1).pdf
  "ict", // ICT.pdf / ICT (1).pdf
  "business", // business.pdf / business (1).pdf
  "agriculture", // agri.pdf / agri (1).pdf
  "crime", // crime.pdf / crime (1).pdf
  "power", // government.pdf / government (1).pdf
  "sport", // sport.pdf / sport (1).pdf
];

const sectionPdfModules = import.meta.glob("../assets/pdf/*/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
});

/** @type {Record<string, { url: string; basename: string }[]>} */
const pdfsBySection = {};

for (const [path, url] of Object.entries(sectionPdfModules)) {
  const match = path.match(/\/pdf\/([^/]+)\/([^/]+)\.pdf$/i);
  if (!match) continue;
  const [, slug, basename] = match;
  if (!pdfsBySection[slug]) pdfsBySection[slug] = [];
  pdfsBySection[slug].push({ url, basename });
}

for (const items of Object.values(pdfsBySection)) {
  items.sort((a, b) =>
    a.basename.localeCompare(b.basename, undefined, { numeric: true }),
  );
}

/**
 * English PDFs use a filename ending with " (1)" before .pdf
 * e.g. population (1).pdf — Georgian uses the matching file without that suffix.
 * @param {string} basename
 */
function isEnglishPdfBasename(basename) {
  return basename.endsWith(" (1)");
}

/**
 * @param {string} sectionId e.g. gender-employment
 * @param {string} [language] App language: "GE" | "EN"
 * @returns {boolean}
 */
export function hasSectionPdfs(sectionId, language = "GE") {
  return getSectionPdfUrls(sectionId, language).length > 0;
}

/**
 * @param {string} sectionId e.g. gender-employment
 * @param {string} [language] App language: "GE" | "EN"
 * @returns {string[]}
 */
export function getSectionPdfUrls(sectionId, language = "GE") {
  const slug = sectionId.replace(/^gender-/, "");
  const items = pdfsBySection[slug] ?? [];
  const useEnglish = language === "EN";

  return items
    .filter((item) =>
      useEnglish
        ? isEnglishPdfBasename(item.basename)
        : !isEnglishPdfBasename(item.basename),
    )
    .map((item) => item.url);
}

/**
 * Opens language-appropriate PDFs for a statistics section in new tabs.
 * @param {string} sectionId
 * @param {string} [language]
 */
export function openSectionPdfs(sectionId, language = "GE") {
  const urls = getSectionPdfUrls(sectionId, language);
  const url = urls[0];
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
