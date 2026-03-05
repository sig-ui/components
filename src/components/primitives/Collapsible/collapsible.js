// @ts-check

/**
 * Collapsible / collapsible module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiCollapsibleRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCollapsibleRoot extends SiguiElement {
  static observedAttributes = ["open","disabled","onchange"];
  static componentKey = "collapsible-root";
}

export { SiguiCollapsibleRoot as SiguiCollapsible };
