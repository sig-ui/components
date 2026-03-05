// @ts-check

/**
 * Accordion / accordion module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiAccordionRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiAccordionRoot extends SiguiElement {
  static observedAttributes = ["multiple"];
  static componentKey = "accordion-root";
}

export { SiguiAccordionRoot as SiguiAccordion };
