// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiTabGroup extends SiguiElement {
  static observedAttributes = ["orientation"];
  static componentKey = "tab-group";

  syncAttributesToDataset() {
    super.syncAttributesToDataset();
    if (!this.dataset.orientation) this.dataset.orientation = "horizontal";
  }
}
