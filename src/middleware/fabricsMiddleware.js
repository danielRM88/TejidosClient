import createFabricService, { getFabricService, updateFabricService, getFabricsService, deleteFabricService } from '../services/fabricsService'
import { createFabricSuccess, 
         createFabricFailure, 
         getFabricSuccess, 
         getFabricFailure,
         updateFabricSuccess, 
         updateFabricFailure, 
         getFabricsRequest,
         getFabricsSuccess,
         getFabricsFailure,
         deleteFabricSuccess, 
         deleteFabricFailure
       } from '../actions/fabricsActions';
import { logoutSuccess } from '../actions/authActions';       
import { CREATE_FABRIC_REQUEST, GET_FABRIC_REQUEST, UPDATE_FABRIC_REQUEST, GET_FABRICS_REQUEST, DELETE_FABRIC_REQUEST } from '../actions/fabricsActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { browserHistory, hashHistory } from 'react-router';

const fabricsMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case CREATE_FABRIC_REQUEST:
      createFabricMiddlewareAction(next, action);
      break
    case GET_FABRIC_REQUEST:
      getFabricMiddlewareAction(next, action);
      break
    case UPDATE_FABRIC_REQUEST:
      updateFabricMiddlewareAction(next, action);
      break
    case GET_FABRICS_REQUEST:
      getFabricsMiddlewareAction(next, action);
      break
    case DELETE_FABRIC_REQUEST:
      deleteFabricMiddlewareAction(next, action);
      break
    default:
      break
  }
};

function createFabricMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message, "error"));
    next(createFabricFailure(err.message));
  };

  const success = (response) => {
    next(setMessage("Tela creada exitosamente", "success")); // not gonna show because of route change ??? how to fix ???
    next(createFabricSuccess(response));
    if (action.redirect) {
      hashHistory.push('/fabrics/'+response.id);
    }
  };

  createFabricService(action, success, error);
}

function getFabricsMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(getFabricsFailure(err.message));
  };

  const success = (response) => {
    next(getFabricsSuccess(response));
  };

  getFabricsService(action, success, error);
};

function getFabricMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(getFabricFailure(err.message));
  };

  const success = (response) => {
    next(getFabricSuccess(response));
  };

  getFabricService(action, success, error);
};

function updateFabricMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(updateFabricFailure(err.message));
  };

  const success = () => {
    next(setMessage("Tela actualizada exitosamente", "success")); // not gonna show because of route change ??? how to fix ???
    next(updateFabricSuccess());
    if (action.redirect) {
      hashHistory.push('/fabrics/'+action.fabric.id);
    }
  };

  updateFabricService(action, success, error);
};

function deleteFabricMiddlewareAction(next, action) {
  const error = (err) => {
    if (err.status == 401) {
      next(logoutSuccess());
    }
    next(setMessage(err.message));
    next(deleteFabricFailure(err.message));
  };

  const success = (response) => {
    next(setMessage("Tela eliminada exitosamente", "success")); // not gonna show because of route change ??? how to fix ???
    next(deleteFabricSuccess());
    if (action.redirect) {
      hashHistory.push('/fabrics');
    }
  };

  deleteFabricService(action, success, error);
};

export default fabricsMiddleware