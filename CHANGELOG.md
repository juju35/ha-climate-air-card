# Changelog

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
