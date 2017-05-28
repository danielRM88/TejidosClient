import authService from '../services/authService'
import { loginSuccess, loginFailure, logoutSuccess, LOGIN_REQUEST, LOGOUT_REQUEST } from '../actions/authActions';
import { setMessage, removeMessage } from '../actions/messagesActions';
import { hashHistory } from 'react-router';

const authMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case LOGIN_REQUEST:

      const error = (err) => {
        next(setMessage("Invalid email / password", "error"));
        next(loginFailure("Invalid email / password"));
      };

      const success = (response) => {
        localStorage.setItem('token', response.auth_token)
        next(removeMessage());
        next(loginSuccess(response));
        hashHistory.push('/');
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