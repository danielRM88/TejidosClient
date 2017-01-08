import {Map, fromJS} from 'immutable';
import { CREATE_FABRIC_REQUEST, CREATE_FABRIC_SUCCESS, CREATE_FABRIC_FAILURE } from '../actions/fabricsActions';
const INIT_STATE = fromJS({ list: [], fabric: {}, loading: false });

export default function fabrics(state, action) {
  switch (action.type) {
    case CREATE_FABRIC_REQUEST:
      let newStateAfterReq = state.deleteIn(['message']);
      return newStateAfterReq.setIn(['loading'], true);
    case CREATE_FABRIC_SUCCESS:
      let newState = state.deleteIn(['fabric']);
      newState = newState.setIn(['loading'], false);
      newState = newState.setIn(['message'], action.message);
      return newState;
    case CREATE_FABRIC_FAILURE:
      let newStateAfterFabric = state.setIn(['message'], action.message);
      newStateAfterFabric = newStateAfterFabric.setIn(['loading'], false);
      return newStateAfterFabric;
  }
  return state;
}