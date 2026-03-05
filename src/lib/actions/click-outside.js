// @ts-check

/**
 * SigUI components runtime module for click outside.
 * @module
 */
/** @param {HTMLElement} element @param {(event: MouseEvent) => void} callback */
export function clickOutside(element, callback) {
  const handler = (event) => {
    if (!element.contains(/** @type {Node} */ (event.target))) callback(event);
  };
  document.addEventListener("click", handler, true);
  return { destroy() { document.removeEventListener("click", handler, true); } };
}
