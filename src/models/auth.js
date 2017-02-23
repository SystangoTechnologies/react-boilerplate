import browser from 'bowser'
import {apiAction} from './requests'

export default function (state = { byEmail: !browser.mobile }, action = {}) {
  switch (action.type) {
    case 'LOGIN_METHOD_CHANGED':
      return {
        ...state,
        byEmail: action.method === 'email'
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        messageSent: true,
        loginError: null
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        messageSent: false,
        loginError: action.error.toString()
      }
    case 'LOGIN_TRY_AGAIN':
      return {
        ...state,
        messageSent: false,
        loginError: null
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        messageSent: true,
        signUpError: null
      }
    case 'SIGNUP_FAILED':
      return {
        ...state,
        messageSent: false,
        signUpError: action.error.toString()
      }
    default:
      return state
  }
}

export const loginMethodChanged = method => ({ type: 'LOGIN_METHOD_CHANGED', method })

export const tryAgain = () => ({ type: 'LOGIN_TRY_AGAIN' })

export function sendLoginRequest (values) {
  const method = values.email.length > 0 ? 'email' : 'sms'
  const body = values.email.length > 0 ? { email: values.email } : { phone: values.phone, country_code: values.country_code }
  return apiAction({
    types: ['LOGIN_REQUESTED', 'LOGIN_SUCCESS', 'LOGIN_FAILED'],
    method: 'POST',
    path: `/posts`,
    body: body
  })
}

export function signUpRequest (values) {
  return apiAction({
    types: ['SIGNUP_REQUESTED', 'SIGNUP_SUCCESS', 'SIGNUP_FAILED'],
    method: 'POST',
    path: '/comments',
    body: values
  })
}
