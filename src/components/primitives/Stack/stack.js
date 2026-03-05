// @ts-check

/**
 * Stack / stack module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiStack custom element class.
 * @extends {SiguiElement}
 */
export class SiguiStack extends SiguiElement {
  static observedAttributes = ["gap","relationship","direction","align","justify","wrap","density"];
  static componentKey = "stack";
}
