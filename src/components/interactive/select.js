// @ts-check

/**
 * interactive / select module for SigUI web components.
 * @module
 */
import { selectMachine } from "@sig-ui/core/machines";
import {
  OpenableRoot,
  OpenTrigger,
  PanelContent,
  SiguiElement,
  findRoot,
  markComponent,
} from "./shared.js";

/**
 * SiguiSelectRoot custom element class.
 * @extends {OpenableRoot}
 */
export class SiguiSelectRoot extends OpenableRoot {
  static observedAttributes = ["open", "value"];

  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "sigui:toggle", detail: { open: "boolean" }, bubbles: true }],
    aria: { role: "listbox" },
    keyboard: "listbox",
    controlMode: "controlled",
    valueAttr: "value",
  });

  connectedCallback() {
    super.connectedCallback();
    this.initOpenable("select-root", selectMachine, "selectMachine");
    if (!this.hasAttribute("value")) this.setAttribute("value", "");
  }
}

/**
 * SiguiSelectTrigger custom element class.
 * @extends {OpenTrigger}
 */
export class SiguiSelectTrigger extends OpenTrigger {
  connectedCallback() {
    super.connectedCallback();
    this.initTrigger("select-trigger", "select-root");
  }
}

/**
 * SiguiSelectContent custom element class.
 * @extends {PanelContent}
 */
export class SiguiSelectContent extends PanelContent {
  connectedCallback() {
    super.connectedCallback();
    this.initPanel("select-content", "select-root", "listbox");
  }
}

/**
 * SiguiSelectItem custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSelectItem extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "option" },
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "select-item");
    this.dataset.siguiParent = "select-root";
    this._root = findRoot(this, "select-root");
    this.tabIndex = 0;
    this.setAttribute("role", "option");
    if (this.dataset.siguiBound !== "1") {
      this.dataset.siguiBound = "1";
      this.on(this, "click", () => {
        const value = this.getAttribute("value") || this.dataset.value || this.textContent?.trim() || "";
        if (!value) return;
        this._root?.setAttribute("value", value);
        /** @type {any} */ (this._root)?._machine?.send("SELECT", { value });
        this._root?.removeAttribute("open");
      });
    }
  }
}

/**
 * SiguiSelectGroup custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSelectGroup extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "group" },
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "select-group");
    this.dataset.siguiParent = "select-root";
    this.setAttribute("role", "group");
  }
}

/**
 * SiguiSelectLabel custom element class.
 * @extends {SiguiElement}
 */
export class SiguiSelectLabel extends SiguiElement {
  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "select-label");
    this.dataset.siguiParent = "select-root";
  }
}
