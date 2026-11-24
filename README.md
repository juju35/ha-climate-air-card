# ha-climate-air-card

[![Marketplace](https://img.shields.io/badge/Marketplace-Custom-41BDF5.svg)](https://www.home-assistant.io/integrations/marketplace/)
[![HACS Validation](https://github.com/juju35/ha-climate-air-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/juju35/ha-climate-air-card/actions/workflows/hacs.yml)
[![Validate](https://github.com/juju35/ha-climate-air-card/actions/workflows/validate.yml/badge.svg)](https://github.com/juju35/ha-climate-air-card/actions/workflows/validate.yml)
[![Lint](https://github.com/juju35/ha-climate-air-card/actions/workflows/lint.yml/badge.svg)](https://github.com/juju35/ha-climate-air-card/actions/workflows/lint.yml)
[![Release](https://img.shields.io/github/v/release/juju35/ha-climate-air-card)](https://github.com/juju35/ha-climate-air-card/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/juju35/ha-climate-air-card/blob/main/LICENSE)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/julienstep9)

<p align="center"><img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/icon.svg" alt="Climate Air Cards" width="120"></p>

<p align="center">
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/xiaomi_home.png" alt="Xiaomi Home" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/xiaomi_miio.png" alt="Xiaomi Miio" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/homekit.png" alt="HomeKit" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/vocolinc.png" alt="VOCOlinc" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/rituals.png" alt="Rituals" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/matter.png" alt="Matter" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/midea_ac_lan.png" alt="Midea" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/dyson_local.png" alt="Dyson" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/daikin_onecta.png" alt="Daikin Onecta" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/melcloud.png" alt="MELCloud" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/vicare.png" alt="Viessmann ViCare" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/myuplink.png" alt="myUplink" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/cozytouch.png" alt="Atlantic Cozytouch" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/panasonic.png" alt="Panasonic Aquarea" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/hitachi_yutaki.png" alt="Hitachi Yutaki" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/esphome.png" alt="ESPHome (TOUG)" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/comfoconnect.png" alt="Zehnder ComfoConnect" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/duco.png" alt="Duco" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/renson.png" alt="Renson" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/vallox.png" alt="Vallox" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/prana.png" alt="Prana" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/flow_it.png" alt="Flow-it" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/bond.png" alt="Bond" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/baf.png" alt="Big Ass Fans" width="64">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/modern_forms.png" alt="Modern Forms" width="64">
</p>

Lovelace cards for Home Assistant's **heat pumps, air conditioners, air purifiers, humidifiers, dehumidifiers, essential oil diffusers, ventilation units and fans**: one card per kind of device, each with a mini card, and an overview of every device of the instance. Add a card, it finds the device and its sensors by itself. The illustrations come alive while a device runs. Thermostats and radiators have their own cards in [ha-heating-card](https://github.com/juju35/ha-heating-card) (see [Coming from 1.x](#coming-from-1x-thermostats)).

[![Open your Home Assistant instance and open a repository inside the Marketplace.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=juju35&repository=ha-climate-air-card&category=plugin)

| Card | Type | What it shows |
|---|---|---|
| [Overview](#overview) | `custom:climate-air-overview-card` | Every heat pump, air conditioner, air purifier, humidifier, diffuser, ventilation unit and fan at a glance: one tile per device, tap a tile to unfold its full card. |
| [Air purifier](#air-purifier) | `custom:climate-air-purifier-card` | Air quality, filter life, presets, speed and options of an air purifier. |
| [Air purifier mini](#mini-cards) | `custom:climate-air-purifier-mini-card` | The same purifier on two lines, with a zoom to the full card. |
| [Fan](#fan) | `custom:climate-air-fan-card` | Speed, oscillation, presets, angle, timer and options of a fan. |
| [Fan mini](#mini-cards) | `custom:climate-air-fan-mini-card` | The same fan on two lines, with a zoom to the full card. |
| [Air conditioner](#air-conditioner) | `custom:climate-air-aircon-card` | Mode, target temperature, fan and swing, measurements and options of an air conditioner. |
| [Air conditioner mini](#mini-cards) | `custom:climate-air-aircon-mini-card` | The same air conditioner on two lines, with a zoom to the full card. |
| [Heat pump](#heat-pump) | `custom:climate-air-heatpump-card` | Mode, target temperature, hot water tank, COP and measurements of an air-, ground- or water-source heat pump (controlled or metered), with an animated source illustration. |
| [Heat pump mini](#mini-cards) | `custom:climate-air-heatpump-mini-card` | The same heat pump on two lines, with a zoom to the full card. |
| [Humidifier](#humidifier) | `custom:climate-air-humidifier-card` | Humidity, target, modes and water tank of a humidifier, a dehumidifier or an essential oil diffuser, with a large animated illustration. |
| [Humidifier mini](#mini-cards) | `custom:climate-air-humidifier-mini-card` | The same device on two lines, with a zoom to the full card. |
| [Ventilation](#ventilation) | `custom:climate-air-ventilation-card` | The four air streams through the heat exchanger of a ventilation unit, the heat it recovers, its level, boost, bypass, filters and air quality. |
| [Ventilation mini](#mini-cards) | `custom:climate-air-ventilation-mini-card` | The same unit on two lines, with a zoom to the full card. |

| Overview | Air purifier | Fan | Air conditioner |
|---|---|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-all-dark.png"><img alt="Overview" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-all.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-card-dark.png"><img alt="Air purifier" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-card.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-card-dark.png"><img alt="Fan" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-card.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-card-dark.png"><img alt="Air conditioner" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-card.png" width="400"></picture> |

All the cards share the same look (an illustrated header on the device cards — see [Illustrated header](#illustrated-header) — a power button next to the state, mini cards with a detail button that size to their content in a Sections view), chips that open their entity's more-info on a click, a visual editor in the dashboard UI covering every option (the device cards' entity overrides in its folded **Advanced** section, as YAML), English, French, German, Spanish, Serbian (Cyrillic and Latin), Italian, Dutch, European Portuguese, Polish, Romanian, Danish, Swedish, Bulgarian, Russian, Ukrainian, Hungarian, Slovak, Czech, Slovenian, Latvian and Greek labels following the Home Assistant language, light and dark themes, and come in a single Marketplace install with no dependency.

On narrow cards (6 columns of a Sections view), the status pill moves under the subtitle, and keeps only its coloured dot when its label does not fit (the status stays in its tooltip); the title keeps its first characters, and the mini cards move their buttons under the device's info.

## Features

### Overview

`custom:climate-air-overview-card` — Every air conditioner, air purifier and fan at a glance.

- Automatic discovery: every `climate` entity that can cool, dry or only blow (a heat-only thermostat is left out: [ha-heating-card](https://github.com/juju35/ha-heating-card) shows those), and every `fan` entity, sorted into air purifiers (from their name, or a PM2.5, air quality or filter sensor on the device) and fans
- One compact tile per device with its illustration, animated while it runs like on the device cards (turning blades and rotor, air flowing out, swinging head or flap), coloured by its state: the mode colour of an air conditioner, the air quality of a purifier, blue for a fan
- The state on each tile: *Cool · 22 °C*, *PM2.5 6 · Good air*, *45 % · Natural wind*, or *Off* (with the room temperature for an air conditioner); a chip flags a filter to replace or to clean (a click on it opens that entity's more-info); an air conditioner with a low / high range shows it (*Heat/Cool · 20–24 °C*)
- Grouped by kind of device, by area, or not at all (`group_by`)
- **Tap** the icon of a tile to turn the device on or off; **tap** the tile to unfold its full card at the top of the overview, tap it again or anywhere else to fold it back
- Only the devices that are on or need attention show; the **detail** button (top right) shows every device, and back, as does a click anywhere else. `show_all: true` starts on every device instead, the button then keeping only the devices on or needing attention (`zoom: false`: every device, always, no button)
- **Illustrated header**, like the device cards: a 90 px banner with the round icon (its colour tells the status), the title, the status pill (the alerts by name, else how many devices are on) and a chip counting the devices on, and on the right a room with one device of each kind — the one running or needing attention first, up to three on the floor and a wall air conditioner above them — animated as on the device cards (cold air, dust drawn into a purifier, a fan's breeze, mist), standing on the floor strip. Heat pumps alone get the garden. Night picture with the dark theme, or forced with `illustration_theme`
- Calm tiles: a neutral background whatever the state, the coloured state line and a status dot in each tile's corner (red alert, amber warning, the device's colour while on, grey at rest)
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
- **Ceiling fan**: a fan named like one (*ceiling*, *plafond*, *Decken*, *techo*…) or from a ceiling fan maker (Bond, Big Ass Fans, Modern Forms, Hunter, Lucci Air, Minka, Casablanca, Fanimation, Westinghouse) hangs from the ceiling of the header's room, set with `illustration: ceiling` (`fan` forces the standing fan). Its four blades turn with the speed and the breeze falls into the room; reversed (winter), the blades turn the other way and the air rises. Its own light (a `light` of the same device) glows under it, with a **Light** toggle and a **Reverse** toggle when the fan supports the direction; the mini card gets a round light button, even with the fan off

| Ceiling fan | Ceiling fan mini |
|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-ceiling-card-dark.png"><img alt="Ceiling fan" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-ceiling-card.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-ceiling-mini-dark.png"><img alt="Ceiling fan mini" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-ceiling-mini.png" width="400"></picture> |

### Air conditioner

`custom:climate-air-aircon-card` — An air conditioner (`climate` entity) and the sensors of its device.

- The room temperature in large and the target next to it; modes as segmented buttons (only the selected one keeps its label when there are many); − / + buttons for the target, sent once the taps stop and kept on screen until the device reports it. In *Heat/Cool* or *Auto* with a low / high range (`target_temp_low` / `target_temp_high`), both ends show with their own − / + (*Heat to*, *Cool to*); the mini card shows the range and leaves its buttons to the full card
- A *Target humidity* slider when the entity supports it (`climate.set_humidity`, within `min_humidity` / `max_humidity`)
- Fan mode, swing mode, horizontal swing mode (when the entity supports it, `climate.set_swing_horizontal_mode`) and preset; the device's other switches (eco, display, self clean, sound…) as option toggles
- Animated illustration while it runs: the air flows out in the mode colour, with snowflakes when cooling, shimmer when heating and droplets when drying; the flap swings with the vertical swing and the airflow sways with the horizontal one; the status light breathes while the compressor runs. Four shapes: a wall split unit, a portable unit with its exhaust hose, a window split (indoor unit, outdoor unit hung outside the window, whose fan turns with the compressor) and a portasplit (Midea PortaSplit: an indoor console beside its outdoor condenser, joined by a looping hose), picked from the device model or set with `illustration`
- Outdoor temperature, humidity and power draw chips; a *Clean the filter* alert from the device's dust sensor

### Heat pump

`custom:climate-air-heatpump-card` — A heat pump: its `climate` entity, the `select` of its mode when it has none (Aldes T.One through the TOUG gateway), or — when it is measured but not controlled — a **power sensor** as `entity`, and the entities of its device.

- Found by itself: a `climate` entity whose device has a hot water tank (`water_heater`) or is named as a heat pump (Altherma, Aquarea, Ecodan, Yutaki, Alfea, Vitocal…), and a mode `select` with an *Off* option on a heat pump device without a climate entity (TOUG). It is not listed as an air conditioner, even when it can cool
- **Measured but not controlled**: when the heat pump has no `climate` entity and no mode `select` — only meters over Modbus (a ground- or water-source unit read through an electrical meter and a heat meter, whatever its controller) — point `entity` at its electrical **power sensor** (W or kW). The card is then **read-only** (no mode buttons, no setpoint, no power button) and counts the pump as running while the power is above `power_threshold` (default 100 W); that drives the illustration's animation
- **Monitoring roles** (set in `entities`, and found on the device when it has one): `heat_power` (heat output), `cop` (instantaneous COP — the headline figure — with `cop_today` and `scop` as chips), `flow_temp` / `return_temp` (water temperatures, with their ΔT), `flow_rate`, and `energy` / `heat_energy` (electrical and heat energy). When no `cop` sensor is given but `heat_power` and the electrical power are both present, the card computes the instantaneous COP itself (heat ÷ electrical), only while running
- **Source side**, set with `source` (the `outdoor_temp` chip stays in every source): `air` (an outdoor fan unit, the default), `ground` (a geothermal loop — a horizontal `collector` by default or a vertical `borehole` via `ground_type`) and `water` (an open loop — a single `well` by default, a two-well `doublet` or a submerged `lake` loop via `water_type`). Ground and water sources draw an indoor module in place of the outdoor unit, with the brine / water flowing in the buried loop or well while the pump runs
- The room temperature in large with the target, and the hot water tank with its target; modes as segmented buttons and − / + for the target. Driven by a select: its modes as buttons (*Off*, *Confort*, *Eco*, *Boost*, *Prog A*…, a dropdown beyond five) and the setpoint as − / + steppers from its thermostat `number` (a dropdown for a coarse one); the power button goes back to the last mode it ran in
- Multi-zone: a *Zones* section with a row per room — its current temperature and its setpoint as − / + steppers — when the device exposes a thermostat `number` and a temperature `sensor` per room (Aldes T.One: a motorised vent and an independent setpoint per room, 22 °C in one and 19 in another); the single setpoint gives way to the rooms. A room pairs its temperature sensor with its setpoint by room, even when the two entities do not share an object id (`number.t_one_thermostat_sejour` with `sensor.t_one_temperature_sejour`); the pairing is one-to-one, so a sensor never shows on two rooms and a probe with no setpoint of its own (a second vent on another room's thermostat) is never shown. `exclude` leaves an entity off the card — a room setpoint (a stray test `number`, or a second motorised vent driven by the same thermostat) or a device `switch` among the options (a test toggle). `zone_temps` maps a setpoint to its temperature sensor by hand when their names and ids give the pairing nothing to match on
- A *Hot water* section when the device has a `water_heater`: its target as − / + steppers and its operation modes. When the tank is reported as sensors instead (TOUG), its temperature, fill percentage and remaining volume sit under the temperatures, and the fill drives the illustration's level
- What it does in the status pill: *Heating*, *Cooling*, *Hot water* (the three-way valve sends the heat to the tank), *Idle*, *Defrosting*; a fault chip when the pump reports one, *Defrosting* and *Backup heater* chips, outdoor temperature and power draw chips
- Animated illustration: the outdoor unit's fan spins behind its grille while the compressor runs, the water flows in the pipes to the tank, warm air rises above the unit when heating and snowflakes when cooling, heat rises above the tank while it heats the hot water and frost covers the unit while it defrosts; the tank's level follows its temperature and its display shows it

| Heating | Hot water | Defrosting |
|---|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-card-dark.png"><img alt="Heat pump heating" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-card.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-dhw-dark.png"><img alt="Heat pump heating the hot water" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-dhw.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-defrost-dark.png"><img alt="Heat pump defrosting" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-defrost.png" width="400"></picture> |

The source side changes with `source` (and its `ground_type` / `water_type` variant), and a power sensor as `entity` gives a read-only metered card with its COP and readings:

| Ground source (horizontal collector) | Ground source (vertical borehole) | Water source (single well) |
|---|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-ground-dark.png"><img alt="Ground-source heat pump, horizontal collector" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-ground.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-ground-borehole-dark.png"><img alt="Ground-source heat pump, vertical borehole" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-ground-borehole.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-dark.png"><img alt="Water-source heat pump, single well" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water.png" width="400"></picture> |

| Water source (two-well doublet) | Water source (lake / pond loop) | Metered (power sensor, read-only) |
|---|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-doublet-dark.png"><img alt="Water-source heat pump, two-well doublet" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-doublet.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-lake-dark.png"><img alt="Water-source heat pump, lake loop" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-lake.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-metered-dark.png"><img alt="Metered heat pump with COP and monitoring readings" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-metered.png" width="400"></picture> |

### Humidifier

`custom:climate-air-humidifier-card` — A humidifier, a dehumidifier or an essential oil diffuser (a `humidifier` entity, or the `switch` of a Rituals Perfume Genie) and the sensors of its device.

- Found by itself: every `humidifier` entity; its `device_class` (`dehumidifier`) and its model or name pick the illustration
- The room humidity in large with the target next to it; modes as segmented buttons and a *Target humidity* slider (`humidifier.set_humidity`, within `min_humidity` / `max_humidity`). A diffuser has no target (HomeKit reports 100 %) but an *Intensity* slider (the VOCOlinc FlowerBud's *Spray quantity*, 1 to 5; the Rituals *Perfume amount*, 1 to 3)
- A Rituals Perfume Genie (its diffuser is a `switch`, with no `humidifier` entity): *Diffusing* status, a *Room size* segmented control (m²), the cartridge fill as a bar with a *Cartridge empty* alert when no cartridge is inserted, and the fragrance, battery and Wi-Fi as chips
- What it does in the status pill: *Humidifying*, *Drying*, *Diffusing*, *Idle*; *Water tank empty* (humidifier) or *Bucket full* (dehumidifier) as a red alert, on the card and the Overview tile
- A *Mood light* section when the device's light can change brightness or colour (the VOCOlinc mood light), usable while the device itself is off: on / off, *Brightness* slider and colour swatches (a warm white when it supports colour temperature); the illustration follows its colour and brightness
- The water left in the tank (or the bucket) as a bar, the filter of an evaporative humidifier, temperature chip; the device's light (the VOCOlinc ambient light), child lock, sound and other switches as option toggles
- Large animated illustration: mist rises while it humidifies, the water in the tank waves and turns red once nearly empty, dry air leaves a dehumidifier while drops fall into its bucket. Eight shapes, picked from the device or set with `illustration`: `column` (ultrasonic), `tank` (clear tank on its base, Xiaomi / Deerma style), `evaporative` (fan and wick), `vocolinc` (VOCOlinc MistFlow, its light ring lit in the colour of its light), `diffuser` (VOCOlinc FlowerBud essential oil diffuser, its frosted cone lit in the colour of its mood light), `rituals` and `rituals_black` (Rituals Perfume Genie, in brass or black) and `dehumidifier`

| Humidifier | VOCOlinc MistFlow | Essential oil diffuser | Dehumidifier |
|---|---|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-card-dark.png"><img alt="Humidifier" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-card.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-vocolinc-dark.png"><img alt="VOCOlinc MistFlow humidifier" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-vocolinc.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-diffuser-dark.png"><img alt="VOCOlinc essential oil diffuser" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-diffuser.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-dehumidifier-dark.png"><img alt="Dehumidifier" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-dehumidifier.png" width="400"></picture> |

| Rituals Perfume Genie (brass) | Rituals Perfume Genie (black) |
|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-rituals-dark.png"><img alt="Rituals Perfume Genie" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-rituals.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-rituals-black-dark.png"><img alt="Rituals Perfume Genie black" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-rituals-black.png" width="400"></picture> |

### Ventilation

`custom:climate-air-ventilation-card` — A ventilation unit (a `fan` entity): a heat recovery unit (MVHR, *VMC double flux*) or an extract unit (*VMC simple flux*), and the sensors of its device.

- Found by itself: a `fan` entity of a ventilation integration (Zehnder ComfoConnect, Duco, Renson, Vallox, Prana, Flow-it…) or named like one (*ventilation*, *VMC*, *MVHR*, *HRV*, *Lüftung*, *WTW*…); the Overview shows it among its own type
- The heat its exchanger recovers in large (its efficiency sensor, else worked out from the stream temperatures: (supply − outdoor) ÷ (extract − outdoor)), with the airflow; the airflow in large when the bypass is open (no heat recovered then) or no temperature is known
- **Air flows**: the four streams through the exchanger, each with its temperature — outdoor air in and supply air to the rooms, extract air from the rooms and exhaust air out — running while the unit runs; the exchanger fades and *Bypass open* shows under it when the air goes round it
- Its level as a button per level (a unit of 2 to 5 speeds, *Level 1 · 2 · 3*), else a speed slider; its presets as segmented buttons when it has several
- **Levels made of switches**: an extract fan whose speeds are relay channels (a 2- or 3-channel relay, no `fan` entity) takes them as `levels`, lowest first — a button per level, the level in large (*1 / 2*), power off turning every channel off
- **Boost** (a switch, or a button to press) as an option and on the mini card; CO₂, humidity, airflow and power chips; the filter's life as a bar, or its days left
- Animated illustration: the air runs in the four ducts and the fan turns, faster in boost. Two shapes, picked from the device or set with `illustration`: `mvhr` (heat recovery unit, four ducts) and `extract` (extract unit, two ducts)

| Heat recovery | Bypass open, boost | Mini |
|---|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/ventilation-card-dark.png"><img alt="Ventilation" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/ventilation-card.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/ventilation-boost-dark.png"><img alt="Ventilation, bypass open" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/ventilation-boost.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/ventilation-mini-dark.png"><img alt="Ventilation mini" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/ventilation-mini.png" width="400"></picture> |

### Illustrated header

- The device cards and their mini cards open on a 90 px banner: the round icon (its colour tells the status: the state's colour while running, grey when off or offline, amber for a warning, red for an alert), with the logo of the device's brand or integration on it (Xiaomi, Dyson, Daikin, Midea, VOCOlinc, Rituals…), the name and the status on the left, and on the right the device's own animated illustration in its room, standing on a floor strip that runs edge to edge
- The room follows the kind of device and comes alive while it runs: cold air falls from the wall unit with the sun at the window (air conditioner), dust is drawn into the purifier and clean air leaves it, a fan blows a breeze, mist rises above a humidifier; a heat pump's outdoor unit stands against the façade, on the lawn
- A night picture with Home Assistant's dark theme (a light theme keeps the day picture after sunset), or always day or night with `illustration_theme`; `illustration: false` brings back the classic header (icon, title, status pill and power button, the illustration next to the state). Animations stop with the system's *reduce motion* setting

### Mini cards

`custom:climate-air-purifier-mini-card`, `custom:climate-air-fan-mini-card`, `custom:climate-air-aircon-mini-card`, `custom:climate-air-heatpump-mini-card`, `custom:climate-air-humidifier-mini-card`, `custom:climate-air-ventilation-mini-card` — The device on two lines, for a compact dashboard.

- The illustrated header (animated too, the detail button at its top right), the key reading (PM2.5, speed, temperatures, the heat pump's tank and outdoor temperature, the humidifier's humidity and tank) and round buttons: power, plus the preset (purifier), the mode (humidifier), boost (ventilation), the oscillation and the light of a ceiling fan (fan) or − / + for the target (air conditioner, heat pump with a climate entity)
- The **detail** button (top right) unfolds the full card, and back, as does a click anywhere else (`zoom: false` removes it)

| Air purifier | Fan | Air conditioner | Heat pump |
|---|---|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-mini-dark.png"><img alt="Air purifier mini" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-mini.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-mini-dark.png"><img alt="Fan mini" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-mini.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-mini-dark.png"><img alt="Air conditioner mini" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-mini.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-mini-dark.png"><img alt="Heat pump mini" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-mini.png" width="400"></picture> |

| Humidifier | Essential oil diffuser | Rituals Perfume Genie |
|---|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-mini-dark.png"><img alt="Humidifier mini" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-mini.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-diffuser-mini-dark.png"><img alt="Diffuser mini" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-diffuser-mini.png" width="400"></picture> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-rituals-mini-dark.png"><img alt="Rituals Perfume Genie mini" src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-rituals-mini.png" width="400"></picture> |

## Supported integrations

The cards work with **any integration** that provides air purifiers and fans as `fan` entities air conditioners and heat pumps as `climate` entities, and humidifiers, dehumidifiers and diffusers as `humidifier` entities (Xiaomi Home, Xiaomi Miio, HomeKit Device, Matter, Midea, Dyson, Daikin Onecta, Panasonic Aquarea, MELCloud, Overkiz, ViCare, myUplink…), plus the Rituals Perfume Genie whose diffuser is a `switch`. Some get a specific treatment:

| Integration | What the cards add |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/xiaomi_home.png" alt="" width="16"> [Xiaomi Home](https://github.com/XiaoMi/ha_xiaomi_home) (Marketplace) | Purifiers, fans and humidifiers (Smartmi, Deerma…): the illustration from the model, the filter life, the water level and the child lock, indicator light and sound of the device |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/xiaomi_miio.png" alt="" width="16"> [Xiaomi Miio](https://www.home-assistant.io/integrations/xiaomi_miio/) (built in) | The same devices through the local protocol: presets, favorite level, filter life, water level and dry mode of the humidifiers |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/matter.png" alt="" width="16"> [Matter](https://www.home-assistant.io/integrations/matter/) (built in) | Purifiers, fans, air conditioners and heat pumps from their standard entities, with the filter condition when the device reports it |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/midea_ac_lan.png" alt="" width="16"> [Midea AC LAN](https://github.com/wuwentao/midea_ac_lan) (Marketplace) | Air conditioners and dehumidifiers: the dehumidifier illustration, the *Bucket full* alert and the bucket level |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/homekit.png" alt="" width="16"> [HomeKit Device](https://www.home-assistant.io/integrations/homekit_controller/) (built in) | The mode select as presets when the purifier has none; an air quality index on the HomeKit 1–5 scale |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/dyson_local.png" alt="" width="16"> [Dyson](https://github.com/libdyson-wg/ha-dyson) (Marketplace) | VOC and NO₂ chips, the HEPA filter life, and a bladeless loop illustration |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/daikin_onecta.png" alt="" width="16"> [Daikin Onecta](https://github.com/jwillemsen/daikin_onecta) (Marketplace) | Altherma heat pumps: the heat pump card, with the hot water tank (`water_heater`) of the same device |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/melcloud.png" alt="" width="16"> [MELCloud](https://www.home-assistant.io/integrations/melcloud/) (built in) | Ecodan air-to-water heat pumps (climate zones and hot water tank) on the heat pump card; the air conditioners stay on the air conditioner card |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/vicare.png" alt="" width="16"> [Viessmann ViCare](https://www.home-assistant.io/integrations/vicare/) (built in) | Vitocal heat pumps, including the ground-source Vitocal 2xx-G: heating circuits and hot water tank on the heat pump card |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/myuplink.png" alt="" width="16"> [myUplink](https://www.home-assistant.io/integrations/myuplink/) (built in) | NIBE heat pumps: always on the heat pump card |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/panasonic.png" alt="" width="16"> [Panasonic Aquarea Smart Cloud](https://github.com/cjaliaga/home-assistant-aquarea) (Marketplace) | Aquarea heat pumps: always on the heat pump card, with their zones and hot water tank |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/cozytouch.png" alt="" width="16"> [Atlantic Cozytouch](https://www.home-assistant.io/integrations/cozytouch/) (built in, Overkiz) and <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/cozytouch.png" alt="" width="16"> [Cozytouch](https://github.com/gduteil/cozytouch) (Marketplace) | Alfea and other Atlantic heat pumps: recognised by their hot water tank or their name |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/hitachi_yutaki.png" alt="" width="16"> [Hitachi Yutaki](https://github.com/alepee/hass-hitachi_yutaki) (Marketplace, Modbus) | Yutaki heat pumps: always on the heat pump card, with the hot water tank, defrost and compressor |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/modbus.png" alt="" width="16"> [Modbus](https://www.home-assistant.io/integrations/modbus/) (built in) and other meter integrations | Ground- and water-source heat pumps measured but not controlled (Stiebel Eltron WPF / WPC, NIBE F1x55, Vaillant flexoTHERM, or any unit read through an electrical meter and a heat meter): point `entity` at the power sensor, pick `source: ground` or `water`, and map the heat output, COP, flow / return and energy sensors in `entities` |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/vocolinc.png" alt="" width="16"> [HomeKit Device](https://www.home-assistant.io/integrations/homekit_controller/) (built in), VOCOlinc | The VOCOlinc MistFlow humidifier and FlowerBud essential oil diffuser (no dedicated integration: pair them with HomeKit Device) with their own illustrations, lit in the colour of their light; the FlowerBud's *Spray quantity* as a *Mist intensity* slider and its *Mood Light* as an option |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/rituals.png" alt="" width="16"> [Rituals Perfume Genie](https://www.home-assistant.io/integrations/rituals_perfume_genie/) (built in) | The diffuser (a `switch`, no `humidifier` entity) with its own brass / black illustration: the *Perfume amount* as an *Intensity* slider, the *Room size* (m²) as segments, the cartridge fill as a bar with a *Cartridge empty* alert, and the perfume, battery and Wi-Fi as chips |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/esphome.png" alt="" width="16"> [TOUG](https://github.com/djtef/toug) (ESPHome) | The Aldes T.One AquaAir heat pump without a climate entity: its *Mode air* select as mode buttons, the *Aiguillage vanne* valve (air or hot water), and — on a multi-zone install — a thermostat `number` and a temperature `sensor` per room as the *Zones*, the hot water tank from its temperature, fill percentage and remaining volume sensors, and the fault sensor as a chip; a single-thermostat install keeps its *Thermostat* number as the setpoint |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/comfoconnect.png" alt="" width="16"> [Zehnder ComfoAir Q](https://www.home-assistant.io/integrations/comfoconnect/) (built in) and <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/comfoconnect.png" alt="" width="16"> [its custom integration](https://github.com/michaelarnauts/home-assistant-comfoconnect) (Marketplace) | ComfoAir Q350 / Q450 / Q600 on the ventilation card: the four air stream temperatures, bypass, airflow, filter days left, boost |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/duco.png" alt="" width="16"> [Duco](https://www.home-assistant.io/integrations/duco/), <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/renson.png" alt="" width="16"> [Renson](https://www.home-assistant.io/integrations/renson/), <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/vallox.png" alt="" width="16"> [Vallox](https://www.home-assistant.io/integrations/vallox/), <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/prana.png" alt="" width="16"> [Prana](https://www.home-assistant.io/integrations/prana/), <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/flow_it.png" alt="" width="16"> [Flow-it](https://www.home-assistant.io/integrations/flow_it/) (built in); Brink, Dantherm, Maico, Helty, Komfovent (Marketplace, Modbus) | Their ventilation unit on the ventilation card, its level, presets, CO₂ and humidity |
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/bond.png" alt="" width="16"> [Bond](https://www.home-assistant.io/integrations/bond/), <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/baf.png" alt="" width="16"> [Big Ass Fans](https://www.home-assistant.io/integrations/baf/), <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/images/modern_forms.png" alt="" width="16"> [Modern Forms](https://www.home-assistant.io/integrations/modern_forms/) (built in) | Their ceiling fans with the ceiling fan illustration, the fan's light, and the forward / reverse direction |

The sensors of the device (PM2.5, temperature, humidity, filter, child lock…) are discovered from its registry, whatever the integration.

## Prerequisites

- Home Assistant 2024.8 or later
- Air purifiers and fans as `fan` entities, air conditioners as `climate` entities, from any integration (Xiaomi Home, Xiaomi Miio, HomeKit Device, Matter, Midea, Dyson…)

## Installation

### Via the Marketplace (recommended)

Click the button below to add the repository directly:

[![Add to the Marketplace](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=juju35&repository=ha-climate-air-card&category=plugin)

Or manually:

1. Open **Settings → Marketplace → Add from link** (top right; this needs a GitHub account connected)
2. Add `https://github.com/juju35/ha-climate-air-card` — Category: **Dashboard**
3. Open **Climate Air Cards** and click **Install**
4. Clear your browser cache and refresh

The Marketplace registers the dashboard resource for you; the single file provides every card.

### Manual

1. Download `ha-climate-air-card.js` and the `ha-climate-air-card.i18n.*.js` translation files from the [latest release](https://github.com/juju35/ha-climate-air-card/releases/latest)
2. Copy them all to `/config/www/` (without the translation files, the cards show in English)
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
| `show_title` | ❌ | `true` | Show the title in the header (e.g. `false` under a section heading of your own) |
| `show_subtitle` | ❌ | `true` | Show the subtitle under the title |
| `icon` | ❌ | Illustration | Replaces the illustration with an icon |
| `illustration` | ❌ | `auto` | Purifier: `tower`, `cylinder`, `box` or `dyson` (bladeless loop); fan: `fan` (standing fan) or `ceiling` (ceiling fan); air conditioner: `split`, `portable`, `window` or `portasplit`. `auto` picks one from the device model and name; `false` (*No illustration* in the visual editor) keeps the classic header (see [Illustrated header](#illustrated-header)) |
| `illustration_theme` | ❌ | `auto` | The header's picture by day or by night: `auto` (follows the Home Assistant theme: night with a dark theme, day with a light theme), `day` or `night`. Both the full and the mini card |
| `brand` | ❌ | Auto | YAML only: the logo on the header icon, guessed from the device's manufacturer, else its integration; a logo name (`xiaomi_home`, `xiaomi_miio`, `dyson_local`, `daikin_onecta`, `midea_ac_lan`, `homekit`, `vocolinc`, `rituals`, `matter`, `melcloud`, `vicare`, `myuplink`, `panasonic`, `cozytouch`, `hitachi_yutaki`, `esphome`, `bond`, `baf`, `modern_forms`) picks one, `none` removes it |
| `show_controls` | ❌ | `true` | Show the controls (presets, speed, modes, options) |
| `show_sensors` | ❌ | `true` | Show the measurement chips (temperature, humidity, PM10, outdoor temperature, power) |
| `show_alerts` | ❌ | `true` | Purifier and air conditioner cards only: show the filter alerts (the fan cards have none) |
| `show_filter` | ❌ | `true` | Purifier and air conditioner cards only: the filter line (its life as a bar, or *Filter OK* from a dirty-filter sensor); the alert still shows when `false` |
| `filter_warning` | ❌ | `20` | Purifier and air conditioner cards only: filter life (%) at or below which *Replace the filter soon* shows in orange; at 10 % or below, *Replace the filter* in red |
| `zoom` | ❌ | `true` | Mini cards only: detail button at the top right that unfolds the full card (a click elsewhere folds it back) |
| `language` | ❌ | Auto | Force language: `en`, `fr`, `de`, `es`, `sr`, `sr-Latn`, `it`, `nl`, `pt`, `pl`, `ro`, `da`, `sv`, `bg`, `ru`, `uk`, `hu`, `sk`, `cs`, `sl`, `lv` or `el` (auto-detects from HA settings; `pt-BR` gets European Portuguese); also on the Overview card |
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
illustration_theme: auto
group_by: type
columns: 2
zoom: true
show_all: false
exclude:
  - fan.garage_fan
include:
  - fan.attic_fan
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
| `show_title` | ❌ | `true` | Show the title in the header (e.g. `false` under a section heading of your own) |
| `icon` | ❌ | `mdi:air-filter` | Header icon |
| `illustration_theme` | ❌ | `auto` | The header's room by day or by night: `auto` (follows the Home Assistant theme: night with a dark theme, day with a light theme), `day` or `night` |
| `illustrations` | ❌ | Auto | Tile illustrations, by kind of device (`aircon`, `purifier`, `humidifier`) and by entity ID, the device's own winning: purifier `tower`, `cylinder`, `box` or `dyson`; air conditioner `split`, `portable`, `window` or `portasplit`; humidifier `column`, `tank`, `evaporative`, `vocolinc`, `diffuser` or `dehumidifier`. Unset or `auto`: guessed from the device model and name. The unfolded card uses the same one. In the visual editor's **Device types** and **Devices** sections |
| `icons` | ❌ | — | An icon instead of the illustration, by kind of device (`heatpump`, `aircon`, `purifier`, `humidifier`, `fan`) or by entity ID; it moves with the device state (turning fan, mode icon of an air conditioner). In the visual editor's **Device types** and **Devices** sections |
| `group_by` | ❌ | `type` | `type` (heat pumps, air conditioners, air purifiers, humidity, fans), `area` or `none`. With `area`, the heading shows the area's icon and name, and each tile is labelled by its kind of device (Air purifier, Air conditioner…) instead of repeating the room — a `name` set in `devices` still wins |
| `columns` | ❌ | `2` | Number of tile columns (1 on narrow cards unless set) |
| `zoom` | ❌ | `true` | Only the devices on or needing attention show, and a detail button shows them all; `false`: every device, always |
| `show_all` | ❌ | `false` | Every device shows at first, and the detail button keeps only the ones on or needing attention (a click elsewhere brings every device back). In the visual editor: **Show every device** |
| `show_alerts` | ❌ | `true` | Filter alerts on the purifier and air conditioner tiles (a device needing attention shows even when off, with `zoom`); `false`: none |
| `filter_warning` | ❌ | `20` | Filter life (%) at or below which a tile shows *Replace the filter soon* (orange); at 10 % or below, *Replace the filter* (red) |
| `exclude` | ❌ | — | Devices left out |
| `include` | ❌ | — | `climate` or `fan` entities the card would not pick on its own (a hidden entity); a heat-only thermostat stays out unless `devices` gives it a `type` |
| `devices` | ❌ | — | Per-device overrides: `{entity, name, icon, illustration, type}`, with `type` one of `heatpump`, `aircon`, `purifier`, `humidifier`, `fan` (they win over `icons` and `illustrations`) |

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

### Heat pump

```yaml
type: custom:climate-air-heatpump-card
entity: climate.heat_pump        # or, with TOUG: select.t_one_mode_air
exclude:                         # multi-zone: setpoints or switches to hide
  - number.t_one_compresseur_test
  - switch.t_one_ventilateur_ui_test
zone_temps:                      # multi-zone: map a setpoint to its sensor by hand (YAML only)
  number.t_one_thermostat_sejour: sensor.t_one_temperature_sejour
entities:                        # only for what discovery misses
  tank_temp: sensor.t_one_temperature_ballon
  setpoint: number.t_one_thermostat
```

Measured but not controlled (a ground- or water-source heat pump read through Modbus meters, e.g. a Stiebel Eltron WPF 16): point `entity` at the power sensor, pick the `source`, and set the monitoring roles in `entities`.

```yaml
type: custom:climate-air-heatpump-card
entity: sensor.heatpump_elec_power   # a power sensor (W or kW): read-only, running above power_threshold
source: water                        # air (default), ground or water
water_type: well                     # well (default), doublet or lake — for source: water
# ground_type: collector             # collector (default) or borehole — for source: ground
power_threshold: 100                 # W above which the pump counts as running (default 100)
compressor_threshold: 3000           # W above which the compressor runs; below it only the source pumps do (optional)
outdoor_temp: weather.home           # a sensor or a weather entity for the outdoor chip
entities:                            # monitoring roles (YAML only)
  heat_power: sensor.heatpump_heat_output
  cop: sensor.heat_pump_instantaneous_cop      # omit to compute heat ÷ electrical
  cop_today: sensor.heat_pump_cop_today
  scop: sensor.heat_pump_seasonal_cop_scop
  flow_temp: sensor.heatpump_flow_temperature
  return_temp: sensor.heatpump_return_temperature
  flow_rate: sensor.heatpump_flow_rate
  energy: sensor.heatpump_electrical_energy
  heat_energy: sensor.heatpump_heat_energy
```

`source`, `ground_type`, `water_type`, `power_threshold`, `compressor_threshold` and `outdoor_temp` are in the visual editor; the `entities` monitoring role map is **YAML only**.

| Option | Required | Default | Description |
|---|---|---|---|
| `source` | ❌ | From the name, else `air` | Source side of the illustration: `air`, `ground` or `water` (guessed from a ground- or water-source name or model) |
| `ground_type` | ❌ | `collector` | With `source: ground`: `collector` (horizontal loop) or `borehole` |
| `water_type` | ❌ | `well` | With `source: water`: `well`, `doublet` or `lake` |
| `power_threshold` | ❌ | `100` | Metered (read-only) pump: power in W above which it counts as running |
| `compressor_threshold` | ❌ | — | Metered ground- or water-source pump: power in W above which the compressor runs. Between `power_threshold` and this one only the source pumps run (*Source pumps*: the well / brine flows, no COP); without it, running means the compressor runs |
| `outdoor_temp` | ❌ | Discovered | A `sensor` or `weather` entity for the outdoor temperature chip |
| `exclude` | ❌ | — | Multi-zone: room setpoints or device switches left off the card |
| `zone_temps` | ❌ | — | YAML only: `{ setpoint number: temperature sensor }`, pairs a room's setpoint with its sensor by hand |

### Humidifier

```yaml
type: custom:climate-air-humidifier-card
entity: humidifier.bedroom_humidifier
illustration: vocolinc   # column, tank, evaporative, vocolinc, diffuser, dehumidifier or auto
```

### Ventilation

```yaml
type: custom:climate-air-ventilation-card
entity: fan.comfoairq
illustration: mvhr   # mvhr, extract or auto
entities:            # only to override a role found on the device
  air_outdoor_temp: sensor.comfoairq_outdoor_air_temperature
  air_supply_temp: sensor.comfoairq_supply_temperature
  air_extract_temp: sensor.comfoairq_extract_temperature
  air_exhaust_temp: sensor.comfoairq_exhaust_temperature
  bypass: sensor.comfoairq_bypass_state
  airflow: sensor.comfoairq_supply_airflow
  boost: button.comfoairq_boost_30_min
```

A fan with two or three speeds wired to the channels of a relay (no `fan` entity) takes its switches as `levels`, lowest first:

```yaml
type: custom:climate-air-ventilation-card
illustration: extract
levels:
  - switch.bathroom_fan_stage_1
  - switch.bathroom_fan_stage_2
levels_mode: cumulative   # cumulative (default) or exclusive
entities:
  humidity: sensor.bathroom_humidity
  power: sensor.bathroom_fan_power
```

Level *n* means the switches up to *n* on and the ones above off (`cumulative`: each stage runs on top of the one below), or only the *n*-th on (`exclusive`: one channel per speed). The card shows a button per level and the level in large (*1 / 2*) instead of a percentage; power off turns every switch off (the top one first), power on sets level 1. Switches go off before others come on, so two exclusive channels never run together. `entity` defaults to the first switch; `levels` and `levels_mode` are **YAML only**.

Roles found on the device: `air_outdoor_temp`, `air_supply_temp`, `air_extract_temp`, `air_exhaust_temp`, `bypass` (a binary sensor, switch, select, sensor or number: open when on, *open* or above 0), `efficiency`, `airflow` (in m³/h), `co2`, `humidity`, `power`, `filter` (%), `filter_days`, `boost` (a switch or a button); the `entities` map is **YAML only**.

### Coming from 1.x: thermostats

The thermostat card moved to [ha-heating-card](https://github.com/juju35/ha-heating-card), where it lives on; 2.0.0 removes it from this repository, and the Overview no longer shows thermostats. Install ha-heating-card, then replace the card types (every option keeps its name and meaning: `entity`, `name`, `icon`, `illustration`, `entities`, `show_title`, `show_subtitle`, `show_controls`, `show_sensors`, `show_alerts`, `zoom`, `language`):

| Before (1.x) | Now (ha-heating-card) |
|---|---|
| `custom:climate-air-thermostat-card` | `custom:heating-card` |
| `custom:climate-air-thermostat-mini-card` | `custom:heating-mini-card` |

```yaml
type: custom:heating-card
entity: climate.bedroom_radiator
illustration: valve
```

On the Overview, drop `thermostat` from `illustrations`, `icons` and `devices` (`type: thermostat`): it no longer means anything.

### Entity overrides

The cards find the other entities of the device by their registry translation key, their entity ID (English, French, German or Spanish) or their device class. Set one under `entities` when the card picks the wrong one or misses it:

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
| `indoor_temp` / `outdoor_temp` | `sensor` | Air conditioner, heat pump | Room temperature (when the climate entity has none) and outdoor chip |
| `power` | `sensor` | Air conditioner, heat pump | Power draw chip |
| `compressor` | `sensor` | Air conditioner, heat pump | Compressor frequency: the status light breathes while it runs |
| `filter_alert` | `binary_sensor` | Air conditioner | *Clean the filter* alert |
| `dhw` | `water_heater` | Heat pump | Hot water tank: its temperature, target and operation modes |
| `tank_temp` | `sensor` | Heat pump | Tank temperature, without a `water_heater` |
| `valve` | `sensor` / `select` | Heat pump | Three-way valve: *Hot water* while it sends the heat to the tank |
| `setpoint` | `number` | Heat pump | Target temperature of a heat pump driven by a select (TOUG) |
| `water_level` | `sensor` | Humidifier | Water left in the tank (or the bucket of a dehumidifier), in % |
| `tank_empty` / `bucket_full` | `binary_sensor` | Humidifier | *Water tank empty* / *Bucket full* alert |
| `lamp` | `light` | Humidifier | The device's light (VOCOlinc mood light) as an option toggle; its colour lights the VOCOlinc illustrations |
| `spray` | `number` | Humidifier | Mist intensity of a diffuser (VOCOlinc *Spray quantity*) |
| `backup` / `defrost` | `binary_sensor` | Heat pump | *Backup heater* and *Defrosting* chips; frost on the illustration |
| `heat_power` | `sensor` | Heat pump | Heat output; with the electrical power, the auto-computed COP (YAML only) |
| `cop` / `cop_today` / `scop` | `sensor` | Heat pump | Instantaneous COP (the headline figure), today's and the seasonal figures (YAML only) |
| `flow_temp` / `return_temp` | `sensor` | Heat pump | Flow and return water temperatures, with their ΔT (YAML only) |
| `flow_rate` | `sensor` | Heat pump | Water flow rate (YAML only) |
| `energy` / `heat_energy` | `sensor` | Heat pump | Electrical and heat energy (YAML only) |

```yaml
entities:
  pm25: sensor.living_room_pm2_5
  filter: sensor.living_room_purifier_filter_life
```

## Screenshots

Every card comes alive while its device is on, and settles to a still card once it is off. All of this honours `prefers-reduced-motion`: animations stop for anyone who asks their system to reduce motion.

The air purifier draws air in: the side inlets pull it through, the base glows and a stream of clean air rises out of the top.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier.gif" alt="air purifier animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-dark.gif" alt="air purifier animation, dark theme" width="400"> |

A Dyson-style bladeless purifier has no blades to turn: clean air streams up through its hollow loop instead.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-dyson.gif" alt="Dyson bladeless purifier animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-dyson-dark.gif" alt="Dyson bladeless purifier animation, dark theme" width="400"> |

The fan spins its blades, the head slowly oscillates from side to side, and gusts of air stream out in front of it.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan.gif" alt="fan animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-dark.gif" alt="fan animation, dark theme" width="400"> |

The ceiling fan turns its blades with the speed, its light glowing under it, and the breeze falls into the room.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-ceiling.gif" alt="ceiling fan animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-ceiling-dark.gif" alt="ceiling fan animation, dark theme" width="400"> |

Reversed for winter, its light off: the blades turn the other way and the warm air rises back to the ceiling.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-ceiling-reverse.gif" alt="reversed ceiling fan animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-ceiling-reverse-dark.gif" alt="reversed ceiling fan animation, dark theme" width="400"> |

The air conditioner swings its louvres while the cooled air falls out of the vent.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon.gif" alt="air conditioner animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-dark.gif" alt="air conditioner animation, dark theme" width="400"> |

Heating, the warm air shimmers as it rises out of the vent.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-heat.gif" alt="air conditioner heating animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-heat-dark.gif" alt="air conditioner heating animation, dark theme" width="400"> |

Drying, droplets fall from the vent instead.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-dry.gif" alt="air conditioner drying animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-dry-dark.gif" alt="air conditioner drying animation, dark theme" width="400"> |

With the `portasplit` illustration, the outdoor condenser's fan spins while the chilled air falls from the console.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-portasplit.gif" alt="portasplit air conditioner animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-portasplit-dark.gif" alt="portasplit air conditioner animation, dark theme" width="400"> |

The heat pump spins its outdoor fan while the water flows in the pipes and warm air rises above the unit.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump.gif" alt="heat pump animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-dark.gif" alt="heat pump animation, dark theme" width="400"> |

Heating the hot water, the valve sends the flow to the tank and heat rises above it.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-dhw.gif" alt="heat pump hot water animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-dhw-dark.gif" alt="heat pump hot water animation, dark theme" width="400"> |

Cooling, snowflakes fall above the unit.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-cool.gif" alt="heat pump cooling animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-cool-dark.gif" alt="heat pump cooling animation, dark theme" width="400"> |

With `source: ground`, the outdoor unit gives way to an indoor module and the brine flows in the buried horizontal collector.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-ground.gif" alt="ground-source heat pump collector animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-ground-dark.gif" alt="ground-source heat pump collector animation, dark theme" width="400"> |

With `ground_type: borehole`, the brine flows down one leg of the vertical U-probe and up the other.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-ground-borehole.gif" alt="ground-source heat pump borehole animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-ground-borehole-dark.gif" alt="ground-source heat pump borehole animation, dark theme" width="400"> |

With `source: water`, the water is drawn from the water table through the well while it runs.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water.gif" alt="water-source heat pump well animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-dark.gif" alt="water-source heat pump well animation, dark theme" width="400"> |

With `water_type: doublet`, the water flows up the extraction well and down the reinjection well.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-doublet.gif" alt="water-source heat pump doublet animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-doublet-dark.gif" alt="water-source heat pump doublet animation, dark theme" width="400"> |

With `water_type: lake`, the water flows in the loop sunk in the lake or pond.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-lake.gif" alt="water-source heat pump lake loop animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-water-lake-dark.gif" alt="water-source heat pump lake loop animation, dark theme" width="400"> |

The humidifier humidifies: mist rises from its top and the water waves in its tank.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier.gif" alt="humidifier animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-dark.gif" alt="humidifier animation, dark theme" width="400"> |

The VOCOlinc MistFlow sends mist out of its top, its light ring in the colour of its light.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-vocolinc.gif" alt="VOCOlinc MistFlow animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-vocolinc-dark.gif" alt="VOCOlinc MistFlow animation, dark theme" width="400"> |

The VOCOlinc FlowerBud sends scented mist from its tip, its frosted cone lit in the colour of its mood light (white while the light is off).

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/diffuser.gif" alt="essential oil diffuser animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/diffuser-dark.gif" alt="essential oil diffuser animation, dark theme" width="400"> |

The dehumidifier blows dry air out of its top while drops fall into its bucket.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/dehumidifier.gif" alt="dehumidifier animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/dehumidifier-dark.gif" alt="dehumidifier animation, dark theme" width="400"> |

The ventilation unit runs: the air runs through its four ducts, its fan turns.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/ventilation.gif" alt="ventilation animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/ventilation-dark.gif" alt="ventilation animation, dark theme" width="400"> |

The overview gathers every device: its header's room comes alive with the devices running, and each tile's illustration moves with its device.

| Light | Dark |
|---|---|
| <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview.gif" alt="overview animation" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-dark.gif" alt="overview animation, dark theme" width="400"> |

| | Light | Dark |
|---|---|---|
| Overview, devices on | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-active.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-active-dark.png" alt="" width="400"> |
| Overview grouped by area, tiles labelled by kind | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-area.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-area-dark.png" alt="" width="400"> |
| Overview, a device unfolded | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-details.png" alt="" width="357"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/overview-details-dark.png" alt="" width="357"> |
| Air purifier, filter to replace | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-alert.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-alert-dark.png" alt="" width="400"> |
| Air purifier, round and box | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-round.png" alt="" width="400"> <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-box.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-round-dark.png" alt="" width="400"> <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-box-dark.png" alt="" width="400"> |
| Air purifier, Dyson bladeless | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-dyson.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/purifier-dyson-dark.png" alt="" width="400"> |
| Fan | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-card.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/fan-card-dark.png" alt="" width="400"> |
| Air conditioner, heating | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-heat.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-heat-dark.png" alt="" width="400"> |
| Air conditioner, heat / cool range | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-range.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-range-dark.png" alt="" width="400"> |
| Air conditioner, drying to a target humidity | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-dry.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-dry-dark.png" alt="" width="400"> |
| Heat pump, cooling | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-cool.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/heatpump-cool-dark.png" alt="" width="400"> |
| Humidifier, clear tank and evaporative | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-tank.png" alt="" width="400"> <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-evaporative.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-tank-dark.png" alt="" width="400"> <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-evaporative-dark.png" alt="" width="400"> |
| Diffuser off, its mood light on in blue | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-diffuser-light.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-diffuser-light-dark.png" alt="" width="400"> |
| Humidifier, water tank empty | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-empty.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/humidifier-empty-dark.png" alt="" width="400"> |
| Air conditioner, portable, window split and portasplit | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-portable.png" alt="" width="400"> <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-window.png" alt="" width="400"> <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-portasplit.png" alt="" width="400"> | <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-portable-dark.png" alt="" width="400"> <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-window-dark.png" alt="" width="400"> <img src="https://raw.githubusercontent.com/juju35/ha-climate-air-card/main/screenshots/aircon-portasplit-dark.png" alt="" width="400"> |

## Development

```bash
npm install
npm run build        # bundles src/*.js into dist/ha-climate-air-card.js and stamps the version of package.json
npm run check        # builds and checks the bundle (run in CI)
npm test             # unit tests, no browser
npm run screenshots  # renders every card (and a looping gif per animation: purifier/fan/aircon cool, heat and dry/heat pump heat, hot water and cool/humidifier, MistFlow, diffuser and dehumidifier/overview, needs ffmpeg) with mock data into screenshots/
```

Each card has its own source in `src/`, next to `src/shared.js`; the build wraps each one in its own block and concatenates them into the single file the Marketplace installs. `dist/` is not committed: `npm run build` creates it locally, CI builds it on every push, and the release workflow attaches the built file to the release, which is where the Marketplace installs it from.

### Releasing

1. Bump `version` in `package.json`
2. Add a `## <version>` section at the top of [CHANGELOG.md](https://github.com/juju35/ha-climate-air-card/blob/main/CHANGELOG.md)
3. Push to `main`: the **Release** workflow builds the bundle, creates the tag and the GitHub release with the changelog section as notes, and attaches `ha-climate-air-card.js`

## Translations

The cards auto-detect the language from your Home Assistant settings. Currently supported:

| Language | Code |
|---|---|
| English | `en` |
| Français | `fr` |
| Deutsch | `de` |
| Español | `es` |
| Српски | `sr` |
| Srpski (latinica) | `sr-Latn` |
| Italiano | `it` |
| Nederlands | `nl` |
| Português (Portugal) | `pt` |
| Polski | `pl` |
| Română | `ro` |
| Dansk | `da` |
| Svenska | `sv` |
| Български | `bg` |
| Русский | `ru` |
| Українська | `uk` |
| Magyar | `hu` |
| Slovenčina | `sk` |
| Čeština | `cs` |
| Slovenščina | `sl` |
| Latviešu | `lv` |
| Ελληνικά | `el` |

Contributions for additional languages are welcome!

## License

[MIT](https://github.com/juju35/ha-climate-air-card/blob/main/LICENSE)

## Support

If you find this project useful, you can support its development:

<a href="https://buymeacoffee.com/julienstep9"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" height="50"></a>
