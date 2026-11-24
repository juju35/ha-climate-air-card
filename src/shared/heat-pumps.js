// ── Heat pumps ───────────────────────────────────────────────────────────────
// What a heat pump does, from its climate entity (or, without one, the select of its mode: TOUG's « mode air ») and
// the roles of its device, shared by its card and the overview tiles. `roleSt(role)` gives a role's state.
//   phase: off, heat, cool or dhw (the valve sends the heat to the hot water tank); active: the compressor runs.
import { caNum, caUnavailable } from "./i18n-helpers.js";
import { CA_IDLE, CA_MODE_COLORS } from "./colors.js";
import { caDeviceEntities, caDeviceName, caDeviceOf } from "./device-discovery.js";
import { caVariantText } from "./illustrations.js";

export const CA_HP_DHW_COLOR = "var(--state-water_heater-on-color, #ef9f27)";
export const CA_HP_DHW = /(ecs|dhw|hot.?water|eau.?chaude|sanitaire|warm.?wasser|\bacs\b|^water$|^tank$|ballon)/i;
export const CA_HP_COOL = /(clim|cool|froid|refroid|k[uü]hl|fr[ií]o|enfri)/i;
export const CA_HP_OFF = /^(off|arr[eê]t|stop|aus|apagado|spento)$/i;
export const CA_HP_IDLE = /(standby|veille|idle|repos|attente|^off$)/i;
export const caHpIsOn = (id, state) => (id.startsWith("climate.") ? state !== "off" : !CA_HP_OFF.test(String(state ?? "").trim()));

// A power sensor's reading in watts, whatever unit it reports (W by default, kW or MW scaled up). Drives the
// "running" state of a metered heat pump and, when no COP sensor is given, the instantaneous COP.
export const caPowerW = (st) => {
  const v = caNum(st);
  if (v == null) return null;
  const u = String(st?.attributes?.unit_of_measurement || "").toLowerCase();
  return u === "kw" ? v * 1000 : u === "mw" ? v * 1e6 : v;
};
// The default power above which a metered heat pump counts as running (watts): well under the few kW the compressor
// draws, well above the tens of watts it idles at (the reporter's WPF 16: 39 W idle, ~5 kW running).
export const CA_HP_POWER_ON = 100;

// The source side of a heat pump, for the illustration: `air` (an outdoor fan unit, the default), `ground` (a
// geothermal loop — a horizontal `collector` or a vertical `borehole`) or `water` (an open loop — a single `well`,
// a two-well `doublet` or a submerged `lake` loop). Taken from the config, else guessed from the device's name.
export const CA_HP_SOURCES = ["air", "ground", "water"];
export const CA_HP_GROUND_TYPES = ["collector", "borehole"];
export const CA_HP_WATER_TYPES = ["well", "doublet", "lake"];
export const CA_HP_WATER_NAME = /(water.?source|water.?to.?water|eau.?glycol|eau.?nappe|nappe.?phr[ée]at|grundwasser|wasser.?wasser|\bwell\b|\bpuits\b|aquif)/i;
export const CA_HP_GROUND_NAME = /(ground.?source|geothermal|g[ée]othermi|erdw[aä]rme|sol.?eau|\bbrine\b|saumure|\bsole\b|borehole|sonde.?g[ée]o|capteur.?enterr)/i;
export function caHpSource(config, hass, id) {
  const c = config || {};
  const text = hass && id ? caVariantText(hass, id) : "";
  const source = CA_HP_SOURCES.includes(c.source)
    ? c.source
    : CA_HP_WATER_NAME.test(text)
      ? "water"
      : CA_HP_GROUND_NAME.test(text)
        ? "ground"
        : "air";
  const groundType = CA_HP_GROUND_TYPES.includes(c.ground_type) ? c.ground_type : "collector";
  const waterType = CA_HP_WATER_TYPES.includes(c.water_type) ? c.water_type : "well";
  return { source, groundType, waterType };
}

export function caHeatPumpState(id, st, roleSt, opts = {}) {
  const a = st.attributes;
  const climate = id.startsWith("climate.");
  const select = id.startsWith("select.");
  // Measured but not controlled: the entity is an electrical power sensor (no climate entity, no mode select).
  const metered = !climate && !select;
  const mode = st.state;
  const valve = String(roleSt("valve")?.state ?? "");
  const dhw = roleSt("dhw");
  let on;
  if (metered) {
    const powerW = caPowerW(st);
    const threshold = Number.isFinite(Number(opts.powerThreshold)) ? Number(opts.powerThreshold) : CA_HP_POWER_ON;
    on = powerW != null && powerW > threshold;
  } else on = caHpIsOn(id, mode);
  const defrost = on && roleSt("defrost")?.state === "on";
  const backup = on && roleSt("backup")?.state === "on";
  const freq = caNum(roleSt("compressor"));
  const action = climate ? a.hvac_action : undefined;
  const toTank = on && CA_HP_DHW.test(valve);
  const cool = metered ? false : climate ? (action ? action === "cooling" : mode === "cool") : CA_HP_COOL.test(String(mode));
  const idle = action ? ["idle", "off"].includes(action) : !toTank && CA_HP_IDLE.test(valve);
  // Metered: the pump runs whenever it draws power, so running means active (the compressor is on).
  const active = on && (metered || (freq != null ? freq > 0 : toTank || !idle));
  const phase = !on ? "off" : toTank ? "dhw" : cool ? "cool" : "heat";
  const tankSt = dhw?.attributes.current_temperature != null ? Number(dhw.attributes.current_temperature) : caNum(roleSt("tank_temp"));
  return {
    on,
    phase,
    active,
    defrost,
    backup,
    color: phase === "off" ? CA_IDLE : phase === "dhw" ? CA_HP_DHW_COLOR : CA_MODE_COLORS[phase],
    tank: Number.isFinite(tankSt) ? tankSt : null,
    tankTarget: dhw?.attributes.temperature != null ? Number(dhw.attributes.temperature) : null,
    statusKey: !on ? "st_off" : defrost ? "st_defrost" : phase === "dhw" ? "st_dhw" : !active ? "st_idle" : cool ? "st_cooling" : "st_heating",
  };
}

// The zones of a multi-zone air-to-water heat pump reported as a thermostat `number` per room (Aldes T.One AquaAir: one
// motorised vent and one setpoint per room, 22 °C in one room and 19 in another). A zone is a temperature `number` on
// the device — its unit is a temperature, or its name says setpoint / thermostat — paired, when one exists, with the
// `sensor` of the same object id for the room's current temperature. The hot water setpoint is not a zone. Sorted by
// name, so the rooms keep a stable order between renders.
export const CA_ZONE_STRIP = /\b(r[ée]glages?|consignes?|thermostats?|targets?|setpoints?|sollwerte?|temp[ée]ratures?|temperaturas?|temperaturen?|zones?|zonas?)\b/gi;
export function caHeatPumpZoneName(hass, id) {
  let name = hass.states[id]?.attributes.friendly_name || id;
  const dev = caDeviceName(hass, id);
  if (dev && name.toLowerCase().startsWith(dev.toLowerCase())) name = name.slice(dev.length);
  name = name
    .replace(CA_ZONE_STRIP, " ")
    .replace(/[_·-]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
}

// A room name reduced to a comparison key: accents dropped, non-letters collapsed ("Chambre parentale" and
// "chambre_parentale" both become "chambreparentale"), so a setpoint number pairs with its temperature sensor
// even when the two entities do not share an object id.
export const caZoneKey = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

// An object id with its role words dropped (number.t_one_thermostat_chambre_ami and
// sensor.t_one_temperature_chambre_ami both become "t_one_chambre_ami"), so a setpoint pairs with its room's sensor
// from the entity ids alone, whatever their friendly names say (#96).
export const CA_ZONE_ROLE = /^(r[ée]glages?|consignes?|thermostats?|targets?|setpoints?|sollwerte?|temp[ée]ratures?|temperaturas?|temperaturen?|temp)$/i;
export const caZoneBase = (obj) =>
  obj
    .split("_")
    .filter((p) => p && !CA_ZONE_ROLE.test(p))
    .join("_");

// `exclude` hides zones the user does not want (a test setpoint, or a second motorised vent driven by the same
// thermostat): the entity ids to drop, as set in the card config.
export function caHeatPumpZones(hass, id, exclude, map) {
  const skip = new Set(exclude || []);
  const override = map || {};
  const list = caDeviceEntities(hass, caDeviceOf(hass, id));
  // The device's room temperature sensors (never a shared ECS, ballon or outdoor sensor), each with its object id
  // and its room key, to pair with the setpoints.
  const temps = [];
  for (const e of list) {
    const eid = e.entity_id;
    if (!eid.startsWith("sensor.")) continue;
    const a = hass.states[eid]?.attributes || {};
    if (a.device_class !== "temperature" && !/°|deg|celsius|fahrenheit/i.test(a.unit_of_measurement || "")) continue;
    if (CA_HP_DHW.test(eid)) continue;
    const obj = eid.slice(eid.indexOf(".") + 1);
    temps.push({ eid, obj, base: caZoneBase(obj), key: caZoneKey(caHeatPumpZoneName(hass, eid)) });
  }
  // The setpoints: a thermostat number per room.
  const setpoints = [];
  for (const e of list) {
    const eid = e.entity_id;
    if (!eid.startsWith("number.") || skip.has(eid)) continue;
    const a = hass.states[eid]?.attributes || {};
    const isTemp = /°|deg|celsius|fahrenheit/i.test(a.unit_of_measurement || "") || a.device_class === "temperature";
    if (!isTemp && !/thermostat|consigne|setpoint|sollwert|temp[ée]ratur/i.test(eid)) continue;
    if (CA_HP_DHW.test(eid)) continue;
    const obj = eid.slice(eid.indexOf(".") + 1);
    const name = caHeatPumpZoneName(hass, eid) || obj;
    setpoints.push({ eid, obj, base: caZoneBase(obj), name, key: caZoneKey(name) });
  }
  // Pair each setpoint with its room's temperature sensor as a one-to-one assignment, so a sensor is never shown on
  // two rooms and an unrelated sensor (a second motorised vent, the outdoor probe) is never paired at all. A pair is
  // scored by how strongly the two belong to the same room — the same object id (the test fixture) or the same id
  // once the role words are dropped (number.t_one_thermostat_sejour with sensor.t_one_temperature_sejour), the same room
  // name, one room name contained in the other, or a shared trailing id segment — and the strongest pairs are
  // assigned first. An explicit `zone_temps` mapping
  // (setpoint → sensor) wins over all of it, for a device whose names and ids give the matcher nothing to go on.
  const paired = new Map();
  const taken = new Set();
  for (const sp of setpoints) {
    const ov = override[sp.eid];
    if (ov && hass.states[ov]) {
      paired.set(sp.eid, ov);
      taken.add(ov);
    }
  }
  const seg = (o) => o.split("_").pop();
  const score = (sp, t) => {
    if (`sensor.${sp.obj}` === t.eid || (sp.base && sp.base === t.base)) return 5;
    if (sp.key && t.key && sp.key === t.key) return 4;
    if (sp.key.length >= 3 && t.key.length >= 3 && (sp.key.includes(t.key) || t.key.includes(sp.key))) return 3;
    const a = seg(sp.obj);
    const b = seg(t.obj);
    if (a && b && (a === b || sp.obj.endsWith(`_${b}`) || t.obj.endsWith(`_${a}`))) return 2;
    return 0;
  };
  const pairs = [];
  for (const sp of setpoints) for (const t of temps) {
    const s = score(sp, t);
    if (s) pairs.push({ sp, t, s });
  }
  // Strongest first; ties resolved by name and id so the assignment is deterministic.
  pairs.sort((x, y) => y.s - x.s || x.sp.name.localeCompare(y.sp.name) || x.t.obj.localeCompare(y.t.obj));
  for (const { sp, t } of pairs) {
    if (paired.has(sp.eid) || taken.has(t.eid)) continue;
    paired.set(sp.eid, t.eid);
    taken.add(t.eid);
  }
  const zones = setpoints.map((sp) => ({ key: sp.obj, name: sp.name, temp: paired.get(sp.eid) || null, setpoint: sp.eid }));
  return zones.sort((x, y) => x.name.localeCompare(y.name));
}

// A heat pump's fault message, or null when it reports none ("Aucun", "None", "0", "OK", "—").
export const CA_NO_FAULT = /^(aucun|aucune|none|no|non|ok|rien|normal|nominal|0|-|—|n\/a|nan|clear|keine?|ninguno|nessuno)$/i;
export function caHpFault(st) {
  if (!st || caUnavailable(st)) return null;
  const s = String(st.state).trim();
  return s && !CA_NO_FAULT.test(s) ? s : null;
}
