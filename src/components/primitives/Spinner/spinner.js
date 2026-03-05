// @ts-check

/**
 * Spinner / spinner module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiSpinner custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSpinner extends SiguiElement {
  static observedAttributes = ["size","label"];
  static componentKey = "spinner";
}
