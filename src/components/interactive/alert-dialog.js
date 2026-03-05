// @ts-check

/**
 * interactive / alert-dialog module for SigUI web components.
 * @module
 */
import { alertDialogMachine } from "@sig-ui/core/machines";
import { CloseButton, OpenableRoot, OpenTrigger, PanelContent, TitlePart } from "./shared.js";

/**
 * SiguiAlertDialogRoot custom element class.
 * @extends {OpenableRoot}
 */
export class SiguiAlertDialogRoot extends OpenableRoot {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "sigui:toggle", detail: { open: "boolean" }, bubbles: true }],
    aria: { role: "alertdialog" },
    controlMode: "controlled",
    valueAttr: "open",
  });

  connectedCallback() {
    super.connectedCallback();
    const def = { ...alertDialogMachine, context: { ...alertDialogMachine.context, requiresAction: false } };
    this.initOpenable("alert-dialog-root", def, "alertDialogMachine");
  }
}

/**
 * SiguiAlertDialogTrigger custom element class.
 * @extends {OpenTrigger}
 */
export class SiguiAlertDialogTrigger extends OpenTrigger {
  connectedCallback() {
    super.connectedCallback();
    this.initTrigger("alert-dialog-trigger", "alert-dialog-root");
  }
}

/**
 * SiguiAlertDialogContent custom element class.
 * @extends {PanelContent}
 */
export class SiguiAlertDialogContent extends PanelContent {
  connectedCallback() {
    super.connectedCallback();
    this.initPanel("alert-dialog-content", "alert-dialog-root", "alertdialog");
  }
}

/**
 * SiguiAlertDialogAction custom element class.
 * @extends {CloseButton}
 */
export class SiguiAlertDialogAction extends CloseButton {
  connectedCallback() {
    super.connectedCallback();
    this.initClose("alert-dialog-action", "alert-dialog-root");
  }
}

/**
 * SiguiAlertDialogCancel custom element class.
 * @extends {CloseButton}
 */
export class SiguiAlertDialogCancel extends CloseButton {
  connectedCallback() {
    super.connectedCallback();
    this.initClose("alert-dialog-cancel", "alert-dialog-root");
  }
}

/**
 * SiguiAlertDialogTitle custom element class.
 * @extends {TitlePart}
 */
export class SiguiAlertDialogTitle extends TitlePart {
  connectedCallback() {
    super.connectedCallback();
    this.initTitle("alert-dialog-title", "sg-alert-title");
  }
}

/**
 * SiguiAlertDialogDescription custom element class.
 * @extends {TitlePart}
 */
export class SiguiAlertDialogDescription extends TitlePart {
  connectedCallback() {
    super.connectedCallback();
    this.initTitle("alert-dialog-description", "sg-alert-desc");
  }
}
