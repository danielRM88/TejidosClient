export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export function loginRequest(email, password) {
  return {
    type: LOGIN_REQUEST,
    loading: true,
    isAuthenticated: false,
    email: email,
    password: password
  }
}

export function loginSuccess(auth) {
  return {
    type: LOGIN_SUCCESS,
    loading: false,
    isAuthenticated: true,
    token: auth.auth_token
  }
}

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    loading: false,
    isAuthenticated: false,
    message
  }
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    loading: true
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    loading: false,
    isAuthenticated: false
  }
}