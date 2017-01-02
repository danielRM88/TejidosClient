import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

export default function(state, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return state;
    case 'LOGIN_SUCCESS':
      let newState = state.setIn(['auth', 'isAuthenticated'], true);
      newState = newState.setIn(['auth', 'token'], action.token);
      return newState;
    case 'LOGIN_FAILURE':
      return state.setIn(['auth', 'message'], action.message);
    case 'LOGOUT_REQUEST':
      return state;
    case 'LOGOUT_SUCCESS':
      let newerState = state.deleteIn(['auth', 'token']);
      return newerState.setIn(['auth', 'isAuthenticated'], false);
  }
  return state;
}