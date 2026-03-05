// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiDetails extends SiguiElement {
  static observedAttributes = ["open"];
  static componentKey = "details";

  connectedCallback() {
    super.connectedCallback();
    this.syncState();
    this.on(this, "toggle", () => this.syncState());
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    super.attributeChangedCallback(_name, _oldValue, _newValue);
    this.syncState();
  }

  syncState() {
    this.dataset.state = this.hasAttribute("open") ? "open" : "closed";
  }
}
