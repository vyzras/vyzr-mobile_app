import { createStore, applyMiddleware, compose } from 'redux';
import { setupRNListener } from 'react-native-redux-listener';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import getRootReducer from './reducers';

const enhancer = compose(
  //inject store enhancer
  setupRNListener({
    monitorAppState: false,
    monitorNetInfo: true,
    monitorKeyboard: false,
    monitorDeepLinks: false,
    monitorBackButton: false,
  }),
  applyMiddleware(thunk),
);

export default createStore(
  getRootReducer(),
  enhancer,
)
