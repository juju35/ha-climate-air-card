// ── Device discovery ─────────────────────────────────────────────────────────
// Feature flags (homeassistant.components.fan / climate).
import { caUnavailable } from "./i18n-helpers.js";
import { CA_HP_OFF } from "./heat-pumps.js";

export const CA_FAN_SET_SPEED = 1;
export const CA_FAN_OSCILLATE = 2;
export const CA_FAN_DIRECTION = 4;
export const CA_FAN_PRESET = 8;
export const CA_CLIMATE_TARGET = 1;
export const CA_CLIMATE_RANGE = 2;
export const CA_CLIMATE_TARGET_HUMIDITY = 4;
export const CA_CLIMATE_FAN_MODE = 8;
export const CA_CLIMATE_PRESET = 16;
export const CA_CLIMATE_SWING = 32;
export const CA_CLIMATE_SWING_HORIZONTAL = 512;

// Taps on − / + and a slider moved from the keyboard: the service is called once they stop for this long.
export const CA_TEMP_DEBOUNCE = 900;
// Once sent, a target stays on screen until the entity reports it, or for this long at most (a device that rounds it).
export const CA_TEMP_SETTLE = 10000;

// The service data of a pending target: one temperature, or a low / high range (`target_temp_low`, `target_temp_high`).
export const caTempData = (pending) => (typeof pending === "number" ? { temperature: pending } : pending);

// The low / high range of a climate entity (heat_cool, auto) when it sets one instead of a single target, else null.
export const caClimateRange = (a) => {
  const f = a.supported_features || 0;
  if (!(f & CA_CLIMATE_RANGE) || a.target_temp_low == null || a.target_temp_high == null) return null;
  if (f & CA_CLIMATE_TARGET && a.temperature != null) return null;
  return { low: Number(a.target_temp_low), high: Number(a.target_temp_high) };
};

// Opens Home Assistant's more-info dialog of `entityId`, from the element `el`.
export const caMoreInfo = (el, entityId) => el.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));

// Chips are not buttons: Enter or Space on a focused one opens its more-info, like a click. True when handled.
export const caChipKey = (host, ev) => {
  const entity = ev.target?.dataset?.moreInfo;
  if (!entity || (ev.key !== "Enter" && ev.key !== " ")) return false;
  ev.preventDefault();
  caMoreInfo(host, entity);
  return true;
};

// A render rebuilds the card's markup, which drops the focus: what identifies the focused control (its tag and its
// data-* attributes: data-action + data-value, data-toggle, data-more-info…) finds its replacement afterwards.
export const caFocusKey = (el) => {
  const data = [...(el?.attributes || [])].filter((a) => a.name.startsWith("data-")).map((a) => [a.name, a.value]);
  return data.length ? { tag: el.localName, data } : null;
};

export const caFindKey = (root, key) => [...root.querySelectorAll(key.tag)].find((n) => key.data.every(([k, v]) => n.getAttribute(k) === v));

export const caRestoreFocus = (root, key) => {
  if (!key || root.activeElement) return;
  caFindKey(root, key)?.focus({ preventScroll: true });
};

// A dropdown or a slider that has the focus (open, dragged, moved with the arrows) must not be rebuilt under the
// finger, but the rest of the card must not freeze either: `root` takes the new markup of `fresh` (detached) around
// `keep`, which stays in place with its focus, its value and its open list; `twin` is its counterpart in `fresh`.
// Its ancestors stay too, with the attributes of their counterparts, and everything else is replaced. False when the
// two trees do not line up (the control moved): the caller rebuilds the whole card then.
export const caPatchAround = (root, fresh, keep, twin) => {
  const path = (n, top) => {
    const out = [];
    for (; n && n !== top; n = n.parentNode) out.unshift(n);
    return n === top ? out : null;
  };
  const olds = path(keep, root);
  const news = path(twin, fresh);
  if (!olds || !news || olds.length !== news.length || olds.some((n, i) => n.localName !== news[i].localName)) return false;
  let oldParent = root;
  let newParent = fresh;
  olds.forEach((node, i) => {
    const twinNode = news[i];
    const kids = [...newParent.childNodes];
    const at = kids.indexOf(twinNode);
    for (const n of [...oldParent.childNodes]) if (n !== node && !caForeign(n)) n.remove();
    node.before(...kids.slice(0, at));
    node.after(...kids.slice(at + 1));
    if (node !== keep) {
      for (const a of [...node.attributes]) if (!twinNode.hasAttribute(a.name)) node.removeAttribute(a.name);
      for (const a of [...twinNode.attributes]) if (node.getAttribute(a.name) !== a.value) node.setAttribute(a.name, a.value);
    }
    oldParent = node;
    newParent = twinNode;
  });
  return true;
};

// A state update patches the card in place instead of rewriting its shadow root. A rewrite replaced <ha-card> and
// every <ha-icon>, whose own shadow DOM Home Assistant renders a microtask later: the card's measurements (status
// pill) forced a layout in between, with the card collapsed to its border, which shortened the page and moved its
// scroll position (the dashboard jumped on every sensor change); it also restarted the illustration's animations and
// reloaded the brand logo. `caMorph(root, html)` turns `root`'s children into `html`, keeping every node that is still
// there (same tag at the same place, or the same `data-key` / `data-id` among its siblings) and updating its
// attributes and text; only what changed is inserted or removed.
export const caPatchAttrs = (cur, next) => {
  // A custom element may style its own host (an inline style the markup never gives): that one stays.
  const own = cur.localName.includes("-") ? "style" : "";
  for (const { name } of [...cur.attributes]) if (!next.hasAttribute(name) && name !== own) cur.removeAttribute(name);
  for (const { name, value } of next.attributes) if (cur.getAttribute(name) !== value) cur.setAttribute(name, value);
};
export const caKeyOf = (n) => (n.nodeType === 1 ? (n.getAttribute("data-key") ?? n.getAttribute("data-id")) : null);
// Nodes the card does not render itself stay where they are, untouched: card-mod's <card-mod> element (its styles),
// inserted into the shadow root after the card has drawn (#107). Neither matched to the card's markup nor trimmed.
export const CA_FOREIGN = new Set(["card-mod"]);
export const caForeign = (n) => n.nodeType === 1 && CA_FOREIGN.has(n.localName);
export const caPatchChildren = (cur, next) => {
  const all = [...cur.childNodes];
  const old = all.filter((n) => !caForeign(n));
  // With a foreign node among them, positions count the card's own nodes only, and a node added at the end goes
  // before the foreign ones, which keep the last place (card-mod's styles after the card's own).
  const at =
    old.length === all.length
      ? (i) => cur.childNodes[i] ?? null
      : (i) => {
          const own = [...cur.childNodes].filter((n) => !caForeign(n));
          return own[i] ?? (own.length ? own[own.length - 1].nextSibling : cur.firstChild);
        };
  const fresh = [...next.childNodes];
  const byKey = new Map();
  for (const o of old) {
    const k = caKeyOf(o);
    if (k !== null && !byKey.has(k)) byKey.set(k, o);
  }
  const used = new Set();
  fresh.forEach((n, i) => {
    const k = caKeyOf(n);
    let o = k !== null ? byKey.get(k) : old[i];
    if (!o || o.nodeType !== n.nodeType || o.nodeName !== n.nodeName || used.has(o) || (k === null && caKeyOf(o) !== null)) o = null;
    const ref = at(i);
    if (!o) {
      cur.insertBefore(n, ref);
      return;
    }
    used.add(o);
    if (o !== ref) cur.insertBefore(o, ref);
    if (n.nodeType !== 1) {
      if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
      return;
    }
    caPatchAttrs(o, n);
    // A custom element given no children (<ha-icon>) keeps those it draws itself.
    if (n.firstChild || !o.localName.includes("-")) caPatchChildren(o, n);
    // A control the user changed no longer follows its attributes: its value is set as a fresh one would have it.
    if (o.localName === "input") {
      if (o.type === "checkbox" || o.type === "radio") o.checked = o.hasAttribute("checked");
      else if (o.value !== (o.getAttribute("value") ?? "")) o.value = o.getAttribute("value") ?? "";
    } else if (o.localName === "select") {
      const at = [...o.options].findIndex((x) => x.hasAttribute("selected"));
      o.selectedIndex = at < 0 ? 0 : at;
    }
  });
  let kept = 0;
  for (const n of [...cur.childNodes]) if (!caForeign(n) && ++kept > fresh.length) cur.removeChild(n);
};
export const caMorph = (root, html) => {
  // No DOM to patch (the unit tests' stand-ins): written at once.
  if (!root.childNodes) {
    root.innerHTML = html;
    return;
  }
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  caPatchChildren(root, tpl.content);
};

// The card's markup into `target`: patched in place in a shadow root, written at once in a detached element.
export const caWrite = (target, html) => {
  if (typeof ShadowRoot !== "undefined" && target instanceof ShadowRoot) caMorph(target, html);
  else target.innerHTML = html;
};

export const caDc = (dc) => (st) => st.attributes.device_class === dc;

// Entities a device may have next to its fan or climate entity. Each role is looked up by its registry
// translation_key, then by the entity_id (English, French, German and Spanish slugs), then by its attributes, so
// that it works with Xiaomi Home, Xiaomi Miio, HomeKit, Matter or Midea entities alike.
export const CA_ROLES = {
  temperature: { domain: "sensor", test: caDc("temperature") },
  humidity: { domain: "sensor", test: caDc("humidity") },
  pm25: { domain: "sensor", test: caDc("pm25") },
  pm10: { domain: "sensor", test: caDc("pm10") },
  aqi: { domain: "sensor", test: caDc("aqi") },
  // An air quality level as a word (SwitchBot's purifiers: excellent, good, moderate, unhealthy).
  aq_level: { domain: "sensor", keys: ["aqi_quality_level"], id: /(air_quality_level|aqi_level|aqi_quality)/ },
  // Filter life as a percentage. Dyson splits it into a HEPA and a carbon filter (and a combined one on older
  // units): prefer the HEPA or combined figure, and never the carbon one or a life expressed in hours.
  filter: {
    domain: "sensor",
    keys: ["filter_life", "filter_life_level", "filter_life_remaining", "hepa_filter_life", "combined_filter_life"],
    id: /filt(er|re).*(life|lifetime|level|remaining|percent|duree|restant)/,
    prefer: /(hepa|combined|life_?level|life_?percent|pourcent)/,
    avoid: /(carbon|charbon|used|utilis|hours|heures)/,
  },
  // Hours of use only: a sensor in hours or of the duration class (a filter « usage » in % is not one).
  filter_hours: {
    domain: "sensor",
    keys: ["filter_hours_used", "filter_use", "filter_usage"],
    id: /filt(er|re).*(used|usage|hours|heures|utilis)/,
    only: (st) => st?.attributes?.unit_of_measurement === "h" || st?.attributes?.device_class === "duration",
  },
  voc: {
    domain: "sensor",
    id: /(volatile_organic|_vocs?\b|\bcov\b|composes_organiques|fluchtige_organische|compuestos_organicos)/,
    test: (st) => /^volatile_organic_compounds(_parts)?$/.test(st.attributes.device_class || ""),
  },
  no2: { domain: "sensor", id: /(nitrogen_dioxide|_no2\b|dioxyde_d?_?azote|stickstoffdioxid|dioxido_de_nitrogeno)/, test: caDc("nitrogen_dioxide") },
  status: { domain: "sensor", keys: ["air_purifier_status"], id: /(purifier_status|purificateur.*statut)/ },
  // The mode select of a purifier: not its detection mode, screen or oscillation select (Midea's « Detect Mode »…).
  mode: {
    domain: "select",
    keys: ["air_purifier_mode"],
    id: /(purifier_mode|_mode)$/,
    avoid: /(detect|screen|display|oscillation|swing|silent|fresh_air|aux_heat|water_level|tilting)_mode$/,
  },
  // A fan speed given as a select (Midea purifiers, humidifiers and dehumidifiers: Lowest, Low, Medium, High, Auto).
  fan_speed: { domain: "select", keys: ["fan_speed"], id: /(fan_speed|wind_speed|fan_level|vitesse_ventil|lufterstufe|velocidad_del_ventilador)$/ },
  child_lock: { domain: "switch", keys: ["child_lock"], id: /(child_lock|physical_control|securite_enfant|verrouillage)/ },
  buzzer: { domain: "switch", keys: ["buzzer", "alarm"], id: /(buzzer|alarm|sound|_son_|_son$|bip)/ },
  light: { domain: "light", id: /(indicator|indicador|_led|voyant|display|anzeige|pantalla)/ },
  // The light of a ceiling fan: any other light of the fan's device (not its indicator).
  fan_light: { domain: "light", test: (_st, id) => !/(indicator|indicador|_led|voyant|display|anzeige|pantalla)/.test(id) },
  brightness: { domain: "select", id: /(brightness|luminosit|helligkeit|brillo)/ },
  favorite: { domain: "number", keys: ["favorite_level"], id: /favorite/ },
  angle: { domain: ["number", "select"], id: /(angle|angulo|winkel|swing_included)/ },
  timer: { domain: "number", id: /(countdown|delay_time|off_delay|timer|minuterie|power_off_time|temporizador|ausschaltzeit)/ },
  rotate_left: { domain: "button", id: /(turn_left|rotate_left|tourner_a_gauche|nach_links|a_la_izquierda)/ },
  rotate_right: { domain: "button", id: /(turn_right|rotate_right|tourner_a_droite|nach_rechts|a_la_derecha)/ },
  anion: { domain: "switch", id: /(anion|ioni)/ },
  indoor_temp: { domain: "sensor", id: /(indoor_temperature|temperature_interieure|innentemperatur|temperatura_interior)$/ },
  outdoor_temp: { domain: "sensor", id: /(outdoor_temperature|temperature_exterieure|aussentemperatur|temperatura_exterior)(_\d+)?$/ },
  power: {
    domain: "sensor",
    id: /(real_time_power|current_power|puissance_instantanee)/,
    test: (st, id) => st.attributes.device_class === "power" && !/compressor|compresseur|kompressor|compresor/.test(id),
  },
  filter_alert: { domain: "binary_sensor", id: /(dust|filter|filtre|filtro|staub|polvo)/ },
  // The button that resets the filter counter once it is cleaned or replaced (Midea, Xiaomi, Philips…).
  filter_reset: { domain: "button", id: /((reset|reinit|zurucksetzen|restablecer).*(filt|dust)|(filt|dust).*(reset|reinit))/ },
  compressor: {
    domain: "sensor",
    id: /(?<!target_)(compressor_frequency|frequence_compresseur|kompressorfrequenz|frecuencia_del_compresor)$/,
  },
  // Heat pumps (air to water): the hot water tank (a water_heater entity, else its temperature), the three-way valve
  // sending the heat to the house or to the tank (TOUG's « aiguillage vanne », Aquarea's direction), the setpoint of a
  // pump driven without a climate entity (TOUG's thermostat number), the backup heater and the defrost cycle.
  dhw: { domain: "water_heater", test: () => true },
  tank_temp: {
    domain: "sensor",
    id: /((tank|ballon|dhw|ecs|hot_water|eau_chaude|warmwasser|speicher|acs|sanitaire).*temp|temp.*(tank|ballon|dhw|ecs|acs|sanitaire|warmwasser))/,
  },
  valve: { domain: ["sensor", "select"], id: /(aiguillage|three_way|3_way|diverter|direction|vanne|valve|umschalt)/ },
  setpoint: { domain: "number", id: /(thermostat|consigne|setpoint|target_temp|sollwert)/ },
  // Humidifiers and dehumidifiers: the water left in the tank (a percentage), the empty tank of a humidifier and the
  // full bucket of a dehumidifier.
  water_level: {
    domain: "sensor",
    keys: ["fill", "tank_level"],
    id: /(_tank$|water_level|tank_level|water_tank|water_remain|niveau_(d_)?eau|niveau_reservoir|reservoir|wasserstand|nivel_de_agua|depth|fill|cartridge|cartouche)/,
    avoid: /(full|plein|voll)/,
  },
  // Any light of a humidifier or a diffuser (the VOCOlinc ambient light), toggled from its options.
  lamp: { domain: "light", test: () => true },
  // The mist intensity of a diffuser (VOCOlinc's « Spray quantity », 1 to 5; the Rituals « Perfume amount », 1 to 3).
  // The device slug may itself contain "perfume", so match the amount anchored, not the bare word.
  spray: { domain: "number", keys: ["perfume_amount"], id: /(spray|mist_level|mist_quantity|mist_intensity|intensite|nebul|perfume_amount)/ },
  // The Rituals Perfume Genie's extras: its room size (m²), fragrance name, battery and charge, wifi, and the
  // "cartridge inserted" binary sensor (off = no cartridge), used as a low-cartridge alert. The fragrance sensor is
  // anchored to the end so the "perfume" in the device slug (its fill, battery…) is not taken for it.
  room_size: { domain: "select", keys: ["room_size_square_meter"], id: /room_?size/ },
  perfume: { domain: "sensor", keys: ["perfume"], id: /(perfume$|parfum$|fragrance|duft$|profumo$)/ },
  battery: { domain: "sensor", test: caDc("battery") },
  charging: { domain: "binary_sensor", test: caDc("battery_charging") },
  wifi: { domain: "sensor", keys: ["wifi_percentage"], id: /(wifi|signal_strength|rssi)/ },
  cartridge: { domain: "binary_sensor", keys: ["cartridge"], id: /(cartridge|cartouche)/ },
  tank_empty: { domain: "binary_sensor", id: /(water_shortage|no_water|tank_empty|water_empty|lack_of_water|manque_d?_?eau|reservoir_vide|wassermangel|tank_leer)/ },
  bucket_full: { domain: "binary_sensor", id: /(tank_full|bucket_full|water_full|full_water|water_tank_full|bac_plein|reservoir_plein|behalter_voll|tanque_lleno)/ },
  backup: { domain: "binary_sensor", id: /(backup|appoint|booster|resistance|heizstab|electric_heater|aux)/ },
  defrost: { domain: "binary_sensor", id: /(defrost|degivr|abtau|desescarche)/ },
  // Heat pumps measured but not controlled — a ground- or water-source unit read through Modbus meters (Stiebel
  // Eltron WPF, NIBE F1x55, Viessmann Vitocal 2xx-G, a plain electrical + heat meter…): the monitoring roles, set
  // in `entities` and found on the device when it has one. Matched by entity id only, so a heat pump's electrical
  // `power` role (its compressor draw) is never taken for the thermal `heat_power`, nor the outdoor / room sensors
  // for the flow and return water temperatures.
  heat_power: { domain: "sensor", id: /(heat_output|heat_power|thermal_power|thermal_output|heat_kw|heat_production|puissance_thermique|w[aä]rmeleistung|potenza_termica|heatpower|kwnow)/ },
  cop: {
    domain: "sensor",
    id: /(instantaneous_cop|current_cop|\bcop\b|_cop$|coefficient_of_perform|leistungszahl)/,
    avoid: /(today|day|daily|journ|jour|seasonal|saison|scop|annual|annuel|month|mois)/,
  },
  cop_today: { domain: "sensor", id: /(cop_today|today_cop|daily_cop|cop_jour|cop_du_jour)/ },
  scop: { domain: "sensor", id: /(scop|seasonal_cop|cop_seasonal|cop_saisonnier|cop_saison|jahresarbeitszahl|\bjaz\b)/ },
  flow_temp: { domain: "sensor", id: /(flow_temp|flow_t$|flowt$|supply_temp|departure_temp|(d[ée]part|vorlauf|mandata|aanvoer|impulsion).*temp|temp.*(d[ée]part|flow|vorlauf))/ },
  return_temp: { domain: "sensor", id: /(return_temp|return_t$|returnt$|(retour|r[uü]cklauf|ritorno|retorno).*temp|temp.*(retour|return|r[uü]cklauf))/ },
  flow_rate: { domain: "sensor", id: /(flow_rate|flowrate|volume_flow|d[ée]bit|durchfluss|portata|caudal)/ },
  energy: { domain: "sensor", id: /(elec.*energy|energy.*elec|electrical_energy|energie_pac|energie_[ée]lectrique|stromverbrauch|energia_elettrica)/ },
  heat_energy: { domain: "sensor", id: /(heat_energy|thermal_energy|heat_mwh|heat_kwh|w[aä]rmemenge|energia_termica|energie_thermique|mwhlifetime|heat_lifetime)/ },
  // The hot water tank reported as sensors rather than a water_heater entity (Aldes T.One through TOUG): its fill as a
  // percentage, its remaining volume in litres and its fault messages.
  dhw_pct: {
    domain: "sensor",
    id: /((ecs|dhw|tank|ballon|hot_water|eau_chaude|warmwasser|acs|sanitaire).*(pourcentage|percent|niveau|level|charge|remplissage|fill)|(pourcentage|percent|charge|fill).*(ecs|dhw|tank|ballon|hot_water|eau_chaude|acs|sanitaire))/,
    test: (st) => st.attributes.unit_of_measurement === "%",
  },
  dhw_volume: {
    domain: "sensor",
    id: /((volume|litres?|liters?|restant).*(ecs|dhw|tank|ballon|hot_water|eau_chaude|acs|sanitaire)|(ecs|dhw|tank|ballon|hot_water|eau_chaude|acs|sanitaire).*(volume|litres?|liters?|restant))/,
    test: (st) => /^l$|litre|liter/i.test(st.attributes.unit_of_measurement || ""),
  },
  faults: { domain: "sensor", id: /(?<!sans_)(defaut|default|fault|erreur|error|panne|anomal|st[öo]rung|averia|guasto)/ },
  // Ventilation units (heat recovery and extract units: Zehnder ComfoAir, Duco, Renson, Vallox, Prana, Brink…): the
  // temperatures of their four air streams (outdoor air in, supply air to the rooms, extract air from them, exhaust
  // air out), the bypass of the heat exchanger, its efficiency, the airflow, CO₂, the filter's days left and boost.
  air_outdoor_temp: {
    domain: "sensor",
    keys: ["outdoor_air_temperature", "outside_air_temperature", "fresh_air_temperature"],
    id: /(outdoor_air|outside_air|fresh_air_temp|air_neuf|air_exterieur|aussenluft|exterior_air|aria_esterna|buitenlucht|intake_air)/,
  },
  air_supply_temp: {
    domain: "sensor",
    keys: ["supply_air_temperature", "supply_temperature"],
    id: /(supply_(air_)?temp|supply_temperature|soufflage|insufflation|zuluft|impulsion|aria_mandata|toevoer)/,
  },
  air_extract_temp: {
    domain: "sensor",
    keys: ["extract_air_temperature", "return_air_temperature", "extract_temperature"],
    id: /(extract_(air_)?temp|extract_temperature|return_air|reprise|abluft|extraccion|aria_ripresa|afvoer)/,
  },
  air_exhaust_temp: {
    domain: "sensor",
    keys: ["exhaust_air_temperature", "exhaust_temperature"],
    id: /(exhaust_(air_)?temp|exhaust_temperature|rejet|fortluft|expulsion|aria_espulsa|uitblaas)/,
  },
  bypass: { domain: ["binary_sensor", "sensor", "select", "switch", "number"], keys: ["bypass", "bypass_state"], id: /(bypass|by_pass)/ },
  efficiency: { domain: "sensor", keys: ["efficiency", "heat_recovery_efficiency"], id: /(efficiency|rendement|wirkungsgrad|eficiencia|efficienza)/ },
  co2: { domain: "sensor", test: caDc("carbon_dioxide") },
  airflow: {
    domain: "sensor",
    id: /(airflow|air_flow|supply_flow|volume_flow|debit_d?_?air|luftmenge|caudal|portata_aria)/,
    test: (st) => /^m(³|3)\/h$/i.test(st.attributes.unit_of_measurement || ""),
  },
  filter_days: { domain: "sensor", keys: ["filter_days_remaining", "days_to_replace_filter"], id: /(filt(er|re|ro).*(day|jour|tag|dia|remain|restant))/ },
  boost: { domain: ["switch", "button"], keys: ["boost"], id: /(boost|turbo|intensiv|party)/ },
};

// Registry entries grouped by device, built once per `hass.entities` object (it only changes with the registry).
export const caRegistryIndex = new WeakMap();
export function caByDevice(reg) {
  let index = caRegistryIndex.get(reg);
  if (!index) {
    index = new Map();
    for (const e of Object.values(reg)) {
      if (!e.device_id || e.hidden) continue;
      if (!index.has(e.device_id)) index.set(e.device_id, []);
      index.get(e.device_id).push(e);
    }
    caRegistryIndex.set(reg, index);
  }
  return index;
}

export function caDeviceEntities(hass, deviceId) {
  if (!hass?.entities || !deviceId) return [];
  return (caByDevice(hass.entities).get(deviceId) || []).filter((e) => hass.states[e.entity_id]);
}

// Number of states, counted once per `hass.states` object (every card of the dashboard shares the same one).
export const caStateCounts = new WeakMap();
export function caStateCount(states) {
  if (!states) return 0;
  let n = caStateCounts.get(states);
  if (n === undefined) caStateCounts.set(states, (n = Object.keys(states).length));
  return n;
}

// Memo for lookups that scan the registry or all of `hass.states` (kind of device, roles, entity lists), keyed on
// the `hass.entities` object like caRegistryIndex. The results also depend on which states exist: the memo starts
// over when the number of states changes (states still arriving while Home Assistant starts, after the registry).
// A miss (no such role) is kept with the state objects it was worked out from (`deps`, the device's entities): it
// is reused while none of them changed, so a device without a filter sensor is not scanned again on every update
// of the home, and looked up again once one of them changes (an entity coming back from unavailable, say).
// Without `deps`, a miss is never kept.
export const caMemoStore = new WeakMap();
export class CaMiss {
  constructor(value, deps) {
    this.value = value;
    this.deps = deps;
  }
}
export const caSameDeps = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
export function caMemo(hass, key, compute, deps) {
  const reg = hass?.entities;
  if (!reg) return compute();
  const count = caStateCount(hass.states);
  let memo = caMemoStore.get(reg);
  if (!memo || memo.count !== count) caMemoStore.set(reg, (memo = { count, map: new Map() }));
  const kept = memo.map.get(key);
  if (kept instanceof CaMiss) {
    if (caSameDeps(kept.deps, deps())) return kept.value;
  } else if (memo.map.has(key)) return kept;
  const value = compute();
  if (value != null) memo.map.set(key, value);
  else if (deps) memo.map.set(key, new CaMiss(value, deps()));
  return value;
}

export function caFindRole(hass, list, role) {
  const m = CA_ROLES[role];
  const domains = [].concat(m.domain);
  // `only`: a condition every candidate must meet, whatever matched it (its unit, say).
  const inDomain = list.filter((e) => domains.includes(e.entity_id.split(".")[0]) && (!m.only || m.only(hass.states[e.entity_id])));
  // Among candidates of equal rank, a preferred one wins (Dyson's HEPA/combined filter over its carbon filter),
  // and an avoided one is taken only as a last resort (its filter life in hours, not the percentage).
  const pick = (cands) => {
    if (!cands.length) return undefined;
    if (m.prefer) {
      const p = cands.find((e) => m.prefer.test(e.entity_id));
      if (p) return p;
    }
    if (m.avoid) {
      const a = cands.find((e) => !m.avoid.test(e.entity_id));
      if (a) return a;
    }
    return cands[0];
  };
  let hit = m.keys && pick(inDomain.filter((e) => m.keys.includes(e.translation_key)));
  if (!hit && m.id) hit = pick(inDomain.filter((e) => m.id.test(e.entity_id)));
  if (!hit && m.test) hit = pick(inDomain.filter((e) => m.test(hass.states[e.entity_id], e.entity_id)));
  return hit?.entity_id;
}

export const caDeviceOf = (hass, id) => hass?.entities?.[id]?.device_id;

export function caArea(hass, id) {
  const e = hass.entities?.[id];
  const aid = e?.area_id || (e?.device_id && hass.devices?.[e.device_id]?.area_id);
  return (aid && hass.areas?.[aid]) || null;
}

export const caAreaName = (hass, id) => caArea(hass, id)?.name || "";
export const caAreaIcon = (hass, id) => caArea(hass, id)?.icon || "";

export function caDeviceName(hass, id) {
  const dev = hass.devices?.[caDeviceOf(hass, id)];
  return String(dev?.name_by_user || dev?.name || "").trim();
}

// The kind of device a fan or climate entity stands for, or null when the cards do not handle it.
// A climate entity is an air conditioner when it can cool, dry or only blow; a heat-only thermostat (a wall
// thermostat, a radiator, a radiator valve) is not, and is left to ha-heating-card.
// A fan entity is an air purifier when its name says so or its device measures particles or has a filter.
// The domain of the entities of a kind of device.
export const caDomain = (kind) =>
  kind === "aircon" ? "climate" : kind === "heatpump" ? ["climate", "select"] : kind === "humidifier" ? ["humidifier", "switch"] : kind === "purifier" ? ["fan", "switch"] : "fan";

// A climate entity is a heat pump (air to water) when its device has a hot water tank, when its device says so, or
// when it comes from an integration that only handles heat pumps (NIBE myUplink, Panasonic Aquarea Smart Cloud,
// Hitachi Yutaki). The others (MELCloud, ViCare, Daikin Onecta, Overkiz, Cozytouch) also handle air conditioners or
// boilers: their heat pumps are told apart by their hot water tank or their name.
export const CA_HP_PLATFORMS = ["myuplink", "aquarea", "hitachi_yutaki"];
export const CA_HP_NAME =
  /(heat.?pump|pompe.?[aà].?chaleur|air.?(to|[aà]|-).?(water|eau)|w[aä]rmepumpe|bomba de calor|pompa di calore|warmtepomp|altherma|aquarea|ecodan|yutaki|alfea|t\.?one|aquaair|vitocal|m.?thermal|arotherm|geotherm|nibe)/i;

export const CA_PURIFIER_NAME = /purif|air_?cleaner|air_?filter|epurateur/i;

// Whether the bypass of the exchanger is open: a binary sensor or switch on, a select or sensor saying so, a number
// above 0 (its opening in %).
export const caVentBypass = (st) => {
  if (caUnavailable(st)) return null;
  const v = String(st.state).trim().toLowerCase();
  const d = st.entity_id.split(".")[0];
  if (d === "binary_sensor" || d === "switch") return v === "on";
  const n = Number(v);
  if (Number.isFinite(n)) return n > 0;
  if (/(closed|ferm|geschlossen|cerrad|chius|dicht|^off$|inactive|aus)/.test(v)) return false;
  return /(open|ouvert|offen|abiert|aperto|^on$|active|actif|aktiv|summer|ete|été)/.test(v);
};

// The heat recovered by the exchanger, in %: its efficiency sensor, else worked out from the stream temperatures
// (supply − outdoor) / (extract − outdoor) when the extract air is clearly warmer or colder than the outdoor air.
export const caVentEfficiency = (eff, t) => {
  if (eff != null) return Math.max(0, Math.min(100, eff));
  const { o, s, e } = t;
  if (o == null || s == null || e == null || Math.abs(e - o) < 3) return null;
  return Math.max(0, Math.min(100, ((s - o) / (e - o)) * 100));
};


// A ventilation unit (heat recovery or extract): a fan entity named like one or from a ventilation integration.
export const CA_VENT_NAME =
  /(ventilation|fresh.?air.?(appliance|system|unit|ventilat)|\bvmc\b|mvhr|\bhrv\b|\berv\b|heat.?recovery|comfoair|comfoconnect|double.?flux|simple.?flux|l[üu]ftungs|\bkwl\b|\bwtw\b|ventilaci[oó]n|ventilazione|recuperat|rekuperat|\baldes\b|zehnder|\bbrink\b|vallox|\bduco\b|renson|helty|dantherm|maico|komfovent|\bprana\b|healthbox|endura|flow.?it|airios|\bitho\b|orcon)/i;
export const CA_VENT_PLATFORMS = ["comfoconnect", "vallox", "duco", "renson", "prana", "flow_it", "dantherm", "maico", "helty_flow", "healthbox", "komfovent", "itho"];

// The Rituals Perfume Genie: an essential oil diffuser exposed as a `switch` (no humidifier entity), with its perfume
// amount, room size, cartridge fill and battery as separate entities. The humidifier card adopts its switch.
export const CA_RITUALS_NAME = /rituals|perfume.?genie/i;

// The speed of a device whose fan speed is a select (Midea): its rank among the speeds, as a percentage (Lowest 20 %…
// High 80 %, a top one 100 %), half speed for Auto, none when off or unknown.
export function caSelectSpeed(st) {
  if (!st || caUnavailable(st)) return null;
  const speeds = (st.attributes.options || []).filter((o) => !/^(off|auto|automatic|smart)$/i.test(String(o)));
  const v = String(st.state);
  if (/^(auto|automatic|smart)$/i.test(v)) return 50;
  const i = speeds.indexOf(v);
  return i < 0 ? null : Math.round(((i + 1) / speeds.length) * 100);
}

// Midea's integrations: the core one (Home Assistant 2026.8), Midea AC LAN, Midea Smart AC (msmart-ng), Midea Air
// Appliances LAN and Midea Auto Cloud. Their devices also come under the brands Midea sells (Comfee', Inventor…), so
// a device is Midea's by its integration or its manufacturer.
export const CA_MIDEA_PLATFORMS = ["midea", "midea_ac_lan", "midea_ac", "midea_dehumidifier_lan", "midea_auto_cloud"];
export const caIsMidea = (hass, id, dev) => CA_MIDEA_PLATFORMS.includes(hass.entities?.[id]?.platform) || /midea/i.test(dev?.manufacturer || "");

// A Midea air purifier (device type FC) has no fan entity: it is switched on and off by its « Power » switch, its mode
// and speed are selects. The purifier card adopts that switch, the way the humidifier card adopts a Rituals diffuser's.
// Its power switch (translation key or entity id), on a Midea device named as a purifier or measuring particles, with
// no fan, humidifier or climate entity of its own.
export function caMideaPurifierSwitch(hass, id, dev) {
  if (!dev || !caIsMidea(hass, id, dev)) return false;
  if (hass.entities?.[id]?.translation_key !== "power" && !/_power$/.test(id)) return false;
  const list = caDeviceEntities(hass, caDeviceOf(hass, id));
  if (list.some((e) => /^(fan|humidifier|climate)\./.test(e.entity_id))) return false;
  const names = [dev.model, dev.name, dev.name_by_user].filter(Boolean).join(" ");
  return CA_PURIFIER_NAME.test(names) || Boolean(caFindRole(hass, list, "pm25"));
}

// Refrigeration appliances (fridge, freezer, wine cooler) are exposed as climate entities by some integrations
// (e.g. Liebherr), and can cool, but are not air conditioners: their setpoint range sits well below comfort
// temperature. Tell them apart by a fridge/freezer icon or name, or by a maximum setpoint below comfort cooling
// (unit-aware: 15 °C, or 60 °F).
export const CA_FRIDGE_ICON = /fridge|freezer|snowflake-thermometer/i;
export const CA_FRIDGE_NAME =
  /fridge|freezer|refrigerat|r[ée]frig[eé]r|cong[eé]lat|frigo|k[üu]hlschrank|gefrier|nevera|congelador|frigorif|koelkast|vriezer|lod[óo]wka|zamra[zż]|chladni[čc]|mrazni|hladnjak|zamrziva|[хx]олодильник|[мm]орозильник|frys|k[øo]leskab|fryseskab|ψυγε[ίi]|κατ[άa]ψυξ|wine.?(cooler|cellar|fridge)|cave.?[àa].?vin|cantinetta|vinoth[eè]que/i;
export function caIsFridge(hass, id, st) {
  if (CA_FRIDGE_ICON.test(st.attributes.icon || "")) return true;
  const dev = hass.devices?.[caDeviceOf(hass, id)];
  if (CA_FRIDGE_NAME.test([st.attributes.friendly_name, dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" "))) return true;
  const maxT = Number(st.attributes.max_temp);
  const limit = (hass?.config?.unit_system?.temperature || "").includes("F") ? 60 : 15;
  return Number.isFinite(maxT) && maxT < limit;
}
export function caKindOf(hass, id) {
  const st = hass?.states?.[id];
  if (!st) return null;
  return caMemo(hass, `kind:${id}`, () => {
    const domain = id.split(".")[0];
    if (domain === "climate") {
      const dev = hass.devices?.[caDeviceOf(hass, id)];
      const names = [id, st.attributes.friendly_name, dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" ");
      const own = caDeviceEntities(hass, caDeviceOf(hass, id));
      if (CA_HP_PLATFORMS.includes(hass.entities?.[id]?.platform)) return "heatpump";
      if (own.some((e) => e.entity_id.startsWith("water_heater.")) || CA_HP_NAME.test(names)) return "heatpump";
      const modes = st.attributes.hvac_modes || [];
      if (!modes.some((m) => m === "cool" || m === "dry" || m === "fan_only")) return null;
      // A fridge, freezer or wine cooler cools but is not an air conditioner.
      if (caIsFridge(hass, id, st)) return null;
      return "aircon";
    }
    // Humidifiers, dehumidifiers and diffusers: every humidifier entity (its device_class picks the illustration).
    if (domain === "humidifier") return "humidifier";
    if (domain === "select") {
      // A heat pump without a climate entity (TOUG): the select of its mode, on a device named as a heat pump that has
      // no climate entity of its own.
      if (!/mode/i.test(id) || !(st.attributes.options || []).some((o) => CA_HP_OFF.test(String(o).trim()))) return null;
      const devId = caDeviceOf(hass, id);
      const dev = hass.devices?.[devId];
      const names = [dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" ");
      if (!devId || !CA_HP_NAME.test(names)) return null;
      return caDeviceEntities(hass, devId).some((e) => e.entity_id.startsWith("climate.")) ? null : "heatpump";
    }
    if (domain === "switch") {
      // A diffuser driven by a switch (Rituals Perfume Genie): its device has no humidifier entity, so the humidifier
      // card adopts the switch, the way a heat pump without a climate entity is driven by a select. Match the
      // integration first, else the device or entity name.
      if (hass.entities?.[id]?.platform === "rituals_perfume_genie") return "humidifier";
      const dev = hass.devices?.[caDeviceOf(hass, id)];
      const names = [id, st.attributes.friendly_name, dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" ");
      if (CA_RITUALS_NAME.test(names)) return "humidifier";
      return caMideaPurifierSwitch(hass, id, dev) ? "purifier" : null;
    }
    if (domain !== "fan") return null;
    const dev = hass.devices?.[caDeviceOf(hass, id)];
    const names = [id, st.attributes.friendly_name, dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" ");
    const list = caDeviceEntities(hass, caDeviceOf(hass, id));
    // A fan on a device that is really a (de)humidifier or an air conditioner is that device's own blower, shown by
    // its humidifier / air-conditioner card — not a standalone comfort fan, which would duplicate the device.
    if (list.some((e) => e.entity_id.startsWith("humidifier.") || e.entity_id.startsWith("climate."))) return null;
    if (CA_VENT_PLATFORMS.includes(hass.entities?.[id]?.platform) || CA_VENT_NAME.test(names)) return "ventilation";
    if (CA_PURIFIER_NAME.test(names)) return "purifier";
    if (caFindRole(hass, list, "pm25") || caFindRole(hass, list, "aqi") || caFindRole(hass, list, "aq_level") || caFindRole(hass, list, "filter")) return "purifier";
    return "fan";
  });
}

// A role of an entity's device, memoized (see caMemo): the whole-device scans only run again when the registry
// or the set of states changes.
export function caRoleOf(hass, id, role) {
  const list = () => caDeviceEntities(hass, caDeviceOf(hass, id));
  return caMemo(
    hass,
    `role:${id}:${role}`,
    () => caFindRole(hass, list(), role),
    () => list().map((e) => hass.states[e.entity_id]),
  );
}

// Every entity of a kind, sorted by name; hidden entities and configuration entities are left out.
export function caFindEntities(hass, kind) {
  if (!hass?.states) return [];
  return caMemo(hass, `list:${kind}`, () => {
    const domains = [caDomain(kind)].flat();
    return Object.keys(hass.states)
      .filter((id) => domains.includes(id.split(".")[0]))
      .filter((id) => {
        const e = hass.entities?.[id];
        return !e?.hidden && !e?.entity_category && caKindOf(hass, id) === kind;
      })
      .sort((a, b) => caName(hass, a).localeCompare(caName(hass, b)));
  });
}

// The name shown for a device: its device name, else the entity's, without the trailing " Fan" Xiaomi Home adds.
export function caName(hass, id) {
  const st = hass.states[id];
  const dev = caDeviceName(hass, id);
  if (dev) return dev;
  return String(st?.attributes.friendly_name || id)
    .replace(/\s+(fan|air purifier)$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
