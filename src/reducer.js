import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

export default function(state = { auth: { isAuthenticated: false } }, action) {
  switch (action.type) {
    case 'SET_STATE':
      // return setState(state, action.state);
    case 'LOGIN_SUCCESS':
      // return state.setIn(['auth', 'isAuthenticated'], true);
      return ({ auth: { isAuthenticated: true } });
  }
  return state;
}