// ── Styles ───────────────────────────────────────────────────────────────────
import { CA_ART_STYLES } from "./illustrations.js";
import { CA_BANNER_STYLES } from "./illustrated-header.js";

export const CA_STYLES = `${CA_ART_STYLES}
  /* ha-card is a size container, so its content gives it no width: in a shrink-to-fit parent (inline-block, a grid's
     auto column) it would fall to its padding. The empty, zero-height grid before it stands in for the content: a
     300 px max-content width but no min-content width, so the card still shrinks in a 1fr grid column or a stack,
     even wrapped in a <div> (contain-intrinsic-inline-size gave a min-content width, and the card overflowed). */
  :host { display: block; height: 100%; min-width: 0; }
  :host::before { content: ""; display: grid; grid-template-columns: minmax(0, 300px); height: 0; }
  ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 10px; container-type: inline-size; }
  .empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }
  /* The body starts 8px under the header, like the other ha-* cards (the card's gap is 10px, 8px on the mini cards). */
  .header { display: flex; align-items: center; gap: 10px; margin-bottom: -2px; }
  ha-card.mini .header { margin-bottom: 0; }
  .badge { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center;
           background: color-mix(in srgb, var(--ca-badge, var(--ca-color)) 16%, transparent); color: var(--ca-badge, var(--ca-color)); transition: background .4s, color .4s; }
  .badge ha-icon { --mdc-icon-size: 24px; }
  /* The pill gets its whole label first (at most half the header) and the title the rest, keeping about four
     characters: the pill is only truncated when even that does not fit. */
  .titles { flex: 1 1 0; min-width: 5ch; font-size: 16px; }
  :host([hide-title]) .titles .name, :host([hide-subtitle]) .titles > .sub { display: none; }
  .name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .st { display: inline-flex; align-items: center; gap: 4px; flex: 0 1 auto; min-width: 0; max-width: 50%; overflow: hidden; box-sizing: border-box; position: relative;
        padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;
        white-space: nowrap; --c: var(--ca-badge, var(--ca-color)); background: color-mix(in srgb, var(--c) 15%, transparent); color: var(--c); }
  .st .dot { background: var(--c); }
  .stt { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .dot { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--ca-color); }
  ha-card:has(.running) .dot { animation: ca-blink 1.6s ease-in-out infinite; }
  button { font: inherit; cursor: pointer; border: none; }
  button:disabled { cursor: default; opacity: .5; }
  .power { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none;
           background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--secondary-text-color); }
  .power.on { background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }
  .power.on:hover, .round.on:hover:not(:disabled) { background: color-mix(in srgb, var(--ca-color) 24%, transparent); }
  .zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%;
          display: grid; place-items: center; color: var(--secondary-text-color); }
  .zoom ha-icon { --mdc-icon-size: 16px; }
  .zoom:hover { background: color-mix(in srgb, var(--secondary-text-color) 16%, transparent); color: var(--primary-text-color); }
  .zoom:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }

  .hero { display: flex; align-items: center; gap: 14px; }
  .picture { width: 76px; height: 88px; }
  .iconart { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center;
             background: color-mix(in srgb, var(--ca-color) 15%, transparent); color: var(--ca-color); }
  .iconart ha-icon { --mdc-icon-size: 32px; }
  .running .iconart ha-icon { animation: ca-breathe 2.4s ease-in-out infinite; }
  .info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
  .big { display: flex; align-items: baseline; gap: 8px; min-width: 0; flex-wrap: wrap; }
  .big .val { font-size: 30px; font-weight: 400; line-height: 1.1; color: var(--primary-text-color); white-space: nowrap; }
  .big .val small { font-size: 14px; color: var(--secondary-text-color); }
  .big .lbl { font-size: 13px; font-weight: 500; color: var(--ca-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .big .arrow { font-size: 14px; color: var(--secondary-text-color); white-space: nowrap; }
  .state-big { font-size: 22px; font-weight: 400; line-height: 1.2; color: var(--ca-color); overflow-wrap: break-word; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px;
          background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--secondary-text-color); white-space: nowrap;
          max-width: 100%; box-sizing: border-box; overflow: hidden; }
  /* A chip too long for the card (« Device offline » in a narrow card) wraps instead of being cut. */
  .chips .chip { white-space: normal; }
  .chip ha-icon { --mdc-icon-size: 13px; flex: none; }
  .chip[data-more-info] { cursor: pointer; }
  .chip[data-more-info]:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }
  .chip.warn { background: color-mix(in srgb, var(--warning-color, #ffa600) 15%, transparent); color: var(--warning-color, #ffa600); }
  .filter.soon .fill { background: var(--warning-color, #ffa600); }
  .filter.low .fill { background: var(--error-color, #db4437); }
  .filter.soon .line ha-icon, .filter.soon .mbar ha-icon { color: var(--warning-color, #ffa600); }
  .filter.low .line ha-icon, .filter.low .mbar ha-icon { color: var(--error-color, #db4437); }
  .filter[data-more-info] { cursor: pointer; }
  .chip.alert { background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent); color: var(--error-color, #db4437); }
  .chip.tint { --k: var(--ca-color); background: color-mix(in srgb, var(--k) 15%, transparent); color: var(--k); }
  .bar { height: 4px; border-radius: 3px; background: var(--secondary-background-color, rgba(128,128,128,.15)); overflow: hidden; flex: 1; }
  .fill { height: 100%; border-radius: 3px; background: var(--ca-color); transition: width .6s ease; }

  .section { display: flex; flex-direction: column; gap: 6px; }
  .section-title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; text-transform: uppercase;
                   letter-spacing: .04em; color: var(--secondary-text-color); }
  .section-title ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
  .segments { display: flex; gap: 4px; padding: 3px; border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,.1)); }
  .seg { flex: 1; min-width: 0; display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 6px 4px; border-radius: 9px;
         font-size: 12px; font-weight: 500; background: none; color: var(--secondary-text-color); transition: background .2s, color .2s; }
  .seg span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .seg ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
  .seg.short { flex: 0 0 auto; padding: 6px 10px; }
  .seg.on { background: var(--card-background-color, #fff); color: var(--ca-color); box-shadow: 0 1px 3px rgba(0,0,0,.15); }
  .seg:focus-visible, .toggle:focus-visible, .btn:focus-visible, .round:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 6px; }
  .field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .field > span { font-size: 11px; color: var(--secondary-text-color); }
  select { font: inherit; font-size: 13px; color: var(--primary-text-color); padding: 7px 28px 7px 10px; border-radius: 10px; width: 100%;
           border: 1px solid var(--divider-color, rgba(128,128,128,.25)); appearance: none; -webkit-appearance: none; cursor: pointer;
           background: var(--secondary-background-color, rgba(128,128,128,.1)) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23888' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 6px center / 20px; }
  .slider { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--secondary-text-color); }
  .slider ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; }
  .slider .sl-label { flex-shrink: 1; min-width: 0; max-width: 40%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .slider .v { min-width: 44px; text-align: right; font-weight: 500; color: var(--primary-text-color); font-variant-numeric: tabular-nums; }
  input[type=range] { flex: 1; min-width: 0; height: 22px; margin: 0; background: none; appearance: none; -webkit-appearance: none; cursor: pointer; }
  input[type=range]::-webkit-slider-runnable-track { height: 6px; border-radius: 3px;
    background: linear-gradient(to right, var(--ca-color) var(--p, 0%), var(--secondary-background-color, rgba(128,128,128,.2)) var(--p, 0%)); }
  input[type=range]::-moz-range-track { height: 6px; border-radius: 3px; background: var(--secondary-background-color, rgba(128,128,128,.2)); }
  input[type=range]::-moz-range-progress { height: 6px; border-radius: 3px; background: var(--ca-color); }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -6px; border-radius: 50%;
    background: var(--card-background-color, #fff); border: 2px solid var(--ca-color); box-shadow: 0 1px 3px rgba(0,0,0,.25); }
  input[type=range]::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: var(--card-background-color, #fff); border: 2px solid var(--ca-color); }
  input[type=range]:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 2px; border-radius: 4px; }
  .toggles { display: flex; flex-wrap: wrap; gap: 6px; }
  .toggle { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 4px 9px 4px 6px; border-radius: 12px;
            background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--secondary-text-color); }
  .toggle ha-icon { --mdc-icon-size: 15px; }
  .toggle.on { background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }
  .row { display: flex; align-items: center; gap: 8px; }
  .row > .field { flex: 1; }
  .round { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; flex: none;
           background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--primary-text-color); }
  .round ha-icon { --mdc-icon-size: 20px; }
  .round.on { background: color-mix(in srgb, var(--ca-color) 16%, transparent); color: var(--ca-color); }

  ha-card.mini { gap: 8px; }
  .content { display: flex; align-items: center; gap: 12px; }
  ha-card.mini .picture { width: 56px; height: 66px; }
  .mbar { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .mbar ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
  .mbar .v { font-weight: 500; min-width: 40px; text-align: right; color: var(--primary-text-color); font-variant-numeric: tabular-nums; }
  .line { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }
  .line ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }
  .line span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line.parts { align-items: flex-start; }
  .line.parts ha-icon { margin-top: 1px; }
  .line.parts > span { white-space: normal; overflow: visible; }
  .line.parts .pt { white-space: nowrap; }
  .line b { color: var(--primary-text-color); font-weight: 500; }
  .mcontrols { display: flex; gap: 6px; flex-shrink: 0; }
  ha-card.mini .power { width: 40px; height: 40px; }

  /* A pill whose whole label does not fit (caFitPills) keeps only its dot: its text is clipped, still read by screen
     readers and shown in the tooltip. */
  .st.dot-only { flex: none; padding: 4px; }
  .st.dot-only .stt { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  /* Narrow cards (6 columns of the Sections view, about 160 to 300 px; the widths below are the card's inner width). */
  @container (max-width: 280px) {
    .header { gap: 8px; }
  }
  /* The mini card's buttons move under the info, which gets the whole line next to the picture. */
  @container (max-width: 300px) {
    ha-card.mini .content { flex-wrap: wrap; row-gap: 8px; }
    ha-card.mini .info { flex: 0 0 calc(100% - 68px); }
    ha-card.mini .mcontrols { flex-basis: 100%; justify-content: flex-end; }
  }
  /* The narrowest: the full card drops its header badge (the illustration shows the device) and draws it smaller;
     the mini card drops its illustration (its badge shows the device) and its info takes the whole width. */
  @container (max-width: 180px) {
    .header { gap: 6px; }
    ha-card:not(.mini) .badge { display: none; }
    ha-card:not(.mini) .hero { gap: 10px; }
    ha-card:not(.mini) .hero .picture { width: 56px; height: 66px; }
    /* The info gets the whole width under the picture: next to it, it had 64 px at 156 px and cut the values
       (« Unavailable », « Na zewnątrz 31 °C »). */
    ha-card:not(.mini) .hero { flex-wrap: wrap; justify-content: center; row-gap: 6px; }
    ha-card:not(.mini) .hero .info { flex-basis: 100%; }
    .state-big { font-size: 20px; }
    ha-card.mini .content > .picture { display: none; }
    ha-card.mini .info { flex-basis: 100%; }
    /* Many segments (the air conditioner's modes): they share the width as icons, the selected one's label kept for
       screen readers and in its tooltip. */
    .segments:has(.short) .seg { position: relative; flex: 1 1 0; min-width: 0; padding: 6px 2px; }
    .segments:has(.short) .seg.on span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .dot, .iconart ha-icon { animation: none !important; }
  }
${CA_BANNER_STYLES}
`;
