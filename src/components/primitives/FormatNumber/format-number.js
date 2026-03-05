// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";
import { getResolvedLocale } from "../../../lib/locale.js";

export class SiguiFormatNumber extends SiguiElement {
  static observedAttributes = ["value", "locale", "style", "currency", "maximum-fraction-digits"];
  static componentKey = "format-number";

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    super.attributeChangedCallback(_name, _oldValue, _newValue);
    this.render();
  }

  render() {
    const raw = Number(this.getAttribute("value") ?? "0");
    if (!Number.isFinite(raw)) return;
    const locale = getResolvedLocale(this.getAttribute("locale"));
    const style = this.getAttribute("style") || "decimal";
    const currency = this.getAttribute("currency") || undefined;
    const maximumFractionDigits = this.getAttribute("maximum-fraction-digits");

    const formatter = new Intl.NumberFormat(locale, {
      style: /** @type {Intl.NumberFormatOptions['style']} */ (style),
      ...(currency ? { currency } : {}),
      ...(maximumFractionDigits ? { maximumFractionDigits: Number(maximumFractionDigits) } : {}),
    });
    this.textContent = formatter.format(raw);
  }
}
