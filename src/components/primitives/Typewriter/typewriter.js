// @ts-check

/**
 * Typewriter / typewriter module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiTypewriter custom element class.
 * @extends {SiguiElement}
 */
export class SiguiTypewriter extends SiguiElement {
  static observedAttributes = ["text","speed","delay","cursor","loop","pause-between","paused"];
  static componentKey = "typewriter";
}
