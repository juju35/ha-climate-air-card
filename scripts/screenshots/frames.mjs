// Runs in the page (page.evaluate): pauses every animation and moves it to `t` ms, so each GIF frame is drawn at a
// fixed time whatever the machine's speed. Self-contained: Playwright sends its source to the page.
// The cards draw in shadow roots, whose animations document.getAnimations() does not list in Chromium: walk every
// shadow root (the overview's open device is a card in a card). Throws when nothing was found, rather than letting
// the GIF be recorded in real time.
export function seekAnimations(t) {
  const anims = new Set(document.getAnimations());
  const walk = (root) => {
    for (const el of root.querySelectorAll("*")) {
      if (!el.shadowRoot) continue;
      for (const a of el.shadowRoot.getAnimations()) anims.add(a);
      walk(el.shadowRoot);
    }
  };
  walk(document);
  if (!anims.size) throw new Error("seekAnimations: no animation to step — the GIF would be recorded in real time");
  for (const a of anims) {
    a.pause();
    a.currentTime = t;
  }
  return anims.size;
}
