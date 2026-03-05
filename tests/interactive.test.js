// @ts-check

/**
 * Repository module for interactive.test.
 * @module
 */
import { describe, expect, test } from "bun:test";
import { defineSiguiComponents } from "../src/index.js";

describe("@sig-ui/components interactive overrides", () => {
  test("button renders internal control element", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const el = document.createElement("sgtest-button");
    document.body.appendChild(el);
    const control = el.querySelector("[data-sigui-part='control']");
    expect(control).toBeTruthy();
    expect(control?.tagName.toLowerCase()).toBe("button");
    document.body.removeChild(el);
  });

  test("card sections attach expected structural classes", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const card = document.createElement("sgtest-card");
    const header = document.createElement("sgtest-card-header");
    const body = document.createElement("sgtest-card-body");
    const footer = document.createElement("sgtest-card-footer");
    const title = document.createElement("sgtest-card-title");
    const description = document.createElement("sgtest-card-description");
    const action = document.createElement("sgtest-card-action");
    header.append(title, description, action);
    card.append(header, body, footer);
    document.body.appendChild(card);

    expect(header.classList.contains("sg-card-header")).toBe(true);
    expect(body.classList.contains("sg-card-body")).toBe(true);
    expect(footer.classList.contains("sg-card-footer")).toBe(true);
    expect(title.classList.contains("sg-card-title")).toBe(true);
    expect(description.classList.contains("sg-card-description")).toBe(true);
    expect(action.classList.contains("sg-card-action")).toBe(true);
    expect(title.getAttribute("role")).toBe("heading");
    expect(title.getAttribute("aria-level")).toBe("3");
    title.setAttribute("as", "h2");
    expect(title.getAttribute("aria-level")).toBe("2");

    document.body.removeChild(card);
  });

  test("checkbox syncs checked state through internal input", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const el = document.createElement("sgtest-checkbox");
    document.body.appendChild(el);
    const input = /** @type {HTMLInputElement | null} */ (el.querySelector("input[data-sigui-part='control']"));
    expect(input).toBeTruthy();
    if (!input) return;
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(el.hasAttribute("checked")).toBe(true);
    document.body.removeChild(el);
  });

  test("checkbox applies pre-connected checked attribute", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const el = document.createElement("sgtest-checkbox");
    el.setAttribute("checked", "");
    document.body.appendChild(el);
    const input = /** @type {HTMLInputElement | null} */ (el.querySelector("input[data-sigui-part='control']"));
    expect(input).toBeTruthy();
    if (!input) return;
    expect(input.checked).toBe(true);
    expect(input.indeterminate).toBe(false);
    document.body.removeChild(el);
  });

  test("checkbox clears indeterminate on user change", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const el = document.createElement("sgtest-checkbox");
    el.setAttribute("indeterminate", "");
    document.body.appendChild(el);
    const input = /** @type {HTMLInputElement | null} */ (el.querySelector("input[data-sigui-part='control']"));
    expect(input).toBeTruthy();
    if (!input) return;
    expect(el.hasAttribute("indeterminate")).toBe(true);
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(el.hasAttribute("indeterminate")).toBe(false);
    expect(el.hasAttribute("checked")).toBe(true);
    document.body.removeChild(el);
  });

  test("checkbox machine flag syncs data-state", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest-machine", featureFlags: { checkboxMachine: true } });
    const el = document.createElement("sgtest-machine-checkbox");
    document.body.appendChild(el);
    const input = /** @type {HTMLInputElement | null} */ (el.querySelector("input[data-sigui-part='control']"));
    expect(input).toBeTruthy();
    if (!input) return;
    expect(el.getAttribute("data-state")).toBe("unchecked");
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(el.getAttribute("data-state")).toBe("checked");
    input.indeterminate = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(el.getAttribute("data-state")).toBe("indeterminate");
    document.body.removeChild(el);
  });

  test("checkbox machine leaves indeterminate when checked becomes true", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest-machine2", featureFlags: { checkboxMachine: true } });
    const el = document.createElement("sgtest-machine2-checkbox");
    el.setAttribute("indeterminate", "");
    document.body.appendChild(el);
    const input = /** @type {HTMLInputElement | null} */ (el.querySelector("input[data-sigui-part='control']"));
    expect(el.getAttribute("data-state")).toBe("indeterminate");
    expect(input).toBeTruthy();
    if (!input) return;
    input.checked = true;
    input.indeterminate = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(el.getAttribute("data-state")).toBe("checked");
    expect(el.hasAttribute("indeterminate")).toBe(false);
    expect(el.hasAttribute("checked")).toBe(true);
    document.body.removeChild(el);
  });

  test("slider and progress render native controls", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const slider = document.createElement("sgtest-slider");
    const progress = document.createElement("sgtest-progress");
    document.body.appendChild(slider);
    document.body.appendChild(progress);
    expect(slider.querySelector("input[type='range']")).toBeTruthy();
    expect(progress.querySelector("progress")).toBeTruthy();
    document.body.removeChild(slider);
    document.body.removeChild(progress);
  });

  test("compound child marks closest parent context", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const root = document.createElement("sgtest-dialog-root");
    const child = document.createElement("sgtest-dialog-trigger");
    root.appendChild(child);
    document.body.appendChild(root);
    expect(child.getAttribute("data-sigui-parent")).toBe("dialog-root");
    document.body.removeChild(root);
  });

  test("dialog trigger/close toggles root open state", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const root = document.createElement("sgtest-dialog-root");
    const trigger = document.createElement("sgtest-dialog-trigger");
    const content = document.createElement("sgtest-dialog-content");
    const close = document.createElement("sgtest-dialog-close");
    root.appendChild(trigger);
    root.appendChild(content);
    content.appendChild(close);
    document.body.appendChild(root);

    const triggerBtn = trigger.querySelector("button[data-sigui-part='control']");
    const closeBtn = close.querySelector("button[data-sigui-part='control']");
    expect(triggerBtn).toBeTruthy();
    expect(closeBtn).toBeTruthy();
    triggerBtn?.dispatchEvent(new Event("click", { bubbles: true }));
    expect(root.hasAttribute("open")).toBe(true);
    closeBtn?.dispatchEvent(new Event("click", { bubbles: true }));
    expect(root.hasAttribute("open")).toBe(false);
    document.body.removeChild(root);
  });

  test("dialog machine feature flag gates machine state sync", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;

    defineSiguiComponents({ tagPrefix: "sgtest-dialogoff", featureFlags: { dialogMachine: false } });
    const offRoot = document.createElement("sgtest-dialogoff-dialog-root");
    const offTrigger = document.createElement("sgtest-dialogoff-dialog-trigger");
    offRoot.appendChild(offTrigger);
    document.body.appendChild(offRoot);
    const offBtn = offTrigger.querySelector("button[data-sigui-part='control']");
    offBtn?.dispatchEvent(new Event("click", { bubbles: true }));
    expect(offRoot.hasAttribute("open")).toBe(true);
    expect(offRoot.getAttribute("data-state")).toBeNull();
    document.body.removeChild(offRoot);

    defineSiguiComponents({ tagPrefix: "sgtest-dialogon", featureFlags: { dialogMachine: true } });
    const onRoot = document.createElement("sgtest-dialogon-dialog-root");
    const onTrigger = document.createElement("sgtest-dialogon-dialog-trigger");
    onRoot.appendChild(onTrigger);
    document.body.appendChild(onRoot);
    const onBtn = onTrigger.querySelector("button[data-sigui-part='control']");
    onBtn?.dispatchEvent(new Event("click", { bubbles: true }));
    expect(onRoot.hasAttribute("open")).toBe(true);
    expect(["open", "opening", "visible"]).toContain(onRoot.getAttribute("data-state"));
    document.body.removeChild(onRoot);
  });

  test("tabs trigger activates matching content", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const root = document.createElement("sgtest-tabs-root");
    const t1 = document.createElement("sgtest-tabs-trigger");
    const t2 = document.createElement("sgtest-tabs-trigger");
    const c1 = document.createElement("sgtest-tabs-content");
    const c2 = document.createElement("sgtest-tabs-content");
    t1.setAttribute("data-value", "a");
    t2.setAttribute("data-value", "b");
    c1.setAttribute("data-value", "a");
    c2.setAttribute("data-value", "b");
    root.append(t1, t2, c1, c2);
    document.body.appendChild(root);
    t2.dispatchEvent(new Event("click", { bubbles: true }));
    expect(root.getAttribute("value")).toBe("b");
    expect(c2.hidden).toBe(false);
    expect(c1.hidden).toBe(true);
    document.body.removeChild(root);
  });

  test("select item sets root value and closes", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const root = document.createElement("sgtest-select-root");
    const content = document.createElement("sgtest-select-content");
    const item = document.createElement("sgtest-select-item");
    item.setAttribute("value", "x");
    root.append(content);
    content.append(item);
    document.body.appendChild(root);
    root.setAttribute("open", "");
    item.dispatchEvent(new Event("click", { bubbles: true }));
    expect(root.getAttribute("value")).toBe("x");
    expect(root.hasAttribute("open")).toBe(false);
    document.body.removeChild(root);
  });

  test("input and textarea sync value attributes", () => {
    if (typeof customElements === "undefined" || typeof document === "undefined") return;
    defineSiguiComponents({ tagPrefix: "sgtest" });
    const inputHost = document.createElement("sgtest-input");
    const taHost = document.createElement("sgtest-textarea");
    document.body.append(inputHost, taHost);
    const input = /** @type {HTMLInputElement | null} */ (inputHost.querySelector("input[data-sigui-part='control']"));
    const ta = /** @type {HTMLTextAreaElement | null} */ (taHost.querySelector("textarea[data-sigui-part='control']"));
    expect(input).toBeTruthy();
    expect(ta).toBeTruthy();
    if (!input || !ta) return;
    input.value = "abc";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    ta.value = "xyz";
    ta.dispatchEvent(new Event("input", { bubbles: true }));
    expect(inputHost.getAttribute("value")).toBe("abc");
    expect(taHost.getAttribute("value")).toBe("xyz");
    document.body.removeChild(inputHost);
    document.body.removeChild(taHost);
  });
});
