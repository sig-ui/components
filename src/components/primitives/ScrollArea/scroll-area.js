// @ts-check

/**
 * ScrollArea / scroll-area module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiScrollAreaRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiScrollAreaRoot extends SiguiElement {
  static observedAttributes = ["type"];
  static componentKey = "scroll-area-root";
}

export { SiguiScrollAreaRoot as SiguiScrollArea };
