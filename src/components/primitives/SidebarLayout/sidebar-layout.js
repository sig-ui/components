// @ts-check

/**
 * SidebarLayout / sidebar-layout module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiSidebarLayout custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSidebarLayout extends SiguiElement {
  static observedAttributes = ["side","gap","sidebar-width","collapsible"];
  static componentKey = "sidebar-layout";
}
