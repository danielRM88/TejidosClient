import getStocksService from '../services/stocksService'
import { getStocksRequest,
         getStocksSuccess,
         getStocksFailure
       } from '../actions/stocksActions';
import { logoutSuccess } from '../actions/authActions';
import { GET_STOCKS_REQUEST } from '../actions/stocksActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { browserHistory, hashHistory } from 'react-router';

const stocksMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case GET_STOCKS_REQUEST:
      getStocksMiddlewareAction(next, action);
      break
    default:
      break
  }
};

function getStocksMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(getStocksFailure(err.message));
  };

  const success = (response) => {
    next(getStocksSuccess(response));
  };

  getStocksService(action, success, error);
};

export default stocksMiddleware