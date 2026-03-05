// @ts-check

/**
 * Drawer / drawer module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiDrawerRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiDrawerRoot extends SiguiElement {
  static observedAttributes = ["open"];
  static componentKey = "drawer-root";
}

export { SiguiDrawerRoot as SiguiDrawer };
