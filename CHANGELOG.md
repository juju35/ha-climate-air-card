# Changelog

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
