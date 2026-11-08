// Renders the air conditioner cards with the mock home and saves the README screenshots.
// Usage: npm install && npm run build && node scripts/screenshots/aircon.mjs
import { pair, shoot } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

const entity = "climate.air_conditioner";
// Heating on a cold day, with a dust filter to clean.
const heating = {
  [entity]: { state: "heat", current_temperature: 18.5, temperature: 21, swing_mode: "off", fan_mode: "low" },
  "sensor.air_conditioner_outdoor_temperature": { state: 4 },
  "sensor.air_conditioner_real_time_power": { state: 910 },
  "binary_sensor.air_conditioner_full_dust": { state: "on" },
};

// Heat / cool (auto) with a low / high range instead of one target.
const range = {
  [entity]: {
    state: "heat_cool",
    hvac_modes: ["off", "heat_cool", "cool", "dry", "heat", "fan_only"],
    supported_features: 442,
    temperature: null,
    target_temp_low: 20,
    target_temp_high: 24,
    hvac_action: "cooling",
  },
};

// Drying, with a target humidity (TARGET_HUMIDITY).
const dry = {
  [entity]: { state: "dry", supported_features: 957, humidity: 50, min_humidity: 30, max_humidity: 80, current_humidity: 64, fan_mode: "low" },
};

await shoot({
  prefix: "aircon",
  tag: "climate-air-aircon-card",
  shots: [...pair("card"), ...pair("heat", { changes: heating }), ...pair("range", { changes: range }), ...pair("dry", { changes: dry })],
  setup: (s, lang) => ({ hass: mockHass(lang, s.changes), config: { entity } }),
});

await shoot({
  prefix: "aircon",
  tag: "climate-air-aircon-mini-card",
  // The three illustrations: the wall split unit (mini), a portable unit and a window split.
  shots: [...pair("mini"), ...pair("portable", { illustration: "portable" }), ...pair("window", { illustration: "window" })],
  setup: (s, lang) => ({ hass: mockHass(lang), config: { entity, ...(s.illustration ? { illustration: s.illustration } : {}) } }),
});
