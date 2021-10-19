export const isViewWiderThan = (width) => window.matchMedia(`(min-width: ${width})`).matches;
