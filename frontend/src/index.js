import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import GlobalStyle from './globalStyle';

/* eslint-disable-next-line no-undef */
document.querySelector('#version').innerText = `version: ${VERSION}`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
