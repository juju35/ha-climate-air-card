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
    thermostat: "Thermostat",
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
    window_open: "Window open",
    battery_low: "Low battery",
    valve: "Valve",
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
    g_thermostat: "Thermostats",
    g_purifier: "Air purifiers",
    g_fan: "Fans",
    no_area: "No area",
    no_devices: "No air conditioner, thermostat, air purifier or fan found",
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
    ill_dial: "Wall thermostat",
    ill_radiator: "Radiator",
    ill_valve: "Radiator valve",
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
    ed_show_all: "Show every device",
    ed_show_all_helper: "Every device shows at first; the detail button keeps only the ones on or needing attention",
    ed_exclude: "Devices to exclude",
    ed_include: "Devices to add",
    ed_include_helper: "Climate or fan entities the card would not pick on its own (a hidden entity, say)",
  },
  fr: {
    purifier: "Purificateur",
    fan: "Ventilateur",
    aircon: "Climatiseur",
    thermostat: "Thermostat",
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
    window_open: "Fenêtre ouverte",
    battery_low: "Batterie faible",
    valve: "Vanne",
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
    g_thermostat: "Thermostats",
    g_purifier: "Purificateurs",
    g_fan: "Ventilateurs",
    no_area: "Sans pièce",
    no_devices: "Aucun climatiseur, thermostat, purificateur ou ventilateur trouvé",
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
    ill_dial: "Thermostat mural",
    ill_radiator: "Radiateur",
    ill_valve: "Tête thermostatique",
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
    ed_show_all: "Tout afficher",
    ed_show_all_helper: "Tous les appareils s'affichent d'emblée ; le bouton détail ne garde que ceux allumés ou en alerte",
    ed_exclude: "Appareils à exclure",
    ed_include: "Appareils à ajouter",
    ed_include_helper: "Entités climate ou fan que la carte ne prendrait pas d'elle-même (une entité masquée, par exemple)",
  },
  de: {
    purifier: "Luftreiniger",
    fan: "Ventilator",
    aircon: "Klimaanlage",
    thermostat: "Thermostat",
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
    window_open: "Fenster offen",
    battery_low: "Batterie schwach",
    valve: "Ventil",
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
    g_thermostat: "Thermostate",
    g_purifier: "Luftreiniger",
    g_fan: "Ventilatoren",
    no_area: "Kein Bereich",
    no_devices: "Keine Klimaanlage, kein Thermostat, kein Luftreiniger und kein Ventilator gefunden",
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
    ill_dial: "Wandthermostat",
    ill_radiator: "Heizkörper",
    ill_valve: "Heizkörperthermostat",
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
    ed_show_all: "Alle Geräte anzeigen",
    ed_show_all_helper: "Alle Geräte werden zuerst angezeigt; die Detailschaltfläche behält nur die eingeschalteten oder zu beachtenden",
    ed_exclude: "Auszuschließende Geräte",
    ed_include: "Hinzuzufügende Geräte",
    ed_include_helper: "Climate- oder Fan-Entitäten, die die Karte nicht von selbst übernehmen würde (z. B. eine ausgeblendete Entität)",
  },
  es: {
    purifier: "Purificador de aire",
    fan: "Ventilador",
    aircon: "Aire acondicionado",
    thermostat: "Termostato",
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
    window_open: "Ventana abierta",
    battery_low: "Batería baja",
    valve: "Válvula",
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
    g_thermostat: "Termostatos",
    g_purifier: "Purificadores de aire",
    g_fan: "Ventiladores",
    no_area: "Sin área",
    no_devices: "No se encontró ningún aire acondicionado, termostato, purificador ni ventilador",
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
    ill_dial: "Termostato de pared",
    ill_radiator: "Radiador",
    ill_valve: "Válvula termostática",
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
    ed_show_all: "Mostrar todos los dispositivos",
    ed_show_all_helper: "Todos los dispositivos se muestran al principio; el botón de detalle deja solo los encendidos o que requieren atención",
    ed_exclude: "Dispositivos que excluir",
    ed_include: "Dispositivos que añadir",
    ed_include_helper: "Entidades climate o fan que la tarjeta no elegiría por sí sola (una entidad oculta, por ejemplo)",
  },
  sr: {
    purifier: "Пречишћивач ваздуха",
    fan: "Вентилатор",
    aircon: "Клима уређај",
    thermostat: "Термостат",
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
    window_open: "Прозор отворен",
    battery_low: "Слаба батерија",
    valve: "Вентил",
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
    g_thermostat: "Термостати",
    g_purifier: "Пречишћивачи ваздуха",
    g_fan: "Вентилатори",
    no_area: "Без просторије",
    no_devices: "Није пронађен ниједан клима уређај, термостат, пречишћивач ваздуха или вентилатор",
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
    ill_tower: "Стубни",
    ill_cylinder: "Округли",
    ill_box: "Квадратни",
    ill_dyson: "Без елисе",
    ill_split: "Зидна сплит јединица",
    ill_portable: "Покретна јединица",
    ill_window: "Прозорска сплит јединица",
    ill_dial: "Зидни термостат",
    ill_radiator: "Радијатор",
    ill_valve: "Радијаторски вентил",
    ed_show_controls: "Контроле",
    ed_show_sensors: "Мерења",
    ed_show_alerts: "Упозорења",
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
  },
  "sr-Latn": {
    purifier: "Prečišćivač vazduha",
    fan: "Ventilator",
    aircon: "Klima uređaj",
    thermostat: "Termostat",
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
    window_open: "Prozor otvoren",
    battery_low: "Slaba baterija",
    valve: "Ventil",
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
    g_thermostat: "Termostati",
    g_purifier: "Prečišćivači vazduha",
    g_fan: "Ventilatori",
    no_area: "Bez prostorije",
    no_devices: "Nije pronađen nijedan klima uređaj, termostat, prečišćivač vazduha ili ventilator",
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
    ill_tower: "Stubni",
    ill_cylinder: "Okrugli",
    ill_box: "Kvadratni",
    ill_dyson: "Bez elise",
    ill_split: "Zidna split jedinica",
    ill_portable: "Pokretna jedinica",
    ill_window: "Prozorska split jedinica",
    ill_dial: "Zidni termostat",
    ill_radiator: "Radijator",
    ill_valve: "Radijatorski ventil",
    ed_show_controls: "Kontrole",
    ed_show_sensors: "Merenja",
    ed_show_alerts: "Upozorenja",
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
  },
  it: {
    purifier: "Purificatore d'aria",
    fan: "Ventilatore",
    aircon: "Condizionatore",
    thermostat: "Termostato",
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
    window_open: "Finestra aperta",
    battery_low: "Batteria scarica",
    valve: "Valvola",
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
    g_thermostat: "Termostati",
    g_purifier: "Purificatori",
    g_fan: "Ventilatori",
    no_area: "Nessuna area",
    no_devices: "Nessun condizionatore, termostato, purificatore d'aria o ventilatore trovato",
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
    ill_tower: "Torre",
    ill_cylinder: "Rotondo",
    ill_box: "Scatola quadrata",
    ill_dyson: "Anello senza pale",
    ill_split: "Split a parete",
    ill_portable: "Condizionatore portatile",
    ill_window: "Split da finestra",
    ill_dial: "Termostato a parete",
    ill_radiator: "Radiatore",
    ill_valve: "Valvola termostatica",
    ed_show_controls: "Comandi",
    ed_show_sensors: "Misure",
    ed_show_alerts: "Avvisi",
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
  },
  nl: {
    purifier: "Luchtreiniger",
    fan: "Ventilator",
    aircon: "Airconditioner",
    thermostat: "Thermostaat",
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
    window_open: "Raam open",
    battery_low: "Batterij bijna leeg",
    valve: "Klep",
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
    g_thermostat: "Thermostaten",
    g_purifier: "Luchtreinigers",
    g_fan: "Ventilatoren",
    no_area: "Geen ruimte",
    no_devices: "Geen airconditioner, thermostaat, luchtreiniger of ventilator gevonden",
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
    ill_tower: "Toren",
    ill_cylinder: "Rond",
    ill_box: "Vierkante kast",
    ill_dyson: "Bladloze ring",
    ill_split: "Wandunit (split)",
    ill_portable: "Mobiele unit",
    ill_window: "Raamunit (split)",
    ill_dial: "Wandthermostaat",
    ill_radiator: "Radiator",
    ill_valve: "Radiatorknop",
    ed_show_controls: "Bediening",
    ed_show_sensors: "Metingen",
    ed_show_alerts: "Waarschuwingen",
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
  },
  pt: {
    purifier: "Purificador de ar",
    fan: "Ventoinha",
    aircon: "Ar condicionado",
    thermostat: "Termóstato",
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
    window_open: "Janela aberta",
    battery_low: "Bateria fraca",
    valve: "Válvula",
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
    g_thermostat: "Termóstatos",
    g_purifier: "Purificadores",
    g_fan: "Ventoinhas",
    no_area: "Sem área",
    no_devices: "Nenhum ar condicionado, termóstato, purificador de ar ou ventoinha encontrado",
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
    ill_tower: "Torre",
    ill_cylinder: "Redondo",
    ill_box: "Caixa quadrada",
    ill_dyson: "Anel sem pás",
    ill_split: "Split de parede",
    ill_portable: "Unidade portátil",
    ill_window: "Split de janela",
    ill_dial: "Termóstato de parede",
    ill_radiator: "Radiador",
    ill_valve: "Válvula termostática",
    ed_show_controls: "Comandos",
    ed_show_sensors: "Medições",
    ed_show_alerts: "Alertas",
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
  },
  pl: {
    purifier: "Oczyszczacz powietrza",
    fan: "Wentylator",
    aircon: "Klimatyzator",
    thermostat: "Termostat",
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
    window_open: "Okno otwarte",
    battery_low: "Słaba bateria",
    valve: "Zawór",
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
    g_thermostat: "Termostaty",
    g_purifier: "Oczyszczacze",
    g_fan: "Wentylatory",
    no_area: "Bez obszaru",
    no_devices: "Nie znaleziono klimatyzatora, termostatu, oczyszczacza powietrza ani wentylatora",
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
    ill_tower: "Wieża",
    ill_cylinder: "Okrągły",
    ill_box: "Kwadratowa obudowa",
    ill_dyson: "Pierścień bez łopatek",
    ill_split: "Split ścienny",
    ill_portable: "Klimatyzator przenośny",
    ill_window: "Split okienny",
    ill_dial: "Termostat ścienny",
    ill_radiator: "Grzejnik",
    ill_valve: "Głowica termostatyczna",
    ed_show_controls: "Sterowanie",
    ed_show_sensors: "Pomiary",
    ed_show_alerts: "Alerty",
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
  },
  ro: {
    purifier: "Purificator de aer",
    fan: "Ventilator",
    aircon: "Aer condiționat",
    thermostat: "Termostat",
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
    window_open: "Fereastră deschisă",
    battery_low: "Baterie descărcată",
    valve: "Robinet",
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
    g_thermostat: "Termostate",
    g_purifier: "Purificatoare de aer",
    g_fan: "Ventilatoare",
    no_area: "Fără zonă",
    no_devices: "Nu s-a găsit niciun aparat de aer condiționat, termostat, purificator de aer sau ventilator",
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
    ill_tower: "Turn",
    ill_cylinder: "Rotund",
    ill_box: "Carcasă pătrată",
    ill_dyson: "Inel fără palete",
    ill_split: "Split de perete",
    ill_portable: "Aparat portabil",
    ill_window: "Split de fereastră",
    ill_dial: "Termostat de perete",
    ill_radiator: "Calorifer",
    ill_valve: "Robinet termostatic",
    ed_show_controls: "Comenzi",
    ed_show_sensors: "Măsurători",
    ed_show_alerts: "Alerte",
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
  },
  da: {
    purifier: "Luftrenser",
    fan: "Ventilator",
    aircon: "Klimaanlæg",
    thermostat: "Termostat",
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
    window_open: "Vindue åbent",
    battery_low: "Lavt batteri",
    valve: "Ventil",
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
    g_thermostat: "Termostater",
    g_purifier: "Luftrensere",
    g_fan: "Ventilatorer",
    no_area: "Intet område",
    no_devices: "Ingen klimaanlæg, termostater, luftrensere eller ventilatorer fundet",
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
    ill_tower: "Tårn",
    ill_cylinder: "Rund",
    ill_box: "Firkantet kabinet",
    ill_dyson: "Ring uden vinger",
    ill_split: "Vægmonteret split",
    ill_portable: "Mobilt anlæg",
    ill_window: "Vinduessplit",
    ill_dial: "Vægtermostat",
    ill_radiator: "Radiator",
    ill_valve: "Radiatortermostat",
    ed_show_controls: "Betjening",
    ed_show_sensors: "Målinger",
    ed_show_alerts: "Advarsler",
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
  },
  sv: {
    purifier: "Luftrenare",
    fan: "Fläkt",
    aircon: "Luftkonditionering",
    thermostat: "Termostat",
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
    window_open: "Fönster öppet",
    battery_low: "Låg batterinivå",
    valve: "Ventil",
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
    g_thermostat: "Termostater",
    g_purifier: "Luftrenare",
    g_fan: "Fläktar",
    no_area: "Inget område",
    no_devices: "Ingen luftkonditionering, termostat, luftrenare eller fläkt hittades",
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
    ill_tower: "Torn",
    ill_cylinder: "Rund",
    ill_box: "Fyrkantig låda",
    ill_dyson: "Ring utan blad",
    ill_split: "Väggmonterad split",
    ill_portable: "Portabel enhet",
    ill_window: "Fönstersplit",
    ill_dial: "Väggtermostat",
    ill_radiator: "Element",
    ill_valve: "Elementtermostat",
    ed_show_controls: "Reglage",
    ed_show_sensors: "Mätvärden",
    ed_show_alerts: "Varningar",
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
  },
  bg: {
    purifier: "Пречиствател на въздух",
    fan: "Вентилатор",
    aircon: "Климатик",
    thermostat: "Термостат",
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
    window_open: "Отворен прозорец",
    battery_low: "Слаба батерия",
    valve: "Вентил",
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
    g_thermostat: "Термостати",
    g_purifier: "Пречистватели",
    g_fan: "Вентилатори",
    no_area: "Без област",
    no_devices: "Не е намерен климатик, термостат, пречиствател на въздух или вентилатор",
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
    ill_tower: "Колона",
    ill_cylinder: "Кръгъл",
    ill_box: "Квадратна кутия",
    ill_dyson: "Пръстен без перки",
    ill_split: "Стенен сплит",
    ill_portable: "Мобилен климатик",
    ill_window: "Прозоречен сплит",
    ill_dial: "Стенен термостат",
    ill_radiator: "Радиатор",
    ill_valve: "Термостатна глава",
    ed_show_controls: "Управление",
    ed_show_sensors: "Измервания",
    ed_show_alerts: "Предупреждения",
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
  },
  ru: {
    purifier: "Очиститель воздуха",
    fan: "Вентилятор",
    aircon: "Кондиционер",
    thermostat: "Термостат",
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
    window_open: "Окно открыто",
    battery_low: "Низкий заряд батареи",
    valve: "Клапан",
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
    g_thermostat: "Термостаты",
    g_purifier: "Очистители воздуха",
    g_fan: "Вентиляторы",
    no_area: "Без пространства",
    no_devices: "Не найдено ни кондиционеров, ни термостатов, ни очистителей воздуха, ни вентиляторов",
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
    ill_tower: "Колонна",
    ill_cylinder: "Круглый",
    ill_box: "Квадратный корпус",
    ill_dyson: "Безлопастное кольцо",
    ill_split: "Настенная сплит-система",
    ill_portable: "Мобильный кондиционер",
    ill_window: "Оконная сплит-система",
    ill_dial: "Настенный термостат",
    ill_radiator: "Радиатор",
    ill_valve: "Термоголовка",
    ed_show_controls: "Управление",
    ed_show_sensors: "Измерения",
    ed_show_alerts: "Оповещения",
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
  },
  uk: {
    purifier: "Очищувач повітря",
    fan: "Вентилятор",
    aircon: "Кондиціонер",
    thermostat: "Термостат",
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
    window_open: "Вікно відчинене",
    battery_low: "Низький заряд батареї",
    valve: "Клапан",
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
    g_thermostat: "Термостати",
    g_purifier: "Очищувачі повітря",
    g_fan: "Вентилятори",
    no_area: "Без приміщення",
    no_devices: "Не знайдено жодного кондиціонера, термостата, очищувача повітря чи вентилятора",
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
    ill_tower: "Колона",
    ill_cylinder: "Круглий",
    ill_box: "Квадратний корпус",
    ill_dyson: "Безлопатеве кільце",
    ill_split: "Настінна спліт-система",
    ill_portable: "Мобільний кондиціонер",
    ill_window: "Віконна спліт-система",
    ill_dial: "Настінний термостат",
    ill_radiator: "Радіатор",
    ill_valve: "Термоголовка",
    ed_show_controls: "Керування",
    ed_show_sensors: "Вимірювання",
    ed_show_alerts: "Сповіщення",
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
  },
  hu: {
    purifier: "Légtisztító",
    fan: "Ventilátor",
    aircon: "Klíma",
    thermostat: "Termosztát",
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
    window_open: "Nyitott ablak",
    battery_low: "Alacsony töltöttség",
    valve: "Szelep",
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
    g_thermostat: "Termosztátok",
    g_purifier: "Légtisztítók",
    g_fan: "Ventilátorok",
    no_area: "Nincs terület",
    no_devices: "Nem található klíma, termosztát, légtisztító vagy ventilátor",
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
    ill_tower: "Torony",
    ill_cylinder: "Kerek",
    ill_box: "Szögletes doboz",
    ill_dyson: "Lapát nélküli gyűrű",
    ill_split: "Fali split",
    ill_portable: "Mobil klíma",
    ill_window: "Ablakos split",
    ill_dial: "Fali termosztát",
    ill_radiator: "Radiátor",
    ill_valve: "Radiátorszelep",
    ed_show_controls: "Vezérlők",
    ed_show_sensors: "Mérések",
    ed_show_alerts: "Figyelmeztetések",
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
  },
  sk: {
    purifier: "Čistička vzduchu",
    fan: "Ventilátor",
    aircon: "Klimatizácia",
    thermostat: "Termostat",
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
    window_open: "Otvorené okno",
    battery_low: "Slabá batéria",
    valve: "Ventil",
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
    g_thermostat: "Termostaty",
    g_purifier: "Čističky vzduchu",
    g_fan: "Ventilátory",
    no_area: "Bez oblasti",
    no_devices: "Nenašla sa žiadna klimatizácia, termostat, čistička vzduchu ani ventilátor",
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
    ill_tower: "Veža",
    ill_cylinder: "Okrúhla",
    ill_box: "Hranatá skrinka",
    ill_dyson: "Prstenec bez lopatiek",
    ill_split: "Nástenná split jednotka",
    ill_portable: "Mobilná jednotka",
    ill_window: "Okenná split jednotka",
    ill_dial: "Nástenný termostat",
    ill_radiator: "Radiátor",
    ill_valve: "Termostatická hlavica",
    ed_show_controls: "Ovládanie",
    ed_show_sensors: "Merania",
    ed_show_alerts: "Upozornenia",
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
  },
  cs: {
    purifier: "Čistička vzduchu",
    fan: "Ventilátor",
    aircon: "Klimatizace",
    thermostat: "Termostat",
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
    window_open: "Otevřené okno",
    battery_low: "Slabá baterie",
    valve: "Ventil",
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
    g_thermostat: "Termostaty",
    g_purifier: "Čističky vzduchu",
    g_fan: "Ventilátory",
    no_area: "Bez oblasti",
    no_devices: "Nenalezena žádná klimatizace, termostat, čistička vzduchu ani ventilátor",
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
    ill_tower: "Věž",
    ill_cylinder: "Kulatá",
    ill_box: "Hranatá skříňka",
    ill_dyson: "Prstenec bez lopatek",
    ill_split: "Nástěnná split jednotka",
    ill_portable: "Mobilní jednotka",
    ill_window: "Okenní split jednotka",
    ill_dial: "Nástěnný termostat",
    ill_radiator: "Radiátor",
    ill_valve: "Termostatická hlavice",
    ed_show_controls: "Ovládání",
    ed_show_sensors: "Měření",
    ed_show_alerts: "Upozornění",
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
  },
  sl: {
    purifier: "Čistilnik zraka",
    fan: "Ventilator",
    aircon: "Klimatska naprava",
    thermostat: "Termostat",
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
    window_open: "Okno odprto",
    battery_low: "Šibka baterija",
    valve: "Ventil",
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
    g_thermostat: "Termostati",
    g_purifier: "Čistilniki zraka",
    g_fan: "Ventilatorji",
    no_area: "Brez območja",
    no_devices: "Ni najdene klimatske naprave, termostata, čistilnika zraka ali ventilatorja",
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
    ill_tower: "Stolp",
    ill_cylinder: "Okrogla",
    ill_box: "Kvadratno ohišje",
    ill_dyson: "Obroč brez lopatic",
    ill_split: "Stenska split enota",
    ill_portable: "Prenosna enota",
    ill_window: "Okenska split enota",
    ill_dial: "Stenski termostat",
    ill_radiator: "Radiator",
    ill_valve: "Termostatski ventil",
    ed_show_controls: "Upravljanje",
    ed_show_sensors: "Meritve",
    ed_show_alerts: "Opozorila",
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
  },
  lv: {
    purifier: "Gaisa attīrītājs",
    fan: "Ventilators",
    aircon: "Gaisa kondicionieris",
    thermostat: "Termostats",
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
    window_open: "Logs atvērts",
    battery_low: "Zems akumulatora līmenis",
    valve: "Vārsts",
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
    g_thermostat: "Termostati",
    g_purifier: "Gaisa attīrītāji",
    g_fan: "Ventilatori",
    no_area: "Bez apgabala",
    no_devices: "Nav atrasts neviens gaisa kondicionieris, termostats, gaisa attīrītājs vai ventilators",
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
    ill_tower: "Tornis",
    ill_cylinder: "Apaļš",
    ill_box: "Kvadrātveida korpuss",
    ill_dyson: "Gredzens bez lāpstiņām",
    ill_split: "Sienas split bloks",
    ill_portable: "Pārvietojams bloks",
    ill_window: "Loga split bloks",
    ill_dial: "Sienas termostats",
    ill_radiator: "Radiators",
    ill_valve: "Radiatora termostats",
    ed_show_controls: "Vadīklas",
    ed_show_sensors: "Mērījumi",
    ed_show_alerts: "Brīdinājumi",
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
  },
  el: {
    purifier: "Καθαριστής αέρα",
    fan: "Ανεμιστήρας",
    aircon: "Κλιματιστικό",
    thermostat: "Θερμοστάτης",
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
    window_open: "Ανοιχτό παράθυρο",
    battery_low: "Χαμηλή μπαταρία",
    valve: "Βαλβίδα",
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
    g_thermostat: "Θερμοστάτες",
    g_purifier: "Καθαριστές αέρα",
    g_fan: "Ανεμιστήρες",
    no_area: "Χωρίς περιοχή",
    no_devices: "Δεν βρέθηκε κλιματιστικό, θερμοστάτης, καθαριστής αέρα ή ανεμιστήρας",
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
    ill_tower: "Πύργος",
    ill_cylinder: "Στρογγυλός",
    ill_box: "Τετράγωνο κουτί",
    ill_dyson: "Δακτύλιος χωρίς πτερύγια",
    ill_split: "Επιτοίχιο split",
    ill_portable: "Φορητή μονάδα",
    ill_window: "Split παραθύρου",
    ill_dial: "Θερμοστάτης τοίχου",
    ill_radiator: "Καλοριφέρ",
    ill_valve: "Θερμοστατική κεφαλή",
    ed_show_controls: "Χειριστήρια",
    ed_show_sensors: "Μετρήσεις",
    ed_show_alerts: "Ειδοποιήσεις",
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

// Icon of a climate preset (Home Assistant's own ones, and the frost protection and schedule of radiator valves).
const caClimatePresetIcon = (p) => {
  const s = String(p).toLowerCase();
  if (s === "none") return "mdi:circle-off-outline";
  if (/comfort|confort|komfort/.test(s)) return "mdi:sofa-outline";
  if (/eco/.test(s)) return "mdi:leaf";
  if (/away|absent|vacation|holiday|vacances/.test(s)) return "mdi:account-arrow-right-outline";
  if (/boost|turbo/.test(s)) return "mdi:rocket-launch-outline";
  if (/sleep|night|nuit/.test(s)) return "mdi:power-sleep";
  if (/home|maison/.test(s)) return "mdi:home-outline";
  if (/frost|antifreeze|hors_?gel|hg/.test(s)) return "mdi:snowflake-thermometer";
  if (/activity|activit/.test(s)) return "mdi:motion-sensor";
  if (/schedule|program|auto|planning/.test(s)) return "mdi:calendar-clock";
  if (/manual|manuel/.test(s)) return "mdi:hand-back-right-outline";
  return "mdi:tune-variant";
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

// A radiator valve's battery at or under this level (%) is flagged.
const CA_BATTERY_LOW = 15;

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
  // Radiator valves (Zigbee TRVs, Netatmo, tado°…): the valve opening, the open-window detection and the battery.
  valve: {
    domain: ["sensor", "number"],
    keys: ["valve_position", "pi_heating_demand", "heating_demand"],
    id: /(valve_(position|opening|state)|pi_heating_demand|heating_demand|position_vanne|ouverture_vanne|ventilstellung|ventilposition)$/,
  },
  window: {
    domain: "binary_sensor",
    keys: ["window_open", "window_detection"],
    id: /(window_open|window_detection|open_window|fenetre_ouverte|fenster_offen|ventana_abierta)$/,
    test: caDc("window"),
  },
  battery: { domain: "sensor", test: caDc("battery") },
  compressor: {
    domain: "sensor",
    id: /(?<!target_)(compressor_frequency|frequence_compresseur|kompressorfrequenz|frecuencia_del_compresor)$/,
  },
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
// over when the number of states changes (states still arriving while Home Assistant starts, after the registry),
// and a miss (no such role, unknown kind) is never kept, so an entity that shows up later is found.
const caMemoStore = new WeakMap();
function caMemo(hass, key, compute) {
  const reg = hass?.entities;
  if (!reg) return compute();
  const count = caStateCount(hass.states);
  let memo = caMemoStore.get(reg);
  if (!memo || memo.count !== count) caMemoStore.set(reg, (memo = { count, map: new Map() }));
  if (memo.map.has(key)) return memo.map.get(key);
  const value = compute();
  if (value != null) memo.map.set(key, value);
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
// A climate entity is an air conditioner when it can cool, dry or only blow, a thermostat otherwise (heating only:
// a wall thermostat, a radiator, a radiator valve).
// A fan entity is an air purifier when its name says so or its device measures particles or has a filter.
// The domain of the entities of a kind of device.
const caDomain = (kind) => (kind === "aircon" || kind === "thermostat" ? "climate" : "fan");

const CA_PURIFIER_NAME = /purif|air_?cleaner|air_?filter|epurateur/i;
function caKindOf(hass, id) {
  const st = hass?.states?.[id];
  if (!st) return null;
  return caMemo(hass, `kind:${id}`, () => {
    const domain = id.split(".")[0];
    if (domain === "climate") {
      const modes = st.attributes.hvac_modes || [];
      return modes.some((m) => m === "cool" || m === "dry" || m === "fan_only") ? "aircon" : "thermostat";
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

// A role of an entity's device, memoized (see caMemo): the whole-device scans only run again when the registry
// or the set of states changes.
function caRoleOf(hass, id, role) {
  return caMemo(hass, `role:${id}:${role}`, () => caFindRole(hass, caDeviceEntities(hass, caDeviceOf(hass, id)), role));
}

// Every entity of a kind, sorted by name; hidden entities and configuration entities are left out.
function caFindEntities(hass, kind) {
  if (!hass?.states) return [];
  return caMemo(hass, `list:${kind}`, () => {
    const domain = caDomain(kind);
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
      // A slider shows its fill and its value while it moves, before the service is called.
      this.shadowRoot.addEventListener("input", (ev) => {
        if (ev.target?.type === "range") this._showRange(ev.target);
      });
      // Whether the last input came from a pointer or the keyboard: only a pointer is done with a control it changed.
      this.shadowRoot.addEventListener("pointerdown", () => {
        this._pointer = true;
      });
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

  _fmtSensor(id) {
    const st = this._st(id);
    if (caUnavailable(st)) return null;
    const v = Number(st.state);
    if (!Number.isFinite(v)) return this._fmtState(id);
    const unit = st.attributes.unit_of_measurement || "";
    return `${caFmtNum(this._intlLang(), v)}${unit ? (unit === "%" ? " %" : ` ${unit}`) : ""}`;
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
      caRestoreFocus(this.shadowRoot, focus);
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
    const icon = c.icon || CA_KIND_ICONS[kind];
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
    m.powerBtn = m.online
      ? `<button class="power${m.running ? " on" : ""}" data-action="power" title="${caEsc(this._t("power"))}" aria-label="${caEsc(this._t("power"))}"><ha-icon icon="mdi:power"></ha-icon></button>`
      : "";
    m.badge = `<div class="badge"><ha-icon icon="${caEsc(icon)}"></ha-icon></div>`;

    if (this._compact()) {
      target.innerHTML = this._miniHtml(m);
      return;
    }
    const sub = [caAreaName(this._hass, r.id), m.sub].filter(Boolean).join(" · ");
    target.innerHTML =
      `${this._styles(m.color)}<ha-card>` +
      `<div class="header">${m.badge}<div class="titles"><div class="name">${caEsc(m.name)}</div>${sub ? `<div class="sub">${caEsc(sub)}</div>` : ""}</div>` +
      `${caPill(m.statusText)}${m.powerBtn}${this._zoomButton()}</div>` +
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
    const value = el.value;
    let send;
    if (d.range === "percentage") send = () => this._call("fan", "set_percentage", { entity_id: id, percentage: Number(value) });
    else if (d.number) send = () => this._call("number", "set_value", { entity_id: d.number, value: Number(value) });
    else if (d.humidity) send = () => this._call("climate", "set_humidity", { entity_id: id, humidity: Number(value) });
    else if (d.select) send = () => this._call("select", "select_option", { entity_id: d.select, option: value });
    else if (d.attrService) send = () => this._call(id.split(".")[0], d.attrService, { entity_id: id, [d.attr]: value });
    else return;
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
  _styles(color) {
    return `<style>${CA_STYLES}${CA_ART[this.constructor.kind]?.styles || ""}${this.constructor.styles || ""}</style><style>:host{--ca-color:${color || CA_IDLE};}</style>`;
  }
}

// ── Climate cards ────────────────────────────────────────────────────────────
// What the air conditioner and thermostat cards share: the mode buttons, the − / + of the target (one temperature or a
// low / high range), the target humidity, the fan / swing / preset selects and the device's switches as options.
// Subclasses implement _model(r) (with cur, target, range, mode, running) and may set `_presetButtons` to show the
// presets as segmented buttons instead of a select, and `_heroLine(m)` for the line under the temperatures.
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
  // The device's other switches (eco, display, self clean, child lock…) are listed as options.
  _switches(r) {
    return r.list.map((e) => e.entity_id).filter((id) => id.startsWith("switch.") && !r.used.has(id));
  }

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
  _stepper(action, value, label, hint) {
    const btn = (dir, key, icon) => {
      const text = hint ? `${this._t(key)} (${hint})` : this._t(key);
      return `<button class="round" data-action="${action}" data-value="${dir}" title="${caEsc(text)}" aria-label="${caEsc(text)}"><ha-icon icon="${icon}"></ha-icon></button>`;
    };
    return (
      '<div class="stepper">' +
      btn("-1", "temp_down", "mdi:minus") +
      `<div class="tv"><span class="tval">${caFmtNum(this._intlLang(), value)}<small> ${caEsc(this._unit())}</small></span><span class="tl">${caEsc(label)}</span></div>` +
      btn("1", "temp_up", "mdi:plus") +
      "</div>"
    );
  }

  _heroInfo(m) {
    const cur = m.cur != null ? `<span class="val">${caFmtNum(this._intlLang(), m.cur)}<small> ${caEsc(this._unit())}</small></span>` : "";
    const target = this._showTarget(m) ? `<span class="arrow">→ ${caEsc(this._targetText(m))}</span>` : "";
    if (!cur) return `<div class="big"><span class="state-big">${caEsc(m.statusText)}</span></div>`;
    return `<div class="big">${cur}${target}</div>${this._heroLine(m)}`;
  }

  _controls(m) {
    const r = this._r;
    const st = this._st(r.id);
    const a = st.attributes;
    const f = a.supported_features || 0;
    const modes = (a.hvac_modes || []).filter((x) => x !== "off");
    const segs = this._segments("hvac", modes, m.mode, (o) => this._fmtState(r.id, o), (o) => CA_MODE_ICONS[o]);
    // A thermostat's presets (comfort, eco, away…) are its main control: segmented buttons when they are few.
    const presets = a.preset_modes || [];
    const presetSegs =
      this._presetButtons && m.running && f & CA_CLIMATE_PRESET && presets.length >= 2 && presets.length <= 7
        ? this._segments("preset", presets, a.preset_mode, (o) => this._fmtAttr(r.id, "preset_mode", o), caClimatePresetIcon)
        : "";
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
          f & CA_CLIMATE_PRESET && !presetSegs ? this._selectAttr("preset_mode", "preset_modes", "set_preset_mode", this._t("preset_mode")) : "",
        ].filter(Boolean)
      : [];
    const toggles = this._toggles(
      this._switches(r).map((id) => {
        const info = caSwitchInfo(id);
        return this._toggle(id, info ? this._t(`sw_${info[2]}`) : this._label(id), info?.[1] || "mdi:toggle-switch-outline");
      }),
    );
    return this._section("", segs + stepper + presetSegs + hum + (selects.length ? `<div class="grid">${selects.join("")}</div>` : "")) + this._options(toggles);
  }

  _action(action, value) {
    const id = this._r.id;
    if (action === "hvac") this._call("climate", "set_hvac_mode", { entity_id: id, hvac_mode: value });
    else if (action === "preset") this._call("climate", "set_preset_mode", { entity_id: id, preset_mode: value });
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

  // What both climate models start from: the entity, its mode, the room temperature (from the entity, else the
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

  // The line under the temperatures (fan mode of an air conditioner, preset of a thermostat).
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

const CA_KIND_ICONS = { purifier: "mdi:air-purifier", fan: "mdi:fan", aircon: "mdi:air-conditioner", thermostat: "mdi:thermostat" };

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
      return (
        `${this._styles(m.color)}<ha-card class="mini">` +
        `<div class="header">${m.badge}<div class="titles"><div class="name">${caEsc(m.name)}</div></div>` +
        `${caPill(m.statusText)}${this._zoomButton()}</div>` +
        `<div class="content">${this._picture(m)}<div class="info">${this._miniInfo(m)}${chips.length ? `<div class="chips">${chips.join("")}</div>` : ""}</div>` +
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
           background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); transition: background .4s, color .4s; }
  .badge ha-icon { --mdc-icon-size: 24px; }
  /* The pill gets its whole label first (at most half the header) and the title the rest, keeping about four
     characters: the pill is only truncated when even that does not fit. */
  .titles { flex: 1 1 0; min-width: 5ch; font-size: 16px; }
  .name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .st { display: inline-flex; align-items: center; gap: 4px; flex: 0 1 auto; min-width: 0; max-width: 50%; overflow: hidden; box-sizing: border-box; position: relative;
        padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;
        white-space: nowrap; background: color-mix(in srgb, var(--ca-color) 15%, transparent); color: var(--ca-color); }
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
      // The fan cards show no alert: no toggle for them.
      ...(this.constructor.kind === "fan" ? {} : { show_alerts: true }),
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
    const domain = caDomain(kind);
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
          ...(kind === "fan" ? [] : [{ name: "show_alerts", selector: { boolean: {} } }]),
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
const CA_ILLUSTRATIONS = { purifier: ["tower", "cylinder", "box", "dyson"], aircon: ["split", "portable", "window"], thermostat: ["dial", "radiator", "valve"] };

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
