// @ts-nocheck

/**
 * Checkbox / checkbox module for SigUI web components.
 * @module
 */
import { checkboxMachine } from "@sig-ui/core/machines";
import { SiguiElement } from "../../../lib/base-element.js";
import { useMachine } from "../../../lib/use-machine.js";

/**
 * SiguiCheckbox custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCheckbox extends SiguiElement {
  static observedAttributes = ["checked", "indeterminate", "disabled", "required", "name", "value", "aria-label"];

  static componentKey = "checkbox";
  static cssClass = "sg-checkbox-wrapper";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [{ name: "sigui:change", detail: { checked: "boolean", indeterminate: "boolean" }, bubbles: true }],
    aria: { role: "checkbox", requiredAttrs: ["aria-label"] },
    formParticipant: { controlSelector: "input[type='checkbox']" },
    controlMode: "dual",
    valueAttr: "checked",
  });

  connectedCallback() {
    super.connectedCallback();
    this._machineDriven = true;
    this._control = this.ensureControl();
    this.bindControlEvents();
    this.syncNonStateAttrsToControl();
    const machine = this.ensureMachine();
    if (machine) {
      this.dataset.state = machine.state;
      this.setAttribute("data-state", machine.state);
      this.applyMachineState(machine.state);
    }
    this.syncMachineFromHostState();
    this.watchFormReset(() => {
      this.syncMachineFromControlEvent();
    });
  }

  disconnectedCallback() {
    this._machineUnsubscribe?.();
    this._machineUnsubscribe = null;
    this._machine = null;
    super.disconnectedCallback();
  }

  /** @param {string} name */
  attributeChangedCallback(name) {
    super.attributeChangedCallback(name);
    this.syncNonStateAttrsToControl();
    if (name !== "checked" && name !== "indeterminate") return;
    if (this._isApplyingMachineState === true) return;
    this.syncMachineFromHostState();
  }

  /** @returns {HTMLInputElement} */
  ensureControl() {
    const existing = this.querySelector("input[data-sigui-part='control']");
    const direct = this.querySelector(":scope > input[type='checkbox']");
    const control = existing instanceof HTMLInputElement
      ? existing
      : direct instanceof HTMLInputElement
        ? direct
        : document.createElement("input");
    if (!control.parentElement) this.prepend(control);
    control.type = "checkbox";
    control.classList.add("sg-checkbox");
    control.dataset.siguiPart = "control";
    return control;
  }

  bindControlEvents() {
    if (!(this._control instanceof HTMLInputElement)) return;
    if (this._control.dataset.siguiBound === "1") return;
    this._control.dataset.siguiBound = "1";
    this.on(this._control, "change", () => {
      // Native checkboxes do not reliably clear `indeterminate` on user toggle.
      // Normalize to a determinate state before syncing host/machine state.
      if (this._control?.indeterminate === true) {
        this._control.indeterminate = false;
      }
      this.syncMachineFromControlEvent();
      this.dispatchEvent(new CustomEvent("sigui:change", {
        bubbles: true,
        detail: {
          checked: this._control?.checked === true,
          indeterminate: this._control?.indeterminate === true,
        },
      }));
    });
  }

  syncNonStateAttrsToControl() {
    if (!(this._control instanceof HTMLInputElement)) return;
    this._control.disabled = this.hasAttribute("disabled");
    this._control.required = this.hasAttribute("required");
    const name = this.getAttribute("name");
    if (name == null) this._control.removeAttribute("name");
    else this._control.name = name;
    const value = this.getAttribute("value");
    if (value == null) this._control.removeAttribute("value");
    else this._control.value = value;
    const ariaLabel = this.getAttribute("aria-label");
    if (ariaLabel == null) this._control.removeAttribute("aria-label");
    else this._control.setAttribute("aria-label", ariaLabel);
  }

  ensureMachine() {
    if (this._machine) return this._machine;
    const { machine, unsubscribe } = useMachine(checkboxMachine, (state) => {
      this.dataset.state = state;
      this.setAttribute("data-state", state);
      this.applyMachineState(state);
    });
    this._machine = machine;
    this._machineUnsubscribe = unsubscribe;
    return machine;
  }

  /** @param {string} state */
  applyMachineState(state) {
    if (!(this._control instanceof HTMLInputElement)) return;
    this._isApplyingMachineState = true;
    if (state === "indeterminate") {
      this._control.checked = false;
      this._control.indeterminate = true;
      this.setBoolAttr("checked", false);
      this.setBoolAttr("indeterminate", true);
    } else if (state === "checked") {
      this._control.checked = true;
      this._control.indeterminate = false;
      this.setBoolAttr("checked", true);
      this.setBoolAttr("indeterminate", false);
    } else {
      this._control.checked = false;
      this._control.indeterminate = false;
      this.setBoolAttr("checked", false);
      this.setBoolAttr("indeterminate", false);
    }
    this._isApplyingMachineState = false;
  }

  syncMachineFromHostState() {
    const machine = this.ensureMachine();
    if (!machine) return;
    if (this.hasAttribute("indeterminate")) {
      if (machine.state !== "indeterminate") machine.send("SET_INDETERMINATE");
      return;
    }
    if (this.hasAttribute("checked")) {
      if (machine.state !== "checked") machine.send("CHECK");
      return;
    }
    if (machine.state !== "unchecked") machine.send("UNCHECK");
  }

  syncMachineFromControlEvent() {
    const machine = this.ensureMachine();
    if (!machine || !(this._control instanceof HTMLInputElement)) return;
    if (this._control.checked === true) {
      if (machine.state !== "checked") machine.send("CHECK");
      return;
    }
    if (this._control.indeterminate === true) {
      if (machine.state !== "indeterminate") machine.send("SET_INDETERMINATE");
      return;
    }
    if (machine.state !== "unchecked") machine.send("UNCHECK");
  }
}
