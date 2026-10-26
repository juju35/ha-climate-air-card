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

CA_ART.fan = {
  render: (_variant, s) => ({
    svg: CA_FAN_ART,
    cls: [s.running && s.osc ? "osc" : "", s.running && s.natural ? "natural" : ""],
    style: `--ca-spin:${caSpin(s.pct)}s`,
  }),
  styles: `
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
    return ["temperature", "humidity", "angle", "timer", "rotate_left", "rotate_right", "child_lock", "buzzer", "light", "brightness", "anion"];
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
      chips.push(this._chip("mdi:arrow-oscillating", `${this._t("oscillation")}${angle}`, "tint"));
    }
    const timer = this._num(ent.timer);
    if (on && timer) {
      const unit = this._st(ent.timer).attributes.unit_of_measurement || "";
      chips.push(this._chip("mdi:timer-outline", `${caFmtNum(this._lang(), timer)}${unit ? ` ${unit}` : ""}`, "tint", this._t("timer")));
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
    };
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

  _miniButtons(m) {
    const f = this._st(this._r.id).attributes.supported_features || 0;
    if (!m.running || !(f & CA_FAN_OSCILLATE)) return [];
    const label = caEsc(this._t("oscillation"));
    return [
      `<button class="round${m.osc ? " on" : ""}" data-action="oscillate" title="${label}" aria-label="${label}" aria-pressed="${m.osc}"><ha-icon icon="mdi:arrow-oscillating"></ha-icon></button>`,
    ];
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
