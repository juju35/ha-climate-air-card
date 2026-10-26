// Records each card running as a looping GIF under screenshots/, one per distinct animation.
// Usage: npm install && npm run build && node scripts/screenshots/animation.mjs  (needs ffmpeg)
import { animate } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

// The air purifier drawing air in: inlets suck, the floor glows, the clean air rises.
await animate({
  file: "purifier",
  tag: "climate-air-purifier-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "fan.living_room_purifier_air_purifier" } }),
});

// The fan running: blades spin, the head oscillates and gusts of air stream out.
await animate({
  file: "fan",
  tag: "climate-air-fan-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "fan.bedroom_fan_fan" } }),
});

// The air conditioner cooling: the louvres flap and the chilled air falls from them.
await animate({
  file: "aircon",
  tag: "climate-air-aircon-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: { entity: "climate.air_conditioner" } }),
});

// The overview with every device on: each tile's icon and status ring animate together.
await animate({
  file: "overview",
  tag: "climate-air-overview-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: {} }),
});
