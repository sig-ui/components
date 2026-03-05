// @ts-check

/**
 * Container / container module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiContainer custom element class.
 * @extends {SiguiElement}
 */
export class SiguiContainer extends SiguiElement {
  static observedAttributes = ["size","padding"];
  static componentKey = "container";
}
