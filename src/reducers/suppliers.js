import {Map, fromJS} from 'immutable';
import { CREATE_SUPPLIER_REQUEST, CREATE_SUPPLIER_SUCCESS, CREATE_SUPPLIER_FAILURE } from '../actions/suppliersActions';
import { GET_SUPPLIER_REQUEST, GET_SUPPLIER_SUCCESS, GET_SUPPLIER_FAILURE } from '../actions/suppliersActions';
import { UPDATE_SUPPLIER_REQUEST, UPDATE_SUPPLIER_SUCCESS, UPDATE_SUPPLIER_FAILURE } from '../actions/suppliersActions';
import { GET_SUPPLIERS_REQUEST, GET_SUPPLIERS_SUCCESS, GET_SUPPLIERS_FAILURE } from '../actions/suppliersActions';
import { DELETE_SUPPLIER_REQUEST, DELETE_SUPPLIER_SUCCESS, DELETE_SUPPLIER_FAILURE } from '../actions/suppliersActions';
const INIT_STATE = fromJS({ list: [], supplier: {}, loading: false });

export default function suppliers(state, action) {
  switch (action.type) {
    case CREATE_SUPPLIER_REQUEST:
      return state.setIn(['loading'], true);
    case CREATE_SUPPLIER_SUCCESS:
      let newState = state.deleteIn(['supplier']);
      newState = newState.setIn(['loading'], false);
      return newState;
    case CREATE_SUPPLIER_FAILURE:
      return state.setIn(['loading'], false);
    case GET_SUPPLIER_REQUEST:
      return state.setIn(['loading'], true);
    case GET_SUPPLIER_SUCCESS:
      let getSuccess = state.setIn(['supplier'], fromJS(action.supplier));
      return getSuccess.setIn(['loading'], false);
    case GET_SUPPLIER_FAILURE:
      return state.setIn(['loading'], false);
    case UPDATE_SUPPLIER_REQUEST:
      return state.setIn(['loading'], true);
    case UPDATE_SUPPLIER_SUCCESS:
      return state.setIn(['loading'], false);
    case UPDATE_SUPPLIER_FAILURE:
      return state.setIn(['loading'], false);
    case GET_SUPPLIERS_REQUEST:
      return state.setIn(['loading'], true);
    case GET_SUPPLIERS_SUCCESS:
      let getListSuccess = state.setIn(['list', 'suppliers'], fromJS(action.suppliers));
      getListSuccess = getListSuccess.setIn(['list', 'totalPages'], fromJS(action.totalPages));
      getListSuccess = getListSuccess.setIn(['list', 'currentPage'], fromJS(action.currentPage));
      return getListSuccess.setIn(['loading'], false);
    case GET_SUPPLIERS_FAILURE:
      return state.setIn(['loading'], false);
    case DELETE_SUPPLIER_REQUEST:
      return state.setIn(['loading'], true);
    case DELETE_SUPPLIER_SUCCESS:
      return state.setIn(['loading'], false);
    case DELETE_SUPPLIER_FAILURE:
      return state.setIn(['loading'], false);
  }
  return state;
}