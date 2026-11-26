// Renders the fan cards (the standing fan and the ceiling fan) with the mock home and saves the README screenshots.
// Usage: npm install && npm run build && node scripts/screenshots/fan.mjs
import { pair, shoot } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

const entity = "fan.bedroom_fan_fan";
const sb = (lang, changes) => mockHass(lang, changes, { switchbot: true });


await shoot({
  prefix: "fan",
  tag: "climate-air-fan-card",
  shots: pair("card"),
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity } }),
});

await shoot({
  prefix: "fan",
  tag: "climate-air-fan-mini-card",
  shots: pair("mini"),
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity } }),
});

// The ceiling fan (Bond style), turning with its light on: full and mini card.
await shoot({
  prefix: "fan-ceiling",
  tag: "climate-air-fan-card",
  shots: pair("card"),
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "fan.ceiling_fan" } }),
});

await shoot({
  prefix: "fan-ceiling",
  tag: "climate-air-fan-mini-card",
  shots: pair("mini"),
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "fan.ceiling_fan" } }),
});

// The SwitchBot Circulator Fan (over Bluetooth): the circulator, picked from its model, oscillating.
// Captures: fan-circulator-card, fan-circulator-mini (and their -dark twins).
await shoot({
  prefix: "fan-circulator",
  tag: "climate-air-fan-card",
  shots: pair("card"),
  setup: (_s, lang) => ({ hass: sb(lang), config: { entity: "fan.study_fan" } }),
});

await shoot({
  prefix: "fan-circulator",
  tag: "climate-air-fan-mini-card",
  shots: pair("mini"),
  setup: (_s, lang) => ({ hass: sb(lang), config: { entity: "fan.study_fan" } }),
});
