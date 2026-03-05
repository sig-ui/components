// @ts-check

/**
 * ButtonGroup / button-group module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiButtonGroup custom element class.
 * @extends {SiguiElement}
 */
export class SiguiButtonGroup extends SiguiElement {
  static observedAttributes = ["size","color","orientation"];
  static componentKey = "button-group";
}
