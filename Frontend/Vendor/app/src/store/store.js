import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index'

const defaultState = {};
let enhancer = compose(
  applyMiddleware(logger,thunk),
  window.devToolsExtension && window.devToolsExtension()
)


const store = createStore(
  rootReducer,
  defaultState,
  enhancer
)

export default store
