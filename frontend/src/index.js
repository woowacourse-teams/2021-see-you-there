/* eslint no-undef: "off" */
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import GlobalStyle from './globalStyle';

Kakao.init(KAKAO);
document.querySelector('#version').innerText = `version: ${VERSION}`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
);
