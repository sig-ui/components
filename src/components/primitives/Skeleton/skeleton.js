// @ts-check

/**
 * Skeleton / skeleton module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiSkeleton custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSkeleton extends SiguiElement {
  static observedAttributes = ["width","height","circle"];

  static componentKey = "skeleton";

  connectedCallback() {
    super.connectedCallback();
    this.applyDimensions();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this.applyDimensions();
  }

  applyDimensions() {
    const w = this.getAttribute("width");
    const h = this.getAttribute("height");
    if (w) this.style.width = w;
    if (h) this.style.height = h;
    if (this.getAttribute("circle") === "true" || this.getAttribute("circle") === "") {
      this.style.borderRadius = "var(--sg-radius-full)";
    }
  }
}
