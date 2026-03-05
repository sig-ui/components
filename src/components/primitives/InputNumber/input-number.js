// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiInputNumber extends SiguiElement {
  static observedAttributes = ["value", "min", "max", "step", "placeholder", "name", "disabled", "required"];

  static componentKey = "input-number";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [
      { name: "input", bubbles: true },
      { name: "change", bubbles: true },
    ],
    formParticipant: { controlSelector: "input[type='number']" },
    valueAttr: "value",
  });

  connectedCallback() {
    super.connectedCallback();
    this.ensureInput();
    this.syncToInput();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this.syncToInput();
  }

  ensureInput() {
    let input = /** @type {HTMLInputElement | null} */ (this.querySelector("input[type='number']"));
    if (!input) {
      input = document.createElement("input");
      input.type = "number";
      this.replaceChildren(input);
    }
    this.on(input, "input", () => {
      this.setAttribute("value", input.value);
      this.dispatchEvent(new Event("input", { bubbles: true }));
    });
    this.on(input, "change", () => {
      this.setAttribute("value", input.value);
      this.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  syncToInput() {
    const input = this.querySelector("input[type='number']");
    if (!(input instanceof HTMLInputElement)) return;
    for (const attr of ["min", "max", "step", "placeholder", "name", "value"]) {
      const value = this.getAttribute(attr);
      if (value == null) input.removeAttribute(attr);
      else input.setAttribute(attr, value);
    }
    input.disabled = this.hasAttribute("disabled");
    input.required = this.hasAttribute("required");
  }
}
