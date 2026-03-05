// @ts-check

/**
 * ContextMenu / context-menu module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiContextMenuRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiContextMenuRoot extends SiguiElement {
  static observedAttributes = ["open","onclose"];
  static componentKey = "context-menu-root";
}

export { SiguiContextMenuRoot as SiguiContextMenu };
