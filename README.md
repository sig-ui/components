# @sig-ui/components

Web Components package for SigUI.
Provides component registration, base runtime utilities, and component metadata.

## Install

```bash
bun add @sig-ui/components
```

## Quick start

```js
import { defineSiguiComponents } from "@sig-ui/components";
import "./src/sigui/sigui.css";

defineSiguiComponents(); // registers sg-* custom elements
```

```html
<sg-card>
  <h2>Hello SigUI</h2>
  <sg-button color="primary">Get Started</sg-button>
</sg-card>
```

## API

- `defineSiguiComponents(options?)`
- `registry` metadata export
- `SiguiElement` base class
- Utilities: `useMachine`, `useId`, `useReducedMotion`, `enableKeyboardNavigation`
- Feature flags: `configureSiguiFeatures`, `getSiguiFeatureFlags`, `isSiguiFeatureEnabled`
- Actions: `@sig-ui/components/lib/actions`

## Define options

- `tagPrefix` (default: `"sg"`)
- `force` (redefine existing tags)
- `featureFlags` (toggle interactive machine-backed components)
