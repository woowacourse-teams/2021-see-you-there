export const COLOR = {
  PRIMARY: '#2962FF',
  PRIMARY_DARK: '#0039CB',
  PRIMARY_LIGHT: '#768FFF',
  PRIMARY_BACKGROUND: '#F9FAFF',

  ERROR: '#FF4081',
  ERROR_LIGHT: '#FF79B0',
  ERROR_DARK: '#c60055',

  BACKGROUND: '#fff',

  ON_PRIMARY: '#FFF',
  ON_ERROR: '#333',
  BORDER: '#EEE',
  BORDER_LIGHT: '#CCC',
  BORDER_DARK: '#AAA',
  PLACEHOLDER: '#999',
  ANCHOR: '#999',

  ICON: '#666',
  HEADING: '#555',
  PARAGRAPH: '#333',
  PARAGRAPH_LIGHT: '#aaa',
};

/* 웹(너비 832px 이상)에서 지도가 표시될 경우, RIGHT 사용 */
export const LAYOUT = {
  NAV_HEIGHT: '3.5rem',
  NAV_WIDTH: '100%',
  NAV_WIDTH_RIGHT: '26rem',
  NAV_ICON_SIZE: '1.75rem',

  CONTENT_WIDTH_RESPONSIVE: '90vw',
  CONTENT_WIDTH_MAX: '20rem',

  CONTENT_WIDTH_RIGHT: '20rem',
  CONTENT_FIRST_BOX_HEIGHT: '22.5rem',
  CONTENT_BOTTOM_HEIGHT: '6.5rem',

  DEVICE_WIDTH_TABLET: '832px',

  MARGIN: '1.5rem',
  PADDING: '1.5rem',
};

export const Z_INDEX = {
  MAP: 0,
  MAP_PIN: 1,
  MAP_TOOLTIP: 2,
  MAP_CONTROLLER: 5,

  CONTENT: 10,
  ON_IMAGE: 15,
  NAVBAR: 20,
  HAMBURGER_MENU: 30,
  MODAL: 100,
};

export const REACT_QUERY_DEV_TOOL = {
  style: {
    backgroundColor: '#d0d0d0',
    height: '100%',
    maxHeight: '100%',
    width: '480px',
    left: '0',
    fontSize: '0.75rem',
  },
};
