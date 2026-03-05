// @ts-check

/**
 * SigUI components runtime module for swipe action.
 * @module
 */
/** @param {HTMLElement} element @param {{ threshold?: number; onSwipe?: (direction: "left"|"right"|"up"|"down") => void }} [options] */
export function swipe(element, options = {}) {
  const threshold = options.threshold ?? 24;
  let startX = 0;
  let startY = 0;
  const down = (event) => { startX = event.clientX; startY = event.clientY; };
  const up = (event) => {
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
    if (Math.abs(dx) > Math.abs(dy)) options.onSwipe?.(dx > 0 ? "right" : "left");
    else options.onSwipe?.(dy > 0 ? "down" : "up");
  };
  element.addEventListener("pointerdown", down);
  element.addEventListener("pointerup", up);
  return { destroy() { element.removeEventListener("pointerdown", down); element.removeEventListener("pointerup", up); } };
}
