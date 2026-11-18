// Renders the ventilation cards with the mock home and saves the README screenshots.
// Usage: npm install && npm run build && node scripts/screenshots/ventilation.mjs
import { pair, shoot } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

const entity = "fan.ventilation";

await shoot({
  prefix: "ventilation",
  tag: "climate-air-ventilation-card",
  shots: pair("card"),
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity } }),
});

// Boost on, the bypass open on a summer night: the exchanger is bypassed, the supply air as cool as outdoors.
await shoot({
  prefix: "ventilation",
  tag: "climate-air-ventilation-card",
  shots: pair("boost"),
  setup: (_s, lang) => ({
    hass: mockHass(lang, {
      "switch.ventilation_boost": { state: "on" },
      "fan.ventilation": { percentage: 100 },
      "sensor.ventilation_bypass_state": { state: 100 },
      "sensor.ventilation_outdoor_air_temperature": { state: 16.2 },
      "sensor.ventilation_supply_air_temperature": { state: 16.8 },
      "sensor.ventilation_extract_air_temperature": { state: 24.6 },
      "sensor.ventilation_exhaust_air_temperature": { state: 24.1 },
    }),
    config: { entity },
  }),
});

await shoot({
  prefix: "ventilation",
  tag: "climate-air-ventilation-mini-card",
  shots: pair("mini"),
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity } }),
});
