// @ts-check

/**
 * Spacer / spacer module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiSpacer custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSpacer extends SiguiElement {
  static observedAttributes = ["size"];
  static componentKey = "spacer";
}
