import authService from '../services/authService'
import { loginSuccess, loginFailure, logoutSuccess } from '../actions/authActions';

const authMiddleware = store => next => action => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      next(action)

      const error = (err) => {
        return next(loginFailure("Invalid email / password"));
      };

      const success = (response) => {
        localStorage.setItem('token', response.auth_token)
        next(loginSuccess(response));
      };

      authService(action, success, error);
      
      break
    case 'LOGOUT_REQUEST':
      next(action)
      localStorage.removeItem('token');
      next(logoutSuccess());
    /*
    Do nothing if the action does not interest us
    */
    default:
      break
  }

};

export default authMiddleware