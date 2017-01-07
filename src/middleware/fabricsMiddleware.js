import createFabricService from '../services/fabricsService'
import { createFabricSuccess, createFabricFailure, CREATE_FABRIC_REQUEST, CREATE_FABRIC_SUCCESS, CREATE_FABRIC_FAILURE } from '../actions/fabricsActions';
import { browserHistory } from 'react-router';

const fabricsMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case CREATE_FABRIC_REQUEST:

      const error = (err) => {
        return next(createFabricFailure(err.message));
      };

      const success = (response) => {
        next(createFabricSuccess(response));
        browserHistory.push('/');
      };

      createFabricService(action, success, error);
      
      break
    default:
      break
  }

};

export default fabricsMiddleware