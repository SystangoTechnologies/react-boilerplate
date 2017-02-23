export default function (state = [], action = {}) {
  switch (action.type) {
    case 'MESSAGE_POSTED':
      return [...state, { title: action.title, text: action.text, id: action.id }]
    case 'MESSAGE_DISMISSED':
      return state.filter(message => message.id !== action.id)
    case 'MESSAGE_EXPIRED':
      return state.filter(message => message.id !== action.id)
    default:
      return state
  }
}

let nextId = 0
function newId () {
  nextId = nextId + 1
  return nextId
}

export function postMessage ({title, text, expiration = 10} = {}) {
  return dispatch => {
    const id = newId()
    dispatch({ type: 'MESSAGE_POSTED', id: id, title: title, text: text })
    setTimeout(() => {
      dispatch({ type: 'MESSAGE_EXPIRED', id: id })
    }, expiration * 1000)
    return Promise.resolve()
  }
}

export function postMessageWithExpiration ({title, text, expiration} = {}) {
  return dispatch => {
    const id = newId()
    dispatch({ type: 'MESSAGE_POSTED', id: id, title: title, text: text })
    setTimeout(() => {
      dispatch({ type: 'MESSAGE_EXPIRED', id: id })
    }, expiration * 1000)
    return Promise.resolve()
  }
}

export function dismissMessage (id) {
  return { type: 'MESSAGE_DISMISSED', id: id }
}
