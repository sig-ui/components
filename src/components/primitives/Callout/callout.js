// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiCallout extends SiguiElement {
  static observedAttributes = ["variant", "size"];
  static componentKey = "callout";

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) this.setAttribute("role", "status");
  }
}
