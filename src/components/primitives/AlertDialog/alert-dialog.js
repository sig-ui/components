// @ts-check

/**
 * AlertDialog / alert-dialog module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiAlertDialogRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiAlertDialogRoot extends SiguiElement {
  static observedAttributes = ["open","onclose"];
  static componentKey = "alert-dialog-root";
}

export { SiguiAlertDialogRoot as SiguiAlertDialog };
