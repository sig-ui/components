// @ts-check

/**
 * Resolve locale preference with browser-aware fallbacks.
 * @param {string | null | undefined} [preferredLocale]
 */
export function getResolvedLocale(preferredLocale) {
  const preferred = preferredLocale?.trim();
  if (preferred) return preferred;

  if (typeof document !== "undefined") {
    const htmlLang = document.documentElement?.lang?.trim();
    if (htmlLang) return htmlLang;
  }

  if (typeof navigator !== "undefined") {
    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      const first = navigator.languages[0]?.trim();
      if (first) return first;
    }
    const single = navigator.language?.trim();
    if (single) return single;
  }

  return "en-US";
}
