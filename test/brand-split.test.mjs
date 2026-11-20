// The brand logos stay out of the bundle: it lists their slugs, each logo is its own file next to it
// (scripts/build.mjs), fetched by the first card that shows the brand.
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import test from "node:test";

const dist = new URL("../dist/", import.meta.url);
const badges = new URL("../images/badge/", import.meta.url);
const built = existsSync(new URL("ha-climate-air-card.js", dist));

test("the bundle lists the brand slugs, each logo is in its own file", { skip: !built && "dist not built" }, () => {
  const bundle = readFileSync(new URL("ha-climate-air-card.js", dist), "utf8");
  assert.ok(!bundle.includes("data:image/png;base64,"), "no logo inline in the bundle");
  const slugs = readdirSync(badges)
    .filter((f) => f.endsWith(".png"))
    .map((f) => f.slice(0, -4));
  assert.ok(slugs.length > 10);
  const listed = bundle.match(/const CA_BRAND_LOGOS = (\{[^}]*\});/);
  assert.ok(listed, "CA_BRAND_LOGOS in the bundle");
  assert.deepEqual(Object.keys(JSON.parse(listed[1])).sort(), slugs.sort());
  for (const slug of slugs) {
    const file = readFileSync(new URL(`ha-climate-air-card.brand.${slug}.js`, dist), "utf8");
    const uri = `data:image/png;base64,${readFileSync(new URL(`${slug}.png`, badges)).toString("base64")}`;
    assert.ok(file.includes(`export default ${JSON.stringify(uri)};`), `${slug}: logo file`);
  }
  // Only the logos of images/badge: no stale file from a removed badge.
  const files = readdirSync(dist).filter((f) => /^ha-climate-air-card\.brand\..+\.js$/.test(f));
  assert.equal(files.length, slugs.length);
});
