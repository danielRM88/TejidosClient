import {Map, fromJS} from 'immutable';
import { CREATE_CLIENT_REQUEST, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAILURE } from '../actions/clientsActions';
import { GET_CLIENT_REQUEST, GET_CLIENT_SUCCESS, GET_CLIENT_FAILURE } from '../actions/clientsActions';
import { UPDATE_CLIENT_REQUEST, UPDATE_CLIENT_SUCCESS, UPDATE_CLIENT_FAILURE } from '../actions/clientsActions';
import { GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAILURE } from '../actions/clientsActions';
import { DELETE_CLIENT_REQUEST, DELETE_CLIENT_SUCCESS, DELETE_CLIENT_FAILURE } from '../actions/clientsActions';
const INIT_STATE = fromJS({ list: [], client: {}, loading: false });

export default function clients(state, action) {
  switch (action.type) {
    case CREATE_CLIENT_REQUEST:
      return state.setIn(['loading'], true);
    case CREATE_CLIENT_SUCCESS:
      let newState = state.deleteIn(['client']);
      newState = newState.setIn(['loading'], false);
      return newState;
    case CREATE_CLIENT_FAILURE:
      return state.setIn(['loading'], false);
    case GET_CLIENT_REQUEST:
      return state.setIn(['loading'], true);
    case GET_CLIENT_SUCCESS:
      let getSuccess = state.setIn(['client'], fromJS(action.client));
      return getSuccess.setIn(['loading'], false);
    case GET_CLIENT_FAILURE:
      return state.setIn(['loading'], false);
    case UPDATE_CLIENT_REQUEST:
      return state.setIn(['loading'], true);
    case UPDATE_CLIENT_SUCCESS:
      return state.setIn(['loading'], false);
    case UPDATE_CLIENT_FAILURE:
      return state.setIn(['loading'], false);
    case GET_CLIENTS_REQUEST:
      return state.setIn(['loading'], true);
    case GET_CLIENTS_SUCCESS:
      let getListSuccess = state.setIn(['list', 'clients'], fromJS(action.clients));
      getListSuccess = getListSuccess.setIn(['list', 'totalPages'], fromJS(action.totalPages));
      getListSuccess = getListSuccess.setIn(['list', 'currentPage'], fromJS(action.currentPage));
      return getListSuccess.setIn(['loading'], false);
    case GET_CLIENTS_FAILURE:
      return state.setIn(['loading'], false);
    case DELETE_CLIENT_REQUEST:
      return state.setIn(['loading'], true);
    case DELETE_CLIENT_SUCCESS:
      return state.setIn(['loading'], false);
    case DELETE_CLIENT_FAILURE:
      return state.setIn(['loading'], false);
  }
  return state;
}