// @ts-check

/**
 * Cluster / cluster module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiCluster custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCluster extends SiguiElement {
  static observedAttributes = ["gap","align","justify"];
  static componentKey = "cluster";
}
