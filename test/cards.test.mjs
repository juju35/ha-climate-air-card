import assert from "node:assert/strict";
import { test } from "node:test";
import { makeHass } from "./hass.mjs";
import { load, mount } from "./load.mjs";

const lib = load();
const html = (el) => el.shadowRoot.innerHTML;

test("every card and its editor are registered", () => {
  for (const [tag, cls] of Object.entries(lib.cards)) {
    assert.ok(cls, tag);
    assert.ok(lib.customElements.get(`${tag}-editor`), `${tag}-editor`);
  }
  assert.equal(lib.window.customCards.length, 9);
});

test("purifier: air quality, filter, presets and options", () => {
  const el = mount(lib, "climate-air-purifier-card", { entity: "fan.living_room_purifier_air_purifier" }, makeHass());
  const out = html(el);
  assert.match(out, /<span class="val">6<small> µg\/m³/);
  assert.match(out, /Good air/);
  assert.match(out, /76 %/);
  assert.match(out, /data-action="preset" data-value="Sleep"/);
  assert.match(out, /data-range="percentage"/);
  assert.match(out, /class="picture k-purifier st-on running"/);
  // The favorite level only shows in the favorite preset.
  assert.doesNotMatch(out, /data-number="number\.living_room_purifier_favorite_fan_level"/);
  const fav = mount(lib, "climate-air-purifier-card", { entity: "fan.living_room_purifier_air_purifier" },
    makeHass("en", { "fan.living_room_purifier_air_purifier": { preset_mode: "Favorite" } }));
  assert.match(html(fav), /data-number="number\.living_room_purifier_favorite_fan_level"/);
});

test("purifier: a worn filter is flagged, and its mode select replaces presets", () => {
  const el = mount(lib, "climate-air-purifier-card", { entity: "fan.bedroom_purifier" }, makeHass("fr"));
  const out = html(el);
  assert.match(out, /chip warn.*Filtre à changer/);
  assert.match(out, /Air moyen/);
  assert.match(out, /data-action="mode" data-value="manual"/);
  assert.match(out, /Purification/);
});

test("purifier off: no animation, idle color", () => {
  const el = mount(lib, "climate-air-purifier-card", { entity: "fan.bedroom_purifier" }, makeHass("en", { "fan.bedroom_purifier": { state: "off" } }));
  assert.doesNotMatch(html(el), /class="picture[^"]*running/);
  assert.match(html(el), /--ca-color:var\(--disabled-text-color/);
});

test("Dyson purifier: HEPA filter life, VOC and NO₂ readings", () => {
  const h = makeHass();
  h.devices.dev_dyson = { id: "dev_dyson", name: "Dyson Pure Cool", name_by_user: null, area_id: "office" };
  const add = (id, state, attributes) => {
    h.states[id] = { entity_id: id, state: String(state), attributes };
    h.entities[id] = { entity_id: id, device_id: "dev_dyson", area_id: null, platform: "mock" };
  };
  add("fan.dyson_pure_cool", "on", { preset_modes: ["Auto", "Manual"], preset_mode: "Auto", percentage: 30, percentage_step: 10, supported_features: 57, friendly_name: "Dyson Pure Cool" });
  add("sensor.dyson_pure_cool_pm_2_5", 5, { device_class: "pm25", unit_of_measurement: "µg/m³", friendly_name: "Dyson Pure Cool PM 2.5" });
  add("sensor.dyson_pure_cool_volatile_organic_compounds", 4, { friendly_name: "Dyson Pure Cool Volatile Organic Compounds Index" });
  add("sensor.dyson_pure_cool_nitrogen_dioxide", 1, { friendly_name: "Dyson Pure Cool Nitrogen Dioxide Index" });
  add("sensor.dyson_pure_cool_carbon_filter_life", 94, { unit_of_measurement: "%", friendly_name: "Dyson Pure Cool Carbon Filter Life" });
  add("sensor.dyson_pure_cool_hepa_filter_life", 76, { unit_of_measurement: "%", friendly_name: "Dyson Pure Cool HEPA Filter Life" });
  const out = html(mount(lib, "climate-air-purifier-card", { entity: "fan.dyson_pure_cool" }, h));
  assert.match(out, /76 %/); // the HEPA figure, not the carbon 94 %
  assert.doesNotMatch(out, /94 %/);
  assert.match(out, /VOC 4/);
  assert.match(out, /NO₂ 1/);
  // The bladeless loop illustration is picked from the model.
  assert.equal(lib.caVariant(h, "purifier", "fan.dyson_pure_cool"), "dyson");
  assert.match(out, /width="22\.8"/);
});

test("fan: speed, oscillation, natural wind and options", () => {
  const h = makeHass();
  const el = mount(lib, "climate-air-fan-card", { entity: "fan.bedroom_fan_fan" }, h);
  const out = html(el);
  assert.match(out, /class="picture k-fan st-on running osc natural"/);
  assert.match(out, /--ca-spin:1\.13s/);
  assert.match(out, /Oscillation 90°/);
  assert.match(out, /data-press="button\.bedroom_fan_turn_left"/);
  el._onClick({ composedPath: () => [{ dataset: { action: "oscillate" } }] });
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls.at(-1))), ["fan", "oscillate", { entity_id: "fan.bedroom_fan_fan", oscillating: false }]);
});

test("unavailable device: offline chip, no controls", () => {
  const el = mount(lib, "climate-air-fan-card", { entity: "fan.bedroom_fan_fan" }, makeHass("en", { "fan.bedroom_fan_fan": { state: "unavailable" } }));
  assert.match(html(el), /Device offline/);
  assert.doesNotMatch(html(el), /data-range/);
  assert.doesNotMatch(html(el), /data-action="power"/);
});

test("air conditioner: temperatures, modes, compressor and swing", () => {
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass("fr"));
  const out = html(el);
  assert.match(out, /25,5<small> °C/);
  assert.match(out, /→ 22 °C/);
  assert.match(out, /k-aircon st-cool running m-cool active swing-v/);
  assert.match(out, /Extérieur 31 °C/);
  assert.match(out, /640 W/);
  assert.match(out, /data-toggle="switch\.air_conditioner_eco"/);
  // Many modes: the selected one keeps its label, the others show only their icon.
  assert.match(out, /class="seg on" data-action="hvac" data-value="cool"[^>]*>.*<span>Froid<\/span>/);
  assert.match(out, /class="seg short" data-action="hvac" data-value="heat"/);
});

test("air conditioner: target steps add up and are sent once the taps stop", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const h = makeHass();
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  el._action("temp", "1");
  el._action("temp", "1");
  assert.match(html(el), /<span class="tval">23<small> °C<\/small>/);
  assert.equal(h.calls.length, 0);
  t.mock.timers.tick(1000);
  await Promise.resolve();
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [["climate", "set_temperature", { entity_id: "climate.air_conditioner", temperature: 23 }]]);
});

test("air conditioner: a pending target is sent right away when the card is detached", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const h = makeHass();
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  el._action("temp", "1");
  assert.equal(h.calls.length, 0);
  el.disconnectedCallback();
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [["climate", "set_temperature", { entity_id: "climate.air_conditioner", temperature: 22.5 }]]);
  t.mock.timers.tick(1000);
  await Promise.resolve();
  assert.equal(h.calls.length, 1); // the debounce timer was cancelled, nothing is sent twice
});

const TRV = "climate.bedroom_radiator_valve";

test("thermostat: temperatures, heating, presets as buttons, valve, battery and options", () => {
  const out = html(mount(lib, "climate-air-thermostat-card", { entity: TRV }, makeHass("fr")));
  assert.match(out, /19<small> °C/);
  assert.match(out, /→ 21 °C/);
  // Heating (hvac_action): the illustration runs and the pill says so; a radiator valve is drawn as one.
  assert.match(out, /class="picture k-thermostat st-heat running active"/);
  assert.match(out, /class="stt">Chauffe</);
  // The presets are segmented buttons, the hvac modes too (off left to the power button).
  assert.match(out, /class="seg on[^"]*" data-action="preset" data-value="comfort"/);
  assert.doesNotMatch(out, /data-attr="preset_mode"/);
  assert.match(out, /data-action="hvac" data-value="auto"/);
  assert.match(out, /Vanne 45 %/);
  assert.match(out, /82 %/);
  assert.match(out, /data-toggle="switch\.bedroom_radiator_child_lock"/);
  assert.match(out, /data-action="temp" data-value="1"/);
});

test("thermostat: a preset button sets the preset, − / + the target", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const h = makeHass();
  const el = mount(lib, "climate-air-thermostat-card", { entity: TRV }, h);
  el._action("preset", "eco");
  el._action("temp", "-1");
  t.mock.timers.tick(1000);
  await Promise.resolve();
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [
    ["climate", "set_preset_mode", { entity_id: TRV, preset_mode: "eco" }],
    ["climate", "set_temperature", { entity_id: TRV, temperature: 20.5 }],
  ]);
});

test("thermostat: idle at its target, the illustration stays still; off, it is grey", () => {
  const idle = html(mount(lib, "climate-air-thermostat-card", { entity: "climate.bathroom_thermostat" }, makeHass()));
  assert.match(idle, /class="picture k-thermostat st-heat running"/);
  assert.match(idle, /class="stt">Idle</);
  // A wall thermostat without a device: the round dial, its display showing the target.
  assert.match(idle, /class="disp big"[^>]*>21°</);
  const off = html(mount(lib, "climate-air-thermostat-card", { entity: TRV }, makeHass("en", { [TRV]: { state: "off", hvac_action: "off" } })));
  assert.match(off, /class="picture k-thermostat st-off"/);
  assert.doesNotMatch(off, /data-action="preset"/);
});

test("thermostat: an open window and a low battery are flagged, unless alerts are off", () => {
  const h = makeHass("en", { "binary_sensor.bedroom_radiator_window_open": { state: "on" }, "sensor.bedroom_radiator_battery": { state: 9 } });
  const out = html(mount(lib, "climate-air-thermostat-card", { entity: TRV }, h));
  assert.match(out, /class="chip warn" data-more-info="binary_sensor\.bedroom_radiator_window_open"[^>]*>.*Window open/);
  assert.match(out, /class="chip warn" data-more-info="sensor\.bedroom_radiator_battery"[^>]*>.*Low battery · 9 %/);
  const quiet = html(mount(lib, "climate-air-thermostat-card", { entity: TRV, show_alerts: false }, h));
  assert.doesNotMatch(quiet, /Window open|Low battery/);
  // The mini card keeps the alerts, the valve and the − / + of the target.
  const mini = html(mount(lib, "climate-air-thermostat-mini-card", { entity: TRV }, h));
  assert.match(mini, /Window open/);
  assert.match(mini, /Valve 45 %/);
  assert.match(mini, /data-action="temp" data-value="-1"/);
});

test("thermostat: the illustration is guessed from the device, or set", () => {
  const h = makeHass();
  assert.equal(lib.caVariant(h, "thermostat", TRV), "valve");
  assert.equal(lib.caVariant(h, "thermostat", "climate.bathroom_thermostat"), "dial");
  // An electric heater or convector, from its name or model, is drawn as a radiator.
  h.devices.dev_trv.name = "Office convector";
  h.states[TRV].attributes.friendly_name = "Office convector";
  assert.equal(lib.caVariant(h, "thermostat", "climate.office_heater"), "radiator");
  assert.equal(lib.caVariant(h, "thermostat", TRV, "radiator"), "radiator");
  assert.match(html(mount(lib, "climate-air-thermostat-card", { entity: TRV, illustration: "radiator" }, makeHass())), /class="glow"/);
});

test("overview: thermostat tiles show what they do and flag an open window", () => {
  const h = makeHass("en", { "binary_sensor.bedroom_radiator_window_open": { state: "on" } });
  const { body, head } = overview({ zoom: false }, h);
  assert.match(body, /data-toggle="climate\.bedroom_radiator_valve"[^>]*><div class="picture k-thermostat st-heat running active"/);
  assert.match(body, /Heating · 21 °C/);
  assert.match(body, /Idle · 21 °C/);
  assert.match(body, /data-more-info="binary_sensor\.bedroom_radiator_window_open"[^>]*><ha-icon icon="mdi:window-open-variant">/);
  // A filter and a window: the header's alert chip counts both under a generic icon.
  assert.match(head, /<ha-icon icon="mdi:alert-circle-outline"><\/ha-icon><span>2</);
  const off = overview({ zoom: false }, makeHass("en", { "climate.bathroom_thermostat": { state: "off" } })).body;
  assert.match(off, /Off · 21 °C/);
});

// heat_cool / auto: the entity sets a low / high range (TARGET_TEMPERATURE_RANGE) instead of one target.
const rangeHass = (attrs = {}, lang = "en") =>
  makeHass(lang, {
    "climate.air_conditioner": { state: "heat_cool", supported_features: 442, temperature: null, target_temp_low: 20, target_temp_high: 24, ...attrs },
  });

test("air conditioner in heat_cool: both ends of the range, each with its own stepper", () => {
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, rangeHass());
  const out = html(el);
  assert.match(out, /→ 20–24 °C/);
  assert.match(out, /class="steppers"/);
  assert.match(out, /<span class="tval">20<small> °C<\/small><\/span><span class="tl">Heat to<\/span>/);
  assert.match(out, /<span class="tval">24<small> °C<\/small><\/span><span class="tl">Cool to<\/span>/);
  for (const a of ["temp_low", "temp_high"]) for (const v of ["-1", "1"]) assert.match(out, new RegExp(`data-action="${a}" data-value="${v}"`));
  assert.match(out, /aria-label="Raise the target \(Heat to\)"/);
  assert.doesNotMatch(out, /data-action="temp"/);
  const fr = html(mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, rangeHass({}, "fr")));
  assert.match(fr, /Chauffer à<\/span>.*Refroidir à<\/span>/s);
});

test("air conditioner in heat_cool: low and high steps are sent together, within min/max and apart", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const h = rangeHass();
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  el._action("temp_low", "1");
  el._action("temp_low", "1");
  el._action("temp_high", "-1");
  assert.match(html(el), /→ 21–23\.5 °C/);
  assert.equal(h.calls.length, 0);
  t.mock.timers.tick(1000);
  await new Promise((r) => setImmediate(r));
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [
    ["climate", "set_temperature", { entity_id: "climate.air_conditioner", target_temp_low: 21, target_temp_high: 23.5 }],
  ]);
  // The range sent stays on screen until the entity reports it.
  el.hass = rangeHass();
  assert.match(html(el), /→ 21–23\.5 °C/);
  el.hass = rangeHass({ target_temp_low: 21, target_temp_high: 23.5 });
  assert.equal(el._pendingTemp, undefined);
  assert.match(html(el), /→ 21–23\.5 °C/);
});

test("air conditioner in heat_cool: the low end stays a step under the high end, the high end under max_temp", () => {
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, rangeHass({ target_temp_low: 23, target_temp_high: 24 }));
  for (let i = 0; i < 4; i++) el._action("temp_low", "1");
  assert.deepEqual({ ...el._pendingTemp }, { target_temp_low: 23.5, target_temp_high: 24 });
  for (let i = 0; i < 4; i++) el._action("temp_high", "-1");
  assert.deepEqual({ ...el._pendingTemp }, { target_temp_low: 23.5, target_temp_high: 24 });
  const top = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, rangeHass({ target_temp_low: 16, target_temp_high: 30 }));
  top._action("temp_high", "1");
  top._action("temp_low", "-1");
  assert.deepEqual({ ...top._pendingTemp }, { target_temp_low: 16, target_temp_high: 30 });
  clearTimeout(el._tempTimer);
  clearTimeout(top._tempTimer);
});

test("air conditioner in heat_cool: a pending range is sent right away when the card is detached", () => {
  const h = rangeHass();
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  el._action("temp_high", "1");
  el.disconnectedCallback();
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [
    ["climate", "set_temperature", { entity_id: "climate.air_conditioner", target_temp_low: 20, target_temp_high: 24.5 }],
  ]);
});

test("air conditioner with range support but a single target in its mode: one stepper, as before", () => {
  const out = html(mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" },
    makeHass("en", { "climate.air_conditioner": { supported_features: 443, target_temp_low: null, target_temp_high: null } })));
  assert.match(out, /data-action="temp" data-value="1"/);
  assert.doesNotMatch(out, /class="steppers"|temp_low/);
  assert.match(out, /→ 22 °C/);
});

test("air conditioner mini in heat_cool: the range is shown, its steppers stay on the full card", () => {
  const el = mount(lib, "climate-air-aircon-mini-card", { entity: "climate.air_conditioner" }, rangeHass());
  assert.match(html(el), /25\.5 °C<\/b> → 20–24 °C/);
  assert.doesNotMatch(html(el), /data-action="temp/);
  el._toggleZoom({ detail: 1 });
  assert.match(html(el), /data-action="temp_low"/);
});

test("overview: an air conditioner in heat_cool shows its target range", () => {
  const { body } = overview({}, rangeHass());
  assert.match(body, /<span class="state">Heat\/Cool · 20–24 °C<\/span>/);
  assert.match(body, /<text class="disp"[^>]*>20-24<\/text>/);
  const fr = overview({}, rangeHass({}, "fr")).body;
  assert.match(fr, /<span class="state">[^<]+ · 20–24 °C<\/span>/);
});

test("air conditioner off: no target, dirty filter flagged", () => {
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" },
    makeHass("en", { "climate.air_conditioner": { state: "off" }, "binary_sensor.air_conditioner_full_dust": { state: "on" } }));
  const out = html(el);
  assert.doesNotMatch(out, /data-action="temp"/);
  assert.doesNotMatch(out, /class="picture[^"]*running/);
  assert.match(out, /Clean the filter/);
});

test("mini cards are compact until their detail button is pressed", () => {
  const el = mount(lib, "climate-air-aircon-mini-card", { entity: "climate.air_conditioner" }, makeHass());
  assert.match(html(el), /<ha-card class="mini">/);
  assert.match(html(el), /data-action="zoom"/);
  assert.match(html(el), /data-action="temp" data-value="1"/);
  el._toggleZoom({ detail: 1 });
  assert.doesNotMatch(html(el), /class="mini"/);
  assert.match(html(el), /mdi:arrow-collapse/);
  const plain = mount(lib, "climate-air-fan-mini-card", { entity: "fan.bedroom_fan_fan", zoom: false }, makeHass());
  assert.doesNotMatch(html(plain), /data-action="zoom"/);
});

// The zoom button is rebuilt by the render: from the keyboard, the focus moves to the new one without scrolling the
// page (the card changes size under it), so `preventScroll` is required.
test("the zoom button gets the focus back from the keyboard without scrolling the page", () => {
  const spy = (el) => {
    const calls = [];
    el.shadowRoot.querySelector(".zoom").focus = (opts) => calls.push(opts);
    return calls;
  };
  const mini = mount(lib, "climate-air-fan-mini-card", { entity: "fan.bedroom_fan_fan" }, makeHass());
  const miniCalls = spy(mini);
  mini._toggleZoom({ detail: 1 });
  assert.equal(miniCalls.length, 0, "a mouse click leaves the focus where the browser put it");
  mini._toggleZoom({ detail: 0 });
  assert.deepEqual(JSON.parse(JSON.stringify(miniCalls)), [{ preventScroll: true }]);
  const ov = mount(lib, "climate-air-overview-card", {}, makeHass());
  const ovCalls = spy(ov);
  ov._onClick({ composedPath: () => [{ dataset: { action: "zoom" } }], detail: 0 });
  assert.deepEqual(JSON.parse(JSON.stringify(ovCalls)), [{ preventScroll: true }]);
});

test("without an entity, a card takes the first device of its kind", () => {
  const el = mount(lib, "climate-air-purifier-card", {}, makeHass());
  assert.match(html(el), /Bedroom purifier/);
  assert.deepEqual(JSON.parse(JSON.stringify(lib.cards["climate-air-fan-card"].getStubConfig(makeHass()))), { entity: "fan.bedroom_fan_fan" });
});

const part = (el, sel) => el.shadowRoot.querySelector("ha-card").querySelector(sel);
const overview = (config = {}, hass = makeHass()) => {
  const el = mount(lib, "climate-air-overview-card", config, hass);
  return { el, body: part(el, ".body").innerHTML, head: part(el, ".head").innerHTML };
};

test("overview: only the devices on or needing attention, grouped by type", () => {
  const { body, head } = overview();
  assert.match(head, /7 on/);
  assert.doesNotMatch(body, /fan\.office_fan_fan/);
  assert.match(body, /data-id="fan\.bedroom_purifier"/);
  assert.match(body, /Replace the filter/);
  assert.deepEqual([...body.matchAll(/class="group">.*?<span>([^<]+)</g)].map((m) => m[1]), ["Air conditioners", "Thermostats", "Air purifiers", "Fans"]);
});

test("overview: the detail button shows every device; zoom: false always does", () => {
  const { el } = overview();
  el._onClick({ composedPath: () => [{ dataset: { action: "zoom" } }], detail: 1 });
  assert.match(part(el, ".body").innerHTML, /fan\.office_fan_fan/);
  assert.match(overview({ zoom: false }).body, /fan\.office_fan_fan/);
});

test("overview: exclude, include and group by area", () => {
  const { body } = overview({ zoom: false, exclude: ["fan.office_fan_fan"], include: ["climate.bathroom_thermostat"], group_by: "area" });
  assert.doesNotMatch(body, /fan\.office_fan_fan/);
  assert.match(body, /climate\.bathroom_thermostat/);
  assert.deepEqual([...body.matchAll(/class="group">.*?<span>([^<]+)</g)].map((m) => m[1]), ["Bedroom", "Living room", "No area"]);
  // The heading shows the area's own icon from the registry, mdi:texture-box without one, help-circle without an area.
  assert.deepEqual([...body.matchAll(/class="group"><ha-icon icon="([^"]+)"/g)].map((m) => m[1]), ["mdi:bed", "mdi:sofa", "mdi:help-circle-outline"]);
  const office = overview({ zoom: false, group_by: "area" }).body;
  assert.match(office, /<ha-icon icon="mdi:texture-box"><\/ha-icon><span>Office</);
  // Grouped by area, the tiles are labelled by kind of device instead of repeating the room, in a fixed order.
  const names = [...body.matchAll(/class="name"[^>]*>([^<]+)</g)].map((m) => m[1]);
  assert.ok(names.every((n) => ["Air conditioner", "Thermostat", "Air purifier", "Fan"].includes(n)), names.join(", "));
  const grouped = overview({ zoom: false, group_by: "area", devices: [{ entity: "fan.bedroom_purifier", name: "Bedroom air" }] }).body;
  assert.match(grouped, /class="name"[^>]*>Bedroom air</);
});

test("overview: an area icon with markup in it stays inert in the group heading", () => {
  const h = makeHass();
  h.areas.bedroom.icon = 'mdi:bed" onclick="alert(1)';
  const { body } = overview({ zoom: false, group_by: "area" }, h);
  assert.doesNotMatch(body, /onclick="alert/);
  assert.match(body, /icon="mdi:bed&quot; onclick=&quot;alert\(1\)"/);
});

test("overview: each group spans as many columns as it has devices, up to the column count", () => {
  const spans = (body) => [...body.matchAll(/class="grp" style="--span:(\d+)"/g)].map((m) => Number(m[1]));
  assert.deepEqual(spans(overview({ zoom: false }).body), [1, 2, 2, 2]);
  assert.deepEqual(spans(overview({ zoom: false, group_by: "none" }).body), [2]);
  assert.deepEqual(spans(overview({ zoom: false, group_by: "none", columns: 6 }).body), [6]);
});

test("overview: tapping the icon turns the device off, tapping the tile unfolds its card", () => {
  const h = makeHass();
  const { el } = overview({}, h);
  el._onClick({ composedPath: () => [{ dataset: { toggle: "fan.bedroom_fan_fan" } }] });
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls.at(-1))), ["fan", "turn_off", { entity_id: "fan.bedroom_fan_fan" }]);
  el._tap("climate.air_conditioner");
  const panel = el.shadowRoot.querySelector(".panel");
  assert.equal(panel.hidden, false);
  assert.equal(panel.children[0]?._config.entity, "climate.air_conditioner");
});

test("overview: each tile shows its device's illustration, animated while it runs", () => {
  const { body } = overview({ zoom: false });
  assert.match(body, /data-toggle="climate\.air_conditioner"[^>]*><div class="picture k-aircon st-cool running m-cool active swing-v"/);
  assert.match(body, /data-toggle="fan\.bedroom_fan_fan"[^>]*><div class="picture k-fan st-on running osc natural" style="--ca-spin:1\.13s"/);
  assert.match(body, /data-toggle="fan\.office_fan_fan"[^>]*><div class="picture k-fan st-off"/);
  // Each tile's SVG ids are its own: a gradient takes the colours of its own device.
  const ids = [...body.matchAll(/id="(ca-[a-z0-9-]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.match(body, /url\(#ca-pf-purifier-\d+\)/);
});

test("overview: illustrations per kind of device or per device, guessed from the model otherwise", () => {
  const h = makeHass();
  h.devices.dev_p1.model = "Smartmi Air Purifier P2";
  const { body } = overview({ zoom: false, illustrations: { aircon: "window", "fan.bedroom_purifier": "cylinder" } }, h);
  assert.match(body, /class="ic pic"[^>]*><div class="picture k-aircon[^"]*"[^>]*><svg[^>]*>.*?class="ofan"/s);
  assert.match(body, /data-toggle="fan\.bedroom_purifier"[^>]*><div class="picture k-purifier[^>]*><svg[^>]*>(?:(?!<\/svg>).)*M21 13V85/s);
  // P2 in the model: the square box (its slatted top outlet).
  assert.match(body, /data-toggle="fan\.living_room_purifier_air_purifier"[^>]*><div class="picture k-purifier[^>]*><svg[^>]*>(?:(?!<\/svg>).)*M19\.5 19\.6v3\.8/s);
});

test("overview: an icon replaces the illustration, per kind of device or per device", () => {
  const { body, head } = overview({
    zoom: false,
    icon: "mdi:home-thermometer",
    icons: { fan: "mdi:fan-speed-1", "fan.bedroom_fan_fan": "mdi:ceiling-fan" },
  });
  assert.match(head, /mdi:home-thermometer/);
  assert.match(body, /data-toggle="fan\.bedroom_fan_fan"[^>]*><ha-icon icon="mdi:ceiling-fan">/);
  assert.match(body, /data-toggle="fan\.office_fan_fan"[^>]*><ha-icon icon="mdi:fan-speed-1">/);
  assert.match(body, /data-toggle="climate\.air_conditioner"[^>]*><div class="picture k-aircon/);
});

test("overview editor: device types and devices as sections, written back as illustrations, icons and devices", () => {
  const ed = new (lib.customElements.get("climate-air-overview-card-editor"))();
  ed.setConfig({
    type: "custom:climate-air-overview-card",
    exclude: ["fan.office_fan_fan"],
    illustrations: { aircon: "window", "fan.bedroom_purifier": "cylinder" },
    icons: { fan: "mdi:fan-speed-1" },
    devices: [{ entity: "fan.bedroom_fan_fan", name: "Chambre" }, { entity: "fan.office_fan_fan", name: "Bureau" }],
  });
  ed.hass = makeHass("fr");
  const json = (v) => JSON.parse(JSON.stringify(v));
  const schema = ed._form.schema;
  const kinds = schema.find((s) => s.name === "kinds");
  assert.deepEqual(json(kinds.schema.map((k) => [k.name, k.title, k.schema.map((f) => f.name)])), [
    ["aircon", "Climatiseurs", ["illustration", "icon"]],
    ["thermostat", "Thermostats", ["illustration", "icon"]],
    ["purifier", "Purificateurs", ["illustration", "icon"]],
    ["fan", "Ventilateurs", ["icon"]],
  ]);
  const devs = schema.find((s) => s.name === "devs");
  assert.deepEqual(json(devs.schema.map((d) => [d.name, d.title])), [
    ["climate.air_conditioner", "Climatiseur"],
    ["climate.bathroom_thermostat", "Bathroom thermostat"],
    ["climate.bedroom_radiator_valve", "Radiateur chambre"],
    ["fan.dyson_pure_cool", "Dyson Pure Cool"],
    ["fan.bedroom_purifier", "Purificateur chambre"],
    ["fan.living_room_purifier_air_purifier", "Purificateur séjour"],
    ["fan.bedroom_fan_fan", "Ventilateur chambre"],
  ]);
  assert.deepEqual(json(devs.schema[6].schema.map((f) => f.name)), ["name", "type", "icon"]);
  assert.equal(ed._form.computeLabel({ name: "type" }), "Type");
  // The device's illustration moves from `illustrations` into its `devices` entry; the excluded device keeps its own.
  const data = ed._form.data;
  assert.deepEqual(json(data.devs["fan.bedroom_purifier"]), { type: "auto", illustration: "cylinder" });
  assert.equal(data.kinds.aircon.illustration, "window");
  data.devs["climate.air_conditioner"].icon = "mdi:air-conditioner";
  ed._valueChanged({ stopPropagation() {}, detail: { value: data } });
  assert.deepEqual(json(ed._config), {
    type: "custom:climate-air-overview-card",
    exclude: ["fan.office_fan_fan"],
    illustrations: { aircon: "window" },
    icons: { fan: "mdi:fan-speed-1" },
    devices: [
      { entity: "climate.air_conditioner", icon: "mdi:air-conditioner" },
      { entity: "fan.bedroom_purifier", illustration: "cylinder" },
      { entity: "fan.bedroom_fan_fan", name: "Chambre" },
      { entity: "fan.office_fan_fan", name: "Bureau" },
    ],
  });
});

test("overview editor keeps the illustrations and icons of devices the form does not list", () => {
  // The README's "Full options" example: fan.garage_fan is excluded, fan.bedroom_air and climate.bathroom_thermostat
  // are not in hass.states (an integration still loading, say).
  const ed = new (lib.customElements.get("climate-air-overview-card-editor"))();
  const config = {
    type: "custom:climate-air-overview-card",
    title: "Climate & air",
    columns: 2,
    exclude: ["fan.garage_fan"],
    include: ["climate.bathroom_thermostat"],
    illustrations: { aircon: "window", "fan.bedroom_air": "box" },
    icons: { "fan.garage_fan": "mdi:ceiling-fan" },
    devices: [{ entity: "fan.bedroom_air", name: "Bedroom", type: "purifier" }],
  };
  ed.setConfig(config);
  ed.hass = makeHass();
  const json = (v) => JSON.parse(JSON.stringify(v));
  ed._valueChanged({ stopPropagation() {}, detail: { value: { ...ed._form.data, columns: 3 } } });
  assert.deepEqual(json(ed._config), { ...config, columns: 3 });
  // A listed device's own entry still wins: its `illustrations` key moves into `devices`, and is not copied back.
  ed.setConfig({ type: "custom:climate-air-overview-card", illustrations: { "fan.bedroom_purifier": "cylinder" } });
  ed._valueChanged({ stopPropagation() {}, detail: { value: ed._form.data } });
  assert.deepEqual(json(ed._config), { type: "custom:climate-air-overview-card", devices: [{ entity: "fan.bedroom_purifier", illustration: "cylinder" }] });
});

test("the fan editors offer no alerts toggle: the fan cards show no alert", () => {
  const names = (tag) => {
    const ed = new (lib.customElements.get(`${tag}-editor`))();
    ed.setConfig({ type: `custom:${tag}` });
    ed.hass = makeHass();
    return ed._form.schema.flatMap((s) => (s.schema ? s.schema.map((f) => f.name) : [s.name]));
  };
  for (const tag of ["climate-air-fan-card", "climate-air-fan-mini-card"]) assert.ok(!names(tag).includes("show_alerts"), tag);
  for (const tag of ["climate-air-purifier-card", "climate-air-purifier-mini-card", "climate-air-aircon-card", "climate-air-aircon-mini-card"])
    assert.ok(names(tag).includes("show_alerts"), tag);
  // The fan form's data carries no show_alerts either, and a round trip writes none.
  const ed = new (lib.customElements.get("climate-air-fan-card-editor"))();
  ed.setConfig({ type: "custom:climate-air-fan-card", entity: "fan.bedroom_fan_fan" });
  ed.hass = makeHass();
  assert.ok(!("show_alerts" in ed._form.data));
  ed._valueChanged({ stopPropagation() {}, detail: { value: ed._form.data } });
  assert.deepEqual(JSON.parse(JSON.stringify(ed._config)), { type: "custom:climate-air-fan-card", entity: "fan.bedroom_fan_fan" });
});

test("overview editor: the alerts toggle the card reads, on by default and only written when turned off", () => {
  const ed = new (lib.customElements.get("climate-air-overview-card-editor"))();
  ed.setConfig({ type: "custom:climate-air-overview-card" });
  ed.hass = makeHass();
  const names = ed._form.schema.flatMap((s) => (s.type === "grid" ? s.schema.map((f) => f.name) : [s.name]));
  assert.ok(names.includes("show_alerts"));
  assert.equal(ed._form.computeLabel({ name: "show_alerts" }), "Alerts");
  assert.equal(ed._form.data.show_alerts, true);
  // Left on, nothing is written; turned off, the YAML keeps it.
  ed._valueChanged({ stopPropagation() {}, detail: { value: ed._form.data } });
  assert.ok(!("show_alerts" in ed._config));
  ed._valueChanged({ stopPropagation() {}, detail: { value: { ...ed._form.data, show_alerts: false } } });
  assert.equal(ed._config.show_alerts, false);
});

test("overview: show_alerts: false hides the filter alerts, the devices still showing", () => {
  assert.match(overview().body, /Replace the filter/);
  const { body } = overview({ show_alerts: false });
  assert.doesNotMatch(body, /Replace the filter|Clean the filter/);
  assert.match(body, /data-id="fan\.bedroom_purifier"/);
});

test("values integrations leave untranslated are translated by the cards", () => {
  const fr = (changes) => makeHass("fr", changes);
  // Xiaomi Home fan presets, and a "Level4" select option.
  const fan = html(mount(lib, "climate-air-fan-card", { entity: "fan.bedroom_fan_fan" }, fr()));
  assert.match(fan, /<span>Vent naturel<\/span>/);
  assert.match(fan, /<span>Vent direct<\/span>/);
  assert.doesNotMatch(fan, />(Natural wind|Straight wind)</);
  // Xiaomi Home purifier presets; HomeKit status and mode.
  const p1 = html(mount(lib, "climate-air-purifier-card", { entity: "fan.living_room_purifier_air_purifier" }, fr()));
  assert.match(p1, /<span>Nuit<\/span>/);
  assert.match(p1, /<span>Favori<\/span>/);
  const p2 = html(mount(lib, "climate-air-purifier-card", { entity: "fan.bedroom_purifier" }, fr()));
  assert.match(p2, /<span>Automatique<\/span>/);
  assert.match(p2, /<span>Manuel<\/span>/);
  assert.match(p2, /Purification/);
  // Midea fan modes Home Assistant does not know.
  const ac = html(mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, fr({ "climate.air_conditioner": { fan_mode: "silent" } })));
  assert.match(ac, /<option value="silent" selected>Silencieux<\/option>/);
  assert.match(ac, /<option value="full">Maximum<\/option>/);
  // Home Assistant's own translation still wins.
  assert.match(ac, /<option value="low">Faible<\/option>/);
  // The overview too.
  const ov = mount(lib, "climate-air-overview-card", {}, fr());
  assert.match(ov.shadowRoot.querySelector("ha-card").querySelector(".body").innerHTML, /45 % · Vent naturel/);
});

test("level values keep their number", () => {
  const h = makeHass("fr", { "fan.bedroom_fan_fan": { preset_modes: ["Level4", "level_2"], preset_mode: "Level4" } });
  const out = html(mount(lib, "climate-air-fan-card", { entity: "fan.bedroom_fan_fan" }, h));
  assert.match(out, /<span>Niveau 4<\/span>/);
  assert.match(out, /<span>Niveau 2<\/span>/);
});

test("air conditioner options get the card's labels, the integration naming them in English only", () => {
  const h = makeHass("fr");
  for (const [id, name] of [
    ["switch.air_conditioner_auxiliary_heating", "Auxiliary heating"],
    ["switch.air_conditioner_outdoor_silent_mode", "Outdoor silent mode"],
    ["switch.air_conditioner_smart_eye", "Smart eye"],
    ["switch.air_conditioner_anion", "Anion"],
    ["switch.air_conditioner_odd_thing", "Odd thing"],
  ]) {
    h.states[id] = { entity_id: id, state: "off", attributes: { friendly_name: `Climatiseur ${name}` } };
    h.entities[id] = { entity_id: id, device_id: "dev_ac" };
  }
  const out = html(mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h));
  for (const label of ["Bip sonore", "Écran", "Autonettoyage", "Éco", "Chauffage d'appoint", "Unité extérieure silencieuse", "Œil intelligent", "Ions négatifs"]) {
    assert.match(out, new RegExp(`</ha-icon>${label.replace("'", "&#39;")}</button>`), label);
  }
  // Unknown: its own name, without the device name.
  assert.match(out, /<\/ha-icon>Odd thing<\/button>/);
  assert.doesNotMatch(out, />(Prompt tone|Screen display|Self clean|Smart eye)</);
});

test("a state that arrives after the registry is still found (Home Assistant starting up)", () => {
  const full = makeHass();
  const states = { ...full.states };
  delete states["sensor.living_room_purifier_pm2_5_density"];
  const early = { ...full, states };
  const el = mount(lib, "climate-air-purifier-card", { entity: "fan.living_room_purifier_air_purifier" }, early);
  assert.equal(el._r.ent.pm25, undefined);
  // Same registry object, every state now there.
  el.hass = { ...full, states: { ...full.states } };
  assert.equal(el._r.ent.pm25, "sensor.living_room_purifier_pm2_5_density");
});

test("air conditioner: a 0.1 step sends a rounded target, and a refused call is not an unhandled rejection", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const h = makeHass();
  const st = h.states["climate.air_conditioner"];
  h.states["climate.air_conditioner"] = { ...st, attributes: { ...st.attributes, target_temp_step: 0.1, temperature: 21.2 } };
  h.callService = (domain, service, data) => {
    h.calls.push([domain, service, data]);
    return Promise.reject(new Error("out of range"));
  };
  const unhandled = [];
  const onUnhandled = (e) => unhandled.push(e);
  process.on("unhandledRejection", onUnhandled);
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  el._action("temp", "1");
  t.mock.timers.tick(1000);
  await new Promise((r) => setImmediate(r));
  process.off("unhandledRejection", onUnhandled);
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [["climate", "set_temperature", { entity_id: "climate.air_conditioner", temperature: 21.3 }]]);
  assert.equal(unhandled.length, 0);
  assert.equal(el._pendingTemp, undefined);
});

test("a card redraws once a dropdown or slider it held loses focus (closed with Escape, thumb touched)", async () => {
  const id = "fan.living_room_purifier_air_purifier";
  const el = mount(lib, "climate-air-purifier-card", { entity: id }, makeHass());
  assert.match(html(el), /st-on running/);
  // A select is open (or a slider held): updates wait, the card does not rebuild under the finger.
  el.shadowRoot.activeElement = { tagName: "SELECT" };
  el.hass = makeHass("en", { [id]: { state: "off" } });
  assert.match(html(el), /st-on running/);
  // Focus leaves without a `change` (Escape, same value picked): the waiting update is drawn.
  el.shadowRoot.activeElement = null;
  el.shadowRoot.emit("focusout");
  await new Promise((r) => setTimeout(r, 5));
  assert.doesNotMatch(html(el), /st-on/);
  assert.match(html(el), /st-off/);
});

test("focus moving from one control of the card to another still holds the update back", async () => {
  const id = "fan.living_room_purifier_air_purifier";
  const el = mount(lib, "climate-air-purifier-card", { entity: id }, makeHass());
  el.shadowRoot.activeElement = { tagName: "SELECT" };
  el.hass = makeHass("en", { [id]: { state: "off" } });
  // Tab from the select to the speed slider: the focus is still inside a control.
  el.shadowRoot.activeElement = { tagName: "INPUT" };
  el.shadowRoot.emit("focusout");
  await new Promise((r) => setTimeout(r, 5));
  assert.match(html(el), /st-on running/);
  el.shadowRoot.activeElement = null;
  el.shadowRoot.emit("focusout");
  await new Promise((r) => setTimeout(r, 5));
  assert.match(html(el), /st-off/);
});

test("focus leaving a card with no update held back does not rebuild it", async () => {
  const el = mount(lib, "climate-air-purifier-card", { entity: "fan.living_room_purifier_air_purifier" }, makeHass());
  let renders = 0;
  const render = el._render.bind(el);
  el._render = (r) => {
    renders++;
    render(r);
  };
  el.shadowRoot.emit("focusout");
  await new Promise((r) => setTimeout(r, 5));
  assert.equal(renders, 0);
});

test("focus moving to a button of the card (mouse press after a dropdown) does not rebuild it before the click", async () => {
  const id = "fan.living_room_purifier_air_purifier";
  const el = mount(lib, "climate-air-purifier-card", { entity: id }, makeHass());
  el.shadowRoot.activeElement = { tagName: "SELECT" };
  el.hass = makeHass("en", { [id]: { state: "off" } });
  let renders = 0;
  const render = el._render.bind(el);
  el._render = (r) => {
    renders++;
    render(r);
  };
  // mousedown on a button: the focus goes from the select to that button, between mousedown and mouseup.
  const button = { tagName: "BUTTON" };
  el.shadowRoot.contains = (n) => n === button;
  el.shadowRoot.activeElement = button;
  el.shadowRoot.emit("focusout", { relatedTarget: button });
  await new Promise((r) => setTimeout(r, 5));
  assert.equal(renders, 0);
  // The held update is drawn by the next tick (or the click's own update).
  el.hass = makeHass("en", { [id]: { state: "off" } });
  assert.equal(renders, 1);
  assert.match(html(el), /st-off/);
});

test("focus moving out of the card to another element of the page still draws the held update", async () => {
  const id = "fan.living_room_purifier_air_purifier";
  const el = mount(lib, "climate-air-purifier-card", { entity: id }, makeHass());
  el.shadowRoot.activeElement = { tagName: "SELECT" };
  el.hass = makeHass("en", { [id]: { state: "off" } });
  el.shadowRoot.contains = () => false;
  el.shadowRoot.activeElement = null;
  el.shadowRoot.emit("focusout", { relatedTarget: { tagName: "BUTTON" } });
  await new Promise((r) => setTimeout(r, 5));
  assert.match(html(el), /st-off/);
});

// Each chip opens the more-info dialog of the entity it shows, from the cards and from the overview tiles.
const moreInfo = (el) => {
  const events = [];
  el.dispatchEvent = (ev) => events.push([ev.type, ev.detail?.entityId]);
  return events;
};

test("chips carry their entity and a click opens its more-info", () => {
  const h = makeHass("en", { "binary_sensor.air_conditioner_full_dust": { state: "on" } });
  const ac = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  const out = html(ac);
  assert.match(out, /class="chip warn" data-more-info="binary_sensor\.air_conditioner_full_dust"/);
  assert.match(out, /data-more-info="sensor\.air_conditioner_outdoor_temperature"/);
  const events = moreInfo(ac);
  ac._onClick({ composedPath: () => [{ dataset: { moreInfo: "sensor.air_conditioner_outdoor_temperature" } }] });
  assert.deepEqual(events, [["hass-more-info", "sensor.air_conditioner_outdoor_temperature"]]);
  assert.equal(h.calls.length, 0);
  assert.match(html(mount(lib, "climate-air-purifier-card", { entity: "fan.bedroom_purifier" }, makeHass())), /chip warn" data-more-info="sensor\.bedroom_purifier_filter_lifetime"/);
  assert.match(html(mount(lib, "climate-air-fan-card", { entity: "fan.bedroom_fan_fan" }, makeHass())), /data-more-info="sensor\.bedroom_fan_relative_humidity"/);
});

test("overview: the filter alert chip opens its entity's more-info, not the device's card", () => {
  const { el, body } = overview();
  assert.match(body, /class="chip warn" data-more-info="sensor\.bedroom_purifier_filter_lifetime"/);
  const events = moreInfo(el);
  el._onClick({ composedPath: () => [{ dataset: { moreInfo: "sensor.bedroom_purifier_filter_lifetime" } }, { classList: { contains: (c) => c === "dev" }, dataset: { id: "fan.bedroom_purifier" } }] });
  assert.deepEqual(events, [["hass-more-info", "sensor.bedroom_purifier_filter_lifetime"]]);
  assert.equal(el._open, undefined);
});

test("mini cards size their height to their content in a Sections view", () => {
  const el = mount(lib, "climate-air-fan-mini-card", { entity: "fan.bedroom_fan_fan" }, makeHass());
  assert.deepEqual({ ...el.getGridOptions() }, { columns: 6, min_columns: 6, rows: "auto" });
  el._toggleZoom({ detail: 1 });
  assert.equal(el.getGridOptions().rows, "auto");
});

// A focused control of the stand-in DOM: its tag and data-* attributes, as caFocusKey reads them.
const control = (tag, data) => {
  const el = { localName: tag, attributes: Object.entries(data).map(([name, value]) => ({ name, value })), focused: [] };
  el.getAttribute = (k) => data[k] ?? null;
  el.focus = (opts) => el.focused.push(opts);
  return el;
};

// Like the browser: rebuilding `node`'s markup removes the focused control, so `root` has none focused any more.
const dropFocusOnRebuild = (root, node = root) => {
  let markup = node.innerHTML;
  Object.defineProperty(node, "innerHTML", {
    get: () => markup,
    set: (v) => {
      markup = v;
      root.activeElement = null;
    },
  });
};

test("a render puts the focus back on the control that had it (− / + of the target, from the keyboard)", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass());
  const root = el.shadowRoot;
  dropFocusOnRebuild(root);
  const plus = control("button", { "data-action": "temp", "data-value": "1" });
  const minus = control("button", { "data-action": "temp", "data-value": "-1" });
  root.querySelectorAll = (tag) => (tag === "button" ? [minus, plus] : []);
  root.activeElement = control("button", { "data-action": "temp", "data-value": "1" });
  el._action("temp", "1");
  assert.match(html(el), /22,5|22\.5/);
  assert.deepEqual(JSON.parse(JSON.stringify(plus.focused)), [{ preventScroll: true }]);
  assert.equal(minus.focused.length, 0);
  // Nothing focused before the render: nothing is focused after it.
  root.activeElement = null;
  el._action("temp", "1");
  assert.equal(plus.focused.length, 1);
});

test("overview: a render puts the focus back on the tile's button that had it", () => {
  const h = makeHass();
  const el = mount(lib, "climate-air-overview-card", {}, h);
  const root = el.shadowRoot;
  dropFocusOnRebuild(root, part(el, ".body"));
  const open = control("button", { "data-open": "fan.bedroom_purifier" });
  root.querySelectorAll = (tag) => (tag === "button" ? [control("button", { "data-toggle": "fan.bedroom_purifier" }), open] : []);
  root.activeElement = control("button", { "data-open": "fan.bedroom_purifier" });
  el.hass = makeHass("en", { "fan.bedroom_purifier": { percentage: 20 } });
  assert.deepEqual(JSON.parse(JSON.stringify(open.focused)), [{ preventScroll: true }]);
});

test("a dropdown or slider changed with a pointer lets go of the focus; from the keyboard it keeps it", () => {
  const id = "fan.living_room_purifier_air_purifier";
  const h = makeHass();
  const el = mount(lib, "climate-air-purifier-card", { entity: id }, h);
  const select = () => {
    const s = { type: "select-one", value: "Sleep", dataset: { attrService: "set_preset_mode", attr: "preset_mode" }, blurred: 0 };
    s.blur = () => s.blurred++;
    return s;
  };
  el.shadowRoot.emit("pointerdown");
  const byPointer = select();
  el._onChange({ target: byPointer });
  assert.equal(byPointer.blurred, 1);
  el.shadowRoot.emit("keydown", { key: "ArrowDown", target: {} });
  const byKey = select();
  el._onChange({ target: byKey });
  assert.equal(byKey.blurred, 0);
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [
    ["fan", "set_preset_mode", { entity_id: id, preset_mode: "Sleep" }],
    ["fan", "set_preset_mode", { entity_id: id, preset_mode: "Sleep" }],
  ]);
});

test("a slider moved from the keyboard sends its value once the presses stop, or when the focus leaves", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const id = "fan.living_room_purifier_air_purifier";
  const h = makeHass();
  const el = mount(lib, "climate-air-purifier-card", { entity: id }, h);
  const slider = { type: "range", value: "50", dataset: { range: "percentage" }, blur: () => assert.fail("no blur from the keyboard") };
  el.shadowRoot.emit("keydown", { key: "ArrowRight", target: slider });
  for (const v of ["51", "52", "53"]) {
    slider.value = v;
    el._onChange({ target: slider });
    t.mock.timers.tick(300);
  }
  assert.equal(h.calls.length, 0);
  t.mock.timers.tick(1000);
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [["fan", "set_percentage", { entity_id: id, percentage: 53 }]]);
  slider.value = "60";
  el._onChange({ target: slider });
  el.shadowRoot.emit("focusout", {});
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls.at(-1))), ["fan", "set_percentage", { entity_id: id, percentage: 60 }]);
  t.mock.timers.tick(1000);
  assert.equal(h.calls.length, 2);
});

test("chips that open a more-info are focusable buttons that Enter and Space open", () => {
  const h = makeHass("en", { "binary_sensor.air_conditioner_full_dust": { state: "on" } });
  const ac = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  assert.match(html(ac), /class="chip warn" data-more-info="binary_sensor\.air_conditioner_full_dust" role="button" tabindex="0"/);
  const events = moreInfo(ac);
  const chip = { dataset: { moreInfo: "binary_sensor.air_conditioner_full_dust" } };
  let prevented = 0;
  for (const key of ["Enter", " ", "a"]) ac.shadowRoot.emit("keydown", { key, target: chip, preventDefault: () => prevented++ });
  assert.deepEqual(events, [
    ["hass-more-info", "binary_sensor.air_conditioner_full_dust"],
    ["hass-more-info", "binary_sensor.air_conditioner_full_dust"],
  ]);
  assert.equal(prevented, 2);
  const { el, body } = overview();
  assert.match(body, /class="chip warn" data-more-info="sensor\.bedroom_purifier_filter_lifetime" role="button" tabindex="0"/);
  const ovEvents = moreInfo(el);
  el.shadowRoot.emit("keydown", { key: "Enter", target: { dataset: { moreInfo: "sensor.bedroom_purifier_filter_lifetime" } }, preventDefault() {} });
  assert.deepEqual(ovEvents, [["hass-more-info", "sensor.bedroom_purifier_filter_lifetime"]]);
});

test("overview: a tile is no button holding buttons; its name is the button that unfolds the card", () => {
  const { el, body } = overview();
  assert.doesNotMatch(body, /class="dev[^"]*"[^>]*role="button"/);
  assert.doesNotMatch(body, /class="dev[^"]*"[^>]*tabindex/);
  assert.match(body, /<button class="name" data-open="fan\.bedroom_purifier" aria-expanded="false">/);
  el._onClick({ composedPath: () => [{ dataset: { open: "fan.bedroom_purifier" } }, { classList: { contains: (c) => c === "dev" }, dataset: { id: "fan.bedroom_purifier" } }] });
  assert.equal(el._open, "fan.bedroom_purifier");
  assert.match(part(el, ".body").innerHTML, /data-open="fan\.bedroom_purifier" aria-expanded="true"/);
});

test("air conditioner: a horizontal swing select when the entity supports it", () => {
  const h = makeHass("fr", { "climate.air_conditioner": { swing_horizontal_mode: "auto" } });
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  const out = html(el);
  assert.match(out, /<span>Balayage horizontal<\/span><select data-attr-service="set_swing_horizontal_mode" data-attr="swing_horizontal_mode">/);
  assert.match(out, /<option value="auto" selected>/);
  assert.match(out, /class="picture k-aircon [^"]*swing-v swing-h"/);
  el.shadowRoot.emit("pointerdown");
  el._onChange({ target: { value: "left", dataset: { attrService: "set_swing_horizontal_mode", attr: "swing_horizontal_mode" }, blur() {} } });
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [["climate", "set_swing_horizontal_mode", { entity_id: "climate.air_conditioner", swing_horizontal_mode: "left" }]]);
  // Without the feature bit (512), no select.
  const plain = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass("en", { "climate.air_conditioner": { supported_features: 441 } }));
  assert.doesNotMatch(html(plain), /swing_horizontal_mode/);
  assert.match(html(plain), /class="picture k-aircon [^"]*swing-v"/);
});

test("air conditioner: − / + does not jump back after the call, until the entity reports the target or 10 s pass", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const h = makeHass();
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  el._action("temp", "1");
  t.mock.timers.tick(1000);
  await new Promise((r) => setImmediate(r));
  assert.equal(h.calls.length, 1);
  // A state update that still carries the old target (another attribute changed): the new one stays shown.
  el.hass = makeHass("en", { "climate.air_conditioner": { current_temperature: 25 } });
  assert.match(html(el), /→ 22\.5 °C/);
  assert.equal(el._pendingTemp, 22.5);
  // Detached meanwhile: nothing is sent twice.
  el.disconnectedCallback();
  assert.equal(h.calls.length, 1);
  // The entity reports the target: the entity's value takes over.
  const ok = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass());
  ok._action("temp", "-1");
  t.mock.timers.tick(1000);
  await new Promise((r) => setImmediate(r));
  ok.hass = makeHass("en", { "climate.air_conditioner": { temperature: 21.5 } });
  assert.equal(ok._pendingTemp, undefined);
  assert.match(html(ok), /→ 21\.5 °C/);
  // The entity never reports it (a device that rounds the target): its own value is back after 10 s.
  const late = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass());
  late._action("temp", "1");
  t.mock.timers.tick(1000);
  await new Promise((r) => setImmediate(r));
  assert.equal(late._pendingTemp, 22.5);
  t.mock.timers.tick(10000);
  assert.equal(late._pendingTemp, undefined);
  assert.match(html(late), /→ 22 °C/);
});

test("air conditioner: a tap during the wait for the entity sends the new target from the one shown", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const h = makeHass();
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  el._action("temp", "1");
  t.mock.timers.tick(1000);
  await new Promise((r) => setImmediate(r));
  el._action("temp", "1");
  t.mock.timers.tick(1000);
  await new Promise((r) => setImmediate(r));
  assert.deepEqual(h.calls.map((c) => c[2].temperature), [22.5, 23]);
  // The first settle timer was cancelled: the second target stays.
  t.mock.timers.tick(9500);
  assert.equal(el._pendingTemp, 23);
  t.mock.timers.tick(1000);
  assert.equal(el._pendingTemp, undefined);
});

// A slider stand-in: its value, its style and the value text next to it.
const slider = (data, attrs) => {
  const v = { textContent: "" };
  const props = [];
  return { type: "range", dataset: data, ...attrs, style: { setProperty: (k, val) => props.push([k, val]) }, parentNode: { querySelector: (s) => (s === ".v" ? v : null) }, v, props };
};

test("a slider shows its fill and value while it moves, before any service call", () => {
  const h = makeHass();
  const el = mount(lib, "climate-air-purifier-card", { entity: "fan.living_room_purifier_air_purifier" }, h);
  const speed = slider({ range: "percentage" }, { min: "1", max: "100", value: "42" });
  el.shadowRoot.emit("input", { target: speed });
  assert.deepEqual(speed.props, [["--p", "42%"]]);
  assert.equal(speed.v.textContent, "42 %");
  const level = slider({ number: "number.living_room_purifier_favorite_fan_level" }, { min: "0", max: "14", value: "7" });
  el.shadowRoot.emit("input", { target: level });
  assert.deepEqual(level.props, [["--p", "50%"]]);
  assert.equal(level.v.textContent, "7");
  assert.equal(h.calls.length, 0);
});

test("a focused dropdown no longer freezes the card: it is redrawn around it", () => {
  const id = "fan.living_room_purifier_air_purifier";
  const el = mount(lib, "climate-air-purifier-card", { entity: id }, makeHass());
  // The stand-in DOM cannot find the control in the new markup: the whole card is redrawn (it was held back before).
  el.shadowRoot.activeElement = { tagName: "SELECT", localName: "select", attributes: [{ name: "data-attr-service", value: "set_preset_mode" }] };
  el.hass = makeHass("en", { [id]: { state: "off" } });
  assert.match(html(el), /st-off/);
});

// A tiny DOM for caPatchAround: tag, attributes, children, before / after / remove.
const dom = (tag, attrs = {}, kids = []) => {
  const n = { localName: tag, parentNode: null, childNodes: [], attrs: { ...attrs } };
  Object.defineProperty(n, "attributes", { get: () => Object.entries(n.attrs).map(([name, value]) => ({ name, value })) });
  n.hasAttribute = (k) => k in n.attrs;
  n.getAttribute = (k) => n.attrs[k] ?? null;
  n.setAttribute = (k, v) => {
    n.attrs[k] = v;
  };
  n.removeAttribute = (k) => {
    delete n.attrs[k];
  };
  n.remove = () => {
    if (!n.parentNode) return;
    n.parentNode.childNodes.splice(n.parentNode.childNodes.indexOf(n), 1);
    n.parentNode = null;
  };
  const insert = (after) => (...items) => {
    items.forEach((it, k) => {
      it.remove();
      const p = n.parentNode;
      p.childNodes.splice(p.childNodes.indexOf(n) + (after ? 1 + k : 0), 0, it);
      it.parentNode = p;
    });
  };
  n.before = insert(false);
  n.after = insert(true);
  for (const k of kids) {
    k.parentNode = n;
    n.childNodes.push(k);
  }
  return n;
};
const shape = (n) => [n.localName, n.attrs.class || n.attrs.text || "", n.childNodes.map(shape)];

test("caPatchAround replaces everything but the focused control and its ancestors", () => {
  const keep = dom("input", { "data-range": "percentage", value: "40" });
  const oldCard = dom("ha-card", { class: "old" }, [dom("div", { class: "header", text: "On" }), dom("div", { class: "slider old" }, [dom("span", { class: "v", text: "40 %" }), keep])]);
  const root = dom("#root", {}, [dom("style"), oldCard]);
  const twin = dom("input", { "data-range": "percentage", value: "10" });
  const fresh = dom("div", {}, [dom("style"), dom("ha-card", { class: "new" }, [dom("div", { class: "header", text: "Off" }), dom("div", { class: "slider" }, [dom("span", { class: "v", text: "10 %" }), twin, dom("i")])])]);
  assert.equal(lib.caPatchAround(root, fresh, keep, twin), true);
  // Same nodes kept (focus, value, open list), attributes of the ancestors updated, the rest from the new markup.
  assert.equal(root.childNodes[1], oldCard);
  assert.equal(oldCard.childNodes[1].childNodes[1], keep);
  assert.equal(keep.attrs.value, "40");
  assert.deepEqual(shape(root), ["#root", "", [["style", "", []], ["ha-card", "new", [["div", "header", []], ["div", "slider", [["span", "v", []], ["input", "", []], ["i", "", []]]]]]]]);
  assert.equal(oldCard.childNodes[0].attrs.text, "Off");
  // The control moved (another depth): not patched.
  const moved = dom("input");
  const other = dom("div", {}, [dom("ha-card", {}, [moved])]);
  assert.equal(lib.caPatchAround(root, other, keep, moved), false);
});

test("air conditioner: a target humidity slider when the entity supports it, calling climate.set_humidity", () => {
  const h = makeHass("en", { "climate.air_conditioner": { state: "dry", supported_features: 957, humidity: 55, min_humidity: 35, max_humidity: 85 } });
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, h);
  const out = html(el);
  assert.match(out, /<span class="sl-label">Target humidity<\/span><input type="range" min="35" max="85" step="1" value="55" data-humidity="target" aria-label="Target humidity" style="--p:40%">/);
  assert.match(out, /<span class="v">55 %<\/span>/);
  el._pointer = true;
  el._onChange({ target: { dataset: { humidity: "target" }, value: "60", type: "range", blur() {} } });
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [["climate", "set_humidity", { entity_id: "climate.air_conditioner", humidity: 60 }]]);
  assert.match(html(mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass("fr", { "climate.air_conditioner": { supported_features: 957, humidity: 55 } }))), /Humidité cible/);
  // Without the feature bit (4), or off: no slider.
  assert.doesNotMatch(html(mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass("en", { "climate.air_conditioner": { humidity: 55 } }))), /data-humidity/);
  assert.doesNotMatch(html(mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass("en", { "climate.air_conditioner": { state: "off", supported_features: 957, humidity: 55 } }))), /data-humidity/);
});
