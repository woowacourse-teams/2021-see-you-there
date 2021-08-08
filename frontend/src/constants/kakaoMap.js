import { QUERY_KEY } from './api';
import { ID } from './test';
import { Image } from '../assets';

const PIN_IMAGE = {
  STATION: { w: 60, h: 80, src: Image.pinStation },
  PARTICIPANT: { w: 45, h: 45, src: Image.pinParticipant },
  [QUERY_KEY.CAFE]: { w: 36, h: 48, src: Image.pinCafe },
  [QUERY_KEY.DINING]: { w: 36, h: 48, src: Image.pinDining },
  [QUERY_KEY.PARTY]: { w: 36, h: 48, src: Image.pinParty },
};

const TEST_ID = {
  STATION: ID.PIN_STATION,
  PARTICIPANT: ID.PIN_PARTICIPANT,
  [QUERY_KEY.CAFE]: ID.PIN_CAFE,
  [QUERY_KEY.DINING]: ID.PIN_DINING,
  [QUERY_KEY.PARTY]: ID.PIN_PARTY,
};

export const PIN_Y_ANCHOR = 0.9;
export const HTML = {
  PIN: {
    DEFAULT: ({ title, key, id }) =>
      `
      <div ${id ? `id=_${id}` : ''} style="cursor: default;" data-testid=${TEST_ID[key]} >
        <img src=${PIN_IMAGE[key].src} alt="${title}" width=${PIN_IMAGE[key].w} height=${PIN_IMAGE[key].h} />
        <span></span>
      </div>
    `,
    INTERACTIVE: ({ title, key, url }) =>
      `
      <a href=${url} target="_blank" rel="noreferrer" data-testid=${TEST_ID[key]} >
        <img src=${PIN_IMAGE[key].src} alt="${title}" width=${PIN_IMAGE[key].w} height=${PIN_IMAGE[key].h} />
      </a>
    `,
  },
  TOOLTIP: {
    DEFAULT: ({ title, key }) =>
      `
      <div class="tooltip-default" style="bottom: ${PIN_IMAGE[key].h * PIN_Y_ANCHOR + 8}px; cursor: default;">
        <span>${title}</span>
      </div>
    `,
    INTERACTIVE: ({ title, key, url }) =>
      `
      <div class="tooltip-interactive" style="bottom: ${PIN_IMAGE[key].h * PIN_Y_ANCHOR + 8}px;">
        <a href="${url}" target="_blank" rel="noreferrer">
          <span>${title}</span>
        </a>
        <div class="transparent-box"></div>
      </div>
    `,
  },
};
export const MAP_BOUNDS_DIFFS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
export const MAP_BOUNDS_PADDING = {
  1: 0.0002, // 20m
  2: 0.0003, // 30m
  3: 0.0005, // 50m
  4: 0.001, // 100m
  5: 0.0025, // 250m
  6: 0.005, // 500m
  7: 0.01, // 1km
  8: 0.02, // 2km
  9: 0.04, // 4km
  10: 0.08, // 8km
  11: 0.16, // 16km
  12: 0.32, // 32km
  13: 0.64, // 64km
  14: 0.128, // 128km
};
