import createClientService, { getClientService, updateClientService, getClientsService, deleteClientService } from '../services/clientsService'
import { createClientSuccess, 
         createClientFailure, 
         getClientSuccess, 
         getClientFailure,
         updateClientSuccess, 
         updateClientFailure, 
         getClientsRequest,
         getClientsSuccess,
         getClientsFailure,
         deleteClientSuccess, 
         deleteClientFailure
       } from '../actions/clientsActions';
import { logoutSuccess } from '../actions/authActions';
import { CREATE_CLIENT_REQUEST, GET_CLIENT_REQUEST, UPDATE_CLIENT_REQUEST, GET_CLIENTS_REQUEST, DELETE_CLIENT_REQUEST } from '../actions/clientsActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { browserHistory, hashHistory } from 'react-router';
import { processErrorMessages } from '../lib/utility'

const clientsMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case CREATE_CLIENT_REQUEST:
      createClientMiddlewareAction(next, action);
      break
    case GET_CLIENT_REQUEST:
      getClientMiddlewareAction(next, action);
      break
    case UPDATE_CLIENT_REQUEST:
      updateClientMiddlewareAction(next, action);
      break
    case GET_CLIENTS_REQUEST:
      getClientsMiddlewareAction(next, action);
      break
    case DELETE_CLIENT_REQUEST:
      deleteClientMiddlewareAction(next, action);
      break
    default:
      break
  }
};

function createClientMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    let errors = ["El cliente no pudo ser creado"];
    
    let body = err.response.body;
    let errorJson = {};
    if(body != undefined) {
      errorJson = body.errors
    }
    errors = errors.concat(processErrorMessages(errorJson));

    next(setMessage(errors, "error"));
    next(createClientFailure(err.message));
  };

  const success = (response) => {
    next(setMessage(["Cliente creado exitosamente"], "success")); // not gonna show because of route change ??? how to fix ???
    next(createClientSuccess(response));
    if (action.redirect) {
      hashHistory.push('/clients/'+response.id);
    }
  };

  createClientService(action, success, error);
}

function getClientsMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage([err.message], "error"));
    next(getClientsFailure(err.message));
  };

  const success = (response) => {
    next(getClientsSuccess(response));
  };

  getClientsService(action, success, error);
};

function getClientMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage([err.message], "error"));
    next(getClientFailure(err.message));
  };

  const success = (response) => {
    next(getClientSuccess(response));
  };

  getClientService(action, success, error);
};

function updateClientMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    let errors = ["El cliente no pudo ser actualizado"];
    
    let body = err.response.body;
    let errorJson = {};
    if(body != undefined) {
      errorJson = body.errors
    }
    errors = errors.concat(processErrorMessages(errorJson));

    next(setMessage(errors, "error"));
    next(updateClientFailure(err.message));
  };

  const success = () => {
    next(setMessage(["Cliente actualizado exitosamente"], "success")); // not gonna show because of route change ??? how to fix ???
    next(updateClientSuccess());
    if (action.redirect) {
      hashHistory.push('/clients/'+action.client.id);
    }
  };

  updateClientService(action, success, error);
};

function deleteClientMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage([err.message], "error"));
    next(deleteClientFailure(err.message));
  };

  const success = (response) => {
    next(setMessage(["Cliente eliminado exitosamente"], "success")); // not gonna show because of route change ??? how to fix ???
    next(deleteClientSuccess());
    if (action.redirect) {
      hashHistory.push('/clients');
    }
  };

  deleteClientService(action, success, error);
};

export default clientsMiddleware