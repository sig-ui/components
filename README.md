# @sig-ui/components

SigUI Web Components package. Provides a registry function to define components and utilities for shared runtime behavior.

## Install

```bash
bun add @sig-ui/components
```

## Quick start

```js
import { defineSiguiComponents } from "@sig-ui/components";
import "./sigui/sigui.css";

defineSiguiComponents(); // registers sg-* custom elements
```

```html
<sg-card>
  <sg-heading level="2">Welcome</sg-heading>
  <sg-button>Continue</sg-button>
</sg-card>
```

## API

- `defineSiguiComponents(options?)`
- `registry` (component metadata)
- `SiguiElement` base class
- Utilities: `useMachine`, `useId`, `useReducedMotion`, `enableKeyboardNavigation`
- Feature flag helpers: `configureSiguiFeatures`, `getSiguiFeatureFlags`, `isSiguiFeatureEnabled`
- Actions namespace: `@sig-ui/components/lib/actions`

## Define options

- `tagPrefix` (default: `"sg"`)
- `force` (redefine already-registered tags)
- `featureFlags` (toggle specific interactive machine features)
