// @ts-check

/**
 * interactive / popover module for SigUI web components.
 * @module
 */
import { popoverMachine } from "@sig-ui/core/machines";
import { OpenableRoot, OpenTrigger, PanelContent } from "./shared.js";

/**
 * SiguiPopoverRoot custom element class.
 * @extends {OpenableRoot}
 */
export class SiguiPopoverRoot extends OpenableRoot {
  connectedCallback() {
    super.connectedCallback();
    this.initOpenable("popover-root", popoverMachine, "popoverMachine");
  }
}

/**
 * SiguiPopoverTrigger custom element class.
 * @extends {OpenTrigger}
 */
export class SiguiPopoverTrigger extends OpenTrigger {
  connectedCallback() {
    super.connectedCallback();
    this.initTrigger("popover-trigger", "popover-root");
  }
}

/**
 * SiguiPopoverContent custom element class.
 * @extends {PanelContent}
 */
export class SiguiPopoverContent extends PanelContent {
  connectedCallback() {
    super.connectedCallback();
    this.initPanel("popover-content", "popover-root", "dialog");
  }
}
