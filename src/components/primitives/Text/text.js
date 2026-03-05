// @ts-check

/**
 * Text / text module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiText custom element class.
 * @extends {SiguiElement}
 */
export class SiguiText extends SiguiElement {
  static observedAttributes = ["size","color","weight","align","as"];
  static componentKey = "text";
}
