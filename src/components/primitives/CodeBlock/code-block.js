// @ts-nocheck

/**
 * CodeBlock / code-block module for SigUI web components.
 * @module
 */
import { SiguiElement } from "../../../lib/base-element.js";

/**
 * SiguiCodeBlock custom element class.
 * @extends {SiguiElement}
 */
export class SiguiCodeBlock extends SiguiElement {
  static observedAttributes = ["code","language","title","show-line-numbers","highlight-lines","diff"];

  static componentKey = "code-block";

  constructor() {
    super();
    /** @type {number | null} */
    this.hljsRetryTimer = null;
    this.hljsRetryAttempts = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearHljsRetry();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (this.isConnected) this.render();
  }

  clearHljsRetry() {
    if (this.hljsRetryTimer) {
      clearTimeout(this.hljsRetryTimer);
      this.hljsRetryTimer = null;
    }
  }

  scheduleHljsRetry(language) {
    if (!language || this.hljsRetryTimer || this.hljsRetryAttempts >= 6) return;
    this.hljsRetryAttempts += 1;
    this.hljsRetryTimer = setTimeout(() => {
      this.hljsRetryTimer = null;
      if (this.isConnected) this.render();
    }, 250);
  }

  render() {
    const code = this.getAttribute("code") ?? "";
    const language = this.getAttribute("language") ?? "";
    const title = this.getAttribute("title");
    const showLineNumbers = this.hasAttribute("show-line-numbers");
    const highlightLinesAttr = this.getAttribute("highlight-lines");
    const diff = this.hasAttribute("diff");

    const highlightSet = new Set(
      highlightLinesAttr ? highlightLinesAttr.split(",").map(n => parseInt(n.trim(), 10)) : []
    );
    const useLineMode = showLineNumbers || diff || highlightSet.size > 0;

    if (diff) this.dataset.diff = "";

    let html = "";

    // Header or floating copy button
    if (title) {
      html += `<div class="sg-code-block-header">` +
        `<span class="sg-code-block-title">${esc(title)}</span>` +
        `<button type="button" class="sg-code-block-copy" aria-label="Copy code">Copy</button>` +
        `</div>`;
    } else {
      html += `<button type="button" class="sg-code-block-copy sg-code-block-copy-floating" aria-label="Copy code">Copy</button>`;
    }

    // Code content
    if (useLineMode) {
      const lines = code.split("\n");
      let highlighted = null;

      // Try highlight.js if available
      const hljs = /** @type {{ highlight: (code: string, options: { language: string }) => { value: string } }} */ (globalThis).hljs;
      if (hljs && language) {
        try {
          const result = hljs.highlight(code, { language });
          highlighted = result.value.split("\n");
          this.hljsRetryAttempts = 0;
        } catch { /* language not registered */ }
      } else {
        this.scheduleHljsRetry(language);
      }

      let linesHtml = "";
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const attrs = [];
        if (highlightSet.has(i + 1)) attrs.push('data-highlighted');
        if (diff) {
          const dt = line.startsWith("@@") ? "header" : line.startsWith("+") ? "added" : line.startsWith("-") ? "removed" : null;
          if (dt) attrs.push(`data-diff="${dt}"`);
        }
        const lineNum = showLineNumbers ? `<span class="sg-code-block-line-number">${i + 1}</span>` : "";
        const content = highlighted && highlighted[i] !== undefined ? highlighted[i] : esc(line);
        linesHtml += `<span class="sg-code-block-line" ${attrs.join(" ")}>${lineNum}<span class="sg-code-block-line-content">${content}</span>\n</span>`;
      }
      html += `<pre class="sg-code-block-pre"><code class="sg-code-block-code hljs">${linesHtml}</code></pre>`;
    } else {
      html += `<pre class="sg-code-block-pre"><code class="sg-code-block-code${language ? ` language-${esc(language)}` : ""}">${esc(code.trim())}</code></pre>`;

      // Try highlight.js simple mode
      requestAnimationFrame(() => {
        const hljs = /** @type {{ highlightElement: (element: Element) => void }} */ (globalThis).hljs;
        const codeEl = this.querySelector(".sg-code-block-code");
        if (hljs && codeEl) {
          try {
            hljs.highlightElement(codeEl);
            this.hljsRetryAttempts = 0;
          } catch { /* ignore */ }
          return;
        }
        this.scheduleHljsRetry(language);
      });
    }

    this.innerHTML = html;

    // Wire up copy button
    const copyBtn = this.querySelector(".sg-code-block-copy");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code);
          copyBtn.textContent = "Copied!";
          copyBtn.setAttribute("aria-label", "Copied");
          setTimeout(() => {
            copyBtn.textContent = "Copy";
            copyBtn.setAttribute("aria-label", "Copy code");
          }, 2000);
        } catch { /* clipboard API may not be available */ }
      });
    }
  }
}

/** @param {string} s */
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
