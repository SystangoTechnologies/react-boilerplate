import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as form} from 'redux-form'
// Read https://github.com/erikras/ducks-modular-redux on structuring reducer functions and action creators
import requests from './requests'
import media from './media'
import messages from './messages'
import {wizardReducer} from './../components/wizard'

export default function () {
  const appReducer = combineReducers({
    routing: routerReducer,
    requests,
    form,
    media,
    messages,
    wizard: wizardReducer
  })

  return (state, action) => {
    if (action.type === 'RESET_STORE') {
      // passing undefined state will re-initialize the reducer's state
      return appReducer(undefined, action)
    } else {
      return appReducer(state, action)
    }
  }
}
