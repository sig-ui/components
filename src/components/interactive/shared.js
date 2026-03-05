// @ts-check

/**
 * interactive / shared module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../lib/base-element.js";
import { isSiguiFeatureEnabled } from "../../lib/feature-flags.js";
import { useMachine } from "../../lib/use-machine.js";

/** @typedef {(string | number | boolean | null | undefined | string[])} MachineContextValue */
/** @typedef {Record<string, MachineContextValue>} MachineContext */
/** @typedef {{ state: string, send: (event: string, payload?: MachineContextValue) => void, context?: MachineContext }} MachineInstanceLike */
/** @typedef {{ initial: string, context: MachineContext, states: Record<string, { on?: Record<string, string | { target: string, guard?: string }>, entry?: string[], exit?: string[] }>, actions?: Record<string, (context: MachineContext, payload?: MachineContextValue) => Partial<MachineContext> | void>, guards?: Record<string, (context: MachineContext, payload?: MachineContextValue) => boolean> }} MachineDefinitionLike */

/**
 * Ensure an internal control element exists and remains the first child.
 *
 * Looks for an element matching `selector` first (the fully-stamped version
 * with `data-sigui-part`). If not found, falls back to a direct-child element
 * of the same tag name – this adopts server-rendered controls (e.g. a Phoenix
 * `<button>` that lacks `data-sigui-part`) instead of creating a duplicate.
 *
 * @param {HTMLElement} host
 * @param {string} selector
 * @param {() => HTMLElement} create
 * @returns {HTMLElement}
 */
export function ensureInternalControl(host, selector, create) {
  const existing = host.querySelector(selector);
  if (existing) return /** @type {HTMLElement} */ (existing);
  // Fallback: adopt a server-rendered direct child of the same tag.
  const sample = create();
  const tag = sample.tagName.toLowerCase();
  const serverRendered = host.querySelector(`:scope > ${tag}`);
  if (serverRendered) return /** @type {HTMLElement} */ (serverRendered);
  host.prepend(sample);
  return sample;
}

/**
 * @param {Element | null} node
 * @returns {node is HTMLElement}
 */
export function isHTMLElement(node) {
  return !!node && node instanceof HTMLElement;
}

/**
 * @param {HTMLElement} host
 * @param {string} componentKey
 */
export function markComponent(host, componentKey) {
  host.ensureClass(`sg-${componentKey}`);
  host.dataset.siguiComponent = componentKey;
}

/**
 * @param {HTMLElement} host
 * @param {string} rootKey
 * @returns {HTMLElement | null}
 */
export function findRoot(host, rootKey) {
  return /** @type {HTMLElement | null} */ (host.closest(`[data-sigui-component='${rootKey}']`));
}

/**
 * @param {SiguiElement & { _machine?: MachineInstanceLike; _machineSubscription?: (() => void) | null; dataset: DOMStringMap }} host
 * @param {MachineDefinitionLike} definition
 * @param {keyof import("../../lib/feature-flags.js").FeatureFlags} [featureFlag]
 */
export function setupMachine(host, definition, featureFlag) {
  if (featureFlag && !isSiguiFeatureEnabled(featureFlag)) return;
  if (host._machine) return;
  const { machine, unsubscribe } = useMachine(definition, (state, context) => {
    host.dataset.state = state;
    host.setAttribute("data-state", state);
    if (context && typeof context === "object") {
      if ("activeTab" in context && context.activeTab != null) host.dataset.activeTab = String(context.activeTab);
      if ("selectedValue" in context && context.selectedValue != null) host.dataset.selectedValue = String(context.selectedValue);
      if ("focusedIndex" in context && context.focusedIndex != null) host.dataset.focusedIndex = String(context.focusedIndex);
      if ("openPanels" in context && Array.isArray(context.openPanels)) host.dataset.openPanels = context.openPanels.join(",");
    }
  });
  host._machine = machine;
  host._machineSubscription = unsubscribe;
  // Respect server-rendered data-state if present (non-destructive hydration).
  if (!host.dataset.state) host.dataset.state = machine.state;
}

/**
 * @param {SiguiElement & { _machine?: MachineInstanceLike }} host
 */
export function syncOpenMachine(host) {
  if (!host._machine) return;
  if (host.hasAttribute("open")) {
    if (["closed", "idle"].includes(host._machine.state)) host._machine.send("OPEN");
    if (["opening", "waiting", "entering"].includes(host._machine.state)) host._machine.send("ANIMATION_END");
    if (host._machine.state === "open") return;
    if (host._machine.state === "visible") return;
  } else {
    if (["open", "visible"].includes(host._machine.state)) host._machine.send("CLOSE");
    if (["closing", "hiding", "exiting"].includes(host._machine.state)) host._machine.send("ANIMATION_END");
  }
}

/**
 * @param {SiguiElement & { _machineSubscription?: (() => void) | null }} host
 */
export function cleanupMachine(host) {
  host._machineSubscription?.();
  host._machineSubscription = null;
}

/** @param {string} prefix */
export function uniqueId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * OpenableRoot custom element class.
 * @extends {SiguiElement}
 */
export class OpenableRoot extends SiguiElement {
  static observedAttributes = ["open"];

  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "sigui:toggle", detail: { open: "boolean" }, bubbles: true }],
    controlMode: "controlled",
    valueAttr: "open",
  });

  /**
   * @param {string} key
   * @param {MachineDefinitionLike} machine
   * @param {keyof import("../../lib/feature-flags.js").FeatureFlags} [featureFlag]
   */
  initOpenable(key, machine, featureFlag) {
    markComponent(this, key);
    setupMachine(this, machine, featureFlag);
    syncOpenMachine(this);
    this.watchHtmxSwap(() => {
      this.removeAttribute("open");
      cleanupMachine(this);
    });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    cleanupMachine(this);
    super.disconnectedCallback();
  }

  attributeChangedCallback() {
    syncOpenMachine(this);
    this.dispatchEvent(new CustomEvent("sigui:toggle", { bubbles: true, detail: { open: this.hasAttribute("open") } }));
  }

  open() {
    this.setAttribute("open", "");
  }

  close() {
    this.removeAttribute("open");
  }
}

/**
 * OpenTrigger custom element class.
 * @extends {SiguiElement}
 */
export class OpenTrigger extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "button" },
  });

  /** @param {string} key @param {string} rootKey */
  initTrigger(key, rootKey) {
    markComponent(this, key);
    this.dataset.siguiParent = rootKey;
    this._root = findRoot(this, rootKey);
    const control = ensureInternalControl(this, "button[data-sigui-part='control']", () => document.createElement("button"));
    if (!(control instanceof HTMLButtonElement)) return;
    control.type = "button";
    control.dataset.siguiPart = "control";
    if (!control.textContent?.trim()) control.textContent = this.getAttribute("label") || "Toggle";
    if (control.dataset.siguiBound !== "1") {
      control.dataset.siguiBound = "1";
      this.on(control, "click", () => {
        if (!isHTMLElement(this._root)) return;
        if (this._root.hasAttribute("open")) this._root.removeAttribute("open");
        else this._root.setAttribute("open", "");
      });
    }
  }
}

/**
 * PanelContent custom element class.
 * @extends {SiguiElement}
 */
export class PanelContent extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "region" },
  });

  /** @param {string} key @param {string} rootKey @param {string} [role] */
  initPanel(key, rootKey, role = "region") {
    markComponent(this, key);
    this.dataset.siguiParent = rootKey;
    this._root = findRoot(this, rootKey);
    this._role = role;
    this._render();
    if (isHTMLElement(this._root)) {
      this.on(this._root, "sigui:toggle", () => this._render());
    }
  }

  _render() {
    const panel = ensureInternalControl(this, "[data-sigui-part='panel']", () => document.createElement("div"));
    panel.dataset.siguiPart = "panel";
    panel.setAttribute("role", this._role || "region");
    const visible = this.hasAttribute("open") || (isHTMLElement(this._root) && this._root.hasAttribute("open"));
    panel.hidden = !visible;
    this.hidden = !visible;
  }
}

/**
 * CloseButton custom element class.
 * @extends {SiguiElement}
 */
export class CloseButton extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "button" },
  });

  /** @param {string} key @param {string} rootKey */
  initClose(key, rootKey) {
    markComponent(this, key);
    this.dataset.siguiParent = rootKey;
    this._root = findRoot(this, rootKey);
    const control = ensureInternalControl(this, "button[data-sigui-part='control']", () => document.createElement("button"));
    if (!(control instanceof HTMLButtonElement)) return;
    control.type = "button";
    control.dataset.siguiPart = "control";
    if (!control.textContent?.trim()) control.textContent = this.getAttribute("label") || "Close";
    if (control.dataset.siguiBound !== "1") {
      control.dataset.siguiBound = "1";
      this.on(control, "click", () => this._root?.removeAttribute("open"));
    }
  }
}

/**
 * TitlePart custom element class.
 * @extends {SiguiElement}
 */
export class TitlePart extends SiguiElement {
  /** @param {string} key @param {string} prefix */
  initTitle(key, prefix) {
    markComponent(this, key);
    if (!this.id) this.id = uniqueId(prefix);
  }
}

export { SiguiElement };
