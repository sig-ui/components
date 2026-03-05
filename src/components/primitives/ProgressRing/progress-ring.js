// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiProgressRing extends SiguiElement {
  static observedAttributes = ["value", "max"];
  static componentKey = "progress-ring";

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) this.setAttribute("role", "progressbar");
    this.sync();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    super.attributeChangedCallback(_name, _oldValue, _newValue);
    this.sync();
  }

  sync() {
    const max = Math.max(1, Number(this.getAttribute("max") ?? "100"));
    const value = Math.min(max, Math.max(0, Number(this.getAttribute("value") ?? "0")));
    const percent = (value / max) * 100;
    this.style.setProperty("--sg-progress-ring-value", `${percent}%`);
    this.setAttribute("aria-valuemin", "0");
    this.setAttribute("aria-valuemax", String(max));
    this.setAttribute("aria-valuenow", String(value));
  }
}
