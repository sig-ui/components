// @ts-check

/**
 * interactive / accordion module for SigUI web components.
 * @module
 */
import { accordionMachine } from "@sig-ui/core/machines";
import {
  SiguiElement,
  cleanupMachine,
  findRoot,
  isHTMLElement,
  markComponent,
  setupMachine,
  uniqueId,
} from "./shared.js";

/**
 * SiguiAccordionRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiAccordionRoot extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    keyboard: "accordion",
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "accordion-root");
    setupMachine(this, accordionMachine, "accordionMachine");
    this.dataset.multiple = this.hasAttribute("multiple") ? "true" : "false";
  }

  disconnectedCallback() {
    cleanupMachine(this);
    super.disconnectedCallback();
  }
}

/**
 * SiguiAccordionItem custom element class.
 * @extends {SiguiElement}
 */
export class SiguiAccordionItem extends SiguiElement {
  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "accordion-item");
    this.dataset.siguiParent = "accordion-root";
    if (!this.dataset.value) this.dataset.value = this.getAttribute("value") || uniqueId("sg-acc-item");
  }
}

/**
 * SiguiAccordionTrigger custom element class.
 * @extends {SiguiElement}
 */
export class SiguiAccordionTrigger extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "button" },
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "accordion-trigger");
    this.dataset.siguiParent = "accordion-root";
    this._item = findRoot(this, "accordion-item");
    this._root = findRoot(this, "accordion-root");
    this.tabIndex = 0;
    if (this.dataset.siguiBound !== "1") {
      this.dataset.siguiBound = "1";
      this.on(this, "click", () => {
        if (!isHTMLElement(this._item)) return;
        const open = this._item.hasAttribute("open");
        if (open) this._item.removeAttribute("open");
        else this._item.setAttribute("open", "");
        this._root?._machine?.send("TOGGLE", { panel: this._item.dataset.value });
      });
    }
  }
}

/**
 * SiguiAccordionContent custom element class.
 * @extends {SiguiElement}
 */
export class SiguiAccordionContent extends SiguiElement {
  /** @type {import("../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "region" },
  });

  connectedCallback() {
    super.connectedCallback();
    markComponent(this, "accordion-content");
    this.dataset.siguiParent = "accordion-root";
    this._item = findRoot(this, "accordion-item");
    this._render();
    if (isHTMLElement(this._item)) {
      const observer = new MutationObserver(() => this._render());
      observer.observe(this._item, { attributes: true, attributeFilter: ["open"] });
      this.on(this, "sigui:noop", () => {});
      this._observer = observer;
    }
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    super.disconnectedCallback();
  }

  _render() {
    this.hidden = !(isHTMLElement(this._item) && this._item.hasAttribute("open"));
  }
}
