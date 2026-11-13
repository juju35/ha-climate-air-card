import assert from "node:assert/strict";
import { test } from "node:test";
import { makeHass } from "./hass.mjs";
import { load } from "./load.mjs";

const lib = load();
const json = (v) => JSON.parse(JSON.stringify(v));

test("devices are sorted into air conditioners, purifiers and fans", () => {
  const h = makeHass();
  assert.equal(lib.caKindOf(h, "climate.air_conditioner"), "aircon");
  assert.equal(lib.caKindOf(h, "fan.living_room_purifier_air_purifier"), "purifier");
  // No "purifier" in its name: found from its PM2.5 sensor.
  h.states["fan.bedroom_purifier"].attributes.friendly_name = "Bedroom air";
  h.devices.dev_p2.name = "Bedroom air";
  assert.equal(lib.caKindOf(h, "fan.bedroom_purifier"), "purifier");
  assert.equal(lib.caKindOf(h, "fan.bedroom_fan_fan"), "fan");
});

test("a climate entity that only heats is no air conditioner: the cards leave it to ha-heating-card", () => {
  const h = makeHass();
  assert.equal(lib.caKindOf(h, "climate.bathroom_thermostat"), null);
  assert.equal(lib.caKindOf(h, "climate.air_conditioner"), "aircon");
  assert.deepEqual(json(lib.caFindEntities(h, "aircon")), ["climate.air_conditioner"]);
  // Heat with auto or heat_cool is still a thermostat; a heat pump that can cool, dry or only blow is an air conditioner.
  for (const modes of [["off", "heat", "auto"], ["off", "heat_cool"], ["heat"]]) {
    assert.equal(lib.caKindOf(makeHass("en", { "climate.bathroom_thermostat": { hvac_modes: modes } }), "climate.bathroom_thermostat"), null, modes.join());
  }
  for (const mode of ["cool", "dry", "fan_only"]) {
    assert.equal(lib.caKindOf(makeHass("en", { "climate.bathroom_thermostat": { hvac_modes: ["off", "heat", mode] } }), "climate.bathroom_thermostat"), "aircon", mode);
  }
});

test("every device of a kind is found, sorted by name", () => {
  const h = makeHass();
  assert.deepEqual(json(lib.caFindEntities(h, "purifier")), ["fan.bedroom_purifier", "fan.dyson_pure_cool", "fan.living_room_purifier_air_purifier"]);
  assert.deepEqual(json(lib.caFindEntities(h, "fan")), ["fan.bedroom_fan_fan", "fan.office_fan_fan"]);
});

test("hidden and configuration entities are left out", () => {
  const h = makeHass();
  h.entities["fan.office_fan_fan"].hidden = true;
  assert.deepEqual(json(lib.caFindEntities(h, "fan")), ["fan.bedroom_fan_fan"]);
});

test("roles are found on the device", () => {
  const h = makeHass();
  const list = lib.caDeviceEntities(h, "dev_ac");
  // The real-time power, not the compressor's; the compressor frequency, not its target.
  assert.equal(lib.caFindRole(h, list, "power"), "sensor.air_conditioner_real_time_power");
  assert.equal(lib.caFindRole(h, list, "compressor"), "sensor.air_conditioner_compressor_frequency");
  assert.equal(lib.caFindRole(h, list, "outdoor_temp"), "sensor.air_conditioner_outdoor_temperature");
  assert.equal(lib.caFindRole(h, list, "filter_alert"), "binary_sensor.air_conditioner_full_dust");
  const p = lib.caDeviceEntities(h, "dev_p1");
  assert.equal(lib.caFindRole(h, p, "filter"), "sensor.living_room_purifier_filter_life_level");
  assert.equal(lib.caFindRole(h, p, "filter_hours"), "sensor.living_room_purifier_filter_used_time");
  assert.equal(lib.caFindRole(h, p, "child_lock"), "switch.living_room_purifier_physical_controls_locked");
  assert.equal(lib.caFindRole(h, p, "buzzer"), "switch.living_room_purifier_alarm");
  const f = lib.caDeviceEntities(h, "dev_f1");
  assert.equal(lib.caFindRole(h, f, "angle"), "number.bedroom_fan_horizontal_angle");
  assert.equal(lib.caFindRole(h, f, "timer"), "number.bedroom_fan_countdown_time");
  assert.equal(lib.caFindRole(h, f, "rotate_left"), "button.bedroom_fan_turn_left");
});

test("air quality from PM2.5, from HomeKit's 1–5 index, or from a US AQI", () => {
  const key = (pm, aqi) => lib.caAirQuality(pm, aqi)?.key;
  assert.equal(key(6), "good");
  assert.equal(key(18), "moderate");
  assert.equal(key(40), "unhealthy");
  assert.equal(key(90), "bad");
  assert.equal(key(null, 1), "good");
  assert.equal(key(null, 3), "moderate");
  assert.equal(key(null, 5), "bad");
  assert.equal(key(null, 120), "unhealthy");
  assert.equal(key(null, null), undefined);
});

test("the blades turn faster with the speed", () => {
  assert.ok(Number(lib.caSpin(100)) < Number(lib.caSpin(10)));
  assert.equal(lib.caSpin(100), "0.30");
});

test("names come from the device, without Xiaomi Home's trailing ' Fan' on entity names", () => {
  const h = makeHass();
  assert.equal(lib.caName(h, "fan.bedroom_fan_fan"), "Bedroom fan");
  delete h.entities["fan.bedroom_fan_fan"].device_id;
  h.states["fan.bedroom_fan_fan"].attributes.friendly_name = "Bedroom fan  Fan";
  assert.equal(lib.caName(h, "fan.bedroom_fan_fan"), "Bedroom fan");
});

test("the editor drops options left empty or at their default", () => {
  const out = lib.caCleanConfig({ entity: "fan.x", name: "", show_controls: true, zoom: false, entities: { pm25: "", filter: "sensor.f" } }, { show_controls: true, zoom: true }, "custom:t");
  assert.deepEqual(json(out), { type: "custom:t", entity: "fan.x", zoom: false, entities: { filter: "sensor.f" } });
});

// A Dyson Pure Cool, added only for these checks so the shared mock (and its screenshots) stay untouched.
const withDyson = (lang = "en") => {
  const h = makeHass(lang);
  h.devices.dev_dyson = { id: "dev_dyson", name: "Dyson Pure Cool", name_by_user: null, area_id: "office" };
  const add = (id, state, attributes) => {
    h.states[id] = { entity_id: id, state: String(state), attributes };
    h.entities[id] = { entity_id: id, device_id: "dev_dyson", area_id: null, platform: "mock" };
  };
  add("fan.dyson_pure_cool", "on",
    { preset_modes: ["Auto", "Manual"], preset_mode: "Auto", percentage: 30, percentage_step: 10, oscillating: true, supported_features: 57, friendly_name: "Dyson Pure Cool" });
  add("sensor.dyson_pure_cool_pm_2_5", 5, { device_class: "pm25", unit_of_measurement: "µg/m³", friendly_name: "Dyson Pure Cool PM 2.5" });
  add("sensor.dyson_pure_cool_pm_10", 9, { device_class: "pm10", unit_of_measurement: "µg/m³", friendly_name: "Dyson Pure Cool PM 10" });
  add("sensor.dyson_pure_cool_volatile_organic_compounds", 4, { friendly_name: "Dyson Pure Cool Volatile Organic Compounds Index" });
  add("sensor.dyson_pure_cool_nitrogen_dioxide", 1, { friendly_name: "Dyson Pure Cool Nitrogen Dioxide Index" });
  // The carbon filter comes first on purpose: the HEPA figure must still win, by name and not by order.
  add("sensor.dyson_pure_cool_carbon_filter_life", 94, { unit_of_measurement: "%", friendly_name: "Dyson Pure Cool Carbon Filter Life" });
  add("sensor.dyson_pure_cool_hepa_filter_life", 76, { unit_of_measurement: "%", friendly_name: "Dyson Pure Cool HEPA Filter Life" });
  add("sensor.dyson_pure_cool_temperature", 22, { device_class: "temperature", unit_of_measurement: "°C" });
  add("sensor.dyson_pure_cool_humidity", 50, { device_class: "humidity", unit_of_measurement: "%" });
  add("switch.dyson_pure_cool_night_mode", "off", { friendly_name: "Dyson Pure Cool Night Mode" });
  add("switch.dyson_pure_cool_continuous_monitoring", "on", { friendly_name: "Dyson Pure Cool Continuous Monitoring" });
  return h;
};

test("Dyson: detected as a purifier, HEPA filter life wins over the carbon one", () => {
  const h = withDyson();
  assert.equal(lib.caKindOf(h, "fan.dyson_pure_cool"), "purifier");
  const list = lib.caDeviceEntities(h, "dev_dyson");
  // Not the carbon filter, not a life in hours.
  assert.equal(lib.caFindRole(h, list, "filter"), "sensor.dyson_pure_cool_hepa_filter_life");
  assert.equal(lib.caFindRole(h, list, "voc"), "sensor.dyson_pure_cool_volatile_organic_compounds");
  assert.equal(lib.caFindRole(h, list, "no2"), "sensor.dyson_pure_cool_nitrogen_dioxide");
  // The night-mode and monitoring switches are not mistaken for the purifier mode select.
  assert.equal(lib.caFindRole(h, list, "mode"), undefined);
});

const LANGS = ["fr", "de", "es", "sr", "sr-Latn", "it", "nl", "pt", "pl", "ro", "da", "sv", "bg", "ru", "uk", "hu", "sk", "cs", "sl", "lv", "el"];

test("every language has both tables", () => {
  for (const lang of LANGS) {
    assert.ok(lib.CA_I18N[lang], `CA_I18N.${lang}`);
    assert.ok(lib.CA_VALUES[lang], `CA_VALUES.${lang}`);
  }
});

test("I18N parity: every language has exactly the keys and placeholders of en", () => {
  const placeholders = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
  for (const table of [lib.CA_I18N, lib.CA_VALUES]) {
    const en = table.en;
    for (const lang of LANGS) {
      assert.deepEqual(Object.keys(table[lang]).sort(), Object.keys(en).sort(), lang);
      for (const k of Object.keys(en)) {
        assert.equal(typeof table[lang][k], "string", `${lang}.${k}`);
        assert.ok(table[lang][k].length, `${lang}.${k}`);
        assert.deepEqual(placeholders(table[lang][k]), placeholders(en[k]), `${lang}.${k}`);
      }
    }
  }
});

test("de and es are picked from Home Assistant or the card's language option", () => {
  assert.equal(lib.caLang({}, { language: "de" }), "de");
  assert.equal(lib.caLang({ language: "es" }, { language: "en" }), "es");
  assert.equal(lib.caLang({}, { language: "es-419" }), "es");
  assert.equal(lib.caLang({}, { language: "ja" }), "en");
  assert.equal(lib.caT("de", "running_n", { n: 2 }), "2 an");
  assert.equal(lib.caValueLabel("es", "level_3"), "Nivel 3");
  assert.equal(lib.caValueLabel("de", "Level4"), "Stufe 4");
});

test("the language: the full code when known, else the part before the dash, else English", () => {
  assert.equal(lib.caLang({}, { language: "fr-FR" }), "fr");
  assert.equal(lib.caLang({}, { language: "de-CH" }), "de");
  assert.equal(lib.caLang({}, { language: "sr-Latn" }), "sr-Latn");
  assert.equal(lib.caLang({}, { language: "sr" }), "sr");
  assert.equal(lib.caLang({ language: "sr-Latn" }, { language: "fr" }), "sr-Latn");
  assert.equal(lib.caT("sr-Latn", "running_n", { n: 2 }), "2 uključeno");
  assert.equal(lib.caValueLabel("sr", "level_3"), "Ниво 3");
});

test("it, nl, pt and pl: picked from the full code, else the part before the dash; pt-BR falls back to European Portuguese", () => {
  assert.equal(lib.caLang({}, { language: "it-IT" }), "it");
  assert.equal(lib.caLang({}, { language: "nl-BE" }), "nl");
  assert.equal(lib.caLang({}, { language: "pt" }), "pt");
  assert.equal(lib.caLang({}, { language: "pt-BR" }), "pt");
  assert.equal(lib.caLang({}, { language: "pl-PL" }), "pl");
  assert.equal(lib.caLang({}, { language: "sr-Latn" }), "sr-Latn");
  assert.equal(lib.caLang({}, { language: "ja" }), "en");
  assert.equal(lib.caLang({ language: "pl" }, { language: "fr" }), "pl");
  assert.equal(lib.caT("nl", "running_n", { n: 2 }), "2 aan");
  assert.equal(lib.caT("pl", "running_n", { n: 5 }), "Włączone: 5");
  assert.equal(lib.caValueLabel("it", "level_3"), "Livello 3");
  assert.equal(lib.caValueLabel("pt", "livello_2"), "Nível 2");
  assert.equal(lib.caValueLabel("pl", "poziom_1"), "Poziom 1");
});

test("ro, da, sv, bg, ru, uk, hu, sk, cs, sl, lv and el: picked from the full code, else the part before the dash", () => {
  assert.equal(lib.caLang({}, { language: "ro-RO" }), "ro");
  assert.equal(lib.caLang({}, { language: "da" }), "da");
  assert.equal(lib.caLang({}, { language: "sv-FI" }), "sv");
  assert.equal(lib.caLang({}, { language: "ru-RU" }), "ru");
  assert.equal(lib.caLang({}, { language: "el" }), "el");
  assert.equal(lib.caLang({ language: "uk" }, { language: "ru" }), "uk");
  assert.equal(lib.caLang({}, { language: "nb" }), "en");
  assert.equal(lib.caT("da", "running_n", { n: 2 }), "2 tændt");
  assert.equal(lib.caT("ru", "running_n", { n: 5 }), "Включено: 5");
  assert.equal(lib.caT("hu", "level", { n: 3 }), "3. szint");
  assert.equal(lib.caValueLabel("sv", "level_3"), "Nivå 3");
  assert.equal(lib.caValueLabel("cs", "úroveň_2"), "Úroveň 2");
  assert.equal(lib.caValueLabel("uk", "Рівень 1"), "Рівень 1");
  assert.equal(lib.caValueLabel("el", "επίπεδο_4"), "Επίπεδο 4");
  assert.equal(lib.caValueLabel("lv", "off"), "Izslēgts");
});

test("the editor offers every language, once, each under its own name", () => {
  const [group] = lib.caAdvanced("en", "language");
  const options = group.schema[0].selector.select.options;
  assert.deepEqual(json(options.map((o) => o.value)), ["", "en", ...LANGS]);
  const labels = Object.fromEntries(options.map((o) => [o.value, o.label]));
  assert.equal(labels.it, "Italiano");
  assert.equal(labels.nl, "Nederlands");
  assert.equal(labels.pt, "Português (Portugal)");
  assert.equal(labels.pl, "Polski");
  const names = { ro: "Română", da: "Dansk", sv: "Svenska", bg: "Български", ru: "Русский", uk: "Українська", hu: "Magyar", sk: "Slovenčina", cs: "Čeština", sl: "Slovenščina", lv: "Latviešu", el: "Ελληνικά" };
  for (const [code, name] of Object.entries(names)) assert.equal(labels[code], name, code);
});

test("Serbian: no Latin letter in sr, no Cyrillic one in sr-Latn, but for names, units and entity IDs", () => {
  // Brand and unit names, placeholders and entity ID examples stay in Latin script in both.
  const strip = (s) => s.replace(/\{\w+\}|Home Assistant|VOC|NO₂|pm25|sensor\.\w+|\bh\b/g, "");
  for (const table of [lib.CA_I18N, lib.CA_VALUES]) {
    for (const [k, v] of Object.entries(table.sr)) assert.doesNotMatch(strip(v), /[A-Za-z]/, `sr.${k}`);
    for (const [k, v] of Object.entries(table["sr-Latn"])) assert.doesNotMatch(v, /[Ѐ-ӿ]/, `sr-Latn.${k}`);
  }
});

test("the device lists follow states that arrive after the registry", () => {
  const full = makeHass();
  const states = { ...full.states };
  delete states["fan.bedroom_purifier"];
  assert.deepEqual(json(lib.caFindEntities({ ...full, states }, "purifier")), ["fan.dyson_pure_cool", "fan.living_room_purifier_air_purifier"]);
  assert.deepEqual(json(lib.caFindEntities({ ...full, states: { ...full.states } }, "purifier")), [
    "fan.bedroom_purifier",
    "fan.dyson_pure_cool",
    "fan.living_room_purifier_air_purifier",
  ]);
});

test("roles are found on a German or Spanish installation, and VOC / NO₂ by device class", () => {
  const h = makeHass();
  const add = (id, attributes = {}) => {
    h.states[id] = { entity_id: id, state: "1", attributes };
    h.entities[id] = { entity_id: id, device_id: "dev_x", platform: "mock" };
  };
  add("climate.klimaanlage", { hvac_modes: ["off", "cool"] });
  add("sensor.klimaanlage_aussentemperatur", { device_class: "temperature" });
  add("sensor.klimaanlage_kompressorfrequenz");
  add("sensor.klimaanlage_luftqualitat_index", { device_class: "volatile_organic_compounds_parts" });
  add("sensor.klimaanlage_no2_wert", { device_class: "nitrogen_dioxide" });
  add("number.klimaanlage_temporizador");
  const list = lib.caDeviceEntities(h, "dev_x");
  assert.equal(lib.caFindRole(h, list, "outdoor_temp"), "sensor.klimaanlage_aussentemperatur");
  assert.equal(lib.caFindRole(h, list, "compressor"), "sensor.klimaanlage_kompressorfrequenz");
  assert.equal(lib.caFindRole(h, list, "voc"), "sensor.klimaanlage_luftqualitat_index");
  assert.equal(lib.caFindRole(h, list, "no2"), "sensor.klimaanlage_no2_wert");
  assert.equal(lib.caFindRole(h, list, "timer"), "number.klimaanlage_temporizador");
});

test("numbers are formatted with Home Assistant's full locale; bare pt is European Portuguese; the language option wins", () => {
  assert.equal(lib.caIntlLang({}, { language: "pt" }), "pt-PT");
  assert.equal(lib.caIntlLang({}, { language: "pt", locale: { language: "pt" } }), "pt-PT");
  assert.equal(lib.caIntlLang({}, { language: "pt-BR" }), "pt-BR");
  assert.equal(lib.caIntlLang({}, { language: "fr", locale: { language: "fr-CH" } }), "fr-CH");
  assert.equal(lib.caIntlLang({}, { language: "ja" }), "en");
  assert.equal(lib.caIntlLang({ language: "pt" }, { language: "de", locale: { language: "de-CH" } }), "pt-PT");
  assert.equal(lib.caIntlLang({ language: "de" }, { language: "pt-BR" }), "de");
  assert.equal(lib.caIntlLang({}, { language: "sr-Latn" }), "sr-Latn");
  // European grouping (a space), not the Brazilian dot.
  assert.match(lib.caFmtNum(lib.caIntlLang({}, { language: "pt" }), 12345.6), /^12\s345,6$/);
  assert.equal(lib.caFmtNum(lib.caIntlLang({}, { language: "pt-BR" }), 12345.6), "12.345,6");
});

test("a role a device lacks is kept as a miss until one of its entities changes", () => {
  const h = makeHass();
  // Unavailable at first: no device class yet, so nothing says it measures VOC.
  h.states["sensor.bedroom_fan_air"] = { entity_id: "sensor.bedroom_fan_air", state: "unavailable", attributes: {} };
  h.entities["sensor.bedroom_fan_air"] = { entity_id: "sensor.bedroom_fan_air", device_id: "dev_f1", platform: "mock" };
  assert.equal(lib.caRoleOf(h, "fan.bedroom_fan_fan", "voc"), undefined);
  // Another entity of the home changes: Home Assistant hands a new states object, the miss is reused.
  const other = { ...h, states: { ...h.states, "fan.office_fan_fan": { ...h.states["fan.office_fan_fan"], state: "off" } } };
  assert.equal(lib.caRoleOf(other, "fan.bedroom_fan_fan", "voc"), undefined);
  // The sensor comes back with its device class: the device is looked up again.
  const back = {
    ...other,
    states: {
      ...other.states,
      "sensor.bedroom_fan_air": { entity_id: "sensor.bedroom_fan_air", state: "120", attributes: { device_class: "volatile_organic_compounds_parts" } },
    },
  };
  assert.equal(lib.caRoleOf(back, "fan.bedroom_fan_fan", "voc"), "sensor.bedroom_fan_air");
});
