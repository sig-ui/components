// @ts-check

/**
 * Tabs / tabs module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiTabsRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiTabsRoot extends SiguiElement {
  static observedAttributes = ["value","default-value","onchange"];
  static componentKey = "tabs-root";
}

export { SiguiTabsRoot as SiguiTabs };
