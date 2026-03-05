// @ts-check

/**
 * SigUI components runtime module for focus scope.
 * @module
 */
/** @param {HTMLElement} element */
export function focusScope(element) {
  const onKeyDown = (event) => {
    if (event.key !== "Tab") return;
    const items = element.querySelectorAll('a[href],button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
    if (items.length === 0) return;
    const first = /** @type {HTMLElement} */ (items[0]);
    const last = /** @type {HTMLElement} */ (items[items.length - 1]);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  element.addEventListener("keydown", onKeyDown);
  return { destroy() { element.removeEventListener("keydown", onKeyDown); } };
}
