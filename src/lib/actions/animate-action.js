// @ts-check

/**
 * SigUI components runtime module for animate action.
 * @module
 */
/** @param {HTMLElement} element @param {{ name?: string; duration?: number }} [options] */
export function animateAction(element, options = {}) {
  const name = options.name || "sg-fade-in";
  const duration = options.duration ?? 200;
  element.style.animation = `${name} ${duration}ms ease`;
  return { destroy() { element.style.animation = ""; } };
}
