// @ts-check

/**
 * Select / select module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiSelectRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSelectRoot extends SiguiElement {
  static observedAttributes = ["label","value","placeholder","disabled","onchange"];
  static componentKey = "select-root";
}

export { SiguiSelectRoot as SiguiSelect };
