// @ts-check

/**
 * Dock / dock module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiDockRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiDockRoot extends SiguiElement {
  static observedAttributes = ["magnification","icon-size"];
  static componentKey = "dock-root";
}

export { SiguiDockRoot as SiguiDock };
