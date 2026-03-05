// @ts-check

/**
 * SigUI components runtime module for in view action.
 * @module
 */
/** @param {HTMLElement} element @param {{ onEnter?: () => void; onLeave?: () => void }} [options] */
export function inView(element, options = {}) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) options.onEnter?.();
      else options.onLeave?.();
    }
  });
  observer.observe(element);
  return { destroy() { observer.disconnect(); } };
}
