import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import './services/firedb';

import '@elastic/eui/dist/eui_theme_light.css';

import Router from './services/router';
import { RootWrapper } from './services/rootWrapper';


ReactDOM.render(
  <React.StrictMode>
    <RootWrapper>
      <Router />
    </RootWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
