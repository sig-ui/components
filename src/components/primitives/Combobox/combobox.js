// @ts-check

/**
 * Combobox / combobox module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiComboboxRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiComboboxRoot extends SiguiElement {
  static observedAttributes = ["label","value","placeholder","disabled","onchange"];
  static componentKey = "combobox-root";
}

export { SiguiComboboxRoot as SiguiCombobox };
