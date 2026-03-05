// @ts-check

/**
 * interactive / tooltip module for SigUI web components.
 * @module
 */
import { tooltipMachine } from "@sig-ui/core/machines";
import {
  OpenableRoot,
  PanelContent,
  SiguiElement,
  ensureInternalControl,
  findRoot,
  markComponent,
} from "./shared.js";

/**
 * SiguiTooltipRoot custom element class.
 * @extends {OpenableRoot}
 */
export class SiguiTooltipRoot extends OpenableRoot {
  connectedCallback() {
    super.connectedCallback();
    this.initOpenable("tooltip-root", tooltipMachine, "tooltipMachine");
  }
}

/**
 * SiguiTooltipTrigger custom element class.
 * @extends {SiguiElement}
 */
export class SiguiTooltipTrigger extends SiguiElement {
  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "tooltip-trigger");
    this.dataset.siguiParent = "tooltip-root";
    this._root = findRoot(this, "tooltip-root");
    const control = ensureInternalControl(this, "[data-sigui-part='control']", () => document.createElement("span"));
    control.dataset.siguiPart = "control";
    control.tabIndex = 0;
    if (control.dataset.siguiBound !== "1") {
      control.dataset.siguiBound = "1";
      this.on(control, "pointerenter", () => this._root?.setAttribute("open", ""));
      this.on(control, "focus", () => this._root?.setAttribute("open", ""));
      this.on(control, "pointerleave", () => this._root?.removeAttribute("open"));
      this.on(control, "blur", () => this._root?.removeAttribute("open"));
    }
  }
}

/**
 * SiguiTooltipContent custom element class.
 * @extends {PanelContent}
 */
export class SiguiTooltipContent extends PanelContent {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "tooltip" },
  });

  connectedCallback() {
    super.connectedCallback();
    this.initPanel("tooltip-content", "tooltip-root", "tooltip");
  }
}
