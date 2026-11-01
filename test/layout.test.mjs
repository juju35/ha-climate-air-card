// Narrow widths (6 columns of the Sections view, about 160 to 250 px): the header keeps its title readable and its
// buttons inside the card, and the mini cards keep their main line readable. No browser in these tests: they check
// the CSS rules and the markup the cards render (the rendered measurements are in the pull request).
import assert from "node:assert/strict";
import { test } from "node:test";
import { makeHass } from "./hass.mjs";
import { load, mount } from "./load.mjs";

const lib = load();

// The CSS of a rendered card as { cond, sel, decl } rules: `cond` is the enclosing @container / @media prelude, if any.
const rules = (el) => {
  const css = [...el.shadowRoot.innerHTML.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n").replace(/\/\*[\s\S]*?\*\//g, "");
  const out = [];
  const walk = (src, cond) => {
    let i = 0;
    while (i < src.length) {
      const open = src.indexOf("{", i);
      if (open < 0) break;
      const prelude = src.slice(i, open).trim();
      let depth = 1;
      let j = open + 1;
      while (depth && j < src.length) {
        if (src[j] === "{") depth++;
        else if (src[j] === "}") depth--;
        j++;
      }
      const body = src.slice(open + 1, j - 1);
      if (prelude.startsWith("@container") || prelude.startsWith("@media")) walk(body, prelude);
      else if (!prelude.startsWith("@keyframes")) {
        const decl = Object.fromEntries(
          body
            .split(";")
            .map((d) => d.trim())
            .filter(Boolean)
            .map((d) => [d.slice(0, d.indexOf(":")).trim(), d.slice(d.indexOf(":") + 1).trim()]),
        );
        for (const sel of prelude.split(",").map((s) => s.trim())) out.push({ cond, sel, decl });
      }
      i = j;
    }
  };
  walk(css, "");
  return out;
};

// The declarations of `sel` outside any at-rule (or inside the at-rules matching `cond`), later rules winning.
const decl = (rs, sel, cond = "") =>
  Object.assign({}, ...rs.filter((r) => r.sel === sel && (cond ? cond.test(r.cond) : !r.cond)).map((r) => r.decl));
const maxWidth = (cond) => Number(/max-width:\s*(\d+)px/.exec(cond)?.[1]);

const DEVICES = [
  ["climate-air-purifier", "fan.living_room_purifier_air_purifier"],
  ["climate-air-fan", "fan.bedroom_fan_fan"],
  ["climate-air-aircon", "climate.air_conditioner"],
];
// The mock home has English and French labels: other languages are forced with the cards' `language` option.
const cards = (language = "en", changes = {}) =>
  DEVICES.flatMap(([kind, entity]) => [
    [`${kind}-card`, mount(lib, `${kind}-card`, { entity, language }, makeHass("en", changes))],
    [`${kind}-mini-card`, mount(lib, `${kind}-mini-card`, { entity, language }, makeHass("en", changes))],
  ]);
const overview = (language = "en") => mount(lib, "climate-air-overview-card", { language }, makeHass("en"));

test("device cards: the status pill shrinks and truncates instead of crushing the title", () => {
  for (const [tag, el] of cards()) {
    const rs = rules(el);
    const st = decl(rs, ".st");
    assert.equal(st.flex, "0 1 auto", `${tag} .st flex`);
    assert.equal(st["min-width"], "0", `${tag} .st min-width`);
    assert.equal(st["max-width"], "50%", `${tag} .st max-width`);
    assert.equal(st.overflow, "hidden", `${tag} .st overflow`);
    const stt = decl(rs, ".stt");
    assert.equal(stt["text-overflow"], "ellipsis", `${tag} .stt ellipsis`);
    assert.equal(stt["white-space"], "nowrap", `${tag} .stt nowrap`);
    const titles = decl(rs, ".titles");
    // A zero basis: the pill gets its whole label first, the title takes what is left (but keeps a few characters).
    assert.equal(titles.flex, "1 1 0", `${tag} .titles flex`);
    assert.match(titles["min-width"] || "", /^\d+(\.\d+)?ch$/, `${tag} .titles keeps a few characters`);
    for (const btn of [".badge", ".power", ".zoom", ".round"]) assert.equal(decl(rs, btn).flex, "none", `${tag} ${btn} never shrinks`);
    assert.equal(decl(rs, "ha-card")["container-type"], "inline-size", `${tag} ha-card is a size container`);
  }
});

test("overview: the pill shrinks and truncates instead of crushing the title, buttons never shrink", () => {
  const rs = rules(overview());
  const pill = decl(rs, ".pill");
  assert.equal(pill.flex, "0 1 auto");
  assert.equal(pill["min-width"], "0");
  assert.equal(pill["max-width"], "50%");
  assert.equal(pill.overflow, "hidden");
  assert.equal(decl(rs, ".pill .stt")["text-overflow"], "ellipsis");
  const title = decl(rs, ".title");
  assert.equal(title.flex, "1 1 0");
  assert.match(title["min-width"], /^\d+(\.\d+)?ch$/);
  for (const btn of [".badge", ".zoom"]) assert.equal(decl(rs, btn).flex, "none", btn);
});

// Below a width, the pill keeps only its coloured dot: its text is hidden visually but stays for screen readers
// (clipped, not display: none) and in the pill's tooltip.
const assertDotOnly = (rs, stt, label) => {
  const narrow = rs.filter((r) => r.sel === stt && /^@container/.test(r.cond) && r.decl.position === "absolute");
  assert.equal(narrow.length, 1, `${label}: one narrow rule clips the pill text`);
  assert.ok(maxWidth(narrow[0].cond) >= 260, `${label}: dot only from ${maxWidth(narrow[0].cond)}px`);
  assert.notEqual(narrow[0].decl.display, "none", `${label}: text kept for screen readers`);
  assert.match(narrow[0].decl["clip-path"] || narrow[0].decl.clip || "", /inset|rect/, `${label}: text clipped`);
};

test("narrow cards: the pill shows only its dot, with the status in its tooltip", () => {
  for (const [tag, el] of cards("pl")) {
    assertDotOnly(rules(el), ".stt", tag);
    const out = el.shadowRoot.innerHTML;
    const pill = /<span class="st" title="([^"]+)"><span class="dot"><\/span><span class="stt">([^<]+)<\/span><\/span>/.exec(out);
    assert.ok(pill, `${tag}: pill markup`);
    assert.equal(pill[1], pill[2], `${tag}: tooltip = status`);
  }
  const ov = overview("pl");
  assertDotOnly(rules(ov), ".pill .stt", "overview");
  const head = ov.shadowRoot.querySelector("ha-card").querySelector(".head").innerHTML;
  const pill = /<div class="pill" title="([^"]+)"><span class="dot"><\/span><span class="stt">([^<]+)<\/span><\/div>/.exec(head);
  assert.ok(pill, "overview pill markup");
  assert.equal(pill[1], pill[2]);
});

test("unavailable device: the narrow pill still carries the translated status", () => {
  for (const [tag, el] of cards("pl", {
    "fan.living_room_purifier_air_purifier": { state: "unavailable" },
    "fan.bedroom_fan_fan": { state: "unavailable" },
    "climate.air_conditioner": { state: "unavailable" },
  })) {
    const out = el.shadowRoot.innerHTML;
    assert.match(out, /<span class="st" title="Niedostępne"><span class="dot"><\/span><span class="stt">Niedostępne<\/span>/, tag);
    assert.doesNotMatch(out, /data-action="power"/, `${tag}: no power button`);
  }
});

test("narrow mini cards: the controls move under the info, which keeps the card's width", () => {
  for (const [tag, el] of cards()) {
    if (!tag.endsWith("-mini-card")) continue;
    const rs = rules(el);
    const wrap = rs.find((r) => r.sel === "ha-card.mini .content" && /^@container/.test(r.cond));
    assert.ok(wrap, `${tag}: narrow rule on the mini content`);
    assert.equal(wrap.decl["flex-wrap"], "wrap", tag);
    assert.ok(maxWidth(wrap.cond) >= 300, `${tag}: wraps from ${maxWidth(wrap.cond)}px`);
    const info = decl(rs, "ha-card.mini .info", new RegExp(wrap.cond.replace(/[()]/g, "\\$&")));
    assert.match(info.flex || "", /calc\(100% - /, `${tag}: the info takes the whole line next to the picture`);
    const ctrls = decl(rs, "ha-card.mini .mcontrols", new RegExp(wrap.cond.replace(/[()]/g, "\\$&")));
    assert.equal(ctrls["flex-basis"], "100%", `${tag}: the controls get a line of their own`);
  }
});

test("wide cards keep their layout: the narrow rules only apply inside container queries", () => {
  for (const [tag, el] of cards()) {
    const rs = rules(el);
    assert.equal(decl(rs, ".stt").position, undefined, `${tag}: pill text visible by default`);
    assert.equal(decl(rs, ".content")["flex-wrap"], undefined, `${tag}: mini content on one line by default`);
    assert.notEqual(decl(rs, ".badge").display, "none", `${tag}: badge shown by default`);
  }
});

test("narrow air conditioner: the target stepper tightens so its buttons stay inside the card", () => {
  const rs = rules(mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass()));
  const gap = (cond) => Number.parseFloat(decl(rs, ".stepper", cond).gap);
  const narrow = rs.filter((r) => r.sel === ".stepper" && /^@container/.test(r.cond)).map((r) => maxWidth(r.cond));
  // 44 px buttons and a 96 px value need 220 px with 18 px gaps: more than the 176 px inside a 200 px card.
  assert.equal(gap(), 18);
  assert.ok(narrow.some((w) => w >= 176), `a rule applies at 176 px (got ${narrow})`);
  const at176 = new RegExp(`max-width: (${narrow.filter((w) => w >= 176).join("|")})px`);
  assert.ok(gap(at176) <= 8);
  assert.equal(decl(rs, ".tv", at176)["min-width"], "0");
  // The widest the stepper can be in a 160 px card (136 px inside): 36 + 4 + value + 4 + 36.
  const at136 = new RegExp(`max-width: (${narrow.filter((w) => w >= 136 && w <= 180).join("|")})px`);
  assert.equal(decl(rs, ".stepper .round", at136).width, "36px");
});

// A size container (container-type: inline-size) has no content width: in an inline-block or a grid's auto column
// the card fell to 26 px. An intrinsic width stands in for the content, and the host's min-width: 0 still lets the
// card shrink in a 1fr grid column (layout-card, grid card, horizontal stack) instead of overflowing it.
test("size containers keep a width in shrink-to-fit parents and still shrink in 1fr columns", () => {
  const all = [...cards(), ["climate-air-overview-card", overview()]];
  for (const [tag, el] of all) {
    const rs = rules(el);
    const card = decl(rs, "ha-card");
    assert.equal(card["container-type"], "inline-size", tag);
    assert.match(card["contain-intrinsic-inline-size"] || "", /^(auto )?([2-9]\d\d)px$/, `${tag}: intrinsic width`);
    const host = decl(rs, ":host");
    assert.equal(host["min-width"], "0", `${tag}: the host can shrink below the intrinsic width`);
  }
});

// 5 modes in a 156 px card (6 columns of a 320 px section): the unselected modes are 36 px icons that do not shrink,
// so the last one left the card and the selected one was crushed. Below 180 px inside, every segment shares the width.
test("narrow air conditioner: the mode segments share the width instead of leaving the card", () => {
  const el = mount(lib, "climate-air-aircon-card", { entity: "climate.air_conditioner" }, makeHass());
  assert.match(el.shadowRoot.innerHTML, /class="seg short"/, "the modes render as short segments");
  const rs = rules(el);
  assert.equal(decl(rs, ".seg.short").flex, "0 0 auto", "wide card: icons keep their size");
  const narrow = rs.filter((r) => r.sel === ".segments:has(.short) .seg" && /^@container/.test(r.cond));
  assert.equal(narrow.length, 1, "one narrow rule for the segments");
  // The segments overflowed up to a 180 px card: 154 px inside (12 px padding and 1 px border each side).
  assert.ok(maxWidth(narrow[0].cond) >= 160, `segments share the width from ${maxWidth(narrow[0].cond)} px`);
  assert.equal(narrow[0].decl.flex, "1 1 0");
  assert.equal(narrow[0].decl["min-width"], "0");
  const label = decl(rs, ".segments:has(.short) .seg.on span", new RegExp(narrow[0].cond.replace(/[()]/g, "\\$&")));
  assert.equal(label.position, "absolute", "the selected label is clipped");
  assert.match(label["clip-path"] || "", /inset/);
  assert.notEqual(label.display, "none", "still read by screen readers");
});

// At 156 px the info next to the picture had 64 px: « Unavailable » (22 px) left the card and a long chip
// (« Na zewnątrz 31 °C », « Urządzenie offline ») was cut. Below 180 px inside, the info goes under the picture and
// the chips wrap their text.
test("narrow full cards: the info goes under the picture and long chips wrap instead of being cut", () => {
  for (const [tag, el] of cards()) {
    const rs = rules(el);
    assert.equal(decl(rs, ".chips .chip")["white-space"], "normal", `${tag}: chips wrap`);
    assert.equal(decl(rs, ".state-big")["overflow-wrap"], "break-word", `${tag}: a status word never leaves the card`);
    if (tag.endsWith("-mini-card")) continue;
    const narrow = rs.filter((r) => r.sel === "ha-card:not(.mini) .hero" && /^@container/.test(r.cond) && r.decl["flex-wrap"] === "wrap");
    assert.equal(narrow.length, 1, `${tag}: one narrow rule wraps the hero`);
    assert.ok(maxWidth(narrow[0].cond) >= 154, `${tag}: from ${maxWidth(narrow[0].cond)} px`);
    const info = decl(rs, "ha-card:not(.mini) .hero .info", new RegExp(narrow[0].cond.replace(/[()]/g, "\\$&")));
    assert.equal(info["flex-basis"], "100%", `${tag}: the info takes the whole width`);
  }
  // The overview's filter alert, in a 156 px card: « Replace the filter » was cut to « Replace the ».
  const chip = decl(rules(overview()), ".chips .chip");
  assert.equal(chip["white-space"], "normal");
  assert.equal(chip.height, "auto");
});
