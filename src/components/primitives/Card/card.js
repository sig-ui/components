// @ts-check

/**
 * Card / card module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiCard custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCard extends SiguiElement {
  static observedAttributes = ["elevation","padding","size","density"];

  static componentKey = "card";

  syncAttributesToDataset() {
    super.syncAttributesToDataset();
    if (this.dataset.padding === "true") this.dataset.padding = "md";
  }
}

/**
 * SiguiCardHeader custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCardHeader extends SiguiElement {
  static componentKey = "card-header";
}

/**
 * SiguiCardBody custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCardBody extends SiguiElement {
  static componentKey = "card-body";
}

/**
 * SiguiCardFooter custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCardFooter extends SiguiElement {
  static componentKey = "card-footer";
}

/**
 * SiguiCardDescription custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCardDescription extends SiguiElement {
  static componentKey = "card-description";
}

/**
 * SiguiCardAction custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCardAction extends SiguiElement {
  static componentKey = "card-action";
}

/**
 * SiguiCardTitle custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCardTitle extends SiguiElement {
  static observedAttributes = ["as"];

  static componentKey = "card-title";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    aria: { role: "heading" },
  });

  connectedCallback() {
    super.connectedCallback();
    this._syncHeadingLevel();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "as") this._syncHeadingLevel();
  }

  _syncHeadingLevel() {
    const as = (this.getAttribute("as") ?? "h3").toLowerCase();
    const level = as === "h1" ? 1
      : as === "h2" ? 2
        : as === "h4" ? 4
          : as === "h5" ? 5
            : as === "h6" ? 6
              : 3;
    this.setAttribute("role", "heading");
    this.setAttribute("aria-level", String(level));
  }
}
