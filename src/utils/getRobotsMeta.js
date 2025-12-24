/**
 * Returns the correct robots meta value based on country and lang.
 * @param {string} country
 * @param {string} lang
 * @returns {"index, follow" | "noindex, nofollow"}
 */
export default function getRobotsMeta(country, lang) {
  const c = (country || '').toLowerCase();
  const l = (lang || '').toLowerCase();

  // Rule 1: Arabic & English
  if (l === 'ar' || l === 'en') {
    return "index, follow";
  }

  // Rule 2: Russian & Chinese
  if (l === 'ru' || l === 'ch') {
    return c === 'global' ? "index, follow" : "noindex, nofollow";
  }

  // Rule 3: All other languages (es, fr, etc.)
  return "index, follow";
}
