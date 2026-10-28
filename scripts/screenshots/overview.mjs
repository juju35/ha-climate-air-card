// Renders the overview card with the mock home and saves the README screenshots.
// Usage: npm install && npm run build && node scripts/screenshots/overview.mjs
import { pair, shoot } from "./harness.mjs";
import { mockHass } from "./mock.mjs";

await shoot({
  prefix: "overview",
  tag: "climate-air-overview-card",
  // "active": the default view (devices on); "all": every device (detail button pressed); "area": every device
  // grouped by area, the tiles labelled by kind; "details": a device unfolded.
  shots: [...pair("active"), ...pair("all", { zoom: true }), ...pair("area", { area: true }), ...pair("details", { open: "fan.bedroom_fan_fan" })],
  setup: (s, lang) => ({
    hass: mockHass(lang),
    config: s.area ? { group_by: "area", zoom: false } : {},
    open: s.zoom ? ".zoom" : s.open && `.dev[data-id="${s.open}"]`,
  }),
});
