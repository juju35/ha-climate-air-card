# Changelog

## 2.4.1 - 2026-11-14

### Documentation
- README: the logos of Xiaomi Home, Xiaomi Miio, Matter, Midea, Panasonic Aquarea, Hitachi Yutaki and ESPHome (TOUG) in the header and *Supported integrations*, with rows for Xiaomi Home, Xiaomi Miio, Matter and Midea AC LAN; the introduction now names every kind of device.

## 2.4.0 - 2026-11-14

### Features
- **Humidifier card**: new `custom:climate-air-humidifier-card` and `custom:climate-air-humidifier-mini-card` for humidifiers, dehumidifiers and essential oil diffusers (`humidifier` entities). Room humidity and target, modes, target humidity slider, water tank (or bucket) level, *Water tank empty* / *Bucket full* alerts, filter, light, child lock and other switches. Status *Humidifying*, *Drying* or *Diffusing*.
- **Large animated illustrations**, picked from the device (`device_class`, model, name) or set with `illustration`: ultrasonic column, clear tank, evaporative, VOCOlinc MistFlow, VOCOlinc FlowerBud essential oil diffuser and dehumidifier (drops falling into its bucket). Mist rises, the tank's water waves and turns red once nearly empty; the VOCOlinc shapes are lit in the colour of the device's light.
- **VOCOlinc FlowerBud** (HomeKit Device): recognised from its model, status *Diffusing*, no humidity target, its *Spray quantity* as a *Mist intensity* slider, and a *Mood light* section (on / off, brightness, colour swatches) usable while the diffuser is off; its cone takes the light's colour and brightness.
- **Overview**: humidifiers, dehumidifiers and diffusers in a *Humidity* group, labelled as what they are when grouped by area, with their empty tank or full bucket flagged on the tile.

## 2.3.1 - 2026-11-14

### Fixes
- **Overview**: the heat pump tile's illustration (outdoor unit and tank, wider than tall) covered the start of its name and status; its picture column now widens to fit it.

## 2.3.0 - 2026-11-14

### Features
- **Heat pump integrations**: the climate entities of NIBE myUplink, Panasonic Aquarea Smart Cloud and Hitachi Yutaki are always heat pumps, even without a hot water tank or a heat pump name. Daikin Onecta, MELCloud, Viessmann ViCare and Atlantic Cozytouch (Overkiz and the Cozytouch custom integration), which also drive air conditioners or boilers, keep being told apart by their hot water tank or their name. The README lists them under *Supported integrations*, with their logos.

## 2.2.0 - 2026-11-14

### Features
- **Heat pump card** ([#64](https://github.com/juju35/ha-climate-air-card/issues/64)): new `custom:climate-air-heatpump-card` and `custom:climate-air-heatpump-mini-card` for air-to-water heat pumps (Daikin Altherma, Panasonic Aquarea, Mitsubishi Ecodan, Atlantic, Hitachi Yutaki, Viessmann…). Room temperature and target, hot water tank with its target and operation modes, what it does (*Heating*, *Cooling*, *Hot water* through the three-way valve, *Idle*, *Defrosting*), backup heater, outdoor temperature and power. Animated illustration: the outdoor unit's fan spins, the water flows to the tank, warm air or snowflakes above the unit, heat above the tank, frost while defrosting.
- **TOUG (Aldes T.One AquaAir)**: a heat pump without a climate entity is found from the mode select of its device; its modes become buttons, its thermostat number the setpoint, and the power button switches to *Off* and back to the last mode.
- **Overview**: heat pumps get their own group and tiles (`heatpump` in `icons`, `devices` and `group_by`); a heat pump is no longer counted as an air conditioner.

## 2.1.0 - 2026-11-13

### Features
- **Filter always shown**: the purifier mini card shows its filter life at any wear (it only did at 20 % or less), and the air conditioner cards show their filter too: its life when the device reports one, else *Filter OK* from its dirty-filter sensor (Midea's *Full dust*). A tap on the line opens its entity.
- **Filter to replace soon**: a new orange alert, *Replace the filter soon*, once the filter life reaches `filter_warning` (20 % by default) or less; at 10 % or less the alert turns red, *Replace the filter*. On the cards, the mini cards and the Overview's tiles (the Overview's alert count turns red too).
- **Filter reset**: once the filter is to clean or replace, the purifier and air conditioner cards offer a *Reset filter* button in their options when the device has one (Midea's *Reset filter counters*…); a second tap within 4 s confirms it.
- New options `show_filter` and `filter_warning` (also on the Overview), in the visual editors, translated in every language.

## 2.0.2 - 2026-11-13

### Fixes
- **Clicks lost under an update**: Home Assistant updates the card several times a second. When an update rewrote the card between the press and the release, the element pressed was replaced and the click landed on the card itself, doing nothing (a button, a preset or the detail button that did not react; the overview's tiles too). The card is no longer rewritten while a press is in progress; the pending update is drawn right after the click, or after the release when no click follows.
- **Focus ring after a mouse click**: the focus was put back on the clicked element after each update, which drew the focus ring. It is now kept across updates for the keyboard only.

## 2.0.1 - 2026-11-13

### Fixes
- Folding back on a tap elsewhere now works on iOS (Safari and the companion app): a tap on something that is not clickable sent no click to the page, so the detailed view of the mini cards and the overview's open device and full list stayed open. The press and the release are caught instead; a slider dragged out of the card and a scroll do not fold anything.
- Leaving the card (another dashboard view, a conditional card hidden) brings it back in its default state: mini cards compact, the overview back to the devices that are on.

## 2.0.0 - 2026-11-13

### ⚠ Breaking changes
- **The thermostat card moved to [ha-heating-card](https://github.com/juju35/ha-heating-card)**: `custom:climate-air-thermostat-card` and `custom:climate-air-thermostat-mini-card` are removed. Install ha-heating-card and replace them with `custom:heating-card` and `custom:heating-mini-card`; every option keeps its name and meaning (`entity`, `name`, `icon`, `illustration`, `entities`, `show_title`, `show_subtitle`, `show_controls`, `show_sensors`, `show_alerts`, `zoom`, `language`). See [Coming from 1.x](https://github.com/juju35/ha-climate-air-card#coming-from-1x-thermostats) in the README.
- Overview: thermostats are gone too. It shows air conditioners, air purifiers and fans only: a `climate` entity is an air conditioner when it can cool, dry or only blow, and a heat-only one (heat, auto or heat/cool) is left out, even under `include`, unless `devices` gives it a `type`. The `thermostat` kind of `illustrations`, `icons` and `devices` no longer exists, nor do the *Window open* and *Low battery* tile alerts.

### Changes
- Translations: the texts only the thermostat used are removed from every language.
- Screenshots: the Overview is rendered again without thermostats; the thermostat screenshots and animations are removed.

## 1.15.0 - 2026-11-12

### Features
- `show_title` and `show_subtitle` options (also in the visual editor) hide the header's title and its subtitle, separately, for a card placed under a section heading of its own (asked in juju35/ha-vehicle-card#72).

## 1.14.3 - 2026-11-09

### Maintenance
- No code change: released again to check the installation from the Marketplace.

## 1.14.2 - 2026-11-09

### Performance
- A role a device lacks (no filter sensor, no VOC sensor…) is remembered with the states it was worked out from, instead of the device being scanned again on every update of the home; it is looked up again as soon as one of the device's entities changes (back from unavailable, say). The overview with hundreds of devices spends about 40 % less time per update; a home with a few devices sees no difference.

## 1.14.1 - 2026-11-09

### Fixes
- Translations: the cards are defined once the page's language file has arrived (at most 1.5 s; Home Assistant builds a card when its element gets defined), so the first render is already translated instead of English then redrawn; until a language file is in, a missing text reads the English one wherever the card has no fallback of its own.

## 1.14.0 - 2026-11-09

### Performance
- **Translations load on demand**: the bundle keeps English only (294 KB → 180 KB) and each other language is its own `ha-climate-air-card.i18n.<lang>.js` file next to it, fetched the first time a card needs it. Home Assistant loads every dashboard resource on every dashboard, so each page used to download and parse all 22 languages to use one. Until a language file has arrived (a few milliseconds), texts fall back to English, and the cards redraw once it is there.

### Maintenance
- Build: `scripts/i18n-split.mjs` splits the built bundle and rebuilds every table from the split files to check them (the build fails on any difference); `src/` keeps every language as before.
- Release: every file of `dist/` is attached. Manual installation copies the translation files too.

## 1.13.0 - 2026-11-09

### What's new
- Thermostats: a new `custom:climate-air-thermostat-card` and its mini card (`custom:climate-air-thermostat-mini-card`), for every `climate` entity that heats but cannot cool, dry or blow (wall thermostats, electric radiators, radiator valves). The room temperature and the target with − / +, what it does (*Heating*, *Idle*), the presets as buttons (*Comfort*, *Eco*, *Away*…), the valve opening and the battery, *Window open* and *Low battery* alerts, and an animated illustration while it heats: a round wall thermostat, a column radiator or a radiator valve (`illustration: dial`, `radiator` or `valve`, guessed from the device otherwise). In every language.
- Overview: thermostats are found by themselves and get their own group, tiles (*Heating · 21 °C*) and alerts; `thermostat` is a new kind in `illustrations`, `icons` and `devices`. The header's alert chip counts open windows and low batteries too.
- Overview: `show_all: true` (**Show every device** in the visual editor, in every language) starts on every device; the detail button then keeps only the devices on or needing attention.

### Changes
- A heat-only thermostat added under `include` used to show as an air conditioner; it is now a thermostat (set `type: aircon` under `devices` to keep the old tile). Thermostats now show on the Overview without `include`: list them under `exclude` to leave them out.

## 1.12.0 - 2026-11-08

### What's new
- Air conditioner card: a *Target humidity* slider, in every language, for the entities that support it (`climate.set_humidity`).

### Fixes
- A slider shows its fill and its value while it moves, not only once it is released.
- A dropdown or slider that keeps the focus no longer freezes the card: the rest of the card is redrawn around it, and the control keeps its value and the focus.
- Air conditioner card: the target set with − / + no longer jumps back to the old value after the call; it stays until the device reports it (10 seconds at most).

## 1.11.0 - 2026-11-07

### What's new
- Air conditioner card: a *Horizontal swing* select, in every language, for the entities that support it (`swing_horizontal_mode`).

### Fixes
- The keyboard focus stays on the control that had it when the card redraws (− / + of the target, mode buttons, toggles, Overview tiles), instead of falling back to the page.
- A dropdown or slider changed from the keyboard keeps the focus, and a slider moved with the arrow keys calls the service once the presses stop; with a mouse or a finger, the focus still leaves the control.
- Chips that open a more-info can be reached with Tab and opened with Enter or Space; an Overview tile is no longer a button holding other buttons, its name is the button that unfolds the device's card.

## 1.10.0 - 2026-11-07

### What's new
- Overview: an air conditioner in *Heat/Cool* or *Auto* with a low / high range shows that range on its tile (*Heat/Cool · 20–24 °C*) and on its illustration's display.
- Clicking a chip (a measurement, a filter alert, oscillation, timer, offline) opens the more-info dialog of its entity, on the cards and on the Overview tiles.
- Mini cards take the height of their content in a Sections view (`rows: auto`).

## 1.9.0 - 2026-11-07

### Fixes
- Air conditioner card: in *Heat/Cool* or *Auto* mode, when the entity sets a low / high range (`target_temp_low` / `target_temp_high`) instead of one target, the card now shows both ends, each with its own − / + (*Heat to*, *Cool to*, in every language), kept within the device's limits and a step apart. The target and its buttons used to disappear, so the temperature could not be set. The mini card shows the range; its buttons stay on the full card.

## 1.8.11 — 2026-11-04

### Documentation
- README: images and links use absolute URLs, so the screenshots, icons, badges and links display in HACS (relative paths broke there).
- README: screenshots get a display size, so cards no longer show oversized in HACS and on GitHub.

## 1.8.10 — 2026-11-04

### Changes
- Added Romanian, Danish, Swedish, Bulgarian, Russian, Ukrainian, Hungarian, Slovak, Czech, Slovenian, Latvian and Greek translations: every card, the visual editor (which now offers *Română*, *Dansk*, *Svenska*, *Български*, *Русский*, *Українська*, *Magyar*, *Slovenčina*, *Čeština*, *Slovenščina*, *Latviešu* and *Ελληνικά* in its language list) and the labels of the preset and fan mode values the integrations leave untranslated. *Nivå n*, *Уровень n*, *Szint n*, *Úroveň n*, *Επίπεδο n* and the like are recognized like *Level n*.

## 1.8.9 - 2026-11-02

### Fixes
- Mini cards: the header icon keeps its full size (40 px, 24 px icon) in the compact view, like the full card.

## 1.8.8 — 2026-11-01

### Fixes
- Narrow cards (6 columns of a Sections view): the status pill no longer squeezes the card's name down to nothing. It takes at most half the header and shows its whole label; only when that label really does not fit does it keep just its coloured dot, with the status in its tooltip (and still read by screen readers). The name always keeps its first characters. Same on the Overview header.
- Mini cards at their default width: the round buttons move under the device's info, so the air quality, fan mode or temperature line is no longer cut to a couple of letters and the speed value no longer overlaps the buttons. On the narrowest cards the illustration makes way for the info.
- Air conditioner card on a narrow card: the target temperature stepper tightens so its − and + buttons stay inside the card.
- Air conditioner card on a narrow card (about 160 to 180 px): the mode buttons no longer leave the card. They share the width as icons, the selected mode's name staying in its tooltip and for screen readers.
- Narrow full cards (about 160 to 200 px): the device's info goes under the illustration, so *Unavailable* or a long chip such as *Device offline* is no longer cut. On the Overview, a long filter alert wraps inside its tile, between words, and on a narrow card it takes the tile's whole width instead of being cut.
- At usual widths, the status pill shows its whole label (*Purifying*, *Unavailable*): the name gives way first and the pill is only truncated when there is really no room.
- Cards placed in a container that sizes them to their content (an `inline-block`, a grid's `auto` column, as in some layout-card or button-card setups) no longer collapse to a thin strip, and they still shrink to fit two-column grids and horizontal stacks, also when the card is wrapped in another element there (it used to keep a 326 px width and overflow its column).
- Mini cards and Overview: opening or closing the details from the keyboard no longer scrolls the page.

## 1.8.7 — 2026-11-01

### Changes
- Added Italian, Dutch, European Portuguese and Polish translations: every card, the visual editor (which now offers *Italiano*, *Nederlands*, *Português* and *Polski* in its language list) and the labels of the preset and fan mode values the integrations leave untranslated. A Home Assistant set to Brazilian Portuguese (`pt-BR`) gets the European Portuguese labels. *Livello n* and *Poziom n* values are recognized like *Level n*.

## 1.8.6 — 2026-11-01

### Changes
- Serbian translations, in Cyrillic (`sr`) and Latin (`sr-Latn`) script, with both offered in the editor's language list. Serbian translations by @cpmarexel2f (#20).

### Fixes
- Language detection: a full code the cards know (`sr-Latn`) is used as is, so a Home Assistant set to Serbian Latin gets the Latin labels; otherwise the part before the dash (`fr-FR` → French), else English.

## 1.8.5 — 2026-10-29

### Fixes
- Overview visual editor: the *Alerts* toggle is now offered (on by default). Turning it off hides the filter alerts on the purifier and air conditioner tiles, as `show_alerts: false` already did in YAML.

## 1.8.4 — 2026-10-29

### Fixes
- Overview visual editor: saving the form no longer drops the `illustrations` and `icons` set for a device it does not list (an excluded device, or one whose integration has not loaded yet); they are kept as written.
- The fan and fan mini card editors no longer show an *Alerts* toggle that had no effect: only the purifier and air conditioner cards have filter alerts.

## 1.8.3 — 2026-10-29

### Fixes
- The first click on a card button (target temperature +/−, power, a mode, a switch, zoom) right after leaving a dropdown or the speed slider is no longer lost when a sensor changed meanwhile: moving the focus to another control of the card no longer redraws it under the mouse.

## 1.8.2 — 2026-10-29

### Fixes
- A card no longer freezes after a dropdown (fan mode, preset, timer) is closed with Escape or on the same value, or after the speed slider's thumb is touched without moving it: on/off state, PM2.5, temperature and status update again as soon as the focus leaves the control, in the overview's detail panel too.

## 1.8.1 — 2026-10-29

### Fixes
- Sensors and devices that come up after the dashboard has loaded (a wall tablet reconnecting while Home Assistant starts) are picked up again: PM2.5, filter, compressor and other readings no longer stay missing, the device shows in the overview, and a card without `entity` no longer sticks on *No device found* until the registry changes.
- German and Spanish installations: VOC and NO₂ sensors are found by their device class, and the indoor and outdoor temperatures, compressor frequency, filter alert, timer, ionizer, indicator light, brightness, angle and rotation buttons by their German or Spanish entity IDs.
- Air conditioner: a target temperature Home Assistant refuses (out of range, unavailable entity) no longer raises an unhandled error in the browser console, and a 0.1 °C step sends a clean value (21.3, not 21.300000000000001).
- Long slider labels (*Geschwindigkeit*, *Lieblingsstufe* in German) are shortened with an ellipsis instead of squeezing the slider on narrow cards.
- The purifier's mini card tooltip uses the colon spacing of the card's language (*Preset: Sleep*, *Préréglage : Nuit*), and German shows the sleep preset and switch as *Schlafmodus* everywhere.

## 1.8.0 — 2026-10-28

### Changes
- German and Spanish translations: every card and the visual editor follow Home Assistant in `de` and `es` (or the `language` option, which now offers *Deutsch* and *Español*), including the labels of the preset and fan mode values the integrations leave untranslated and the *Level n* values.

## 1.7.2 — 2026-10-28

### Fixes
- Air conditioner: a target temperature set just before the card leaves the page (dashboard edit, overview panel folded, mini card zoomed) is now sent right away instead of being dropped.
- Fan: a 3-speed fan can reach full speed again; the speed slider keeps the integration's decimal step (33.333 %) instead of rounding it to 33 %, which left 100 % out of reach.
- Overview grouped by area: the area icon in the group heading is escaped like every other icon.

### Changes
- Faster updates on large installations: entity and registry lookups are cached until the registry changes, and the cards decide whether to redraw by comparing state objects instead of serializing every attribute on each update.

### Documentation
- README: GIFs of the air conditioner's heating and drying animations, and a note on the HomeKit 1–5 reading of a low `aqi` value in the entity overrides table.

## 1.7.1 — 2026-10-28

### Changes
- Overview grouped by area: the group heading shows the area's own icon from Home Assistant's area registry, falling back to the generic `mdi:texture-box` when the area has none.

## 1.7.0 — 2026-10-28

### Changes
- Overview grouped by area: the group heading already names the room, so each tile is now labelled by its kind of device (*Air purifier*, *Air conditioner*, *Fan*) instead of repeating the room name. A `name` set under `devices` still wins, and the tooltip keeps the device's real name. Within a room, tiles follow a fixed order: air conditioners, then purifiers, then fans.

## 1.6.0 — 2026-10-28

### Changes
- Dyson air treatment devices (Pure Cool, Pure Hot+Cool, Humidify+Cool… via the `dyson_local` integration) are supported out of the box. They are detected as air purifiers from their PM2.5 sensor, and the card reads their split filters correctly: the **HEPA** life (or the combined one on older units) is shown, never the carbon figure or a life expressed in hours.
- New `voc` and `no2` entity roles: Dyson's *Volatile organic compounds* and *Nitrogen dioxide* indices show as chips next to temperature, humidity and PM10. They can be overridden under `entities` like the other sensors.
- Entity detection gained a general *prefer / avoid* tie‑break, so a device exposing several sensors for one role (a HEPA **and** a carbon filter, a life in **%** **and** in **hours**) resolves to the right one regardless of registry order. No change for devices with a single sensor per role.
- New `dyson` purifier illustration: a bladeless loop amplifier on a base, with the PM2.5 display and the air‑quality ring. Having no blades to turn, it animates with a stream of clean air rising up through the hollow loop. It is picked automatically for Dyson models (Pure Cool, Hot+Cool, Humidify+Cool, Cool Me, Big+Quiet…) and can be set explicitly with `illustration: dyson`.

## 1.5.0 — 2026-10-26

### Documentation
- README — HACS install step updated: the **Frontend** tab was removed in HACS 2.0, so *Custom repositories* now opens from the three-dots menu at the top right. The wording matches `ha-freebox-card`, and the redundant `(Lovelace)` after the **Dashboard** category is dropped. No code, behaviour or API change.

## 1.4.0
### Changes
- Header icon sized like the other ha-* cards: the overview's round badge grows from 36px to 40px, and the icon in every badge is 24px (20px in the mini cards' 32px badge).
- Mini cards: the title is 16px like the full cards' (it was 14px); a long name still ends with an ellipsis.
- Section headings get the shared look of the ha-* cards: a 16px icon in front (*Options*: tune icon; overview groups: the kind of device, or an area), 12px uppercase. The overview group headings were 11px with no icon.
- Air conditioner: the target temperature of the stepper is 30px (it was 26px) with its unit in 14px, like the main value; the main values' unit is 14px (it was 15px).
- Round buttons that are on (power, temperature steps, oscillation, preset) use the shared 16% tint, 24% on hover.
- The body starts 8px under the header (it was 10px on the full cards and 4px above the overview groups), like the other ha-* cards.

## 1.3.2

### Changes
- Overview: a group no longer starts a new row of its own. Each group takes as many columns as it has devices, so groups of one device sit side by side instead of leaving half a row empty, with each group under its own heading.
- Overview: a tile's filter alert sits under its state, beside the illustration, instead of on a row of its own across the tile.

## 1.3.1

### Fixes
- Air conditioner: the options are labelled in the card's language, the integration often naming them in English only (Midea: *Prompt tone*, *Screen display*, *Self clean*, *Auxiliary heating*, *Outdoor silent mode*, *Smart eye*, *Anion*…), with a matching icon. An option the card does not know keeps its own name.

## 1.3.0

### Changes
- Overview editor: the devices are set visually, without YAML. A **Device types** section sets the illustration and the icon of every air conditioner, purifier or fan; a **Devices** section has a block per device with its name, type, illustration and icon. They are written as `illustrations`, `icons` and `devices` as before; a device's settings found under `illustrations` or `icons` move into its `devices` entry. The **Advanced** section keeps the language only.

## 1.2.2

### Changes
- Purifier `tower` illustration redrawn: a tall box with slightly rounded corners, a top grille, a finely perforated lower half and a round display showing the PM2.5 (or the air quality index) above a small air quality light, on the cards and the overview tiles.

## 1.2.1

### Fixes
- Preset, fan mode, swing, mode and status values that the integration leaves untranslated are now shown in the card's language: Xiaomi Home presets (*Natural Wind*, *Straight Wind*, *Smart*, *Sleep*, *Favorite*…), Midea fan modes (*silent*, *full*), HomeKit purifier modes and status, and *Level 4* style values (*Niveau 4*). Home Assistant's own translation still comes first.

## 1.2.0

### Changes
- Overview: each tile shows its device's illustration instead of an icon, animated while it runs like on the device cards, in the device's own colours. Choose it by kind of device or per device with `illustrations` (or `illustration` in `devices`), guessed from the device model otherwise; the unfolded card uses the same one. The editor gets an **Illustrations** section.
- Overview: an icon set in `icons` now replaces the illustration of its tiles.

### Maintenance
- The illustrations of the three kinds of device live in one registry shared by the cards and the overview.

## 1.1.0

### Changes
- Overview: configurable icons, in the visual editor too. `icon` sets the header icon; `icons` sets the tile icons, for every device of a kind (`aircon`, `purifier`, `fan`) or for one device (by entity ID), the device's own winning. A running air conditioner keeps its mode icon unless one is set. The editor's new **Icons** section lists every kind and every device found.

## 1.0.0

### Changes
- First release: `climate-air-purifier-card`, `climate-air-fan-card` and `climate-air-aircon-card`, each with its mini card (`-mini-card`, with a detail button that unfolds the full card), and `climate-air-overview-card` showing every air conditioner, air purifier and fan of the instance.
- Automatic discovery of the device's sensors and controls (PM2.5, air quality, filter, temperature, humidity, angle, timer, compressor, dust alert…), whatever the integration; each one can be overridden under `entities`.
- Animated illustrations while a device runs; three shapes for purifiers (tower, round, square box) and for air conditioners (wall split, portable, window split), picked from the device model or set with `illustration`.
- Visual editors, English and French, light and dark themes.
