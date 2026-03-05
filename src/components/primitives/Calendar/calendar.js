// @ts-check

/**
 * Calendar / calendar module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";
import { getResolvedLocale } from "../../../lib/locale.js";

/**
 * SiguiCalendar custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCalendar extends SiguiElement {
  static observedAttributes = ["mode","value","default-date","min","max","locale","onchange"];

  static componentKey = "calendar";

  constructor() {
    super();
    /** @type {Record<string, string> | null} */
    this._messages = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._openPicker = null;
    this._viewDate = this.getInitialDate();
    this._focusedDate = this.getInitialDate();
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.isConnected) return;
    this._viewDate = this.getInitialDate();
    this._focusedDate = this.getInitialDate();
    this.render();
  }

  get mode() {
    return this.getAttribute("mode") === "range" ? "range" : "single";
  }

  get locale() {
    return getResolvedLocale(this.getAttribute("locale"));
  }

  get messages() {
    return this._messages;
  }

  set messages(next) {
    if (!next || typeof next !== "object") this._messages = null;
    else this._messages = Object.fromEntries(
      Object.entries(next).filter(([, value]) => typeof value === "string"),
    );
    if (this.isConnected) this.render();
  }

  getMessages() {
    const defaults = {
      previousMonth: "Previous month",
      nextMonth: "Next month",
      chooseMonth: "Choose month",
      chooseYear: "Choose year",
      chooseMonthDialog: "Choose month",
      chooseYearDialog: "Choose year",
    };
    if (!this._messages) return defaults;
    return { ...defaults, ...this._messages };
  }

  getInitialDate() {
    const today = startOfDay(new Date());
    const defaultDate = this.getDefaultDate();
    if (this.mode === "range") {
      const range = this.getRangeValue();
      if (range.start) return range.start;
      if (defaultDate) return defaultDate;
      return today;
    }
    const selected = this.getSingleValue();
    return selected ?? defaultDate ?? today;
  }

  getSingleValue() {
    const raw = this.getAttribute("value");
    if (!raw) return null;
    return parseIsoDate(raw);
  }

  getRangeValue() {
    const raw = this.getAttribute("value");
    if (!raw) return { start: null, end: null };
    try {
      const parsed = JSON.parse(raw);
      const start = typeof parsed?.start === "string" ? parseIsoDate(parsed.start) : null;
      const end = typeof parsed?.end === "string" ? parseIsoDate(parsed.end) : null;
      return { start, end };
    } catch {
      return { start: null, end: null };
    }
  }

  getDefaultDate() {
    const raw = this.getAttribute("default-date");
    if (!raw) return null;
    return parseIsoDate(raw);
  }

  getMinDate() {
    const raw = this.getAttribute("min");
    return raw ? parseIsoDate(raw) : null;
  }

  getMaxDate() {
    const raw = this.getAttribute("max");
    return raw ? parseIsoDate(raw) : null;
  }

  canSelect(date) {
    const min = this.getMinDate();
    const max = this.getMaxDate();
    if (min && date < min) return false;
    if (max && date > max) return false;
    return true;
  }

  setSingleValue(date) {
    const iso = toIso(date);
    this.setAttribute("value", iso);
    this.dispatchSelectionEvents(iso);
  }

  setRangeValue(start, end) {
    const payload = {
      start: start ? toIso(start) : "",
      end: end ? toIso(end) : "",
    };
    this.setAttribute("value", JSON.stringify(payload));
    this.dispatchSelectionEvents(payload);
  }

  dispatchSelectionEvents(value) {
    this.dispatchEvent(new CustomEvent("input", { bubbles: true, detail: value }));
    this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: value }));
  }

  moveMonth(offset) {
    const next = new Date(this._viewDate);
    next.setMonth(next.getMonth() + offset, 1);
    this._viewDate = startOfDay(next);
    this.render();
  }

  setViewMonthYear(month, year) {
    const safeMonth = Math.max(0, Math.min(11, month));
    const next = new Date(year, safeMonth, 1);
    this._viewDate = startOfDay(next);
    this.render();
  }

  togglePicker(kind) {
    this._openPicker = this._openPicker === kind ? null : kind;
    this.render();
  }

  getYearOptions() {
    const min = this.getMinDate();
    const max = this.getMaxDate();
    const currentYear = this._viewDate.getFullYear();
    const start = min ? min.getFullYear() : currentYear - 50;
    const end = max ? max.getFullYear() : currentYear + 50;
    const years = [];
    for (let year = start; year <= end; year += 1) years.push(year);
    if (!years.includes(currentYear)) years.push(currentYear);
    return years.sort((a, b) => a - b);
  }

  focusDate(date) {
    this._focusedDate = startOfDay(date);
    if (
      this._focusedDate.getFullYear() !== this._viewDate.getFullYear() ||
      this._focusedDate.getMonth() !== this._viewDate.getMonth()
    ) {
      this._viewDate = new Date(this._focusedDate.getFullYear(), this._focusedDate.getMonth(), 1);
    }
    this.render();
    const selector = `button.sg-calendar-day[data-date="${toIso(this._focusedDate)}"]`;
    const btn = this.querySelector(selector);
    if (btn instanceof HTMLButtonElement) btn.focus();
  }

  selectDate(date) {
    if (!this.canSelect(date)) return;
    this._openPicker = null;
    const selected = startOfDay(date);
    this._focusedDate = selected;

    if (this.mode === "single") {
      this.setSingleValue(selected);
      this.render();
      return;
    }

    const range = this.getRangeValue();
    if (!range.start || (range.start && range.end)) {
      this.setRangeValue(selected, null);
      this.render();
      return;
    }

    if (selected < range.start) {
      this.setRangeValue(selected, range.start);
    } else {
      this.setRangeValue(range.start, selected);
    }
    this.render();
  }

  handleKeyDown(event) {
    if (!(event.target instanceof HTMLElement)) return;
    if (!event.target.classList.contains("sg-calendar-day")) return;

    const current = this._focusedDate ?? this.getInitialDate();
    const next = new Date(current);

    if (event.key === "ArrowLeft") next.setDate(next.getDate() - 1);
    else if (event.key === "ArrowRight") next.setDate(next.getDate() + 1);
    else if (event.key === "ArrowUp") next.setDate(next.getDate() - 7);
    else if (event.key === "ArrowDown") next.setDate(next.getDate() + 7);
    else if (event.key === "Home") next.setDate(1);
    else if (event.key === "End") next.setDate(daysInMonth(current.getFullYear(), current.getMonth()));
    else if (event.key === "PageUp") next.setMonth(next.getMonth() - 1);
    else if (event.key === "PageDown") next.setMonth(next.getMonth() + 1);
    else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.selectDate(current);
      return;
    } else {
      return;
    }

    event.preventDefault();
    this.focusDate(next);
  }

  render() {
    const locale = this.locale;
    const messages = this.getMessages();
    const monthStart = new Date(this._viewDate.getFullYear(), this._viewDate.getMonth(), 1);
    const monthLabel = monthStart.toLocaleDateString(locale, { month: "long" });
    const yearLabel = monthStart.getFullYear();
    const months = Array.from({ length: 12 }, (_, month) =>
      new Date(2000, month, 1).toLocaleDateString(locale, { month: "long" }),
    );
    const yearOptions = this.getYearOptions();
    const monthPopover = this._openPicker === "month"
      ? `
        <div class="sg-calendar-popover" role="dialog" aria-label="${messages.chooseMonthDialog}">
          <select class="sg-calendar-picker-select" data-picker="month" size="12">
            ${months
              .map((month, index) => `<option value="${index}"${index === monthStart.getMonth() ? " selected" : ""}>${month}</option>`)
              .join("")}
          </select>
        </div>
      `
      : "";
    const yearPopover = this._openPicker === "year"
      ? `
        <div class="sg-calendar-popover" role="dialog" aria-label="${messages.chooseYearDialog}">
          <select class="sg-calendar-picker-select" data-picker="year" size="10">
            ${yearOptions
              .map((year) => `<option value="${year}"${year === monthStart.getFullYear() ? " selected" : ""}>${year}</option>`)
              .join("")}
          </select>
        </div>
      `
      : "";
    const weekdayLabels = Array.from({ length: 7 }, (_, dayOffset) =>
      new Date(2021, 7, 1 + dayOffset).toLocaleDateString(locale, { weekday: "short" }),
    );
    const firstWeekday = monthStart.getDay();
    const totalDays = daysInMonth(monthStart.getFullYear(), monthStart.getMonth());
    const todayIso = toIso(startOfDay(new Date()));
    const focusedIso = toIso(this._focusedDate ?? monthStart);

    const singleSelected = this.mode === "single" ? this.getSingleValue() : null;
    const rangeSelected = this.mode === "range" ? this.getRangeValue() : { start: null, end: null };
    const singleSelectedIso = singleSelected ? toIso(singleSelected) : "";
    const rangeStartIso = rangeSelected.start ? toIso(rangeSelected.start) : "";
    const rangeEndIso = rangeSelected.end ? toIso(rangeSelected.end) : "";

    let daysHtml = "";
    for (let i = 0; i < firstWeekday; i += 1) {
      daysHtml += `<span class="sg-calendar-day-empty" aria-hidden="true"></span>`;
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
      const iso = toIso(date);
      const attrs = [`data-date="${iso}"`];
      if (iso === todayIso) attrs.push("data-today");
      if (iso === focusedIso) attrs.push("data-focused");

      let dataState = "";
      if (this.mode === "single" && iso === singleSelectedIso) {
        dataState = "selected";
      } else if (this.mode === "range" && rangeStartIso && rangeEndIso && iso >= rangeStartIso && iso <= rangeEndIso) {
        dataState = "range";
        if (iso === rangeStartIso) attrs.push("data-range-start");
        if (iso === rangeEndIso) attrs.push("data-range-end");
      }
      if (dataState) attrs.push(`data-state="${dataState}"`);

      const disabled = !this.canSelect(date);
      const tabindex = iso === focusedIso ? "0" : "-1";
      daysHtml += `<button type="button" class="sg-calendar-day" ${attrs.join(" ")} tabindex="${tabindex}"${disabled ? " disabled" : ""}>${day}</button>`;
    }

    this.innerHTML = `
      <div class="sg-calendar-header">
        <button type="button" class="sg-calendar-nav" data-dir="-1" aria-label="${messages.previousMonth}">&#9664;</button>
        <div class="sg-calendar-title" aria-live="polite">
          <span class="sg-calendar-token-wrap">
            <button type="button" class="sg-calendar-token" data-picker-trigger="month" aria-expanded="${this._openPicker === "month" ? "true" : "false"}" aria-label="${messages.chooseMonth}">${monthLabel}</button>
            ${monthPopover}
          </span>
          <span class="sg-calendar-token-wrap">
            <button type="button" class="sg-calendar-token" data-picker-trigger="year" aria-expanded="${this._openPicker === "year" ? "true" : "false"}" aria-label="${messages.chooseYear}">${yearLabel}</button>
            ${yearPopover}
          </span>
        </div>
        <button type="button" class="sg-calendar-nav" data-dir="1" aria-label="${messages.nextMonth}">&#9654;</button>
      </div>
      <div class="sg-calendar-weekdays">${weekdayLabels.map((d) => `<span class="sg-calendar-weekday">${d}</span>`).join("")}</div>
      <div class="sg-calendar-days">${daysHtml}</div>
    `;

    this.querySelectorAll("[data-picker-trigger]").forEach((node) => {
      this.on(node, "click", () => {
        const kind = node.getAttribute("data-picker-trigger");
        if (kind !== "month" && kind !== "year") return;
        this.togglePicker(kind);
      });
    });

    this.querySelectorAll(".sg-calendar-nav").forEach((node) => {
      this.on(node, "click", () => {
        const dir = Number((node).getAttribute("data-dir") ?? "0");
        if (!Number.isFinite(dir) || dir === 0) return;
        this._openPicker = null;
        this.moveMonth(dir);
      });
    });

    this.querySelectorAll(".sg-calendar-picker-select").forEach((node) => {
      this.on(node, "change", () => {
        const picker = node.getAttribute("data-picker");
        const month = picker === "month" ? Number(node.value) : monthStart.getMonth();
        const year = picker === "year" ? Number(node.value) : monthStart.getFullYear();
        if ((picker !== "month" && picker !== "year") || !Number.isInteger(month) || !Number.isInteger(year)) return;
        this._openPicker = null;
        this.setViewMonthYear(month, year);
      });
    });

    this.querySelectorAll(".sg-calendar-day").forEach((node) => {
      this.on(node, "click", () => {
        const iso = node.getAttribute("data-date");
        if (!iso) return;
        const date = parseIsoDate(iso);
        if (!date) return;
        this.selectDate(date);
      });
      this.on(node, "focus", () => {
        const iso = node.getAttribute("data-date");
        const date = iso ? parseIsoDate(iso) : null;
        if (!date) return;
        this._focusedDate = date;
      });
      this.on(node, "keydown", (event) => this.handleKeyDown(event));
    });
  }
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toIso(date) {
  return [
    date.getFullYear().toString().padStart(4, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ].join("-");
}

function parseIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map((part) => Number(part));
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return startOfDay(date);
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
