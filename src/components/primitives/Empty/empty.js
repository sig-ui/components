// @ts-check

/**
 * Empty / empty module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiEmpty custom element class.
 * @extends {SiguiElement}
 */
export class SiguiEmpty extends SiguiElement {
  static observedAttributes = ["title","description"];
  static componentKey = "empty";
}
