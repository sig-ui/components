// @ts-check

/**
 * Sidebar / sidebar module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiSidebarRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSidebarRoot extends SiguiElement {
  static observedAttributes = ["state","collapsible","width","collapsed-width","side"];
  static componentKey = "sidebar-root";
}

export { SiguiSidebarRoot as SiguiSidebar };
