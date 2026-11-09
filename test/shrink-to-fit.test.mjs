// Rendered widths of every card in the parents Home Assistant puts cards in: an inline-block (button-card), a grid's
// auto column, and a 1fr 1fr grid (layout-card, grid card, horizontal stack), the card placed directly or wrapped in a
// <div>, at 320, 360 and 500 px. Needs the built card, Playwright and its Chromium: skipped without them (the CI's
// unit tests have no browser; the CSS rules are checked in layout.test.mjs).
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

const CARDS = [
  ["climate-air-purifier-card", { entity: "fan.living_room_purifier_air_purifier" }],
  ["climate-air-purifier-mini-card", { entity: "fan.living_room_purifier_air_purifier" }],
  ["climate-air-fan-card", { entity: "fan.bedroom_fan_fan" }],
  ["climate-air-fan-mini-card", { entity: "fan.bedroom_fan_fan" }],
  ["climate-air-aircon-card", { entity: "climate.air_conditioner" }],
  ["climate-air-aircon-mini-card", { entity: "climate.air_conditioner" }],
  ["climate-air-thermostat-card", { entity: "climate.bedroom_radiator_valve" }],
  ["climate-air-thermostat-mini-card", { entity: "climate.bedroom_radiator_valve" }],
  ["climate-air-overview-card", {}],
];
const STUBS = `customElements.define("ha-card", class extends HTMLElement { constructor() { super();
  this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block;border:1px solid #ccc;overflow:hidden}</style><slot></slot>"; } });
customElements.define("ha-icon", class extends HTMLElement { connectedCallback() { this.style.display = "inline-flex"; } });`;

// One row per (width, parent, wrapped): the cards' widths and how far the rightmost one passes the parent's edge.
const measure = (page, tag, config, hass) =>
  page.evaluate(
    ({ tag, config, hass }) => {
      const make = () => {
        const el = document.createElement(tag);
        el.setConfig({ type: `custom:${tag}`, ...config });
        el.hass = { ...hass, callService: async () => {} };
        return el;
      };
      const PARENTS = {
        "inline-block": "display:inline-block",
        "grid auto": "display:grid;grid-template-columns:auto;gap:8px",
        "grid 1fr 1fr": "display:grid;grid-template-columns:1fr 1fr;gap:8px",
      };
      const cases = [];
      for (const width of [320, 360, 500])
        for (const [parent, css] of Object.entries(PARENTS))
          for (const wrapped of [false, true]) {
            const box = document.createElement("div");
            box.style.width = `${width}px`;
            const p = document.createElement("div");
            p.style.cssText = css;
            const els = parent === "grid 1fr 1fr" ? [make(), make()] : [make()];
            for (const el of els) {
              if (!wrapped) p.appendChild(el);
              else p.appendChild(document.createElement("div")).appendChild(el);
            }
            box.appendChild(p);
            document.body.appendChild(box);
            cases.push({ width, parent, wrapped, box, els });
          }
      return new Promise((resolve) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            resolve(
              cases.map(({ width, parent, wrapped, box, els }) => ({
                width,
                parent,
                wrapped,
                widths: els.map((el) => el.getBoundingClientRect().width),
                overflow: Math.max(...els.map((el) => el.getBoundingClientRect().right)) - box.getBoundingClientRect().right,
              })),
            ),
          ),
        ),
      );
    },
    { tag, config, hass },
  );

test("every card fits inline-block, auto and 1fr 1fr parents, placed directly or in a div", { skip: !browser && "no browser" }, async () => {
  try {
    const js = readFileSync(dist, "utf8");
    for (const [tag, config] of CARDS) {
      const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
      await page.setContent("<!doctype html><body style='margin:0'></body>");
      await page.addScriptTag({ content: STUBS });
      await page.addScriptTag({ content: js });
      for (const r of await measure(page, tag, config, mockHass("en"))) {
        const where = `${tag} in ${r.parent}${r.wrapped ? " (in a div)" : ""} at ${r.width} px`;
        assert.ok(r.overflow <= 0.5, `${where}: overflows by ${r.overflow} px (widths ${r.widths})`);
        const expected = r.parent === "grid 1fr 1fr" ? (r.width - 8) / 2 : r.parent === "grid auto" ? r.width : Math.min(300, r.width);
        for (const w of r.widths) assert.ok(Math.abs(w - expected) <= 0.5, `${where}: ${w} px wide, ${expected} expected`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
