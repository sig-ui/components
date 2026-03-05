// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiTag extends SiguiElement {
  static observedAttributes = ["variant", "size", "removable"];

  static componentKey = "tag";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "sg-remove", bubbles: true }],
  });

  connectedCallback() {
    super.connectedCallback();
    this.renderRemoveButton();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this.renderRemoveButton();
  }

  renderRemoveButton() {
    const existing = this.querySelector("button[data-sg-tag-remove]");
    if (!this.hasAttribute("removable")) {
      existing?.remove();
      return;
    }
    if (existing) return;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.sgTagRemove = "true";
    button.setAttribute("aria-label", "Remove tag");
    button.textContent = "×";
    this.append(button);
    this.on(button, "click", () => {
      this.dispatchEvent(new CustomEvent("sg-remove", { bubbles: true }));
      this.remove();
    });
  }
}
