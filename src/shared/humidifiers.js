// ── Humidifiers ──────────────────────────────────────────────────────────────
// What a humidifier, a dehumidifier or a diffuser does, shared by its card and the overview tiles. `roleSt(role)`
// gives a role's state; a dehumidifier is told by its device_class or its illustration.
import { caNum } from "./i18n-helpers.js";
import { CA_IDLE } from "./colors.js";

export const CA_HUM_COLOR = "var(--state-humidifier-on-color, #26a69a)";
export const CA_DEHUM_COLOR = "#f9a825";
export const CA_DIFFUSER_COLOR = "#9575cd";
// The illustration variants that are essential oil diffusers (no humidity target, a « Diffusing » status): the VOCOlinc
// FlowerBud and the Rituals Perfume Genie in either finish.
export const CA_DIFFUSERS = ["diffuser", "rituals", "rituals_black"];
export const caIsDiffuser = (v) => CA_DIFFUSERS.includes(v);
// A tank at 10 % or less shows its water red.
export const CA_HUM_LOW = 10;

export function caHumidifierState(st, roleSt, variant) {
  const a = st.attributes;
  const on = st.state === "on";
  const dehum = a.device_class === "dehumidifier" || variant === "dehumidifier";
  const diffuser = caIsDiffuser(variant);
  const level = caNum(roleSt("water_level"));
  // A diffuser's cartridge is empty when its « cartridge » sensor reads off (not inserted) or its fill drops to 0.
  const empty = !dehum && (roleSt("tank_empty")?.state === "on" || roleSt("cartridge")?.state === "off" || (level != null && level <= 0));
  const full = dehum && (roleSt("bucket_full")?.state === "on" || (level != null && level >= 100));
  const blocked = empty || full;
  const action = a.action;
  const active = on && !blocked && (action ? action === "humidifying" || action === "drying" : true);
  const alertKey = empty ? (diffuser ? "cartridge_empty" : "tank_empty") : full ? "bucket_full" : "";
  return {
    on,
    dehum,
    level,
    active,
    alertKey,
    low: !dehum && level != null && level <= CA_HUM_LOW,
    color: !on ? CA_IDLE : dehum ? CA_DEHUM_COLOR : diffuser ? CA_DIFFUSER_COLOR : CA_HUM_COLOR,
    statusKey: !on ? "st_off" : alertKey || (!active ? "st_idle" : dehum ? "st_drying" : diffuser ? "st_diffusing" : "st_humidifying"),
  };
}

// The colour a device's light gives its illustration (the VOCOlinc diffuser's cone, the MistFlow's ring): its colour
// once on, a warm white in colour temperature mode, nothing while it is off.
export function caLightGlow(lampSt) {
  if (lampSt?.state !== "on") return null;
  const rgb = lampSt.attributes.rgb_color;
  if (Array.isArray(rgb) && rgb.length === 3) return `rgb(${rgb.map((v) => Math.round(Number(v) || 0)).join(",")})`;
  return lampSt.attributes.color_mode === "color_temp" ? "#ffd9a8" : "#e040fb";
}

// The tank's fill in the illustration (%): its temperature between 20 and 65 °C, half full when unknown.
export const caHpTankPct = (t) => (t == null ? 50 : Math.max(8, Math.min(100, ((t - 20) / 45) * 100)));
