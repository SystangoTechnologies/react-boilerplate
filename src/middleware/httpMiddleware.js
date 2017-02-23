/* global fetch */

const HTTP_ACTION = Symbol('HTTP_ACTION')
export const httpAction = (request) => ({
  type: HTTP_ACTION,
  request // only url, query, body, method, header etc...
})

export default function (httpFactory = http) {
  return ({ dispatch }) => next => action => {
    if (action.type === HTTP_ACTION) {
      return httpFactory(action.request)
    } else {
      return next(action)
    }
  }
}

export const http = (request) => {
  const { url, query, ...options } = request
  return fetch(requestUrl(url, query), options)
    .then(handleResponse(request))
    // .then(response => {
    //   if (request.method === 'GET' && /\/installations\/\d+$/.test(request.url)) {
    //     return {
    //       ...response,
    //       installation: {
    //         ...response.installation,
    //         secrets: {
    //           wifi_password: '123456789',
    //           api_password: '123456789'
    //         }
    //       }
    //     }
    //   } else {
    //     return response
    //   }
    // })
    .then(echoResponse(request))
}

const requestUrl = (url, query) => {
  const queryString = formatQueryString(query)
  return queryString ? [url, queryString].join('?') : url
}

const formatQueryString = (query) => {
  return (query && typeof query === 'object')
    ? Object.entries(query)
    .map(([key, value]) => ({ name: key, value: value }))
    .filter(q => q.value)
    .map(q => `${q.name}=${q.value}`)
    .join('&')
    : null
}

const exceptDivLines = text => {
  const lines = text.split('\n')
  return lines.filter(line => !(/^<div>/.test(line) || /^<\/div>/.test(line))).join('\n')
}

const httpError = (err, request, response) => {
  err.request = request
  err.response = response
  return err
}

const handleResponse = (request) => (response) => {
  if (response.ok) {
    // Good status code, try to parse JSON response.
    // Need to use .text() not .json() to get the text body and try to parse it ourselves and use the body for error logging
    return response.text().then(body => {
      try {
        return JSON.parse(body)
      } catch (parseError) {
        // Usually JSON parsing on a success response fails due to PHP app adding error stack trace right to the output before
        // JSON data on the last line. We need to cut out the actual response as it's too large to send through Honeybadger.
        return Promise.reject(httpError(parseError, request, { status: response.status, body: exceptDivLines(body) }))
      }
    })
  } else if (response.status >= 500) {
    return response.text().then(body => {
      const error = new Error(response.statusText)
      return Promise.reject(httpError(error, request, { status: response.status, body: body }))
    })
  } else {
    return response.json().then(body => {
      return Promise.reject(httpError(new Error(body.error), request, { status: response.status, body: body })) // api sends {status, error} object back
    }, _ => { // ignored parse error
      return Promise.reject(httpError(new Error(response.statusText), request, { status: response.status, body: null }))
    })
  }
}

const echoResponse = (request) => (response) => {
  console.log('HTTP', request.method, request.url, response)
  return response
}

