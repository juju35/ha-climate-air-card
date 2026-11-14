/*
 * climate-air-heatpump-card and its mini card: an air-to-water heat pump (Daikin Altherma, Panasonic Aquarea,
 * Mitsubishi Ecodan, Atlantic, Hitachi Yutaki, Aldes T.One through TOUG…) with its mode, target temperature, hot water
 * tank and measurements. The device is a climate entity, or the select of its mode when it has none (TOUG); the tank,
 * the three-way valve, the setpoint, the backup heater and the defrost cycle are roles of its device (shared.js).
 */

// The illustration: the outdoor unit, its fan turning while the compressor runs, the water flowing in the pipes to the
// hot water tank, whose level follows its temperature. Warm air rises above the unit when heating, snowflakes when
// cooling, and heat above the tank while the valve sends the heat there; frost covers the unit while it defrosts.
const caHpWave = (x, y) => `<path d="M${x} ${y}q-2 3 0 6t0 6"/>`;
const caHpFlake = (x, y) => `<path d="M${x} ${y}v5M${x - 2.2} ${y + 1.25}l4.4 2.5M${x - 2.2} ${y + 3.75}l4.4-2.5"/>`;

const caHpArt = (s) => {
  const pct = caHpTankPct(s.tank);
  const h = +((72 * pct) / 100).toFixed(1);
  const y = +(84 - h).toFixed(1);
  const label = s.tank != null ? `${caFmtNum(s.lang || "en", s.tank, 0)}°` : "";
  return (
    '<svg viewBox="0 0 120 94" aria-hidden="true"><defs>' +
    '<linearGradient id="ca-hb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe4ea"/></linearGradient>' +
    '<linearGradient id="ca-ht" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfe4ea"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd5dc"/></linearGradient>' +
    '<radialGradient id="ca-hf" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".45"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient>' +
    '<clipPath id="ca-hc"><rect x="89" y="9" width="24" height="76" rx="12"/></clipPath></defs>' +
    '<ellipse class="floor" cx="60" cy="89" rx="54" ry="4" fill="url(#ca-hf)"/>' +
    // Above the unit: warm air (heating) or snowflakes (cooling).
    `<g class="hwave">${caHpWave(18, 6)}${caHpWave(30, 2)}${caHpWave(42, 6)}</g>` +
    `<g class="hflake">${caHpFlake(18, 8)}${caHpFlake(31, 3)}${caHpFlake(44, 9)}</g>` +
    // Pipes: the flow to the tank and the return.
    '<path d="M66 42H88M66 66H88" stroke="#b6bfc9" stroke-width="3.6" stroke-linecap="round" fill="none"/>' +
    '<path class="flow" d="M66 42H88"/><path class="flow ret" d="M66 66H88"/>' +
    // The outdoor unit: body, fan behind its grille, side grille, status light, feet.
    '<rect x="8" y="82" width="10" height="5" rx="1.5" fill="#9aa5b1"/><rect x="50" y="82" width="10" height="5" rx="1.5" fill="#9aa5b1"/>' +
    '<rect x="2" y="24" width="64" height="59" rx="6" fill="url(#ca-hb)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M8 29H60" stroke="#dfe4ea" stroke-width="1.1"/>' +
    '<circle cx="27" cy="55" r="20" fill="#3a434e"/>' +
    `<g class="hfan">${[0, 120, 240]
      .map((a) => `<path transform="rotate(${a} 27 55)" d="M27 55C28.5 48 32.5 40.5 39 40C41.5 45.5 36.5 52.5 27 55Z"/>`)
      .join("")}<circle cx="27" cy="55" r="3" fill="#d5dbe2"/></g>` +
    '<g fill="none" stroke="#c3cad2"><circle cx="27" cy="55" r="20" stroke-width="1"/><circle cx="27" cy="55" r="14" stroke-width=".6" stroke-opacity=".7"/>' +
    '<circle cx="27" cy="55" r="8" stroke-width=".5" stroke-opacity=".5"/><path d="M7 55H47M27 35V75" stroke-width=".5" stroke-opacity=".5"/></g>' +
    `<path d="${[38, 43, 48, 53, 58, 63, 68, 73].map((yy) => `M51 ${yy}H61`).join("")}" stroke="#d5dbe2" stroke-width="1.6" stroke-linecap="round"/>` +
    '<circle class="led" cx="56" cy="32" r="1.5"/>' +
    `<g class="ice">${caHpFlake(10, 30)}${caHpFlake(43, 31)}${caHpFlake(56, 76)}</g>` +
    // The hot water tank, its water level and the heat rising above it.
    `<g class="twave">${caHpWave(97, 0)}${caHpWave(107, -3)}</g>` +
    '<rect x="86" y="6" width="30" height="82" rx="15" fill="url(#ca-ht)" stroke="#c3cad2" stroke-width="1.2"/>' +
    `<g clip-path="url(#ca-hc)"><rect class="water" x="89" y="${y}" width="24" height="${h}"/><rect class="hot" x="89" y="${y}" width="24" height="${Math.min(h, 26)}"/></g>` +
    (label ? `<rect x="90" y="40" width="22" height="10" rx="3" fill="#1d2632"/><text class="disp" x="101" y="47.6" text-anchor="middle">${caEsc(label)}</text>` : "") +
    "</svg>"
  );
};

CA_ART.heatpump = {
  render: (_variant, s) => ({
    svg: caHpArt(s),
    cls: [`ph-${s.phase || "off"}`, s.active ? "active" : "", s.defrost ? "defrost" : ""],
  }),
  styles: `
    .picture.k-heatpump { aspect-ratio: 120 / 94; }
    .hero .picture.k-heatpump { width: 112px; }
    ha-card.mini .picture.k-heatpump { width: 84px; height: 66px; }
    .ic.pic .picture.k-heatpump { width: 58px; }
    @container (max-width: 180px) { ha-card:not(.mini) .hero .picture.k-heatpump { width: 84px; height: 66px; } }
    .k-heatpump .c-stop { stop-color: var(--ca-color); }
    .k-heatpump .floor { opacity: 0; transition: opacity .6s; }
    .k-heatpump.running .floor { opacity: 1; }
    .k-heatpump .hfan { fill: #aab3bd; transform-box: view-box; transform-origin: 27px 55px; }
    .k-heatpump.running .hfan { fill: var(--ca-color); animation: ca-spin 4s linear infinite; }
    .k-heatpump.running.active .hfan { animation-duration: 1.1s; }
    .k-heatpump.defrost .hfan { animation: none; }
    .k-heatpump .led { fill: #9aa5b1; }
    .k-heatpump.running .led { fill: var(--ca-color); }
    .k-heatpump.running.active .led { animation: ca-blink 2s ease-in-out infinite; }
    .k-heatpump .flow { fill: none; stroke: var(--ca-color); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 1.5 5; opacity: 0; transition: opacity .6s; }
    .k-heatpump.running.active .flow { opacity: .95; animation: ca-hp-flow .9s linear infinite; }
    .k-heatpump.running.active .flow.ret { opacity: .55; animation-direction: reverse; }
    .k-heatpump .water { fill: #85b7eb; opacity: .45; }
    .k-heatpump .hot { fill: var(--ca-color); opacity: 0; transition: opacity .6s; }
    .k-heatpump.ph-dhw .hot, .k-heatpump.ph-heat .hot { opacity: .55; }
    .k-heatpump .disp { font: 600 6.6px/1 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: #9aa5b1; }
    .k-heatpump.running .disp { fill: var(--ca-color); }
    .k-heatpump .hwave, .k-heatpump .twave { fill: none; stroke: var(--ca-color); stroke-width: 1.6; stroke-linecap: round; }
    .k-heatpump .hflake, .k-heatpump .ice { fill: none; stroke: var(--ca-color); stroke-width: 1; stroke-linecap: round; }
    .k-heatpump .ice { stroke: #85b7eb; }
    .k-heatpump .hwave, .k-heatpump .hflake, .k-heatpump .twave, .k-heatpump .ice { display: none; }
    .k-heatpump.running.active.ph-heat:not(.defrost) .hwave, .k-heatpump.running.active.ph-cool .hflake,
    .k-heatpump.running.ph-dhw .twave, .k-heatpump.defrost .ice { display: inline; }
    .k-heatpump .hwave path, .k-heatpump .hflake path, .k-heatpump .twave path { opacity: 0; transform-box: view-box; animation: ca-rise 2.6s ease-in-out infinite; }
    .k-heatpump .hwave path:nth-child(2), .k-heatpump .hflake path:nth-child(2), .k-heatpump .twave path:nth-child(2) { animation-delay: .9s; }
    .k-heatpump .hwave path:nth-child(3), .k-heatpump .hflake path:nth-child(3) { animation-delay: 1.8s; }
    .k-heatpump.defrost .ice { animation: ca-blink 2.4s ease-in-out infinite; }
    @keyframes ca-hp-flow { to { stroke-dashoffset: -13; } }
  `,
};

// The icon of a mode of the select a heat pump without a climate entity is driven by (TOUG).
const caHpModeIcon = (o) => {
  const s = String(o);
  if (CA_HP_OFF.test(s.trim())) return "mdi:power";
  if (/boost/i.test(s)) return "mdi:rocket-launch-outline";
  if (/eco/i.test(s)) return "mdi:leaf";
  if (/prog/i.test(s)) return "mdi:calendar-clock";
  if (CA_HP_COOL.test(s)) return "mdi:snowflake";
  if (/hors.?gel|frost/i.test(s)) return "mdi:snowflake-thermometer";
  return "mdi:fire";
};

class ClimateAirHeatpumpCard extends CaClimateCard {
  static get kind() {
    return "heatpump";
  }

  _roles() {
    return ["indoor_temp", "outdoor_temp", "dhw", "tank_temp", "valve", "setpoint", "backup", "defrost", "power", "compressor"];
  }

  _isClimate() {
    return this._r?.id?.startsWith("climate.") ?? String(this._entity() || "").startsWith("climate.");
  }

  _model(r) {
    const c = this._config;
    const ent = r.ent;
    const st = this._st(r.id);
    const climate = r.id.startsWith("climate.");
    const hp = caHeatPumpState(r.id, st, (role) => this._st(ent[role]));
    let base;
    if (climate) base = this._climate(r);
    else {
      // Without a climate entity: the room temperature and the setpoint come from the device's sensors.
      base = { mode: st.state, on: hp.on, cur: this._num(ent.indoor_temp), range: null, target: this._num(ent.setpoint) };
      if (hp.on) this._lastOn = st.state;
    }
    const chips = [];
    if (hp.defrost) chips.push(this._chip("mdi:snowflake-melt", this._t("st_defrost"), "warn", "", ent.defrost));
    if (hp.backup) chips.push(this._chip("mdi:radiator", this._t("backup"), "warn", "", ent.backup));
    if (c.show_sensors) chips.push(...this._sensorChips(ent, ["outdoor_temp", ...(hp.on ? ["power"] : [])]));
    const a = st.attributes;
    const preset = climate && hp.on && a.preset_mode && a.preset_mode !== "none" ? this._fmtAttr(r.id, "preset_mode", a.preset_mode) : "";
    return {
      state: hp.on ? hp.phase : "off",
      mode: base.mode,
      running: hp.on,
      active: hp.active,
      phase: hp.phase,
      defrost: hp.defrost,
      color: hp.color,
      statusText: this._t(hp.statusKey),
      // The mode next to the area: the climate's preset, or the selected mode of a select (« Confort »).
      sub: climate ? preset : hp.on ? this._fmtState(r.id) : "",
      cur: base.cur,
      target: hp.on ? base.target : null,
      range: hp.on ? base.range : null,
      tank: hp.tank,
      tankTarget: hp.tankTarget,
      lang: this._intlLang(),
      chips,
    };
  }

  _showTarget(m) {
    return m.running && (m.target != null || m.range != null);
  }

  // Under the temperatures: the tank, and its target.
  _heroLine(m) {
    if (m.tank == null) return "";
    const target = m.tankTarget != null ? ` → ${this._temp(m.tankTarget, 0)}` : "";
    return caLine("mdi:water-boiler", `${this._t("tank")} ${this._temp(m.tank, 0)}${target}`);
  }

  _controls(m) {
    if (this._isClimate()) return super._controls(m);
    // Driven by a select (TOUG): its modes as buttons (a dropdown when there are many), the setpoint, then the hot
    // water and the device's switches.
    const r = this._r;
    const st = this._st(r.id);
    const opts = st.attributes.options || [];
    const modes =
      opts.length <= 5
        ? this._segments("hpmode", opts, st.state, (o) => this._fmtState(r.id, o), caHpModeIcon)
        : `<div class="grid">${this._selectEntity(r.id, this._t("mode"))}</div>`;
    const setpoint = r.ent.setpoint && m.running ? this._numberControl(r.ent.setpoint, this._t("target"), "mdi:thermometer") : "";
    const toggles = this._switchToggles(r);
    return this._section("", modes + setpoint) + this._midSections(m) + this._options(toggles);
  }

  // The hot water tank: its target and its operation mode, when the device has a water_heater entity.
  _midSections() {
    const id = this._r.ent.dhw;
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    const a = st.attributes;
    let body = "";
    if (a.temperature != null) {
      const step = Number(a.target_temp_step) || 1;
      body += this._rangeHtml("dhw", id, "mdi:thermometer-water", this._t("target"), Number(a.min_temp ?? 30), Number(a.max_temp ?? 65), step, Number(a.temperature));
    }
    const ops = a.operation_list || [];
    if (ops.length > 1) {
      body += this._segments("dhwop", ops, a.operation_mode ?? st.state, (o) => this._fmtState(id, o), null);
    }
    return this._section(this._t("dhw_target"), body, "mdi:water-boiler");
  }

  _rangeText(d, v) {
    if (d.dhw) return this._temp(v, 0);
    return super._rangeText(d, v);
  }

  // The water heater's target, sent like any other slider (see CaCard._onChange).
  _extraSend(d, value) {
    if (d.dhw) return () => this._call("water_heater", "set_temperature", { entity_id: d.dhw, temperature: Number(value) });
    return null;
  }

  _action(action, value) {
    const id = this._r.id;
    if (action === "hpmode") this._call("select", "select_option", { entity_id: id, option: value });
    else if (action === "dhwop") this._call("water_heater", "set_operation_mode", { entity_id: this._r.ent.dhw, operation_mode: value });
    else if (action === "power" && !id.startsWith("climate.")) {
      // A select has no on / off: off is its « Off » option, and on goes back to the last mode it ran in.
      const opts = this._st(id).attributes.options || [];
      const off = opts.find((o) => CA_HP_OFF.test(String(o).trim()));
      const on = opts.includes(this._lastOn) ? this._lastOn : opts.find((o) => o !== off);
      const option = caHpIsOn(id, this._val(id)) ? off : on;
      if (option) this._call("select", "select_option", { entity_id: id, option });
    } else super._action(action, value);
  }

  _miniInfo(m) {
    const lines = [this._tempLine(m)];
    if (m.tank != null) lines.push(caLine("mdi:water-boiler", `${this._t("tank")} ${this._temp(m.tank, 0)}`));
    const out = this._config.show_sensors ? this._fmtSensor(this._r.ent.outdoor_temp) : null;
    if (out) lines.push(caLine("mdi:home-thermometer-outline", `${this._t("outdoor")} ${out}`));
    return lines.join("");
  }

  _miniButtons(m) {
    return this._isClimate() ? super._miniButtons(m) : [];
  }
}

class ClimateAirHeatpumpMiniCard extends caMini(ClimateAirHeatpumpCard) {}

caRegister(
  "climate-air-heatpump-card",
  ClimateAirHeatpumpCard,
  "Climate Air · Heat Pump Card",
  "Air-to-water heat pump with its mode, target temperature, hot water tank and animated illustration",
);
caRegister(
  "climate-air-heatpump-mini-card",
  ClimateAirHeatpumpMiniCard,
  "Climate Air · Heat Pump Mini Card",
  "Compact heat pump card that unfolds into the full card",
);
