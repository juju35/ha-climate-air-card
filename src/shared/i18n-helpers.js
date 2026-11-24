// ── i18n ─────────────────────────────────────────────────────────────────────
import { CA_I18N, CA_VALUES } from "./i18n/tables.js";

export function caT(lang, key, vars) {
  const s = (CA_I18N[lang] || CA_I18N.en)[key] ?? CA_I18N.en[key] ?? key;
  return vars ? s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "") : s;
}

export function caLang(config, hass) {
  // The full code when the card has it ("sr-Latn"), else the part before the dash ("fr-FR" → "fr"), else English.
  const full = String(config?.language || hass?.language || globalThis.document?.documentElement?.lang || "en");
  if (CA_I18N[full]) return full;
  const base = full.split("-")[0];
  return CA_I18N[base] ? base : "en";
}

// The locale handed to Intl / toLocaleString: Home Assistant's full locale ("pt-BR", "de-CH") when it is in the
// card's language, else the card's language; bare "pt" (Home Assistant's European Portuguese) becomes "pt-PT", or
// Intl formats it the Brazilian way. The card's language option wins.
export function caIntlLang(config, hass) {
  const lang = caLang(config, hass);
  const full = String(config?.language || hass?.locale?.language || hass?.language || "");
  const loc = full && full.split("-")[0] === lang.split("-")[0] ? full : lang;
  return loc === "pt" ? "pt-PT" : loc;
}

export function caEsc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

export const caUnavailable = (st) => !st || st.state === "unavailable" || st.state === "unknown";
export const caNum = (st) => (caUnavailable(st) ? null : Number.isFinite(Number(st.state)) ? Number(st.state) : null);


export const caNormValue = (v) =>
  String(v ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "_");

// A value as shown: Home Assistant's translation (`translated`) when it has one, else the card's own, else humanized.
// "Level 2" / "Niveau 2" style values keep their number.
export function caValueLabel(lang, v, translated) {
  if (translated && caNormValue(translated) !== caNormValue(v)) return translated;
  const key = caNormValue(v);
  const own = (CA_VALUES[lang] || CA_VALUES.en)[key];
  if (own) return own;
  const level = /^(level|niveau|stufe|nivel|livello|poziom|nivå|ниво|уровень|рівень|szint|úroveň|raven|līmenis|επίπεδο|gear|speed)_?(\d+)$/.exec(key);
  if (level) return caT(lang, "level", { n: level[2] });
  return caHumanize(v);
}

export function caHumanize(v) {
  const s = String(v ?? "").replace(/_/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function caFmtNum(lang, v, digits = 1, minDigits = 0) {
  if (v == null || !Number.isFinite(v)) return "—";
  return v.toLocaleString(lang, { maximumFractionDigits: digits, minimumFractionDigits: minDigits });
}
