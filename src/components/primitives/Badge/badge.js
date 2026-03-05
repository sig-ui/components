// @ts-check

/**
 * Badge / badge module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiBadge custom element class.
 * @extends {SiguiElement}
 */
export class SiguiBadge extends SiguiElement {
  static observedAttributes = ["color","size","icon","href","target","rel"];
  static componentKey = "badge";
}
