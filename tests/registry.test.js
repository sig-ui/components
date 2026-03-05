// @ts-check

/**
 * Repository module for registry.test.
 * @module
 */
import { describe, expect, test } from "bun:test";
import {
  configureSiguiFeatures,
  defineSiguiComponents,
  getSiguiFeatureFlags,
  isSiguiFeatureEnabled,
  registry,
} from "../src/index.js";

describe("@sig-ui/components", () => {
  test("exports component registry", () => {
    expect(Object.keys(registry.components).length).toBeGreaterThan(0);
  });

  test("defines custom elements", () => {
    if (typeof customElements === "undefined") return;
    const defined = defineSiguiComponents({ tagPrefix: "sg-test" });
    expect(defined.length).toBeGreaterThan(0);
    expect(customElements.get("sg-test-button")).toBeDefined();
  });

  test("supports checkboxMachine feature flag", () => {
    configureSiguiFeatures({ checkboxMachine: false });
    expect(isSiguiFeatureEnabled("checkboxMachine")).toBe(false);
    defineSiguiComponents({ tagPrefix: "sg-test-flags", featureFlags: { checkboxMachine: true } });
    expect(getSiguiFeatureFlags().checkboxMachine).toBe(true);
    expect(isSiguiFeatureEnabled("checkboxMachine")).toBe(true);
  });
});
