// @ts-check

/**
 * interactive / tabs module for SigUI web components.
 * @module
 */
import { tabsMachine } from "@sig-ui/core/machines";
import { SiguiElement, cleanupMachine, findRoot, markComponent, setupMachine } from "./shared.js";

/**
 * Read the tab value from an element, checking both data-value and value attributes.
 * @param {Element} el
 * @returns {string}
 */
function readValue(el) {
  return el.getAttribute("data-value") || el.getAttribute("value") || "";
}

/**
 * SiguiTabsRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiTabsRoot extends SiguiElement {
  static observedAttributes = ["value", "default-value"];

  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    keyboard: "tabs",
    controlMode: "dual",
    valueAttr: "value",
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "tabs-root");
    setupMachine(this, tabsMachine, "tabsMachine");
    // Defer initial render to after children are connected
    queueMicrotask(() => {
      if (!this.hasAttribute("value")) {
        const defaultVal = this.getAttribute("default-value");
        if (defaultVal) {
          this.setAttribute("value", defaultVal);
          return; // attributeChangedCallback will call _render
        }
        const first = this.querySelector("[data-sigui-component='tabs-trigger']");
        const firstVal = first ? readValue(first) : "";
        if (firstVal) {
          this.setAttribute("value", firstVal);
          return;
        }
      }
      this._render();
    });
  }

  disconnectedCallback() {
    cleanupMachine(this);
    super.disconnectedCallback();
  }

  attributeChangedCallback() {
    if (this.isConnected) this._render();
  }

  _render() {
    const value = this.getAttribute("value") || "";
    this.dataset.value = value;
    this.querySelectorAll("[data-sigui-component='tabs-trigger']").forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      const selected = readValue(el) === value;
      el.setAttribute("aria-selected", String(selected));
      el.setAttribute("data-state", selected ? "active" : "inactive");
    });
    this.querySelectorAll("[data-sigui-component='tabs-content']").forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      const active = readValue(el) === value;
      el.hidden = !active;
    });
  }
}

/**
 * SiguiTabsList custom element class.
 * @extends {SiguiElement}
 */
export class SiguiTabsList extends SiguiElement {
  static observedAttributes = ["variant","justify"];

  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "tablist" },
    keyboard: "tabs",
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "tabs-list");
    this.setAttribute("role", "tablist");
    this.ensureClass("sg-tabs-list");
    const variant = this.getAttribute("variant");
    if (variant) this.dataset.variant = variant;
    const justify = this.getAttribute("justify");
    if (justify) this.dataset.justify = justify;
    this._root = findRoot(this, "tabs-root");
    if (this.dataset.siguiBound !== "1") {
      this.dataset.siguiBound = "1";
      this.on(this, "keydown", /** @param {KeyboardEvent} e */ (e) => {
        const triggers = /** @type {HTMLElement[]} */ (
          Array.from(this.querySelectorAll("[data-sigui-component='tabs-trigger']:not([disabled])"))
        );
        if (!triggers.length) return;
        const current = triggers.findIndex(t => t.getAttribute("aria-selected") === "true");
        let next = -1;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          next = current < triggers.length - 1 ? current + 1 : 0;
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          next = current > 0 ? current - 1 : triggers.length - 1;
        } else if (e.key === "Home") {
          e.preventDefault();
          next = 0;
        } else if (e.key === "End") {
          e.preventDefault();
          next = triggers.length - 1;
        }
        if (next >= 0 && triggers[next]) {
          const val = readValue(triggers[next]);
          if (val && this._root) this._root.setAttribute("value", val);
          triggers[next].focus();
        }
      });
    }
  }

  attributeChangedCallback() {
    const variant = this.getAttribute("variant");
    if (variant) this.dataset.variant = variant;
    else delete this.dataset.variant;
    const justify = this.getAttribute("justify");
    if (justify) this.dataset.justify = justify;
    else delete this.dataset.justify;
  }
}

/**
 * SiguiTabsTrigger custom element class.
 * @extends {SiguiElement}
 */
export class SiguiTabsTrigger extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "tab" },
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "tabs-trigger");
    this.ensureClass("sg-tabs-trigger");
    this._root = findRoot(this, "tabs-root");
    this.setAttribute("role", "tab");
    // Set tabindex based on current selection
    const rootVal = this._root?.getAttribute("value") || "";
    const myVal = readValue(this);
    this.tabIndex = myVal === rootVal ? 0 : -1;
    if (this.dataset.siguiBound !== "1") {
      this.dataset.siguiBound = "1";
      this.on(this, "click", () => {
        if (this.hasAttribute("disabled")) return;
        const value = readValue(this);
        if (!value) return;
        this._root?.setAttribute("value", value);
      });
    }
    // Notify root to re-render now that this child is connected
    if ((/** @type {any} */ (this._root))?._render) /** @type {any} */ (this._root)._render();
  }
}

/**
 * SiguiTabsContent custom element class.
 * @extends {SiguiElement}
 */
export class SiguiTabsContent extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "tabpanel" },
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "tabs-content");
    this.ensureClass("sg-tabs-content");
    this.setAttribute("role", "tabpanel");
    // Hide by default until root renders
    const root = findRoot(this, "tabs-root");
    const rootVal = root?.getAttribute("value") || "";
    const myVal = readValue(this);
    this.hidden = myVal !== rootVal;
    // Notify root to re-render
    if ((/** @type {any} */ (root))?._render) /** @type {any} */ (root)._render();
  }
}
