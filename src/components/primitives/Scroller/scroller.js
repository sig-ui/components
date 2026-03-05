// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiScroller extends SiguiElement {
  static observedAttributes = ["axis"];
  static componentKey = "scroller";

  syncAttributesToDataset() {
    super.syncAttributesToDataset();
    if (!this.dataset.axis) this.dataset.axis = "x";
  }
}
