// The card source the tests evaluate: src/ assembled into one classic script as scripts/build.mjs does
// (scripts/bundle.mjs), placeholders (__VERSION__ and the like) left as they are.
import { bundle } from "../scripts/bundle.mjs";

export const climateAirOverviewCardSource = bundle("src/climate-air-overview-card/index.js");
export const sharedSource = bundle("src/shared/index.js");
// by former file name, for loaders that took one
export const sources = { "climate-air-overview-card.js": climateAirOverviewCardSource, "shared.js": sharedSource };
