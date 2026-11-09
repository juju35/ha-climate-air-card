// Renders the thermostat cards with the mock home and saves the README screenshots.
// Usage: npm install && npm run build && node scripts/screenshots/thermostat.mjs
import { pair, shoot } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

const entity = "climate.bedroom_radiator_valve";
// The window left open and the valve's battery running low.
const alert = {
  [entity]: { hvac_action: "idle" },
  "sensor.bedroom_radiator_valve_position": { state: 0 },
  "binary_sensor.bedroom_radiator_window_open": { state: "on" },
  "sensor.bedroom_radiator_battery": { state: 9 },
};
// The wall thermostat heating the bathroom up to its target.
const dial = { "climate.bathroom_thermostat": { hvac_action: "heating", current_temperature: 19.5, temperature: 22 } };

await shoot({
  prefix: "thermostat",
  tag: "climate-air-thermostat-card",
  // "card": the radiator valve heating, its presets as buttons; "alert": an open window and a low battery.
  shots: [...pair("card"), ...pair("alert", { changes: alert })],
  setup: (s, lang) => ({ hass: mockHass(lang, s.changes), config: { entity } }),
});

await shoot({
  prefix: "thermostat",
  tag: "climate-air-thermostat-mini-card",
  // The three illustrations: the radiator valve (mini), a round wall thermostat and a column radiator.
  shots: [
    ...pair("mini"),
    ...pair("dial", { entity: "climate.bathroom_thermostat", changes: dial }),
    ...pair("radiator", { illustration: "radiator" }),
  ],
  setup: (s, lang) => ({
    hass: mockHass(lang, s.changes),
    config: { entity: s.entity || entity, ...(s.illustration ? { illustration: s.illustration } : {}) },
  }),
});
