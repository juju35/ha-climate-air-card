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
    hours: "{n} h",
    level: "Level {n}",
    target: "Target",
    outdoor: "Outdoor",
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
    hours: "{n} h",
    level: "Niveau {n}",
    target: "Consigne",
    outdoor: "Extérieur",
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
    hours: "{n} h",
    level: "Stufe {n}",
    target: "Sollwert",
    outdoor: "Außen",
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
    hours: "{n} h",
    level: "Nivel {n}",
    target: "Objetivo",
    outdoor: "Exterior",
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
  sr: {
    purifier: "Пречишћивач ваздуха",
    fan: "Вентилатор",
    aircon: "Клима уређај",
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
    hours: "{n} h",
    level: "Ниво {n}",
    target: "Циљ",
    outdoor: "Споља",
    fan_mode: "Вентилатор",
    swing_mode: "Усмеравање",
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
    ill_tower: "Стубни",
    ill_cylinder: "Округли",
    ill_box: "Квадратни",
    ill_dyson: "Без елисе",
    ill_split: "Зидна сплит јединица",
    ill_portable: "Покретна јединица",
    ill_window: "Прозорска сплит јединица",
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
    ed_exclude: "Уређаји за искључивање",
    ed_include: "Уређаји за додавање",
    ed_include_helper: "Ентитети климе или вентилатора које картица не би сама препознала (нпр. термостат који подржава само грејање)",
  },
  "sr-Latn": {
    purifier: "Prečišćivač vazduha",
    fan: "Ventilator",
    aircon: "Klima uređaj",
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
    hours: "{n} h",
    level: "Nivo {n}",
    target: "Cilj",
    outdoor: "Spolja",
    fan_mode: "Ventilator",
    swing_mode: "Usmeravanje",
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
    ill_tower: "Stubni",
    ill_cylinder: "Okrugli",
    ill_box: "Kvadratni",
    ill_dyson: "Bez elise",
    ill_split: "Zidna split jedinica",
    ill_portable: "Pokretna jedinica",
    ill_window: "Prozorska split jedinica",
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
    ed_exclude: "Uređaji za isključivanje",
    ed_include: "Uređaji za dodavanje",
    ed_include_helper: "Entiteti klime ili ventilatora koje kartica ne bi sama prepoznala (npr. termostat koji podržava samo grejanje)",
  },
  it: {
    purifier: "Purificatore d'aria",
    fan: "Ventilatore",
    aircon: "Condizionatore",
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
    hours: "{n} h",
    level: "Livello {n}",
    target: "Obiettivo",
    outdoor: "Esterno",
    fan_mode: "Ventilazione",
    swing_mode: "Oscillazione alette",
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
    ill_tower: "Torre",
    ill_cylinder: "Rotondo",
    ill_box: "Scatola quadrata",
    ill_dyson: "Anello senza pale",
    ill_split: "Split a parete",
    ill_portable: "Condizionatore portatile",
    ill_window: "Split da finestra",
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
    ed_exclude: "Dispositivi da escludere",
    ed_include: "Dispositivi da aggiungere",
    ed_include_helper: "Entità climate o fan che la scheda non sceglierebbe da sola (ad esempio un termostato solo riscaldamento)",
  },
  nl: {
    purifier: "Luchtreiniger",
    fan: "Ventilator",
    aircon: "Airconditioner",
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
    hours: "{n} u",
    level: "Niveau {n}",
    target: "Doel",
    outdoor: "Buiten",
    fan_mode: "Ventilatie",
    swing_mode: "Zwenken",
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
    ill_tower: "Toren",
    ill_cylinder: "Rond",
    ill_box: "Vierkante kast",
    ill_dyson: "Bladloze ring",
    ill_split: "Wandunit (split)",
    ill_portable: "Mobiele unit",
    ill_window: "Raamunit (split)",
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
    ed_exclude: "Uit te sluiten apparaten",
    ed_include: "Toe te voegen apparaten",
    ed_include_helper: "Climate- of fan-entiteiten die de kaart niet uit zichzelf zou kiezen (bijvoorbeeld een thermostaat die alleen verwarmt)",
  },
  pt: {
    purifier: "Purificador de ar",
    fan: "Ventoinha",
    aircon: "Ar condicionado",
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
    hours: "{n} h",
    level: "Nível {n}",
    target: "Alvo",
    outdoor: "Exterior",
    fan_mode: "Ventilação",
    swing_mode: "Oscilação",
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
    ill_tower: "Torre",
    ill_cylinder: "Redondo",
    ill_box: "Caixa quadrada",
    ill_dyson: "Anel sem pás",
    ill_split: "Split de parede",
    ill_portable: "Unidade portátil",
    ill_window: "Split de janela",
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
    ed_exclude: "Dispositivos a excluir",
    ed_include: "Dispositivos a adicionar",
    ed_include_helper: "Entidades climate ou fan que o cartão não escolheria sozinho (por exemplo, um termóstato só de aquecimento)",
  },
  pl: {
    purifier: "Oczyszczacz powietrza",
    fan: "Wentylator",
    aircon: "Klimatyzator",
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
    hours: "{n} h",
    level: "Poziom {n}",
    target: "Cel",
    outdoor: "Na zewnątrz",
    fan_mode: "Nawiew",
    swing_mode: "Kierunek nawiewu",
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
    ill_tower: "Wieża",
    ill_cylinder: "Okrągły",
    ill_box: "Kwadratowa obudowa",
    ill_dyson: "Pierścień bez łopatek",
    ill_split: "Split ścienny",
    ill_portable: "Klimatyzator przenośny",
    ill_window: "Split okienny",
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
    ed_exclude: "Urządzenia do wykluczenia",
    ed_include: "Urządzenia do dodania",
    ed_include_helper: "Encje climate lub fan, których karta nie wybrałaby sama (np. termostat tylko do ogrzewania)",
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
  const level = /^(level|niveau|stufe|nivel|livello|poziom|gear|speed)_?(\d+)$/.exec(key);
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

// A role of an entity's device, memoized (see caMemo): the whole-device scans only run again when the registry
// or the set of states changes.
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
      // A dropdown closed with Escape or a slider thumb touched without moving it fires no `change`: when the focus
      // leaves, draw the updates held back while it was there. Deferred so the focus has settled (it may only move
      // to another control of the card, which still holds them back). Focus staying inside the card draws nothing:
      // a mouse press on a button moves the focus between mousedown and mouseup, and a rebuild there would drop the
      // click; the click itself (or the next tick) draws the held updates.
      this.shadowRoot.addEventListener("focusout", (ev) => {
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
      const text = (o) => (o === 0 && /timer|countdown|delay|minuterie|temporizador|ausschalt/.test(id) ? this._t("timer_off") : `${caFmtNum(this._intlLang(), o)}${unit ? ` ${unit}` : ""}`);
      return `<label class="field"><span>${caEsc(label)}</span><select data-number="${caEsc(id)}">${opts
        .map((o) => `<option value="${o}"${o === v ? " selected" : ""}>${caEsc(text(o))}</option>`)
        .join("")}</select></label>`;
    }
    return (
      `<div class="slider"><ha-icon icon="${icon || "mdi:tune-variant"}"></ha-icon><span class="sl-label">${caEsc(label)}</span>` +
      `<input type="range" min="${min}" max="${max}" step="${step}" value="${v}" data-number="${caEsc(id)}" aria-label="${caEsc(label)}" style="--p:${((v - min) / (max - min || 1)) * 100}%">` +
      `<span class="v">${caFmtNum(this._intlLang(), v)}${unit ? ` ${unit}` : ""}</span></div>`
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
  // A refusal (out of range, entity unavailable) is already reported by Home Assistant's own toast: it must not
  // also surface as an unhandled rejection.
  _call(domain, service, data) {
    return Promise.resolve(this._hass.callService(domain, service, data)).catch(() => {});
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
                  { value: "sr", label: "Српски" },
                  { value: "sr-Latn", label: "Srpski (latinica)" },
                  { value: "it", label: "Italiano" },
                  { value: "nl", label: "Nederlands" },
                  { value: "pt", label: "Português (Portugal)" },
                  { value: "pl", label: "Polski" },
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
