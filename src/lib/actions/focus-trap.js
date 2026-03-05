// @ts-check

/**
 * SigUI components runtime module for focus trap.
 * @module
 */
/** @param {HTMLElement} element */
export function focusTrap(element) {
  const previous = /** @type {HTMLElement | null} */ (document.activeElement);
  if (typeof element.focus === "function") element.focus();
  return {
    destroy() {
      if (previous && typeof previous.focus === "function") previous.focus();
    },
  };
}
