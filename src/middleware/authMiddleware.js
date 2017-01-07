import authService from '../services/authService'
import { loginSuccess, loginFailure, logoutSuccess, LOGIN_REQUEST, LOGOUT_REQUEST } from '../actions/authActions';
import { browserHistory } from 'react-router';

const authMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case LOGIN_REQUEST:

      const error = (err) => {
        return next(loginFailure("Invalid email / password"));
      };

      const success = (response) => {
        localStorage.setItem('token', response.auth_token)
        next(loginSuccess(response));
      };

      authService(action, success, error);
      
      break
    case LOGOUT_REQUEST:
      localStorage.removeItem('token');
      next(logoutSuccess());
    default:
      break
  }

};

export default authMiddleware