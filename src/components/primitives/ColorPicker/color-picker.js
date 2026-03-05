// @ts-check

/**
 * ColorPicker / color-picker module for SigUI web components.
 * @module
 */
import { fromOklch, toOklch } from "@sig-ui/core";
import { readBaseUnit } from "@sig-ui/core/runtime/spacing";
import { SiguiElement } from "../../../lib/base-element.js";

const DEFAULT_HUE = 0;
const DEFAULT_LIGHTNESS = 0.7;
const DEFAULT_CHROMA = 0.15;
const DEFAULT_SIZE = 50;
const DEFAULT_THICKNESS = 6;

/** @param {number} value @param {number} min @param {number} max */
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** @param {string | null} value @param {number} fallback */
function readNumber(value, fallback) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** @param {Element} el @param {string} name @param {boolean} fallback */
function readBoolAttr(el, name, fallback = false) {
  if (!el.hasAttribute(name)) return fallback;
  const raw = (el.getAttribute(name) ?? "").trim().toLowerCase();
  if (!raw) return true;
  return !(raw === "false" || raw === "0" || raw === "no" || raw === "off");
}

/**
 * Validate and normalize parsed OKLCH channels.
 * @param {{ l: number, c: number, h: number } | null | undefined} oklch
 */
function normalizeParsedOklch(oklch) {
  if (!oklch) return null;
  if (!Number.isFinite(oklch.l) || !Number.isFinite(oklch.c) || !Number.isFinite(oklch.h)) return null;
  return {
    l: clamp(oklch.l, 0, 1),
    c: clamp(oklch.c, 0, 0.4),
    h: ((oklch.h % 360) + 360) % 360,
  };
}

/**
 * SiguiColorPicker custom element class.
 * @extends {SiguiElement}
 */
export class SiguiColorPicker extends SiguiElement {
  static observedAttributes = ["value","hue","lightness","chroma","size","ring-size","swatch-size","thickness","disabled","label","swatch","show-value","input","popover","mode","direction","onchange"];

  static componentKey = "color-picker";

  /** @type {import("../../../lib/base-element.js").SiguiContract} */
  static contract = Object.freeze({
    events: [
      { name: "input", bubbles: true },
      { name: "change", bubbles: true },
    ],
    valueAttr: "value",
  });

  constructor() {
    super();
    this._hue = DEFAULT_HUE;
    this._lightness = DEFAULT_LIGHTNESS;
    this._chroma = DEFAULT_CHROMA;
    this._hexInput = "";
    this._hexInputFocused = false;
    this._hexInputValid = true;
    this._draggingZone = "none";
    this._dragPointerId = null;
    this._isPointerInteracting = false;
    this._suppressAttr = false;
    this._rendered = false;
    this._root = null;
    this._canvas = null;
    this._lcSlider = null;
    this._swatch = null;
    this._value = null;
    this._input = null;
    this._popup = null;
    this._triggerButton = null;
    this._oklchInputs = null;
    this._lastCommittedHex = null;
    this._geometry = {
      baseUnit: 4,
      ringSizePx: 200,
      thicknessPx: 24,
      swatchSizePx: 40,
      cx: 100,
      outerR: 98,
      innerR: 74,
      crossR: 66,
      crossOrigin: 34,
      crossExtent: 132,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("disabled")) this.removeAttribute("aria-disabled");

    this._syncFromAttributes();
    this._render();
    this._rendered = true;
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    super.attributeChangedCallback(name, _oldValue, newValue);
    if (!this.isConnected || this._suppressAttr) return;

    if (this.hasAttribute("disabled")) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");

    // Avoid collapsing popover/losing interaction state on external value sync.
    if (name === "value" || name === "hue" || name === "lightness" || name === "chroma") {
      // Keep drag interaction stable when hosts echo values back while pointer is active.
      if (this._isPointerInteracting) {
        this._refreshOutputs();
        return;
      }
      // Ignore external value echoes of the same commit to avoid lossy hex->OKLCH->hex drift.
      if (name === "value" && typeof newValue === "string" && this._lastCommittedHex) {
        const normalized = this._normalizeHex(newValue);
        if (normalized && normalized === this._lastCommittedHex) {
          this._refreshOutputs();
          return;
        }
      }
      this._syncFromAttributes();
      this._draw();
      this._refreshOutputs();
      return;
    }

    this._syncFromAttributes();
    this._render();
  }

  get value() {
    try {
      return fromOklch({ l: this._lightness, c: this._chroma, h: this._hue, alpha: 1 }, "hex");
    } catch {
      return "#808080";
    }
  }

  get hue() { return this._hue; }
  get lightness() { return this._lightness; }
  get chroma() { return this._chroma; }

  _syncFromAttributes() {
    const value = this.getAttribute("value");
    if (value) {
      try {
        const parsed = normalizeParsedOklch(toOklch(value));
        if (parsed) {
          this._hue = parsed.h;
          this._lightness = parsed.l;
          this._chroma = parsed.c;
        }
      } catch {
        // Preserve current state for invalid values.
      }
    } else {
      this._hue = ((readNumber(this.getAttribute("hue"), DEFAULT_HUE) % 360) + 360) % 360;
      this._lightness = clamp(readNumber(this.getAttribute("lightness"), DEFAULT_LIGHTNESS), 0, 1);
      this._chroma = clamp(readNumber(this.getAttribute("chroma"), DEFAULT_CHROMA), 0, 0.4);
    }
    this._hexInput = this.value;
    this._hexInputValid = true;
  }

  _resolveSizes() {
    const size = readNumber(this.getAttribute("size"), DEFAULT_SIZE);
    const ringSize = readNumber(this.getAttribute("ring-size"), size);
    const swatchSize = readNumber(this.getAttribute("swatch-size"), Math.round(ringSize * 0.2));
    const thickness = readNumber(this.getAttribute("thickness"), DEFAULT_THICKNESS);
    const baseUnit = readBaseUnit(this);

    const ringSizePx = ringSize * baseUnit;
    const thicknessPx = thickness * baseUnit;
    const swatchSizePx = swatchSize * baseUnit;
    const cx = ringSizePx / 2;
    const outerR = ringSizePx / 2 - 2;
    const innerR = outerR - thicknessPx;
    const crossGap = 6;
    const crossR = innerR - 2 - crossGap;
    const crossOrigin = cx - crossR;
    const crossExtent = 2 * crossR;

    this._geometry = {
      baseUnit,
      ringSizePx,
      thicknessPx,
      swatchSizePx,
      cx,
      outerR,
      innerR,
      crossR,
      crossOrigin,
      crossExtent,
    };
  }

  _render() {
    this._resolveSizes();
    this.textContent = "";
    this._triggerButton = null;
    this._popup = null;
    this._oklchInputs = null;
    this._input = null;
    this._value = null;

    const direction = (this.getAttribute("direction") ?? "bottom").toLowerCase();
    const popoverMode = this._isPopoverMode();

    if (popoverMode) {
      this._renderTrigger(direction);
    } else {
      this._renderInline(direction);
    }

    this._draw();
    this._refreshOutputs();
  }

  _isPopoverMode() {
    const mode = (this.getAttribute("mode") ?? "").trim().toLowerCase();
    if (mode === "popover") return true;
    if (mode === "inline") return false;
    if (this.hasAttribute("popover")) return readBoolAttr(this, "popover", false);
    return false;
  }

  /** @param {string} direction */
  _renderInline(direction) {
    const container = document.createElement("div");
    container.className = "sg-color-picker";
    if (this.hasAttribute("disabled")) container.setAttribute("data-disabled", "");
    const wheel = this._buildWheel();
    const control = this._buildControlPanel(false);
    container.append(control, wheel);
    container.style.flexDirection = direction === "top"
      ? "column-reverse"
      : direction === "bottom"
        ? "column"
        : direction === "left"
          ? "row-reverse"
          : "row";

    this._root = container;
    this.append(container);
  }

  /** @param {string} direction */
  _renderTrigger(direction) {
    const trigger = document.createElement("div");
    trigger.className = "sg-color-picker-trigger";
    if (this.hasAttribute("disabled")) trigger.dataset.disabled = "";
    const control = this._buildControlPanel(true);
    const button = this._triggerButton;
    if (!button) return;

    const popup = document.createElement("div");
    popup.className = "sg-color-picker-trigger-popup";
    popup.style.display = "none";
    popup.style.position = "fixed";
    popup.style.zIndex = "999";
    popup.style.overflow = "visible";

    const wheelWrap = document.createElement("div");
    wheelWrap.className = "sg-color-picker";
    wheelWrap.append(this._buildWheel());
    popup.append(wheelWrap);

    const offset = 8;
    const placePopup = () => {
      const rect = button.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      let left;
      let top;

      if (direction === "top") {
        left = rect.left + (rect.width - popupRect.width) / 2;
        top = rect.top - popupRect.height - offset;
      } else if (direction === "left") {
        left = rect.left - popupRect.width - offset;
        top = rect.top + (rect.height - popupRect.height) / 2;
      } else if (direction === "right") {
        left = rect.right + offset;
        top = rect.top + (rect.height - popupRect.height) / 2;
      } else {
        left = rect.left + (rect.width - popupRect.width) / 2;
        top = rect.bottom + offset;
      }

      // Keep the selected direction deterministic; only clamp the cross axis.
      if (direction === "left" || direction === "right") {
        const maxTop = Math.max(8, window.innerHeight - popupRect.height - 8);
        top = clamp(top, 8, maxTop);
      } else {
        const maxLeft = Math.max(8, window.innerWidth - popupRect.width - 8);
        left = clamp(left, 8, maxLeft);
      }

      popup.style.left = `${Math.round(left)}px`;
      popup.style.top = `${Math.round(top)}px`;
    };

    button.addEventListener("click", () => {
      if (popup.style.display === "none") {
        popup.style.display = "flex";
        placePopup();
        requestAnimationFrame(placePopup);
      } else {
        popup.style.display = "none";
      }
    });

    this.on(document, "pointerdown", (event) => {
      const path = typeof event.composedPath === "function" ? event.composedPath() : [];
      const insideTrigger = path.includes(trigger) || trigger.contains(/** @type {Node} */ (event.target));
      if (!insideTrigger) popup.style.display = "none";
    });
    this.on(window, "resize", () => {
      if (popup.style.display !== "none") placePopup();
    });
    this.on(window, "scroll", () => {
      if (popup.style.display !== "none") placePopup();
    });
    this.on(document, "scroll", () => {
      if (popup.style.display !== "none") placePopup();
    }, { capture: true });

    trigger.append(control);
    trigger.append(popup);
    this._popup = popup;

    this._root = trigger;
    this.append(trigger);
  }

  _buildControlPanel(useButton) {
    const panel = document.createElement("div");
    panel.style.display = "inline-flex";
    panel.style.flexDirection = "column";
    panel.style.alignItems = "center";
    panel.style.gap = "6px";

    const swatch = this._buildSwatch(useButton);
    const value = this._buildValueDisplay();
    panel.append(swatch);
    if (value) panel.append(value);
    return panel;
  }

  _buildSwatch(useButton) {
    const swatch = useButton ? document.createElement("button") : document.createElement("div");
    swatch.className = "sg-color-picker-trigger-swatch";
    if (useButton) {
      const button = /** @type {HTMLButtonElement} */ (swatch);
      button.type = "button";
      button.disabled = this.hasAttribute("disabled");
    }
    swatch.style.width = `${this._geometry.swatchSizePx}px`;
    swatch.style.height = `${this._geometry.swatchSizePx}px`;
    const radiusPx = clamp(Math.round(this._geometry.swatchSizePx * 0.18), 2, 10);
    swatch.style.borderRadius = `${radiusPx}px`;
    swatch.style.background = this.value;
    swatch.setAttribute("aria-label", this.getAttribute("label") ?? "Color picker");
    this._triggerButton = swatch;
    return swatch;
  }

  _buildWheel() {
    const wrap = document.createElement("div");
    wrap.style.position = "relative";
    wrap.style.width = `${this._geometry.ringSizePx}px`;
    wrap.style.height = `${this._geometry.ringSizePx}px`;

    const blur = document.createElement("div");
    blur.className = "sg-color-picker-blur";
    blur.style.width = `${this._geometry.innerR * 2}px`;
    blur.style.height = `${this._geometry.innerR * 2}px`;
    blur.style.top = `${this._geometry.cx - this._geometry.innerR}px`;
    blur.style.left = `${this._geometry.cx - this._geometry.innerR}px`;

    const canvas = document.createElement("canvas");
    canvas.className = "sg-color-picker-canvas";
    canvas.style.width = `${this._geometry.ringSizePx}px`;
    canvas.style.height = `${this._geometry.ringSizePx}px`;
    canvas.width = this._geometry.ringSizePx;
    canvas.height = this._geometry.ringSizePx;
    canvas.tabIndex = this.hasAttribute("disabled") ? -1 : 0;
    canvas.setAttribute("role", "slider");
    canvas.setAttribute("aria-label", this.getAttribute("label") ?? "Hue");
    canvas.setAttribute("aria-valuemin", "0");
    canvas.setAttribute("aria-valuemax", "360");
    canvas.setAttribute("aria-valuenow", String(Math.round(this._hue)));
    canvas.setAttribute("aria-valuetext", `${Math.round(this._hue)}deg`);

    canvas.addEventListener("keydown", (event) => this._onHueKeyDown(event));
    canvas.addEventListener("pointerdown", (event) => this._onPointerDown(event));

    const lcSlider = document.createElement("div");
    lcSlider.className = "sg-color-picker-lc-slider";
    lcSlider.tabIndex = this.hasAttribute("disabled") ? -1 : 0;
    lcSlider.setAttribute("role", "slider");
    lcSlider.setAttribute("aria-label", "Lightness and chroma");
    lcSlider.setAttribute("aria-valuemin", "0");
    lcSlider.setAttribute("aria-valuemax", "100");
    lcSlider.setAttribute("aria-valuenow", String(Math.round(this._lightness * 100)));
    lcSlider.setAttribute("aria-valuetext", `L ${this._lightness.toFixed(2)} C ${this._chroma.toFixed(3)}`);
    lcSlider.addEventListener("keydown", (event) => this._onLCKeyDown(event));

    wrap.append(blur, canvas, lcSlider);

    this._canvas = canvas;
    this._lcSlider = lcSlider;
    this._swatch = null;

    return wrap;
  }

  _buildValueDisplay() {
    if (readBoolAttr(this, "input", false)) {
      if (!this.hasAttribute("value")) {
        return this._buildOklchInputs();
      }
      const input = document.createElement("input");
      input.className = "sg-color-picker-trigger-input";
      input.type = "text";
      input.value = this._hexInput;
      input.disabled = this.hasAttribute("disabled");
      input.maxLength = 7;
      input.spellcheck = false;
      input.setAttribute("aria-label", "Hex color value");
      input.addEventListener("focus", () => {
        this._hexInputFocused = true;
      });
      input.addEventListener("blur", () => {
        this._hexInputFocused = false;
        this._hexInput = this.value;
        this._hexInputValid = true;
        this._refreshOutputs();
      });
      input.addEventListener("input", (event) => this._onHexInput(event));
      this._input = input;
      this._value = null;
      return input;
    }

    this._input = null;
    this._oklchInputs = null;
    if (readBoolAttr(this, "show-value", false)) {
      const value = document.createElement("span");
      value.className = "sg-color-picker-value";
      this._value = value;
      return value;
    }

    this._value = null;
    return null;
  }

  _buildOklchInputs() {
    const wrap = document.createElement("div");
    wrap.style.display = "inline-flex";
    wrap.style.gap = "4px";
    wrap.style.alignItems = "center";

    const inputL = document.createElement("input");
    inputL.className = "sg-color-picker-trigger-input";
    inputL.type = "number";
    inputL.step = "0.01";
    inputL.min = "0";
    inputL.max = "1";
    inputL.style.width = "4.8rem";
    inputL.setAttribute("aria-label", "Lightness");

    const inputC = document.createElement("input");
    inputC.className = "sg-color-picker-trigger-input";
    inputC.type = "number";
    inputC.step = "0.005";
    inputC.min = "0";
    inputC.max = "0.4";
    inputC.style.width = "4.8rem";
    inputC.setAttribute("aria-label", "Chroma");

    const inputH = document.createElement("input");
    inputH.className = "sg-color-picker-trigger-input";
    inputH.type = "number";
    inputH.step = "1";
    inputH.min = "0";
    inputH.max = "359";
    inputH.style.width = "4.8rem";
    inputH.setAttribute("aria-label", "Hue");

    for (const input of [inputL, inputC, inputH]) {
      input.disabled = this.hasAttribute("disabled");
      input.addEventListener("input", () => this._onOklchInput());
    }

    wrap.append(inputL, inputC, inputH);
    this._oklchInputs = { l: inputL, c: inputC, h: inputH };
    this._input = null;
    this._value = null;
    return wrap;
  }

  _draw() {
    const canvas = this._canvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;
    canvas.width = Math.round(this._geometry.ringSizePx * dpr);
    canvas.height = Math.round(this._geometry.ringSizePx * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this._geometry.ringSizePx, this._geometry.ringSizePx);

    this._drawRing(ctx);
    this._drawHueMarker(ctx);
    this._drawCrosshair(ctx);
  }

  /** @param {CanvasRenderingContext2D} ctx */
  _drawRing(ctx) {
    for (let deg = 0; deg < 360; deg += 1) {
      const startAngle = ((deg - 90) * Math.PI) / 180;
      const endAngle = ((deg - 89) * Math.PI) / 180;
      let hex = "#808080";
      try {
        hex = fromOklch({ l: this._lightness, c: this._chroma, h: deg, alpha: 1 }, "hex");
      } catch {
        // Keep fallback.
      }

      ctx.beginPath();
      ctx.arc(this._geometry.cx, this._geometry.cx, this._geometry.outerR, startAngle, endAngle);
      ctx.arc(this._geometry.cx, this._geometry.cx, this._geometry.innerR, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = hex;
      ctx.fill();
    }
  }

  /** @param {CanvasRenderingContext2D} ctx */
  _drawHueMarker(ctx) {
    const markerAngle = ((this._hue - 90) * Math.PI) / 180;
    const markerR = (this._geometry.outerR + this._geometry.innerR) / 2;
    const mx = this._geometry.cx + markerR * Math.cos(markerAngle);
    const my = this._geometry.cx + markerR * Math.sin(markerAngle);
    const radius = this._geometry.thicknessPx / 2 + 1;

    ctx.beginPath();
    ctx.arc(mx, my, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(mx, my, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(mx, my, radius - 2, 0, Math.PI * 2);
    ctx.fillStyle = this.value;
    ctx.fill();
  }

  /** @param {CanvasRenderingContext2D} ctx */
  _drawCrosshair(ctx) {
    if (this._geometry.crossR <= 0) return;

    ctx.save();
    ctx.beginPath();
    ctx.arc(this._geometry.cx, this._geometry.cx, this._geometry.crossR, 0, Math.PI * 2);
    ctx.clip();

    const x1 = this._geometry.crossOrigin;
    const x2 = this._geometry.crossOrigin + this._geometry.crossExtent;
    const y1 = this._geometry.crossOrigin;
    const y2 = this._geometry.crossOrigin + this._geometry.crossExtent;

    const chromaGradient = ctx.createLinearGradient(x1, this._geometry.cx, x2, this._geometry.cx);
    const lightGradient = ctx.createLinearGradient(this._geometry.cx, y1, this._geometry.cx, y2);
    for (let i = 0; i <= 8; i += 1) {
      const t = i / 8;
      const c = t * 0.4;
      const l = 1 - t;
      chromaGradient.addColorStop(t, this._safeHex(this._lightness, c, this._hue));
      lightGradient.addColorStop(t, this._safeHex(l, this._chroma, this._hue));
    }

    this._drawCrossSegment(ctx, x1, this._geometry.cx, x2, this._geometry.cx, chromaGradient);
    this._drawCrossSegment(ctx, this._geometry.cx, y1, this._geometry.cx, y2, lightGradient);

    ctx.restore();

    const cursorX = this._geometry.crossOrigin + (this._chroma / 0.4) * this._geometry.crossExtent;
    const cursorY = this._geometry.crossOrigin + (1 - this._lightness) * this._geometry.crossExtent;
    const cursorR = Math.max(4, this._geometry.thicknessPx / 4);

    ctx.beginPath();
    ctx.arc(cursorX, cursorY, cursorR, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cursorX, cursorY, cursorR, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cursorX, cursorY, cursorR - 1.5, 0, Math.PI * 2);
    ctx.fillStyle = this.value;
    ctx.fill();
  }

  /** @param {CanvasRenderingContext2D} ctx */
  _drawCrossSegment(ctx, x1, y1, x2, y2, gradient) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 4.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  _refreshOutputs() {
    const hex = this.value;
    if (this._value) {
      const showHex = this.hasAttribute("value");
      const text = showHex
        ? hex
        : `oklch(${this._lightness.toFixed(2)} ${this._chroma.toFixed(3)} ${Math.round(this._hue)})`;
      this._value.textContent = text;
    }
    if (this._input && !this._hexInputFocused) {
      this._input.value = this._hexInput || hex;
      if (this._hexInputValid) this._input.removeAttribute("data-invalid");
      else this._input.setAttribute("data-invalid", "");
      this._input.setAttribute("aria-invalid", this._hexInputValid ? "false" : "true");
    }
    if (this._oklchInputs) {
      this._oklchInputs.l.value = this._lightness.toFixed(2);
      this._oklchInputs.c.value = this._chroma.toFixed(3);
      this._oklchInputs.h.value = String(Math.round(this._hue));
    }
    if (this._swatch) this._swatch.style.background = hex;
    if (this._triggerButton) this._triggerButton.style.background = hex;
    if (this._canvas) {
      this._canvas.setAttribute("aria-valuenow", String(Math.round(this._hue)));
      this._canvas.setAttribute("aria-valuetext", `${Math.round(this._hue)}deg`);
    }
    if (this._lcSlider) {
      this._lcSlider.setAttribute("aria-valuenow", String(Math.round(this._lightness * 100)));
      this._lcSlider.setAttribute("aria-valuetext", `L ${this._lightness.toFixed(2)} C ${this._chroma.toFixed(3)}`);
    }
  }

  /** @param {number} l @param {number} c @param {number} h */
  _safeHex(l, c, h) {
    try {
      return fromOklch({ l, c, h, alpha: 1 }, "hex");
    } catch {
      return "#808080";
    }
  }

  /** @param {PointerEvent} event */
  _onPointerDown(event) {
    if (this.hasAttribute("disabled") || !this._canvas) return;
    const zone = this._getZone(event.clientX, event.clientY);
    if (zone === "none") return;

    this._draggingZone = zone;
    this._dragPointerId = event.pointerId;
    this._isPointerInteracting = true;
    this._canvas.setPointerCapture(event.pointerId);
    this._handlePointer(event.clientX, event.clientY);

    const onMove = /** @param {PointerEvent} moveEvent */ (moveEvent) => {
      if (moveEvent.pointerId !== this._dragPointerId) return;
      this._handlePointer(moveEvent.clientX, moveEvent.clientY);
    };
    const onUp = /** @param {PointerEvent} upEvent */ (upEvent) => {
      if (upEvent.pointerId !== this._dragPointerId) return;
      this._draggingZone = "none";
      this._dragPointerId = null;
      this._isPointerInteracting = false;
      this._canvas?.removeEventListener("pointermove", onMove);
      this._canvas?.removeEventListener("pointerup", onUp);
      this._canvas?.removeEventListener("pointercancel", onUp);
      // Commit final value as a change event after drag ends.
      this._commitAndNotify();
    };

    this._canvas.addEventListener("pointermove", onMove);
    this._canvas.addEventListener("pointerup", onUp);
    this._canvas.addEventListener("pointercancel", onUp);
  }

  /** @param {number} clientX @param {number} clientY */
  _getZone(clientX, clientY) {
    if (!this._canvas) return "none";
    const rect = this._canvas.getBoundingClientRect();
    const x = clientX - rect.left - this._geometry.cx;
    const y = clientY - rect.top - this._geometry.cx;
    const dist = Math.hypot(x, y);
    if (dist >= this._geometry.innerR && dist <= this._geometry.outerR) return "ring";
    if (dist < this._geometry.innerR) return "inner";
    return "none";
  }

  /** @param {number} clientX @param {number} clientY */
  _handlePointer(clientX, clientY) {
    if (!this._canvas) return;
    const rect = this._canvas.getBoundingClientRect();
    if (this._draggingZone === "ring") {
      const x = clientX - rect.left - this._geometry.cx;
      const y = clientY - rect.top - this._geometry.cx;
      let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      this._hue = angle;
    } else if (this._draggingZone === "inner") {
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      this._chroma = clamp(((px - this._geometry.crossOrigin) / this._geometry.crossExtent) * 0.4, 0, 0.4);
      this._lightness = clamp(1 - ((py - this._geometry.crossOrigin) / this._geometry.crossExtent), 0, 1);
    }

    this._draw();
    this._commitAndNotify(null, false);
  }

  /** @param {KeyboardEvent} event */
  _onHueKeyDown(event) {
    if (this.hasAttribute("disabled")) return;
    const step = event.shiftKey ? 10 : 1;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      this._hue = (this._hue + step) % 360;
      this._draw();
      this._commitAndNotify();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      this._hue = (this._hue - step + 360) % 360;
      this._draw();
      this._commitAndNotify();
    } else if (event.key === "Home") {
      event.preventDefault();
      this._hue = 0;
      this._draw();
      this._commitAndNotify();
    } else if (event.key === "End") {
      event.preventDefault();
      this._hue = 359;
      this._draw();
      this._commitAndNotify();
    }
  }

  /** @param {KeyboardEvent} event */
  _onLCKeyDown(event) {
    if (this.hasAttribute("disabled")) return;
    const big = event.shiftKey;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      this._lightness = clamp(this._lightness + (big ? 0.1 : 0.01), 0, 1);
      this._draw();
      this._commitAndNotify();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      this._lightness = clamp(this._lightness - (big ? 0.1 : 0.01), 0, 1);
      this._draw();
      this._commitAndNotify();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      this._chroma = clamp(this._chroma + (big ? 0.05 : 0.005), 0, 0.4);
      this._draw();
      this._commitAndNotify();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      this._chroma = clamp(this._chroma - (big ? 0.05 : 0.005), 0, 0.4);
      this._draw();
      this._commitAndNotify();
    }
  }

  /** @param {Event} event */
  _onHexInput(event) {
    if (!(event.target instanceof HTMLInputElement)) return;

    const raw = event.target.value;
    this._hexInput = raw;
    const normalized = this._normalizeHex(raw);
    if (normalized) {
      this._hexInputValid = true;
      try {
        const parsed = normalizeParsedOklch(toOklch(normalized));
        if (parsed) {
          this._hue = parsed.h;
          this._lightness = parsed.l;
          this._chroma = parsed.c;
          this._draw();
          this._commitAndNotify(normalized);
          return;
        }
      } catch {
        // Keep invalid state handling below.
      }
    }

    this._hexInputValid = raw.trim() === "" || raw.trim() === "#";
    this._refreshOutputs();
  }

  _onOklchInput() {
    if (!this._oklchInputs) return;
    const l = readNumber(this._oklchInputs.l.value, this._lightness);
    const c = readNumber(this._oklchInputs.c.value, this._chroma);
    const h = readNumber(this._oklchInputs.h.value, this._hue);
    this._lightness = clamp(l, 0, 1);
    this._chroma = clamp(c, 0, 0.4);
    this._hue = ((h % 360) + 360) % 360;
    this._draw();
    this._commitAndNotify();
  }

  /** @param {string} raw */
  _normalizeHex(raw) {
    let value = raw.trim();
    if (!value.startsWith("#")) value = `#${value}`;
    if (/^#[0-9a-f]{3}$/i.test(value)) {
      value = `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
    }
    if (/^#[0-9a-f]{6}$/i.test(value)) return value.toLowerCase();
    return null;
  }

  /** @param {string | null} overrideValue @param {boolean} emitChange */
  _commitAndNotify(overrideValue = null, emitChange = true) {
    const hex = overrideValue ?? this.value;
    this._lastCommittedHex = hex;

    this._suppressAttr = true;
    if (this.hasAttribute("value") || overrideValue) {
      this.setAttribute("value", hex);
    }
    this.setAttribute("hue", String(this._hue));
    this.setAttribute("lightness", String(this._lightness));
    this.setAttribute("chroma", String(this._chroma));
    this._suppressAttr = false;

    this._hexInput = hex;
    this._hexInputValid = true;
    this._refreshOutputs();

    const detail = {
      hex,
      hue: this._hue,
      lightness: this._lightness,
      chroma: this._chroma,
    };

    this.dispatchEvent(new CustomEvent("input", { detail, bubbles: true, composed: true }));
    if (emitChange) {
      this.dispatchEvent(new CustomEvent("change", { detail, bubbles: true, composed: true }));
    }
  }
}
