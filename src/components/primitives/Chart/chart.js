// @ts-check

/**
 * Chart / chart module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiChart custom element class.
 * @extends {SiguiElement}
 */
export class SiguiChart extends SiguiElement {
  static observedAttributes = ["type","data","width","height","color","show-grid","show-labels","label"];
  static componentKey = "chart";
}
