// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

const UNITS = ["B", "KB", "MB", "GB", "TB", "PB"];

export class SiguiFormatBytes extends SiguiElement {
  static observedAttributes = ["value", "decimals"];
  static componentKey = "format-bytes";

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    super.attributeChangedCallback(_name, _oldValue, _newValue);
    this.render();
  }

  render() {
    const raw = Number(this.getAttribute("value") ?? "0");
    if (!Number.isFinite(raw)) return;
    const decimals = Math.max(0, Number(this.getAttribute("decimals") ?? "1"));
    let value = Math.abs(raw);
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < UNITS.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }
    const sign = raw < 0 ? "-" : "";
    this.textContent = `${sign}${value.toFixed(decimals)} ${UNITS[unitIndex]}`;
  }
}
