/*
 * climate-air-fan-card and its mini card: a fan (a fan entity) with its speed, oscillation, presets and options.
 */

const CA_FAN_SPOKES = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6;
  const p = (r) => `${(40 + r * Math.cos(a)).toFixed(2)} ${(32 + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(7)}L${p(25.5)}`;
}).join("");

// Front view of a standing fan: the blades turn faster with the speed, the head swings while oscillating and the
// breeze lines pulse (in gusts in a natural wind preset).
const CA_FAN_ART =
  '<svg viewBox="0 0 80 94" aria-hidden="true"><defs>' +
  '<linearGradient id="ca-fp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfd5dc"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#c3cad2"/></linearGradient>' +
  '<linearGradient id="ca-fb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3f2fd"/><stop offset="1" stop-color="#90c4ee"/></linearGradient>' +
  '<radialGradient id="ca-ff" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".5"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient></defs>' +
  '<ellipse class="floor" cx="40" cy="90" rx="24" ry="3.5" fill="url(#ca-ff)"/>' +
  '<ellipse cx="40" cy="87" rx="17" ry="4.2" fill="url(#ca-fp)" stroke="#aab3bd" stroke-width="1"/>' +
  '<rect x="37.5" y="54" width="5" height="33" rx="2" fill="url(#ca-fp)" stroke="#aab3bd" stroke-width=".8"/>' +
  '<g class="head">' +
  '<g class="wind"><path d="M7 22q-4 4 0 8"/><path d="M4 32q-4 4 0 8" /><path d="M7 42q-4 4 0 8"/>' +
  '<path d="M73 22q4 4 0 8"/><path d="M76 32q4 4 0 8"/><path d="M73 42q4 4 0 8"/></g>' +
  '<rect x="35" y="52" width="10" height="6" rx="2.5" fill="#c3cad2"/>' +
  '<circle cx="40" cy="32" r="26" fill="#eef2f6" fill-opacity=".35" stroke="#aab3bd" stroke-width="1.6"/>' +
  '<g class="blades" fill="url(#ca-fb)">' +
  [0, 72, 144, 216, 288].map((a) => `<path transform="rotate(${a} 40 32)" d="M40 32C43 22 50 13 57 16C61 22 52 30 40 32Z"/>`).join("") +
  "</g>" +
  `<path d="${CA_FAN_SPOKES}" stroke="#aab3bd" stroke-opacity=".7" stroke-width=".6" fill="none"/>` +
  '<circle cx="40" cy="32" r="18" fill="none" stroke="#aab3bd" stroke-opacity=".55" stroke-width=".6"/>' +
  '<circle cx="40" cy="32" r="5.5" fill="#f4f6f8" stroke="#aab3bd" stroke-width="1"/><circle class="led" cx="40" cy="32" r="1.8"/>' +
  "</g></svg>";

// A circulator fan (SwitchBot Circulator Fan, Battery Circulator Fan…): a compact round head with a deep grille of
// concentric rings, held by a yoke on a short stem and a round base. The blades turn behind the grille with the speed,
// the head swings while oscillating and the breeze pulses, like the standing fan (same centre, same classes).
// `standing`: the Standing Circulator Fan — a smaller head on a tall telescopic pole.
const caCirculatorArt = (standing) => {
  // Head radius, and the blades / rings scaled to it around the centre (40, 32) the animations turn on.
  const r = standing ? 17 : 25;
  const k = r / 25;
  const yoke = r + 3;
  const scale = k === 1 ? "" : ` translate(40 32) scale(${k}) translate(-40 -32)`;
  const blade = (a) => `<path transform="rotate(${a} 40 32)${scale}" d="M40 32C42.5 24 48 17 54 19.5C57 24.5 50 30.5 40 32Z"/>`;
  const rings = [8, 13, 18, 23].map((ring) => `<circle cx="40" cy="32" r="${ring * k}"/>`).join("");
  const neck = 32 + yoke;
  const stem = standing
    ? // The telescopic pole: two tubes, the thinner one out of the thicker, and its collar.
      `<rect x="38" y="${neck}" width="4" height="${70 - neck}" rx="1.6" fill="url(#ca-fp)" stroke="#aab3bd" stroke-width=".7"/>` +
      '<rect x="36.6" y="68" width="6.8" height="17" rx="2.4" fill="url(#ca-fp)" stroke="#aab3bd" stroke-width=".8"/>' +
      '<rect x="36" y="67" width="8" height="3" rx="1.2" fill="#c3cad2"/>'
    : '<rect x="37" y="62" width="6" height="23" rx="2.5" fill="url(#ca-fp)" stroke="#aab3bd" stroke-width=".8"/>';
  return (
    '<svg viewBox="0 0 80 94" aria-hidden="true"><defs>' +
    '<linearGradient id="ca-fp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfd5dc"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#c3cad2"/></linearGradient>' +
    '<linearGradient id="ca-fb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3f2fd"/><stop offset="1" stop-color="#90c4ee"/></linearGradient>' +
    '<radialGradient id="ca-ff" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".5"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient></defs>' +
    '<ellipse class="floor" cx="40" cy="90" rx="24" ry="3.5" fill="url(#ca-ff)"/>' +
    '<path d="M22 87.5A18 4.5 0 0 0 58 87.5V84.5H22Z" fill="#c3cad2"/>' +
    '<ellipse cx="40" cy="84.5" rx="18" ry="4.5" fill="url(#ca-fp)" stroke="#aab3bd" stroke-width="1"/>' +
    stem +
    '<circle class="led" cx="40" cy="80" r="1.3"/>' +
    '<g class="head">' +
    '<g class="wind"><path d="M7 22q-4 4 0 8"/><path d="M4 32q-4 4 0 8" /><path d="M7 42q-4 4 0 8"/>' +
    '<path d="M73 22q4 4 0 8"/><path d="M76 32q4 4 0 8"/><path d="M73 42q4 4 0 8"/></g>' +
    `<path d="M${40 - yoke} 32A${yoke} ${yoke} 0 0 0 ${40 + yoke} 32" fill="none" stroke="url(#ca-fp)" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M${40 - yoke} 32A${yoke} ${yoke} 0 0 0 ${40 + yoke} 32" fill="none" stroke="#aab3bd" stroke-width=".7"/>` +
    `<rect x="36" y="${neck - 2}" width="8" height="6" rx="2" fill="#c3cad2"/>` +
    `<circle cx="40" cy="32" r="${r}" fill="#f4f6f8" stroke="#aab3bd" stroke-width="1.6"/>` +
    `<circle cx="40" cy="32" r="${r - 1.5}" fill="#e3e8ee"/>` +
    `<g class="blades" fill="url(#ca-fb)">${[0, 72, 144, 216, 288].map(blade).join("")}</g>` +
    `<g fill="none" stroke="#9aa5b1" stroke-opacity=".75" stroke-width=".7">${rings}</g>` +
    `<circle cx="40" cy="32" r="${r}" fill="none" stroke="#aab3bd" stroke-width="2.2"/>` +
    `<circle cx="40" cy="32" r="${4.6 * Math.max(k, 0.8)}" fill="#f4f6f8" stroke="#aab3bd" stroke-width="1"/>` +
    "</g></svg>"
  );
};
const CA_CIRCULATOR_ART = caCirculatorArt(false);
const CA_STANDING_CIRCULATOR_ART = caCirculatorArt(true);

// A ceiling fan seen from the room: its canopy and downrod, four wooden blades in perspective that turn with the speed
// (the other way when reversed), and its light under the motor, glowing while it is on.
const CA_CEILING_FAN_ART =
  '<svg viewBox="0 0 100 68" aria-hidden="true"><defs>' +
  '<linearGradient id="ca-cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c0956b"/><stop offset="1" stop-color="#7f5539"/></linearGradient>' +
  '<linearGradient id="ca-cm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9c1ca"/><stop offset=".45" stop-color="#f4f6f8"/><stop offset="1" stop-color="#a9b2bc"/></linearGradient>' +
  '<radialGradient id="ca-cl" cx=".5" cy=".1" r=".9"><stop offset="0" stop-color="#ffe8a3" stop-opacity=".8"/><stop offset="1" stop-color="#ffe8a3" stop-opacity="0"/></radialGradient></defs>' +
  '<path class="glow" d="M43 46L18 68H82L57 46Z" fill="url(#ca-cl)"/>' +
  '<rect x="40" y="0" width="20" height="3.4" rx="1.4" fill="url(#ca-cm)" stroke="#aab3bd" stroke-width=".5"/>' +
  '<rect x="48.3" y="3" width="3.4" height="21" fill="url(#ca-cm)" stroke="#aab3bd" stroke-width=".4"/>' +
  '<rect x="46" y="22.5" width="8" height="3" rx="1.2" fill="#aab3bd"/>' +
  '<g transform="translate(50 32) scale(1 .3)"><g class="blades">' +
  [45, 135, 225, 315]
    .map((a) => `<path transform="rotate(${a})" d="M9 -6C20 -13 38 -15 47 -11C51 -5 51 5 47 11C38 15 20 13 9 6Z" fill="url(#ca-cw)" stroke="#5d4037" stroke-width="1.1"/>`)
    .join("") +
  "</g></g>" +
  '<rect x="35" y="24.5" width="30" height="15" rx="7.5" fill="url(#ca-cm)" stroke="#9aa5b1" stroke-width=".7"/>' +
  '<rect x="38" y="26.4" width="24" height="3" rx="1.5" fill="#fff" opacity=".75"/>' +
  '<path d="M35.8 35.4h28.4" stroke="#9aa5b1" stroke-width=".6"/>' +
  '<path class="lamp" d="M41 39.5h18l-2.8 6.6a6 6 0 0 1-12.4 0Z" stroke="#ced4da" stroke-width=".7"/>' +
  '<circle class="led" cx="50" cy="31" r="1"/>' +
  "</svg>";

// A tower fan (Midea's and others'): a tall column on a round foot, the air out of its front slot where the cross-flow
// drum turns (its bars scroll faster with the speed), the breeze on either side; the column swings while oscillating.
const CA_TOWER_FAN_ART =
  '<svg viewBox="0 0 80 94" aria-hidden="true"><defs>' +
  '<linearGradient id="ca-fp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfd5dc"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#c3cad2"/></linearGradient>' +
  '<radialGradient id="ca-ff" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".5"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient>' +
  '<clipPath id="ca-ts"><rect x="35" y="21" width="10" height="55" rx="3"/></clipPath></defs>' +
  '<ellipse class="floor" cx="40" cy="90" rx="22" ry="3.5" fill="url(#ca-ff)"/>' +
  '<path d="M25 87.5A15 4 0 0 0 55 87.5V85H25Z" fill="#c3cad2"/>' +
  '<ellipse cx="40" cy="85" rx="15" ry="4" fill="url(#ca-fp)" stroke="#aab3bd" stroke-width="1"/>' +
  '<g class="head">' +
  '<g class="wind"><path d="M27 28q-4 4 0 8"/><path d="M24 44q-4 4 0 8"/><path d="M27 60q-4 4 0 8"/>' +
  '<path d="M53 28q4 4 0 8"/><path d="M56 44q4 4 0 8"/><path d="M53 60q4 4 0 8"/></g>' +
  '<rect x="30" y="7" width="20" height="78" rx="9" fill="url(#ca-fp)" stroke="#aab3bd" stroke-width="1.2"/>' +
  '<rect x="33.5" y="10.5" width="13" height="7" rx="3" fill="#3a434e"/><circle class="led" cx="40" cy="14" r="1.4"/>' +
  '<rect x="35" y="21" width="10" height="55" rx="3" fill="#3a434e"/>' +
  `<g clip-path="url(#ca-ts)"><g class="drum" fill="#8b96a3">${Array.from({ length: 21 }, (_, i) => `<rect x="35.5" y="${18 + i * 3}" width="9" height="1.3" rx=".6"/>`).join("")}</g></g>` +
  '<path d="M37.5 21V76M40 21V76M42.5 21V76" stroke="#c3cad2" stroke-width=".55" opacity=".8"/>' +
  '<rect x="35" y="21" width="10" height="55" rx="3" fill="none" stroke="#aab3bd" stroke-width=".8"/>' +
  "</g></svg>";

// A ceiling fan says so in its name or model, or comes from a ceiling fan maker (Hunter, Big Ass Fans, Lucci Air,
// Minka, Casablanca, Fanimation, Westinghouse, Bond / Olibra, Modern Forms); anything else is the standing fan.
const CA_CEILING_FAN_RE =
  /(ceiling|plafond|plafonnier|decken|techo|soffitto|plafon|sufit|teto|tavan|потол|стел|stropn|griesti|οροφ|\bhunter\b|big ?ass|haiku|\bbaf\b|lucci|\bminka|casablanca|fanimation|westinghouse|\bbond\b|olibra|modern ?forms)/i;

// A circulator says so in its name or model (SwitchBot Circulator Fan, Battery Circulator Fan, Vornado…).
// The device, not « circulation »: circulator, Zirkulator, circolatore, circulateur, circulador.
const CA_CIRCULATOR_RE = /(circulator|zirkulator|circolatore|circulateur|circulador|vornado)/i;
// A circulator on a pole: SwitchBot's Standing Circulator Fan (« Standing Fan » for its integrations), or a name with
// both words.
const CA_STANDING_CIRCULATOR_RE = /(switch\s?bot|wonderlabs).*standing fan|standing fan.*(switch\s?bot|wonderlabs)|standing circulator|circulator.*(floor|pole|stand)/i;

// A tower fan says so: tower, colonne, Turm / Säule, torre, toren, kolumna…
const CA_TOWER_FAN_RE = /(tower|colonne|turmventilator|s[äa]ulenventilator|\btorre\b|torenventilator|kolumnow|wie[żz]ow|sloupov)/i;

CA_ART.fan = {
  variants: ["fan", "ceiling", "circulator", "circulator_standing", "tower_fan"],
  guess: (text) =>
    CA_CEILING_FAN_RE.test(text)
      ? "ceiling"
      : CA_STANDING_CIRCULATOR_RE.test(text)
        ? "circulator_standing"
        : CA_CIRCULATOR_RE.test(text)
          ? "circulator"
          : CA_TOWER_FAN_RE.test(text)
            ? "tower_fan"
            : "fan",
  render: (variant, s) => ({
    svg:
      variant === "ceiling"
        ? CA_CEILING_FAN_ART
        : variant === "circulator"
          ? CA_CIRCULATOR_ART
          : variant === "circulator_standing"
            ? CA_STANDING_CIRCULATOR_ART
            : variant === "tower_fan"
              ? CA_TOWER_FAN_ART
              : CA_FAN_ART,
    cls: [
      variant === "ceiling" ? "ceiling" : variant === "tower_fan" ? "tower" : "",
      s.running && s.osc ? "osc" : "",
      s.running && s.natural ? "natural" : "",
      s.running && s.reverse ? "reverse" : "",
      s.lit ? "lit" : "",
    ],
    style: `--ca-spin:${caSpin(s.pct)}s`,
  }),
  styles: `
    .k-fan.ceiling .blades { stroke: none; transform-box: fill-box; transform-origin: center; }
    .k-fan.ceiling .lamp { fill: #f1f3f5; transition: fill .4s; }
    .k-fan.ceiling .glow { opacity: 0; transition: opacity .6s; }
    .k-fan.ceiling.lit .lamp { fill: #fff3bf; }
    .k-fan.ceiling.lit .glow { opacity: 1; }
    .k-fan.running.reverse .blades { animation-direction: reverse; }
    .k-fan.tower .drum { transform-box: view-box; }
    .k-fan.tower .head { transform-origin: 40px 46px; }
    .k-fan.running.tower .drum { animation: ca-drum calc(var(--ca-spin, 1s) / 2) linear infinite; }
    @keyframes ca-drum { from { transform: translateY(0); } to { transform: translateY(3px); } }
    .k-fan .blades { stroke: #7fb2dd; stroke-width: .5; transform-box: view-box; transform-origin: 40px 32px; }
    .k-fan .head { transform-box: view-box; transform-origin: 40px 32px; }
    .k-fan .wind { fill: none; stroke: var(--ca-color); stroke-width: 1.6; stroke-linecap: round; }
    .k-fan .wind path { opacity: 0; transform-box: fill-box; transform-origin: center; }
    .k-fan .led { fill: #9aa5b1; }
    .k-fan .c-stop { stop-color: var(--ca-color); }
    .k-fan .floor { opacity: 0; transition: opacity .6s; }
    .k-fan.running .floor { opacity: 1; }
    .k-fan.running .led { fill: var(--ca-color); }
    .k-fan.running .blades { animation: ca-spin var(--ca-spin, 1s) linear infinite; }
    .k-fan.running .wind path { animation: ca-breeze 1.8s ease-out infinite; }
    .k-fan.running .wind path:nth-child(3n+2) { animation-delay: .6s; }
    .k-fan.running .wind path:nth-child(3n) { animation-delay: 1.2s; }
    .k-fan.running.natural .wind path { animation: ca-gust 3.6s ease-in-out infinite; }
    .k-fan.running.osc .head { animation: ca-osc 7s ease-in-out infinite; }
    @keyframes ca-breeze { 0% { opacity: 0; transform: scale(.6); } 35% { opacity: .9; } 100% { opacity: 0; transform: scale(1.25); } }
    @keyframes ca-gust { 0%, 100% { opacity: 0; } 20% { opacity: .9; } 45% { opacity: .15; } 60% { opacity: .7; } 80% { opacity: 0; } }
    @keyframes ca-osc { 0%, 100% { transform: translateX(0) scaleX(1); } 25% { transform: translateX(-3px) scaleX(.84); }
                        50% { transform: translateX(0) scaleX(1); } 75% { transform: translateX(3px) scaleX(.84); } }
  `,
};

class ClimateAirFanCard extends CaCard {
  static get kind() {
    return "fan";
  }

  _roles() {
    return ["temperature", "humidity", "angle", "timer", "rotate_left", "rotate_right", "child_lock", "buzzer", "light", "brightness", "anion", "fan_light"];
  }

  _model(r) {
    const c = this._config;
    const ent = r.ent;
    const st = this._st(r.id);
    const a = st.attributes;
    const on = st.state === "on";
    const pct = on ? Number(a.percentage ?? 0) : 0;
    const osc = !!a.oscillating;
    const preset = a.preset_mode;
    const natural = /natur/i.test(preset || "");
    const chips = [];
    if (c.show_sensors) chips.push(...this._sensorChips(ent, ["temperature", "humidity"]));
    if (on && osc && (a.supported_features || 0) & CA_FAN_OSCILLATE) {
      const angle = this._avail(ent.angle) ? ` ${this._val(ent.angle)}°` : "";
      chips.push(this._chip("mdi:arrow-oscillating", `${this._t("oscillation")}${angle}`, "tint", "", angle ? ent.angle : r.id));
    }
    const timer = this._num(ent.timer);
    if (on && timer) {
      const unit = this._st(ent.timer).attributes.unit_of_measurement || "";
      chips.push(this._chip("mdi:timer-outline", `${caFmtNum(this._intlLang(), timer)}${unit ? ` ${unit}` : ""}`, "tint", this._t("timer"), ent.timer));
    }
    return {
      state: on ? "on" : "off",
      running: on,
      color: on ? CA_FAN_COLOR : CA_IDLE,
      statusText: this._t(on ? "st_on" : "st_off"),
      sub: on && preset ? this._fmtAttr(r.id, "preset_mode", preset) : "",
      pct,
      osc,
      preset,
      chips,
      natural,
      // A ceiling fan turning the other way (winter), and its own light.
      reverse: a.direction === "reverse",
      lit: this._val(ent.fan_light) === "on",
    };
  }

  // The hero's label and the compact lines both show the preset while it runs.
  _subInBody(m) {
    return m.running;
  }

  _heroInfo(m) {
    if (!m.running) return `<div class="big"><span class="state-big">${caEsc(m.statusText)}</span></div>`;
    return `<div class="big"><span class="val">${Math.round(m.pct)}<small> %</small></span><span class="lbl">${caEsc(m.sub || m.statusText)}</span></div>`;
  }

  _controls() {
    const r = this._r;
    const ent = r.ent;
    const a = this._st(r.id).attributes;
    const f = a.supported_features || 0;
    const on = this._val(r.id) === "on";
    const speed = f & CA_FAN_SET_SPEED && on ? this._speedSlider(r.id) : "";
    const presets =
      f & CA_FAN_PRESET ? this._segments("preset", a.preset_modes, a.preset_mode, (o) => this._fmtAttr(r.id, "preset_mode", o), CA_PRESET_ICON) : "";
    const toggles = this._toggles([
      f & CA_FAN_OSCILLATE ? this._toggle(null, this._t("oscillation"), "mdi:arrow-oscillating", { action: "oscillate", on: !!a.oscillating }) : "",
      this._toggle(ent.anion, this._t("anion"), "mdi:creation-outline"),
      this._toggle(ent.child_lock, this._t("child_lock"), this._val(ent.child_lock) === "on" ? "mdi:lock" : "mdi:lock-open-variant-outline"),
      this._toggle(ent.buzzer, this._t("buzzer"), this._val(ent.buzzer) === "on" ? "mdi:volume-high" : "mdi:volume-off"),
      this._toggle(ent.light, this._t("light"), "mdi:lightbulb-outline"),
      this._toggle(ent.fan_light, this._t("fan_light"), "mdi:ceiling-fan-light"),
      f & CA_FAN_DIRECTION ? this._toggle(null, this._t("reverse"), "mdi:rotate-3d-variant", { action: "direction", on: a.direction === "reverse" }) : "",
    ]);
    const fields = [
      ent.angle ? this._numberControl(ent.angle, this._t("angle"), "mdi:angle-acute") : "",
      ent.timer ? this._numberControl(ent.timer, this._t("timer"), "mdi:timer-outline") : "",
      ent.brightness ? this._selectEntity(ent.brightness, this._t("brightness")) : "",
    ].filter(Boolean);
    const rotate = [
      ["rotate_left", "mdi:rotate-left"],
      ["rotate_right", "mdi:rotate-right"],
    ]
      .filter(([role]) => ent[role] && this._val(ent[role]) !== "unavailable")
      .map(([role, icon]) => `<button class="round" data-press="${caEsc(ent[role])}" title="${caEsc(this._t(role))}" aria-label="${caEsc(this._t(role))}"><ha-icon icon="${icon}"></ha-icon></button>`)
      .join("");
    const fieldsHtml = fields.length || rotate ? `<div class="row fields">${fields.join("")}${rotate ? `<div class="rot">${rotate}</div>` : ""}</div>` : "";
    return this._section("", speed + presets) + this._options(toggles + fieldsHtml);
  }

  _action(action, value) {
    const id = this._r.id;
    if (action === "preset") this._call("fan", "set_preset_mode", { entity_id: id, preset_mode: value });
    else if (action === "oscillate") this._call("fan", "oscillate", { entity_id: id, oscillating: !this._st(id).attributes.oscillating });
    else if (action === "direction")
      this._call("fan", "set_direction", { entity_id: id, direction: this._st(id).attributes.direction === "reverse" ? "forward" : "reverse" });
    else super._action(action, value);
  }

  _miniInfo(m) {
    const lines = [];
    if (m.running) lines.push(caBar(m.pct, `${Math.round(m.pct)} %`, "mdi:fan"));
    if (m.running && m.sub) lines.push(caLine(CA_PRESET_ICON(m.preset) || "mdi:tune-variant", m.sub));
    const sensors = this._config.show_sensors ? ["temperature", "humidity"].map((role) => this._fmtSensor(this._r.ent[role])).filter(Boolean) : [];
    if (sensors.length) lines.push(caLine("mdi:thermometer", sensors.join(" · ")));
    return lines.join("");
  }

  // The oscillation while it runs, and the light of a fan that has one (a ceiling fan), even when it is off.
  _miniButtons(m) {
    const f = this._st(this._r.id).attributes.supported_features || 0;
    const btns = [];
    if (m.running && f & CA_FAN_OSCILLATE) {
      const label = caEsc(this._t("oscillation"));
      btns.push(
        `<button class="round${m.osc ? " on" : ""}" data-action="oscillate" title="${label}" aria-label="${label}" aria-pressed="${m.osc}"><ha-icon icon="mdi:arrow-oscillating"></ha-icon></button>`,
      );
    }
    const lamp = this._r.ent.fan_light;
    if (lamp && this._avail(lamp)) {
      const label = caEsc(this._t("fan_light"));
      btns.push(
        `<button class="round${m.lit ? " on" : ""}" data-toggle="${caEsc(lamp)}" title="${label}" aria-label="${label}" aria-pressed="${m.lit}"><ha-icon icon="mdi:ceiling-fan-light"></ha-icon></button>`,
      );
    }
    return btns;
  }

  static styles = `
    .row.fields { align-items: flex-end; flex-wrap: wrap; }
    .row.fields > .field { flex: 1 1 110px; }
    .rot { display: flex; gap: 6px; }
  `;
}

class ClimateAirFanMiniCard extends caMini(ClimateAirFanCard) {}

caRegister("climate-air-fan-card", ClimateAirFanCard, "Climate Air · Fan Card", "Fan with speed, oscillation, presets and animated illustration");
caRegister("climate-air-fan-mini-card", ClimateAirFanMiniCard, "Climate Air · Fan Mini Card", "Compact fan card that unfolds into the full card");
