// @ts-check

/**
 * SigUI components package module for index.
 * @module
 */
/**
 * Lightweight SigUI Web Components registry.
 *
 * Components render in light DOM and apply SigUI class names so the
 * generated CSS bundle works without framework adapters.
 */

import registry from "./components/registry.json";
import { COMPONENT_DEFINITIONS } from "./components/definitions.js";
import { INTERACTIVE_COMPONENT_DEFINITIONS } from "./components/interactive/definitions.js";
import { configureSiguiFeatures } from "./lib/feature-flags.js";
export { SiguiElement } from "./lib/base-element.js";
export { useMachine } from "./lib/use-machine.js";
export { findAncestor, readContext } from "./lib/context.js";
export { getResolvedLocale } from "./lib/locale.js";
export { useId } from "./lib/use-id.js";
export { useReducedMotion } from "./lib/use-reduced-motion.js";
export { enableKeyboardNavigation } from "./lib/keyboard-navigation.js";
export {
  configureSiguiFeatures,
  getSiguiFeatureFlags,
  isSiguiFeatureEnabled,
} from "./lib/feature-flags.js";
export * as actions from "./lib/actions/index.js";

/**
 * @typedef {{
 * checkboxMachine?: boolean;
 * accordionMachine?: boolean;
 * alertDialogMachine?: boolean;
 * collapsibleMachine?: boolean;
 * dialogMachine?: boolean;
 * menuMachine?: boolean;
 * popoverMachine?: boolean;
 * selectMachine?: boolean;
 * sheetMachine?: boolean;
 * tabsMachine?: boolean;
 * toastMachine?: boolean;
 * tooltipMachine?: boolean;
 * }} FeatureFlags
 */
/** @typedef {{ tagPrefix?: string; force?: boolean; featureFlags?: FeatureFlags }} DefineOptions */

/**
 * Define all SigUI web components.
 * @param {DefineOptions} [options]
 * @returns {string[]} Defined tag names.
 */
export function defineSiguiComponents(options = {}) {
  configureSiguiFeatures(options.featureFlags);
  if (typeof customElements === "undefined") return [];
  const tagPrefix = options.tagPrefix ?? "sg";
  const force = options.force === true;
  const defined = [];
  const definitions = { ...COMPONENT_DEFINITIONS, ...INTERACTIVE_COMPONENT_DEFINITIONS };

  for (const [key, componentClass] of Object.entries(definitions)) {
    const tagName = `${tagPrefix}-${key}`;
    if (customElements.get(tagName) && !force) continue;
    if (!customElements.get(tagName)) {
      customElements.define(tagName, /** @type {CustomElementConstructor} */ (componentClass));
    }
    defined.push(tagName);
  }

  return defined;
}

export { registry };
