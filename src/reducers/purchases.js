import {Map, fromJS} from 'immutable';
import { CREATE_PURCHASE_REQUEST, 
         CREATE_PURCHASE_SUCCESS, 
         CREATE_PURCHASE_FAILURE, 
         GET_PURCHASE_REQUEST, 
         GET_PURCHASE_SUCCESS, 
         GET_PURCHASE_FAILURE, 
         UPDATE_PURCHASE_REQUEST,
         UPDATE_PURCHASE_SUCCESS,
         UPDATE_PURCHASE_FAILURE,
         ADD_INVENTORY, 
         REMOVE_INVENTORY, 
         ADD_SUPPLIER } from '../actions/purchasesActions';

const INIT_STATE = fromJS({ list: [], purchase: {inventories: []}, loading: false });

export default function purchases(state, action) {
  switch (action.type) {
    case CREATE_PURCHASE_REQUEST:
      return state.setIn(['loading'], true);
    case CREATE_PURCHASE_SUCCESS:
      let newState = state.deleteIn(['purchase']);
      newState = newState.setIn(['loading'], false);
      return newState;
    case CREATE_PURCHASE_FAILURE:
      return state.setIn(['loading'], false);
    case CREATE_PURCHASE_FAILURE:
      return state.setIn(['purchase'], fromJS({inventories: []}));
    case GET_PURCHASE_REQUEST:
      return state.setIn(['loading'], true);
    case GET_PURCHASE_SUCCESS:
      let getSuccess = state.setIn(['purchase'], fromJS(action.purchase));
      return getSuccess.setIn(['loading'], false);
    case GET_PURCHASE_FAILURE:
      return state.setIn(['loading'], false);
    case UPDATE_PURCHASE_REQUEST:
      return state.setIn(['loading'], true);
    case UPDATE_PURCHASE_SUCCESS:
      return state.setIn(['loading'], false);
    case UPDATE_PURCHASE_FAILURE:
      return state.setIn(['loading'], false);
    case ADD_INVENTORY:
      return state.updateIn(['purchase', 'inventories'], arr => arr.push(action.inventory))
    case REMOVE_INVENTORY:
      let inventories = state.get("purchase").get("inventories");
      let filetered = inventories.filter((inventory, index) => {
        return ( inventory.index !== action.index );
      });
      return state.setIn(["purchase", "inventories"], filetered);
    case ADD_SUPPLIER:
      return state.setIn(["purchase", "supplier_id"], action.supplierId)
  }
  return state;
}