// https://github.com/joshgeller/react-redux-jwt-auth-example
// https://github.com/rackt/react-router
// react

/*global __VERSION__*/
import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import {syncHistoryWithStore} from 'react-router-redux'
import history from './history'
import store from './store'

console.log('Dashboard version:', __VERSION__)

// Create an enhanced history that syncs navigation events with the store
const syncedHistory = syncHistoryWithStore(history, store)

// Using module.hot as the only hook to hot reloading. Not using react-hot-loader or any such plugings.
// module.hot is a webpack thing.
// https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.i6wweu7rf
const rootEl = document.getElementById('outlet')

const render = () => {
  // have to use require(..).default instead of import to re-evaluate the root element with all hot updates
  const Root = require('./root').default
  ReactDOM.render(<Root store={store} history={syncedHistory}/>, rootEl)
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderError = error => {
    const RedBox = require('redbox-react')
    ReactDOM.render(<RedBox error={error}/>, rootEl)
  }
  const reRender = () => {
    try {
      render()
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept('./root', () => {
    setTimeout(reRender)
  })
}

render()
