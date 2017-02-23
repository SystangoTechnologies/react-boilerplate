// This middleware can only be used in a browser. In node.js environment requiring Honeybadger errors out.
import Honeybadger from 'honeybadger-js'

export default function (config) {
  const honeybadger = Honeybadger.factory(config)

  return ({ getState }) => next => action => {
    try {
      const result = next(action)
      if (result && typeof result.catch === 'function') {
        return result.catch(logHttpError())
      } else {
        return result
      }
    } catch (error) {
      logDispatchError(error, action, getState())
    }
  }

  function notify (err, options = {}) {
    console.error(err, options)
    honeybadger.notify(err, options)
  }

  function logDispatchError (error, action, state) {
    notify(error, {
      name: 'DispatchActionError',
      context: {
        action: action,
        state: state
      },
      fingerprint: action.type
    })
  }

  function logHttpError () {
    return (error) => {
      if (error.response && (error.response.status < 300 || error.response.status >= 500)) { // do not log 4xx errors
        const { request, response } = error
        notify(error, {
          name: 'ApiResponseError',
          message: `${request.method} ${request.url}`,
          context: {
            request: {
              method: request.method,
              url: request.url,
              body: request.body || null
            },
            response
          },
          fingerprint: `${request.method} ${request.url}`
        })
      }
      return Promise.reject(error)
    }
  }
}
