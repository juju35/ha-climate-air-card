// ── Mini cards ───────────────────────────────────────────────────────────────
// A mini card is the full card drawn compact, like the ha-home-connect-card and ha-roborock-card mini cards: its
// detail button (top right, `zoom: false` removes it) switches it to the full card and back, and a click anywhere
// else on the page folds it again.
import { caEsc } from "./i18n-helpers.js";
import { caAreaName } from "./device-discovery.js";

export const caInDialog = (ev) => ev.composedPath().some((n) => ["ha-more-info-dialog", "ha-dialog", "dialog"].includes(n.localName));
export const caIsOutside = (card, ev) => !ev.composedPath().includes(card) && !caInDialog(ev);

// "A click elsewhere" is caught on the pointer, not only on the click event: on iOS (Safari and the companion app)
// a tap on something that is not clickable (the background, an empty spot, a card with no action) sends no click to
// the page. It counts when the press and the release are both outside the card (a slider dragged out of the card
// does not fold it), and a scroll does not count (the browser cancels the pointer). Keyboard clicks still go through
// the click event. `tap(ev)` (press and release at the same spot) is for the tests.
export const caWatchOutside = (isOut, handler) => {
  let downOutside = false;
  const onDown = (ev) => {
    downOutside = isOut(ev);
  };
  const onUp = (ev) => {
    if (downOutside && isOut(ev)) handler(ev);
    downOutside = false;
  };
  const onClick = (ev) => {
    if (ev.detail === 0 && isOut(ev)) handler(ev);
  };
  return {
    on() {
      document.addEventListener("pointerdown", onDown, true);
      document.addEventListener("pointerup", onUp, true);
      document.addEventListener("click", onClick, true);
    },
    tap(ev) {
      onDown(ev);
      onUp(ev);
    },
    off() {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("pointerup", onUp, true);
      document.removeEventListener("click", onClick, true);
    },
  };
};

export const caMini = (Base) =>
  class extends Base {
    static get mini() {
      return true;
    }

    constructor() {
      super();
      this._unzoom = caWatchOutside(
        (ev) => caIsOutside(this, ev),
        () => {
          if (this._zoomed) this._setZoom(false);
        },
      );
    }

    connectedCallback() {
      super.connectedCallback?.();
      this._unzoom.on();
      // Back on the page after leaving it: rendered again, compact.
      if (this._hass && this._config) this._update();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this._unzoom.off();
      // Left (another dashboard view, a conditional card hidden): back to the compact view, so that the card does not
      // come back unfolded.
      this._zoomed = false;
    }

    getCardSize() {
      return this._zoomed ? super.getCardSize() : 2;
    }

    getGridOptions() {
      return { ...(this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 6 }), rows: "auto" };
    }

    _compact() {
      return !this._zoomed;
    }

    _zoomButton() {
      if (this._config.zoom === false) return "";
      const z = !!this._zoomed;
      const label = caEsc(this._t(z ? "zoom_out" : "zoom_in"));
      return `<button class="zoom" data-action="zoom" title="${label}" aria-label="${label}"><ha-icon icon="${z ? "mdi:arrow-collapse" : "mdi:arrow-expand"}"></ha-icon></button>`;
    }

    _setZoom(on) {
      this._zoomed = on;
      this._update();
    }

    // From the keyboard (Enter / Space: no click count), the focus follows to the button that replaced this one.
    _toggleZoom(ev) {
      this._setZoom(!this._zoomed);
      if (ev.detail === 0) this.shadowRoot.querySelector(".zoom")?.focus({ preventScroll: true });
    }

    _miniHtml(m) {
      const btns = [...(m.online && this._config.show_controls ? this._miniButtons(m) : []), m.powerBtn].filter(Boolean);
      const chips = m.chips.filter((x) => x.includes("chip warn") || x.includes("chip alert") || !m.online);
      // The banner's subtitle: the mode, or the room when the compact lines show the mode (see _subInBody).
      const head = m.illustrated
        ? this._banner(m, this._subInBody(m, false) ? caAreaName(this._hass, this._r.id) : m.sub)
        : `<div class="header">${m.badge}${this._titles(m)}${this._zoomButton()}</div>`;
      return (
        `${this._styles(m.color, m.badgeColor)}<ha-card class="mini">${head}` +
        `<div class="content">${m.illustrated ? "" : this._picture(m)}<div class="info">${this._miniInfo(m)}${chips.length ? `<div class="chips">${chips.join("")}</div>` : ""}</div>` +
        `${btns.length ? `<div class="mcontrols">${btns.join("")}</div>` : ""}</div></ha-card>`
      );
    }
  };

// The status pill of the header: its text truncates, and on a narrow card only the dot shows (the status stays in the
// tooltip, and for screen readers in the clipped text).
export const caPill = (text) => `<span class="st" title="${caEsc(text)}"><span class="dot"></span><span class="stt">${caEsc(text)}</span></span>`;

// A mini bar with its value: speed, filter life.
export const caBar = (pct, value, icon) =>
  `<div class="mbar">${icon ? `<ha-icon icon="${icon}"></ha-icon>` : ""}<div class="bar"><div class="fill" style="width:${Math.max(0, Math.min(100, pct))}%"></div></div><span class="v">${caEsc(value)}</span></div>`;

// Filter wear from its remaining life (%): "replace" at CA_FILTER_REPLACE or less, "soon" at the warning threshold
// (`filter_warning`, CA_FILTER_WARNING by default) or less, null otherwise.
export const CA_FILTER_REPLACE = 10;
export const CA_FILTER_WARNING = 20;
// How long the filter reset button stays armed after its first tap.
export const CA_RESET_ARM = 4000;
export function caFilterLevel(pct, warning) {
  if (pct == null) return null;
  const warn = Number.isFinite(Number(warning)) && warning !== "" && warning != null ? Number(warning) : CA_FILTER_WARNING;
  if (pct <= CA_FILTER_REPLACE) return "replace";
  return pct <= Math.max(warn, CA_FILTER_REPLACE) ? "soon" : null;
}

export const caLine = (icon, text) => `<div class="line"><ha-icon icon="${icon}"></ha-icon><span>${caEsc(text)}</span></div>`;
