import createInvoiceService, { getInvoiceService, updateInvoiceService, getInvoicesService, deleteInvoiceService } from '../services/invoicesService'
import { createInvoiceSuccess, 
         createInvoiceFailure,
         getInvoiceSuccess, 
         getInvoiceFailure,
         updateInvoiceSuccess, 
         updateInvoiceFailure,
         getInvoicesRequest,
         getInvoicesSuccess,
         getInvoicesFailure,
         deleteInvoiceSuccess, 
         deleteInvoiceFailure
       } from '../actions/invoicesActions';
import { CREATE_INVOICE_REQUEST, GET_INVOICE_REQUEST, UPDATE_INVOICE_REQUEST, GET_INVOICES_REQUEST, DELETE_INVOICE_REQUEST } from '../actions/invoicesActions';
import { logoutSuccess } from '../actions/authActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { browserHistory, hashHistory } from 'react-router';

const invoicesMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case CREATE_INVOICE_REQUEST:
      createInvoiceMiddlewareAction(next, action);
      break
    case GET_INVOICE_REQUEST:
      getInvoiceMiddlewareAction(next, action);
      break
    case UPDATE_INVOICE_REQUEST:
      updateInvoiceMiddlewareAction(next, action);
      break
    case GET_INVOICES_REQUEST:
      getInvoicesMiddlewareAction(next, action);
      break
    case DELETE_INVOICE_REQUEST:
      deleteInvoiceMiddlewareAction(next, action);
      break
    default:
      break
  }
};

function createInvoiceMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message, "error"));
    next(createInvoiceFailure(err.message));
  };

  const success = (response) => {
    next(setMessage("Compra creada exitosamente", "success")); // not gonna show because of route change ??? how to fix ???
    next(createInvoiceSuccess(response));
    if (action.redirect) {
      hashHistory.push('/invoices');
    }
  };

  createInvoiceService(action, success, error);
}

function getInvoiceMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(getInvoiceFailure(err.message));
    hashHistory.push('/invoices');
  };

  const success = (response) => {
    next(getInvoiceSuccess(response));
  };

  getInvoiceService(action, success, error);
};

function getInvoicesMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(getInvoicesFailure(err.message));
  };

  const success = (response) => {
    next(getInvoicesSuccess(response));
  };

  getInvoicesService(action, success, error);
};

function updateInvoiceMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(updateInvoiceFailure(err.message));
  };

  const success = () => {
    next(setMessage("Tela actualizada exitosamente", "success")); // not gonna show because of route change ??? how to fix ???
    next(updateInvoiceSuccess());
    if (action.redirect) {
      hashHistory.push('/invoices');
    }
  };

  updateInvoiceService(action, success, error);
};

function deleteInvoiceMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(deleteInvoiceFailure(err.message));
  };

  const success = (response) => {
    next(setMessage("Compra eliminada exitosamente", "success")); // not gonna show because of route change ??? how to fix ???
    next(deleteInvoiceSuccess());
    if (action.redirect) {
      hashHistory.push('/invoices');
    }
  };

  deleteInvoiceService(action, success, error);
};

export default invoicesMiddleware