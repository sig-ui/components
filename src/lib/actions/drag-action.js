// @ts-check

/**
 * SigUI components runtime module for drag action.
 * @module
 */
/** @param {HTMLElement} element @param {{ onDrag?: (dx: number, dy: number) => void }} [options] */
export function drag(element, options = {}) {
  let active = false;
  let lastX = 0;
  let lastY = 0;
  const down = (event) => { active = true; lastX = event.clientX; lastY = event.clientY; };
  const move = (event) => {
    if (!active) return;
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    options.onDrag?.(dx, dy);
  };
  const up = () => { active = false; };
  element.addEventListener("pointerdown", down);
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  return {
    destroy() {
      element.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    },
  };
}
