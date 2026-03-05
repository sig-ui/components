// @ts-check

/**
 * interactive / dialog module for SigUI web components.
 * @module
 */
import { dialogMachine } from "@sig-ui/core/machines";
import { CloseButton, OpenableRoot, OpenTrigger, PanelContent, TitlePart } from "./shared.js";

/**
 * SiguiDialogRoot custom element class.
 * @extends {OpenableRoot}
 */
export class SiguiDialogRoot extends OpenableRoot {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "sigui:toggle", detail: { open: "boolean" }, bubbles: true }],
    aria: { role: "dialog" },
    keyboard: "dialog",
    controlMode: "controlled",
    valueAttr: "open",
  });

  connectedCallback() {
    super.connectedCallback();
    this.initOpenable("dialog-root", dialogMachine, "dialogMachine");
  }
}

/**
 * SiguiDialogTrigger custom element class.
 * @extends {OpenTrigger}
 */
export class SiguiDialogTrigger extends OpenTrigger {
  connectedCallback() {
    super.connectedCallback();
    this.initTrigger("dialog-trigger", "dialog-root");
  }
}

/**
 * SiguiDialogContent custom element class.
 * @extends {PanelContent}
 */
export class SiguiDialogContent extends PanelContent {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "dialog" },
  });

  connectedCallback() {
    super.connectedCallback();
    this.initPanel("dialog-content", "dialog-root", "dialog");
  }
}

/**
 * SiguiDialogClose custom element class.
 * @extends {CloseButton}
 */
export class SiguiDialogClose extends CloseButton {
  connectedCallback() {
    super.connectedCallback();
    this.initClose("dialog-close", "dialog-root");
  }
}

/**
 * SiguiDialogTitle custom element class.
 * @extends {TitlePart}
 */
export class SiguiDialogTitle extends TitlePart {
  connectedCallback() {
    super.connectedCallback();
    this.initTitle("dialog-title", "sg-dialog-title");
  }
}

/**
 * SiguiDialogDescription custom element class.
 * @extends {TitlePart}
 */
export class SiguiDialogDescription extends TitlePart {
  connectedCallback() {
    super.connectedCallback();
    this.initTitle("dialog-description", "sg-dialog-desc");
  }
}
