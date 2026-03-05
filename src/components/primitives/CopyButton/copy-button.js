// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiCopyButton extends SiguiElement {
  static observedAttributes = ["for", "value", "success-text", "timeout", "disabled"];

  static componentKey = "copy-button";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [
      { name: "sg-copy", detail: { value: "string" }, bubbles: true },
      { name: "sg-copy-error", detail: { error: "object" }, bubbles: true },
    ],
  });

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
    this.on(this, "click", () => this.copy());
    this.on(this, "keydown", (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      this.copy();
    });
  }

  async copy() {
    if (this.hasAttribute("disabled")) return;
    const value = this.resolveValue();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      this.dataset.copied = "true";
      this.dispatchEvent(new CustomEvent("sg-copy", { bubbles: true, detail: { value } }));
      const successText = this.getAttribute("success-text");
      const timeout = Number(this.getAttribute("timeout") ?? "1200");
      const original = this.textContent;
      if (successText) this.textContent = successText;
      setTimeout(() => {
        delete this.dataset.copied;
        if (successText != null && original != null) this.textContent = original;
      }, Number.isFinite(timeout) ? timeout : 1200);
    } catch (error) {
      this.dispatchEvent(new CustomEvent("sg-copy-error", { bubbles: true, detail: { error } }));
    }
  }

  resolveValue() {
    const explicit = this.getAttribute("value");
    if (explicit) return explicit;
    const targetSelector = this.getAttribute("for");
    if (!targetSelector) return this.textContent?.trim() ?? "";
    const target = document.querySelector(targetSelector);
    if (!target) return "";
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return target.value;
    return target.textContent?.trim() ?? "";
  }
}
