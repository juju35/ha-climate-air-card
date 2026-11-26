// Renders the humidifier cards with the mock home and saves the README screenshots.
// Usage: npm install && npm run build && node scripts/screenshots/humidifier.mjs
import { pair, shoot } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

const entity = "humidifier.bedroom_humidifier";
const dehum = "humidifier.office_dehumidifier";
const sb = (lang, changes) => mockHass(lang, changes, { switchbot: true });

// The dehumidifier drying a damp room.
const drying = { [dehum]: { state: "on", action: "drying" }, "sensor.office_dehumidifier_tank_level": { state: 55 } };
// The humidifier's tank empty: it stops and flags it.
const empty = { [entity]: { action: "idle" }, "sensor.bedroom_humidifier_water_level": { state: 0 } };

await shoot({
  prefix: "humidifier",
  tag: "climate-air-humidifier-card",
  shots: [
    ...pair("card"),
    ...pair("evaporative", { illustration: "evaporative" }),
    ...pair("tank", { illustration: "tank" }),
    ...pair("vocolinc", { illustration: "vocolinc" }),
    ...pair("diffuser", { entity: "humidifier.living_room_diffuser" }),
    ...pair("rituals", { entity: "switch.perfume_genie_diffuser" }),
    ...pair("rituals-black", { entity: "switch.perfume_genie_diffuser", illustration: "rituals_black" }),
    ...pair("empty", { changes: empty }),
    // The diffuser off, its mood light on in blue at low brightness.
    ...pair("diffuser-light", { entity: "humidifier.living_room_diffuser", changes: { "humidifier.living_room_diffuser": { state: "off" }, "light.living_room_diffuser_mood_light": { rgb_color: [0, 180, 255], brightness: 90 } } }),
    ...pair("dehumidifier", { changes: drying, entity: dehum }),
  ],
  setup: (s, lang) => ({ hass: mockHass(lang, s.changes), config: { entity: s.entity || entity, ...(s.illustration ? { illustration: s.illustration } : {}) } }),
});

await shoot({
  prefix: "humidifier",
  tag: "climate-air-humidifier-mini-card",
  shots: [...pair("mini"), ...pair("diffuser-mini", { entity: "humidifier.living_room_diffuser" }), ...pair("rituals-mini", { entity: "switch.perfume_genie_diffuser" })],
  setup: (s, lang) => ({ hass: mockHass(lang), config: { entity: s.entity || entity } }),
});

// SwitchBot: the Evaporative Humidifier (picked from its model, its tank level given as a word) and the ultrasonic
// Humidifier (mini card).
// Captures: humidifier-switchbot-card, humidifier-switchbot-mini (and their -dark twins).
await shoot({
  prefix: "humidifier-switchbot",
  tag: "climate-air-humidifier-card",
  shots: pair("card"),
  setup: (_s, lang) => ({ hass: sb(lang), config: { entity: "humidifier.study_humidifier" } }),
});

await shoot({
  prefix: "humidifier-switchbot",
  tag: "climate-air-humidifier-mini-card",
  shots: pair("mini"),
  setup: (_s, lang) => ({ hass: sb(lang), config: { entity: "humidifier.study_humidifier", illustration: "switchbot_humidifier" } }),
});
