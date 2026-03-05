// @ts-check

/**
 * SigUI components runtime module for feature flags.
 * @module
 */

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

const DEFAULT_FEATURE_FLAGS = Object.freeze({
  checkboxMachine: false,
  accordionMachine: true,
  alertDialogMachine: true,
  collapsibleMachine: true,
  dialogMachine: true,
  menuMachine: true,
  popoverMachine: true,
  selectMachine: true,
  sheetMachine: true,
  tabsMachine: true,
  toastMachine: true,
  tooltipMachine: true,
});

/** @type {FeatureFlags} */
const featureFlagsState = { ...DEFAULT_FEATURE_FLAGS };

/**
 * Configure SigUI runtime feature flags.
 * Unknown flags are ignored.
 * @param {FeatureFlags} [featureFlags]
 * @returns {FeatureFlags}
 */
export function configureSiguiFeatures(featureFlags = {}) {
  for (const [name, value] of Object.entries(featureFlags)) {
    if (typeof value !== "boolean") continue;
    if (!(name in DEFAULT_FEATURE_FLAGS)) continue;
    featureFlagsState[/** @type {keyof FeatureFlags} */ (name)] = value;
  }
  return getSiguiFeatureFlags();
}

/**
 * Read current SigUI runtime feature flags.
 * @returns {FeatureFlags}
 */
export function getSiguiFeatureFlags() {
  return { ...featureFlagsState };
}

/**
 * Check whether a SigUI feature flag is enabled.
 * @param {keyof FeatureFlags} name
 * @returns {boolean}
 */
export function isSiguiFeatureEnabled(name) {
  return featureFlagsState[name] === true;
}
