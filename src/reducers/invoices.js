import {Map, fromJS} from 'immutable';
import { CREATE_INVOICE_REQUEST, 
         CREATE_INVOICE_SUCCESS, 
         CREATE_INVOICE_FAILURE, 
         GET_INVOICE_REQUEST, 
         GET_INVOICE_SUCCESS, 
         GET_INVOICE_FAILURE, 
         UPDATE_INVOICE_REQUEST,
         UPDATE_INVOICE_SUCCESS,
         UPDATE_INVOICE_FAILURE,
         GET_INVOICES_REQUEST, 
         GET_INVOICES_SUCCESS, 
         GET_INVOICES_FAILURE, 
         DELETE_INVOICE_REQUEST, 
         DELETE_INVOICE_SUCCESS, 
         DELETE_INVOICE_FAILURE,
         ADD_INVENTORY, 
         REMOVE_INVENTORY, 
         ADD_SUPPLIER } from '../actions/invoicesActions';

const INIT_STATE = fromJS({ list: [], invoice: {sales: []}, loading: false });

export default function invoices(state, action) {
  switch (action.type) {
    case CREATE_INVOICE_REQUEST:
      return state.setIn(['loading'], true);
    case CREATE_INVOICE_SUCCESS:
      let newState = state.deleteIn(['invoice']);
      newState = newState.setIn(['loading'], false);
      return newState;
    case CREATE_INVOICE_FAILURE:
      return state.setIn(['loading'], false);
    case CREATE_INVOICE_FAILURE:
      return state.setIn(['invoice'], fromJS({sales: []}));
    case GET_INVOICE_REQUEST:
      return state.setIn(['loading'], true);
    case GET_INVOICE_SUCCESS:
      let getSuccess = state.setIn(['invoice'], fromJS(action.invoice));
      return getSuccess.setIn(['loading'], false);
    case GET_INVOICE_FAILURE:
      return state.setIn(['loading'], false);
    case UPDATE_INVOICE_REQUEST:
      return state.setIn(['loading'], true);
    case UPDATE_INVOICE_SUCCESS:
      return state.setIn(['loading'], false);
    case UPDATE_INVOICE_FAILURE:
      return state.setIn(['loading'], false);
    case GET_INVOICES_REQUEST:
      return state.setIn(['loading'], true);
    case GET_INVOICES_SUCCESS:
      let getListSuccess = state.setIn(['list', 'invoices'], fromJS(action.invoices));
      getListSuccess = getListSuccess.setIn(['list', 'totalPages'], fromJS(action.totalPages));
      getListSuccess = getListSuccess.setIn(['list', 'currentPage'], fromJS(action.currentPage));
      return getListSuccess.setIn(['loading'], false);
    case GET_INVOICES_FAILURE:
      return state.setIn(['loading'], false);
    case DELETE_INVOICE_REQUEST:
      return state.setIn(['loading'], true);
    case DELETE_INVOICE_SUCCESS:
      return state.setIn(['loading'], false);
    case DELETE_INVOICE_FAILURE:
      return state.setIn(['loading'], false);
  }
  return state;
}