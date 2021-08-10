import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import GlobalStyle from './globalStyle';

/* eslint-disable-next-line no-undef */
document.querySelector('#version').innerText = `version: ${VERSION}`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
);
