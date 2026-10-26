// Records the overview card with every device running as a looping screenshots/overview.gif.
// Usage: npm install && npm run build && node scripts/screenshots/animation.mjs  (needs ffmpeg)
import { animate } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

await animate({
  file: "overview",
  tag: "climate-air-overview-card",
  setup: (_s, lang) => ({ hass: mockHass(lang), config: {} }),
});
