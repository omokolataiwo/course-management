import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

export default (initialState) => {
  const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index'); // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
