// Renders the air purifier cards with the mock home and saves the README screenshots.
// Usage: npm install && npm run build && node scripts/screenshots/purifier.mjs
import { pair, shoot } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

const entity = "fan.living_room_purifier_air_purifier";

await shoot({
  prefix: "purifier",
  tag: "climate-air-purifier-card",
  // "card": the living room purifier; "alert": the bedroom one, moderate air and a filter to replace.
  shots: [...pair("card"), ...pair("alert", { entity: "fan.bedroom_purifier" })],
  setup: (s, lang) => ({ hass: mockHass(lang), config: { entity: s.entity || entity } }),
});

await shoot({
  prefix: "purifier",
  tag: "climate-air-purifier-mini-card",
  // The four illustrations: the tower (mini), a round purifier, a square box and a Dyson-style bladeless loop.
  shots: [...pair("mini"), ...pair("round", { illustration: "cylinder" }), ...pair("box", { illustration: "box" }), ...pair("dyson", { illustration: "dyson" })],
  setup: (s, lang) => ({ hass: mockHass(lang), config: { entity, ...(s.illustration ? { illustration: s.illustration } : {}) } }),
});
