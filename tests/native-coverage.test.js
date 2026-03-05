// @ts-check

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { manifest } from "../src/manifest.js";
import { COMPONENT_DEFINITIONS } from "../src/components/definitions.js";
import { INTERACTIVE_COMPONENT_DEFINITIONS } from "../src/components/interactive/definitions.js";

describe("@sig-ui/components native coverage", () => {
  test("has no overlap between base and interactive definitions", () => {
    const baseKeys = Object.keys(COMPONENT_DEFINITIONS);
    const interactiveKeys = new Set(Object.keys(INTERACTIVE_COMPONENT_DEFINITIONS));
    const overlap = baseKeys.filter((key) => interactiveKeys.has(key));
    expect(overlap).toEqual([]);
  });

  test("uses sg/* manifest import paths", () => {
    const invalid = manifest.filter((entry) => entry.importPath && !entry.importPath.startsWith("sg/"));
    expect(invalid).toEqual([]);
  });

  test("styles required native form elements globally", () => {
    const globalsCss = readFileSync(new URL("../src/styles/globals.css", import.meta.url), "utf8");
    for (const selector of [
      "fieldset",
      "legend",
      "meter",
      "output",
      "datalist",
      "option",
      "optgroup",
      "input[type=\"date\"]",
      "input[type=\"time\"]",
      "input[type=\"datetime-local\"]",
      "input[type=\"file\"]",
      "input[type=\"color\"]",
    ]) {
      expect(globalsCss.includes(selector)).toBe(true);
    }
  });
});
