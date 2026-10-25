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
  assert.equal(lib.window.customCards.length, 7);
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
  assert.match(html(el), /<span class="tval">23 °C/);
  assert.equal(h.calls.length, 0);
  t.mock.timers.tick(1000);
  await Promise.resolve();
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls)), [["climate", "set_temperature", { entity_id: "climate.air_conditioner", temperature: 23 }]]);
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
  assert.match(head, /4 on/);
  assert.doesNotMatch(body, /fan\.office_fan_fan/);
  assert.match(body, /data-id="fan\.bedroom_purifier"/);
  assert.match(body, /Replace the filter/);
  assert.deepEqual([...body.matchAll(/class="group">([^<]+)</g)].map((m) => m[1]), ["Air conditioners", "Air purifiers", "Fans"]);
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
  assert.deepEqual([...body.matchAll(/class="group">([^<]+)</g)].map((m) => m[1]), ["Bedroom", "Living room", "No area"]);
});

test("overview: each group spans as many columns as it has devices, up to the column count", () => {
  const spans = (body) => [...body.matchAll(/class="grp" style="--span:(\d+)"/g)].map((m) => Number(m[1]));
  assert.deepEqual(spans(overview({ zoom: false }).body), [1, 2, 2]);
  assert.deepEqual(spans(overview({ zoom: false, group_by: "none" }).body), [2]);
  assert.deepEqual(spans(overview({ zoom: false, group_by: "none", columns: 6 }).body), [5]);
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
    ["purifier", "Purificateurs", ["illustration", "icon"]],
    ["fan", "Ventilateurs", ["icon"]],
  ]);
  const devs = schema.find((s) => s.name === "devs");
  assert.deepEqual(json(devs.schema.map((d) => [d.name, d.title])), [
    ["climate.air_conditioner", "Climatiseur"],
    ["fan.bedroom_purifier", "Purificateur chambre"],
    ["fan.living_room_purifier_air_purifier", "Purificateur séjour"],
    ["fan.bedroom_fan_fan", "Ventilateur chambre"],
  ]);
  assert.deepEqual(json(devs.schema[3].schema.map((f) => f.name)), ["name", "type", "icon"]);
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
