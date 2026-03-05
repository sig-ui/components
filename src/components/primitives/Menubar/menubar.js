// @ts-check

/**
 * Menubar / menubar module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiMenubarRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiMenubarRoot extends SiguiElement {
  static observedAttributes = [];
  static componentKey = "menubar-root";
}

export { SiguiMenubarRoot as SiguiMenubar };
