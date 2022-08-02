import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';

const rootEl = document.getElementById('root');

ReactDOM.render((
  <App />
), rootEl);

if (module.hot) {
  require('preact/debug');

  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      rootEl
    );
  });
}
