import {Map, fromJS} from 'immutable';
import { CREATE_FABRIC_REQUEST, CREATE_FABRIC_SUCCESS, CREATE_FABRIC_FAILURE } from '../actions/fabricsActions';
import { GET_FABRIC_REQUEST, GET_FABRIC_SUCCESS, GET_FABRIC_FAILURE } from '../actions/fabricsActions';
import { UPDATE_FABRIC_REQUEST, UPDATE_FABRIC_SUCCESS, UPDATE_FABRIC_FAILURE } from '../actions/fabricsActions';
import { GET_FABRICS_REQUEST, GET_FABRICS_SUCCESS, GET_FABRICS_FAILURE } from '../actions/fabricsActions';
const INIT_STATE = fromJS({ list: [], fabric: {}, loading: false });

export default function fabrics(state, action) {
  switch (action.type) {
    case CREATE_FABRIC_REQUEST:
      return state.setIn(['loading'], true);
    case CREATE_FABRIC_SUCCESS:
      let newState = state.deleteIn(['fabric']);
      newState = newState.setIn(['loading'], false);
      return newState;
    case CREATE_FABRIC_FAILURE:
      return state.setIn(['loading'], false);
    case GET_FABRIC_REQUEST:
      return state.setIn(['loading'], true);
    case GET_FABRIC_SUCCESS:
      let getSuccess = state.setIn(['fabric'], fromJS(action.fabric));
      return getSuccess.setIn(['loading'], false);
    case GET_FABRIC_FAILURE:
      return state.setIn(['loading'], false);
    case UPDATE_FABRIC_REQUEST:
      return state.setIn(['loading'], true);
    case UPDATE_FABRIC_SUCCESS:
      let getUpdateSuccess = state.deleteIn(['fabric'], fromJS(action.fabric));
      return getUpdateSuccess.setIn(['loading'], false);
    case UPDATE_FABRIC_FAILURE:
      return state.setIn(['loading'], false);
    case GET_FABRICS_REQUEST:
      return state.setIn(['loading'], true);
    case GET_FABRICS_SUCCESS:
      let getListSuccess = state.setIn(['list'], fromJS(action.fabrics));
      return getListSuccess.setIn(['loading'], false);
    case GET_FABRICS_FAILURE:
      return state.setIn(['loading'], false);
  }
  return state;
}