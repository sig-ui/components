// @ts-check

/**
 * Dialog / dialog module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiDialogRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiDialogRoot extends SiguiElement {
  static observedAttributes = ["open","onclose"];
  static componentKey = "dialog-root";
}

export { SiguiDialogRoot as SiguiDialog };
