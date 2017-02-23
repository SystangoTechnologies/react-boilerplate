import {requestActions, API_REQUEST_ACTION} from '../models/requests'
import {httpAction} from './httpMiddleware'
import {normalize} from 'normalizr'

export default function ({ baseUrl }) {
  return ({ dispatch, getState }) => next => action => {
    const state = getState()
    const { type, key, types, schema, form, extra = {}, ...requestParams } = action // TODO: check if form is ever used
    if (type === API_REQUEST_ACTION) {
      const httpRequest = makeHttpAction(baseUrl, requestParams)
      if (types) { // action was created by apiAction action creator
        // dispatch started/http/succeeded/failed actions
        const actions = requestActions(key, types, requestParams, extra)

        dispatch(actions.started())
        return next(httpRequest)
          .then(response => {
            if (schema) {
              const normalized = normalize(response, schema)
              return dispatch(actions.succeeded({ response: normalized.result }))
            } else {
              return dispatch(actions.succeeded({ response: response }))
            }
          }).catch(error => {
            dispatch(actions.failed({ error }))
           if (form && error.body) { // if using api request as a form submission, format result to be consumable for redux-form
              return Promise.reject({ _error: error.body.error, ...error.body.errors })
            } else {
              return Promise.reject(error)
            }
          })
      } else {
        // dispatch just http action
        return dispatch(httpRequest)
      }
    } else {
      return next(action)
    }
  }
}

export function makeHttpAction (baseUrl, { method, path, query, body }) {
  // return fetch formatted request
  var request = {
    url: baseUrl + path,
    method: method || 'GET',
    headers: makeHeaders()
  }
  const withQuery = query ? { ...request, query } : request
  const withBody = body ? { ...withQuery, body: JSON.stringify(body) } : withQuery
  return httpAction(withBody)
}

function makeHeaders () {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${'pass some token here'}`
  }
}

