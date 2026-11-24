// ── Editor ───────────────────────────────────────────────────────────────────
// The editor shows `illustrations`, `icons` and `devices` as two sections: the device types (illustration and icon of
// every device of a type) and the devices (name, type, illustration and icon of each one). A device's settings found
// under `illustrations` / `icons` are moved into its `devices` entry.
import { CA_KINDS, ClimateAirOverviewCard } from "./core.js";

export const CA_DEVICE_FIELDS = ["name", "type", "illustration", "icon"];

export class ClimateAirOverviewCardEditor extends CaCardEditor {
  _defaults() {
    return { show_title: true, illustration_theme: "auto", zoom: true, show_all: false, show_alerts: true, filter_warning: CA_FILTER_WARNING, group_by: "type" };
  }

  _helpers() {
    return ["title", "columns", "show_all", "exclude", "include", "kinds", "devs", "language"];
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
          caThemeField(lang),
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
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_title", selector: { boolean: {} } },
          { name: "zoom", selector: { boolean: {} } },
          { name: "show_all", selector: { boolean: {} } },
        ],
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_alerts", selector: { boolean: {} } },
          { name: "filter_warning", selector: { number: { min: CA_FILTER_REPLACE, max: 50, step: 1, mode: "box", unit_of_measurement: "%" } } },
        ],
      },
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
    // Settings of devices the form does not list (excluded, or gone for now) are kept, under `devices`,
    // `illustrations` and `icons` alike.
    for (const d of this._config.devices || []) if (d?.entity && !(d.entity in devs)) devices.push(d);
    for (const [src, out] of [
      [this._config.illustrations, illustrations],
      [this._config.icons, icons],
    ])
      for (const [k, v] of Object.entries(src || {})) if (!CA_KINDS.includes(k) && !(k in devs)) out[k] = v;
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
