import createPurchaseService, { getPurchaseService, updatePurchaseService } from '../services/purchasesService'
import { createPurchaseSuccess, 
         createPurchaseFailure,
         getPurchaseSuccess, 
         getPurchaseFailure,
         updatePurchaseSuccess, 
         updatePurchaseFailure,
       } from '../actions/purchasesActions';
import { CREATE_PURCHASE_REQUEST, GET_PURCHASE_REQUEST, UPDATE_PURCHASE_REQUEST } from '../actions/purchasesActions';
import { logoutSuccess } from '../actions/authActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { browserHistory, hashHistory } from 'react-router';

const purchasesMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case CREATE_PURCHASE_REQUEST:
      createPurchaseMiddlewareAction(next, action);
      break
    case GET_PURCHASE_REQUEST:
      getPurchaseMiddlewareAction(next, action);
      break
    case UPDATE_PURCHASE_REQUEST:
      updatePurchaseMiddlewareAction(next, action);
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
      hashHistory.push('/purchases');
    }
  };

  createPurchaseService(action, success, error);
}

function getPurchaseMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(getPurchaseFailure(err.message));
    hashHistory.push('/purchases');
  };

  const success = (response) => {
    next(getPurchaseSuccess(response));
  };

  getPurchaseService(action, success, error);
};

function updatePurchaseMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(updatePurchaseFailure(err.message));
  };

  const success = () => {
    next(setMessage("Tela actualizada exitosamente", "success")); // not gonna show because of route change ??? how to fix ???
    next(updatePurchaseSuccess());
    if (action.redirect) {
      hashHistory.push('/purchases');
    }
  };

  updatePurchaseService(action, success, error);
};

export default purchasesMiddleware