// @ts-nocheck

/**
 * interactive / input-otp module for SigUI web components.
 * @module
 */
import { SiguiElement, markComponent } from "./shared.js";

/**
 * SiguiInputOtp custom element class.
 * @extends {SiguiElement}
 */
export class SiguiInputOtp extends SiguiElement {
  static observedAttributes = ["length", "value", "disabled", "name"];

  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "input", bubbles: true }],
    formParticipant: { controlSelector: "input[type='text']" },
    valueAttr: "value",
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "input-otp");
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const length = Math.max(1, Number(this.getAttribute("length") || "6"));
    const value = (this.getAttribute("value") || "").slice(0, length);
    let container = this.querySelector("[data-sigui-part='control']");
    if (!(container instanceof HTMLDivElement)) {
      container = document.createElement("div");
      container.dataset.siguiPart = "control";
      this.prepend(container);
    }
    container.innerHTML = "";
    for (let i = 0; i < length; i += 1) {
      const slot = document.createElement("input");
      slot.type = "text";
      slot.inputMode = "numeric";
      slot.maxLength = 1;
      slot.value = value[i] || "";
      slot.disabled = this.hasAttribute("disabled");
      if (this.hasAttribute("name")) slot.name = `${this.getAttribute("name") || "otp"}-${i}`;
      this.on(slot, "input", () => {
        const inputs = Array.from(container.querySelectorAll("input"));
        const nextValue = inputs.map((el) => (el instanceof HTMLInputElement ? el.value : "")).join("");
        this.setAttribute("value", nextValue);
        this.dispatchEvent(new Event("input", { bubbles: true }));
      });
      container.appendChild(slot);
    }
  }
}
