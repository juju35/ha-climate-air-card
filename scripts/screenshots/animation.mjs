// Records each card running as a looping GIF under screenshots/, one per distinct animation and theme.
// Usage: npm install && npm run build && node scripts/screenshots/animation.mjs  (needs ffmpeg)
import { animate as animateOne } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

// Every animation is recorded twice with the same setup: <file>.gif in the light theme, <file>-dark.gif in the dark one.
const animate = async (opts) => {
  await animateOne(opts);
  await animateOne({ ...opts, file: `${opts.file}-dark`, theme: "dark" });
};

// The air purifier drawing air in: inlets suck, the floor glows, the clean air rises.
await animate({
  file: "purifier",
  tag: "climate-air-purifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "fan.living_room_purifier_air_purifier" } }),
});

// A Dyson-style bladeless purifier running: clean air streams up through the hollow loop (no blades to turn).
await animate({
  file: "purifier-dyson",
  tag: "climate-air-purifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "fan.living_room_purifier_air_purifier", illustration: "dyson" } }),
});

// The fan running: blades spin, the head oscillates and gusts of air stream out.
await animate({
  file: "fan",
  tag: "climate-air-fan-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "fan.bedroom_fan_fan" } }),
});

// The air conditioner cooling: the louvres flap and the chilled air falls from them.
await animate({
  file: "aircon",
  tag: "climate-air-aircon-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "climate.air_conditioner" } }),
});

// The air conditioner heating: warm air shimmers out of the vent (the swing off, so only the shimmer moves).
await animate({
  file: "aircon-heat",
  tag: "climate-air-aircon-card",
  setup: (_s, lang) => ({
    hass: mockHass(lang, { "climate.air_conditioner": { state: "heat", current_temperature: 18.5, temperature: 21, swing_mode: "off", fan_mode: "low" } }),
    config: { entity: "climate.air_conditioner" },
  }),
});

// The air conditioner drying: droplets fall from the vent while the louvres flap.
await animate({
  file: "aircon-dry",
  tag: "climate-air-aircon-card",
  setup: (_s, lang) => ({
    hass: mockHass(lang, { "climate.air_conditioner": { state: "dry", temperature: 24 } }),
    config: { entity: "climate.air_conditioner" },
  }),
});

// The heat pump heating: the fan spins behind its grille, the water flows to the house and warm air rises.
await animate({
  file: "heatpump",
  tag: "climate-air-heatpump-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "climate.heat_pump" } }),
});

// The heat pump heating the hot water: the valve sends the flow to the tank, heat rises above it.
await animate({
  file: "heatpump-dhw",
  tag: "climate-air-heatpump-card",
  setup: (_s, lang) => ({
    hass: mockHass(lang, { "sensor.heat_pump_three_way_valve": { state: "Domestic hot water" }, "water_heater.heat_pump_hot_water": { current_temperature: 44 } }),
    config: { entity: "climate.heat_pump" },
  }),
});

// The heat pump cooling: the fan spins and snowflakes fall above the unit.
await animate({
  file: "heatpump-cool",
  tag: "climate-air-heatpump-card",
  setup: (_s, lang) => ({
    hass: mockHass(lang, { "climate.heat_pump": { state: "cool", hvac_action: "cooling", current_temperature: 26.5, temperature: 24 } }),
    config: { entity: "climate.heat_pump" },
  }),
});

// The overview with every device on: each tile's icon and status ring animate together.
await animate({
  file: "overview",
  tag: "climate-air-overview-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: {} }),
});
