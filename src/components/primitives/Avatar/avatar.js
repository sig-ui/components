// @ts-check

/**
 * Avatar / avatar module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiAvatar custom element class.
 * @extends {SiguiElement}
 */
export class SiguiAvatar extends SiguiElement {
  static observedAttributes = ["src","alt","fallback","size"];
  static componentKey = "avatar";
}
