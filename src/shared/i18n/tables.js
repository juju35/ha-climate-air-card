// One file per language; scripts/bundle.mjs inlines them back into a single object literal at build, which
// scripts/i18n-split.mjs then splits per language (English stays in the bundle).
import en from "./en.js";
import fr from "./fr.js";
import de from "./de.js";
import es from "./es.js";
import sr from "./sr.js";
import srLatn from "./sr-Latn.js";
import it from "./it.js";
import nl from "./nl.js";
import pt from "./pt.js";
import pl from "./pl.js";
import ro from "./ro.js";
import da from "./da.js";
import sv from "./sv.js";
import bg from "./bg.js";
import ru from "./ru.js";
import uk from "./uk.js";
import hu from "./hu.js";
import sk from "./sk.js";
import cs from "./cs.js";
import sl from "./sl.js";
import lv from "./lv.js";
import el from "./el.js";

export const CA_I18N = {
  en: en.CA_I18N,
  fr: fr.CA_I18N,
  de: de.CA_I18N,
  es: es.CA_I18N,
  sr: sr.CA_I18N,
  "sr-Latn": srLatn.CA_I18N,
  it: it.CA_I18N,
  nl: nl.CA_I18N,
  pt: pt.CA_I18N,
  pl: pl.CA_I18N,
  ro: ro.CA_I18N,
  da: da.CA_I18N,
  sv: sv.CA_I18N,
  bg: bg.CA_I18N,
  ru: ru.CA_I18N,
  uk: uk.CA_I18N,
  hu: hu.CA_I18N,
  sk: sk.CA_I18N,
  cs: cs.CA_I18N,
  sl: sl.CA_I18N,
  lv: lv.CA_I18N,
  el: el.CA_I18N,
};

// "laundry_mode_natural" → "Laundry mode natural": the fallback when Home Assistant has no translation.
// Labels of the values integrations often leave untranslated (Xiaomi Home presets, Midea fan modes, HomeKit modes…),
// by normalized value: used when Home Assistant has no translation of its own.
export const CA_VALUES = {
  en: en.CA_VALUES,
  fr: fr.CA_VALUES,
  de: de.CA_VALUES,
  es: es.CA_VALUES,
  sr: sr.CA_VALUES,
  "sr-Latn": srLatn.CA_VALUES,
  it: it.CA_VALUES,
  nl: nl.CA_VALUES,
  pt: pt.CA_VALUES,
  pl: pl.CA_VALUES,
  ro: ro.CA_VALUES,
  da: da.CA_VALUES,
  sv: sv.CA_VALUES,
  bg: bg.CA_VALUES,
  ru: ru.CA_VALUES,
  uk: uk.CA_VALUES,
  hu: hu.CA_VALUES,
  sk: sk.CA_VALUES,
  cs: cs.CA_VALUES,
  sl: sl.CA_VALUES,
  lv: lv.CA_VALUES,
  el: el.CA_VALUES,
};
