// The mock home of the screenshots, with Home Assistant's formatting helpers and a recorded callService.
import { mockHass } from "../scripts/screenshots/mock.mjs";

export const makeHass = (lang = "en", changes = {}, options = {}) => {
  const hass = mockHass(lang, changes, options);
  hass.calls = [];
  hass.callService = (domain, service, data) => {
    hass.calls.push([domain, service, data]);
    return Promise.resolve();
  };
  hass.formatEntityState = (st, v) => hass.labels[v ?? st.state] ?? v ?? st.state;
  hass.formatEntityAttributeValue = (_st, _attr, v) => hass.labels[v] ?? v;
  return hass;
};
