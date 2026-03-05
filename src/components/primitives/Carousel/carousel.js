// @ts-check

/**
 * Carousel / carousel module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiCarouselRoot custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCarouselRoot extends SiguiElement {
  static observedAttributes = ["orientation","loop","autoplay","autoplay-interval","onchange"];
  static componentKey = "carousel-root";
}

export { SiguiCarouselRoot as SiguiCarousel };
