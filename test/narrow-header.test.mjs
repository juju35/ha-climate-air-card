// Rendered narrow headers and tiles, in en, pl, sr-Latn, bg, el and ru: the overview's filter alert wraps between words, never
// inside one, and a status pill shows its whole label, or only its dot when that label really does not fit. Needs the
// built card, Playwright and its Chromium: skipped without them (the CSS rules are checked in layout.test.mjs).
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const dist = new URL("../dist/ha-climate-air-card.js", import.meta.url);
let chromium = null;
let mockHass = null;
try {
  ({ chromium } = await import("playwright"));
  ({ mockHass } = await import("../scripts/screenshots/mock.mjs"));
} catch {}
let browser = null;
if (chromium && existsSync(dist)) browser = await chromium.launch().catch(() => null);

const LANGS = ["en", "pl", "sr-Latn", "bg", "el", "ru"];
const UNAVAILABLE = {
  "fan.living_room_purifier_air_purifier": { state: "unavailable" },
  "fan.bedroom_purifier": { state: "unavailable" },
  "fan.bedroom_fan_fan": { state: "unavailable" },
  "climate.air_conditioner": { state: "unavailable" },
};
const CARDS = [
  ["climate-air-purifier-card", { entity: "fan.living_room_purifier_air_purifier" }],
  ["climate-air-purifier-card", { entity: "fan.bedroom_purifier" }],
  ["climate-air-purifier-mini-card", { entity: "fan.living_room_purifier_air_purifier" }],
  ["climate-air-fan-card", { entity: "fan.bedroom_fan_fan" }],
  ["climate-air-fan-mini-card", { entity: "fan.bedroom_fan_fan" }],
  ["climate-air-aircon-card", { entity: "climate.air_conditioner" }],
  ["climate-air-aircon-mini-card", { entity: "climate.air_conditioner" }],
  ["climate-air-overview-card", {}],
];
const STUBS = `customElements.define("ha-card", class extends HTMLElement { constructor() { super();
  this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block;border:1px solid #ccc;overflow:hidden}</style><slot></slot>"; } });
customElements.define("ha-icon", class extends HTMLElement { connectedCallback() { this.style.display = "inline-flex";
  this.innerHTML = '<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px)"></svg>'; } });`;

const open = async () => {
  const page = await browser.newPage();
  await page.setContent('<body style="margin:0;padding:16px;font-family:Roboto,Arial"><div id="root"></div></body>');
  await page.addScriptTag({ content: STUBS });
  await page.addScriptTag({ content: readFileSync(dist, "utf8") });
  return page;
};

// Mounts `tag` in a `width` px column and waits two frames (the resize observer runs before the second paint).
const mount = (page, tag, config, hass, width, dark = false) =>
  page.evaluate(
    async ({ tag, config, hass, width, dark }) => {
      document.body.style.background = dark ? "#111" : "#fafafa";
      document.body.style.setProperty("--card-background-color", dark ? "#1c1c1c" : "#fff");
      const root = document.getElementById("root");
      root.innerHTML = "";
      root.style.width = `${width}px`;
      const el = document.createElement(tag);
      el.setConfig({ type: `custom:${tag}`, ...config });
      el.hass = { ...hass, themes: { darkMode: dark }, callService: async () => {} };
      root.appendChild(el);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      window.__el = el;
    },
    { tag, config, hass, width, dark },
  );

test("overview: at phone widths the filter alert wraps between words, never inside one", { skip: !browser && "no browser" }, async () => {
  const page = await open();
  const bad = [];
  for (const lang of LANGS)
    for (const dark of [false, true])
      for (const width of [156, 160, 178, 200]) {
        await mount(page, "climate-air-overview-card", { language: lang }, mockHass("en"), width, dark);
        const r = await page.evaluate(() => {
          const out = [];
          for (const chip of window.__el.shadowRoot.querySelectorAll(".chips .chip")) {
            const span = chip.querySelector("span");
            const node = span.firstChild;
            const text = node.textContent;
            const tops = [...text].map((_, i) => {
              const rg = document.createRange();
              rg.setStart(node, i);
              rg.setEnd(node, i + 1);
              return Math.round(rg.getClientRects()[0]?.top ?? Number.NaN);
            });
            const midWord = tops.some((t, i) => i && t > tops[i - 1] + 2 && /\S/.test(text[i]) && /\S/.test(text[i - 1]));
            const clipped = span.scrollWidth > span.clientWidth + 1 || chip.scrollWidth > chip.clientWidth + 1;
            const tile = chip.closest(".dev").getBoundingClientRect();
            const c = chip.getBoundingClientRect();
            out.push({ text, midWord, clipped, outside: c.left < tile.left - 0.5 || c.right > tile.right + 0.5 });
          }
          return out;
        });
        assert.ok(r.length, `${lang} ${width}: the mock home has a filter alert`);
        for (const x of r) if (x.midWord || x.clipped || x.outside) bad.push(`${lang} ${dark ? "dark" : "light"} ${width}px « ${x.text} » ${JSON.stringify(x)}`);
      }
  await page.close();
  assert.deepEqual(bad, []);
});

test("status pills: the whole label, or only the dot when the label really does not fit", { skip: !browser && "no browser" }, async () => {
  const page = await open();
  const bad = [];
  const labelAt245 = { shown: 0, total: 0 };
  for (const [tag, config] of CARDS)
    for (const lang of LANGS)
      for (const unavailable of [false, true])
        for (const width of [156, 245, 320, 500]) {
          await mount(page, tag, { ...config, language: lang }, mockHass("en", unavailable ? UNAVAILABLE : {}), width, width === 245);
          const r = await page.evaluate(() => {
            const sr = window.__el.shadowRoot;
            const pill = sr.querySelector(".st, .pill");
            const stt = pill.querySelector(".stt");
            const cut = () => stt.scrollWidth > stt.clientWidth + 0.5 || pill.scrollWidth > pill.clientWidth + 0.5;
            const shown = stt.getBoundingClientRect().width > 1;
            const state = { label: stt.textContent, shown, cut: shown && cut(), dotOnly: pill.classList.contains("dot-only") };
            // Dot only: it must be needed, i.e. the label truncates once the pill gets it back.
            if (!shown && state.dotOnly) {
              pill.classList.remove("dot-only");
              state.neededDot = cut();
              pill.classList.add("dot-only");
            }
            const card = sr.querySelector("ha-card").getBoundingClientRect();
            const p = pill.getBoundingClientRect();
            state.outside = p.left < card.left - 0.5 || p.right > card.right + 0.5;
            return state;
          });
          const where = `${tag} ${config.entity || ""} ${lang} ${unavailable ? "unavailable" : "normal"} ${width}px « ${r.label} »`;
          if (r.outside) bad.push(`${where}: pill outside the card`);
          if (r.shown && r.cut) bad.push(`${where}: label truncated`);
          if (!r.shown && !r.neededDot) bad.push(`${where}: only the dot although the label fits`);
          if (width === 245) {
            labelAt245.total++;
            if (r.shown) labelAt245.shown++;
          }
        }
  await page.close();
  assert.deepEqual(bad, []);
  assert.ok(labelAt245.shown > 0, `at 245 px some pills show their label (${labelAt245.shown}/${labelAt245.total})`);
});

test.after(() => browser?.close());
