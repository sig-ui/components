// @ts-check

/**
 * interactive / toast module for SigUI web components.
 * @module
 */
import { toastMachine } from "@sig-ui/core/machines";
import { SiguiElement, cleanupMachine, markComponent, setupMachine } from "./shared.js";

/**
 * SiguiToastProvider custom element class.
 * @extends {SiguiElement}
 */
export class SiguiToastProvider extends SiguiElement {
  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "toast-provider");
    setupMachine(this, toastMachine, "toastMachine");
  }

  disconnectedCallback() {
    cleanupMachine(this);
    super.disconnectedCallback();
  }
}

/**
 * SiguiToast custom element class.
 * @extends {SiguiElement}
 */
export class SiguiToast extends SiguiElement {
  static observedAttributes = ["open", "duration"];
  /** @type {any} */
  _machine = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  _timer = null;

  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "status" },
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "toast");
    setupMachine(this, toastMachine, "toastMachine");
    this._sync();
  }

  disconnectedCallback() {
    if (this._timer) clearTimeout(this._timer);
    cleanupMachine(this);
    super.disconnectedCallback();
  }

  attributeChangedCallback() {
    this._sync();
  }

  _sync() {
    if (!this._machine) return;
    if (this.hasAttribute("open")) {
      this._machine.send("SHOW");
      if (this._machine.state === "entering") this._machine.send("ANIMATION_END");
      if (this._timer) clearTimeout(this._timer);
      const duration = Number(this.getAttribute("duration") || "5000");
      this._timer = setTimeout(() => {
        this._machine?.send("TIMEOUT");
        if (this._machine?.state === "exiting") this._machine.send("ANIMATION_END");
        this.removeAttribute("open");
      }, Number.isFinite(duration) && duration > 0 ? duration : 5000);
    }
  }
}
