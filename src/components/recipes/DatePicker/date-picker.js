// @ts-check

/**
 * DatePicker / date-picker module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";
import { getResolvedLocale } from "../../../lib/locale.js";
import { SiguiCalendar } from "../../primitives/Calendar/calendar.js";

/**
 * SiguiDatePickerRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiDatePickerRoot extends SiguiElement {
  static observedAttributes = ["value","open","label","disabled","min","max","default-date","locale","onchange"];

  static componentKey = "date-picker-root";

  constructor() {
    super();
    /** @type {HTMLElement | null} */
    this._boundCalendar = null;
    /** @type {HTMLElement | null} */
    this._contentEl = null;
    /** @type {Comment | null} */
    this._contentAnchor = null;
    this._lastOpen = false;
    this._triggerOriginalMarkup = "";
    /** @type {Record<string, string> | null} */
    this._messages = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.syncDisabledState();
    this.bindInteractions();
    this.syncComposedState();
    this._lastOpen = this.open;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this.syncDisabledState();
    if (!this.isConnected) return;
    this.syncComposedState();

    if (this._lastOpen !== this.open) {
      this.dispatchEvent(new CustomEvent("toggle", { bubbles: true, detail: { open: this.open } }));
      this._lastOpen = this.open;
    }
  }

  disconnectedCallback() {
    this.unmountFloatingContent();
    super.disconnectedCallback();
  }

  get open() {
    return this.hasAttribute("open");
  }

  get value() {
    return this.getAttribute("value") ?? "";
  }

  set value(next) {
    const normalized = (next ?? "").toString();
    if (normalized) this.setAttribute("value", normalized);
    else this.removeAttribute("value");
  }

  get calendarLabel() {
    const label = this.getAttribute("label");
    return label ? `${label} calendar` : "Calendar";
  }

  get messages() {
    return this._messages;
  }

  set messages(next) {
    if (!next || typeof next !== "object") this._messages = null;
    else this._messages = Object.fromEntries(
      Object.entries(next).filter(([, value]) => typeof value === "string"),
    );
    if (this.isConnected) this.syncComposedState();
  }

  setOpen(next) {
    if (next) this.setAttribute("open", "");
    else this.removeAttribute("open");
  }

  syncDisabledState() {
    if (this.hasAttribute("disabled")) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");
  }

  getTrigger() {
    return this.querySelector("sg-date-picker-trigger");
  }

  getContent() {
    if (this._contentEl && this._contentEl.isConnected) return this._contentEl;
    const found = this.querySelector("sg-date-picker-content");
    if (found) this._contentEl = found;
    return this._contentEl;
  }

  getCalendar() {
    const content = this.getContent();
    return content ? content.querySelector("sg-date-picker-calendar") : null;
  }

  getTriggerControl() {
    const trigger = this.getTrigger();
    if (!trigger) return null;
    return trigger.querySelector("button, [role='button'], input, select, textarea") ?? trigger;
  }

  getGeneratedTriggerValueNode() {
    const trigger = this.getTrigger();
    if (!trigger) return null;
    return trigger.querySelector(".sg-date-picker-trigger-value[data-generated='true']");
  }

  formatSelectedValue(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const [year, month, day] = value.split("-").map((part) => Number(part));
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return value;
    const locale = getResolvedLocale(this.getAttribute("locale"));
    return date.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
  }

  bindInteractions() {
    this.on(this, "click", (event) => {
      if (!(event.target instanceof Node)) return;
      if (this.hasAttribute("disabled")) return;
      const content = this.getContent();
      if (content && content.contains(event.target)) return;
      const trigger = this.getTrigger();
      if (!trigger || !trigger.contains(event.target)) return;
      this.setOpen(!this.open);
    });

    this.on(document, "click", (event) => {
      if (!this.open) return;
      const path = typeof event.composedPath === "function" ? event.composedPath() : [];
      const content = this.getContent();
      if (content && path.includes(content)) return;
      if (path.includes(this)) return;
      this.setOpen(false);
    });

    this.on(document, "keydown", (event) => {
      if (!this.open) return;
      if (event.key !== "Escape") return;
      this.setOpen(false);
      const triggerControl = this.getTriggerControl();
      if (triggerControl instanceof HTMLElement) triggerControl.focus();
    });

    this.on(window, "resize", () => {
      if (!this.open) return;
      this.positionFloatingContent();
    });
    this.on(window, "scroll", () => {
      if (!this.open) return;
      this.positionFloatingContent();
    }, true);
  }

  ensureContentAnchor(content) {
    if (this._contentAnchor) return;
    const anchor = document.createComment("sg-date-picker-content-anchor");
    content.parentNode?.insertBefore(anchor, content);
    this._contentAnchor = anchor;
  }

  mountFloatingContent() {
    const content = this.getContent();
    if (!content) return;
    this.ensureContentAnchor(content);
    if (content.parentNode !== document.body) document.body.append(content);
    this.positionFloatingContent();
  }

  unmountFloatingContent() {
    const content = this.getContent();
    if (!content || content.parentNode !== document.body) return;
    const anchorParent = this._contentAnchor?.parentNode;
    if (anchorParent && this._contentAnchor) {
      anchorParent.insertBefore(content, this._contentAnchor.nextSibling);
      return;
    }
    this.append(content);
  }

  positionFloatingContent() {
    const content = this.getContent();
    if (!content || content.parentNode !== document.body) return;
    const trigger = this.getTrigger();
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const gap = 4;
    content.style.position = "fixed";
    content.style.top = `${Math.round(rect.bottom + gap)}px`;
    content.style.left = `${Math.round(rect.left)}px`;
    content.style.zIndex = "2147483000";

    const width = content.offsetWidth;
    if (!width) return;
    const viewportWidth = window.innerWidth;
    const minLeft = 8;
    const maxLeft = Math.max(minLeft, viewportWidth - width - 8);
    const clampedLeft = Math.min(Math.max(rect.left, minLeft), maxLeft);
    content.style.left = `${Math.round(clampedLeft)}px`;
  }

  bindCalendar(calendar) {
    if (this._boundCalendar === calendar) return;
    this._boundCalendar = calendar;
    this.on(calendar, "input", (event) => this.handleCalendarSelection(event));
    this.on(calendar, "change", (event) => this.handleCalendarSelection(event));
  }

  handleCalendarSelection(event) {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;
    // Ignore bubbled native events from internal month/year selects.
    if (event.target !== target) return;
    event.stopPropagation();
    const selected = target.getAttribute("value") ?? "";
    if (selected) this.setAttribute("value", selected);
    else this.removeAttribute("value");
    this.dispatchEvent(new CustomEvent(event.type, { bubbles: true, detail: selected }));
    this.setOpen(false);
  }

  syncComposedState() {
    const selectedValue = this.getAttribute("value") ?? "";
    const content = this.getContent();
    if (content) {
      if (this.open) {
        content.removeAttribute("hidden");
        this.mountFloatingContent();
      } else {
        content.setAttribute("hidden", "");
        this.unmountFloatingContent();
      }
      content.setAttribute("aria-hidden", this.open ? "false" : "true");
    }

    const triggerControl = this.getTriggerControl();
    if (triggerControl instanceof HTMLElement) {
      triggerControl.setAttribute("aria-haspopup", "dialog");
      triggerControl.setAttribute("aria-expanded", this.open ? "true" : "false");
      triggerControl.setAttribute("aria-disabled", this.hasAttribute("disabled") ? "true" : "false");
    }
    const trigger = this.getTrigger();
    if (trigger) {
      const selectedNode = this.getGeneratedTriggerValueNode();
      const triggerButton = trigger.querySelector("button");
      if (selectedValue) {
        if (triggerButton instanceof HTMLElement) {
          triggerButton.style.display = "none";
          if (!selectedNode) {
            const node = document.createElement("span");
            node.className = "sg-date-picker-trigger-value";
            node.dataset.generated = "true";
            node.textContent = this.formatSelectedValue(selectedValue);
            trigger.append(node);
          } else {
            selectedNode.textContent = this.formatSelectedValue(selectedValue);
          }
        } else {
          if (!this._triggerOriginalMarkup) this._triggerOriginalMarkup = trigger.innerHTML;
          trigger.textContent = "";
          const node = document.createElement("span");
          node.className = "sg-date-picker-trigger-value";
          node.dataset.generated = "true";
          node.textContent = this.formatSelectedValue(selectedValue);
          trigger.append(node);
        }
      } else {
        if (triggerButton instanceof HTMLElement) {
          triggerButton.style.removeProperty("display");
          if (selectedNode) selectedNode.remove();
        } else if (this._triggerOriginalMarkup) {
          trigger.innerHTML = this._triggerOriginalMarkup;
          this._triggerOriginalMarkup = "";
        }
      }
    }

    const calendar = this.getCalendar();
    if (calendar) {
      this.bindCalendar(calendar);
      calendar.setAttribute("mode", "single");
      calendar.setAttribute("aria-label", this.calendarLabel);
      const locale = this.getAttribute("locale");
      if (locale) calendar.setAttribute("locale", locale);
      else calendar.removeAttribute("locale");
      calendar.messages = this._messages;

      if (selectedValue && calendar.getAttribute("value") !== selectedValue) calendar.setAttribute("value", selectedValue);
      if (!selectedValue) calendar.removeAttribute("value");

      const defaultDate = this.getAttribute("default-date");
      if (defaultDate) calendar.setAttribute("default-date", defaultDate);
      else calendar.removeAttribute("default-date");

      const min = this.getAttribute("min");
      if (min) calendar.setAttribute("min", min);
      else calendar.removeAttribute("min");

      const max = this.getAttribute("max");
      if (max) calendar.setAttribute("max", max);
      else calendar.removeAttribute("max");
    }
  }
}

/**
 * SiguiDatePickerTrigger custom element class.
 * @extends {SiguiElement}
 */
export class SiguiDatePickerTrigger extends SiguiElement {
  static observedAttributes = ["disabled"];

  static componentKey = "date-picker-trigger";

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
  }
}

/**
 * SiguiDatePickerContent custom element class.
 * @extends {SiguiElement}
 */
export class SiguiDatePickerContent extends SiguiElement {
  static observedAttributes = ["open"];

  static componentKey = "date-picker-content";
}

/**
 * SiguiDatePickerCalendar custom element class.
 * @extends {SiguiCalendar}
 */
export class SiguiDatePickerCalendar extends SiguiCalendar {
  static componentKey = "date-picker-calendar";
}

export { SiguiDatePickerRoot as SiguiDatePicker };
