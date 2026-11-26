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

// The ceiling fan turning, its light on: the blades spin and the breeze falls into the room.
await animate({
  file: "fan-circulator",
  tag: "climate-air-fan-card",
  setup: (_s, lang) => ({ hass: mockHass(lang, {}, { switchbot: true }), config: { entity: "fan.study_fan" } }),
});

await animate({
  file: "fan-circulator-standing",
  tag: "climate-air-fan-card",
  setup: (_s, lang) => ({ hass: mockHass(lang, {}, { switchbot: true }), config: { entity: "fan.hall_fan" } }),
});

await animate({
  file: "purifier-switchbot-plain",
  tag: "climate-air-purifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang, {}, { switchbot: true }), config: { entity: "fan.hall_purifier" } }),
});

await animate({
  file: "purifier-switchbot-table",
  tag: "climate-air-purifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang, {}, { switchbot: true }), config: { entity: "fan.study_purifier" } }),
});

await animate({
  file: "humidifier-switchbot-evaporative",
  tag: "climate-air-humidifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang, {}, { switchbot: true }), config: { entity: "humidifier.study_humidifier" } }),
});

await animate({
  file: "fan-ceiling",
  tag: "climate-air-fan-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "fan.ceiling_fan" } }),
});

// The ceiling fan reversed (winter), its light off: the blades turn the other way and the air rises to the ceiling.
await animate({
  file: "fan-ceiling-reverse",
  tag: "climate-air-fan-card",
  setup: (_s, lang) => ({
    hass: mockHass(lang, { "fan.ceiling_fan": { direction: "reverse", percentage: 33 }, "light.ceiling_fan_light": { state: "off" } }),
    config: { entity: "fan.ceiling_fan" },
  }),
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

// The portasplit illustration cooling: the outdoor condenser's fan spins and the chilled air falls from the console.
await animate({
  file: "aircon-portasplit",
  tag: "climate-air-aircon-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "climate.air_conditioner", illustration: "portasplit" } }),
});

// The ventilation unit running: the air runs through its four ducts and its fan turns.
await animate({
  file: "ventilation",
  tag: "climate-air-ventilation-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "fan.ventilation" } }),
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

// Ground source, horizontal collector (issue #90): no outdoor fan, the brine flows in the buried serpentine loop.
await animate({
  file: "heatpump-ground",
  tag: "climate-air-heatpump-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "climate.heat_pump", source: "ground", ground_type: "collector" } }),
});

// Ground source, vertical borehole: the brine flows down one leg of the U-probe and up the other.
await animate({
  file: "heatpump-ground-borehole",
  tag: "climate-air-heatpump-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "climate.heat_pump", source: "ground", ground_type: "borehole" } }),
});

// Water source, single well: the water is drawn from the water table through the well and returned.
await animate({
  file: "heatpump-water",
  tag: "climate-air-heatpump-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "climate.heat_pump", source: "water", water_type: "well" } }),
});

// Water source, two-well doublet: the water flows up the extraction well and down the reinjection well.
await animate({
  file: "heatpump-water-doublet",
  tag: "climate-air-heatpump-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "climate.heat_pump", source: "water", water_type: "doublet" } }),
});

// Water source, submerged lake / pond loop: the water flows in the loop sunk in the water body.
await animate({
  file: "heatpump-water-lake",
  tag: "climate-air-heatpump-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "climate.heat_pump", source: "water", water_type: "lake" } }),
});

// The humidifier humidifying: mist rises from its top and the water in its tank waves.
await animate({
  file: "humidifier",
  tag: "climate-air-humidifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "humidifier.bedroom_humidifier" } }),
});

// The VOCOlinc MistFlow: mist rises while its light ring cycles through colours.
await animate({
  file: "humidifier-vocolinc",
  tag: "climate-air-humidifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "humidifier.bedroom_humidifier", illustration: "vocolinc" } }),
});

// The VOCOlinc essential oil diffuser: scented mist rises from its tip while its frosted cone glows in changing colours.
await animate({
  file: "diffuser",
  tag: "climate-air-humidifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "humidifier.living_room_diffuser" } }),
});

// The dehumidifier drying: dry air leaves its top and drops fall into its bucket.
await animate({
  file: "dehumidifier",
  tag: "climate-air-humidifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang, { "humidifier.office_dehumidifier": { state: "on", action: "drying" } }), config: { entity: "humidifier.office_dehumidifier" } }),
});

// The overview with every device on: each tile's icon and status ring animate together.
await animate({
  file: "overview",
  tag: "climate-air-overview-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: {} }),
});

// Midea: the purifier driven by its power switch, the tower dehumidifier, the Cube, the tower fan and the Breezeless,
// console, box window and Duo air conditioners.
const md = (lang) => mockHass(lang, {}, { midea: true });
for (const [file, tag, config] of [
  ["purifier-midea", "climate-air-purifier-card", { entity: "switch.office_purifier_power" }],
  ["humidifier-midea", "climate-air-humidifier-card", { entity: "humidifier.bedroom_dehumidifier" }],
  ["humidifier-cube", "climate-air-humidifier-card", { entity: "humidifier.bedroom_dehumidifier", illustration: "dehumidifier_cube" }],
  ["fan-tower", "climate-air-fan-card", { entity: "fan.office_tower_fan" }],
  ["aircon-breezeless", "climate-air-aircon-card", { entity: "climate.bedroom_breezeless" }],
  ["aircon-console", "climate-air-aircon-card", { entity: "climate.bedroom_breezeless", illustration: "console" }],
  ["aircon-window-box", "climate-air-aircon-card", { entity: "climate.bedroom_breezeless", illustration: "window_box" }],
  ["aircon-duo", "climate-air-aircon-card", { entity: "climate.bedroom_breezeless", illustration: "portable_duo" }],
]) {
  await animate({ file, tag, setup: (_s, lang) => ({ hass: md(lang), config }) });
}
