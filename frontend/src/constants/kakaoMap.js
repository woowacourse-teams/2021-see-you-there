const DEFAULT_URL = 'https://place.map.kakao.com/23913503';

export const PIN_Y_ANCHOR = 0.9;
export const HTML = {
  PIN: {
    DEFAULT: ({ title, image }) =>
      `
      <div style="cursor: default;">
        <img src=${image.src} alt=${title} width=${image.w} height=${image.h} />
      </div>
    `,
    INTERACTIVE: ({ title, image, url = DEFAULT_URL }) =>
      `
      <a href=${url} target="_blank" rel="noreferrer" >
        <img src=${image.src} alt=${title} width=${image.w} height=${image.h} />
      </a>
    `,
  },
  TOOLTIP: {
    DEFAULT: ({ title, pinSize }) =>
      `
      <div class="tooltip-default" style="bottom: ${pinSize * PIN_Y_ANCHOR + 8}px; cursor: default;">
        <span>${title}</span>
      </div>
    `,
    INTERACTIVE: ({ title, pinSize, url = DEFAULT_URL }) =>
      `
      <div class="tooltip-interactive" style="bottom: ${pinSize * PIN_Y_ANCHOR + 8}px;">
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
