// @ts-check

/**
 * InputGroup / input-group module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiInputGroup custom element class.
 * @extends {SiguiElement}
 */
export class SiguiInputGroup extends SiguiElement {
  static observedAttributes = ["size","disabled"];
  static componentKey = "input-group";
}
