/*
 * climate-air-aircon-card and its mini card: an air conditioner (a climate entity that can cool, dry or blow) with its
 * mode, target temperature, fan and swing modes, measurements and options. The target and the controls come from
 * CaClimateCard (shared.js).
 */

// Illustrations: the display shows the target, the flap swings with the swing mode, and the air flowing out takes the
// mode color, with snowflakes when cooling, shimmer when heating and droplets when drying. While the compressor runs
// the status light breathes (and the outdoor fan of a window split turns). Four shapes: a wall split unit, a portable
// unit with its exhaust hose, a window split (indoor tower, outdoor unit hung outside the window), and a portasplit
// (Midea PortaSplit: an indoor console and an outdoor condenser side by side, joined by a looping flexible hose), and
// Midea's other shapes: a Breezeless wall unit (its front of micro-holes), a floor console, a box window unit set in its
// window, and a Duo portable (one wide hose-in-hose); `illustration: auto` picks one from the device model and name.
const caSnow = (x, y) => `<path d="M${x} ${y}v5M${x - 2.2} ${y + 1.25}l4.4 2.5M${x - 2.2} ${y + 3.75}l4.4-2.5"/>`;
const caDrop = (x, y) => `<path d="M${x} ${y}q-2 3 0 4.5t0-4.5Z"/>`;
const caWave = (x, y) => `<path d="M${x} ${y}q-1.5 2 0 4t0 4"/>`;

// The air and its particles: falling below a wall unit, rising above the outlet of the others (`up`).
const caAirFx = (xs, y, up) => {
  const cls = up ? " up" : "";
  const air = up ? (x) => `<path d="M${x} ${y}q-3-4 0-8t0-8"/>` : (x) => `<path d="M${x} ${y}q4 6 0 12t0 12"/>`;
  const pts = up
    ? [
        [xs[0] + 3, y - 10],
        [xs[2] - 3, y - 6],
        [xs[1] + 2, y - 15],
      ]
    : [
        [28, y + 8],
        [50, y + 14],
        [39, y + 24],
      ];
  return (
    `<g class="air${cls}">${xs.map(air).join("")}</g>` +
    `<g class="flakes${cls}">${pts.map(([x, py]) => caSnow(x, py)).join("")}</g>` +
    `<g class="drops${cls}">${pts.map(([x, py]) => caDrop(x, py)).join("")}</g>` +
    `<g class="heat${cls}">${pts.map(([x, py]) => caWave(x, py)).join("")}</g>`
  );
};

const caDisplay = (x, y, w, text) =>
  `<rect x="${x}" y="${y}" width="${w}" height="9" rx="2.5" fill="#1d2632"/><text class="disp" x="${x + w / 2}" y="${y + 6.8}" text-anchor="middle">${caEsc(text)}</text>`;

const caGrille = (x1, x2, y1, y2, step) =>
  `<path d="${Array.from({ length: Math.floor((y2 - y1) / step) + 1 }, (_, i) => `M${x1} ${y1 + i * step}H${x2}`).join("")}" stroke="#d5dbe2" stroke-width="1"/>`;

const CA_AIRCON_ARTS = {
  split: (display) =>
    '<ellipse class="floor" cx="40" cy="89" rx="30" ry="4" fill="url(#ca-af)"/>' +
    caAirFx([20, 40, 60], 52, false) +
    '<rect x="3" y="14" width="74" height="31" rx="8" fill="url(#ca-ab)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M11 19h58M11 22h58" stroke="#dfe4ea" stroke-width="1.1"/>' +
    caDisplay(51, 25, 19, display) +
    '<circle class="led" cx="11" cy="29.5" r="1.5"/>' +
    '<rect x="8" y="38.5" width="64" height="4.5" rx="2.2" fill="#3a434e"/>' +
    '<g class="flap"><path d="M9 41h62l-2.5 4.2H11.5Z" fill="#eef1f4" stroke="#aab3bd" stroke-width=".8" stroke-linejoin="round"/></g>',
  portable: (display) =>
    '<ellipse class="floor" cx="41" cy="89" rx="26" ry="4" fill="url(#ca-af)"/>' +
    '<path d="M23 34C9 34 5 26 5 6" fill="none" stroke="#b6bfc9" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M23 34C9 34 5 26 5 6" fill="none" stroke="#8f9aa6" stroke-width="7" stroke-dasharray="1 2.2" opacity=".45"/>' +
    caAirFx([30, 41, 52], 12, true) +
    '<rect x="20" y="13" width="42" height="72" rx="8" fill="url(#ca-ab2)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="25" y="16" width="32" height="10" rx="3" fill="#3a434e"/>' +
    '<g class="flap"><rect x="26.5" y="17.6" width="29" height="1.7" rx=".8" fill="#eef1f4"/><rect x="26.5" y="20.6" width="29" height="1.7" rx=".8" fill="#eef1f4"/><rect x="26.5" y="23.6" width="29" height="1.7" rx=".8" fill="#eef1f4"/></g>' +
    caDisplay(31.5, 31, 19, display) +
    '<circle class="led" cx="26" cy="35.5" r="1.4"/>' +
    caGrille(26, 56, 50, 76, 3.5) +
    '<circle cx="27" cy="87" r="2.6" fill="#5d6874"/><circle cx="55" cy="87" r="2.6" fill="#5d6874"/>',
  window: (display) =>
    '<ellipse class="floor" cx="57" cy="89" rx="20" ry="3.6" fill="url(#ca-af)"/>' +
    '<rect x="33" y="4" width="4.5" height="84" rx="1" fill="#d5dbe2" stroke="#b6bfc9" stroke-width=".8"/>' +
    '<rect x="1" y="55" width="37" height="3" rx="1" fill="#c3cad2"/>' +
    '<path d="M16 29V21Q16 15 22 15H48Q53 15 53 21V30" fill="none" stroke="#b6bfc9" stroke-width="3.2" stroke-linecap="round"/>' +
    '<rect x="3" y="28" width="27" height="27" rx="3.5" fill="url(#ca-ab)" stroke="#c3cad2" stroke-width="1.1"/>' +
    '<circle cx="16.5" cy="41.5" r="9.5" fill="#3a434e"/>' +
    '<g class="ofan" fill="#aab3bd"><circle cx="16.5" cy="41.5" r="10" fill="none"/>' +
    [0, 120, 240].map((a) => `<path transform="rotate(${a} 16.5 41.5)" d="M16.5 41.5C18 37 21 34.5 24 35.5C24.5 38.5 21 41 16.5 41.5Z"/>`).join("") +
    '<circle cx="16.5" cy="41.5" r="1.8" fill="#d5dbe2"/></g>' +
    '<g fill="none" stroke="#c3cad2" stroke-width=".7">' +
    '<circle cx="16.5" cy="41.5" r="9.5"/><circle cx="16.5" cy="41.5" r="6.5" stroke-opacity=".7"/><circle cx="16.5" cy="41.5" r="3.5" stroke-opacity=".55"/>' +
    [0, 45, 90, 135].map((a) => `<path transform="rotate(${a} 16.5 41.5)" d="M7 41.5H26" stroke-opacity=".4"/>`).join("") +
    "</g>" +
    caAirFx([50, 57, 64], 26, true) +
    '<rect x="42" y="28" width="30" height="58" rx="7" fill="url(#ca-ab2)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="46" y="31" width="22" height="7" rx="2.5" fill="#3a434e"/>' +
    '<g class="flap"><rect x="47.3" y="32.3" width="19.4" height="1.5" rx=".7" fill="#eef1f4"/><rect x="47.3" y="35.1" width="19.4" height="1.5" rx=".7" fill="#eef1f4"/></g>' +
    caDisplay(48, 42, 18, display) +
    '<circle class="led" cx="57" cy="55" r="1.3"/>' +
    caGrille(47, 67, 61, 80, 3.2),
  portasplit: (display) =>
    '<ellipse class="floor" cx="40" cy="89" rx="34" ry="4" fill="url(#ca-af)"/>' +
    // the looping flexible hose joining the indoor console to the top-left of the outdoor condenser (white, ribbed)
    '<path d="M31 33C33 15 52 16 50 46" fill="none" stroke="#b6bfc9" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M31 33C33 15 52 16 50 46" fill="none" stroke="#f1f4f7" stroke-width="4.2" stroke-linecap="round"/>' +
    '<path d="M31 33C33 15 52 16 50 46" fill="none" stroke="#b6bfc9" stroke-width="4.2" stroke-dasharray=".8 2.4" stroke-linecap="butt" opacity=".65"/>' +
    // conditioned air rising from the indoor console top
    caAirFx([13, 20, 27], 33, true) +
    // --- indoor console (left): grey upper band, white body, casters ---
    '<rect x="4" y="33" width="32" height="53" rx="7" fill="url(#ca-ab2)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<path d="M4 40Q4 33 11 33H29Q36 33 36 40V51H4Z" fill="#c9d0d8"/>' +
    '<rect x="8" y="33.3" width="24" height="3" rx="1.5" fill="#3a434e"/>' +
    '<g class="flap"><rect x="9" y="34" width="22" height="1.4" rx=".6" fill="#eef1f4"/></g>' +
    '<circle cx="11" cy="44" r="1.3" fill="#9aa5b1"/>' +
    caDisplay(17, 40, 15, display) +
    '<circle class="led" cx="33" cy="44" r="1.1"/>' +
    '<circle cx="10" cy="87" r="2.3" fill="#5d6874"/><circle cx="30" cy="87" r="2.3" fill="#5d6874"/>' +
    // --- outdoor condenser (right): fan behind a round guard (concentric rings + spokes) ---
    '<rect x="42" y="45" width="34" height="37" rx="5" fill="url(#ca-ab)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="45.5" y="48" width="11" height="3" rx="1.2" fill="none" stroke="#c3cad2" stroke-width=".7"/>' +
    '<circle cx="60" cy="64.5" r="14" fill="#2b333d"/>' +
    // the invisible circle centred on (60,64.5) forces the group's bbox symmetric, so `transform-origin: center` spins true (no wobble)
    '<g class="ofan" fill="#6b7682"><circle cx="60" cy="64.5" r="13" fill="none"/>' +
    [0, 72, 144, 216, 288].map((a) => `<path transform="rotate(${a} 60 64.5)" d="M60 64.5C63 58 68 56 71 58.5C70 62.5 65 64.5 60 64.5Z"/>`).join("") +
    '<circle cx="60" cy="64.5" r="2" fill="#aab3bd"/></g>' +
    '<g fill="none" stroke="#c3cad2" stroke-width=".8">' +
    '<circle cx="60" cy="64.5" r="14"/><circle cx="60" cy="64.5" r="9.7" stroke-opacity=".7"/><circle cx="60" cy="64.5" r="5.4" stroke-opacity=".55"/>' +
    [0, 45, 90, 135].map((a) => `<path transform="rotate(${a} 60 64.5)" d="M46 64.5H74" stroke-opacity=".45"/>`).join("") +
    "</g>" +
    '<rect x="45" y="82" width="3.5" height="3" rx="1" fill="#5d6874"/><rect x="69.5" y="82" width="3.5" height="3" rx="1" fill="#5d6874"/>',
  // Midea Breezeless: a wall unit with rounded ends, the left of its front a panel of micro-holes the air seeps
  // through, the display on the right, and its flap.
  breezeless: (display) =>
    '<ellipse class="floor" cx="40" cy="89" rx="30" ry="4" fill="url(#ca-af)"/>' +
    caAirFx([20, 40, 60], 52, false) +
    '<rect x="3" y="13" width="74" height="32" rx="11" fill="url(#ca-ab)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="8" y="18" width="40" height="18" rx="5" fill="#f4f6f8" stroke="#d5dbe2" stroke-width=".8"/>' +
    `<g fill="#aab3bd">${Array.from({ length: 6 }, (_, j) =>
      Array.from({ length: 14 }, (_, i) => `<circle cx="${(11 + i * 2.6 + (j % 2) * 1.3).toFixed(1)}" cy="${(20.6 + j * 2.6).toFixed(1)}" r=".55"/>`).join(""),
    ).join("")}</g>` +
    caDisplay(53, 23, 18, display) +
    '<circle class="led" cx="62" cy="35" r="1.4"/>' +
    '<rect x="9" y="38.5" width="62" height="4.5" rx="2.2" fill="#3a434e"/>' +
    '<g class="flap"><path d="M10 41h60l-2.5 4.2H12.5Z" fill="#eef1f4" stroke="#aab3bd" stroke-width=".8" stroke-linejoin="round"/></g>',
  // A floor console: a low wide unit on its feet, the air out of the louvre on its top, in through the grille below.
  console: (display) =>
    '<ellipse class="floor" cx="40" cy="89" rx="32" ry="4" fill="url(#ca-af)"/>' +
    caAirFx([26, 40, 54], 36, true) +
    '<rect x="9" y="37" width="62" height="48" rx="6" fill="url(#ca-ab2)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="14" y="39.5" width="52" height="6" rx="2.5" fill="#3a434e"/>' +
    '<g class="flap"><rect x="15.5" y="40.6" width="49" height="1.5" rx=".7" fill="#eef1f4"/><rect x="15.5" y="43.2" width="49" height="1.5" rx=".7" fill="#eef1f4"/></g>' +
    caDisplay(31, 50, 18, display) +
    '<circle class="led" cx="16" cy="54.5" r="1.4"/>' +
    '<path d="M13 62.5h54" stroke="#d5dbe2" stroke-width="1"/>' +
    caGrille(16, 64, 66, 80, 3.4) +
    '<rect x="13" y="85" width="6" height="3" rx="1" fill="#5d6874"/><rect x="61" y="85" width="6" height="3" rx="1" fill="#5d6874"/>',
  // A box window unit (Midea EasyCool…) seen from the room: the sash lowered onto it, its louvres at the top, the
  // intake grille and the display below, on the sill.
  window_box: (display) =>
    '<ellipse class="floor" cx="40" cy="89" rx="28" ry="3.6" fill="url(#ca-af)"/>' +
    '<rect x="2" y="4" width="76" height="25" rx="1.5" fill="#dceaf5" fill-opacity=".55" stroke="#b6bfc9" stroke-width="1.6"/>' +
    '<path d="M40 4V29M4 16.5H76" stroke="#c3cad2" stroke-width="1.1"/>' +
    '<rect x="1" y="4" width="4" height="61" rx="1" fill="#d5dbe2" stroke="#b6bfc9" stroke-width=".8"/>' +
    '<rect x="75" y="4" width="4" height="61" rx="1" fill="#d5dbe2" stroke="#b6bfc9" stroke-width=".8"/>' +
    caAirFx([22, 40, 58], 44, false) +
    '<rect x="8" y="29" width="64" height="33" rx="4" fill="url(#ca-ab)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="12" y="32" width="56" height="9" rx="2.5" fill="#3a434e"/>' +
    '<g class="flap"><rect x="13.5" y="33.2" width="53" height="1.5" rx=".7" fill="#eef1f4"/><rect x="13.5" y="36" width="53" height="1.5" rx=".7" fill="#eef1f4"/><rect x="13.5" y="38.8" width="53" height="1.5" rx=".7" fill="#eef1f4"/></g>' +
    `<g fill="#c3cad2">${Array.from({ length: 11 }, (_, i) => `<rect x="${(13 + i * 3.4).toFixed(1)}" y="45" width="1.4" height="13" rx=".7"/>`).join("")}</g>` +
    caDisplay(51, 46, 17, display) +
    '<circle class="led" cx="59.5" cy="58" r="1.2"/>' +
    '<rect x="0" y="62" width="80" height="4" rx="1" fill="#c3cad2" stroke="#aab3bd" stroke-width=".6"/>',
  // Midea Duo: a portable unit whose one wide hose holds both the intake and the exhaust (hose-in-hose), the air out
  // of its top louvre.
  portable_duo: (display) =>
    '<ellipse class="floor" cx="44" cy="89" rx="26" ry="4" fill="url(#ca-af)"/>' +
    '<path d="M26 40C10 40 6 30 6 5" fill="none" stroke="#aab3bd" stroke-width="11" stroke-linecap="round"/>' +
    '<path d="M26 40C10 40 6 30 6 5" fill="none" stroke="#d5dbe2" stroke-width="8.4" stroke-linecap="round"/>' +
    '<path d="M26 40C10 40 6 30 6 5" fill="none" stroke="#8f9aa6" stroke-width="8.4" stroke-dasharray="1 2.4" opacity=".4"/>' +
    '<path d="M26 40C10 40 6 30 6 5" fill="none" stroke="#b6bfc9" stroke-width="3" stroke-linecap="round"/>' +
    caAirFx([34, 45, 56], 12, true) +
    '<rect x="23" y="13" width="44" height="72" rx="10" fill="url(#ca-ab2)" stroke="#c3cad2" stroke-width="1.2"/>' +
    '<rect x="28" y="16" width="34" height="10" rx="3" fill="#3a434e"/>' +
    '<g class="flap"><rect x="29.5" y="17.6" width="31" height="1.7" rx=".8" fill="#eef1f4"/><rect x="29.5" y="20.6" width="31" height="1.7" rx=".8" fill="#eef1f4"/><rect x="29.5" y="23.6" width="31" height="1.7" rx=".8" fill="#eef1f4"/></g>' +
    caDisplay(35.5, 31, 19, display) +
    '<circle class="led" cx="29" cy="35.5" r="1.4"/>' +
    '<circle cx="45" cy="58" r="11" fill="none" stroke="#d5dbe2" stroke-width="1.2"/>' +
    '<circle cx="45" cy="58" r="7.5" fill="none" stroke="#d5dbe2" stroke-width="1"/>' +
    '<circle cx="45" cy="58" r="3.6" fill="#e7ebef" stroke="#c3cad2" stroke-width=".8"/>' +
    '<circle cx="30" cy="87" r="2.6" fill="#5d6874"/><circle cx="60" cy="87" r="2.6" fill="#5d6874"/>',
};

const caAirconArt = (variant, display) =>
  '<svg viewBox="0 0 80 94" aria-hidden="true"><defs>' +
  '<linearGradient id="ca-ab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e1e6eb"/></linearGradient>' +
  '<linearGradient id="ca-ab2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfe4ea"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd5dc"/></linearGradient>' +
  '<radialGradient id="ca-af" cx=".5" cy=".5" r=".5"><stop offset="0" class="c-stop" stop-opacity=".45"/><stop offset="1" class="c-stop" stop-opacity="0"/></radialGradient></defs>' +
  (CA_AIRCON_ARTS[variant] || CA_AIRCON_ARTS.split)(display) +
  "</svg>";

// The shape that looks most like the device, from its model and name.
// Midea's model numbers tell some apart: MAW…V… the U-shaped window unit (window), MAW… the box window units, MAP… the
// portables; Breezeless, console, Duo and EasyCool by name.
const caAirconVariant = (text) => {
  const s = String(text).toLowerCase();
  if (/porta.?split/.test(s)) return "portasplit";
  if (/breeze.?less/.test(s)) return "breezeless";
  if (/\bconsole\b|floor.?(standing|console|unit|mounted)|allège|allege|truhe|consola|pavimento/.test(s)) return "console";
  if (/\bduo\b|hose.?in.?hose|dual.?hose|double.?(hose|gaine|tuyau)/.test(s)) return "portable_duo";
  if (/u.?shaped|saddle|\bmidea u\b|\bmaw\d+v/.test(s)) return "window";
  if (/easy.?cool|window.?box|box.?window|through.?the.?wall|\bmaw\d/.test(s)) return "window_box";
  if (/window|fen[eê]tre/.test(s)) return "window";
  if (/portable|mobile|monobloc|move|\bmap\d/.test(s)) return "portable";
  return "split";
};

CA_ART.aircon = {
  variants: ["split", "portable", "window", "portasplit", "breezeless", "console", "window_box", "portable_duo"],
  guess: caAirconVariant,
  render: (variant, s) => {
    const swing = String(s.swing || "off").toLowerCase();
    return {
      svg: caAirconArt(variant, s.display || ""),
      cls: [
        `m-${s.mode}`,
        s.active ? "active" : "",
        s.running && /vert|both|3d|all|^on$|^swing$/.test(swing) ? "swing-v" : "",
        s.running && (/hor|both|3d|all/.test(swing) || !/^(off|none)?$/i.test(s.swingH || "")) ? "swing-h" : "",
      ],
    };
  },
  styles: `
    .k-aircon .disp { font: 600 6.6px/1 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: var(--ca-color); }
    .k-aircon .led { fill: #9aa5b1; }
    .k-aircon .c-stop { stop-color: var(--ca-color); }
    .k-aircon .floor { opacity: 0; transition: opacity .6s; }
    .k-aircon .air { fill: none; stroke: var(--ca-color); stroke-width: 1.8; stroke-linecap: round; }
    .k-aircon .flakes { fill: none; stroke: var(--ca-color); stroke-width: 1; stroke-linecap: round; }
    .k-aircon .drops { fill: var(--ca-color); }
    .k-aircon .heat { fill: none; stroke: var(--ca-color); stroke-width: 1.3; stroke-linecap: round; }
    .k-aircon .air path, .k-aircon .flakes path, .k-aircon .drops path, .k-aircon .heat path { opacity: 0; transform-box: view-box; }
    .k-aircon .flakes, .k-aircon .drops, .k-aircon .heat { display: none; }
    .k-aircon.m-cool .flakes, .k-aircon.m-dry .drops, .k-aircon.m-heat .heat { display: inline; }
    .k-aircon .flap { transform-box: fill-box; transform-origin: 50% 0; }
    .k-aircon .air { transform-box: fill-box; transform-origin: 50% 0; }
    .k-aircon .ofan { transform-box: fill-box; transform-origin: center; }
    .k-aircon.running .floor { opacity: 1; }
    .k-aircon.running .led { fill: var(--ca-color); }
    .k-aircon.running.active .led { animation: ca-blink 2s ease-in-out infinite; }
    .k-aircon.running .air path { animation: ca-fall 2.4s ease-in infinite; }
    .k-aircon.running .air path:nth-child(2) { animation-delay: .8s; }
    .k-aircon.running .air path:nth-child(3) { animation-delay: 1.6s; }
    .k-aircon.running:not(.active) .air path { animation-duration: 4.2s; }
    .k-aircon.running .flakes path, .k-aircon.running .drops path { animation: ca-fall 3s linear infinite; }
    .k-aircon.running .heat path { animation: ca-fall 2.6s ease-in-out infinite; }
    .k-aircon.running .flakes path:nth-child(2), .k-aircon.running .drops path:nth-child(2), .k-aircon.running .heat path:nth-child(2) { animation-delay: 1s; }
    .k-aircon.running .flakes path:nth-child(3), .k-aircon.running .drops path:nth-child(3), .k-aircon.running .heat path:nth-child(3) { animation-delay: 2s; }
    .k-aircon.running .up path { animation-name: ca-rise; }
    .k-aircon.running.active .ofan { animation: ca-spin .8s linear infinite; }
    .k-aircon.running.swing-v .flap { animation: ca-flap 3.2s ease-in-out infinite; }
    .k-aircon.running.swing-h .air { animation: ca-sway 4s ease-in-out infinite; }
    @keyframes ca-flap { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(2.3); } }
    @keyframes ca-sway { 0%, 100% { transform: skewX(0); } 25% { transform: skewX(14deg); } 75% { transform: skewX(-14deg); } }
  `,
};

class ClimateAirAirconCard extends CaClimateCard {
  static get kind() {
    return "aircon";
  }

  _roles() {
    return ["indoor_temp", "outdoor_temp", "humidity", "power", "compressor", "filter", "filter_hours", "filter_alert", "filter_reset"];
  }

  _model(r) {
    const c = this._config;
    const { ent, a, mode, on, cur, devCur, range, target } = this._climate(r);
    const freq = this._num(ent.compressor);
    // The compressor (or what the climate entity says it does) tells whether it is actually cooling or heating.
    const action = a.hvac_action;
    const active = on && (freq != null ? freq > 0 : action ? !["idle", "off"].includes(action) : true);
    const swing = String(a.swing_mode || "off").toLowerCase();
    const chips = [];
    const filterState = this._filterState(ent);
    const filterChip = this._filterChip(filterState);
    if (filterChip) chips.push(filterChip);
    if (c.show_sensors) chips.push(...this._sensorChips(ent, ["outdoor_temp", "humidity", ...(on ? ["power"] : [])]));
    const fanMode = on && a.fan_mode ? this._fmtAttr(r.id, "fan_mode", a.fan_mode) : "";
    const preset = on && a.preset_mode && a.preset_mode !== "none" ? this._fmtAttr(r.id, "preset_mode", a.preset_mode) : "";
    return {
      state: on ? mode : "off",
      mode,
      running: on,
      active,
      color: on ? CA_MODE_COLORS[mode] || CA_FAN_COLOR : CA_IDLE,
      statusText: on ? this._fmtState(r.id) : this._t("st_off"),
      sub: preset,
      fanMode,
      cur,
      devCur,
      target,
      range,
      chips,
      filterState,
      display: on ? this._display(mode, target, range) : "",
      swing,
      swingH: a.swing_horizontal_mode,
    };
  }

  _heroLine(m) {
    return (m.fanMode ? caLine("mdi:fan", m.fanMode) : "") + this._filterLine(m.filterState);
  }

  // The options end with the filter reset button, once the filter is to clean or replace.
  _extraOptions(m) {
    return [this._filterResetButton(m.filterState, this._r.ent.filter_reset)];
  }

  // The compact mini card's lines show the mode while it runs.
  _subInBody(m, full) {
    return !full && m.running;
  }

  _miniInfo(m) {
    const lines = [this._tempLine(m)];
    if (m.running && (m.fanMode || m.sub)) lines.push(caLine("mdi:fan", [m.fanMode, m.sub].filter(Boolean).join(" · ")));
    const out = this._config.show_sensors ? this._fmtSensor(this._r.ent.outdoor_temp) : null;
    if (out) lines.push(caLine("mdi:home-thermometer-outline", `${this._t("outdoor")} ${out}`));
    lines.push(this._filterLine(m.filterState));
    return lines.join("");
  }
}

class ClimateAirAirconMiniCard extends caMini(ClimateAirAirconCard) {}

caRegister(
  "climate-air-aircon-card",
  ClimateAirAirconCard,
  "Climate Air · Air Conditioner Card",
  "Air conditioner with mode, target temperature, fan and swing, and animated illustration",
);
caRegister(
  "climate-air-aircon-mini-card",
  ClimateAirAirconMiniCard,
  "Climate Air · Air Conditioner Mini Card",
  "Compact air conditioner card that unfolds into the full card",
);
