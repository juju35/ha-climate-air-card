// An Aldes T.One AquaAir through the TOUG gateway (ESPHome): no climate entity, the select of its mode, the valve,
// the thermostat number and the tank temperature, as the tests add them to the mock home.
export const addToug = (h, { mode = "Confort", valve = "Air" } = {}) => {
  const dev = "dev_toug";
  h.devices[dev] = { id: dev, name: "T.One AquaAir", name_by_user: null, area_id: "living_room", model: "TOUG" };
  const add = (entity_id, state, attributes = {}) => {
    h.entities[entity_id] = { entity_id, device_id: dev, area_id: null, platform: "esphome" };
    h.states[entity_id] = { entity_id, state: String(state), attributes, last_changed: "" };
  };
  add("select.t_one_mode_air", mode, { friendly_name: "T.One AquaAir Mode air", options: ["Off", "Confort", "Eco", "Boost", "Prog A"] });
  add("sensor.t_one_aiguillage_vanne", valve, { friendly_name: "T.One AquaAir Aiguillage vanne" });
  add("number.t_one_thermostat", 21, { friendly_name: "T.One AquaAir Thermostat", min: 7, max: 30, step: 0.5, unit_of_measurement: "°C" });
  add("sensor.t_one_temperature_ballon", 48, { friendly_name: "T.One AquaAir Température ballon", device_class: "temperature", unit_of_measurement: "°C" });
  add("sensor.t_one_temperature_interieure", 20.8, { friendly_name: "T.One AquaAir Température intérieure", device_class: "temperature", unit_of_measurement: "°C" });
  add("sensor.t_one_temperature_exterieure", 6, { friendly_name: "T.One AquaAir Température extérieure", device_class: "temperature", unit_of_measurement: "°C" });
  return h;
};
