// @ts-check

/**
 * interactive / definitions module for SigUI web components.
 * @module
 */
import {
  SiguiDialogClose,
  SiguiDialogContent,
  SiguiDialogDescription,
  SiguiDialogRoot,
  SiguiDialogTitle,
  SiguiDialogTrigger,
} from "./dialog.js";
import {
  SiguiSheetClose,
  SiguiSheetContent,
  SiguiSheetDescription,
  SiguiSheetRoot,
  SiguiSheetTitle,
  SiguiSheetTrigger,
} from "./sheet.js";
import {
  SiguiAlertDialogAction,
  SiguiAlertDialogCancel,
  SiguiAlertDialogContent,
  SiguiAlertDialogDescription,
  SiguiAlertDialogRoot,
  SiguiAlertDialogTitle,
  SiguiAlertDialogTrigger,
} from "./alert-dialog.js";
import { SiguiPopoverContent, SiguiPopoverRoot, SiguiPopoverTrigger } from "./popover.js";
import { SiguiTooltipContent, SiguiTooltipRoot, SiguiTooltipTrigger } from "./tooltip.js";
import { SiguiCollapsibleContent, SiguiCollapsibleRoot, SiguiCollapsibleTrigger } from "./collapsible.js";
import { SiguiMenuContent, SiguiMenuItem, SiguiMenuRoot, SiguiMenuTrigger } from "./menu.js";
import { SiguiTabsContent, SiguiTabsList, SiguiTabsRoot, SiguiTabsTrigger } from "./tabs.js";
import { SiguiAccordionContent, SiguiAccordionItem, SiguiAccordionRoot, SiguiAccordionTrigger } from "./accordion.js";
import {
  SiguiSelectContent,
  SiguiSelectGroup,
  SiguiSelectItem,
  SiguiSelectLabel,
  SiguiSelectRoot,
  SiguiSelectTrigger,
} from "./select.js";
import { SiguiToast, SiguiToastProvider } from "./toast.js";
import { SiguiInputOtp } from "./input-otp.js";

/**
 * Registry map of custom element keys to constructors.
 * @type {Record<string, CustomElementConstructor>}
 */
export const INTERACTIVE_COMPONENT_DEFINITIONS = {
  "dialog-root": SiguiDialogRoot,
  "dialog-trigger": SiguiDialogTrigger,
  "dialog-content": SiguiDialogContent,
  "dialog-close": SiguiDialogClose,
  "dialog-title": SiguiDialogTitle,
  "dialog-description": SiguiDialogDescription,

  "sheet-root": SiguiSheetRoot,
  "sheet-trigger": SiguiSheetTrigger,
  "sheet-content": SiguiSheetContent,
  "sheet-close": SiguiSheetClose,
  "sheet-title": SiguiSheetTitle,
  "sheet-description": SiguiSheetDescription,

  "alert-dialog-root": SiguiAlertDialogRoot,
  "alert-dialog-trigger": SiguiAlertDialogTrigger,
  "alert-dialog-content": SiguiAlertDialogContent,
  "alert-dialog-action": SiguiAlertDialogAction,
  "alert-dialog-cancel": SiguiAlertDialogCancel,
  "alert-dialog-title": SiguiAlertDialogTitle,
  "alert-dialog-description": SiguiAlertDialogDescription,

  "popover-root": SiguiPopoverRoot,
  "popover-trigger": SiguiPopoverTrigger,
  "popover-content": SiguiPopoverContent,

  "tooltip-root": SiguiTooltipRoot,
  "tooltip-trigger": SiguiTooltipTrigger,
  "tooltip-content": SiguiTooltipContent,

  "collapsible-root": SiguiCollapsibleRoot,
  "collapsible-trigger": SiguiCollapsibleTrigger,
  "collapsible-content": SiguiCollapsibleContent,

  "menu-root": SiguiMenuRoot,
  "menu-trigger": SiguiMenuTrigger,
  "menu-content": SiguiMenuContent,
  "menu-item": SiguiMenuItem,

  "tabs-root": SiguiTabsRoot,
  "tabs-list": SiguiTabsList,
  "tabs-trigger": SiguiTabsTrigger,
  "tabs-content": SiguiTabsContent,

  "accordion-root": SiguiAccordionRoot,
  "accordion-item": SiguiAccordionItem,
  "accordion-trigger": SiguiAccordionTrigger,
  "accordion-content": SiguiAccordionContent,

  "select-root": SiguiSelectRoot,
  "select-trigger": SiguiSelectTrigger,
  "select-content": SiguiSelectContent,
  "select-item": SiguiSelectItem,
  "select-group": SiguiSelectGroup,
  "select-label": SiguiSelectLabel,

  "toast-provider": SiguiToastProvider,
  toast: SiguiToast,

  "input-otp": SiguiInputOtp,
};
