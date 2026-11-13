// Builds src/ into the single HACS file dist/ha-climate-air-card.js, stamping the package version.
// Usage: node scripts/build.mjs  (dist/ is not committed: CI and the release workflow build it)
// shared.js comes first; each card is wrapped in its own block, inside one block for the whole bundle,
// so nothing leaks into the page.
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { splitDist } from "./i18n-split.mjs";

const CARDS = ["climate-air-purifier-card", "climate-air-fan-card", "climate-air-aircon-card", "climate-air-overview-card"];
const root = fileURLToPath(new URL("..", import.meta.url));
const pkg = JSON.parse(readFileSync(`${root}package.json`, "utf8"));
const src = (name) => readFileSync(`${root}src/${name}.js`, "utf8").replaceAll("__VERSION__", pkg.version);

const out = [
  `/*! ha-climate-air-card v${pkg.version} — https://github.com/juju35/ha-climate-air-card */`,
  "{",
  src("shared"),
  ...CARDS.map((c) => `// ── ${c} ──\n{\n${src(c)}}\n`),
  "}",
  "",
].join("\n");

mkdirSync(`${root}dist`, { recursive: true });
writeFileSync(`${root}dist/ha-climate-air-card.js`, out);
console.log(`Built dist/ha-climate-air-card.js (${(out.length / 1024).toFixed(1)} KB, ${CARDS.length} cards)`);

// Translations: English stays in the bundle, each other language goes to dist/ha-climate-air-card.i18n.<lang>.js,
// fetched when a card needs it (scripts/i18n-split.mjs).
if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) splitDist(`${root}dist`, "ha-climate-air-card.js", { version: pkg.version });
