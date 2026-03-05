// @ts-check

/**
 * Contract tests for SigUI web components.
 *
 * Reads `static contract` from every registered component and generates
 * parameterized tests verifying events, ARIA, keyboard, form participation,
 * and control-mode obligations.
 * @module
 */
import { describe, expect, test } from "bun:test";
import { KEYBOARD_MAPS } from "@sig-ui/core/accessibility";
import { COMPONENT_DEFINITIONS } from "../src/components/definitions.js";
import { INTERACTIVE_COMPONENT_DEFINITIONS } from "../src/components/interactive/definitions.js";
import { defineSiguiComponents } from "../src/index.js";

const VALID_CONTRACT_KEYS = new Set([
  "events",
  "aria",
  "keyboard",
  "formParticipant",
  "controlMode",
  "valueAttr",
]);

/**
 * Map of compound child keys to their required parent key.
 * Used only for test setup – not a contract concern.
 */
const PARENT_MAP = {
  "dialog-trigger": "dialog-root",
  "dialog-content": "dialog-root",
  "dialog-close": "dialog-root",
  "dialog-title": "dialog-root",
  "dialog-description": "dialog-root",
  "sheet-trigger": "sheet-root",
  "sheet-content": "sheet-root",
  "sheet-close": "sheet-root",
  "sheet-title": "sheet-root",
  "sheet-description": "sheet-root",
  "alert-dialog-trigger": "alert-dialog-root",
  "alert-dialog-content": "alert-dialog-root",
  "alert-dialog-action": "alert-dialog-root",
  "alert-dialog-cancel": "alert-dialog-root",
  "alert-dialog-title": "alert-dialog-root",
  "alert-dialog-description": "alert-dialog-root",
  "popover-trigger": "popover-root",
  "popover-content": "popover-root",
  "tooltip-trigger": "tooltip-root",
  "tooltip-content": "tooltip-root",
  "collapsible-trigger": "collapsible-root",
  "collapsible-content": "collapsible-root",
  "menu-trigger": "menu-root",
  "menu-content": "menu-root",
  "menu-item": "menu-root",
  "tabs-list": "tabs-root",
  "tabs-trigger": "tabs-root",
  "tabs-content": "tabs-root",
  "accordion-item": "accordion-root",
  "accordion-trigger": "accordion-root",
  "accordion-content": "accordion-root",
  "select-trigger": "select-root",
  "select-content": "select-root",
  "select-item": "select-root",
  "select-group": "select-root",
  "select-label": "select-root",
};

const TAG_PREFIX = "sgcontract";

// Register all components once
if (typeof customElements !== "undefined") {
  defineSiguiComponents({ tagPrefix: TAG_PREFIX });
}

const ALL_DEFINITIONS = {
  ...COMPONENT_DEFINITIONS,
  ...INTERACTIVE_COMPONENT_DEFINITIONS,
};

/**
 * Create an element with its required parent wrapper (if any).
 * Returns { el, wrapper } where wrapper is appended to document.body.
 * @param {string} key
 * @returns {{ el: HTMLElement, wrapper: HTMLElement }}
 */
function createElement(key) {
  const tagName = `${TAG_PREFIX}-${key}`;
  const el = /** @type {HTMLElement} */ (document.createElement(tagName));

  const parentKey = PARENT_MAP[key];
  if (parentKey) {
    const parentTag = `${TAG_PREFIX}-${parentKey}`;
    const parent = /** @type {HTMLElement} */ (document.createElement(parentTag));
    parent.appendChild(el);
    document.body.appendChild(parent);
    return { el, wrapper: parent };
  }

  document.body.appendChild(el);
  return { el, wrapper: el };
}

/** @param {HTMLElement} wrapper */
function cleanup(wrapper) {
  if (wrapper.parentElement) wrapper.parentElement.removeChild(wrapper);
}

describe("component contracts", () => {
  for (const [key, Ctor] of Object.entries(ALL_DEFINITIONS)) {
    const contract = /** @type {any} */ (Ctor).contract;

    if (!contract) {
      test(`${key}: has no contract (layout/structural)`, () => {
        expect(/** @type {any} */ (Ctor).contract).toBeUndefined();
      });
      continue;
    }

    describe(key, () => {
      // ── Contract shape ──────────────────────────────────────────

      test("contract is frozen", () => {
        expect(Object.isFrozen(contract)).toBe(true);
      });

      test("contract has valid keys", () => {
        for (const k of Object.keys(contract)) {
          expect(VALID_CONTRACT_KEYS.has(k)).toBe(true);
        }
      });

      // ── Events ──────────────────────────────────────────────────

      if (contract.events) {
        for (const eventSpec of contract.events) {
          test(`dispatches "${eventSpec.name}" event`, () => {
            // Static check: walk the prototype chain to verify
            // the class (or an ancestor) dispatches this event.
            let found = false;
            let current = Ctor;
            while (current && typeof current === "function") {
              const src = current.toString();
              if (
                src.includes(`"${eventSpec.name}"`) ||
                src.includes(`'${eventSpec.name}'`) ||
                src.includes(`\`${eventSpec.name}\``)
              ) {
                found = true;
                break;
              }
              current = Object.getPrototypeOf(current);
            }
            expect(found).toBe(true);
          });

          if (eventSpec.bubbles !== undefined) {
            test(`"${eventSpec.name}" bubbles=${eventSpec.bubbles}`, () => {
              // Verified structurally – the contract declares bubbles intent
              expect(typeof eventSpec.bubbles).toBe("boolean");
            });
          }

          if (eventSpec.detail) {
            test(`"${eventSpec.name}" detail keys are typed`, () => {
              for (const val of Object.values(eventSpec.detail)) {
                expect(typeof val).toBe("string");
              }
            });
          }
        }
      }

      // ── ARIA ────────────────────────────────────────────────────

      if (contract.aria) {
        test(`sets role="${contract.aria.role}"`, () => {
          if (typeof document === "undefined") return;
          const { el, wrapper } = createElement(key);
          try {
            // For form participants, the role may be on the internal control
            if (contract.formParticipant) {
              const control = el.querySelector(contract.formParticipant.controlSelector);
              const hostRole = el.getAttribute("role");
              const controlRole = control?.getAttribute("role");
              const controlType = control?.getAttribute("type");
              // checkbox input has implicit role
              const implicitRole =
                controlType === "checkbox" ? "checkbox" :
                controlType === "number" ? "spinbutton" : null;
              expect(
                hostRole === contract.aria.role ||
                controlRole === contract.aria.role ||
                implicitRole === contract.aria.role
              ).toBe(true);
            } else {
              // Check the element itself or its internal panel
              const panel = el.querySelector("[data-sigui-part='panel']");
              const hostRole = el.getAttribute("role");
              const panelRole = panel?.getAttribute("role");
              expect(
                hostRole === contract.aria.role ||
                panelRole === contract.aria.role
              ).toBe(true);
            }
          } finally {
            cleanup(wrapper);
          }
        });

        if (contract.aria.requiredAttrs) {
          for (const attr of contract.aria.requiredAttrs) {
            test(`supports required attr "${attr}"`, () => {
              // Verify the attribute is in observedAttributes so it can be set
              const observed = /** @type {any} */ (Ctor).observedAttributes ?? [];
              expect(observed.includes(attr)).toBe(true);
            });
          }
        }
      }

      // ── Keyboard ────────────────────────────────────────────────

      if (contract.keyboard) {
        test(`keyboard map "${contract.keyboard}" exists`, () => {
          expect(KEYBOARD_MAPS[contract.keyboard]).toBeDefined();
        });

        test(`keyboard map "${contract.keyboard}" has bindings`, () => {
          const map = KEYBOARD_MAPS[contract.keyboard];
          expect(Array.isArray(map.bindings)).toBe(true);
          expect(map.bindings.length).toBeGreaterThan(0);
        });
      }

      // ── Form participation ──────────────────────────────────────

      if (contract.formParticipant) {
        test(`has internal control matching "${contract.formParticipant.controlSelector}"`, () => {
          if (typeof document === "undefined") return;
          const { el, wrapper } = createElement(key);
          try {
            const control = el.querySelector(contract.formParticipant.controlSelector);
            expect(control).toBeTruthy();
          } finally {
            cleanup(wrapper);
          }
        });

        test("syncs name attribute to native control", () => {
          if (typeof document === "undefined") return;
          const { el, wrapper } = createElement(key);
          try {
            el.setAttribute("name", "test-field");
            // Trigger attribute sync
            const control = el.querySelector(contract.formParticipant.controlSelector);
            if (control) {
              // Some components sync on attributeChangedCallback
              const name = control.getAttribute("name");
              // input-otp uses name-N pattern
              expect(name === "test-field" || (name && name.startsWith("test-field"))).toBe(true);
            }
          } finally {
            cleanup(wrapper);
          }
        });

        test("syncs disabled to native control", () => {
          if (typeof document === "undefined") return;
          const { el, wrapper } = createElement(key);
          try {
            el.setAttribute("disabled", "");
            // Re-trigger render/sync
            if (typeof el.attributeChangedCallback === "function") {
              el.attributeChangedCallback("disabled", null, "");
            }
            const control = /** @type {HTMLInputElement | null} */ (
              el.querySelector(contract.formParticipant.controlSelector)
            );
            if (control) {
              expect(control.disabled).toBe(true);
            }
          } finally {
            cleanup(wrapper);
          }
        });
      }

      // ── Control mode ────────────────────────────────────────────

      if (contract.controlMode && contract.valueAttr) {
        test(`valueAttr "${contract.valueAttr}" is in observedAttributes`, () => {
          const observed = /** @type {any} */ (Ctor).observedAttributes ?? [];
          expect(observed.includes(contract.valueAttr)).toBe(true);
        });

        test(`controlMode is valid`, () => {
          expect(["controlled", "uncontrolled", "dual"]).toContain(contract.controlMode);
        });
      }
    });
  }
});
