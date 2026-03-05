// @ts-check

/**
 * InputOTP / input-otp module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiInputOtpRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiInputOtpRoot extends SiguiElement {
  static observedAttributes = ["value","length","disabled","pattern","onchange","oncomplete"];
  static componentKey = "input-otp-root";
}

export { SiguiInputOtpRoot as SiguiInputOtp };
