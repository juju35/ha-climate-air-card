// ── Climate cards ────────────────────────────────────────────────────────────
// The climate card the air conditioner card builds on: the mode buttons, the − / + of the target (one temperature or a
// low / high range), the target humidity, the fan / swing / preset selects and the device's switches as options.
// Subclasses implement _model(r) (with cur, target, range, mode, running) and may set `_heroLine(m)` for the line under
// the temperatures.
// The device switches listed as options: icon and label (`sw_<key>`) from the entity ID, since integrations often
// name them in English only (Midea: "Prompt tone", "Smart eye"…). The first match wins; others keep their own name.
import { caEsc, caFmtNum } from "./i18n-helpers.js";
import { CA_MODE_ICONS } from "./colors.js";
import { CA_CLIMATE_FAN_MODE, CA_CLIMATE_PRESET, CA_CLIMATE_SWING, CA_CLIMATE_SWING_HORIZONTAL, CA_CLIMATE_TARGET, CA_CLIMATE_TARGET_HUMIDITY, CA_TEMP_DEBOUNCE, CA_TEMP_SETTLE, caClimateRange, caTempData } from "./device-discovery.js";
import { CaCard } from "./base-card.js";

export const CA_SWITCHES = [
  [/outdoor_?silent|silence_?ext/, "mdi:volume-off", "outdoor_silent"],
  [/aux|auxiliary|electric_?heat|appoint/, "mdi:radiator", "aux_heat"],
  [/frost|freeze|8_?deg|antigel|hors_?gel/, "mdi:snowflake-thermometer", "frost"],
  [/eco/, "mdi:leaf", "eco"],
  [/display|screen|ecran/, "mdi:monitor", "display"],
  [/tone|sound|buzzer|beep|prompt|bip/, "mdi:volume-high", "sound"],
  [/self_?clean|autonettoyage|clean/, "mdi:broom", "self_clean"],
  [/silent|quiet|silence/, "mdi:volume-off", "silent"],
  [/smart_?eye|eye|presence/, "mdi:eye-outline", "smart_eye"],
  [/anion|ioni/, "mdi:creation-outline", "anion"],
  [/turbo|boost/, "mdi:rocket-launch-outline", "turbo"],
  [/breeze/, "mdi:weather-windy", "breeze"],
  [/sleep/, "mdi:power-sleep", "sleep"],
  [/light|led/, "mdi:lightbulb-outline", "light"],
];
export const caSwitchInfo = (id) => CA_SWITCHES.find(([re]) => re.test(id.split(".")[1] || id));

export class CaClimateCard extends CaCard {
  _extraIds(r) {
    return this._switches(r);
  }

  _unit() {
    return this._hass.config?.unit_system?.temperature || "°C";
  }

  // A target sent stays on screen until the entity reports it (then the entity's own value takes over), so it does
  // not jump back to the old one in between.
  _update() {
    this._settle();
    super._update();
  }

  _settle() {
    const p = this._pendingTemp;
    const st = this._tempSent && this._r && this._st(this._r.id);
    if (!st) return;
    const a = st.attributes;
    const same = (x, y) => x != null && Math.abs(Number(x) - y) < 1e-6;
    if (typeof p === "number" ? same(a.temperature, p) : same(a.target_temp_low, p.target_temp_low) && same(a.target_temp_high, p.target_temp_high)) {
      this._clearPending();
    }
  }

  _clearPending() {
    clearTimeout(this._settleTimer);
    this._pendingTemp = undefined;
    this._tempSent = false;
    this._sig = null;
  }

  _target(st) {
    if (typeof this._pendingTemp === "number") return this._pendingTemp;
    return st.attributes.temperature == null ? null : Number(st.attributes.temperature);
  }

  // A low / high range (heat_cool, auto) when the entity sets one instead of a single target.
  _range(st) {
    const range = caClimateRange(st.attributes);
    const p = this._pendingTemp;
    if (range && p && typeof p === "object") return { low: p.target_temp_low, high: p.target_temp_high };
    return range;
  }

  // The text on the unit's display: the target, the range in whole degrees (20-24) or "--".
  _display(mode, target, range) {
    const n = (v, digits) => caFmtNum(this._intlLang(), v, digits);
    if (mode === "fan_only") return "--";
    if (range) return `${n(range.low, 0)}-${n(range.high, 0)}`;
    return target != null ? `${n(target)}°` : "--";
  }

  _temp(v, digits = 1) {
    return `${caFmtNum(this._intlLang(), v, digits)} ${this._unit()}`;
  }

  _showTarget(m) {
    return m.running && (m.target != null || m.range != null) && m.mode !== "fan_only";
  }

  // The target as text: one temperature, or the range (20–24 °C).
  _targetText(m) {
    if (!m.range) return this._temp(m.target);
    return `${caFmtNum(this._intlLang(), m.range.low)}–${this._temp(m.range.high)}`;
  }

  // One − / + stepper: `action` is temp (single target), temp_low or temp_high, `hint` names the value in the labels.
  // `opts.unit` overrides the shown unit and `opts.dataValue(dir)` the button's data-value (so another card can carry
  // an entity id to its own handler — see the heat-pump setpoints).
  _stepper(action, value, label, hint, opts = {}) {
    const unit = opts.unit || this._unit();
    const dv = opts.dataValue || ((dir) => dir);
    const btn = (dir, key, icon) => {
      const text = hint ? `${this._t(key)} (${hint})` : this._t(key);
      return `<button class="round" data-action="${action}" data-value="${caEsc(String(dv(dir)))}" title="${caEsc(text)}" aria-label="${caEsc(text)}"><ha-icon icon="${icon}"></ha-icon></button>`;
    };
    return (
      '<div class="stepper">' +
      btn("-1", "temp_down", "mdi:minus") +
      `<div class="tv"><span class="tval">${caFmtNum(this._intlLang(), value)}<small> ${caEsc(unit)}</small></span><span class="tl">${caEsc(label)}</span></div>` +
      btn("1", "temp_up", "mdi:plus") +
      "</div>"
    );
  }

  _heroInfo(m) {
    const cur = m.cur != null ? `<span class="val">${caFmtNum(this._intlLang(), m.cur)}<small> ${caEsc(this._unit())}</small></span>` : "";
    const target = this._showTarget(m) ? `<span class="arrow">→ ${caEsc(this._targetText(m))}</span>` : "";
    if (!cur) return `<div class="big"><span class="state-big">${caEsc(m.statusText)}</span></div>${this._heroLine(m)}`;
    return `<div class="big">${cur}${target}</div>${this._heroLine(m)}`;
  }

  _controls(m) {
    const r = this._r;
    const st = this._st(r.id);
    const a = st.attributes;
    const f = a.supported_features || 0;
    const modes = (a.hvac_modes || []).filter((x) => x !== "off");
    const segs = this._segments("hvac", modes, m.mode, (o) => this._fmtState(r.id, o), (o) => CA_MODE_ICONS[o]);
    let stepper = "";
    if (m.range && this._showTarget(m)) {
      const low = this._t("target_low");
      const high = this._t("target_high");
      stepper = `<div class="steppers">${this._stepper("temp_low", m.range.low, low, low)}${this._stepper("temp_high", m.range.high, high, high)}</div>`;
    } else if (f & CA_CLIMATE_TARGET && this._showTarget(m)) stepper = this._stepper("temp", m.target, this._t("target"));
    // Target humidity (dehumidifying units): a slider calling climate.set_humidity.
    const hum =
      m.running && f & CA_CLIMATE_TARGET_HUMIDITY && a.humidity != null
        ? this._rangeHtml("humidity", "target", "mdi:water-percent", this._t("target_humidity"), Number(a.min_humidity ?? 30), Number(a.max_humidity ?? 99), 1, Number(a.humidity))
        : "";
    const selects = m.running
      ? [
          f & CA_CLIMATE_FAN_MODE ? this._selectAttr("fan_mode", "fan_modes", "set_fan_mode", this._t("fan_mode")) : "",
          f & CA_CLIMATE_SWING ? this._selectAttr("swing_mode", "swing_modes", "set_swing_mode", this._t("swing_mode")) : "",
          f & CA_CLIMATE_SWING_HORIZONTAL
            ? this._selectAttr("swing_horizontal_mode", "swing_horizontal_modes", "set_swing_horizontal_mode", this._t("swing_horizontal_mode"))
            : "",
          f & CA_CLIMATE_PRESET ? this._selectAttr("preset_mode", "preset_modes", "set_preset_mode", this._t("preset_mode")) : "",
        ].filter(Boolean)
      : [];
    const toggles = this._switchToggles(r);
    const extra = this._toggles(this._extraOptions(m));
    return (
      this._section("", segs + stepper + hum + (selects.length ? `<div class="grid">${selects.join("")}</div>` : "")) + this._midSections(m) + this._options(toggles + extra)
    );
  }

  // Sections a kind adds between the controls and the options (the heat pump's hot water).
  _midSections() {
    return "";
  }

  // Buttons a kind adds at the end of the options (the air conditioner's filter reset).
  _extraOptions() {
    return [];
  }

  _action(action, value) {
    const id = this._r.id;
    if (action === "hvac") this._call("climate", "set_hvac_mode", { entity_id: id, hvac_mode: value });
    else if (action === "temp") this._step(Number(value));
    else if (action === "temp_low") this._step(Number(value), "low");
    else if (action === "temp_high") this._step(Number(value), "high");
    else super._action(action, value);
  }

  // Each tap moves the target by one step at once on screen; the service is called once the taps stop, and the new
  // target stays shown until the entity reports it (CA_TEMP_SETTLE at most, at once if the call is refused). `bound`
  // (low or high) moves that end of a range, which keeps at least one step between the two.
  _step(dir, bound) {
    const st = this._st(this._r.id);
    const a = st.attributes;
    const step = Number(a.target_temp_step) || (this._unit() === "°F" ? 1 : 0.5);
    const min = Number(a.min_temp ?? 7);
    const max = Number(a.max_temp ?? 35);
    // Rounded so a 0.1 step sends 21.3, not 21.300000000000001.
    const fix = (v) => +v.toFixed(2);
    const next = (cur, lo, hi) => fix(Math.min(hi, Math.max(lo, Math.round((cur + dir * step) / step) * step)));
    if (bound) {
      const r = this._range(st);
      if (!r) return;
      this._pendingTemp =
        bound === "low"
          ? { target_temp_low: next(r.low, min, Math.min(max, fix(r.high - step))), target_temp_high: r.high }
          : { target_temp_low: r.low, target_temp_high: next(r.high, Math.max(min, fix(r.low + step)), max) };
    } else {
      const cur = this._target(st);
      if (cur == null) return;
      this._pendingTemp = next(cur, min, max);
    }
    clearTimeout(this._settleTimer);
    this._tempSent = false;
    this._update();
    clearTimeout(this._tempTimer);
    this._tempTimer = setTimeout(async () => {
      const pending = this._pendingTemp;
      const ok = await this._call("climate", "set_temperature", { entity_id: this._r.id, ...caTempData(pending) });
      // Tapped again meanwhile: that newer target is the one waiting.
      if (this._pendingTemp !== pending) return;
      if (!ok) this._clearPending();
      else {
        this._tempSent = true;
        this._settleTimer = setTimeout(() => {
          if (this._pendingTemp !== pending) return;
          this._clearPending();
          this._update();
        }, CA_TEMP_SETTLE);
      }
      this._update();
    }, CA_TEMP_DEBOUNCE);
  }

  // What the climate model starts from: the entity, its mode, the room temperature (from the entity, else the
  // device's indoor sensor) and the target, one temperature or a low / high range.
  _climate(r) {
    const ent = r.ent;
    const st = this._st(r.id);
    const a = st.attributes;
    const mode = st.state;
    const range = this._range(st);
    return {
      ent,
      st,
      a,
      mode,
      on: mode !== "off",
      cur: a.current_temperature != null ? Number(a.current_temperature) : this._num(ent.indoor_temp),
      range,
      target: range ? null : this._target(st),
    };
  }

  // The mini card's temperature line: the room temperature, and the target while it runs.
  _tempLine(m) {
    if (m.cur == null) return "";
    const target = this._showTarget(m) ? ` → ${this._targetText(m)}` : "";
    return `<div class="line tline"><ha-icon icon="mdi:thermometer"></ha-icon><span><b>${caEsc(this._temp(m.cur))}</b>${caEsc(target)}</span></div>`;
  }

  // The line under the temperatures (the fan mode of an air conditioner).
  _heroLine() {
    return "";
  }

  _miniButtons(m) {
    // A range has four buttons: they stay on the full card, which the mini card unfolds into.
    if (m.range || !this._showTarget(m) || !((this._st(this._r.id).attributes.supported_features || 0) & CA_CLIMATE_TARGET)) return [];
    return [
      ["-1", "mdi:minus", "temp_down"],
      ["1", "mdi:plus", "temp_up"],
    ].map(([v, icon, key]) => `<button class="round" data-action="temp" data-value="${v}" title="${caEsc(this._t(key))}" aria-label="${caEsc(this._t(key))}"><ha-icon icon="${icon}"></ha-icon></button>`);
  }

  static styles = `
    .stepper { display: flex; align-items: center; justify-content: center; gap: 18px; }
    /* A low / high range: two steppers side by side, one under the other when they do not fit. */
    .steppers { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 20px; }
    .steppers .stepper { gap: 8px; }
    .steppers .tv { min-width: 72px; }
    .steppers .tval { font-size: 24px; }
    .steppers .round { width: 40px; height: 40px; }
    .tv { display: flex; flex-direction: column; align-items: center; min-width: 96px; }
    .tval { font-size: 30px; font-weight: 400; line-height: 1.1; color: var(--primary-text-color); font-variant-numeric: tabular-nums; white-space: nowrap; }
    .tval small { font-size: 14px; color: var(--secondary-text-color); }
    .tl { font-size: 11px; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: .04em; }
    .stepper .round { width: 44px; height: 44px; background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }
    .stepper .round:hover:not(:disabled) { background: color-mix(in srgb, var(--ca-color) 24%, transparent); }
    ha-card.mini .round[data-action=temp] { width: 36px; height: 36px; }
    /* Narrow cards (inner width): the target stepper tightens so its buttons stay inside the card. */
    @container (max-width: 230px) { .stepper { gap: 8px; } .tv { min-width: 0; } }
    @container (max-width: 180px) {
      .stepper { gap: 4px; }
      .stepper .round { width: 36px; height: 36px; }
      .tval { font-size: 24px; }
    }
  `;
}

export const CA_KIND_ICONS = {
  purifier: "mdi:air-purifier",
  fan: "mdi:fan",
  aircon: "mdi:air-conditioner",
  heatpump: "mdi:heat-pump-outline",
  humidifier: "mdi:air-humidifier",
  ventilation: "mdi:fan",
};
