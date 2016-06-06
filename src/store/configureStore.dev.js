import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const reactRouterReduxMiddleware = routerMiddleware(hashHistory);

export default function configureStore(initialState) {
  let store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, reactRouterReduxMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      let nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

