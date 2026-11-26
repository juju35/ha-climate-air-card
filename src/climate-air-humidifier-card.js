/*
 * climate-air-humidifier-card and its mini card: a humidifier, a dehumidifier or an essential oil diffuser (a
 * humidifier entity) with its humidity, target, modes, water tank and options. Its device_class (dehumidifier) and its
 * model pick the illustration; the water level, the empty tank and the full bucket are roles of its device (shared.js).
 */

// Illustrations, large: mist rises out of a humidifier while it humidifies, drops fall into the bucket of a
// dehumidifier while dry air leaves its top, and the water level follows the tank sensor (red once nearly empty).
// Six shapes: an ultrasonic column, a clear tank on its base (Xiaomi / Deerma style), an evaporative tower with its
// fan, the VOCOlinc MistFlow (tapered column, clear tank band, light ring), the VOCOlinc FlowerBud essential oil diffuser
// (a white drop whose frosted cone glows in the colour of its mood light) and a dehumidifier with its bucket.
const caHumMist = (xs, y) => `<g class="mist">${xs.map((x) => `<path d="M${x} ${y}q-3-4 0-8t0-8"/>`).join("")}</g>`;

// The water in a tank: a clipped rectangle whose top waves, its height following `pct` (half full when unknown).
const caHumWater = (id, x, y, w, h, rx, pct) => {
  const p = pct == null ? 50 : Math.max(0, Math.min(100, pct));
  const top = +(y + h * (1 - p / 100)).toFixed(1);
  const step = w / 4;
  const wave = Array.from({ length: 6 }, () => `q${(step / 2).toFixed(1)}-2.2 ${step.toFixed(1)} 0`).join("");
  return (
    `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/></clipPath>` +
    `<g clip-path="url(#${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e8f1fa"/>` +
    `<g class="wave"><path class="water" d="M${x - step} ${top}${wave}V${y + h + 2}H${x - step}Z"/></g></g>`
  );
};

const caHumDisplay = (x, y, w, text) =>
  text ? `<rect x="${x}" y="${y}" width="${w}" height="9" rx="2.5" fill="#1d2632"/><text class="disp" x="${x + w / 2}" y="${y + 6.8}" text-anchor="middle">${caEsc(text)}</text>` : "";

const CA_HUM_DEFS =
  '<linearGradient id="ca-ug" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9bfc6"/><stop offset=".45" stop-color="#e2e5e9"/><stop offset="1" stop-color="#aeb5bd"/></linearGradient>' +
  '<linearGradient id="ca-ub" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e6eaef"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#d3d9e0"/></linearGradient>' +
  '<radialGradient id="ca-uf" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".45"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient>';

// The Rituals Perfume Genie: a bulb with a long tapered neck, traced from the device. Scent rises from the tip, the
// control slot sits at the foot; the metal is lit as a soft satin (a dome highlight, a foot shadow), brass or black.
// The body is opaque, so the cartridge level shows as a bar, not inside the illustration.
const CA_RITUALS_PATH =
  "M41.89 18 C41.9 18.04 41.91 18.08 41.96 18.22 C42.01 18.36 42.12 18.62 42.18 18.87 C42.24 19.12 42.32 19.41 42.35 19.74 C42.38 20.07 42.34 20.47 42.35 20.83 C42.36 21.19 42.39 21.52 42.4 21.92 C42.41 22.32 42.38 22.79 42.4 23.23 C42.42 23.67 42.51 24.07 42.52 24.54 C42.53 25.01 42.46 25.56 42.47 26.07 C42.48 26.58 42.56 27.08 42.59 27.59 C42.62 28.1 42.6 28.58 42.64 29.12 C42.68 29.66 42.76 30.24 42.81 30.86 C42.86 31.48 42.87 32.21 42.91 32.83 C42.95 33.45 43.03 33.95 43.05 34.57 C43.07 35.19 43.02 35.84 43.05 36.53 C43.08 37.22 43.16 38.02 43.2 38.71 C43.24 39.4 43.19 39.99 43.29 40.68 C43.39 41.37 43.62 42.1 43.8 42.86 C43.97 43.62 44.11 44.5 44.34 45.26 C44.57 46.02 44.81 46.68 45.18 47.44 C45.55 48.2 45.93 49.03 46.57 49.83 C47.21 50.63 47.98 51.39 49.01 52.23 C50.04 53.07 51.38 54.01 52.72 54.85 C54.06 55.69 55.61 56.42 57.06 57.25 C58.51 58.08 60.12 58.95 61.42 59.86 C62.72 60.77 63.88 61.79 64.83 62.7 C65.78 63.61 66.48 64.41 67.09 65.32 C67.7 66.23 68.2 67.21 68.52 68.15 C68.84 69.09 68.93 70.04 69 70.98 C69.07 71.92 69.14 72.88 68.93 73.82 C68.72 74.76 68.37 75.67 67.76 76.65 C67.15 77.63 66.4 78.73 65.27 79.71 C64.14 80.69 63.66 81.52 60.98 82.54 C58.29 83.56 54.19 85.26 49.16 85.81 C44.12 86.36 35.83 86.36 30.77 85.81 C25.72 85.26 21.58 83.56 18.83 82.54 C16.08 81.52 15.36 80.69 14.27 79.71 C13.18 78.73 12.78 77.63 12.28 76.65 C11.77 75.67 11.45 74.76 11.24 73.82 C11.03 72.88 10.94 71.92 11 70.98 C11.06 70.04 11.26 69.09 11.58 68.15 C11.9 67.21 12.29 66.23 12.89 65.32 C13.49 64.41 14.21 63.61 15.19 62.7 C16.17 61.79 17.49 60.77 18.75 59.86 C20.01 58.95 21.35 58.08 22.75 57.25 C24.15 56.42 25.74 55.69 27.14 54.85 C28.54 54.01 30.12 53.07 31.18 52.23 C32.24 51.39 32.88 50.63 33.51 49.83 C34.14 49.03 34.58 48.2 34.94 47.44 C35.3 46.68 35.48 46.02 35.69 45.26 C35.9 44.5 36.06 43.62 36.22 42.86 C36.38 42.1 36.53 41.37 36.63 40.68 C36.73 39.99 36.75 39.4 36.8 38.71 C36.85 38.02 36.9 37.22 36.95 36.53 C37 35.84 37.05 35.19 37.09 34.57 C37.13 33.95 37.15 33.45 37.17 32.83 C37.19 32.21 37.15 31.48 37.19 30.86 C37.23 30.24 37.35 29.66 37.43 29.12 C37.51 28.58 37.61 28.1 37.67 27.59 C37.74 27.08 37.8 26.58 37.82 26.07 C37.84 25.56 37.82 25.01 37.82 24.54 C37.82 24.07 37.82 23.67 37.82 23.23 C37.82 22.79 37.82 22.32 37.82 21.92 C37.82 21.52 37.82 21.19 37.82 20.83 C37.82 20.47 37.8 20.07 37.82 19.74 C37.84 19.41 37.86 19.12 37.92 18.87 C37.98 18.62 38.15 18.36 38.21 18.22 C38.27 18.08 38.28 18.04 38.3 18 Z";

// The two finishes of the Rituals diffuser: the metal gradient, the soft dome highlight, the foot shadow, the control
// slot, the status dot and the outline.
const CA_RITUALS_FINISH = {
  brass: {
    metal: ["#9b8452", "#bba86f", "#c6b27b", "#b29a61", "#937b48"],
    dome: ["#eee2c4", ".3"],
    foot: ["#5a4318", ".2"],
    vent: "#2a2113",
    led: "#e7dcc0",
    edge: "#6b4e18",
  },
  black: {
    metal: ["#2f2b2d", "#403c3c", "#474342", "#363233", "#2a2729"],
    dome: ["#827e7f", ".28"],
    foot: ["#000000", ".28"],
    vent: "#000000",
    led: "#827e7f",
    edge: "#000000",
  },
};

const caRitualsArt = (finish) => {
  const f = CA_RITUALS_FINISH[finish] || CA_RITUALS_FINISH.brass;
  const stops = ["0", ".32", ".5", ".7", "1"].map((o, i) => `<stop offset="${o}" stop-color="${f.metal[i]}"/>`).join("");
  return (
    "<defs>" +
    `<linearGradient id="ca-rmetal" x1="0" y1="0" x2="1" y2="0">${stops}</linearGradient>` +
    `<radialGradient id="ca-rdome" cx=".4" cy=".32" r=".52"><stop offset="0" stop-color="${f.dome[0]}" stop-opacity="${f.dome[1]}"/><stop offset="1" stop-color="${f.dome[0]}" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="ca-rfoot" cx=".5" cy=".96" r=".55"><stop offset="0" stop-color="${f.foot[0]}" stop-opacity="${f.foot[1]}"/><stop offset="1" stop-color="${f.foot[0]}" stop-opacity="0"/></radialGradient>` +
    `<clipPath id="ca-rit"><path d="${CA_RITUALS_PATH}"/></clipPath>` +
    "</defs>" +
    '<ellipse class="floor" cx="40" cy="90" rx="25" ry="3.6" fill="url(#ca-uf)"/>' +
    // The scent rises from the tip of the neck; it starts low enough that its lit phase stays inside the
    // illustration (the svg overflows visibly for the floor shadow, so a higher start grazed the header). #78
    caHumMist([38.5, 40, 41.5], 22) +
    '<g clip-path="url(#ca-rit)">' +
    '<rect x="11" y="16" width="58" height="72" fill="url(#ca-rmetal)"/>' +
    '<rect x="11" y="16" width="58" height="72" fill="url(#ca-rdome)"/>' +
    '<rect x="11" y="16" width="58" height="72" fill="url(#ca-rfoot)"/>' +
    `<rect x="30" y="80.2" width="20" height="2.6" rx="1.3" fill="${f.vent}" opacity=".5"/>` +
    `<circle cx="40" cy="78.8" r=".7" fill="${f.led}"/>` +
    "</g>" +
    `<path d="${CA_RITUALS_PATH}" fill="none" stroke="${f.edge}" stroke-width=".4" opacity=".3"/>`
  );
};

const CA_HUM_ARTS = {
  column: (s) =>
    '<ellipse class="floor" cx="40" cy="90" rx="22" ry="3.5" fill="url(#ca-uf)"/>' +
    caHumMist([34, 40, 46], 20) +
    '<rect x="24" y="22" width="32" height="66" rx="15" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<ellipse cx="40" cy="24.5" rx="9" ry="3" fill="#3a434e"/>' +
    caHumDisplay(31, 34, 18, s.display) +
    '<circle class="led" cx="40" cy="47" r="1.4"/>' +
    caHumWater("ca-uw", 28, 52, 24, 32, 10, s.level) +
    '<rect x="28" y="52" width="24" height="32" rx="10" fill="none" stroke="#c3cad2" stroke-width=".8"/>',
  tank: (s) =>
    '<ellipse class="floor" cx="40" cy="90" rx="32" ry="3.5" fill="url(#ca-uf)"/>' +
    caHumMist([36, 40, 44], 13) +
    '<rect x="34" y="12" width="12" height="9" rx="3" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1"/>' +
    caHumWater("ca-uw", 10, 20, 60, 40, 9, s.level) +
    '<rect x="10" y="20" width="60" height="40" rx="9" fill="#ffffff" fill-opacity=".18" stroke="#b6bfc9" stroke-width="1.1"/>' +
    '<path d="M16 26v28" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".7"/>' +
    '<rect x="8" y="58" width="64" height="28" rx="7" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<circle class="knob" cx="40" cy="72" r="6"/>' +
    '<circle class="led" cx="20" cy="72" r="1.6"/>' +
    caHumDisplay(50, 67.5, 16, s.display),
  evaporative: (s) =>
    '<ellipse class="floor" cx="40" cy="90" rx="30" ry="3.5" fill="url(#ca-uf)"/>' +
    caHumMist([30, 40, 50], 12) +
    '<rect x="12" y="14" width="56" height="74" rx="9" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M20 20H60M20 24H60M20 28H60" stroke="#b6bfc9" stroke-width="1.4" stroke-linecap="round"/>' +
    '<circle cx="40" cy="48" r="15" fill="#3a434e"/>' +
    `<g class="rotor">${[0, 120, 240]
      .map((a) => `<path transform="rotate(${a} 40 48)" d="M40 48C38.5 42 40 36 45.5 35C47 40.5 44.5 45.5 40 48Z"/>`)
      .join("")}</g>` +
    '<circle cx="40" cy="48" r="2.6" fill="#d5dbe2"/>' +
    caHumDisplay(31, 65.5, 18, s.display) +
    caHumWater("ca-uw", 17, 77, 46, 8, 3, s.level) +
    '<rect x="17" y="77" width="46" height="8" rx="3" fill="none" stroke="#c3cad2" stroke-width=".8"/>',
  vocolinc: (s) =>
    '<ellipse class="floor glow" cx="40" cy="90" rx="22" ry="3.8" fill="url(#ca-uf)"/>' +
    caHumMist([36, 40, 44], 16) +
    '<path d="M28.5 86 L29.5 32 Q29.5 17.5 40 17.5 Q50.5 17.5 50.5 32 L51.5 86 Q51.5 88 49.5 88 H30.5 Q28.5 88 28.5 86 Z" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<ellipse cx="40" cy="19.5" rx="4.6" ry="1.7" fill="#3a434e"/>' +
    '<path d="M31 27H49" stroke="#dfe4ea" stroke-width="1"/>' +
    caHumWater("ca-uw", 30, 42, 20, 30, 3, s.level) +
    '<rect x="30" y="42" width="20" height="30" rx="3" fill="#ffffff" fill-opacity=".15" stroke="#b6bfc9" stroke-width=".8"/>' +
    caHumDisplay(32, 31, 16, s.display) +
    '<rect class="ring" x="29.5" y="78" width="21" height="4.5" rx="2.2"/>',
  // The VOCOlinc diffuser: a white drop, its frosted cone held between two raised lips and lit from inside, the seam of
  // its base (where the light line runs), two touch keys and two feet.
  diffuser: () =>
    '<ellipse class="floor glow" cx="40" cy="91" rx="26" ry="3.6" fill="url(#ca-uf)"/>' +
    // The scent rises from the top of the drop; it starts low enough that its lit phase stays inside the
    // illustration (the svg overflows visibly for the drop shadow, so a high start drew over the header). #78
    caHumMist([39, 40.5, 42], 22) +
    '<rect x="22" y="85" width="5" height="3.6" rx="1.2" fill="#b6bfc9"/><rect x="53" y="85" width="5" height="3.6" rx="1.2" fill="#b6bfc9"/>' +
    '<path d="M36.6 4.6 Q40 3.6 43.4 4.6 C46 22 56 38 63 50 C67.5 58 68.2 66 67.2 72 C66.2 80 62 86 54 86.6 H26 C18 86 13.8 80 12.8 72 C11.8 66 12.5 58 17 50 C24 38 34 22 36.6 4.6 Z" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.1"/>' +
    '<path class="bud" d="M36.6 4.6 Q40 3.6 43.4 4.6 C45 18 50 30 55 38 C57.4 42 56.4 46.2 52.4 48.4 C47 51.2 33 51.2 27.6 48.4 C23.6 46.2 22.6 42 25 38 C30 30 35 18 36.6 4.6 Z"/>' +
    '<path d="M42.6 8 C44.2 17 47 26 50.5 33" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>' +
    '<path class="line" d="M13.2 68.6 Q40 70.4 66.8 68.6" fill="none" stroke-width="1.4" stroke-linecap="round"/>' +
    '<rect class="keys" x="31.8" y="72" width="7.8" height="3" rx="1.5" fill="none" stroke-width=".9"/>' +
    '<rect class="keys" x="40.4" y="72" width="7.8" height="3" rx="1.5" fill="none" stroke-width=".9"/>',
  dehumidifier: (s) =>
    '<ellipse class="floor" cx="40" cy="90" rx="28" ry="3.5" fill="url(#ca-uf)"/>' +
    `<g class="dry">${[32, 40, 48].map((x) => `<path d="M${x} 8q-2.5-3 0-6t0-6"/>`).join("")}</g>` +
    '<rect x="16" y="10" width="48" height="78" rx="8" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="22" y="14" width="36" height="8" rx="3" fill="#3a434e"/>' +
    '<path d="M25 16.5H55M25 19.5H55" stroke="#6b7682" stroke-width=".9"/>' +
    caHumDisplay(30, 26, 20, s.display) +
    '<circle class="led" cx="25" cy="30.5" r="1.4"/>' +
    '<path d="M23 39H57M23 43H57M23 47H57M23 51H57" stroke="#d5dbe2" stroke-width="1.4" stroke-linecap="round"/>' +
    caHumWater("ca-uw", 20, 58, 40, 26, 4, s.level) +
    '<rect x="20" y="58" width="40" height="26" rx="4" fill="#ffffff" fill-opacity=".15" stroke="#b6bfc9" stroke-width="1"/>' +
    '<g class="drip"><path d="M40 60q-1.6 2.6 0 4t0-4Z"/><path d="M36 60q-1.6 2.6 0 4t0-4Z"/></g>' +
    '<rect x="34" y="55.5" width="12" height="3" rx="1.5" fill="#9aa5b1"/>',
  // Midea's tower dehumidifier (MDDF…, MAD…C1…): a white body with rounded corners under its dark top panel (the dry
  // air out of it), the handle recessed in its side, the bucket below with its round float ring and the water seen
  // through the narrow window on its side, on four casters.
  dehumidifier_midea: (s) =>
    '<ellipse class="floor" cx="40" cy="90" rx="28" ry="3.5" fill="url(#ca-uf)"/>' +
    `<g class="dry">${[31, 40, 49].map((x) => `<path d="M${x} 9q-2.5-3 0-6t0-6"/>`).join("")}</g>` +
    '<rect x="16" y="12" width="48" height="74" rx="7" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M16 21V19Q16 12 23 12H57Q64 12 64 19V21Z" fill="#3a434e"/>' +
    '<path d="M22 16H58" stroke="#5d6874" stroke-width="1.6" stroke-linecap="round"/>' +
    '<rect x="17.6" y="24" width="4" height="7" rx="2" fill="#dfe4ea" stroke="#c3cad2" stroke-width=".7"/>' +
    caHumDisplay(32, 30, 20, s.display) +
    '<circle class="led" cx="42" cy="44" r="1.3"/>' +
    '<path d="M16.6 56H63.4" stroke="#c3cad2" stroke-width="1.1"/>' +
    caHumWater("ca-uw", 18.3, 60, 3.2, 22, 1.6, s.level) +
    '<rect x="18.3" y="60" width="3.2" height="22" rx="1.6" fill="#ffffff" fill-opacity=".2" stroke="#b6bfc9" stroke-width=".7"/>' +
    '<g class="drip"><path d="M19.9 57.5q-1.2 2 0 3t0-3Z"/></g>' +
    '<circle class="knob" cx="45" cy="71" r="5.6" stroke-width="2"/>' +
    '<circle cx="45" cy="71" r="4" fill="#eef1f4"/>' +
    '<circle cx="22" cy="87.5" r="2.3" fill="#3a434e"/><circle cx="58" cy="87.5" r="2.3" fill="#3a434e"/>',
  // Midea Cube: a compact cube (controls, display and the dry air out of its top grille) on its bucket, which pulls
  // out to hold more water (the seam of its extension), the water seen through its window.
  dehumidifier_cube: (s) =>
    '<ellipse class="floor" cx="40" cy="90" rx="28" ry="3.5" fill="url(#ca-uf)"/>' +
    `<g class="dry">${[31, 40, 49].map((x) => `<path d="M${x} 12q-2.5-3 0-6t0-6"/>`).join("")}</g>` +
    '<rect x="15" y="44" width="50" height="44" rx="5" fill="#e3e8ee" stroke="#b6bfc9" stroke-width="1.1"/>' +
    '<path d="M15.6 64H64.4" stroke="#b6bfc9" stroke-width="1"/><path d="M15.6 66H64.4" stroke="#d5dbe2" stroke-width=".8"/>' +
    caHumWater("ca-uw", 21, 69, 38, 15, 3, s.level) +
    '<rect x="21" y="69" width="38" height="15" rx="3" fill="#ffffff" fill-opacity=".15" stroke="#b6bfc9" stroke-width="1"/>' +
    '<rect x="31" y="48" width="18" height="3" rx="1.5" fill="#b6bfc9"/>' +
    '<g class="drip"><path d="M40 53q-1.6 2.6 0 4t0-4Z"/><path d="M44 53q-1.6 2.6 0 4t0-4Z"/></g>' +
    '<rect x="13" y="13" width="54" height="32" rx="6" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="18" y="15.5" width="44" height="6" rx="2.5" fill="#3a434e"/>' +
    `<path d="${Array.from({ length: 13 }, (_, i) => `M${20.5 + i * 3.2} 16.3v4.4`).join("")}" stroke="#6b7682" stroke-width=".9"/>` +
    caHumDisplay(30, 27, 20, s.display) +
    '<circle class="led" cx="21" cy="31.5" r="1.4"/><circle class="led" cx="59" cy="31.5" r="1.4"/>' +
    '<path d="M19 39.5H61" stroke="#d5dbe2" stroke-width="1.2" stroke-linecap="round"/>',
  // SwitchBot Humidifier: a small white cylinder, its clear tank above a solid base, the mist nozzle in the middle of
  // the domed lid and a light line round the foot.
  switchbot_humidifier: (s) =>
    '<ellipse class="floor" cx="40" cy="90" rx="24" ry="3.5" fill="url(#ca-uf)"/>' +
    caHumMist([37, 40, 43], 18) +
    '<path d="M22 66V84Q22 88 26 88H54Q58 88 58 84V66Z" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.2"/>' +
    caHumWater("ca-uw", 23, 30, 34, 36, 6, s.level) +
    '<rect x="23" y="30" width="34" height="36" rx="6" fill="#ffffff" fill-opacity=".18" stroke="#b6bfc9" stroke-width="1.1"/>' +
    '<path d="M27 35v26" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>' +
    '<path d="M24 31Q24 21 40 20Q56 21 56 31Z" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.1"/>' +
    '<ellipse cx="40" cy="21.5" rx="4.4" ry="1.4" fill="#3a434e"/>' +
    caHumDisplay(32, 71, 16, s.display) +
    '<circle class="led" cx="40" cy="83.5" r="1.3"/>',
  // SwitchBot Evaporative Humidifier: a white tower with rounded corners, the air out of the slotted top, a round
  // display, the fan turning behind its round front grille and the clear water tank window low on the front.
  switchbot_evaporative: (s) =>
    '<ellipse class="floor" cx="40" cy="90" rx="30" ry="3.5" fill="url(#ca-uf)"/>' +
    caHumMist([30, 40, 50], 12) +
    '<rect x="13" y="14" width="54" height="74" rx="13" fill="url(#ca-ub)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="19" y="16.5" width="42" height="7" rx="3.5" fill="#3a434e"/>' +
    `<path d="${Array.from({ length: 9 }, (_, i) => `M${22.5 + i * 4.4} 17.8v4.4`).join("")}" stroke="#8b96a3" stroke-width="1"/>` +
    '<circle cx="40" cy="48" r="10.5" fill="#3a434e" stroke="#c3cad2" stroke-width=".8"/>' +
    `<g class="rotor">${[0, 120, 240]
      .map((a) => `<path transform="rotate(${a} 40 48)" d="M40 48C38.9 44 40 40 43.8 39.3C44.8 43 43.1 46.4 40 48Z"/>`)
      .join("")}</g>` +
    '<circle cx="40" cy="48" r="2.4" fill="#d5dbe2"/>' +
    caHumDisplay(31, 28, 18, s.display) +
    caHumWater("ca-uw", 19, 63, 42, 20, 6, s.level) +
    '<rect x="19" y="63" width="42" height="20" rx="6" fill="#ffffff" fill-opacity=".18" stroke="#b6bfc9" stroke-width="1"/>' +
    '<path d="M23 67v12" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>' +
    '<circle class="led" cx="58" cy="32.5" r="1.3"/>',
  rituals: () => caRitualsArt("brass"),
  rituals_black: () => caRitualsArt("black"),
};

// `model`: the device model, which tells the SwitchBot humidifiers apart whatever their owner named them.
// Midea: the Cube dehumidifiers (MAD…S1Q…, MAD…PS1Q… with a pump) and the humidifiers (evaporative, with a wet pad).
const caHumidifierVariant = (text, model = "") => {
  const t = String(text || "");
  if (/dehumid|d[ée]shumid|entfeucht|deshumid|deumid|ontvocht|osusz|dehumidifier|\bmad\d|\bmddf/i.test(t))
    return /\bcube\b|\bmad\d+p?s1q/i.test(t) ? "dehumidifier_cube" : /midea|\bmddf|\bmad\d/i.test(t) ? "dehumidifier_midea" : "dehumidifier";
  if (/rituals|perfume.?genie/i.test(t)) return /black|noir|graphit|anthracit|\bdark\b/i.test(t) ? "rituals_black" : "rituals";
  if (/flower.?bud|diffus|aroma|essential|huile|vocolinc.*(fb|vf|ad)/i.test(t)) return "diffuser";
  if (/vocolinc|mistflow|vh1/i.test(t)) return "vocolinc";
  // SwitchBot: the Evaporative Humidifier (« Humidifier2 » in the Cloud API) or the ultrasonic Humidifier (WoHumi).
  if (/switch\s?bot|wonderlabs|wohumi/i.test(t)) return /evapor|humidifier\s?2/i.test(model || t) ? "switchbot_evaporative" : "switchbot_humidifier";
  if (/evapor|wick|cjxjsq|midea|wet.?pad|smartmi|zhimi|levoit.*(oasis|ev)|venta|stadler/i.test(t)) return "evaporative";
  if (/deerma|jsq|tank|r[ée]servoir|mjjsq|dem-/i.test(t)) return "tank";
  return "column";
};

const CA_HUM_LIT = ["vocolinc", "diffuser"];

// The colours offered for a device's light: a warm white (colour temperature) and seven colours.
const CA_LIGHT_COLORS = ["255,64,64", "255,140,0", "255,214,0", "64,220,96", "0,180,255", "64,96,255", "224,64,251"];
// The brightness of a light (0–1) for the glow, from 255.
const caLightLevel = (st) => (st?.state === "on" && st.attributes.brightness != null ? Math.max(0.25, Number(st.attributes.brightness) / 255) : 1);

CA_ART.humidifier = {
  variants: ["column", "tank", "evaporative", "vocolinc", "diffuser", "rituals", "rituals_black", "dehumidifier", "switchbot_humidifier", "switchbot_evaporative", "dehumidifier_cube", "dehumidifier_midea"],
  guess: caHumidifierVariant,
  render: (variant, s) => ({
    svg: `<svg viewBox="0 0 80 94" aria-hidden="true"><defs>${CA_HUM_DEFS}</defs>${(CA_HUM_ARTS[variant] || CA_HUM_ARTS.column)(s)}</svg>`,
    // Only the VOCOlinc shapes are lit by the device's light (an indicator light elsewhere draws nothing).
    cls: [`v-${variant || "column"}`, s.active ? "active" : "", s.low ? "low" : "", s.glow && CA_HUM_LIT.includes(variant) ? "lit" : ""],
    style: s.glow && CA_HUM_LIT.includes(variant) ? `--ca-glow:${s.glow};--ca-glow-o:${s.glowLevel ?? 1}` : "",
  }),
  styles: `
    .hero .picture.k-humidifier { width: 100px; height: 118px; }
    ha-card.mini .picture.k-humidifier { width: 64px; height: 76px; }
    .ic.pic:has(.k-humidifier), .ic.pic .picture.k-humidifier { width: 46px; height: 54px; }
    .dev:has(.ic.pic .k-humidifier) { grid-template-columns: 46px minmax(0, 1fr); }
    @container (max-width: 180px) { ha-card:not(.mini) .hero .picture.k-humidifier { width: 64px; height: 76px; } }
    .k-humidifier .c-stop { stop-color: var(--ca-color); }
    .k-humidifier .floor { opacity: 0; transition: opacity .6s; }
    .k-humidifier.running .floor { opacity: 1; }
    .k-humidifier .disp { font: 600 6.4px/1 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: #9aa5b1; }
    .k-humidifier.running .disp { fill: var(--ca-color); }
    .k-humidifier .led { fill: #9aa5b1; }
    .k-humidifier.running .led { fill: var(--ca-color); }
    .k-humidifier.running.active .led { animation: ca-blink 2s ease-in-out infinite; }
    .k-humidifier .knob { fill: none; stroke: #b6bfc9; stroke-width: 1.6; }
    .k-humidifier.running .knob { stroke: var(--ca-color); }
    .k-humidifier .water { fill: #85b7eb; opacity: .75; transition: fill .6s; }
    .k-humidifier.low .water { fill: var(--error-color, #db4437); opacity: .55; }
    .k-humidifier .wave { transform-box: view-box; }
    .k-humidifier.running .wave { animation: ca-hum-wave 3.2s ease-in-out infinite; }
    .k-humidifier .rotor { fill: #aab3bd; transform-box: view-box; transform-origin: 40px 48px; }
    .k-humidifier.running .rotor { fill: var(--ca-color); animation: ca-spin 4s linear infinite; }
    .k-humidifier.running.active .rotor { animation-duration: 1.2s; }
    .k-humidifier .mist, .k-humidifier .dry { fill: none; stroke: var(--ca-color); stroke-width: 2; stroke-linecap: round; }
    .k-humidifier .mist { stroke: color-mix(in srgb, var(--ca-color) 55%, #ffffff); stroke-width: 2.6; }
    .k-humidifier .mist path, .k-humidifier .dry path { opacity: 0; transform-box: view-box; }
    .k-humidifier.running.active .mist path { animation: ca-rise 2.6s ease-out infinite; }
    .k-humidifier.running.active .dry path { animation: ca-rise 2.2s ease-out infinite; }
    .k-humidifier .mist path:nth-child(2), .k-humidifier .dry path:nth-child(2) { animation-delay: .85s; }
    .k-humidifier .mist path:nth-child(3), .k-humidifier .dry path:nth-child(3) { animation-delay: 1.7s; }
    .k-humidifier .drip { fill: #85b7eb; }
    .k-humidifier .drip path { opacity: 0; transform-box: view-box; }
    .k-humidifier.running.active .drip path { animation: ca-hum-drip 1.6s ease-in infinite; }
    .k-humidifier.running.active .drip path:nth-child(2) { animation-delay: .8s; }
    /* VOCOlinc: the light ring and the frosted cone take the colour of the device's light while it is on. */
    .k-humidifier .ring { fill: #c3cad2; }
    .k-humidifier .bud { fill: #f4f6f8; stroke: #c3cad2; stroke-width: .8; }
    .k-humidifier .line, .k-humidifier .keys { stroke: #c3cad2; }
    .k-humidifier.lit .ring { fill: var(--ca-glow); filter: drop-shadow(0 0 2px var(--ca-glow)); }
    .k-humidifier.lit .bud { fill: color-mix(in srgb, var(--ca-glow) calc(var(--ca-glow-o, 1) * 100%), #f4f6f8); stroke: none; filter: drop-shadow(0 0 calc(var(--ca-glow-o, 1) * 4px) var(--ca-glow)); }
    .k-humidifier.lit .line, .k-humidifier.lit .keys { stroke: var(--ca-glow); }
    .k-humidifier.lit .glow { opacity: 1; }
    .k-humidifier.lit .glow .c-stop, .k-humidifier.lit .c-stop { stop-color: var(--ca-glow); }
    @keyframes ca-hum-wave { 50% { transform: translateX(-4px); } }
    @keyframes ca-hum-drip { 0% { opacity: 0; transform: translateY(-2px); } 25% { opacity: .95; } 100% { opacity: 0; transform: translateY(16px); } }
  `,
};

class ClimateAirHumidifierCard extends CaCard {
  static get kind() {
    return "humidifier";
  }

  _roles() {
    return [
      "humidity", "temperature", "water_level", "tank_empty", "bucket_full", "filter", "filter_alert", "filter_reset", "fan_speed",
      "lamp", "spray", "child_lock", "buzzer", "room_size", "perfume", "battery", "charging", "wifi", "cartridge",
    ];
  }

  // A diffuser shows a scent icon.
  _kindIcon(r) {
    return caIsDiffuser(caVariant(this._hass, "humidifier", r.id, this._config.illustration)) ? "mdi:scent" : null;
  }

  _extraIds(r) {
    return this._switches(r);
  }

  _model(r) {
    const c = this._config;
    const ent = r.ent;
    const st = this._st(r.id);
    const a = st.attributes;
    const variant = caVariant(this._hass, "humidifier", r.id, c.illustration);
    const diffuser = caIsDiffuser(variant);
    const hs = caHumidifierState(st, (role) => this._st(ent[role]), variant);
    const cur = a.current_humidity != null ? Number(a.current_humidity) : this._num(ent.humidity);
    const target = a.humidity != null ? Number(a.humidity) : null;
    const filterState = this._filterState(ent);
    const chips = [];
    if (hs.alertKey) {
      const alertIcon = diffuser ? "mdi:bottle-tonic-outline" : hs.dehum ? "mdi:bucket" : "mdi:water-off";
      const alertEnt = (diffuser ? ent.cartridge : ent[hs.dehum ? "bucket_full" : "tank_empty"]) || ent.water_level;
      chips.push(this._chip(alertIcon, this._t(hs.alertKey), "alert", "", alertEnt));
    }
    const filterChip = this._filterChip(filterState);
    if (filterChip) chips.push(filterChip);
    // The Rituals diffuser's fragrance, and its battery with a charging icon (battery model only).
    if (this._avail(ent.perfume)) chips.push(this._chip("mdi:flower-outline", this._fmtState(ent.perfume), "", this._t("perfume"), ent.perfume));
    if (this._avail(ent.battery)) {
      const charging = this._val(ent.charging) === "on";
      chips.push(this._chip(charging ? "mdi:battery-charging" : "mdi:battery", this._fmtSensor(ent.battery), "", this._t("battery"), ent.battery));
    }
    if (c.show_sensors) {
      chips.push(...this._sensorChips(ent, ["temperature", ...(a.current_humidity != null ? ["humidity"] : [])]));
      if (this._avail(ent.wifi)) chips.push(this._chip("mdi:wifi", this._fmtSensor(ent.wifi), "", this._t("wifi"), ent.wifi));
    }
    const mode = hs.on && a.mode ? this._fmtAttr(r.id, "mode", a.mode) : "";
    return {
      state: hs.on ? "on" : "off",
      running: hs.on,
      active: hs.active,
      low: hs.low,
      level: hs.level,
      // A tank level given as a word (SwitchBot): shown as Home Assistant words it, the bar at its rough fill.
      levelText: hs.level != null && this._num(ent.water_level) == null && this._avail(ent.water_level) ? this._fmtState(ent.water_level) : null,
      dehum: hs.dehum,
      diffuser,
      glow: caLightGlow(this._st(ent.lamp)),
      glowLevel: caLightLevel(this._st(ent.lamp)),
      spray: this._num(ent.spray),
      color: hs.color,
      statusText: this._t(hs.statusKey),
      sub: mode,
      cur,
      // A diffuser has no humidity to aim at (HomeKit reports 100 %).
      target: diffuser ? null : target,
      filterState,
      chips,
      display: cur != null ? `${caFmtNum(this._intlLang(), cur, 0)}%` : "",
    };
  }

  _pct(v) {
    return `${caFmtNum(this._intlLang(), v, 0)} %`;
  }

  // The humidity in large, the target next to it, then the water in the tank (or the bucket) and the filter.
  _heroInfo(m) {
    const big =
      m.cur != null
        ? `<div class="big"><span class="val">${caFmtNum(this._intlLang(), m.cur, 0)}<small> %</small></span>${m.running && m.target != null ? `<span class="arrow">→ ${caEsc(this._pct(m.target))}</span>` : ""}</div>`
        : `<div class="big"><span class="state-big">${caEsc(m.statusText)}</span></div>`;
    return big + this._tankLine(m) + this._filterLine(m.filterState);
  }

  _tankLine(m) {
    if (m.level == null) return "";
    const label = this._t(m.dehum ? "bucket" : m.diffuser ? "cartridge" : "tank_level");
    const icon = m.dehum ? "mdi:bucket-outline" : m.diffuser ? "mdi:bottle-tonic-outline" : "mdi:cup-water";
    return caBar(m.level, `${label} ${m.levelText ?? this._pct(m.level)}`, icon);
  }

  _controls(m) {
    const r = this._r;
    const st = this._st(r.id);
    const a = st.attributes;
    const modes = (a.available_modes || []).length > 1 ? this._segments("hmode", a.available_modes, a.mode, (o) => this._fmtAttr(r.id, "mode", o), CA_PRESET_ICON) : "";
    // The Rituals room size (m²) as segmented buttons (the select's options).
    const rs = this._st(r.ent.room_size);
    const roomSize =
      rs && !caUnavailable(rs) && (rs.attributes.options || []).length > 1
        ? this._section(this._t("room_size"), this._segments("rsize", rs.attributes.options, rs.state, (o) => `${o} m²`), "mdi:ruler-square")
        : "";
    const target =
      // A diffuser has no humidity to aim at: no target slider.
      m.running && a.humidity != null && !m.diffuser
        ? this._rangeHtml("hum", r.id, "mdi:water-percent", this._t("target_humidity"), Number(a.min_humidity ?? 30), Number(a.max_humidity ?? 80), 1, Number(a.humidity))
        : "";
    const light = this._lightSection(r.ent.lamp);
    const toggles = this._toggles([
      light ? "" : this._toggle(r.ent.lamp, this._t("light"), "mdi:lightbulb-outline"),
      this._toggle(r.ent.child_lock, this._t("child_lock"), this._val(r.ent.child_lock) === "on" ? "mdi:lock" : "mdi:lock-open-variant-outline"),
      this._toggle(r.ent.buzzer, this._t("buzzer"), this._val(r.ent.buzzer) === "on" ? "mdi:volume-high" : "mdi:volume-off"),
    ]);
    const reset = this._toggles([this._filterResetButton(m.filterState, r.ent.filter_reset)]);
    // The mist intensity as a slider (a 1–5 number would otherwise become a dropdown); a diffuser shows it as « Intensity » (the Rituals « Perfume amount », 1 to 3).
    const sp = this._st(r.ent.spray);
    const spray =
      sp && !caUnavailable(sp) && this._num(r.ent.spray) != null
        ? this._rangeHtml("number", r.ent.spray, m.diffuser ? "mdi:scent" : "mdi:spray", this._t(m.diffuser ? "intensity" : "spray"), Number(sp.attributes.min ?? 1), Number(sp.attributes.max ?? 5), Number(sp.attributes.step ?? 1), this._num(r.ent.spray))
        : "";
    return this._section("", modes + target + spray) + this._speedSegments(r.ent.fan_speed) + roomSize + light + this._options(toggles + this._switchToggles(r) + reset);
  }

  // A light whose brightness or colour can change (the VOCOlinc mood light) gets its own section, usable while the
  // device itself is off: on / off, brightness, and colour swatches (a warm white when it supports colour temperature).
  _lightSection(id) {
    const st = this._st(id);
    if (!st || caUnavailable(st)) return "";
    const modes = st.attributes.supported_color_modes || [];
    const colour = modes.some((x) => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(x));
    const ct = modes.includes("color_temp");
    if (!colour && !ct && !modes.includes("brightness")) return "";
    const on = st.state === "on";
    const head = this._toggles([this._toggle(id, on ? this._t("st_on") : this._t("st_off"), on ? "mdi:lightbulb-on" : "mdi:lightbulb-outline")]);
    let body = head;
    if (on) {
      const pct = Math.round((Number(st.attributes.brightness ?? 255) / 255) * 100);
      body += this._rangeHtml("lbright", id, "mdi:brightness-6", this._t("light_level"), 1, 100, 1, Math.max(1, pct));
      const cur = Array.isArray(st.attributes.rgb_color) ? st.attributes.rgb_color.map((v) => Math.round(v)).join(",") : "";
      const sw = (value, css, title, active) =>
        `<button class="sw${active ? " on" : ""}" style="--sw:${css}" data-action="lcolor" data-value="${value}" title="${caEsc(title)}" aria-label="${caEsc(title)}" aria-pressed="${active}"></button>`;
      const swatches = [
        ...(ct ? [sw("ct", "#ffd9a8", this._t("color"), st.attributes.color_mode === "color_temp")] : []),
        ...(colour ? CA_LIGHT_COLORS.map((c) => sw(c, `rgb(${c})`, this._t("color"), st.attributes.color_mode !== "color_temp" && c === cur)) : []),
      ];
      if (swatches.length) body += `<div class="swatches" role="group" aria-label="${caEsc(this._t("color"))}">${swatches.join("")}</div>`;
    }
    return this._section(this._t("mood_light"), body, "mdi:lightbulb-night-outline");
  }

  _rangeText(d, v) {
    if (d.hum || d.lbright) return this._pct(v);
    return super._rangeText(d, v);
  }

  _extraSend(d, value) {
    if (d.hum) return () => this._call("humidifier", "set_humidity", { entity_id: d.hum, humidity: Number(value) });
    if (d.lbright) return () => this._call("light", "turn_on", { entity_id: d.lbright, brightness_pct: Number(value) });
    return null;
  }

  _action(action, value) {
    const id = this._r.id;
    if (action === "hmode") this._call("humidifier", "set_mode", { entity_id: id, mode: value });
    else if (action === "rsize") this._call("select", "select_option", { entity_id: this._r.ent.room_size, option: value });
    else if (action === "lcolor") {
      const data = value === "ct" ? { color_temp_kelvin: 2700 } : { rgb_color: value.split(",").map(Number) };
      this._call("light", "turn_on", { entity_id: this._r.ent.lamp, ...data });
    }
    else if (action === "hmode-next") {
      const a = this._st(id).attributes;
      const list = a.available_modes || [];
      this._call("humidifier", "set_mode", { entity_id: id, mode: list[(list.indexOf(a.mode) + 1) % list.length] });
    } else super._action(action, value);
  }

  // The compact mini card's lines show the mode while it runs.
  _subInBody(m, full) {
    return !full && m.running;
  }

  // The humidity and its target, the mode, the mist intensity of a diffuser, the tank and the filter.
  _miniInfo(m) {
    const target = m.running && m.target != null ? ` → ${this._pct(m.target)}` : "";
    const hum = m.cur != null ? `<div class="line tline"><ha-icon icon="mdi:water-percent"></ha-icon><span><b>${caEsc(this._pct(m.cur))}</b>${caEsc(target)}</span></div>` : "";
    const mode = m.running && m.sub ? caLine(CA_PRESET_ICON(this._st(this._r.id).attributes.mode) || "mdi:tune-variant", m.sub) : "";
    const spray = m.spray != null ? caLine(m.diffuser ? "mdi:scent" : "mdi:spray", `${this._t(m.diffuser ? "intensity" : "spray")} ${caFmtNum(this._intlLang(), m.spray, 0)}`) : "";
    return [hum, mode, spray, this._tankLine(m), this._filterLine(m.filterState)].join("");
  }

  _miniButtons(m) {
    const a = this._st(this._r.id).attributes;
    if (!m.running || (a.available_modes || []).length < 2) return [];
    return [this._cycleButton("hmode-next", `${this._t("mode")}${this._t("colon")}${m.sub}`, CA_PRESET_ICON(a.mode))];
  }
}

ClimateAirHumidifierCard.styles = `
  .swatches { display: flex; flex-wrap: wrap; gap: 8px; padding: 2px 0; }
  .sw { width: 26px; height: 26px; border-radius: 50%; padding: 0; background: var(--sw); box-shadow: inset 0 0 0 1px rgba(0,0,0,.12); }
  .sw.on { box-shadow: 0 0 0 2px var(--card-background-color, #fff), 0 0 0 4px var(--sw); }
`;

class ClimateAirHumidifierMiniCard extends caMini(ClimateAirHumidifierCard) {}

caRegister(
  "climate-air-humidifier-card",
  ClimateAirHumidifierCard,
  "Climate Air · Humidifier Card",
  "Humidifier, dehumidifier or essential oil diffuser with its humidity, target, modes, water tank and animated illustration",
);
caRegister(
  "climate-air-humidifier-mini-card",
  ClimateAirHumidifierMiniCard,
  "Climate Air · Humidifier Mini Card",
  "Compact humidifier card that unfolds into the full card",
);
