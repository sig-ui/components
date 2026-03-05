// @ts-check

/**
 * Command / command module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiCommandRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCommandRoot extends SiguiElement {
  static observedAttributes = ["onselect"];
  static componentKey = "command-root";
}

export { SiguiCommandRoot as SiguiCommand };
