import createPurchaseService from '../services/purchasesService'
import { createPurchaseSuccess, 
         createPurchaseFailure
       } from '../actions/purchasesActions';
import { CREATE_PURCHASE_REQUEST } from '../actions/purchasesActions';
import { logoutSuccess } from '../actions/authActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { browserHistory, hashHistory } from 'react-router';

const purchasesMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case CREATE_PURCHASE_REQUEST:
      createPurchaseMiddlewareAction(next, action);
      break
    default:
      break
  }
};

function createPurchaseMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message, "error"));
    next(createPurchaseFailure(err.message));
  };

  const success = (response) => {
    next(setMessage("Compra creada exitosamente", "success")); // not gonna show because of route change ??? how to fix ???
    next(createPurchaseSuccess(response));
    if (action.redirect) {
      hashHistory.push('/');
    }
  };

  createPurchaseService(action, success, error);
}

export default purchasesMiddleware