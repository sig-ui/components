// @ts-check

/**
 * Popover / popover module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiPopoverRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiPopoverRoot extends SiguiElement {
  static observedAttributes = ["open","onclose"];
  static componentKey = "popover-root";
}

export { SiguiPopoverRoot as SiguiPopover };
