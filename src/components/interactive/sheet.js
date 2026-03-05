// @ts-check

/**
 * interactive / sheet module for SigUI web components.
 * @module
 */
import { sheetMachine } from "@sig-ui/core/machines";
import { CloseButton, OpenableRoot, OpenTrigger, PanelContent, TitlePart } from "./shared.js";

/**
 * SiguiSheetRoot custom element class.
 * @extends {OpenableRoot}
 */
export class SiguiSheetRoot extends OpenableRoot {
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
    this.initOpenable("sheet-root", sheetMachine, "sheetMachine");
  }
}

/**
 * SiguiSheetTrigger custom element class.
 * @extends {OpenTrigger}
 */
export class SiguiSheetTrigger extends OpenTrigger {
  connectedCallback() {
    super.connectedCallback();
    this.initTrigger("sheet-trigger", "sheet-root");
  }
}

/**
 * SiguiSheetContent custom element class.
 * @extends {PanelContent}
 */
export class SiguiSheetContent extends PanelContent {
  connectedCallback() {
    super.connectedCallback();
    this.initPanel("sheet-content", "sheet-root", "dialog");
  }
}

/**
 * SiguiSheetClose custom element class.
 * @extends {CloseButton}
 */
export class SiguiSheetClose extends CloseButton {
  connectedCallback() {
    super.connectedCallback();
    this.initClose("sheet-close", "sheet-root");
  }
}

/**
 * SiguiSheetTitle custom element class.
 * @extends {TitlePart}
 */
export class SiguiSheetTitle extends TitlePart {
  connectedCallback() {
    super.connectedCallback();
    this.initTitle("sheet-title", "sg-sheet-title");
  }
}

/**
 * SiguiSheetDescription custom element class.
 * @extends {TitlePart}
 */
export class SiguiSheetDescription extends TitlePart {
  connectedCallback() {
    super.connectedCallback();
    this.initTitle("sheet-description", "sg-sheet-desc");
  }
}
