// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiTree extends SiguiElement {
  static observedAttributes = ["selectable"];
  static componentKey = "tree";

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) this.setAttribute("role", "tree");
    this.on(this, "keydown", (event) => this.onKeydown(event));
  }

  onKeydown(event) {
    if (!(event instanceof KeyboardEvent)) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = Array.from(this.querySelectorAll("[role='treeitem']"));
    if (!items.length) return;
    const active = document.activeElement;
    const index = Math.max(0, items.indexOf(/** @type {Element} */ (active)));
    const next = event.key === "ArrowDown" ? Math.min(items.length - 1, index + 1) : Math.max(0, index - 1);
    const target = items[next];
    if (target instanceof HTMLElement) {
      target.focus();
      event.preventDefault();
    }
  }
}
