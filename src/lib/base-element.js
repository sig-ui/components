// @ts-check

/**
 * SigUI components runtime module for base element.
 * @module
 */
/**
 * @typedef {{ name: string, detail?: Record<string, string>, bubbles?: boolean }} ContractEvent
 * @typedef {{ role: string, requiredAttrs?: string[] }} ContractAria
 * @typedef {{ controlSelector: string }} ContractFormParticipant
 * @typedef {{
 *   events?: ContractEvent[],
 *   aria?: ContractAria,
 *   keyboard?: string,
 *   formParticipant?: ContractFormParticipant,
 *   controlMode?: "controlled" | "uncontrolled" | "dual",
 *   valueAttr?: string,
 * }} SiguiContract
 */

/**
 * Base class for SigUI light-DOM web components.
 *
 * Components render into the host element (no Shadow DOM) so global SigUI
 * CSS layers continue to apply as authored.
 */
const BaseHTMLElement = /** @type {typeof HTMLElement} */ (
  globalThis.HTMLElement ?? class extends EventTarget {}
);

/**
 * SiguiElement custom element class.
 * @extends {BaseHTMLElement}
 */
export class SiguiElement extends BaseHTMLElement {
  constructor() {
    super();
    /** @type {AbortController | null} */
    this._abortController = null;
  }

  connectedCallback() {
    if (!this._abortController) this._abortController = new AbortController();
    const ctor = /** @type {any} */ (this.constructor);
    const key = ctor.componentKey;
    if (key) {
      this.ensureClass(ctor.cssClass ?? `sg-${key}`);
      this.dataset.siguiComponent = key;
      this.syncAttributesToDataset();
      if (this.hasAttribute("disabled")) this.setAttribute("aria-disabled", "true");
    }
  }

  /** @param {string} _name @param {string | null} _oldValue @param {string | null} _newValue */
  attributeChangedCallback(_name, _oldValue, _newValue) {
    this.syncAttributesToDataset();
  }

  /**
   * Reflect observed attributes to `data-*` attributes for CSS targeting.
   * Subclasses may override for custom mapping (e.g. value normalization).
   */
  syncAttributesToDataset() {
    const attrs = /** @type {any} */ (this.constructor).observedAttributes;
    if (!attrs) return;
    for (const attr of attrs) {
      const dataKey = attr.replace(/-([a-z])/g, (/** @type {string} */ _, /** @type {string} */ c) => c.toUpperCase());
      if (!this.hasAttribute(attr)) {
        delete this.dataset[dataKey];
        continue;
      }
      this.dataset[dataKey] = this.getAttribute(attr) ?? "";
    }
  }

  disconnectedCallback() {
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
  }

  /**
   * Listen for the nearest form's `reset` event and re-sync state.
   * Called by form-participating subclasses in their connectedCallback.
   * The browser resets native inputs without firing `change`/`input`, so
   * this callback re-reads the DOM after the reset completes.
   * @param {() => void} onReset
   */
  watchFormReset(onReset) {
    const form = this.closest("form");
    if (!form) return;
    this.on(form, "reset", () => {
      // The browser resets native inputs synchronously during the reset
      // event, but the values aren't updated until after the event handler
      // returns. Schedule the sync for the next microtask.
      queueMicrotask(onReset);
    });
  }

  /**
   * Listen for HTMX `htmx:beforeSwap` and run teardown when a swap
   * targets an ancestor that contains this element.  Allows components
   * with complex visual state (open dialogs, focus traps) to clean up
   * gracefully before HTMX rips out their DOM.
   * @param {() => void} onBeforeSwap
   */
  watchHtmxSwap(onBeforeSwap) {
    if (typeof document === "undefined") return;
    this.on(document.body, "htmx:beforeSwap", /** @param {Event} e */ (e) => {
      const target = /** @type {HTMLElement | undefined} */ (
        /** @type {any} */ (e).detail?.target ?? e.target
      );
      if (target?.contains(this)) onBeforeSwap();
    });
  }

  /**
   * Set a class name once.
   * @param {string} className
   */
  ensureClass(className) {
    if (!this.classList.contains(className)) this.classList.add(className);
  }

  /**
   * Reflect boolean property to attribute.
   * @param {string} attr
   * @param {boolean} value
   */
  setBoolAttr(attr, value) {
    if (value) this.setAttribute(attr, "");
    else this.removeAttribute(attr);
  }

  /**
   * Read boolean attribute.
   * @param {string} attr
   * @returns {boolean}
   */
  getBoolAttr(attr) {
    return this.hasAttribute(attr);
  }

  /**
   * Reflect optional string property to attribute.
   * @param {string} attr
   * @param {string | null | undefined} value
   */
  setStringAttr(attr, value) {
    if (value == null || value === "") this.removeAttribute(attr);
    else this.setAttribute(attr, value);
  }

  /**
   * Read string attribute.
   * @param {string} attr
   * @returns {string | null}
   */
  getStringAttr(attr) {
    return this.getAttribute(attr);
  }

  /**
   * Add event listener bound to component lifecycle.
   * @param {EventTarget} target
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {AddEventListenerOptions | boolean} [options]
   */
  on(target, type, listener, options) {
    if (!this._abortController) this._abortController = new AbortController();
    const merged =
      typeof options === "boolean"
        ? { capture: options, signal: this._abortController.signal }
        : { ...(options ?? {}), signal: this._abortController.signal };
    target.addEventListener(type, listener, merged);
  }
}
