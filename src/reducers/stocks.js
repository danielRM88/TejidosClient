import {Map, fromJS} from 'immutable';
import { GET_STOCKS_REQUEST, GET_STOCKS_SUCCESS, GET_STOCKS_FAILURE } from '../actions/stocksActions';
const INIT_STATE = fromJS({ list: [], stock: {}, loading: false });

export default function stocks(state, action) {
  switch (action.type) {
    case GET_STOCKS_REQUEST:
      return state.setIn(['loading'], true);
    case GET_STOCKS_SUCCESS:
      let getListSuccess = state.setIn(['list', 'stocks'], fromJS(action.stocks));
      getListSuccess = getListSuccess.setIn(['list', 'totalPages'], fromJS(action.totalPages));
      getListSuccess = getListSuccess.setIn(['list', 'currentPage'], fromJS(action.currentPage));
      return getListSuccess.setIn(['loading'], false);
    case GET_STOCKS_FAILURE:
      return state.setIn(['loading'], false);
  }
  return state;
}