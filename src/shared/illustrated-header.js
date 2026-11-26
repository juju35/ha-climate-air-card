// ── Illustrated header ───────────────────────────────────────────────────────
// The header of the device cards (full and mini): a 90 px banner, the round icon, the name and the status on the
// left, and on the right the room the device stands in, drawn by the kind of device, with the card's own illustration
// of the device in front of it and a 10 px floor strip edge to edge at the bottom. The room shows what the device does
// while it runs: cold air under the wall unit and the sun at the window (air conditioner), particles drawn into the
// purifier and clean air leaving it, the breeze of a fan, mist above a humidifier; a heat pump stands outdoors,
// against the façade, on the lawn. Night (Home Assistant's dark theme, unless `illustration_theme` forces
// day or night) dims the room. `illustration: false` keeps the classic header.
import { caEsc } from "./i18n-helpers.js";
import { caDeviceOf } from "./device-discovery.js";
import { CA_ART } from "./illustrations.js";
import { caIsDehumidifier } from "./humidifiers.js";

// The brand logos, by slug (images/badge/<slug>.png). The build lists the slugs here (`slug: true`) and writes each
// logo to its own file next to the bundle, ha-climate-air-card.brand.<slug>.js (scripts/build.mjs): the first card
// showing a brand fetches its logo, then every card waiting for it is drawn again. A data URI string is a logo in
// hand (fetched, or given inline); "" a logo that could not be had (no badge).
export const CA_BRAND_LOGOS = {} /* __BRAND_LOGOS__ */;
export const caBrandLoads = {};
export const caBrandWaiting = new Set();
// The bundle's URL, read while it runs (document.currentScript is only set then), else from the resources loaded.
export const caBundleUrl = (() => {
  const re = /\/ha-climate-air-card\.js(\?|$)/;
  let url;
  return () => {
    if (url !== undefined) return url;
    url = null;
    try {
      const src = document.currentScript?.src;
      if (src && re.test(src)) url = src;
      const entries = url ? [] : performance.getEntriesByType("resource");
      for (let i = entries.length - 1; i >= 0 && !url; i--) if (re.test(entries[i].name)) url = entries[i].name;
      if (!url) for (const s of document.querySelectorAll("script[src]")) if (re.test(s.src)) url = s.src;
    } catch (_err) {
      /* no DOM */
    }
    return url;
  };
})();
caBundleUrl();
// The logo of `slug`, or "" while it loads (`card` is then drawn again once it is in) or when there is none.
export function caBrandLogo(slug, card) {
  const logo = slug ? CA_BRAND_LOGOS[slug] : undefined;
  if (typeof logo === "string") return logo;
  if (logo !== true) return "";
  if (card) caBrandWaiting.add(card);
  if (!caBrandLoads[slug]) {
    const base = caBundleUrl();
    const done = () => {
      const cards = [...caBrandWaiting];
      caBrandWaiting.clear();
      for (const c of cards) {
        c._sig = null;
        c._update?.();
      }
    };
    if (!base) {
      // Bundle injected as content: no file to fetch, no badge.
      CA_BRAND_LOGOS[slug] = "";
      return "";
    }
    caBrandLoads[slug] = import(new URL(`ha-climate-air-card.brand.${slug}.js?v=__VERSION__`, base).href)
      .then(
        (m) => {
          CA_BRAND_LOGOS[slug] = typeof m.default === "string" && m.default.startsWith("data:image/") ? m.default : "";
        },
        (err) => {
          CA_BRAND_LOGOS[slug] = "";
          console.warn(`ha-climate-air-card: "${slug}" brand logo not loaded (${err?.message ?? err})`);
        },
      )
      .then(done);
  }
  return "";
}

// A number per card instance, for the ids of its banner's SVG.

// The brand of a device: its manufacturer first (a VOCOlinc diffuser through HomeKit shows VOCOlinc), else the
// integration it comes from. `brand` in YAML picks a slug, or hides the badge with `none`.
export const CA_BRAND_MAKERS = [
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
  [/big ?ass/i, "baf"],
  [/olibra|\bbond\b/i, "bond"],
  [/modern ?forms/i, "modern_forms"],
  [/switch\s?bot|wonderlabs/i, "switchbot"],
];
export const CA_BRAND_PLATFORMS = { homekit_controller: "homekit", aquarea: "panasonic", overkiz: "cozytouch", rituals_perfume_genie: "rituals", switchbot_cloud: "switchbot" };
export function caBrand(hass, id, config) {
  if (config.brand) return config.brand === "none" ? "" : String(config.brand);
  const maker = hass.devices?.[caDeviceOf(hass, id)]?.manufacturer || "";
  const hit = CA_BRAND_MAKERS.find(([re]) => re.test(maker));
  if (hit) return hit[1];
  const platform = hass.entities?.[id]?.platform || "";
  return CA_BRAND_PLATFORMS[platform] || platform;
}
export const caBrandBadge = (slug, card) => {
  const logo = caBrandLogo(slug, card);
  return logo ? `<span class="brand"><img src="${caEsc(logo)}" alt=""></span>` : "";
};

// Night picture: forced by illustration_theme, else Home Assistant's dark mode alone (a light theme keeps the day
// picture after sunset).
export function caIsNight(hass, config) {
  if (config.illustration_theme === "night") return true;
  if (config.illustration_theme === "day") return false;
  return !!hass?.themes?.darkMode;
}

// The device's outline in its own picture (viewBox units: x, y, width, height), measured once from each drawing: the
// banner crops the picture to it, so the device stands on the floor strip and fills the room's height. Its effects
// (air, mist, breeze) still draw outside it.
export const CA_BANNER_BOX = {
  aircon: {
    split: [2.4, 13.4, 75.2, 32.2],
    portable: [1.5, 2.5, 61.1, 87.1],
    window: [1, 3.6, 71.6, 84.8],
    portasplit: [3.4, 18.1, 73.2, 71.2],
    breezeless: [2.4, 12.4, 75.2, 33.2],
    console: [8.4, 36.4, 63.2, 52],
    window_box: [0, 3.2, 80, 63.2],
    portable_duo: [0.5, 0, 67, 89.6],
  },
  purifier: { tower: [17.9, 6.4, 44.2, 82.2], cylinder: [20.4, 7.9, 39.2, 82.3], box: [11.4, 16.4, 57.2, 72.2], dyson: [23.9, 1.3, 32.2, 87.3] },
  fan: { fan: [13.2, 5.2, 53.6, 86.5], ceiling: [2, 0, 96, 51], tower_fan: [24.5, 6.4, 31, 83.1] },
  humidifier: {
    column: [23.4, 21.4, 33.2, 67.2],
    tank: [7.4, 11.5, 65.2, 75.1],
    evaporative: [11.4, 13.4, 57.2, 75.2],
    vocolinc: [27.9, 16.9, 24.2, 71.7],
    diffuser: [11.8, 3.5, 56.4, 85.1],
    rituals: [10.8, 17.8, 58.5, 68.6],
    rituals_black: [10.8, 17.8, 58.5, 68.6],
    dehumidifier: [15.4, 9.4, 49.2, 79.2],
    dehumidifier_midea: [15.4, 11.4, 49.2, 78.4],
    dehumidifier_cube: [12.4, 12.4, 55.2, 76.1],
  },
  heatpump: { air: [0, 5.4, 116.7, 83.2] },
  ventilation: { mvhr: [4, 2, 72, 74], extract: [12, 4, 56, 70] },
};

// Where the device stands in the 200 × 80 room: a wall unit high on the wall, everything else on the floor (y 80),
// as big as the room allows. Returns its box { x, y, w, h } and the crop of its picture.
// `slot` ({ cx, maxW, maxH, wallH, wallY }) places it elsewhere, smaller: the overview's room holds several devices.
export function caBannerPlace(kind, variant, slot) {
  const boxes = CA_BANNER_BOX[kind] || {};
  const vb = boxes[variant] || Object.values(boxes)[0] || [0, 0, 80, 94];
  // A ceiling fan hangs from the ceiling (y 0): drawn like a wall unit, high in the room, its light under it.
  const hang = kind === "fan" && variant === "ceiling";
  const wall = (kind === "aircon" && ["split", "breezeless"].includes(variant || "split")) || hang;
  const [maxW, maxH, cx] = slot
    ? [hang ? slot.maxW + 6 : slot.maxW, hang ? 30 : wall ? slot.wallH : slot.maxH, slot.cx]
    : hang
      ? [66, 48, 156]
      : wall
        ? [66, 40, 160]
        : kind === "heatpump"
          ? [86, 70, 154]
          : [76, 72, 160];
  const k = Math.min(maxW / vb[2], maxH / vb[3]);
  const w = vb[2] * k;
  const h = vb[3] * k;
  return { vb, wall, hang, x: cx - w / 2, y: hang ? 0 : wall ? (slot?.wallY ?? 10) : 80 - h, w, h, k };
}

export const caF = (n) => +n.toFixed(1);

// The room behind the device (200 × 80, the device at x ≈ 122–198): the wall and its window, and the effects of the
// running device around it (drawn only while it runs, animated by CA_BANNER_STYLES).
export function caBannerRoom(kind, variant, n, p) {
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
  return `<rect class="b-wall" width="200" height="80"/>${win}<g class="bfx">${caBannerFx(kind, variant, p)}</g>`;
}

// What the running device does in the room (drawn only while it runs): cold air under the wall unit, dust drawn into
// the purifier and clean air leaving it, the breeze of a fan, mist above a humidifier. `dustX` is where the dust starts
// (the left of a 40-unit band). Shared by the device cards' banner and the overview's.
export function caBannerFx(kind, variant, p, dustX = 92) {
  const top = p.y;
  const cx = p.x + p.w / 2;
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
        const x = dustX + ((i * 23) % 40);
        const y = 8 + ((i * 17) % 60);
        return `<circle class="suck s${i % 4}" cx="${x}" cy="${y}" r="1.4" style="--dx:${caF(tx - x)}px;--dy:${caF(ty - y)}px"/>`;
      }).join("") +
      `<g class="clean">${[-5, 0, 5].map((dx, i) => `<path class="cl l${i}" d="M${caF(cx + dx)} ${caF(top - 1)} q-3 -3 0 -6"/>`).join("")}</g>`;
  } else if (kind === "fan" && p.hang) {
    // The breeze a ceiling fan pushes down into the room (drawn rising when it turns the other way, by its CSS).
    const by = top + p.h * 0.6;
    fx = [-0.36, 0, 0.36].map((f, i) => `<path class="bz b${i} down" d="M${caF(cx + f * p.w)} ${caF(by)} q-5 9 0 18 t0 18"/>`).join("");
  } else if (kind === "fan") {
    // The breeze blowing from the fan's head into the room.
    const hy = top + (32 - 5.2) * p.k;
    fx = [-12, 0, 12].map((dy, i) => `<path class="bz b${i}" d="M${caF(p.x - 2)} ${caF(hy + dy)} q-10 -5 -20 0 t-20 0"/>`).join("");
  } else if (kind === "humidifier") {
    if (caIsDehumidifier(variant)) {
      fx = `<g class="clean dry">${[-6, 0, 6].map((dx, i) => `<path class="cl l${i}" d="M${caF(cx + dx)} ${caF(top - 1)} q-3 -3 0 -6"/>`).join("")}</g>`;
    } else {
      fx = [[0, 4, 6], [-7, 8, 4], [7, 9, 5], [-1, 14, 3.5]]
        .map(([dx, dy, r], i) => `<circle class="puff p${i}" cx="${caF(cx + dx)}" cy="${caF(Math.max(r, top - dy))}" r="${r}"/>`)
        .join("");
    }
  }
  return fx;
}

// The banner's picture: the room and, in front of it, the card's illustration of the device (same drawing, classes
// and animations as the classic header's picture), cropped to the device. `uid` keeps the SVG ids of each card apart.
export function caBannerScene(kind, variant, s, n, uid) {
  const art = CA_ART[kind];
  if (!art) return "";
  const p = caBannerPlace(kind, variant);
  return (
    `<svg class="bscene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">` +
    `${caBannerRoom(kind, variant, n, p)}${caBannerDevice(kind, variant, s, p, uid)}</svg>`
  );
}

// The device in the banner's room, placed at `p` (caBannerPlace): its illustration cropped to it, with the classes
// that run its animations.
export function caBannerDevice(kind, variant, s, p, uid) {
  const r = CA_ART[kind].render(variant, s);
  const svg = r.svg
    .replace(/(id="|url\(#)(ca-[a-z0-9]+)/g, `$1$2-b${uid}`)
    .replace(/^<svg\b[^>]*>/, `<svg x="${caF(p.x)}" y="${caF(p.y)}" width="${caF(p.w)}" height="${caF(p.h)}" viewBox="${p.vb.join(" ")}" overflow="visible" aria-hidden="true">`);
  const cls = ["bdev", `k-${kind}`, `st-${s.state || (s.running ? "on" : "off")}`, s.running ? "running" : "", ...(r.cls || []), p.wall ? "wall" : ""];
  return `<g class="${cls.filter(Boolean).join(" ")}"${r.style ? ` style="${r.style}"` : ""}>${svg}</g>`;
}

// The banner's colours per kind of device (the room's wall, day / night); a heat pump has the sky.
export const CA_BANNER_WALL = {
  aircon: ["#e9f3fb", "#1f2a38"],
  purifier: ["#eef4f2", "#22302c"],
  fan: ["#fbf1e2", "#2e2a26"],
  humidifier: ["#eef0f8", "#262a3a"],
  ventilation: ["#eef3f7", "#232b33"],
};

export const CA_BANNER_STYLES = `
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
  /* The status pill (banner and classic header) sits on the title line, right after the title, when the whole title
     and its whole label fit there; otherwise it goes on its own line under the subtitle. It keeps its whole label, or
     only its dot when even that does not fit (caFitPills). Its colour is the round icon's. */
  .titles { container: ca-titles / inline-size; display: flex; flex-direction: column; align-items: flex-start; }
  .titles > * { max-width: 100%; }
  .trow { display: flex; align-items: center; gap: 8px; width: 100%; min-width: 0; }
  .trow .name { flex: 0 1 auto; min-width: 0; }
  .trow .st { flex: none; max-width: none; }
  .titles.pill-below .trow { display: contents; }
  .titles.pill-below .trow .name, .titles.pill-below .trow .st { max-width: 100%; }
  .titles.pill-below .trow .st { order: 3; margin-top: 3px; }
  .banner .st { line-height: 16px; background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--c) 45%, #0d2a45); }
  .banner.night .st { background: color-mix(in srgb, var(--c) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--c) 35%, #ffffff); }
  .banner .zoom { position: absolute; z-index: 2; top: 5px; right: 5px; margin: 0; width: 24px; height: 24px; color: #33506b;
                  background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }
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
  .banner.running .bfx, .bfx.running { display: inline; }
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
  /* Under a ceiling fan the breeze falls into the room, and rises when the fan turns the other way (winter). */
  .bfx .bz.down { animation-name: ca-b-down; }
  .banner:has(.bdev.reverse) .bfx .bz.down { animation-name: ca-b-up; }
  @keyframes ca-b-down { from { transform: translateY(-4px); opacity: .9; } to { transform: translateY(16px); opacity: 0; } }
  @keyframes ca-b-up { from { transform: translateY(16px); opacity: .9; } to { transform: translateY(-4px); opacity: 0; } }
  @keyframes ca-b-puff { from { transform: translateY(10px) scale(.6); opacity: 0; } 40% { opacity: .8; } to { transform: translateY(-8px) scale(1.2); opacity: 0; } }
  /* A wall unit sits high on the wall, and a ventilation unit's ducts rise to the ceiling, under the mini card's
     corner button: the room steps left, at full size, so the button stays clear of it (the banner is the wall's
     colour, the room just continues behind the button). Narrower, the smaller room already clears it. */
  @container (min-width: 301px) {
    .banner:has(> .zoom):has(.bdev.wall, .bdev.k-ventilation) .bscene { right: 28px; }
    .banner:has(> .zoom):has(.bdev.wall, .bdev.k-ventilation) .bhead { right: calc(min(200px, 58%) + 8px); }
  }
  /* Narrow cards (the Sections view's 6 columns): a smaller room, the text gets more of the width. */
  @container (max-width: 300px) { .bscene { width: 48%; } .bhead { right: calc(48% - 26px); gap: 8px; } }
  /* Narrowest cards: the sky alone, the text gets the width. */
  @container (max-width: 200px) { .bscene { display: none; } .bhead { right: 36px; } }
  @media (prefers-reduced-motion: reduce) { .banner, .banner * { animation: none !important; } .bfx .suck, .bfx .cl, .bfx .bz, .bfx .puff, .bfx .ca { opacity: .6; } }
`;
