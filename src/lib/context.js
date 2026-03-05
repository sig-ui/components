// @ts-check

/**
 * SigUI components runtime module for context.
 * @module
 */
/**
 * Find nearest ancestor custom element.
 * @template {Element} T
 * @param {Element} element
 * @param {string} selector
 * @returns {T | null}
 */
export function findAncestor(element, selector) {
  return /** @type {T | null} */ (element.closest(selector));
}

/**
 * Get contextual value from nearest ancestor.
 * @template T
 * @param {Element} element
 * @param {string} selector
 * @param {(ancestor: Element) => T} reader
 * @returns {T | null}
 */
export function readContext(element, selector, reader) {
  const ancestor = element.closest(selector);
  return ancestor ? reader(ancestor) : null;
}
