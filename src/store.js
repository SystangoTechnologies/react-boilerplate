/* global __NODE_ENV__, __DEVELOPMENT__ */

import {createStore, compose, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import history from './history'
import createReducer from './models/index'
import apiMiddleware from './middleware/apiMiddleware'
import httpMiddleware from './middleware/httpMiddleware'

const storeEnhancer = compose(
  applyMiddleware(
    // must be on top to catch/report bubbled up errors
    thunk,
    apiMiddleware({
      baseUrl: `${__CLOUD_SERVER__}/` //connects the api url entered in webpack config files
    }),
    httpMiddleware(),
    routerMiddleware(history),
    // Positioning logger at the bottom will only log actions that are going to be applied to the store
    createLogger()
  ),
  // compose with https://github.com/zalmoxisus/redux-devtools-extension (Chrome Extension) if available
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(createReducer(), storeEnhancer)

export default store

function createLogger () {
  return ({ getState }) => (next) => (action) => {
    if (__DEVELOPMENT__) {
      console.log('Action', action.type, action)
    }
    return next(action)
  }
}
