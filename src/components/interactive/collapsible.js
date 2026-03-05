// @ts-check

/**
 * interactive / collapsible module for SigUI web components.
 * @module
 */
import { collapsibleMachine } from "@sig-ui/core/machines";
import { OpenableRoot, OpenTrigger, PanelContent } from "./shared.js";

/**
 * SiguiCollapsibleRoot custom element class.
 * @extends {OpenableRoot}
 */
export class SiguiCollapsibleRoot extends OpenableRoot {
  connectedCallback() {
    super.connectedCallback();
    this.initOpenable("collapsible-root", collapsibleMachine, "collapsibleMachine");
  }
}

/**
 * SiguiCollapsibleTrigger custom element class.
 * @extends {OpenTrigger}
 */
export class SiguiCollapsibleTrigger extends OpenTrigger {
  connectedCallback() {
    super.connectedCallback();
    this.initTrigger("collapsible-trigger", "collapsible-root");
  }
}

/**
 * SiguiCollapsibleContent custom element class.
 * @extends {PanelContent}
 */
export class SiguiCollapsibleContent extends PanelContent {
  connectedCallback() {
    super.connectedCallback();
    this.initPanel("collapsible-content", "collapsible-root", "region");
  }
}
