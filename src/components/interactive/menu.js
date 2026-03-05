// @ts-check

/**
 * interactive / menu module for SigUI web components.
 * @module
 */
import { menuMachine } from "@sig-ui/core/machines";
import { OpenableRoot, OpenTrigger, PanelContent, SiguiElement, findRoot, markComponent } from "./shared.js";

/**
 * SiguiMenuRoot custom element class.
 * @extends {OpenableRoot}
 */
export class SiguiMenuRoot extends OpenableRoot {
  connectedCallback() {
    super.connectedCallback();
    this.initOpenable("menu-root", menuMachine, "menuMachine");
  }
}

/**
 * SiguiMenuTrigger custom element class.
 * @extends {OpenTrigger}
 */
export class SiguiMenuTrigger extends OpenTrigger {
  connectedCallback() {
    super.connectedCallback();
    this.initTrigger("menu-trigger", "menu-root");
  }
}

/**
 * SiguiMenuContent custom element class.
 * @extends {PanelContent}
 */
export class SiguiMenuContent extends PanelContent {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "menu" },
  });

  connectedCallback() {
    super.connectedCallback();
    this.initPanel("menu-content", "menu-root", "menu");
  }
}

/**
 * SiguiMenuItem custom element class.
 * @extends {SiguiElement}
 */
export class SiguiMenuItem extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "menuitem" },
    keyboard: "menu",
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "menu-item");
    this.dataset.siguiParent = "menu-root";
    this._root = findRoot(this, "menu-root");
    this.tabIndex = 0;
    this.setAttribute("role", "menuitem");
    if (this.dataset.siguiBound !== "1") {
      this.dataset.siguiBound = "1";
      this.on(this, "click", () => this._root?.removeAttribute("open"));
    }
  }
}
