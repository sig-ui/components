// @ts-check

/**
 * SigUI components runtime module for portal.
 * @module
 */
/** @param {HTMLElement} element @param {HTMLElement | string} [target=document.body] */
export function portal(element, target = document.body) {
  const host = typeof target === "string" ? document.querySelector(target) : target;
  const parent = element.parentElement;
  if (host && host !== element.parentElement) host.appendChild(element);
  return { destroy() { if (parent && element.parentElement !== parent) parent.appendChild(element); } };
}
