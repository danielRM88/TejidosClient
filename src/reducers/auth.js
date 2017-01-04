import {Map, fromJS} from 'immutable';
const INIT_STATE = fromJS({ auth: { isAuthenticated: false } });

export default function auth(state, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return state;
    case 'LOGIN_SUCCESS':
      let newState = state.setIn(['isAuthenticated'], true);
      newState = newState.setIn(['token'], action.token);
      return newState;
    case 'LOGIN_FAILURE':
      return state.setIn(['message'], action.message);
    case 'LOGOUT_REQUEST':
      return state;
    case 'LOGOUT_SUCCESS':
      let newerState = state.deleteIn(['token']);
      return newerState.setIn(['isAuthenticated'], false);
  }
  return state;
}