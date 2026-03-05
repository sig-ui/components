// @ts-check

/**
 * Switcher / switcher module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiSwitcher custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSwitcher extends SiguiElement {
  static observedAttributes = ["threshold","gap","align","limit"];
  static componentKey = "switcher";
}
