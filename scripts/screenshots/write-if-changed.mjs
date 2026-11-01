// Screenshots are only rewritten when their pixels change: a PNG or GIF re-encoded with the same picture (another
// encoder version, another palette order) would otherwise land as a commit with no visible change.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, writeFileSync } from "node:fs";

// One MD5 per decoded RGBA frame, with the size and timing of the frames: ffmpeg decodes PNG and GIF alike.
const frames = (file) =>
  execFileSync("ffmpeg", ["-v", "error", "-i", file, "-pix_fmt", "rgba", "-f", "framemd5", "-"], { maxBuffer: 1 << 26 })
    .toString()
    .split("\n")
    .filter((line) => line && !line.startsWith("#format") && !line.startsWith("#tb"))
    .join("\n");

// True when `a` and `b` decode to the same picture: same size, same pixels in every frame, same frame timing.
export const samePixels = (a, b) => {
  if (!existsSync(a) || !existsSync(b)) return false;
  try {
    return frames(a) === frames(b);
  } catch {
    return false;
  }
};

// Copies the freshly rendered `tmp` to `out` unless `out` already shows the same pixels. Returns whether it wrote.
export const writeIfChanged = (tmp, out) => {
  if (samePixels(tmp, out)) return false;
  copyFileSync(tmp, out);
  return true;
};

// Same, for a PNG rendered in memory.
export const writeBufferIfChanged = (buffer, tmp, out) => {
  writeFileSync(tmp, buffer);
  return writeIfChanged(tmp, out);
};
