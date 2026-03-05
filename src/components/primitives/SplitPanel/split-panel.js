// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiSplitPanel extends SiguiElement {
  static observedAttributes = ["direction"];
  static componentKey = "split-panel";

  syncAttributesToDataset() {
    super.syncAttributesToDataset();
    if (!this.dataset.direction) this.dataset.direction = "horizontal";
  }
}
