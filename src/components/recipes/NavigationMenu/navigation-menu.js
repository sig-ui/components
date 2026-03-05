// @ts-check

/**
 * NavigationMenu / navigation-menu module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiNavigationMenuRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiNavigationMenuRoot extends SiguiElement {
  static observedAttributes = [];
  static componentKey = "navigation-menu-root";
}

export { SiguiNavigationMenuRoot as SiguiNavigationMenu };
