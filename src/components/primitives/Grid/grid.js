// @ts-check

/**
 * Grid / grid module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiGrid custom element class.
 * @extends {SiguiElement}
 */
export class SiguiGrid extends SiguiElement {
  static observedAttributes = ["columns","min-child-width","gap","rows","flow","align","justify","place-content","inline"];
  static componentKey = "grid";
}
