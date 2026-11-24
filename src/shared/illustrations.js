// ── Illustrations ────────────────────────────────────────────────────────────
// Each card file registers the illustration of its kind of device, shared with the overview tiles:
//   CA_ART[kind] = { variants, guess(text), render(variant, s) → { svg, cls, style }, styles }
// `s` is the device's state as the illustration needs it: running, pct, color, osc, natural, mode, active, swing, display.
import { caDeviceOf } from "./device-discovery.js";

export const CA_ART = {};

// The text an illustration variant is guessed from: the device model, manufacturer and names. The manufacturer is
// included so a device named in another language (a Rituals Perfume Genie whose model and name are localised, say)
// is still recognised from its brand.
export function caVariantText(hass, id) {
  const dev = hass.devices?.[caDeviceOf(hass, id)];
  const a = hass.states[id]?.attributes || {};
  return [dev?.model, dev?.manufacturer, dev?.name, dev?.name_by_user, id, a.friendly_name, a.device_class].filter(Boolean).join(" ");
}

// The variant of `kind` to draw for `id`: the one asked for (`illustration`), or the one guessed from the device.
export function caVariant(hass, kind, id, illustration) {
  const art = CA_ART[kind];
  if (!art?.variants) return undefined;
  if (illustration && illustration !== "auto" && art.variants.includes(illustration)) return illustration;
  return art.guess(caVariantText(hass, id));
}

// The illustration in its frame: animated while `s.running`. `uid` makes the SVG ids unique when several
// illustrations share a shadow root (the overview tiles): gradients would otherwise all take the first one's colours.
export function caPicture(kind, variant, s, uid = "") {
  const art = CA_ART[kind];
  if (!art) return "";
  const r = art.render(variant, s);
  let svg = r.svg;
  if (uid) svg = svg.replace(/(id="|url\(#)(ca-[a-z0-9]+)/g, `$1$2-${uid}`);
  const cls = ["picture", `k-${kind}`, `st-${s.state || (s.running ? "on" : "off")}`, s.running ? "running" : "", ...(r.cls || [])];
  return `<div class="${cls.filter(Boolean).join(" ")}"${r.style ? ` style="${r.style}"` : ""}>${svg}</div>`;
}

export const CA_ART_STYLES = `
  .picture { position: relative; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .picture svg { width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 3px 6px rgba(0,0,0,.18)); }
  @keyframes ca-spin { to { transform: rotate(360deg); } }
  @keyframes ca-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
  @keyframes ca-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(.9); } }
  @keyframes ca-rise { 0% { opacity: 0; transform: translateY(4px); } 30% { opacity: .9; } 100% { opacity: 0; transform: translateY(-16px); } }
  @keyframes ca-fall { 0% { opacity: 0; transform: translateY(-4px); } 25% { opacity: .9; } 100% { opacity: 0; transform: translateY(22px); } }
  @media (prefers-reduced-motion: reduce) { .picture, .picture * { animation: none !important; } }
`;
