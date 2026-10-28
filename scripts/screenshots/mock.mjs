// Mock home for the screenshots (and the unit tests): two air purifiers, two fans and an air conditioner, with the
// entities their integrations expose (Xiaomi Home, HomeKit, Midea style), named in English or French (the screenshots
// use English, the unit tests both).
// mockHass(lang, changes) — changes: { entity_id: { state?, ...attributes } } applied on top.
const AREAS = { living_room: { en: "Living room", fr: "Séjour" }, bedroom: { en: "Bedroom", fr: "Chambre" }, office: { en: "Office", fr: "Bureau" } };

// [device, area, names, entities: [entity_id, names, state, attributes]]
const DEVICES = [
  ["dev_p1", "living_room", { en: "Living room purifier", fr: "Purificateur séjour" }, [
    ["fan.living_room_purifier_air_purifier", null, "on",
      { preset_modes: ["Auto", "Sleep", "Favorite"], preset_mode: "Auto", percentage: 33, percentage_step: 33.333, supported_features: 57 }],
    ["sensor.living_room_purifier_pm2_5_density", { en: "PM2.5 density", fr: "Densité PM2.5" }, 6, { device_class: "pm25", unit_of_measurement: "µg/m³" }],
    ["sensor.living_room_purifier_temperature", { en: "Temperature", fr: "Température" }, 21.5, { device_class: "temperature", unit_of_measurement: "°C" }],
    ["sensor.living_room_purifier_relative_humidity", { en: "Humidity", fr: "Humidité" }, 48, { device_class: "humidity", unit_of_measurement: "%" }],
    ["sensor.living_room_purifier_filter_life_level", { en: "Filter life level", fr: "Durée de vie du filtre" }, 76, { unit_of_measurement: "%" }],
    ["sensor.living_room_purifier_filter_used_time", { en: "Filter used time", fr: "Utilisation du filtre" }, 820, { unit_of_measurement: "h" }],
    ["number.living_room_purifier_favorite_fan_level", { en: "Favorite level", fr: "Niveau favori" }, 10, { min: 1, max: 14, step: 1 }],
    ["switch.living_room_purifier_physical_controls_locked", { en: "Child lock", fr: "Sécurité enfant" }, "on", {}],
    ["switch.living_room_purifier_alarm", { en: "Alarm", fr: "Alarme" }, "off", {}],
    ["light.living_room_purifier_indicator_light", { en: "Indicator light", fr: "Voyant" }, "on", {}],
  ]],
  ["dev_p2", "bedroom", { en: "Bedroom purifier", fr: "Purificateur chambre" }, [
    ["fan.bedroom_purifier", null, "on", { preset_modes: ["auto"], preset_mode: "auto", percentage: 40, percentage_step: 1, supported_features: 57 }],
    ["sensor.bedroom_purifier_pm2_5_density", { en: "PM2.5 Density", fr: "Densité PM2.5" }, 18, { device_class: "pm25", unit_of_measurement: "µg/m³" }],
    ["sensor.bedroom_purifier_pm10_density", { en: "PM10 Density", fr: "Densité PM10" }, 22, { device_class: "pm10", unit_of_measurement: "µg/m³" }],
    ["sensor.bedroom_purifier_air_quality", { en: "Air Quality", fr: "Qualité de l'air" }, 3, { device_class: "aqi" }],
    ["sensor.bedroom_purifier_filter_lifetime", { en: "Filter lifetime", fr: "Durée de vie du filtre" }, 8, { unit_of_measurement: "%" }],
    ["sensor.bedroom_purifier_air_purifier_status", { en: "Air Purifier Status", fr: "Statut" }, "purifying",
      { device_class: "enum", options: ["inactive", "idle", "purifying"] }],
    ["select.bedroom_purifier_air_purifier_mode", { en: "Air Purifier Mode", fr: "Mode" }, "automatic", { options: ["automatic", "manual"] }],
  ]],
  ["dev_dyson", "living_room", { en: "Dyson Pure Cool", fr: "Dyson Pure Cool" }, [
    ["fan.dyson_pure_cool", null, "on", { preset_modes: ["Auto", "Manual"], preset_mode: "Auto", percentage: 30, percentage_step: 10, oscillating: true, supported_features: 57 }],
    ["sensor.dyson_pure_cool_pm_2_5", { en: "PM 2.5", fr: "PM 2.5" }, 5, { device_class: "pm25", unit_of_measurement: "µg/m³" }],
    ["sensor.dyson_pure_cool_pm_10", { en: "PM 10", fr: "PM 10" }, 9, { device_class: "pm10", unit_of_measurement: "µg/m³" }],
    ["sensor.dyson_pure_cool_volatile_organic_compounds", { en: "Volatile organic compounds", fr: "Composés organiques volatils" }, 4, {}],
    ["sensor.dyson_pure_cool_nitrogen_dioxide", { en: "Nitrogen dioxide", fr: "Dioxyde d'azote" }, 1, {}],
    ["sensor.dyson_pure_cool_temperature", { en: "Temperature", fr: "Température" }, 22, { device_class: "temperature", unit_of_measurement: "°C" }],
    ["sensor.dyson_pure_cool_humidity", { en: "Humidity", fr: "Humidité" }, 50, { device_class: "humidity", unit_of_measurement: "%" }],
    ["sensor.dyson_pure_cool_carbon_filter_life", { en: "Carbon filter life", fr: "Durée du filtre charbon" }, 94, { unit_of_measurement: "%" }],
    ["sensor.dyson_pure_cool_hepa_filter_life", { en: "HEPA filter life", fr: "Durée du filtre HEPA" }, 76, { unit_of_measurement: "%" }],
    ["switch.dyson_pure_cool_night_mode", { en: "Night mode", fr: "Mode nuit" }, "off", {}],
  ]],
  ["dev_f1", "bedroom", { en: "Bedroom fan", fr: "Ventilateur chambre" }, [
    ["fan.bedroom_fan_fan", { en: "Fan", fr: "Fan" }, "on",
      { preset_modes: ["Natural wind", "Straight wind"], preset_mode: "Natural wind", oscillating: true, percentage: 45, percentage_step: 1, supported_features: 59 }],
    ["sensor.bedroom_fan_temperature", { en: "Temperature", fr: "Température" }, 24, { device_class: "temperature", unit_of_measurement: "°C" }],
    ["sensor.bedroom_fan_relative_humidity", { en: "Humidity", fr: "Humidité" }, 52, { device_class: "humidity", unit_of_measurement: "%" }],
    ["number.bedroom_fan_horizontal_angle", { en: "Angle", fr: "Angle" }, 90, { min: 30, max: 150, step: 30, unit_of_measurement: "°" }],
    ["number.bedroom_fan_countdown_time", { en: "Countdown", fr: "Minuterie" }, 0, { min: 0, max: 480, step: 60, unit_of_measurement: "min" }],
    ["button.bedroom_fan_turn_left", { en: "Turn left", fr: "Tourner à gauche" }, "unknown", {}],
    ["button.bedroom_fan_turn_right", { en: "Turn right", fr: "Tourner à droite" }, "unknown", {}],
    ["switch.bedroom_fan_physical_controls_locked", { en: "Child lock", fr: "Sécurité enfant" }, "off", {}],
    ["switch.bedroom_fan_alarm", { en: "Sound", fr: "Son" }, "off", {}],
    ["light.bedroom_fan_indicator_light", { en: "Indicator light", fr: "Voyant" }, "off", {}],
  ]],
  ["dev_f2", "office", { en: "Office fan", fr: "Ventilateur bureau" }, [
    ["fan.office_fan_fan", { en: "Fan", fr: "Fan" }, "off",
      { preset_modes: ["Natural", "Standard"], preset_mode: "Natural", oscillating: false, percentage: 100, percentage_step: 25, supported_features: 59 }],
  ]],
  ["dev_ac", "living_room", { en: "Air conditioner", fr: "Climatiseur" }, [
    ["climate.air_conditioner", null, "cool", {
      hvac_modes: ["off", "auto", "cool", "dry", "heat", "fan_only"], min_temp: 16, max_temp: 30, target_temp_step: 0.5,
      fan_modes: ["silent", "low", "medium", "high", "full", "auto"], preset_modes: ["none", "comfort", "eco", "boost", "sleep", "away"],
      swing_modes: ["off", "vertical", "horizontal", "both"], current_temperature: 25.5, temperature: 22, fan_mode: "auto",
      preset_mode: "none", swing_mode: "vertical", supported_features: 441 }],
    ["sensor.air_conditioner_indoor_temperature", { en: "Indoor temperature", fr: "Température intérieure" }, 25.5, { device_class: "temperature", unit_of_measurement: "°C" }],
    ["sensor.air_conditioner_outdoor_temperature", { en: "Outdoor temperature", fr: "Température extérieure" }, 31, { device_class: "temperature", unit_of_measurement: "°C" }],
    ["sensor.air_conditioner_real_time_power", { en: "Real-time power", fr: "Puissance" }, 640, { device_class: "power", unit_of_measurement: "W" }],
    ["sensor.air_conditioner_compressor_power", { en: "Compressor power", fr: "Puissance compresseur" }, 520, { device_class: "power", unit_of_measurement: "W" }],
    ["sensor.air_conditioner_compressor_frequency", { en: "Compressor frequency", fr: "Fréquence compresseur" }, 52, { device_class: "frequency", unit_of_measurement: "Hz" }],
    ["sensor.air_conditioner_target_compressor_frequency", { en: "Target compressor frequency", fr: "Fréquence cible" }, 55, { device_class: "frequency", unit_of_measurement: "Hz" }],
    ["binary_sensor.air_conditioner_full_dust", { en: "Full dust", fr: "Filtre encrassé" }, "off", { device_class: "problem" }],
    ["switch.air_conditioner_eco", { en: "Eco", fr: "Éco" }, "off", {}],
    ["switch.air_conditioner_screen_display", { en: "Screen display", fr: "Écran" }, "on", {}],
    ["switch.air_conditioner_self_clean", { en: "Self clean", fr: "Autonettoyage" }, "off", {}],
    ["switch.air_conditioner_prompt_tone", { en: "Prompt tone", fr: "Bip" }, "on", {}],
  ]],
];

// What Home Assistant itself translates: the climate modes, and the climate fan, swing and preset values it knows.
// Integration-specific values (Xiaomi Home presets, Midea's silent / full fan modes, HomeKit modes) are left raw,
// as Home Assistant does: the cards translate them.
const LABELS = {
  en: {
    off: "Off", cool: "Cool", heat: "Heat", dry: "Dry", auto: "Auto", fan_only: "Fan only", heat_cool: "Heat/Cool",
    low: "Low", medium: "Medium", high: "High", none: "None", comfort: "Comfort", eco: "Eco", boost: "Boost", sleep: "Sleep",
    away: "Away", vertical: "Vertical", horizontal: "Horizontal", both: "Both",
  },
  fr: {
    off: "Arrêt", cool: "Froid", heat: "Chaud", dry: "Déshumidification", auto: "Automatique", fan_only: "Ventilation",
    heat_cool: "Chaud/Froid", low: "Faible", medium: "Moyen", high: "Élevé", none: "Aucun", comfort: "Confort", eco: "Éco",
    boost: "Boost", sleep: "Nuit", away: "Absent", vertical: "Vertical", horizontal: "Horizontal", both: "Les deux",
  },
};

export const mockHass = (lang = "en", changes = {}) => {
  const states = {};
  const entities = {};
  const devices = {};
  const areas = Object.fromEntries(Object.entries(AREAS).map(([area_id, n]) => [area_id, { area_id, name: n[lang] }]));
  for (const [dev, area_id, names, items] of DEVICES) {
    devices[dev] = { id: dev, name: names[lang], name_by_user: null, area_id };
    for (const [entity_id, n, state, attributes] of items) {
      const friendly_name = n ? `${names[lang]} ${n[lang]}` : names[lang];
      const { state: s = state, ...attrs } = changes[entity_id] || {};
      entities[entity_id] = { entity_id, device_id: dev, area_id: null, platform: "mock" };
      states[entity_id] = { entity_id, state: String(s), attributes: { friendly_name, ...attributes, ...attrs }, last_changed: "" };
    }
  }
  // A heat-only thermostat: not an air conditioner, so the cards leave it out.
  states["climate.bathroom_thermostat"] = {
    entity_id: "climate.bathroom_thermostat",
    state: "heat",
    attributes: { friendly_name: "Bathroom thermostat", hvac_modes: ["off", "heat"], current_temperature: 20, temperature: 21, supported_features: 385 },
  };
  entities["climate.bathroom_thermostat"] = { entity_id: "climate.bathroom_thermostat", platform: "mock" };
  return {
    states,
    entities,
    devices,
    areas,
    language: lang,
    locale: { language: lang },
    config: { unit_system: { temperature: "°C" } },
    labels: LABELS[lang],
  };
};
