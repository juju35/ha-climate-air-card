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

// The outdoor unit of an air-source pump: body, fan behind its grille, side grille, status light, feet, and the
// frost that covers it while it defrosts. Its two water pipes leave at x66, y42 (flow) and y66 (return).
const caHpAirArt =
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
  `<g class="ice">${caHpFlake(10, 30)}${caHpFlake(43, 31)}${caHpFlake(56, 76)}</g>`;

// The indoor module of a ground- or water-source pump, in place of the outdoor unit: a wall box with two vent lines
// and the status light, and the two pipes that carry the water on to the tank (x46 → x66, drawn like the air unit's).
const caHpModule =
  '<rect x="4" y="18" width="42" height="34" rx="5" fill="url(#ca-hb)" stroke="#c3cad2" stroke-width="1.2"/>' +
  '<path d="M11 27H39M11 33H39" stroke="#dfe4ea" stroke-width="1.4" stroke-linecap="round"/>' +
  '<circle class="led" cx="40" cy="46" r="1.5"/>' +
  '<path d="M46 42H66M46 66H66" stroke="#b6bfc9" stroke-width="3.6" stroke-linecap="round" fill="none"/>' +
  '<path class="flow" d="M46 42H66"/><path class="flow ret" d="M46 66H66"/>';

// The brine / water loop as a static casing and the fluid flowing in it while the pump runs.
const caHpBrine = (d) => `<path class="loopbg" d="${d}"/><path class="brine" d="${d}"/>`;
// A wavy water surface along y.
const caHpWaves = (y) => `<path class="wsurf" d="M0 ${y}q4-2 8 0t8 0 8 0 8 0 8 0 8 0 8 0 8 0"/>`;

// The source side of the illustration, chosen by `s.source` (and its ground / water variant). Everything to the
// right — the pipes to the tank, the tank and its level, the running / phase animation — is the same for every
// source; only this left-hand part changes, and air keeps the outdoor fan unit.
const caHpSourceArt = (s) => {
  if (s.source === "ground") {
    const borehole = s.groundType === "borehole";
    const soil = borehole
      ? '<rect x="0" y="50" width="66" height="38" rx="3" class="soil"/><path d="M0 62H66M0 74H66" class="strata"/>'
      : '<rect x="0" y="56" width="66" height="32" rx="3" class="soil"/><path d="M0 57H66" class="grass"/>';
    const loop = borehole ? "M19 52V80q0 3 3 3h6q3 0 3-3V52" : "M14 52V66H56q4 0 4 4t-4 4H12q-4 0-4 4t4 4H40V52";
    return soil + caHpModule + caHpBrine(loop);
  }
  if (s.source === "water") {
    const lake = s.waterType === "lake";
    const body = lake
      ? '<rect x="0" y="56" width="66" height="32" rx="4" class="wbody"/>' + caHpWaves(56)
      : '<rect x="0" y="56" width="66" height="32" rx="3" class="soil"/><rect x="0" y="72" width="66" height="16" class="wtable"/>' + caHpWaves(72);
    const well = (x, w) => `<rect x="${x}" y="56" width="${w}" height="30" rx="2" class="casing"/>`;
    let casing = "";
    let loop = "";
    if (lake) loop = "M14 52V64H56q4 0 4 4t-4 4H12q-4 0-4 4t4 4H40V52";
    else if (s.waterType === "doublet") {
      casing = well(7, 10) + well(33, 10);
      loop = "M12 52V82M38 52V80";
    } else {
      casing = well(15, 11);
      loop = "M19 52V82M24 52V78";
    }
    return body + casing + caHpModule + caHpBrine(loop);
  }
  return caHpAirArt;
};

const caHpArt = (s) => {
  const pct = s.tankPct != null ? Math.max(8, Math.min(100, s.tankPct)) : caHpTankPct(s.tank);
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
    // The source side: an air outdoor unit, a geothermal loop or a well.
    caHpSourceArt(s) +
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
    cls: [`ph-${s.phase || "off"}`, s.active ? "active" : "", s.sourceOn ? "srcon" : "", s.defrost ? "defrost" : ""],
  }),
  styles: `
    .picture.k-heatpump { aspect-ratio: 120 / 94; }
    .hero .picture.k-heatpump { width: 112px; }
    ha-card.mini .picture.k-heatpump { width: 84px; height: 66px; }
    /* An overview tile: the unit and its tank are wider than tall, the tile's picture column widens to fit them. */
    .dev:has(.ic.pic .k-heatpump) { grid-template-columns: 60px minmax(0, 1fr); }
    .ic.pic:has(.k-heatpump), .ic.pic .picture.k-heatpump { width: 60px; height: 47px; }
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
    /* Ground- and water-source illustrations: a neutral soil band, the grass line or the strata, the water body
       and table, and the well casing. The brine / water flows like the heating pipes while the pump runs. */
    .k-heatpump .soil { fill: #d8c4a6; }
    .k-heatpump .grass { stroke: #8bbf6a; stroke-width: 2; fill: none; }
    .k-heatpump .strata { stroke: #c3a985; stroke-width: 1; stroke-opacity: .55; fill: none; }
    .k-heatpump .wbody, .k-heatpump .wtable { fill: #9fcdf0; }
    .k-heatpump .wtable { opacity: .7; }
    .k-heatpump .wsurf { fill: none; stroke: #85b7eb; stroke-width: 1.4; stroke-linecap: round; }
    .k-heatpump .casing { fill: #eef1f4; stroke: #c3cad2; stroke-width: 1; }
    .k-heatpump .loopbg { fill: none; stroke: #b6bfc9; stroke-width: 3.2; stroke-linecap: round; }
    .k-heatpump .brine { fill: none; stroke: var(--ca-color); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 1.5 5; opacity: 0; transition: opacity .6s; }
    .k-heatpump.running.active .brine, .k-heatpump.running.srcon .brine { opacity: .95; animation: ca-hp-flow .9s linear infinite; }
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
    return [
      "indoor_temp", "outdoor_temp", "dhw", "tank_temp", "valve", "setpoint", "backup", "defrost", "power", "compressor", "dhw_pct", "dhw_volume", "faults",
      // Measured-but-not-controlled pumps (ground / water source over Modbus meters): the monitoring roles.
      "heat_power", "cop", "cop_today", "scop", "flow_temp", "return_temp", "flow_rate", "energy", "heat_energy",
    ];
  }

  // Measured but not controlled: the card's entity is a power sensor (no climate entity, no mode select), so the
  // card is read-only (no mode buttons, no setpoint, no power button) and runs on the power threshold.
  _metered() {
    const id = this._r?.id || this._entity() || "";
    return !id.startsWith("climate.") && !id.startsWith("select.");
  }

  _showPower() {
    return !this._metered();
  }

  // The outdoor temperature entity the user set at the top level (a sensor or a weather entity), overriding the
  // discovered `outdoor_temp` role.
  _outdoorId() {
    return this._config.outdoor_temp || this._r?.ent?.outdoor_temp;
  }

  // The running threshold (watts) of a metered pump, for caHeatPumpState and the COP auto-compute.
  _threshold() {
    return this._config.power_threshold;
  }

  // The compressor threshold (watts) of a metered ground- or water-source pump: below it, only its source pumps run.
  _compressorThreshold() {
    return this._config.compressor_threshold;
  }

  // The source side (air / ground / water) and its ground / water variant: from the config, else guessed from the
  // device name.
  _source() {
    return caHpSource(this._config, this._hass, this._r?.id);
  }

  // The rooms of a multi-zone heat pump (a thermostat number and a temperature sensor per room), found on its device.
  // `exclude` drops the setpoints the user hid (a test number, a duplicate vent on the same thermostat); `zone_temps`
  // maps a setpoint to its temperature sensor when the names and ids leave the pairing ambiguous.
  _zones() {
    return caHeatPumpZones(this._hass, this._r.id, this._config.exclude, this._config.zone_temps);
  }

  // The zones' entities are not roles, so they are added to the tracked ids: the card redraws when a room's
  // temperature or setpoint changes.
  _extraIds(r) {
    return [
      ...super._extraIds(r),
      ...caHeatPumpZones(this._hass, r.id, this._config.exclude, this._config.zone_temps).flatMap((z) => [z.setpoint, z.temp].filter(Boolean)),
      // A top-level outdoor_temp entity (often a weather entity) is not a role, so track it for the redraw.
      ...(this._config.outdoor_temp ? [this._config.outdoor_temp] : []),
    ];
  }

  // `exclude` also hides a device switch the user does not want among the options (a test toggle); a hidden
  // switch is dropped from the toggles and no longer tracked.
  _switches(r) {
    const skip = new Set(this._config.exclude || []);
    return super._switches(r).filter((id) => !skip.has(id));
  }

  _isClimate() {
    return this._r?.id?.startsWith("climate.") ?? String(this._entity() || "").startsWith("climate.");
  }

  _model(r) {
    const c = this._config;
    const ent = r.ent;
    const st = this._st(r.id);
    const climate = r.id.startsWith("climate.");
    const metered = this._metered();
    const hp = caHeatPumpState(r.id, st, (role) => this._st(ent[role]), { powerThreshold: this._threshold(), compressorThreshold: this._compressorThreshold() });
    let base;
    if (climate) base = this._climate(r);
    else if (metered) {
      // Measured, not controlled: no setpoint; the room temperature only if a sensor gives one.
      base = { mode: st.state, on: hp.on, cur: this._num(ent.indoor_temp), range: null, target: null };
    } else {
      // Without a climate entity: the room temperature and the setpoint come from the device's sensors.
      base = { mode: st.state, on: hp.on, cur: this._num(ent.indoor_temp), range: null, target: this._num(ent.setpoint) };
      if (hp.on) this._lastOn = st.state;
    }
    const chips = [];
    const fault = caHpFault(this._st(ent.faults));
    if (c.show_alerts && fault) chips.push(this._chip("mdi:alert-circle-outline", fault, "alert", this._label(ent.faults), ent.faults));
    if (hp.defrost) chips.push(this._chip("mdi:snowflake-melt", this._t("st_defrost"), "warn", "", ent.defrost));
    if (hp.backup) chips.push(this._chip("mdi:radiator", this._t("backup"), "warn", "", ent.backup));
    // COP first — the figure people look at first on a heat pump — then today's and the seasonal figures. A metered
    // pump has one only while its compressor runs (not while only its source pumps do).
    const cop = (metered ? hp.active : hp.on) ? this._cop(ent, metered) : null;
    if (cop != null) chips.push(this._chip("mdi:gauge", `${this._t("cop")} ${caFmtNum(this._intlLang(), cop, 1)}`, "", this._t("cop"), ent.cop));
    const copToday = this._fmtSensor(ent.cop_today);
    if (copToday) chips.push(this._chip("mdi:sigma", `${this._t("cop_today")} ${copToday}`, "", this._label(ent.cop_today), ent.cop_today));
    const scop = this._fmtSensor(ent.scop);
    if (scop) chips.push(this._chip("mdi:calendar-sync", `SCOP ${scop}`, "", this._label(ent.scop), ent.scop));
    if (c.show_sensors) {
      chips.push(...this._outdoorChips());
      // The electrical power draw while running: the device's power role, or the metered entity itself.
      if (hp.on) {
        const pid = metered ? r.id : ent.power;
        const p = this._fmtSensor(pid);
        if (p) chips.push(this._chip("mdi:flash", p, "", this._label(pid), pid));
      }
    }
    // The hot water tank's fill as a percentage and its remaining volume, when the device reports them as sensors
    // instead of a water_heater entity (TOUG); the percentage drives the illustration's level.
    const dhwPct = this._num(ent.dhw_pct);
    const a = st.attributes;
    const preset = climate && hp.on && a.preset_mode && a.preset_mode !== "none" ? this._fmtAttr(r.id, "preset_mode", a.preset_mode) : "";
    const src = this._source();
    return {
      state: hp.on ? hp.phase : "off",
      mode: base.mode,
      running: hp.on,
      active: hp.active,
      sourceOn: hp.sourceOn,
      phase: hp.phase,
      defrost: hp.defrost,
      color: hp.color,
      statusText: this._t(hp.statusKey),
      // The source side of the illustration (air outdoor unit, geothermal loop, well).
      source: src.source,
      groundType: src.groundType,
      waterType: src.waterType,
      metered,
      cop,
      // The mode next to the area: the climate's preset, or the selected mode of a select (« Confort »); nothing
      // for a metered pump (its entity's state is a raw power reading).
      sub: climate ? preset : metered ? "" : hp.on ? this._fmtState(r.id) : "",
      cur: base.cur,
      target: hp.on ? base.target : null,
      range: hp.on ? base.range : null,
      tank: hp.tank,
      tankTarget: hp.tankTarget,
      tankPct: dhwPct,
      dhwPct: this._fmtSensor(ent.dhw_pct),
      dhwVol: this._fmtSensor(ent.dhw_volume),
      zones: this._zones(),
      lang: this._intlLang(),
      chips,
    };
  }

  // The instantaneous COP: a provided `cop` sensor always wins; otherwise the heat output divided by the electrical
  // power, computed only while running (the caller guards `hp.on`), with a guard against idle noise and divide-by-zero.
  _cop(ent, metered) {
    const given = this._num(ent.cop);
    if (given != null) return given;
    const heat = this._kw(ent.heat_power);
    const elec = this._kw(metered ? this._r.id : ent.power);
    if (heat == null || elec == null || elec <= 0.05) return null;
    return heat / elec;
  }

  // A power sensor's reading in kilowatts, whatever unit it reports.
  _kw(id) {
    const w = caPowerW(this._st(id));
    return w == null ? null : w / 1000;
  }

  // The outdoor temperature as text: a top-level `outdoor_temp` sensor or weather entity, else the discovered role.
  _outdoorText() {
    const id = this._outdoorId();
    const st = this._st(id);
    if (!id || caUnavailable(st)) return null;
    if (id.startsWith("weather.")) {
      const t = Number(st.attributes?.temperature);
      if (!Number.isFinite(t)) return null;
      return `${caFmtNum(this._intlLang(), t, 1)} ${st.attributes?.temperature_unit || this._unit()}`;
    }
    return this._fmtSensor(id);
  }

  _outdoorChips() {
    const id = this._outdoorId();
    const txt = this._outdoorText();
    return id && txt != null ? [this._chip("mdi:home-thermometer-outline", `${this._t("outdoor")} ${txt}`, "", this._label(id), id)] : [];
  }

  // The monitoring lines under the hero: heat output, flow / return temperatures and their ΔT, flow rate, and the
  // electrical and heat energy. Each shows only when its role resolves.
  _monitorLines() {
    const ent = this._r.ent;
    const lines = [];
    const heat = this._fmtSensor(ent.heat_power);
    if (heat) lines.push(caLine("mdi:fire", `${this._t("heat_power")} ${heat}`));
    const flow = this._num(ent.flow_temp);
    const ret = this._num(ent.return_temp);
    if (flow != null || ret != null) {
      const parts = [];
      if (flow != null) parts.push(`${this._t("flow_temp")} ${this._temp(flow, 1)}`);
      if (ret != null) parts.push(`${this._t("return_temp")} ${this._temp(ret, 1)}`);
      if (flow != null && ret != null) parts.push(`${this._t("delta_t")} ${caFmtNum(this._intlLang(), Math.abs(flow - ret), 1)}`);
      lines.push(caLineParts("mdi:swap-vertical", parts));
    }
    const rate = this._fmtSensor(ent.flow_rate);
    if (rate) lines.push(caLine("mdi:pump", `${this._t("flow_rate")} ${rate}`));
    const elec = this._fmtEnergy(ent.energy);
    const heatE = this._fmtEnergy(ent.heat_energy);
    if (elec || heatE) {
      const parts = [];
      if (elec) parts.push(`${this._t("elec_energy")} ${elec}`);
      if (heatE) parts.push(`${this._t("heat_energy")} ${heatE}`);
      lines.push(caLineParts("mdi:lightning-bolt", parts));
    }
    return lines.join("");
  }

  // An energy reading, scaled up from Wh once it reaches 1 000 Wh (a daily utility meter in Wh reads « 9.1 kWh »,
  // not « 9,134.5 Wh »); other units as the sensor gives them.
  _fmtEnergy(id) {
    const st = this._st(id);
    const v = Number(st?.state);
    if (caUnavailable(st) || !Number.isFinite(v) || st.attributes.unit_of_measurement !== "Wh" || Math.abs(v) < 1000) return this._fmtSensor(id);
    return Math.abs(v) >= 1e6 ? `${caFmtNum(this._intlLang(), v / 1e6, 1)} MWh` : `${caFmtNum(this._intlLang(), v / 1000, 1)} kWh`;
  }

  _showTarget(m) {
    return m.running && (m.target != null || m.range != null);
  }

  // Under the temperatures: the hot water tank — its temperature and target, its fill as a percentage and its remaining
  // volume, whichever the device reports.
  _heroLine(m) {
    const parts = [];
    if (m.tank != null) parts.push(`${this._temp(m.tank, 0)}${m.tankTarget != null ? ` → ${this._temp(m.tankTarget, 0)}` : ""}`);
    if (m.dhwPct) parts.push(m.dhwPct);
    if (m.dhwVol) parts.push(m.dhwVol);
    const tank = parts.length ? caLine("mdi:water-boiler", `${this._t("tank")} ${parts.join(" · ")}`) : "";
    return tank + this._monitorLines();
  }

  _controls(m) {
    // Measured but not controlled: read-only, no controls at all.
    if (this._metered()) return "";
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
    // A single setpoint when the pump has one thermostat; the per-room zones replace it when there are several.
    const setpoint = r.ent.setpoint && m.running && m.zones.length < 2 ? this._setpointControl(r.ent.setpoint, this._t("target")) : "";
    const toggles = this._switchToggles(r);
    return this._section("", modes + setpoint) + this._midSections(m) + this._options(toggles);
  }

  // Between the controls and the options: the per-room zones, then the hot water tank.
  _midSections(m) {
    return this._zonesSection(m) + this._dhwSection();
  }

  // One row per room: its name and current temperature, and its setpoint as a − / + stepper (its thermostat number),
  // or a dropdown for a coarse thermostat. Shown only on a multi-zone pump (a vent and a thermostat per room, Aldes
  // T.One). Steppers stay centred under one another where sliders drifted apart (issue #76).
  _zonesSection(m) {
    const zones = m?.zones || [];
    if (zones.length < 2) return "";
    const rows = zones
      .map((z) => {
        const cur = z.temp ? this._fmtSensor(z.temp, 1) : null;
        const label = cur ? `${z.name} · ${cur}` : z.name;
        return this._setpointControl(z.setpoint, label);
      })
      .join("");
    return this._section(this._t("zones"), rows, "mdi:thermostat");
  }

  // The hot water tank: its target and its operation mode, when the device has a water_heater entity.
  _dhwSection() {
    const id = this._r.ent.dhw;
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    const a = st.attributes;
    let body = "";
    if (a.temperature != null) body += this._setpointStepper(id, this._t("target"), "mdi:thermometer-water");
    const ops = a.operation_list || [];
    if (ops.length > 1) {
      body += this._segments("dhwop", ops, a.operation_mode ?? st.state, (o) => this._fmtState(id, o), null);
    }
    return this._section(this._t("dhw_target"), body, "mdi:water-boiler");
  }

  // A setpoint control: a dropdown for a coarse `number` (few steps) or a `select`, a − / + stepper otherwise —
  // replacing the sliders whose fills no longer lined up across rows (issue #76).
  _setpointControl(id, label) {
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    if (id.startsWith("select.")) return this._numberControl(id, label, "mdi:thermometer");
    const a = st.attributes;
    const min = Number(a.min ?? 0);
    const max = Number(a.max ?? 100);
    const step = Number(a.step ?? 1) || 1;
    if (Math.floor((max - min) / step) + 1 <= 16) return this._numberControl(id, label, "mdi:thermometer");
    return this._setpointStepper(id, label);
  }

  // A − / + stepper for a `number` or `water_heater` setpoint, built like the climate target: each tap moves the
  // value by one step on screen and the service is called once the taps stop (CA_TEMP_DEBOUNCE), the tapped value
  // held until the entity reports it.
  _setpointStepper(id, label, icon = "mdi:thermometer") {
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    const dhw = id.startsWith("water_heater.");
    const a = st.attributes;
    const value = this._spValue(id, Number(dhw ? a.temperature : st.state));
    if (!Number.isFinite(value)) return this._numberControl(id, label, icon);
    const unit = dhw ? this._unit() : a.unit_of_measurement || this._unit();
    return this._stepper("setstep", value, label, null, { unit, dataValue: (dir) => `${id}|${dir}` });
  }

  // The value a setpoint stepper shows: the tapped value while it waits to be reported, else the entity's own.
  _spValue(id, fallback) {
    return this._sp?.[id] ? this._sp[id].val : fallback;
  }

  // One tap: clamp to the entity's range, show it at once, call the service once the taps stop.
  _stepSetpoint(id, dir) {
    const st = this._st(id);
    if (!st || caUnavailable(st)) return;
    const dhw = id.startsWith("water_heater.");
    const a = st.attributes;
    const step = Number(dhw ? a.target_temp_step : a.step) || (this._unit() === "°F" ? 1 : 0.5);
    const min = Number((dhw ? a.min_temp : a.min) ?? (dhw ? 30 : 7));
    const max = Number((dhw ? a.max_temp : a.max) ?? (dhw ? 65 : 35));
    const cur = this._spValue(id, Number(dhw ? a.temperature : st.state));
    if (!Number.isFinite(cur)) return;
    const val = +Math.min(max, Math.max(min, Math.round((cur + dir * step) / step) * step)).toFixed(2);
    this._sp = { ...(this._sp || {}), [id]: { val, sent: false } };
    this._spTimers = this._spTimers || {};
    clearTimeout(this._spTimers[id]);
    this._update();
    this._spTimers[id] = setTimeout(() => this._sendSetpoint(id), CA_TEMP_DEBOUNCE);
  }

  async _sendSetpoint(id) {
    const p = this._sp?.[id];
    if (!p) return;
    const ok = id.startsWith("water_heater.")
      ? await this._call("water_heater", "set_temperature", { entity_id: id, temperature: p.val })
      : await this._call("number", "set_value", { entity_id: id, value: p.val });
    // Tapped again meanwhile: a newer value is the one waiting.
    if (this._sp?.[id] !== p) return;
    if (!ok) this._clearSetpoint(id);
    else p.sent = true;
    this._update();
  }

  _clearSetpoint(id) {
    if (!this._sp?.[id]) return;
    const { [id]: _drop, ...rest } = this._sp;
    this._sp = rest;
    clearTimeout(this._spTimers?.[id]);
  }

  // Once the entity reports a sent value, the entity's own value takes over again.
  _settleSetpoints() {
    if (!this._sp) return;
    for (const [id, p] of Object.entries(this._sp)) {
      if (!p.sent) continue;
      const st = this._st(id);
      if (!st) continue;
      const cur = id.startsWith("water_heater.") ? Number(st.attributes?.temperature) : Number(st.state);
      if (Number.isFinite(cur) && Math.abs(cur - p.val) < 1e-6) this._clearSetpoint(id);
    }
  }

  // The tapped setpoints join the redraw signature, so an optimistic tap redraws the card (CaCard._update).
  _extraSig() {
    return this._sp ? Object.entries(this._sp).flatMap(([id, p]) => [id, p.val]) : [];
  }

  _update() {
    this._settleSetpoints();
    super._update();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Detached mid-debounce: send any tap not yet sent, so it is not lost (resending a sent value is harmless).
    if (!this._sp) return;
    for (const [id, p] of Object.entries(this._sp)) {
      clearTimeout(this._spTimers?.[id]);
      if (!p.sent) this._sendSetpoint(id);
    }
  }

  _action(action, value) {
    const id = this._r.id;
    if (action === "setstep") {
      const i = value.lastIndexOf("|");
      this._stepSetpoint(value.slice(0, i), Number(value.slice(i + 1)));
    } else if (action === "hpmode") this._call("select", "select_option", { entity_id: id, option: value });
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
    // A metered pump has no room temperature to lead with: show its COP (its headline figure) instead.
    const lines = [m.metered ? (m.cop != null ? caLine("mdi:gauge", `${this._t("cop")} ${caFmtNum(this._intlLang(), m.cop, 1)}`) : "") : this._tempLine(m)].filter(Boolean);
    if (m.tank != null || m.dhwPct) {
      const txt = [m.tank != null ? this._temp(m.tank, 0) : null, m.dhwPct].filter(Boolean).join(" · ");
      lines.push(caLine("mdi:water-boiler", `${this._t("tank")} ${txt}`));
    }
    const out = this._config.show_sensors ? this._outdoorText() : null;
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
