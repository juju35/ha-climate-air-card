// ── Base card ────────────────────────────────────────────────────────────────
// Subclasses set `static kind` and implement:
//   _roles()              roles to look for on the device
//   _model(r)             { state, color, running, statusText, sub, ... } from the resolved entities
// and register the illustration of their kind in CA_ART; `_model` returns what it needs (see CA_ART).
//   _heroInfo(m)          what sits next to the illustration
//   _controls(m)          the control sections below
//   _miniInfo(m)          the lines of the mini card
//   _miniButtons(m)       extra round buttons of the mini card (the power button is added after them)
// What every card of the bundle shares: grid size, language and labels.
// The width of an element's whole text in fractional pixels, even while it is cut with an ellipsis (0 when hidden).
import { caEsc, caFmtNum, caIntlLang, caLang, caNum, caT, caUnavailable, caValueLabel } from "./i18n-helpers.js";
import { CA_IDLE, CA_PRESET_ICON } from "./colors.js";
import { CA_TEMP_DEBOUNCE, caAreaName, caChipKey, caDeviceEntities, caDeviceName, caDeviceOf, caFindEntities, caFindKey, caFocusKey, caMoreInfo, caName, caPatchAround, caRestoreFocus, caRoleOf, caTempData, caWrite } from "./device-discovery.js";
import { CA_KIND_ICONS, caSwitchInfo } from "./climate-cards.js";
import { CA_FILTER_WARNING, CA_RESET_ARM, caBar, caFilterLevel, caLine, caPill } from "./mini-cards.js";
import { CA_ART, caPicture, caVariant } from "./illustrations.js";
import { CA_BANNER_WALL, caBannerScene, caBrand, caBrandBadge, caIsNight } from "./illustrated-header.js";
import { CA_STYLES } from "./styles.js";

export let caUidSeq = 0;

export const textWidth = (el) => {
  if (!el?.getClientRects?.().length || typeof document.createRange !== "function") return 0;
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect().width;
};

// The status pill goes on the title row, right after the title, only when the whole title and the pill's whole label
// fit there; otherwise it takes its own line under the subtitle (.pill-below) and the title keeps its row (cut only
// when it does not fit alone). The subtitle then keeps one line (its whole text in its tooltip), and when the block
// still runs out of the banner or into its floor strip, or the label does not fit its own line, or the card is 200 px
// wide or less, the pill keeps its dot alone (.dot-only, the label in its tooltip and for screen readers). Measured
// on the rendered text, never by a fixed width, so that every language fits; re-measured after each render and
// whenever the card's width changes.
export const caFitPills = (root) => {
  const card = root?.querySelector?.("ha-card");
  for (const t of root?.querySelectorAll?.(".titles") || []) {
    const pill = t.querySelector(".st, .pill");
    if (!pill?.getClientRects?.().length) continue;
    t.classList.remove("pill-below");
    pill.classList.remove("dot-only");
    const sub = t.querySelector(".sub");
    sub?.removeAttribute("title");
    if (card && card.getBoundingClientRect().width <= 200) {
      pill.classList.add("dot-only");
      continue;
    }
    const avail = t.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(pill.parentElement).columnGap) || 0;
    const width = pill.getBoundingClientRect().width;
    if (textWidth(t.querySelector(".name")) + gap + width <= avail + 0.01) continue;
    t.classList.add("pill-below");
    if (sub && sub.scrollWidth > sub.clientWidth) sub.title = sub.textContent.trim();
    const banner = t.closest(".banner");
    const box = banner?.getBoundingClientRect();
    const floor = banner?.querySelector(".ground")?.getBoundingClientRect().top ?? box?.bottom;
    const r = t.getBoundingClientRect();
    const out = box && (r.top < box.top - 0.5 || r.bottom > floor + 0.5);
    if (out || width > avail + 0.01) pill.classList.add("dot-only");
  }
};

export class CaElement extends HTMLElement {
  connectedCallback() {
    if (typeof ResizeObserver === "undefined") return;
    this._ro ??= new ResizeObserver(() => this._fitPills());
    this._ro.observe(this);
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    // Off the page: an armed filter reset is disarmed (it comes back as a plain button).
    clearTimeout(this._armTimer);
    this._armedReset = null;
    this._pressing = false;
    window.removeEventListener("pointerup", this._onPressEnd, true);
    window.removeEventListener("pointercancel", this._onPressEnd, true);
  }

  // No rewrite of the card between a press and its release: Home Assistant updates the card several times a second,
  // and a rewrite under the pointer replaces the element pressed, so that the click lands on the card itself and does
  // nothing. The renders asked meanwhile are held (`_held()`) and `redraw` draws them once released (after the click).
  // `_pointer` tells the last input: a pointer (no focus put back after a rewrite, it would draw the focus ring) or
  // the keyboard.
  _watchPress(redraw) {
    this._onPressEnd = () => {
      window.removeEventListener("pointerup", this._onPressEnd, true);
      window.removeEventListener("pointercancel", this._onPressEnd, true);
      // After the click (same task): a press with no click (released elsewhere) draws what it held back.
      setTimeout(() => {
        this._pressing = false;
        if (this._dirty) redraw();
      }, 0);
    };
    this.shadowRoot.addEventListener("pointerdown", () => {
      this._pointer = true;
      this._pressing = true;
      window.addEventListener("pointerup", this._onPressEnd, true);
      window.addEventListener("pointercancel", this._onPressEnd, true);
    });
  }

  // True (and the render kept for later) while a press is in progress; called first by the renders.
  _held() {
    if (this._pressing) {
      this._dirty = true;
      return true;
    }
    this._dirty = false;
    return false;
  }

  // The click ends the press (its handler renders at once); Enter / Space click with no click count.
  _pressClicked(ev) {
    this._pressing = false;
    if (ev?.detail === 0) this._pointer = false;
  }

  _fitPills() {
    caFitPills(this.shadowRoot);
    // A new <ha-card> (first render) shows its content once Home Assistant has rendered it, a microtask later: the
    // pill measured before is measured again then, before the frame is painted.
    const card = this.shadowRoot?.querySelector?.("ha-card");
    if (card && card !== this._fitCard) {
      this._fitCard = card;
      card.updateComplete?.then?.(() => caFitPills(this.shadowRoot));
    }
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }

  _lang() {
    return caLang(this._config, this._hass);
  }

  _intlLang() {
    return caIntlLang(this._config, this._hass);
  }

  _t(k, vars) {
    return caT(this._lang(), k, vars);
  }
}

export class CaCard extends CaElement {
  static get kind() {
    return "fan";
  }

  static get defaults() {
    return { show_title: true, show_subtitle: true, show_controls: true, show_sensors: true, show_alerts: true, show_filter: true, filter_warning: CA_FILTER_WARNING };
  }

  static getConfigElement() {
    // biome-ignore lint/complexity/noThisInStatic: each card class has its own tag, set by caRegister
    return document.createElement(`${this.tag}-editor`);
  }

  static getStubConfig(hass) {
    // biome-ignore lint/complexity/noThisInStatic: subclasses override static kind
    const id = caFindEntities(hass, this.kind)[0];
    return id ? { entity: id } : {};
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = { ...this.constructor.defaults, ...config };
    // show_title / show_subtitle: the header's title / subtitle, hidden by the stylesheet
    this.toggleAttribute?.("hide-title", config.show_title === false);
    this.toggleAttribute?.("hide-subtitle", config.show_subtitle === false);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.addEventListener("click", (ev) => this._onClick(ev));
      this.shadowRoot.addEventListener("change", (ev) => this._onChange(ev));
      // A slider shows its fill and its value while it moves, before the service is called.
      this.shadowRoot.addEventListener("input", (ev) => {
        if (ev.target?.type === "range") this._showRange(ev.target);
      });
      // Whether the last input came from a pointer or the keyboard: only a pointer is done with a control it changed.
      // A press also holds the rewrites until its click (see _watchPress).
      this._watchPress(() => this._update());
      this.shadowRoot.addEventListener("keydown", (ev) => {
        this._pointer = false;
        caChipKey(this, ev);
      });
      // A dropdown closed with Escape or a slider thumb touched without moving it fires no `change`: when the focus
      // leaves, draw the updates held back while it was there. Deferred so the focus has settled (it may only move
      // to another control of the card, which still holds them back). Focus staying inside the card draws nothing:
      // a mouse press on a button moves the focus between mousedown and mouseup, and a rebuild there would drop the
      // click; the click itself (or the next tick) draws the held updates.
      this.shadowRoot.addEventListener("focusout", (ev) => {
        this._flushRange();
        // Redrawn around a focused control: the next update rebuilds that control too.
        if (this._patched) this._sig = null;
        if (ev.relatedTarget && this.shadowRoot.contains(ev.relatedTarget)) return;
        setTimeout(() => this._update(), 0);
      });
    }
    this._sig = null;
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  get hass() {
    return this._hass;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._flushRange();
    clearTimeout(this._tempTimer);
    clearTimeout(this._settleTimer);
    // Detached mid-debounce (dashboard edit, panel fold, zoom): send the pending target now instead of losing it
    // (unless it was sent already and only waits for the entity to report it).
    if (this._pendingTemp !== undefined) {
      const pending = this._pendingTemp;
      const sent = this._tempSent;
      this._pendingTemp = undefined;
      this._tempSent = false;
      this._sig = null;
      if (!sent && this._r?.id) this._call("climate", "set_temperature", { entity_id: this._r.id, ...caTempData(pending) });
    }
  }

  getCardSize() {
    return 5;
  }

  _entity() {
    return this._config.entity || caFindEntities(this._hass, this.constructor.kind)[0];
  }

  _roles() {
    return [];
  }

  _resolve() {
    const hass = this._hass;
    const id = this._entity();
    const deviceId = caDeviceOf(hass, id);
    const list = caDeviceEntities(hass, deviceId).filter((e) => e.entity_id !== id);
    const over = this._config.entities || {};
    const ent = { main: id };
    // No role takes a fan or climate entity, so the memoized whole-device lookup resolves the same as `list`.
    for (const role of this._roles()) ent[role] = over[role] || caRoleOf(hass, id, role);
    const used = new Set(Object.values(ent));
    return { id, deviceId, list, ent, used };
  }

  _st(id) {
    return id ? this._hass.states[id] : undefined;
  }

  _val(id) {
    return this._st(id)?.state;
  }

  _avail(id) {
    return !caUnavailable(this._st(id));
  }

  _num(id) {
    return caNum(this._st(id));
  }

  // State or attribute value as Home Assistant shows it, or humanized when it has no translation.
  _fmtState(id, value) {
    const st = this._st(id);
    if (!st) return caValueLabel(this._lang(), value);
    const v = value ?? st.state;
    return caValueLabel(this._lang(), v, this._hass.formatEntityState?.(st, v));
  }

  _fmtAttr(id, attr, value) {
    const st = this._st(id);
    return caValueLabel(this._lang(), value, st && this._hass.formatEntityAttributeValue?.(st, attr, value));
  }

  _fmtSensor(id, minDigits = 0) {
    const st = this._st(id);
    if (caUnavailable(st)) return null;
    const v = Number(st.state);
    if (!Number.isFinite(v)) return this._fmtState(id);
    const unit = st.attributes.unit_of_measurement || "";
    return `${caFmtNum(this._intlLang(), v, 1, minDigits)}${unit ? (unit === "%" ? " %" : ` ${unit}`) : ""}`;
  }

  // An entity's name without the device name in front ("Air conditioner Anion" → "Anion").
  _label(id) {
    const st = this._st(id);
    let name = st?.attributes.friendly_name || id;
    const dev = caDeviceName(this._hass, id) || caName(this._hass, this._r?.id || "");
    if (dev && name.toLowerCase().startsWith(dev.toLowerCase())) name = name.slice(dev.length);
    name = name.replace(/^[\s*·-]+/, "").replace(/\s{2,}/g, " ").trim() || st?.attributes.friendly_name || id;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  _update() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    if (this._held()) return;
    const r = this._resolve();
    const hass = this._hass;
    const ids = [r.id, ...Object.values(r.ent), ...(this._extraIds?.(r) || [])];
    // Home Assistant replaces a `states[id]` object whenever the entity changes: comparing the ids and the state
    // object references is enough to tell a tick apart, with nothing serialized.
    const sig = [this._lang(), this._zoomed, this._pendingTemp, this._armedReset, hass.themes?.darkMode, ...(this._extraSig?.() || []), ...ids.flatMap((id) => [id, (id && hass.states[id]) || null])];
    if (this._sig && sig.length === this._sig.length && sig.every((v, i) => v === this._sig[i])) return;
    // A dropdown open or a slider held in the card is not rebuilt: the card is redrawn around it.
    const active = this.shadowRoot.activeElement;
    const held = active && (active.tagName === "SELECT" || active.tagName === "INPUT");
    const focus = caFocusKey(active);
    if (held && !focus) return;
    this._sig = sig;
    this._r = r;
    this._patched = held && this._renderAround(r, active, focus);
    if (!this._patched) {
      this._render(r);
      // The focus is put back for the keyboard only: after a mouse click, it would draw the focus ring.
      if (!this._pointer) caRestoreFocus(this.shadowRoot, focus);
    }
    this._fitPills();
  }

  // Draws the card around the focused control `keep` (see caPatchAround); false when it cannot.
  _renderAround(r, keep, key) {
    const fresh = document.createElement("div");
    this._render(r, fresh);
    const twin = caFindKey(fresh, key);
    if (!twin || !caPatchAround(this.shadowRoot, fresh, keep, twin)) return false;
    if (keep.type === "range") this._showRange(keep);
    return true;
  }

  // Overridden by the mini cards.
  _compact() {
    return false;
  }

  _zoomButton() {
    return "";
  }

  // Writes the card's markup into `target` (the shadow root, or a detached element for _renderAround).
  _render(r, target = this.shadowRoot) {
    const c = this._config;
    const kind = this.constructor.kind;
    const st = this._st(r.id);
    const icon = c.icon || (st && this._kindIcon?.(r)) || CA_KIND_ICONS[kind];
    if (!st) {
      caWrite(
        target,
        `${this._styles()}<ha-card><div class="empty"><ha-icon icon="${caEsc(icon)}"></ha-icon>${caEsc(
          c.entity ? `${this._t("no_device")} (${c.entity})` : this._t("no_device"),
        )}</div></ha-card>`,
      );
      return;
    }
    const m = this._model(r);
    m.online = !caUnavailable(st);
    if (!m.online) {
      m.state = "unavailable";
      m.running = false;
      m.color = CA_IDLE;
      m.statusText = this._t("st_unavailable");
    }
    m.name = c.name || caName(this._hass, r.id) || this._t(kind);
    m.icon = icon;
    m.chips = m.chips || [];
    if (!m.online) m.chips.push(this._chip("mdi:cloud-off-outline", this._t("offline"), "", "", r.id));
    m.variant = caVariant(this._hass, kind, r.id, c.illustration);
    m.powerBtn =
      m.online && this._showPower(m)
        ? `<button class="power${m.running ? " on" : ""}" data-action="power" title="${caEsc(this._t("power"))}" aria-label="${caEsc(this._t("power"))}"><ha-icon icon="mdi:power"></ha-icon></button>`
        : "";
    // The round icon's colour tells the status: an alert in red, a warning in amber, else the state's colour (grey
    // when off or offline).
    m.badgeColor = !m.online
      ? CA_IDLE
      : m.chips.some((x) => x.includes("chip alert"))
        ? "var(--error-color, #db4437)"
        : m.chips.some((x) => x.includes("chip warn"))
          ? "var(--warning-color, #ffa600)"
          : m.color;
    m.illustrated = this._illustrated();
    const brand = m.illustrated ? caBrandBadge(caBrand(this._hass, r.id, c), this) : "";
    m.badge = `<div class="badge"><ha-icon icon="${caEsc(icon)}"></ha-icon>${brand}</div>`;

    if (this._compact()) {
      caWrite(target, this._miniHtml(m));
      return;
    }
    // The subtitle: the room, then the mode (m.sub) unless the body shows it already (see _subInBody).
    const sub = [caAreaName(this._hass, r.id), this._subInBody(m, true) ? "" : m.sub].filter(Boolean).join(" · ");
    const chips = m.chips.length ? `<div class="chips">${m.chips.join("")}</div>` : "";
    const head = m.illustrated
      ? this._banner(m, sub)
      : `<div class="header">${m.badge}${this._titles(m, sub)}${m.powerBtn}${this._zoomButton()}</div>`;
    // Under the banner, the device is in the picture above: the measurements, and the on / off button at their right.
    const hero = m.illustrated
      ? `<div class="hero"><div class="info">${this._heroInfo(m)}${chips}</div>${m.powerBtn}</div>`
      : `<div class="hero">${this._picture(m)}<div class="info">${this._heroInfo(m)}${chips}</div></div>`;
    caWrite(target, `${this._styles(m.color, m.badgeColor)}<ha-card>${head}${hero}${c.show_controls && m.online ? this._controls(m) : ""}</ha-card>`);
  }

  // Whether the body shows the mode (m.sub) already: the full card's hero (`full`), else the compact mini card's
  // lines. The header's subtitle then tells the room instead of repeating it. Overridden by the cards.
  _subInBody() {
    return false;
  }

  // Whether the header is the illustrated banner (the default) or the classic one (`illustration: false`, or a
  // custom `icon` in place of the illustration).
  _illustrated() {
    return this._config.illustration !== false && this._config.illustration !== "none" && !this._config.icon && !!CA_ART[this.constructor.kind];
  }

  // The illustrated header: the round icon, the name with the status pill right after it and `sub` under them on the
  // left, the device in its room on the right.
  _banner(m, sub) {
    const kind = this.constructor.kind;
    this._uid ??= ++caUidSeq;
    const night = caIsNight(this._hass, this._config);
    const wall = CA_BANNER_WALL[kind]?.[night ? 1 : 0];
    const cls = ["banner", `k-${kind}-banner`, night ? "night" : "", m.running ? "running" : ""].filter(Boolean).join(" ");
    return (
      `<div class="${cls}"${wall ? ` style="--ca-wall:${wall};--ca-wall-fill:${wall}"` : ""}>` +
      `${caBannerScene(kind, m.variant, m, night, this._uid)}<div class="ground"></div>` +
      `<div class="bhead">${m.badge}${this._titles(m, sub)}</div>` +
      `${this._zoomButton()}</div>`
    );
  }

  // The title row of the banner and of the classic header: the name with the status pill right after it, `sub` under.
  _titles(m, sub) {
    return `<div class="titles"><div class="trow"><div class="name">${caEsc(m.name)}</div>${caPill(m.statusText)}</div>${sub ? `<div class="sub">${caEsc(sub)}</div>` : ""}</div>`;
  }

  // Whether the header's on / off button shows. A metered heat pump (its entity is a power sensor) is read-only.
  _showPower() {
    return true;
  }

  _picture(m) {
    if (this._config.icon) {
      return `<div class="picture${m.running ? " running" : ""}"><div class="iconart"><ha-icon icon="${caEsc(m.icon)}"></ha-icon></div></div>`;
    }
    return caPicture(this.constructor.kind, m.variant, m);
  }

  // A chip with an icon and a value; `cls` tints it (warn, alert). With an `entity`, a click (or Enter / Space) opens
  // its more-info.
  _chip(icon, text, cls = "", title = "", entity = "") {
    const more = entity ? ` data-more-info="${caEsc(entity)}" role="button" tabindex="0"` : "";
    return `<span class="chip ${cls}"${more}${title ? ` title="${caEsc(title)}"` : ""}><ha-icon icon="${icon}"></ha-icon>${caEsc(text)}</span>`;
  }

  // The measurements of the device as chips (temperature, humidity, …), each one only if found.
  _sensorChips(ent, roles) {
    const icons = {
      temperature: "mdi:thermometer",
      humidity: "mdi:water-percent",
      pm10: "mdi:blur",
      voc: "mdi:molecule",
      no2: "mdi:molecule",
      co2: "mdi:molecule-co2",
      airflow: "mdi:weather-windy",
      outdoor_temp: "mdi:home-thermometer-outline",
      power: "mdi:flash",
    };
    const out = [];
    for (const role of roles) {
      const v = this._fmtSensor(ent[role]);
      if (v == null) continue;
      const prefix =
        role === "pm10"
          ? "PM10 "
          : role === "outdoor_temp"
            ? `${this._t("outdoor")} `
            : role === "voc" || role === "no2" || role === "co2"
              ? `${this._t(role)} `
              : "";
      out.push(this._chip(icons[role], `${prefix}${v}`, "", this._label(ent[role]), ent[role]));
    }
    return out;
  }

  // ── Controls ──
  _section(title, body, icon = "") {
    const head = title ? `<div class="section-title">${icon ? `<ha-icon icon="${icon}"></ha-icon>` : ""}${caEsc(title)}</div>` : "";
    return body ? `<div class="section">${head}${body}</div>` : "";
  }

  _options(body) {
    return this._section(this._t("options"), body, "mdi:tune-variant");
  }

  // Segmented buttons, one per option; `action` gets the option in data-value.
  _segments(action, options, current, label, icon) {
    if (!options || options.length < 2) return "";
    // Many options (an air conditioner's modes): only the selected one keeps its label, the others show their icon.
    const many = options.length > 4;
    return `<div class="segments" role="group">${options
      .map((o) => {
        const ic = icon?.(o);
        const on = o === current;
        const text = caEsc(label(o));
        const short = many && !on && ic;
        return `<button class="seg${on ? " on" : ""}${short ? " short" : ""}" data-action="${action}" data-value="${caEsc(o)}" aria-pressed="${on}" title="${text}"${short ? ` aria-label="${text}"` : ""}>${ic ? `<ha-icon icon="${ic}"></ha-icon>` : ""}${short ? "" : `<span>${text}</span>`}</button>`;
      })
      .join("")}</div>`;
  }

  // A fan speed given as a select (Midea's « Fan speed »: Lowest, Low, Medium, High, Auto) as segmented buttons, its
  // « Off » left to the power button.
  _speedSegments(id) {
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    const options = (st.attributes.options || []).filter((o) => !/^off$/i.test(String(o)));
    const segs = this._segments("fspeed", options, st.state, (o) => this._fmtState(id, o), CA_PRESET_ICON);
    return segs ? this._section(this._t("speed"), segs, "mdi:fan") : "";
  }

  // ── Filter ──
  // The filter of the device: its life (%, `filter`), its hours of use, and its wear `level` — "replace", "soon" (see
  // caFilterLevel) or "dirty" (a dirty-filter binary sensor on, an air conditioner's "full dust"). `entity` is what its
  // chip opens. `known`: the device reports its filter one way or the other.
  _filterState(ent) {
    const pct = this._num(ent.filter);
    let level = caFilterLevel(pct, this._config.filter_warning);
    if (!level && this._val(ent.filter_alert) === "on") level = "dirty";
    const entity = level === "dirty" ? ent.filter_alert : ent.filter || ent.filter_alert;
    const hours = this._num(ent.filter_hours);
    // Its hours of use alone (SwitchBot's « Filter usage ») still tell the filter is followed.
    const sensor = this._avail(ent.filter_alert);
    return { pct, level, hours, sensor, entity: entity || (hours != null ? ent.filter_hours : undefined), known: pct != null || sensor || hours != null };
  }

  _filterText(f) {
    if (f.level === "soon") return this._t("filter_soon");
    if (f.level === "replace") return this._t("filter_low");
    if (f.level === "dirty") return this._t("filter_dirty");
    return this._t("filter_ok");
  }

  // The alert chip of a worn filter (red once it is to replace, orange before), when the alerts are shown.
  _filterChip(f) {
    if (!this._config.show_alerts || !f.level) return "";
    return this._chip("mdi:air-filter", this._filterText(f), f.level === "replace" ? "alert" : "warn", "", f.entity);
  }

  // The filter's line: its life as a bar (tinted when worn), else its state from the dirty-filter sensor.
  _filterLine(f) {
    if (!this._config.show_filter || !f.known) return "";
    const cls = f.level === "replace" ? " low" : f.level ? " soon" : "";
    const hours = f.hours != null ? ` · ${this._t("hours", { n: caFmtNum(this._intlLang(), f.hours, 0) })}` : "";
    const title = caEsc(`${this._t("filter")}${this._t("colon")}${this._filterText(f)}${hours}`);
    const more = f.entity ? ` data-more-info="${caEsc(f.entity)}" role="button" tabindex="0"` : "";
    if (f.pct != null) return `<div class="filter${cls}" title="${title}"${more}>${caBar(f.pct, `${Math.round(f.pct)} %`, "mdi:air-filter")}</div>`;
    // No life figure: the state alone ("Filter OK"), left to the alert chip once dirty; only its hours of use: those.
    if (f.level && this._config.show_alerts) return "";
    if (!f.level && f.hours != null && !f.sensor)
      return `<div class="filter" title="${title}"${more}>${caLine("mdi:air-filter", `${this._t("filter")}${this._t("colon")}${this._t("hours", { n: caFmtNum(this._intlLang(), f.hours, 0) })}`)}</div>`;
    return `<div class="filter${cls}" title="${title}"${more}>${caLine("mdi:air-filter", this._filterText(f))}</div>`;
  }

  // The button that resets the filter counter, offered once the filter is worn or dirty. A first tap arms it (its
  // label asks to tap again), the second one, within CA_RESET_ARM ms, presses the button entity.
  _filterResetButton(f, id) {
    if (!id || !f.level || !this._st(id)) return "";
    const armed = this._armedReset === id;
    const label = this._t(armed ? "filter_reset_confirm" : "filter_reset");
    return `<button class="toggle${armed ? " on" : ""}" data-action="filter-reset" data-value="${caEsc(id)}"${this._val(id) === "unavailable" ? " disabled" : ""}><ha-icon icon="mdi:restore"></ha-icon>${caEsc(label)}</button>`;
  }

  _resetFilter(id) {
    clearTimeout(this._armTimer);
    if (this._armedReset === id) {
      this._armedReset = null;
      this._call("button", "press", { entity_id: id });
    } else {
      this._armedReset = id;
      this._armTimer = setTimeout(() => {
        this._armedReset = null;
        this._update();
      }, CA_RESET_ARM);
    }
    this._update();
  }

  // A speed slider for the fan or purifier entity.
  _speedSlider(id) {
    const st = this._st(id);
    const pct = st.state === "on" ? Number(st.attributes.percentage ?? 0) : 0;
    // The step stays decimal: rounded, a 3-speed fan (33.333) would offer 33/66/99 and never reach full speed.
    // The top notch (99.999) still lands in the last speed band, since fans map a percentage by rounding up.
    const step = Math.max(1, Number(st.attributes.percentage_step) || 1);
    return this._rangeHtml("range", "percentage", "mdi:speedometer", this._t("speed"), step, 100, step, Math.max(step, pct), st.state === "on" ? `${Math.round(pct)} %` : "—", pct);
  }

  // A slider: icon, label, the range input and its value. `data-<key>="<val>"` names what it sets (range: percentage,
  // number: an entity, humidity: the climate target); `text` and `fill` replace the value shown and the fill (a fan
  // shows its own percentage, which the notches may round: — and no fill when off).
  _rangeHtml(key, val, icon, label, min, max, step, value, text = null, fill = null) {
    const d = { [key]: val };
    const pct = fill ?? this._rangePct(d, value, min, max);
    return (
      `<div class="slider"><ha-icon icon="${icon}"></ha-icon><span class="sl-label">${caEsc(label)}</span>` +
      `<input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-${key}="${caEsc(val)}" aria-label="${caEsc(label)}" style="--p:${pct}%">` +
      `<span class="v">${caEsc(text ?? this._rangeText(d, value))}</span></div>`
    );
  }

  // The fill of a slider (%): a fan speed is already a percentage, other values are placed between min and max.
  _rangePct(d, v, min, max) {
    return d.range === "percentage" ? v : ((v - min) / (max - min || 1)) * 100;
  }

  // The value shown next to a slider.
  _rangeText(d, v) {
    if (d.range === "percentage" || d.humidity) return `${Math.round(v)} %`;
    const unit = (d.number && this._st(d.number)?.attributes.unit_of_measurement) || "";
    return `${caFmtNum(this._intlLang(), v)}${unit ? ` ${unit}` : ""}`;
  }

  // While a slider moves (dragged, or arrows held down), its fill and value follow it.
  _showRange(el) {
    const v = Number(el.value);
    el.style.setProperty("--p", `${this._rangePct(el.dataset, v, Number(el.min), Number(el.max))}%`);
    const out = el.parentNode?.querySelector(".v");
    if (out) out.textContent = this._rangeText(el.dataset, v);
  }

  // A number entity as a dropdown when it has few steps (timer, angle, level), as a slider otherwise.
  _numberControl(id, label, icon) {
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    if (id.startsWith("select.")) return this._selectEntity(id, label);
    const a = st.attributes;
    const min = Number(a.min ?? 0);
    const max = Number(a.max ?? 100);
    const step = Number(a.step ?? 1) || 1;
    const unit = a.unit_of_measurement || "";
    const v = Number(st.state);
    const count = Math.floor((max - min) / step) + 1;
    if (count <= 16) {
      const opts = Array.from({ length: count }, (_, i) => +(min + i * step).toFixed(4));
      if (!opts.includes(v)) opts.push(v);
      opts.sort((x, y) => x - y);
      const text = (o) => (o === 0 && /timer|countdown|delay|minuterie|temporizador|ausschalt/.test(id) ? this._t("timer_off") : `${caFmtNum(this._intlLang(), o)}${unit ? ` ${unit}` : ""}`);
      return `<label class="field"><span>${caEsc(label)}</span><select data-number="${caEsc(id)}">${opts
        .map((o) => `<option value="${o}"${o === v ? " selected" : ""}>${caEsc(text(o))}</option>`)
        .join("")}</select></label>`;
    }
    return this._rangeHtml("number", id, icon || "mdi:tune-variant", label, min, max, step, v);
  }

  _selectEntity(id, label) {
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    const opts = (st.attributes.options || []).map((o) => `<option value="${caEsc(o)}"${o === st.state ? " selected" : ""}>${caEsc(this._fmtState(id, o))}</option>`).join("");
    return `<label class="field"><span>${caEsc(label)}</span><select data-select="${caEsc(id)}">${opts}</select></label>`;
  }

  // A select on an attribute of the main entity (fan_mode, swing_mode, preset_mode).
  _selectAttr(attr, listAttr, service, label) {
    const id = this._r.id;
    const st = this._st(id);
    const list = st.attributes[listAttr];
    if (!list?.length) return "";
    const cur = st.attributes[attr];
    const opts = list.map((o) => `<option value="${caEsc(o)}"${o === cur ? " selected" : ""}>${caEsc(this._fmtAttr(id, attr, o))}</option>`).join("");
    return `<label class="field"><span>${caEsc(label)}</span><select data-attr-service="${service}" data-attr="${attr}">${opts}</select></label>`;
  }

  // A toggle chip for a switch or light entity, or for the oscillation (`action`).
  _toggle(id, label, icon, opts = {}) {
    if (!opts.action && (!id || !this._st(id))) return "";
    const ok = opts.action ? true : this._avail(id);
    const on = opts.on ?? this._isOn(id);
    const data = opts.action ? `data-action="${opts.action}"` : `data-toggle="${caEsc(id)}"`;
    return `<button class="toggle${on ? " on" : ""}" ${data}${ok ? "" : " disabled"} aria-pressed="${on}"><ha-icon icon="${icon}"></ha-icon>${caEsc(label)}</button>`;
  }

  // A switch on, or a lock locked (a child lock exposed as a `lock`).
  _isOn(id) {
    const v = this._val(id);
    return v === "on" || v === "locked";
  }

  _toggles(items) {
    const html = items.filter(Boolean).join("");
    return html ? `<div class="toggles">${html}</div>` : "";
  }

  // ── Actions ──
  // A refusal (out of range, entity unavailable) is already reported by Home Assistant's own toast: it must not
  // also surface as an unhandled rejection.
  // Resolves to whether Home Assistant accepted the call; a refused call is not an unhandled rejection.
  _call(domain, service, data) {
    return Promise.resolve(this._hass.callService(domain, service, data)).then(
      () => true,
      () => false,
    );
  }

  _onClick(ev) {
    this._pressClicked(ev);
    const el = ev.composedPath().find((n) => n.dataset && (n.dataset.action || n.dataset.toggle || n.dataset.press || n.dataset.moreInfo));
    if (!el || el.disabled) return;
    const d = el.dataset;
    if (d.moreInfo) {
      caMoreInfo(this, d.moreInfo);
      return;
    }
    if (d.toggle) {
      // A lock has no toggle service: locked → unlock, else lock.
      if (d.toggle.startsWith("lock.")) this._call("lock", this._val(d.toggle) === "locked" ? "unlock" : "lock", { entity_id: d.toggle });
      else this._call(d.toggle.split(".")[0], "toggle", { entity_id: d.toggle });
      return;
    }
    if (d.press) {
      this._call("button", "press", { entity_id: d.press });
      return;
    }
    if (d.action === "zoom") {
      this._toggleZoom(ev);
      return;
    }
    this._action(d.action, d.value, ev);
  }

  // Device-specific actions; `power` is shared.
  _action(action, value) {
    if (action === "filter-reset") {
      this._resetFilter(value);
      return;
    }
    if (action === "fspeed") {
      this._call("select", "select_option", { entity_id: this._r.ent.fan_speed, option: value });
      return;
    }
    if (action === "power") {
      const id = this._r.id;
      const domain = id.split(".")[0];
      this._call(domain, this._val(id) === "off" ? "turn_on" : "turn_off", { entity_id: id });
    }
  }

  _onChange(ev) {
    const el = ev.target;
    const d = el?.dataset;
    if (!d) return;
    const id = this._r.id;
    const value = el.value;
    let send;
    if (d.range === "percentage") send = () => this._call("fan", "set_percentage", { entity_id: id, percentage: Number(value) });
    else if (d.number) send = () => this._call("number", "set_value", { entity_id: d.number, value: Number(value) });
    else if (d.humidity) send = () => this._call("climate", "set_humidity", { entity_id: id, humidity: Number(value) });
    else if (d.select) send = () => this._call("select", "select_option", { entity_id: d.select, option: value });
    else if (d.attrService) send = () => this._call(id.split(".")[0], d.attrService, { entity_id: id, [d.attr]: value });
    else send = this._extraSend?.(d, value);
    if (!send) return;
    if (this._pointer) {
      // A pointer is done with the control: the focus leaves it, so the card redraws (it does not while a dropdown or
      // a slider has the focus).
      send();
      el.blur();
      return;
    }
    // From the keyboard the focus stays. A slider sends a change per arrow press: like the − / + of the target
    // temperature, the service is called once the presses stop (or the focus leaves).
    if (el.type !== "range") {
      send();
      return;
    }
    clearTimeout(this._rangeTimer);
    this._rangeSend = send;
    this._rangeTimer = setTimeout(() => this._flushRange(), CA_TEMP_DEBOUNCE);
  }

  // Sends the slider value still waiting for the keyboard presses to stop.
  _flushRange() {
    clearTimeout(this._rangeTimer);
    const send = this._rangeSend;
    this._rangeSend = null;
    send?.();
  }

  // ── Styles ──
  _styles(color, badge) {
    return `<style>${CA_STYLES}${CA_ART[this.constructor.kind]?.styles || ""}${this.constructor.styles || ""}</style><style>:host{--ca-color:${color || CA_IDLE};--ca-badge:${badge || color || CA_IDLE};}</style>`;
  }

  // The device's other switches (eco, display, self clean, child lock…) are listed as options.
  _switches(r) {
    return r.list.map((e) => e.entity_id).filter((id) => id.startsWith("switch.") && !r.used.has(id));
  }

  // A round button of a mini card that moves to the next option (preset, mode): `label` names it, `icon` shows it.
  _cycleButton(action, label, icon) {
    const t = caEsc(label);
    return `<button class="round on" data-action="${action}" title="${t}" aria-label="${t}"><ha-icon icon="${icon || "mdi:tune-variant"}"></ha-icon></button>`;
  }

  // The device's other switches (eco, display, self clean…) as option toggles.
  _switchToggles(r) {
    return this._toggles(
      this._switches(r).map((id) => {
        const info = caSwitchInfo(id);
        return this._toggle(id, info ? this._t(`sw_${info[2]}`) : this._label(id), info?.[1] || "mdi:toggle-switch-outline");
      }),
    );
  }
}
