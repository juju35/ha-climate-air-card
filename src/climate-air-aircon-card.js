/*
 * climate-air-aircon-card and its mini card: an air conditioner (a climate entity that can cool, dry or blow) with its
 * mode, target temperature, fan and swing modes, measurements and options.
 */

// Illustrations: the display shows the target, the flap swings with the swing mode, and the air flowing out takes the
// mode color, with snowflakes when cooling, shimmer when heating and droplets when drying. While the compressor runs
// the status light breathes (and the outdoor fan of a window split turns). Three shapes: a wall split unit, a portable
// unit with its exhaust hose, and a window split (indoor tower, outdoor unit hung outside the window);
// `illustration: auto` picks one from the device model and name.
const caSnow = (x, y) => `<path d="M${x} ${y}v5M${x - 2.2} ${y + 1.25}l4.4 2.5M${x - 2.2} ${y + 3.75}l4.4-2.5"/>`;
const caDrop = (x, y) => `<path d="M${x} ${y}q-2 3 0 4.5t0-4.5Z"/>`;
const caWave = (x, y) => `<path d="M${x} ${y}q-1.5 2 0 4t0 4"/>`;

// The air and its particles: falling below a wall unit, rising above the outlet of the others (`up`).
const caAirFx = (xs, y, up) => {
  const cls = up ? " up" : "";
  const air = up ? (x) => `<path d="M${x} ${y}q-3-4 0-8t0-8"/>` : (x) => `<path d="M${x} ${y}q4 6 0 12t0 12"/>`;
  const pts = up
    ? [
        [xs[0] + 3, y - 10],
        [xs[2] - 3, y - 6],
        [xs[1] + 2, y - 15],
      ]
    : [
        [28, y + 8],
        [50, y + 14],
        [39, y + 24],
      ];
  return (
    `<g class="air${cls}">${xs.map(air).join("")}</g>` +
    `<g class="flakes${cls}">${pts.map(([x, py]) => caSnow(x, py)).join("")}</g>` +
    `<g class="drops${cls}">${pts.map(([x, py]) => caDrop(x, py)).join("")}</g>` +
    `<g class="heat${cls}">${pts.map(([x, py]) => caWave(x, py)).join("")}</g>`
  );
};

const caDisplay = (x, y, w, text) =>
  `<rect x="${x}" y="${y}" width="${w}" height="9" rx="2.5" fill="#1d2632"/><text class="disp" x="${x + w / 2}" y="${y + 6.8}" text-anchor="middle">${caEsc(text)}</text>`;

const caGrille = (x1, x2, y1, y2, step) =>
  `<path d="${Array.from({ length: Math.floor((y2 - y1) / step) + 1 }, (_, i) => `M${x1} ${y1 + i * step}H${x2}`).join("")}" stroke="#d5dbe2" stroke-width="1"/>`;

const CA_AIRCON_ARTS = {
  split: (display) =>
    '<ellipse class="floor" cx="40" cy="89" rx="30" ry="4" fill="url(#ca-af)"/>' +
    caAirFx([20, 40, 60], 52, false) +
    '<rect x="3" y="14" width="74" height="31" rx="8" fill="url(#ca-ab)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M11 19h58M11 22h58" stroke="#dfe4ea" stroke-width="1.1"/>' +
    caDisplay(51, 25, 19, display) +
    '<circle class="led" cx="11" cy="29.5" r="1.5"/>' +
    '<rect x="8" y="38.5" width="64" height="4.5" rx="2.2" fill="#3a434e"/>' +
    '<g class="flap"><path d="M9 41h62l-2.5 4.2H11.5Z" fill="#eef1f4" stroke="#aab3bd" stroke-width=".8" stroke-linejoin="round"/></g>',
  portable: (display) =>
    '<ellipse class="floor" cx="41" cy="89" rx="26" ry="4" fill="url(#ca-af)"/>' +
    '<path d="M23 34C9 34 5 26 5 6" fill="none" stroke="#b6bfc9" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M23 34C9 34 5 26 5 6" fill="none" stroke="#8f9aa6" stroke-width="7" stroke-dasharray="1 2.2" opacity=".45"/>' +
    caAirFx([30, 41, 52], 12, true) +
    '<rect x="20" y="13" width="42" height="72" rx="8" fill="url(#ca-ab2)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="25" y="16" width="32" height="10" rx="3" fill="#3a434e"/>' +
    '<g class="flap"><rect x="26.5" y="17.6" width="29" height="1.7" rx=".8" fill="#eef1f4"/><rect x="26.5" y="20.6" width="29" height="1.7" rx=".8" fill="#eef1f4"/><rect x="26.5" y="23.6" width="29" height="1.7" rx=".8" fill="#eef1f4"/></g>' +
    caDisplay(31.5, 31, 19, display) +
    '<circle class="led" cx="26" cy="35.5" r="1.4"/>' +
    caGrille(26, 56, 50, 76, 3.5) +
    '<circle cx="27" cy="87" r="2.6" fill="#5d6874"/><circle cx="55" cy="87" r="2.6" fill="#5d6874"/>',
  window: (display) =>
    '<ellipse class="floor" cx="57" cy="89" rx="20" ry="3.6" fill="url(#ca-af)"/>' +
    '<rect x="33" y="4" width="4.5" height="84" rx="1" fill="#d5dbe2" stroke="#b6bfc9" stroke-width=".8"/>' +
    '<rect x="1" y="55" width="37" height="3" rx="1" fill="#c3cad2"/>' +
    '<path d="M16 29V21Q16 15 22 15H48Q53 15 53 21V30" fill="none" stroke="#b6bfc9" stroke-width="3.2" stroke-linecap="round"/>' +
    '<rect x="3" y="28" width="27" height="27" rx="3.5" fill="url(#ca-ab)" stroke="#c3cad2" stroke-width="1.1"/>' +
    '<circle cx="16.5" cy="41.5" r="9.5" fill="#3a434e"/>' +
    '<g class="ofan" fill="#aab3bd">' +
    [0, 120, 240].map((a) => `<path transform="rotate(${a} 16.5 41.5)" d="M16.5 41.5C18 37 21 34.5 24 35.5C24.5 38.5 21 41 16.5 41.5Z"/>`).join("") +
    '<circle cx="16.5" cy="41.5" r="1.8" fill="#d5dbe2"/></g>' +
    '<circle cx="16.5" cy="41.5" r="9.5" fill="none" stroke="#c3cad2" stroke-width=".8"/><circle cx="16.5" cy="41.5" r="6" fill="none" stroke="#c3cad2" stroke-opacity=".6" stroke-width=".5"/>' +
    caAirFx([50, 57, 64], 26, true) +
    '<rect x="42" y="28" width="30" height="58" rx="7" fill="url(#ca-ab2)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="46" y="31" width="22" height="7" rx="2.5" fill="#3a434e"/>' +
    '<g class="flap"><rect x="47.3" y="32.3" width="19.4" height="1.5" rx=".7" fill="#eef1f4"/><rect x="47.3" y="35.1" width="19.4" height="1.5" rx=".7" fill="#eef1f4"/></g>' +
    caDisplay(48, 42, 18, display) +
    '<circle class="led" cx="57" cy="55" r="1.3"/>' +
    caGrille(47, 67, 61, 80, 3.2),
};

const caAirconArt = (variant, display) =>
  '<svg viewBox="0 0 80 94" aria-hidden="true"><defs>' +
  '<linearGradient id="ca-ab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e1e6eb"/></linearGradient>' +
  '<linearGradient id="ca-ab2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfe4ea"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd5dc"/></linearGradient>' +
  '<radialGradient id="ca-af" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".45"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient></defs>' +
  (CA_AIRCON_ARTS[variant] || CA_AIRCON_ARTS.split)(display) +
  "</svg>";

// The shape that looks most like the device, from its model and name.
const caAirconVariant = (text) => {
  const s = String(text).toLowerCase();
  if (/porta.?split|window|fen[eê]tre|saddle/.test(s)) return "window";
  if (/portable|mobile|monobloc|move/.test(s)) return "portable";
  return "split";
};

// The device switches listed as options: icon and label (`sw_<key>`) from the entity ID, since integrations often
// name them in English only (Midea: "Prompt tone", "Smart eye"…). The first match wins; others keep their own name.
const CA_SWITCHES = [
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
const caSwitchInfo = (id) => CA_SWITCHES.find(([re]) => re.test(id.split(".")[1] || id));

const CA_TEMP_DEBOUNCE = 900;

CA_ART.aircon = {
  variants: ["split", "portable", "window"],
  guess: caAirconVariant,
  render: (variant, s) => {
    const swing = String(s.swing || "off").toLowerCase();
    return {
      svg: caAirconArt(variant, s.display || ""),
      cls: [
        `m-${s.mode}`,
        s.active ? "active" : "",
        s.running && /vert|both|3d|all|^on$|^swing$/.test(swing) ? "swing-v" : "",
        s.running && /hor|both|3d|all/.test(swing) ? "swing-h" : "",
      ],
    };
  },
  styles: `
    .k-aircon .disp { font: 600 6.6px/1 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: var(--ca-color); }
    .k-aircon .led { fill: #9aa5b1; }
    .k-aircon .c-stop { stop-color: var(--ca-color); }
    .k-aircon .floor { opacity: 0; transition: opacity .6s; }
    .k-aircon .air { fill: none; stroke: var(--ca-color); stroke-width: 1.8; stroke-linecap: round; }
    .k-aircon .flakes { fill: none; stroke: var(--ca-color); stroke-width: 1; stroke-linecap: round; }
    .k-aircon .drops { fill: var(--ca-color); }
    .k-aircon .heat { fill: none; stroke: var(--ca-color); stroke-width: 1.3; stroke-linecap: round; }
    .k-aircon .air path, .k-aircon .flakes path, .k-aircon .drops path, .k-aircon .heat path { opacity: 0; transform-box: view-box; }
    .k-aircon .flakes, .k-aircon .drops, .k-aircon .heat { display: none; }
    .k-aircon.m-cool .flakes, .k-aircon.m-dry .drops, .k-aircon.m-heat .heat { display: inline; }
    .k-aircon .flap { transform-box: fill-box; transform-origin: 50% 0; }
    .k-aircon .air { transform-box: fill-box; transform-origin: 50% 0; }
    .k-aircon .ofan { transform-box: fill-box; transform-origin: center; }
    .k-aircon.running .floor { opacity: 1; }
    .k-aircon.running .led { fill: var(--ca-color); }
    .k-aircon.running.active .led { animation: ca-blink 2s ease-in-out infinite; }
    .k-aircon.running .air path { animation: ca-fall 2.4s ease-in infinite; }
    .k-aircon.running .air path:nth-child(2) { animation-delay: .8s; }
    .k-aircon.running .air path:nth-child(3) { animation-delay: 1.6s; }
    .k-aircon.running:not(.active) .air path { animation-duration: 4.2s; }
    .k-aircon.running .flakes path, .k-aircon.running .drops path { animation: ca-fall 3s linear infinite; }
    .k-aircon.running .heat path { animation: ca-fall 2.6s ease-in-out infinite; }
    .k-aircon.running .flakes path:nth-child(2), .k-aircon.running .drops path:nth-child(2), .k-aircon.running .heat path:nth-child(2) { animation-delay: 1s; }
    .k-aircon.running .flakes path:nth-child(3), .k-aircon.running .drops path:nth-child(3), .k-aircon.running .heat path:nth-child(3) { animation-delay: 2s; }
    .k-aircon.running .up path { animation-name: ca-rise; }
    .k-aircon.running.active .ofan { animation: ca-spin .8s linear infinite; }
    .k-aircon.running.swing-v .flap { animation: ca-flap 3.2s ease-in-out infinite; }
    .k-aircon.running.swing-h .air { animation: ca-sway 4s ease-in-out infinite; }
    @keyframes ca-flap { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(2.3); } }
    @keyframes ca-sway { 0%, 100% { transform: skewX(0); } 25% { transform: skewX(14deg); } 75% { transform: skewX(-14deg); } }
  `,
};

class ClimateAirAirconCard extends CaCard {
  static get kind() {
    return "aircon";
  }

  _roles() {
    return ["indoor_temp", "outdoor_temp", "humidity", "power", "compressor", "filter_alert"];
  }

  // The device's other switches (eco, display, self clean…) are listed as options.
  _switches(r) {
    return r.list.map((e) => e.entity_id).filter((id) => id.startsWith("switch.") && !r.used.has(id));
  }

  _extraIds(r) {
    return this._switches(r);
  }

  _unit() {
    return this._hass.config?.unit_system?.temperature || "°C";
  }

  _target(st) {
    return this._pendingTemp ?? (st.attributes.temperature == null ? null : Number(st.attributes.temperature));
  }

  _model(r) {
    const c = this._config;
    const ent = r.ent;
    const st = this._st(r.id);
    const a = st.attributes;
    const mode = st.state;
    const on = mode !== "off";
    const cur = a.current_temperature != null ? Number(a.current_temperature) : this._num(ent.indoor_temp);
    const target = this._target(st);
    const freq = this._num(ent.compressor);
    // The compressor (or what the climate entity says it does) tells whether it is actually cooling or heating.
    const action = a.hvac_action;
    const active = on && (freq != null ? freq > 0 : action ? !["idle", "off"].includes(action) : true);
    const swing = String(a.swing_mode || "off").toLowerCase();
    const chips = [];
    if (c.show_alerts && this._val(ent.filter_alert) === "on") chips.push(this._chip("mdi:air-filter", this._t("filter_dirty"), "warn"));
    if (c.show_sensors) chips.push(...this._sensorChips(ent, ["outdoor_temp", "humidity", ...(on ? ["power"] : [])]));
    const fanMode = on && a.fan_mode ? this._fmtAttr(r.id, "fan_mode", a.fan_mode) : "";
    const preset = on && a.preset_mode && a.preset_mode !== "none" ? this._fmtAttr(r.id, "preset_mode", a.preset_mode) : "";
    const lang = this._lang();
    return {
      state: on ? mode : "off",
      mode,
      running: on,
      active,
      color: on ? CA_MODE_COLORS[mode] || CA_FAN_COLOR : CA_IDLE,
      statusText: on ? this._fmtState(r.id) : this._t("st_off"),
      sub: preset,
      fanMode,
      cur,
      target,
      chips,
      display: on && target != null && mode !== "fan_only" ? `${caFmtNum(lang, target)}°` : on ? "--" : "",
      swing,
    };
  }

  _temp(v, digits = 1) {
    return `${caFmtNum(this._lang(), v, digits)} ${this._unit()}`;
  }

  _showTarget(m) {
    return m.running && m.target != null && m.mode !== "fan_only";
  }

  _heroInfo(m) {
    const cur = m.cur != null ? `<span class="val">${caFmtNum(this._lang(), m.cur)}<small> ${caEsc(this._unit())}</small></span>` : "";
    const target = this._showTarget(m) ? `<span class="arrow">→ ${caEsc(this._temp(m.target))}</span>` : "";
    if (!cur) return `<div class="big"><span class="state-big">${caEsc(m.statusText)}</span></div>`;
    return `<div class="big">${cur}${target}</div>${m.fanMode ? caLine("mdi:fan", m.fanMode) : ""}`;
  }

  _controls(m) {
    const r = this._r;
    const st = this._st(r.id);
    const a = st.attributes;
    const f = a.supported_features || 0;
    const modes = (a.hvac_modes || []).filter((x) => x !== "off");
    const segs = this._segments("hvac", modes, m.mode, (o) => this._fmtState(r.id, o), (o) => CA_MODE_ICONS[o]);
    let stepper = "";
    if (f & CA_CLIMATE_TARGET && this._showTarget(m)) {
      stepper =
        '<div class="stepper">' +
        `<button class="round" data-action="temp" data-value="-1" title="${caEsc(this._t("temp_down"))}" aria-label="${caEsc(this._t("temp_down"))}"><ha-icon icon="mdi:minus"></ha-icon></button>` +
        `<div class="tv"><span class="tval">${caFmtNum(this._lang(), m.target)}<small> ${caEsc(this._unit())}</small></span><span class="tl">${caEsc(this._t("target"))}</span></div>` +
        `<button class="round" data-action="temp" data-value="1" title="${caEsc(this._t("temp_up"))}" aria-label="${caEsc(this._t("temp_up"))}"><ha-icon icon="mdi:plus"></ha-icon></button></div>`;
    }
    const selects = m.running
      ? [
          f & CA_CLIMATE_FAN_MODE ? this._selectAttr("fan_mode", "fan_modes", "set_fan_mode", this._t("fan_mode")) : "",
          f & CA_CLIMATE_SWING ? this._selectAttr("swing_mode", "swing_modes", "set_swing_mode", this._t("swing_mode")) : "",
          f & CA_CLIMATE_PRESET ? this._selectAttr("preset_mode", "preset_modes", "set_preset_mode", this._t("preset_mode")) : "",
        ].filter(Boolean)
      : [];
    const toggles = this._toggles(
      this._switches(r).map((id) => {
        const info = caSwitchInfo(id);
        return this._toggle(id, info ? this._t(`sw_${info[2]}`) : this._label(id), info?.[1] || "mdi:toggle-switch-outline");
      }),
    );
    return this._section("", segs + stepper + (selects.length ? `<div class="grid">${selects.join("")}</div>` : "")) + this._options(toggles);
  }

  _action(action, value) {
    const id = this._r.id;
    if (action === "hvac") this._call("climate", "set_hvac_mode", { entity_id: id, hvac_mode: value });
    else if (action === "temp") this._step(Number(value));
    else super._action(action, value);
  }

  // Each tap moves the target by one step at once on screen; the service is called once the taps stop.
  _step(dir) {
    const st = this._st(this._r.id);
    const a = st.attributes;
    const step = Number(a.target_temp_step) || (this._unit() === "°F" ? 1 : 0.5);
    const cur = this._target(st);
    if (cur == null) return;
    const min = Number(a.min_temp ?? 7);
    const max = Number(a.max_temp ?? 35);
    this._pendingTemp = Math.min(max, Math.max(min, Math.round((cur + dir * step) / step) * step));
    this._update();
    clearTimeout(this._tempTimer);
    this._tempTimer = setTimeout(async () => {
      const temperature = this._pendingTemp;
      try {
        await this._call("climate", "set_temperature", { entity_id: this._r.id, temperature });
      } finally {
        if (this._pendingTemp === temperature) this._pendingTemp = undefined;
        this._sig = null;
        this._update();
      }
    }, CA_TEMP_DEBOUNCE);
  }

  _miniInfo(m) {
    const lines = [];
    if (m.cur != null) {
      const target = this._showTarget(m) ? ` → ${this._temp(m.target)}` : "";
      lines.push(`<div class="line tline"><ha-icon icon="mdi:thermometer"></ha-icon><span><b>${caEsc(this._temp(m.cur))}</b>${caEsc(target)}</span></div>`);
    }
    if (m.running && (m.fanMode || m.sub)) lines.push(caLine("mdi:fan", [m.fanMode, m.sub].filter(Boolean).join(" · ")));
    const out = this._config.show_sensors ? this._fmtSensor(this._r.ent.outdoor_temp) : null;
    if (out) lines.push(caLine("mdi:home-thermometer-outline", `${this._t("outdoor")} ${out}`));
    return lines.join("");
  }

  _miniButtons(m) {
    if (!this._showTarget(m) || !((this._st(this._r.id).attributes.supported_features || 0) & CA_CLIMATE_TARGET)) return [];
    return [
      ["-1", "mdi:minus", "temp_down"],
      ["1", "mdi:plus", "temp_up"],
    ].map(([v, icon, key]) => `<button class="round" data-action="temp" data-value="${v}" title="${caEsc(this._t(key))}" aria-label="${caEsc(this._t(key))}"><ha-icon icon="${icon}"></ha-icon></button>`);
  }

  static styles = `
    .stepper { display: flex; align-items: center; justify-content: center; gap: 18px; }
    .tv { display: flex; flex-direction: column; align-items: center; min-width: 96px; }
    .tval { font-size: 30px; font-weight: 400; line-height: 1.1; color: var(--primary-text-color); font-variant-numeric: tabular-nums; white-space: nowrap; }
    .tval small { font-size: 14px; color: var(--secondary-text-color); }
    .tl { font-size: 11px; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: .04em; }
    .stepper .round { width: 44px; height: 44px; background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }
    .stepper .round:hover:not(:disabled) { background: color-mix(in srgb, var(--ca-color) 24%, transparent); }
    ha-card.mini .round[data-action=temp] { width: 36px; height: 36px; }
  `;
}

class ClimateAirAirconMiniCard extends caMini(ClimateAirAirconCard) {}

caRegister(
  "climate-air-aircon-card",
  ClimateAirAirconCard,
  "Climate Air · Air Conditioner Card",
  "Air conditioner with mode, target temperature, fan and swing, and animated illustration",
);
caRegister(
  "climate-air-aircon-mini-card",
  ClimateAirAirconMiniCard,
  "Climate Air · Air Conditioner Mini Card",
  "Compact air conditioner card that unfolds into the full card",
);
