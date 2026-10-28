# ha-climate-air-card

[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![HACS Validation](https://github.com/juju35/ha-climate-air-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/juju35/ha-climate-air-card/actions/workflows/hacs.yml)
[![Validate](https://github.com/juju35/ha-climate-air-card/actions/workflows/validate.yml/badge.svg)](https://github.com/juju35/ha-climate-air-card/actions/workflows/validate.yml)
[![Release](https://img.shields.io/github/v/release/juju35/ha-climate-air-card)](https://github.com/juju35/ha-climate-air-card/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Lovelace cards for Home Assistant's **air purifiers, fans and air conditioners**: one card per kind of device, each with a mini card, and an overview of every device of the instance. Add a card, it finds the device and its sensors by itself. The illustrations come alive while a device runs.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=juju35&repository=ha-climate-air-card&category=plugin)

| Card | Type | What it shows |
|---|---|---|
| [Overview](#overview) | `custom:climate-air-overview-card` | Every air conditioner, air purifier and fan at a glance: one tile per device, tap a tile to unfold its full card. |
| [Air purifier](#air-purifier) | `custom:climate-air-purifier-card` | Air quality, filter life, presets, speed and options of an air purifier. |
| [Air purifier mini](#mini-cards) | `custom:climate-air-purifier-mini-card` | The same purifier on two lines, with a zoom to the full card. |
| [Fan](#fan) | `custom:climate-air-fan-card` | Speed, oscillation, presets, angle, timer and options of a fan. |
| [Fan mini](#mini-cards) | `custom:climate-air-fan-mini-card` | The same fan on two lines, with a zoom to the full card. |
| [Air conditioner](#air-conditioner) | `custom:climate-air-aircon-card` | Mode, target temperature, fan and swing, measurements and options of an air conditioner. |
| [Air conditioner mini](#mini-cards) | `custom:climate-air-aircon-mini-card` | The same air conditioner on two lines, with a zoom to the full card. |

| Overview | Air purifier | Fan | Air conditioner |
|---|---|---|---|
| ![Overview](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-all.png) | ![Air purifier](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-card.png) | ![Fan](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-card.png) | ![Air conditioner](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-card.png) |

All the cards share the same look (header with a status pill and a power button, illustration next to the state, mini cards with a detail button), a visual editor in the dashboard UI covering every option (the device cards' entity overrides in its folded **Advanced** section, as YAML), English, French, German and Spanish labels following the Home Assistant language, light and dark themes, and come in a single HACS download with no dependency.

## Features

### Overview

`custom:climate-air-overview-card` — Every air conditioner, air purifier and fan at a glance.

- Automatic discovery: every `climate` entity that can cool, dry or only blow (a heat-only thermostat is left out), and every `fan` entity, sorted into air purifiers (from their name, or a PM2.5, air quality or filter sensor on the device) and fans
- One compact tile per device with its illustration, animated while it runs like on the device cards (turning blades and rotor, air flowing out, swinging head or flap), coloured by its state: the mode colour of an air conditioner, the air quality of a purifier, blue for a fan
- The state on each tile: *Cool · 22 °C*, *PM2.5 6 · Good air*, *45 % · Natural wind*, or *Off* (with the room temperature for an air conditioner); a chip flags a filter to replace or to clean
- Grouped by kind of device, by area, or not at all (`group_by`)
- **Tap** the icon of a tile to turn the device on or off; **tap** the tile to unfold its full card at the top of the overview, tap it again or anywhere else to fold it back
- Only the devices that are on or need attention show; the **detail** button (top right) shows every device, and back, as does a click anywhere else (`zoom: false`: every device, always, no button)
- Header with how many devices are on and how many filters need care
- The illustration of every device of a kind or of each device (`illustrations`, guessed from the device model otherwise), or an icon instead (`icons`); a name and a type per device (`devices`); the header icon (`icon`). In the visual editor, the **Device types** and **Devices** sections set all of them, without YAML

### Air purifier

`custom:climate-air-purifier-card` — An air purifier (`fan` entity) and the sensors of its device.

- The PM2.5 density (or the air quality index) in large, with its level: *Good air*, *Moderate air*, *Poor air*, *Very poor air*; the card takes the colour of the air quality
- Animated illustration while it runs: the fan turns (faster with the speed), clean air rises and dust is drawn into the intake; the display ring and the floor light take the air quality colour. Four shapes: a tower (a tall box whose display shows the PM2.5), a round purifier, a square box and a Dyson-style bladeless loop, picked from the device model or set with `illustration`
- Filter life bar (with its hours of use on hover) and a *Replace the filter* alert at 10 % or less
- Presets as segmented buttons (Auto, Sleep, Favorite…), or the device's mode select when it has no presets (HomeKit purifiers); speed slider; favorite level in the Favorite preset
- Temperature, humidity, PM10 and, when the device reports them, VOC and NO₂ chips (Dyson); child lock, sound and indicator light toggles

### Fan

`custom:climate-air-fan-card` — A fan (`fan` entity) and the controls of its device.

- The speed in large, with the preset; speed slider and presets (natural wind, straight wind…)
- Animated illustration while it runs: the blades turn faster with the speed, the head swings while oscillating, and the breeze comes in gusts in a natural wind preset
- Oscillation, ionizer, child lock, sound and indicator light toggles; oscillation angle, timer and display brightness; turn left / turn right buttons
- Temperature and humidity chips when the fan measures them

### Air conditioner

`custom:climate-air-aircon-card` — An air conditioner (`climate` entity) and the sensors of its device.

- The room temperature in large and the target next to it; modes as segmented buttons (only the selected one keeps its label when there are many); − / + buttons for the target, sent once the taps stop
- Fan mode, swing mode and preset; the device's other switches (eco, display, self clean, sound…) as option toggles
- Animated illustration while it runs: the air flows out in the mode colour, with snowflakes when cooling, shimmer when heating and droplets when drying; the flap swings with the vertical swing and the airflow sways with the horizontal one; the status light breathes while the compressor runs. Three shapes: a wall split unit, a portable unit with its exhaust hose and a window split (indoor unit, outdoor unit hung outside the window, whose fan turns with the compressor), picked from the device model or set with `illustration`
- Outdoor temperature, humidity and power draw chips; a *Clean the filter* alert from the device's dust sensor

### Mini cards

`custom:climate-air-purifier-mini-card`, `custom:climate-air-fan-mini-card`, `custom:climate-air-aircon-mini-card` — The device on two lines, for a compact dashboard.

- The illustration (animated too), the key reading (PM2.5, speed, temperatures) and round buttons: power, plus the preset (purifier), the oscillation (fan) or − / + for the target (air conditioner)
- The **detail** button (top right) unfolds the full card, and back, as does a click anywhere else (`zoom: false` removes it)

| Air purifier | Fan | Air conditioner |
|---|---|---|
| ![Air purifier mini](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-mini.png) | ![Fan mini](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-mini.png) | ![Air conditioner mini](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-mini.png) |

## Prerequisites

- Home Assistant 2024.8 or later
- Air purifiers and fans as `fan` entities, air conditioners as `climate` entities, from any integration (Xiaomi Home, Xiaomi Miio, HomeKit Device, Matter, Midea, Dyson…)

## Installation

### Via HACS (recommended)

Click the button below to add the repository directly:

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=juju35&repository=ha-climate-air-card&category=plugin)

Or manually:

1. Open HACS → **⋮** (top right) → **Custom repositories**
2. Add `https://github.com/juju35/ha-climate-air-card` — Category: **Dashboard**
3. Search for **Climate Air Cards** and install it
4. Clear your browser cache and refresh

HACS registers the dashboard resource for you; the single file provides every card.

### Manual

1. Download `ha-climate-air-card.js` from the [latest release](https://github.com/juju35/ha-climate-air-card/releases/latest)
2. Copy it to `/config/www/`
3. Go to **Settings → Dashboards → Resources** → Add resource:
   - URL: `/local/ha-climate-air-card.js`
   - Type: **JavaScript Module**
4. Clear your browser cache and refresh

## Configuration

### Common options

The purifier, fan and air conditioner cards, and their mini cards, share these options.

| Option | Required | Default | Description |
|---|---|---|---|
| `entity` | ❌ | First found | The `fan` or `climate` entity of the device; without it, the card takes the first device of its kind |
| `name` | ❌ | Device name | Card title |
| `icon` | ❌ | Illustration | Replaces the illustration with an icon |
| `illustration` | ❌ | `auto` | Purifier: `tower`, `cylinder`, `box` or `dyson` (bladeless loop); air conditioner: `split`, `portable` or `window`. `auto` picks one from the device model and name |
| `show_controls` | ❌ | `true` | Show the controls (presets, speed, modes, options) |
| `show_sensors` | ❌ | `true` | Show the measurement chips (temperature, humidity, PM10, outdoor temperature, power) |
| `show_alerts` | ❌ | `true` | Show the filter alerts |
| `zoom` | ❌ | `true` | Mini cards only: detail button at the top right that unfolds the full card (a click elsewhere folds it back) |
| `language` | ❌ | Auto | Force language: `en`, `fr`, `de` or `es` (auto-detects from HA settings); also on the Overview card |
| `entities` | ❌ | Auto | Override the sensors and controls found on the device (see [Entity overrides](#entity-overrides)) |

### Overview

Minimal:

```yaml
type: custom:climate-air-overview-card
```

Full options:

```yaml
type: custom:climate-air-overview-card
title: Climate & air
icon: mdi:home-thermometer
group_by: type
columns: 2
zoom: true
exclude:
  - fan.garage_fan
include:
  - climate.bathroom_thermostat
illustrations:
  aircon: window
  fan.bedroom_air: box
icons:
  fan.garage_fan: mdi:ceiling-fan
devices:
  - entity: fan.bedroom_air
    name: Bedroom
    type: purifier
```

| Option | Required | Default | Description |
|---|---|---|---|
| `title` | ❌ | Climate & air | Card title |
| `icon` | ❌ | `mdi:air-filter` | Header icon |
| `illustrations` | ❌ | Auto | Tile illustrations, by kind of device (`aircon`, `purifier`) and by entity ID, the device's own winning: purifier `tower`, `cylinder`, `box` or `dyson`; air conditioner `split`, `portable` or `window`. Unset or `auto`: guessed from the device model and name. The unfolded card uses the same one. In the visual editor's **Device types** and **Devices** sections |
| `icons` | ❌ | — | An icon instead of the illustration, by kind of device (`aircon`, `purifier`, `fan`) or by entity ID; it moves with the device state (turning fan, mode icon of an air conditioner). In the visual editor's **Device types** and **Devices** sections |
| `group_by` | ❌ | `type` | `type` (air conditioners, air purifiers, fans), `area` or `none`. With `area`, the heading shows the area's icon and name, and each tile is labelled by its kind of device (Air purifier, Air conditioner…) instead of repeating the room — a `name` set in `devices` still wins |
| `columns` | ❌ | `2` | Number of tile columns (1 on narrow cards unless set) |
| `zoom` | ❌ | `true` | Only the devices on or needing attention show, and a detail button shows them all; `false`: every device, always |
| `exclude` | ❌ | — | Devices left out |
| `include` | ❌ | — | `climate` or `fan` entities the card would not pick on its own (a heat-only thermostat shows as an air conditioner) |
| `devices` | ❌ | — | Per-device overrides: `{entity, name, icon, illustration, type}`, with `type` one of `aircon`, `purifier`, `fan` (they win over `icons` and `illustrations`) |

### Air purifier

```yaml
type: custom:climate-air-purifier-card
entity: fan.living_room_purifier
illustration: cylinder
```

### Fan

```yaml
type: custom:climate-air-fan-card
entity: fan.bedroom_fan
```

### Air conditioner

```yaml
type: custom:climate-air-aircon-card
entity: climate.air_conditioner
illustration: window
```

### Entity overrides

The cards find the other entities of the device by their registry translation key, their entity ID (English or French) or their device class. Set one under `entities` when the card picks the wrong one or misses it:

| Key | Domain | Card | Used for |
|---|---|---|---|
| `pm25` / `pm10` | `sensor` | Purifier | Particle density, air quality colour |
| `voc` / `no2` | `sensor` | Purifier | Volatile organic compounds and nitrogen dioxide index (Dyson) |
| `aqi` | `sensor` | Purifier | Air quality index, when there is no PM2.5 sensor. A value of 5 or less is read on the HomeKit 1–5 scale, above that as a US AQI |
| `filter` / `filter_hours` | `sensor` | Purifier | Filter life (%) and hours of use. Dyson's HEPA (or combined) filter is used, not its carbon one |
| `status` | `sensor` | Purifier | State shown while on (*Purifying*, *Idle*…) |
| `mode` | `select` | Purifier | Mode buttons, when the fan entity has no presets |
| `favorite` | `number` | Purifier | Favorite level |
| `temperature` / `humidity` | `sensor` | Purifier, fan, air conditioner (humidity) | Measurement chips |
| `angle` | `number` / `select` | Fan | Oscillation angle |
| `timer` | `number` | Fan | Timer |
| `rotate_left` / `rotate_right` | `button` | Fan | Turn buttons |
| `brightness` | `select` | Fan | Display brightness |
| `anion` / `child_lock` / `buzzer` | `switch` | Purifier, fan | Option toggles |
| `light` | `light` | Purifier, fan | Indicator light toggle |
| `indoor_temp` / `outdoor_temp` | `sensor` | Air conditioner | Room temperature (when the climate entity has none) and outdoor chip |
| `power` | `sensor` | Air conditioner | Power draw chip |
| `compressor` | `sensor` | Air conditioner | Compressor frequency: the status light breathes while it runs |
| `filter_alert` | `binary_sensor` | Air conditioner | *Clean the filter* alert |

```yaml
entities:
  pm25: sensor.living_room_pm2_5
  filter: sensor.living_room_purifier_filter_life
```

## Screenshots

Every card comes alive while its device is on, and settles to a still card once it is off. All of this honours `prefers-reduced-motion`: animations stop for anyone who asks their system to reduce motion.

The air purifier draws air in: the side inlets pull it through, the base glows and a stream of clean air rises out of the top.

![air purifier animation](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier.gif)

A Dyson-style bladeless purifier has no blades to turn: clean air streams up through its hollow loop instead.

![Dyson bladeless purifier animation](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-dyson.gif)

The fan spins its blades, the head slowly oscillates from side to side, and gusts of air stream out in front of it.

![fan animation](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan.gif)

The air conditioner swings its louvres while the cooled air falls out of the vent.

![air conditioner animation](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon.gif)

Heating, the warm air shimmers as it rises out of the vent.

![air conditioner heating animation](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-heat.gif)

Drying, droplets fall from the vent instead.

![air conditioner drying animation](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-dry.gif)

The overview gathers every device: each tile's icon moves to match its appliance and its status ring breathes around it.

![overview animation](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview.gif)

| | Light | Dark |
|---|---|---|
| Overview, devices on | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-active.png) | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-active-dark.png) |
| Overview grouped by area, tiles labelled by kind | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-area.png) | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-area-dark.png) |
| Overview, a device unfolded | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-details.png) | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-details-dark.png) |
| Air purifier, filter to replace | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-alert.png) | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-alert-dark.png) |
| Air purifier, round and box | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-round.png) ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-box.png) | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-round-dark.png) ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-box-dark.png) |
| Air purifier, Dyson bladeless | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-dyson.png) | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-dyson-dark.png) |
| Fan | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-card.png) | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-card-dark.png) |
| Air conditioner, heating | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-heat.png) | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-heat-dark.png) |
| Air conditioner, portable and window split | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-portable.png) ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-window.png) | ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-portable-dark.png) ![](https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-window-dark.png) |

## Development

```bash
npm install
npm run build        # bundles src/*.js into dist/ha-climate-air-card.js and stamps the version of package.json
npm run check        # builds and checks the bundle (run in CI)
npm test             # unit tests, no browser
npm run screenshots  # renders every card (and a looping gif per animation: purifier/fan/aircon cool, heat and dry/overview, needs ffmpeg) with mock data into screenshots/
```

Each card has its own source in `src/`, next to `src/shared.js`; the build wraps each one in its own block and concatenates them into the single HACS file. `dist/` is not committed: `npm run build` creates it locally, CI builds it on every push, and the release workflow attaches the built file to the release, which is where HACS downloads it from.

### Releasing

1. Bump `version` in `package.json`
2. Add a `## <version>` section at the top of [CHANGELOG.md](CHANGELOG.md)
3. Push to `main`: the **Release** workflow builds the bundle, creates the tag and the GitHub release with the changelog section as notes, and attaches `ha-climate-air-card.js`

## Translations

The cards auto-detect the language from your Home Assistant settings. Currently supported:

| Language | Code |
|---|---|
| English | `en` |
| Français | `fr` |
| Deutsch | `de` |
| Español | `es` |

Contributions for additional languages are welcome!

## License

[MIT](LICENSE)
