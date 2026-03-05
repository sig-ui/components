// @ts-check

/**
 * Heading / heading module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiHeading custom element class.
 * @extends {SiguiElement}
 */
export class SiguiHeading extends SiguiElement {
  static observedAttributes = ["level","size","color","align"];
  static componentKey = "heading";
}
