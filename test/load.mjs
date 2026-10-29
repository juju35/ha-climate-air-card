// Evaluates src/shared.js and the cards in a sandbox with minimal DOM stand-ins, the way scripts/build.mjs
// concatenates them, and returns the names the tests need. No dependency, no browser.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../src/", import.meta.url);
const read = (name) => readFileSync(new URL(`${name}.js`, root), "utf8");

// Shadow root / element stand-in: enough for the cards' render and event wiring. querySelector hands back one
// stand-in per selector, so a test can read what the card wrote into it; an empty root has no <ha-card> yet.
export const fakeNode = () => {
  const parts = new Map();
  const listeners = new Map();
  return {
    innerHTML: "",
    hidden: false,
    style: { setProperty() {} },
    children: [],
    className: "",
    activeElement: null,
    classList: { add() {}, remove() {}, toggle() {} },
    querySelector(sel) {
      if (!this.innerHTML && sel === "ha-card") return null;
      if (!parts.has(sel)) parts.set(sel, fakeNode());
      return parts.get(sel);
    },
    querySelectorAll() {
      return [];
    },
    addEventListener(type, fn) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(fn);
    },
    // Test helper: runs the listeners of `type` the card added, like the browser dispatching that event.
    emit(type, ev = {}) {
      for (const fn of listeners.get(type) || []) fn(ev);
    },
    appendChild(el) {
      this.children.push(el);
    },
  };
};

export const CARDS = ["climate-air-purifier-card", "climate-air-fan-card", "climate-air-aircon-card", "climate-air-overview-card"];

export const load = () => {
  const registry = new Map();
  class HTMLElement {
    constructor() {
      this.style = {};
    }
    attachShadow() {
      this.shadowRoot = fakeNode();
      return this.shadowRoot;
    }
    appendChild() {}
    dispatchEvent() {}
  }
  const sandbox = {
    HTMLElement,
    CustomEvent: class {},
    console: { info() {} },
    customElements: { get: (t) => registry.get(t), define: (t, c) => registry.set(t, c) },
    document: {
      createElement: (t) => (registry.has(t) ? new (registry.get(t))() : fakeNode()),
      addEventListener() {},
      removeEventListener() {},
    },
    setTimeout: (...args) => globalThis.setTimeout(...args),
    clearTimeout: (id) => globalThis.clearTimeout(id),
  };
  sandbox.window = sandbox;
  const ctx = vm.createContext(sandbox);
  const code = [read("shared"), ...CARDS.map((c) => `{\n${read(c)}}\n`)].join("\n");
  const tags = [...CARDS, "climate-air-purifier-mini-card", "climate-air-fan-mini-card", "climate-air-aircon-mini-card"];
  return vm.runInContext(
    `${code}
    ({ CA_I18N, CA_VALUES, caT, caLang, caValueLabel, caKindOf, caFindEntities, caFindRole, caDeviceEntities, caAirQuality, caSpin, caName, caCleanConfig, caVariant, CA_PRESET_ICON,
       customElements, window, cards: Object.fromEntries(${JSON.stringify(tags)}.map((t) => [t, customElements.get(t)])) })`,
    ctx,
  );
};

// A card of `tag` set up with `config` and `hass`, rendered once.
export const mount = (lib, tag, config, hass) => {
  const el = new lib.cards[tag]();
  el.setConfig({ type: `custom:${tag}`, ...config });
  el.hass = hass;
  return el;
};
