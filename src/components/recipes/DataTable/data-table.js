// @ts-check

/**
 * DataTable / data-table module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiDataTableRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiDataTableRoot extends SiguiElement {
  static observedAttributes = ["sort-column","sort-direction","page","page-size","total-items","onsort","onpagechange"];
  static componentKey = "data-table-root";
}

export { SiguiDataTableRoot as SiguiDataTable };
