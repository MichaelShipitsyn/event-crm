import 'react-perfect-scrollbar/dist/css/styles.css';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import { Provider } from 'react-redux';

import store from 'store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
