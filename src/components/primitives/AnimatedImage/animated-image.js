// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiAnimatedImage custom element class.
 * @extends {SiguiElement}
 */
export class SiguiAnimatedImage extends SiguiElement {
  static observedAttributes = ["src", "alt", "reduced-src"];
  static componentKey = "animated-image";

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    super.attributeChangedCallback(_name, _oldValue, _newValue);
    this.render();
  }

  render() {
    const src = this.getAttribute("src");
    if (!src) return;
    const reducedSrc = this.getAttribute("reduced-src");
    const prefersReduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const effectiveSrc = prefersReduced && reducedSrc ? reducedSrc : src;

    let img = this.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      img.loading = "lazy";
      this.replaceChildren(img);
    }
    img.src = effectiveSrc;
    img.alt = this.getAttribute("alt") ?? "";
  }
}
