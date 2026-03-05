// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiRating extends SiguiElement {
  static observedAttributes = ["value", "max", "readonly", "data-style"];

  static componentKey = "rating";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "change", bubbles: true }],
    valueAttr: "value",
  });

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) this.setAttribute("role", "slider");
    this.render();
    this.on(this, "click", (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (this.hasAttribute("readonly")) return;
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      this.setAttribute("value", button.dataset.value ?? "0");
      this.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this.render();
  }

  render() {
    const max = Math.max(1, Number(this.getAttribute("max") ?? "5"));
    const value = Math.min(max, Math.max(0, Number(this.getAttribute("value") ?? "0")));
    this.setAttribute("aria-valuemin", "0");
    this.setAttribute("aria-valuemax", String(max));
    this.setAttribute("aria-valuenow", String(value));

    const readonly = this.hasAttribute("readonly");
    const style = this.dataset.style || "star";
    const iconName = style === "heart" ? "favorite" : "star";
    const stars = [];
    for (let i = 1; i <= max; i += 1) {
      const filled = i <= value;
      stars.push(`<button type="button" class="sg-rating-star" data-value="${i}"${filled ? " data-filled" : ""} ${readonly ? "disabled" : ""} aria-label="Rate ${i}"><sg-icon name="${iconName}"${filled ? " filled" : ""} size="sm"></sg-icon></button>`);
    }
    this.innerHTML = `<span class="sg-rating-stars">${stars.join("")}</span>`;
  }
}
