// @ts-check

/**
 * SigUI components runtime module for use reduced motion.
 * @module
 */
const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Subscribe to reduced-motion changes.
 * @param {(reduced: boolean) => void} callback
 * @returns {() => void}
 */
export function useReducedMotion(callback) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    callback(false);
    return () => {};
  }

  const mql = window.matchMedia(QUERY);
  const handler = () => callback(mql.matches);
  handler();
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}
