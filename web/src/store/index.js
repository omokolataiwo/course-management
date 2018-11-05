import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

export default initialState => createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
