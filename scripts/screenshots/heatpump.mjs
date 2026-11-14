// Renders the heat pump cards with the mock home and saves the README screenshots.
// Usage: npm install && npm run build && node scripts/screenshots/heatpump.mjs
import { pair, shoot } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

const entity = "climate.heat_pump";
// The valve sends the heat to the hot water tank.
const dhw = { "sensor.heat_pump_three_way_valve": { state: "Domestic hot water" }, "water_heater.heat_pump_hot_water": { current_temperature: 44 } };
// Cooling on a hot day.
const cool = { [entity]: { state: "cool", hvac_action: "cooling", current_temperature: 26.5, temperature: 24 }, "sensor.heat_pump_outdoor_temperature": { state: 33 } };
// Defrosting on a freezing morning, the backup heater on.
const defrost = {
  "binary_sensor.heat_pump_defrost": { state: "on" },
  "binary_sensor.heat_pump_backup_heater": { state: "on" },
  "sensor.heat_pump_outdoor_temperature": { state: -3 },
};

await shoot({
  prefix: "heatpump",
  tag: "climate-air-heatpump-card",
  shots: [...pair("card"), ...pair("dhw", { changes: dhw }), ...pair("cool", { changes: cool }), ...pair("defrost", { changes: defrost })],
  setup: (s, lang) => ({ hass: mockHass(lang, s.changes), config: { entity } }),
});

await shoot({
  prefix: "heatpump",
  tag: "climate-air-heatpump-mini-card",
  shots: [...pair("mini")],
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity } }),
});
