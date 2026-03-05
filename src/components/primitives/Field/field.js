// @ts-check

/**
 * Field / field module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiField custom element class.
 * @extends {SiguiElement}
 */
export class SiguiField extends SiguiElement {
  static observedAttributes = ["label","error","description","required","disabled","html-for"];
  static componentKey = "field";
}
