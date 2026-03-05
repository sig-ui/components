// @ts-check

/**
 * Sheet / sheet module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiSheetRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSheetRoot extends SiguiElement {
  static observedAttributes = ["open","side","onclose"];
  static componentKey = "sheet-root";
}

export { SiguiSheetRoot as SiguiSheet };
