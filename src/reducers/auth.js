import {Map, fromJS} from 'immutable';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/authActions';
const INIT_STATE = fromJS({ isAuthenticated: false });

export default function auth(state = INIT_STATE, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      let newStateAfterReq = state.setIn(['loading'], true);
      newStateAfterReq = newStateAfterReq.deleteIn(['token']);
      newStateAfterReq = newStateAfterReq.deleteIn(['message']);
      return newStateAfterReq;
    case LOGIN_SUCCESS:
      let newStateAfterSuccess = state.setIn(['isAuthenticated'], true);
      newStateAfterSuccess = newStateAfterSuccess.setIn(['loading'], false);
      newStateAfterSuccess = newStateAfterSuccess.setIn(['token'], action.token);
      return newStateAfterSuccess;
    case LOGIN_FAILURE:
      let newStateAfterFailure = state.setIn(['message'], action.message);
      newStateAfterFailure = newStateAfterFailure.setIn(['loading'], false);
      return newStateAfterFailure;
    case LOGOUT_REQUEST:
      return state;
    case LOGOUT_SUCCESS:
      let newerState = state.deleteIn(['token']);
      return newerState.setIn(['isAuthenticated'], false);
  }
  return state;
}