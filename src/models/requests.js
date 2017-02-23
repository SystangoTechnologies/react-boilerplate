const STARTED = 'STARTED'
const SUCCEEDED = 'SUCCEEDED'
const FAILED = 'FAILED'

const REQUEST_STATUS = Symbol('REQUEST_STATUS')

export const requestPending = requests =>
  Object.keys(requests).map(key => requests[key].started).reduce((result, started) => result || started, false)

const requestKey = request => `${request.method}:${request.path}`

// old style Javascript function so it can use 'this' on an object it's attached to
function getRequestOrDefault (key) {
  return this[key] ? this[key] : { started: true, failed: false, completed: false }
}

export default function reducer (state = {get: getRequestOrDefault}, action = {}) {
  if (!action[REQUEST_STATUS]) {
    return state
  }
  const key = action.key
  switch (action[REQUEST_STATUS]) {
    case STARTED:
      return {
        ...state,
        [key]: { started: true, failed: false, completed: false },
        get: getRequestOrDefault
      }
    case SUCCEEDED:
      return {
        ...state,
        [key]: { started: false, failed: false, completed: true },
        get: getRequestOrDefault
      }
    case FAILED:
      return {
        ...state,
        [key]: { started: false, failed: true, completed: true, error: action.error.toString() },
        get: getRequestOrDefault
      }
    default:
      return state
  }
}

export function requestActions (explicitKey, types, request, extra) {
  const [startedType, successType, errorType] = types
  const key = explicitKey || requestKey(request)
  return {
    started () {
      return {
        key,
        type: startedType,
        [REQUEST_STATUS]: STARTED,
        request,
        extra
      }
    },
    succeeded (other) {
      return {
        key,
        type: successType,
        [REQUEST_STATUS]: SUCCEEDED,
        request,
        extra,
        ...other
      }
    },
    failed ({error}) {
      return {
        key,
        type: errorType,
        [REQUEST_STATUS]: FAILED,
        request,
        extra,
        error
      }
    }
  }
}

export const API_REQUEST_ACTION = '@@API_REQUEST'

// {method, path} -> {type, request: {method, url, headers, etc}}
export function apiAction (props) {
  return {
    type: API_REQUEST_ACTION,
    ...props
  }
}

export function apiRequest (params) {
  return {
    type: API_REQUEST_ACTION,
    ...params
  }
}
