// @ts-check

/**
 * GradientPattern / gradient-pattern module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiGradientPattern custom element class.
 * @extends {SiguiElement}
 */
export class SiguiGradientPattern extends SiguiElement {
  static observedAttributes = ["preset","colors","intensity","animated","overlay","speed","progress"];
  static componentKey = "gradient-pattern";
}
