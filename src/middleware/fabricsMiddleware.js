import createFabricService, { getFabricService } from '../services/fabricsService'
import { createFabricSuccess, 
         createFabricFailure, 
         getFabricSuccess, 
         getFabricFailure, 
         updateFabricSuccess, 
         updateFabricFailure 
       } from '../actions/fabricsActions';
import { CREATE_FABRIC_REQUEST, GET_FABRIC_REQUEST, UPDATE_FABRIC_REQUEST } from '../actions/fabricsActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { browserHistory } from 'react-router';

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
        browserHistory.push('/fabrics/'+response.id);
      };

      createFabricService(action, success, error);
      
      break
    case GET_FABRIC_REQUEST:
      getFabricReducerAction(next, action);
      break
    case UPDATE_FABRIC_REQUEST:
      updateFabricReducerAction(next, action);
      break
    default:
      break
  }
};

function getFabricReducerAction(next, action) {
  const error = (err) => {
    next(setMessage(err.message));
    next(getFabricFailure(err.message));
  };

  const success = (response) => {
    next(getFabricSuccess(response));
  };

  getFabricService(action, success, error);
};

function updateFabricReducerAction(next, action) {
  const error = (err) => {
    next(setMessage(err.message));
    next(updateFabricFailure(err.message));
  };

  const success = (response) => {
    next(updateFabricSuccess(response));
  };

  getFabricService(action, success, error);
};

export default fabricsMiddleware