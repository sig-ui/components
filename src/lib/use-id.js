// @ts-check

/**
 * SigUI components runtime module for use id.
 * @module
 */
let idCounter = 0;

/**
 * Generate stable-ish element IDs for component instances.
 * @param {string} [prefix]
 * @returns {string}
 */
export function useId(prefix = "sg") {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}
