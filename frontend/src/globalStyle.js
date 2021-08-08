import { createGlobalStyle } from 'styled-components';
import { COLOR } from './constants';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'yg-jal-nan';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
      font-family: 'S-CoreDream-3Light';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  * {
    margin:0;
    padding:0;
    box-sizing: border-box;

    font-family: 'NanumSquareRound', sans-serif;
    color: ${COLOR.PARAGRAPH};
    letter-spacing: -0.03rem;
    white-space: nowrap;
  }

  html, body {
    height: 100%;
    cursor: default;
  }

  main {
    height: 100%;

  }

  #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
    cursor: pointer;

    &:link,
    &:visited,
    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
      color: inherit;
    }
  }

  h2 {
    padding: 1.75rem 0 1.25rem;

    font-family: 'S-CoreDream-3Light', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.1rem;
    color: ${COLOR.HEADING};
    text-align: center;
    letter-spacing: -0.1rem;
  }

  h2 > span {
    font-family: 'S-CoreDream-3Light', sans-serif;
  }

  ul {
    list-style-type: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;

    &:disabled {
      cursor: default;
    }
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.BORDER_LIGHT};
  }

  .tooltip-default {
    position: absolute;
    min-width: 3.25rem;
    border-radius: 0.25rem;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 0 8px 10px rgba(0, 0, 0, 0.14), 0 3px 14px rgba(0, 0, 0, 0.12);

    &::before {
      content: "";
      position: absolute;
      width: 1.25rem;
      height: 0.5rem;
      background: white;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      bottom: -0.25rem;
      left: calc(50% - 0.25rem);
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 0 8px 10px rgba(0, 0, 0, 0.14), 0 3px 14px rgba(0, 0, 0, 0.12);
    }

    & span {
      display:block;
      position: relative;
      text-align:center;
      border-radius: 0.25rem;
      background: ${COLOR.BACKGROUND};
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      color: ${COLOR.PARAGRAPH};
    }
  }

  .tooltip-interactive {
    position: absolute;
    min-width: 3.25rem;
    border-radius: 0.25rem;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 0 8px 10px rgba(0, 0, 0, 0.14), 0 3px 14px rgba(0, 0, 0, 0.12);

    &::before {
      content: "";
      position: absolute;
      width: 1.25rem;
      height: 0.5rem;
      background: white;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      bottom: -0.25rem;
      left: calc(50% - 0.25rem);
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 0 8px 10px rgba(0, 0, 0, 0.14), 0 3px 14px rgba(0, 0, 0, 0.12);
    }

    & a {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 0.25rem;
      background: ${COLOR.PRIMARY_LIGHT};
    }

    & span {
      display: block;
      position: relative;
      text-align:center;
      background: ${COLOR.BACKGROUND};
      margin-right: 1rem;
      padding: 0.25rem 0.5rem;
      color: ${COLOR.PARAGRAPH};
      font-size: 0.75rem;
      border-radius: 0.25rem 0 0 0.25rem;

      &::before {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${COLOR.BACKGROUND};
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
        top: 50%;
        right: -13px;
      }

      &::after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${COLOR.PRIMARY_LIGHT};
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
        top: 50%;
        right: -11px;
      }
    }

    & .transparent-box {
      width: 100%;
      min-width: 3.25rem;
      height: 25px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
    }
  }

  #version {
    display: none;
  }
`;

export default GlobalStyle;
