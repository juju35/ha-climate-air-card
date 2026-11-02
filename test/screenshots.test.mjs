// The screenshot scripts rewrite a file only when its decoded pixels change (not its bytes). Needs ffmpeg, like the
// scripts themselves: skipped without it.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { samePixels, writeIfChanged } from "../scripts/screenshots/write-if-changed.mjs";

let ffmpeg = true;
try {
  execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
} catch {
  ffmpeg = false;
}
const make = (file, color, extra = []) =>
  execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "lavfi", "-i", `color=${color}:s=8x8`, "-frames:v", "1", ...extra, file]);

test("a screenshot re-encoded with the same pixels is left alone, a changed one is rewritten", { skip: !ffmpeg && "no ffmpeg" }, () => {
  const dir = mkdtempSync(join(tmpdir(), "ca-wic-"));
  try {
    const [a, b, c] = ["a.png", "b.png", "c.png"].map((f) => join(dir, f));
    make(a, "red", ["-compression_level", "0"]);
    make(b, "red", ["-compression_level", "9"]);
    make(c, "blue");
    assert.notDeepEqual(readFileSync(a), readFileSync(b), "different bytes");
    assert.equal(samePixels(a, b), true, "same pixels");
    assert.equal(samePixels(a, c), false);
    assert.equal(samePixels(a, join(dir, "missing.png")), false);
    const before = readFileSync(a);
    assert.equal(writeIfChanged(b, a), false, "same picture: not rewritten");
    assert.deepEqual(readFileSync(a), before);
    assert.equal(writeIfChanged(c, a), true, "new picture: rewritten");
    assert.deepEqual(readFileSync(a), readFileSync(c));
  } finally {
    rmSync(dir, { recursive: true });
  }
});

// The comparison covers every channel: two opaque RGBA screenshots of different colours have the same alpha plane,
// which a comparison of the alpha alone (ImageChops.difference(a, b).getbbox() on RGBA) would call identical.
test("opaque RGBA screenshots of different colours are different pictures", { skip: !ffmpeg && "no ffmpeg" }, () => {
  const dir = mkdtempSync(join(tmpdir(), "ca-wic-"));
  try {
    const [a, b, c] = ["a.png", "b.png", "c.png"].map((f) => join(dir, f));
    for (const [file, color] of [[a, "0x102030"], [b, "0x102031"], [c, "0x102030"]]) make(file, color, ["-pix_fmt", "rgba"]);
    assert.match(execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=pix_fmt", "-of", "csv=p=0", a]).toString(), /rgba/);
    assert.equal(samePixels(a, b), false, "one blue level apart, same alpha: different");
    assert.equal(samePixels(a, c), true);
    assert.equal(writeIfChanged(b, a), true, "rewritten");
    assert.deepEqual(readFileSync(a), readFileSync(b));
  } finally {
    rmSync(dir, { recursive: true });
  }
});

test("the harness writes screenshots through the pixel comparison", () => {
  const src = readFileSync(new URL("../scripts/screenshots/harness.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(src, /page\.screenshot\(\{\s*path: `\$\{root\}/, "PNG written straight over the committed file");
  assert.match(src, /writeBufferIfChanged\(/);
  assert.match(src, /writeIfChanged\(out, `\$\{root\}screenshots\//);
  // The PNGs too are taken with every animation paused at a fixed time (two runs gave different pixels).
  assert.match(src, /page\.evaluate\(seekAnimations, 0\)[\s\S]*?const png = await page\.screenshot/);
});
