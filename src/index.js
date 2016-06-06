import React from 'react';
import {render} from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import {AppContainer} from 'react-hot-loader';

import Root from './containers/Root';
import configureStore from './store/configureStore';

let store = configureStore();
let history = syncHistoryWithStore(hashHistory, store);
let rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    let NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      rootEl
    );
  });
}
