// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";
import { getResolvedLocale } from "../../../lib/locale.js";

export class SiguiFormatDate extends SiguiElement {
  static observedAttributes = ["value", "date-style", "time-style", "locale"];
  static componentKey = "format-date";

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    super.attributeChangedCallback(_name, _oldValue, _newValue);
    this.render();
  }

  render() {
    const value = this.getAttribute("value");
    if (!value) return;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return;
    const locale = getResolvedLocale(this.getAttribute("locale"));
    const dateStyle = this.getAttribute("date-style") || "medium";
    const timeStyle = this.getAttribute("time-style") || undefined;
    const formatter = new Intl.DateTimeFormat(locale, {
      dateStyle: /** @type {Intl.DateTimeFormatOptions['dateStyle']} */ (dateStyle),
      ...(timeStyle ? { timeStyle: /** @type {Intl.DateTimeFormatOptions['timeStyle']} */ (timeStyle) } : {}),
    });
    this.textContent = formatter.format(date);
  }
}
