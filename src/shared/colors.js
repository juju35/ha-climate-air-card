// ── Colors ───────────────────────────────────────────────────────────────────
export const CA_IDLE = "var(--disabled-text-color, #9e9e9e)";
export const CA_FAN_COLOR = "var(--state-fan-on-color, var(--info-color, #039be5))";
export const CA_MODE_COLORS = {
  cool: "var(--state-climate-cool-color, #2b9af3)",
  heat: "var(--state-climate-heat-color, #ff8100)",
  heat_cool: "var(--state-climate-heat-cool-color, #008000)",
  auto: "var(--state-climate-auto-color, #008000)",
  dry: "var(--state-climate-dry-color, #efbd07)",
  fan_only: "var(--state-climate-fan_only-color, #8a8a8a)",
};
export const CA_MODE_ICONS = {
  off: "mdi:power",
  cool: "mdi:snowflake",
  heat: "mdi:fire",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
};

// Air quality from PM2.5 (µg/m³), or from an air quality index: HomeKit's 1–5 scale, or a US AQI above 5.
export const CA_AQ = [
  { key: "good", color: "var(--success-color, #43a047)" },
  { key: "moderate", color: "#f9a825" },
  { key: "unhealthy", color: "#fb8c00" },
  { key: "bad", color: "var(--error-color, #db4437)" },
];
// An air quality level given as a word (SwitchBot's `aqi_quality_level` enum: excellent, good, moderate, unhealthy).
export const CA_AQ_LEVELS = { excellent: 0, good: 0, moderate: 1, unhealthy: 2, very_unhealthy: 3, hazardous: 3, poor: 2, bad: 3 };
export function caAirQuality(pm25, aqi, level) {
  let i = null;
  if (pm25 != null) i = pm25 <= 12 ? 0 : pm25 <= 35 ? 1 : pm25 <= 55 ? 2 : 3;
  else if (aqi != null) {
    if (aqi <= 5) i = aqi <= 2 ? 0 : aqi === 3 ? 1 : aqi === 4 ? 2 : 3;
    else i = aqi <= 50 ? 0 : aqi <= 100 ? 1 : aqi <= 150 ? 2 : 3;
  } else if (level != null) i = CA_AQ_LEVELS[String(level).toLowerCase()] ?? null;
  return i == null ? null : CA_AQ[i];
}

// Icon of a fan or purifier preset, from its name.
export const CA_PRESET_ICON = (p) => {
  const s = String(p).toLowerCase();
  if (/auto/.test(s)) return "mdi:fan-auto";
  if (/sleep|night|silent|nuit|quiet/.test(s)) return "mdi:power-sleep";
  if (/fav/.test(s)) return "mdi:heart-outline";
  if (/manual|manuel/.test(s)) return "mdi:hand-back-right-outline";
  if (/turbo|boost|max/.test(s)) return "mdi:fan-plus";
  if (/natur/.test(s)) return "mdi:leaf";
  if (/straight|direct|standard|normal/.test(s)) return "mdi:weather-windy";
  return null;
};

// Seconds per turn of the blades: slow at the lowest speed, fast at full speed.
export const caSpin = (pct) => (1.8 - 1.5 * Math.max(0, Math.min(100, pct ?? 50)) / 100).toFixed(2);
