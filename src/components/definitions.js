// @ts-check

/**
 * definitions module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../lib/base-element.js";
import * as AnimatedImageModule from "./primitives/AnimatedImage/animated-image.js";
import * as AspectRatioModule from "./primitives/AspectRatio/aspect-ratio.js";
import * as AvatarModule from "./primitives/Avatar/avatar.js";
import * as BadgeModule from "./primitives/Badge/badge.js";
import * as BreadcrumbModule from "./recipes/Breadcrumb/breadcrumb.js";
import * as ButtonGroupModule from "./primitives/ButtonGroup/button-group.js";
import * as CalendarModule from "./primitives/Calendar/calendar.js";
import * as CalloutModule from "./primitives/Callout/callout.js";
import * as CardModule from "./primitives/Card/card.js";
import * as CarouselModule from "./primitives/Carousel/carousel.js";
import * as ChartModule from "./primitives/Chart/chart.js";
import * as CheckboxModule from "./primitives/Checkbox/checkbox.js";
import * as ClusterModule from "./primitives/Cluster/cluster.js";
import * as CodeBlockModule from "./primitives/CodeBlock/code-block.js";
import * as ColorPickerModule from "./primitives/ColorPicker/color-picker.js";
import * as ComboboxModule from "./primitives/Combobox/combobox.js";
import * as CommandModule from "./recipes/Command/command.js";
import * as ContainerModule from "./primitives/Container/container.js";
import * as ContextMenuModule from "./recipes/ContextMenu/context-menu.js";
import * as CoverModule from "./primitives/Cover/cover.js";
import * as CopyButtonModule from "./primitives/CopyButton/copy-button.js";
import * as DataTableModule from "./recipes/DataTable/data-table.js";
import * as DatePickerModule from "./recipes/DatePicker/date-picker.js";
import * as DetailsModule from "./primitives/Details/details.js";
import * as DockModule from "./primitives/Dock/dock.js";
import * as DropdownModule from "./primitives/Dropdown/dropdown.js";
import * as DrawerModule from "./primitives/Drawer/drawer.js";
import * as EmptyModule from "./primitives/Empty/empty.js";
import * as FieldModule from "./primitives/Field/field.js";
import * as FormatBytesModule from "./primitives/FormatBytes/format-bytes.js";
import * as FormatDateModule from "./primitives/FormatDate/format-date.js";
import * as FormatNumberModule from "./primitives/FormatNumber/format-number.js";
import * as GradientPatternModule from "./primitives/GradientPattern/gradient-pattern.js";
import * as GridModule from "./primitives/Grid/grid.js";
import * as HeadingModule from "./primitives/Heading/heading.js";
import * as HoverCardModule from "./recipes/HoverCard/hover-card.js";
import * as IconModule from "./primitives/Icon/icon.js";
import * as IconButtonModule from "./primitives/IconButton/icon-button.js";
import * as IncludeModule from "./primitives/Include/include.js";
import * as InputGroupModule from "./primitives/InputGroup/input-group.js";
import * as InputNumberModule from "./primitives/InputNumber/input-number.js";
import * as InputOTPModule from "./recipes/InputOTP/input-otp.js";
import * as MenubarModule from "./primitives/Menubar/menubar.js";
import * as MutationObserverModule from "./primitives/MutationObserver/mutation-observer.js";
import * as NavigationMenuModule from "./recipes/NavigationMenu/navigation-menu.js";
import * as PaginationModule from "./primitives/Pagination/pagination.js";
import * as PopupModule from "./primitives/Popup/popup.js";
import * as ProgressRingModule from "./primitives/ProgressRing/progress-ring.js";
import * as QrCodeModule from "./primitives/QrCode/qr-code.js";
import * as RatingModule from "./primitives/Rating/rating.js";
import * as ResizableModule from "./recipes/Resizable/resizable.js";
import * as ResizeObserverModule from "./primitives/ResizeObserver/resize-observer.js";
import * as ScrollAreaModule from "./primitives/ScrollArea/scroll-area.js";
import * as ScrollerModule from "./primitives/Scroller/scroller.js";
import * as SectionModule from "./primitives/Section/section.js";
import * as SidebarModule from "./primitives/Sidebar/sidebar.js";
import * as SidebarLayoutModule from "./primitives/SidebarLayout/sidebar-layout.js";
import * as SkeletonModule from "./primitives/Skeleton/skeleton.js";
import * as SpacerModule from "./primitives/Spacer/spacer.js";
import * as SplitPanelModule from "./primitives/SplitPanel/split-panel.js";
import * as SpinnerModule from "./primitives/Spinner/spinner.js";
import * as StackModule from "./primitives/Stack/stack.js";
import * as SwitcherModule from "./primitives/Switcher/switcher.js";
import * as TabGroupModule from "./primitives/TabGroup/tab-group.js";
import * as TagModule from "./primitives/Tag/tag.js";
import * as TextModule from "./primitives/Text/text.js";
import * as TreeModule from "./primitives/Tree/tree.js";
import * as TypewriterModule from "./primitives/Typewriter/typewriter.js";

const COMPONENT_MODULES = [
  AnimatedImageModule,
  AspectRatioModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  CalendarModule,
  CalloutModule,
  CardModule,
  CarouselModule,
  ChartModule,
  CheckboxModule,
  ClusterModule,
  CodeBlockModule,
  ColorPickerModule,
  ComboboxModule,
  CommandModule,
  ContainerModule,
  ContextMenuModule,
  CoverModule,
  CopyButtonModule,
  DataTableModule,
  DatePickerModule,
  DetailsModule,
  DockModule,
  DropdownModule,
  DrawerModule,
  EmptyModule,
  FieldModule,
  FormatBytesModule,
  FormatDateModule,
  FormatNumberModule,
  GradientPatternModule,
  GridModule,
  HeadingModule,
  HoverCardModule,
  IconModule,
  IconButtonModule,
  IncludeModule,
  InputGroupModule,
  InputNumberModule,
  InputOTPModule,
  MenubarModule,
  MutationObserverModule,
  NavigationMenuModule,
  PaginationModule,
  PopupModule,
  ProgressRingModule,
  QrCodeModule,
  RatingModule,
  ResizableModule,
  ResizeObserverModule,
  ScrollAreaModule,
  ScrollerModule,
  SectionModule,
  SidebarModule,
  SidebarLayoutModule,
  SkeletonModule,
  SpacerModule,
  SplitPanelModule,
  SpinnerModule,
  StackModule,
  SwitcherModule,
  TabGroupModule,
  TagModule,
  TextModule,
  TreeModule,
  TypewriterModule,
];

/** @param {string} value */
function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
}

/** @param {object | Function | null | undefined} value */
function isComponentConstructor(value) {
  return typeof value === "function" && value.prototype instanceof SiguiElement;
}

/**
 * Stable map of component key -> constructor built from source modules.
 * This replaces the old generated monolith so each component is sourced
 * from its own module.
 */
export const COMPONENT_DEFINITIONS = Object.freeze(
  COMPONENT_MODULES.reduce((definitions, moduleRecord) => {
    for (const exported of Object.values(moduleRecord)) {
      if (!isComponentConstructor(exported)) continue;
      const componentKey = typeof exported.componentKey === "string" && exported.componentKey
        ? exported.componentKey
        : toKebabCase(exported.name.replace(/^Sigui/, ""));
      if (!definitions[componentKey]) {
        definitions[componentKey] = exported;
      }
    }
    return definitions;
  }, /** @type {Record<string, CustomElementConstructor>} */ ({})),
);
