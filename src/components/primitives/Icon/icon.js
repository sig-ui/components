// @ts-check

/**
 * Icon / icon module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

const FONT_FAMILIES = {
  outlined: "Material Symbols Outlined",
  rounded: "Material Symbols Rounded",
  sharp: "Material Symbols Sharp",
};

/**
 * SiguiIcon custom element class.
 * @extends {SiguiElement}
 */
export class SiguiIcon extends SiguiElement {
  static observedAttributes = ["name","size","color","label","directional","filled","variant","weight","grade"];

  static componentKey = "icon";

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this.render();
  }

  render() {
    const name = this.getAttribute("name");
    // Font mode: has name and no SVG child
    if (!name || this.querySelector("svg")) return;

    this.dataset.delivery = "font";
    const variant = this.getAttribute("variant") || "outlined";
    const fill = this.hasAttribute("filled") ? 1 : 0;
    const weight = Number(this.getAttribute("weight") ?? 400);
    const grade = Number(this.getAttribute("grade") ?? 0);
    const opsz = this._computeOpsz();
    const fontFamily = FONT_FAMILIES[/** @type {keyof typeof FONT_FAMILIES} */ (variant)] || FONT_FAMILIES.outlined;

    this.style.fontFamily = `'${fontFamily}'`;
    this.style.fontVariationSettings = `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opsz}`;
    this.textContent = name;

    // Accessibility
    const label = this.getAttribute("label");
    if (label) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", label);
      this.removeAttribute("aria-hidden");
    } else {
      this.setAttribute("aria-hidden", "true");
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
    }
  }

  /** @returns {number} */
  _computeOpsz() {
    const size = this.getAttribute("size") || "default";
    switch (size) {
      case "xs": return 20;
      case "sm": return 20;
      case "md": return 24;
      case "default": return 24;
      case "lg": return 40;
      case "xl": return 48;
      default: return 24;
    }
  }
}
