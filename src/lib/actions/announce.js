// @ts-check

/**
 * SigUI components runtime module for announce.
 * @module
 */
/** @param {HTMLElement} element @param {string} message */
export function announce(element, message) {
  element.setAttribute("aria-live", element.getAttribute("aria-live") || "polite");
  element.textContent = message;
  return { destroy() {} };
}
