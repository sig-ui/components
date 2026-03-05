// @ts-check

/**
 * Resizable / resizable module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiResizableRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiResizableRoot extends SiguiElement {
  static observedAttributes = ["direction","onresize"];
  static componentKey = "resizable-root";
}

export { SiguiResizableRoot as SiguiResizable };
