// @ts-check

/**
 * HoverCard / hover-card module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiHoverCardRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiHoverCardRoot extends SiguiElement {
  static observedAttributes = ["open","open-delay","close-delay","onclose"];
  static componentKey = "hover-card-root";
}

export { SiguiHoverCardRoot as SiguiHoverCard };
