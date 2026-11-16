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
  shots: [
    ...pair("card"),
    ...pair("dhw", { changes: dhw }),
    ...pair("cool", { changes: cool }),
    ...pair("defrost", { changes: defrost }),
    // The source side of the illustration (issue #90): a geothermal loop or a well in place of the outdoor unit,
    // on the same air-to-water heat pump (heating, so the brine / water flows).
    ...pair("ground", { config: { source: "ground", ground_type: "collector" } }),
    ...pair("ground-borehole", { config: { source: "ground", ground_type: "borehole" } }),
    ...pair("water", { config: { source: "water", water_type: "well" } }),
    ...pair("water-doublet", { config: { source: "water", water_type: "doublet" } }),
    ...pair("water-lake", { config: { source: "water", water_type: "lake" } }),
  ],
  setup: (s, lang) => ({ hass: mockHass(lang, s.changes), config: { entity, ...s.config } }),
});

// Measured but not controlled (issue #90): the entity is an electrical power sensor with no device, every
// monitoring entity set in `entities`. Read-only, running above the power threshold, with its COP and readings.
const meteredHass = (lang) => {
  const hass = mockHass(lang);
  const add = (id, state, friendly_name, attributes = {}) => {
    hass.states[id] = { entity_id: id, state: String(state), attributes: { friendly_name, ...attributes }, last_changed: "" };
    hass.entities[id] = { entity_id: id, platform: "modbus" }; // no device_id: Modbus platform sensors
  };
  add("sensor.heatpump_power", 5100, "Heat pump power", { device_class: "power", unit_of_measurement: "W" });
  add("sensor.heatpump_heat", 18.4, "Heat pump heat output", { device_class: "power", unit_of_measurement: "kW" });
  add("sensor.heatpump_cop", 4.2, "Heat pump COP");
  add("sensor.heatpump_cop_today", 3.4, "Heat pump COP today");
  add("sensor.heatpump_scop", 3.5, "Heat pump SCOP");
  add("sensor.heatpump_flow", 35, "Heat pump flow temperature", { device_class: "temperature", unit_of_measurement: "°C" });
  add("sensor.heatpump_return", 30, "Heat pump return temperature", { device_class: "temperature", unit_of_measurement: "°C" });
  add("sensor.heatpump_rate", 1200, "Heat pump flow rate", { unit_of_measurement: "l/h" });
  add("sensor.heatpump_energy", 1850, "Heat pump electrical energy", { device_class: "energy", unit_of_measurement: "kWh" });
  add("sensor.heatpump_heat_energy", 6.2, "Heat pump heat energy", { device_class: "energy", unit_of_measurement: "MWh" });
  add("weather.home", "sunny", "Home", { temperature: 7, temperature_unit: "°C" });
  return hass;
};

await shoot({
  prefix: "heatpump",
  tag: "climate-air-heatpump-card",
  shots: [...pair("metered")],
  setup: (_s, lang) => ({
    hass: meteredHass(lang),
    config: {
      entity: "sensor.heatpump_power",
      name: "Heat pump",
      source: "water",
      water_type: "well",
      outdoor_temp: "weather.home",
      entities: {
        heat_power: "sensor.heatpump_heat",
        cop: "sensor.heatpump_cop",
        cop_today: "sensor.heatpump_cop_today",
        scop: "sensor.heatpump_scop",
        flow_temp: "sensor.heatpump_flow",
        return_temp: "sensor.heatpump_return",
        flow_rate: "sensor.heatpump_rate",
        energy: "sensor.heatpump_energy",
        heat_energy: "sensor.heatpump_heat_energy",
      },
    },
  }),
});

await shoot({
  prefix: "heatpump",
  tag: "climate-air-heatpump-mini-card",
  shots: [...pair("mini")],
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity } }),
});
