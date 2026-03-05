// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiMutationObserver extends SiguiElement {
  static observedAttributes = ["for", "child-list", "attributes", "character-data", "subtree"];

  static componentKey = "mutation-observer";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "sg-mutation", detail: { records: "object" }, bubbles: true }],
  });

  constructor() {
    super();
    /** @type {MutationObserver | null} */
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
    const target = this.resolveTarget();
    if (!target) return;
    this._observer = new MutationObserver((records) => {
      this.dispatchEvent(new CustomEvent("sg-mutation", { bubbles: true, detail: { records } }));
    });
    this._observer.observe(target, {
      childList: this.getBoolAttr("child-list") || !this.hasAttribute("attributes"),
      attributes: this.getBoolAttr("attributes"),
      characterData: this.getBoolAttr("character-data"),
      subtree: this.getBoolAttr("subtree") || true,
    });
  }

  resolveTarget() {
    const selector = this.getAttribute("for");
    if (!selector) return this.parentElement;
    return document.querySelector(selector);
  }
}
