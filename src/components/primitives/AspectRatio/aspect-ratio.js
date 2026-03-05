// @ts-check

/**
 * AspectRatio / aspect-ratio module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiAspectRatio custom element class.
 * @extends {SiguiElement}
 */
export class SiguiAspectRatio extends SiguiElement {
  static observedAttributes = ["ratio"];
  static componentKey = "aspect-ratio";
}
