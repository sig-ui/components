// @ts-check

/**
 * Pagination / pagination module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiPaginationRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiPaginationRoot extends SiguiElement {
  static observedAttributes = ["page","total","per-page","sibling-count"];
  static componentKey = "pagination-root";
}

export { SiguiPaginationRoot as SiguiPagination };
