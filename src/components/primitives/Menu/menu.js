// @ts-check

/**
 * Menu / menu module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiMenuRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiMenuRoot extends SiguiElement {
  static observedAttributes = ["open","onclose"];
  static componentKey = "menu-root";
}

export { SiguiMenuRoot as SiguiMenu };
