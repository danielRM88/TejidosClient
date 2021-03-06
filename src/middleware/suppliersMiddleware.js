import createSupplierService, { getSupplierService, updateSupplierService, getSuppliersService, deleteSupplierService } from '../services/suppliersService'
import { createSupplierSuccess, 
         createSupplierFailure, 
         getSupplierSuccess, 
         getSupplierFailure,
         updateSupplierSuccess, 
         updateSupplierFailure, 
         getSuppliersRequest,
         getSuppliersSuccess,
         getSuppliersFailure,
         deleteSupplierSuccess, 
         deleteSupplierFailure
       } from '../actions/suppliersActions';
import { logoutSuccess } from '../actions/authActions';
import { CREATE_SUPPLIER_REQUEST, GET_SUPPLIER_REQUEST, UPDATE_SUPPLIER_REQUEST, GET_SUPPLIERS_REQUEST, DELETE_SUPPLIER_REQUEST } from '../actions/suppliersActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { browserHistory, hashHistory } from 'react-router';
import { processErrorMessages } from '../lib/utility'

const suppliersMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case CREATE_SUPPLIER_REQUEST:
      createSupplierMiddlewareAction(next, action);
      break
    case GET_SUPPLIER_REQUEST:
      getSupplierMiddlewareAction(next, action);
      break
    case UPDATE_SUPPLIER_REQUEST:
      updateSupplierMiddlewareAction(next, action);
      break
    case GET_SUPPLIERS_REQUEST:
      getSuppliersMiddlewareAction(next, action);
      break
    case DELETE_SUPPLIER_REQUEST:
      deleteSupplierMiddlewareAction(next, action);
      break
    default:
      break
  }
};

function createSupplierMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    let errors = ["El proveedor no pudo ser creado"];
    
    let body = err.response.body;
    let errorJson = {};
    if(body != undefined) {
      errorJson = body.errors
    }
    errors = errors.concat(processErrorMessages(errorJson));

    next(setMessage(errors, "error"));
    next(createSupplierFailure(err.message));
  };

  const success = (response) => {
    next(setMessage(["Proveedor creado exitosamente"], "success")); // not gonna show because of route change ??? how to fix ???
    next(createSupplierSuccess(response));
    if (action.redirect) {
      hashHistory.push('/suppliers/'+response.id);
    }
  };

  createSupplierService(action, success, error);
}

function getSuppliersMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage([err.message], "error"));
    next(getSuppliersFailure(err.message));
  };

  const success = (response) => {
    next(getSuppliersSuccess(response));
  };

  getSuppliersService(action, success, error);
};

function getSupplierMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage([err.message], "error"));
    next(getSupplierFailure(err.message));
  };

  const success = (response) => {
    next(getSupplierSuccess(response));
  };

  getSupplierService(action, success, error);
};

function updateSupplierMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    let errors = ["El proveedor no pudo ser actualizado"];
    
    let body = err.response.body;
    let errorJson = {};
    if(body != undefined) {
      errorJson = body.errors
    }
    errors = errors.concat(processErrorMessages(errorJson));

    next(setMessage(errors, "error"));
    next(updateSupplierFailure(err.message));
  };

  const success = () => {
    next(setMessage(["Proveedor actualizado exitosamente"], "success")); // not gonna show because of route change ??? how to fix ???
    next(updateSupplierSuccess());
    if (action.redirect) {
      hashHistory.push('/suppliers/'+action.supplier.id);
    }
  };

  updateSupplierService(action, success, error);
};

function deleteSupplierMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage([err.message], "error"));
    next(deleteSupplierFailure(err.message));
  };

  const success = (response) => {
    next(setMessage(["Proveedor eliminado exitosamente"], "success")); // not gonna show because of route change ??? how to fix ???
    next(deleteSupplierSuccess());
    if (action.redirect) {
      hashHistory.push('/suppliers');
    }
  };

  deleteSupplierService(action, success, error);
};

export default suppliersMiddleware