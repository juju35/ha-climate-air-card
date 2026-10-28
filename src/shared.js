/*
 * ha-climate-air-card — shared code: i18n, device discovery, the base card, the mini cards and the editor.
 * The device cards (purifier.js, fan.js, aircon.js) and the overview (overview.js) build on it.
 * https://github.com/juju35/ha-climate-air-card
 */
const CA_VERSION = "__VERSION__";
const CA_REPO = "https://github.com/juju35/ha-climate-air-card";

// ── i18n ─────────────────────────────────────────────────────────────────────
const CA_I18N = {
  en: {
    purifier: "Air purifier",
    fan: "Fan",
    aircon: "Air conditioner",
    st_off: "Off",
    st_on: "On",
    st_unavailable: "Unavailable",
    st_purifying: "Purifying",
    aq_good: "Good air",
    aq_moderate: "Moderate air",
    aq_unhealthy: "Poor air",
    aq_bad: "Very poor air",
    speed: "Speed",
    mode: "Mode",
    preset: "Preset",
    oscillation: "Oscillation",
    angle: "Angle",
    timer: "Timer",
    timer_off: "Off",
    child_lock: "Child lock",
    buzzer: "Sound",
    light: "Light",
    brightness: "Display",
    anion: "Ionizer",
    sw_outdoor_silent: "Outdoor silent mode",
    sw_aux_heat: "Auxiliary heating",
    sw_frost: "Frost protection",
    sw_eco: "Eco",
    sw_display: "Display",
    sw_sound: "Beep",
    sw_self_clean: "Self clean",
    sw_silent: "Silent",
    sw_smart_eye: "Smart eye",
    sw_anion: "Ionizer",
    sw_turbo: "Turbo",
    sw_breeze: "Breeze",
    sw_sleep: "Sleep",
    sw_light: "Light",
    favorite: "Favorite level",
    voc: "VOC",
    no2: "NO₂",
    filter: "Filter",
    filter_low: "Replace the filter",
    filter_dirty: "Clean the filter",
    hours: "{n} h",
    level: "Level {n}",
    target: "Target",
    indoor: "Indoor",
    outdoor: "Outdoor",
    power_draw: "Power",
    fan_mode: "Fan",
    swing_mode: "Swing",
    preset_mode: "Preset",
    options: "Options",
    offline: "Device offline",
    no_device: "No device found",
    power: "Power",
    zoom_in: "Show the full card",
    zoom_out: "Back to the compact view",
    rotate_left: "Turn left",
    rotate_right: "Turn right",
    temp_down: "Lower the target",
    temp_up: "Raise the target",
    title: "Climate & air",
    running_n: "{n} on",
    all_off: "Everything is off",
    nothing_on: "Nothing on right now",
    g_aircon: "Air conditioners",
    g_purifier: "Air purifiers",
    g_fan: "Fans",
    no_area: "No area",
    no_devices: "No air conditioner, air purifier or fan found",
    toggle: "Turn on / off",
    ed_entity: "Device",
    ed_entity_helper: "Leave empty to use the first one found",
    ed_name: "Name",
    ed_name_helper: "Leave empty to use the device name",
    ed_icon: "Icon",
    ed_icon_helper: "Replaces the illustration",
    ed_illustration: "Illustration",
    ed_illustration_helper: "Automatic: picked from the device model and name",
    ill_auto: "Automatic",
    ill_tower: "Tower",
    ill_cylinder: "Round",
    ill_box: "Square box",
    ill_dyson: "Bladeless loop",
    ill_split: "Wall split unit",
    ill_portable: "Portable unit",
    ill_window: "Window split",
    ed_show_controls: "Controls",
    ed_show_sensors: "Measurements",
    ed_show_alerts: "Alerts",
    ed_zoom: "Detail button",
    ed_zoom_helper: "Button at the top right that switches the mini card to the full card and back",
    ed_language: "Language",
    ed_language_helper: "Automatic: follows the Home Assistant language",
    ed_language_auto: "Automatic",
    ed_advanced: "Advanced",
    ed_entities: "Entities",
    ed_entities_helper: "Detected from the device; override a role here, e.g. pm25: sensor.living_room_pm25",
    ed_title: "Title",
    ed_title_helper: "Leave empty for “Climate & air”",
    ed_kinds: "Device types",
    ed_kinds_helper: "The illustration and the icon of every device of a type; an icon replaces the illustration",
    ed_devs: "Devices",
    ed_devs_helper: "Name, type, illustration and icon of each device; empty: automatic",
    ed_type: "Type",
    ed_group_by: "Grouping",
    ed_group_type: "By device type",
    ed_group_area: "By area",
    ed_group_none: "None",
    ed_columns: "Columns",
    ed_columns_helper: "Empty: 2, or 1 on narrow screens",
    ed_ov_zoom_helper: "Only the devices on or needing attention show; the button shows every device. Off: every device, always",
    ed_exclude: "Devices to exclude",
    ed_include: "Devices to add",
    ed_include_helper: "Climate or fan entities the card would not pick on its own (a heat-only thermostat, say)",
  },
  fr: {
    purifier: "Purificateur",
    fan: "Ventilateur",
    aircon: "Climatiseur",
    st_off: "Arrêt",
    st_on: "En marche",
    st_unavailable: "Indisponible",
    st_purifying: "Purification",
    aq_good: "Air sain",
    aq_moderate: "Air moyen",
    aq_unhealthy: "Air mauvais",
    aq_bad: "Air très mauvais",
    speed: "Vitesse",
    mode: "Mode",
    preset: "Préréglage",
    oscillation: "Oscillation",
    angle: "Angle",
    timer: "Minuterie",
    timer_off: "Aucune",
    child_lock: "Sécurité enfant",
    buzzer: "Son",
    light: "Voyant",
    brightness: "Écran",
    anion: "Ions négatifs",
    sw_outdoor_silent: "Unité extérieure silencieuse",
    sw_aux_heat: "Chauffage d'appoint",
    sw_frost: "Hors-gel",
    sw_eco: "Éco",
    sw_display: "Écran",
    sw_sound: "Bip sonore",
    sw_self_clean: "Autonettoyage",
    sw_silent: "Silencieux",
    sw_smart_eye: "Œil intelligent",
    sw_anion: "Ions négatifs",
    sw_turbo: "Turbo",
    sw_breeze: "Brise douce",
    sw_sleep: "Nuit",
    sw_light: "Voyant",
    favorite: "Niveau favori",
    voc: "COV",
    no2: "NO₂",
    filter: "Filtre",
    filter_low: "Filtre à changer",
    filter_dirty: "Filtre à nettoyer",
    hours: "{n} h",
    level: "Niveau {n}",
    target: "Consigne",
    indoor: "Intérieur",
    outdoor: "Extérieur",
    power_draw: "Puissance",
    fan_mode: "Ventilation",
    swing_mode: "Balayage",
    preset_mode: "Préréglage",
    options: "Options",
    offline: "Appareil hors ligne",
    no_device: "Aucun appareil trouvé",
    power: "Marche / arrêt",
    zoom_in: "Afficher la carte complète",
    zoom_out: "Revenir à la vue compacte",
    rotate_left: "Tourner à gauche",
    rotate_right: "Tourner à droite",
    temp_down: "Baisser la consigne",
    temp_up: "Monter la consigne",
    title: "Climat et air",
    running_n: "{n} en marche",
    all_off: "Tout est à l'arrêt",
    nothing_on: "Rien en marche pour l'instant",
    g_aircon: "Climatiseurs",
    g_purifier: "Purificateurs",
    g_fan: "Ventilateurs",
    no_area: "Sans pièce",
    no_devices: "Aucun climatiseur, purificateur ou ventilateur trouvé",
    toggle: "Allumer / éteindre",
    ed_entity: "Appareil",
    ed_entity_helper: "Laisser vide pour le premier trouvé",
    ed_name: "Nom",
    ed_name_helper: "Laisser vide pour le nom de l'appareil",
    ed_icon: "Icône",
    ed_icon_helper: "Remplace l'illustration",
    ed_illustration: "Illustration",
    ed_illustration_helper: "Automatique : choisie d'après le modèle et le nom de l'appareil",
    ill_auto: "Automatique",
    ill_tower: "Tour",
    ill_cylinder: "Ronde",
    ill_box: "Boîte carrée",
    ill_dyson: "Anneau bladeless",
    ill_split: "Split mural",
    ill_portable: "Climatiseur mobile",
    ill_window: "Split de fenêtre",
    ed_show_controls: "Commandes",
    ed_show_sensors: "Mesures",
    ed_show_alerts: "Alertes",
    ed_zoom: "Bouton détail",
    ed_zoom_helper: "Bouton en haut à droite qui passe la mini-carte en carte complète et inversement",
    ed_language: "Langue",
    ed_language_helper: "Automatique : suit la langue de Home Assistant",
    ed_language_auto: "Automatique",
    ed_advanced: "Avancé",
    ed_entities: "Entités",
    ed_entities_helper: "Détectées depuis l'appareil ; forcer un rôle ici, ex. pm25: sensor.sejour_pm25",
    ed_title: "Titre",
    ed_title_helper: "Laisser vide pour « Climat et air »",
    ed_kinds: "Types d'appareils",
    ed_kinds_helper: "L'illustration et l'icône de tous les appareils d'un type ; une icône remplace l'illustration",
    ed_devs: "Appareils",
    ed_devs_helper: "Nom, type, illustration et icône de chaque appareil ; vide : automatique",
    ed_type: "Type",
    ed_group_by: "Regroupement",
    ed_group_type: "Par type d'appareil",
    ed_group_area: "Par pièce",
    ed_group_none: "Aucun",
    ed_columns: "Colonnes",
    ed_columns_helper: "Vide : 2, ou 1 sur les écrans étroits",
    ed_ov_zoom_helper:
      "Seuls les appareils en marche ou à surveiller s'affichent ; le bouton affiche tous les appareils. Désactivé : toujours tous les appareils",
    ed_exclude: "Appareils à exclure",
    ed_include: "Appareils à ajouter",
    ed_include_helper: "Entités climate ou fan que la carte ne prendrait pas d'elle-même (un thermostat chauffage seul, par exemple)",
  },
  de: {
    purifier: "Luftreiniger",
    fan: "Ventilator",
    aircon: "Klimaanlage",
    st_off: "Aus",
    st_on: "An",
    st_unavailable: "Nicht verfügbar",
    st_purifying: "Reinigt",
    aq_good: "Gute Luft",
    aq_moderate: "Mäßige Luft",
    aq_unhealthy: "Schlechte Luft",
    aq_bad: "Sehr schlechte Luft",
    speed: "Geschwindigkeit",
    mode: "Modus",
    preset: "Voreinstellung",
    oscillation: "Oszillation",
    angle: "Winkel",
    timer: "Timer",
    timer_off: "Aus",
    child_lock: "Kindersicherung",
    buzzer: "Ton",
    light: "Licht",
    brightness: "Display",
    anion: "Ionisator",
    sw_outdoor_silent: "Leiser Außenbetrieb",
    sw_aux_heat: "Zusatzheizung",
    sw_frost: "Frostschutz",
    sw_eco: "Eco",
    sw_display: "Display",
    sw_sound: "Signalton",
    sw_self_clean: "Selbstreinigung",
    sw_silent: "Leise",
    sw_smart_eye: "Smart Eye",
    sw_anion: "Ionisator",
    sw_turbo: "Turbo",
    sw_breeze: "Sanfte Brise",
    sw_sleep: "Schlafmodus",
    sw_light: "Licht",
    favorite: "Lieblingsstufe",
    voc: "VOC",
    no2: "NO₂",
    filter: "Filter",
    filter_low: "Filter wechseln",
    filter_dirty: "Filter reinigen",
    hours: "{n} h",
    level: "Stufe {n}",
    target: "Sollwert",
    indoor: "Innen",
    outdoor: "Außen",
    power_draw: "Leistung",
    fan_mode: "Lüfter",
    swing_mode: "Schwenken",
    preset_mode: "Voreinstellung",
    options: "Optionen",
    offline: "Gerät offline",
    no_device: "Kein Gerät gefunden",
    power: "Ein / Aus",
    zoom_in: "Vollständige Karte anzeigen",
    zoom_out: "Zurück zur kompakten Ansicht",
    rotate_left: "Nach links drehen",
    rotate_right: "Nach rechts drehen",
    temp_down: "Sollwert senken",
    temp_up: "Sollwert erhöhen",
    title: "Klima & Luft",
    running_n: "{n} an",
    all_off: "Alles ist aus",
    nothing_on: "Gerade ist nichts an",
    g_aircon: "Klimaanlagen",
    g_purifier: "Luftreiniger",
    g_fan: "Ventilatoren",
    no_area: "Kein Bereich",
    no_devices: "Keine Klimaanlage, kein Luftreiniger und kein Ventilator gefunden",
    toggle: "Ein- / ausschalten",
    ed_entity: "Gerät",
    ed_entity_helper: "Leer lassen, um das erste gefundene zu verwenden",
    ed_name: "Name",
    ed_name_helper: "Leer lassen, um den Gerätenamen zu verwenden",
    ed_icon: "Symbol",
    ed_icon_helper: "Ersetzt die Illustration",
    ed_illustration: "Illustration",
    ed_illustration_helper: "Automatisch: anhand von Modell und Name des Geräts gewählt",
    ill_auto: "Automatisch",
    ill_tower: "Turm",
    ill_cylinder: "Rund",
    ill_box: "Quadratisches Gehäuse",
    ill_dyson: "Rotorloser Ring",
    ill_split: "Wand-Split-Gerät",
    ill_portable: "Mobiles Gerät",
    ill_window: "Fenster-Split",
    ed_show_controls: "Steuerung",
    ed_show_sensors: "Messwerte",
    ed_show_alerts: "Warnungen",
    ed_zoom: "Detail-Schaltfläche",
    ed_zoom_helper: "Schaltfläche oben rechts, die die Mini-Karte zur vollständigen Karte umschaltet und zurück",
    ed_language: "Sprache",
    ed_language_helper: "Automatisch: folgt der Sprache von Home Assistant",
    ed_language_auto: "Automatisch",
    ed_advanced: "Erweitert",
    ed_entities: "Entitäten",
    ed_entities_helper: "Vom Gerät erkannt; überschreibe hier eine Rolle, z. B. pm25: sensor.wohnzimmer_pm25",
    ed_title: "Titel",
    ed_title_helper: "Leer lassen für „Klima & Luft“",
    ed_kinds: "Gerätetypen",
    ed_kinds_helper: "Illustration und Symbol aller Geräte eines Typs; ein Symbol ersetzt die Illustration",
    ed_devs: "Geräte",
    ed_devs_helper: "Name, Typ, Illustration und Symbol jedes Geräts; leer: automatisch",
    ed_type: "Typ",
    ed_group_by: "Gruppierung",
    ed_group_type: "Nach Gerätetyp",
    ed_group_area: "Nach Bereich",
    ed_group_none: "Keine",
    ed_columns: "Spalten",
    ed_columns_helper: "Leer: 2, oder 1 auf schmalen Bildschirmen",
    ed_ov_zoom_helper: "Nur eingeschaltete oder zu beachtende Geräte werden angezeigt; die Schaltfläche zeigt alle Geräte. Aus: immer alle Geräte",
    ed_exclude: "Auszuschließende Geräte",
    ed_include: "Hinzuzufügende Geräte",
    ed_include_helper: "Climate- oder Fan-Entitäten, die die Karte nicht von selbst übernehmen würde (z. B. ein reines Heizungsthermostat)",
  },
  es: {
    purifier: "Purificador de aire",
    fan: "Ventilador",
    aircon: "Aire acondicionado",
    st_off: "Apagado",
    st_on: "Encendido",
    st_unavailable: "No disponible",
    st_purifying: "Purificando",
    aq_good: "Aire bueno",
    aq_moderate: "Aire moderado",
    aq_unhealthy: "Aire malo",
    aq_bad: "Aire muy malo",
    speed: "Velocidad",
    mode: "Modo",
    preset: "Preajuste",
    oscillation: "Oscilación",
    angle: "Ángulo",
    timer: "Temporizador",
    timer_off: "Apagado",
    child_lock: "Bloqueo infantil",
    buzzer: "Sonido",
    light: "Luz",
    brightness: "Pantalla",
    anion: "Ionizador",
    sw_outdoor_silent: "Unidad exterior silenciosa",
    sw_aux_heat: "Calefacción auxiliar",
    sw_frost: "Protección antiheladas",
    sw_eco: "Eco",
    sw_display: "Pantalla",
    sw_sound: "Pitido",
    sw_self_clean: "Autolimpieza",
    sw_silent: "Silencioso",
    sw_smart_eye: "Ojo inteligente",
    sw_anion: "Ionizador",
    sw_turbo: "Turbo",
    sw_breeze: "Brisa suave",
    sw_sleep: "Dormir",
    sw_light: "Luz",
    favorite: "Nivel favorito",
    voc: "COV",
    no2: "NO₂",
    filter: "Filtro",
    filter_low: "Cambia el filtro",
    filter_dirty: "Limpia el filtro",
    hours: "{n} h",
    level: "Nivel {n}",
    target: "Objetivo",
    indoor: "Interior",
    outdoor: "Exterior",
    power_draw: "Potencia",
    fan_mode: "Ventilador",
    swing_mode: "Oscilación",
    preset_mode: "Preajuste",
    options: "Opciones",
    offline: "Dispositivo sin conexión",
    no_device: "No se encontró ningún dispositivo",
    power: "Encender / apagar",
    zoom_in: "Mostrar la tarjeta completa",
    zoom_out: "Volver a la vista compacta",
    rotate_left: "Girar a la izquierda",
    rotate_right: "Girar a la derecha",
    temp_down: "Bajar el objetivo",
    temp_up: "Subir el objetivo",
    title: "Clima y aire",
    running_n: "Encendidos: {n}",
    all_off: "Todo está apagado",
    nothing_on: "Nada encendido ahora mismo",
    g_aircon: "Aires acondicionados",
    g_purifier: "Purificadores de aire",
    g_fan: "Ventiladores",
    no_area: "Sin área",
    no_devices: "No se encontró ningún aire acondicionado, purificador ni ventilador",
    toggle: "Encender / apagar",
    ed_entity: "Dispositivo",
    ed_entity_helper: "Déjalo vacío para usar el primero que se encuentre",
    ed_name: "Nombre",
    ed_name_helper: "Déjalo vacío para usar el nombre del dispositivo",
    ed_icon: "Icono",
    ed_icon_helper: "Sustituye a la ilustración",
    ed_illustration: "Ilustración",
    ed_illustration_helper: "Automático: se elige según el modelo y el nombre del dispositivo",
    ill_auto: "Automático",
    ill_tower: "Torre",
    ill_cylinder: "Redondo",
    ill_box: "Caja cuadrada",
    ill_dyson: "Anillo sin aspas",
    ill_split: "Split de pared",
    ill_portable: "Equipo portátil",
    ill_window: "Split de ventana",
    ed_show_controls: "Controles",
    ed_show_sensors: "Mediciones",
    ed_show_alerts: "Alertas",
    ed_zoom: "Botón de detalle",
    ed_zoom_helper: "Botón arriba a la derecha que cambia la minitarjeta a la tarjeta completa y viceversa",
    ed_language: "Idioma",
    ed_language_helper: "Automático: sigue el idioma de Home Assistant",
    ed_language_auto: "Automático",
    ed_advanced: "Avanzado",
    ed_entities: "Entidades",
    ed_entities_helper: "Detectadas a partir del dispositivo; fuerza aquí un rol, p. ej. pm25: sensor.salon_pm25",
    ed_title: "Título",
    ed_title_helper: "Déjalo vacío para «Clima y aire»",
    ed_kinds: "Tipos de dispositivo",
    ed_kinds_helper: "La ilustración y el icono de todos los dispositivos de un tipo; un icono sustituye a la ilustración",
    ed_devs: "Dispositivos",
    ed_devs_helper: "Nombre, tipo, ilustración e icono de cada dispositivo; vacío: automático",
    ed_type: "Tipo",
    ed_group_by: "Agrupación",
    ed_group_type: "Por tipo de dispositivo",
    ed_group_area: "Por área",
    ed_group_none: "Ninguna",
    ed_columns: "Columnas",
    ed_columns_helper: "Vacío: 2, o 1 en pantallas estrechas",
    ed_ov_zoom_helper: "Solo se muestran los dispositivos encendidos o que requieren atención; el botón muestra todos los dispositivos. Desactivado: siempre todos los dispositivos",
    ed_exclude: "Dispositivos que excluir",
    ed_include: "Dispositivos que añadir",
    ed_include_helper: "Entidades climate o fan que la tarjeta no elegiría por sí sola (un termostato solo de calefacción, por ejemplo)",
  },
};

function caT(lang, key, vars) {
  const s = (CA_I18N[lang] || CA_I18N.en)[key] ?? CA_I18N.en[key] ?? key;
  return vars ? s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "") : s;
}

function caLang(config, hass) {
  const l = (config?.language || hass?.language || globalThis.document?.documentElement?.lang || "en").split("-")[0];
  return CA_I18N[l] ? l : "en";
}

function caEsc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

const caUnavailable = (st) => !st || st.state === "unavailable" || st.state === "unknown";
const caNum = (st) => (caUnavailable(st) ? null : Number.isFinite(Number(st.state)) ? Number(st.state) : null);

// "laundry_mode_natural" → "Laundry mode natural": the fallback when Home Assistant has no translation.
// Labels of the values integrations often leave untranslated (Xiaomi Home presets, Midea fan modes, HomeKit modes…),
// by normalized value: used when Home Assistant has no translation of its own.
const CA_VALUES = {
  en: {
    auto: "Auto", automatic: "Automatic", manual: "Manual", smart: "Smart", sleep: "Sleep", night: "Night", favorite: "Favorite",
    favourite: "Favorite", silent: "Silent", quiet: "Quiet", turbo: "Turbo", boost: "Boost", strong: "Strong", max: "Max",
    natural: "Natural", natural_wind: "Natural wind", nature: "Natural", straight: "Straight", straight_wind: "Straight wind",
    direct: "Direct", direct_wind: "Direct wind", standard: "Standard", normal: "Normal", baby: "Baby", low: "Low", middle: "Medium",
    medium: "Medium", mid: "Medium", high: "High", full: "Full", fixed: "Fixed", off: "Off", on: "On", vertical: "Vertical",
    horizontal: "Horizontal", both: "Both", none: "None", comfort: "Comfort", eco: "Eco", away: "Away", home: "Home",
    activity: "Activity", purifying: "Purifying", idle: "Idle", inactive: "Inactive", purify: "Purify",
  },
  fr: {
    auto: "Auto", automatic: "Automatique", manual: "Manuel", smart: "Intelligent", sleep: "Nuit", night: "Nuit", favorite: "Favori",
    favourite: "Favori", silent: "Silencieux", quiet: "Silencieux", turbo: "Turbo", boost: "Boost", strong: "Fort", max: "Max",
    natural: "Naturel", natural_wind: "Vent naturel", nature: "Naturel", straight: "Direct", straight_wind: "Vent direct",
    direct: "Direct", direct_wind: "Vent direct", standard: "Standard", normal: "Normal", baby: "Bébé", low: "Faible", middle: "Moyen",
    medium: "Moyen", mid: "Moyen", high: "Élevé", full: "Maximum", fixed: "Fixe", off: "Arrêt", on: "Marche", vertical: "Vertical",
    horizontal: "Horizontal", both: "Les deux", none: "Aucun", comfort: "Confort", eco: "Éco", away: "Absent", home: "Présent",
    activity: "Activité", purifying: "Purification", idle: "En veille", inactive: "Inactif", purify: "Purification",
  },
  de: {
    auto: "Auto", automatic: "Automatisch", manual: "Manuell", smart: "Smart", sleep: "Schlafen", night: "Nacht", favorite: "Favorit", favourite: "Favorit", silent: "Leise", quiet: "Leise", turbo: "Turbo", boost: "Boost", strong: "Stark", max: "Max", natural: "Natürlich", natural_wind: "Natürlicher Wind", nature: "Natürlich", straight: "Direkt", straight_wind: "Direkter Wind", direct: "Direkt", direct_wind: "Direkter Wind", standard: "Standard", normal: "Normal", baby: "Baby", low: "Niedrig", middle: "Mittel", medium: "Mittel", mid: "Mittel", high: "Hoch", full: "Voll", fixed: "Fest", off: "Aus", on: "An", vertical: "Vertikal", horizontal: "Horizontal", both: "Beide", none: "Keine", comfort: "Komfort", eco: "Eco", away: "Abwesend", home: "Zuhause", activity: "Aktivität", purifying: "Reinigt", idle: "Leerlauf", inactive: "Inaktiv", purify: "Reinigen",
  },
  es: {
    auto: "Auto", automatic: "Automático", manual: "Manual", smart: "Inteligente", sleep: "Dormir", night: "Noche", favorite: "Favorito", favourite: "Favorito", silent: "Silencioso", quiet: "Silencioso", turbo: "Turbo", boost: "Boost", strong: "Fuerte", max: "Máx.", natural: "Natural", natural_wind: "Viento natural", nature: "Natural", straight: "Directo", straight_wind: "Viento directo", direct: "Directo", direct_wind: "Viento directo", standard: "Estándar", normal: "Normal", baby: "Bebé", low: "Bajo", middle: "Medio", medium: "Medio", mid: "Medio", high: "Alto", full: "Máximo", fixed: "Fijo", off: "Apagado", on: "Encendido", vertical: "Vertical", horizontal: "Horizontal", both: "Ambos", none: "Ninguno", comfort: "Confort", eco: "Eco", away: "Ausente", home: "En casa", activity: "Actividad", purifying: "Purificando", idle: "En espera", inactive: "Inactivo", purify: "Purificar",
  },
};

const caNormValue = (v) =>
  String(v ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "_");

// A value as shown: Home Assistant's translation (`translated`) when it has one, else the card's own, else humanized.
// "Level 2" / "Niveau 2" style values keep their number.
function caValueLabel(lang, v, translated) {
  if (translated && caNormValue(translated) !== caNormValue(v)) return translated;
  const key = caNormValue(v);
  const own = (CA_VALUES[lang] || CA_VALUES.en)[key];
  if (own) return own;
  const level = /^(level|niveau|stufe|nivel|gear|speed)_?(\d+)$/.exec(key);
  if (level) return caT(lang, "level", { n: level[2] });
  return caHumanize(v);
}

function caHumanize(v) {
  const s = String(v ?? "").replace(/_/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function caFmtNum(lang, v, digits = 1) {
  if (v == null || !Number.isFinite(v)) return "—";
  return v.toLocaleString(lang, { maximumFractionDigits: digits });
}

// ── Colors ───────────────────────────────────────────────────────────────────
const CA_IDLE = "var(--disabled-text-color, #9e9e9e)";
const CA_FAN_COLOR = "var(--state-fan-on-color, var(--info-color, #039be5))";
const CA_MODE_COLORS = {
  cool: "var(--state-climate-cool-color, #2b9af3)",
  heat: "var(--state-climate-heat-color, #ff8100)",
  heat_cool: "var(--state-climate-heat-cool-color, #008000)",
  auto: "var(--state-climate-auto-color, #008000)",
  dry: "var(--state-climate-dry-color, #efbd07)",
  fan_only: "var(--state-climate-fan_only-color, #8a8a8a)",
};
const CA_MODE_ICONS = {
  off: "mdi:power",
  cool: "mdi:snowflake",
  heat: "mdi:fire",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
};

// Air quality from PM2.5 (µg/m³), or from an air quality index: HomeKit's 1–5 scale, or a US AQI above 5.
const CA_AQ = [
  { key: "good", color: "var(--success-color, #43a047)" },
  { key: "moderate", color: "#f9a825" },
  { key: "unhealthy", color: "#fb8c00" },
  { key: "bad", color: "var(--error-color, #db4437)" },
];
function caAirQuality(pm25, aqi) {
  let i = null;
  if (pm25 != null) i = pm25 <= 12 ? 0 : pm25 <= 35 ? 1 : pm25 <= 55 ? 2 : 3;
  else if (aqi != null) {
    if (aqi <= 5) i = aqi <= 2 ? 0 : aqi === 3 ? 1 : aqi === 4 ? 2 : 3;
    else i = aqi <= 50 ? 0 : aqi <= 100 ? 1 : aqi <= 150 ? 2 : 3;
  }
  return i == null ? null : CA_AQ[i];
}

// Icon of a fan or purifier preset, from its name.
const CA_PRESET_ICON = (p) => {
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
const caSpin = (pct) => (1.8 - 1.5 * Math.max(0, Math.min(100, pct ?? 50)) / 100).toFixed(2);

// ── Device discovery ─────────────────────────────────────────────────────────
// Feature flags (homeassistant.components.fan / climate).
const CA_FAN_SET_SPEED = 1;
const CA_FAN_OSCILLATE = 2;
const CA_FAN_PRESET = 8;
const CA_CLIMATE_TARGET = 1;
const CA_CLIMATE_FAN_MODE = 8;
const CA_CLIMATE_PRESET = 16;
const CA_CLIMATE_SWING = 32;

const caDc = (dc) => (st) => st.attributes.device_class === dc;

// Entities a device may have next to its fan or climate entity. Each role is looked up by its registry
// translation_key, then by the entity_id (English and French slugs), then by its attributes, so that it works
// with Xiaomi Home, Xiaomi Miio, HomeKit, Matter or Midea entities alike.
const CA_ROLES = {
  temperature: { domain: "sensor", test: caDc("temperature") },
  humidity: { domain: "sensor", test: caDc("humidity") },
  pm25: { domain: "sensor", test: caDc("pm25") },
  pm10: { domain: "sensor", test: caDc("pm10") },
  aqi: { domain: "sensor", test: caDc("aqi") },
  // Filter life as a percentage. Dyson splits it into a HEPA and a carbon filter (and a combined one on older
  // units): prefer the HEPA or combined figure, and never the carbon one or a life expressed in hours.
  filter: {
    domain: "sensor",
    keys: ["filter_life", "filter_life_level", "filter_life_remaining", "hepa_filter_life", "combined_filter_life"],
    id: /filt(er|re).*(life|lifetime|level|remaining|percent|duree|restant)/,
    prefer: /(hepa|combined|life_?level|life_?percent|pourcent)/,
    avoid: /(carbon|charbon|used|utilis|hours|heures)/,
  },
  filter_hours: { domain: "sensor", keys: ["filter_hours_used", "filter_use"], id: /filt(er|re).*(used|hours|heures|utilis)/ },
  voc: { domain: "sensor", id: /(volatile_organic|_vocs?\b|\bcov\b|composes_organiques)/ },
  no2: { domain: "sensor", id: /(nitrogen_dioxide|_no2\b|dioxyde_d?_?azote)/ },
  status: { domain: "sensor", keys: ["air_purifier_status"], id: /(purifier_status|purificateur.*statut)/ },
  mode: { domain: "select", keys: ["air_purifier_mode"], id: /(purifier_mode|_mode)$/ },
  child_lock: { domain: "switch", keys: ["child_lock"], id: /(child_lock|physical_control|securite_enfant|verrouillage)/ },
  buzzer: { domain: "switch", keys: ["buzzer", "alarm"], id: /(buzzer|alarm|sound|_son_|_son$|bip)/ },
  light: { domain: "light", id: /(indicator|_led|voyant|display)/ },
  brightness: { domain: "select", id: /(brightness|luminosit)/ },
  favorite: { domain: "number", keys: ["favorite_level"], id: /favorite/ },
  angle: { domain: ["number", "select"], id: /(angle|swing_included)/ },
  timer: { domain: "number", id: /(countdown|delay_time|off_delay|timer|minuterie|power_off_time)/ },
  rotate_left: { domain: "button", id: /(turn_left|rotate_left|tourner_a_gauche)/ },
  rotate_right: { domain: "button", id: /(turn_right|rotate_right|tourner_a_droite)/ },
  anion: { domain: "switch", id: /(anion|ioni)/ },
  indoor_temp: { domain: "sensor", id: /(indoor_temperature|temperature_interieure)$/ },
  outdoor_temp: { domain: "sensor", id: /(outdoor_temperature|temperature_exterieure)(_\d+)?$/ },
  power: {
    domain: "sensor",
    id: /(real_time_power|current_power|puissance_instantanee)/,
    test: (st, id) => st.attributes.device_class === "power" && !/compressor|compresseur/.test(id),
  },
  filter_alert: { domain: "binary_sensor", id: /(dust|filter|filtre)/ },
  compressor: { domain: "sensor", id: /(?<!target_)(compressor_frequency|frequence_compresseur)$/ },
};

// Registry entries grouped by device, built once per `hass.entities` object (it only changes with the registry).
const caRegistryIndex = new WeakMap();
function caByDevice(reg) {
  let index = caRegistryIndex.get(reg);
  if (!index) {
    index = new Map();
    for (const e of Object.values(reg)) {
      if (!e.device_id || e.hidden) continue;
      if (!index.has(e.device_id)) index.set(e.device_id, []);
      index.get(e.device_id).push(e);
    }
    caRegistryIndex.set(reg, index);
  }
  return index;
}

function caDeviceEntities(hass, deviceId) {
  if (!hass?.entities || !deviceId) return [];
  return (caByDevice(hass.entities).get(deviceId) || []).filter((e) => hass.states[e.entity_id]);
}

// Memo for lookups that scan the registry or all of `hass.states` (kind of device, roles, entity lists), keyed on
// the `hass.entities` object like caRegistryIndex: it is only replaced when the registry changes.
const caMemoStore = new WeakMap();
function caMemo(hass, key, compute) {
  const reg = hass?.entities;
  if (!reg) return compute();
  let memo = caMemoStore.get(reg);
  if (!memo) caMemoStore.set(reg, (memo = new Map()));
  if (!memo.has(key)) memo.set(key, compute());
  return memo.get(key);
}

function caFindRole(hass, list, role) {
  const m = CA_ROLES[role];
  const domains = [].concat(m.domain);
  const inDomain = list.filter((e) => domains.includes(e.entity_id.split(".")[0]));
  // Among candidates of equal rank, a preferred one wins (Dyson's HEPA/combined filter over its carbon filter),
  // and an avoided one is taken only as a last resort (its filter life in hours, not the percentage).
  const pick = (cands) => {
    if (!cands.length) return undefined;
    if (m.prefer) {
      const p = cands.find((e) => m.prefer.test(e.entity_id));
      if (p) return p;
    }
    if (m.avoid) {
      const a = cands.find((e) => !m.avoid.test(e.entity_id));
      if (a) return a;
    }
    return cands[0];
  };
  let hit = m.keys && pick(inDomain.filter((e) => m.keys.includes(e.translation_key)));
  if (!hit && m.id) hit = pick(inDomain.filter((e) => m.id.test(e.entity_id)));
  if (!hit && m.test) hit = pick(inDomain.filter((e) => m.test(hass.states[e.entity_id], e.entity_id)));
  return hit?.entity_id;
}

const caDeviceOf = (hass, id) => hass?.entities?.[id]?.device_id;

function caArea(hass, id) {
  const e = hass.entities?.[id];
  const aid = e?.area_id || (e?.device_id && hass.devices?.[e.device_id]?.area_id);
  return (aid && hass.areas?.[aid]) || null;
}

const caAreaName = (hass, id) => caArea(hass, id)?.name || "";
const caAreaIcon = (hass, id) => caArea(hass, id)?.icon || "";

function caDeviceName(hass, id) {
  const dev = hass.devices?.[caDeviceOf(hass, id)];
  return String(dev?.name_by_user || dev?.name || "").trim();
}

// The kind of device a fan or climate entity stands for, or null when the cards do not handle it.
// A climate entity is an air conditioner when it can cool, dry or only blow (a heat-only thermostat is not).
// A fan entity is an air purifier when its name says so or its device measures particles or has a filter.
const CA_PURIFIER_NAME = /purif|air_?cleaner|air_?filter|epurateur/i;
function caKindOf(hass, id) {
  const st = hass?.states?.[id];
  if (!st) return null;
  return caMemo(hass, `kind:${id}`, () => {
    const domain = id.split(".")[0];
    if (domain === "climate") {
      const modes = st.attributes.hvac_modes || [];
      return modes.some((m) => m === "cool" || m === "dry" || m === "fan_only") ? "aircon" : null;
    }
    if (domain !== "fan") return null;
    const dev = hass.devices?.[caDeviceOf(hass, id)];
    const names = [id, st.attributes.friendly_name, dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" ");
    if (CA_PURIFIER_NAME.test(names)) return "purifier";
    const list = caDeviceEntities(hass, caDeviceOf(hass, id));
    if (caFindRole(hass, list, "pm25") || caFindRole(hass, list, "aqi") || caFindRole(hass, list, "filter")) return "purifier";
    return "fan";
  });
}

// A role of an entity's device, memoized per registry: the whole-device scans only run again when it changes.
function caRoleOf(hass, id, role) {
  return caMemo(hass, `role:${id}:${role}`, () => caFindRole(hass, caDeviceEntities(hass, caDeviceOf(hass, id)), role));
}

// Every entity of a kind, sorted by name; hidden entities and configuration entities are left out.
function caFindEntities(hass, kind) {
  if (!hass?.states) return [];
  return caMemo(hass, `list:${kind}`, () => {
    const domain = kind === "aircon" ? "climate" : "fan";
    return Object.keys(hass.states)
      .filter((id) => id.startsWith(`${domain}.`))
      .filter((id) => {
        const e = hass.entities?.[id];
        return !e?.hidden && !e?.entity_category && caKindOf(hass, id) === kind;
      })
      .sort((a, b) => caName(hass, a).localeCompare(caName(hass, b)));
  });
}

// The name shown for a device: its device name, else the entity's, without the trailing " Fan" Xiaomi Home adds.
function caName(hass, id) {
  const st = hass.states[id];
  const dev = caDeviceName(hass, id);
  if (dev) return dev;
  return String(st?.attributes.friendly_name || id)
    .replace(/\s+(fan|air purifier)$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// ── Base card ────────────────────────────────────────────────────────────────
// Subclasses set `static kind` and implement:
//   _roles()              roles to look for on the device
//   _model(r)             { state, color, running, statusText, sub, ... } from the resolved entities
// and register the illustration of their kind in CA_ART; `_model` returns what it needs (see CA_ART).
//   _heroInfo(m)          what sits next to the illustration
//   _controls(m)          the control sections below
//   _miniInfo(m)          the lines of the mini card
//   _miniButtons(m)       extra round buttons of the mini card (the power button is added after them)
// What every card of the bundle shares: grid size, language and labels.
class CaElement extends HTMLElement {
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }

  _lang() {
    return caLang(this._config, this._hass);
  }

  _t(k, vars) {
    return caT(this._lang(), k, vars);
  }
}

class CaCard extends CaElement {
  static get kind() {
    return "fan";
  }

  static get defaults() {
    return { show_controls: true, show_sensors: true, show_alerts: true };
  }

  static getConfigElement() {
    // biome-ignore lint/complexity/noThisInStatic: each card class has its own tag, set by caRegister
    return document.createElement(`${this.tag}-editor`);
  }

  static getStubConfig(hass) {
    // biome-ignore lint/complexity/noThisInStatic: subclasses override static kind
    const id = caFindEntities(hass, this.kind)[0];
    return id ? { entity: id } : {};
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = { ...this.constructor.defaults, ...config };
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.addEventListener("click", (ev) => this._onClick(ev));
      this.shadowRoot.addEventListener("change", (ev) => this._onChange(ev));
    }
    this._sig = null;
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  get hass() {
    return this._hass;
  }

  disconnectedCallback() {
    clearTimeout(this._tempTimer);
    // Detached mid-debounce (dashboard edit, panel fold, zoom): send the pending target now instead of losing it.
    if (this._pendingTemp !== undefined) {
      const temperature = this._pendingTemp;
      this._pendingTemp = undefined;
      this._sig = null;
      if (this._r?.id) this._call("climate", "set_temperature", { entity_id: this._r.id, temperature });
    }
  }

  getCardSize() {
    return 5;
  }

  _entity() {
    return this._config.entity || caFindEntities(this._hass, this.constructor.kind)[0];
  }

  _roles() {
    return [];
  }

  _resolve() {
    const hass = this._hass;
    const id = this._entity();
    const deviceId = caDeviceOf(hass, id);
    const list = caDeviceEntities(hass, deviceId).filter((e) => e.entity_id !== id);
    const over = this._config.entities || {};
    const ent = { main: id };
    // No role takes a fan or climate entity, so the memoized whole-device lookup resolves the same as `list`.
    for (const role of this._roles()) ent[role] = over[role] || caRoleOf(hass, id, role);
    const used = new Set(Object.values(ent));
    return { id, deviceId, list, ent, used };
  }

  _st(id) {
    return id ? this._hass.states[id] : undefined;
  }

  _val(id) {
    return this._st(id)?.state;
  }

  _avail(id) {
    return !caUnavailable(this._st(id));
  }

  _num(id) {
    return caNum(this._st(id));
  }

  // State or attribute value as Home Assistant shows it, or humanized when it has no translation.
  _fmtState(id, value) {
    const st = this._st(id);
    if (!st) return caValueLabel(this._lang(), value);
    const v = value ?? st.state;
    return caValueLabel(this._lang(), v, this._hass.formatEntityState?.(st, v));
  }

  _fmtAttr(id, attr, value) {
    const st = this._st(id);
    return caValueLabel(this._lang(), value, st && this._hass.formatEntityAttributeValue?.(st, attr, value));
  }

  _fmtSensor(id) {
    const st = this._st(id);
    if (caUnavailable(st)) return null;
    const v = Number(st.state);
    if (!Number.isFinite(v)) return this._fmtState(id);
    const unit = st.attributes.unit_of_measurement || "";
    return `${caFmtNum(this._lang(), v)}${unit ? (unit === "%" ? " %" : ` ${unit}`) : ""}`;
  }

  // An entity's name without the device name in front ("Air conditioner Anion" → "Anion").
  _label(id) {
    const st = this._st(id);
    let name = st?.attributes.friendly_name || id;
    const dev = caDeviceName(this._hass, id) || caName(this._hass, this._r?.id || "");
    if (dev && name.toLowerCase().startsWith(dev.toLowerCase())) name = name.slice(dev.length);
    name = name.replace(/^[\s*·-]+/, "").replace(/\s{2,}/g, " ").trim() || st?.attributes.friendly_name || id;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  _update() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    const r = this._resolve();
    const hass = this._hass;
    const ids = [r.id, ...Object.values(r.ent), ...(this._extraIds?.(r) || [])];
    // Home Assistant replaces a `states[id]` object whenever the entity changes: comparing the ids and the state
    // object references is enough to tell a tick apart, with nothing serialized.
    const sig = [this._lang(), this._zoomed, this._pendingTemp, ...ids.flatMap((id) => [id, (id && hass.states[id]) || null])];
    if (this._sig && sig.length === this._sig.length && sig.every((v, i) => v === this._sig[i])) return;
    // No rebuild while a dropdown is open or a slider is held in the card.
    const active = this.shadowRoot.activeElement;
    if (active && (active.tagName === "SELECT" || active.tagName === "INPUT")) return;
    this._sig = sig;
    this._r = r;
    this._render(r);
  }

  // Overridden by the mini cards.
  _compact() {
    return false;
  }

  _zoomButton() {
    return "";
  }

  _render(r) {
    const c = this._config;
    const kind = this.constructor.kind;
    const st = this._st(r.id);
    const icon = c.icon || CA_KIND_ICONS[kind];
    if (!st) {
      this.shadowRoot.innerHTML = `${this._styles()}<ha-card><div class="empty"><ha-icon icon="${caEsc(icon)}"></ha-icon>${caEsc(
        c.entity ? `${this._t("no_device")} (${c.entity})` : this._t("no_device"),
      )}</div></ha-card>`;
      return;
    }
    const m = this._model(r);
    m.online = !caUnavailable(st);
    if (!m.online) {
      m.state = "unavailable";
      m.running = false;
      m.color = CA_IDLE;
      m.statusText = this._t("st_unavailable");
    }
    m.name = c.name || caName(this._hass, r.id) || this._t(kind);
    m.icon = icon;
    m.chips = m.chips || [];
    if (!m.online) m.chips.push(`<span class="chip"><ha-icon icon="mdi:cloud-off-outline"></ha-icon>${this._t("offline")}</span>`);
    m.variant = caVariant(this._hass, kind, r.id, c.illustration);
    m.powerBtn = m.online
      ? `<button class="power${m.running ? " on" : ""}" data-action="power" title="${caEsc(this._t("power"))}" aria-label="${caEsc(this._t("power"))}"><ha-icon icon="mdi:power"></ha-icon></button>`
      : "";
    m.badge = `<div class="badge"><ha-icon icon="${caEsc(icon)}"></ha-icon></div>`;

    if (this._compact()) {
      this.shadowRoot.innerHTML = this._miniHtml(m);
      return;
    }
    const sub = [caAreaName(this._hass, r.id), m.sub].filter(Boolean).join(" · ");
    this.shadowRoot.innerHTML =
      `${this._styles(m.color)}<ha-card>` +
      `<div class="header">${m.badge}<div class="titles"><div class="name">${caEsc(m.name)}</div>${sub ? `<div class="sub">${caEsc(sub)}</div>` : ""}</div>` +
      `<span class="st"><span class="dot"></span>${caEsc(m.statusText)}</span>${m.powerBtn}${this._zoomButton()}</div>` +
      `<div class="hero">${this._picture(m)}<div class="info">${this._heroInfo(m)}${m.chips.length ? `<div class="chips">${m.chips.join("")}</div>` : ""}</div></div>` +
      (c.show_controls && m.online ? this._controls(m) : "") +
      "</ha-card>";
  }

  _picture(m) {
    if (this._config.icon) {
      return `<div class="picture${m.running ? " running" : ""}"><div class="iconart"><ha-icon icon="${caEsc(m.icon)}"></ha-icon></div></div>`;
    }
    return caPicture(this.constructor.kind, m.variant, m);
  }

  // A chip with an icon and a value; `cls` tints it (warn, alert).
  _chip(icon, text, cls = "", title = "") {
    return `<span class="chip ${cls}"${title ? ` title="${caEsc(title)}"` : ""}><ha-icon icon="${icon}"></ha-icon>${caEsc(text)}</span>`;
  }

  // The measurements of the device as chips (temperature, humidity, …), each one only if found.
  _sensorChips(ent, roles) {
    const icons = { temperature: "mdi:thermometer", humidity: "mdi:water-percent", pm10: "mdi:blur", voc: "mdi:molecule", no2: "mdi:molecule", outdoor_temp: "mdi:home-thermometer-outline", power: "mdi:flash" };
    const out = [];
    for (const role of roles) {
      const v = this._fmtSensor(ent[role]);
      if (v == null) continue;
      const prefix =
        role === "pm10" ? "PM10 " : role === "outdoor_temp" ? `${this._t("outdoor")} ` : role === "voc" || role === "no2" ? `${this._t(role)} ` : "";
      out.push(this._chip(icons[role], `${prefix}${v}`, "", this._label(ent[role])));
    }
    return out;
  }

  // ── Controls ──
  _section(title, body, icon = "") {
    const head = title ? `<div class="section-title">${icon ? `<ha-icon icon="${icon}"></ha-icon>` : ""}${caEsc(title)}</div>` : "";
    return body ? `<div class="section">${head}${body}</div>` : "";
  }

  _options(body) {
    return this._section(this._t("options"), body, "mdi:tune-variant");
  }

  // Segmented buttons, one per option; `action` gets the option in data-value.
  _segments(action, options, current, label, icon) {
    if (!options || options.length < 2) return "";
    // Many options (an air conditioner's modes): only the selected one keeps its label, the others show their icon.
    const many = options.length > 4;
    return `<div class="segments" role="group">${options
      .map((o) => {
        const ic = icon?.(o);
        const on = o === current;
        const text = caEsc(label(o));
        const short = many && !on && ic;
        return `<button class="seg${on ? " on" : ""}${short ? " short" : ""}" data-action="${action}" data-value="${caEsc(o)}" aria-pressed="${on}" title="${text}"${short ? ` aria-label="${text}"` : ""}>${ic ? `<ha-icon icon="${ic}"></ha-icon>` : ""}${short ? "" : `<span>${text}</span>`}</button>`;
      })
      .join("")}</div>`;
  }

  // A speed slider for the fan or purifier entity.
  _speedSlider(id) {
    const st = this._st(id);
    const pct = st.state === "on" ? Number(st.attributes.percentage ?? 0) : 0;
    // The step stays decimal: rounded, a 3-speed fan (33.333) would offer 33/66/99 and never reach full speed.
    // The top notch (99.999) still lands in the last speed band, since fans map a percentage by rounding up.
    const step = Math.max(1, Number(st.attributes.percentage_step) || 1);
    return (
      `<div class="slider"><ha-icon icon="mdi:speedometer"></ha-icon><span class="sl-label">${caEsc(this._t("speed"))}</span>` +
      `<input type="range" min="${step}" max="100" step="${step}" value="${Math.max(step, pct)}" data-range="percentage" aria-label="${caEsc(this._t("speed"))}" style="--p:${pct}%">` +
      `<span class="v">${st.state === "on" ? `${Math.round(pct)} %` : "—"}</span></div>`
    );
  }

  // A number entity as a dropdown when it has few steps (timer, angle, level), as a slider otherwise.
  _numberControl(id, label, icon) {
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    if (id.startsWith("select.")) return this._selectEntity(id, label);
    const a = st.attributes;
    const min = Number(a.min ?? 0);
    const max = Number(a.max ?? 100);
    const step = Number(a.step ?? 1) || 1;
    const unit = a.unit_of_measurement || "";
    const v = Number(st.state);
    const count = Math.floor((max - min) / step) + 1;
    if (count <= 16) {
      const opts = Array.from({ length: count }, (_, i) => +(min + i * step).toFixed(4));
      if (!opts.includes(v)) opts.push(v);
      opts.sort((x, y) => x - y);
      const text = (o) => (o === 0 && /timer|countdown|delay|minuterie/.test(id) ? this._t("timer_off") : `${caFmtNum(this._lang(), o)}${unit ? ` ${unit}` : ""}`);
      return `<label class="field"><span>${caEsc(label)}</span><select data-number="${caEsc(id)}">${opts
        .map((o) => `<option value="${o}"${o === v ? " selected" : ""}>${caEsc(text(o))}</option>`)
        .join("")}</select></label>`;
    }
    return (
      `<div class="slider"><ha-icon icon="${icon || "mdi:tune-variant"}"></ha-icon><span class="sl-label">${caEsc(label)}</span>` +
      `<input type="range" min="${min}" max="${max}" step="${step}" value="${v}" data-number="${caEsc(id)}" aria-label="${caEsc(label)}" style="--p:${((v - min) / (max - min || 1)) * 100}%">` +
      `<span class="v">${caFmtNum(this._lang(), v)}${unit ? ` ${unit}` : ""}</span></div>`
    );
  }

  _selectEntity(id, label) {
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    const opts = (st.attributes.options || []).map((o) => `<option value="${caEsc(o)}"${o === st.state ? " selected" : ""}>${caEsc(this._fmtState(id, o))}</option>`).join("");
    return `<label class="field"><span>${caEsc(label)}</span><select data-select="${caEsc(id)}">${opts}</select></label>`;
  }

  // A select on an attribute of the main entity (fan_mode, swing_mode, preset_mode).
  _selectAttr(attr, listAttr, service, label) {
    const id = this._r.id;
    const st = this._st(id);
    const list = st.attributes[listAttr];
    if (!list?.length) return "";
    const cur = st.attributes[attr];
    const opts = list.map((o) => `<option value="${caEsc(o)}"${o === cur ? " selected" : ""}>${caEsc(this._fmtAttr(id, attr, o))}</option>`).join("");
    return `<label class="field"><span>${caEsc(label)}</span><select data-attr-service="${service}" data-attr="${attr}">${opts}</select></label>`;
  }

  // A toggle chip for a switch or light entity, or for the oscillation (`action`).
  _toggle(id, label, icon, opts = {}) {
    if (!opts.action && (!id || !this._st(id))) return "";
    const ok = opts.action ? true : this._avail(id);
    const on = opts.on ?? this._val(id) === "on";
    const data = opts.action ? `data-action="${opts.action}"` : `data-toggle="${caEsc(id)}"`;
    return `<button class="toggle${on ? " on" : ""}" ${data}${ok ? "" : " disabled"} aria-pressed="${on}"><ha-icon icon="${icon}"></ha-icon>${caEsc(label)}</button>`;
  }

  _toggles(items) {
    const html = items.filter(Boolean).join("");
    return html ? `<div class="toggles">${html}</div>` : "";
  }

  // ── Actions ──
  _call(domain, service, data) {
    return this._hass.callService(domain, service, data);
  }

  _onClick(ev) {
    const el = ev.composedPath().find((n) => n.dataset && (n.dataset.action || n.dataset.toggle || n.dataset.press));
    if (!el || el.disabled) return;
    const d = el.dataset;
    if (d.toggle) {
      this._call(d.toggle.split(".")[0], "toggle", { entity_id: d.toggle });
      return;
    }
    if (d.press) {
      this._call("button", "press", { entity_id: d.press });
      return;
    }
    if (d.action === "zoom") {
      this._toggleZoom(ev);
      return;
    }
    this._action(d.action, d.value, ev);
  }

  // Device-specific actions; `power` is shared.
  _action(action) {
    if (action === "power") {
      const id = this._r.id;
      const domain = id.split(".")[0];
      this._call(domain, this._val(id) === "off" ? "turn_on" : "turn_off", { entity_id: id });
    }
  }

  _onChange(ev) {
    const el = ev.target;
    const d = el?.dataset;
    if (!d) return;
    const id = this._r.id;
    if (d.range === "percentage") this._call("fan", "set_percentage", { entity_id: id, percentage: Number(el.value) });
    else if (d.number) this._call("number", "set_value", { entity_id: d.number, value: Number(el.value) });
    else if (d.select) this._call("select", "select_option", { entity_id: d.select, option: el.value });
    else if (d.attrService) this._call(id.split(".")[0], d.attrService, { entity_id: id, [d.attr]: el.value });
    else return;
    el.blur();
  }

  // ── Styles ──
  _styles(color) {
    return `<style>${CA_STYLES}${CA_ART[this.constructor.kind]?.styles || ""}${this.constructor.styles || ""}</style><style>:host{--ca-color:${color || CA_IDLE};}</style>`;
  }
}

const CA_KIND_ICONS = { purifier: "mdi:air-purifier", fan: "mdi:fan", aircon: "mdi:air-conditioner" };

// ── Mini cards ───────────────────────────────────────────────────────────────
// A mini card is the full card drawn compact, like the ha-home-connect-card and ha-roborock-card mini cards: its
// detail button (top right, `zoom: false` removes it) switches it to the full card and back, and a click anywhere
// else on the page folds it again.
const caInDialog = (ev) => ev.composedPath().some((n) => ["ha-more-info-dialog", "ha-dialog", "dialog"].includes(n.localName));

const caMini = (Base) =>
  class extends Base {
    static get mini() {
      return true;
    }

    constructor() {
      super();
      this._onUnzoom = (ev) => {
        if (this._zoomed && !ev.composedPath().includes(this) && !caInDialog(ev)) this._setZoom(false);
      };
    }

    connectedCallback() {
      super.connectedCallback?.();
      document.addEventListener("click", this._onUnzoom, true);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("click", this._onUnzoom, true);
    }

    getCardSize() {
      return this._zoomed ? super.getCardSize() : 2;
    }

    getGridOptions() {
      return this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 6 };
    }

    _compact() {
      return !this._zoomed;
    }

    _zoomButton() {
      if (this._config.zoom === false) return "";
      const z = !!this._zoomed;
      const label = caEsc(this._t(z ? "zoom_out" : "zoom_in"));
      return `<button class="zoom" data-action="zoom" title="${label}" aria-label="${label}"><ha-icon icon="${z ? "mdi:arrow-collapse" : "mdi:arrow-expand"}"></ha-icon></button>`;
    }

    _setZoom(on) {
      this._zoomed = on;
      this._update();
    }

    // From the keyboard (Enter / Space: no click count), the focus follows to the button that replaced this one.
    _toggleZoom(ev) {
      this._setZoom(!this._zoomed);
      if (ev.detail === 0) this.shadowRoot.querySelector(".zoom")?.focus();
    }

    _miniHtml(m) {
      const btns = [...(m.online && this._config.show_controls ? this._miniButtons(m) : []), m.powerBtn].filter(Boolean);
      const chips = m.chips.filter((x) => x.includes("chip warn") || x.includes("chip alert") || !m.online);
      return (
        `${this._styles(m.color)}<ha-card class="mini">` +
        `<div class="header">${m.badge}<div class="titles"><div class="name">${caEsc(m.name)}</div></div>` +
        `<span class="st"><span class="dot"></span>${caEsc(m.statusText)}</span>${this._zoomButton()}</div>` +
        `<div class="content">${this._picture(m)}<div class="info">${this._miniInfo(m)}${chips.length ? `<div class="chips">${chips.join("")}</div>` : ""}</div>` +
        `${btns.length ? `<div class="mcontrols">${btns.join("")}</div>` : ""}</div></ha-card>`
      );
    }
  };

// A mini bar with its value: speed, filter life.
const caBar = (pct, value, icon) =>
  `<div class="mbar">${icon ? `<ha-icon icon="${icon}"></ha-icon>` : ""}<div class="bar"><div class="fill" style="width:${Math.max(0, Math.min(100, pct))}%"></div></div><span class="v">${caEsc(value)}</span></div>`;

const caLine = (icon, text) => `<div class="line"><ha-icon icon="${icon}"></ha-icon><span>${caEsc(text)}</span></div>`;

// ── Illustrations ────────────────────────────────────────────────────────────
// Each card file registers the illustration of its kind of device, shared with the overview tiles:
//   CA_ART[kind] = { variants, guess(text), render(variant, s) → { svg, cls, style }, styles }
// `s` is the device's state as the illustration needs it: running, pct, color, osc, natural, mode, active, swing, display.
const CA_ART = {};

// The text an illustration variant is guessed from: the device model and names.
function caVariantText(hass, id) {
  const dev = hass.devices?.[caDeviceOf(hass, id)];
  return [dev?.model, dev?.name, dev?.name_by_user, id, hass.states[id]?.attributes.friendly_name].filter(Boolean).join(" ");
}

// The variant of `kind` to draw for `id`: the one asked for (`illustration`), or the one guessed from the device.
function caVariant(hass, kind, id, illustration) {
  const art = CA_ART[kind];
  if (!art?.variants) return undefined;
  if (illustration && illustration !== "auto" && art.variants.includes(illustration)) return illustration;
  return art.guess(caVariantText(hass, id));
}

// The illustration in its frame: animated while `s.running`. `uid` makes the SVG ids unique when several
// illustrations share a shadow root (the overview tiles): gradients would otherwise all take the first one's colours.
function caPicture(kind, variant, s, uid = "") {
  const art = CA_ART[kind];
  if (!art) return "";
  const r = art.render(variant, s);
  let svg = r.svg;
  if (uid) svg = svg.replace(/(id="|url\(#)(ca-[a-z0-9]+)/g, `$1$2-${uid}`);
  const cls = ["picture", `k-${kind}`, `st-${s.state || (s.running ? "on" : "off")}`, s.running ? "running" : "", ...(r.cls || [])];
  return `<div class="${cls.filter(Boolean).join(" ")}"${r.style ? ` style="${r.style}"` : ""}>${svg}</div>`;
}

const CA_ART_STYLES = `
  .picture { position: relative; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .picture svg { width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 3px 6px rgba(0,0,0,.18)); }
  @keyframes ca-spin { to { transform: rotate(360deg); } }
  @keyframes ca-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
  @keyframes ca-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(.9); } }
  @keyframes ca-rise { 0% { opacity: 0; transform: translateY(4px); } 30% { opacity: .9; } 100% { opacity: 0; transform: translateY(-16px); } }
  @keyframes ca-fall { 0% { opacity: 0; transform: translateY(-4px); } 25% { opacity: .9; } 100% { opacity: 0; transform: translateY(22px); } }
  @media (prefers-reduced-motion: reduce) { .picture, .picture * { animation: none !important; } }
`;

// ── Styles ───────────────────────────────────────────────────────────────────
const CA_STYLES = `${CA_ART_STYLES}
  :host { display: block; height: 100%; }
  ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
  .empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }
  /* The body starts 8px under the header, like the other ha-* cards (the card's gap is 10px, 8px on the mini cards). */
  .header { display: flex; align-items: center; gap: 10px; margin-bottom: -2px; }
  ha-card.mini .header { margin-bottom: 0; }
  .badge { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center;
           background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); transition: background .4s, color .4s; }
  .badge ha-icon { --mdc-icon-size: 24px; }
  .titles { flex: 1; min-width: 0; }
  .name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .st { display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0; padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;
        white-space: nowrap; background: color-mix(in srgb, var(--ca-color) 15%, transparent); color: var(--ca-color); }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ca-color); }
  ha-card:has(.running) .dot { animation: ca-blink 1.6s ease-in-out infinite; }
  button { font: inherit; cursor: pointer; border: none; }
  button:disabled { cursor: default; opacity: .5; }
  .power { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
           background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--secondary-text-color); }
  .power.on { background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }
  .power.on:hover, .round.on:hover:not(:disabled) { background: color-mix(in srgb, var(--ca-color) 24%, transparent); }
  .zoom { all: unset; flex-shrink: 0; cursor: pointer; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%;
          display: grid; place-items: center; color: var(--secondary-text-color); }
  .zoom ha-icon { --mdc-icon-size: 16px; }
  .zoom:hover { background: color-mix(in srgb, var(--secondary-text-color) 16%, transparent); color: var(--primary-text-color); }
  .zoom:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }

  .hero { display: flex; align-items: center; gap: 14px; }
  .picture { width: 76px; height: 88px; }
  .iconart { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center;
             background: color-mix(in srgb, var(--ca-color) 15%, transparent); color: var(--ca-color); }
  .iconart ha-icon { --mdc-icon-size: 32px; }
  .running .iconart ha-icon { animation: ca-breathe 2.4s ease-in-out infinite; }
  .info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
  .big { display: flex; align-items: baseline; gap: 8px; min-width: 0; flex-wrap: wrap; }
  .big .val { font-size: 30px; font-weight: 400; line-height: 1.1; color: var(--primary-text-color); white-space: nowrap; }
  .big .val small { font-size: 14px; color: var(--secondary-text-color); }
  .big .lbl { font-size: 13px; font-weight: 500; color: var(--ca-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .big .arrow { font-size: 14px; color: var(--secondary-text-color); white-space: nowrap; }
  .state-big { font-size: 22px; font-weight: 400; line-height: 1.2; color: var(--ca-color); }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px;
          background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--secondary-text-color); white-space: nowrap; }
  .chip ha-icon { --mdc-icon-size: 13px; }
  .chip.warn { background: color-mix(in srgb, var(--warning-color, #ffa600) 15%, transparent); color: var(--warning-color, #ffa600); }
  .chip.alert { background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent); color: var(--error-color, #db4437); }
  .chip.tint { --k: var(--ca-color); background: color-mix(in srgb, var(--k) 15%, transparent); color: var(--k); }
  .bar { height: 4px; border-radius: 3px; background: var(--secondary-background-color, rgba(128,128,128,.15)); overflow: hidden; flex: 1; }
  .fill { height: 100%; border-radius: 3px; background: var(--ca-color); transition: width .6s ease; }

  .section { display: flex; flex-direction: column; gap: 6px; }
  .section-title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; text-transform: uppercase;
                   letter-spacing: .04em; color: var(--secondary-text-color); }
  .section-title ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
  .segments { display: flex; gap: 4px; padding: 3px; border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,.1)); }
  .seg { flex: 1; min-width: 0; display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 6px 4px; border-radius: 9px;
         font-size: 12px; font-weight: 500; background: none; color: var(--secondary-text-color); transition: background .2s, color .2s; }
  .seg span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .seg ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
  .seg.short { flex: 0 0 auto; padding: 6px 10px; }
  .seg.on { background: var(--card-background-color, #fff); color: var(--ca-color); box-shadow: 0 1px 3px rgba(0,0,0,.15); }
  .seg:focus-visible, .toggle:focus-visible, .btn:focus-visible, .round:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 6px; }
  .field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .field > span { font-size: 11px; color: var(--secondary-text-color); }
  select { font: inherit; font-size: 13px; color: var(--primary-text-color); padding: 7px 28px 7px 10px; border-radius: 10px; width: 100%;
           border: 1px solid var(--divider-color, rgba(128,128,128,.25)); appearance: none; -webkit-appearance: none; cursor: pointer;
           background: var(--secondary-background-color, rgba(128,128,128,.1)) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23888' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 6px center / 20px; }
  .slider { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--secondary-text-color); }
  .slider ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; }
  .slider .sl-label { flex-shrink: 0; min-width: 52px; }
  .slider .v { min-width: 44px; text-align: right; font-weight: 500; color: var(--primary-text-color); font-variant-numeric: tabular-nums; }
  input[type=range] { flex: 1; min-width: 0; height: 22px; margin: 0; background: none; appearance: none; -webkit-appearance: none; cursor: pointer; }
  input[type=range]::-webkit-slider-runnable-track { height: 6px; border-radius: 3px;
    background: linear-gradient(to right, var(--ca-color) var(--p, 0%), var(--secondary-background-color, rgba(128,128,128,.2)) var(--p, 0%)); }
  input[type=range]::-moz-range-track { height: 6px; border-radius: 3px; background: var(--secondary-background-color, rgba(128,128,128,.2)); }
  input[type=range]::-moz-range-progress { height: 6px; border-radius: 3px; background: var(--ca-color); }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -6px; border-radius: 50%;
    background: var(--card-background-color, #fff); border: 2px solid var(--ca-color); box-shadow: 0 1px 3px rgba(0,0,0,.25); }
  input[type=range]::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: var(--card-background-color, #fff); border: 2px solid var(--ca-color); }
  input[type=range]:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 2px; border-radius: 4px; }
  .toggles { display: flex; flex-wrap: wrap; gap: 6px; }
  .toggle { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 4px 9px 4px 6px; border-radius: 12px;
            background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--secondary-text-color); }
  .toggle ha-icon { --mdc-icon-size: 15px; }
  .toggle.on { background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }
  .row { display: flex; align-items: center; gap: 8px; }
  .row > .field { flex: 1; }
  .round { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0;
           background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--primary-text-color); }
  .round ha-icon { --mdc-icon-size: 20px; }
  .round.on { background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }

  ha-card.mini { gap: 8px; }
  ha-card.mini .badge { width: 32px; height: 32px; }
  ha-card.mini .badge ha-icon { --mdc-icon-size: 20px; }
  .content { display: flex; align-items: center; gap: 12px; }
  ha-card.mini .picture { width: 56px; height: 66px; }
  .mbar { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .mbar ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
  .mbar .v { font-weight: 500; min-width: 40px; text-align: right; color: var(--primary-text-color); font-variant-numeric: tabular-nums; }
  .line { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }
  .line ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }
  .line span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line b { color: var(--primary-text-color); font-weight: 500; }
  .mcontrols { display: flex; gap: 6px; flex-shrink: 0; }
  ha-card.mini .power { width: 40px; height: 40px; }

  @media (prefers-reduced-motion: reduce) {
    .dot, .iconart ha-icon { animation: none !important; }
  }
`;

// ── Editor (built on Home Assistant's ha-form) ───────────────────────────────
// Like the ha-room-card editors: every option of the card, with the language and, as YAML, the entity overrides in a
// folded Advanced section.
class CaCardEditor extends HTMLElement {
  static kind = "fan";
  static mini = false;

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    const prev = this._hass?.language;
    this._hass = hass;
    if (this._form && prev === hass?.language) this._form.hass = hass;
    else this._render();
  }

  _defaults() {
    return {
      show_controls: true,
      show_sensors: true,
      show_alerts: true,
      ...(CA_ILLUSTRATIONS[this.constructor.kind] ? { illustration: "auto" } : {}),
      ...(this.constructor.mini ? { zoom: true } : {}),
    };
  }

  _helpers() {
    return ["entity", "name", "icon", "illustration", "zoom", "language", "entities"];
  }

  _schema() {
    const kind = this.constructor.kind;
    const ids = caFindEntities(this._hass, kind);
    const domain = kind === "aircon" ? "climate" : "fan";
    const lang = caLang(this._config, this._hass);
    const variants = CA_ILLUSTRATIONS[kind] || [];
    return [
      { name: "entity", selector: { entity: ids.length ? { include_entities: ids } : { domain } } },
      { type: "grid", name: "", schema: [{ name: "name", selector: { text: {} } }, { name: "icon", selector: { icon: {} } }] },
      ...(variants.length
        ? [
            {
              name: "illustration",
              selector: {
                select: { mode: "dropdown", options: ["auto", ...variants].map((v) => ({ value: v, label: caT(lang, `ill_${v}`) })) },
              },
            },
          ]
        : []),
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_controls", selector: { boolean: {} } },
          { name: "show_sensors", selector: { boolean: {} } },
          { name: "show_alerts", selector: { boolean: {} } },
          ...(this.constructor.mini ? [{ name: "zoom", selector: { boolean: {} } }] : []),
        ],
      },
      ...caAdvanced(caLang(this._config, this._hass), "language", "entities"),
    ];
  }

  _render() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.addEventListener("value-changed", (ev) => this._valueChanged(ev));
      this.appendChild(this._form);
    }
    const lang = caLang(this._config, this._hass);
    const helpers = this._helpers();
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.computeLabel = (s) => caT(lang, `ed_${s.name}`);
    this._form.computeHelper = (s) => (helpers.includes(s.name) ? caEditorHelper(lang, s.name) : undefined);
    this._form.data = this._data();
  }

  // The form's data from the config, and the config from the form's data (the overview edits its lists as sections).
  _data() {
    return { ...this._defaults(), ...this._config };
  }

  _fromForm(value) {
    return value;
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    const lang = caLang(this._config, this._hass);
    this._config = caCleanConfig(this._fromForm(ev.detail.value), this._defaults(), this._config.type);
    if (lang !== caLang(this._config, this._hass)) this._render();
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }));
  }
}

// Illustration variants of each kind of device (the first is the fallback).
const CA_ILLUSTRATIONS = { purifier: ["tower", "cylinder", "box", "dyson"], aircon: ["split", "portable", "window"] };

// The folded Advanced section: the language, and the other `names` edited as YAML.
const caAdvanced = (lang, ...names) => [
  {
    name: "advanced",
    type: "expandable",
    flatten: true,
    schema: names.map((name) =>
      name === "language"
        ? {
            name,
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "", label: caT(lang, "ed_language_auto") },
                  { value: "en", label: "English" },
                  { value: "fr", label: "Français" },
                  { value: "de", label: "Deutsch" },
                  { value: "es", label: "Español" },
                ],
              },
            },
          }
        : { name, selector: { object: {} } },
    ),
  },
];

function caEditorHelper(lang, name) {
  const key = `ed_${name}_helper`;
  const txt = caT(lang, key);
  return txt === key ? undefined : txt;
}

// Keeps the YAML short: options left empty or at their default are dropped.
function caCleanConfig(value, defaults, type) {
  const out = { ...value };
  for (const k of Object.keys(out)) {
    const v = out[k];
    if (v === "" || v == null || (Array.isArray(v) && !v.length) || v === defaults[k]) delete out[k];
  }
  for (const key of ["entities", "icons", "illustrations"]) {
    if (!out[key] || typeof out[key] !== "object" || Array.isArray(out[key])) continue;
    const e = Object.fromEntries(Object.entries(out[key]).filter(([, v]) => v && v !== "auto"));
    if (Object.keys(e).length) out[key] = e;
    else delete out[key];
  }
  return type ? { type, ...out } : out;
}

// Defines a card and its editor (`<type>-editor`, a CaCardEditor for the card's kind unless `Editor` is given) and
// lists the card in the card picker.
function caRegister(type, cls, name, description, Editor) {
  if (customElements.get(type)) return;
  cls.tag = type;
  const editor =
    Editor ||
    class extends CaCardEditor {
      static kind = cls.kind;
      static mini = !!cls.mini;
    };
  customElements.define(type, cls);
  customElements.define(`${type}-editor`, editor);
  window.customCards = window.customCards || [];
  window.customCards.push({ type, name, description, preview: true, documentationURL: CA_REPO });
}

if (!customElements.get("climate-air-overview-card")) {
  console.info(`%c HA-CLIMATE-AIR-CARD %c v${CA_VERSION} `, "background:#039be5;color:#fff;font-weight:700", "");
}
