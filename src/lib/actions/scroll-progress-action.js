// @ts-check

/**
 * SigUI components runtime module for scroll progress action.
 * @module
 */
/** @param {HTMLElement} element @param {{ onProgress?: (progress: number) => void }} [options] */
export function scrollProgress(element, options = {}) {
  const onScroll = () => {
    const max = Math.max(1, element.scrollHeight - element.clientHeight);
    const value = Math.min(1, Math.max(0, element.scrollTop / max));
    options.onProgress?.(value);
  };
  element.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return { destroy() { element.removeEventListener("scroll", onScroll); } };
}
