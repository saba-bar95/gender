/**
 * @param {string} value
 */
export function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {string} text
 * @returns {{ firstWord: string; rest: string }}
 */
export function splitGlossaryEntry(text) {
  const separatorMatch = text.match(/\s([–—-])\s|:\s/);
  const sepIdx = separatorMatch ? text.indexOf(separatorMatch[0]) : -1;

  let beforeSeparator;
  let afterSeparator;

  if (sepIdx >= 0) {
    beforeSeparator = text.slice(0, sepIdx).trim();
    afterSeparator = text.slice(sepIdx);
  } else {
    beforeSeparator = text.trim();
    afterSeparator = "";
  }

  const firstSpace = beforeSeparator.indexOf(" ");
  const firstWord =
    firstSpace === -1 ? beforeSeparator : beforeSeparator.slice(0, firstSpace);
  const restBeforeSeparator =
    firstSpace === -1 ? "" : beforeSeparator.slice(firstSpace);

  return {
    firstWord,
    rest: `${restBeforeSeparator}${afterSeparator}`,
  };
}

/**
 * @param {string} text
 */
export function glossaryEntryHtml(text) {
  const { firstWord, rest } = splitGlossaryEntry(text);
  return `<strong>${escapeHtml(firstWord)}</strong>${escapeHtml(rest)}`;
}
