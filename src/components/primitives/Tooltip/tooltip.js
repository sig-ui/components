// @ts-check

/**
 * Tooltip / tooltip module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiTooltipRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiTooltipRoot extends SiguiElement {
  static observedAttributes = ["content","delay"];
  static componentKey = "tooltip-root";
}

export { SiguiTooltipRoot as SiguiTooltip };
