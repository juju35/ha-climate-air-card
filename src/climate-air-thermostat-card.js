/*
 * climate-air-thermostat-card and its mini card: a thermostat (a climate entity that heats but cannot cool, dry or blow:
 * a wall thermostat, an electric radiator, a radiator valve) with its target temperature, presets, mode, the valve
 * opening, the open window and the battery of its device. The target and the controls come from CaClimateCard
 * (shared.js), like the air conditioner card's.
 */

// Illustrations: heat rises while it actually heats (hvac_action, else the valve opening), the radiator glows from the
// bottom up and the dial's flame flickers; the display shows the target and the dial's arc where it sits between the
// entity's min and max. Three shapes: a round wall thermostat, a column radiator and a radiator valve on the corner of
// its radiator; `illustration: auto` picks one from the device model and name.
const ctWaves = (xs, y) => `<g class="heat">${xs.map((x) => `<path d="M${x} ${y}q-2-2.5 0-5t0-5"/>`).join("")}</g>`;

// Radiator columns from `x`, `n` of them, `w` wide every `step`, between `y1` and `y2`, each with its glow.
const ctColumns = (x, n, w, step, y1, y2) =>
  Array.from({ length: n }, (_, i) => {
    const cx = x + i * step;
    const r = w / 2;
    return (
      `<rect x="${cx}" y="${y1}" width="${w}" height="${y2 - y1}" rx="${r}" fill="url(#ca-tc)" stroke="#c3cad2" stroke-width=".9"/>` +
      `<rect class="glow" x="${cx}" y="${y1}" width="${w}" height="${y2 - y1}" rx="${r}" fill="url(#ca-tg)"/>`
    );
  }).join("");

// The 270° arc of the dial (open at the bottom), around (cx, cy) with radius r: the track, and the part up to `level`.
const ctArc = (cx, cy, r, level) => {
  const len = 2 * Math.PI * r;
  const arc = len * 0.75;
  const at = `transform="rotate(135 ${cx} ${cy})"`;
  const lvl = Math.max(0, Math.min(1, level ?? 0));
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3a434e" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="${arc.toFixed(2)} ${len.toFixed(2)}" ${at}/>` +
    `<circle class="arc" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="${Math.max(0.01, arc * lvl).toFixed(2)} ${len.toFixed(2)}" ${at}/>`
  );
};

const CA_THERMOSTAT_ARTS = {
  dial: (s) =>
    '<circle class="halo" cx="40" cy="52" r="34" fill="url(#ca-th)"/>' +
    ctWaves([31, 40, 49], 24) +
    '<rect x="13" y="25" width="54" height="54" rx="12" fill="url(#ca-tb)" stroke="#c3cad2" stroke-width="1.1"/>' +
    '<circle cx="40" cy="52" r="22" fill="url(#ca-tr)" stroke="#aab3bd" stroke-width=".8"/>' +
    '<circle cx="40" cy="52" r="18" fill="#1d2632"/>' +
    ctArc(40, 52, 14.5, s.level) +
    `<text class="disp big" x="40" y="54.6" text-anchor="middle">${caEsc(s.display || "")}</text>` +
    '<path class="flame" d="M40 57.4c2 1.7 2.6 3 2.6 4.3a2.6 2.6 0 0 1-5.2 0c0-1 .5-1.8 1.1-2.3c.1.8.5 1.2 1 1.2c.5-1 .5-2.1.5-3.2Z"/>' +
    '<circle class="led" cx="40" cy="74" r="1.3"/>',
  radiator: () =>
    '<ellipse class="floor" cx="40" cy="89" rx="31" ry="4" fill="url(#ca-af2)"/>' +
    ctWaves([22, 40, 58], 22) +
    '<rect x="12" y="82" width="4" height="6" rx="1" fill="#8f9aa6"/><rect x="60" y="82" width="4" height="6" rx="1" fill="#8f9aa6"/>' +
    ctColumns(8, 7, 7, 8.6, 28, 84) +
    '<rect x="6" y="31" width="64" height="3.4" rx="1.7" fill="#dfe4ea" stroke="#c3cad2" stroke-width=".6"/>' +
    '<rect x="6" y="77" width="64" height="3.4" rx="1.7" fill="#dfe4ea" stroke="#c3cad2" stroke-width=".6"/>' +
    '<rect x="70" y="42" width="7" height="22" rx="2.2" fill="#3a434e"/>' +
    '<circle class="led" cx="73.5" cy="47" r="1.3"/>' +
    '<circle cx="73.5" cy="56" r="2.2" fill="#5d6874" stroke="#8f9aa6" stroke-width=".5"/>',
  valve: (s) =>
    '<ellipse class="floor" cx="26" cy="89" rx="24" ry="3.6" fill="url(#ca-af2)"/>' +
    ctWaves([11, 20, 29], 22) +
    ctColumns(2, 4, 7, 8.6, 30, 86) +
    '<rect x="0" y="33" width="38" height="3.2" rx="1.6" fill="#dfe4ea" stroke="#c3cad2" stroke-width=".6"/>' +
    '<rect x="0" y="79" width="38" height="3.2" rx="1.6" fill="#dfe4ea" stroke="#c3cad2" stroke-width=".6"/>' +
    '<rect x="36" y="77" width="40" height="6" rx="1.5" fill="#cfd5dc" stroke="#aab3bd" stroke-width=".6"/>' +
    '<rect x="51" y="66" width="12" height="18" rx="2" fill="#dfe4ea" stroke="#aab3bd" stroke-width=".7"/>' +
    '<rect x="48" y="16" width="18" height="51" rx="8" fill="url(#ca-tc)" stroke="#c3cad2" stroke-width="1.1"/>' +
    '<path d="M50 50h14M50 53.5h14M50 57h14M50 60.5h14" stroke="#d5dbe2" stroke-width="1"/>' +
    `<rect x="50" y="26" width="14" height="10" rx="2.5" fill="#1d2632"/><text class="disp" x="57" y="33.2" text-anchor="middle">${caEsc(s.display || "")}</text>` +
    '<circle class="led" cx="57" cy="42" r="1.3"/>',
};

const caThermostatArt = (variant, s) =>
  '<svg viewBox="0 0 80 94" aria-hidden="true"><defs>' +
  '<linearGradient id="ca-tb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e1e6eb"/></linearGradient>' +
  '<linearGradient id="ca-tc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d5dbe2"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d0d8"/></linearGradient>' +
  '<linearGradient id="ca-tr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".5" stop-color="#c9d0d8"/><stop offset="1" stop-color="#eef1f4"/></linearGradient>' +
  '<linearGradient id="ca-tg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" class="c-stop" stop-opacity=".75"/><stop offset=".7" class="c-stop" stop-opacity=".18"/><stop offset="1" class="c-stop" stop-opacity="0"/></linearGradient>' +
  '<radialGradient id="ca-th" cx=".5" cy=".5" r=".5"><stop offset=".55" class="c-stop" stop-opacity=".35"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient>' +
  '<radialGradient id="ca-af2" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".45"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient></defs>' +
  (CA_THERMOSTAT_ARTS[variant] || CA_THERMOSTAT_ARTS.dial)(s) +
  "</svg>";

// The shape that looks most like the device, from its model and name: a valve first (a "radiator valve" is one).
const caThermostatVariant = (text) => {
  const s = String(text).toLowerCase();
  if (/valve|vanne|trv|t[eê]te.?thermo|thermostatic|thermostatique|heizk[oö]rperthermostat|ventil|spirit|eurotronic|danfoss.?ally|e1.?thermostat/.test(s)) return "valve";
  if (/radiat|convect|heater|chauffage|panel|panneau|towel|s[eè]che|heizk[oö]rper|radiador/.test(s)) return "radiator";
  return "dial";
};

CA_ART.thermostat = {
  variants: ["dial", "radiator", "valve"],
  guess: caThermostatVariant,
  render: (variant, s) => ({ svg: caThermostatArt(variant, s), cls: [s.active ? "active" : ""] }),
  styles: `
    .k-thermostat .disp { font: 600 5.6px/1 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: var(--ca-color); }
    .k-thermostat .disp.big { font-size: 8.4px; }
    .k-thermostat .arc { stroke: var(--ca-color); transition: stroke .4s; }
    .k-thermostat .led { fill: #9aa5b1; }
    .k-thermostat .c-stop { stop-color: var(--ca-color); }
    .k-thermostat .floor, .k-thermostat .halo, .k-thermostat .glow { opacity: 0; transition: opacity .6s; }
    .k-thermostat .flame { fill: var(--ca-color); opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; }
    .k-thermostat .heat { fill: none; stroke: var(--ca-color); stroke-width: 1.4; stroke-linecap: round; }
    .k-thermostat .heat path { opacity: 0; transform-box: view-box; }
    .k-thermostat.running .led { fill: var(--ca-color); }
    .k-thermostat.running .floor { opacity: .45; }
    .k-thermostat.running.active .floor, .k-thermostat.running.active .halo { opacity: 1; }
    .k-thermostat.running.active .led { animation: ca-blink 2s ease-in-out infinite; }
    .k-thermostat.running.active .glow { opacity: 1; animation: ca-glow 3.2s ease-in-out infinite; }
    .k-thermostat.running.active .flame { opacity: 1; animation: ca-flame 1.3s ease-in-out infinite; }
    .k-thermostat.running.active .heat path { animation: ca-rise 2.8s ease-in-out infinite; }
    .k-thermostat.running.active .heat path:nth-child(2) { animation-delay: .9s; }
    .k-thermostat.running.active .heat path:nth-child(3) { animation-delay: 1.8s; }
    @keyframes ca-glow { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
    @keyframes ca-flame { 0%, 100% { transform: scale(1, 1); } 30% { transform: scale(.9, 1.12); } 60% { transform: scale(1.06, .92); } }
  `,
};

class ClimateAirThermostatCard extends CaClimateCard {
  static get kind() {
    return "thermostat";
  }

  // The presets (comfort, eco, away, frost protection…) as segmented buttons.
  get _presetButtons() {
    return true;
  }

  _roles() {
    return ["indoor_temp", "outdoor_temp", "humidity", "power", "valve", "window", "battery"];
  }

  _model(r) {
    const c = this._config;
    const { ent, a, mode, on, cur, range, target } = this._climate(r);
    const valve = this._num(ent.valve);
    // Whether it heats right now: what the entity says it does, else whether its valve is open.
    const action = a.hvac_action;
    const active = on && (action ? !["idle", "off"].includes(action) : valve != null ? valve > 0 : true);
    const chips = [];
    if (c.show_alerts && this._val(ent.window) === "on") chips.push(this._chip("mdi:window-open-variant", this._t("window_open"), "warn", "", ent.window));
    const battery = this._num(ent.battery);
    if (battery != null && c.show_alerts && battery <= CA_BATTERY_LOW) {
      chips.push(this._chip("mdi:battery-alert-variant-outline", `${this._t("battery_low")} · ${this._fmtSensor(ent.battery)}`, "warn", "", ent.battery));
    } else if (battery != null && c.show_sensors) chips.push(this._chip("mdi:battery-outline", this._fmtSensor(ent.battery), "", this._label(ent.battery), ent.battery));
    if (c.show_sensors && valve != null) chips.push(this._chip("mdi:valve", `${this._t("valve")} ${this._fmtSensor(ent.valve)}`, "", this._label(ent.valve), ent.valve));
    if (c.show_sensors) chips.push(...this._sensorChips(ent, ["outdoor_temp", "humidity", ...(on ? ["power"] : [])]));
    const preset = on && a.preset_mode && a.preset_mode !== "none" ? a.preset_mode : "";
    const min = Number(a.min_temp ?? 7);
    const max = Number(a.max_temp ?? 35);
    const set = range ? range.high : target;
    return {
      state: on ? mode : "off",
      mode,
      running: on,
      active,
      // Heating shows in the heat colour whatever the mode (auto, heat_cool); idle, in the mode's own colour.
      color: on ? (action === "heating" ? CA_MODE_COLORS.heat : CA_MODE_COLORS[mode] || CA_MODE_COLORS.heat) : CA_IDLE,
      statusText: on ? (action ? this._fmtAttr(r.id, "hvac_action", action) : this._fmtState(r.id)) : this._t("st_off"),
      sub: preset ? this._fmtAttr(r.id, "preset_mode", preset) : "",
      preset,
      cur,
      target,
      range,
      valve,
      chips,
      display: on ? this._display(mode, target, range) : "",
      level: on && set != null ? (set - min) / (max - min || 1) : 0,
    };
  }

  _heroLine(m) {
    return m.preset ? caLine(caClimatePresetIcon(m.preset), m.sub) : "";
  }

  _miniInfo(m) {
    const lines = [this._tempLine(m)];
    if (m.running && m.preset) lines.push(caLine(caClimatePresetIcon(m.preset), m.sub));
    if (this._config.show_sensors && m.valve != null) lines.push(caLine("mdi:valve", `${this._t("valve")} ${this._fmtSensor(this._r.ent.valve)}`));
    return lines.join("");
  }
}

class ClimateAirThermostatMiniCard extends caMini(ClimateAirThermostatCard) {}

caRegister(
  "climate-air-thermostat-card",
  ClimateAirThermostatCard,
  "Climate Air · Thermostat Card",
  "Thermostat, radiator or radiator valve with target temperature, presets, valve and window, and animated illustration",
);
caRegister(
  "climate-air-thermostat-mini-card",
  ClimateAirThermostatMiniCard,
  "Climate Air · Thermostat Mini Card",
  "Compact thermostat card that unfolds into the full card",
);
