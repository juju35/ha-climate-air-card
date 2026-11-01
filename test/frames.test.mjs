// The GIF recorder's frame stepping (scripts/screenshots/frames.mjs), on a stand-in document: the cards draw in
// shadow roots, whose animations document.getAnimations() does not list in Chromium.
import assert from "node:assert/strict";
import test from "node:test";
import { seekAnimations } from "../scripts/screenshots/frames.mjs";

const anim = () => ({ paused: false, currentTime: null, pause() { this.paused = true; } });
// A node whose shadow root holds `anims` and, optionally, nested elements with shadow roots of their own.
const host = (anims, children = []) => ({
  shadowRoot: { getAnimations: () => anims, querySelectorAll: () => children },
});

const withDocument = (doc, fn) => {
  const prev = globalThis.document;
  globalThis.document = doc;
  try {
    return fn();
  } finally {
    if (prev === undefined) delete globalThis.document;
    else globalThis.document = prev;
  }
};

test("seekAnimations pauses and seeks the animations of the card's shadow root and of nested cards", () => {
  const own = [anim(), anim()];
  const nested = [anim()];
  const card = host(own, [host(nested), { shadowRoot: null }]);
  const doc = { getAnimations: () => [], querySelectorAll: () => [card, { shadowRoot: null }] };
  const n = withDocument(doc, () => seekAnimations(150));
  assert.equal(n, 3);
  for (const a of [...own, ...nested]) {
    assert.equal(a.paused, true);
    assert.equal(a.currentTime, 150);
  }
});

test("seekAnimations also seeks the document's own animations, once each", () => {
  const shared = anim();
  const card = host([shared]);
  const doc = { getAnimations: () => [shared, anim()], querySelectorAll: () => [card] };
  assert.equal(withDocument(doc, () => seekAnimations(50)), 2);
});

test("seekAnimations throws when there is nothing to step, instead of recording a real-time GIF", () => {
  const doc = { getAnimations: () => [], querySelectorAll: () => [host([])] };
  assert.throws(() => withDocument(doc, () => seekAnimations(0)), /no animation/i);
});
