import createFabricService, { getFabricService, updateFabricService, getFabricsService } from '../services/fabricsService'
import { createFabricSuccess, 
         createFabricFailure, 
         getFabricSuccess, 
         getFabricFailure,
         updateFabricSuccess, 
         updateFabricFailure, 
         getFabricsSuccess,
         getFabricsFailure 
       } from '../actions/fabricsActions';
import { CREATE_FABRIC_REQUEST, GET_FABRIC_REQUEST, UPDATE_FABRIC_REQUEST, GET_FABRICS_REQUEST } from '../actions/fabricsActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { browserHistory, hashHistory } from 'react-router';

const fabricsMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case CREATE_FABRIC_REQUEST:

      const error = (err) => {
        next(setMessage(err.message));
        next(createFabricFailure(err.message));
      };

      const success = (response) => {
        next(createFabricSuccess(response));
        hashHistory.push('/fabrics/'+response.id);
      };

      createFabricService(action, success, error);
      
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
    default:
      break
  }
};

function getFabricsMiddlewareAction(next, action) {
  const error = (err) => {
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
    next(setMessage(err.message));
    next(updateFabricFailure(err.message));
  };

  const success = () => {
    next(updateFabricSuccess());
    hashHistory.push('/fabrics');
  };

  updateFabricService(action, success, error);
};

export default fabricsMiddleware