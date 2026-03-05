// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiResizeObserver extends SiguiElement {
  static observedAttributes = ["for"];

  static componentKey = "resize-observer";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "sg-resize", detail: { entries: "object" }, bubbles: true }],
  });

  constructor() {
    super();
    /** @type {globalThis.ResizeObserver | null} */
    this._observer = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.observe();
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    this._observer = null;
    super.disconnectedCallback();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this.observe();
  }

  observe() {
    this._observer?.disconnect();
    if (typeof ResizeObserver === "undefined") return;
    const target = this.resolveTarget();
    if (!target) return;
    this._observer = new ResizeObserver((entries) => {
      this.dispatchEvent(new CustomEvent("sg-resize", { bubbles: true, detail: { entries } }));
    });
    this._observer.observe(target);
  }

  resolveTarget() {
    const selector = this.getAttribute("for");
    if (!selector) return this.parentElement;
    return document.querySelector(selector);
  }
}
