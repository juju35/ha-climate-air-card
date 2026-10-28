/*
 * climate-air-purifier-card and its mini card: an air purifier (a fan entity) with its air quality, filter and options.
 */

// Illustrations, front view: the top fan turns (faster with the speed), clean air rises, dust is drawn into the intake,
// the ring on the front and the floor light take the air quality color. Three shapes: a tower, a round cylinder and a
// square box; `illustration: auto` picks one from the device model and name.
const CA_PURIFIER_COMMON =
  '<defs><linearGradient id="ca-pb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfe4ea"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd5dc"/></linearGradient>' +
  '<linearGradient id="ca-pc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c3cad3"/><stop offset=".38" stop-color="#ffffff"/><stop offset=".7" stop-color="#eef1f4"/><stop offset="1" stop-color="#b6bfc9"/></linearGradient>' +
  '<radialGradient id="ca-pt" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#55606d"/><stop offset="1" stop-color="#1f262e"/></radialGradient>' +
  '<radialGradient id="ca-pf" cx=".5" cy=".5" r=".5"><stop offset="0" class="aq-stop" stop-opacity=".55"/><stop offset="1" class="aq-stop" stop-opacity="0"/></radialGradient></defs>' +
  '<ellipse class="floor" cx="40" cy="90" rx="28" ry="4" fill="url(#ca-pf)"/>' +
  '<g class="flow"><path d="M29 9q-2.5-4 0-8"/><path d="M40 7q-2.5-4 0-8"/><path d="M51 9q-2.5-4 0-8"/></g>' +
  '<g class="clean"><circle cx="33" cy="8" r="1.2"/><circle cx="45" cy="6" r="1"/><circle cx="38" cy="10" r=".9"/><circle cx="49" cy="10" r="1.1"/></g>' +
  '<g class="dust dust-l"><circle cx="8" cy="58" r="1.4"/><circle cx="5" cy="70" r="1.1"/><circle cx="10" cy="80" r="1.3"/></g>' +
  '<g class="dust dust-r"><circle cx="72" cy="54" r="1.2"/><circle cx="75" cy="66" r="1.4"/><circle cx="70" cy="77" r="1.1"/></g>';

// The top fan seen from the front, squashed into an ellipse of radius `r` at (40, `y`).
const caRotor = (y, r) =>
  `<g transform="translate(40 ${y}) scale(${r / 18} ${(r / 18) * 0.26})"><g class="rotor">` +
  [0, 60, 120, 180, 240, 300].map((a) => `<path transform="rotate(${a})" d="M0 0C5-7 13-8 18-2C12-1 6 1 0 0Z"/>`).join("") +
  '<circle r="3.2" fill="#c3cad2"/></g></g>';

const caDots = (fn) => {
  let s = "";
  fn((x, y, r) => {
    s += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}"/>`;
  });
  return s;
};

const CA_PURIFIER_ARTS = {
  // A tall box with slightly rounded corners: air out of the top grille, in through the fine perforation of the lower
  // half, a round display showing the PM2.5 above a small air quality light.
  tower: (display) =>
    '<rect x="18.5" y="7" width="43" height="81" rx="4.5" fill="url(#ca-pb)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="21" y="7.8" width="38" height="2.6" rx="1.3" fill="#d5dbe2"/>' +
    `<path d="${Array.from({ length: 12 }, (_, i) => `M${22.6 + i * 3.1} 8.1v2`).join("")}" stroke="#aab3bd" stroke-width=".7"/>` +
    '<circle cx="40" cy="25" r="7.4" fill="#1d2632" stroke="#c3cad2" stroke-width=".8"/>' +
    `<text class="pmv" x="40" y="24" text-anchor="middle">${caEsc(display)}</text>` +
    '<circle class="ring" cx="40" cy="29.2" r="1.3"/>' +
    `<g fill="#c3cad2">${caDots((dot) => {
      for (let row = 0; row < 15; row++) {
        const y = 46 + row * 2.75;
        for (let x = 22.2 + (row % 2) * 1.4; x <= 58; x += 2.8) dot(x, y, 0.6);
      }
    })}</g>`,
  // A round cylinder drawing air all around, with a small round display at the top.
  cylinder: () =>
    '<path d="M21 13V85A19 4.6 0 0 0 59 85V13Z" fill="url(#ca-pc)" stroke="#c3cad2" stroke-width="1.2"/>' +
    `<ellipse cx="40" cy="13" rx="19" ry="4.6" fill="url(#ca-pt)" stroke="#c3cad2" stroke-width="1"/>${caRotor(13, 16)}` +
    '<circle cx="40" cy="25" r="5.4" fill="#1d2632"/><circle class="ring" cx="40" cy="25" r="3.6"/>' +
    `<g fill="#aeb7c2">${caDots((dot) => {
      for (let y = 36; y <= 82; y += 3.6) {
        for (let a = -75; a <= 75; a += 15) {
          const t = (a * Math.PI) / 180;
          dot(40 + 17.6 * Math.sin(t), y + 1.6 * (1 - Math.cos(t)), 0.25 + 0.75 * Math.cos(t));
        }
      }
    })}</g>`,
  // A Dyson-style bladeless unit: a cylindrical base with the display and air-quality ring, topped by a tall hollow
  // loop amplifier. Clean air rises through the loop opening; there are no blades to turn.
  dyson: (display) =>
    '<rect x="30.5" y="52" width="19" height="36" rx="7.5" fill="url(#ca-pc)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<ellipse cx="40" cy="52" rx="9.5" ry="2.4" fill="#eef1f4" stroke="#c3cad2" stroke-width=".8"/>' +
    '<rect x="28.6" y="6" width="22.8" height="52" rx="11.4" fill="none" stroke="url(#ca-pb)" stroke-width="8"/>' +
    '<rect x="24.4" y="1.8" width="31.2" height="60.4" rx="15.6" fill="none" stroke="#c3cad2" stroke-width="1"/>' +
    '<rect x="32.8" y="10.2" width="14.4" height="43.6" rx="7.2" fill="none" stroke="#aab3bd" stroke-width=".8"/>' +
    '<circle cx="40" cy="70" r="6.4" fill="#1d2632" stroke="#c3cad2" stroke-width=".7"/>' +
    `<text class="pmv" x="40" y="69.4" text-anchor="middle">${caEsc(display)}</text>` +
    '<circle class="ring" cx="40" cy="74.4" r="1.2"/>' +
    '<g class="jet"><path d="M40 50V28"/><path d="M35.5 50V33"/><path d="M44.5 50V33"/></g>',
  // A square box: air out of the slatted top, in through the vertical slots of the lower front, a display ring above.
  box: () =>
    '<rect x="12" y="17" width="56" height="71" rx="7" fill="url(#ca-pb)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="17" y="19" width="46" height="5" rx="2.5" fill="#3a434e"/>' +
    `<path d="${Array.from({ length: 14 }, (_, i) => `M${19.5 + i * 3.1} 19.6v3.8`).join("")}" stroke="#8b96a3" stroke-width=".9"/>` +
    '<circle cx="40" cy="38" r="7.2" fill="#1d2632"/><circle class="ring" cx="40" cy="38" r="5"/>' +
    '<path d="M16 50.5h48" stroke="#d5dbe2" stroke-width="1"/>' +
    `<g fill="#c3cad2">${Array.from({ length: 12 }, (_, i) => `<rect x="${(18.6 + i * 3.8).toFixed(1)}" y="55" width="1.5" height="27" rx=".75"/>`).join("")}</g>`,
};

const caPurifierArt = (variant, display = "") =>
  `<svg viewBox="0 0 80 94" aria-hidden="true">${CA_PURIFIER_COMMON}${(CA_PURIFIER_ARTS[variant] || CA_PURIFIER_ARTS.tower)(display)}</svg>`;

// The shape that looks most like the device: the bladeless loop for a Dyson (Pure Cool, Hot+Cool, Humidify+Cool…),
// square for a Smartmi box (P1, P2…), round for a cylinder (Xiaomi 4, 4 Lite / Compact / Pro, Elite, Smartmi E1…),
// a tower otherwise.
const caPurifierVariant = (text) => {
  const s = String(text).toLowerCase();
  if (/dyson|pure (cool|hot)|hot\s*\+?\s*cool|cool me|humidify|big\s*\+?\s*quiet|\b(tp|hp|ph|bp)\d|\bam(0[67]|11)\b/.test(s)) return "dyson";
  if (/smartmi.*\bp\d\b|\bp[12]\b|airp\.(mp|p\d)/.test(s)) return "box";
  if (/\b4\b|4 lite|4 compact|4 pro|elite|compact|\be1\b|cylind|round/.test(s)) return "cylinder";
  return "tower";
};

CA_ART.purifier = {
  variants: ["tower", "cylinder", "box", "dyson"],
  guess: caPurifierVariant,
  render: (variant, s) => ({ svg: caPurifierArt(variant, s.running ? s.display : ""), style: `--ca-spin:${caSpin(s.pct)}s;--ca-aq:${s.aqColor || CA_FAN_COLOR}` }),
  styles: `
    .k-purifier .rotor { fill: #8b96a3; transform-box: fill-box; transform-origin: center; }
    .k-purifier .ring { fill: none; stroke: #6b7682; stroke-width: 1.8; }
    .k-purifier .pmv { font: 600 6px/1 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: #6fc8ff; dominant-baseline: middle; }
    .k-purifier.running .ring { stroke: var(--ca-aq); filter: drop-shadow(0 0 2px var(--ca-aq)); }
    .k-purifier .aq-stop { stop-color: var(--ca-aq); }
    .k-purifier .floor { opacity: 0; transition: opacity .6s; }
    .k-purifier .flow { fill: none; stroke: var(--ca-aq); stroke-width: 1.7; stroke-linecap: round; }
    .k-purifier .jet { fill: none; stroke: var(--ca-aq); stroke-width: 1.7; stroke-linecap: round; }
    .k-purifier .jet path { opacity: 0; transform-box: view-box; transform-origin: 40px 50px; }
    .k-purifier.running .jet path { animation: ca-jet 1.9s ease-out infinite; }
    .k-purifier.running .jet path:nth-child(2) { animation-delay: .5s; }
    .k-purifier.running .jet path:nth-child(3) { animation-delay: 1s; }
    @keyframes ca-jet { 0% { opacity: 0; transform: translateY(8px) scaleY(.5); } 40% { opacity: .95; } 100% { opacity: 0; transform: translateY(-16px) scaleY(1); } }
    .k-purifier .clean { fill: #8fd3ff; }
    .k-purifier .dust { fill: #a1887f; }
    .k-purifier .flow path, .k-purifier .clean circle, .k-purifier .dust circle { opacity: 0; transform-box: view-box; }
    .k-purifier.running .floor { opacity: 1; animation: ca-glow 2.4s ease-in-out infinite alternate; }
    .k-purifier.running .rotor { animation: ca-spin var(--ca-spin, 1s) linear infinite; }
    .k-purifier.running .flow path { animation: ca-rise 2.1s ease-out infinite; }
    .k-purifier.running .flow path:nth-child(2) { animation-delay: .7s; }
    .k-purifier.running .flow path:nth-child(3) { animation-delay: 1.4s; }
    .k-purifier.running .clean circle { animation: ca-rise 2.6s ease-out infinite; }
    .k-purifier.running .clean circle:nth-child(2) { animation-delay: .65s; }
    .k-purifier.running .clean circle:nth-child(3) { animation-delay: 1.3s; }
    .k-purifier.running .clean circle:nth-child(4) { animation-delay: 1.95s; }
    .k-purifier.running .dust-l circle { animation: ca-suck-l 2.4s ease-in infinite; }
    .k-purifier.running .dust-r circle { animation: ca-suck-r 2.4s ease-in infinite; }
    .k-purifier.running .dust circle:nth-child(2) { animation-delay: .8s; }
    .k-purifier.running .dust circle:nth-child(3) { animation-delay: 1.6s; }
    .k-purifier.running .ring { animation: ca-blink 3s ease-in-out infinite; }
    @keyframes ca-glow { from { opacity: .45; } to { opacity: 1; } }
    @keyframes ca-suck-l { 0% { opacity: 0; transform: translateX(-6px); } 30% { opacity: .85; } 100% { opacity: 0; transform: translateX(13px); } }
    @keyframes ca-suck-r { 0% { opacity: 0; transform: translateX(6px); } 30% { opacity: .85; } 100% { opacity: 0; transform: translateX(-13px); } }
  `,
};

class ClimateAirPurifierCard extends CaCard {
  static get kind() {
    return "purifier";
  }

  _roles() {
    return ["pm25", "pm10", "voc", "no2", "aqi", "temperature", "humidity", "filter", "filter_hours", "status", "mode", "favorite", "child_lock", "buzzer", "light"];
  }

  _model(r) {
    const c = this._config;
    const ent = r.ent;
    const st = this._st(r.id);
    const on = st.state === "on";
    const pm25 = this._num(ent.pm25);
    const aqi = this._num(ent.aqi);
    const aq = caAirQuality(pm25, aqi);
    const pct = on ? Number(st.attributes.percentage ?? 0) : 0;
    const filter = this._num(ent.filter);
    const status = on ? (this._avail(ent.status) ? this._fmtState(ent.status) : this._t("st_purifying")) : this._t("st_off");
    const preset = st.attributes.preset_mode;
    const modeSub = preset ? this._fmtAttr(r.id, "preset_mode", preset) : this._avail(ent.mode) ? this._fmtState(ent.mode) : "";
    const chips = [];
    if (c.show_alerts && filter != null && filter <= 10) chips.push(this._chip("mdi:air-filter", this._t("filter_low"), "warn"));
    if (c.show_sensors) chips.push(...this._sensorChips(ent, ["temperature", "humidity", "pm10", "voc", "no2"]));
    const aqColor = aq?.color || CA_FAN_COLOR;
    return {
      state: on ? "on" : "off",
      running: on,
      color: on ? aqColor : CA_IDLE,
      statusText: status,
      sub: on ? modeSub : "",
      pm25,
      aqi,
      aq,
      pct,
      filter,
      preset,
      chips,
      aqColor,
      display: pm25 != null ? caFmtNum(this._lang(), pm25, 0) : aqi != null ? caFmtNum(this._lang(), aqi, 0) : "",
    };
  }

  _aqText(m) {
    return m.aq ? this._t(`aq_${m.aq.key}`) : "";
  }

  _heroInfo(m) {
    let big;
    if (m.pm25 != null) {
      big = `<div class="big"><span class="val">${caFmtNum(this._lang(), m.pm25, 0)}<small> µg/m³</small></span><span class="lbl aq">${caEsc(this._aqText(m))}</span></div>`;
    } else if (m.aqi != null) {
      big = `<div class="big"><span class="val">${caFmtNum(this._lang(), m.aqi, 0)}<small> AQI</small></span><span class="lbl aq">${caEsc(this._aqText(m))}</span></div>`;
    } else {
      big = `<div class="big"><span class="state-big">${caEsc(m.statusText)}</span></div>`;
    }
    const ent = this._r.ent;
    let filter = "";
    if (m.filter != null) {
      const hours = this._num(ent.filter_hours);
      const title = `${this._t("filter")}${hours != null ? ` · ${this._t("hours", { n: caFmtNum(this._lang(), hours, 0) })}` : ""}`;
      filter = `<div class="filter${m.filter <= 10 ? " low" : ""}" title="${caEsc(title)}">${caBar(m.filter, `${Math.round(m.filter)} %`, "mdi:air-filter")}</div>`;
    }
    return big + filter;
  }

  _controls(m) {
    const r = this._r;
    const st = this._st(r.id);
    const a = st.attributes;
    const f = a.supported_features || 0;
    let modes = "";
    if (f & CA_FAN_PRESET && (a.preset_modes || []).length > 1) {
      modes = this._segments("preset", a.preset_modes, a.preset_mode, (o) => this._fmtAttr(r.id, "preset_mode", o), CA_PRESET_ICON);
    } else if (this._avail(r.ent.mode) && (this._st(r.ent.mode).attributes.options || []).length > 1) {
      const ms = this._st(r.ent.mode);
      modes = this._segments("mode", ms.attributes.options, ms.state, (o) => this._fmtState(r.ent.mode, o), CA_PRESET_ICON);
    }
    const speed = f & CA_FAN_SET_SPEED && m.running ? this._speedSlider(r.id) : "";
    // The favorite level only applies in the favorite preset (or when the purifier has no presets).
    const favPreset = !(a.preset_modes || []).length || /fav|manual/i.test(a.preset_mode || "");
    const favorite = r.ent.favorite && favPreset ? this._numberControl(r.ent.favorite, this._t("favorite"), "mdi:heart-outline") : "";
    const toggles = this._toggles([
      this._toggle(r.ent.child_lock, this._t("child_lock"), this._val(r.ent.child_lock) === "on" ? "mdi:lock" : "mdi:lock-open-variant-outline"),
      this._toggle(r.ent.buzzer, this._t("buzzer"), this._val(r.ent.buzzer) === "on" ? "mdi:volume-high" : "mdi:volume-off"),
      this._toggle(r.ent.light, this._t("light"), "mdi:lightbulb-outline"),
    ]);
    return this._section("", modes + speed) + this._options(favorite + toggles);
  }

  _action(action, value) {
    const id = this._r.id;
    if (action === "preset") this._call("fan", "set_preset_mode", { entity_id: id, preset_mode: value });
    else if (action === "mode") this._call("select", "select_option", { entity_id: this._r.ent.mode, option: value });
    else if (action === "preset-next") {
      const list = this._st(id).attributes.preset_modes || [];
      const next = list[(list.indexOf(this._st(id).attributes.preset_mode) + 1) % list.length];
      this._call("fan", "set_preset_mode", { entity_id: id, preset_mode: next });
    } else super._action(action, value);
  }

  _miniInfo(m) {
    const lines = [];
    if (m.pm25 != null || m.aqi != null) {
      const v = m.pm25 != null ? `PM2.5 ${caFmtNum(this._lang(), m.pm25, 0)} µg/m³` : `AQI ${caFmtNum(this._lang(), m.aqi, 0)}`;
      lines.push(`<div class="line aqline"><ha-icon icon="mdi:blur"></ha-icon><span><b>${caEsc(v)}</b>${m.aq ? ` · ${caEsc(this._aqText(m))}` : ""}</span></div>`);
    }
    if (m.running) lines.push(caBar(m.pct, `${Math.round(m.pct)} %`, "mdi:fan"));
    if (m.running && m.sub) lines.push(caLine(CA_PRESET_ICON(m.preset) || "mdi:tune-variant", m.sub));
    if (m.filter != null && m.filter <= 20) lines.push(caBar(m.filter, `${Math.round(m.filter)} %`, "mdi:air-filter"));
    return lines.join("");
  }

  _miniButtons(m) {
    const a = this._st(this._r.id).attributes;
    if (!m.running || !((a.supported_features || 0) & CA_FAN_PRESET) || (a.preset_modes || []).length < 2) return [];
    const label = caEsc(`${this._t("preset")} : ${m.sub}`);
    return [
      `<button class="round on" data-action="preset-next" title="${label}" aria-label="${label}"><ha-icon icon="${CA_PRESET_ICON(m.preset) || "mdi:tune-variant"}"></ha-icon></button>`,
    ];
  }

  static styles = `
    .lbl.aq { color: var(--ca-color); }
    .filter.low .fill { background: var(--warning-color, #ffa600); }
    .filter .fill { background: color-mix(in srgb, var(--ca-color) 70%, var(--secondary-text-color)); }
  `;
}

class ClimateAirPurifierMiniCard extends caMini(ClimateAirPurifierCard) {}

caRegister("climate-air-purifier-card", ClimateAirPurifierCard, "Climate Air · Purifier Card", "Air purifier with air quality, filter life and animated illustration");
caRegister(
  "climate-air-purifier-mini-card",
  ClimateAirPurifierMiniCard,
  "Climate Air · Purifier Mini Card",
  "Compact air purifier card that unfolds into the full card",
);
