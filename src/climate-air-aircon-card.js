/*
 * climate-air-aircon-card and its mini card: an air conditioner (a climate entity that can cool, dry or blow) with its
 * mode, target temperature, fan and swing modes, measurements and options. The target and the controls come from
 * CaClimateCard (shared.js).
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
        s.running && (/hor|both|3d|all/.test(swing) || !/^(off|none)?$/i.test(s.swingH || "")) ? "swing-h" : "",
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

class ClimateAirAirconCard extends CaClimateCard {
  static get kind() {
    return "aircon";
  }

  _roles() {
    return ["indoor_temp", "outdoor_temp", "humidity", "power", "compressor", "filter", "filter_hours", "filter_alert", "filter_reset"];
  }

  _model(r) {
    const c = this._config;
    const { ent, a, mode, on, cur, range, target } = this._climate(r);
    const freq = this._num(ent.compressor);
    // The compressor (or what the climate entity says it does) tells whether it is actually cooling or heating.
    const action = a.hvac_action;
    const active = on && (freq != null ? freq > 0 : action ? !["idle", "off"].includes(action) : true);
    const swing = String(a.swing_mode || "off").toLowerCase();
    const chips = [];
    const filterState = this._filterState(ent);
    const filterChip = this._filterChip(filterState);
    if (filterChip) chips.push(filterChip);
    if (c.show_sensors) chips.push(...this._sensorChips(ent, ["outdoor_temp", "humidity", ...(on ? ["power"] : [])]));
    const fanMode = on && a.fan_mode ? this._fmtAttr(r.id, "fan_mode", a.fan_mode) : "";
    const preset = on && a.preset_mode && a.preset_mode !== "none" ? this._fmtAttr(r.id, "preset_mode", a.preset_mode) : "";
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
      range,
      chips,
      filterState,
      display: on ? this._display(mode, target, range) : "",
      swing,
      swingH: a.swing_horizontal_mode,
    };
  }

  _heroLine(m) {
    return (m.fanMode ? caLine("mdi:fan", m.fanMode) : "") + this._filterLine(m.filterState);
  }

  // The options end with the filter reset button, once the filter is to clean or replace.
  _extraOptions(m) {
    return [this._filterResetButton(m.filterState, this._r.ent.filter_reset)];
  }

  _miniInfo(m) {
    const lines = [this._tempLine(m)];
    if (m.running && (m.fanMode || m.sub)) lines.push(caLine("mdi:fan", [m.fanMode, m.sub].filter(Boolean).join(" · ")));
    const out = this._config.show_sensors ? this._fmtSensor(this._r.ent.outdoor_temp) : null;
    if (out) lines.push(caLine("mdi:home-thermometer-outline", `${this._t("outdoor")} ${out}`));
    lines.push(this._filterLine(m.filterState));
    return lines.join("");
  }
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
