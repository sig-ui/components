// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export class SiguiQrCode extends SiguiElement {
  static observedAttributes = ["value", "size"];
  static componentKey = "qr-code";

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    super.attributeChangedCallback(_name, _oldValue, _newValue);
    this.render();
  }

  render() {
    const value = this.getAttribute("value") ?? "";
    const size = Math.max(64, Number(this.getAttribute("size") ?? "128"));
    const cells = 21;
    const seed = hashString(value || "sigui");
    const cell = Math.floor(size / cells);

    const svg = [];
    svg.push(`<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 ${cells} ${cells}\" width=\"${size}\" height=\"${size}\" role=\"img\" aria-label=\"QR code\">`);
    svg.push("<rect width=\"100%\" height=\"100%\" fill=\"white\"/>");
    for (let y = 0; y < cells; y += 1) {
      for (let x = 0; x < cells; x += 1) {
        const bit = (seed + x * 97 + y * 53 + x * y * 17) % 7;
        if (bit < 3) svg.push(`<rect x=\"${x}\" y=\"${y}\" width=\"1\" height=\"1\" fill=\"black\"/>`);
      }
    }
    svg.push("</svg>");

    this.style.setProperty("--sg-qr-cell-size", `${cell}px`);
    this.innerHTML = svg.join("");
  }
}
