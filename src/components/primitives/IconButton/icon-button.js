// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiIconButton extends SiguiElement {
  static observedAttributes = ["size", "color", "disabled", "pressed"];

  static get componentName() { return "IconButton"; }
  static get componentKey() { return "icon-button"; }

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "button" },
  });

  connectedCallback() {
    super.connectedCallback();
    this.ensureClass("sg-icon-button");
    this.dataset.siguiComponent = "icon-button";
    this.syncAttributesToDataset();
    if (this.hasAttribute("disabled")) this.setAttribute("aria-disabled", "true");
    if (!this.hasAttribute("aria-label") && !this.textContent?.trim()) {
      this.setAttribute("aria-label", "Icon button");
    }
  }

  attributeChangedCallback() {
    this.syncAttributesToDataset();
  }

  syncAttributesToDataset() {
    for (const attr of (/** @type {typeof SiguiIconButton} */ (this.constructor)).observedAttributes) {
      const dataKey = attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      if (!this.hasAttribute(attr)) {
        delete this.dataset[dataKey];
        continue;
      }
      this.dataset[dataKey] = this.getAttribute(attr) ?? "";
    }
  }
}
