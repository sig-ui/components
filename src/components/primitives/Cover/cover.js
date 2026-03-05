// @ts-check

/**
 * Cover / cover module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiCover custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCover extends SiguiElement {
  static observedAttributes = ["min-height","gap","padding"];
  static componentKey = "cover";
}
