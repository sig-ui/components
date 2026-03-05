// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiInclude extends SiguiElement {
  static observedAttributes = ["src", "mode"];

  static componentKey = "include";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [
      { name: "sg-load", detail: { src: "string" }, bubbles: true },
      { name: "sg-error", detail: { src: "string", error: "object" }, bubbles: true },
    ],
  });

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    super.attributeChangedCallback(_name, _oldValue, _newValue);
    this.load();
  }

  async load() {
    const src = this.getAttribute("src");
    if (!src) return;
    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      const text = await response.text();
      if (this.getAttribute("mode") === "text") this.textContent = text;
      else this.innerHTML = text;
      this.dispatchEvent(new CustomEvent("sg-load", { bubbles: true, detail: { src } }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent("sg-error", { bubbles: true, detail: { src, error } }));
    }
  }
}
