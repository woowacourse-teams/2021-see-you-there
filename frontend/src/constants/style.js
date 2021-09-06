import { css } from 'styled-components';

export const COLOR = {
  PRIMARY: '#2962FF',
  PRIMARY_DARK: '#0039CB',
  PRIMARY_LIGHT: '#768FFF',
  PRIMARY_BACKGROUND: '#F9FAFF',

  ACCENT: '#FF4081',
  ACCENT_LIGHT: '#FF79B0',
  ACCENT_DARK: '#c60055',

  BACKGROUND: '#fff',

  ON_PRIMARY: '#FFF',
  ON_ACCENT: '#333',
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

  CONTENT_PADDING_TOP: '6rem',
  CONTENT_PADDING_TOP_TABLET: '4rem',

  CONTENT_DRAWING_WIDTH: '70rem',
  CONTENT_DRAWING_WIDTH_TABLET: '45rem',

  CATEGORY_CHIP_TOP: '1rem',
  DRAWER_HEIGHT: '2.5rem',

  PIN_SIZE_PARTICIPANT: '2.8125rem',

  DEVICE_WIDTH_TABLET: '832px',

  MARGIN: '1.5rem',
  PADDING: '1.5rem',
};

export const Z_INDEX = {
  HIDDEN: 0,
  MAP: 1,
  MAP_PIN_EFFECT: 2,
  MAP_PIN: 3,
  MAP_TOOLTIP: 4,
  MAP_CONTROLLER: 5,

  CONTENT: 10,
  ON_IMAGE: 15,
  NAVBAR: 20,
  HAMBURGER_MENU: 30,

  MODAL: 100,
  LOADING: 100,
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

export const CONTENT_AREA = {
  DEFAULT: css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${LAYOUT.PADDING} 0;
    padding-top: ${LAYOUT.CONTENT_PADDING_TOP};
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: ${Z_INDEX.CONTENT};

    & > h2 {
      line-height: 2rem;
    }

    & > picture {
      position: fixed;
      bottom: 0;
      display: flex;
    }

    & > picture > img {
      width: ${LAYOUT.CONTENT_DRAWING_WIDTH};
    }

    @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
      padding-top: ${LAYOUT.CONTENT_PADDING_TOP_TABLET};

      & > picture > img {
        width: ${LAYOUT.CONTENT_DRAWING_WIDTH_TABLET};
      }
    }
  `,
  MAP: css`
    position: fixed;
    top: ${LAYOUT.NAV_HEIGHT};
    right: 0;
    z-index: ${Z_INDEX.CONTENT};
    width: ${LAYOUT.NAV_WIDTH_RIGHT};
    height: calc(100% - ${LAYOUT.NAV_HEIGHT});

    background-color: ${COLOR.PRIMARY_BACKGROUND};
    box-shadow: -4px 0 8px rgba(0, 0, 0, 0.25);

    @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
      width: 100%;
    }
  `,
};

export const EFFECT = {
  FADE_IN: css`
    opacity: 1;
    visibility: visible;
    transition: opacity 200ms;
  `,
  FADE_OUT: css`
    opacity: 0;
    visibility: hidden;
    transition: opacity 300ms, visibility 300ms;
  `,
  SHINE: css`
    &::after {
      content: '';
      display: block;
      position: absolute;
      background: ${COLOR.PRIMARY_BACKGROUND};
      width: 40px;
      height: 100%;
      left: 40px;
      top: 0;
      transform: skewX(-15deg);
      filter: blur(2px);
    }

    &:not(:disabled)::after {
      -webkit-animation: shine 15s cubic-bezier(0, 1.15, 1, 0.99) infinite;
      -moz-animation: shine 15s cubic-bezier(0, 1.15, 1, 0.99) infinite;
      -o-animation: shine 15s cubic-bezier(0, 1.15, 1, 0.99) infinite;
      animation: shine 15s cubic-bezier(0, 1.15, 1, 0.99) infinite;
    }

    @keyframes shine {
      0% {
        opacity: 0;
        transform: translateX(0);
      }
      9% {
        opacity: 0.3;
        transform: translateX(400px);
      }
      10% {
        opacity: 0;
        transform: translateX(400px);
      }
      11% {
        opacity: 0;
        transform: translateX(0);
      }
      20% {
        opacity: 0.3;
        transform: translateX(400px);
      }
      100% {
        opacity: 0.3;
        transform: translateX(400px);
      }
    }
  `,
  WAVE_CIRCLE: css`
    position: relative;
    width: ${LAYOUT.PIN_SIZE_PARTICIPANT};
    height: ${LAYOUT.PIN_SIZE_PARTICIPANT};

    & > img {
      position: relative;
      z-index: ${Z_INDEX.MAP_PIN};
    }

    & > span {
      position: absolute;
      z-index: ${Z_INDEX.MAP_PIN_EFFECT};

      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border-radius: 50%;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: -60%;
        left: -60%;
        width: 120%;
        height: 120%;
        z-index: ${Z_INDEX.MAP_PIN_EFFECT};

        background-color: ${COLOR.PRIMARY_LIGHT};
        border-radius: 50%;
      }

      &::before {
        -webkit-animation: shining 3s infinite ease-out;
        animation: shining 3s infinite ease-out;
      }

      &::after {
        opacity: 0;
        -webkit-animation: shining 3s 1.5s infinite ease-out;
        animation: shining 3s 1.5s infinite ease-out;
      }
    }

    @-webkit-keyframes shining {
      0% {
        transform: scale(0);
        opacity: 0.5;
        transform-origin: center;
      }
      100% {
        transform: scale(3);
        opacity: 0;
        transform-origin: center;
      }
    }

    @keyframes shining {
      0% {
        transform: scale(0);
        opacity: 0.5;
        transform-origin: center;
      }
      100% {
        transform: scale(3);
        opacity: 0;
        transform-origin: center;
      }
    }
  `,
};
