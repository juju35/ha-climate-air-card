/*
 * climate-air-ventilation-card and its mini card: a ventilation unit (a fan entity) — a heat recovery unit with the
 * four air streams through its exchanger, or an extract unit — with its level, boost, bypass, filters and air quality.
 */

// The four air streams of a heat recovery unit, as the card and its illustration draw them: outdoor air in (cold,
// blue), supply air to the rooms (warmed), extract air from the rooms (warm, orange), exhaust air out.
const CA_VENT_STREAMS = ["air_outdoor_temp", "air_supply_temp", "air_extract_temp", "air_exhaust_temp"];
const CA_VENT_COLD = "#4c9be8";
const CA_VENT_WARM = "#f08c3a";

// The unit drawn front-on: a heat recovery unit with its four ducts on top (two cold, two warm), the cross-flow
// exchanger and the fan behind its grille; an extract unit with one duct in and one out. The air runs in the ducts
// while it runs, the fan turns.
const caVentDuct = (x, color, cls) =>
  `<rect x="${x - 4}" y="2" width="8" height="20" rx="1.5" fill="#dfe4ea" stroke="#b9c3cc" stroke-width=".8"/><path class="duct ${cls}" d="M${x} 21V3" stroke="${color}"/>`;
const CA_VENT_ARTS = {
  mvhr:
    '<svg viewBox="0 0 80 94" aria-hidden="true"><defs>' +
    '<linearGradient id="ca-vb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe5ea"/></linearGradient>' +
    '<radialGradient id="ca-vf" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".45"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient></defs>' +
    '<ellipse class="floor" cx="40" cy="80" rx="30" ry="3.5" fill="url(#ca-vf)"/>' +
    caVentDuct(14, CA_VENT_COLD, "in") +
    caVentDuct(27, CA_VENT_COLD, "out o2") +
    caVentDuct(53, CA_VENT_WARM, "in o3") +
    caVentDuct(66, CA_VENT_WARM, "out o4") +
    '<rect x="6" y="20" width="68" height="56" rx="6" fill="url(#ca-vb)" stroke="#b9c3cc" stroke-width="1.1"/>' +
    '<rect x="11" y="26" width="34" height="34" rx="3" fill="#eef2f5" stroke="#c9d1d8" stroke-width=".8"/>' +
    '<path d="M14 29l28 28M42 29l-28 28" stroke="#9fb3c4" stroke-width="1.4"/><path d="M14 43h28M28 29v28" stroke="#c9d1d8" stroke-width=".7"/>' +
    '<circle cx="60" cy="42" r="10.5" fill="#f6f8fa" stroke="#b9c3cc" stroke-width="1"/>' +
    '<g class="fanw"><path d="M60 42c1-4 4-7 7-6c1 3-3 5-7 6zM60 42c4 1 7 4 6 7c-3 1-5-3-6-7zM60 42c-1 4-4 7-7 6c-1-3 3-5 7-6zM60 42c-4-1-7-4-6-7c3-1 5 3 6 7z" fill="#90a4b6"/></g>' +
    '<circle cx="60" cy="42" r="1.8" fill="#6f8296"/>' +
    '<rect x="11" y="65" width="58" height="6" rx="2" fill="#e3e8ec"/><circle class="led" cx="64" cy="68" r="1.4"/>' +
    '<rect x="15" y="66.6" width="18" height="2.8" rx="1.4" fill="#cfd7de"/>' +
    "</svg>",
  extract:
    '<svg viewBox="0 0 80 94" aria-hidden="true"><defs>' +
    '<linearGradient id="ca-vb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe5ea"/></linearGradient>' +
    '<radialGradient id="ca-vf" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".45"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient></defs>' +
    '<ellipse class="floor" cx="40" cy="78" rx="26" ry="3.5" fill="url(#ca-vf)"/>' +
    caVentDuct(26, CA_VENT_WARM, "in") +
    caVentDuct(54, CA_VENT_WARM, "out o3") +
    '<rect x="14" y="20" width="52" height="54" rx="10" fill="url(#ca-vb)" stroke="#b9c3cc" stroke-width="1.1"/>' +
    '<circle cx="40" cy="44" r="15" fill="#f6f8fa" stroke="#b9c3cc" stroke-width="1"/>' +
    '<g class="fanw"><path d="M40 44c1.5-6 6-10 10-9c1.5 4-4 7.5-10 9zM40 44c6 1.5 10 6 9 10c-4 1.5-7.5-4-9-10zM40 44c-1.5 6-6 10-10 9c-1.5-4 4-7.5 10-9zM40 44c-6-1.5-10-6-9-10c4-1.5 7.5 4 9 10z" fill="#90a4b6"/></g>' +
    '<circle cx="40" cy="44" r="2.4" fill="#6f8296"/><circle class="led" cx="40" cy="67" r="1.4"/>' +
    "</svg>",
};

CA_ART.ventilation = {
  variants: ["mvhr", "extract"],
  // An extract unit says so (single flow, extract, Healthbox); everything else is drawn as a heat recovery unit.
  guess: (text) => (/(simple.?flux|single.?flow|extract.?unit|exhaust.?fan|healthbox|abluftger|\bvmc\b.*\b(hygro|autor[ée]glable)\b)/i.test(text) ? "extract" : "mvhr"),
  render: (variant, s) => ({
    svg: CA_VENT_ARTS[variant] || CA_VENT_ARTS.mvhr,
    cls: [s.running && s.boost ? "boost" : ""],
    style: `--ca-spin:${caSpin(s.pct)}s`,
  }),
  styles: `
    .k-ventilation .duct { fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-dasharray: 3 4; opacity: .35; }
    .k-ventilation .fanw { transform-box: fill-box; transform-origin: center; }
    .k-ventilation .led { fill: #9aa5b1; }
    .k-ventilation .c-stop { stop-color: var(--ca-color); }
    .k-ventilation .floor { opacity: 0; transition: opacity .6s; }
    .k-ventilation.running .floor { opacity: 1; }
    .k-ventilation.running .led { fill: var(--ca-color); }
    .k-ventilation.running .duct { opacity: 1; animation: ca-vent-down 1.1s linear infinite; }
    .k-ventilation.running .duct.out { animation-name: ca-vent-up; }
    .k-ventilation.running .fanw { animation: ca-spin var(--ca-spin, 1s) linear infinite; }
    .k-ventilation.running.boost .duct { animation-duration: .5s; }
    @keyframes ca-vent-down { to { stroke-dashoffset: -7; } }
    @keyframes ca-vent-up { to { stroke-dashoffset: 7; } }
  `,
};

class ClimateAirVentilationCard extends CaCard {
  static get kind() {
    return "ventilation";
  }

  // `levels`: a unit whose speeds are relay channels (switches), lowest first, with no fan entity. Level n means the
  // switches up to n on (`levels_mode: cumulative`, the default: each stage runs on top of the one below) or only the
  // n-th (`exclusive`: one channel per speed).
  _levelIds() {
    return [].concat(this._config.levels || []).filter((x) => typeof x === "string" && x);
  }

  _exclusive() {
    return this._config.levels_mode === "exclusive";
  }

  // The level the switches say: the highest one on (0 when they are all off).
  _level() {
    return this._levelIds().reduce((n, id, i) => (this._val(id) === "on" ? i + 1 : n), 0);
  }

  _entity() {
    return this._config.entity || this._levelIds()[0] || super._entity();
  }

  _extraIds() {
    return this._levelIds();
  }

  // Sets level n (0: every switch off). Switches go off before others come on, so two exclusive channels never run
  // together and a cumulative stage never runs without the ones below it.
  _setLevel(n) {
    const ids = this._levelIds();
    const want = (i) => (this._exclusive() ? i === n - 1 : i < n);
    const sw = (id, on) => this._call(id.split(".")[0], on ? "turn_on" : "turn_off", { entity_id: id });
    for (let i = ids.length - 1; i >= 0; i--) if (!want(i) && this._val(ids[i]) !== "off") sw(ids[i], false);
    ids.forEach((id, i) => {
      if (want(i) && this._val(id) !== "on") sw(id, true);
    });
  }

  _roles() {
    return [...CA_VENT_STREAMS, "bypass", "efficiency", "airflow", "co2", "humidity", "power", "filter", "filter_days", "filter_alert", "filter_reset", "boost"];
  }

  // The filter's life is a percentage: a filter sensor in days (ComfoConnect's days remaining) is its days left instead.
  _resolve() {
    const r = super._resolve();
    const unit = this._st(r.ent.filter)?.attributes.unit_of_measurement;
    if (r.ent.filter && unit !== "%") {
      if (!r.ent.filter_days) r.ent.filter_days = r.ent.filter;
      r.ent.filter = undefined;
    }
    return r;
  }

  _model(r) {
    const { ent } = r;
    const { state, attributes: a } = this._st(r.id);
    const levels = this._levelIds().length;
    const level = levels ? this._level() : null;
    const on = levels ? level > 0 : state === "on";
    const [pct, preset] = !on ? [0, null] : levels ? [(level / levels) * 100, null] : [Number(a.percentage ?? 0), a.preset_mode];
    const t = { o: this._num(ent.air_outdoor_temp), s: this._num(ent.air_supply_temp), e: this._num(ent.air_extract_temp), x: this._num(ent.air_exhaust_temp) };
    const bypass = ent.bypass ? caVentBypass(this._st(ent.bypass)) : null;
    // With the bypass open the air goes round the exchanger: no heat is recovered, so none is shown.
    const eff = on && !bypass ? caVentEfficiency(this._num(ent.efficiency), t) : null;
    const boostSt = this._st(ent.boost);
    const boost = on && (/boost|turbo|intensiv|party|max/i.test(preset || "") || (boostSt?.entity_id.startsWith("switch.") && boostSt.state === "on"));
    const filter = this._filterState(ent);
    const chips = [];
    if (boost) chips.push(this._chip("mdi:fan-plus", this._t("boost"), "tint", "", ent.boost || r.id));
    // The bypass as a chip when the air streams (which say it) are not drawn.
    const drawn = [t.o, t.s, t.e, t.x].filter((v) => v != null).length >= 2;
    if (bypass != null && !drawn) chips.push(this._chip(bypass ? "mdi:valve-open" : "mdi:valve-closed", this._t(bypass ? "bypass_open" : "bypass_closed"), bypass ? "tint" : "", "", ent.bypass));
    chips.push(this._filterChip(filter));
    return {
      state: on ? "on" : "off",
      running: on,
      color: on ? CA_FAN_COLOR : CA_IDLE,
      statusText: on ? (boost ? this._t("boost") : this._t("st_on")) : this._t("st_off"),
      sub: preset ? this._fmtAttr(r.id, "preset_mode", preset) : "",
      pct,
      level,
      levels,
      preset,
      boost,
      temps: t,
      eff,
      bypass,
      airflow: this._fmtSensor(ent.airflow),
      filter,
      chips: chips.filter(Boolean),
      showSensors: this._config.show_sensors,
    };
  }

  _subInBody(m) {
    return m.running;
  }

  // The heat recovered in big (its efficiency), else the airflow, else the speed; the level and the airflow under it.
  _heroInfo(m) {
    if (!m.running) return `<div class="big"><span class="state-big">${caEsc(m.statusText)}</span></div>`;
    const lang = this._intlLang();
    const level = [m.sub, this._levelText(m)].filter(Boolean).join(" · ");
    if (m.eff != null) {
      const under = [this._t("heat_recovered"), m.airflow].filter(Boolean).join(" · ");
      return `<div class="big"><span class="val">${caFmtNum(lang, m.eff, 0)}<small> %</small></span><span class="lbl">${caEsc(under)}</span></div>${caLine("mdi:fan", level)}`;
    }
    if (m.airflow) return `<div class="big"><span class="val">${caEsc(m.airflow.replace(/\s+\S+$/, ""))}<small> ${caEsc(m.airflow.split(/\s+/).pop())}</small></span><span class="lbl">${caEsc(this._t("airflow"))}</span></div>${caLine("mdi:fan", level)}`;
    // Levels made of switches: the level (of how many) instead of a percentage.
    if (m.levels) return `<div class="big"><span class="val">${m.level}<small> / ${m.levels}</small></span><span class="lbl">${caEsc(this._t("speed"))}</span></div>`;
    return `<div class="big"><span class="val">${Math.round(m.pct)}<small> %</small></span><span class="lbl">${caEsc(m.sub || m.statusText)}</span></div>`;
  }

  // The level as words: "Level 2" with switches, else the speed in %.
  _levelText(m) {
    return m.levels ? this._t("level", { n: m.level }) : `${Math.round(m.pct)} %`;
  }

  // The four air streams through the exchanger: outdoor air in and supply air out on the cold side's top line, extract
  // air in and exhaust air out on the warm side's, each with its temperature, the bypass under the exchanger.
  _streams(m) {
    const t = m.temps;
    const known = [t.o, t.s, t.e, t.x].filter((v) => v != null).length;
    if (known < 2) return "";
    const lang = this._intlLang();
    const ent = this._r.ent;
    const temp = (v) => (v == null ? "—" : `${caFmtNum(lang, v)}°`);
    const cell = (role, label, v, cls) =>
      `<div class="vs ${cls}"${ent[role] ? ` data-more-info="${caEsc(ent[role])}" role="button" tabindex="0"` : ""}><span class="vl">${caEsc(label)}</span><span class="vv">${caEsc(temp(v))}</span></div>`;
    const flow = `${m.running ? " flowing" : ""}${m.bypass ? " bypassed" : ""}`;
    const bypass = m.bypass == null ? "" : `<div class="vby">${caEsc(this._t(m.bypass ? "bypass_open" : "bypass_closed"))}</div>`;
    return (
      `<div class="vent${flow}">` +
      cell("air_outdoor_temp", this._t("air_outdoor"), t.o, "c tl") +
      `<svg class="vx" viewBox="0 0 120 64" aria-hidden="true"><rect x="40" y="6" width="40" height="52" rx="6" class="ex"/><path d="M44 10l32 44M76 10l-32 44" class="exl"/>` +
      `<path class="st cold" d="M0 18H40"/><path class="st warm" d="M80 18H120"/><path class="st warm2" d="M120 46H80"/><path class="st cold2" d="M40 46H0"/></svg>` +
      cell("air_supply_temp", this._t("air_supply"), t.s, "w tr") +
      cell("air_exhaust_temp", this._t("air_exhaust"), t.x, "c2 bl") +
      bypass +
      cell("air_extract_temp", this._t("air_extract"), t.e, "w2 br") +
      "</div>"
    );
  }

  _controls(m) {
    const r = this._r;
    const ent = r.ent;
    const st = this._st(r.id);
    const a = st.attributes;
    const f = a.supported_features || 0;
    const on = st.state === "on";
    let level = "";
    if (f & CA_FAN_PRESET && (a.preset_modes || []).length >= 2) {
      level = this._segments("preset", a.preset_modes, a.preset_mode, (o) => this._fmtAttr(r.id, "preset_mode", o), CA_PRESET_ICON);
    }
    // A unit of a few levels (speed_count 2 to 5): a button per level; else the speed slider.
    const count = Number(a.speed_count) || 0;
    const ids = this._levelIds();
    if (ids.length >= 2) {
      if (m.running) {
        const opts = ids.map((_, i) => String(i + 1));
        level += this._segments("switch-level", opts, String(m.level), (o) => this._t("level", { n: o }), null);
      }
    } else if (f & CA_FAN_SET_SPEED && on) {
      if (count >= 2 && count <= 5) {
        const step = 100 / count;
        const opts = Array.from({ length: count }, (_, i) => String(Math.round((i + 1) * step)));
        const cur = String(Math.round(Math.ceil(Math.round(Number(a.percentage ?? 0)) / step - 0.01) * step));
        level += this._segments("level", opts, cur, (o) => this._t("level", { n: Math.round(Number(o) / step) }), null);
      } else level += this._speedSlider(r.id);
    }
    const streams = this._streams(m);
    const sensors = m.showSensors ? this._sensorChips(ent, ["co2", "humidity", "airflow", "power"]) : [];
    const filter = this._filterLine(m.filter);
    const days = this._fmtSensor(ent.filter_days);
    const filterDays = days && this._config.show_filter ? caLine("mdi:calendar-clock", `${this._t("filter")}${this._t("colon")}${days}`) : "";
    const boostSt = this._st(ent.boost);
    const boost = boostSt
      ? ent.boost.startsWith("button.")
        ? `<button class="toggle" data-press="${caEsc(ent.boost)}"${this._avail(ent.boost) ? "" : " disabled"}><ha-icon icon="mdi:fan-plus"></ha-icon>${caEsc(this._t("boost"))}</button>`
        : this._toggle(ent.boost, this._t("boost"), "mdi:fan-plus")
      : "";
    const toggles = this._toggles([boost, this._filterResetButton(m.filter, ent.filter_reset)]);
    return (
      this._section(this._t("air_flows"), streams, "mdi:swap-horizontal") +
      this._section("", level) +
      this._section("", (sensors.length ? `<div class="chips">${sensors.join("")}</div>` : "") + filter + filterDays) +
      this._options(toggles)
    );
  }

  // A preset or a level for the fan entity; anything else (power, filter reset) as every card does.
  _action(action, value) {
    if (this._levelIds().length && (action === "switch-level" || action === "power")) {
      this._setLevel(action === "power" ? (this._level() ? 0 : 1) : Number(value));
      return;
    }
    const call = { preset: ["set_preset_mode", { preset_mode: value }], level: ["set_percentage", { percentage: Number(value) }] }[action];
    if (call) this._call("fan", call[0], { entity_id: this._r.id, ...call[1] });
    else super._action(action, value);
  }

  _miniInfo(m) {
    const lines = m.running ? [caBar(m.pct, this._levelText(m), "mdi:fan")] : [];
    if (m.running && m.eff != null) lines.push(caLine("mdi:swap-horizontal", `${this._t("heat_recovered")} ${caFmtNum(this._intlLang(), m.eff, 0)} %`));
    const t = m.temps;
    if (t.s != null || t.o != null) {
      const lang = this._intlLang();
      lines.push(caLine("mdi:thermometer", [t.o != null ? `${this._t("air_outdoor")} ${caFmtNum(lang, t.o)}°` : "", t.s != null ? `${this._t("air_supply")} ${caFmtNum(lang, t.s)}°` : ""].filter(Boolean).join(" · ")));
    }
    return lines.join("");
  }

  _miniButtons(m) {
    const id = this._r.ent.boost;
    if (!m.running || !id || !this._st(id)) return [];
    const label = caEsc(this._t("boost"));
    const data = id.startsWith("button.") ? `data-press="${caEsc(id)}"` : `data-toggle="${caEsc(id)}"`;
    return [`<button class="round${m.boost ? " on" : ""}" ${data} title="${label}" aria-label="${label}" aria-pressed="${!!m.boost}"><ha-icon icon="mdi:fan-plus"></ha-icon></button>`];
  }

  static styles = `
    .vent { display: grid; grid-template-columns: minmax(0, 1fr) minmax(90px, 1.3fr) minmax(0, 1fr); grid-template-rows: auto auto; align-items: center; gap: 2px 6px; }
    .vent .vx { grid-column: 2; grid-row: 1 / span 2; width: 100%; height: auto; display: block; }
    .vent .tl { grid-column: 1; grid-row: 1; } .vent .tr { grid-column: 3; grid-row: 1; text-align: right; }
    .vent .bl { grid-column: 1; grid-row: 2; } .vent .br { grid-column: 3; grid-row: 2; text-align: right; }
    .vent .vby { grid-column: 2; grid-row: 3; text-align: center; font-size: 11px; color: var(--secondary-text-color); }
    .vs { display: flex; flex-direction: column; min-width: 0; cursor: pointer; }
    .vs .vl { font-size: 12px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .vs .vv { font-size: 17px; font-weight: 500; }
    .vs.c .vv, .vs.c2 .vv { color: color-mix(in srgb, ${CA_VENT_COLD} 70%, var(--primary-text-color)); }
    .vs.w .vv, .vs.w2 .vv { color: color-mix(in srgb, ${CA_VENT_WARM} 70%, var(--primary-text-color)); }
    .vx .ex { fill: var(--secondary-background-color, rgba(127,127,127,.1)); }
    .vx .exl { stroke: var(--divider-color, rgba(127,127,127,.35)); stroke-width: 1.4; fill: none; }
    .vx .st { fill: none; stroke-width: 5; stroke-linecap: round; stroke-dasharray: 6 5; }
    .vx .cold { stroke: ${CA_VENT_COLD}; } .vx .cold2 { stroke: ${CA_VENT_COLD}; opacity: .55; }
    .vx .warm { stroke: ${CA_VENT_WARM}; opacity: .7; } .vx .warm2 { stroke: ${CA_VENT_WARM}; }
    .vent.flowing .st { animation: ca-vent-flow 1.2s linear infinite; }
    .vent.bypassed .ex, .vent.bypassed .exl { opacity: .4; }
    @keyframes ca-vent-flow { to { stroke-dashoffset: -11; } }
    @media (prefers-reduced-motion: reduce) { .vent .st { animation: none !important; } }
  `;
}

class ClimateAirVentilationMiniCard extends caMini(ClimateAirVentilationCard) {}

caRegister("climate-air-ventilation-card", ClimateAirVentilationCard, "Climate Air · Ventilation Card", "Ventilation unit: the four air streams of its heat exchanger, level, boost, bypass and filters");
caRegister("climate-air-ventilation-mini-card", ClimateAirVentilationMiniCard, "Climate Air · Ventilation Mini Card", "Compact ventilation card that unfolds into the full card");
