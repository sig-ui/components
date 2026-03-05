// @ts-nocheck
// @generated – do not edit. Regenerate with: bun run generate:meta
// @ts-nocheck

/**
 * SigUI components package module for manifest.
 * @module
 */
const SIZES = ["sm","md","lg"];
const COLOR_VARIANTS = ["primary","secondary","danger","success","warning","info","ghost"];
const ELEVATIONS = [0,1,2,3,4,5];
const SPACING_RELATIONSHIPS = ["related","grouped","separated","distinct"];
const DENSITIES = ["compact","comfortable","spacious"];
const TEXT_SIZES = ["xs","sm","base","lg"];
const HEADING_SIZES = ["lg","xl","2xl","3xl","4xl","5xl","6xl"];
const TEXT_COLORS = ["primary","secondary","muted","danger","success"];
const HEADING_COLORS = ["primary","secondary","muted"];
const WEIGHTS = ["normal","medium","semibold","bold"];
const ALIGNS = ["left","center","right"];
const DIVIDER_COLORS = ["default","strong","muted"];
const GRID_COLUMNS = [1,2,3,4,5,6,7,8,9,10,11,12,"auto-fill","auto-fit"];
const GRID_FLOWS = ["row","column","dense","row-dense","column-dense"];
const GRID_ALIGNMENTS = ["start","center","end","stretch"];
const GRID_PLACE_CONTENT = ["start","center","end","stretch","space-between","space-around","space-evenly"];
const GRID_SPANS = [1,2,3,4,5,6,7,8,9,10,11,12];
const CONTAINER_SIZES = ["sm","md","lg","xl","full"];
const ICON_SIZES = ["xs","sm","md","default","lg","xl"];
const ICON_COLORS = ["currentColor","success","warning","danger","info"];
const MATERIAL_SYMBOLS_VARIANTS = ["outlined","rounded","sharp"];
export const manifest = [
  {
    name: "Prose",
    importPath: "sg/prose",
    category: "basic",
    description: "Semantic prose elements (blockquote, figure, abbr, q) with SigUI typography styling.",
    whenToUse: "Rich text content, long-form documentation, and editorial sections that need readable semantics.",
    avoidWhen: "App UI controls or dense data layouts that should use dedicated components.",
    semanticRole: "semantic text flow",
    props: {
      class: { type: "string", description: "Optional sg-prose container class for readable prose rhythm and typography." }
    },
    slots: ["default"]
  },
  {
    name: "Textarea",
    importPath: "sg/textarea",
    category: "form",
    description: "CSS-only styled multi-line text input. Apply class=\"sg-textarea\" on a native <textarea> element.",
    whenToUse: "Collecting multi-line text input. Use class=\"sg-textarea\" on a native <textarea>.",
    avoidWhen: "Single-line text - use Input.",
    semanticRole: "textbox",
    accessibilityRequirements: "Associate label with textarea via for/id.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-textarea\" on a native <textarea> element." }
    },
    slots: []
  },
  {
    name: "Output",
    importPath: "sg/output",
    category: "form",
    description: "CSS-only styled native <output>. Apply class=\"sg-output\" on an <output> element for displaying calculation results or action outcomes.",
    whenToUse: "To present the result of a user action or calculation. Use class=\"sg-output\".",
    avoidWhen: "For static text display - use Text or Badge instead.",
    semanticRole: "status",
    accessibilityRequirements: "The output element is automatically associated with form inputs via the for attribute.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-output\" on the <output> element." },
      "data-size": { type: "string", values: SIZES, default: "md", description: "Text size variant." },
      "data-color": { type: "string", values: ["primary","success","danger","warning"], description: "Semantic color variant." }
    },
    slots: ["default"]
  },
  {
    name: "Button",
    importPath: "sg/button",
    category: "basic",
    description: "CSS-only styled button. Apply class=\"sg-button\" on a native <button> or <a> element with data-* attributes for variants.",
    whenToUse: "Triggering actions (submit, toggle, navigate). Use class=\"sg-button\" on a native <button> or <a>.",
    avoidWhen: "Navigating to a new page without an action - use a plain <a> link. For toggle states, consider Switch.",
    semanticRole: "button (or link when href is set)",
    accessibilityRequirements: "Must have visible text content or aria-label. Links cannot be disabled.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-button\" on a native <button> or <a> element." },
      "data-color": { type: "ColorVariant", values: COLOR_VARIANTS, default: "primary", description: "Visual color theme of the button." },
      "data-size": { type: "Size", values: SIZES, default: "md", description: "Button size." },
      "data-loading": { type: "boolean", default: false, description: "Shows spinner and disables interaction." }
    },
    slots: ["default"]
  },
  {
    name: "Link",
    importPath: "sg/link",
    category: "basic",
    description: "CSS-only styled link. Apply class=\"sg-link\" and data-* attributes directly on a native <a> element.",
    whenToUse: "Text links in prose, navigation links, external references. Use class=\"sg-link\" on a native <a>.",
    avoidWhen: "Button-styled links (use Button with href). Navigation bars (use NavigationMenu).",
    semanticRole: "link",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-link\" on a native <a> element." },
      "data-color": { type: "string", values: ["primary","muted","inherit"], default: "primary", description: "Link color variant." },
      "data-underline": { type: "string", values: ["always","hover","none"], default: "always", description: "Underline behavior." }
    },
    slots: ["default"]
  },
  {
    name: "RadioGroup",
    importPath: "sg/radio",
    category: "form",
    description: "CSS-only radio group. Apply class=\"sg-radio-group\" on a container div with native <input type=\"radio\"> children wrapped in labels.",
    whenToUse: "Choosing one option from a small set (2-7 visible options). Use class=\"sg-radio-group\" on a wrapper with <label class=\"sg-radio-group-item\"> children.",
    avoidWhen: "More than 7 options - use Select. Multiple selections - use Checkbox.",
    semanticRole: "radiogroup",
    accessibilityRequirements: "Each radio input requires an associated label.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-radio-group\" on the wrapper element." },
      "data-orientation": { type: "string", values: ["horizontal","vertical"], default: "vertical", description: "Layout direction." },
      "data-size": { type: "Size", values: SIZES, default: "md", description: "Size of radio buttons." }
    },
    slots: ["default"]
  },
  {
    name: "Toggle",
    importPath: "sg/toggle",
    category: "form",
    description: "CSS-only styled pressable toggle button. Apply class=\"sg-toggle\" on a native <button> with aria-pressed.",
    whenToUse: "Binary toggle controls in toolbars. Use class=\"sg-toggle\" on a native <button aria-pressed>.",
    avoidWhen: "On/off settings - use Switch. Multiple exclusive options - use ToggleGroup.",
    semanticRole: "button with aria-pressed",
    accessibilityRequirements: "Uses aria-pressed for toggle state. Requires aria-label.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-toggle\" on a native <button> with aria-pressed." },
      "data-size": { type: "Size", values: SIZES, default: "md", description: "Toggle size." },
      "data-variant": { type: "string", values: ["default","outline"], default: "default", description: "Visual variant." }
    },
    slots: ["default"]
  },
  {
    name: "ToggleGroup",
    importPath: "sg/toggle",
    category: "form",
    description: "Group of mutually exclusive or multi-select toggles.",
    whenToUse: "Grouping related toggle options (text alignment, view modes).",
    semanticRole: "group",
    accessibilityRequirements: "Uses role='group'. Children are Toggle components that read context.",
    parent: "Toggle",
    props: {
      type: { type: "string", values: ["single","multiple"], required: true, description: "Selection mode." },
      value: { type: "string | string[]", description: "Selected value(s). Bindable." },
      size: { type: "Size", values: SIZES, default: "md", description: "Size applied to all child toggles." },
      disabled: { type: "boolean", default: false, description: "Disables all child toggles." },
      onchange: { type: "(value: string | string[]) => void", description: "Called when selection changes." }
    },
    slots: ["default"]
  },
  {
    name: "Separator",
    importPath: "sg/separator",
    category: "layout",
    description: "CSS-only separator. Apply class=\"sg-separator\" to a native <hr> (horizontal) or <div role=\"separator\"> (vertical).",
    whenToUse: "Separating content with native semantics and SigUI styling.",
    avoidWhen: "Spacing alone provides enough distinction.",
    semanticRole: "separator",
    accessibilityRequirements: "Use role=\"separator\" + aria-orientation=\"vertical\" for vertical separators. Add aria-hidden for decorative usage.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-separator\" on a native element." },
      "data-orientation": { type: "string", values: ["horizontal","vertical"], default: "horizontal", description: "Separator direction." },
      "aria-hidden": { type: "string", values: ["true"], description: "Set to true for decorative separators." }
    },
    slots: []
  },
  {
    name: "Divider",
    importPath: "sg/divider",
    category: "layout",
    description: "CSS-only divider. Apply class=\"sg-divider\" on a native <hr> (horizontal) or <div> (vertical).",
    whenToUse: "Visually separating groups of content within a section using native markup.",
    avoidWhen: "Spacing alone provides sufficient visual separation - use Spacer or Stack gap.",
    semanticRole: "separator",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-divider\" on a native <hr> or <div>." },
      "data-orientation": { type: "string", values: ["horizontal","vertical"], default: "horizontal", description: "Line direction." },
      "data-color": { type: "string", values: DIVIDER_COLORS, default: "default", description: "Line color intensity." },
      "data-spacing": { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, description: "Margin around the divider." }
    },
    slots: []
  },
  {
    name: "Input",
    importPath: "sg/input",
    category: "form",
    description: "CSS-only styled text input. Apply class=\"sg-input\" on a native <input> element.",
    whenToUse: "Collecting single-line text input (email, password, search, etc.). Use class=\"sg-input\" on a native <input>.",
    avoidWhen: "Multi-line text - use a textarea. Selection from options - use Select.",
    semanticRole: "textbox",
    accessibilityRequirements: "Associate label with input via for/id.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-input\" on a native <input> element." }
    },
    slots: []
  },
  {
    name: "Code",
    importPath: "sg/code",
    category: "basic",
    description: "CSS-only inline code styles. Apply class=\"sg-code\" on a native <code>.",
    whenToUse: "Displaying inline code, variable names, file paths, or short highlighted snippets within text.",
    avoidWhen: "Keyboard shortcuts (use Kbd). Multi-line code blocks (use CodeBlock).",
    semanticRole: "none (semantic <code> element)",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-code\" on a native <code> element." },
      "data-color": { type: "string", values: ["default","primary","muted"], default: "default", description: "Color variant for the inline code." },
      "data-lang": { type: "string", description: "Optional language key (for example: 'typescript')." }
    },
    slots: ["default"]
  },
  {
    name: "InputVariants",
    importPath: "sg/input-variants",
    category: "form",
    description: "Native input type variants (date, time, file, color, datalist) using SigUI input classes.",
    whenToUse: "Documenting and styling specialized native input types with existing sg-input utility classes.",
    avoidWhen: "Building bespoke picker workflows that need composed behavior (use DatePicker, ColorPicker, or Input components).",
    semanticRole: "native input semantics",
    props: {
      class: { type: "string", required: true, description: "Use class names like sg-input, sg-input-file, and sg-input-color on native input elements." },
      type: { type: "string", values: ["date","time","datetime-local","file","color"], description: "Native input type variant to render." },
      list: { type: "string", description: "Optional datalist id for autocomplete suggestions." }
    },
    slots: ["default"]
  },
  {
    name: "NativeAccordion",
    importPath: "sg/native-accordion",
    category: "navigation",
    description: "CSS-only native disclosure accordion using <details>/<summary>. Apply class=\"sg-native-accordion\" on a wrapper div containing <details> children.",
    whenToUse: "Accessible progressive disclosure where native browser semantics are preferred. Each item is a <details> element; add a shared name attribute for mutually exclusive behavior.",
    avoidWhen: "You need rich animation/state control - use AccordionRoot.",
    semanticRole: "group of disclosure widgets",
    accessibilityRequirements: "Provides native disclosure semantics through <details>/<summary>. No JavaScript required.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-native-accordion\" on the wrapper element." }
    },
    slots: ["default"]
  },
  {
    name: "NativeAccordionItem",
    importPath: "sg/native-accordion",
    category: "navigation",
    description: "A <details> element inside the accordion wrapper.",
    whenToUse: "Always inside a NativeAccordion wrapper.",
    semanticRole: "disclosure widget",
    parent: "NativeAccordion",
    props: {
      name: { type: "string", description: "Shared name for mutually exclusive behavior. Omit for independent items." },
      open: { type: "boolean", default: false, description: "Whether this item starts expanded." },
      "data-disabled": { type: "boolean", default: false, description: "Disables this item visually and prevents interaction." }
    },
    slots: ["trigger","default"]
  },
  {
    name: "SearchInput",
    importPath: "sg/search-input",
    category: "form",
    description: "CSS-only styled search input. Apply class=\"sg-search-input\" on a native <input type=\"search\"> element.",
    whenToUse: "Search fields, filter inputs. Use class=\"sg-search-input\" on a native <input type=\"search\">.",
    avoidWhen: "General text input (use Input). Autocomplete search with dropdown (use Combobox).",
    semanticRole: "searchbox",
    accessibilityRequirements: "Requires associated label or aria-label.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-search-input\" on a native <input type=\"search\">." }
    },
    slots: []
  },
  {
    name: "Meter",
    importPath: "sg/meter",
    category: "form",
    description: "CSS-only styled native <meter>. Apply class=\"sg-meter\" on a <meter> element.",
    whenToUse: "To display a scalar measurement within a known range (e.g. disk usage, battery level). Use class=\"sg-meter\".",
    avoidWhen: "For task completion or loading - use Progress instead.",
    semanticRole: "meter",
    accessibilityRequirements: "Provide meaningful min/max/low/high/optimum values and a label.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-meter\" on the <meter> element." },
      "data-size": { type: "string", values: SIZES, default: "md", description: "Visual height of the meter bar." }
    },
    slots: []
  },
  {
    name: "Kbd",
    importPath: "sg/kbd",
    category: "basic",
    description: "CSS-only keyboard key indicator. Apply class=\"sg-kbd\" on native <kbd>.",
    whenToUse: "To display keyboard shortcuts or key combinations in documentation and UI.",
    avoidWhen: "For general text emphasis - use Text or Badge instead.",
    semanticRole: "none (semantic <kbd> element)",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-kbd\" on a native <kbd> element." }
    },
    slots: ["default"]
  },
  {
    name: "KbdGroup",
    importPath: "sg/kbd",
    category: "basic",
    description: "Groups multiple Kbd components together for displaying keyboard shortcuts with proper spacing.",
    whenToUse: "When displaying keyboard shortcuts that consist of multiple keys (e.g., Ctrl+K, Cmd+Shift+P).",
    semanticRole: "none (layout helper)",
    parent: "Kbd",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-kbd-group\" on a wrapper element (for example <span>)." }
    },
    slots: ["default"]
  },
  {
    name: "Fieldset",
    importPath: "sg/fieldset",
    category: "form",
    description: "CSS-only styled native <fieldset> with <legend>. Apply class=\"sg-fieldset\" on a <fieldset> and class=\"sg-legend\" on its <legend>.",
    whenToUse: "To visually and semantically group related form controls. Use class=\"sg-fieldset\" and class=\"sg-legend\".",
    avoidWhen: "For non-form grouping - use Card or Section instead.",
    semanticRole: "group",
    accessibilityRequirements: "Use <legend> to label the group; screen readers announce it to users.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-fieldset\" on the <fieldset> element." },
      disabled: { type: "boolean", default: false, description: "Disables all controls within the fieldset." }
    },
    slots: ["default"]
  },
  {
    name: "Label",
    importPath: "sg/label",
    category: "form",
    description: "CSS-only styled label. Apply class=\"sg-label\" on a native <label>.",
    whenToUse: "Adding a label to a custom form control not covered by Input/Textarea.",
    avoidWhen: "Using Input or Textarea - they include labels automatically.",
    semanticRole: "label",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-label\" on a native <label>." },
      for: { type: "string", description: "ID of the form element this label is for." },
      "data-size": { type: "Size", values: SIZES, default: "md", description: "Label text size." },
      "data-required": { type: "boolean", default: false, description: "Shows required indicator (*)." }
    },
    slots: ["default"]
  },
  {
    name: "NativeSelect",
    importPath: "sg/native-select",
    category: "form",
    description: "CSS-only styled native <select>. Apply class=\"sg-native-select\" on a wrapper with a native <select> element inside.",
    whenToUse: "When you need a native select for mobile-friendly option picking. Use class=\"sg-native-select\" on a wrapper element.",
    avoidWhen: "When you need custom option rendering - use Select or Combobox instead.",
    semanticRole: "combobox (native)",
    accessibilityRequirements: "Associate label with select via for/id.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-native-select\" on the wrapper element." }
    },
    slots: ["default"]
  },
  {
    name: "Alert",
    importPath: "sg/alert",
    category: "feedback",
    description: "CSS-only alert container. Apply class=\"sg-alert\" to a native <div> or <aside> with role=\"alert\" or role=\"status\".",
    whenToUse: "Persistent status messages, notifications, and callouts with native HTML.",
    avoidWhen: "Auto-dismissing notices (use Toast) or destructive confirmations (use AlertDialog).",
    semanticRole: "alert or status",
    accessibilityRequirements: "Use role=\"alert\" for assertive announcements or role=\"status\" for polite updates.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-alert\" on a native container." },
      "data-color": { type: "ColorVariant", values: COLOR_VARIANTS, default: "info", description: "Semantic alert color." },
      role: { type: "string", values: ["alert","status"], default: "alert", description: "Live region behavior for assistive technology." }
    },
    slots: ["default"]
  },
  {
    name: "AlertTitle",
    importPath: "sg/alert",
    category: "feedback",
    description: "CSS-only title text for an Alert. Apply class=\"sg-alert-title\" to a heading or block element.",
    whenToUse: "Inside Alert when a concise heading improves scanability.",
    semanticRole: "heading or text",
    parent: "Alert",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-alert-title\"." }
    },
    slots: ["default"]
  },
  {
    name: "AlertDescription",
    importPath: "sg/alert",
    category: "feedback",
    description: "CSS-only supporting text for an Alert. Apply class=\"sg-alert-description\" to a paragraph or container.",
    whenToUse: "Inside Alert to provide additional guidance or detail.",
    semanticRole: "text",
    parent: "Alert",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-alert-description\"." }
    },
    slots: ["default"]
  },
  {
    name: "Table",
    importPath: "sg/table",
    category: "data-display",
    description: "CSS-only table styles. Apply SigUI classes on native <table> elements and table parts.",
    whenToUse: "Displaying tabular data with rows and columns.",
    avoidWhen: "Simple key-value pairs - use a description list. Card layouts - use Grid + Card.",
    semanticRole: "table",
    accessibilityRequirements: "Uses native <table> semantics. Add aria-label for context.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-table\" on a native <table> element." },
      "data-striped": { type: "boolean", default: false, description: "Enable striped row background." }
    },
    slots: ["default"]
  },
  {
    name: "TableHeader",
    importPath: "sg/table",
    category: "data-display",
    description: "Table header section (<thead>).",
    whenToUse: "Always inside a Table.",
    parent: "Table",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-table-header\" on <thead>." }
    },
    slots: ["default"]
  },
  {
    name: "TableBody",
    importPath: "sg/table",
    category: "data-display",
    description: "Table body section (<tbody>).",
    whenToUse: "Always inside a Table.",
    parent: "Table",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-table-body\" on <tbody>." }
    },
    slots: ["default"]
  },
  {
    name: "TableRow",
    importPath: "sg/table",
    category: "data-display",
    description: "Table row (<tr>).",
    whenToUse: "Always inside TableHeader or TableBody.",
    parent: "Table",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-table-row\" on <tr>." }
    },
    slots: ["default"]
  },
  {
    name: "TableHead",
    importPath: "sg/table",
    category: "data-display",
    description: "Table header cell (<th>).",
    whenToUse: "Always inside a TableRow within TableHeader.",
    parent: "Table",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-table-head\" on <th>." }
    },
    slots: ["default"]
  },
  {
    name: "TableCell",
    importPath: "sg/table",
    category: "data-display",
    description: "Table data cell (<td>).",
    whenToUse: "Always inside a TableRow within TableBody.",
    parent: "Table",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-table-cell\" on <td>." }
    },
    slots: ["default"]
  },
  {
    name: "TableFooter",
    importPath: "sg/table",
    category: "data-display",
    description: "Table footer section (<tfoot>) for summaries and totals.",
    whenToUse: "Inside a Table, after TableBody, when displaying aggregated data.",
    parent: "Table",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-table-footer\" on <tfoot>." }
    },
    slots: ["default"]
  },
  {
    name: "TableCaption",
    importPath: "sg/table",
    category: "data-display",
    description: "Table caption for accessibility and context (<caption>).",
    whenToUse: "Inside a Table to provide a title or description for screen readers.",
    semanticRole: "caption",
    parent: "Table",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-table-caption\" on <caption>." }
    },
    slots: ["default"]
  },
  {
    name: "Slider",
    importPath: "sg/slider",
    category: "form",
    description: "CSS-only styled range slider. Apply class=\"sg-slider\" on a native <input type=\"range\"> element.",
    whenToUse: "Selecting a value from a continuous or stepped range. Use class=\"sg-slider\" on a native <input type=\"range\">.",
    avoidWhen: "Precise numeric input - use Input with type='number'.",
    semanticRole: "slider",
    accessibilityRequirements: "Requires associated label or aria-label.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-slider\" on a native <input type=\"range\">." }
    },
    slots: []
  },
  {
    name: "Switch",
    importPath: "sg/switch",
    category: "form",
    description: "CSS-only styled toggle switch. Apply class=\"sg-switch\" and role=\"switch\" on a native <input type=\"checkbox\"> element.",
    whenToUse: "On/off settings that take effect immediately (dark mode, notifications). Use class=\"sg-switch\" on a native <input type=\"checkbox\" role=\"switch\">.",
    avoidWhen: "The choice doesn't take effect until form submission - use Checkbox.",
    semanticRole: "switch",
    accessibilityRequirements: "Requires associated label or aria-label. Uses role='switch'.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-switch\" on a native <input type=\"checkbox\" role=\"switch\">." }
    },
    slots: []
  },
  {
    name: "NativeDialog",
    importPath: "sg/native-dialog",
    category: "overlay",
    description: "CSS-only baseline styling for native <dialog>. Apply class=\"sg-native-dialog\" on a <dialog> element. Use .showModal() to open.",
    whenToUse: "For simple modal dialogs without needing the full Dialog/AlertDialog component. Use class=\"sg-native-dialog\".",
    avoidWhen: "When you need advanced features like nested dialogs, programmatic stacking, or complex composition - use Dialog or AlertDialog.",
    semanticRole: "dialog",
    accessibilityRequirements: "Native <dialog> provides built-in focus trapping and escape-to-close. Add aria-labelledby for the title.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-native-dialog\" on the <dialog> element." },
      "data-size": { type: "string", values: ["sm","md","lg","full"], default: "md", description: "Maximum width of the dialog." }
    },
    slots: ["default"]
  },
  {
    name: "Progress",
    importPath: "sg/progress",
    category: "feedback",
    description: "CSS-only styled progress bar. Apply class=\"sg-progress\" on a native <progress> element with data-* attributes for variants.",
    whenToUse: "Showing progress of an operation. Use class=\"sg-progress\" on a native <progress> element.",
    avoidWhen: "You need a loading placeholder - use Skeleton.",
    semanticRole: "progressbar",
    accessibilityRequirements: "Requires associated label or aria-label.",
    props: {
      class: { type: "string", required: true, description: "Use class=\"sg-progress\" on a native <progress> element." },
      "data-size": { type: "Size", values: SIZES, default: "md", description: "Progress bar height." },
      "data-color": { type: "ColorVariant", values: ["primary","success","danger","warning","info"], default: "primary", description: "Progress bar color." }
    },
    slots: []
  },
  {
    name: "SidebarLayout",
    importPath: "sg/sidebar-layout",
    category: "layout",
    description: "Two-column layout with intrinsic-width sidebar and flexible content area. Uses CSS Grid for robust sizing.",
    whenToUse: "Main application layouts with navigation sidebar + content area. Documentation sites with TOC sidebar.",
    avoidWhen: "You need the interactive navigation Sidebar component - use SidebarRoot instead. Simple side-by-side layouts - use Stack with direction='horizontal'.",
    semanticRole: "none (layout primitive)",
    props: {
      side: { type: "string", values: ["left","right"], default: "left", description: "Which side the sidebar appears on." },
      gap: { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, default: "grouped", description: "Gestalt-based spacing between sidebar and content." },
      sidebarWidth: { type: "string", description: "Explicit sidebar width. Omit for intrinsic width based on content." },
      collapsible: { type: "boolean", default: false, description: "Allow sidebar to collapse (requires collapse logic in SidebarLayoutSidebar)." }
    },
    slots: ["default"]
  },
  {
    name: "SidebarLayoutSidebar",
    importPath: "sg/sidebar-layout",
    category: "layout",
    description: "Sidebar region within a SidebarLayout. Has intrinsic width by default.",
    whenToUse: "Always inside a SidebarLayout. Contains navigation, TOC, or other sidebar content.",
    semanticRole: "complementary",
    parent: "SidebarLayout",
    props: {
      width: { type: "string", description: "Intrinsic width override. Uses parent's sidebarWidth if omitted." }
    },
    slots: ["default"]
  },
  {
    name: "SidebarLayoutContent",
    importPath: "sg/sidebar-layout",
    category: "layout",
    description: "Main content region within a SidebarLayout. Fills remaining space.",
    whenToUse: "Always inside a SidebarLayout. Contains the primary page content.",
    semanticRole: "main",
    parent: "SidebarLayout",
    props: {},
    slots: ["default"]
  },
  {
    name: "Field",
    importPath: "sg/field",
    category: "form",
    description: "Form field wrapper that provides label, description, and error messaging with auto-wired aria-describedby.",
    whenToUse: "To wrap any form control with consistent label, description, and error layout.",
    avoidWhen: "For inputs that already have their own label wiring (e.g. Input, Textarea with label prop).",
    semanticRole: "group",
    accessibilityRequirements: "label prop is required. Error and description auto-wire aria-describedby.",
    props: {
      label: { type: "string", required: true, description: "Field label text" },
      error: { type: "string", description: "Error message" },
      description: { type: "string", description: "Help text" },
      required: { type: "boolean", default: false, description: "Show required indicator" },
      disabled: { type: "boolean", default: false, description: "Disable the field" },
      htmlFor: { type: "string", description: "ID of the form control this field labels" }
    },
    slots: ["default"]
  },
  {
    name: "FormatNumber",
    importPath: "sg/format-number",
    category: "data-display",
    description: "Localized numeric formatter backed by Intl.NumberFormat.",
    whenToUse: "Rendering numbers, percentages, or currency values with locale rules.",
    semanticRole: "text",
    props: {
      value: { type: "number", required: true, description: "Numeric value to format." },
      locale: { type: "string", description: "Optional locale override." },
      style: { type: "string", values: ["decimal","currency","percent","unit"], default: "decimal", description: "Intl number style." },
      currency: { type: "string", description: "ISO currency code when style='currency'." },
      "maximum-fraction-digits": { type: "number", description: "Maximum decimal precision." }
    },
    slots: []
  },
  {
    name: "Badge",
    importPath: "sg/badge",
    category: "basic",
    description: "Inline status label with color, size, and optional link. Auto-detects low-contrast backgrounds and adds a dashed outline.",
    whenToUse: "Displaying short status indicators, counts, or labels alongside other content. Use href to render as a clickable link.",
    avoidWhen: "You need a full status message - use Toast or an alert pattern.",
    semanticRole: "status",
    props: {
      color: { type: "ColorVariant", values: COLOR_VARIANTS, default: "primary", description: "Semantic color indicating status." },
      size: { type: "Size", values: SIZES, default: "md", description: "Badge size." },
      icon: { type: "string", description: "Material Symbols icon name. Rendered before badge text." },
      href: { type: "string", description: "Renders as <a> when set." },
      target: { type: "\"_blank\" | \"_self\"", description: "Link target. Auto-sets rel='noopener noreferrer' when '_blank'." },
      rel: { type: "string", description: "Link rel attribute." }
    },
    slots: ["default"]
  },
  {
    name: "GradientPattern",
    importPath: "sg/gradient-pattern",
    category: "basic",
    description: "Dynamic gradient background patterns using preset factories. Supports 1–n semantic color tokens with fill/truncate to preset arity, numeric intensity (1–100), neutral-aware rendering, and extensible custom presets. Uses OKLCH color-mix for automatic dark mode and brand adaptation.",
    whenToUse: "Add decorative gradient backgrounds to hero sections, cards, page backgrounds, or any container that needs visual richness. Use preset factories with parameters for positioned glows, directional auroras, etc. Adapts automatically to brand color, dark mode, and motion settings.",
    avoidWhen: "Content needs maximum readability. Use solid backgrounds for text-heavy sections.",
    semanticRole: "presentation",
    accessibilityRequirements: "Always decorative (aria-hidden). Content children remain accessible via inner content wrapper.",
    props: {
      preset: { type: "PresetProp", values: ["mesh","aurora","glow","sweep","noise"], default: "mesh", description: "Gradient preset – built-in name or a PresetDefinition object from a factory function (e.g. glow({ positions, spread }))." },
      colors: { type: "GradientColorToken[]", values: ["primary","secondary","tertiary","accent","success","warning","danger","info","neutral"], default: "primary", description: "Semantic color tokens (1–n). Fill/truncated to preset arity. When all tokens are 'neutral', algorithms shift lightness/chroma instead of hue." },
      intensity: { type: "number", default: 30, description: "Intensity 1–100. Controls gradient opacity." },
      animated: { type: "boolean", default: false, description: "Enable ambient animation loop. Uses WAAPI, respects prefers-reduced-motion." },
      overlay: { type: "boolean", default: false, description: "Render as absolute-positioned layer behind content." },
      speed: { type: "number", default: 1, description: "Animation speed multiplier (>1 = faster). Only applies when animated is true." },
      progress: { type: "number", description: "External progress value (0–1) for scroll-driven gradient shift. Driven by the app layer (e.g. scrollProgressAction + mapRange). The gradient shifts within its container via translateY, creating a parallax effect." }
    },
    slots: ["default"]
  },
  {
    name: "ToastProvider",
    importPath: "sg/toast",
    category: "feedback",
    description: "Context provider that manages toast notifications.",
    whenToUse: "Brief, non-blocking feedback messages (success, error, info).",
    avoidWhen: "Blocking action needed - use AlertDialog. Persistent status - use Badge or inline message.",
    semanticRole: "alert or status",
    accessibilityRequirements: "Uses role='status' (polite) or role='alert' (assertive) depending on color.",
    props: {},
    slots: ["default"]
  },
  {
    name: "Toast",
    importPath: "sg/toast",
    category: "feedback",
    description: "Individual toast notification.",
    parent: "ToastProvider",
    props: {
      color: { type: "ColorVariant", values: COLOR_VARIANTS, description: "Semantic color indicating the notification type." },
      duration: { type: "number", default: 5000, description: "Auto-dismiss time in milliseconds." }
    },
    slots: ["default"]
  },
  {
    name: "Spacer",
    importPath: "sg/spacer",
    category: "layout",
    description: "Empty space element. Expands to fill remaining space in flex containers when no size is set.",
    whenToUse: "Pushing elements apart in a flex layout, or adding explicit whitespace.",
    avoidWhen: "Use Stack gap for consistent spacing between siblings.",
    semanticRole: "none (presentational)",
    props: {
      size: { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, description: "Fixed size. Omit to fill remaining flex space." }
    },
    slots: []
  },
  {
    name: "Scroller",
    importPath: "sg/scroller",
    category: "data-display",
    description: "Axis-constrained scroll container wrapper.",
    whenToUse: "Creating horizontal or vertical overflow regions with consistent styling hooks.",
    semanticRole: "region",
    props: {
      axis: { type: "string", values: ["x","y","both"], default: "x", description: "Primary scroll axis." }
    },
    slots: ["default"]
  },
  {
    name: "CollapsibleRoot",
    importPath: "sg/collapsible",
    category: "navigation",
    description: "Root controller for a collapsible disclosure section.",
    whenToUse: "Single expand/collapse section (show more, details).",
    avoidWhen: "Multiple collapsible sections - use Accordion.",
    semanticRole: "disclosure widget",
    accessibilityRequirements: "Trigger should use aria-expanded and aria-controls.",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      disabled: { type: "boolean", default: false, description: "Disables toggle." },
      onchange: { type: "(open: boolean) => void", description: "Called when open state changes." }
    },
    slots: ["default"]
  },
  {
    name: "CollapsibleTrigger",
    importPath: "sg/collapsible",
    category: "navigation",
    description: "Button that toggles the Collapsible open/closed.",
    whenToUse: "Always inside a CollapsibleRoot.",
    semanticRole: "button",
    parent: "CollapsibleRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "CollapsibleContent",
    importPath: "sg/collapsible",
    category: "navigation",
    description: "Collapsible content region.",
    whenToUse: "Always inside a CollapsibleRoot.",
    semanticRole: "region",
    parent: "CollapsibleRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "AlertDialogRoot",
    importPath: "sg/alert-dialog",
    category: "overlay",
    description: "Root controller for an alert dialog that requires user action. Uses native <dialog>. Blocks Escape key - user must take explicit action.",
    whenToUse: "Destructive actions requiring confirmation (delete, discard, irreversible changes).",
    avoidWhen: "Non-destructive modals - use Dialog. Non-blocking info - use Popover or Toast.",
    semanticRole: "alertdialog",
    accessibilityRequirements: "AlertDialogContent requires aria-label or aria-labelledby. Escape key is blocked.",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      onclose: { type: "() => void", description: "Called when dialog is dismissed via explicit action." }
    },
    slots: ["default"]
  },
  {
    name: "AlertDialogTrigger",
    importPath: "sg/alert-dialog",
    category: "overlay",
    description: "Button that opens the parent AlertDialog.",
    whenToUse: "Always inside an AlertDialogRoot.",
    semanticRole: "button",
    parent: "AlertDialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "AlertDialogContent",
    importPath: "sg/alert-dialog",
    category: "overlay",
    description: "Content panel of an AlertDialog. Uses native <dialog>. Requires aria-label or aria-labelledby.",
    whenToUse: "Always inside an AlertDialogRoot.",
    semanticRole: "alertdialog",
    accessibilityRequirements: "Must have aria-label or aria-labelledby (enforced by ModalLabelProps type).",
    parent: "AlertDialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "AlertDialogHeader",
    importPath: "sg/alert-dialog",
    category: "overlay",
    description: "Header section of an AlertDialog containing title and description.",
    whenToUse: "Always inside AlertDialogContent to provide structured content.",
    semanticRole: "group",
    parent: "AlertDialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "AlertDialogFooter",
    importPath: "sg/alert-dialog",
    category: "overlay",
    description: "Footer section of an AlertDialog containing action buttons.",
    whenToUse: "Always inside AlertDialogContent for action buttons.",
    semanticRole: "group",
    parent: "AlertDialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "AlertDialogTitle",
    importPath: "sg/alert-dialog",
    category: "overlay",
    description: "Title heading of an AlertDialog.",
    whenToUse: "Always inside AlertDialogHeader.",
    semanticRole: "heading",
    parent: "AlertDialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "AlertDialogDescription",
    importPath: "sg/alert-dialog",
    category: "overlay",
    description: "Description text of an AlertDialog.",
    whenToUse: "Always inside AlertDialogHeader.",
    semanticRole: "paragraph",
    parent: "AlertDialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "AlertDialogAction",
    importPath: "sg/alert-dialog",
    category: "overlay",
    description: "Primary action button that closes the AlertDialog.",
    whenToUse: "Always inside AlertDialogFooter for confirming the action.",
    semanticRole: "button",
    parent: "AlertDialogRoot",
    props: {
      color: { type: "string", values: ["primary","secondary","danger"], default: "primary", description: "Button color variant." }
    },
    slots: ["default"]
  },
  {
    name: "AlertDialogCancel",
    importPath: "sg/alert-dialog",
    category: "overlay",
    description: "Cancel button that closes the AlertDialog without taking action.",
    whenToUse: "Always inside AlertDialogFooter for cancelling.",
    semanticRole: "button",
    parent: "AlertDialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "TooltipRoot",
    importPath: "sg/tooltip",
    category: "overlay",
    description: "Root controller for a tooltip. Uses CSS Anchor Positioning for placement.",
    whenToUse: "Providing supplementary labels or descriptions on hover/focus.",
    avoidWhen: "Interactive content - use Popover. Critical information - display inline.",
    semanticRole: "tooltip",
    accessibilityRequirements: "content is required. Auto-linked to trigger via aria-describedby.",
    props: {
      content: { type: "string", required: true, description: "Text shown in the tooltip." },
      delay: { type: "number", default: 200, description: "Milliseconds before showing." }
    },
    slots: ["default"]
  },
  {
    name: "TooltipTrigger",
    importPath: "sg/tooltip",
    category: "overlay",
    description: "Element that triggers the Tooltip on hover/focus. Sets CSS anchor-name for positioning.",
    whenToUse: "Always inside a TooltipRoot to identify the trigger element.",
    semanticRole: "none (wraps trigger content)",
    parent: "TooltipRoot",
    props: {
      asChild: { type: "boolean", default: false, description: "Render as contents-only wrapper for direct child element." }
    },
    slots: ["default"]
  },
  {
    name: "TooltipContent",
    importPath: "sg/tooltip",
    category: "overlay",
    description: "Visual content of the Tooltip. Positioned via CSS Anchor Positioning relative to trigger.",
    whenToUse: "Always inside a TooltipRoot.",
    semanticRole: "tooltip",
    parent: "TooltipRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "Grid",
    importPath: "sg/grid",
    category: "layout",
    description: "CSS Grid layout with auto-responsive columns, flow control, item placement, and container query collapse.",
    whenToUse: "Arranging items in a 2D grid. Supports fixed columns (1-12), auto-fill/auto-fit with minChildWidth, flow control, and responsive collapse via container queries.",
    avoidWhen: "You need a single-axis layout - use Stack instead.",
    semanticRole: "none (layout primitive)",
    props: {
      columns: { type: "GridColumns", values: GRID_COLUMNS, default: 1, description: "Number of columns or 'auto-fill'/'auto-fit' for responsive grids." },
      minChildWidth: { type: "string", description: "CSS length for auto-fill/fit minmax (e.g. '200px'). Only used with auto-fill/auto-fit columns." },
      gap: { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, default: "grouped", description: "Gestalt-based spacing between grid items." },
      rows: { type: "number | string", description: "Number → repeat(N,1fr), string → verbatim grid-template-rows." },
      flow: { type: "GridFlow", values: GRID_FLOWS, description: "Grid auto-flow direction." },
      align: { type: "GridAlignment", values: GRID_ALIGNMENTS, default: "stretch", description: "Cross-axis alignment of grid items (align-items)." },
      justify: { type: "GridAlignment", values: GRID_ALIGNMENTS, description: "Inline-axis alignment of grid items (justify-items)." },
      placeContent: { type: "GridPlaceContent", values: GRID_PLACE_CONTENT, description: "Shorthand for align-content + justify-content." },
      inline: { type: "boolean", default: false, description: "Use inline-grid display." }
    },
    slots: ["default"]
  },
  {
    name: "GridItem",
    importPath: "sg/grid",
    category: "layout",
    description: "Grid item with span, placement, and self-alignment controls.",
    whenToUse: "Controlling individual grid item placement within a Grid.",
    semanticRole: "none (layout primitive)",
    parent: "Grid",
    props: {
      span: { type: "GridSpan", values: GRID_SPANS, description: "Number of columns to span." },
      rowSpan: { type: "number", values: [1,2,3,4,5,6], description: "Number of rows to span." },
      start: { type: "number", values: [1,2,3,4,5,6,7,8,9,10,11,12,13], description: "Grid column start line." },
      rowStart: { type: "number", values: [1,2,3,4,5,6,7], description: "Grid row start line." },
      area: { type: "string", description: "Named grid area (grid-area)." },
      alignSelf: { type: "GridAlignment", values: GRID_ALIGNMENTS, description: "Cross-axis alignment for this item." },
      justifySelf: { type: "GridAlignment", values: GRID_ALIGNMENTS, description: "Inline-axis alignment for this item." }
    },
    slots: ["default"]
  },
  {
    name: "Callout",
    importPath: "sg/callout",
    category: "feedback",
    description: "In-flow message container for emphasized status or guidance.",
    whenToUse: "Highlighting warnings, tips, success states, or critical inline messages.",
    avoidWhen: "Transient notifications that should auto-dismiss (use Toast).",
    semanticRole: "status",
    props: {
      variant: { type: "string", values: ["default","success","warning","danger"], default: "default", description: "Visual emphasis variant." },
      size: { type: "Size", values: SIZES, default: "md", description: "Callout size scale." }
    },
    slots: ["default"]
  },
  {
    name: "ButtonGroup",
    importPath: "sg/button-group",
    category: "basic",
    description: "Groups related buttons together with shared size and color context. Renders role='group'.",
    whenToUse: "To group related actions that share visual styling (e.g. toolbar buttons).",
    avoidWhen: "For a single button or unrelated actions.",
    semanticRole: "group",
    props: {
      size: { type: "Size", values: SIZES, default: "md", description: "Button size for all children" },
      color: { type: "ColorVariant", values: COLOR_VARIANTS, description: "Color for all children" },
      orientation: { type: "string", values: ["horizontal","vertical"], default: "horizontal", description: "Layout direction" }
    },
    slots: ["default"]
  },
  {
    name: "ComboboxRoot",
    importPath: "sg/combobox",
    category: "overlay",
    description: "Root controller for an autocomplete combobox. Combines text input with dropdown listbox.",
    whenToUse: "Searchable/filterable selection from many options (search, tagging, autocomplete).",
    avoidWhen: "Few options without search - use Select. Free text - use Input.",
    semanticRole: "combobox + listbox",
    accessibilityRequirements: "label is required. Input has role='combobox' with aria-autocomplete.",
    props: {
      label: { type: "string", required: true, description: "Accessible label for the combobox - required." },
      value: { type: "string", description: "Currently selected value." },
      placeholder: { type: "string", default: "Search...", description: "Placeholder text for the input." },
      disabled: { type: "boolean", default: false, description: "Disables the combobox." },
      onchange: { type: "(value: string) => void", description: "Called when selection changes." }
    },
    slots: ["default"]
  },
  {
    name: "ComboboxInput",
    importPath: "sg/combobox",
    category: "overlay",
    description: "Text input for the Combobox with autocomplete.",
    whenToUse: "Always inside a ComboboxRoot.",
    semanticRole: "combobox",
    parent: "ComboboxRoot",
    props: {},
    slots: []
  },
  {
    name: "ComboboxContent",
    importPath: "sg/combobox",
    category: "overlay",
    description: "Dropdown container for ComboboxItems.",
    whenToUse: "Always inside a ComboboxRoot.",
    semanticRole: "listbox",
    parent: "ComboboxRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "ComboboxItem",
    importPath: "sg/combobox",
    category: "overlay",
    description: "Single option inside a Combobox.",
    whenToUse: "Always inside ComboboxContent.",
    semanticRole: "option",
    parent: "ComboboxRoot",
    props: {
      value: { type: "string", required: true, description: "Unique value for this option." },
      disabled: { type: "boolean", default: false, description: "Disables this option." }
    },
    slots: ["default"]
  },
  {
    name: "ComboboxEmpty",
    importPath: "sg/combobox",
    category: "overlay",
    description: "Empty state shown when no Combobox items match.",
    whenToUse: "Always inside ComboboxContent.",
    parent: "ComboboxRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "ComboboxGroup",
    importPath: "sg/combobox",
    category: "overlay",
    description: "Groups related combobox options with an optional heading.",
    whenToUse: "Inside ComboboxContent to organize larger option sets.",
    semanticRole: "group",
    parent: "ComboboxRoot",
    props: {
      heading: { type: "string", description: "Group heading label." }
    },
    slots: ["default"]
  },
  {
    name: "ComboboxSeparator",
    importPath: "sg/combobox",
    category: "overlay",
    description: "Visual separator between combobox groups or sections.",
    whenToUse: "Inside ComboboxContent between item groups.",
    semanticRole: "separator",
    parent: "ComboboxRoot",
    props: {},
    slots: []
  },
  {
    name: "FormatBytes",
    importPath: "sg/format-bytes",
    category: "data-display",
    description: "Formats byte counts into human-readable units.",
    whenToUse: "Displaying file sizes or storage/network metrics.",
    semanticRole: "text",
    props: {
      value: { type: "number", required: true, description: "Raw byte value." },
      decimals: { type: "number", default: 1, description: "Fraction digits for formatted output." }
    },
    slots: []
  },
  {
    name: "CopyButton",
    importPath: "sg/copy-button",
    category: "form",
    description: "Action control that copies a resolved value to the clipboard.",
    whenToUse: "Copying code snippets, URLs, IDs, or generated values.",
    avoidWhen: "Standard button actions that do not involve clipboard writes.",
    semanticRole: "button",
    accessibilityRequirements: "Requires visible text or aria-label.",
    props: {
      for: { type: "string", description: "CSS selector used to resolve target text/value." },
      value: { type: "string", description: "Explicit value to copy (overrides for selector)." },
      "success-text": { type: "string", description: "Temporary label shown after a successful copy." },
      timeout: { type: "number", default: 1200, description: "Success-state reset delay in milliseconds." },
      disabled: { type: "boolean", default: false, description: "Disable copy action." }
    },
    slots: ["default"]
  },
  {
    name: "SkipLink",
    importPath: "sg/skip-link",
    category: "navigation",
    description: "Renders one or more skip links for keyboard users to jump to major page regions.",
    whenToUse: "At the top of app/page layouts to improve keyboard navigation.",
    semanticRole: "navigation",
    accessibilityRequirements: "Targets should be focusable and have stable IDs.",
    props: {
      links: { type: "SkipLinkConfig[]", description: "Array of skip link configs. Defaults to standard main/nav targets." }
    },
    slots: []
  },
  {
    name: "Chart",
    importPath: "sg/chart",
    category: "data-display",
    description: "Pure SVG chart component supporting bar, line, area, pie, and donut types. Includes a hidden accessible <table> for screen readers.",
    whenToUse: "For data visualization with simple datasets.",
    avoidWhen: "For complex interactive charts - use a dedicated charting library.",
    semanticRole: "img",
    accessibilityRequirements: "role='img' with aria-label on SVG. Hidden <table> provides accessible data.",
    props: {
      type: { type: "ChartType", values: ["bar","line","area","pie","donut"], required: true, description: "Chart type" },
      data: { type: "ChartDataPoint[]", required: true, description: "Array of {label, value, color?} data points" },
      width: { type: "string", default: "100%", description: "Chart width" },
      height: { type: "string", default: "300px", description: "Chart height" },
      color: { type: "ColorVariant", values: COLOR_VARIANTS, description: "Color variant" },
      showGrid: { type: "boolean", default: true, description: "Show grid lines (bar/line/area)" },
      showLabels: { type: "boolean", default: true, description: "Show axis labels" },
      label: { type: "string", required: true, description: "Accessible label for the chart" }
    },
    slots: []
  },
  {
    name: "Rating",
    importPath: "sg/rating",
    category: "form",
    description: "Star-based rating control with optional read-only mode.",
    whenToUse: "Capturing preference or satisfaction on a fixed discrete scale.",
    semanticRole: "slider",
    props: {
      value: { type: "number", default: 0, description: "Selected rating value." },
      max: { type: "number", default: 5, description: "Maximum selectable rating." },
      readonly: { type: "boolean", default: false, description: "Prevents user interaction when true." },
      "data-style": { type: "string", values: ["star","heart"], default: "star", description: "Visual style of the rating symbols." }
    },
    slots: []
  },
  {
    name: "Card",
    importPath: "sg/card",
    category: "basic",
    description: "Surface container with optional elevation and padding.",
    whenToUse: "Grouping related content into a distinct visual container with depth.",
    avoidWhen: "Content doesn't need visual separation - use Stack or a plain container.",
    semanticRole: "article or region (depending on content)",
    props: {
      elevation: { type: "Elevation", values: ELEVATIONS, default: 1, description: "Shadow depth level (0 = flat, 5 = highest)." },
      padding: { type: "boolean | Size", default: false, description: "Internal padding. true maps to 'md'. Accepts 'sm', 'md', 'lg'." },
      size: { type: "Size", values: SIZES, description: "Card width variant." },
      density: { type: "Density", values: DENSITIES, description: "Adjusts internal spacing scale." }
    },
    slots: ["default"]
  },
  {
    name: "CardHeader",
    importPath: "sg/card",
    category: "basic",
    description: "Header section inside a Card.",
    whenToUse: "Adding a title/header area to a Card.",
    parent: "Card",
    props: {},
    slots: ["default"]
  },
  {
    name: "CardBody",
    importPath: "sg/card",
    category: "basic",
    description: "Body section inside a Card.",
    whenToUse: "Adding the main content area of a Card.",
    parent: "Card",
    props: {},
    slots: ["default"]
  },
  {
    name: "CardFooter",
    importPath: "sg/card",
    category: "basic",
    description: "Footer section inside a Card.",
    whenToUse: "Adding actions or metadata at the bottom of a Card.",
    parent: "Card",
    props: {},
    slots: ["default"]
  },
  {
    name: "CardTitle",
    importPath: "sg/card",
    category: "basic",
    description: "Title heading inside a CardHeader.",
    whenToUse: "Adding a semantic title to a Card header.",
    semanticRole: "heading",
    parent: "Card",
    props: {
      as: { type: "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\"", default: "h3", description: "Heading level for semantic structure." }
    },
    slots: ["default"]
  },
  {
    name: "CardDescription",
    importPath: "sg/card",
    category: "basic",
    description: "Description text inside a CardHeader.",
    whenToUse: "Adding supplementary description text below a CardTitle.",
    semanticRole: "text",
    parent: "Card",
    props: {},
    slots: ["default"]
  },
  {
    name: "CardAction",
    importPath: "sg/card",
    category: "basic",
    description: "Action area aligned to the right in a CardHeader.",
    whenToUse: "Adding action buttons or icons to the card header, aligned to the end.",
    semanticRole: "group",
    parent: "Card",
    props: {},
    slots: ["default"]
  },
  {
    name: "Stack",
    importPath: "sg/stack",
    category: "layout",
    description: "Flex container with Gestalt-based spacing relationships.",
    whenToUse: "Arranging elements vertically or horizontally with consistent spacing.",
    avoidWhen: "You need a 2D grid layout - use Grid instead.",
    semanticRole: "none (layout primitive)",
    props: {
      gap: { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, default: "grouped", description: "Gestalt-based spacing between children. 'related' is tightest, 'distinct' is widest." },
      relationship: { type: "SpacingRelationship | 'auto'", values: ["related","grouped","separated","distinct","auto"], description: "Alias for gap. Use 'auto' with data-depth to derive spacing by nesting level." },
      direction: { type: "string", values: ["vertical","horizontal"], default: "vertical", description: "Main axis direction for child elements." },
      align: { type: "string", values: GRID_ALIGNMENTS, description: "Cross-axis alignment of children." },
      wrap: { type: "boolean", default: false, description: "Allow children to wrap to next line when they overflow." },
      density: { type: "Density", values: DENSITIES, description: "Adjusts spacing scale for compact or spacious layouts." }
    },
    slots: ["default"]
  },
  {
    name: "FormatDate",
    importPath: "sg/format-date",
    category: "data-display",
    description: "Localized date/time formatter backed by Intl.DateTimeFormat.",
    whenToUse: "Presenting locale-aware dates and timestamps.",
    semanticRole: "text",
    props: {
      value: { type: "string", required: true, description: "ISO date/time input." },
      locale: { type: "string", description: "Optional locale override (defaults to browser locale)." },
      "date-style": { type: "string", values: ["full","long","medium","short"], default: "medium", description: "Date presentation style." },
      "time-style": { type: "string", values: ["full","long","medium","short"], description: "Optional time presentation style." }
    },
    slots: []
  },
  {
    name: "Cover",
    importPath: "sg/cover",
    category: "layout",
    description: "Viewport-covering layout with centered content. Fills available height and centers child on both axes.",
    whenToUse: "Hero sections, login pages, 404 pages, full-screen modal content. Any content that should be vertically and horizontally centered.",
    avoidWhen: "Normal flow content that doesn't need viewport coverage - use Stack or Container.",
    semanticRole: "none (layout primitive)",
    props: {
      minHeight: { type: "string", default: "100vh", description: "Minimum height. Use '100vh' for viewport, or any CSS length." },
      gap: { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, default: "grouped", description: "Gestalt-based spacing between children." },
      padding: { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, description: "Padding around the centered content." }
    },
    slots: ["default"]
  },
  {
    name: "Checkbox",
    importPath: "sg/checkbox",
    category: "form",
    description: "Machine-driven checkbox web component with checked, unchecked, and optional indeterminate states.",
    whenToUse: "Binary yes/no choices, or selecting multiple items from a list.",
    avoidWhen: "Mutually exclusive options - use RadioGroup. On/off toggle - consider Switch.",
    semanticRole: "checkbox",
    accessibilityRequirements: "Requires associated label or aria-label.",
    props: {
      checked: { type: "boolean", default: false, description: "Initial checked state." },
      indeterminate: { type: "boolean", default: false, description: "Initial mixed state. First user toggle resolves to checked." },
      disabled: { type: "boolean", default: false, description: "Disables interaction and form submission." },
      "aria-label": { type: "string", description: "Accessible label when no visible text label is provided." },
      name: { type: "string", description: "Form field name forwarded to the internal input control." },
      value: { type: "string", description: "Form value submitted when checked." }
    },
    slots: ["default"]
  },
  {
    name: "Text",
    importPath: "sg/text",
    category: "layout",
    description: "Typography primitive for body text with size, color, and weight.",
    whenToUse: "Rendering body text, captions, labels, or any non-heading text.",
    avoidWhen: "You need a heading - use Heading instead.",
    semanticRole: "paragraph or inline text",
    props: {
      size: { type: "TextSize", values: TEXT_SIZES, default: "base", description: "Visual text size." },
      color: { type: "string", values: TEXT_COLORS, default: "primary", description: "Semantic text color." },
      weight: { type: "string", values: WEIGHTS, default: "normal", description: "Font weight." },
      align: { type: "string", values: ALIGNS, description: "Text alignment." },
      as: { type: "string", values: ["p","span","div","label"], default: "p", description: "HTML element to render." }
    },
    slots: ["default"]
  },
  {
    name: "ResizeObserver",
    importPath: "sg/resize-observer",
    category: "layout",
    description: "Declarative ResizeObserver bridge that emits resize events.",
    whenToUse: "Adapting UI when observed element dimensions change.",
    semanticRole: "none",
    props: {
      for: { type: "string", description: "CSS selector for observed target (defaults to parent)." }
    },
    slots: []
  },
  {
    name: "Popup",
    importPath: "sg/popup",
    category: "overlay",
    description: "Positioned popup surface for lightweight floating content.",
    whenToUse: "Simple floating content where full Popover behavior is unnecessary.",
    semanticRole: "group",
    props: {
      open: { type: "boolean", default: false, description: "Whether popup is visible." }
    },
    slots: ["default"]
  },
  {
    name: "AnimatedImage",
    importPath: "sg/animated-image",
    category: "data-display",
    description: "Image wrapper that can swap to a reduced-motion source when the user prefers less motion.",
    whenToUse: "Rendering animated media while respecting reduced-motion preferences.",
    avoidWhen: "Static imagery with no alternate source requirement.",
    semanticRole: "img",
    props: {
      src: { type: "string", required: true, description: "Primary image source." },
      "reduced-src": { type: "string", description: "Fallback source used when prefers-reduced-motion is enabled." },
      alt: { type: "string", default: "", description: "Accessible alternative text." }
    },
    slots: []
  },
  {
    name: "Typewriter",
    importPath: "sg/typewriter",
    category: "feedback",
    description: "Animated text typing effect that reveals characters one at a time.",
    whenToUse: "Hero text animation, terminal effects, chatbot-style message reveal.",
    avoidWhen: "Static content that doesn't benefit from animation. Long paragraphs - can be disorienting.",
    semanticRole: "status",
    accessibilityRequirements: "Sets aria-label to the full text so screen readers get the complete content immediately.",
    props: {
      text: { type: "string | string[]", required: true, description: "Text to type out. Pass a string[] to cycle through multiple strings (type → pause → delete → next)." },
      speed: { type: "number", default: 50, description: "Milliseconds between each character." },
      delay: { type: "number", default: 0, description: "Milliseconds to wait before typing starts." },
      cursor: { type: "boolean", default: true, description: "Show a blinking cursor after the typed text." },
      loop: { type: "boolean", default: false, description: "Loop the animation. When text is a string[], always cycles regardless of this prop." },
      pauseBetween: { type: "number", default: 1500, description: "Milliseconds to pause at the end before deleting (when looping or cycling)." },
      paused: { type: "boolean", default: false, description: "Pause the animation. Resumes from current position when set back to false." }
    },
    slots: []
  },
  {
    name: "Avatar",
    importPath: "sg/avatar",
    category: "data-display",
    description: "User avatar with image, fallback initials, and size variants.",
    whenToUse: "Representing a user or entity with their photo or initials.",
    avoidWhen: "Displaying a generic icon - use Icon.",
    semanticRole: "img",
    accessibilityRequirements: "alt is required. Falls back to initials derived from alt text.",
    props: {
      src: { type: "string", description: "Image URL." },
      alt: { type: "string", required: true, description: "Alt text - required for accessibility. Initials are derived from this." },
      fallback: { type: "string", description: "Explicit initials or text shown when image fails." },
      size: { type: "Size", values: SIZES, default: "md", description: "Avatar size." }
    },
    slots: ["default"]
  },
  {
    name: "AvatarImage",
    importPath: "sg/avatar",
    category: "data-display",
    description: "Image element inside an Avatar.",
    whenToUse: "Always inside an Avatar.",
    parent: "Avatar",
    props: {},
    slots: []
  },
  {
    name: "AvatarFallback",
    importPath: "sg/avatar",
    category: "data-display",
    description: "Fallback content when Avatar image is missing.",
    whenToUse: "Always inside an Avatar.",
    parent: "Avatar",
    props: {},
    slots: ["default"]
  },
  {
    name: "TabsRoot",
    importPath: "sg/tabs",
    category: "navigation",
    description: "Root controller for tabbed navigation. Supports keyboard navigation with arrow keys.",
    whenToUse: "Switching between panels of related content in the same view.",
    avoidWhen: "Page-level navigation - use links/router. Sequential steps - use a wizard.",
    semanticRole: "tablist + tabpanel",
    accessibilityRequirements: "Arrow keys navigate tabs. Home/End jump to first/last tab. Tab panels are linked via aria-controls.",
    props: {
      value: { type: "string", description: "Active tab value. Bindable." },
      defaultValue: { type: "string", description: "Initial tab value when uncontrolled." },
      onchange: { type: "(value: string) => void", description: "Called when active tab changes." }
    },
    slots: ["default"]
  },
  {
    name: "TabsList",
    importPath: "sg/tabs",
    category: "navigation",
    description: "Container for TabsTrigger buttons. Handles keyboard navigation.",
    whenToUse: "Always inside a TabsRoot.",
    semanticRole: "tablist",
    parent: "TabsRoot",
    props: {
      loop: { type: "boolean", default: true, description: "Whether keyboard navigation loops from last to first tab." }
    },
    slots: ["default"]
  },
  {
    name: "TabsTrigger",
    importPath: "sg/tabs",
    category: "navigation",
    description: "Button that activates a tab panel.",
    whenToUse: "Always inside a TabsList.",
    semanticRole: "tab",
    parent: "TabsRoot",
    props: {
      value: { type: "string", required: true, description: "Matches the TabsContent value to activate." },
      disabled: { type: "boolean", default: false, description: "Disables this tab." }
    },
    slots: ["default"]
  },
  {
    name: "TabsContent",
    importPath: "sg/tabs",
    category: "navigation",
    description: "Panel content for a tab.",
    whenToUse: "Always inside a TabsRoot, paired with a TabsTrigger by value.",
    semanticRole: "tabpanel",
    parent: "TabsRoot",
    props: {
      value: { type: "string", required: true, description: "Matches the TabsTrigger value." }
    },
    slots: ["default"]
  },
  {
    name: "Empty",
    importPath: "sg/empty",
    category: "feedback",
    description: "Empty state placeholder with optional icon, title, description, and action slots.",
    whenToUse: "When a list, table, or section has no content to display.",
    avoidWhen: "For error states - use Alert instead.",
    props: {
      title: { type: "string", description: "Empty state heading" },
      description: { type: "string", description: "Explanatory text" }
    },
    slots: ["default","icon","actions"]
  },
  {
    name: "DialogRoot",
    importPath: "sg/dialog",
    category: "overlay",
    description: "Root controller for a modal dialog. Uses native <dialog> element for top-layer rendering, focus trapping, and backdrop.",
    whenToUse: "Modal interactions requiring user attention (confirmation, forms, detail views).",
    avoidWhen: "Non-blocking information - use Popover. Destructive confirmations - use AlertDialog.",
    semanticRole: "dialog",
    accessibilityRequirements: "DialogContent requires aria-label or aria-labelledby. Focus is automatically trapped by native <dialog>.",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      onclose: { type: "() => void", description: "Called when dialog is dismissed." }
    },
    slots: ["default"]
  },
  {
    name: "DialogTrigger",
    importPath: "sg/dialog",
    category: "overlay",
    description: "Button that opens the parent Dialog. Renders a semantic <button> with aria-haspopup='dialog'.",
    whenToUse: "Always inside a DialogRoot to provide the open trigger.",
    semanticRole: "button",
    parent: "DialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DialogContent",
    importPath: "sg/dialog",
    category: "overlay",
    description: "Content panel of a Dialog. Uses native <dialog> with showModal(). Requires aria-label or aria-labelledby for accessibility.",
    whenToUse: "Always inside a DialogRoot to provide the dialog content.",
    semanticRole: "dialog",
    accessibilityRequirements: "Must have aria-label or aria-labelledby (enforced by ModalLabelProps type).",
    parent: "DialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DialogClose",
    importPath: "sg/dialog",
    category: "overlay",
    description: "Button that closes the Dialog when clicked.",
    whenToUse: "Inside DialogContent, typically in DialogFooter or as a close button in the header.",
    semanticRole: "button",
    parent: "DialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DialogHeader",
    importPath: "sg/dialog",
    category: "overlay",
    description: "Header section of a Dialog containing title and description.",
    whenToUse: "At the top of DialogContent to provide consistent header layout.",
    semanticRole: "section",
    parent: "DialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DialogTitle",
    importPath: "sg/dialog",
    category: "overlay",
    description: "Title heading of a Dialog. Announced by screen readers when the dialog opens.",
    whenToUse: "Inside DialogHeader. Always required for accessible dialogs.",
    semanticRole: "heading",
    accessibilityRequirements: "Required for accessible dialogs. Use aria-labelledby on DialogContent pointing to this title.",
    parent: "DialogRoot",
    props: {
      as: { type: "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\"", default: "h2", description: "Heading level for semantic structure." }
    },
    slots: ["default"]
  },
  {
    name: "DialogDescription",
    importPath: "sg/dialog",
    category: "overlay",
    description: "Description text for a Dialog providing additional context.",
    whenToUse: "Inside DialogHeader, below DialogTitle.",
    semanticRole: "text",
    parent: "DialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DialogFooter",
    importPath: "sg/dialog",
    category: "overlay",
    description: "Footer section of a Dialog containing action buttons.",
    whenToUse: "At the bottom of DialogContent, typically containing confirmation and cancel buttons.",
    semanticRole: "section",
    parent: "DialogRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "AspectRatio",
    importPath: "sg/aspect-ratio",
    category: "layout",
    description: "Constrains children to a given aspect ratio using CSS aspect-ratio.",
    whenToUse: "For images, videos, or embeds that need a consistent aspect ratio.",
    avoidWhen: "When content should flow naturally without ratio constraints.",
    props: {
      ratio: { type: "number", default: 1, description: "Width-to-height ratio (e.g. 16/9)" }
    },
    slots: ["default"]
  },
  {
    name: "PaginationRoot",
    importPath: "sg/pagination",
    category: "navigation",
    description: "Pagination navigation for paged content. Renders a <nav> with aria-label.",
    whenToUse: "For lists or tables that split content across multiple pages.",
    avoidWhen: "For infinite scroll - use intersection observer instead.",
    semanticRole: "navigation",
    accessibilityRequirements: "aria-label='Pagination' on nav. aria-current='page' on active page.",
    props: {
      page: { type: "number", required: true, description: "Current active page (1-indexed)" },
      total: { type: "number", required: true, description: "Total number of items" },
      perPage: { type: "number", default: 10, description: "Items per page" },
      siblingCount: { type: "number", default: 1, description: "Number of page buttons on each side of active" }
    },
    slots: ["default"]
  },
  {
    name: "PaginationFirst",
    importPath: "sg/pagination",
    category: "navigation",
    description: "First page button. Disabled when on page 1.",
    whenToUse: "For quick navigation to the first page of results.",
    parent: "PaginationRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "PaginationPrevious",
    importPath: "sg/pagination",
    category: "navigation",
    description: "Previous page button. Disabled when on page 1.",
    parent: "PaginationRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "PaginationNext",
    importPath: "sg/pagination",
    category: "navigation",
    description: "Next page button. Disabled when on last page.",
    parent: "PaginationRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "PaginationLast",
    importPath: "sg/pagination",
    category: "navigation",
    description: "Last page button. Disabled when on last page.",
    whenToUse: "For quick navigation to the last page of results.",
    parent: "PaginationRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "PaginationItems",
    importPath: "sg/pagination",
    category: "navigation",
    description: "Renders the computed page number buttons with ellipsis.",
    parent: "PaginationRoot",
    props: {},
    slots: []
  },
  {
    name: "PaginationEllipsis",
    importPath: "sg/pagination",
    category: "navigation",
    description: "Standalone ellipsis indicator for skipped pages.",
    parent: "PaginationRoot",
    props: {},
    slots: []
  },
  {
    name: "Tag",
    importPath: "sg/tag",
    category: "form",
    description: "Compact label/chip with optional remove affordance.",
    whenToUse: "Representing selected filters, categories, or tokenized values.",
    semanticRole: "status",
    props: {
      variant: { type: "string", values: ["default","primary","secondary"], default: "default", description: "Visual variant." },
      size: { type: "Size", values: SIZES, default: "md", description: "Tag size." },
      removable: { type: "boolean", default: false, description: "Shows remove affordance and emits removal intent." }
    },
    slots: ["default"]
  },
  {
    name: "Skeleton",
    importPath: "sg/skeleton",
    category: "feedback",
    description: "Placeholder loading animation.",
    whenToUse: "Showing placeholder shapes while content is loading.",
    avoidWhen: "You know the progress percentage - use Progress.",
    semanticRole: "none (presentational)",
    props: {
      width: { type: "string", description: "CSS width value." },
      height: { type: "string", description: "CSS height value." },
      circle: { type: "boolean", default: false, description: "Renders as a circle." }
    },
    slots: []
  },
  {
    name: "IconButton",
    importPath: "sg/icon-button",
    category: "form",
    description: "Compact icon-only action button with button-like semantics.",
    whenToUse: "Toolbar actions where icon-only affordance is appropriate.",
    avoidWhen: "Primary actions that need explicit text labels.",
    semanticRole: "button",
    accessibilityRequirements: "Requires aria-label when no visible text is present.",
    props: {
      size: { type: "Size", values: SIZES, default: "md", description: "Button size." },
      color: { type: "ColorVariant", values: COLOR_VARIANTS, default: "ghost", description: "Visual color treatment." },
      disabled: { type: "boolean", default: false, description: "Disable interaction." },
      pressed: { type: "boolean", description: "Optional toggle pressed state for aria-pressed semantics." }
    },
    slots: ["default"]
  },
  {
    name: "Switcher",
    importPath: "sg/switcher",
    category: "layout",
    description: "Container query driven row-to-column switching. Automatically switches between horizontal and vertical layout based on container width.",
    whenToUse: "Responsive layouts that need to switch from horizontal to vertical when space is limited. Side-by-side content that stacks on narrow viewports.",
    avoidWhen: "You need a 2D grid layout - use Grid. You need simple flex wrapping - use Cluster.",
    semanticRole: "none (layout primitive)",
    props: {
      threshold: { type: "string", default: "30rem", description: "Container width threshold for switching to vertical layout. Any CSS length value." },
      gap: { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, default: "grouped", description: "Gestalt-based spacing between children." },
      align: { type: "string", values: GRID_ALIGNMENTS, default: "stretch", description: "Cross-axis alignment of children." },
      limit: { type: "number", values: [2,3,4,5,6], default: 4, description: "Max items to show in horizontal row. Remaining items wrap to new row." }
    },
    slots: ["default"]
  },
  {
    name: "ScrollAreaRoot",
    importPath: "sg/scroll-area",
    category: "data-display",
    description: "Root container for a custom scroll area.",
    whenToUse: "Custom-styled scrollbars for content areas.",
    avoidWhen: "Native scrollbars are acceptable - use CSS overflow.",
    semanticRole: "none (container)",
    props: {
      type: { type: "string", values: ["auto","always","scroll","hover"], default: "hover", description: "Scrollbar visibility behavior." }
    },
    slots: ["default"]
  },
  {
    name: "ScrollAreaViewport",
    importPath: "sg/scroll-area",
    category: "data-display",
    description: "Scrollable viewport inside a ScrollArea.",
    whenToUse: "Always inside a ScrollAreaRoot.",
    parent: "ScrollAreaRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "ScrollAreaScrollbar",
    importPath: "sg/scroll-area",
    category: "data-display",
    description: "Custom scrollbar overlay for a ScrollArea.",
    whenToUse: "Always inside a ScrollAreaRoot.",
    parent: "ScrollAreaRoot",
    props: {
      orientation: { type: "string", values: ["vertical","horizontal"], default: "vertical", description: "Scroll direction." }
    },
    slots: []
  },
  {
    name: "SidebarRoot",
    importPath: "sg/sidebar",
    category: "navigation",
    description: "Collapsible side navigation panel. Renders as <aside> with expandable/collapsible state.",
    whenToUse: "For persistent app-level navigation in dashboard or admin layouts.",
    avoidWhen: "For temporary navigation panels - use Sheet or Drawer.",
    semanticRole: "complementary",
    accessibilityRequirements: "aria-label on <aside>. Toggle button for collapse/expand.",
    props: {
      state: { type: "string", values: ["expanded","collapsed"], default: "expanded", description: "Current sidebar state" },
      collapsible: { type: "boolean", default: true, description: "Whether sidebar can be collapsed" },
      width: { type: "string", default: "16rem", description: "Width when expanded" },
      collapsedWidth: { type: "string", default: "4rem", description: "Width when collapsed" },
      side: { type: "string", values: ["left","right"], default: "left", description: "Which side of the viewport" }
    },
    slots: ["default"]
  },
  {
    name: "SidebarHeader",
    importPath: "sg/sidebar",
    category: "navigation",
    description: "Header section of a Sidebar (logo, brand, etc.).",
    parent: "SidebarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SidebarContent",
    importPath: "sg/sidebar",
    category: "navigation",
    description: "Main scrollable content area of a Sidebar.",
    parent: "SidebarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SidebarFooter",
    importPath: "sg/sidebar",
    category: "navigation",
    description: "Footer section of a Sidebar (settings, user info, etc.).",
    parent: "SidebarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SidebarSection",
    importPath: "sg/sidebar",
    category: "navigation",
    description: "Collapsible navigation section with optional title.",
    parent: "SidebarRoot",
    props: {
      title: { type: "string", description: "Section heading" },
      collapsible: { type: "boolean", default: false, description: "Whether section can collapse" },
      defaultOpen: { type: "boolean", default: true, description: "Initial open state" }
    },
    slots: ["default"]
  },
  {
    name: "SidebarItem",
    importPath: "sg/sidebar",
    category: "navigation",
    description: "Navigation item inside a SidebarSection. Link or button.",
    parent: "SidebarRoot",
    props: {
      href: { type: "string", description: "Link URL" },
      active: { type: "boolean", default: false, description: "Active/selected state" },
      disabled: { type: "boolean", default: false, description: "Disable item" }
    },
    slots: ["default"]
  },
  {
    name: "SidebarToggle",
    importPath: "sg/sidebar",
    category: "navigation",
    description: "Button that toggles sidebar between expanded and collapsed.",
    parent: "SidebarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SidebarSeparator",
    importPath: "sg/sidebar",
    category: "navigation",
    description: "Visual separator between sidebar sections.",
    whenToUse: "Between SidebarSection components to create visual grouping.",
    semanticRole: "separator",
    parent: "SidebarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "Container",
    importPath: "sg/container",
    category: "layout",
    description: "Centered max-width container with size breakpoints.",
    whenToUse: "Wrapping page content to constrain width and center it.",
    avoidWhen: "Content should be full-width with no max constraint.",
    semanticRole: "none (layout primitive)",
    props: {
      size: { type: "string", values: CONTAINER_SIZES, default: "lg", description: "Max-width breakpoint. 'full' removes the constraint." },
      padding: { type: "boolean", default: true, description: "Add horizontal padding to prevent content touching edges." }
    },
    slots: ["default"]
  },
  {
    name: "SplitPanel",
    importPath: "sg/split-panel",
    category: "layout",
    description: "Two-pane layout container with horizontal or vertical direction.",
    whenToUse: "Side-by-side or stacked dual-panel interfaces.",
    semanticRole: "group",
    props: {
      direction: { type: "string", values: ["horizontal","vertical"], default: "horizontal", description: "Panel arrangement axis." }
    },
    slots: ["default"]
  },
  {
    name: "LayoutIdProvider",
    importPath: "sg/layout-id",
    category: "layout",
    description: "Context provider for shared layout-id FLIP transitions.",
    whenToUse: "Wrap regions where elements with matching layoutId should animate across re-layouts.",
    semanticRole: "none (provider)",
    props: {
      flipOptions: { type: "FlipOptions", description: "Default FLIP animation options inherited by children." }
    },
    slots: ["default"]
  },
  {
    name: "LayoutIdItem",
    importPath: "sg/layout-id",
    category: "layout",
    description: "Registers an element for shared layout-id transitions within a LayoutIdProvider.",
    whenToUse: "Inside LayoutIdProvider for each animating element.",
    semanticRole: "none (animation wrapper)",
    parent: "LayoutIdProvider",
    props: {
      layoutId: { type: "string", required: true, description: "Shared layout identifier used to correlate element positions." },
      flipOptions: { type: "FlipOptions", description: "Per-item FLIP options overriding provider defaults." }
    },
    slots: ["default"]
  },
  {
    name: "ColorPicker",
    importPath: "sg/color-picker",
    category: "form",
    description: "Canvas-based OKLCH color picker with a hue ring and an inner 2D lightness/chroma crosshair. Supports dual-mode API: hex string (value) or decomposed OKLCH (hue/lightness/chroma). Renders as swatch+ring inline, or swatch-triggered popover ring.",
    whenToUse: "When users need to select a color with full hue, lightness, and chroma control in a single compact widget.",
    avoidWhen: "When the user needs to pick from a predefined set of colors - use a Select or RadioGroup with color swatches instead.",
    semanticRole: "slider",
    accessibilityRequirements: ["label prop is required for the hue slider","Keyboard (hue): Arrow keys ±1 (±10 with Shift), Home/End jump to 0/359","Keyboard (L/C): Up/Down adjust lightness ±0.01 (±0.1 with Shift), Left/Right adjust chroma ±0.005 (±0.05 with Shift)","role=\"slider\" on canvas for hue and on hidden div for L/C"],
    props: {
      value: { type: "string", description: "Current color as hex string (bindable). Dual-mode: use value OR hue/lightness/chroma." },
      hue: { type: "number", default: 0, description: "Hue angle 0–360 (bindable)" },
      lightness: { type: "number", default: 0.7, description: "OKLCH lightness 0–1 (bindable)" },
      chroma: { type: "number", default: 0.15, description: "OKLCH chroma 0–0.4 (bindable)" },
      size: { type: "number", default: 50, description: "Ring outer diameter in base units (1bu = --sg-base-unit). Overridden by ringSize." },
      ringSize: { type: "number", description: "Ring outer diameter in base units (overrides size for the ring)." },
      swatchSize: { type: "number", description: "Swatch size in base units (inline swatch or trigger swatch). Defaults to ~20% of ringSize when inline." },
      thickness: { type: "number", default: 6, description: "Ring thickness in base units." },
      disabled: { type: "boolean", default: false, description: "Disable interaction." },
      label: { type: "string", required: true, description: "Accessible label for the hue slider." },
      swatch: { type: "boolean", default: false, description: "Reserved for compatibility." },
      showValue: { type: "boolean", default: false, description: "Display current value as read-only text (hex or OKLCH depending on mode)." },
      input: { type: "boolean", default: false, description: "Enable editable value inputs (hex in value mode; L/C/H numeric inputs in OKLCH mode)." },
      mode: { type: "string", values: ["inline","popover"], default: "inline", description: "Rendering mode. inline shows ring + swatch together; popover shows swatch/value and opens ring on click." },
      popover: { type: "boolean", default: false, description: "Backward-compatible alias for mode='popover'." },
      direction: { type: "string", values: ["top","bottom","left","right"], default: "bottom", description: "Direction of ring placement relative to swatch (inline) or popover placement (popover mode)." },
      onchange: { type: "function", description: "Fires with { hex, hue, lightness, chroma } on each change." }
    },
    slots: []
  },
  {
    name: "ProgressRing",
    importPath: "sg/progress-ring",
    category: "feedback",
    description: "Circular determinate progress indicator.",
    whenToUse: "Showing bounded completion percentage in compact spaces.",
    semanticRole: "progressbar",
    props: {
      value: { type: "number", default: 0, description: "Current progress value." },
      max: { type: "number", default: 100, description: "Maximum progress value." }
    },
    slots: []
  },
  {
    name: "AccordionRoot",
    importPath: "sg/accordion",
    category: "navigation",
    description: "Root controller for an accordion.",
    whenToUse: "Progressive disclosure of multiple sections (FAQs, settings groups).",
    avoidWhen: "Only one section to expand - use Collapsible.",
    semanticRole: "group of disclosure widgets",
    accessibilityRequirements: "Each item has a heading + button trigger. Keyboard: Enter/Space toggles, arrows navigate.",
    props: {
      multiple: { type: "boolean", default: false, description: "Allow multiple items open at once." }
    },
    slots: ["default"]
  },
  {
    name: "AccordionItem",
    importPath: "sg/accordion",
    category: "navigation",
    description: "Single collapsible item in an Accordion.",
    whenToUse: "Always inside an AccordionRoot.",
    semanticRole: "disclosure widget",
    parent: "AccordionRoot",
    props: {
      value: { type: "string", required: true, description: "Unique identifier for this item." },
      disabled: { type: "boolean", default: false, description: "Disables this item." }
    },
    slots: ["default"]
  },
  {
    name: "AccordionTrigger",
    importPath: "sg/accordion",
    category: "navigation",
    description: "Button that toggles an AccordionItem.",
    whenToUse: "Always inside an AccordionItem.",
    semanticRole: "button",
    parent: "AccordionRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "AccordionContent",
    importPath: "sg/accordion",
    category: "navigation",
    description: "Collapsible content of an AccordionItem.",
    whenToUse: "Always inside an AccordionItem.",
    semanticRole: "region",
    parent: "AccordionRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "QrCode",
    importPath: "sg/qr-code",
    category: "data-display",
    description: "QR-code-like visual encoding surface for short values.",
    whenToUse: "Displaying quick-scannable references for links and IDs.",
    semanticRole: "img",
    props: {
      value: { type: "string", required: true, description: "Encoded content value." },
      size: { type: "number", default: 128, description: "Rendered square size in CSS pixels." }
    },
    slots: []
  },
  {
    name: "Icon",
    importPath: "sg/icon",
    category: "data-display",
    description: "Icon wrapper with size, color, directional, and accessibility support. Supports SVG children and Material Symbols font mode (renders ligature when name is set without children). Decorative by default (aria-hidden). Set label for semantic icons.",
    whenToUse: "Displaying icons alongside text or as standalone meaningful symbols. Use font mode with Material Symbols for large icon sets.",
    avoidWhen: "User avatar - use Avatar. Decorative images - use <img>.",
    semanticRole: "img (when label is set) or none (decorative)",
    accessibilityRequirements: "Decorative icons are aria-hidden. Semantic icons require label prop for aria-label.",
    props: {
      name: { type: "string", description: "Icon name. In font mode (no children), rendered as ligature text for Material Symbols." },
      size: { type: "IconSize", values: ICON_SIZES, default: "default", description: "Icon size." },
      color: { type: "string", values: ICON_COLORS, default: "currentColor", description: "Icon color. Inherits from parent by default." },
      label: { type: "string", description: "Accessible label. When set, role='img' + aria-label are applied." },
      directional: { type: "boolean", default: false, description: "Whether to mirror in RTL layouts." },
      filled: { type: "boolean", default: false, description: "Uses filled icon variant (FILL axis 1 in font mode)." },
      variant: { type: "MaterialSymbolsVariant", values: MATERIAL_SYMBOLS_VARIANTS, default: "outlined", description: "Material Symbols font family variant. Only used in font mode." },
      weight: { type: "number", default: 400, description: "Font weight axis (wght: 100-700). Only used in font mode." },
      grade: { type: "number", default: 0, description: "Grade axis (GRAD: -50 to 200). Only used in font mode." }
    },
    slots: ["default"]
  },
  {
    name: "MenuRoot",
    importPath: "sg/menu",
    category: "navigation",
    description: "Root controller for a dropdown menu. Uses native Popover API for top-layer rendering and light dismiss.",
    whenToUse: "Contextual list of actions triggered from a button (more actions, user menu).",
    avoidWhen: "Navigation links - use a nav list. Form selection - use Select.",
    semanticRole: "menu",
    accessibilityRequirements: "MenuContent requires aria-label or aria-labelledby. Arrow keys navigate items.",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      onclose: { type: "() => void", description: "Called when menu is dismissed." }
    },
    slots: ["default"]
  },
  {
    name: "MenuTrigger",
    importPath: "sg/menu",
    category: "navigation",
    description: "Element that opens the Menu. Uses native popovertarget attribute.",
    whenToUse: "Always inside a MenuRoot to provide the open trigger.",
    semanticRole: "button",
    parent: "MenuRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "MenuContent",
    importPath: "sg/menu",
    category: "navigation",
    description: "Container for MenuItems. Uses native popover attribute.",
    whenToUse: "Always inside a MenuRoot.",
    semanticRole: "menu",
    accessibilityRequirements: "Must have aria-label or aria-labelledby (enforced by ModalLabelProps type).",
    parent: "MenuRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "MenuItem",
    importPath: "sg/menu",
    category: "navigation",
    description: "Single action item in a Menu.",
    whenToUse: "Always inside MenuContent.",
    semanticRole: "menuitem",
    accessibilityRequirements: "Must have visible text content or aria-label.",
    parent: "MenuRoot",
    props: {
      disabled: { type: "boolean", default: false, description: "Disables this menu item." },
      onselect: { type: "() => void", description: "Called when item is selected." }
    },
    slots: ["default"]
  },
  {
    name: "CodeBlock",
    importPath: "sg/code-block",
    category: "data-display",
    description: "Block-level code display with optional line numbers, line highlighting, and copy button.",
    whenToUse: "Multi-line code samples, configuration files, CLI output, code documentation.",
    avoidWhen: "Inline code in prose (use Code).",
    semanticRole: "none (semantic <pre><code>)",
    props: {
      code: { type: "string", required: true, description: "The code string to display." },
      language: { type: "string", description: "Programming language (displayed as data attribute for syntax highlighters)." },
      title: { type: "string", description: "Optional title shown in the header bar." },
      showLineNumbers: { type: "boolean", default: false, description: "Show line number gutter." },
      highlightLines: { type: "number[]", description: "Array of 1-indexed line numbers to highlight." },
      diff: { type: "boolean", default: false, description: "Enable diff mode – colors lines by +/- prefix." }
    },
    slots: ["highlighted"]
  },
  {
    name: "Spinner",
    importPath: "sg/spinner",
    category: "feedback",
    description: "Loading spinner animation with accessible label.",
    whenToUse: "Indicating loading state for actions or content.",
    avoidWhen: "Content placeholder - use Skeleton. Known progress - use Progress.",
    semanticRole: "status",
    accessibilityRequirements: "Uses role='status' with aria-label for screen readers.",
    props: {
      size: { type: "Size", values: SIZES, default: "md", description: "Spinner size." },
      label: { type: "string", default: "Loading", description: "Accessible label for screen readers." }
    },
    slots: []
  },
  {
    name: "Cluster",
    importPath: "sg/cluster",
    category: "layout",
    description: "Convenience wrapper for horizontal wrapping flow. Flexbox with wrap enabled by default.",
    whenToUse: "Tag clouds, button groups, status badges, any horizontally-flowing items that should wrap. More ergonomic than Stack(direction='horizontal', wrap=true).",
    avoidWhen: "You need vertical stacking - use Stack. You need responsive row/column switching - use Switcher.",
    semanticRole: "none (layout primitive)",
    props: {
      gap: { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, default: "grouped", description: "Gestalt-based spacing between children." },
      align: { type: "string", values: ["start","center","end","stretch","baseline"], default: "center", description: "Cross-axis alignment of children." },
      justify: { type: "string", values: ["start","center","end","space-between","space-around","space-evenly"], default: "start", description: "Main axis distribution." }
    },
    slots: ["default"]
  },
  {
    name: "CarouselRoot",
    importPath: "sg/carousel",
    category: "data-display",
    description: "Carousel/slideshow container with autoplay and full keyboard navigation support.",
    whenToUse: "For image galleries, testimonials, or any paginated slide content.",
    avoidWhen: "For static grids of items - use Grid instead.",
    semanticRole: "region with aria-roledescription='carousel'",
    accessibilityRequirements: "aria-roledescription='carousel' on root. Arrow keys navigate slides (Left/Right for horizontal, Up/Down for vertical). Home/End jump to first/last slide. Slides have aria-roledescription='slide' and labeled 'Slide N of M'. Non-active slides have aria-hidden='true'. Autoplay pauses on hover/focus.",
    props: {
      orientation: { type: "string", values: ["horizontal","vertical"], default: "horizontal", description: "Scroll direction" },
      loop: { type: "boolean", default: false, description: "Loop back to start/end" },
      autoplay: { type: "boolean", default: false, description: "Enable autoplay" },
      autoplayInterval: { type: "number", default: 5000, description: "Autoplay interval in ms" },
      onchange: { type: "(index: number) => void", description: "Called when slide changes" }
    },
    slots: ["default"]
  },
  {
    name: "CarouselContent",
    importPath: "sg/carousel",
    category: "data-display",
    description: "Scrollable container for carousel slides.",
    parent: "CarouselRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "CarouselItem",
    importPath: "sg/carousel",
    category: "data-display",
    description: "Individual slide within a Carousel. Auto-registers with parent and provides accessibility attributes.",
    semanticRole: "group with aria-roledescription='slide'",
    parent: "CarouselRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "CarouselPrevious",
    importPath: "sg/carousel",
    category: "data-display",
    description: "Button to navigate to the previous slide.",
    parent: "CarouselRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "CarouselNext",
    importPath: "sg/carousel",
    category: "data-display",
    description: "Button to navigate to the next slide.",
    parent: "CarouselRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "TabGroup",
    importPath: "sg/tab-group",
    category: "overlay",
    description: "Grouping container for tabbed interfaces.",
    whenToUse: "Wrapping one or more tab sets that share layout or context.",
    semanticRole: "tablist container",
    props: {
      orientation: { type: "string", values: ["horizontal","vertical"], default: "horizontal", description: "Tab orientation hint." }
    },
    slots: ["default"]
  },
  {
    name: "PopoverRoot",
    importPath: "sg/popover",
    category: "overlay",
    description: "Root controller for a popover. Uses native Popover API for top-layer rendering and light dismiss.",
    whenToUse: "Non-modal overlays (additional info, forms, pickers) that can be dismissed by clicking outside.",
    avoidWhen: "Modal interaction requiring focus trap - use Dialog. Simple text hint - use Tooltip.",
    semanticRole: "dialog (non-modal)",
    accessibilityRequirements: "PopoverContent requires aria-label or aria-labelledby.",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      onclose: { type: "() => void", description: "Called when popover is dismissed." }
    },
    slots: ["default"]
  },
  {
    name: "PopoverTrigger",
    importPath: "sg/popover",
    category: "overlay",
    description: "Trigger element for the Popover. Uses native popovertarget attribute.",
    whenToUse: "Always inside a PopoverRoot to provide the open trigger.",
    semanticRole: "button",
    parent: "PopoverRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "PopoverContent",
    importPath: "sg/popover",
    category: "overlay",
    description: "Content panel of a Popover. Uses native popover attribute with CSS Anchor Positioning.",
    whenToUse: "Always inside a PopoverRoot to provide the popover content.",
    semanticRole: "dialog (non-modal)",
    accessibilityRequirements: "Must have aria-label or aria-labelledby (enforced by ModalLabelProps type).",
    parent: "PopoverRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "Include",
    importPath: "sg/include",
    category: "data-display",
    description: "Fetches remote content and injects it into the current DOM subtree.",
    whenToUse: "Server-rendered partial includes or lightweight remote content injection.",
    avoidWhen: "Trusted rendering cannot be guaranteed or strict sanitization is required.",
    semanticRole: "none",
    props: {
      src: { type: "string", required: true, description: "URL to fetch." },
      mode: { type: "string", values: ["html","text"], default: "html", description: "Injection mode for fetched response." }
    },
    slots: []
  },
  {
    name: "MutationObserver",
    importPath: "sg/mutation-observer",
    category: "layout",
    description: "Declarative MutationObserver bridge that emits mutation events.",
    whenToUse: "Reacting to structural/attribute changes without framework-specific hooks.",
    semanticRole: "none",
    props: {
      for: { type: "string", description: "CSS selector for observed target (defaults to parent)." },
      "child-list": { type: "boolean", default: true, description: "Observe child list changes." },
      attributes: { type: "boolean", default: false, description: "Observe attribute changes." },
      "character-data": { type: "boolean", default: false, description: "Observe text node changes." },
      subtree: { type: "boolean", default: true, description: "Observe entire subtree." }
    },
    slots: []
  },
  {
    name: "Section",
    importPath: "sg/section",
    category: "layout",
    description: "Content section with optional title, description, and content area. Uses semantic <section> element.",
    whenToUse: "Content sections with title + description pattern, page sections, form groups.",
    avoidWhen: "Raw vertical stacking without heading (use Stack).",
    semanticRole: "region",
    props: {
      title: { type: "string", description: "Section heading text." },
      description: { type: "string", description: "Descriptive text below the heading." },
      level: { type: "HeadingLevel", values: [1,2,3,4,5,6], default: 2, description: "HTML heading level for the title." },
      gap: { type: "SpacingRelationship", values: SPACING_RELATIONSHIPS, default: "grouped", description: "Spacing between header and content." }
    },
    slots: ["default"]
  },
  {
    name: "DockRoot",
    importPath: "sg/dock",
    category: "navigation",
    description: "macOS-style magnifying dock container for quick actions.",
    whenToUse: "Compact, icon-focused action/navigation bars.",
    semanticRole: "toolbar",
    props: {
      magnification: { type: "number", default: 1.5, description: "Hover magnification multiplier." },
      iconSize: { type: "number", default: 12, description: "Base icon size in SigUI base-unit multiples." }
    },
    slots: ["default"]
  },
  {
    name: "DockItem",
    importPath: "sg/dock",
    category: "navigation",
    description: "Single interactive dock item rendered as button or link.",
    whenToUse: "Inside DockRoot for each action destination.",
    semanticRole: "button or link",
    parent: "DockRoot",
    props: {
      disabled: { type: "boolean", default: false, description: "Disables item when rendered as a button." },
      href: { type: "string", description: "When set, renders as link instead of button." },
      target: { type: "string", values: ["_blank","_self"], description: "Link target when href is set." },
      onclick: { type: "(e: MouseEvent) => void", description: "Click handler." }
    },
    slots: ["default"]
  },
  {
    name: "DockSeparator",
    importPath: "sg/dock",
    category: "navigation",
    description: "Visual separator between dock item groups.",
    whenToUse: "Inside DockRoot to divide related clusters of items.",
    semanticRole: "separator",
    parent: "DockRoot",
    props: {},
    slots: []
  },
  {
    name: "MenubarRoot",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Horizontal menu bar containing multiple dropdown menus, like a desktop app menu bar.",
    whenToUse: "For application-style menu bars with multiple dropdown menus.",
    avoidWhen: "For a single dropdown menu - use Menu instead.",
    semanticRole: "menubar",
    accessibilityRequirements: "Left/Right arrow keys navigate between menus. Down arrow opens dropdown.",
    props: {},
    slots: ["default"]
  },
  {
    name: "MenubarMenu",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Individual menu within a MenubarRoot.",
    parent: "MenubarRoot",
    props: {
      label: { type: "string", required: true, description: "Menu label" }
    },
    slots: ["default"]
  },
  {
    name: "MenubarTrigger",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Button that opens a MenubarMenu dropdown.",
    parent: "MenubarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "MenubarContent",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Dropdown content of a MenubarMenu.",
    parent: "MenubarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "MenubarItem",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Actionable item inside MenubarContent.",
    parent: "MenubarRoot",
    props: {
      disabled: { type: "boolean", default: false, description: "Disable item" }
    },
    slots: ["default"]
  },
  {
    name: "MenubarSeparator",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Visual separator between MenubarItems.",
    parent: "MenubarRoot",
    props: {},
    slots: []
  },
  {
    name: "MenubarShortcut",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Displays keyboard shortcut text in a MenubarItem, aligned to the right.",
    whenToUse: "To show keyboard shortcuts next to menu items.",
    parent: "MenubarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "MenubarCheckboxItem",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Checkbox menu item that can be toggled on/off.",
    whenToUse: "For toggleable options in a menu.",
    semanticRole: "menuitemcheckbox",
    parent: "MenubarRoot",
    props: {
      checked: { type: "boolean", default: false, description: "Checked state" },
      disabled: { type: "boolean", default: false, description: "Disable item" }
    },
    slots: ["default"]
  },
  {
    name: "MenubarRadioGroup",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Groups MenubarRadioItem components for single-selection behavior.",
    whenToUse: "For mutually exclusive options in a menu.",
    parent: "MenubarRoot",
    props: {
      value: { type: "string", description: "Currently selected value (bindable)" }
    },
    slots: ["default"]
  },
  {
    name: "MenubarRadioItem",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Radio menu item for mutually exclusive selection within a MenubarRadioGroup.",
    whenToUse: "For mutually exclusive options in a menu.",
    semanticRole: "menuitemradio",
    parent: "MenubarRoot",
    props: {
      value: { type: "string", required: true, description: "Value this item represents" },
      disabled: { type: "boolean", default: false, description: "Disable item" }
    },
    slots: ["default"]
  },
  {
    name: "MenubarSub",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Container for a submenu within a MenubarItem.",
    whenToUse: "For nested menu structures.",
    parent: "MenubarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "MenubarSubTrigger",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Trigger button that opens a submenu.",
    whenToUse: "Inside MenubarSub to open the submenu.",
    parent: "MenubarRoot",
    props: {
      disabled: { type: "boolean", default: false, description: "Disable item" }
    },
    slots: ["default"]
  },
  {
    name: "MenubarSubContent",
    importPath: "sg/menubar",
    category: "navigation",
    description: "Content of a submenu, positioned to the right of the trigger.",
    whenToUse: "Inside MenubarSub to display submenu items.",
    parent: "MenubarRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DrawerRoot",
    importPath: "sg/drawer",
    category: "overlay",
    description: "Bottom-anchored overlay panel using native <dialog>. Ideal for mobile-first interactions.",
    whenToUse: "For mobile-friendly bottom sheets and action panels.",
    avoidWhen: "For side panels - use Sheet. For centered modals - use Dialog.",
    semanticRole: "dialog",
    accessibilityRequirements: "ModalLabelProps: aria-label or aria-labelledby required on DrawerContent.",
    props: {
      open: { type: "boolean", default: false, description: "Whether the drawer is open" }
    },
    slots: ["default"]
  },
  {
    name: "DrawerTrigger",
    importPath: "sg/drawer",
    category: "overlay",
    description: "Button that opens the parent DrawerRoot.",
    parent: "DrawerRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DrawerContent",
    importPath: "sg/drawer",
    category: "overlay",
    description: "The <dialog> content panel of a Drawer.",
    parent: "DrawerRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DrawerHandle",
    importPath: "sg/drawer",
    category: "overlay",
    description: "Visual drag handle indicator for a Drawer.",
    parent: "DrawerRoot",
    props: {},
    slots: []
  },
  {
    name: "AnimatePresence",
    importPath: "sg/animate-presence",
    category: "layout",
    description: "Keeps removed items mounted long enough to play exit animations.",
    whenToUse: "Animating item removal in lists or conditional UI.",
    semanticRole: "none (animation orchestrator)",
    props: {
      items: { type: "T[]", required: true, description: "Current item collection to render." },
      exit: { type: "ExitFactory", required: true, description: "Factory that starts exit animation for a removed element." },
      getKey: { type: "(item: T) => string | number", required: true, description: "Stable key extractor for each item." }
    },
    slots: ["default"]
  },
  {
    name: "Tree",
    importPath: "sg/tree",
    category: "data-display",
    description: "Hierarchical tree container with keyboard navigation hooks.",
    whenToUse: "File explorers, nested navigation, or hierarchical selection.",
    semanticRole: "tree",
    props: {
      selectable: { type: "boolean", default: false, description: "Enables selection semantics for tree items." }
    },
    slots: ["default"]
  },
  {
    name: "Dropdown",
    importPath: "sg/dropdown",
    category: "overlay",
    description: "Lightweight dropdown container with open/closed state signaling.",
    whenToUse: "Simple anchored dropdown surfaces that do not need full menu behavior.",
    avoidWhen: "Command/action lists with keyboard navigation (use Menu).",
    semanticRole: "group",
    props: {
      open: { type: "boolean", default: false, description: "Whether dropdown content is open." }
    },
    slots: ["default"]
  },
  {
    name: "Direction",
    importPath: "sg/direction",
    category: "layout",
    description: "Context provider that sets text direction (LTR/RTL) for descendants.",
    whenToUse: "To override text direction for a subtree of components.",
    avoidWhen: "When the entire app uses a single direction - set dir on <html> instead.",
    props: {
      dir: { type: "string", values: ["ltr","rtl","auto"], required: true, description: "Text direction" }
    },
    slots: ["default"]
  },
  {
    name: "InputNumber",
    importPath: "sg/input-number",
    category: "form",
    description: "Number-specific input wrapper around native input[type=number].",
    whenToUse: "Numeric form entry with min/max/step validation hints.",
    semanticRole: "spinbutton",
    props: {
      name: { type: "string", description: "Form field name." },
      value: { type: "string", description: "Current string value." },
      min: { type: "number", description: "Minimum allowed value." },
      max: { type: "number", description: "Maximum allowed value." },
      step: { type: "number", description: "Increment step value." },
      placeholder: { type: "string", description: "Placeholder text." },
      required: { type: "boolean", default: false, description: "Marks input as required." },
      disabled: { type: "boolean", default: false, description: "Disables user input." }
    },
    slots: []
  },
  {
    name: "InputGroup",
    importPath: "sg/input-group",
    category: "form",
    description: "Flex container that visually groups an input with prefix and/or suffix elements using compound components.",
    whenToUse: "To add icons, buttons, or text add-ons to an input field. Use with InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, and InputGroupButton.",
    avoidWhen: "When the input stands alone without add-ons.",
    semanticRole: "group",
    props: {
      size: { type: "Size", values: SIZES, default: "md", description: "Size of the group (sm, md, lg)" },
      disabled: { type: "boolean", default: false, description: "Disable the entire input group" }
    },
    slots: ["default"]
  },
  {
    name: "InputGroupAddon",
    importPath: "sg/input-group",
    category: "form",
    description: "Addon container that positions content at the start or end of an input group.",
    whenToUse: "To wrap icons, text, or buttons that attach to an input.",
    parent: "InputGroup",
    props: {
      align: { type: "InputGroupAddonAlign", values: ["inline-start","inline-end","block-start","block-end"], default: "inline-start", description: "Position of the addon relative to the input" }
    },
    slots: ["default"]
  },
  {
    name: "InputGroupInput",
    importPath: "sg/input-group",
    category: "form",
    description: "Input element designed for use within InputGroup with proper border radius handling.",
    whenToUse: "As the main text input within an InputGroup compound.",
    semanticRole: "textbox",
    parent: "InputGroup",
    props: {
      value: { type: "string", default: "", description: "Input value (bindable)" },
      type: { type: "string", values: ["text","email","password","number","search","tel","url"], default: "text", description: "Input type" },
      placeholder: { type: "string", description: "Placeholder text" },
      disabled: { type: "boolean", default: false, description: "Disable the input" },
      readonly: { type: "boolean", default: false, description: "Make input read-only" },
      required: { type: "boolean", default: false, description: "Mark as required" }
    },
    slots: []
  },
  {
    name: "InputGroupTextarea",
    importPath: "sg/input-group",
    category: "form",
    description: "Textarea element designed for use within InputGroup with block-start/block-end addons.",
    whenToUse: "For multi-line text input within an InputGroup with header/footer addons.",
    semanticRole: "textbox",
    parent: "InputGroup",
    props: {
      value: { type: "string", default: "", description: "Textarea value (bindable)" },
      placeholder: { type: "string", description: "Placeholder text" },
      disabled: { type: "boolean", default: false, description: "Disable the textarea" },
      readonly: { type: "boolean", default: false, description: "Make textarea read-only" },
      required: { type: "boolean", default: false, description: "Mark as required" },
      rows: { type: "number", default: 3, description: "Number of visible text rows" }
    },
    slots: []
  },
  {
    name: "InputGroupText",
    importPath: "sg/input-group",
    category: "form",
    description: "Text content for InputGroupAddon, styled as muted helper text.",
    whenToUse: "To display static text like currency symbols, units, or labels in an addon.",
    parent: "InputGroup",
    props: {},
    slots: ["default"]
  },
  {
    name: "InputGroupButton",
    importPath: "sg/input-group",
    category: "form",
    description: "Button element designed for use within InputGroupAddon.",
    whenToUse: "For action buttons within an input group (e.g., submit, search, clear).",
    semanticRole: "button",
    parent: "InputGroup",
    props: {
      size: { type: "InputGroupButtonSize", values: ["xs","icon-xs","sm","icon-sm"], default: "xs", description: "Button size" },
      variant: { type: "ColorVariant", values: COLOR_VARIANTS, default: "ghost", description: "Color variant" },
      disabled: { type: "boolean", default: false, description: "Disable the button" },
      type: { type: "string", values: ["button","submit","reset"], default: "button", description: "Button type" },
      href: { type: "string", description: "If provided, renders as anchor link" }
    },
    slots: ["default"]
  },
  {
    name: "Heading",
    importPath: "sg/heading",
    category: "layout",
    description: "Heading element (h1-h6) with auto-sized typography.",
    whenToUse: "Section headings that establish document hierarchy.",
    avoidWhen: "You just want large/bold text without semantic heading - use Text with weight='bold'.",
    semanticRole: "heading",
    accessibilityRequirements: "Use sequential heading levels (h1 → h2 → h3). Never skip levels.",
    props: {
      level: { type: "HeadingLevel", values: [1,2,3,4,5,6], required: true, description: "Semantic heading level (h1-h6). Determines the HTML tag." },
      size: { type: "HeadingSize", values: HEADING_SIZES, description: "Visual size. Auto-mapped from level if omitted." },
      color: { type: "string", values: HEADING_COLORS, default: "primary", description: "Semantic text color." },
      align: { type: "string", values: ALIGNS, description: "Text alignment." }
    },
    slots: ["default"]
  },
  {
    name: "SheetRoot",
    importPath: "sg/sheet",
    category: "overlay",
    description: "Root controller for a side-anchored panel. Uses native <dialog> for top-layer rendering.",
    whenToUse: "Side panels for navigation, filters, or detail views that slide in from an edge.",
    avoidWhen: "Centered modal - use Dialog. Small inline overlay - use Popover.",
    semanticRole: "dialog",
    accessibilityRequirements: "SheetContent requires aria-label or aria-labelledby.",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      side: { type: "string", values: ["top","right","bottom","left"], default: "right", description: "Edge the panel slides in from." },
      onclose: { type: "() => void", description: "Called when sheet is dismissed." }
    },
    slots: ["default"]
  },
  {
    name: "SheetTrigger",
    importPath: "sg/sheet",
    category: "overlay",
    description: "Button that opens the parent Sheet.",
    whenToUse: "Always inside a SheetRoot.",
    semanticRole: "button",
    parent: "SheetRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SheetContent",
    importPath: "sg/sheet",
    category: "overlay",
    description: "Side-anchored content panel of a Sheet. Uses native <dialog> with showModal(). Requires aria-label or aria-labelledby.",
    whenToUse: "Always inside a SheetRoot.",
    semanticRole: "dialog",
    accessibilityRequirements: "Must have aria-label or aria-labelledby (enforced by ModalLabelProps type).",
    parent: "SheetRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SheetClose",
    importPath: "sg/sheet",
    category: "overlay",
    description: "Button that closes the parent Sheet.",
    whenToUse: "Inside SheetContent, typically in the header or footer.",
    semanticRole: "button",
    parent: "SheetRoot",
    props: {
      "aria-label": { type: "string", default: "Close", description: "Accessible label for the close button." }
    },
    slots: ["default"]
  },
  {
    name: "SheetHeader",
    importPath: "sg/sheet",
    category: "overlay",
    description: "Header section of a Sheet, typically contains title and description.",
    whenToUse: "At the top of SheetContent.",
    semanticRole: "section",
    parent: "SheetRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SheetTitle",
    importPath: "sg/sheet",
    category: "overlay",
    description: "Title heading for the Sheet.",
    whenToUse: "Inside SheetHeader.",
    semanticRole: "heading",
    parent: "SheetRoot",
    props: {
      as: { type: "string", values: ["h1","h2","h3","h4","h5","h6"], default: "h2", description: "Heading element to render." }
    },
    slots: ["default"]
  },
  {
    name: "SheetDescription",
    importPath: "sg/sheet",
    category: "overlay",
    description: "Description text for the Sheet.",
    whenToUse: "Inside SheetHeader, below SheetTitle.",
    semanticRole: "text",
    parent: "SheetRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SheetFooter",
    importPath: "sg/sheet",
    category: "overlay",
    description: "Footer section of a Sheet, typically contains action buttons.",
    whenToUse: "At the bottom of SheetContent.",
    semanticRole: "section",
    parent: "SheetRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SelectRoot",
    importPath: "sg/select",
    category: "overlay",
    description: "Root controller for a select dropdown.",
    whenToUse: "Choosing one option from a list too long for radio buttons (>7 options).",
    avoidWhen: "Few visible options - use RadioGroup. Multi-select - use Checkbox group.",
    semanticRole: "listbox",
    accessibilityRequirements: "label is required. Keyboard navigation with arrow keys.",
    props: {
      label: { type: "string", required: true, description: "Accessible label for the select - required." },
      value: { type: "string", description: "Currently selected value." },
      placeholder: { type: "string", description: "Shown when no value is selected." },
      disabled: { type: "boolean", default: false, description: "Disables the select." },
      onchange: { type: "(value: string) => void", description: "Called when selection changes." }
    },
    slots: ["default"]
  },
  {
    name: "SelectTrigger",
    importPath: "sg/select",
    category: "overlay",
    description: "Trigger button for the Select dropdown.",
    whenToUse: "Always inside a SelectRoot.",
    semanticRole: "combobox",
    parent: "SelectRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SelectContent",
    importPath: "sg/select",
    category: "overlay",
    description: "Dropdown list container for SelectItems.",
    whenToUse: "Always inside a SelectRoot.",
    semanticRole: "listbox",
    parent: "SelectRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SelectItem",
    importPath: "sg/select",
    category: "overlay",
    description: "Single option inside a Select.",
    whenToUse: "Always inside SelectContent or SelectGroup.",
    semanticRole: "option",
    parent: "SelectRoot",
    props: {
      value: { type: "string", required: true, description: "Unique value for this option." },
      disabled: { type: "boolean", default: false, description: "Disables this option." }
    },
    slots: ["default"]
  },
  {
    name: "SelectGroup",
    importPath: "sg/select",
    category: "overlay",
    description: "Group container for SelectItems with optional label.",
    whenToUse: "Organizing select options into labeled sections.",
    semanticRole: "group",
    parent: "SelectRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "SelectLabel",
    importPath: "sg/select",
    category: "overlay",
    description: "Label heading for a SelectGroup.",
    whenToUse: "Always inside a SelectGroup to provide a heading.",
    semanticRole: "label",
    parent: "SelectRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "RouteAnnouncer",
    importPath: "sg/route-announcer",
    category: "feedback",
    description: "Screen-reader live region announcer for route/page title changes.",
    whenToUse: "Client-side routed apps where page updates do not trigger full reload announcements.",
    semanticRole: "status",
    accessibilityRequirements: "Provide a meaningful pageTitle on each route change.",
    props: {
      pageTitle: { type: "string", required: true, description: "Title text announced to assistive technology." }
    },
    slots: []
  },
  {
    name: "Calendar",
    importPath: "sg/calendar",
    category: "form",
    description: "Date calendar supporting single date and date range selection with full keyboard navigation.",
    whenToUse: "When users need to pick a date from a visual calendar grid.",
    avoidWhen: "For simple date input - use a native date <input> instead.",
    semanticRole: "grid",
    accessibilityRequirements: "Arrow keys navigate days (Left/Right/Up/Down). Home/End jump to first/last day. PageUp/PageDown change months. Enter/Space selects. Visual focus indicator on focused day.",
    props: {
      mode: { type: "string", values: ["single","range"], default: "single", description: "Single date or date range" },
      value: { type: "string", description: "Selected date (ISO format) or {start,end} for range mode" },
      "default-date": { type: "string", description: "Initial visible/selected date when value is not provided (ISO)" },
      min: { type: "string", description: "Minimum selectable date (ISO)" },
      max: { type: "string", description: "Maximum selectable date (ISO)" },
      onchange: { type: "(value: string | {start: string, end: string}) => void", description: "Called when selection changes" }
    },
    slots: []
  },
  {
    name: "Details",
    importPath: "sg/details",
    category: "overlay",
    description: "Native details/summary disclosure wrapper with SigUI state hooks.",
    whenToUse: "Simple expandable content without compound overlay machinery.",
    avoidWhen: "Complex keyboard-managed disclosure sets (use Accordion or Tabs).",
    semanticRole: "group",
    props: {
      open: { type: "boolean", default: false, description: "Whether disclosure content is expanded." }
    },
    slots: ["default"]
  },
  {
    name: "Breadcrumb",
    importPath: "sg/breadcrumb",
    category: "navigation",
    description: "Navigation trail showing the current page location in a hierarchy.",
    whenToUse: "Showing navigational hierarchy (Home > Section > Page).",
    avoidWhen: "Flat navigation with no hierarchy - use Tabs or links.",
    semanticRole: "navigation",
    accessibilityRequirements: "Wrapped in <nav> with aria-label='Breadcrumb'. Last item has aria-current='page'.",
    props: {},
    slots: ["default"]
  },
  {
    name: "BreadcrumbItem",
    importPath: "sg/breadcrumb",
    category: "navigation",
    description: "Single item in a Breadcrumb trail.",
    whenToUse: "Always inside a Breadcrumb.",
    parent: "Breadcrumb",
    props: {
      href: { type: "string", description: "Link URL. Omit for the current (last) page." },
      current: { type: "boolean", default: false, description: "Marks this as the current page. Sets aria-current='page'." }
    },
    slots: ["default"]
  },
  {
    name: "BreadcrumbSeparator",
    importPath: "sg/breadcrumb",
    category: "navigation",
    description: "Visual separator between breadcrumb items. Defaults to '/'.",
    whenToUse: "Always between BreadcrumbItems inside a Breadcrumb.",
    parent: "Breadcrumb",
    props: {},
    slots: ["default"]
  },
  {
    name: "BreadcrumbEllipsis",
    importPath: "sg/breadcrumb",
    category: "navigation",
    description: "Collapsed overflow indicator in breadcrumb trails.",
    whenToUse: "When middle breadcrumb items are collapsed for compact layouts.",
    parent: "Breadcrumb",
    props: {
      "aria-label": { type: "string", default: "Show more", description: "Accessible label for the ellipsis indicator." }
    },
    slots: []
  },
  {
    name: "BreadcrumbPage",
    importPath: "sg/breadcrumb",
    category: "navigation",
    description: "Current page item in a breadcrumb trail (aria-current='page').",
    whenToUse: "As the final breadcrumb item for the active page.",
    semanticRole: "link current-page marker",
    parent: "Breadcrumb",
    props: {},
    slots: ["default"]
  },
  {
    name: "CommandRoot",
    importPath: "sg/command",
    category: "navigation",
    description: "Root controller for a command palette (cmdk pattern). Standalone filterable list, typically rendered inside Dialog.",
    whenToUse: "Command palettes, searchable action lists, keyboard-driven navigation.",
    avoidWhen: "Simple dropdown selection - use Select or Combobox.",
    semanticRole: "listbox",
    accessibilityRequirements: "Arrow keys navigate items. Enter selects. Built-in string matching filter.",
    props: {
      onselect: { type: "(value: string) => void", description: "Called when an item is selected." }
    },
    slots: ["default"]
  },
  {
    name: "CommandDialog",
    importPath: "sg/command",
    category: "navigation",
    description: "Dialog wrapper for a command palette, typically containing CommandRoot.",
    whenToUse: "Global command palette opened via keyboard shortcut (for example Cmd/Ctrl+K).",
    semanticRole: "dialog",
    accessibilityRequirements: "Provide accessible labeling via aria-label or aria-labelledby.",
    parent: "CommandRoot",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      "aria-label": { type: "string", description: "Accessible dialog label. Defaults to 'Command palette'." },
      "aria-describedby": { type: "string", description: "ID of element describing the dialog." },
      "aria-labelledby": { type: "string", description: "ID of element labeling the dialog." }
    },
    slots: ["default"]
  },
  {
    name: "CommandInput",
    importPath: "sg/command",
    category: "navigation",
    description: "Search input for filtering Command items.",
    whenToUse: "Always inside a CommandRoot.",
    parent: "CommandRoot",
    props: {},
    slots: []
  },
  {
    name: "CommandList",
    importPath: "sg/command",
    category: "navigation",
    description: "Scrollable list container for Command items.",
    whenToUse: "Always inside a CommandRoot.",
    semanticRole: "listbox",
    parent: "CommandRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "CommandItem",
    importPath: "sg/command",
    category: "navigation",
    description: "Single selectable item in a Command list. Auto-filtered by search query.",
    whenToUse: "Always inside CommandList.",
    semanticRole: "option",
    parent: "CommandRoot",
    props: {
      value: { type: "string", required: true, description: "Item value used for selection and filtering." },
      disabled: { type: "boolean", default: false, description: "Disables this item." },
      keywords: { type: "string[]", description: "Additional search terms for filtering." },
      onselect: { type: "() => void", description: "Called when this item is selected." }
    },
    slots: ["default"]
  },
  {
    name: "CommandEmpty",
    importPath: "sg/command",
    category: "navigation",
    description: "Content shown when no Command items match the search.",
    whenToUse: "Always inside CommandList.",
    parent: "CommandRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "CommandGroup",
    importPath: "sg/command",
    category: "navigation",
    description: "Group of related Command items with optional heading.",
    whenToUse: "Inside CommandList to organize items into labeled sections.",
    semanticRole: "group",
    parent: "CommandRoot",
    props: {
      heading: { type: "string", description: "Group heading text." }
    },
    slots: ["default"]
  },
  {
    name: "CommandSeparator",
    importPath: "sg/command",
    category: "navigation",
    description: "Visual separator between Command groups.",
    whenToUse: "Between CommandGroups inside CommandList.",
    semanticRole: "separator",
    parent: "CommandRoot",
    props: {},
    slots: []
  },
  {
    name: "CommandShortcut",
    importPath: "sg/command",
    category: "navigation",
    description: "Right-aligned keyboard shortcut hint within a command item.",
    whenToUse: "Inside CommandItem to display associated key bindings.",
    semanticRole: "presentation",
    parent: "CommandRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DatePickerRoot",
    importPath: "sg/datepicker",
    category: "overlay",
    description: "Root controller for a date picker with calendar dropdown.",
    whenToUse: "Selecting a single date (booking, scheduling, birth date).",
    avoidWhen: "Date range - extend with two DatePickers. Time only - use a time input.",
    semanticRole: "group",
    accessibilityRequirements: "label is required. Calendar uses role='grid' with arrow key navigation.",
    props: {
      value: { type: "string", description: "Selected date as ISO YYYY-MM-DD string." },
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      label: { type: "string", required: true, description: "Accessible label - required." },
      disabled: { type: "boolean", default: false, description: "Disables the date picker." },
      onchange: { type: "(value: string) => void", description: "Called when a date is selected." }
    },
    slots: ["default"]
  },
  {
    name: "DatePickerTrigger",
    importPath: "sg/datepicker",
    category: "overlay",
    description: "Button that opens the DatePicker calendar.",
    whenToUse: "Always inside a DatePickerRoot.",
    semanticRole: "button",
    parent: "DatePickerRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DatePickerContent",
    importPath: "sg/datepicker",
    category: "overlay",
    description: "Dropdown container for the DatePicker calendar.",
    whenToUse: "Always inside a DatePickerRoot.",
    semanticRole: "dialog",
    parent: "DatePickerRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DatePickerCalendar",
    importPath: "sg/datepicker",
    category: "overlay",
    description: "Calendar grid inside DatePickerContent. Renders month navigation and day grid.",
    whenToUse: "Always inside DatePickerContent.",
    semanticRole: "grid",
    accessibilityRequirements: "Days are gridcells. Arrow keys navigate. Today is highlighted.",
    parent: "DatePickerRoot",
    props: {},
    slots: []
  },
  {
    name: "DataTableRoot",
    importPath: "sg/datatable",
    category: "data-display",
    description: "Root controller for a sortable, paginated data table. Wraps existing Table styles with sort/pagination state.",
    whenToUse: "Tabular data with sorting and/or pagination needs.",
    avoidWhen: "Simple static tables - use Table. Card layouts - use Grid + Card.",
    semanticRole: "table",
    accessibilityRequirements: "Uses native <table> semantics. Sort headers use aria-sort.",
    props: {
      sortColumn: { type: "string", description: "Currently sorted column name." },
      sortDirection: { type: "string", values: ["asc","desc"], default: "asc", description: "Sort direction." },
      page: { type: "number", default: 1, description: "Current page number." },
      pageSize: { type: "number", default: 10, description: "Items per page." },
      totalItems: { type: "number", default: 0, description: "Total number of items for pagination." },
      onsort: { type: "(column: string, direction: SortDirection) => void", description: "Called when sort changes." },
      onpagechange: { type: "(page: number) => void", description: "Called when page changes." }
    },
    slots: ["default"]
  },
  {
    name: "DataTableHeader",
    importPath: "sg/datatable",
    category: "data-display",
    description: "Table header section for DataTable (<thead>).",
    whenToUse: "Always inside a DataTableRoot.",
    parent: "DataTableRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DataTableBody",
    importPath: "sg/datatable",
    category: "data-display",
    description: "Table body section for DataTable (<tbody>).",
    whenToUse: "Always inside a DataTableRoot.",
    parent: "DataTableRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DataTableRow",
    importPath: "sg/datatable",
    category: "data-display",
    description: "Table row for DataTable (<tr>).",
    whenToUse: "Always inside DataTableHeader or DataTableBody.",
    parent: "DataTableRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DataTableHead",
    importPath: "sg/datatable",
    category: "data-display",
    description: "Sortable table header cell for DataTable. Clicking toggles sort direction.",
    whenToUse: "Inside a DataTableRow within DataTableHeader.",
    semanticRole: "columnheader",
    accessibilityRequirements: "Uses aria-sort to indicate current sort state.",
    parent: "DataTableRoot",
    props: {
      column: { type: "string", required: true, description: "Column identifier for sorting." }
    },
    slots: ["default"]
  },
  {
    name: "DataTableCell",
    importPath: "sg/datatable",
    category: "data-display",
    description: "Table data cell for DataTable (<td>).",
    whenToUse: "Inside a DataTableRow within DataTableBody.",
    parent: "DataTableRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "DataTablePagination",
    importPath: "sg/datatable",
    category: "data-display",
    description: "Pagination controls for DataTable with Previous/Next buttons and page indicator.",
    whenToUse: "After the DataTable table element, inside DataTableRoot.",
    parent: "DataTableRoot",
    props: {},
    slots: []
  },
  {
    name: "ContextMenuRoot",
    importPath: "sg/context-menu",
    category: "navigation",
    description: "Root controller for a right-click context menu.",
    whenToUse: "Contextual actions triggered by right-click (file operations, text formatting).",
    avoidWhen: "Button-triggered menus - use Menu. Page navigation - use NavigationMenu.",
    semanticRole: "menu",
    accessibilityRequirements: "ContextMenuContent requires aria-label or aria-labelledby. Arrow keys navigate items.",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      onclose: { type: "() => void", description: "Called when context menu is dismissed." }
    },
    slots: ["default"]
  },
  {
    name: "ContextMenuTrigger",
    importPath: "sg/context-menu",
    category: "navigation",
    description: "Area that opens the ContextMenu on right-click.",
    whenToUse: "Always inside a ContextMenuRoot.",
    semanticRole: "none (wraps trigger area)",
    parent: "ContextMenuRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "ContextMenuContent",
    importPath: "sg/context-menu",
    category: "navigation",
    description: "Container for ContextMenuItems. Positioned at cursor.",
    whenToUse: "Always inside a ContextMenuRoot.",
    semanticRole: "menu",
    accessibilityRequirements: "Must have aria-label or aria-labelledby (enforced by ModalLabelProps type).",
    parent: "ContextMenuRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "ContextMenuItem",
    importPath: "sg/context-menu",
    category: "navigation",
    description: "Single action item in a ContextMenu.",
    whenToUse: "Always inside ContextMenuContent.",
    semanticRole: "menuitem",
    accessibilityRequirements: "Must have visible text content or aria-label.",
    parent: "ContextMenuRoot",
    props: {
      disabled: { type: "boolean", default: false, description: "Disables this menu item." },
      onselect: { type: "() => void", description: "Called when item is selected." }
    },
    slots: ["default"]
  },
  {
    name: "ContextMenuSeparator",
    importPath: "sg/context-menu",
    category: "navigation",
    description: "Visual separator between ContextMenu items.",
    whenToUse: "Separating groups of related menu items.",
    semanticRole: "separator",
    parent: "ContextMenuRoot",
    props: {},
    slots: []
  },
  {
    name: "ContextMenuLabel",
    importPath: "sg/context-menu",
    category: "navigation",
    description: "Label for a group of ContextMenu items.",
    whenToUse: "Grouping related menu items with a descriptive label.",
    semanticRole: "group",
    parent: "ContextMenuRoot",
    props: {
      inset: { type: "boolean", default: false, description: "Align label with menu items that have icons." }
    },
    slots: ["default"]
  },
  {
    name: "ContextMenuSub",
    importPath: "sg/context-menu",
    category: "navigation",
    description: "Root controller for a nested submenu within a ContextMenu.",
    whenToUse: "Creating cascading/nested menu structures.",
    semanticRole: "menu",
    parent: "ContextMenuRoot",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state for the submenu. Bindable." }
    },
    slots: ["default"]
  },
  {
    name: "ContextMenuSubTrigger",
    importPath: "sg/context-menu",
    category: "navigation",
    description: "Trigger item that opens a ContextMenuSub submenu.",
    whenToUse: "Inside ContextMenuContent to create a nested submenu.",
    semanticRole: "menuitem",
    accessibilityRequirements: "Automatically has aria-expanded and aria-haspopup attributes.",
    parent: "ContextMenuRoot",
    props: {
      disabled: { type: "boolean", default: false, description: "Disables the submenu trigger." }
    },
    slots: ["default"]
  },
  {
    name: "ContextMenuSubContent",
    importPath: "sg/context-menu",
    category: "navigation",
    description: "Content of a ContextMenuSub submenu.",
    whenToUse: "Inside ContextMenuSub, containing ContextMenuItems for the nested menu.",
    semanticRole: "menu",
    parent: "ContextMenuRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "ResizableRoot",
    importPath: "sg/resizable",
    category: "layout",
    description: "Root controller for resizable panels. Flex container with drag handles between panels.",
    whenToUse: "Split-pane layouts where users need to resize sections (IDE layouts, dashboards).",
    avoidWhen: "Fixed layouts - use Grid or Stack.",
    semanticRole: "group",
    props: {
      direction: { type: "string", values: ["horizontal","vertical"], default: "horizontal", description: "Resize axis." },
      onresize: { type: "(sizes: number[]) => void", description: "Called when panel sizes change." }
    },
    slots: ["default"]
  },
  {
    name: "ResizablePanel",
    importPath: "sg/resizable",
    category: "layout",
    description: "A resizable panel within a ResizableRoot.",
    whenToUse: "Always inside a ResizableRoot.",
    parent: "ResizableRoot",
    props: {
      defaultSize: { type: "number", default: 50, description: "Initial size as percentage." },
      minSize: { type: "number", default: 10, description: "Minimum size as percentage." },
      maxSize: { type: "number", default: 90, description: "Maximum size as percentage." }
    },
    slots: ["default"]
  },
  {
    name: "ResizableHandle",
    importPath: "sg/resizable",
    category: "layout",
    description: "Drag handle between ResizablePanels with optional visual grip indicator.",
    whenToUse: "Always between ResizablePanels inside a ResizableRoot.",
    semanticRole: "separator",
    accessibilityRequirements: "Has role='separator' with keyboard arrow support. Home/End keys resize to min/max.",
    parent: "ResizableRoot",
    props: {
      index: { type: "number", required: true, description: "Zero-based handle index (between panels)." },
      withHandle: { type: "boolean", default: false, description: "Shows a visual grip indicator for drag affordance." }
    },
    slots: []
  },
  {
    name: "HoverCardRoot",
    importPath: "sg/hovercard",
    category: "overlay",
    description: "Root controller for a hover card. Shows content on hover with configurable open/close delays.",
    whenToUse: "Showing additional information about a link or element on hover (user profiles, previews).",
    avoidWhen: "Interactive content that needs clicks - use Popover. Simple text hints - use Tooltip.",
    semanticRole: "dialog (non-modal)",
    accessibilityRequirements: "HoverCardContent requires aria-label or aria-labelledby. Also opens on focus for keyboard users.",
    props: {
      open: { type: "boolean", default: false, description: "Controlled open state. Bindable." },
      openDelay: { type: "number", default: 700, description: "Milliseconds before showing on hover." },
      closeDelay: { type: "number", default: 300, description: "Milliseconds before hiding after mouse leaves." },
      onclose: { type: "() => void", description: "Called when hover card is dismissed." }
    },
    slots: ["default"]
  },
  {
    name: "HoverCardTrigger",
    importPath: "sg/hovercard",
    category: "overlay",
    description: "Element that triggers the HoverCard on hover/focus.",
    whenToUse: "Always inside a HoverCardRoot.",
    semanticRole: "none (wraps trigger content)",
    parent: "HoverCardRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "HoverCardContent",
    importPath: "sg/hovercard",
    category: "overlay",
    description: "Content of the HoverCard. Stays open while hovered.",
    whenToUse: "Always inside a HoverCardRoot.",
    semanticRole: "dialog (non-modal)",
    accessibilityRequirements: "Must have aria-label or aria-labelledby (enforced by ModalLabelProps type).",
    parent: "HoverCardRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "InputOTPRoot",
    importPath: "sg/input-otp",
    category: "form",
    description: "Root controller for a segmented OTP/code input.",
    whenToUse: "Collecting verification codes, PINs, or one-time passwords.",
    avoidWhen: "General text input - use Input. Password input - use Input with type='password'.",
    semanticRole: "textbox (hidden input)",
    accessibilityRequirements: "Uses a hidden input for keyboard/paste support. aria-label required.",
    props: {
      value: { type: "string", default: "", description: "Current OTP value. Bindable." },
      length: { type: "number", default: 6, description: "Number of digits/characters." },
      disabled: { type: "boolean", default: false, description: "Disables the input." },
      pattern: { type: "RegExp", description: "Pattern to filter allowed characters (e.g., digits only)." },
      onchange: { type: "(value: string) => void", description: "Called when value changes." },
      oncomplete: { type: "(value: string) => void", description: "Called when all slots are filled." }
    },
    slots: ["default"]
  },
  {
    name: "InputOTPGroup",
    importPath: "sg/input-otp",
    category: "form",
    description: "Groups InputOTPSlot components together for styling.",
    whenToUse: "When you want to style groups of slots differently or add separators between groups.",
    parent: "InputOTPRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "InputOTPSlot",
    importPath: "sg/input-otp",
    category: "form",
    description: "Visual slot for a single OTP character.",
    whenToUse: "Always inside an InputOTPRoot.",
    parent: "InputOTPRoot",
    props: {
      index: { type: "number", required: true, description: "Zero-based position of this slot." }
    },
    slots: []
  },
  {
    name: "InputOTPSeparator",
    importPath: "sg/input-otp",
    category: "form",
    description: "Visual separator between OTP slot groups.",
    whenToUse: "Between InputOTPSlot groups (e.g., after slot 2 in a 6-digit code).",
    parent: "InputOTPRoot",
    props: {},
    slots: []
  },
  {
    name: "NavigationMenuRoot",
    importPath: "sg/navigation-menu",
    category: "navigation",
    description: "Root controller for a site navigation menu with hover-activated dropdown submenus.",
    whenToUse: "Top-level site navigation with dropdown sections.",
    avoidWhen: "Mobile navigation - use Sheet. Action menus - use Menu.",
    semanticRole: "navigation",
    accessibilityRequirements: "Uses <nav> with aria-label. Submenus activated by hover and keyboard.",
    props: {},
    slots: ["default"]
  },
  {
    name: "NavigationMenuList",
    importPath: "sg/navigation-menu",
    category: "navigation",
    description: "List container for navigation items.",
    whenToUse: "Always inside a NavigationMenuRoot.",
    semanticRole: "menubar",
    parent: "NavigationMenuRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "NavigationMenuItem",
    importPath: "sg/navigation-menu",
    category: "navigation",
    description: "Single item in a NavigationMenu. Activates its content on hover.",
    whenToUse: "Always inside NavigationMenuList.",
    parent: "NavigationMenuRoot",
    props: {
      value: { type: "string", required: true, description: "Unique identifier for this nav item." }
    },
    slots: ["default"]
  },
  {
    name: "NavigationMenuTrigger",
    importPath: "sg/navigation-menu",
    category: "navigation",
    description: "Button that labels a NavigationMenuItem and opens its content.",
    whenToUse: "Always inside a NavigationMenuItem.",
    semanticRole: "button",
    parent: "NavigationMenuRoot",
    props: {},
    slots: ["default"]
  },
  {
    name: "NavigationMenuContent",
    importPath: "sg/navigation-menu",
    category: "navigation",
    description: "Dropdown content of a NavigationMenuItem. Shown when item is active.",
    whenToUse: "Always inside a NavigationMenuItem.",
    semanticRole: "menu",
    parent: "NavigationMenuRoot",
    props: {
      value: { type: "string", required: true, description: "Must match parent NavigationMenuItem value." }
    },
    slots: ["default"]
  },
  {
    name: "NavigationMenuLink",
    importPath: "sg/navigation-menu",
    category: "navigation",
    description: "Navigation link inside a NavigationMenu.",
    whenToUse: "Inside NavigationMenuContent or directly in NavigationMenuItem.",
    semanticRole: "menuitem",
    parent: "NavigationMenuRoot",
    props: {
      href: { type: "string", required: true, description: "Link URL." }
    },
    slots: ["default"]
  }
];

/**
 * @typedef {object} PropDescriptor
 * @property {string} type
 * @property {boolean} [required]
 * @property {string | number | boolean} [default]
 * @property {(readonly string[] | readonly number[])} [values]
 * @property {string} [description]
 */
/**
 * @typedef {object} ComponentDescriptor
 * @property {string} name
 * @property {string} importPath
 * @property {"layout" | "basic" | "form" | "overlay" | "navigation" | "feedback" | "data-display"} category
 * @property {string} description
 * @property {Record<string, PropDescriptor>} props
 * @property {readonly string[]} slots
 * @property {string} [parent]
 * @property {string} [whenToUse]
 * @property {string} [avoidWhen]
 * @property {string} [semanticRole]
 * @property {string} [accessibilityRequirements]
 */
/**
 * getRootComponents.
 * @returns {ComponentDescriptor[]}
 */
export function getRootComponents() {
  return manifest.filter((c) => !c.parent);
}
/**
 * getByCategory.
 * @param {ComponentDescriptor["category"]} category
 * @returns {ComponentDescriptor[]}
 */
export function getByCategory(category) {
  return manifest.filter((c) => c.category === category);
}
/**
 * getComponent.
 * @param {string} name
 * @returns {ComponentDescriptor | undefined}
 */
export function getComponent(name) {
  return manifest.find((c) => c.name === name);
}
/**
 * getChildren.
 * @param {string} parentName
 * @returns {ComponentDescriptor[]}
 */
export function getChildren(parentName) {
  return manifest.filter((c) => c.parent === parentName);
}
function propToJsonSchema(prop) {
  let type = "string";
  if (prop.type === "boolean")
    type = "boolean";
  else if (prop.type === "number" || prop.type === "Elevation" || prop.type === "HeadingLevel")
    type = "number";
  else if (prop.type.startsWith("("))
    type = "string";
  const schema = { type, description: prop.description };
  if (prop.values)
    schema.enum = prop.values;
  if (prop.default !== undefined)
    schema.default = prop.default;
  return schema;
}
/**
 * @typedef {{ type: "string" | "number" | "boolean" | "object", description: string, enum?: string[], default?: string | number | boolean }} JsonSchemaProperty
 * @typedef {{ type: "object", properties: Record<string, JsonSchemaProperty>, required: string[], description: string, "x-whenToUse"?: string, "x-avoidWhen"?: string, "x-semanticRole"?: string, "x-accessibilityRequirements"?: string, "x-category": ComponentDescriptor["category"], "x-importPath": string, "x-parent"?: string, "x-slots": ComponentDescriptor["slots"] }} ComponentJsonSchema
 */
/**
 * componentToJsonSchema.
 * @param {ComponentDescriptor} component
 * @returns {ComponentJsonSchema}
 */
export function componentToJsonSchema(component) {
  const properties = {};
  const required = [];
  for (const [name, prop] of Object.entries(component.props)) {
    properties[name] = propToJsonSchema(prop);
    if (prop.required)
      required.push(name);
  }
  const schema = {
    type: "object",
    properties,
    required,
    description: component.description
  };
  if (component.whenToUse)
    schema["x-whenToUse"] = component.whenToUse;
  if (component.avoidWhen)
    schema["x-avoidWhen"] = component.avoidWhen;
  if (component.semanticRole)
    schema["x-semanticRole"] = component.semanticRole;
  if (component.accessibilityRequirements)
    schema["x-accessibilityRequirements"] = component.accessibilityRequirements;
  schema["x-category"] = component.category;
  schema["x-importPath"] = component.importPath;
  if (component.parent)
    schema["x-parent"] = component.parent;
  schema["x-slots"] = component.slots;
  return schema;
}
/**
 * toJsonSchema.
 * @returns {{ $schema: string, title: string, description: string, definitions: Record<string, ComponentJsonSchema> }}
 */
export function toJsonSchema() {
  const definitions = {};
  for (const component of manifest) {
    definitions[component.name] = componentToJsonSchema(component);
  }
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "sigui component schema",
    description: "Machine-readable JSON Schema for all sigui components. Use x- prefixed fields for AI agent decision context.",
    definitions
  };
}
