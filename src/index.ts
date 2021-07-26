import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import { createElement } from 'react';
import { render } from 'react-dom';

import { HotApp } from './hot-app';

const rootElement = document.querySelector('#root');

const renderApp = (): void => {
  render(createElement(HotApp), rootElement);
};

renderApp();

// Hot reloading
if (module.hot) {
  module.hot.accept(renderApp);
}
