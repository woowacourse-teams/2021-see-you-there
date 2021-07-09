import { createGlobalStyle } from 'styled-components';
import { COLOR } from './constants';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GongGothicMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

* {
    font-family: 'Noto Sans KR', sans-serif;
    color: ${COLOR.PARAGRAPH};
    box-sizing: border-box;
    margin:0;
    padding:0;
  }

  html, body {
    height: 100%;
    cursor: default;
  }

  #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;

    &:link,
    &:visited,
    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
      color: inherit;
    }
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
`;

export default GlobalStyle;
