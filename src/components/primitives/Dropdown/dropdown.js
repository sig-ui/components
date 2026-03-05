// @ts-check

import { SiguiElement } from "../../../lib/base-element.js";

export class SiguiDropdown extends SiguiElement {
  static observedAttributes = ["open"];
  static componentKey = "dropdown";

  connectedCallback() {
    super.connectedCallback();
    this.syncState();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    super.attributeChangedCallback(_name, _oldValue, _newValue);
    this.syncState();
  }

  syncState() {
    this.dataset.state = this.hasAttribute("open") ? "open" : "closed";
  }
}
