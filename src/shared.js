/*
 * ha-climate-air-card — shared code: i18n, device discovery, the base card, the mini cards and the editor.
 * The device cards (purifier.js, fan.js, aircon.js, heatpump.js) and the overview (overview.js) build on it.
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
    heatpump: "Heat pump",
    humidifier: "Humidifier",
    dehumidifier: "Dehumidifier",
    g_humidifier: "Humidity",
    st_humidifying: "Humidifying",
    st_drying: "Drying",
    st_diffusing: "Diffusing",
    spray: "Mist intensity",
    mood_light: "Mood light",
    light_level: "Brightness",
    color: "Colour",
    tank_level: "Water tank",
    bucket: "Bucket",
    tank_empty: "Water tank empty",
    bucket_full: "Bucket full",
    ill_column: "Ultrasonic column",
    ill_tank: "Clear tank",
    ill_evaporative: "Evaporative",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Essential oil diffuser",
    ill_rituals: "Rituals Perfume Genie (brass)",
    ill_rituals_black: "Rituals Perfume Genie (black)",
    cartridge: "Cartridge",
    cartridge_empty: "Cartridge empty",
    perfume: "Perfume",
    intensity: "Intensity",
    battery: "Battery",
    wifi: "Wi-Fi",
    room_size: "Room size",
    ill_dehumidifier: "Dehumidifier",
    st_dhw: "Hot water",
    st_heating: "Heating",
    st_cooling: "Cooling",
    st_idle: "Idle",
    st_defrost: "Defrosting",
    tank: "Tank",
    dhw_target: "Hot water",
    backup: "Backup heater",
    zones: "Zones",
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
    colon: ": ",
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
    filter_soon: "Replace the filter soon",
    filter_ok: "Filter OK",
    filter_reset: "Reset filter",
    filter_reset_confirm: "Tap again to confirm",
    hours: "{n} h",
    level: "Level {n}",
    target: "Target",
    target_low: "Heat to",
    target_high: "Cool to",
    target_humidity: "Target humidity",
    outdoor: "Outdoor",
    fan_mode: "Fan",
    swing_mode: "Swing",
    swing_horizontal_mode: "Horizontal swing",
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
    g_heatpump: "Heat pumps",
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
    ill_none: "No illustration (classic header)",
    ed_illustration_theme: "Illustration theme",
    theme_auto: "Automatic (sun, dark theme)",
    theme_day: "Day",
    theme_night: "Night",
    ill_tower: "Tower",
    ill_cylinder: "Round",
    ill_box: "Square box",
    ill_dyson: "Bladeless loop",
    ill_split: "Wall split unit",
    ill_portable: "Portable unit",
    ill_window: "Window split",
    ill_portasplit: "Portable split",
    ed_show_controls: "Controls",
    ed_show_title: "Title",
    ed_show_subtitle: "Subtitle",
    ed_show_sensors: "Measurements",
    ed_show_alerts: "Alerts",
    ed_show_filter: "Filter",
    ed_filter_warning: "Filter warning threshold (%)",
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
    ed_show_all: "Show every device",
    ed_show_all_helper: "Every device shows at first; the detail button keeps only the ones on or needing attention",
    ed_exclude: "Devices to exclude",
    ed_include: "Devices to add",
    ed_include_helper: "Climate or fan entities the card would not pick on its own (a hidden entity, say)",
    src_air: "Air (outdoor unit)",
    src_ground: "Ground source",
    src_water: "Water source",
    gt_collector: "Horizontal collector",
    gt_borehole: "Vertical borehole",
    wt_well: "Single well",
    wt_doublet: "Two-well doublet",
    wt_lake: "Lake / pond loop",
    heat_power: "Heat output",
    cop: "COP",
    cop_today: "COP today",
    scop: "SCOP",
    flow_temp: "Flow",
    return_temp: "Return",
    delta_t: "ΔT",
    flow_rate: "Flow rate",
    elec_energy: "Electrical energy",
    heat_energy: "Heat energy",
    ed_source: "Source",
    ed_source_helper: "The heat pump's source side and its illustration",
    ed_ground_type: "Ground loop",
    ed_water_type: "Water loop",
    ed_power_threshold: "Running threshold (W)",
    ed_power_threshold_helper: "Power above which a metered heat pump counts as running",
    ed_outdoor_temp: "Outdoor temperature",
    ed_outdoor_temp_helper: "A sensor or weather entity for the outdoor chip",
  },
  fr: {
    purifier: "Purificateur",
    fan: "Ventilateur",
    aircon: "Climatiseur",
    heatpump: "Pompe à chaleur",
    humidifier: "Humidificateur",
    dehumidifier: "Déshumidificateur",
    g_humidifier: "Humidité",
    st_humidifying: "Humidifie",
    st_drying: "Déshumidifie",
    st_diffusing: "Diffuse",
    spray: "Intensité de diffusion",
    mood_light: "Lumière d'ambiance",
    light_level: "Luminosité",
    color: "Couleur",
    tank_level: "Réservoir",
    bucket: "Bac",
    tank_empty: "Réservoir vide",
    bucket_full: "Bac plein",
    ill_column: "Colonne à ultrasons",
    ill_tank: "Réservoir transparent",
    ill_evaporative: "Évaporatif",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Diffuseur d'huiles essentielles",
    ill_rituals: "Rituals Perfume Genie (laiton)",
    ill_rituals_black: "Rituals Perfume Genie (noir)",
    cartridge: "Cartouche",
    cartridge_empty: "Cartouche vide",
    perfume: "Parfum",
    intensity: "Intensité",
    battery: "Batterie",
    wifi: "Wi-Fi",
    room_size: "Taille de la pièce",
    ill_dehumidifier: "Déshumidificateur",
    st_dhw: "Eau chaude",
    st_heating: "Chauffe",
    st_cooling: "Refroidit",
    st_idle: "En attente",
    st_defrost: "Dégivrage",
    tank: "Ballon",
    dhw_target: "Eau chaude",
    backup: "Appoint électrique",
    zones: "Zones",
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
    colon: " : ",
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
    filter_soon: "Filtre à changer bientôt",
    filter_ok: "Filtre OK",
    filter_reset: "Réinitialiser le filtre",
    filter_reset_confirm: "Touchez encore pour confirmer",
    hours: "{n} h",
    level: "Niveau {n}",
    target: "Consigne",
    target_low: "Chauffer à",
    target_high: "Refroidir à",
    target_humidity: "Humidité cible",
    outdoor: "Extérieur",
    fan_mode: "Ventilation",
    swing_mode: "Balayage",
    swing_horizontal_mode: "Balayage horizontal",
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
    g_heatpump: "Pompes à chaleur",
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
    ill_none: "Sans illustration (en-tête classique)",
    ed_illustration_theme: "Thème de l'illustration",
    theme_auto: "Automatique (soleil, thème sombre)",
    theme_day: "Jour",
    theme_night: "Nuit",
    ill_tower: "Tour",
    ill_cylinder: "Ronde",
    ill_box: "Boîte carrée",
    ill_dyson: "Anneau bladeless",
    ill_split: "Split mural",
    ill_portable: "Climatiseur mobile",
    ill_window: "Split de fenêtre",
    ill_portasplit: "Split portable",
    ed_show_controls: "Commandes",
    ed_show_title: "Titre",
    ed_show_subtitle: "Sous-titre",
    ed_show_sensors: "Mesures",
    ed_show_alerts: "Alertes",
    ed_show_filter: "Filtre",
    ed_filter_warning: "Seuil d'alerte du filtre (%)",
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
    ed_show_all: "Tout afficher",
    ed_show_all_helper: "Tous les appareils s'affichent d'emblée ; le bouton détail ne garde que ceux allumés ou en alerte",
    ed_exclude: "Appareils à exclure",
    ed_include: "Appareils à ajouter",
    ed_include_helper: "Entités climate ou fan que la carte ne prendrait pas d'elle-même (une entité masquée, par exemple)",
    src_air: "Air (unité extérieure)",
    src_ground: "Géothermie (sol)",
    src_water: "Sur nappe (eau)",
    gt_collector: "Capteur horizontal",
    gt_borehole: "Sonde verticale",
    wt_well: "Puits unique",
    wt_doublet: "Doublet de puits",
    wt_lake: "Boucle en lac / étang",
    heat_power: "Puissance thermique",
    cop: "COP",
    cop_today: "COP du jour",
    scop: "SCOP",
    flow_temp: "Départ",
    return_temp: "Retour",
    delta_t: "ΔT",
    flow_rate: "Débit",
    elec_energy: "Énergie électrique",
    heat_energy: "Énergie thermique",
    ed_source: "Source",
    ed_source_helper: "Le côté source de la pompe à chaleur et son illustration",
    ed_ground_type: "Boucle géothermique",
    ed_water_type: "Boucle sur eau",
    ed_power_threshold: "Seuil de marche (W)",
    ed_power_threshold_helper: "Puissance au-dessus de laquelle une pompe à chaleur mesurée est considérée en marche",
    ed_outdoor_temp: "Température extérieure",
    ed_outdoor_temp_helper: "Un capteur ou une entité météo pour la puce extérieure",
  },
  de: {
    purifier: "Luftreiniger",
    fan: "Ventilator",
    aircon: "Klimaanlage",
    heatpump: "Wärmepumpe",
    humidifier: "Luftbefeuchter",
    dehumidifier: "Luftentfeuchter",
    g_humidifier: "Luftfeuchte",
    st_humidifying: "Befeuchtet",
    st_drying: "Entfeuchtet",
    st_diffusing: "Verströmt",
    spray: "Sprühintensität",
    mood_light: "Stimmungslicht",
    light_level: "Helligkeit",
    color: "Farbe",
    tank_level: "Wassertank",
    bucket: "Wasserbehälter",
    tank_empty: "Wassertank leer",
    bucket_full: "Behälter voll",
    ill_column: "Ultraschallsäule",
    ill_tank: "Transparenter Tank",
    ill_evaporative: "Verdunster",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Aromadiffusor",
    ill_rituals: "Rituals Perfume Genie (Messing)",
    ill_rituals_black: "Rituals Perfume Genie (Schwarz)",
    cartridge: "Kartusche",
    cartridge_empty: "Kartusche leer",
    perfume: "Duft",
    intensity: "Intensität",
    battery: "Batterie",
    wifi: "WLAN",
    room_size: "Raumgröße",
    ill_dehumidifier: "Luftentfeuchter",
    st_dhw: "Warmwasser",
    st_heating: "Heizt",
    st_cooling: "Kühlt",
    st_idle: "Bereit",
    st_defrost: "Abtauen",
    tank: "Speicher",
    dhw_target: "Warmwasser",
    backup: "Heizstab",
    zones: "Zonen",
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
    colon: ": ",
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
    filter_soon: "Filter bald wechseln",
    filter_ok: "Filter OK",
    filter_reset: "Filter zurücksetzen",
    filter_reset_confirm: "Zum Bestätigen erneut tippen",
    hours: "{n} h",
    level: "Stufe {n}",
    target: "Sollwert",
    target_low: "Heizen auf",
    target_high: "Kühlen auf",
    target_humidity: "Zielfeuchte",
    outdoor: "Außen",
    fan_mode: "Lüfter",
    swing_mode: "Schwenken",
    swing_horizontal_mode: "Horizontal schwenken",
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
    g_heatpump: "Wärmepumpen",
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
    ill_none: "Keine Illustration (klassische Kopfzeile)",
    ed_illustration_theme: "Illustrationsthema",
    theme_auto: "Automatisch (Sonne, dunkles Design)",
    theme_day: "Tag",
    theme_night: "Nacht",
    ill_tower: "Turm",
    ill_cylinder: "Rund",
    ill_box: "Quadratisches Gehäuse",
    ill_dyson: "Rotorloser Ring",
    ill_split: "Wand-Split-Gerät",
    ill_portable: "Mobiles Gerät",
    ill_window: "Fenster-Split",
    ill_portasplit: "Mobiles Split",
    ed_show_controls: "Steuerung",
    ed_show_title: "Titel",
    ed_show_subtitle: "Untertitel",
    ed_show_sensors: "Messwerte",
    ed_show_alerts: "Warnungen",
    ed_show_filter: "Filter",
    ed_filter_warning: "Filter-Warnschwelle (%)",
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
    ed_show_all: "Alle Geräte anzeigen",
    ed_show_all_helper: "Alle Geräte werden zuerst angezeigt; die Detailschaltfläche behält nur die eingeschalteten oder zu beachtenden",
    ed_exclude: "Auszuschließende Geräte",
    ed_include: "Hinzuzufügende Geräte",
    ed_include_helper: "Climate- oder Fan-Entitäten, die die Karte nicht von selbst übernehmen würde (z. B. eine ausgeblendete Entität)",
    src_air: "Luft (Außeneinheit)",
    src_ground: "Erdwärme (Sole)",
    src_water: "Grundwasser (Wasser)",
    gt_collector: "Horizontaler Kollektor",
    gt_borehole: "Vertikale Erdsonde",
    wt_well: "Einzelner Brunnen",
    wt_doublet: "Brunnendublette",
    wt_lake: "See-/Teichschleife",
    heat_power: "Wärmeleistung",
    cop: "COP",
    cop_today: "COP heute",
    scop: "SCOP",
    flow_temp: "Vorlauf",
    return_temp: "Rücklauf",
    delta_t: "ΔT",
    flow_rate: "Durchfluss",
    elec_energy: "Elektrische Energie",
    heat_energy: "Wärmemenge",
    ed_source: "Quelle",
    ed_source_helper: "Die Quellenseite der Wärmepumpe und ihre Darstellung",
    ed_ground_type: "Erdschleife",
    ed_water_type: "Wasserschleife",
    ed_power_threshold: "Laufschwelle (W)",
    ed_power_threshold_helper: "Leistung, ab der eine gemessene Wärmepumpe als laufend gilt",
    ed_outdoor_temp: "Außentemperatur",
    ed_outdoor_temp_helper: "Ein Sensor oder eine Wetter-Entität für den Außen-Chip",
  },
  es: {
    purifier: "Purificador de aire",
    fan: "Ventilador",
    aircon: "Aire acondicionado",
    heatpump: "Bomba de calor",
    humidifier: "Humidificador",
    dehumidifier: "Deshumidificador",
    g_humidifier: "Humedad",
    st_humidifying: "Humidificando",
    st_drying: "Deshumidificando",
    st_diffusing: "Difundiendo",
    spray: "Intensidad de difusión",
    mood_light: "Luz ambiental",
    light_level: "Brillo",
    color: "Color",
    tank_level: "Depósito",
    bucket: "Cubeta",
    tank_empty: "Depósito vacío",
    bucket_full: "Cubeta llena",
    ill_column: "Columna ultrasónica",
    ill_tank: "Depósito transparente",
    ill_evaporative: "Evaporativo",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Difusor de aceites esenciales",
    ill_rituals: "Rituals Perfume Genie (latón)",
    ill_rituals_black: "Rituals Perfume Genie (negro)",
    cartridge: "Cartucho",
    cartridge_empty: "Cartucho vacío",
    perfume: "Perfume",
    intensity: "Intensidad",
    battery: "Batería",
    wifi: "Wi-Fi",
    room_size: "Tamaño de la habitación",
    ill_dehumidifier: "Deshumidificador",
    st_dhw: "Agua caliente",
    st_heating: "Calentando",
    st_cooling: "Enfriando",
    st_idle: "En espera",
    st_defrost: "Desescarche",
    tank: "Depósito",
    dhw_target: "Agua caliente",
    backup: "Resistencia de apoyo",
    zones: "Zonas",
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
    colon: ": ",
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
    filter_soon: "Cambia pronto el filtro",
    filter_ok: "Filtro OK",
    filter_reset: "Restablecer el filtro",
    filter_reset_confirm: "Toca de nuevo para confirmar",
    hours: "{n} h",
    level: "Nivel {n}",
    target: "Objetivo",
    target_low: "Calentar a",
    target_high: "Enfriar a",
    target_humidity: "Humedad objetivo",
    outdoor: "Exterior",
    fan_mode: "Ventilador",
    swing_mode: "Oscilación",
    swing_horizontal_mode: "Oscilación horizontal",
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
    g_heatpump: "Bombas de calor",
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
    ill_none: "Sin ilustración (encabezado clásico)",
    ed_illustration_theme: "Tema de la ilustración",
    theme_auto: "Automático (sol, tema oscuro)",
    theme_day: "Día",
    theme_night: "Noche",
    ill_tower: "Torre",
    ill_cylinder: "Redondo",
    ill_box: "Caja cuadrada",
    ill_dyson: "Anillo sin aspas",
    ill_split: "Split de pared",
    ill_portable: "Equipo portátil",
    ill_window: "Split de ventana",
    ill_portasplit: "Split portátil",
    ed_show_controls: "Controles",
    ed_show_title: "Título",
    ed_show_subtitle: "Subtítulo",
    ed_show_sensors: "Mediciones",
    ed_show_alerts: "Alertas",
    ed_show_filter: "Filtro",
    ed_filter_warning: "Umbral de aviso del filtro (%)",
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
    ed_show_all: "Mostrar todos los dispositivos",
    ed_show_all_helper: "Todos los dispositivos se muestran al principio; el botón de detalle deja solo los encendidos o que requieren atención",
    ed_exclude: "Dispositivos que excluir",
    ed_include: "Dispositivos que añadir",
    ed_include_helper: "Entidades climate o fan que la tarjeta no elegiría por sí sola (una entidad oculta, por ejemplo)",
    src_air: "Aire (unidad exterior)",
    src_ground: "Geotérmica (suelo)",
    src_water: "Agua (acuífero)",
    gt_collector: "Captador horizontal",
    gt_borehole: "Sonda vertical",
    wt_well: "Pozo único",
    wt_doublet: "Doblete de pozos",
    wt_lake: "Bucle en lago / estanque",
    heat_power: "Potencia térmica",
    cop: "COP",
    cop_today: "COP de hoy",
    scop: "SCOP",
    flow_temp: "Impulsión",
    return_temp: "Retorno",
    delta_t: "ΔT",
    flow_rate: "Caudal",
    elec_energy: "Energía eléctrica",
    heat_energy: "Energía térmica",
    ed_source: "Fuente",
    ed_source_helper: "El lado de la fuente de la bomba de calor y su ilustración",
    ed_ground_type: "Bucle geotérmico",
    ed_water_type: "Bucle de agua",
    ed_power_threshold: "Umbral de marcha (W)",
    ed_power_threshold_helper: "Potencia por encima de la cual una bomba de calor medida cuenta como en marcha",
    ed_outdoor_temp: "Temperatura exterior",
    ed_outdoor_temp_helper: "Un sensor o entidad meteorológica para el chip exterior",
  },
  sr: {
    purifier: "Пречишћивач ваздуха",
    fan: "Вентилатор",
    aircon: "Клима уређај",
    heatpump: "Топлотна пумпа",
    humidifier: "Овлаживач ваздуха",
    dehumidifier: "Одвлаживач ваздуха",
    g_humidifier: "Влажност",
    st_humidifying: "Овлажује",
    st_drying: "Одвлажује",
    st_diffusing: "Распршује",
    spray: "Јачина распршивања",
    mood_light: "Амбијентално светло",
    light_level: "Осветљеност",
    color: "Боја",
    tank_level: "Резервоар",
    bucket: "Посуда",
    tank_empty: "Резервоар је празан",
    bucket_full: "Посуда је пуна",
    ill_column: "Ултразвучни стуб",
    ill_tank: "Провидни резервоар",
    ill_evaporative: "Испаривачки",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Дифузер етеричних уља",
    ill_rituals: "Rituals Perfume Genie (месинг)",
    ill_rituals_black: "Rituals Perfume Genie (црна)",
    cartridge: "Уложак",
    cartridge_empty: "Уложак је празан",
    perfume: "Мирис",
    intensity: "Интензитет",
    battery: "Батерија",
    wifi: "Wi-Fi",
    room_size: "Величина собе",
    ill_dehumidifier: "Одвлаживач ваздуха",
    st_dhw: "Топла вода",
    st_heating: "Греје",
    st_cooling: "Хлади",
    st_idle: "На чекању",
    st_defrost: "Одмрзавање",
    tank: "Бојлер",
    dhw_target: "Топла вода",
    backup: "Помоћни грејач",
    zones: "Зоне",
    st_off: "Искључено",
    st_on: "Укључено",
    st_unavailable: "Недоступно",
    st_purifying: "Пречишћавање",
    aq_good: "Добар ваздух",
    aq_moderate: "Умерен ваздух",
    aq_unhealthy: "Лош ваздух",
    aq_bad: "Веома лош ваздух",
    speed: "Брзина",
    mode: "Режим",
    preset: "Предефинисано",
    colon: ": ",
    oscillation: "Осцилација",
    angle: "Угао",
    timer: "Тајмер",
    timer_off: "Искључено",
    child_lock: "Заштита за децу",
    buzzer: "Звук",
    light: "Светло",
    brightness: "Екран",
    anion: "Јонизатор",
    sw_outdoor_silent: "Спољашњи тихи режим",
    sw_aux_heat: "Помоћно грејање",
    sw_frost: "Заштита од смрзавања",
    sw_eco: "Еко",
    sw_display: "Екран",
    sw_sound: "Звучни сигнал",
    sw_self_clean: "Самочишћење",
    sw_silent: "Тихо",
    sw_smart_eye: "Паметно око",
    sw_anion: "Јонизатор",
    sw_turbo: "Турбо",
    sw_breeze: "Поветарац",
    sw_sleep: "Спавање",
    sw_light: "Светло",
    favorite: "Омиљени ниво",
    voc: "VOC",
    no2: "NO₂",
    filter: "Филтер",
    filter_low: "Замените филтер",
    filter_dirty: "Очистите филтер",
    filter_soon: "Ускоро замените филтер",
    filter_ok: "Филтер у реду",
    filter_reset: "Ресетуј филтер",
    filter_reset_confirm: "Додирните поново за потврду",
    hours: "{n} h",
    level: "Ниво {n}",
    target: "Циљ",
    target_low: "Грејање на",
    target_high: "Хлађење на",
    target_humidity: "Циљна влажност",
    outdoor: "Споља",
    fan_mode: "Вентилатор",
    swing_mode: "Усмеравање",
    swing_horizontal_mode: "Хоризонтално усмеравање",
    preset_mode: "Предефинисано",
    options: "Опције",
    offline: "Уређај је ван мреже",
    no_device: "Није пронађен ниједан уређај",
    power: "Напајање",
    zoom_in: "Прикажи целу картицу",
    zoom_out: "Назад на компактни приказ",
    rotate_left: "Окрени лево",
    rotate_right: "Окрени десно",
    temp_down: "Смањи циљну температуру",
    temp_up: "Повећај циљну температуру",
    title: "Клима и ваздух",
    running_n: "{n} укључено",
    all_off: "Све је искључено",
    nothing_on: "Тренутно ништа није укључено",
    g_aircon: "Клима уређаји",
    g_heatpump: "Топлотне пумпе",
    g_purifier: "Пречишћивачи ваздуха",
    g_fan: "Вентилатори",
    no_area: "Без просторије",
    no_devices: "Није пронађен ниједан клима уређај, пречишћивач ваздуха или вентилатор",
    toggle: "Укључи / Искључи",
    ed_entity: "Уређај",
    ed_entity_helper: "Остави празно да се користи први пронађени",
    ed_name: "Назив",
    ed_name_helper: "Остави празно да се користи назив уређаја",
    ed_icon: "Икона",
    ed_icon_helper: "Замењује илустрацију",
    ed_illustration: "Илустрација",
    ed_illustration_helper: "Аутоматски: бира се на основу модела и назива уређаја",
    ill_auto: "Аутоматски",
    ill_none: "Без илустрације (класично заглавље)",
    ed_illustration_theme: "Тема илустрације",
    theme_auto: "Аутоматски (сунце, тамна тема)",
    theme_day: "Дан",
    theme_night: "Ноћ",
    ill_tower: "Стубни",
    ill_cylinder: "Округли",
    ill_box: "Квадратни",
    ill_dyson: "Без елисе",
    ill_split: "Зидна сплит јединица",
    ill_portable: "Покретна јединица",
    ill_window: "Прозорска сплит јединица",
    ill_portasplit: "Преносиви сплит",
    ed_show_controls: "Контроле",
    ed_show_title: "Наслов",
    ed_show_subtitle: "Поднаслов",
    ed_show_sensors: "Мерења",
    ed_show_alerts: "Упозорења",
    ed_show_filter: "Филтер",
    ed_filter_warning: "Праг упозорења за филтер (%)",
    ed_zoom: "Дугме за детаље",
    ed_zoom_helper: "Дугме у горњем десном углу које пребацује мини картицу на пун приказ и назад",
    ed_language: "Језик",
    ed_language_helper: "Аутоматски: прати језик Home Assistant-а",
    ed_language_auto: "Аутоматски",
    ed_advanced: "Напредно",
    ed_entities: "Ентитети",
    ed_entities_helper: "Детектовано са уређаја; овде можете изменити улогу, нпр. pm25: sensor.living_room_pm25",
    ed_title: "Наслов",
    ed_title_helper: "Остави празно за „Клима и ваздух“",
    ed_kinds: "Типови уређаја",
    ed_kinds_helper: "Илустрација и икона за сваки тип уређаја; икона замењује илустрацију",
    ed_devs: "Уређаји",
    ed_devs_helper: "Назив, тип, илустрација и икона за сваки уређај; празно: аутоматски",
    ed_type: "Тип",
    ed_group_by: "Груписати према",
    ed_group_type: "По типу уређаја",
    ed_group_area: "По просторији",
    ed_group_none: "Без груписања",
    ed_columns: "Колоне",
    ed_columns_helper: "Празно: 2, или 1 на уским екранима",
    ed_ov_zoom_helper: "Приказују се само уређаји који раде или захтевају пажњу; дугме приказује све уређаје. Искључено: сви уређаји, увек",
    ed_show_all: "Прикажи све уређаје",
    ed_show_all_helper: "Сви уређаји се приказују одмах; дугме за детаље задржава само укључене или оне који траже пажњу",
    ed_exclude: "Уређаји за искључивање",
    ed_include: "Уређаји за додавање",
    ed_include_helper: "Ентитети климе или вентилатора које картица не би сама препознала (нпр. скривени ентитет)",
    src_air: "Ваздух (спољна јединица)",
    src_ground: "Геотермална (тло)",
    src_water: "Вода (подземна)",
    gt_collector: "Хоризонтални колектор",
    gt_borehole: "Вертикална сонда",
    wt_well: "Један бунар",
    wt_doublet: "Дублет бунара",
    wt_lake: "Петља у језеру",
    heat_power: "Топлотна снага",
    cop: "COP",
    cop_today: "COP данас",
    scop: "SCOP",
    flow_temp: "Полаз",
    return_temp: "Поврат",
    delta_t: "ΔT",
    flow_rate: "Проток",
    elec_energy: "Електрична енергија",
    heat_energy: "Топлотна енергија",
    ed_source: "Извор",
    ed_source_helper: "Страна извора топлотне пумпе и њена илустрација",
    ed_ground_type: "Геотермална петља",
    ed_water_type: "Водена петља",
    ed_power_threshold: "Праг рада (W)",
    ed_power_threshold_helper: "Снага изнад које се мерена топлотна пумпа сматра да ради",
    ed_outdoor_temp: "Спољна температура",
    ed_outdoor_temp_helper: "Сензор или временски ентитет за спољни чип",
  },
  "sr-Latn": {
    purifier: "Prečišćivač vazduha",
    fan: "Ventilator",
    aircon: "Klima uređaj",
    heatpump: "Toplotna pumpa",
    humidifier: "Ovlaživač vazduha",
    dehumidifier: "Odvlaživač vazduha",
    g_humidifier: "Vlažnost",
    st_humidifying: "Ovlažuje",
    st_drying: "Odvlažuje",
    st_diffusing: "Raspršuje",
    spray: "Jačina raspršivanja",
    mood_light: "Ambijentalno svetlo",
    light_level: "Osvetljenost",
    color: "Boja",
    tank_level: "Rezervoar",
    bucket: "Posuda",
    tank_empty: "Rezervoar je prazan",
    bucket_full: "Posuda je puna",
    ill_column: "Ultrazvučni stub",
    ill_tank: "Providni rezervoar",
    ill_evaporative: "Isparivački",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Difuzer eteričnih ulja",
    ill_rituals: "Rituals Perfume Genie (mesing)",
    ill_rituals_black: "Rituals Perfume Genie (crna)",
    cartridge: "Uložak",
    cartridge_empty: "Uložak je prazan",
    perfume: "Miris",
    intensity: "Intenzitet",
    battery: "Baterija",
    wifi: "Wi-Fi",
    room_size: "Veličina sobe",
    ill_dehumidifier: "Odvlaživač vazduha",
    st_dhw: "Topla voda",
    st_heating: "Greje",
    st_cooling: "Hladi",
    st_idle: "Na čekanju",
    st_defrost: "Odmrzavanje",
    tank: "Bojler",
    dhw_target: "Topla voda",
    backup: "Pomoćni grejač",
    zones: "Zone",
    st_off: "Isključeno",
    st_on: "Uključeno",
    st_unavailable: "Nedostupno",
    st_purifying: "Prečišćavanje",
    aq_good: "Dobar vazduh",
    aq_moderate: "Umeren vazduh",
    aq_unhealthy: "Loš vazduh",
    aq_bad: "Veoma loš vazduh",
    speed: "Brzina",
    mode: "Režim",
    preset: "Predefinisano",
    colon: ": ",
    oscillation: "Oscilacija",
    angle: "Ugao",
    timer: "Tajmer",
    timer_off: "Isključeno",
    child_lock: "Zaštita za decu",
    buzzer: "Zvuk",
    light: "Svetlo",
    brightness: "Ekran",
    anion: "Jonizator",
    sw_outdoor_silent: "Spoljašnji tihi režim",
    sw_aux_heat: "Pomoćno grejanje",
    sw_frost: "Zaštita od smrzavanja",
    sw_eco: "Eko",
    sw_display: "Ekran",
    sw_sound: "Zvučni signal",
    sw_self_clean: "Samočišćenje",
    sw_silent: "Tiho",
    sw_smart_eye: "Pametno oko",
    sw_anion: "Jonizator",
    sw_turbo: "Turbo",
    sw_breeze: "Povetarac",
    sw_sleep: "Spavanje",
    sw_light: "Svetlo",
    favorite: "Omiljeni nivo",
    voc: "VOC",
    no2: "NO₂",
    filter: "Filter",
    filter_low: "Zamenite filter",
    filter_dirty: "Očistite filter",
    filter_soon: "Uskoro zamenite filter",
    filter_ok: "Filter u redu",
    filter_reset: "Resetuj filter",
    filter_reset_confirm: "Dodirnite ponovo za potvrdu",
    hours: "{n} h",
    level: "Nivo {n}",
    target: "Cilj",
    target_low: "Grejanje na",
    target_high: "Hlađenje na",
    target_humidity: "Ciljna vlažnost",
    outdoor: "Spolja",
    fan_mode: "Ventilator",
    swing_mode: "Usmeravanje",
    swing_horizontal_mode: "Horizontalno usmeravanje",
    preset_mode: "Predefinisano",
    options: "Opcije",
    offline: "Uređaj je van mreže",
    no_device: "Nije pronađen nijedan uređaj",
    power: "Napajanje",
    zoom_in: "Prikaži celu karticu",
    zoom_out: "Nazad na kompaktni prikaz",
    rotate_left: "Okreni levo",
    rotate_right: "Okreni desno",
    temp_down: "Smanji ciljnu temperaturu",
    temp_up: "Povećaj ciljnu temperaturu",
    title: "Klima i vazduh",
    running_n: "{n} uključeno",
    all_off: "Sve je isključeno",
    nothing_on: "Trenutno ništa nije uključeno",
    g_aircon: "Klima uređaji",
    g_heatpump: "Toplotne pumpe",
    g_purifier: "Prečišćivači vazduha",
    g_fan: "Ventilatori",
    no_area: "Bez prostorije",
    no_devices: "Nije pronađen nijedan klima uređaj, prečišćivač vazduha ili ventilator",
    toggle: "Uključi / Isključi",
    ed_entity: "Uređaj",
    ed_entity_helper: "Ostavi prazno da se koristi prvi pronađeni",
    ed_name: "Naziv",
    ed_name_helper: "Ostavi prazno da se koristi naziv uređaja",
    ed_icon: "Ikona",
    ed_icon_helper: "Zamenjuje ilustraciju",
    ed_illustration: "Ilustracija",
    ed_illustration_helper: "Automatski: bira se na osnovu modela i naziva uređaja",
    ill_auto: "Automatski",
    ill_none: "Bez ilustracije (klasično zaglavlje)",
    ed_illustration_theme: "Tema ilustracije",
    theme_auto: "Automatski (sunce, tamna tema)",
    theme_day: "Dan",
    theme_night: "Noć",
    ill_tower: "Stubni",
    ill_cylinder: "Okrugli",
    ill_box: "Kvadratni",
    ill_dyson: "Bez elise",
    ill_split: "Zidna split jedinica",
    ill_portable: "Pokretna jedinica",
    ill_window: "Prozorska split jedinica",
    ill_portasplit: "Prenosivi split",
    ed_show_controls: "Kontrole",
    ed_show_title: "Naslov",
    ed_show_subtitle: "Podnaslov",
    ed_show_sensors: "Merenja",
    ed_show_alerts: "Upozorenja",
    ed_show_filter: "Filter",
    ed_filter_warning: "Prag upozorenja za filter (%)",
    ed_zoom: "Dugme za detalje",
    ed_zoom_helper: "Dugme u gornjem desnom uglu koje prebacuje mini karticu na pun prikaz i nazad",
    ed_language: "Jezik",
    ed_language_helper: "Automatski: prati jezik Home Assistant-a",
    ed_language_auto: "Automatski",
    ed_advanced: "Napredno",
    ed_entities: "Entiteti",
    ed_entities_helper: "Detektovano sa uređaja; ovde možete izmeniti ulogu, npr. pm25: sensor.living_room_pm25",
    ed_title: "Naslov",
    ed_title_helper: "Ostavi prazno za „Klima i vazduh“",
    ed_kinds: "Tipovi uređaja",
    ed_kinds_helper: "Ilustracija i ikona za svaki tip uređaja; ikona zamenjuje ilustraciju",
    ed_devs: "Uređaji",
    ed_devs_helper: "Naziv, tip, ilustracija i ikona za svaki uređaj; prazno: automatski",
    ed_type: "Tip",
    ed_group_by: "Grupisati prema",
    ed_group_type: "Po tipu uređaja",
    ed_group_area: "Po prostoriji",
    ed_group_none: "Bez grupisanja",
    ed_columns: "Kolone",
    ed_columns_helper: "Prazno: 2, ili 1 na uskim ekranima",
    ed_ov_zoom_helper: "Prikazuju se samo uređaji koji rade ili zahtevaju pažnju; dugme prikazuje sve uređaje. Isključeno: svi uređaji, uvek",
    ed_show_all: "Prikaži sve uređaje",
    ed_show_all_helper: "Svi uređaji se prikazuju odmah; dugme za detalje zadržava samo uključene ili one koji traže pažnju",
    ed_exclude: "Uređaji za isključivanje",
    ed_include: "Uređaji za dodavanje",
    ed_include_helper: "Entiteti klime ili ventilatora koje kartica ne bi sama prepoznala (npr. skriveni entitet)",
    src_air: "Vazduh (spoljna jedinica)",
    src_ground: "Geotermalna (tlo)",
    src_water: "Voda (podzemna)",
    gt_collector: "Horizontalni kolektor",
    gt_borehole: "Vertikalna sonda",
    wt_well: "Jedan bunar",
    wt_doublet: "Dublet bunara",
    wt_lake: "Petlja u jezeru",
    heat_power: "Toplotna snaga",
    cop: "COP",
    cop_today: "COP danas",
    scop: "SCOP",
    flow_temp: "Polaz",
    return_temp: "Povrat",
    delta_t: "ΔT",
    flow_rate: "Protok",
    elec_energy: "Električna energija",
    heat_energy: "Toplotna energija",
    ed_source: "Izvor",
    ed_source_helper: "Strana izvora toplotne pumpe i njena ilustracija",
    ed_ground_type: "Geotermalna petlja",
    ed_water_type: "Vodena petlja",
    ed_power_threshold: "Prag rada (W)",
    ed_power_threshold_helper: "Snaga iznad koje se merena toplotna pumpa smatra da radi",
    ed_outdoor_temp: "Spoljna temperatura",
    ed_outdoor_temp_helper: "Senzor ili vremenski entitet za spoljni čip",
  },
  it: {
    purifier: "Purificatore d'aria",
    fan: "Ventilatore",
    aircon: "Condizionatore",
    heatpump: "Pompa di calore",
    humidifier: "Umidificatore",
    dehumidifier: "Deumidificatore",
    g_humidifier: "Umidità",
    st_humidifying: "Umidifica",
    st_drying: "Deumidifica",
    st_diffusing: "Diffonde",
    spray: "Intensità di diffusione",
    mood_light: "Luce d'atmosfera",
    light_level: "Luminosità",
    color: "Colore",
    tank_level: "Serbatoio",
    bucket: "Tanica",
    tank_empty: "Serbatoio vuoto",
    bucket_full: "Tanica piena",
    ill_column: "Colonna a ultrasuoni",
    ill_tank: "Serbatoio trasparente",
    ill_evaporative: "Evaporativo",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Diffusore di oli essenziali",
    ill_rituals: "Rituals Perfume Genie (ottone)",
    ill_rituals_black: "Rituals Perfume Genie (nero)",
    cartridge: "Cartuccia",
    cartridge_empty: "Cartuccia vuota",
    perfume: "Profumo",
    intensity: "Intensità",
    battery: "Batteria",
    wifi: "Wi-Fi",
    room_size: "Dimensione della stanza",
    ill_dehumidifier: "Deumidificatore",
    st_dhw: "Acqua calda",
    st_heating: "Riscalda",
    st_cooling: "Raffresca",
    st_idle: "In attesa",
    st_defrost: "Sbrinamento",
    tank: "Accumulo",
    dhw_target: "Acqua calda",
    backup: "Resistenza integrativa",
    zones: "Zone",
    st_off: "Spento",
    st_on: "Acceso",
    st_unavailable: "Non disponibile",
    st_purifying: "Purificazione",
    aq_good: "Aria buona",
    aq_moderate: "Aria discreta",
    aq_unhealthy: "Aria scadente",
    aq_bad: "Aria pessima",
    speed: "Velocità",
    mode: "Modalità",
    preset: "Preimpostazione",
    colon: ": ",
    oscillation: "Oscillazione",
    angle: "Angolo",
    timer: "Timer",
    timer_off: "Nessuno",
    child_lock: "Blocco bambini",
    buzzer: "Suono",
    light: "Spia",
    brightness: "Display",
    anion: "Ionizzatore",
    sw_outdoor_silent: "Unità esterna silenziosa",
    sw_aux_heat: "Riscaldamento ausiliario",
    sw_frost: "Antigelo",
    sw_eco: "Eco",
    sw_display: "Display",
    sw_sound: "Segnale acustico",
    sw_self_clean: "Autopulizia",
    sw_silent: "Silenzioso",
    sw_smart_eye: "Occhio intelligente",
    sw_anion: "Ionizzatore",
    sw_turbo: "Turbo",
    sw_breeze: "Brezza",
    sw_sleep: "Notte",
    sw_light: "Spia",
    favorite: "Livello preferito",
    voc: "COV",
    no2: "NO₂",
    filter: "Filtro",
    filter_low: "Sostituire il filtro",
    filter_dirty: "Pulire il filtro",
    filter_soon: "Sostituire presto il filtro",
    filter_ok: "Filtro OK",
    filter_reset: "Azzera il filtro",
    filter_reset_confirm: "Tocca di nuovo per confermare",
    hours: "{n} h",
    level: "Livello {n}",
    target: "Obiettivo",
    target_low: "Riscalda a",
    target_high: "Raffredda a",
    target_humidity: "Umidità desiderata",
    outdoor: "Esterno",
    fan_mode: "Ventilazione",
    swing_mode: "Oscillazione alette",
    swing_horizontal_mode: "Oscillazione orizzontale",
    preset_mode: "Preimpostazione",
    options: "Opzioni",
    offline: "Dispositivo offline",
    no_device: "Nessun dispositivo trovato",
    power: "Accensione / spegnimento",
    zoom_in: "Mostra la scheda completa",
    zoom_out: "Torna alla vista compatta",
    rotate_left: "Ruota a sinistra",
    rotate_right: "Ruota a destra",
    temp_down: "Abbassa la temperatura obiettivo",
    temp_up: "Alza la temperatura obiettivo",
    title: "Clima e aria",
    running_n: "Accesi: {n}",
    all_off: "Tutto è spento",
    nothing_on: "Niente acceso al momento",
    g_aircon: "Condizionatori",
    g_heatpump: "Pompe di calore",
    g_purifier: "Purificatori",
    g_fan: "Ventilatori",
    no_area: "Nessuna area",
    no_devices: "Nessun condizionatore, purificatore d'aria o ventilatore trovato",
    toggle: "Accendi / spegni",
    ed_entity: "Dispositivo",
    ed_entity_helper: "Lascia vuoto per usare il primo trovato",
    ed_name: "Nome",
    ed_name_helper: "Lascia vuoto per usare il nome del dispositivo",
    ed_icon: "Icona",
    ed_icon_helper: "Sostituisce l'illustrazione",
    ed_illustration: "Illustrazione",
    ed_illustration_helper: "Automatica: scelta in base al modello e al nome del dispositivo",
    ill_auto: "Automatica",
    ill_none: "Nessuna illustrazione (intestazione classica)",
    ed_illustration_theme: "Tema dell'illustrazione",
    theme_auto: "Automatico (sole, tema scuro)",
    theme_day: "Giorno",
    theme_night: "Notte",
    ill_tower: "Torre",
    ill_cylinder: "Rotondo",
    ill_box: "Scatola quadrata",
    ill_dyson: "Anello senza pale",
    ill_split: "Split a parete",
    ill_portable: "Condizionatore portatile",
    ill_window: "Split da finestra",
    ill_portasplit: "Split portatile",
    ed_show_controls: "Comandi",
    ed_show_title: "Titolo",
    ed_show_subtitle: "Sottotitolo",
    ed_show_sensors: "Misure",
    ed_show_alerts: "Avvisi",
    ed_show_filter: "Filtro",
    ed_filter_warning: "Soglia di avviso del filtro (%)",
    ed_zoom: "Pulsante dettagli",
    ed_zoom_helper: "Pulsante in alto a destra che passa dalla mini scheda alla scheda completa e viceversa",
    ed_language: "Lingua",
    ed_language_helper: "Automatica: segue la lingua di Home Assistant",
    ed_language_auto: "Automatica",
    ed_advanced: "Avanzate",
    ed_entities: "Entità",
    ed_entities_helper: "Rilevate dal dispositivo; sostituisci qui un ruolo, ad es. pm25: sensor.soggiorno_pm25",
    ed_title: "Titolo",
    ed_title_helper: "Lascia vuoto per «Clima e aria»",
    ed_kinds: "Tipi di dispositivo",
    ed_kinds_helper: "L'illustrazione e l'icona di tutti i dispositivi di un tipo; un'icona sostituisce l'illustrazione",
    ed_devs: "Dispositivi",
    ed_devs_helper: "Nome, tipo, illustrazione e icona di ogni dispositivo; vuoto: automatico",
    ed_type: "Tipo",
    ed_group_by: "Raggruppamento",
    ed_group_type: "Per tipo di dispositivo",
    ed_group_area: "Per area",
    ed_group_none: "Nessuno",
    ed_columns: "Colonne",
    ed_columns_helper: "Vuoto: 2, o 1 sugli schermi stretti",
    ed_ov_zoom_helper:
      "Sono mostrati solo i dispositivi accesi o che richiedono attenzione; il pulsante mostra tutti i dispositivi. Disattivato: sempre tutti i dispositivi",
    ed_show_all: "Mostra tutti i dispositivi",
    ed_show_all_helper: "Tutti i dispositivi sono mostrati subito; il pulsante dettagli tiene solo quelli accesi o che richiedono attenzione",
    ed_exclude: "Dispositivi da escludere",
    ed_include: "Dispositivi da aggiungere",
    ed_include_helper: "Entità climate o fan che la scheda non sceglierebbe da sola (ad esempio un'entità nascosta)",
    src_air: "Aria (unità esterna)",
    src_ground: "Geotermica (terreno)",
    src_water: "Acqua (falda)",
    gt_collector: "Collettore orizzontale",
    gt_borehole: "Sonda verticale",
    wt_well: "Pozzo singolo",
    wt_doublet: "Doppietta di pozzi",
    wt_lake: "Anello in lago / stagno",
    heat_power: "Potenza termica",
    cop: "COP",
    cop_today: "COP oggi",
    scop: "SCOP",
    flow_temp: "Mandata",
    return_temp: "Ritorno",
    delta_t: "ΔT",
    flow_rate: "Portata",
    elec_energy: "Energia elettrica",
    heat_energy: "Energia termica",
    ed_source: "Sorgente",
    ed_source_helper: "Il lato sorgente della pompa di calore e la sua illustrazione",
    ed_ground_type: "Anello geotermico",
    ed_water_type: "Anello ad acqua",
    ed_power_threshold: "Soglia di funzionamento (W)",
    ed_power_threshold_helper: "Potenza oltre la quale una pompa di calore misurata è considerata in funzione",
    ed_outdoor_temp: "Temperatura esterna",
    ed_outdoor_temp_helper: "Un sensore o un'entità meteo per il chip esterno",
  },
  nl: {
    purifier: "Luchtreiniger",
    fan: "Ventilator",
    aircon: "Airconditioner",
    heatpump: "Warmtepomp",
    humidifier: "Luchtbevochtiger",
    dehumidifier: "Luchtontvochtiger",
    g_humidifier: "Luchtvochtigheid",
    st_humidifying: "Bevochtigt",
    st_drying: "Ontvochtigt",
    st_diffusing: "Verspreidt",
    spray: "Vernevelingsintensiteit",
    mood_light: "Sfeerlicht",
    light_level: "Helderheid",
    color: "Kleur",
    tank_level: "Waterreservoir",
    bucket: "Opvangbak",
    tank_empty: "Waterreservoir leeg",
    bucket_full: "Opvangbak vol",
    ill_column: "Ultrasone zuil",
    ill_tank: "Doorzichtig reservoir",
    ill_evaporative: "Verdamper",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Aromadiffuser",
    ill_rituals: "Rituals Perfume Genie (messing)",
    ill_rituals_black: "Rituals Perfume Genie (zwart)",
    cartridge: "Cartridge",
    cartridge_empty: "Cartridge leeg",
    perfume: "Parfum",
    intensity: "Intensiteit",
    battery: "Batterij",
    wifi: "Wifi",
    room_size: "Kamergrootte",
    ill_dehumidifier: "Luchtontvochtiger",
    st_dhw: "Warm water",
    st_heating: "Verwarmt",
    st_cooling: "Koelt",
    st_idle: "Inactief",
    st_defrost: "Ontdooien",
    tank: "Boiler",
    dhw_target: "Warm water",
    backup: "Bijverwarming",
    zones: "Zones",
    st_off: "Uit",
    st_on: "Aan",
    st_unavailable: "Niet beschikbaar",
    st_purifying: "Zuivert",
    aq_good: "Goede lucht",
    aq_moderate: "Matige lucht",
    aq_unhealthy: "Slechte lucht",
    aq_bad: "Zeer slechte lucht",
    speed: "Snelheid",
    mode: "Modus",
    preset: "Voorinstelling",
    colon: ": ",
    oscillation: "Oscillatie",
    angle: "Hoek",
    timer: "Timer",
    timer_off: "Geen",
    child_lock: "Kinderslot",
    buzzer: "Geluid",
    light: "Lampje",
    brightness: "Display",
    anion: "Ionisator",
    sw_outdoor_silent: "Stille buitenunit",
    sw_aux_heat: "Hulpverwarming",
    sw_frost: "Vorstbeveiliging",
    sw_eco: "Eco",
    sw_display: "Display",
    sw_sound: "Pieptoon",
    sw_self_clean: "Zelfreiniging",
    sw_silent: "Stil",
    sw_smart_eye: "Slim oog",
    sw_anion: "Ionisator",
    sw_turbo: "Turbo",
    sw_breeze: "Bries",
    sw_sleep: "Slaap",
    sw_light: "Lampje",
    favorite: "Favoriet niveau",
    voc: "VOS",
    no2: "NO₂",
    filter: "Filter",
    filter_low: "Vervang het filter",
    filter_dirty: "Reinig het filter",
    filter_soon: "Vervang het filter binnenkort",
    filter_ok: "Filter OK",
    filter_reset: "Filter resetten",
    filter_reset_confirm: "Tik nogmaals om te bevestigen",
    hours: "{n} u",
    level: "Niveau {n}",
    target: "Doel",
    target_low: "Verwarmen tot",
    target_high: "Koelen tot",
    target_humidity: "Doelvochtigheid",
    outdoor: "Buiten",
    fan_mode: "Ventilatie",
    swing_mode: "Zwenken",
    swing_horizontal_mode: "Horizontaal zwenken",
    preset_mode: "Voorinstelling",
    options: "Opties",
    offline: "Apparaat offline",
    no_device: "Geen apparaat gevonden",
    power: "Aan / uit",
    zoom_in: "Volledige kaart tonen",
    zoom_out: "Terug naar de compacte weergave",
    rotate_left: "Naar links draaien",
    rotate_right: "Naar rechts draaien",
    temp_down: "Doeltemperatuur verlagen",
    temp_up: "Doeltemperatuur verhogen",
    title: "Klimaat & lucht",
    running_n: "{n} aan",
    all_off: "Alles staat uit",
    nothing_on: "Er staat nu niets aan",
    g_aircon: "Airconditioners",
    g_heatpump: "Warmtepompen",
    g_purifier: "Luchtreinigers",
    g_fan: "Ventilatoren",
    no_area: "Geen ruimte",
    no_devices: "Geen airconditioner, luchtreiniger of ventilator gevonden",
    toggle: "In- / uitschakelen",
    ed_entity: "Apparaat",
    ed_entity_helper: "Leeg laten om het eerst gevonden apparaat te gebruiken",
    ed_name: "Naam",
    ed_name_helper: "Leeg laten om de apparaatnaam te gebruiken",
    ed_icon: "Pictogram",
    ed_icon_helper: "Vervangt de illustratie",
    ed_illustration: "Illustratie",
    ed_illustration_helper: "Automatisch: gekozen op basis van het model en de naam van het apparaat",
    ill_auto: "Automatisch",
    ill_none: "Geen illustratie (klassieke koptekst)",
    ed_illustration_theme: "Illustratiethema",
    theme_auto: "Automatisch (zon, donker thema)",
    theme_day: "Dag",
    theme_night: "Nacht",
    ill_tower: "Toren",
    ill_cylinder: "Rond",
    ill_box: "Vierkante kast",
    ill_dyson: "Bladloze ring",
    ill_split: "Wandunit (split)",
    ill_portable: "Mobiele unit",
    ill_window: "Raamunit (split)",
    ill_portasplit: "Draagbare split",
    ed_show_controls: "Bediening",
    ed_show_title: "Titel",
    ed_show_subtitle: "Ondertitel",
    ed_show_sensors: "Metingen",
    ed_show_alerts: "Waarschuwingen",
    ed_show_filter: "Filter",
    ed_filter_warning: "Waarschuwingsdrempel filter (%)",
    ed_zoom: "Detailknop",
    ed_zoom_helper: "Knop rechtsboven die de minikaart naar de volledige kaart omschakelt en terug",
    ed_language: "Taal",
    ed_language_helper: "Automatisch: volgt de taal van Home Assistant",
    ed_language_auto: "Automatisch",
    ed_advanced: "Geavanceerd",
    ed_entities: "Entiteiten",
    ed_entities_helper: "Gedetecteerd vanuit het apparaat; overschrijf hier een rol, bijv. pm25: sensor.woonkamer_pm25",
    ed_title: "Titel",
    ed_title_helper: "Leeg laten voor “Klimaat & lucht”",
    ed_kinds: "Apparaattypen",
    ed_kinds_helper: "De illustratie en het pictogram van alle apparaten van een type; een pictogram vervangt de illustratie",
    ed_devs: "Apparaten",
    ed_devs_helper: "Naam, type, illustratie en pictogram van elk apparaat; leeg: automatisch",
    ed_type: "Type",
    ed_group_by: "Groepering",
    ed_group_type: "Op apparaattype",
    ed_group_area: "Op ruimte",
    ed_group_none: "Geen",
    ed_columns: "Kolommen",
    ed_columns_helper: "Leeg: 2, of 1 op smalle schermen",
    ed_ov_zoom_helper:
      "Alleen apparaten die aan staan of aandacht nodig hebben worden getoond; de knop toont alle apparaten. Uit: altijd alle apparaten",
    ed_show_all: "Alle apparaten tonen",
    ed_show_all_helper: "Alle apparaten worden meteen getoond; de detailknop houdt alleen de ingeschakelde of aandacht vragende over",
    ed_exclude: "Uit te sluiten apparaten",
    ed_include: "Toe te voegen apparaten",
    ed_include_helper: "Climate- of fan-entiteiten die de kaart niet uit zichzelf zou kiezen (bijvoorbeeld een verborgen entiteit)",
    src_air: "Lucht (buitenunit)",
    src_ground: "Bodem (aardwarmte)",
    src_water: "Water (grondwater)",
    gt_collector: "Horizontale collector",
    gt_borehole: "Verticale boring",
    wt_well: "Enkele put",
    wt_doublet: "Bronnendoublet",
    wt_lake: "Lus in meer / vijver",
    heat_power: "Warmtevermogen",
    cop: "COP",
    cop_today: "COP vandaag",
    scop: "SCOP",
    flow_temp: "Aanvoer",
    return_temp: "Retour",
    delta_t: "ΔT",
    flow_rate: "Debiet",
    elec_energy: "Elektrische energie",
    heat_energy: "Warmte-energie",
    ed_source: "Bron",
    ed_source_helper: "De bronzijde van de warmtepomp en de illustratie ervan",
    ed_ground_type: "Bodemlus",
    ed_water_type: "Waterlus",
    ed_power_threshold: "Draaidrempel (W)",
    ed_power_threshold_helper: "Vermogen waarboven een gemeten warmtepomp als draaiend geldt",
    ed_outdoor_temp: "Buitentemperatuur",
    ed_outdoor_temp_helper: "Een sensor of weer-entiteit voor de buitenchip",
  },
  pt: {
    purifier: "Purificador de ar",
    fan: "Ventoinha",
    aircon: "Ar condicionado",
    heatpump: "Bomba de calor",
    humidifier: "Humidificador",
    dehumidifier: "Desumidificador",
    g_humidifier: "Humidade",
    st_humidifying: "A humidificar",
    st_drying: "A desumidificar",
    st_diffusing: "A difundir",
    spray: "Intensidade de difusão",
    mood_light: "Luz ambiente",
    light_level: "Brilho",
    color: "Cor",
    tank_level: "Depósito",
    bucket: "Depósito de água",
    tank_empty: "Depósito vazio",
    bucket_full: "Depósito cheio",
    ill_column: "Coluna ultrassónica",
    ill_tank: "Depósito transparente",
    ill_evaporative: "Evaporativo",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Difusor de óleos essenciais",
    ill_rituals: "Rituals Perfume Genie (latão)",
    ill_rituals_black: "Rituals Perfume Genie (preto)",
    cartridge: "Cartucho",
    cartridge_empty: "Cartucho vazio",
    perfume: "Perfume",
    intensity: "Intensidade",
    battery: "Bateria",
    wifi: "Wi-Fi",
    room_size: "Tamanho da divisão",
    ill_dehumidifier: "Desumidificador",
    st_dhw: "Água quente",
    st_heating: "A aquecer",
    st_cooling: "A arrefecer",
    st_idle: "Em espera",
    st_defrost: "Descongelação",
    tank: "Depósito",
    dhw_target: "Água quente",
    backup: "Resistência de apoio",
    zones: "Zonas",
    st_off: "Desligado",
    st_on: "Ligado",
    st_unavailable: "Indisponível",
    st_purifying: "A purificar",
    aq_good: "Ar bom",
    aq_moderate: "Ar moderado",
    aq_unhealthy: "Ar mau",
    aq_bad: "Ar muito mau",
    speed: "Velocidade",
    mode: "Modo",
    preset: "Predefinição",
    colon: ": ",
    oscillation: "Oscilação",
    angle: "Ângulo",
    timer: "Temporizador",
    timer_off: "Nenhum",
    child_lock: "Bloqueio para crianças",
    buzzer: "Som",
    light: "Luz indicadora",
    brightness: "Ecrã",
    anion: "Ionizador",
    sw_outdoor_silent: "Unidade exterior silenciosa",
    sw_aux_heat: "Aquecimento auxiliar",
    sw_frost: "Proteção antigelo",
    sw_eco: "Eco",
    sw_display: "Ecrã",
    sw_sound: "Sinal sonoro",
    sw_self_clean: "Autolimpeza",
    sw_silent: "Silencioso",
    sw_smart_eye: "Olho inteligente",
    sw_anion: "Ionizador",
    sw_turbo: "Turbo",
    sw_breeze: "Brisa",
    sw_sleep: "Noite",
    sw_light: "Luz indicadora",
    favorite: "Nível favorito",
    voc: "COV",
    no2: "NO₂",
    filter: "Filtro",
    filter_low: "Substituir o filtro",
    filter_dirty: "Limpar o filtro",
    filter_soon: "Substituir o filtro em breve",
    filter_ok: "Filtro OK",
    filter_reset: "Repor o filtro",
    filter_reset_confirm: "Toque novamente para confirmar",
    hours: "{n} h",
    level: "Nível {n}",
    target: "Alvo",
    target_low: "Aquecer a",
    target_high: "Arrefecer a",
    target_humidity: "Humidade alvo",
    outdoor: "Exterior",
    fan_mode: "Ventilação",
    swing_mode: "Oscilação",
    swing_horizontal_mode: "Oscilação horizontal",
    preset_mode: "Predefinição",
    options: "Opções",
    offline: "Dispositivo offline",
    no_device: "Nenhum dispositivo encontrado",
    power: "Ligar / desligar",
    zoom_in: "Mostrar o cartão completo",
    zoom_out: "Voltar à vista compacta",
    rotate_left: "Rodar para a esquerda",
    rotate_right: "Rodar para a direita",
    temp_down: "Baixar a temperatura alvo",
    temp_up: "Subir a temperatura alvo",
    title: "Clima e ar",
    running_n: "Ligados: {n}",
    all_off: "Está tudo desligado",
    nothing_on: "Nada ligado de momento",
    g_aircon: "Ares condicionados",
    g_heatpump: "Bombas de calor",
    g_purifier: "Purificadores",
    g_fan: "Ventoinhas",
    no_area: "Sem área",
    no_devices: "Nenhum ar condicionado, purificador de ar ou ventoinha encontrado",
    toggle: "Ligar / desligar",
    ed_entity: "Dispositivo",
    ed_entity_helper: "Deixe vazio para usar o primeiro encontrado",
    ed_name: "Nome",
    ed_name_helper: "Deixe vazio para usar o nome do dispositivo",
    ed_icon: "Ícone",
    ed_icon_helper: "Substitui a ilustração",
    ed_illustration: "Ilustração",
    ed_illustration_helper: "Automática: escolhida a partir do modelo e do nome do dispositivo",
    ill_auto: "Automática",
    ill_none: "Sem ilustração (cabeçalho clássico)",
    ed_illustration_theme: "Tema da ilustração",
    theme_auto: "Automático (sol, tema escuro)",
    theme_day: "Dia",
    theme_night: "Noite",
    ill_tower: "Torre",
    ill_cylinder: "Redondo",
    ill_box: "Caixa quadrada",
    ill_dyson: "Anel sem pás",
    ill_split: "Split de parede",
    ill_portable: "Unidade portátil",
    ill_window: "Split de janela",
    ill_portasplit: "Split portátil",
    ed_show_controls: "Comandos",
    ed_show_title: "Título",
    ed_show_subtitle: "Subtítulo",
    ed_show_sensors: "Medições",
    ed_show_alerts: "Alertas",
    ed_show_filter: "Filtro",
    ed_filter_warning: "Limiar de aviso do filtro (%)",
    ed_zoom: "Botão de detalhe",
    ed_zoom_helper: "Botão no canto superior direito que alterna entre o mini cartão e o cartão completo",
    ed_language: "Idioma",
    ed_language_helper: "Automático: segue o idioma do Home Assistant",
    ed_language_auto: "Automático",
    ed_advanced: "Avançado",
    ed_entities: "Entidades",
    ed_entities_helper: "Detetadas a partir do dispositivo; substitua aqui uma função, p. ex. pm25: sensor.sala_pm25",
    ed_title: "Título",
    ed_title_helper: "Deixe vazio para «Clima e ar»",
    ed_kinds: "Tipos de dispositivo",
    ed_kinds_helper: "A ilustração e o ícone de todos os dispositivos de um tipo; um ícone substitui a ilustração",
    ed_devs: "Dispositivos",
    ed_devs_helper: "Nome, tipo, ilustração e ícone de cada dispositivo; vazio: automático",
    ed_type: "Tipo",
    ed_group_by: "Agrupamento",
    ed_group_type: "Por tipo de dispositivo",
    ed_group_area: "Por área",
    ed_group_none: "Nenhum",
    ed_columns: "Colunas",
    ed_columns_helper: "Vazio: 2, ou 1 em ecrãs estreitos",
    ed_ov_zoom_helper:
      "Só aparecem os dispositivos ligados ou que precisam de atenção; o botão mostra todos os dispositivos. Desativado: sempre todos os dispositivos",
    ed_show_all: "Mostrar todos os dispositivos",
    ed_show_all_helper: "Todos os dispositivos aparecem logo; o botão de detalhe deixa só os ligados ou que precisam de atenção",
    ed_exclude: "Dispositivos a excluir",
    ed_include: "Dispositivos a adicionar",
    ed_include_helper: "Entidades climate ou fan que o cartão não escolheria sozinho (por exemplo, uma entidade oculta)",
    src_air: "Ar (unidade exterior)",
    src_ground: "Geotérmica (solo)",
    src_water: "Água (aquífero)",
    gt_collector: "Coletor horizontal",
    gt_borehole: "Sonda vertical",
    wt_well: "Poço único",
    wt_doublet: "Dupla de poços",
    wt_lake: "Circuito em lago / lagoa",
    heat_power: "Potência térmica",
    cop: "COP",
    cop_today: "COP hoje",
    scop: "SCOP",
    flow_temp: "Ida",
    return_temp: "Retorno",
    delta_t: "ΔT",
    flow_rate: "Caudal",
    elec_energy: "Energia elétrica",
    heat_energy: "Energia térmica",
    ed_source: "Fonte",
    ed_source_helper: "O lado da fonte da bomba de calor e a sua ilustração",
    ed_ground_type: "Circuito geotérmico",
    ed_water_type: "Circuito de água",
    ed_power_threshold: "Limiar de funcionamento (W)",
    ed_power_threshold_helper: "Potência acima da qual uma bomba de calor medida conta como em funcionamento",
    ed_outdoor_temp: "Temperatura exterior",
    ed_outdoor_temp_helper: "Um sensor ou entidade meteorológica para o chip exterior",
  },
  pl: {
    purifier: "Oczyszczacz powietrza",
    fan: "Wentylator",
    aircon: "Klimatyzator",
    heatpump: "Pompa ciepła",
    humidifier: "Nawilżacz",
    dehumidifier: "Osuszacz",
    g_humidifier: "Wilgotność",
    st_humidifying: "Nawilża",
    st_drying: "Osusza",
    st_diffusing: "Rozprasza",
    spray: "Intensywność mgiełki",
    mood_light: "Światło nastrojowe",
    light_level: "Jasność",
    color: "Kolor",
    tank_level: "Zbiornik",
    bucket: "Pojemnik",
    tank_empty: "Zbiornik pusty",
    bucket_full: "Pojemnik pełny",
    ill_column: "Kolumna ultradźwiękowa",
    ill_tank: "Przezroczysty zbiornik",
    ill_evaporative: "Ewaporacyjny",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Dyfuzor olejków eterycznych",
    ill_rituals: "Rituals Perfume Genie (mosiądz)",
    ill_rituals_black: "Rituals Perfume Genie (czarny)",
    cartridge: "Wkład",
    cartridge_empty: "Pusty wkład",
    perfume: "Zapach",
    intensity: "Intensywność",
    battery: "Bateria",
    wifi: "Wi-Fi",
    room_size: "Wielkość pomieszczenia",
    ill_dehumidifier: "Osuszacz",
    st_dhw: "Ciepła woda",
    st_heating: "Grzeje",
    st_cooling: "Chłodzi",
    st_idle: "Bezczynna",
    st_defrost: "Odszranianie",
    tank: "Zasobnik",
    dhw_target: "Ciepła woda",
    backup: "Grzałka wspomagająca",
    zones: "Strefy",
    st_off: "Wyłączone",
    st_on: "Włączone",
    st_unavailable: "Niedostępne",
    st_purifying: "Oczyszczanie",
    aq_good: "Dobra",
    aq_moderate: "Umiarkowana",
    aq_unhealthy: "Zła",
    aq_bad: "Bardzo zła",
    speed: "Prędkość",
    mode: "Tryb",
    preset: "Ustawienie wstępne",
    colon: ": ",
    oscillation: "Oscylacja",
    angle: "Kąt",
    timer: "Timer",
    timer_off: "Brak",
    child_lock: "Blokada rodzicielska",
    buzzer: "Dźwięk",
    light: "Kontrolka",
    brightness: "Wyświetlacz",
    anion: "Jonizator",
    sw_outdoor_silent: "Cicha jednostka zewnętrzna",
    sw_aux_heat: "Ogrzewanie pomocnicze",
    sw_frost: "Ochrona przed mrozem",
    sw_eco: "Eko",
    sw_display: "Wyświetlacz",
    sw_sound: "Sygnał dźwiękowy",
    sw_self_clean: "Samoczyszczenie",
    sw_silent: "Cichy",
    sw_smart_eye: "Inteligentne oko",
    sw_anion: "Jonizator",
    sw_turbo: "Turbo",
    sw_breeze: "Bryza",
    sw_sleep: "Sen",
    sw_light: "Kontrolka",
    favorite: "Ulubiony poziom",
    voc: "LZO",
    no2: "NO₂",
    filter: "Filtr",
    filter_low: "Wymień filtr",
    filter_dirty: "Wyczyść filtr",
    filter_soon: "Wkrótce wymień filtr",
    filter_ok: "Filtr OK",
    filter_reset: "Zresetuj filtr",
    filter_reset_confirm: "Dotknij ponownie, aby potwierdzić",
    hours: "{n} h",
    level: "Poziom {n}",
    target: "Cel",
    target_low: "Grzanie do",
    target_high: "Chłodzenie do",
    target_humidity: "Wilgotność docelowa",
    outdoor: "Na zewnątrz",
    fan_mode: "Nawiew",
    swing_mode: "Kierunek nawiewu",
    swing_horizontal_mode: "Nawiew poziomy",
    preset_mode: "Ustawienie wstępne",
    options: "Opcje",
    offline: "Urządzenie offline",
    no_device: "Nie znaleziono urządzenia",
    power: "Wł. / wył.",
    zoom_in: "Pokaż pełną kartę",
    zoom_out: "Wróć do widoku kompaktowego",
    rotate_left: "Obróć w lewo",
    rotate_right: "Obróć w prawo",
    temp_down: "Obniż temperaturę docelową",
    temp_up: "Podnieś temperaturę docelową",
    title: "Klimat i powietrze",
    running_n: "Włączone: {n}",
    all_off: "Wszystko wyłączone",
    nothing_on: "Nic nie jest teraz włączone",
    g_aircon: "Klimatyzatory",
    g_heatpump: "Pompy ciepła",
    g_purifier: "Oczyszczacze",
    g_fan: "Wentylatory",
    no_area: "Bez obszaru",
    no_devices: "Nie znaleziono klimatyzatora, oczyszczacza powietrza ani wentylatora",
    toggle: "Włącz / wyłącz",
    ed_entity: "Urządzenie",
    ed_entity_helper: "Pozostaw puste, aby użyć pierwszego znalezionego",
    ed_name: "Nazwa",
    ed_name_helper: "Pozostaw puste, aby użyć nazwy urządzenia",
    ed_icon: "Ikona",
    ed_icon_helper: "Zastępuje ilustrację",
    ed_illustration: "Ilustracja",
    ed_illustration_helper: "Automatycznie: wybierana na podstawie modelu i nazwy urządzenia",
    ill_auto: "Automatycznie",
    ill_none: "Bez ilustracji (klasyczny nagłówek)",
    ed_illustration_theme: "Motyw ilustracji",
    theme_auto: "Automatyczny (słońce, ciemny motyw)",
    theme_day: "Dzień",
    theme_night: "Noc",
    ill_tower: "Wieża",
    ill_cylinder: "Okrągły",
    ill_box: "Kwadratowa obudowa",
    ill_dyson: "Pierścień bez łopatek",
    ill_split: "Split ścienny",
    ill_portable: "Klimatyzator przenośny",
    ill_window: "Split okienny",
    ill_portasplit: "Split przenośny",
    ed_show_controls: "Sterowanie",
    ed_show_title: "Tytuł",
    ed_show_subtitle: "Podtytuł",
    ed_show_sensors: "Pomiary",
    ed_show_alerts: "Alerty",
    ed_show_filter: "Filtr",
    ed_filter_warning: "Próg ostrzeżenia filtra (%)",
    ed_zoom: "Przycisk szczegółów",
    ed_zoom_helper: "Przycisk w prawym górnym rogu, który przełącza minikartę na pełną kartę i z powrotem",
    ed_language: "Język",
    ed_language_helper: "Automatycznie: zgodnie z językiem Home Assistant",
    ed_language_auto: "Automatycznie",
    ed_advanced: "Zaawansowane",
    ed_entities: "Encje",
    ed_entities_helper: "Wykryte z urządzenia; tutaj można nadpisać rolę, np. pm25: sensor.salon_pm25",
    ed_title: "Tytuł",
    ed_title_helper: "Pozostaw puste dla „Klimat i powietrze”",
    ed_kinds: "Typy urządzeń",
    ed_kinds_helper: "Ilustracja i ikona wszystkich urządzeń danego typu; ikona zastępuje ilustrację",
    ed_devs: "Urządzenia",
    ed_devs_helper: "Nazwa, typ, ilustracja i ikona każdego urządzenia; puste: automatycznie",
    ed_type: "Typ",
    ed_group_by: "Grupowanie",
    ed_group_type: "Według typu urządzenia",
    ed_group_area: "Według obszaru",
    ed_group_none: "Brak",
    ed_columns: "Kolumny",
    ed_columns_helper: "Puste: 2 lub 1 na wąskich ekranach",
    ed_ov_zoom_helper:
      "Wyświetlane są tylko urządzenia włączone lub wymagające uwagi; przycisk pokazuje wszystkie urządzenia. Wyłączone: zawsze wszystkie urządzenia",
    ed_show_all: "Pokaż wszystkie urządzenia",
    ed_show_all_helper: "Wszystkie urządzenia są widoczne od razu; przycisk szczegółów zostawia tylko włączone lub wymagające uwagi",
    ed_exclude: "Urządzenia do wykluczenia",
    ed_include: "Urządzenia do dodania",
    ed_include_helper: "Encje climate lub fan, których karta nie wybrałaby sama (np. ukryta encja)",
    src_air: "Powietrze (jednostka zewnętrzna)",
    src_ground: "Gruntowa (ziemia)",
    src_water: "Wodna (woda gruntowa)",
    gt_collector: "Kolektor poziomy",
    gt_borehole: "Sonda pionowa",
    wt_well: "Pojedyncza studnia",
    wt_doublet: "Dublet studni",
    wt_lake: "Pętla w jeziorze / stawie",
    heat_power: "Moc cieplna",
    cop: "COP",
    cop_today: "COP dziś",
    scop: "SCOP",
    flow_temp: "Zasilanie",
    return_temp: "Powrót",
    delta_t: "ΔT",
    flow_rate: "Przepływ",
    elec_energy: "Energia elektryczna",
    heat_energy: "Energia cieplna",
    ed_source: "Źródło",
    ed_source_helper: "Strona źródła pompy ciepła i jej ilustracja",
    ed_ground_type: "Pętla gruntowa",
    ed_water_type: "Pętla wodna",
    ed_power_threshold: "Próg pracy (W)",
    ed_power_threshold_helper: "Moc, powyżej której mierzona pompa ciepła jest uznawana za pracującą",
    ed_outdoor_temp: "Temperatura zewnętrzna",
    ed_outdoor_temp_helper: "Czujnik lub encja pogodowa dla chipu zewnętrznego",
  },
  ro: {
    purifier: "Purificator de aer",
    fan: "Ventilator",
    aircon: "Aer condiționat",
    heatpump: "Pompă de căldură",
    humidifier: "Umidificator",
    dehumidifier: "Dezumidificator",
    g_humidifier: "Umiditate",
    st_humidifying: "Umidifică",
    st_drying: "Dezumidifică",
    st_diffusing: "Difuzează",
    spray: "Intensitatea difuzării",
    mood_light: "Lumină ambientală",
    light_level: "Luminozitate",
    color: "Culoare",
    tank_level: "Rezervor",
    bucket: "Recipient",
    tank_empty: "Rezervor gol",
    bucket_full: "Recipient plin",
    ill_column: "Coloană cu ultrasunete",
    ill_tank: "Rezervor transparent",
    ill_evaporative: "Evaporativ",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Difuzor de uleiuri esențiale",
    ill_rituals: "Rituals Perfume Genie (alamă)",
    ill_rituals_black: "Rituals Perfume Genie (negru)",
    cartridge: "Cartuș",
    cartridge_empty: "Cartuș gol",
    perfume: "Parfum",
    intensity: "Intensitate",
    battery: "Baterie",
    wifi: "Wi-Fi",
    room_size: "Dimensiunea camerei",
    ill_dehumidifier: "Dezumidificator",
    st_dhw: "Apă caldă",
    st_heating: "Încălzește",
    st_cooling: "Răcește",
    st_idle: "În așteptare",
    st_defrost: "Degivrare",
    tank: "Boiler",
    dhw_target: "Apă caldă",
    backup: "Rezistență de rezervă",
    zones: "Zone",
    st_off: "Oprit",
    st_on: "Pornit",
    st_unavailable: "Indisponibil",
    st_purifying: "Purificare",
    aq_good: "Aer bun",
    aq_moderate: "Aer moderat",
    aq_unhealthy: "Aer poluat",
    aq_bad: "Aer foarte poluat",
    speed: "Viteză",
    mode: "Mod",
    preset: "Presetare",
    colon: ": ",
    oscillation: "Oscilare",
    angle: "Unghi",
    timer: "Temporizator",
    timer_off: "Niciunul",
    child_lock: "Blocare copii",
    buzzer: "Sunet",
    light: "Indicator luminos",
    brightness: "Afișaj",
    anion: "Ionizator",
    sw_outdoor_silent: "Unitate exterioară silențioasă",
    sw_aux_heat: "Încălzire auxiliară",
    sw_frost: "Protecție la îngheț",
    sw_eco: "Eco",
    sw_display: "Afișaj",
    sw_sound: "Bip",
    sw_self_clean: "Autocurățare",
    sw_silent: "Silențios",
    sw_smart_eye: "Ochi inteligent",
    sw_anion: "Ionizator",
    sw_turbo: "Turbo",
    sw_breeze: "Briză",
    sw_sleep: "Somn",
    sw_light: "Indicator luminos",
    favorite: "Nivel favorit",
    voc: "COV",
    no2: "NO₂",
    filter: "Filtru",
    filter_low: "Înlocuiți filtrul",
    filter_dirty: "Curățați filtrul",
    filter_soon: "Înlocuiți filtrul în curând",
    filter_ok: "Filtru OK",
    filter_reset: "Resetați filtrul",
    filter_reset_confirm: "Atingeți din nou pentru confirmare",
    hours: "{n} h",
    level: "Nivel {n}",
    target: "Țintă",
    target_low: "Încălzire la",
    target_high: "Răcire la",
    target_humidity: "Umiditate țintă",
    outdoor: "Exterior",
    fan_mode: "Ventilație",
    swing_mode: "Baleiere",
    swing_horizontal_mode: "Baleiere orizontală",
    preset_mode: "Presetare",
    options: "Opțiuni",
    offline: "Dispozitiv offline",
    no_device: "Niciun dispozitiv găsit",
    power: "Pornire / oprire",
    zoom_in: "Afișează cardul complet",
    zoom_out: "Înapoi la vizualizarea compactă",
    rotate_left: "Rotire la stânga",
    rotate_right: "Rotire la dreapta",
    temp_down: "Scade ținta",
    temp_up: "Crește ținta",
    title: "Climă și aer",
    running_n: "Pornite: {n}",
    all_off: "Totul este oprit",
    nothing_on: "Nimic pornit acum",
    g_aircon: "Climatizoare",
    g_heatpump: "Pompe de căldură",
    g_purifier: "Purificatoare de aer",
    g_fan: "Ventilatoare",
    no_area: "Fără zonă",
    no_devices: "Nu s-a găsit niciun aparat de aer condiționat, purificator de aer sau ventilator",
    toggle: "Pornește / oprește",
    ed_entity: "Dispozitiv",
    ed_entity_helper: "Lăsați gol pentru a-l folosi pe primul găsit",
    ed_name: "Nume",
    ed_name_helper: "Lăsați gol pentru a folosi numele dispozitivului",
    ed_icon: "Pictogramă",
    ed_icon_helper: "Înlocuiește ilustrația",
    ed_illustration: "Ilustrație",
    ed_illustration_helper: "Automat: aleasă după modelul și numele dispozitivului",
    ill_auto: "Automat",
    ill_none: "Fără ilustrație (antet clasic)",
    ed_illustration_theme: "Tema ilustrației",
    theme_auto: "Automat (soare, temă întunecată)",
    theme_day: "Zi",
    theme_night: "Noapte",
    ill_tower: "Turn",
    ill_cylinder: "Rotund",
    ill_box: "Carcasă pătrată",
    ill_dyson: "Inel fără palete",
    ill_split: "Split de perete",
    ill_portable: "Aparat portabil",
    ill_window: "Split de fereastră",
    ill_portasplit: "Split portabil",
    ed_show_controls: "Comenzi",
    ed_show_title: "Titlu",
    ed_show_subtitle: "Subtitlu",
    ed_show_sensors: "Măsurători",
    ed_show_alerts: "Alerte",
    ed_show_filter: "Filtru",
    ed_filter_warning: "Prag de avertizare filtru (%)",
    ed_zoom: "Buton de detalii",
    ed_zoom_helper: "Buton din dreapta sus care comută mini-cardul în cardul complet și înapoi",
    ed_language: "Limbă",
    ed_language_helper: "Automat: urmează limba Home Assistant",
    ed_language_auto: "Automat",
    ed_advanced: "Avansat",
    ed_entities: "Entități",
    ed_entities_helper: "Detectate de pe dispozitiv; suprascrieți un rol aici, de ex. pm25: sensor.sufragerie_pm25",
    ed_title: "Titlu",
    ed_title_helper: "Lăsați gol pentru „Climă și aer”",
    ed_kinds: "Tipuri de dispozitive",
    ed_kinds_helper: "Ilustrația și pictograma tuturor dispozitivelor de un tip; o pictogramă înlocuiește ilustrația",
    ed_devs: "Dispozitive",
    ed_devs_helper: "Numele, tipul, ilustrația și pictograma fiecărui dispozitiv; gol: automat",
    ed_type: "Tip",
    ed_group_by: "Grupare",
    ed_group_type: "După tipul dispozitivului",
    ed_group_area: "După zonă",
    ed_group_none: "Fără",
    ed_columns: "Coloane",
    ed_columns_helper: "Gol: 2, sau 1 pe ecranele înguste",
    ed_ov_zoom_helper:
      "Se afișează doar dispozitivele pornite sau care necesită atenție; butonul afișează toate dispozitivele. Dezactivat: mereu toate dispozitivele",
    ed_show_all: "Afișează toate dispozitivele",
    ed_show_all_helper: "Toate dispozitivele apar de la început; butonul de detalii le păstrează doar pe cele pornite sau care necesită atenție",
    ed_exclude: "Dispozitive de exclus",
    ed_include: "Dispozitive de adăugat",
    ed_include_helper: "Entități climate sau fan pe care cardul nu le-ar alege singur (de ex. o entitate ascunsă)",
    src_air: "Aer (unitate exterioară)",
    src_ground: "Sol (geotermală)",
    src_water: "Apă (pânză freatică)",
    gt_collector: "Colector orizontal",
    gt_borehole: "Sondă verticală",
    wt_well: "Puț unic",
    wt_doublet: "Dublet de puțuri",
    wt_lake: "Buclă în lac / iaz",
    heat_power: "Putere termică",
    cop: "COP",
    cop_today: "COP azi",
    scop: "SCOP",
    flow_temp: "Tur",
    return_temp: "Retur",
    delta_t: "ΔT",
    flow_rate: "Debit",
    elec_energy: "Energie electrică",
    heat_energy: "Energie termică",
    ed_source: "Sursă",
    ed_source_helper: "Partea de sursă a pompei de căldură și ilustrația sa",
    ed_ground_type: "Buclă în sol",
    ed_water_type: "Buclă pe apă",
    ed_power_threshold: "Prag de funcționare (W)",
    ed_power_threshold_helper: "Puterea peste care o pompă de căldură măsurată este considerată în funcțiune",
    ed_outdoor_temp: "Temperatură exterioară",
    ed_outdoor_temp_helper: "Un senzor sau o entitate meteo pentru cipul exterior",
  },
  da: {
    purifier: "Luftrenser",
    fan: "Ventilator",
    aircon: "Klimaanlæg",
    heatpump: "Varmepumpe",
    humidifier: "Luftfugter",
    dehumidifier: "Affugter",
    g_humidifier: "Luftfugtighed",
    st_humidifying: "Fugter",
    st_drying: "Affugter",
    st_diffusing: "Spreder duft",
    spray: "Tågeintensitet",
    mood_light: "Stemningslys",
    light_level: "Lysstyrke",
    color: "Farve",
    tank_level: "Vandtank",
    bucket: "Beholder",
    tank_empty: "Vandtank tom",
    bucket_full: "Beholder fuld",
    ill_column: "Ultralydssøjle",
    ill_tank: "Gennemsigtig tank",
    ill_evaporative: "Fordampning",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Aromadiffuser",
    ill_rituals: "Rituals Perfume Genie (messing)",
    ill_rituals_black: "Rituals Perfume Genie (sort)",
    cartridge: "Patron",
    cartridge_empty: "Patron tom",
    perfume: "Duft",
    intensity: "Intensitet",
    battery: "Batteri",
    wifi: "Wi-Fi",
    room_size: "Rumstørrelse",
    ill_dehumidifier: "Affugter",
    st_dhw: "Varmt vand",
    st_heating: "Varmer",
    st_cooling: "Køler",
    st_idle: "Inaktiv",
    st_defrost: "Afrimning",
    tank: "Beholder",
    dhw_target: "Varmt vand",
    backup: "Elpatron",
    zones: "Zoner",
    st_off: "Slukket",
    st_on: "Tændt",
    st_unavailable: "Utilgængelig",
    st_purifying: "Renser",
    aq_good: "God luft",
    aq_moderate: "Moderat luft",
    aq_unhealthy: "Dårlig luft",
    aq_bad: "Meget dårlig luft",
    speed: "Hastighed",
    mode: "Tilstand",
    preset: "Forudindstilling",
    colon: ": ",
    oscillation: "Svingning",
    angle: "Vinkel",
    timer: "Timer",
    timer_off: "Ingen",
    child_lock: "Børnesikring",
    buzzer: "Lyd",
    light: "Indikatorlys",
    brightness: "Display",
    anion: "Ionisator",
    sw_outdoor_silent: "Stille udedel",
    sw_aux_heat: "Supplerende varme",
    sw_frost: "Frostbeskyttelse",
    sw_eco: "Eco",
    sw_display: "Display",
    sw_sound: "Bip",
    sw_self_clean: "Selvrensning",
    sw_silent: "Stille",
    sw_smart_eye: "Smart øje",
    sw_anion: "Ionisator",
    sw_turbo: "Turbo",
    sw_breeze: "Brise",
    sw_sleep: "Søvn",
    sw_light: "Indikatorlys",
    favorite: "Favoritniveau",
    voc: "VOC",
    no2: "NO₂",
    filter: "Filter",
    filter_low: "Udskift filteret",
    filter_dirty: "Rens filteret",
    filter_soon: "Udskift snart filteret",
    filter_ok: "Filter OK",
    filter_reset: "Nulstil filter",
    filter_reset_confirm: "Tryk igen for at bekræfte",
    hours: "{n} h",
    level: "Niveau {n}",
    target: "Mål",
    target_low: "Varm til",
    target_high: "Køl til",
    target_humidity: "Ønsket luftfugtighed",
    outdoor: "Ude",
    fan_mode: "Blæser",
    swing_mode: "Lameller",
    swing_horizontal_mode: "Vandrette lameller",
    preset_mode: "Forudindstilling",
    options: "Valg",
    offline: "Enhed offline",
    no_device: "Ingen enhed fundet",
    power: "Tænd / sluk",
    zoom_in: "Vis hele kortet",
    zoom_out: "Tilbage til kompakt visning",
    rotate_left: "Drej til venstre",
    rotate_right: "Drej til højre",
    temp_down: "Sænk måltemperaturen",
    temp_up: "Hæv måltemperaturen",
    title: "Klima og luft",
    running_n: "{n} tændt",
    all_off: "Alt er slukket",
    nothing_on: "Intet er tændt lige nu",
    g_aircon: "Klimaanlæg",
    g_heatpump: "Varmepumper",
    g_purifier: "Luftrensere",
    g_fan: "Ventilatorer",
    no_area: "Intet område",
    no_devices: "Ingen klimaanlæg, luftrensere eller ventilatorer fundet",
    toggle: "Tænd / sluk",
    ed_entity: "Enhed",
    ed_entity_helper: "Lad feltet stå tomt for at bruge den første, der findes",
    ed_name: "Navn",
    ed_name_helper: "Lad feltet stå tomt for at bruge enhedens navn",
    ed_icon: "Ikon",
    ed_icon_helper: "Erstatter illustrationen",
    ed_illustration: "Illustration",
    ed_illustration_helper: "Automatisk: valgt ud fra enhedens model og navn",
    ill_auto: "Automatisk",
    ill_none: "Ingen illustration (klassisk overskrift)",
    ed_illustration_theme: "Illustrationstema",
    theme_auto: "Automatisk (sol, mørkt tema)",
    theme_day: "Dag",
    theme_night: "Nat",
    ill_tower: "Tårn",
    ill_cylinder: "Rund",
    ill_box: "Firkantet kabinet",
    ill_dyson: "Ring uden vinger",
    ill_split: "Vægmonteret split",
    ill_portable: "Mobilt anlæg",
    ill_window: "Vinduessplit",
    ill_portasplit: "Bærbar split",
    ed_show_controls: "Betjening",
    ed_show_title: "Titel",
    ed_show_subtitle: "Undertitel",
    ed_show_sensors: "Målinger",
    ed_show_alerts: "Advarsler",
    ed_show_filter: "Filter",
    ed_filter_warning: "Advarselsgrænse for filter (%)",
    ed_zoom: "Detaljeknap",
    ed_zoom_helper: "Knap øverst til højre, der skifter minikortet til hele kortet og tilbage",
    ed_language: "Sprog",
    ed_language_helper: "Automatisk: følger Home Assistants sprog",
    ed_language_auto: "Automatisk",
    ed_advanced: "Avanceret",
    ed_entities: "Entiteter",
    ed_entities_helper: "Fundet på enheden; tilsidesæt en rolle her, f.eks. pm25: sensor.stue_pm25",
    ed_title: "Titel",
    ed_title_helper: "Lad feltet stå tomt for »Klima og luft«",
    ed_kinds: "Enhedstyper",
    ed_kinds_helper: "Illustrationen og ikonet for alle enheder af en type; et ikon erstatter illustrationen",
    ed_devs: "Enheder",
    ed_devs_helper: "Navn, type, illustration og ikon for hver enhed; tomt: automatisk",
    ed_type: "Type",
    ed_group_by: "Gruppering",
    ed_group_type: "Efter enhedstype",
    ed_group_area: "Efter område",
    ed_group_none: "Ingen",
    ed_columns: "Kolonner",
    ed_columns_helper: "Tomt: 2, eller 1 på smalle skærme",
    ed_ov_zoom_helper:
      "Kun enheder, der er tændt eller kræver opmærksomhed, vises; knappen viser alle enheder. Fra: altid alle enheder",
    ed_show_all: "Vis alle enheder",
    ed_show_all_helper: "Alle enheder vises fra start; detaljeknappen beholder kun dem, der er tændt eller kræver opmærksomhed",
    ed_exclude: "Enheder, der udelades",
    ed_include: "Enheder, der tilføjes",
    ed_include_helper: "Climate- eller fan-entiteter, som kortet ikke selv ville vælge (f.eks. en skjult entitet)",
    src_air: "Luft (udendørsenhed)",
    src_ground: "Jord (geotermisk)",
    src_water: "Vand (grundvand)",
    gt_collector: "Vandret jordslange",
    gt_borehole: "Lodret boring",
    wt_well: "Enkelt brønd",
    wt_doublet: "Brøndpar",
    wt_lake: "Sløjfe i sø / dam",
    heat_power: "Varmeeffekt",
    cop: "COP",
    cop_today: "COP i dag",
    scop: "SCOP",
    flow_temp: "Fremløb",
    return_temp: "Returløb",
    delta_t: "ΔT",
    flow_rate: "Flow",
    elec_energy: "Elektrisk energi",
    heat_energy: "Varmeenergi",
    ed_source: "Kilde",
    ed_source_helper: "Varmepumpens kildeside og dens illustration",
    ed_ground_type: "Jordsløjfe",
    ed_water_type: "Vandsløjfe",
    ed_power_threshold: "Driftsgrænse (W)",
    ed_power_threshold_helper: "Effekt, over hvilken en målt varmepumpe tæller som kørende",
    ed_outdoor_temp: "Udetemperatur",
    ed_outdoor_temp_helper: "En sensor eller vejr-entitet til udendørschippen",
  },
  sv: {
    purifier: "Luftrenare",
    fan: "Fläkt",
    aircon: "Luftkonditionering",
    heatpump: "Värmepump",
    humidifier: "Luftfuktare",
    dehumidifier: "Avfuktare",
    g_humidifier: "Luftfuktighet",
    st_humidifying: "Fuktar",
    st_drying: "Avfuktar",
    st_diffusing: "Sprider doft",
    spray: "Dimintensitet",
    mood_light: "Stämningsljus",
    light_level: "Ljusstyrka",
    color: "Färg",
    tank_level: "Vattentank",
    bucket: "Behållare",
    tank_empty: "Vattentank tom",
    bucket_full: "Behållare full",
    ill_column: "Ultraljudspelare",
    ill_tank: "Genomskinlig tank",
    ill_evaporative: "Avdunstning",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Doftspridare",
    ill_rituals: "Rituals Perfume Genie (mässing)",
    ill_rituals_black: "Rituals Perfume Genie (svart)",
    cartridge: "Patron",
    cartridge_empty: "Patron tom",
    perfume: "Doft",
    intensity: "Intensitet",
    battery: "Batteri",
    wifi: "Wi-Fi",
    room_size: "Rumsstorlek",
    ill_dehumidifier: "Avfuktare",
    st_dhw: "Varmvatten",
    st_heating: "Värmer",
    st_cooling: "Kyler",
    st_idle: "Vilar",
    st_defrost: "Avfrostning",
    tank: "Tank",
    dhw_target: "Varmvatten",
    backup: "Elpatron",
    zones: "Zoner",
    st_off: "Av",
    st_on: "På",
    st_unavailable: "Ej tillgänglig",
    st_purifying: "Renar",
    aq_good: "Bra luft",
    aq_moderate: "Måttlig luft",
    aq_unhealthy: "Dålig luft",
    aq_bad: "Mycket dålig luft",
    speed: "Hastighet",
    mode: "Läge",
    preset: "Förinställning",
    colon: ": ",
    oscillation: "Oscillering",
    angle: "Vinkel",
    timer: "Timer",
    timer_off: "Ingen",
    child_lock: "Barnlås",
    buzzer: "Ljud",
    light: "Indikatorlampa",
    brightness: "Display",
    anion: "Jonisator",
    sw_outdoor_silent: "Tyst utedel",
    sw_aux_heat: "Tillsatsvärme",
    sw_frost: "Frostskydd",
    sw_eco: "Eco",
    sw_display: "Display",
    sw_sound: "Pip",
    sw_self_clean: "Självrengöring",
    sw_silent: "Tyst",
    sw_smart_eye: "Smart öga",
    sw_anion: "Jonisator",
    sw_turbo: "Turbo",
    sw_breeze: "Bris",
    sw_sleep: "Sömn",
    sw_light: "Indikatorlampa",
    favorite: "Favoritnivå",
    voc: "VOC",
    no2: "NO₂",
    filter: "Filter",
    filter_low: "Byt filtret",
    filter_dirty: "Rengör filtret",
    filter_soon: "Byt filtret snart",
    filter_ok: "Filter OK",
    filter_reset: "Återställ filter",
    filter_reset_confirm: "Tryck igen för att bekräfta",
    hours: "{n} h",
    level: "Nivå {n}",
    target: "Mål",
    target_low: "Värm till",
    target_high: "Kyl till",
    target_humidity: "Önskad luftfuktighet",
    outdoor: "Ute",
    fan_mode: "Fläkt",
    swing_mode: "Svängning",
    swing_horizontal_mode: "Horisontell svängning",
    preset_mode: "Förinställning",
    options: "Alternativ",
    offline: "Enheten är offline",
    no_device: "Ingen enhet hittades",
    power: "På / av",
    zoom_in: "Visa hela kortet",
    zoom_out: "Tillbaka till kompakt vy",
    rotate_left: "Vrid åt vänster",
    rotate_right: "Vrid åt höger",
    temp_down: "Sänk måltemperaturen",
    temp_up: "Höj måltemperaturen",
    title: "Klimat och luft",
    running_n: "{n} på",
    all_off: "Allt är avstängt",
    nothing_on: "Inget är på just nu",
    g_aircon: "Luftkonditioneringar",
    g_heatpump: "Värmepumpar",
    g_purifier: "Luftrenare",
    g_fan: "Fläktar",
    no_area: "Inget område",
    no_devices: "Ingen luftkonditionering, luftrenare eller fläkt hittades",
    toggle: "Slå på / av",
    ed_entity: "Enhet",
    ed_entity_helper: "Lämna tomt för att använda den första som hittas",
    ed_name: "Namn",
    ed_name_helper: "Lämna tomt för att använda enhetens namn",
    ed_icon: "Ikon",
    ed_icon_helper: "Ersätter illustrationen",
    ed_illustration: "Illustration",
    ed_illustration_helper: "Automatisk: väljs utifrån enhetens modell och namn",
    ill_auto: "Automatisk",
    ill_none: "Ingen illustration (klassisk rubrik)",
    ed_illustration_theme: "Illustrationstema",
    theme_auto: "Automatiskt (sol, mörkt tema)",
    theme_day: "Dag",
    theme_night: "Natt",
    ill_tower: "Torn",
    ill_cylinder: "Rund",
    ill_box: "Fyrkantig låda",
    ill_dyson: "Ring utan blad",
    ill_split: "Väggmonterad split",
    ill_portable: "Portabel enhet",
    ill_window: "Fönstersplit",
    ill_portasplit: "Bärbar split",
    ed_show_controls: "Reglage",
    ed_show_title: "Rubrik",
    ed_show_subtitle: "Underrubrik",
    ed_show_sensors: "Mätvärden",
    ed_show_alerts: "Varningar",
    ed_show_filter: "Filter",
    ed_filter_warning: "Varningsgräns för filter (%)",
    ed_zoom: "Detaljknapp",
    ed_zoom_helper: "Knapp uppe till höger som växlar minikortet till hela kortet och tillbaka",
    ed_language: "Språk",
    ed_language_helper: "Automatisk: följer Home Assistants språk",
    ed_language_auto: "Automatisk",
    ed_advanced: "Avancerat",
    ed_entities: "Entiteter",
    ed_entities_helper: "Hittade på enheten; åsidosätt en roll här, t.ex. pm25: sensor.vardagsrum_pm25",
    ed_title: "Rubrik",
    ed_title_helper: "Lämna tomt för ”Klimat och luft”",
    ed_kinds: "Enhetstyper",
    ed_kinds_helper: "Illustrationen och ikonen för alla enheter av en typ; en ikon ersätter illustrationen",
    ed_devs: "Enheter",
    ed_devs_helper: "Namn, typ, illustration och ikon för varje enhet; tomt: automatiskt",
    ed_type: "Typ",
    ed_group_by: "Gruppering",
    ed_group_type: "Efter enhetstyp",
    ed_group_area: "Efter område",
    ed_group_none: "Ingen",
    ed_columns: "Kolumner",
    ed_columns_helper: "Tomt: 2, eller 1 på smala skärmar",
    ed_ov_zoom_helper:
      "Endast enheter som är på eller behöver uppmärksamhet visas; knappen visar alla enheter. Av: alltid alla enheter",
    ed_show_all: "Visa alla enheter",
    ed_show_all_helper: "Alla enheter visas direkt; detaljknappen behåller bara de som är på eller behöver åtgärdas",
    ed_exclude: "Enheter att utesluta",
    ed_include: "Enheter att lägga till",
    ed_include_helper: "Climate- eller fan-entiteter som kortet inte skulle välja självt (t.ex. en dold entitet)",
    src_air: "Luft (utomhusenhet)",
    src_ground: "Mark (bergvärme)",
    src_water: "Vatten (grundvatten)",
    gt_collector: "Horisontell kollektor",
    gt_borehole: "Vertikalt borrhål",
    wt_well: "Enskild brunn",
    wt_doublet: "Brunnspar",
    wt_lake: "Slinga i sjö / damm",
    heat_power: "Värmeeffekt",
    cop: "COP",
    cop_today: "COP idag",
    scop: "SCOP",
    flow_temp: "Framledning",
    return_temp: "Retur",
    delta_t: "ΔT",
    flow_rate: "Flöde",
    elec_energy: "Elektrisk energi",
    heat_energy: "Värmeenergi",
    ed_source: "Källa",
    ed_source_helper: "Värmepumpens källsida och dess illustration",
    ed_ground_type: "Markslinga",
    ed_water_type: "Vattenslinga",
    ed_power_threshold: "Driftgräns (W)",
    ed_power_threshold_helper: "Effekt över vilken en mätt värmepump räknas som igång",
    ed_outdoor_temp: "Utomhustemperatur",
    ed_outdoor_temp_helper: "En sensor eller väderentitet för utomhuschippet",
  },
  bg: {
    purifier: "Пречиствател на въздух",
    fan: "Вентилатор",
    aircon: "Климатик",
    heatpump: "Термопомпа",
    humidifier: "Овлажнител",
    dehumidifier: "Изсушител",
    g_humidifier: "Влажност",
    st_humidifying: "Овлажнява",
    st_drying: "Изсушава",
    st_diffusing: "Разпръсква",
    spray: "Интензитет на разпръскване",
    mood_light: "Амбиентна светлина",
    light_level: "Яркост",
    color: "Цвят",
    tank_level: "Резервоар",
    bucket: "Съд",
    tank_empty: "Резервоарът е празен",
    bucket_full: "Съдът е пълен",
    ill_column: "Ултразвукова колона",
    ill_tank: "Прозрачен резервоар",
    ill_evaporative: "Изпарителен",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Дифузер за етерични масла",
    ill_rituals: "Rituals Perfume Genie (месинг)",
    ill_rituals_black: "Rituals Perfume Genie (черен)",
    cartridge: "Патрон",
    cartridge_empty: "Празен патрон",
    perfume: "Аромат",
    intensity: "Интензитет",
    battery: "Батерия",
    wifi: "Wi-Fi",
    room_size: "Размер на стаята",
    ill_dehumidifier: "Изсушител",
    st_dhw: "Топла вода",
    st_heating: "Отоплява",
    st_cooling: "Охлажда",
    st_idle: "В готовност",
    st_defrost: "Размразяване",
    tank: "Бойлер",
    dhw_target: "Топла вода",
    backup: "Допълнителен нагревател",
    zones: "Зони",
    st_off: "Изключен",
    st_on: "Включен",
    st_unavailable: "Недостъпен",
    st_purifying: "Пречистване",
    aq_good: "Добър въздух",
    aq_moderate: "Умерен въздух",
    aq_unhealthy: "Лош въздух",
    aq_bad: "Много лош въздух",
    speed: "Скорост",
    mode: "Режим",
    preset: "Профил",
    colon: ": ",
    oscillation: "Осцилиране",
    angle: "Ъгъл",
    timer: "Таймер",
    timer_off: "Няма",
    child_lock: "Детска защита",
    buzzer: "Звук",
    light: "Индикатор",
    brightness: "Дисплей",
    anion: "Йонизатор",
    sw_outdoor_silent: "Тихо външно тяло",
    sw_aux_heat: "Допълнително отопление",
    sw_frost: "Защита от замръзване",
    sw_eco: "Еко",
    sw_display: "Дисплей",
    sw_sound: "Звуков сигнал",
    sw_self_clean: "Самопочистване",
    sw_silent: "Тих режим",
    sw_smart_eye: "Интелигентно око",
    sw_anion: "Йонизатор",
    sw_turbo: "Турбо",
    sw_breeze: "Бриз",
    sw_sleep: "Сън",
    sw_light: "Индикатор",
    favorite: "Любимо ниво",
    voc: "ЛОС",
    no2: "NO₂",
    filter: "Филтър",
    filter_low: "Сменете филтъра",
    filter_dirty: "Почистете филтъра",
    filter_soon: "Сменете филтъра скоро",
    filter_ok: "Филтърът е наред",
    filter_reset: "Нулиране на филтъра",
    filter_reset_confirm: "Докоснете отново за потвърждение",
    hours: "{n} h",
    level: "Ниво {n}",
    target: "Цел",
    target_low: "Отопление до",
    target_high: "Охлаждане до",
    target_humidity: "Желана влажност",
    outdoor: "Навън",
    fan_mode: "Вентилатор",
    swing_mode: "Люлеене",
    swing_horizontal_mode: "Хоризонтално люлеене",
    preset_mode: "Предварителна настройка",
    options: "Опции",
    offline: "Няма връзка",
    no_device: "Не е намерено устройство",
    power: "Вкл. / изкл.",
    zoom_in: "Показване на цялата карта",
    zoom_out: "Обратно към компактния изглед",
    rotate_left: "Завъртане наляво",
    rotate_right: "Завъртане надясно",
    temp_down: "Понижаване на целевата температура",
    temp_up: "Повишаване на целевата температура",
    title: "Климат и въздух",
    running_n: "Включени: {n}",
    all_off: "Всичко е изключено",
    nothing_on: "В момента нищо не е включено",
    g_aircon: "Климатици",
    g_heatpump: "Термопомпи",
    g_purifier: "Пречистватели",
    g_fan: "Вентилатори",
    no_area: "Без област",
    no_devices: "Не е намерен климатик, пречиствател на въздух или вентилатор",
    toggle: "Включване / изключване",
    ed_entity: "Устройство",
    ed_entity_helper: "Оставете празно, за да се използва първото намерено",
    ed_name: "Име",
    ed_name_helper: "Оставете празно, за да се използва името на устройството",
    ed_icon: "Икона",
    ed_icon_helper: "Заменя илюстрацията",
    ed_illustration: "Илюстрация",
    ed_illustration_helper: "Автоматично: избира се според модела и името на устройството",
    ill_auto: "Автоматично",
    ill_none: "Без илюстрация (класическа заглавка)",
    ed_illustration_theme: "Тема на илюстрацията",
    theme_auto: "Автоматично (слънце, тъмна тема)",
    theme_day: "Ден",
    theme_night: "Нощ",
    ill_tower: "Колона",
    ill_cylinder: "Кръгъл",
    ill_box: "Квадратна кутия",
    ill_dyson: "Пръстен без перки",
    ill_split: "Стенен сплит",
    ill_portable: "Мобилен климатик",
    ill_window: "Прозоречен сплит",
    ill_portasplit: "Преносим сплит",
    ed_show_controls: "Управление",
    ed_show_title: "Заглавие",
    ed_show_subtitle: "Подзаглавие",
    ed_show_sensors: "Измервания",
    ed_show_alerts: "Предупреждения",
    ed_show_filter: "Филтър",
    ed_filter_warning: "Праг за предупреждение за филтъра (%)",
    ed_zoom: "Бутон за подробности",
    ed_zoom_helper: "Бутон горе вдясно, който превключва мини картата към пълната карта и обратно",
    ed_language: "Език",
    ed_language_helper: "Автоматично: следва езика на Home Assistant",
    ed_language_auto: "Автоматично",
    ed_advanced: "Разширени",
    ed_entities: "Обекти",
    ed_entities_helper: "Открити от устройството; тук може да се замени роля, напр. pm25: sensor.hol_pm25",
    ed_title: "Заглавие",
    ed_title_helper: "Оставете празно за „Климат и въздух“",
    ed_kinds: "Типове устройства",
    ed_kinds_helper: "Илюстрацията и иконата на всички устройства от даден тип; иконата заменя илюстрацията",
    ed_devs: "Устройства",
    ed_devs_helper: "Име, тип, илюстрация и икона на всяко устройство; празно: автоматично",
    ed_type: "Тип",
    ed_group_by: "Групиране",
    ed_group_type: "По тип устройство",
    ed_group_area: "По област",
    ed_group_none: "Без",
    ed_columns: "Колони",
    ed_columns_helper: "Празно: 2 или 1 на тесни екрани",
    ed_ov_zoom_helper:
      "Показват се само включените устройства или тези, които изискват внимание; бутонът показва всички устройства. Изключено: винаги всички устройства",
    ed_show_all: "Покажи всички устройства",
    ed_show_all_helper: "Всички устройства се показват веднага; бутонът за детайли оставя само включените или изискващите внимание",
    ed_exclude: "Устройства за изключване",
    ed_include: "Устройства за добавяне",
    ed_include_helper: "Обекти climate или fan, които картата не би избрала сама (напр. скрит обект)",
    src_air: "Въздух (външно тяло)",
    src_ground: "Геотермална (почва)",
    src_water: "Вода (подпочвена)",
    gt_collector: "Хоризонтален колектор",
    gt_borehole: "Вертикална сонда",
    wt_well: "Единичен кладенец",
    wt_doublet: "Двойка кладенци",
    wt_lake: "Контур в езеро",
    heat_power: "Топлинна мощност",
    cop: "COP",
    cop_today: "COP днес",
    scop: "SCOP",
    flow_temp: "Подаване",
    return_temp: "Връщане",
    delta_t: "ΔT",
    flow_rate: "Дебит",
    elec_energy: "Електрическа енергия",
    heat_energy: "Топлинна енергия",
    ed_source: "Източник",
    ed_source_helper: "Страната на източника на термопомпата и нейната илюстрация",
    ed_ground_type: "Почвен контур",
    ed_water_type: "Воден контур",
    ed_power_threshold: "Праг на работа (W)",
    ed_power_threshold_helper: "Мощност, над която измервана термопомпа се счита за работеща",
    ed_outdoor_temp: "Външна температура",
    ed_outdoor_temp_helper: "Сензор или метеорологичен обект за външния чип",
  },
  ru: {
    purifier: "Очиститель воздуха",
    fan: "Вентилятор",
    aircon: "Кондиционер",
    heatpump: "Тепловой насос",
    humidifier: "Увлажнитель",
    dehumidifier: "Осушитель",
    g_humidifier: "Влажность",
    st_humidifying: "Увлажняет",
    st_drying: "Осушает",
    st_diffusing: "Распыляет",
    spray: "Интенсивность распыления",
    mood_light: "Атмосферная подсветка",
    light_level: "Яркость",
    color: "Цвет",
    tank_level: "Бак",
    bucket: "Резервуар",
    tank_empty: "Бак пуст",
    bucket_full: "Резервуар полон",
    ill_column: "Ультразвуковая колонна",
    ill_tank: "Прозрачный бак",
    ill_evaporative: "Испарительный",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Аромадиффузор",
    ill_rituals: "Rituals Perfume Genie (латунь)",
    ill_rituals_black: "Rituals Perfume Genie (чёрный)",
    cartridge: "Картридж",
    cartridge_empty: "Картридж пуст",
    perfume: "Аромат",
    intensity: "Интенсивность",
    battery: "Батарея",
    wifi: "Wi-Fi",
    room_size: "Размер комнаты",
    ill_dehumidifier: "Осушитель",
    st_dhw: "Горячая вода",
    st_heating: "Нагрев",
    st_cooling: "Охлаждение",
    st_idle: "Ожидание",
    st_defrost: "Оттаивание",
    tank: "Бойлер",
    dhw_target: "Горячая вода",
    backup: "Резервный нагреватель",
    zones: "Зоны",
    st_off: "Выключено",
    st_on: "Включено",
    st_unavailable: "Недоступно",
    st_purifying: "Очистка",
    aq_good: "Воздух хороший",
    aq_moderate: "Воздух средний",
    aq_unhealthy: "Воздух плохой",
    aq_bad: "Воздух очень плохой",
    speed: "Скорость",
    mode: "Режим",
    preset: "Предустановка",
    colon: ": ",
    oscillation: "Поворот",
    angle: "Угол",
    timer: "Таймер",
    timer_off: "Нет",
    child_lock: "Защита от детей",
    buzzer: "Звук",
    light: "Индикатор",
    brightness: "Дисплей",
    anion: "Ионизатор",
    sw_outdoor_silent: "Тихий наружный блок",
    sw_aux_heat: "Дополнительный обогрев",
    sw_frost: "Защита от замерзания",
    sw_eco: "Эко",
    sw_display: "Дисплей",
    sw_sound: "Звуковой сигнал",
    sw_self_clean: "Самоочистка",
    sw_silent: "Тихий режим",
    sw_smart_eye: "Умный глаз",
    sw_anion: "Ионизатор",
    sw_turbo: "Турбо",
    sw_breeze: "Бриз",
    sw_sleep: "Сон",
    sw_light: "Индикатор",
    favorite: "Любимый уровень",
    voc: "ЛОС",
    no2: "NO₂",
    filter: "Фильтр",
    filter_low: "Замените фильтр",
    filter_dirty: "Очистите фильтр",
    filter_soon: "Скоро замените фильтр",
    filter_ok: "Фильтр в норме",
    filter_reset: "Сбросить фильтр",
    filter_reset_confirm: "Нажмите ещё раз для подтверждения",
    hours: "{n} h",
    level: "Уровень {n}",
    target: "Цель",
    target_low: "Нагрев до",
    target_high: "Охлаждение до",
    target_humidity: "Целевая влажность",
    outdoor: "На улице",
    fan_mode: "Обдув",
    swing_mode: "Качание жалюзи",
    swing_horizontal_mode: "Горизонтальное качание",
    preset_mode: "Предустановка",
    options: "Параметры",
    offline: "Не в сети",
    no_device: "Устройство не найдено",
    power: "Вкл. / выкл.",
    zoom_in: "Показать полную карточку",
    zoom_out: "Вернуться к компактному виду",
    rotate_left: "Повернуть влево",
    rotate_right: "Повернуть вправо",
    temp_down: "Понизить целевую температуру",
    temp_up: "Повысить целевую температуру",
    title: "Климат и воздух",
    running_n: "Включено: {n}",
    all_off: "Всё выключено",
    nothing_on: "Сейчас ничего не включено",
    g_aircon: "Кондиционеры",
    g_heatpump: "Тепловые насосы",
    g_purifier: "Очистители воздуха",
    g_fan: "Вентиляторы",
    no_area: "Без пространства",
    no_devices: "Не найдено ни кондиционеров, ни очистителей воздуха, ни вентиляторов",
    toggle: "Включить / выключить",
    ed_entity: "Устройство",
    ed_entity_helper: "Оставьте пустым, чтобы использовать первое найденное",
    ed_name: "Название",
    ed_name_helper: "Оставьте пустым, чтобы использовать название устройства",
    ed_icon: "Значок",
    ed_icon_helper: "Заменяет иллюстрацию",
    ed_illustration: "Иллюстрация",
    ed_illustration_helper: "Автоматически: по модели и названию устройства",
    ill_auto: "Автоматически",
    ill_none: "Без иллюстрации (классический заголовок)",
    ed_illustration_theme: "Тема иллюстрации",
    theme_auto: "Автоматически (солнце, тёмная тема)",
    theme_day: "День",
    theme_night: "Ночь",
    ill_tower: "Колонна",
    ill_cylinder: "Круглый",
    ill_box: "Квадратный корпус",
    ill_dyson: "Безлопастное кольцо",
    ill_split: "Настенная сплит-система",
    ill_portable: "Мобильный кондиционер",
    ill_window: "Оконная сплит-система",
    ill_portasplit: "Портативная сплит-система",
    ed_show_controls: "Управление",
    ed_show_title: "Заголовок",
    ed_show_subtitle: "Подзаголовок",
    ed_show_sensors: "Измерения",
    ed_show_alerts: "Оповещения",
    ed_show_filter: "Фильтр",
    ed_filter_warning: "Порог предупреждения о фильтре (%)",
    ed_zoom: "Кнопка подробностей",
    ed_zoom_helper: "Кнопка в правом верхнем углу, переключающая мини-карточку на полную карточку и обратно",
    ed_language: "Язык",
    ed_language_helper: "Автоматически: язык Home Assistant",
    ed_language_auto: "Автоматически",
    ed_advanced: "Дополнительно",
    ed_entities: "Объекты",
    ed_entities_helper: "Определены по устройству; здесь можно переопределить роль, например pm25: sensor.gostinaya_pm25",
    ed_title: "Заголовок",
    ed_title_helper: "Оставьте пустым для «Климат и воздух»",
    ed_kinds: "Типы устройств",
    ed_kinds_helper: "Иллюстрация и значок всех устройств одного типа; значок заменяет иллюстрацию",
    ed_devs: "Устройства",
    ed_devs_helper: "Название, тип, иллюстрация и значок каждого устройства; пусто: автоматически",
    ed_type: "Тип",
    ed_group_by: "Группировка",
    ed_group_type: "По типу устройства",
    ed_group_area: "По пространству",
    ed_group_none: "Нет",
    ed_columns: "Столбцы",
    ed_columns_helper: "Пусто: 2 или 1 на узких экранах",
    ed_ov_zoom_helper:
      "Показываются только включённые устройства и те, что требуют внимания; кнопка показывает все устройства. Выключено: всегда все устройства",
    ed_show_all: "Показывать все устройства",
    ed_show_all_helper: "Все устройства видны сразу; кнопка подробностей оставляет только включённые или требующие внимания",
    ed_exclude: "Исключить устройства",
    ed_include: "Добавить устройства",
    ed_include_helper: "Объекты climate или fan, которые карточка не выбрала бы сама (например, скрытый объект)",
    src_air: "Воздух (наружный блок)",
    src_ground: "Грунт (геотермальный)",
    src_water: "Вода (грунтовая)",
    gt_collector: "Горизонтальный коллектор",
    gt_borehole: "Вертикальный зонд",
    wt_well: "Одиночная скважина",
    wt_doublet: "Дублет скважин",
    wt_lake: "Контур в озере / пруду",
    heat_power: "Тепловая мощность",
    cop: "COP",
    cop_today: "COP за сегодня",
    scop: "SCOP",
    flow_temp: "Подача",
    return_temp: "Обратка",
    delta_t: "ΔT",
    flow_rate: "Расход",
    elec_energy: "Электрическая энергия",
    heat_energy: "Тепловая энергия",
    ed_source: "Источник",
    ed_source_helper: "Сторона источника теплового насоса и его иллюстрация",
    ed_ground_type: "Грунтовый контур",
    ed_water_type: "Водяной контур",
    ed_power_threshold: "Порог работы (Вт)",
    ed_power_threshold_helper: "Мощность, выше которой измеряемый тепловой насос считается работающим",
    ed_outdoor_temp: "Наружная температура",
    ed_outdoor_temp_helper: "Датчик или объект погоды для наружного чипа",
  },
  uk: {
    purifier: "Очищувач повітря",
    fan: "Вентилятор",
    aircon: "Кондиціонер",
    heatpump: "Тепловий насос",
    humidifier: "Зволожувач",
    dehumidifier: "Осушувач",
    g_humidifier: "Вологість",
    st_humidifying: "Зволожує",
    st_drying: "Осушує",
    st_diffusing: "Розпилює",
    spray: "Інтенсивність розпилення",
    mood_light: "Атмосферне підсвічування",
    light_level: "Яскравість",
    color: "Колір",
    tank_level: "Бак",
    bucket: "Резервуар",
    tank_empty: "Бак порожній",
    bucket_full: "Резервуар повний",
    ill_column: "Ультразвукова колона",
    ill_tank: "Прозорий бак",
    ill_evaporative: "Випарний",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Аромадифузор",
    ill_rituals: "Rituals Perfume Genie (латунь)",
    ill_rituals_black: "Rituals Perfume Genie (чорний)",
    cartridge: "Картридж",
    cartridge_empty: "Картридж порожній",
    perfume: "Аромат",
    intensity: "Інтенсивність",
    battery: "Батарея",
    wifi: "Wi-Fi",
    room_size: "Розмір кімнати",
    ill_dehumidifier: "Осушувач",
    st_dhw: "Гаряча вода",
    st_heating: "Нагрів",
    st_cooling: "Охолодження",
    st_idle: "Очікування",
    st_defrost: "Відтавання",
    tank: "Бойлер",
    dhw_target: "Гаряча вода",
    backup: "Резервний нагрівач",
    zones: "Зони",
    st_off: "Вимкнено",
    st_on: "Увімкнено",
    st_unavailable: "Недоступно",
    st_purifying: "Очищення",
    aq_good: "Повітря добре",
    aq_moderate: "Повітря помірне",
    aq_unhealthy: "Повітря погане",
    aq_bad: "Повітря дуже погане",
    speed: "Швидкість",
    mode: "Режим",
    preset: "Передналаштування",
    colon: ": ",
    oscillation: "Поворот",
    angle: "Кут",
    timer: "Таймер",
    timer_off: "Немає",
    child_lock: "Захист від дітей",
    buzzer: "Звук",
    light: "Індикатор",
    brightness: "Дисплей",
    anion: "Іонізатор",
    sw_outdoor_silent: "Тихий зовнішній блок",
    sw_aux_heat: "Додатковий обігрів",
    sw_frost: "Захист від замерзання",
    sw_eco: "Еко",
    sw_display: "Дисплей",
    sw_sound: "Звуковий сигнал",
    sw_self_clean: "Самоочищення",
    sw_silent: "Тихий режим",
    sw_smart_eye: "Розумне око",
    sw_anion: "Іонізатор",
    sw_turbo: "Турбо",
    sw_breeze: "Бриз",
    sw_sleep: "Сон",
    sw_light: "Індикатор",
    favorite: "Улюблений рівень",
    voc: "ЛОС",
    no2: "NO₂",
    filter: "Фільтр",
    filter_low: "Замініть фільтр",
    filter_dirty: "Очистьте фільтр",
    filter_soon: "Незабаром замініть фільтр",
    filter_ok: "Фільтр у нормі",
    filter_reset: "Скинути фільтр",
    filter_reset_confirm: "Торкніться ще раз для підтвердження",
    hours: "{n} h",
    level: "Рівень {n}",
    target: "Ціль",
    target_low: "Нагрів до",
    target_high: "Охолодження до",
    target_humidity: "Цільова вологість",
    outdoor: "Надворі",
    fan_mode: "Обдув",
    swing_mode: "Хитання жалюзі",
    swing_horizontal_mode: "Горизонтальне хитання",
    preset_mode: "Попереднє налаштування",
    options: "Параметри",
    offline: "Не в мережі",
    no_device: "Пристрій не знайдено",
    power: "Увімк. / вимк.",
    zoom_in: "Показати повну картку",
    zoom_out: "Повернутися до компактного вигляду",
    rotate_left: "Повернути ліворуч",
    rotate_right: "Повернути праворуч",
    temp_down: "Знизити цільову температуру",
    temp_up: "Підвищити цільову температуру",
    title: "Клімат і повітря",
    running_n: "Увімкнено: {n}",
    all_off: "Усе вимкнено",
    nothing_on: "Зараз нічого не ввімкнено",
    g_aircon: "Кондиціонери",
    g_heatpump: "Теплові насоси",
    g_purifier: "Очищувачі повітря",
    g_fan: "Вентилятори",
    no_area: "Без приміщення",
    no_devices: "Не знайдено жодного кондиціонера, очищувача повітря чи вентилятора",
    toggle: "Увімкнути / вимкнути",
    ed_entity: "Пристрій",
    ed_entity_helper: "Залиште порожнім, щоб використати перший знайдений",
    ed_name: "Назва",
    ed_name_helper: "Залиште порожнім, щоб використати назву пристрою",
    ed_icon: "Значок",
    ed_icon_helper: "Замінює ілюстрацію",
    ed_illustration: "Ілюстрація",
    ed_illustration_helper: "Автоматично: за моделлю та назвою пристрою",
    ill_auto: "Автоматично",
    ill_none: "Без ілюстрації (класичний заголовок)",
    ed_illustration_theme: "Тема ілюстрації",
    theme_auto: "Автоматично (сонце, темна тема)",
    theme_day: "День",
    theme_night: "Ніч",
    ill_tower: "Колона",
    ill_cylinder: "Круглий",
    ill_box: "Квадратний корпус",
    ill_dyson: "Безлопатеве кільце",
    ill_split: "Настінна спліт-система",
    ill_portable: "Мобільний кондиціонер",
    ill_window: "Віконна спліт-система",
    ill_portasplit: "Портативна спліт-система",
    ed_show_controls: "Керування",
    ed_show_title: "Заголовок",
    ed_show_subtitle: "Підзаголовок",
    ed_show_sensors: "Вимірювання",
    ed_show_alerts: "Сповіщення",
    ed_show_filter: "Фільтр",
    ed_filter_warning: "Поріг попередження про фільтр (%)",
    ed_zoom: "Кнопка деталей",
    ed_zoom_helper: "Кнопка у верхньому правому куті, що перемикає міні-картку на повну картку й назад",
    ed_language: "Мова",
    ed_language_helper: "Автоматично: мова Home Assistant",
    ed_language_auto: "Автоматично",
    ed_advanced: "Додатково",
    ed_entities: "Сутності",
    ed_entities_helper: "Визначено за пристроєм; тут можна перевизначити роль, наприклад pm25: sensor.vitalnia_pm25",
    ed_title: "Заголовок",
    ed_title_helper: "Залиште порожнім для «Клімат і повітря»",
    ed_kinds: "Типи пристроїв",
    ed_kinds_helper: "Ілюстрація та значок усіх пристроїв одного типу; значок замінює ілюстрацію",
    ed_devs: "Пристрої",
    ed_devs_helper: "Назва, тип, ілюстрація та значок кожного пристрою; порожньо: автоматично",
    ed_type: "Тип",
    ed_group_by: "Групування",
    ed_group_type: "За типом пристрою",
    ed_group_area: "За приміщенням",
    ed_group_none: "Немає",
    ed_columns: "Стовпці",
    ed_columns_helper: "Порожньо: 2 або 1 на вузьких екранах",
    ed_ov_zoom_helper:
      "Показано лише ввімкнені пристрої та ті, що потребують уваги; кнопка показує всі пристрої. Вимкнено: завжди всі пристрої",
    ed_show_all: "Показувати всі пристрої",
    ed_show_all_helper: "Усі пристрої видно одразу; кнопка подробиць залишає лише ввімкнені або ті, що потребують уваги",
    ed_exclude: "Виключити пристрої",
    ed_include: "Додати пристрої",
    ed_include_helper: "Сутності climate або fan, які картка не вибрала б сама (наприклад, прихована сутність)",
    src_air: "Повітря (зовнішній блок)",
    src_ground: "Ґрунт (геотермальний)",
    src_water: "Вода (ґрунтова)",
    gt_collector: "Горизонтальний колектор",
    gt_borehole: "Вертикальний зонд",
    wt_well: "Одна свердловина",
    wt_doublet: "Дублет свердловин",
    wt_lake: "Контур в озері / ставку",
    heat_power: "Теплова потужність",
    cop: "COP",
    cop_today: "COP сьогодні",
    scop: "SCOP",
    flow_temp: "Подача",
    return_temp: "Зворотка",
    delta_t: "ΔT",
    flow_rate: "Витрата",
    elec_energy: "Електрична енергія",
    heat_energy: "Теплова енергія",
    ed_source: "Джерело",
    ed_source_helper: "Сторона джерела теплового насоса та його ілюстрація",
    ed_ground_type: "Ґрунтовий контур",
    ed_water_type: "Водяний контур",
    ed_power_threshold: "Поріг роботи (Вт)",
    ed_power_threshold_helper: "Потужність, вище якої вимірюваний тепловий насос вважається працюючим",
    ed_outdoor_temp: "Зовнішня температура",
    ed_outdoor_temp_helper: "Датчик або об'єкт погоди для зовнішнього чипа",
  },
  hu: {
    purifier: "Légtisztító",
    fan: "Ventilátor",
    aircon: "Klíma",
    heatpump: "Hőszivattyú",
    humidifier: "Párásító",
    dehumidifier: "Párátlanító",
    g_humidifier: "Páratartalom",
    st_humidifying: "Párásít",
    st_drying: "Párátlanít",
    st_diffusing: "Illatosít",
    spray: "Párásítás erőssége",
    mood_light: "Hangulatfény",
    light_level: "Fényerő",
    color: "Szín",
    tank_level: "Víztartály",
    bucket: "Gyűjtőtartály",
    tank_empty: "Víztartály üres",
    bucket_full: "Gyűjtőtartály tele",
    ill_column: "Ultrahangos oszlop",
    ill_tank: "Átlátszó tartály",
    ill_evaporative: "Párologtató",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Aromadiffúzor",
    ill_rituals: "Rituals Perfume Genie (sárgaréz)",
    ill_rituals_black: "Rituals Perfume Genie (fekete)",
    cartridge: "Patron",
    cartridge_empty: "Patron üres",
    perfume: "Illat",
    intensity: "Intenzitás",
    battery: "Akkumulátor",
    wifi: "Wi-Fi",
    room_size: "Szoba mérete",
    ill_dehumidifier: "Párátlanító",
    st_dhw: "Melegvíz",
    st_heating: "Fűt",
    st_cooling: "Hűt",
    st_idle: "Készenlét",
    st_defrost: "Leolvasztás",
    tank: "Tároló",
    dhw_target: "Melegvíz",
    backup: "Kiegészítő fűtőpatron",
    zones: "Zónák",
    st_off: "Ki",
    st_on: "Be",
    st_unavailable: "Nem elérhető",
    st_purifying: "Tisztítás",
    aq_good: "Jó levegő",
    aq_moderate: "Közepes levegő",
    aq_unhealthy: "Rossz levegő",
    aq_bad: "Nagyon rossz levegő",
    speed: "Sebesség",
    mode: "Mód",
    preset: "Előbeállítás",
    colon: ": ",
    oscillation: "Oszcilláció",
    angle: "Szög",
    timer: "Időzítő",
    timer_off: "Nincs",
    child_lock: "Gyerekzár",
    buzzer: "Hang",
    light: "Jelzőfény",
    brightness: "Kijelző",
    anion: "Ionizáló",
    sw_outdoor_silent: "Csendes kültéri egység",
    sw_aux_heat: "Kiegészítő fűtés",
    sw_frost: "Fagyvédelem",
    sw_eco: "Eco",
    sw_display: "Kijelző",
    sw_sound: "Hangjelzés",
    sw_self_clean: "Öntisztítás",
    sw_silent: "Csendes",
    sw_smart_eye: "Okos szem",
    sw_anion: "Ionizáló",
    sw_turbo: "Turbó",
    sw_breeze: "Szellő",
    sw_sleep: "Alvás",
    sw_light: "Jelzőfény",
    favorite: "Kedvenc szint",
    voc: "VOC",
    no2: "NO₂",
    filter: "Szűrő",
    filter_low: "Szűrőcsere",
    filter_dirty: "Szűrőtisztítás",
    filter_soon: "Hamarosan cserélje a szűrőt",
    filter_ok: "Szűrő rendben",
    filter_reset: "Szűrő visszaállítása",
    filter_reset_confirm: "Koppintson újra a megerősítéshez",
    hours: "{n} h",
    level: "{n}. szint",
    target: "Cél",
    target_low: "Fűtés",
    target_high: "Hűtés",
    target_humidity: "Célpáratartalom",
    outdoor: "Kültéri",
    fan_mode: "Ventilátor",
    swing_mode: "Legyezés",
    swing_horizontal_mode: "Vízszintes legyezés",
    preset_mode: "Előbeállítás",
    options: "Opciók",
    offline: "Az eszköz offline",
    no_device: "Nem található eszköz",
    power: "Be / ki",
    zoom_in: "Teljes kártya megjelenítése",
    zoom_out: "Vissza a kompakt nézethez",
    rotate_left: "Forgatás balra",
    rotate_right: "Forgatás jobbra",
    temp_down: "Célhőmérséklet csökkentése",
    temp_up: "Célhőmérséklet növelése",
    title: "Klíma és levegő",
    running_n: "{n} bekapcsolva",
    all_off: "Minden ki van kapcsolva",
    nothing_on: "Jelenleg semmi sincs bekapcsolva",
    g_aircon: "Klímák",
    g_heatpump: "Hőszivattyúk",
    g_purifier: "Légtisztítók",
    g_fan: "Ventilátorok",
    no_area: "Nincs terület",
    no_devices: "Nem található klíma, légtisztító vagy ventilátor",
    toggle: "Be- / kikapcsolás",
    ed_entity: "Eszköz",
    ed_entity_helper: "Hagyja üresen az elsőként talált eszköz használatához",
    ed_name: "Név",
    ed_name_helper: "Hagyja üresen az eszköz nevének használatához",
    ed_icon: "Ikon",
    ed_icon_helper: "Az illusztráció helyett jelenik meg",
    ed_illustration: "Illusztráció",
    ed_illustration_helper: "Automatikus: az eszköz modellje és neve alapján",
    ill_auto: "Automatikus",
    ill_none: "Nincs illusztráció (klasszikus fejléc)",
    ed_illustration_theme: "Illusztráció témája",
    theme_auto: "Automatikus (nap, sötét téma)",
    theme_day: "Nappal",
    theme_night: "Éjszaka",
    ill_tower: "Torony",
    ill_cylinder: "Kerek",
    ill_box: "Szögletes doboz",
    ill_dyson: "Lapát nélküli gyűrű",
    ill_split: "Fali split",
    ill_portable: "Mobil klíma",
    ill_window: "Ablakos split",
    ill_portasplit: "Hordozható split",
    ed_show_controls: "Vezérlők",
    ed_show_title: "Cím",
    ed_show_subtitle: "Alcím",
    ed_show_sensors: "Mérések",
    ed_show_alerts: "Figyelmeztetések",
    ed_show_filter: "Szűrő",
    ed_filter_warning: "Szűrő figyelmeztetési küszöb (%)",
    ed_zoom: "Részletek gomb",
    ed_zoom_helper: "Gomb a jobb felső sarokban, amely a minikártyát teljes kártyára váltja és vissza",
    ed_language: "Nyelv",
    ed_language_helper: "Automatikus: a Home Assistant nyelvét követi",
    ed_language_auto: "Automatikus",
    ed_advanced: "Speciális",
    ed_entities: "Entitások",
    ed_entities_helper: "Az eszközről észlelve; itt felülírhat egy szerepet, pl. pm25: sensor.nappali_pm25",
    ed_title: "Cím",
    ed_title_helper: "Hagyja üresen a „Klíma és levegő” címhez",
    ed_kinds: "Eszköztípusok",
    ed_kinds_helper: "Egy típus összes eszközének illusztrációja és ikonja; az ikon az illusztráció helyett jelenik meg",
    ed_devs: "Eszközök",
    ed_devs_helper: "Minden eszköz neve, típusa, illusztrációja és ikonja; üres: automatikus",
    ed_type: "Típus",
    ed_group_by: "Csoportosítás",
    ed_group_type: "Eszköztípus szerint",
    ed_group_area: "Terület szerint",
    ed_group_none: "Nincs",
    ed_columns: "Oszlopok",
    ed_columns_helper: "Üres: 2, keskeny képernyőn 1",
    ed_ov_zoom_helper:
      "Csak a bekapcsolt vagy figyelmet igénylő eszközök jelennek meg; a gomb az összes eszközt mutatja. Ki: mindig az összes eszköz",
    ed_show_all: "Minden eszköz megjelenítése",
    ed_show_all_helper: "Minden eszköz azonnal látszik; a részletek gomb csak a bekapcsoltakat vagy figyelmet igénylőket hagyja meg",
    ed_exclude: "Kizárandó eszközök",
    ed_include: "Hozzáadandó eszközök",
    ed_include_helper: "Climate vagy fan entitások, amelyeket a kártya magától nem választana (pl. egy rejtett entitás)",
    src_air: "Levegő (kültéri egység)",
    src_ground: "Talaj (geotermikus)",
    src_water: "Víz (talajvíz)",
    gt_collector: "Vízszintes kollektor",
    gt_borehole: "Függőleges szonda",
    wt_well: "Egyetlen kút",
    wt_doublet: "Kútpár",
    wt_lake: "Tavi / tó hurok",
    heat_power: "Hőteljesítmény",
    cop: "COP",
    cop_today: "COP ma",
    scop: "SCOP",
    flow_temp: "Előremenő",
    return_temp: "Visszatérő",
    delta_t: "ΔT",
    flow_rate: "Áramlás",
    elec_energy: "Elektromos energia",
    heat_energy: "Hőenergia",
    ed_source: "Forrás",
    ed_source_helper: "A hőszivattyú forrásoldala és illusztrációja",
    ed_ground_type: "Talajhurok",
    ed_water_type: "Vízhurok",
    ed_power_threshold: "Működési küszöb (W)",
    ed_power_threshold_helper: "Teljesítmény, amely felett a mért hőszivattyú működőnek számít",
    ed_outdoor_temp: "Külső hőmérséklet",
    ed_outdoor_temp_helper: "Érzékelő vagy időjárás-entitás a külső chiphez",
  },
  sk: {
    purifier: "Čistička vzduchu",
    fan: "Ventilátor",
    aircon: "Klimatizácia",
    heatpump: "Tepelné čerpadlo",
    humidifier: "Zvlhčovač",
    dehumidifier: "Odvlhčovač",
    g_humidifier: "Vlhkosť",
    st_humidifying: "Zvlhčuje",
    st_drying: "Odvlhčuje",
    st_diffusing: "Rozptyľuje",
    spray: "Intenzita rozprašovania",
    mood_light: "Náladové svetlo",
    light_level: "Jas",
    color: "Farba",
    tank_level: "Nádrž",
    bucket: "Zásobník",
    tank_empty: "Nádrž prázdna",
    bucket_full: "Zásobník plný",
    ill_column: "Ultrazvukový stĺp",
    ill_tank: "Priehľadná nádrž",
    ill_evaporative: "Odparovací",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Aróma difuzér",
    ill_rituals: "Rituals Perfume Genie (mosadz)",
    ill_rituals_black: "Rituals Perfume Genie (čierna)",
    cartridge: "Náplň",
    cartridge_empty: "Prázdna náplň",
    perfume: "Vôňa",
    intensity: "Intenzita",
    battery: "Batéria",
    wifi: "Wi-Fi",
    room_size: "Veľkosť miestnosti",
    ill_dehumidifier: "Odvlhčovač",
    st_dhw: "Teplá voda",
    st_heating: "Kúri",
    st_cooling: "Chladí",
    st_idle: "Nečinné",
    st_defrost: "Odmrazovanie",
    tank: "Zásobník",
    dhw_target: "Teplá voda",
    backup: "Záložné vykurovacie teleso",
    zones: "Zóny",
    st_off: "Vypnuté",
    st_on: "Zapnuté",
    st_unavailable: "Nedostupné",
    st_purifying: "Čistenie",
    aq_good: "Dobrý vzduch",
    aq_moderate: "Priemerný vzduch",
    aq_unhealthy: "Zlý vzduch",
    aq_bad: "Veľmi zlý vzduch",
    speed: "Rýchlosť",
    mode: "Režim",
    preset: "Predvoľba",
    colon: ": ",
    oscillation: "Oscilácia",
    angle: "Uhol",
    timer: "Časovač",
    timer_off: "Žiadny",
    child_lock: "Detská zámka",
    buzzer: "Zvuk",
    light: "Kontrolka",
    brightness: "Displej",
    anion: "Ionizátor",
    sw_outdoor_silent: "Tichá vonkajšia jednotka",
    sw_aux_heat: "Prídavné kúrenie",
    sw_frost: "Ochrana pred mrazom",
    sw_eco: "Eko",
    sw_display: "Displej",
    sw_sound: "Pípnutie",
    sw_self_clean: "Samočistenie",
    sw_silent: "Tichý",
    sw_smart_eye: "Inteligentné oko",
    sw_anion: "Ionizátor",
    sw_turbo: "Turbo",
    sw_breeze: "Vánok",
    sw_sleep: "Spánok",
    sw_light: "Kontrolka",
    favorite: "Obľúbená úroveň",
    voc: "VOC",
    no2: "NO₂",
    filter: "Filter",
    filter_low: "Vymeňte filter",
    filter_dirty: "Vyčistite filter",
    filter_soon: "Čoskoro vymeňte filter",
    filter_ok: "Filter v poriadku",
    filter_reset: "Resetovať filter",
    filter_reset_confirm: "Ťuknite znova na potvrdenie",
    hours: "{n} h",
    level: "Úroveň {n}",
    target: "Cieľ",
    target_low: "Kúrenie na",
    target_high: "Chladenie na",
    target_humidity: "Cieľová vlhkosť",
    outdoor: "Vonku",
    fan_mode: "Ventilátor",
    swing_mode: "Natáčanie lamiel",
    swing_horizontal_mode: "Horizontálne natáčanie",
    preset_mode: "Predvoľba",
    options: "Možnosti",
    offline: "Zariadenie je offline",
    no_device: "Nenašlo sa žiadne zariadenie",
    power: "Zap. / vyp.",
    zoom_in: "Zobraziť celú kartu",
    zoom_out: "Späť na kompaktné zobrazenie",
    rotate_left: "Otočiť doľava",
    rotate_right: "Otočiť doprava",
    temp_down: "Znížiť cieľovú teplotu",
    temp_up: "Zvýšiť cieľovú teplotu",
    title: "Klíma a vzduch",
    running_n: "Zapnuté: {n}",
    all_off: "Všetko je vypnuté",
    nothing_on: "Momentálne nie je nič zapnuté",
    g_aircon: "Klimatizácie",
    g_heatpump: "Tepelné čerpadlá",
    g_purifier: "Čističky vzduchu",
    g_fan: "Ventilátory",
    no_area: "Bez oblasti",
    no_devices: "Nenašla sa žiadna klimatizácia, čistička vzduchu ani ventilátor",
    toggle: "Zapnúť / vypnúť",
    ed_entity: "Zariadenie",
    ed_entity_helper: "Nechajte prázdne, ak chcete použiť prvé nájdené",
    ed_name: "Názov",
    ed_name_helper: "Nechajte prázdne, ak chcete použiť názov zariadenia",
    ed_icon: "Ikona",
    ed_icon_helper: "Nahrádza ilustráciu",
    ed_illustration: "Ilustrácia",
    ed_illustration_helper: "Automaticky: podľa modelu a názvu zariadenia",
    ill_auto: "Automaticky",
    ill_none: "Bez ilustrácie (klasická hlavička)",
    ed_illustration_theme: "Téma ilustrácie",
    theme_auto: "Automaticky (slnko, tmavá téma)",
    theme_day: "Deň",
    theme_night: "Noc",
    ill_tower: "Veža",
    ill_cylinder: "Okrúhla",
    ill_box: "Hranatá skrinka",
    ill_dyson: "Prstenec bez lopatiek",
    ill_split: "Nástenná split jednotka",
    ill_portable: "Mobilná jednotka",
    ill_window: "Okenná split jednotka",
    ill_portasplit: "Prenosná split jednotka",
    ed_show_controls: "Ovládanie",
    ed_show_title: "Názov",
    ed_show_subtitle: "Podnázov",
    ed_show_sensors: "Merania",
    ed_show_alerts: "Upozornenia",
    ed_show_filter: "Filter",
    ed_filter_warning: "Prah upozornenia filtra (%)",
    ed_zoom: "Tlačidlo podrobností",
    ed_zoom_helper: "Tlačidlo vpravo hore, ktoré prepne minikartu na celú kartu a späť",
    ed_language: "Jazyk",
    ed_language_helper: "Automaticky: podľa jazyka Home Assistant",
    ed_language_auto: "Automaticky",
    ed_advanced: "Rozšírené",
    ed_entities: "Entity",
    ed_entities_helper: "Zistené zo zariadenia; tu môžete prepísať rolu, napr. pm25: sensor.obyvacka_pm25",
    ed_title: "Názov karty",
    ed_title_helper: "Nechajte prázdne pre „Klíma a vzduch“",
    ed_kinds: "Typy zariadení",
    ed_kinds_helper: "Ilustrácia a ikona všetkých zariadení daného typu; ikona nahrádza ilustráciu",
    ed_devs: "Zariadenia",
    ed_devs_helper: "Názov, typ, ilustrácia a ikona každého zariadenia; prázdne: automaticky",
    ed_type: "Typ",
    ed_group_by: "Zoskupenie",
    ed_group_type: "Podľa typu zariadenia",
    ed_group_area: "Podľa oblasti",
    ed_group_none: "Žiadne",
    ed_columns: "Stĺpce",
    ed_columns_helper: "Prázdne: 2, alebo 1 na úzkych obrazovkách",
    ed_ov_zoom_helper:
      "Zobrazujú sa len zapnuté zariadenia alebo tie, ktoré vyžadujú pozornosť; tlačidlo zobrazí všetky zariadenia. Vypnuté: vždy všetky zariadenia",
    ed_show_all: "Zobraziť všetky zariadenia",
    ed_show_all_helper: "Všetky zariadenia sa zobrazia hneď; tlačidlo detailu ponechá len zapnuté alebo vyžadujúce pozornosť",
    ed_exclude: "Vylúčené zariadenia",
    ed_include: "Pridané zariadenia",
    ed_include_helper: "Entity climate alebo fan, ktoré by karta sama nevybrala (napr. skrytá entita)",
    src_air: "Vzduch (vonkajšia jednotka)",
    src_ground: "Zem (geotermálna)",
    src_water: "Voda (podzemná)",
    gt_collector: "Horizontálny kolektor",
    gt_borehole: "Vertikálny vrt",
    wt_well: "Jedna studňa",
    wt_doublet: "Dvojica studní",
    wt_lake: "Slučka v jazere",
    heat_power: "Tepelný výkon",
    cop: "COP",
    cop_today: "COP dnes",
    scop: "SCOP",
    flow_temp: "Výstup",
    return_temp: "Spiatočka",
    delta_t: "ΔT",
    flow_rate: "Prietok",
    elec_energy: "Elektrická energia",
    heat_energy: "Tepelná energia",
    ed_source: "Zdroj",
    ed_source_helper: "Zdrojová strana tepelného čerpadla a jeho ilustrácia",
    ed_ground_type: "Zemná slučka",
    ed_water_type: "Vodná slučka",
    ed_power_threshold: "Prah chodu (W)",
    ed_power_threshold_helper: "Výkon, nad ktorým sa merané tepelné čerpadlo považuje za bežiace",
    ed_outdoor_temp: "Vonkajšia teplota",
    ed_outdoor_temp_helper: "Senzor alebo entita počasia pre vonkajší čip",
  },
  cs: {
    purifier: "Čistička vzduchu",
    fan: "Ventilátor",
    aircon: "Klimatizace",
    heatpump: "Tepelné čerpadlo",
    humidifier: "Zvlhčovač",
    dehumidifier: "Odvlhčovač",
    g_humidifier: "Vlhkost",
    st_humidifying: "Zvlhčuje",
    st_drying: "Odvlhčuje",
    st_diffusing: "Rozptyluje",
    spray: "Intenzita rozprašování",
    mood_light: "Náladové světlo",
    light_level: "Jas",
    color: "Barva",
    tank_level: "Nádrž",
    bucket: "Zásobník",
    tank_empty: "Nádrž prázdná",
    bucket_full: "Zásobník plný",
    ill_column: "Ultrazvukový sloup",
    ill_tank: "Průhledná nádrž",
    ill_evaporative: "Odpařovací",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Aroma difuzér",
    ill_rituals: "Rituals Perfume Genie (mosaz)",
    ill_rituals_black: "Rituals Perfume Genie (černá)",
    cartridge: "Náplň",
    cartridge_empty: "Prázdná náplň",
    perfume: "Vůně",
    intensity: "Intenzita",
    battery: "Baterie",
    wifi: "Wi-Fi",
    room_size: "Velikost místnosti",
    ill_dehumidifier: "Odvlhčovač",
    st_dhw: "Teplá voda",
    st_heating: "Topí",
    st_cooling: "Chladí",
    st_idle: "Nečinné",
    st_defrost: "Odmrazování",
    tank: "Zásobník",
    dhw_target: "Teplá voda",
    backup: "Záložní topné těleso",
    zones: "Zóny",
    st_off: "Vypnuto",
    st_on: "Zapnuto",
    st_unavailable: "Nedostupné",
    st_purifying: "Čištění",
    aq_good: "Dobrý vzduch",
    aq_moderate: "Průměrný vzduch",
    aq_unhealthy: "Špatný vzduch",
    aq_bad: "Velmi špatný vzduch",
    speed: "Rychlost",
    mode: "Režim",
    preset: "Předvolba",
    colon: ": ",
    oscillation: "Oscilace",
    angle: "Úhel",
    timer: "Časovač",
    timer_off: "Žádný",
    child_lock: "Dětský zámek",
    buzzer: "Zvuk",
    light: "Kontrolka",
    brightness: "Displej",
    anion: "Ionizátor",
    sw_outdoor_silent: "Tichá venkovní jednotka",
    sw_aux_heat: "Přídavné topení",
    sw_frost: "Ochrana proti mrazu",
    sw_eco: "Eko",
    sw_display: "Displej",
    sw_sound: "Pípnutí",
    sw_self_clean: "Samočištění",
    sw_silent: "Tichý",
    sw_smart_eye: "Chytré oko",
    sw_anion: "Ionizátor",
    sw_turbo: "Turbo",
    sw_breeze: "Vánek",
    sw_sleep: "Spánek",
    sw_light: "Kontrolka",
    favorite: "Oblíbená úroveň",
    voc: "VOC",
    no2: "NO₂",
    filter: "Filtr",
    filter_low: "Vyměňte filtr",
    filter_dirty: "Vyčistěte filtr",
    filter_soon: "Brzy vyměňte filtr",
    filter_ok: "Filtr v pořádku",
    filter_reset: "Resetovat filtr",
    filter_reset_confirm: "Klepněte znovu pro potvrzení",
    hours: "{n} h",
    level: "Úroveň {n}",
    target: "Cíl",
    target_low: "Topení na",
    target_high: "Chlazení na",
    target_humidity: "Cílová vlhkost",
    outdoor: "Venku",
    fan_mode: "Ventilátor",
    swing_mode: "Natáčení lamel",
    swing_horizontal_mode: "Horizontální natáčení",
    preset_mode: "Předvolba",
    options: "Možnosti",
    offline: "Zařízení je offline",
    no_device: "Nenalezeno žádné zařízení",
    power: "Zap. / vyp.",
    zoom_in: "Zobrazit celou kartu",
    zoom_out: "Zpět na kompaktní zobrazení",
    rotate_left: "Otočit doleva",
    rotate_right: "Otočit doprava",
    temp_down: "Snížit cílovou teplotu",
    temp_up: "Zvýšit cílovou teplotu",
    title: "Klima a vzduch",
    running_n: "Zapnuto: {n}",
    all_off: "Vše je vypnuté",
    nothing_on: "Momentálně není nic zapnuté",
    g_aircon: "Klimatizace",
    g_heatpump: "Tepelná čerpadla",
    g_purifier: "Čističky vzduchu",
    g_fan: "Ventilátory",
    no_area: "Bez oblasti",
    no_devices: "Nenalezena žádná klimatizace, čistička vzduchu ani ventilátor",
    toggle: "Zapnout / vypnout",
    ed_entity: "Zařízení",
    ed_entity_helper: "Ponechte prázdné pro použití prvního nalezeného",
    ed_name: "Název",
    ed_name_helper: "Ponechte prázdné pro použití názvu zařízení",
    ed_icon: "Ikona",
    ed_icon_helper: "Nahrazuje ilustraci",
    ed_illustration: "Ilustrace",
    ed_illustration_helper: "Automaticky: podle modelu a názvu zařízení",
    ill_auto: "Automaticky",
    ill_none: "Bez ilustrace (klasická hlavička)",
    ed_illustration_theme: "Motiv ilustrace",
    theme_auto: "Automaticky (slunce, tmavý motiv)",
    theme_day: "Den",
    theme_night: "Noc",
    ill_tower: "Věž",
    ill_cylinder: "Kulatá",
    ill_box: "Hranatá skříňka",
    ill_dyson: "Prstenec bez lopatek",
    ill_split: "Nástěnná split jednotka",
    ill_portable: "Mobilní jednotka",
    ill_window: "Okenní split jednotka",
    ill_portasplit: "Přenosná split jednotka",
    ed_show_controls: "Ovládání",
    ed_show_title: "Název",
    ed_show_subtitle: "Podnázev",
    ed_show_sensors: "Měření",
    ed_show_alerts: "Upozornění",
    ed_show_filter: "Filtr",
    ed_filter_warning: "Práh upozornění filtru (%)",
    ed_zoom: "Tlačítko podrobností",
    ed_zoom_helper: "Tlačítko vpravo nahoře, které přepne minikartu na celou kartu a zpět",
    ed_language: "Jazyk",
    ed_language_helper: "Automaticky: podle jazyka Home Assistant",
    ed_language_auto: "Automaticky",
    ed_advanced: "Pokročilé",
    ed_entities: "Entity",
    ed_entities_helper: "Zjištěné ze zařízení; zde lze přepsat roli, např. pm25: sensor.obyvak_pm25",
    ed_title: "Nadpis",
    ed_title_helper: "Ponechte prázdné pro „Klima a vzduch“",
    ed_kinds: "Typy zařízení",
    ed_kinds_helper: "Ilustrace a ikona všech zařízení daného typu; ikona nahrazuje ilustraci",
    ed_devs: "Zařízení",
    ed_devs_helper: "Název, typ, ilustrace a ikona každého zařízení; prázdné: automaticky",
    ed_type: "Typ",
    ed_group_by: "Seskupení",
    ed_group_type: "Podle typu zařízení",
    ed_group_area: "Podle oblasti",
    ed_group_none: "Žádné",
    ed_columns: "Sloupce",
    ed_columns_helper: "Prázdné: 2, nebo 1 na úzkých obrazovkách",
    ed_ov_zoom_helper:
      "Zobrazují se jen zapnutá zařízení nebo ta, která vyžadují pozornost; tlačítko zobrazí všechna zařízení. Vypnuto: vždy všechna zařízení",
    ed_show_all: "Zobrazit všechna zařízení",
    ed_show_all_helper: "Všechna zařízení se zobrazí hned; tlačítko detailu ponechá jen zapnutá nebo vyžadující pozornost",
    ed_exclude: "Vyloučená zařízení",
    ed_include: "Přidaná zařízení",
    ed_include_helper: "Entity climate nebo fan, které by karta sama nevybrala (např. skrytá entita)",
    src_air: "Vzduch (venkovní jednotka)",
    src_ground: "Země (geotermální)",
    src_water: "Voda (podzemní)",
    gt_collector: "Horizontální kolektor",
    gt_borehole: "Vertikální vrt",
    wt_well: "Jedna studna",
    wt_doublet: "Dvojice studní",
    wt_lake: "Smyčka v jezeře",
    heat_power: "Tepelný výkon",
    cop: "COP",
    cop_today: "COP dnes",
    scop: "SCOP",
    flow_temp: "Výstup",
    return_temp: "Zpátečka",
    delta_t: "ΔT",
    flow_rate: "Průtok",
    elec_energy: "Elektrická energie",
    heat_energy: "Tepelná energie",
    ed_source: "Zdroj",
    ed_source_helper: "Zdrojová strana tepelného čerpadla a jeho ilustrace",
    ed_ground_type: "Zemní smyčka",
    ed_water_type: "Vodní smyčka",
    ed_power_threshold: "Práh chodu (W)",
    ed_power_threshold_helper: "Výkon, nad kterým se měřené tepelné čerpadlo považuje za běžící",
    ed_outdoor_temp: "Venkovní teplota",
    ed_outdoor_temp_helper: "Senzor nebo entita počasí pro venkovní čip",
  },
  sl: {
    purifier: "Čistilnik zraka",
    fan: "Ventilator",
    aircon: "Klimatska naprava",
    heatpump: "Toplotna črpalka",
    humidifier: "Vlažilnik",
    dehumidifier: "Razvlažilnik",
    g_humidifier: "Vlažnost",
    st_humidifying: "Vlaži",
    st_drying: "Razvlažuje",
    st_diffusing: "Razpršuje",
    spray: "Jakost razprševanja",
    mood_light: "Ambientalna luč",
    light_level: "Svetlost",
    color: "Barva",
    tank_level: "Rezervoar",
    bucket: "Posoda",
    tank_empty: "Rezervoar je prazen",
    bucket_full: "Posoda je polna",
    ill_column: "Ultrazvočni steber",
    ill_tank: "Prozoren rezervoar",
    ill_evaporative: "Izparilni",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Difuzor eteričnih olj",
    ill_rituals: "Rituals Perfume Genie (medenina)",
    ill_rituals_black: "Rituals Perfume Genie (črna)",
    cartridge: "Vložek",
    cartridge_empty: "Vložek prazen",
    perfume: "Vonj",
    intensity: "Intenzivnost",
    battery: "Baterija",
    wifi: "Wi-Fi",
    room_size: "Velikost sobe",
    ill_dehumidifier: "Razvlažilnik",
    st_dhw: "Topla voda",
    st_heating: "Greje",
    st_cooling: "Hladi",
    st_idle: "V pripravljenosti",
    st_defrost: "Odtaljevanje",
    tank: "Hranilnik",
    dhw_target: "Topla voda",
    backup: "Dodatni grelnik",
    zones: "Cone",
    st_off: "Izklopljeno",
    st_on: "Vklopljeno",
    st_unavailable: "Ni na voljo",
    st_purifying: "Čiščenje",
    aq_good: "Dober zrak",
    aq_moderate: "Zmeren zrak",
    aq_unhealthy: "Slab zrak",
    aq_bad: "Zelo slab zrak",
    speed: "Hitrost",
    mode: "Način",
    preset: "Prednastavitev",
    colon: ": ",
    oscillation: "Nihanje",
    angle: "Kot",
    timer: "Časovnik",
    timer_off: "Brez",
    child_lock: "Otroška zaščita",
    buzzer: "Zvok",
    light: "Indikator",
    brightness: "Zaslon",
    anion: "Ionizator",
    sw_outdoor_silent: "Tiha zunanja enota",
    sw_aux_heat: "Dodatno ogrevanje",
    sw_frost: "Zaščita pred zmrzaljo",
    sw_eco: "Eko",
    sw_display: "Zaslon",
    sw_sound: "Pisk",
    sw_self_clean: "Samočiščenje",
    sw_silent: "Tiho",
    sw_smart_eye: "Pametno oko",
    sw_anion: "Ionizator",
    sw_turbo: "Turbo",
    sw_breeze: "Vetrič",
    sw_sleep: "Spanje",
    sw_light: "Indikator",
    favorite: "Priljubljena raven",
    voc: "HOS",
    no2: "NO₂",
    filter: "Filter",
    filter_low: "Zamenjajte filter",
    filter_dirty: "Očistite filter",
    filter_soon: "Kmalu zamenjajte filter",
    filter_ok: "Filter v redu",
    filter_reset: "Ponastavi filter",
    filter_reset_confirm: "Tapnite znova za potrditev",
    hours: "{n} h",
    level: "Raven {n}",
    target: "Cilj",
    target_low: "Ogrevanje na",
    target_high: "Hlajenje na",
    target_humidity: "Ciljna vlažnost",
    outdoor: "Zunaj",
    fan_mode: "Ventilator",
    swing_mode: "Nihanje lamel",
    swing_horizontal_mode: "Vodoravno nihanje",
    preset_mode: "Prednastavitev",
    options: "Možnosti",
    offline: "Ni povezave",
    no_device: "Ni najdene naprave",
    power: "Vklop / izklop",
    zoom_in: "Prikaži celotno kartico",
    zoom_out: "Nazaj na strnjen pogled",
    rotate_left: "Zavrti levo",
    rotate_right: "Zavrti desno",
    temp_down: "Znižaj ciljno temperaturo",
    temp_up: "Zvišaj ciljno temperaturo",
    title: "Klima in zrak",
    running_n: "Vklopljeno: {n}",
    all_off: "Vse je izklopljeno",
    nothing_on: "Trenutno ni nič vklopljeno",
    g_aircon: "Klimatske naprave",
    g_heatpump: "Toplotne črpalke",
    g_purifier: "Čistilniki zraka",
    g_fan: "Ventilatorji",
    no_area: "Brez območja",
    no_devices: "Ni najdene klimatske naprave, čistilnika zraka ali ventilatorja",
    toggle: "Vklopi / izklopi",
    ed_entity: "Naprava",
    ed_entity_helper: "Pustite prazno za uporabo prve najdene",
    ed_name: "Ime",
    ed_name_helper: "Pustite prazno za uporabo imena naprave",
    ed_icon: "Ikona",
    ed_icon_helper: "Nadomesti ilustracijo",
    ed_illustration: "Ilustracija",
    ed_illustration_helper: "Samodejno: izbrana glede na model in ime naprave",
    ill_auto: "Samodejno",
    ill_none: "Brez ilustracije (klasična glava)",
    ed_illustration_theme: "Tema ilustracije",
    theme_auto: "Samodejno (sonce, temna tema)",
    theme_day: "Dan",
    theme_night: "Noč",
    ill_tower: "Stolp",
    ill_cylinder: "Okrogla",
    ill_box: "Kvadratno ohišje",
    ill_dyson: "Obroč brez lopatic",
    ill_split: "Stenska split enota",
    ill_portable: "Prenosna enota",
    ill_window: "Okenska split enota",
    ill_portasplit: "Prenosna split enota",
    ed_show_controls: "Upravljanje",
    ed_show_title: "Naslov",
    ed_show_subtitle: "Podnaslov",
    ed_show_sensors: "Meritve",
    ed_show_alerts: "Opozorila",
    ed_show_filter: "Filter",
    ed_filter_warning: "Prag opozorila za filter (%)",
    ed_zoom: "Gumb za podrobnosti",
    ed_zoom_helper: "Gumb zgoraj desno, ki mini kartico preklopi v celotno kartico in nazaj",
    ed_language: "Jezik",
    ed_language_helper: "Samodejno: sledi jeziku Home Assistanta",
    ed_language_auto: "Samodejno",
    ed_advanced: "Napredno",
    ed_entities: "Entitete",
    ed_entities_helper: "Zaznane iz naprave; tukaj lahko preglasite vlogo, npr. pm25: sensor.dnevna_soba_pm25",
    ed_title: "Naslov",
    ed_title_helper: "Pustite prazno za »Klima in zrak«",
    ed_kinds: "Vrste naprav",
    ed_kinds_helper: "Ilustracija in ikona vseh naprav ene vrste; ikona nadomesti ilustracijo",
    ed_devs: "Naprave",
    ed_devs_helper: "Ime, vrsta, ilustracija in ikona vsake naprave; prazno: samodejno",
    ed_type: "Vrsta",
    ed_group_by: "Združevanje",
    ed_group_type: "Po vrsti naprave",
    ed_group_area: "Po območju",
    ed_group_none: "Brez",
    ed_columns: "Stolpci",
    ed_columns_helper: "Prazno: 2 ali 1 na ozkih zaslonih",
    ed_ov_zoom_helper:
      "Prikazane so le vklopljene naprave ali tiste, ki potrebujejo pozornost; gumb prikaže vse naprave. Izklopljeno: vedno vse naprave",
    ed_show_all: "Prikaži vse naprave",
    ed_show_all_helper: "Vse naprave so prikazane takoj; gumb za podrobnosti obdrži le vklopljene ali tiste, ki zahtevajo pozornost",
    ed_exclude: "Izključene naprave",
    ed_include: "Dodane naprave",
    ed_include_helper: "Entitete climate ali fan, ki jih kartica sama ne bi izbrala (npr. skrita entiteta)",
    src_air: "Zrak (zunanja enota)",
    src_ground: "Zemlja (geotermalna)",
    src_water: "Voda (podtalnica)",
    gt_collector: "Vodoravni kolektor",
    gt_borehole: "Navpična sonda",
    wt_well: "En vodnjak",
    wt_doublet: "Dvojica vodnjakov",
    wt_lake: "Zanka v jezeru",
    heat_power: "Toplotna moč",
    cop: "COP",
    cop_today: "COP danes",
    scop: "SCOP",
    flow_temp: "Dvižni vod",
    return_temp: "Povratni vod",
    delta_t: "ΔT",
    flow_rate: "Pretok",
    elec_energy: "Električna energija",
    heat_energy: "Toplotna energija",
    ed_source: "Vir",
    ed_source_helper: "Vir toplotne črpalke in njena ilustracija",
    ed_ground_type: "Zemeljska zanka",
    ed_water_type: "Vodna zanka",
    ed_power_threshold: "Prag delovanja (W)",
    ed_power_threshold_helper: "Moč, nad katero se merjena toplotna črpalka šteje za delujočo",
    ed_outdoor_temp: "Zunanja temperatura",
    ed_outdoor_temp_helper: "Senzor ali vremenska entiteta za zunanji čip",
  },
  lv: {
    purifier: "Gaisa attīrītājs",
    fan: "Ventilators",
    aircon: "Gaisa kondicionieris",
    heatpump: "Siltumsūknis",
    humidifier: "Mitrinātājs",
    dehumidifier: "Sausinātājs",
    g_humidifier: "Mitrums",
    st_humidifying: "Mitrina",
    st_drying: "Sausina",
    st_diffusing: "Izsmidzina",
    spray: "Izsmidzināšanas intensitāte",
    mood_light: "Noskaņas gaisma",
    light_level: "Spilgtums",
    color: "Krāsa",
    tank_level: "Ūdens tvertne",
    bucket: "Savākšanas tvertne",
    tank_empty: "Ūdens tvertne tukša",
    bucket_full: "Savākšanas tvertne pilna",
    ill_column: "Ultraskaņas kolonna",
    ill_tank: "Caurspīdīga tvertne",
    ill_evaporative: "Iztvaicēšanas",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Ēterisko eļļu difuzors",
    ill_rituals: "Rituals Perfume Genie (misiņš)",
    ill_rituals_black: "Rituals Perfume Genie (melns)",
    cartridge: "Kārtridžs",
    cartridge_empty: "Kārtridžs tukšs",
    perfume: "Aromāts",
    intensity: "Intensitāte",
    battery: "Baterija",
    wifi: "Wi-Fi",
    room_size: "Telpas izmērs",
    ill_dehumidifier: "Sausinātājs",
    st_dhw: "Karstais ūdens",
    st_heating: "Silda",
    st_cooling: "Dzesē",
    st_idle: "Gaidstāve",
    st_defrost: "Atkausēšana",
    tank: "Tvertne",
    dhw_target: "Karstais ūdens",
    backup: "Rezerves sildītājs",
    zones: "Zonas",
    st_off: "Izslēgts",
    st_on: "Ieslēgts",
    st_unavailable: "Nav pieejams",
    st_purifying: "Attīra",
    aq_good: "Labs gaiss",
    aq_moderate: "Vidējs gaiss",
    aq_unhealthy: "Slikts gaiss",
    aq_bad: "Ļoti slikts gaiss",
    speed: "Ātrums",
    mode: "Režīms",
    preset: "Iestatījums",
    colon: ": ",
    oscillation: "Grozīšanās",
    angle: "Leņķis",
    timer: "Taimeris",
    timer_off: "Nav",
    child_lock: "Bērnu slēdzene",
    buzzer: "Skaņa",
    light: "Indikators",
    brightness: "Displejs",
    anion: "Jonizators",
    sw_outdoor_silent: "Klusais āra bloks",
    sw_aux_heat: "Papildu apsilde",
    sw_frost: "Aizsardzība pret salu",
    sw_eco: "Eko",
    sw_display: "Displejs",
    sw_sound: "Pīkstiens",
    sw_self_clean: "Pašattīrīšana",
    sw_silent: "Kluss",
    sw_smart_eye: "Viedā acs",
    sw_anion: "Jonizators",
    sw_turbo: "Turbo",
    sw_breeze: "Vējiņš",
    sw_sleep: "Miegs",
    sw_light: "Indikators",
    favorite: "Iecienītais līmenis",
    voc: "GOS",
    no2: "NO₂",
    filter: "Filtrs",
    filter_low: "Nomainiet filtru",
    filter_dirty: "Notīriet filtru",
    filter_soon: "Drīzumā nomainiet filtru",
    filter_ok: "Filtrs kārtībā",
    filter_reset: "Atiestatīt filtru",
    filter_reset_confirm: "Pieskarieties vēlreiz, lai apstiprinātu",
    hours: "{n} h",
    level: "Līmenis {n}",
    target: "Mērķis",
    target_low: "Sildīt līdz",
    target_high: "Dzesēt līdz",
    target_humidity: "Mērķa mitrums",
    outdoor: "Ārā",
    fan_mode: "Ventilators",
    swing_mode: "Žalūziju kustība",
    swing_horizontal_mode: "Horizontāla žalūziju kustība",
    preset_mode: "Iestatījums",
    options: "Opcijas",
    offline: "Ierīce bezsaistē",
    no_device: "Ierīce nav atrasta",
    power: "Iesl. / izsl.",
    zoom_in: "Rādīt pilno karti",
    zoom_out: "Atpakaļ uz kompakto skatu",
    rotate_left: "Pagriezt pa kreisi",
    rotate_right: "Pagriezt pa labi",
    temp_down: "Pazemināt mērķa temperatūru",
    temp_up: "Paaugstināt mērķa temperatūru",
    title: "Klimats un gaiss",
    running_n: "Ieslēgti: {n}",
    all_off: "Viss ir izslēgts",
    nothing_on: "Pašlaik nekas nav ieslēgts",
    g_aircon: "Gaisa kondicionieri",
    g_heatpump: "Siltumsūkņi",
    g_purifier: "Gaisa attīrītāji",
    g_fan: "Ventilatori",
    no_area: "Bez apgabala",
    no_devices: "Nav atrasts neviens gaisa kondicionieris, gaisa attīrītājs vai ventilators",
    toggle: "Ieslēgt / izslēgt",
    ed_entity: "Ierīce",
    ed_entity_helper: "Atstājiet tukšu, lai izmantotu pirmo atrasto",
    ed_name: "Nosaukums",
    ed_name_helper: "Atstājiet tukšu, lai izmantotu ierīces nosaukumu",
    ed_icon: "Ikona",
    ed_icon_helper: "Aizstāj ilustrāciju",
    ed_illustration: "Ilustrācija",
    ed_illustration_helper: "Automātiski: izvēlēta pēc ierīces modeļa un nosaukuma",
    ill_auto: "Automātiski",
    ill_none: "Bez ilustrācijas (klasiska galvene)",
    ed_illustration_theme: "Ilustrācijas tēma",
    theme_auto: "Automātiski (saule, tumšā tēma)",
    theme_day: "Diena",
    theme_night: "Nakts",
    ill_tower: "Tornis",
    ill_cylinder: "Apaļš",
    ill_box: "Kvadrātveida korpuss",
    ill_dyson: "Gredzens bez lāpstiņām",
    ill_split: "Sienas split bloks",
    ill_portable: "Pārvietojams bloks",
    ill_window: "Loga split bloks",
    ill_portasplit: "Pārnēsājams split",
    ed_show_controls: "Vadīklas",
    ed_show_title: "Virsraksts",
    ed_show_subtitle: "Apakšvirsraksts",
    ed_show_sensors: "Mērījumi",
    ed_show_alerts: "Brīdinājumi",
    ed_show_filter: "Filtrs",
    ed_filter_warning: "Filtra brīdinājuma slieksnis (%)",
    ed_zoom: "Detaļu poga",
    ed_zoom_helper: "Poga augšējā labajā stūrī, kas pārslēdz mini karti uz pilno karti un atpakaļ",
    ed_language: "Valoda",
    ed_language_helper: "Automātiski: atbilst Home Assistant valodai",
    ed_language_auto: "Automātiski",
    ed_advanced: "Papildu",
    ed_entities: "Vienības",
    ed_entities_helper: "Noteiktas no ierīces; šeit var aizstāt lomu, piem., pm25: sensor.viesistaba_pm25",
    ed_title: "Virsraksts",
    ed_title_helper: "Atstājiet tukšu, lai būtu „Klimats un gaiss”",
    ed_kinds: "Ierīču veidi",
    ed_kinds_helper: "Visu viena veida ierīču ilustrācija un ikona; ikona aizstāj ilustrāciju",
    ed_devs: "Ierīces",
    ed_devs_helper: "Katras ierīces nosaukums, veids, ilustrācija un ikona; tukšs: automātiski",
    ed_type: "Veids",
    ed_group_by: "Grupēšana",
    ed_group_type: "Pēc ierīces veida",
    ed_group_area: "Pēc apgabala",
    ed_group_none: "Nav",
    ed_columns: "Kolonnas",
    ed_columns_helper: "Tukšs: 2 vai 1 šauros ekrānos",
    ed_ov_zoom_helper:
      "Tiek rādītas tikai ieslēgtās ierīces vai tās, kurām nepieciešama uzmanība; poga parāda visas ierīces. Izslēgts: vienmēr visas ierīces",
    ed_show_all: "Rādīt visas ierīces",
    ed_show_all_helper: "Visas ierīces redzamas uzreiz; detaļu poga atstāj tikai ieslēgtās vai uzmanību prasošās",
    ed_exclude: "Izslēdzamās ierīces",
    ed_include: "Pievienojamās ierīces",
    ed_include_helper: "Climate vai fan vienības, kuras karte pati neizvēlētos (piem., paslēpta vienība)",
    src_air: "Gaiss (āra bloks)",
    src_ground: "Grunts (ģeotermālā)",
    src_water: "Ūdens (gruntsūdens)",
    gt_collector: "Horizontāls kolektors",
    gt_borehole: "Vertikāla zonde",
    wt_well: "Viena aka",
    wt_doublet: "Aku pāris",
    wt_lake: "Cilpa ezerā",
    heat_power: "Siltuma jauda",
    cop: "COP",
    cop_today: "COP šodien",
    scop: "SCOP",
    flow_temp: "Turpgaita",
    return_temp: "Atpakaļgaita",
    delta_t: "ΔT",
    flow_rate: "Plūsma",
    elec_energy: "Elektroenerģija",
    heat_energy: "Siltuma enerģija",
    ed_source: "Avots",
    ed_source_helper: "Siltumsūkņa avota puse un tā attēls",
    ed_ground_type: "Grunts cilpa",
    ed_water_type: "Ūdens cilpa",
    ed_power_threshold: "Darbības slieksnis (W)",
    ed_power_threshold_helper: "Jauda, virs kuras mērīts siltumsūknis tiek uzskatīts par darbojošos",
    ed_outdoor_temp: "Āra temperatūra",
    ed_outdoor_temp_helper: "Sensors vai laikapstākļu entītija āra čipam",
  },
  el: {
    purifier: "Καθαριστής αέρα",
    fan: "Ανεμιστήρας",
    aircon: "Κλιματιστικό",
    heatpump: "Αντλία θερμότητας",
    humidifier: "Υγραντήρας",
    dehumidifier: "Αφυγραντήρας",
    g_humidifier: "Υγρασία",
    st_humidifying: "Υγραίνει",
    st_drying: "Αφυγραίνει",
    st_diffusing: "Διαχέει",
    spray: "Ένταση διάχυσης",
    mood_light: "Φως ατμόσφαιρας",
    light_level: "Φωτεινότητα",
    color: "Χρώμα",
    tank_level: "Δοχείο νερού",
    bucket: "Κάδος",
    tank_empty: "Δοχείο νερού άδειο",
    bucket_full: "Κάδος γεμάτος",
    ill_column: "Στήλη υπερήχων",
    ill_tank: "Διάφανο δοχείο",
    ill_evaporative: "Εξατμιστικός",
    ill_vocolinc: "VOCOlinc MistFlow",
    ill_diffuser: "Διαχυτής αιθέριων ελαίων",
    ill_rituals: "Rituals Perfume Genie (ορείχαλκος)",
    ill_rituals_black: "Rituals Perfume Genie (μαύρο)",
    cartridge: "Φύσιγγα",
    cartridge_empty: "Κενή φύσιγγα",
    perfume: "Άρωμα",
    intensity: "Ένταση",
    battery: "Μπαταρία",
    wifi: "Wi-Fi",
    room_size: "Μέγεθος δωματίου",
    ill_dehumidifier: "Αφυγραντήρας",
    st_dhw: "Ζεστό νερό",
    st_heating: "Θερμαίνει",
    st_cooling: "Ψύχει",
    st_idle: "Σε αναμονή",
    st_defrost: "Απόψυξη",
    tank: "Δοχείο",
    dhw_target: "Ζεστό νερό",
    backup: "Βοηθητική αντίσταση",
    zones: "Ζώνες",
    st_off: "Ανενεργό",
    st_on: "Ενεργό",
    st_unavailable: "Μη διαθέσιμο",
    st_purifying: "Καθαρισμός",
    aq_good: "Καλός αέρας",
    aq_moderate: "Μέτριος αέρας",
    aq_unhealthy: "Κακός αέρας",
    aq_bad: "Πολύ κακός αέρας",
    speed: "Ταχύτητα",
    mode: "Λειτουργία",
    preset: "Προεπιλογή",
    colon: ": ",
    oscillation: "Περιστροφή",
    angle: "Γωνία",
    timer: "Χρονοδιακόπτης",
    timer_off: "Κανένας",
    child_lock: "Κλείδωμα για παιδιά",
    buzzer: "Ήχος",
    light: "Ενδεικτική λυχνία",
    brightness: "Οθόνη",
    anion: "Ιονιστής",
    sw_outdoor_silent: "Αθόρυβη εξωτερική μονάδα",
    sw_aux_heat: "Βοηθητική θέρμανση",
    sw_frost: "Αντιπαγωτική προστασία",
    sw_eco: "Eco",
    sw_display: "Οθόνη",
    sw_sound: "Ηχητικό σήμα",
    sw_self_clean: "Αυτοκαθαρισμός",
    sw_silent: "Αθόρυβο",
    sw_smart_eye: "Έξυπνο μάτι",
    sw_anion: "Ιονιστής",
    sw_turbo: "Turbo",
    sw_breeze: "Αύρα",
    sw_sleep: "Ύπνος",
    sw_light: "Ενδεικτική λυχνία",
    favorite: "Αγαπημένο επίπεδο",
    voc: "ΠΟΕ",
    no2: "NO₂",
    filter: "Φίλτρο",
    filter_low: "Αλλαγή φίλτρου",
    filter_dirty: "Καθαρίστε το φίλτρο",
    filter_soon: "Αλλάξτε σύντομα το φίλτρο",
    filter_ok: "Φίλτρο εντάξει",
    filter_reset: "Επαναφορά φίλτρου",
    filter_reset_confirm: "Πατήστε ξανά για επιβεβαίωση",
    hours: "{n} h",
    level: "Επίπεδο {n}",
    target: "Στόχος",
    target_low: "Θέρμανση στους",
    target_high: "Ψύξη στους",
    target_humidity: "Επιθυμητή υγρασία",
    outdoor: "Εξωτερικά",
    fan_mode: "Ανεμιστήρας",
    swing_mode: "Ταλάντευση",
    swing_horizontal_mode: "Οριζόντια ταλάντευση",
    preset_mode: "Προεπιλογή",
    options: "Επιλογές",
    offline: "Εκτός σύνδεσης",
    no_device: "Δεν βρέθηκε συσκευή",
    power: "Ενεργ. / απενεργ.",
    zoom_in: "Εμφάνιση πλήρους κάρτας",
    zoom_out: "Επιστροφή στη συμπαγή προβολή",
    rotate_left: "Περιστροφή αριστερά",
    rotate_right: "Περιστροφή δεξιά",
    temp_down: "Μείωση θερμοκρασίας στόχου",
    temp_up: "Αύξηση θερμοκρασίας στόχου",
    title: "Κλίμα και αέρας",
    running_n: "Ενεργά: {n}",
    all_off: "Όλα είναι ανενεργά",
    nothing_on: "Τίποτα ενεργό αυτή τη στιγμή",
    g_aircon: "Κλιματιστικά",
    g_heatpump: "Αντλίες θερμότητας",
    g_purifier: "Καθαριστές αέρα",
    g_fan: "Ανεμιστήρες",
    no_area: "Χωρίς περιοχή",
    no_devices: "Δεν βρέθηκε κλιματιστικό, καθαριστής αέρα ή ανεμιστήρας",
    toggle: "Ενεργοποίηση / απενεργοποίηση",
    ed_entity: "Συσκευή",
    ed_entity_helper: "Αφήστε κενό για να χρησιμοποιηθεί η πρώτη που θα βρεθεί",
    ed_name: "Όνομα",
    ed_name_helper: "Αφήστε κενό για να χρησιμοποιηθεί το όνομα της συσκευής",
    ed_icon: "Εικονίδιο",
    ed_icon_helper: "Αντικαθιστά την εικονογράφηση",
    ed_illustration: "Εικονογράφηση",
    ed_illustration_helper: "Αυτόματα: επιλέγεται με βάση το μοντέλο και το όνομα της συσκευής",
    ill_auto: "Αυτόματα",
    ill_none: "Χωρίς εικονογράφηση (κλασική κεφαλίδα)",
    ed_illustration_theme: "Θέμα εικονογράφησης",
    theme_auto: "Αυτόματο (ήλιος, σκούρο θέμα)",
    theme_day: "Ημέρα",
    theme_night: "Νύχτα",
    ill_tower: "Πύργος",
    ill_cylinder: "Στρογγυλός",
    ill_box: "Τετράγωνο κουτί",
    ill_dyson: "Δακτύλιος χωρίς πτερύγια",
    ill_split: "Επιτοίχιο split",
    ill_portable: "Φορητή μονάδα",
    ill_window: "Split παραθύρου",
    ill_portasplit: "Φορητό split",
    ed_show_controls: "Χειριστήρια",
    ed_show_title: "Τίτλος",
    ed_show_subtitle: "Υπότιτλος",
    ed_show_sensors: "Μετρήσεις",
    ed_show_alerts: "Ειδοποιήσεις",
    ed_show_filter: "Φίλτρο",
    ed_filter_warning: "Όριο προειδοποίησης φίλτρου (%)",
    ed_zoom: "Κουμπί λεπτομερειών",
    ed_zoom_helper: "Κουμπί πάνω δεξιά που αλλάζει τη μίνι κάρτα σε πλήρη κάρτα και αντίστροφα",
    ed_language: "Γλώσσα",
    ed_language_helper: "Αυτόματα: ακολουθεί τη γλώσσα του Home Assistant",
    ed_language_auto: "Αυτόματα",
    ed_advanced: "Για προχωρημένους",
    ed_entities: "Οντότητες",
    ed_entities_helper: "Εντοπίστηκαν από τη συσκευή· παρακάμψτε έναν ρόλο εδώ, π.χ. pm25: sensor.saloni_pm25",
    ed_title: "Τίτλος",
    ed_title_helper: "Αφήστε κενό για «Κλίμα και αέρας»",
    ed_kinds: "Τύποι συσκευών",
    ed_kinds_helper: "Η εικονογράφηση και το εικονίδιο όλων των συσκευών ενός τύπου· ένα εικονίδιο αντικαθιστά την εικονογράφηση",
    ed_devs: "Συσκευές",
    ed_devs_helper: "Όνομα, τύπος, εικονογράφηση και εικονίδιο κάθε συσκευής· κενό: αυτόματα",
    ed_type: "Τύπος",
    ed_group_by: "Ομαδοποίηση",
    ed_group_type: "Ανά τύπο συσκευής",
    ed_group_area: "Ανά περιοχή",
    ed_group_none: "Καμία",
    ed_columns: "Στήλες",
    ed_columns_helper: "Κενό: 2 ή 1 σε στενές οθόνες",
    ed_ov_zoom_helper:
      "Εμφανίζονται μόνο οι ενεργές συσκευές ή όσες χρειάζονται προσοχή· το κουμπί εμφανίζει όλες τις συσκευές. Ανενεργό: πάντα όλες οι συσκευές",
    ed_show_all: "Εμφάνιση όλων των συσκευών",
    ed_show_all_helper: "Όλες οι συσκευές εμφανίζονται αμέσως· το κουμπί λεπτομερειών κρατά μόνο όσες είναι αναμμένες ή χρειάζονται προσοχή",
    ed_exclude: "Συσκευές προς εξαίρεση",
    ed_include: "Συσκευές προς προσθήκη",
    ed_include_helper: "Οντότητες climate ή fan που η κάρτα δεν θα επέλεγε μόνη της (π.χ. μια κρυφή οντότητα)",
    src_air: "Αέρας (εξωτερική μονάδα)",
    src_ground: "Γεωθερμία (έδαφος)",
    src_water: "Νερό (υπόγειο)",
    gt_collector: "Οριζόντιος συλλέκτης",
    gt_borehole: "Κατακόρυφη γεώτρηση",
    wt_well: "Ένα πηγάδι",
    wt_doublet: "Ζεύγος πηγαδιών",
    wt_lake: "Βρόχος σε λίμνη",
    heat_power: "Θερμική ισχύς",
    cop: "COP",
    cop_today: "COP σήμερα",
    scop: "SCOP",
    flow_temp: "Προσαγωγή",
    return_temp: "Επιστροφή",
    delta_t: "ΔT",
    flow_rate: "Παροχή",
    elec_energy: "Ηλεκτρική ενέργεια",
    heat_energy: "Θερμική ενέργεια",
    ed_source: "Πηγή",
    ed_source_helper: "Η πλευρά πηγής της αντλίας θερμότητας και η απεικόνισή της",
    ed_ground_type: "Βρόχος εδάφους",
    ed_water_type: "Βρόχος νερού",
    ed_power_threshold: "Όριο λειτουργίας (W)",
    ed_power_threshold_helper: "Ισχύς πάνω από την οποία μια μετρούμενη αντλία θερμότητας θεωρείται σε λειτουργία",
    ed_outdoor_temp: "Εξωτερική θερμοκρασία",
    ed_outdoor_temp_helper: "Αισθητήρας ή οντότητα καιρού για το εξωτερικό τσιπ",
  },
};

function caT(lang, key, vars) {
  const s = (CA_I18N[lang] || CA_I18N.en)[key] ?? CA_I18N.en[key] ?? key;
  return vars ? s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "") : s;
}

function caLang(config, hass) {
  // The full code when the card has it ("sr-Latn"), else the part before the dash ("fr-FR" → "fr"), else English.
  const full = String(config?.language || hass?.language || globalThis.document?.documentElement?.lang || "en");
  if (CA_I18N[full]) return full;
  const base = full.split("-")[0];
  return CA_I18N[base] ? base : "en";
}

// The locale handed to Intl / toLocaleString: Home Assistant's full locale ("pt-BR", "de-CH") when it is in the
// card's language, else the card's language; bare "pt" (Home Assistant's European Portuguese) becomes "pt-PT", or
// Intl formats it the Brazilian way. The card's language option wins.
function caIntlLang(config, hass) {
  const lang = caLang(config, hass);
  const full = String(config?.language || hass?.locale?.language || hass?.language || "");
  const loc = full && full.split("-")[0] === lang.split("-")[0] ? full : lang;
  return loc === "pt" ? "pt-PT" : loc;
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
    auto: "Auto", automatic: "Automatisch", manual: "Manuell", smart: "Smart", sleep: "Schlafmodus", night: "Nacht", favorite: "Favorit", favourite: "Favorit", silent: "Leise", quiet: "Leise", turbo: "Turbo", boost: "Boost", strong: "Stark", max: "Max", natural: "Natürlich", natural_wind: "Natürlicher Wind", nature: "Natürlich", straight: "Direkt", straight_wind: "Direkter Wind", direct: "Direkt", direct_wind: "Direkter Wind", standard: "Standard", normal: "Normal", baby: "Baby", low: "Niedrig", middle: "Mittel", medium: "Mittel", mid: "Mittel", high: "Hoch", full: "Voll", fixed: "Fest", off: "Aus", on: "An", vertical: "Vertikal", horizontal: "Horizontal", both: "Beide", none: "Keine", comfort: "Komfort", eco: "Eco", away: "Abwesend", home: "Zuhause", activity: "Aktivität", purifying: "Reinigt", idle: "Leerlauf", inactive: "Inaktiv", purify: "Reinigen",
  },
  es: {
    auto: "Auto", automatic: "Automático", manual: "Manual", smart: "Inteligente", sleep: "Dormir", night: "Noche", favorite: "Favorito", favourite: "Favorito", silent: "Silencioso", quiet: "Silencioso", turbo: "Turbo", boost: "Boost", strong: "Fuerte", max: "Máx.", natural: "Natural", natural_wind: "Viento natural", nature: "Natural", straight: "Directo", straight_wind: "Viento directo", direct: "Directo", direct_wind: "Viento directo", standard: "Estándar", normal: "Normal", baby: "Bebé", low: "Bajo", middle: "Medio", medium: "Medio", mid: "Medio", high: "Alto", full: "Máximo", fixed: "Fijo", off: "Apagado", on: "Encendido", vertical: "Vertical", horizontal: "Horizontal", both: "Ambos", none: "Ninguno", comfort: "Confort", eco: "Eco", away: "Ausente", home: "En casa", activity: "Actividad", purifying: "Purificando", idle: "En espera", inactive: "Inactivo", purify: "Purificar",
  },
  sr: {
    auto: "Ауто", automatic: "Аутоматски", manual: "Мануелно", smart: "Паметно", sleep: "Спавање", night: "Ноћ", favorite: "Омиљено",
    favourite: "Омиљено", silent: "Тихо", quiet: "Тихо", turbo: "Турбо", boost: "Појачано", strong: "Снажно", max: "Максимално",
    natural: "Природно", natural_wind: "Природни поветарац", nature: "Природно", straight: "Директно", straight_wind: "Директно дување",
    direct: "Директно", direct_wind: "Директно дување", standard: "Стандардно", normal: "Нормално", baby: "Беба режим", low: "Ниско", middle: "Средње",
    medium: "Средње", mid: "Средње", high: "Високо", full: "Пуно", fixed: "Фиксирано", off: "Искључено", on: "Укључено", vertical: "Вертикално",
    horizontal: "Хоризонтално", both: "Оба", none: "Ниједно", comfort: "Комфор", eco: "Еко", away: "Одсутан", home: "Код куће",
    activity: "Активност", purifying: "Пречишћавање", idle: "Мировање", inactive: "Неактивно", purify: "Пречисти",
  },
  "sr-Latn": {
    auto: "Auto", automatic: "Automatski", manual: "Manuelno", smart: "Pametno", sleep: "Spavanje", night: "Noć", favorite: "Omiljeno",
    favourite: "Omiljeno", silent: "Tiho", quiet: "Tiho", turbo: "Turbo", boost: "Pojačano", strong: "Snažno", max: "Maksimalno",
    natural: "Prirodno", natural_wind: "Prirodni povetarac", nature: "Prirodno", straight: "Direktno", straight_wind: "Direktno duvanje",
    direct: "Direktno", direct_wind: "Direktno duvanje", standard: "Standardno", normal: "Normalno", baby: "Beba režim", low: "Nisko", middle: "Srednje",
    medium: "Srednje", mid: "Srednje", high: "Visoko", full: "Puno", fixed: "Fiksirano", off: "Isključeno", on: "Uključeno", vertical: "Vertikalno",
    horizontal: "Horizontalno", both: "Oba", none: "Nijedno", comfort: "Komfor", eco: "Eko", away: "Odsutan", home: "Kod kuće",
    activity: "Aktivnost", purifying: "Prečišćavanje", idle: "Mirovanje", inactive: "Neaktivno", purify: "Prečisti",
  },
  it: {
    auto: "Auto", automatic: "Automatico", manual: "Manuale", smart: "Smart", sleep: "Notte", night: "Notte", favorite: "Preferito",
    favourite: "Preferito", silent: "Silenzioso", quiet: "Silenzioso", turbo: "Turbo", boost: "Boost", strong: "Forte", max: "Max",
    natural: "Naturale", natural_wind: "Vento naturale", nature: "Naturale", straight: "Diretto", straight_wind: "Vento diretto",
    direct: "Diretto", direct_wind: "Vento diretto", standard: "Standard", normal: "Normale", baby: "Bambino", low: "Basso", middle: "Medio",
    medium: "Medio", mid: "Medio", high: "Alto", full: "Massimo", fixed: "Fisso", off: "Spento", on: "Acceso", vertical: "Verticale",
    horizontal: "Orizzontale", both: "Entrambi", none: "Nessuno", comfort: "Comfort", eco: "Eco", away: "Fuori casa", home: "A casa",
    activity: "Attività", purifying: "Purificazione", idle: "In attesa", inactive: "Inattivo", purify: "Purifica",
  },
  nl: {
    auto: "Auto", automatic: "Automatisch", manual: "Handmatig", smart: "Slim", sleep: "Slaap", night: "Nacht", favorite: "Favoriet",
    favourite: "Favoriet", silent: "Stil", quiet: "Stil", turbo: "Turbo", boost: "Boost", strong: "Sterk", max: "Max",
    natural: "Natuurlijk", natural_wind: "Natuurlijke wind", nature: "Natuurlijk", straight: "Direct", straight_wind: "Directe wind",
    direct: "Direct", direct_wind: "Directe wind", standard: "Standaard", normal: "Normaal", baby: "Baby", low: "Laag", middle: "Middel",
    medium: "Middel", mid: "Middel", high: "Hoog", full: "Volledig", fixed: "Vast", off: "Uit", on: "Aan", vertical: "Verticaal",
    horizontal: "Horizontaal", both: "Beide", none: "Geen", comfort: "Comfort", eco: "Eco", away: "Afwezig", home: "Thuis",
    activity: "Activiteit", purifying: "Zuivert", idle: "Inactief", inactive: "Niet actief", purify: "Zuiveren",
  },
  pt: {
    auto: "Auto", automatic: "Automático", manual: "Manual", smart: "Inteligente", sleep: "Dormir", night: "Noite", favorite: "Favorito",
    favourite: "Favorito", silent: "Silencioso", quiet: "Silencioso", turbo: "Turbo", boost: "Boost", strong: "Forte", max: "Máx.",
    natural: "Natural", natural_wind: "Vento natural", nature: "Natural", straight: "Direto", straight_wind: "Vento direto",
    direct: "Direto", direct_wind: "Vento direto", standard: "Padrão", normal: "Normal", baby: "Bebé", low: "Baixo", middle: "Médio",
    medium: "Médio", mid: "Médio", high: "Alto", full: "Máximo", fixed: "Fixo", off: "Desligado", on: "Ligado", vertical: "Vertical",
    horizontal: "Horizontal", both: "Ambos", none: "Nenhum", comfort: "Conforto", eco: "Eco", away: "Ausente", home: "Em casa",
    activity: "Atividade", purifying: "A purificar", idle: "Em espera", inactive: "Inativo", purify: "Purificar",
  },
  pl: {
    auto: "Auto", automatic: "Automatyczny", manual: "Ręczny", smart: "Inteligentny", sleep: "Sen", night: "Noc", favorite: "Ulubiony",
    favourite: "Ulubiony", silent: "Cichy", quiet: "Cichy", turbo: "Turbo", boost: "Boost", strong: "Mocny", max: "Maks.",
    natural: "Naturalny", natural_wind: "Naturalny nawiew", nature: "Naturalny", straight: "Bezpośredni", straight_wind: "Nawiew bezpośredni",
    direct: "Bezpośredni", direct_wind: "Nawiew bezpośredni", standard: "Standardowy", normal: "Normalny", baby: "Dziecko", low: "Niski", middle: "Średni",
    medium: "Średni", mid: "Średni", high: "Wysoki", full: "Pełny", fixed: "Stały", off: "Wyłączone", on: "Włączone", vertical: "Pionowo",
    horizontal: "Poziomo", both: "Oba", none: "Brak", comfort: "Komfort", eco: "Eko", away: "Poza domem", home: "W domu",
    activity: "Aktywność", purifying: "Oczyszczanie", idle: "Bezczynny", inactive: "Nieaktywny", purify: "Oczyść",
  },
  ro: {
    auto: "Auto", automatic: "Automat", manual: "Manual", smart: "Inteligent", sleep: "Somn", night: "Noapte", favorite: "Favorit",
    favourite: "Favorit", silent: "Silențios", quiet: "Silențios", turbo: "Turbo", boost: "Boost", strong: "Puternic", max: "Max",
    natural: "Natural", natural_wind: "Vânt natural", nature: "Natural", straight: "Direct", straight_wind: "Vânt direct",
    direct: "Direct", direct_wind: "Vânt direct", standard: "Standard", normal: "Normal", baby: "Bebeluș", low: "Scăzut", middle: "Mediu",
    medium: "Mediu", mid: "Mediu", high: "Ridicat", full: "Maxim", fixed: "Fix", off: "Oprit", on: "Pornit", vertical: "Vertical",
    horizontal: "Orizontal", both: "Ambele", none: "Niciunul", comfort: "Confort", eco: "Eco", away: "Plecat", home: "Acasă",
    activity: "Activitate", purifying: "Purificare", idle: "Inactiv", inactive: "Inactiv", purify: "Purificare",
  },
  da: {
    auto: "Auto", automatic: "Automatisk", manual: "Manuel", smart: "Smart", sleep: "Søvn", night: "Nat", favorite: "Favorit",
    favourite: "Favorit", silent: "Stille", quiet: "Stille", turbo: "Turbo", boost: "Boost", strong: "Kraftig", max: "Maks.",
    natural: "Naturlig", natural_wind: "Naturlig vind", nature: "Naturlig", straight: "Direkte", straight_wind: "Direkte vind",
    direct: "Direkte", direct_wind: "Direkte vind", standard: "Standard", normal: "Normal", baby: "Baby", low: "Lav", middle: "Mellem",
    medium: "Mellem", mid: "Mellem", high: "Høj", full: "Fuld", fixed: "Fast", off: "Slukket", on: "Tændt", vertical: "Lodret",
    horizontal: "Vandret", both: "Begge", none: "Ingen", comfort: "Komfort", eco: "Eco", away: "Ude", home: "Hjemme",
    activity: "Aktivitet", purifying: "Renser", idle: "Inaktiv", inactive: "Ikke aktiv", purify: "Rens",
  },
  sv: {
    auto: "Auto", automatic: "Automatisk", manual: "Manuell", smart: "Smart", sleep: "Sömn", night: "Natt", favorite: "Favorit",
    favourite: "Favorit", silent: "Tyst", quiet: "Tyst", turbo: "Turbo", boost: "Boost", strong: "Stark", max: "Max",
    natural: "Naturlig", natural_wind: "Naturlig vind", nature: "Naturlig", straight: "Rak", straight_wind: "Rak vind",
    direct: "Direkt", direct_wind: "Direkt vind", standard: "Standard", normal: "Normal", baby: "Baby", low: "Låg", middle: "Medel",
    medium: "Medel", mid: "Medel", high: "Hög", full: "Full", fixed: "Fast", off: "Av", on: "På", vertical: "Vertikal",
    horizontal: "Horisontell", both: "Båda", none: "Ingen", comfort: "Komfort", eco: "Eco", away: "Borta", home: "Hemma",
    activity: "Aktivitet", purifying: "Renar", idle: "Vilar", inactive: "Inaktiv", purify: "Rena",
  },
  bg: {
    auto: "Авто", automatic: "Автоматично", manual: "Ръчно", smart: "Интелигентно", sleep: "Сън", night: "Нощ", favorite: "Любимо",
    favourite: "Любимо", silent: "Тихо", quiet: "Тихо", turbo: "Турбо", boost: "Усилено", strong: "Силно", max: "Макс.",
    natural: "Естествено", natural_wind: "Естествен вятър", nature: "Естествено", straight: "Директно", straight_wind: "Директен вятър",
    direct: "Директно", direct_wind: "Директен вятър", standard: "Стандартно", normal: "Нормално", baby: "Бебе", low: "Ниско", middle: "Средно",
    medium: "Средно", mid: "Средно", high: "Високо", full: "Пълно", fixed: "Фиксирано", off: "Изключено", on: "Включено", vertical: "Вертикално",
    horizontal: "Хоризонтално", both: "И двете", none: "Няма", comfort: "Комфорт", eco: "Еко", away: "Отсъства", home: "Вкъщи",
    activity: "Активност", purifying: "Пречистване", idle: "Неактивен", inactive: "Неактивно", purify: "Пречистване",
  },
  ru: {
    auto: "Авто", automatic: "Автоматически", manual: "Вручную", smart: "Умный", sleep: "Сон", night: "Ночь", favorite: "Избранное",
    favourite: "Избранное", silent: "Тихий", quiet: "Тихий", turbo: "Турбо", boost: "Усиленный", strong: "Сильный", max: "Макс.",
    natural: "Естественный", natural_wind: "Естественный поток", nature: "Естественный", straight: "Прямой", straight_wind: "Прямой поток",
    direct: "Прямой", direct_wind: "Прямой поток", standard: "Стандартный", normal: "Обычный", baby: "Детский", low: "Низкий", middle: "Средний",
    medium: "Средний", mid: "Средний", high: "Высокий", full: "Полный", fixed: "Фиксированный", off: "Выключено", on: "Включено", vertical: "Вертикально",
    horizontal: "Горизонтально", both: "Оба", none: "Нет", comfort: "Комфорт", eco: "Эко", away: "Не дома", home: "Дома",
    activity: "Активность", purifying: "Очистка", idle: "Ожидание", inactive: "Неактивно", purify: "Очистка",
  },
  uk: {
    auto: "Авто", automatic: "Автоматично", manual: "Вручну", smart: "Розумний", sleep: "Сон", night: "Ніч", favorite: "Улюблене",
    favourite: "Улюблене", silent: "Тихий", quiet: "Тихий", turbo: "Турбо", boost: "Посилений", strong: "Сильний", max: "Макс.",
    natural: "Природний", natural_wind: "Природний потік", nature: "Природний", straight: "Прямий", straight_wind: "Прямий потік",
    direct: "Прямий", direct_wind: "Прямий потік", standard: "Стандартний", normal: "Звичайний", baby: "Дитячий", low: "Низький", middle: "Середній",
    medium: "Середній", mid: "Середній", high: "Високий", full: "Повний", fixed: "Фіксований", off: "Вимкнено", on: "Увімкнено", vertical: "Вертикально",
    horizontal: "Горизонтально", both: "Обидва", none: "Немає", comfort: "Комфорт", eco: "Еко", away: "Не вдома", home: "Вдома",
    activity: "Активність", purifying: "Очищення", idle: "Очікування", inactive: "Неактивно", purify: "Очищення",
  },
  hu: {
    auto: "Auto", automatic: "Automatikus", manual: "Kézi", smart: "Okos", sleep: "Alvás", night: "Éjszaka", favorite: "Kedvenc",
    favourite: "Kedvenc", silent: "Csendes", quiet: "Csendes", turbo: "Turbó", boost: "Boost", strong: "Erős", max: "Max.",
    natural: "Természetes", natural_wind: "Természetes szél", nature: "Természetes", straight: "Egyenes", straight_wind: "Egyenes légáram",
    direct: "Közvetlen", direct_wind: "Közvetlen légáram", standard: "Normál", normal: "Normál", baby: "Baba", low: "Alacsony", middle: "Közepes",
    medium: "Közepes", mid: "Közepes", high: "Magas", full: "Teljes", fixed: "Rögzített", off: "Ki", on: "Be", vertical: "Függőleges",
    horizontal: "Vízszintes", both: "Mindkettő", none: "Nincs", comfort: "Komfort", eco: "Eco", away: "Távol", home: "Otthon",
    activity: "Aktivitás", purifying: "Tisztítás", idle: "Tétlen", inactive: "Inaktív", purify: "Tisztítás",
  },
  sk: {
    auto: "Auto", automatic: "Automatický", manual: "Manuálny", smart: "Inteligentný", sleep: "Spánok", night: "Noc", favorite: "Obľúbený",
    favourite: "Obľúbený", silent: "Tichý", quiet: "Tichý", turbo: "Turbo", boost: "Boost", strong: "Silný", max: "Max.",
    natural: "Prirodzený", natural_wind: "Prirodzený vánok", nature: "Prirodzený", straight: "Priamy", straight_wind: "Priame prúdenie",
    direct: "Priamy", direct_wind: "Priame prúdenie", standard: "Štandardný", normal: "Normálny", baby: "Detský", low: "Nízky", middle: "Stredný",
    medium: "Stredný", mid: "Stredný", high: "Vysoký", full: "Plný", fixed: "Pevný", off: "Vypnuté", on: "Zapnuté", vertical: "Vertikálne",
    horizontal: "Horizontálne", both: "Oboje", none: "Žiadne", comfort: "Komfort", eco: "Eko", away: "Preč", home: "Doma",
    activity: "Aktivita", purifying: "Čistenie", idle: "Nečinný", inactive: "Neaktívny", purify: "Čistiť",
  },
  cs: {
    auto: "Auto", automatic: "Automatický", manual: "Manuální", smart: "Chytrý", sleep: "Spánek", night: "Noc", favorite: "Oblíbený",
    favourite: "Oblíbený", silent: "Tichý", quiet: "Tichý", turbo: "Turbo", boost: "Boost", strong: "Silný", max: "Max.",
    natural: "Přirozený", natural_wind: "Přirozený vánek", nature: "Přirozený", straight: "Přímý", straight_wind: "Přímé proudění",
    direct: "Přímý", direct_wind: "Přímé proudění", standard: "Standardní", normal: "Normální", baby: "Dětský", low: "Nízký", middle: "Střední",
    medium: "Střední", mid: "Střední", high: "Vysoký", full: "Plný", fixed: "Pevný", off: "Vypnuto", on: "Zapnuto", vertical: "Vertikálně",
    horizontal: "Horizontálně", both: "Obojí", none: "Žádné", comfort: "Komfort", eco: "Eko", away: "Pryč", home: "Doma",
    activity: "Aktivita", purifying: "Čištění", idle: "Nečinný", inactive: "Neaktivní", purify: "Čistit",
  },
  sl: {
    auto: "Samodejno", automatic: "Samodejno", manual: "Ročno", smart: "Pametno", sleep: "Spanje", night: "Noč", favorite: "Priljubljeno",
    favourite: "Priljubljeno", silent: "Tiho", quiet: "Tiho", turbo: "Turbo", boost: "Okrepljeno", strong: "Močno", max: "Maks.",
    natural: "Naravno", natural_wind: "Naraven veter", nature: "Naravno", straight: "Neposredno", straight_wind: "Neposreden veter",
    direct: "Neposredno", direct_wind: "Neposreden veter", standard: "Standardno", normal: "Običajno", baby: "Dojenček", low: "Nizko", middle: "Srednje",
    medium: "Srednje", mid: "Srednje", high: "Visoko", full: "Polno", fixed: "Fiksno", off: "Izklopljeno", on: "Vklopljeno", vertical: "Navpično",
    horizontal: "Vodoravno", both: "Oboje", none: "Brez", comfort: "Udobje", eco: "Eko", away: "Odsoten", home: "Doma",
    activity: "Aktivnost", purifying: "Čiščenje", idle: "Nedejavno", inactive: "Neaktivno", purify: "Očisti",
  },
  lv: {
    auto: "Auto", automatic: "Automātiski", manual: "Manuāli", smart: "Viedais", sleep: "Miegs", night: "Nakts", favorite: "Iecienītais",
    favourite: "Iecienītais", silent: "Kluss", quiet: "Kluss", turbo: "Turbo", boost: "Pastiprināts", strong: "Spēcīgs", max: "Maks.",
    natural: "Dabisks", natural_wind: "Dabisks vējš", nature: "Dabisks", straight: "Tiešs", straight_wind: "Tiešā plūsma",
    direct: "Tiešs", direct_wind: "Tiešā plūsma", standard: "Standarta", normal: "Normāls", baby: "Bērnu", low: "Zems", middle: "Vidējs",
    medium: "Vidējs", mid: "Vidējs", high: "Augsts", full: "Pilns", fixed: "Fiksēts", off: "Izslēgts", on: "Ieslēgts", vertical: "Vertikāli",
    horizontal: "Horizontāli", both: "Abi", none: "Nav", comfort: "Komforts", eco: "Eko", away: "Prom", home: "Mājās",
    activity: "Aktivitāte", purifying: "Attīra", idle: "Dīkstāvē", inactive: "Neaktīvs", purify: "Attīrīt",
  },
  el: {
    auto: "Αυτόματο", automatic: "Αυτόματο", manual: "Χειροκίνητο", smart: "Έξυπνο", sleep: "Ύπνος", night: "Νύχτα", favorite: "Αγαπημένο",
    favourite: "Αγαπημένο", silent: "Αθόρυβο", quiet: "Ήσυχο", turbo: "Turbo", boost: "Ενίσχυση", strong: "Δυνατό", max: "Μέγ.",
    natural: "Φυσικό", natural_wind: "Φυσικός αέρας", nature: "Φυσικό", straight: "Ευθύ", straight_wind: "Ευθύς αέρας",
    direct: "Άμεσο", direct_wind: "Άμεσος αέρας", standard: "Τυπικό", normal: "Κανονικό", baby: "Μωρό", low: "Χαμηλό", middle: "Μεσαίο",
    medium: "Μεσαίο", mid: "Μεσαίο", high: "Υψηλό", full: "Πλήρες", fixed: "Σταθερό", off: "Ανενεργό", on: "Ενεργό", vertical: "Κάθετα",
    horizontal: "Οριζόντια", both: "Και τα δύο", none: "Κανένα", comfort: "Άνεση", eco: "Eco", away: "Εκτός σπιτιού", home: "Στο σπίτι",
    activity: "Δραστηριότητα", purifying: "Καθαρισμός", idle: "Αδρανές", inactive: "Ανενεργό", purify: "Καθαρισμός",
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
  const level = /^(level|niveau|stufe|nivel|livello|poziom|nivå|ниво|уровень|рівень|szint|úroveň|raven|līmenis|επίπεδο|gear|speed)_?(\d+)$/.exec(key);
  if (level) return caT(lang, "level", { n: level[2] });
  return caHumanize(v);
}

function caHumanize(v) {
  const s = String(v ?? "").replace(/_/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function caFmtNum(lang, v, digits = 1, minDigits = 0) {
  if (v == null || !Number.isFinite(v)) return "—";
  return v.toLocaleString(lang, { maximumFractionDigits: digits, minimumFractionDigits: minDigits });
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
const CA_CLIMATE_RANGE = 2;
const CA_CLIMATE_TARGET_HUMIDITY = 4;
const CA_CLIMATE_FAN_MODE = 8;
const CA_CLIMATE_PRESET = 16;
const CA_CLIMATE_SWING = 32;
const CA_CLIMATE_SWING_HORIZONTAL = 512;

// Taps on − / + and a slider moved from the keyboard: the service is called once they stop for this long.
const CA_TEMP_DEBOUNCE = 900;
// Once sent, a target stays on screen until the entity reports it, or for this long at most (a device that rounds it).
const CA_TEMP_SETTLE = 10000;

// The service data of a pending target: one temperature, or a low / high range (`target_temp_low`, `target_temp_high`).
const caTempData = (pending) => (typeof pending === "number" ? { temperature: pending } : pending);

// The low / high range of a climate entity (heat_cool, auto) when it sets one instead of a single target, else null.
const caClimateRange = (a) => {
  const f = a.supported_features || 0;
  if (!(f & CA_CLIMATE_RANGE) || a.target_temp_low == null || a.target_temp_high == null) return null;
  if (f & CA_CLIMATE_TARGET && a.temperature != null) return null;
  return { low: Number(a.target_temp_low), high: Number(a.target_temp_high) };
};

// Opens Home Assistant's more-info dialog of `entityId`, from the element `el`.
const caMoreInfo = (el, entityId) => el.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));

// Chips are not buttons: Enter or Space on a focused one opens its more-info, like a click. True when handled.
const caChipKey = (host, ev) => {
  const entity = ev.target?.dataset?.moreInfo;
  if (!entity || (ev.key !== "Enter" && ev.key !== " ")) return false;
  ev.preventDefault();
  caMoreInfo(host, entity);
  return true;
};

// A render rebuilds the card's markup, which drops the focus: what identifies the focused control (its tag and its
// data-* attributes: data-action + data-value, data-toggle, data-more-info…) finds its replacement afterwards.
const caFocusKey = (el) => {
  const data = [...(el?.attributes || [])].filter((a) => a.name.startsWith("data-")).map((a) => [a.name, a.value]);
  return data.length ? { tag: el.localName, data } : null;
};

const caFindKey = (root, key) => [...root.querySelectorAll(key.tag)].find((n) => key.data.every(([k, v]) => n.getAttribute(k) === v));

const caRestoreFocus = (root, key) => {
  if (!key || root.activeElement) return;
  caFindKey(root, key)?.focus({ preventScroll: true });
};

// A dropdown or a slider that has the focus (open, dragged, moved with the arrows) must not be rebuilt under the
// finger, but the rest of the card must not freeze either: `root` takes the new markup of `fresh` (detached) around
// `keep`, which stays in place with its focus, its value and its open list; `twin` is its counterpart in `fresh`.
// Its ancestors stay too, with the attributes of their counterparts, and everything else is replaced. False when the
// two trees do not line up (the control moved): the caller rebuilds the whole card then.
const caPatchAround = (root, fresh, keep, twin) => {
  const path = (n, top) => {
    const out = [];
    for (; n && n !== top; n = n.parentNode) out.unshift(n);
    return n === top ? out : null;
  };
  const olds = path(keep, root);
  const news = path(twin, fresh);
  if (!olds || !news || olds.length !== news.length || olds.some((n, i) => n.localName !== news[i].localName)) return false;
  let oldParent = root;
  let newParent = fresh;
  olds.forEach((node, i) => {
    const twinNode = news[i];
    const kids = [...newParent.childNodes];
    const at = kids.indexOf(twinNode);
    for (const n of [...oldParent.childNodes]) if (n !== node) n.remove();
    node.before(...kids.slice(0, at));
    node.after(...kids.slice(at + 1));
    if (node !== keep) {
      for (const a of [...node.attributes]) if (!twinNode.hasAttribute(a.name)) node.removeAttribute(a.name);
      for (const a of [...twinNode.attributes]) if (node.getAttribute(a.name) !== a.value) node.setAttribute(a.name, a.value);
    }
    oldParent = node;
    newParent = twinNode;
  });
  return true;
};

const caDc = (dc) => (st) => st.attributes.device_class === dc;

// Entities a device may have next to its fan or climate entity. Each role is looked up by its registry
// translation_key, then by the entity_id (English, French, German and Spanish slugs), then by its attributes, so
// that it works with Xiaomi Home, Xiaomi Miio, HomeKit, Matter or Midea entities alike.
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
  voc: {
    domain: "sensor",
    id: /(volatile_organic|_vocs?\b|\bcov\b|composes_organiques|fluchtige_organische|compuestos_organicos)/,
    test: (st) => /^volatile_organic_compounds(_parts)?$/.test(st.attributes.device_class || ""),
  },
  no2: { domain: "sensor", id: /(nitrogen_dioxide|_no2\b|dioxyde_d?_?azote|stickstoffdioxid|dioxido_de_nitrogeno)/, test: caDc("nitrogen_dioxide") },
  status: { domain: "sensor", keys: ["air_purifier_status"], id: /(purifier_status|purificateur.*statut)/ },
  mode: { domain: "select", keys: ["air_purifier_mode"], id: /(purifier_mode|_mode)$/ },
  child_lock: { domain: "switch", keys: ["child_lock"], id: /(child_lock|physical_control|securite_enfant|verrouillage)/ },
  buzzer: { domain: "switch", keys: ["buzzer", "alarm"], id: /(buzzer|alarm|sound|_son_|_son$|bip)/ },
  light: { domain: "light", id: /(indicator|indicador|_led|voyant|display|anzeige|pantalla)/ },
  brightness: { domain: "select", id: /(brightness|luminosit|helligkeit|brillo)/ },
  favorite: { domain: "number", keys: ["favorite_level"], id: /favorite/ },
  angle: { domain: ["number", "select"], id: /(angle|angulo|winkel|swing_included)/ },
  timer: { domain: "number", id: /(countdown|delay_time|off_delay|timer|minuterie|power_off_time|temporizador|ausschaltzeit)/ },
  rotate_left: { domain: "button", id: /(turn_left|rotate_left|tourner_a_gauche|nach_links|a_la_izquierda)/ },
  rotate_right: { domain: "button", id: /(turn_right|rotate_right|tourner_a_droite|nach_rechts|a_la_derecha)/ },
  anion: { domain: "switch", id: /(anion|ioni)/ },
  indoor_temp: { domain: "sensor", id: /(indoor_temperature|temperature_interieure|innentemperatur|temperatura_interior)$/ },
  outdoor_temp: { domain: "sensor", id: /(outdoor_temperature|temperature_exterieure|aussentemperatur|temperatura_exterior)(_\d+)?$/ },
  power: {
    domain: "sensor",
    id: /(real_time_power|current_power|puissance_instantanee)/,
    test: (st, id) => st.attributes.device_class === "power" && !/compressor|compresseur|kompressor|compresor/.test(id),
  },
  filter_alert: { domain: "binary_sensor", id: /(dust|filter|filtre|filtro|staub|polvo)/ },
  // The button that resets the filter counter once it is cleaned or replaced (Midea, Xiaomi, Philips…).
  filter_reset: { domain: "button", id: /((reset|reinit|zurucksetzen|restablecer).*(filt|dust)|(filt|dust).*(reset|reinit))/ },
  compressor: {
    domain: "sensor",
    id: /(?<!target_)(compressor_frequency|frequence_compresseur|kompressorfrequenz|frecuencia_del_compresor)$/,
  },
  // Heat pumps (air to water): the hot water tank (a water_heater entity, else its temperature), the three-way valve
  // sending the heat to the house or to the tank (TOUG's « aiguillage vanne », Aquarea's direction), the setpoint of a
  // pump driven without a climate entity (TOUG's thermostat number), the backup heater and the defrost cycle.
  dhw: { domain: "water_heater", test: () => true },
  tank_temp: {
    domain: "sensor",
    id: /((tank|ballon|dhw|ecs|hot_water|eau_chaude|warmwasser|speicher|acs|sanitaire).*temp|temp.*(tank|ballon|dhw|ecs|acs|sanitaire|warmwasser))/,
  },
  valve: { domain: ["sensor", "select"], id: /(aiguillage|three_way|3_way|diverter|direction|vanne|valve|umschalt)/ },
  setpoint: { domain: "number", id: /(thermostat|consigne|setpoint|target_temp|sollwert)/ },
  // Humidifiers and dehumidifiers: the water left in the tank (a percentage), the empty tank of a humidifier and the
  // full bucket of a dehumidifier.
  water_level: {
    domain: "sensor",
    keys: ["fill"],
    id: /(water_level|tank_level|water_tank|water_remain|niveau_(d_)?eau|niveau_reservoir|reservoir|wasserstand|nivel_de_agua|depth|fill|cartridge|cartouche)/,
    avoid: /(full|plein|voll)/,
  },
  // Any light of a humidifier or a diffuser (the VOCOlinc ambient light), toggled from its options.
  lamp: { domain: "light", test: () => true },
  // The mist intensity of a diffuser (VOCOlinc's « Spray quantity », 1 to 5; the Rituals « Perfume amount », 1 to 3).
  // The device slug may itself contain "perfume", so match the amount anchored, not the bare word.
  spray: { domain: "number", keys: ["perfume_amount"], id: /(spray|mist_level|mist_quantity|mist_intensity|intensite|nebul|perfume_amount)/ },
  // The Rituals Perfume Genie's extras: its room size (m²), fragrance name, battery and charge, wifi, and the
  // "cartridge inserted" binary sensor (off = no cartridge), used as a low-cartridge alert. The fragrance sensor is
  // anchored to the end so the "perfume" in the device slug (its fill, battery…) is not taken for it.
  room_size: { domain: "select", keys: ["room_size_square_meter"], id: /room_?size/ },
  perfume: { domain: "sensor", keys: ["perfume"], id: /(perfume$|parfum$|fragrance|duft$|profumo$)/ },
  battery: { domain: "sensor", test: caDc("battery") },
  charging: { domain: "binary_sensor", test: caDc("battery_charging") },
  wifi: { domain: "sensor", keys: ["wifi_percentage"], id: /(wifi|signal_strength|rssi)/ },
  cartridge: { domain: "binary_sensor", keys: ["cartridge"], id: /(cartridge|cartouche)/ },
  tank_empty: { domain: "binary_sensor", id: /(water_shortage|no_water|tank_empty|water_empty|lack_of_water|manque_d?_?eau|reservoir_vide|wassermangel|tank_leer)/ },
  bucket_full: { domain: "binary_sensor", id: /(tank_full|bucket_full|water_full|full_water|water_tank_full|bac_plein|reservoir_plein|behalter_voll|tanque_lleno)/ },
  backup: { domain: "binary_sensor", id: /(backup|appoint|booster|resistance|heizstab|electric_heater|aux)/ },
  defrost: { domain: "binary_sensor", id: /(defrost|degivr|abtau|desescarche)/ },
  // Heat pumps measured but not controlled — a ground- or water-source unit read through Modbus meters (Stiebel
  // Eltron WPF, NIBE F1x55, Viessmann Vitocal 2xx-G, a plain electrical + heat meter…): the monitoring roles, set
  // in `entities` and found on the device when it has one. Matched by entity id only, so a heat pump's electrical
  // `power` role (its compressor draw) is never taken for the thermal `heat_power`, nor the outdoor / room sensors
  // for the flow and return water temperatures.
  heat_power: { domain: "sensor", id: /(heat_output|heat_power|thermal_power|thermal_output|heat_kw|heat_production|puissance_thermique|w[aä]rmeleistung|potenza_termica|heatpower|kwnow)/ },
  cop: {
    domain: "sensor",
    id: /(instantaneous_cop|current_cop|\bcop\b|_cop$|coefficient_of_perform|leistungszahl)/,
    avoid: /(today|day|daily|journ|jour|seasonal|saison|scop|annual|annuel|month|mois)/,
  },
  cop_today: { domain: "sensor", id: /(cop_today|today_cop|daily_cop|cop_jour|cop_du_jour)/ },
  scop: { domain: "sensor", id: /(scop|seasonal_cop|cop_seasonal|cop_saisonnier|cop_saison|jahresarbeitszahl|\bjaz\b)/ },
  flow_temp: { domain: "sensor", id: /(flow_temp|flow_t$|flowt$|supply_temp|departure_temp|(d[ée]part|vorlauf|mandata|aanvoer|impulsion).*temp|temp.*(d[ée]part|flow|vorlauf))/ },
  return_temp: { domain: "sensor", id: /(return_temp|return_t$|returnt$|(retour|r[uü]cklauf|ritorno|retorno).*temp|temp.*(retour|return|r[uü]cklauf))/ },
  flow_rate: { domain: "sensor", id: /(flow_rate|flowrate|volume_flow|d[ée]bit|durchfluss|portata|caudal)/ },
  energy: { domain: "sensor", id: /(elec.*energy|energy.*elec|electrical_energy|energie_pac|energie_[ée]lectrique|stromverbrauch|energia_elettrica)/ },
  heat_energy: { domain: "sensor", id: /(heat_energy|thermal_energy|heat_mwh|heat_kwh|w[aä]rmemenge|energia_termica|energie_thermique|mwhlifetime|heat_lifetime)/ },
  // The hot water tank reported as sensors rather than a water_heater entity (Aldes T.One through TOUG): its fill as a
  // percentage, its remaining volume in litres and its fault messages.
  dhw_pct: {
    domain: "sensor",
    id: /((ecs|dhw|tank|ballon|hot_water|eau_chaude|warmwasser|acs|sanitaire).*(pourcentage|percent|niveau|level|charge|remplissage|fill)|(pourcentage|percent|charge|fill).*(ecs|dhw|tank|ballon|hot_water|eau_chaude|acs|sanitaire))/,
    test: (st) => st.attributes.unit_of_measurement === "%",
  },
  dhw_volume: {
    domain: "sensor",
    id: /((volume|litres?|liters?|restant).*(ecs|dhw|tank|ballon|hot_water|eau_chaude|acs|sanitaire)|(ecs|dhw|tank|ballon|hot_water|eau_chaude|acs|sanitaire).*(volume|litres?|liters?|restant))/,
    test: (st) => /^l$|litre|liter/i.test(st.attributes.unit_of_measurement || ""),
  },
  faults: { domain: "sensor", id: /(?<!sans_)(defaut|default|fault|erreur|error|panne|anomal|st[öo]rung|averia|guasto)/ },
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

// Number of states, counted once per `hass.states` object (every card of the dashboard shares the same one).
const caStateCounts = new WeakMap();
function caStateCount(states) {
  if (!states) return 0;
  let n = caStateCounts.get(states);
  if (n === undefined) caStateCounts.set(states, (n = Object.keys(states).length));
  return n;
}

// Memo for lookups that scan the registry or all of `hass.states` (kind of device, roles, entity lists), keyed on
// the `hass.entities` object like caRegistryIndex. The results also depend on which states exist: the memo starts
// over when the number of states changes (states still arriving while Home Assistant starts, after the registry).
// A miss (no such role) is kept with the state objects it was worked out from (`deps`, the device's entities): it
// is reused while none of them changed, so a device without a filter sensor is not scanned again on every update
// of the home, and looked up again once one of them changes (an entity coming back from unavailable, say).
// Without `deps`, a miss is never kept.
const caMemoStore = new WeakMap();
class CaMiss {
  constructor(value, deps) {
    this.value = value;
    this.deps = deps;
  }
}
const caSameDeps = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
function caMemo(hass, key, compute, deps) {
  const reg = hass?.entities;
  if (!reg) return compute();
  const count = caStateCount(hass.states);
  let memo = caMemoStore.get(reg);
  if (!memo || memo.count !== count) caMemoStore.set(reg, (memo = { count, map: new Map() }));
  const kept = memo.map.get(key);
  if (kept instanceof CaMiss) {
    if (caSameDeps(kept.deps, deps())) return kept.value;
  } else if (memo.map.has(key)) return kept;
  const value = compute();
  if (value != null) memo.map.set(key, value);
  else if (deps) memo.map.set(key, new CaMiss(value, deps()));
  return value;
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
// A climate entity is an air conditioner when it can cool, dry or only blow; a heat-only thermostat (a wall
// thermostat, a radiator, a radiator valve) is not, and is left to ha-heating-card.
// A fan entity is an air purifier when its name says so or its device measures particles or has a filter.
// The domain of the entities of a kind of device.
const caDomain = (kind) => (kind === "aircon" ? "climate" : kind === "heatpump" ? ["climate", "select"] : kind === "humidifier" ? ["humidifier", "switch"] : "fan");

// A climate entity is a heat pump (air to water) when its device has a hot water tank, when its device says so, or
// when it comes from an integration that only handles heat pumps (NIBE myUplink, Panasonic Aquarea Smart Cloud,
// Hitachi Yutaki). The others (MELCloud, ViCare, Daikin Onecta, Overkiz, Cozytouch) also handle air conditioners or
// boilers: their heat pumps are told apart by their hot water tank or their name.
const CA_HP_PLATFORMS = ["myuplink", "aquarea", "hitachi_yutaki"];
const CA_HP_NAME =
  /(heat.?pump|pompe.?[aà].?chaleur|air.?(to|[aà]|-).?(water|eau)|w[aä]rmepumpe|bomba de calor|pompa di calore|warmtepomp|altherma|aquarea|ecodan|yutaki|alfea|t\.?one|aquaair|vitocal|arotherm|geotherm|nibe)/i;

const CA_PURIFIER_NAME = /purif|air_?cleaner|air_?filter|epurateur/i;

// The Rituals Perfume Genie: an essential oil diffuser exposed as a `switch` (no humidifier entity), with its perfume
// amount, room size, cartridge fill and battery as separate entities. The humidifier card adopts its switch.
const CA_RITUALS_NAME = /rituals|perfume.?genie/i;

// Refrigeration appliances (fridge, freezer, wine cooler) are exposed as climate entities by some integrations
// (e.g. Liebherr), and can cool, but are not air conditioners: their setpoint range sits well below comfort
// temperature. Tell them apart by a fridge/freezer icon or name, or by a maximum setpoint below comfort cooling
// (unit-aware: 15 °C, or 60 °F).
const CA_FRIDGE_ICON = /fridge|freezer|snowflake-thermometer/i;
const CA_FRIDGE_NAME =
  /fridge|freezer|refrigerat|r[ée]frig[eé]r|cong[eé]lat|frigo|k[üu]hlschrank|gefrier|nevera|congelador|frigorif|koelkast|vriezer|lod[óo]wka|zamra[zż]|chladni[čc]|mrazni|hladnjak|zamrziva|[хx]олодильник|[мm]орозильник|frys|k[øo]leskab|fryseskab|ψυγε[ίi]|κατ[άa]ψυξ|wine.?(cooler|cellar|fridge)|cave.?[àa].?vin|cantinetta|vinoth[eè]que/i;
function caIsFridge(hass, id, st) {
  if (CA_FRIDGE_ICON.test(st.attributes.icon || "")) return true;
  const dev = hass.devices?.[caDeviceOf(hass, id)];
  if (CA_FRIDGE_NAME.test([st.attributes.friendly_name, dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" "))) return true;
  const maxT = Number(st.attributes.max_temp);
  const limit = (hass?.config?.unit_system?.temperature || "").includes("F") ? 60 : 15;
  return Number.isFinite(maxT) && maxT < limit;
}
function caKindOf(hass, id) {
  const st = hass?.states?.[id];
  if (!st) return null;
  return caMemo(hass, `kind:${id}`, () => {
    const domain = id.split(".")[0];
    if (domain === "climate") {
      const dev = hass.devices?.[caDeviceOf(hass, id)];
      const names = [id, st.attributes.friendly_name, dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" ");
      const own = caDeviceEntities(hass, caDeviceOf(hass, id));
      if (CA_HP_PLATFORMS.includes(hass.entities?.[id]?.platform)) return "heatpump";
      if (own.some((e) => e.entity_id.startsWith("water_heater.")) || CA_HP_NAME.test(names)) return "heatpump";
      const modes = st.attributes.hvac_modes || [];
      if (!modes.some((m) => m === "cool" || m === "dry" || m === "fan_only")) return null;
      // A fridge, freezer or wine cooler cools but is not an air conditioner.
      if (caIsFridge(hass, id, st)) return null;
      return "aircon";
    }
    // Humidifiers, dehumidifiers and diffusers: every humidifier entity (its device_class picks the illustration).
    if (domain === "humidifier") return "humidifier";
    if (domain === "select") {
      // A heat pump without a climate entity (TOUG): the select of its mode, on a device named as a heat pump that has
      // no climate entity of its own.
      if (!/mode/i.test(id) || !(st.attributes.options || []).some((o) => CA_HP_OFF.test(String(o).trim()))) return null;
      const devId = caDeviceOf(hass, id);
      const dev = hass.devices?.[devId];
      const names = [dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" ");
      if (!devId || !CA_HP_NAME.test(names)) return null;
      return caDeviceEntities(hass, devId).some((e) => e.entity_id.startsWith("climate.")) ? null : "heatpump";
    }
    if (domain === "switch") {
      // A diffuser driven by a switch (Rituals Perfume Genie): its device has no humidifier entity, so the humidifier
      // card adopts the switch, the way a heat pump without a climate entity is driven by a select. Match the
      // integration first, else the device or entity name.
      if (hass.entities?.[id]?.platform === "rituals_perfume_genie") return "humidifier";
      const dev = hass.devices?.[caDeviceOf(hass, id)];
      const names = [id, st.attributes.friendly_name, dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" ");
      return CA_RITUALS_NAME.test(names) ? "humidifier" : null;
    }
    if (domain !== "fan") return null;
    const dev = hass.devices?.[caDeviceOf(hass, id)];
    const names = [id, st.attributes.friendly_name, dev?.name, dev?.name_by_user, dev?.model].filter(Boolean).join(" ");
    const list = caDeviceEntities(hass, caDeviceOf(hass, id));
    // A fan on a device that is really a (de)humidifier or an air conditioner is that device's own blower, shown by
    // its humidifier / air-conditioner card — not a standalone comfort fan, which would duplicate the device.
    if (list.some((e) => e.entity_id.startsWith("humidifier.") || e.entity_id.startsWith("climate."))) return null;
    if (CA_PURIFIER_NAME.test(names)) return "purifier";
    if (caFindRole(hass, list, "pm25") || caFindRole(hass, list, "aqi") || caFindRole(hass, list, "filter")) return "purifier";
    return "fan";
  });
}

// A role of an entity's device, memoized (see caMemo): the whole-device scans only run again when the registry
// or the set of states changes.
function caRoleOf(hass, id, role) {
  const list = () => caDeviceEntities(hass, caDeviceOf(hass, id));
  return caMemo(
    hass,
    `role:${id}:${role}`,
    () => caFindRole(hass, list(), role),
    () => list().map((e) => hass.states[e.entity_id]),
  );
}

// Every entity of a kind, sorted by name; hidden entities and configuration entities are left out.
function caFindEntities(hass, kind) {
  if (!hass?.states) return [];
  return caMemo(hass, `list:${kind}`, () => {
    const domains = [caDomain(kind)].flat();
    return Object.keys(hass.states)
      .filter((id) => domains.includes(id.split(".")[0]))
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
// The status pill shows its whole label, or only its dot when that label truncates (at most half the header, the
// title keeping a few characters): measured on the rendered text, since a width threshold also hid labels that fit
// (a 245 px card showed only dots). Re-measured after each render and whenever the card's width changes.
const caFitPills = (root) => {
  for (const pill of root?.querySelectorAll?.(".st, .pill") || []) {
    if (!pill.getClientRects?.().length) continue;
    pill.classList.remove("dot-only");
    const stt = pill.querySelector(".stt");
    if (stt && (stt.scrollWidth > stt.clientWidth + 0.5 || pill.scrollWidth > pill.clientWidth + 0.5)) pill.classList.add("dot-only");
  }
};

class CaElement extends HTMLElement {
  connectedCallback() {
    if (typeof ResizeObserver === "undefined") return;
    this._ro ??= new ResizeObserver(() => this._fitPills());
    this._ro.observe(this);
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    // Off the page: an armed filter reset is disarmed (it comes back as a plain button).
    clearTimeout(this._armTimer);
    this._armedReset = null;
    this._pressing = false;
    window.removeEventListener("pointerup", this._onPressEnd, true);
    window.removeEventListener("pointercancel", this._onPressEnd, true);
  }

  // No rewrite of the card between a press and its release: Home Assistant updates the card several times a second,
  // and a rewrite under the pointer replaces the element pressed, so that the click lands on the card itself and does
  // nothing. The renders asked meanwhile are held (`_held()`) and `redraw` draws them once released (after the click).
  // `_pointer` tells the last input: a pointer (no focus put back after a rewrite, it would draw the focus ring) or
  // the keyboard.
  _watchPress(redraw) {
    this._onPressEnd = () => {
      window.removeEventListener("pointerup", this._onPressEnd, true);
      window.removeEventListener("pointercancel", this._onPressEnd, true);
      // After the click (same task): a press with no click (released elsewhere) draws what it held back.
      setTimeout(() => {
        this._pressing = false;
        if (this._dirty) redraw();
      }, 0);
    };
    this.shadowRoot.addEventListener("pointerdown", () => {
      this._pointer = true;
      this._pressing = true;
      window.addEventListener("pointerup", this._onPressEnd, true);
      window.addEventListener("pointercancel", this._onPressEnd, true);
    });
  }

  // True (and the render kept for later) while a press is in progress; called first by the renders.
  _held() {
    if (this._pressing) {
      this._dirty = true;
      return true;
    }
    this._dirty = false;
    return false;
  }

  // The click ends the press (its handler renders at once); Enter / Space click with no click count.
  _pressClicked(ev) {
    this._pressing = false;
    if (ev?.detail === 0) this._pointer = false;
  }

  _fitPills() {
    caFitPills(this.shadowRoot);
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }

  _lang() {
    return caLang(this._config, this._hass);
  }

  _intlLang() {
    return caIntlLang(this._config, this._hass);
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
    return { show_title: true, show_subtitle: true, show_controls: true, show_sensors: true, show_alerts: true, show_filter: true, filter_warning: CA_FILTER_WARNING };
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
    // show_title / show_subtitle: the header's title / subtitle, hidden by the stylesheet
    this.toggleAttribute?.("hide-title", config.show_title === false);
    this.toggleAttribute?.("hide-subtitle", config.show_subtitle === false);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.addEventListener("click", (ev) => this._onClick(ev));
      this.shadowRoot.addEventListener("change", (ev) => this._onChange(ev));
      // A slider shows its fill and its value while it moves, before the service is called.
      this.shadowRoot.addEventListener("input", (ev) => {
        if (ev.target?.type === "range") this._showRange(ev.target);
      });
      // Whether the last input came from a pointer or the keyboard: only a pointer is done with a control it changed.
      // A press also holds the rewrites until its click (see _watchPress).
      this._watchPress(() => this._update());
      this.shadowRoot.addEventListener("keydown", (ev) => {
        this._pointer = false;
        caChipKey(this, ev);
      });
      // A dropdown closed with Escape or a slider thumb touched without moving it fires no `change`: when the focus
      // leaves, draw the updates held back while it was there. Deferred so the focus has settled (it may only move
      // to another control of the card, which still holds them back). Focus staying inside the card draws nothing:
      // a mouse press on a button moves the focus between mousedown and mouseup, and a rebuild there would drop the
      // click; the click itself (or the next tick) draws the held updates.
      this.shadowRoot.addEventListener("focusout", (ev) => {
        this._flushRange();
        // Redrawn around a focused control: the next update rebuilds that control too.
        if (this._patched) this._sig = null;
        if (ev.relatedTarget && this.shadowRoot.contains(ev.relatedTarget)) return;
        setTimeout(() => this._update(), 0);
      });
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
    super.disconnectedCallback();
    this._flushRange();
    clearTimeout(this._tempTimer);
    clearTimeout(this._settleTimer);
    // Detached mid-debounce (dashboard edit, panel fold, zoom): send the pending target now instead of losing it
    // (unless it was sent already and only waits for the entity to report it).
    if (this._pendingTemp !== undefined) {
      const pending = this._pendingTemp;
      const sent = this._tempSent;
      this._pendingTemp = undefined;
      this._tempSent = false;
      this._sig = null;
      if (!sent && this._r?.id) this._call("climate", "set_temperature", { entity_id: this._r.id, ...caTempData(pending) });
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

  _fmtSensor(id, minDigits = 0) {
    const st = this._st(id);
    if (caUnavailable(st)) return null;
    const v = Number(st.state);
    if (!Number.isFinite(v)) return this._fmtState(id);
    const unit = st.attributes.unit_of_measurement || "";
    return `${caFmtNum(this._intlLang(), v, 1, minDigits)}${unit ? (unit === "%" ? " %" : ` ${unit}`) : ""}`;
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
    if (this._held()) return;
    const r = this._resolve();
    const hass = this._hass;
    const ids = [r.id, ...Object.values(r.ent), ...(this._extraIds?.(r) || [])];
    // Home Assistant replaces a `states[id]` object whenever the entity changes: comparing the ids and the state
    // object references is enough to tell a tick apart, with nothing serialized.
    const sig = [this._lang(), this._zoomed, this._pendingTemp, this._armedReset, hass.states["sun.sun"], hass.themes?.darkMode, ...(this._extraSig?.() || []), ...ids.flatMap((id) => [id, (id && hass.states[id]) || null])];
    if (this._sig && sig.length === this._sig.length && sig.every((v, i) => v === this._sig[i])) return;
    // A dropdown open or a slider held in the card is not rebuilt: the card is redrawn around it.
    const active = this.shadowRoot.activeElement;
    const held = active && (active.tagName === "SELECT" || active.tagName === "INPUT");
    const focus = caFocusKey(active);
    if (held && !focus) return;
    this._sig = sig;
    this._r = r;
    this._patched = held && this._renderAround(r, active, focus);
    if (!this._patched) {
      this._render(r);
      // The focus is put back for the keyboard only: after a mouse click, it would draw the focus ring.
      if (!this._pointer) caRestoreFocus(this.shadowRoot, focus);
    }
    this._fitPills();
  }

  // Draws the card around the focused control `keep` (see caPatchAround); false when it cannot.
  _renderAround(r, keep, key) {
    const fresh = document.createElement("div");
    this._render(r, fresh);
    const twin = caFindKey(fresh, key);
    if (!twin || !caPatchAround(this.shadowRoot, fresh, keep, twin)) return false;
    if (keep.type === "range") this._showRange(keep);
    return true;
  }

  // Overridden by the mini cards.
  _compact() {
    return false;
  }

  _zoomButton() {
    return "";
  }

  // Writes the card's markup into `target` (the shadow root, or a detached element for _renderAround).
  _render(r, target = this.shadowRoot) {
    const c = this._config;
    const kind = this.constructor.kind;
    const st = this._st(r.id);
    const icon = c.icon || (st && this._kindIcon?.(r)) || CA_KIND_ICONS[kind];
    if (!st) {
      target.innerHTML = `${this._styles()}<ha-card><div class="empty"><ha-icon icon="${caEsc(icon)}"></ha-icon>${caEsc(
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
    if (!m.online) m.chips.push(this._chip("mdi:cloud-off-outline", this._t("offline"), "", "", r.id));
    m.variant = caVariant(this._hass, kind, r.id, c.illustration);
    m.powerBtn =
      m.online && this._showPower(m)
        ? `<button class="power${m.running ? " on" : ""}" data-action="power" title="${caEsc(this._t("power"))}" aria-label="${caEsc(this._t("power"))}"><ha-icon icon="mdi:power"></ha-icon></button>`
        : "";
    // The round icon's colour tells the status: an alert in red, a warning in amber, else the state's colour (grey
    // when off or offline).
    m.badgeColor = !m.online
      ? CA_IDLE
      : m.chips.some((x) => x.includes("chip alert"))
        ? "var(--error-color, #db4437)"
        : m.chips.some((x) => x.includes("chip warn"))
          ? "var(--warning-color, #ffa600)"
          : m.color;
    m.illustrated = this._illustrated();
    const brand = m.illustrated ? caBrandBadge(caBrand(this._hass, r.id, c)) : "";
    m.badge = `<div class="badge"><ha-icon icon="${caEsc(icon)}"></ha-icon>${brand}</div>`;

    if (this._compact()) {
      target.innerHTML = this._miniHtml(m);
      return;
    }
    const sub = [caAreaName(this._hass, r.id), m.sub].filter(Boolean).join(" · ");
    const chips = m.chips.length ? `<div class="chips">${m.chips.join("")}</div>` : "";
    const head = m.illustrated
      ? this._banner(m, sub)
      : `<div class="header">${m.badge}<div class="titles"><div class="name">${caEsc(m.name)}</div>${sub ? `<div class="sub">${caEsc(sub)}</div>` : ""}</div>` +
        `${caPill(m.statusText)}${m.powerBtn}${this._zoomButton()}</div>`;
    // Under the banner, the device is in the picture above: the measurements, and the on / off button at their right.
    const hero = m.illustrated
      ? `<div class="hero"><div class="info">${this._heroInfo(m)}${chips}</div>${m.powerBtn}</div>`
      : `<div class="hero">${this._picture(m)}<div class="info">${this._heroInfo(m)}${chips}</div></div>`;
    target.innerHTML = `${this._styles(m.color, m.badgeColor)}<ha-card>${head}${hero}${c.show_controls && m.online ? this._controls(m) : ""}</ha-card>`;
  }

  // Whether the header is the illustrated banner (the default) or the classic one (`illustration: false`, or a
  // custom `icon` in place of the illustration).
  _illustrated() {
    return this._config.illustration !== false && this._config.illustration !== "none" && !this._config.icon && !!CA_ART[this.constructor.kind];
  }

  // The illustrated header: the round icon, the name with the status pill right after it and `sub` under them on the
  // left, the device in its room on the right.
  _banner(m, sub) {
    const kind = this.constructor.kind;
    this._uid ??= ++caUidSeq;
    const night = caIsNight(this._hass, this._config);
    const wall = CA_BANNER_WALL[kind]?.[night ? 1 : 0];
    const cls = ["banner", `k-${kind}-banner`, night ? "night" : "", m.running ? "running" : ""].filter(Boolean).join(" ");
    return (
      `<div class="${cls}"${wall ? ` style="--ca-wall:${wall};--ca-wall-fill:${wall}"` : ""}>` +
      `${caBannerScene(kind, m.variant, m, night, this._uid)}<div class="ground"></div>` +
      `<div class="bhead">${m.badge}<div class="titles"><div class="trow"><div class="name">${caEsc(m.name)}</div>${caPill(m.statusText)}</div>${sub ? `<div class="sub">${caEsc(sub)}</div>` : ""}</div></div>` +
      `${this._zoomButton()}</div>`
    );
  }

  // Whether the header's on / off button shows. A metered heat pump (its entity is a power sensor) is read-only.
  _showPower() {
    return true;
  }

  _picture(m) {
    if (this._config.icon) {
      return `<div class="picture${m.running ? " running" : ""}"><div class="iconart"><ha-icon icon="${caEsc(m.icon)}"></ha-icon></div></div>`;
    }
    return caPicture(this.constructor.kind, m.variant, m);
  }

  // A chip with an icon and a value; `cls` tints it (warn, alert). With an `entity`, a click (or Enter / Space) opens
  // its more-info.
  _chip(icon, text, cls = "", title = "", entity = "") {
    const more = entity ? ` data-more-info="${caEsc(entity)}" role="button" tabindex="0"` : "";
    return `<span class="chip ${cls}"${more}${title ? ` title="${caEsc(title)}"` : ""}><ha-icon icon="${icon}"></ha-icon>${caEsc(text)}</span>`;
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
      out.push(this._chip(icons[role], `${prefix}${v}`, "", this._label(ent[role]), ent[role]));
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

  // ── Filter ──
  // The filter of the device: its life (%, `filter`), its hours of use, and its wear `level` — "replace", "soon" (see
  // caFilterLevel) or "dirty" (a dirty-filter binary sensor on, an air conditioner's "full dust"). `entity` is what its
  // chip opens. `known`: the device reports its filter one way or the other.
  _filterState(ent) {
    const pct = this._num(ent.filter);
    let level = caFilterLevel(pct, this._config.filter_warning);
    if (!level && this._val(ent.filter_alert) === "on") level = "dirty";
    const entity = level === "dirty" ? ent.filter_alert : ent.filter || ent.filter_alert;
    return { pct, level, hours: this._num(ent.filter_hours), entity, known: pct != null || this._avail(ent.filter_alert) };
  }

  _filterText(f) {
    if (f.level === "soon") return this._t("filter_soon");
    if (f.level === "replace") return this._t("filter_low");
    if (f.level === "dirty") return this._t("filter_dirty");
    return this._t("filter_ok");
  }

  // The alert chip of a worn filter (red once it is to replace, orange before), when the alerts are shown.
  _filterChip(f) {
    if (!this._config.show_alerts || !f.level) return "";
    return this._chip("mdi:air-filter", this._filterText(f), f.level === "replace" ? "alert" : "warn", "", f.entity);
  }

  // The filter's line: its life as a bar (tinted when worn), else its state from the dirty-filter sensor.
  _filterLine(f) {
    if (!this._config.show_filter || !f.known) return "";
    const cls = f.level === "replace" ? " low" : f.level ? " soon" : "";
    const hours = f.hours != null ? ` · ${this._t("hours", { n: caFmtNum(this._intlLang(), f.hours, 0) })}` : "";
    const title = caEsc(`${this._t("filter")}${this._t("colon")}${this._filterText(f)}${hours}`);
    const more = f.entity ? ` data-more-info="${caEsc(f.entity)}" role="button" tabindex="0"` : "";
    if (f.pct != null) return `<div class="filter${cls}" title="${title}"${more}>${caBar(f.pct, `${Math.round(f.pct)} %`, "mdi:air-filter")}</div>`;
    // No life figure: the state alone ("Filter OK"), left to the alert chip once dirty.
    if (f.level && this._config.show_alerts) return "";
    return `<div class="filter${cls}" title="${title}"${more}>${caLine("mdi:air-filter", this._filterText(f))}</div>`;
  }

  // The button that resets the filter counter, offered once the filter is worn or dirty. A first tap arms it (its
  // label asks to tap again), the second one, within CA_RESET_ARM ms, presses the button entity.
  _filterResetButton(f, id) {
    if (!id || !f.level || !this._st(id)) return "";
    const armed = this._armedReset === id;
    const label = this._t(armed ? "filter_reset_confirm" : "filter_reset");
    return `<button class="toggle${armed ? " on" : ""}" data-action="filter-reset" data-value="${caEsc(id)}"${this._val(id) === "unavailable" ? " disabled" : ""}><ha-icon icon="mdi:restore"></ha-icon>${caEsc(label)}</button>`;
  }

  _resetFilter(id) {
    clearTimeout(this._armTimer);
    if (this._armedReset === id) {
      this._armedReset = null;
      this._call("button", "press", { entity_id: id });
    } else {
      this._armedReset = id;
      this._armTimer = setTimeout(() => {
        this._armedReset = null;
        this._update();
      }, CA_RESET_ARM);
    }
    this._update();
  }

  // A speed slider for the fan or purifier entity.
  _speedSlider(id) {
    const st = this._st(id);
    const pct = st.state === "on" ? Number(st.attributes.percentage ?? 0) : 0;
    // The step stays decimal: rounded, a 3-speed fan (33.333) would offer 33/66/99 and never reach full speed.
    // The top notch (99.999) still lands in the last speed band, since fans map a percentage by rounding up.
    const step = Math.max(1, Number(st.attributes.percentage_step) || 1);
    return this._rangeHtml("range", "percentage", "mdi:speedometer", this._t("speed"), step, 100, step, Math.max(step, pct), st.state === "on" ? `${Math.round(pct)} %` : "—", pct);
  }

  // A slider: icon, label, the range input and its value. `data-<key>="<val>"` names what it sets (range: percentage,
  // number: an entity, humidity: the climate target); `text` and `fill` replace the value shown and the fill (a fan
  // shows its own percentage, which the notches may round: — and no fill when off).
  _rangeHtml(key, val, icon, label, min, max, step, value, text = null, fill = null) {
    const d = { [key]: val };
    const pct = fill ?? this._rangePct(d, value, min, max);
    return (
      `<div class="slider"><ha-icon icon="${icon}"></ha-icon><span class="sl-label">${caEsc(label)}</span>` +
      `<input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-${key}="${caEsc(val)}" aria-label="${caEsc(label)}" style="--p:${pct}%">` +
      `<span class="v">${caEsc(text ?? this._rangeText(d, value))}</span></div>`
    );
  }

  // The fill of a slider (%): a fan speed is already a percentage, other values are placed between min and max.
  _rangePct(d, v, min, max) {
    return d.range === "percentage" ? v : ((v - min) / (max - min || 1)) * 100;
  }

  // The value shown next to a slider.
  _rangeText(d, v) {
    if (d.range === "percentage" || d.humidity) return `${Math.round(v)} %`;
    const unit = (d.number && this._st(d.number)?.attributes.unit_of_measurement) || "";
    return `${caFmtNum(this._intlLang(), v)}${unit ? ` ${unit}` : ""}`;
  }

  // While a slider moves (dragged, or arrows held down), its fill and value follow it.
  _showRange(el) {
    const v = Number(el.value);
    el.style.setProperty("--p", `${this._rangePct(el.dataset, v, Number(el.min), Number(el.max))}%`);
    const out = el.parentNode?.querySelector(".v");
    if (out) out.textContent = this._rangeText(el.dataset, v);
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
      const text = (o) => (o === 0 && /timer|countdown|delay|minuterie|temporizador|ausschalt/.test(id) ? this._t("timer_off") : `${caFmtNum(this._intlLang(), o)}${unit ? ` ${unit}` : ""}`);
      return `<label class="field"><span>${caEsc(label)}</span><select data-number="${caEsc(id)}">${opts
        .map((o) => `<option value="${o}"${o === v ? " selected" : ""}>${caEsc(text(o))}</option>`)
        .join("")}</select></label>`;
    }
    return this._rangeHtml("number", id, icon || "mdi:tune-variant", label, min, max, step, v);
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
  // A refusal (out of range, entity unavailable) is already reported by Home Assistant's own toast: it must not
  // also surface as an unhandled rejection.
  // Resolves to whether Home Assistant accepted the call; a refused call is not an unhandled rejection.
  _call(domain, service, data) {
    return Promise.resolve(this._hass.callService(domain, service, data)).then(
      () => true,
      () => false,
    );
  }

  _onClick(ev) {
    this._pressClicked(ev);
    const el = ev.composedPath().find((n) => n.dataset && (n.dataset.action || n.dataset.toggle || n.dataset.press || n.dataset.moreInfo));
    if (!el || el.disabled) return;
    const d = el.dataset;
    if (d.moreInfo) {
      caMoreInfo(this, d.moreInfo);
      return;
    }
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
  _action(action, value) {
    if (action === "filter-reset") {
      this._resetFilter(value);
      return;
    }
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
    const value = el.value;
    let send;
    if (d.range === "percentage") send = () => this._call("fan", "set_percentage", { entity_id: id, percentage: Number(value) });
    else if (d.number) send = () => this._call("number", "set_value", { entity_id: d.number, value: Number(value) });
    else if (d.humidity) send = () => this._call("climate", "set_humidity", { entity_id: id, humidity: Number(value) });
    else if (d.select) send = () => this._call("select", "select_option", { entity_id: d.select, option: value });
    else if (d.attrService) send = () => this._call(id.split(".")[0], d.attrService, { entity_id: id, [d.attr]: value });
    else send = this._extraSend?.(d, value);
    if (!send) return;
    if (this._pointer) {
      // A pointer is done with the control: the focus leaves it, so the card redraws (it does not while a dropdown or
      // a slider has the focus).
      send();
      el.blur();
      return;
    }
    // From the keyboard the focus stays. A slider sends a change per arrow press: like the − / + of the target
    // temperature, the service is called once the presses stop (or the focus leaves).
    if (el.type !== "range") {
      send();
      return;
    }
    clearTimeout(this._rangeTimer);
    this._rangeSend = send;
    this._rangeTimer = setTimeout(() => this._flushRange(), CA_TEMP_DEBOUNCE);
  }

  // Sends the slider value still waiting for the keyboard presses to stop.
  _flushRange() {
    clearTimeout(this._rangeTimer);
    const send = this._rangeSend;
    this._rangeSend = null;
    send?.();
  }

  // ── Styles ──
  _styles(color, badge) {
    return `<style>${CA_STYLES}${CA_ART[this.constructor.kind]?.styles || ""}${this.constructor.styles || ""}</style><style>:host{--ca-color:${color || CA_IDLE};--ca-badge:${badge || color || CA_IDLE};}</style>`;
  }

  // The device's other switches (eco, display, self clean, child lock…) are listed as options.
  _switches(r) {
    return r.list.map((e) => e.entity_id).filter((id) => id.startsWith("switch.") && !r.used.has(id));
  }

  // A round button of a mini card that moves to the next option (preset, mode): `label` names it, `icon` shows it.
  _cycleButton(action, label, icon) {
    const t = caEsc(label);
    return `<button class="round on" data-action="${action}" title="${t}" aria-label="${t}"><ha-icon icon="${icon || "mdi:tune-variant"}"></ha-icon></button>`;
  }

  // The device's other switches (eco, display, self clean…) as option toggles.
  _switchToggles(r) {
    return this._toggles(
      this._switches(r).map((id) => {
        const info = caSwitchInfo(id);
        return this._toggle(id, info ? this._t(`sw_${info[2]}`) : this._label(id), info?.[1] || "mdi:toggle-switch-outline");
      }),
    );
  }
}

// ── Climate cards ────────────────────────────────────────────────────────────
// The climate card the air conditioner card builds on: the mode buttons, the − / + of the target (one temperature or a
// low / high range), the target humidity, the fan / swing / preset selects and the device's switches as options.
// Subclasses implement _model(r) (with cur, target, range, mode, running) and may set `_heroLine(m)` for the line under
// the temperatures.
// The device switches listed as options: icon and label (`sw_<key>`) from the entity ID, since integrations often
// name them in English only (Midea: "Prompt tone", "Smart eye"…). The first match wins; others keep their own name.
const CA_SWITCHES = [
  [/outdoor_?silent|silence_?ext/, "mdi:volume-off", "outdoor_silent"],
  [/aux|auxiliary|electric_?heat|appoint/, "mdi:radiator", "aux_heat"],
  [/frost|freeze|8_?deg|antigel|hors_?gel/, "mdi:snowflake-thermometer", "frost"],
  [/eco/, "mdi:leaf", "eco"],
  [/display|screen|ecran/, "mdi:monitor", "display"],
  [/tone|sound|buzzer|beep|prompt|bip/, "mdi:volume-high", "sound"],
  [/self_?clean|autonettoyage|clean/, "mdi:broom", "self_clean"],
  [/silent|quiet|silence/, "mdi:volume-off", "silent"],
  [/smart_?eye|eye|presence/, "mdi:eye-outline", "smart_eye"],
  [/anion|ioni/, "mdi:creation-outline", "anion"],
  [/turbo|boost/, "mdi:rocket-launch-outline", "turbo"],
  [/breeze/, "mdi:weather-windy", "breeze"],
  [/sleep/, "mdi:power-sleep", "sleep"],
  [/light|led/, "mdi:lightbulb-outline", "light"],
];
const caSwitchInfo = (id) => CA_SWITCHES.find(([re]) => re.test(id.split(".")[1] || id));

class CaClimateCard extends CaCard {
  _extraIds(r) {
    return this._switches(r);
  }

  _unit() {
    return this._hass.config?.unit_system?.temperature || "°C";
  }

  // A target sent stays on screen until the entity reports it (then the entity's own value takes over), so it does
  // not jump back to the old one in between.
  _update() {
    this._settle();
    super._update();
  }

  _settle() {
    const p = this._pendingTemp;
    const st = this._tempSent && this._r && this._st(this._r.id);
    if (!st) return;
    const a = st.attributes;
    const same = (x, y) => x != null && Math.abs(Number(x) - y) < 1e-6;
    if (typeof p === "number" ? same(a.temperature, p) : same(a.target_temp_low, p.target_temp_low) && same(a.target_temp_high, p.target_temp_high)) {
      this._clearPending();
    }
  }

  _clearPending() {
    clearTimeout(this._settleTimer);
    this._pendingTemp = undefined;
    this._tempSent = false;
    this._sig = null;
  }

  _target(st) {
    if (typeof this._pendingTemp === "number") return this._pendingTemp;
    return st.attributes.temperature == null ? null : Number(st.attributes.temperature);
  }

  // A low / high range (heat_cool, auto) when the entity sets one instead of a single target.
  _range(st) {
    const range = caClimateRange(st.attributes);
    const p = this._pendingTemp;
    if (range && p && typeof p === "object") return { low: p.target_temp_low, high: p.target_temp_high };
    return range;
  }

  // The text on the unit's display: the target, the range in whole degrees (20-24) or "--".
  _display(mode, target, range) {
    const n = (v, digits) => caFmtNum(this._intlLang(), v, digits);
    if (mode === "fan_only") return "--";
    if (range) return `${n(range.low, 0)}-${n(range.high, 0)}`;
    return target != null ? `${n(target)}°` : "--";
  }

  _temp(v, digits = 1) {
    return `${caFmtNum(this._intlLang(), v, digits)} ${this._unit()}`;
  }

  _showTarget(m) {
    return m.running && (m.target != null || m.range != null) && m.mode !== "fan_only";
  }

  // The target as text: one temperature, or the range (20–24 °C).
  _targetText(m) {
    if (!m.range) return this._temp(m.target);
    return `${caFmtNum(this._intlLang(), m.range.low)}–${this._temp(m.range.high)}`;
  }

  // One − / + stepper: `action` is temp (single target), temp_low or temp_high, `hint` names the value in the labels.
  // `opts.unit` overrides the shown unit and `opts.dataValue(dir)` the button's data-value (so another card can carry
  // an entity id to its own handler — see the heat-pump setpoints).
  _stepper(action, value, label, hint, opts = {}) {
    const unit = opts.unit || this._unit();
    const dv = opts.dataValue || ((dir) => dir);
    const btn = (dir, key, icon) => {
      const text = hint ? `${this._t(key)} (${hint})` : this._t(key);
      return `<button class="round" data-action="${action}" data-value="${caEsc(String(dv(dir)))}" title="${caEsc(text)}" aria-label="${caEsc(text)}"><ha-icon icon="${icon}"></ha-icon></button>`;
    };
    return (
      '<div class="stepper">' +
      btn("-1", "temp_down", "mdi:minus") +
      `<div class="tv"><span class="tval">${caFmtNum(this._intlLang(), value)}<small> ${caEsc(unit)}</small></span><span class="tl">${caEsc(label)}</span></div>` +
      btn("1", "temp_up", "mdi:plus") +
      "</div>"
    );
  }

  _heroInfo(m) {
    const cur = m.cur != null ? `<span class="val">${caFmtNum(this._intlLang(), m.cur)}<small> ${caEsc(this._unit())}</small></span>` : "";
    const target = this._showTarget(m) ? `<span class="arrow">→ ${caEsc(this._targetText(m))}</span>` : "";
    if (!cur) return `<div class="big"><span class="state-big">${caEsc(m.statusText)}</span></div>${this._heroLine(m)}`;
    return `<div class="big">${cur}${target}</div>${this._heroLine(m)}`;
  }

  _controls(m) {
    const r = this._r;
    const st = this._st(r.id);
    const a = st.attributes;
    const f = a.supported_features || 0;
    const modes = (a.hvac_modes || []).filter((x) => x !== "off");
    const segs = this._segments("hvac", modes, m.mode, (o) => this._fmtState(r.id, o), (o) => CA_MODE_ICONS[o]);
    let stepper = "";
    if (m.range && this._showTarget(m)) {
      const low = this._t("target_low");
      const high = this._t("target_high");
      stepper = `<div class="steppers">${this._stepper("temp_low", m.range.low, low, low)}${this._stepper("temp_high", m.range.high, high, high)}</div>`;
    } else if (f & CA_CLIMATE_TARGET && this._showTarget(m)) stepper = this._stepper("temp", m.target, this._t("target"));
    // Target humidity (dehumidifying units): a slider calling climate.set_humidity.
    const hum =
      m.running && f & CA_CLIMATE_TARGET_HUMIDITY && a.humidity != null
        ? this._rangeHtml("humidity", "target", "mdi:water-percent", this._t("target_humidity"), Number(a.min_humidity ?? 30), Number(a.max_humidity ?? 99), 1, Number(a.humidity))
        : "";
    const selects = m.running
      ? [
          f & CA_CLIMATE_FAN_MODE ? this._selectAttr("fan_mode", "fan_modes", "set_fan_mode", this._t("fan_mode")) : "",
          f & CA_CLIMATE_SWING ? this._selectAttr("swing_mode", "swing_modes", "set_swing_mode", this._t("swing_mode")) : "",
          f & CA_CLIMATE_SWING_HORIZONTAL
            ? this._selectAttr("swing_horizontal_mode", "swing_horizontal_modes", "set_swing_horizontal_mode", this._t("swing_horizontal_mode"))
            : "",
          f & CA_CLIMATE_PRESET ? this._selectAttr("preset_mode", "preset_modes", "set_preset_mode", this._t("preset_mode")) : "",
        ].filter(Boolean)
      : [];
    const toggles = this._switchToggles(r);
    const extra = this._toggles(this._extraOptions(m));
    return (
      this._section("", segs + stepper + hum + (selects.length ? `<div class="grid">${selects.join("")}</div>` : "")) + this._midSections(m) + this._options(toggles + extra)
    );
  }

  // Sections a kind adds between the controls and the options (the heat pump's hot water).
  _midSections() {
    return "";
  }

  // Buttons a kind adds at the end of the options (the air conditioner's filter reset).
  _extraOptions() {
    return [];
  }

  _action(action, value) {
    const id = this._r.id;
    if (action === "hvac") this._call("climate", "set_hvac_mode", { entity_id: id, hvac_mode: value });
    else if (action === "temp") this._step(Number(value));
    else if (action === "temp_low") this._step(Number(value), "low");
    else if (action === "temp_high") this._step(Number(value), "high");
    else super._action(action, value);
  }

  // Each tap moves the target by one step at once on screen; the service is called once the taps stop, and the new
  // target stays shown until the entity reports it (CA_TEMP_SETTLE at most, at once if the call is refused). `bound`
  // (low or high) moves that end of a range, which keeps at least one step between the two.
  _step(dir, bound) {
    const st = this._st(this._r.id);
    const a = st.attributes;
    const step = Number(a.target_temp_step) || (this._unit() === "°F" ? 1 : 0.5);
    const min = Number(a.min_temp ?? 7);
    const max = Number(a.max_temp ?? 35);
    // Rounded so a 0.1 step sends 21.3, not 21.300000000000001.
    const fix = (v) => +v.toFixed(2);
    const next = (cur, lo, hi) => fix(Math.min(hi, Math.max(lo, Math.round((cur + dir * step) / step) * step)));
    if (bound) {
      const r = this._range(st);
      if (!r) return;
      this._pendingTemp =
        bound === "low"
          ? { target_temp_low: next(r.low, min, Math.min(max, fix(r.high - step))), target_temp_high: r.high }
          : { target_temp_low: r.low, target_temp_high: next(r.high, Math.max(min, fix(r.low + step)), max) };
    } else {
      const cur = this._target(st);
      if (cur == null) return;
      this._pendingTemp = next(cur, min, max);
    }
    clearTimeout(this._settleTimer);
    this._tempSent = false;
    this._update();
    clearTimeout(this._tempTimer);
    this._tempTimer = setTimeout(async () => {
      const pending = this._pendingTemp;
      const ok = await this._call("climate", "set_temperature", { entity_id: this._r.id, ...caTempData(pending) });
      // Tapped again meanwhile: that newer target is the one waiting.
      if (this._pendingTemp !== pending) return;
      if (!ok) this._clearPending();
      else {
        this._tempSent = true;
        this._settleTimer = setTimeout(() => {
          if (this._pendingTemp !== pending) return;
          this._clearPending();
          this._update();
        }, CA_TEMP_SETTLE);
      }
      this._update();
    }, CA_TEMP_DEBOUNCE);
  }

  // What the climate model starts from: the entity, its mode, the room temperature (from the entity, else the
  // device's indoor sensor) and the target, one temperature or a low / high range.
  _climate(r) {
    const ent = r.ent;
    const st = this._st(r.id);
    const a = st.attributes;
    const mode = st.state;
    const range = this._range(st);
    return {
      ent,
      st,
      a,
      mode,
      on: mode !== "off",
      cur: a.current_temperature != null ? Number(a.current_temperature) : this._num(ent.indoor_temp),
      range,
      target: range ? null : this._target(st),
    };
  }

  // The mini card's temperature line: the room temperature, and the target while it runs.
  _tempLine(m) {
    if (m.cur == null) return "";
    const target = this._showTarget(m) ? ` → ${this._targetText(m)}` : "";
    return `<div class="line tline"><ha-icon icon="mdi:thermometer"></ha-icon><span><b>${caEsc(this._temp(m.cur))}</b>${caEsc(target)}</span></div>`;
  }

  // The line under the temperatures (the fan mode of an air conditioner).
  _heroLine() {
    return "";
  }

  _miniButtons(m) {
    // A range has four buttons: they stay on the full card, which the mini card unfolds into.
    if (m.range || !this._showTarget(m) || !((this._st(this._r.id).attributes.supported_features || 0) & CA_CLIMATE_TARGET)) return [];
    return [
      ["-1", "mdi:minus", "temp_down"],
      ["1", "mdi:plus", "temp_up"],
    ].map(([v, icon, key]) => `<button class="round" data-action="temp" data-value="${v}" title="${caEsc(this._t(key))}" aria-label="${caEsc(this._t(key))}"><ha-icon icon="${icon}"></ha-icon></button>`);
  }

  static styles = `
    .stepper { display: flex; align-items: center; justify-content: center; gap: 18px; }
    /* A low / high range: two steppers side by side, one under the other when they do not fit. */
    .steppers { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 20px; }
    .steppers .stepper { gap: 8px; }
    .steppers .tv { min-width: 72px; }
    .steppers .tval { font-size: 24px; }
    .steppers .round { width: 40px; height: 40px; }
    .tv { display: flex; flex-direction: column; align-items: center; min-width: 96px; }
    .tval { font-size: 30px; font-weight: 400; line-height: 1.1; color: var(--primary-text-color); font-variant-numeric: tabular-nums; white-space: nowrap; }
    .tval small { font-size: 14px; color: var(--secondary-text-color); }
    .tl { font-size: 11px; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: .04em; }
    .stepper .round { width: 44px; height: 44px; background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }
    .stepper .round:hover:not(:disabled) { background: color-mix(in srgb, var(--ca-color) 24%, transparent); }
    ha-card.mini .round[data-action=temp] { width: 36px; height: 36px; }
    /* Narrow cards (inner width): the target stepper tightens so its buttons stay inside the card. */
    @container (max-width: 230px) { .stepper { gap: 8px; } .tv { min-width: 0; } }
    @container (max-width: 180px) {
      .stepper { gap: 4px; }
      .stepper .round { width: 36px; height: 36px; }
      .tval { font-size: 24px; }
    }
  `;
}

const CA_KIND_ICONS = { purifier: "mdi:air-purifier", fan: "mdi:fan", aircon: "mdi:air-conditioner", heatpump: "mdi:heat-pump-outline", humidifier: "mdi:air-humidifier" };

// ── Heat pumps ───────────────────────────────────────────────────────────────
// What a heat pump does, from its climate entity (or, without one, the select of its mode: TOUG's « mode air ») and
// the roles of its device, shared by its card and the overview tiles. `roleSt(role)` gives a role's state.
//   phase: off, heat, cool or dhw (the valve sends the heat to the hot water tank); active: the compressor runs.
const CA_HP_DHW_COLOR = "var(--state-water_heater-on-color, #ef9f27)";
const CA_HP_DHW = /(ecs|dhw|hot.?water|eau.?chaude|sanitaire|warm.?wasser|\bacs\b|^water$|^tank$|ballon)/i;
const CA_HP_COOL = /(clim|cool|froid|refroid|k[uü]hl|fr[ií]o|enfri)/i;
const CA_HP_OFF = /^(off|arr[eê]t|stop|aus|apagado|spento)$/i;
const CA_HP_IDLE = /(standby|veille|idle|repos|attente|^off$)/i;
const caHpIsOn = (id, state) => (id.startsWith("climate.") ? state !== "off" : !CA_HP_OFF.test(String(state ?? "").trim()));

// A power sensor's reading in watts, whatever unit it reports (W by default, kW or MW scaled up). Drives the
// "running" state of a metered heat pump and, when no COP sensor is given, the instantaneous COP.
const caPowerW = (st) => {
  const v = caNum(st);
  if (v == null) return null;
  const u = String(st?.attributes?.unit_of_measurement || "").toLowerCase();
  return u === "kw" ? v * 1000 : u === "mw" ? v * 1e6 : v;
};
// The default power above which a metered heat pump counts as running (watts): well under the few kW the compressor
// draws, well above the tens of watts it idles at (the reporter's WPF 16: 39 W idle, ~5 kW running).
const CA_HP_POWER_ON = 100;

// The source side of a heat pump, for the illustration: `air` (an outdoor fan unit, the default), `ground` (a
// geothermal loop — a horizontal `collector` or a vertical `borehole`) or `water` (an open loop — a single `well`,
// a two-well `doublet` or a submerged `lake` loop). Taken from the config, else guessed from the device's name.
const CA_HP_SOURCES = ["air", "ground", "water"];
const CA_HP_GROUND_TYPES = ["collector", "borehole"];
const CA_HP_WATER_TYPES = ["well", "doublet", "lake"];
const CA_HP_WATER_NAME = /(water.?source|water.?to.?water|eau.?glycol|eau.?nappe|nappe.?phr[ée]at|grundwasser|wasser.?wasser|\bwell\b|\bpuits\b|aquif)/i;
const CA_HP_GROUND_NAME = /(ground.?source|geothermal|g[ée]othermi|erdw[aä]rme|sol.?eau|\bbrine\b|saumure|\bsole\b|borehole|sonde.?g[ée]o|capteur.?enterr)/i;
function caHpSource(config, hass, id) {
  const c = config || {};
  const text = hass && id ? caVariantText(hass, id) : "";
  const source = CA_HP_SOURCES.includes(c.source)
    ? c.source
    : CA_HP_WATER_NAME.test(text)
      ? "water"
      : CA_HP_GROUND_NAME.test(text)
        ? "ground"
        : "air";
  const groundType = CA_HP_GROUND_TYPES.includes(c.ground_type) ? c.ground_type : "collector";
  const waterType = CA_HP_WATER_TYPES.includes(c.water_type) ? c.water_type : "well";
  return { source, groundType, waterType };
}

function caHeatPumpState(id, st, roleSt, opts = {}) {
  const a = st.attributes;
  const climate = id.startsWith("climate.");
  const select = id.startsWith("select.");
  // Measured but not controlled: the entity is an electrical power sensor (no climate entity, no mode select).
  const metered = !climate && !select;
  const mode = st.state;
  const valve = String(roleSt("valve")?.state ?? "");
  const dhw = roleSt("dhw");
  let on;
  if (metered) {
    const powerW = caPowerW(st);
    const threshold = Number.isFinite(Number(opts.powerThreshold)) ? Number(opts.powerThreshold) : CA_HP_POWER_ON;
    on = powerW != null && powerW > threshold;
  } else on = caHpIsOn(id, mode);
  const defrost = on && roleSt("defrost")?.state === "on";
  const backup = on && roleSt("backup")?.state === "on";
  const freq = caNum(roleSt("compressor"));
  const action = climate ? a.hvac_action : undefined;
  const toTank = on && CA_HP_DHW.test(valve);
  const cool = metered ? false : climate ? (action ? action === "cooling" : mode === "cool") : CA_HP_COOL.test(String(mode));
  const idle = action ? ["idle", "off"].includes(action) : !toTank && CA_HP_IDLE.test(valve);
  // Metered: the pump runs whenever it draws power, so running means active (the compressor is on).
  const active = on && (metered || (freq != null ? freq > 0 : toTank || !idle));
  const phase = !on ? "off" : toTank ? "dhw" : cool ? "cool" : "heat";
  const tankSt = dhw?.attributes.current_temperature != null ? Number(dhw.attributes.current_temperature) : caNum(roleSt("tank_temp"));
  return {
    on,
    phase,
    active,
    defrost,
    backup,
    color: phase === "off" ? CA_IDLE : phase === "dhw" ? CA_HP_DHW_COLOR : CA_MODE_COLORS[phase],
    tank: Number.isFinite(tankSt) ? tankSt : null,
    tankTarget: dhw?.attributes.temperature != null ? Number(dhw.attributes.temperature) : null,
    statusKey: !on ? "st_off" : defrost ? "st_defrost" : phase === "dhw" ? "st_dhw" : !active ? "st_idle" : cool ? "st_cooling" : "st_heating",
  };
}

// The zones of a multi-zone air-to-water heat pump reported as a thermostat `number` per room (Aldes T.One AquaAir: one
// motorised vent and one setpoint per room, 22 °C in one room and 19 in another). A zone is a temperature `number` on
// the device — its unit is a temperature, or its name says setpoint / thermostat — paired, when one exists, with the
// `sensor` of the same object id for the room's current temperature. The hot water setpoint is not a zone. Sorted by
// name, so the rooms keep a stable order between renders.
const CA_ZONE_STRIP = /\b(r[ée]glages?|consignes?|thermostats?|targets?|setpoints?|sollwerte?|temp[ée]ratures?|temperaturas?|temperaturen?|zones?|zonas?)\b/gi;
function caHeatPumpZoneName(hass, id) {
  let name = hass.states[id]?.attributes.friendly_name || id;
  const dev = caDeviceName(hass, id);
  if (dev && name.toLowerCase().startsWith(dev.toLowerCase())) name = name.slice(dev.length);
  name = name
    .replace(CA_ZONE_STRIP, " ")
    .replace(/[_·-]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
}

// A room name reduced to a comparison key: accents dropped, non-letters collapsed ("Chambre parentale" and
// "chambre_parentale" both become "chambreparentale"), so a setpoint number pairs with its temperature sensor
// even when the two entities do not share an object id.
const caZoneKey = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

// An object id with its role words dropped (number.t_one_thermostat_chambre_ami and
// sensor.t_one_temperature_chambre_ami both become "t_one_chambre_ami"), so a setpoint pairs with its room's sensor
// from the entity ids alone, whatever their friendly names say (#96).
const CA_ZONE_ROLE = /^(r[ée]glages?|consignes?|thermostats?|targets?|setpoints?|sollwerte?|temp[ée]ratures?|temperaturas?|temperaturen?|temp)$/i;
const caZoneBase = (obj) =>
  obj
    .split("_")
    .filter((p) => p && !CA_ZONE_ROLE.test(p))
    .join("_");

// `exclude` hides zones the user does not want (a test setpoint, or a second motorised vent driven by the same
// thermostat): the entity ids to drop, as set in the card config.
function caHeatPumpZones(hass, id, exclude, map) {
  const skip = new Set(exclude || []);
  const override = map || {};
  const list = caDeviceEntities(hass, caDeviceOf(hass, id));
  // The device's room temperature sensors (never a shared ECS, ballon or outdoor sensor), each with its object id
  // and its room key, to pair with the setpoints.
  const temps = [];
  for (const e of list) {
    const eid = e.entity_id;
    if (!eid.startsWith("sensor.")) continue;
    const a = hass.states[eid]?.attributes || {};
    if (a.device_class !== "temperature" && !/°|deg|celsius|fahrenheit/i.test(a.unit_of_measurement || "")) continue;
    if (CA_HP_DHW.test(eid)) continue;
    const obj = eid.slice(eid.indexOf(".") + 1);
    temps.push({ eid, obj, base: caZoneBase(obj), key: caZoneKey(caHeatPumpZoneName(hass, eid)) });
  }
  // The setpoints: a thermostat number per room.
  const setpoints = [];
  for (const e of list) {
    const eid = e.entity_id;
    if (!eid.startsWith("number.") || skip.has(eid)) continue;
    const a = hass.states[eid]?.attributes || {};
    const isTemp = /°|deg|celsius|fahrenheit/i.test(a.unit_of_measurement || "") || a.device_class === "temperature";
    if (!isTemp && !/thermostat|consigne|setpoint|sollwert|temp[ée]ratur/i.test(eid)) continue;
    if (CA_HP_DHW.test(eid)) continue;
    const obj = eid.slice(eid.indexOf(".") + 1);
    const name = caHeatPumpZoneName(hass, eid) || obj;
    setpoints.push({ eid, obj, base: caZoneBase(obj), name, key: caZoneKey(name) });
  }
  // Pair each setpoint with its room's temperature sensor as a one-to-one assignment, so a sensor is never shown on
  // two rooms and an unrelated sensor (a second motorised vent, the outdoor probe) is never paired at all. A pair is
  // scored by how strongly the two belong to the same room — the same object id (the test fixture) or the same id
  // once the role words are dropped (number.t_one_thermostat_sejour with sensor.t_one_temperature_sejour), the same room
  // name, one room name contained in the other, or a shared trailing id segment — and the strongest pairs are
  // assigned first. An explicit `zone_temps` mapping
  // (setpoint → sensor) wins over all of it, for a device whose names and ids give the matcher nothing to go on.
  const paired = new Map();
  const taken = new Set();
  for (const sp of setpoints) {
    const ov = override[sp.eid];
    if (ov && hass.states[ov]) {
      paired.set(sp.eid, ov);
      taken.add(ov);
    }
  }
  const seg = (o) => o.split("_").pop();
  const score = (sp, t) => {
    if (`sensor.${sp.obj}` === t.eid || (sp.base && sp.base === t.base)) return 5;
    if (sp.key && t.key && sp.key === t.key) return 4;
    if (sp.key.length >= 3 && t.key.length >= 3 && (sp.key.includes(t.key) || t.key.includes(sp.key))) return 3;
    const a = seg(sp.obj);
    const b = seg(t.obj);
    if (a && b && (a === b || sp.obj.endsWith(`_${b}`) || t.obj.endsWith(`_${a}`))) return 2;
    return 0;
  };
  const pairs = [];
  for (const sp of setpoints) for (const t of temps) {
    const s = score(sp, t);
    if (s) pairs.push({ sp, t, s });
  }
  // Strongest first; ties resolved by name and id so the assignment is deterministic.
  pairs.sort((x, y) => y.s - x.s || x.sp.name.localeCompare(y.sp.name) || x.t.obj.localeCompare(y.t.obj));
  for (const { sp, t } of pairs) {
    if (paired.has(sp.eid) || taken.has(t.eid)) continue;
    paired.set(sp.eid, t.eid);
    taken.add(t.eid);
  }
  const zones = setpoints.map((sp) => ({ key: sp.obj, name: sp.name, temp: paired.get(sp.eid) || null, setpoint: sp.eid }));
  return zones.sort((x, y) => x.name.localeCompare(y.name));
}

// A heat pump's fault message, or null when it reports none ("Aucun", "None", "0", "OK", "—").
const CA_NO_FAULT = /^(aucun|aucune|none|no|non|ok|rien|normal|nominal|0|-|—|n\/a|nan|clear|keine?|ninguno|nessuno)$/i;
function caHpFault(st) {
  if (!st || caUnavailable(st)) return null;
  const s = String(st.state).trim();
  return s && !CA_NO_FAULT.test(s) ? s : null;
}

// ── Humidifiers ──────────────────────────────────────────────────────────────
// What a humidifier, a dehumidifier or a diffuser does, shared by its card and the overview tiles. `roleSt(role)`
// gives a role's state; a dehumidifier is told by its device_class or its illustration.
const CA_HUM_COLOR = "var(--state-humidifier-on-color, #26a69a)";
const CA_DEHUM_COLOR = "#f9a825";
const CA_DIFFUSER_COLOR = "#9575cd";
// The illustration variants that are essential oil diffusers (no humidity target, a « Diffusing » status): the VOCOlinc
// FlowerBud and the Rituals Perfume Genie in either finish.
const CA_DIFFUSERS = ["diffuser", "rituals", "rituals_black"];
const caIsDiffuser = (v) => CA_DIFFUSERS.includes(v);
// A tank at 10 % or less shows its water red.
const CA_HUM_LOW = 10;

function caHumidifierState(st, roleSt, variant) {
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
function caLightGlow(lampSt) {
  if (lampSt?.state !== "on") return null;
  const rgb = lampSt.attributes.rgb_color;
  if (Array.isArray(rgb) && rgb.length === 3) return `rgb(${rgb.map((v) => Math.round(Number(v) || 0)).join(",")})`;
  return lampSt.attributes.color_mode === "color_temp" ? "#ffd9a8" : "#e040fb";
}

// The tank's fill in the illustration (%): its temperature between 20 and 65 °C, half full when unknown.
const caHpTankPct = (t) => (t == null ? 50 : Math.max(8, Math.min(100, ((t - 20) / 45) * 100)));

// ── Mini cards ───────────────────────────────────────────────────────────────
// A mini card is the full card drawn compact, like the ha-home-connect-card and ha-roborock-card mini cards: its
// detail button (top right, `zoom: false` removes it) switches it to the full card and back, and a click anywhere
// else on the page folds it again.
const caInDialog = (ev) => ev.composedPath().some((n) => ["ha-more-info-dialog", "ha-dialog", "dialog"].includes(n.localName));
const caIsOutside = (card, ev) => !ev.composedPath().includes(card) && !caInDialog(ev);

// "A click elsewhere" is caught on the pointer, not only on the click event: on iOS (Safari and the companion app)
// a tap on something that is not clickable (the background, an empty spot, a card with no action) sends no click to
// the page. It counts when the press and the release are both outside the card (a slider dragged out of the card
// does not fold it), and a scroll does not count (the browser cancels the pointer). Keyboard clicks still go through
// the click event. `tap(ev)` (press and release at the same spot) is for the tests.
const caWatchOutside = (isOut, handler) => {
  let downOutside = false;
  const onDown = (ev) => {
    downOutside = isOut(ev);
  };
  const onUp = (ev) => {
    if (downOutside && isOut(ev)) handler(ev);
    downOutside = false;
  };
  const onClick = (ev) => {
    if (ev.detail === 0 && isOut(ev)) handler(ev);
  };
  return {
    on() {
      document.addEventListener("pointerdown", onDown, true);
      document.addEventListener("pointerup", onUp, true);
      document.addEventListener("click", onClick, true);
    },
    tap(ev) {
      onDown(ev);
      onUp(ev);
    },
    off() {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("pointerup", onUp, true);
      document.removeEventListener("click", onClick, true);
    },
  };
};

const caMini = (Base) =>
  class extends Base {
    static get mini() {
      return true;
    }

    constructor() {
      super();
      this._unzoom = caWatchOutside(
        (ev) => caIsOutside(this, ev),
        () => {
          if (this._zoomed) this._setZoom(false);
        },
      );
    }

    connectedCallback() {
      super.connectedCallback?.();
      this._unzoom.on();
      // Back on the page after leaving it: rendered again, compact.
      if (this._hass && this._config) this._update();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this._unzoom.off();
      // Left (another dashboard view, a conditional card hidden): back to the compact view, so that the card does not
      // come back unfolded.
      this._zoomed = false;
    }

    getCardSize() {
      return this._zoomed ? super.getCardSize() : 2;
    }

    getGridOptions() {
      return { ...(this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 6 }), rows: "auto" };
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
      if (ev.detail === 0) this.shadowRoot.querySelector(".zoom")?.focus({ preventScroll: true });
    }

    _miniHtml(m) {
      const btns = [...(m.online && this._config.show_controls ? this._miniButtons(m) : []), m.powerBtn].filter(Boolean);
      const chips = m.chips.filter((x) => x.includes("chip warn") || x.includes("chip alert") || !m.online);
      const head = m.illustrated
        ? this._banner(m, m.sub)
        : `<div class="header">${m.badge}<div class="titles"><div class="name">${caEsc(m.name)}</div></div>${caPill(m.statusText)}${this._zoomButton()}</div>`;
      return (
        `${this._styles(m.color, m.badgeColor)}<ha-card class="mini">${head}` +
        `<div class="content">${m.illustrated ? "" : this._picture(m)}<div class="info">${this._miniInfo(m)}${chips.length ? `<div class="chips">${chips.join("")}</div>` : ""}</div>` +
        `${btns.length ? `<div class="mcontrols">${btns.join("")}</div>` : ""}</div></ha-card>`
      );
    }
  };

// The status pill of the header: its text truncates, and on a narrow card only the dot shows (the status stays in the
// tooltip, and for screen readers in the clipped text).
const caPill = (text) => `<span class="st" title="${caEsc(text)}"><span class="dot"></span><span class="stt">${caEsc(text)}</span></span>`;

// A mini bar with its value: speed, filter life.
const caBar = (pct, value, icon) =>
  `<div class="mbar">${icon ? `<ha-icon icon="${icon}"></ha-icon>` : ""}<div class="bar"><div class="fill" style="width:${Math.max(0, Math.min(100, pct))}%"></div></div><span class="v">${caEsc(value)}</span></div>`;

// Filter wear from its remaining life (%): "replace" at CA_FILTER_REPLACE or less, "soon" at the warning threshold
// (`filter_warning`, CA_FILTER_WARNING by default) or less, null otherwise.
const CA_FILTER_REPLACE = 10;
const CA_FILTER_WARNING = 20;
// How long the filter reset button stays armed after its first tap.
const CA_RESET_ARM = 4000;
function caFilterLevel(pct, warning) {
  if (pct == null) return null;
  const warn = Number.isFinite(Number(warning)) && warning !== "" && warning != null ? Number(warning) : CA_FILTER_WARNING;
  if (pct <= CA_FILTER_REPLACE) return "replace";
  return pct <= Math.max(warn, CA_FILTER_REPLACE) ? "soon" : null;
}

const caLine = (icon, text) => `<div class="line"><ha-icon icon="${icon}"></ha-icon><span>${caEsc(text)}</span></div>`;

// ── Illustrations ────────────────────────────────────────────────────────────
// Each card file registers the illustration of its kind of device, shared with the overview tiles:
//   CA_ART[kind] = { variants, guess(text), render(variant, s) → { svg, cls, style }, styles }
// `s` is the device's state as the illustration needs it: running, pct, color, osc, natural, mode, active, swing, display.
const CA_ART = {};

// The text an illustration variant is guessed from: the device model, manufacturer and names. The manufacturer is
// included so a device named in another language (a Rituals Perfume Genie whose model and name are localised, say)
// is still recognised from its brand.
function caVariantText(hass, id) {
  const dev = hass.devices?.[caDeviceOf(hass, id)];
  const a = hass.states[id]?.attributes || {};
  return [dev?.model, dev?.manufacturer, dev?.name, dev?.name_by_user, id, a.friendly_name, a.device_class].filter(Boolean).join(" ");
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

// ── Illustrated header ───────────────────────────────────────────────────────
// The header of the device cards (full and mini): a 90 px banner, the round icon, the name and the status on the
// left, and on the right the room the device stands in, drawn by the kind of device, with the card's own illustration
// of the device in front of it and a 10 px floor strip edge to edge at the bottom. The room shows what the device does
// while it runs: cold air under the wall unit and the sun at the window (air conditioner), particles drawn into the
// purifier and clean air leaving it, the breeze of a fan, mist above a humidifier; a heat pump stands outdoors,
// against the façade, on the lawn. Night (sun.sun below the horizon, else Home Assistant's dark theme, unless
// `illustration_theme` forces day or night) dims the room. `illustration: false` keeps the classic header.

// The brand logos, by slug, embedded by the build from images/badge/<slug>.png (scripts/build.mjs).
const CA_BRAND_LOGOS = {} /* __BRAND_LOGOS__ */;

// A number per card instance, for the ids of its banner's SVG.
let caUidSeq = 0;

// The brand of a device: its manufacturer first (a VOCOlinc diffuser through HomeKit shows VOCOlinc), else the
// integration it comes from. `brand` in YAML picks a slug, or hides the badge with `none`.
const CA_BRAND_MAKERS = [
  [/vocolinc/i, "vocolinc"],
  [/rituals/i, "rituals"],
  [/dyson/i, "dyson_local"],
  [/daikin/i, "daikin_onecta"],
  [/midea/i, "midea_ac_lan"],
  [/panasonic/i, "panasonic"],
  [/mitsubishi/i, "melcloud"],
  [/viessmann/i, "vicare"],
  [/\bnibe\b/i, "myuplink"],
  [/hitachi/i, "hitachi_yutaki"],
  [/atlantic/i, "cozytouch"],
  [/xiaomi|smartmi|zhimi|deerma|mijia/i, "xiaomi_home"],
];
const CA_BRAND_PLATFORMS = { homekit_controller: "homekit", aquarea: "panasonic", overkiz: "cozytouch", rituals_perfume_genie: "rituals" };
function caBrand(hass, id, config) {
  if (config.brand) return config.brand === "none" ? "" : String(config.brand);
  const maker = hass.devices?.[caDeviceOf(hass, id)]?.manufacturer || "";
  const hit = CA_BRAND_MAKERS.find(([re]) => re.test(maker));
  if (hit) return hit[1];
  const platform = hass.entities?.[id]?.platform || "";
  return CA_BRAND_PLATFORMS[platform] || platform;
}
const caBrandBadge = (slug) => {
  const logo = slug && CA_BRAND_LOGOS[slug];
  return logo ? `<span class="brand"><img src="${caEsc(logo)}" alt=""></span>` : "";
};

// Night picture: forced by illustration_theme, else the sun below the horizon, else Home Assistant's dark mode.
function caIsNight(hass, config) {
  if (config.illustration_theme === "night") return true;
  if (config.illustration_theme === "day") return false;
  const sun = hass?.states?.["sun.sun"];
  if (sun && !caUnavailable(sun)) return sun.state === "below_horizon";
  return !!hass?.themes?.darkMode;
}

// The device's outline in its own picture (viewBox units: x, y, width, height), measured once from each drawing: the
// banner crops the picture to it, so the device stands on the floor strip and fills the room's height. Its effects
// (air, mist, breeze) still draw outside it.
const CA_BANNER_BOX = {
  aircon: { split: [2.4, 13.4, 75.2, 32.2], portable: [1.5, 2.5, 61.1, 87.1], window: [1, 3.6, 71.6, 84.8], portasplit: [3.4, 18.1, 73.2, 71.2] },
  purifier: { tower: [17.9, 6.4, 44.2, 82.2], cylinder: [20.4, 7.9, 39.2, 82.3], box: [11.4, 16.4, 57.2, 72.2], dyson: [23.9, 1.3, 32.2, 87.3] },
  fan: { fan: [13.2, 5.2, 53.6, 86.5] },
  humidifier: {
    column: [23.4, 21.4, 33.2, 67.2],
    tank: [7.4, 11.5, 65.2, 75.1],
    evaporative: [11.4, 13.4, 57.2, 75.2],
    vocolinc: [27.9, 16.9, 24.2, 71.7],
    diffuser: [11.8, 3.5, 56.4, 85.1],
    rituals: [10.8, 17.8, 58.5, 68.6],
    rituals_black: [10.8, 17.8, 58.5, 68.6],
    dehumidifier: [15.4, 9.4, 49.2, 79.2],
  },
  heatpump: { air: [0, 5.4, 116.7, 83.2] },
};

// Where the device stands in the 200 × 80 room: a wall unit high on the wall, everything else on the floor (y 80),
// as big as the room allows. Returns its box { x, y, w, h } and the crop of its picture.
function caBannerPlace(kind, variant) {
  const boxes = CA_BANNER_BOX[kind] || {};
  const vb = boxes[variant] || Object.values(boxes)[0] || [0, 0, 80, 94];
  const wall = kind === "aircon" && (variant || "split") === "split";
  const [maxW, maxH, cx] = wall ? [66, 40, 160] : kind === "heatpump" ? [86, 70, 154] : [76, 72, 160];
  const k = Math.min(maxW / vb[2], maxH / vb[3]);
  const w = vb[2] * k;
  const h = vb[3] * k;
  return { vb, wall, x: cx - w / 2, y: wall ? 10 : 80 - h, w, h, k };
}

const caF = (n) => +n.toFixed(1);

// The room behind the device (200 × 80, the device at x ≈ 122–198): the wall and its window, and the effects of the
// running device around it (drawn only while it runs, animated by CA_BANNER_STYLES).
function caBannerRoom(kind, variant, n, p) {
  const top = p.y;
  const cx = p.x + p.w / 2;
  if (kind === "heatpump") {
    const sky = n
      ? `<g class="b-star">${[[96, 10], [110, 22], [74, 16], [120, 6], [88, 30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g><path class="b-moon" d="M106 8a6 6 0 1 0 5.2 9 4.8 4.8 0 1 1-5.2-9Z"/>`
      : '<circle class="b-sun" cx="106" cy="14" r="6"/><path class="b-cloud" d="M64 22a4 4 0 0 1 6-3.4 5 5 0 0 1 9.4 1.4 3 3 0 0 1 .6 6H66a3 3 0 0 1-2-4Z"/>';
    const bricks = Array.from({ length: 8 }, (_, i) => `M128 ${i * 10 + 6}H200`).join("");
    const exhaust = [38, 50].map((y, i) => `<path class="bz b${i}" d="M${caF(p.x - 2)} ${y} q-8 -4 -16 0"/>`).join("");
    return (
      `${sky}<rect class="b-facade" x="128" y="0" width="72" height="80"/><path class="b-joint" d="${bricks}"/>` +
      `<path class="b-hill" d="M0 80C40 72 90 70 132 72V80Z"/><g class="bfx exhaust">${exhaust}</g>`
    );
  }
  const sunny = kind === "aircon" || kind === "fan";
  const win =
    `<rect class="b-win${sunny ? " sunny" : ""}" x="88" y="12" width="30" height="34" rx="1.5"/>` +
    (sunny && !n ? '<circle class="b-sun" cx="110" cy="22" r="5"/>' : "") +
    (n ? '<circle class="b-wstar" cx="96" cy="20" r=".7"/><circle class="b-wstar" cx="111" cy="34" r=".6"/>' : "") +
    '<path class="b-frame" d="M103 12V46"/>';
  let fx = "";
  if (kind === "aircon" && p.wall) {
    // Cold (or warm) air falling from the wall unit into the room.
    fx = [-18, -6, 6, 18].map((dx, i) => `<path class="ca c${i % 3}" d="M${caF(cx + dx)} ${caF(top + 36)} q3 8 -2 16 q-4 8 0 16"/>`).join("");
  } else if (kind === "purifier") {
    // Dust drawn into the purifier from the room, clean air leaving its top.
    const tx = cx;
    const ty = top + p.h * 0.45;
    fx =
      Array.from({ length: 12 }, (_, i) => {
        const x = 92 + ((i * 23) % 40);
        const y = 8 + ((i * 17) % 60);
        return `<circle class="suck s${i % 4}" cx="${x}" cy="${y}" r="1.4" style="--dx:${caF(tx - x)}px;--dy:${caF(ty - y)}px"/>`;
      }).join("") +
      `<g class="clean">${[-5, 0, 5].map((dx, i) => `<path class="cl l${i}" d="M${caF(cx + dx)} ${caF(top - 1)} q-3 -3 0 -6"/>`).join("")}</g>`;
  } else if (kind === "fan") {
    // The breeze blowing from the fan's head into the room.
    const hy = top + (32 - 5.2) * p.k;
    fx = [-12, 0, 12].map((dy, i) => `<path class="bz b${i}" d="M${caF(p.x - 2)} ${caF(hy + dy)} q-10 -5 -20 0 t-20 0"/>`).join("");
  } else if (kind === "humidifier") {
    if (variant === "dehumidifier") {
      fx = `<g class="clean dry">${[-6, 0, 6].map((dx, i) => `<path class="cl l${i}" d="M${caF(cx + dx)} ${caF(top - 1)} q-3 -3 0 -6"/>`).join("")}</g>`;
    } else {
      fx = [[0, 4, 6], [-7, 8, 4], [7, 9, 5], [-1, 14, 3.5]]
        .map(([dx, dy, r], i) => `<circle class="puff p${i}" cx="${caF(cx + dx)}" cy="${caF(Math.max(r, top - dy))}" r="${r}"/>`)
        .join("");
    }
  }
  return `<rect class="b-wall" width="200" height="80"/>${win}<g class="bfx">${fx}</g>`;
}

// The banner's picture: the room and, in front of it, the card's illustration of the device (same drawing, classes
// and animations as the classic header's picture), cropped to the device. `uid` keeps the SVG ids of each card apart.
function caBannerScene(kind, variant, s, n, uid) {
  const art = CA_ART[kind];
  if (!art) return "";
  const p = caBannerPlace(kind, variant);
  const r = art.render(variant, s);
  const svg = r.svg
    .replace(/(id="|url\(#)(ca-[a-z0-9]+)/g, `$1$2-b${uid}`)
    .replace(/^<svg\b[^>]*>/, `<svg x="${caF(p.x)}" y="${caF(p.y)}" width="${caF(p.w)}" height="${caF(p.h)}" viewBox="${p.vb.join(" ")}" overflow="visible" aria-hidden="true">`);
  const cls = ["bdev", `k-${kind}`, `st-${s.state || (s.running ? "on" : "off")}`, s.running ? "running" : "", ...(r.cls || []), p.wall ? "wall" : ""];
  return (
    `<svg class="bscene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">` +
    `${caBannerRoom(kind, variant, n, p)}<g class="${cls.filter(Boolean).join(" ")}"${r.style ? ` style="${r.style}"` : ""}>${svg}</g></svg>`
  );
}

// The banner's colours per kind of device (the room's wall, day / night); a heat pump has the sky.
const CA_BANNER_WALL = { aircon: ["#e9f3fb", "#1f2a38"], purifier: ["#eef4f2", "#22302c"], fan: ["#fbf1e2", "#2e2a26"], humidifier: ["#eef0f8", "#262a3a"] };

const CA_BANNER_STYLES = `
  .banner { position: relative; overflow: hidden; height: 90px; flex: none; margin: -12px -12px 0; color: #10283f;
            border-radius: var(--ha-card-border-radius, 12px) var(--ha-card-border-radius, 12px) 0 0;
            background: var(--ca-wall, linear-gradient(90deg, #f3f9ff 0%, #e2f0fc 38%, #c4e1f7 100%)); }
  .banner.night { color: #fff; background: var(--ca-wall, linear-gradient(90deg, #2c4068 0%, #1b2b4e 42%, #0f1a34 100%)); }
  .bscene { position: absolute; right: 0; bottom: 10px; height: 80px; width: min(200px, 58%);
            -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 14%); mask-image: linear-gradient(90deg, transparent 0, #000 14%); }
  .bhead { position: absolute; z-index: 1; left: 12px; top: 0; bottom: 10px; right: calc(min(200px, 58%) - 20px);
           display: flex; align-items: center; gap: 10px; min-width: 0; }
  .banner .titles { flex: 1 1 auto; min-width: 0; }
  .banner .name { color: inherit; }
  .banner .sub { color: #3d5670; }
  .banner.night .sub { color: rgba(255,255,255,.8); }
  .banner .badge { position: relative; background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px rgba(13,42,69,.12); }
  .banner.night .badge { background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }
  .badge .brand { position: absolute; right: -4px; bottom: -4px; width: 18px; height: 18px; border-radius: 5px; padding: 2px; box-sizing: border-box;
                  display: grid; place-items: center; background: #fff; box-shadow: 0 0 0 1px rgba(13,42,69,.16), 0 1px 3px rgba(13,42,69,.18); }
  .badge .brand img { width: 100%; height: 100%; object-fit: contain; }
  /* The status pill sits on the title line, right after the title (the title ellipsises first, keeping a few
     characters); without room for both, it goes on its own line under the subtitle. It keeps its whole label, or
     only its dot when that label really does not fit (caFitPills). Its colour is the round icon's. */
  .banner .titles { container: ca-titles / inline-size; display: flex; flex-direction: column; align-items: flex-start; }
  .banner .titles > * { max-width: 100%; }
  .banner .trow { display: flex; align-items: center; gap: 8px; width: 100%; min-width: 0; }
  .banner .trow .name { flex: 0 1 auto; min-width: 4ch; }
  .banner .trow .st { flex: none; max-width: 50%; }
  @container ca-titles (max-width: 170px) {
    .banner .trow { display: contents; }
    .banner .trow .name, .banner .trow .st { max-width: 100%; }
    .banner .trow .st { order: 3; margin-top: 3px; }
  }
  .banner .st { line-height: 16px; background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--c) 45%, #0d2a45); }
  .banner.night .st { background: color-mix(in srgb, var(--c) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--c) 35%, #ffffff); }
  .banner .zoom { position: absolute; z-index: 2; top: 5px; right: 5px; margin: 0; width: 24px; height: 24px; color: #33506b;
                  background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); backdrop-filter: blur(4px); }
  .banner.night .zoom { color: #fff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }
  .banner .zoom:hover { background: rgba(255,255,255,.75); color: #33506b; }
  .banner.night .zoom:hover { background: rgba(255,255,255,.22); color: #fff; }
  /* The floor strip, edge to edge under the room: parquet indoors, lawn outdoors (heat pump). */
  .ground { position: absolute; left: 0; right: 0; bottom: 0; height: 10px;
            background: repeating-linear-gradient(90deg, #c99a6b 0 38px, #b98a5c 38px 40px); box-shadow: inset 0 2px 0 #a97c50; }
  .night .ground { background: repeating-linear-gradient(90deg, #4a3a2c 0 38px, #3e3024 38px 40px); box-shadow: inset 0 2px 0 #35291f; }
  .k-heatpump-banner .ground { background: repeating-linear-gradient(90deg, #5aa83d 0 22px, #6cbb4c 22px 44px); box-shadow: none; }
  .night.k-heatpump-banner .ground { background: repeating-linear-gradient(90deg, #1f4a2a 0 22px, #245433 22px 44px); }
  /* The room. */
  .b-wall { fill: var(--ca-wall-fill); }
  .b-win { fill: #cfe8f8; stroke: #fff; stroke-width: 2; } .b-win.sunny { fill: #ffe6b0; }
  .night .b-win { fill: #1b2f52; stroke: #4a5568; }
  .b-frame { stroke: #fff; stroke-width: 1.2; } .night .b-frame { stroke: #4a5568; }
  .b-sun { fill: #ffb02e; } .k-heatpump-banner .b-sun { fill: #ffd65a; }
  .b-wstar, .b-star { fill: #fff; opacity: .85; } .b-moon { fill: #f4f1dc; }
  .b-cloud { fill: #fff; opacity: .9; }
  .b-facade { fill: #efe3cf; } .night .b-facade { fill: #3a3530; }
  .b-joint { stroke: #e2d3b8; stroke-width: .8; } .night .b-joint { stroke: #4a443c; }
  .b-hill { fill: #86c27f; } .night .b-hill { fill: #17303d; }
  .bdev { filter: drop-shadow(0 2px 3px rgba(0,0,0,.16)); }
  .bdev.wall .floor { display: none; }
  /* The effects of the running device. */
  .bfx { display: none; }
  .banner.running .bfx { display: inline; }
  .bfx .ca { fill: none; stroke: var(--ca-color); stroke-width: 1.8; stroke-linecap: round; opacity: 0; animation: ca-b-fall 2.4s ease-in infinite; }
  .bfx .c1 { animation-delay: -.8s; } .bfx .c2 { animation-delay: -1.6s; }
  .bfx .suck { fill: #a39e94; opacity: 0; animation: ca-b-suck 3s ease-in infinite; }
  .night .bfx .suck { fill: #8a8f9a; }
  .bfx .s1 { animation-delay: -.75s; } .bfx .s2 { animation-delay: -1.5s; } .bfx .s3 { animation-delay: -2.25s; }
  .bfx .cl { fill: none; stroke: #5dcaa5; stroke-width: 1.4; stroke-linecap: round; opacity: 0; animation: ca-b-rise 2.2s ease-out infinite; }
  .bfx .dry .cl { stroke: var(--ca-color); }
  .bfx .l1 { animation-delay: -.7s; } .bfx .l2 { animation-delay: -1.4s; }
  .bfx .bz { fill: none; stroke: #d9b896; stroke-width: 1.6; stroke-linecap: round; opacity: 0; animation: ca-b-blow 2s linear infinite; }
  .night .bfx .bz { stroke: #7d8793; }
  .exhaust .bz { stroke: #b9c4cc; stroke-width: 1.4; animation-duration: 2.4s; }
  .bfx .b1 { animation-delay: -.6s; } .bfx .b2 { animation-delay: -1.2s; }
  .bfx .puff { fill: #cfe3f4; opacity: 0; animation: ca-b-puff 3s ease-out infinite; transform-box: fill-box; transform-origin: center; }
  .night .bfx .puff { fill: #5c6e8a; }
  .bfx .p1 { animation-delay: -.7s; } .bfx .p2 { animation-delay: -1.4s; } .bfx .p3 { animation-delay: -2.1s; }
  @keyframes ca-b-fall { from { transform: translateY(-6px); opacity: 0; } 30% { opacity: .7; } to { transform: translateY(10px); opacity: 0; } }
  @keyframes ca-b-suck { from { transform: translate(0, 0); opacity: .8; } to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
  @keyframes ca-b-rise { from { transform: translateY(2px); opacity: 0; } 30% { opacity: .9; } to { transform: translateY(-6px); opacity: 0; } }
  @keyframes ca-b-blow { from { transform: translateX(0); opacity: .9; } to { transform: translateX(-30px); opacity: 0; } }
  @keyframes ca-b-puff { from { transform: translateY(10px) scale(.6); opacity: 0; } 40% { opacity: .8; } to { transform: translateY(-8px) scale(1.2); opacity: 0; } }
  /* Narrow cards (the Sections view's 6 columns): a smaller room, the text gets more of the width. */
  @container (max-width: 300px) { .bscene { width: 48%; } .bhead { right: calc(48% - 26px); gap: 8px; } }
  /* Narrowest cards: the sky alone, the text gets the width. */
  @container (max-width: 200px) { .bscene { display: none; } .bhead { right: 36px; } }
  @media (prefers-reduced-motion: reduce) { .banner, .banner * { animation: none !important; } .bfx .suck, .bfx .cl, .bfx .bz, .bfx .puff, .bfx .ca { opacity: .6; } }
`;

// ── Styles ───────────────────────────────────────────────────────────────────
const CA_STYLES = `${CA_ART_STYLES}
  /* ha-card is a size container, so its content gives it no width: in a shrink-to-fit parent (inline-block, a grid's
     auto column) it would fall to its padding. The empty, zero-height grid before it stands in for the content: a
     300 px max-content width but no min-content width, so the card still shrinks in a 1fr grid column or a stack,
     even wrapped in a <div> (contain-intrinsic-inline-size gave a min-content width, and the card overflowed). */
  :host { display: block; height: 100%; min-width: 0; }
  :host::before { content: ""; display: grid; grid-template-columns: minmax(0, 300px); height: 0; }
  ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 10px; container-type: inline-size; }
  .empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }
  /* The body starts 8px under the header, like the other ha-* cards (the card's gap is 10px, 8px on the mini cards). */
  .header { display: flex; align-items: center; gap: 10px; margin-bottom: -2px; }
  ha-card.mini .header { margin-bottom: 0; }
  .badge { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center;
           background: color-mix(in srgb, var(--ca-badge, var(--ca-color)) 16%, transparent); color: var(--ca-badge, var(--ca-color)); transition: background .4s, color .4s; }
  .badge ha-icon { --mdc-icon-size: 24px; }
  /* The pill gets its whole label first (at most half the header) and the title the rest, keeping about four
     characters: the pill is only truncated when even that does not fit. */
  .titles { flex: 1 1 0; min-width: 5ch; font-size: 16px; }
  :host([hide-title]) .titles .name, :host([hide-subtitle]) .titles > .sub { display: none; }
  .name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .st { display: inline-flex; align-items: center; gap: 4px; flex: 0 1 auto; min-width: 0; max-width: 50%; overflow: hidden; box-sizing: border-box; position: relative;
        padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;
        white-space: nowrap; --c: var(--ca-badge, var(--ca-color)); background: color-mix(in srgb, var(--c) 15%, transparent); color: var(--c); }
  .st .dot { background: var(--c); }
  .stt { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .dot { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--ca-color); }
  ha-card:has(.running) .dot { animation: ca-blink 1.6s ease-in-out infinite; }
  button { font: inherit; cursor: pointer; border: none; }
  button:disabled { cursor: default; opacity: .5; }
  .power { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none;
           background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--secondary-text-color); }
  .power.on { background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }
  .power.on:hover, .round.on:hover:not(:disabled) { background: color-mix(in srgb, var(--ca-color) 24%, transparent); }
  .zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%;
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
  .state-big { font-size: 22px; font-weight: 400; line-height: 1.2; color: var(--ca-color); overflow-wrap: break-word; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px;
          background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--secondary-text-color); white-space: nowrap;
          max-width: 100%; box-sizing: border-box; overflow: hidden; }
  /* A chip too long for the card (« Device offline » in a narrow card) wraps instead of being cut. */
  .chips .chip { white-space: normal; }
  .chip ha-icon { --mdc-icon-size: 13px; flex: none; }
  .chip[data-more-info] { cursor: pointer; }
  .chip[data-more-info]:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }
  .chip.warn { background: color-mix(in srgb, var(--warning-color, #ffa600) 15%, transparent); color: var(--warning-color, #ffa600); }
  .filter.soon .fill { background: var(--warning-color, #ffa600); }
  .filter.low .fill { background: var(--error-color, #db4437); }
  .filter.soon .line ha-icon, .filter.soon .mbar ha-icon { color: var(--warning-color, #ffa600); }
  .filter.low .line ha-icon, .filter.low .mbar ha-icon { color: var(--error-color, #db4437); }
  .filter[data-more-info] { cursor: pointer; }
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
  .slider .sl-label { flex-shrink: 1; min-width: 0; max-width: 40%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
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
  .round { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; flex: none;
           background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--primary-text-color); }
  .round ha-icon { --mdc-icon-size: 20px; }
  .round.on { background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }

  ha-card.mini { gap: 8px; }
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

  /* A pill whose whole label does not fit (caFitPills) keeps only its dot: its text is clipped, still read by screen
     readers and shown in the tooltip. */
  .st.dot-only { flex: none; padding: 4px; }
  .st.dot-only .stt { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  /* Narrow cards (6 columns of the Sections view, about 160 to 300 px; the widths below are the card's inner width). */
  @container (max-width: 280px) {
    .header { gap: 8px; }
  }
  /* The mini card's buttons move under the info, which gets the whole line next to the picture. */
  @container (max-width: 300px) {
    ha-card.mini .content { flex-wrap: wrap; row-gap: 8px; }
    ha-card.mini .info { flex: 0 0 calc(100% - 68px); }
    ha-card.mini .mcontrols { flex-basis: 100%; justify-content: flex-end; }
  }
  /* The narrowest: the full card drops its header badge (the illustration shows the device) and draws it smaller;
     the mini card drops its illustration (its badge shows the device) and its info takes the whole width. */
  @container (max-width: 180px) {
    .header { gap: 6px; }
    ha-card:not(.mini) .badge { display: none; }
    ha-card:not(.mini) .hero { gap: 10px; }
    ha-card:not(.mini) .hero .picture { width: 56px; height: 66px; }
    /* The info gets the whole width under the picture: next to it, it had 64 px at 156 px and cut the values
       (« Unavailable », « Na zewnątrz 31 °C »). */
    ha-card:not(.mini) .hero { flex-wrap: wrap; justify-content: center; row-gap: 6px; }
    ha-card:not(.mini) .hero .info { flex-basis: 100%; }
    .state-big { font-size: 20px; }
    ha-card.mini .content > .picture { display: none; }
    ha-card.mini .info { flex-basis: 100%; }
    /* Many segments (the air conditioner's modes): they share the width as icons, the selected one's label kept for
       screen readers and in its tooltip. */
    .segments:has(.short) .seg { position: relative; flex: 1 1 0; min-width: 0; padding: 6px 2px; }
    .segments:has(.short) .seg.on span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .dot, .iconart ha-icon { animation: none !important; }
  }
${CA_BANNER_STYLES}
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
      show_title: true,
      show_subtitle: true,
      show_controls: true,
      show_sensors: true,
      // The fan and heat pump cards show no filter alert: no toggle for them.
      ...(CA_NO_FILTER.includes(this.constructor.kind) ? {} : { show_alerts: true, show_filter: true, filter_warning: CA_FILTER_WARNING }),
      ...(CA_ART[this.constructor.kind] ? { illustration: "auto", illustration_theme: "auto" } : {}),
      // Heat pump: the defaults caCleanConfig drops, so the YAML only carries a source once it differs from air.
      ...(this.constructor.kind === "heatpump" ? { source: "air", ground_type: "collector", water_type: "well" } : {}),
      ...(this.constructor.mini ? { zoom: true } : {}),
    };
  }

  _helpers() {
    return ["entity", "name", "icon", "illustration", "zoom", "language", "entities", "source", "power_threshold", "outdoor_temp"];
  }

  _schema() {
    const kind = this.constructor.kind;
    const ids = caFindEntities(this._hass, kind);
    const domain = caDomain(kind);
    const lang = caLang(this._config, this._hass);
    const variants = CA_ART[kind]?.variants || [];
    return [
      // A heat pump without a climate entity is driven by the select of its mode (TOUG): both domains are offered.
      { name: "entity", selector: { entity: kind === "heatpump" ? { domain: ["climate", "select"] } : ids.length ? { include_entities: ids } : { domain } } },
      { type: "grid", name: "", schema: [{ name: "name", selector: { text: {} } }, { name: "icon", selector: { icon: {} } }] },
      // The illustration: guessed, a shape picked, or none (the classic header, `illustration: false`); and the
      // banner's day / night theme.
      ...(CA_ART[kind]
        ? [
            {
              type: "grid",
              name: "",
              schema: [
                {
                  name: "illustration",
                  selector: {
                    select: { mode: "dropdown", options: ["auto", ...variants, "none"].map((v) => ({ value: v, label: caT(lang, `ill_${v}`) })) },
                  },
                },
                {
                  name: "illustration_theme",
                  selector: { select: { mode: "dropdown", options: ["auto", "day", "night"].map((v) => ({ value: v, label: caT(lang, `theme_${v}`) })) } },
                },
              ],
            },
          ]
        : []),
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_title", selector: { boolean: {} } },
          { name: "show_subtitle", selector: { boolean: {} } },
          { name: "show_controls", selector: { boolean: {} } },
          { name: "show_sensors", selector: { boolean: {} } },
          ...(CA_NO_FILTER.includes(kind) ? [] : [{ name: "show_alerts", selector: { boolean: {} } }, { name: "show_filter", selector: { boolean: {} } }]),
          ...(this.constructor.mini ? [{ name: "zoom", selector: { boolean: {} } }] : []),
        ],
      },
      ...(CA_NO_FILTER.includes(kind)
        ? []
        : [{ name: "filter_warning", selector: { number: { min: CA_FILTER_REPLACE, max: 50, step: 1, mode: "box", unit_of_measurement: "%" } } }]),
      // A heat pump: its source side (the illustration), the metered running threshold and the outdoor sensor.
      ...this._heatpumpOptions(kind),
      // A multi-zone heat pump: let the user hide a room setpoint it finds among its zones (a test number, or a
      // second motorised vent driven by the same thermostat).
      ...this._zoneExclude(kind),
      ...caAdvanced(caLang(this._config, this._hass), "language", "entities"),
    ];
  }

  // The heat-pump-only options in the editor: the source illustration and its ground / water variant, the metered
  // running threshold (watts) and the outdoor temperature entity (a sensor or a weather entity). The `entities`
  // monitoring role map stays YAML-only (it is an object), in the Advanced section like the other cards.
  _heatpumpOptions(kind) {
    if (kind !== "heatpump") return [];
    const lang = caLang(this._config, this._hass);
    const source = CA_HP_SOURCES.includes(this._config?.source) ? this._config.source : "air";
    const sel = (name, values) => ({
      name,
      selector: { select: { mode: "dropdown", options: values.map((v) => ({ value: v, label: caT(lang, `${name === "source" ? "src" : name === "ground_type" ? "gt" : "wt"}_${v}`) })) } },
    });
    return [
      sel("source", CA_HP_SOURCES),
      ...(source === "ground" ? [sel("ground_type", CA_HP_GROUND_TYPES)] : []),
      ...(source === "water" ? [sel("water_type", CA_HP_WATER_TYPES)] : []),
      { name: "power_threshold", selector: { number: { min: 0, step: 10, mode: "box", unit_of_measurement: "W" } } },
      { name: "outdoor_temp", selector: { entity: { domain: ["sensor", "weather"] } } },
    ];
  }

  // The `exclude` field offered for a multi-zone heat pump: every candidate room setpoint and every device switch,
  // so a hidden entity stays pickable even once hidden. Empty (and absent) when the device has fewer than two zones.
  _zoneExclude(kind) {
    if (kind !== "heatpump" || !this._config?.entity) return [];
    const zones = caHeatPumpZones(this._hass, this._config.entity);
    if (zones.length < 2) return [];
    const switches = caDeviceEntities(this._hass, caDeviceOf(this._hass, this._config.entity))
      .map((e) => e.entity_id)
      .filter((id) => id.startsWith("switch."));
    return [{ name: "exclude", selector: { entity: { multiple: true, include_entities: [...zones.map((z) => z.setpoint), ...switches] } } }];
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
    const data = { ...this._defaults(), ...this._config };
    if (data.illustration === false) data.illustration = "none";
    return data;
  }

  _fromForm(value) {
    return value.illustration === "none" ? { ...value, illustration: false } : value;
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    const lang = caLang(this._config, this._hass);
    this._config = caCleanConfig(this._fromForm(ev.detail.value), this._defaults(), this._config.type);
    if (lang !== caLang(this._config, this._hass)) this._render();
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true }));
  }
}

// The kinds of device without a filter (no filter options in their editor).
const CA_NO_FILTER = ["fan", "heatpump"];

// Illustration variants of each kind of device (the first is the fallback).
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
                  { value: "sr", label: "Српски" },
                  { value: "sr-Latn", label: "Srpski (latinica)" },
                  { value: "it", label: "Italiano" },
                  { value: "nl", label: "Nederlands" },
                  { value: "pt", label: "Português (Portugal)" },
                  { value: "pl", label: "Polski" },
                  { value: "ro", label: "Română" },
                  { value: "da", label: "Dansk" },
                  { value: "sv", label: "Svenska" },
                  { value: "bg", label: "Български" },
                  { value: "ru", label: "Русский" },
                  { value: "uk", label: "Українська" },
                  { value: "hu", label: "Magyar" },
                  { value: "sk", label: "Slovenčina" },
                  { value: "cs", label: "Čeština" },
                  { value: "sl", label: "Slovenščina" },
                  { value: "lv", label: "Latviešu" },
                  { value: "el", label: "Ελληνικά" },
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
