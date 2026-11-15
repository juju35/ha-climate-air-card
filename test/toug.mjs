// An Aldes T.One AquaAir through the TOUG gateway (ESPHome): no climate entity, the select of its mode, the valve,
// the thermostat number and the tank temperature, as the tests add them to the mock home. With `zones`, the real
// multi-zone device of issue #70: one temperature sensor and one setpoint number per room, the hot water tank as its
// percentage, remaining volume and temperature, and the fault sensor, instead of the single thermostat.
export const addToug = (h, { mode = "Confort", valve = "Air", zones = false, fault = "Aucun" } = {}) => {
  const dev = "dev_toug";
  h.devices[dev] = { id: dev, name: "T.One AquaAir", name_by_user: null, area_id: "living_room", model: "TOUG" };
  const add = (entity_id, state, attributes = {}) => {
    h.entities[entity_id] = { entity_id, device_id: dev, area_id: null, platform: "esphome" };
    h.states[entity_id] = { entity_id, state: String(state), attributes, last_changed: "" };
  };
  add("select.t_one_mode_air", mode, { friendly_name: "T.One AquaAir Mode air", options: ["Off", "Confort", "Eco", "Boost", "Prog A"] });
  add("sensor.t_one_aiguillage_vanne", valve, { friendly_name: "T.One AquaAir Aiguillage vanne" });
  add("sensor.t_one_temperature_exterieure", 6, { friendly_name: "T.One AquaAir Température extérieure", device_class: "temperature", unit_of_measurement: "°C" });
  if (zones) {
    const rooms = [
      ["sejour", "Séjour", 20.6, 20],
      ["chambre_parentale", "Chambre parentale", 19.9, 19],
      ["chambre_nathan", "Chambre Nathan", 20.5, 20],
      ["chambre_james", "Chambre James", 20.3, 20],
      ["chambre_ami", "Chambre ami", 20.4, 20],
    ];
    for (const [key, name, temp, set] of rooms) {
      add(`sensor.t_one_temperature_${key}`, temp, { friendly_name: `T.One AquaAir Température ${name}`, device_class: "temperature", unit_of_measurement: "°C" });
      add(`number.t_one_temperature_${key}`, set, { friendly_name: `T.One AquaAir Réglage consigne température ${name}`, min: 16, max: 26, step: 0.5, unit_of_measurement: "°C" });
    }
    add("sensor.t_one_temperature_ecs", 46, { friendly_name: "T.One AquaAir Température ECS", device_class: "temperature", unit_of_measurement: "°C" });
    add("sensor.t_one_pourcentage_ecs", 75, { friendly_name: "T.One AquaAir Pourcentage ECS", unit_of_measurement: "%" });
    add("sensor.t_one_volume_restant_ecs", 160, { friendly_name: "T.One AquaAir Volume restant ECS", unit_of_measurement: "L" });
    add("sensor.t_one_defauts", fault, { friendly_name: "T.One AquaAir Défauts" });
  } else {
    add("number.t_one_thermostat", 21, { friendly_name: "T.One AquaAir Thermostat", min: 7, max: 30, step: 0.5, unit_of_measurement: "°C" });
    add("sensor.t_one_temperature_ballon", 48, { friendly_name: "T.One AquaAir Température ballon", device_class: "temperature", unit_of_measurement: "°C" });
    add("sensor.t_one_temperature_interieure", 20.8, { friendly_name: "T.One AquaAir Température intérieure", device_class: "temperature", unit_of_measurement: "°C" });
  }
  return h;
};
