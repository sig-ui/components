// @ts-check

/**
 * SigUI components runtime module for keyboard navigation.
 * @module
 */
/**
 * Arrow-key roving focus for a list of focusable nodes.
 * @param {HTMLElement} root
 * @param {string} itemSelector
 * @returns {() => void}
 */
export function enableKeyboardNavigation(root, itemSelector = "[role='menuitem'],button,[tabindex]") {
  function getItems() {
    return Array.from(root.querySelectorAll(itemSelector)).filter(
      (el) => el instanceof HTMLElement && !el.hasAttribute("disabled"),
    );
  }

  function onKeyDown(event) {
    if (!(event.key === "ArrowDown" || event.key === "ArrowUp")) return;
    const items = getItems();
    if (items.length === 0) return;
    const active = document.activeElement;
    const current = items.findIndex((el) => el === active);
    const next =
      event.key === "ArrowDown"
        ? (current + 1 + items.length) % items.length
        : (current - 1 + items.length) % items.length;
    const target = items[next];
    if (target instanceof HTMLElement) {
      event.preventDefault();
      target.focus();
    }
  }

  root.addEventListener("keydown", onKeyDown);
  return () => root.removeEventListener("keydown", onKeyDown);
}
