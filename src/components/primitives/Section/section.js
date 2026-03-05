// @ts-check

/**
 * Section / section module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiSection custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSection extends SiguiElement {
  static observedAttributes = ["title","description","level","gap"];
  static componentKey = "section";
}
