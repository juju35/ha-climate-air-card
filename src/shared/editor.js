// ── Editor (built on Home Assistant's ha-form) ───────────────────────────────
// Like the ha-room-card editors: every option of the card, with the language and, as YAML, the entity overrides in a
// folded Advanced section.
import { pickerDefine } from "./card-picker.js";
import { CA_REPO, CA_VERSION } from "./core.js";
import { caLang, caT } from "./i18n-helpers.js";
import { caDeviceEntities, caDeviceOf, caDomain, caFindEntities } from "./device-discovery.js";
import { CA_HP_GROUND_TYPES, CA_HP_SOURCES, CA_HP_WATER_TYPES, caHeatPumpZones } from "./heat-pumps.js";
import { CA_FILTER_REPLACE, CA_FILTER_WARNING } from "./mini-cards.js";
import { CA_ART } from "./illustrations.js";

// The cards whose room temperature can come from a sensor of its own (temperature_entity).
export const CA_ROOM_SENSOR_KINDS = ["aircon", "heatpump"];

export class CaCardEditor extends HTMLElement {
  static kind = "fan";
  static mini = false;

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    const prev = this._hass?.language;
    this._hass = hass;
    if (this._form && prev === hass?.language) this._form.hass = hass;
    else this._render();
  }

  _defaults() {
    return {
      show_title: true,
      show_subtitle: true,
      show_controls: true,
      show_sensors: true,
      // The fan and heat pump cards show no filter alert: no toggle for them.
      ...(CA_NO_FILTER.includes(this.constructor.kind) ? {} : { show_alerts: true, show_filter: true, filter_warning: CA_FILTER_WARNING }),
      ...(CA_ART[this.constructor.kind] ? { illustration: "auto", illustration_theme: "auto" } : {}),
      // Heat pump: the defaults caCleanConfig drops, so the YAML only carries a source once it differs from air.
      ...(this.constructor.kind === "heatpump" ? { source: "air", ground_type: "collector", water_type: "well" } : {}),
      ...(CA_ROOM_SENSOR_KINDS.includes(this.constructor.kind) ? { show_device_temperature: true } : {}),
      ...(this.constructor.mini ? { zoom: true } : {}),
    };
  }

  _helpers() {
    return ["entity", "name", "icon", "illustration", "zoom", "language", "entities", "source", "circulation_threshold", "power_threshold", "compressor_threshold", "outdoor_temp", "temperature_entity"];
  }

  _schema() {
    const kind = this.constructor.kind;
    const ids = caFindEntities(this._hass, kind);
    const domain = caDomain(kind);
    const lang = caLang(this._config, this._hass);
    const variants = CA_ART[kind]?.variants || [];
    return [
      // A heat pump without a climate entity is driven by the select of its mode (TOUG): both domains are offered.
      { name: "entity", selector: { entity: kind === "heatpump" ? { domain: ["climate", "select"] } : ids.length ? { include_entities: ids } : { domain } } },
      { type: "grid", name: "", schema: [{ name: "name", selector: { text: {} } }, { name: "icon", selector: { icon: {} } }] },
      // The illustration: guessed, a shape picked, or none (the classic header, `illustration: false`); and the
      // banner's day / night theme.
      ...(CA_ART[kind]
        ? [
            {
              type: "grid",
              name: "",
              schema: [
                {
                  name: "illustration",
                  selector: {
                    select: { mode: "dropdown", options: ["auto", ...variants, "none"].map((v) => ({ value: v, label: caT(lang, `ill_${v}`) })) },
                  },
                },
                caThemeField(lang),
              ],
            },
          ]
        : []),
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_title", selector: { boolean: {} } },
          { name: "show_subtitle", selector: { boolean: {} } },
          { name: "show_controls", selector: { boolean: {} } },
          { name: "show_sensors", selector: { boolean: {} } },
          ...(CA_NO_FILTER.includes(kind) ? [] : [{ name: "show_alerts", selector: { boolean: {} } }, { name: "show_filter", selector: { boolean: {} } }]),
          ...(this.constructor.mini ? [{ name: "zoom", selector: { boolean: {} } }] : []),
        ],
      },
      ...(CA_NO_FILTER.includes(kind)
        ? []
        : [{ name: "filter_warning", selector: { number: { min: CA_FILTER_REPLACE, max: 50, step: 1, mode: "box", unit_of_measurement: "%" } } }]),
      // Air conditioner and heat pump: a room sensor shown instead of the unit's own temperature.
      ...(CA_ROOM_SENSOR_KINDS.includes(kind)
        ? [
            { name: "temperature_entity", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
            ...(this._config?.temperature_entity ? [{ name: "show_device_temperature", selector: { boolean: {} } }] : []),
          ]
        : []),
      // A heat pump: its source side (the illustration), the metered running threshold and the outdoor sensor.
      ...this._heatpumpOptions(kind),
      // A multi-zone heat pump: let the user hide a room setpoint it finds among its zones (a test number, or a
      // second motorised vent driven by the same thermostat).
      ...this._zoneExclude(kind),
      ...caAdvanced(caLang(this._config, this._hass), "language", "entities"),
    ];
  }

  // The heat-pump-only options in the editor: the source illustration and its ground / water variant, the metered
  // running threshold (watts) and the outdoor temperature entity (a sensor or a weather entity). The `entities`
  // monitoring role map stays YAML-only (it is an object), in the Advanced section like the other cards.
  _heatpumpOptions(kind) {
    if (kind !== "heatpump") return [];
    const lang = caLang(this._config, this._hass);
    const source = CA_HP_SOURCES.includes(this._config?.source) ? this._config.source : "air";
    const sel = (name, values) => ({
      name,
      selector: { select: { mode: "dropdown", options: values.map((v) => ({ value: v, label: caT(lang, `${name === "source" ? "src" : name === "ground_type" ? "gt" : "wt"}_${v}`) })) } },
    });
    return [
      sel("source", CA_HP_SOURCES),
      ...(source === "ground" ? [sel("ground_type", CA_HP_GROUND_TYPES)] : []),
      ...(source === "water" ? [sel("water_type", CA_HP_WATER_TYPES)] : []),
      { name: "power_threshold", selector: { number: { min: 0, step: 10, mode: "box", unit_of_measurement: "W" } } },
      { name: "compressor_threshold", selector: { number: { min: 0, step: 10, mode: "box", unit_of_measurement: "W" } } },
      { name: "circulation_threshold", selector: { number: { min: 0, step: 5, mode: "box", unit_of_measurement: "W" } } },
      { name: "outdoor_temp", selector: { entity: { domain: ["sensor", "weather"] } } },
    ];
  }

  // The `exclude` field offered for a multi-zone heat pump: every candidate room setpoint and every device switch,
  // so a hidden entity stays pickable even once hidden. Empty (and absent) when the device has fewer than two zones.
  _zoneExclude(kind) {
    if (kind !== "heatpump" || !this._config?.entity) return [];
    const zones = caHeatPumpZones(this._hass, this._config.entity);
    if (zones.length < 2) return [];
    const switches = caDeviceEntities(this._hass, caDeviceOf(this._hass, this._config.entity))
      .map((e) => e.entity_id)
      .filter((id) => id.startsWith("switch."));
    return [{ name: "exclude", selector: { entity: { multiple: true, include_entities: [...zones.map((z) => z.setpoint), ...switches] } } }];
  }

  _render() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.addEventListener("value-changed", (ev) => this._valueChanged(ev));
      this.appendChild(this._form);
    }
    const lang = caLang(this._config, this._hass);
    const helpers = this._helpers();
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.computeLabel = (s) => caT(lang, `ed_${s.name}`);
    this._form.computeHelper = (s) => (helpers.includes(s.name) ? caEditorHelper(lang, s.name) : undefined);
    this._form.data = this._data();
  }

  // The form's data from the config, and the config from the form's data (the overview edits its lists as sections).
  _data() {
    const data = { ...this._defaults(), ...this._config };
    if (data.illustration === false) data.illustration = "none";
    return data;
  }

  _fromForm(value) {
    return value.illustration === "none" ? { ...value, illustration: false } : value;
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    const lang = caLang(this._config, this._hass);
    this._config = caCleanConfig(this._fromForm(ev.detail.value), this._defaults(), this._config.type);
    if (lang !== caLang(this._config, this._hass)) this._render();
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }));
  }
}

// The kinds of device without a filter (no filter options in their editor).
export const CA_NO_FILTER = ["fan", "heatpump"];

// Illustration variants of each kind of device (the first is the fallback).
// The folded Advanced section: the language, and the other `names` edited as YAML.
// The banner's day / night theme in the visual editors (device cards and overview).
export const caThemeField = (lang) => ({
  name: "illustration_theme",
  selector: { select: { mode: "dropdown", options: ["auto", "day", "night"].map((v) => ({ value: v, label: caT(lang, `theme_${v}`) })) } },
});

export const caAdvanced = (lang, ...names) => [
  {
    name: "advanced",
    type: "expandable",
    flatten: true,
    schema: names.map((name) =>
      name === "language"
        ? {
            name,
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "", label: caT(lang, "ed_language_auto") },
                  { value: "en", label: "English" },
                  { value: "fr", label: "Français" },
                  { value: "de", label: "Deutsch" },
                  { value: "es", label: "Español" },
                  { value: "sr", label: "Српски" },
                  { value: "sr-Latn", label: "Srpski (latinica)" },
                  { value: "it", label: "Italiano" },
                  { value: "nl", label: "Nederlands" },
                  { value: "pt", label: "Português (Portugal)" },
                  { value: "pl", label: "Polski" },
                  { value: "ro", label: "Română" },
                  { value: "da", label: "Dansk" },
                  { value: "sv", label: "Svenska" },
                  { value: "bg", label: "Български" },
                  { value: "ru", label: "Русский" },
                  { value: "uk", label: "Українська" },
                  { value: "hu", label: "Magyar" },
                  { value: "sk", label: "Slovenčina" },
                  { value: "cs", label: "Čeština" },
                  { value: "sl", label: "Slovenščina" },
                  { value: "lv", label: "Latviešu" },
                  { value: "el", label: "Ελληνικά" },
                ],
              },
            },
          }
        : { name, selector: { object: {} } },
    ),
  },
];

export function caEditorHelper(lang, name) {
  const key = `ed_${name}_helper`;
  const txt = caT(lang, key);
  return txt === key ? undefined : txt;
}

// Keeps the YAML short: options left empty or at their default are dropped.
export function caCleanConfig(value, defaults, type) {
  const out = { ...value };
  for (const k of Object.keys(out)) {
    const v = out[k];
    if (v === "" || v == null || (Array.isArray(v) && !v.length) || v === defaults[k]) delete out[k];
  }
  for (const key of ["entities", "icons", "illustrations"]) {
    if (!out[key] || typeof out[key] !== "object" || Array.isArray(out[key])) continue;
    const e = Object.fromEntries(Object.entries(out[key]).filter(([, v]) => v && v !== "auto"));
    if (Object.keys(e).length) out[key] = e;
    else delete out[key];
  }
  return type ? { type, ...out } : out;
}

// Defines a card and its editor (`<type>-editor`, a CaCardEditor for the card's kind unless `Editor` is given) and
// lists the card in the card picker.
export function caRegister(type, cls, name, description, Editor) {
  if (customElements.get(type)) return;
  cls.tag = type;
  const editor =
    Editor ||
    class extends CaCardEditor {
      static kind = cls.kind;
      static mini = !!cls.mini;
    };
  pickerDefine(type, cls);
  pickerDefine(`${type}-editor`, editor);
  window.customCards = window.customCards || [];
  window.customCards.push({ type, name, description, preview: true, documentationURL: CA_REPO });
}

if (!customElements.get("climate-air-overview-card")) {
  console.info(`%c HA-CLIMATE-AIR-CARD %c v${CA_VERSION} `, "background:#039be5;color:#fff;font-weight:700", "");
}
