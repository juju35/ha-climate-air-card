/*
 * climate-air-overview-card — every air conditioner, air purifier and fan of the instance at a glance, one tile each,
 * like room-overview-card (ha-room-card). The detail button shows every device; tap a tile to unfold its full card,
 * tap its icon to turn it on or off.
 */
const CA_KINDS = ["aircon", "purifier", "fan"];
const CA_AC_ICON_ANIM = { cool: "twirl", heat: "flicker", dry: "bob", fan_only: "spin", auto: "breathe", heat_cool: "breathe" };

class ClimateAirOverviewCard extends CaElement {
  static getConfigElement() {
    return document.createElement("climate-air-overview-card-editor");
  }

  static getStubConfig() {
    return {};
  }

  constructor() {
    super();
    // A click anywhere else folds the open device back and returns to the devices that are on.
    this._onOutside = (ev) => {
      if (ev.composedPath().includes(this) || caInDialog(ev)) return;
      if (this._open || this._zoomed) {
        this._open = null;
        this._zoomed = false;
        this._render();
      }
    };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = { zoom: true, group_by: "type", exclude: [], include: [], devices: [], ...config };
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.addEventListener("click", (ev) => this._onClick(ev));
      this.shadowRoot.addEventListener("keydown", (ev) => {
        const tile = ev.target.closest?.(".dev");
        if (tile && ev.target === tile && (ev.key === "Enter" || ev.key === " ")) {
          ev.preventDefault();
          this._tap(tile.dataset.id);
        }
      });
    }
    this._sig = null;
    this._detail = null;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
    if (this._detail) this._detail.hass = hass;
  }

  connectedCallback() {
    document.addEventListener("click", this._onOutside, true);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this._onOutside, true);
  }

  getCardSize() {
    return 1 + Math.ceil((this._items?.length || 1) / 2);
  }

  // ── Data ───────────────────────────────────────────────────────────────────
  _collect() {
    const h = this._hass;
    const c = this._config;
    const over = Object.fromEntries((c.devices || []).filter((d) => d?.entity).map((d) => [d.entity, d]));
    const exclude = new Set(c.exclude || []);
    const kinds = new Map();
    for (const kind of CA_KINDS) for (const id of caFindEntities(h, kind)) kinds.set(id, kind);
    // Added by hand: a heat-only thermostat is shown as an air conditioner, any other fan entity as a fan.
    for (const id of c.include || []) {
      if (!h.states[id] || kinds.has(id)) continue;
      kinds.set(id, caKindOf(h, id) || (id.startsWith("climate.") ? "aircon" : "fan"));
    }
    for (const [id, o] of Object.entries(over)) if (CA_KINDS.includes(o.type) && h.states[id]) kinds.set(id, o.type);
    return [...kinds]
      .filter(([id]) => !exclude.has(id))
      .map(([id, kind]) => this._item(id, kind, over[id] || {}, c.icons || {}, c.illustrations || {}))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  _role(id, role) {
    return caRoleOf(this._hass, id, role);
  }

  // Each tile shows the device's illustration, animated while it runs, in the variant set in `illustrations` (by entity
  // ID or by kind of device) or guessed from the device. An icon set in `icons` (same keys) replaces the illustration.
  _item(id, kind, o, icons, illustrations) {
    const h = this._hass;
    const lang = this._lang();
    const st = h.states[id];
    const a = st.attributes;
    // Every state object the tile reads, collected for the render signature (`sts`).
    const used = [st];
    const roleSt = (role) => {
      const s = h.states[this._role(id, role)];
      if (s) used.push(s);
      return s;
    };
    const item = {
      id,
      kind,
      sts: used,
      name: o.name || caName(h, id),
      named: !!o.name,
      area: caAreaName(h, id),
      areaIcon: caAreaIcon(h, id),
      icon: o.icon || icons[id] || icons[kind] || CA_KIND_ICONS[kind],
      iconSet: !!(o.icon || icons[id] || icons[kind]),
      variant: caVariant(h, kind, id, o.illustration || illustrations[id] || illustrations[kind]),
      art: { running: false, state: "off" },
      on: false,
      alert: "",
      anim: "",
      spin: null,
      color: CA_IDLE,
    };
    if (caUnavailable(st)) {
      item.na = true;
      item.text = this._t("st_unavailable");
      return item;
    }
    const fmtAttr = (attr, v) => caValueLabel(lang, v, h.formatEntityAttributeValue?.(st, attr, v));
    if (kind === "aircon") {
      item.on = st.state !== "off";
      const mode = st.state;
      const cur = a.current_temperature != null ? Number(a.current_temperature) : null;
      const unit = h.config?.unit_system?.temperature || "°C";
      const temp = (v) => `${caFmtNum(lang, v)} ${unit}`;
      if (item.on) {
        const label = caValueLabel(lang, mode, h.formatEntityState?.(st));
        const target = a.temperature != null && mode !== "fan_only" ? temp(Number(a.temperature)) : "";
        item.text = [label, target].filter(Boolean).join(" · ");
        item.color = CA_MODE_COLORS[mode] || CA_FAN_COLOR;
        // A running air conditioner shows its mode, unless an icon was set for it.
        item.icon = o.icon || icons[id] || icons[kind] || CA_MODE_ICONS[mode] || item.icon;
        item.anim = CA_AC_ICON_ANIM[mode] || "breathe";
        if (item.anim === "spin") item.spin = caSpin(50);
        const freq = caNum(roleSt("compressor"));
        const action = a.hvac_action;
        item.art = {
          running: true,
          state: mode,
          mode,
          swing: a.swing_mode,
          active: freq != null ? freq > 0 : action ? !["idle", "off"].includes(action) : true,
          display: a.temperature != null && mode !== "fan_only" ? `${caFmtNum(lang, Number(a.temperature))}°` : "--",
        };
      } else {
        item.text = [this._t("st_off"), cur != null ? temp(cur) : ""].filter(Boolean).join(" · ");
      }
      if (this._config.show_alerts !== false && roleSt("filter_alert")?.state === "on") item.alert = this._t("filter_dirty");
    } else {
      item.on = st.state === "on";
      const pct = item.on ? Number(a.percentage ?? 0) : 0;
      const preset = item.on && a.preset_mode ? fmtAttr("preset_mode", a.preset_mode) : "";
      if (kind === "purifier") {
        const pm25 = caNum(roleSt("pm25"));
        const aqi = caNum(roleSt("aqi"));
        const aq = caAirQuality(pm25, aqi);
        const quality = pm25 != null ? `PM2.5 ${caFmtNum(lang, pm25, 0)}` : aqi != null ? `AQI ${caFmtNum(lang, aqi, 0)}` : "";
        item.text = item.on ? [quality || this._t("st_purifying"), aq ? this._t(`aq_${aq.key}`) : ""].filter(Boolean).join(" · ") : [this._t("st_off"), quality].filter(Boolean).join(" · ");
        item.color = item.on ? aq?.color || CA_FAN_COLOR : CA_IDLE;
        item.anim = item.on ? "pulse" : "";
        item.art = {
          running: item.on,
          pct,
          aqColor: aq?.color || CA_FAN_COLOR,
          display: pm25 != null ? caFmtNum(lang, pm25, 0) : aqi != null ? caFmtNum(lang, aqi, 0) : "",
        };
        const filter = caNum(roleSt("filter"));
        if (this._config.show_alerts !== false && filter != null && filter <= 10) item.alert = this._t("filter_low");
      } else {
        item.text = item.on ? [`${Math.round(pct)} %`, preset].filter(Boolean).join(" · ") : this._t("st_off");
        item.color = item.on ? CA_FAN_COLOR : CA_IDLE;
        item.anim = item.on ? "spin" : "";
        item.spin = caSpin(pct);
        item.art = { running: item.on, pct, osc: !!a.oscillating, natural: /natur/i.test(a.preset_mode || "") };
      }
    }
    return item;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  _render() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    const c = this._config;
    const all = this._collect();
    const compact = c.zoom !== false && !this._zoomed;
    const shown = compact ? all.filter((x) => x.on || x.alert || x.id === this._open) : all;
    this._items = shown;
    // Home Assistant replaces a `states[id]` object whenever the entity changes, and the registry objects when the
    // registry does: comparing those references covers everything the tiles show, with nothing serialized.
    const h = this._hass;
    const sig = [this._lang(), this._open, this._zoomed, c, h.entities, h.devices, h.areas, h.config, ...all.flatMap((x) => [x.id, ...x.sts])];
    if (this._sig && sig.length === this._sig.length && sig.every((v, i) => v === this._sig[i])) return;
    this._sig = sig;

    if (!this.shadowRoot.querySelector("ha-card")) {
      const art = CA_KINDS.map((k) => CA_ART[k]?.styles || "").join("");
      this.shadowRoot.innerHTML = `<style>${CA_ART_STYLES}${art}${CA_OVERVIEW_STYLES}</style><ha-card><div class="head"></div><div class="panel" hidden></div><div class="body"></div></ha-card>`;
    }
    const card = this.shadowRoot.querySelector("ha-card");
    const on = all.filter((x) => x.on);
    const alerts = all.filter((x) => x.alert).length;
    card.className = alerts ? "lvl-warn" : on.length ? "lvl-on" : "lvl-ok";
    const alertChip = alerts ? `<span class="chip warn" title="${caEsc(this._t("filter"))}"><ha-icon icon="mdi:air-filter"></ha-icon><span>${alerts}</span></span>` : "";
    const zoom =
      c.zoom === false
        ? ""
        : `<button class="zoom" data-action="zoom" title="${caEsc(this._t(this._zoomed ? "zoom_out" : "zoom_in"))}" aria-label="${caEsc(this._t(this._zoomed ? "zoom_out" : "zoom_in"))}"><ha-icon icon="${this._zoomed ? "mdi:arrow-collapse" : "mdi:arrow-expand"}"></ha-icon></button>`;
    card.querySelector(".head").innerHTML =
      `<div class="badge"><ha-icon icon="${caEsc(c.icon || "mdi:air-filter")}"></ha-icon></div><div class="title">${caEsc(c.title || this._t("title"))}</div>` +
      `${alertChip}<div class="pill">${caEsc(on.length ? this._t("running_n", { n: on.length }) : this._t("all_off"))}</div>${zoom}`;

    const body = card.querySelector(".body");
    const cols = c.columns || 2;
    body.style.setProperty("--cols", cols);
    body.classList.toggle("fixed", !!c.columns);
    body.classList.toggle("packed", !!shown.length);
    if (!all.length) body.innerHTML = `<div class="empty">${caEsc(this._t("no_devices"))}</div>`;
    else if (!shown.length) body.innerHTML = `<div class="empty">${caEsc(this._t("nothing_on"))}</div>`;
    // Each group takes as many columns as it has devices, so small groups sit side by side instead of leaving half a row empty.
    else
      body.innerHTML = this._groups(shown)
        .map(
          ([title, items]) =>
            `<div class="grp" style="--span:${Math.min(items.length, cols)}">${title ? `<div class="group"><ha-icon icon="${caEsc(this._groupIcon(items[0]))}"></ha-icon><span>${caEsc(title)}</span></div>` : ""}` +
            `<div class="grid">${items.map((x) => this._tile(x, `${x.kind}-${all.indexOf(x)}`)).join("")}</div></div>`,
        )
        .join("");

    this._fillPanel(all.find((x) => x.id === this._open));
  }

  // The icon in front of a group heading: the kind of device, or the area's own icon from the registry.
  _groupIcon(x) {
    return this._config.group_by === "area" ? (x.area ? x.areaIcon || "mdi:texture-box" : "mdi:help-circle-outline") : CA_KIND_ICONS[x.kind];
  }

  _groups(items) {
    const by = this._config.group_by;
    if (by === "type") return CA_KINDS.map((k) => [this._t(`g_${k}`), items.filter((x) => x.kind === k)]).filter(([, l]) => l.length);
    if (by === "area") {
      const areas = [...new Set(items.map((x) => x.area))].sort((a, b) => (!a ? 1 : !b ? -1 : a.localeCompare(b)));
      // Tiles labelled by kind of device, in a fixed order within the room.
      return areas.map((a) => [a || this._t("no_area"), items.filter((x) => x.area === a).sort((p, q) => CA_KINDS.indexOf(p.kind) - CA_KINDS.indexOf(q.kind))]);
    }
    return [["", items]];
  }

  _tile(x, i) {
    const cls = ["dev", x.on ? "on" : "", x.na ? "na" : "", x.alert ? "alert" : "", x.id === this._open ? "sel" : ""].filter(Boolean).join(" ");
    const style = `--t:${x.color};--ca-color:${x.color};${x.spin ? `--ca-spin:${x.spin}s;` : ""}`;
    const look = x.iconSet ? `<ha-icon icon="${caEsc(x.icon)}"></ha-icon>` : caPicture(x.kind, x.variant, x.art, String(i));
    // Grouped by area, the heading already names the room, so the tile shows the kind of device instead of repeating
    // it — unless a name was set for the device in `devices`.
    const label = this._config.group_by === "area" && !x.named ? this._t(x.kind) : x.name;
    return (
      `<div class="${cls}" role="button" tabindex="0" data-id="${caEsc(x.id)}" style="${style}" title="${caEsc(`${x.name} — ${x.text}`)}">` +
      `<button class="ic ${x.iconSet ? x.anim : "pic"}" data-toggle="${caEsc(x.id)}" title="${caEsc(this._t("toggle"))}" aria-label="${caEsc(`${this._t("toggle")} ${x.name}`)}"${x.na ? " disabled" : ""}>${look}</button>` +
      `<span class="name">${caEsc(label)}</span>` +
      `<span class="state">${caEsc(x.text)}</span>` +
      (x.alert ? `<span class="chips"><span class="chip warn"><ha-icon icon="mdi:air-filter"></ha-icon><span>${caEsc(x.alert)}</span></span></span>` : "") +
      "</div>"
    );
  }

  _onClick(ev) {
    const path = ev.composedPath();
    if (path.some((n) => n.classList?.contains("panel"))) return;
    const zoom = path.find((n) => n.dataset?.action === "zoom");
    if (zoom) {
      this._zoomed = !this._zoomed;
      this._render();
      if (ev.detail === 0) this.shadowRoot.querySelector(".zoom")?.focus();
      return;
    }
    const toggle = path.find((n) => n.dataset?.toggle);
    if (toggle) {
      if (!toggle.disabled) this._toggleDevice(toggle.dataset.toggle);
      return;
    }
    const tile = path.find((n) => n.classList?.contains("dev"));
    if (tile) this._tap(tile.dataset.id);
  }

  _toggleDevice(id) {
    const st = this._hass.states[id];
    if (!st) return;
    const domain = id.split(".")[0];
    Promise.resolve(this._hass.callService(domain, st.state === "off" ? "turn_on" : "turn_off", { entity_id: id })).catch(() => {});
  }

  _tap(id) {
    this._open = this._open === id ? null : id;
    this._render();
  }

  // The full card of the open device, built once and kept while it stays open.
  _fillPanel(item) {
    const panel = this.shadowRoot.querySelector(".panel");
    if (!item) {
      panel.hidden = true;
      panel.innerHTML = "";
      this._detail = null;
      return;
    }
    panel.hidden = false;
    if (this._detail?._caId === item.id) return;
    const tag = `climate-air-${item.kind}-card`;
    panel.innerHTML = "";
    this._detail = null;
    if (!customElements.get(tag)) return;
    const el = document.createElement(tag);
    el._caId = item.id;
    el.setConfig({
      type: `custom:${tag}`,
      entity: item.id,
      ...(item.variant ? { illustration: item.variant } : {}),
      ...(this._config.language ? { language: this._config.language } : {}),
    });
    el.hass = this._hass;
    panel.appendChild(el);
    this._detail = el;
  }
}

const CA_OVERVIEW_STYLES = `
  :host { display: block; --ca-ok: var(--success-color, #43a047); --ca-warn: var(--warning-color, #ffa600); --ca-on: var(--info-color, #039be5);
          --ca-idle: var(--secondary-text-color, #9e9e9e); }
  ha-card { padding: 12px; overflow: hidden; container-type: inline-size; position: relative; }
  ha-card.lvl-ok { --c: var(--ca-idle); }
  ha-card.lvl-on { --c: var(--ca-on); }
  ha-card.lvl-warn { --c: var(--ca-warn); }
  .head { display: flex; align-items: center; gap: 8px; }
  .badge { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center;
           background: color-mix(in srgb, var(--c) 16%, transparent); color: var(--c); }
  .badge ha-icon { --mdc-icon-size: 24px; }
  .title { flex: 1; min-width: 0; font-size: 16px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pill { flex: none; display: inline-flex; align-items: center; font-size: 11px; font-weight: 500; padding: 1px 8px; border-radius: 999px;
          color: var(--c); background: color-mix(in srgb, var(--c) 14%, transparent); white-space: nowrap; }
  .chip { --k: var(--ca-idle); flex: none; display: inline-flex; align-items: center; gap: 2px; height: 18px; padding: 0 5px; border-radius: 999px;
          font-size: 11px; font-weight: 500; line-height: 1; white-space: nowrap; color: var(--k); background: color-mix(in srgb, var(--k) 14%, transparent); }
  .head .chip { height: 20px; padding: 0 6px; }
  .chip ha-icon { --mdc-icon-size: 12px; }
  .chip.on { --k: var(--ca-on); }
  .chip.warn { --k: var(--ca-warn); }
  @container (max-width: 340px) { .head { gap: 6px; } .head .chip { display: none; } }
  .zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%;
          display: grid; place-items: center; color: var(--secondary-text-color); }
  .zoom ha-icon { --mdc-icon-size: 16px; }
  .zoom:hover { background: color-mix(in srgb, var(--ca-idle) 16%, transparent); color: var(--primary-text-color); }
  .zoom:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }

  .body.packed { display: grid; grid-template-columns: repeat(var(--cols, 2), minmax(0, 1fr)); grid-auto-flow: row dense; gap: 2px 6px; margin-top: 2px; }
  .grp { grid-column: span var(--span, 1); min-width: 0; }
  .group { display: flex; align-items: center; gap: 6px; margin: 6px 0 0; font-size: 12px; font-weight: 500; text-transform: uppercase;
           letter-spacing: .04em; color: var(--secondary-text-color); min-width: 0; }
  .group ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
  .group span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .grid { display: grid; grid-template-columns: repeat(var(--span, 1), minmax(0, 1fr)); gap: 6px; margin-top: 4px; }
  @container (max-width: 340px) { .body.packed:not(.fixed) { grid-template-columns: minmax(0, 1fr); }
    .body:not(.fixed) .grp { grid-column: auto; } .body:not(.fixed) .grid { grid-template-columns: minmax(0, 1fr); } }
  .empty { padding: 12px; margin-top: 8px; text-align: center; font-size: 13px; color: var(--secondary-text-color);
           border-radius: 10px; background: var(--secondary-background-color, transparent); }

  .dev { --t: var(--ca-idle); box-sizing: border-box; cursor: pointer; min-width: 0; display: grid; grid-template-columns: 28px minmax(0, 1fr);
         grid-template-areas: "ic name" "ic state"; column-gap: 7px; align-items: center; align-content: center;
         padding: 6px 7px; border-radius: 10px; background: var(--secondary-background-color, transparent); border: 1px solid transparent;
         transition: background .2s, border-color .2s; outline: none; }
  .dev.on { background: color-mix(in srgb, var(--t) 9%, var(--secondary-background-color, transparent)); border-color: color-mix(in srgb, var(--t) 24%, transparent); }
  .dev:has(.chips) { grid-template-areas: "ic name" "ic state" "ic chips"; }
  .dev.alert { border-color: color-mix(in srgb, var(--ca-warn) 45%, transparent); }
  .dev.na { opacity: .6; }
  .dev:hover { background: color-mix(in srgb, var(--t) 14%, var(--secondary-background-color, transparent)); }
  .dev:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
  .dev.sel { border-color: color-mix(in srgb, var(--primary-color) 60%, transparent); }
  .ic { all: unset; grid-area: ic; align-self: center; cursor: pointer; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center;
        color: var(--primary-text-color); background: color-mix(in srgb, var(--ca-idle) 14%, transparent); transition: background .2s, color .2s; }
  .dev.on .ic { color: var(--t); background: color-mix(in srgb, var(--t) 18%, transparent); }
  .ic:hover { box-shadow: 0 0 0 2px color-mix(in srgb, var(--t) 35%, transparent); }
  .ic:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }
  .ic:disabled { cursor: default; }
  .ic ha-icon { --mdc-icon-size: 16px; display: flex; }
  .dev:has(.ic.pic) { grid-template-columns: 40px minmax(0, 1fr); padding: 5px 7px 5px 5px; }
  .ic.pic { width: 40px; height: 46px; border-radius: 8px; background: none; grid-row: 1 / -1; overflow: visible; }
  .dev.on .ic.pic, .ic.pic:hover { background: none; box-shadow: none; }
  .ic.pic:hover .picture { transform: scale(1.06); }
  .ic.pic .picture { width: 40px; height: 46px; transition: transform .2s; }
  .ic.pic .picture svg { filter: drop-shadow(0 1.5px 3px rgba(0,0,0,.2)); }
  .dev:not(.on) .ic.pic .picture { opacity: .8; }
  .ic.spin ha-icon { animation: ca-spin var(--ca-spin, 1s) linear infinite; }
  .ic.twirl ha-icon { animation: ca-spin 6s linear infinite; }
  .ic.flicker ha-icon { animation: ca-flicker 1.4s ease-in-out infinite; transform-origin: 50% 90%; }
  .ic.bob ha-icon { animation: ca-bob 1.8s ease-in-out infinite; }
  .ic.breathe ha-icon { animation: ca-breathe 2.4s ease-in-out infinite; }
  .ic.pulse { animation: ca-ring 2.2s ease-out infinite; }
  .name { grid-area: name; font-size: 13px; font-weight: 500; line-height: 1.2; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .state { grid-area: state; margin-top: 1px; font-size: 11px; line-height: 1.25; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dev.on .state { color: var(--t); }
  .chips { grid-area: chips; display: flex; flex-wrap: wrap; gap: 3px; margin-top: 2px; min-width: 0; }
  .chips .chip { max-width: 100%; overflow: hidden; text-overflow: ellipsis; }

  .panel { margin-top: 8px; border-radius: 12px; overflow: hidden; background: var(--secondary-background-color, transparent);
           --ha-card-background: transparent; --card-background-color: transparent; --ha-card-box-shadow: none; --ha-card-border-width: 0; }
  .panel[hidden] { display: none; }

  @keyframes ca-spin { to { transform: rotate(360deg); } }
  @keyframes ca-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(.85); } }
  @keyframes ca-flicker { 0%, 100% { transform: scale(1, 1); } 30% { transform: scale(.92, 1.08); } 60% { transform: scale(1.05, .94); } }
  @keyframes ca-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(2px); } }
  @keyframes ca-ring { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--t) 50%, transparent); } 100% { box-shadow: 0 0 0 7px transparent; } }
  @media (prefers-reduced-motion: reduce) { .ic, .ic ha-icon { animation: none !important; } .dev { transition: none; } }
`;

// ── Editor ───────────────────────────────────────────────────────────────────
// The editor shows `illustrations`, `icons` and `devices` as two sections: the device types (illustration and icon of
// every device of a type) and the devices (name, type, illustration and icon of each one). A device's settings found
// under `illustrations` / `icons` are moved into its `devices` entry.
const CA_DEVICE_FIELDS = ["name", "type", "illustration", "icon"];

class ClimateAirOverviewCardEditor extends CaCardEditor {
  _defaults() {
    return { zoom: true, group_by: "type" };
  }

  _helpers() {
    return ["title", "columns", "exclude", "include", "kinds", "devs", "language"];
  }

  // Every device the card can show: found or added by hand, excluded ones left out.
  _deviceIds() {
    const c = this._config || {};
    const ids = CA_KINDS.flatMap((k) => caFindEntities(this._hass, k));
    for (const id of c.include || []) if (!ids.includes(id) && this._hass.states[id]) ids.push(id);
    return ids.filter((id) => !(c.exclude || []).includes(id));
  }

  _kindOf(id, type) {
    if (CA_KINDS.includes(type)) return type;
    return caKindOf(this._hass, id) || (id.startsWith("climate.") ? "aircon" : "fan");
  }

  _illustrationField(lang, kind) {
    const variants = CA_ART[kind]?.variants;
    if (!variants) return [];
    const options = ["auto", ...variants].map((v) => ({ value: v, label: caT(lang, `ill_${v}`) }));
    return [{ name: "illustration", selector: { select: { mode: "dropdown", options } } }];
  }

  _schema() {
    const lang = caLang(this._config, this._hass);
    const found = CA_KINDS.flatMap((k) => caFindEntities(this._hass, k));
    for (const id of this._config?.exclude || []) if (!found.includes(id)) found.push(id);
    const over = Object.fromEntries((this._config?.devices || []).filter((d) => d?.entity).map((d) => [d.entity, d]));
    const types = [{ value: "auto", label: caT(lang, "ill_auto") }, ...CA_KINDS.map((k) => ({ value: k, label: caT(lang, k) }))];
    return [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "title", selector: { text: {} } },
          { name: "icon", selector: { icon: {} } },
        ],
      },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "group_by",
            selector: {
              select: {
                mode: "dropdown",
                options: ["type", "area", "none"].map((v) => ({ value: v, label: caT(lang, `ed_group_${v}`) })),
              },
            },
          },
          { name: "columns", selector: { number: { min: 1, max: 6, mode: "box" } } },
        ],
      },
      { name: "zoom", selector: { boolean: {} } },
      { name: "exclude", selector: { entity: { multiple: true, include_entities: found } } },
      { name: "include", selector: { entity: { multiple: true, domain: ["climate", "fan"] } } },
      {
        name: "kinds",
        type: "expandable",
        flatten: false,
        title: caT(lang, "ed_kinds"),
        schema: CA_KINDS.map((k) => ({
          name: k,
          type: "expandable",
          flatten: false,
          title: caT(lang, `g_${k}`),
          schema: [...this._illustrationField(lang, k), { name: "icon", selector: { icon: {} } }],
        })),
      },
      {
        name: "devs",
        type: "expandable",
        flatten: false,
        title: caT(lang, "ed_devs"),
        schema: this._deviceIds().map((id) => ({
          name: id,
          type: "expandable",
          flatten: false,
          title: caName(this._hass, id),
          schema: [
            { name: "name", selector: { text: {} } },
            { name: "type", selector: { select: { mode: "dropdown", options: types } } },
            ...this._illustrationField(lang, this._kindOf(id, over[id]?.type)),
            { name: "icon", selector: { icon: {} } },
          ],
        })),
      },
      ...caAdvanced(lang, "language"),
    ];
  }

  _data() {
    const { illustrations = {}, icons = {}, devices = [], ...rest } = this._config;
    const over = Object.fromEntries(devices.filter((d) => d?.entity).map((d) => [d.entity, d]));
    const kinds = Object.fromEntries(CA_KINDS.map((k) => [k, { illustration: illustrations[k] || "auto", icon: icons[k] }]));
    const devs = Object.fromEntries(
      this._deviceIds().map((id) => {
        const d = over[id] || {};
        return [id, { name: d.name, type: d.type || "auto", illustration: d.illustration || illustrations[id] || "auto", icon: d.icon || icons[id] }];
      }),
    );
    return { ...this._defaults(), ...rest, kinds, devs };
  }

  _fromForm(value) {
    const { kinds = {}, devs = {}, ...rest } = value;
    const set = (v) => v && v !== "auto";
    const illustrations = {};
    const icons = {};
    for (const k of CA_KINDS) {
      if (set(kinds[k]?.illustration)) illustrations[k] = kinds[k].illustration;
      if (set(kinds[k]?.icon)) icons[k] = kinds[k].icon;
    }
    const devices = [];
    for (const [entity, d] of Object.entries(devs)) {
      const entry = { entity };
      for (const key of CA_DEVICE_FIELDS) if (set(d?.[key])) entry[key] = d[key];
      if (Object.keys(entry).length > 1) devices.push(entry);
    }
    // Settings of devices the form does not list (excluded, or gone for now) are kept.
    for (const d of this._config.devices || []) if (d?.entity && !(d.entity in devs)) devices.push(d);
    return { ...rest, illustrations, icons, devices };
  }

  _render() {
    super._render();
    if (!this._form) return;
    const lang = caLang(this._config, this._hass);
    const helpers = this._helpers();
    this._form.computeHelper = (s) =>
      s.name === "zoom" ? caT(lang, "ed_ov_zoom_helper") : helpers.includes(s.name) ? caEditorHelper(lang, s.name) : undefined;
  }
}

caRegister(
  "climate-air-overview-card",
  ClimateAirOverviewCard,
  "Climate Air · Overview Card",
  "Every air conditioner, air purifier and fan at a glance; tap a device for its full card",
  ClimateAirOverviewCardEditor,
);
