import App from '../components/App'
import { connect } from 'react-redux';
import { loginRequest, logoutRequest } from '../actions/authActions';

const mapStateToProps = (state) => ({
  isAuthenticated: state.get('auth').get('isAuthenticated'),
  token: state.get('auth').get('token')
});

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick() { 
    dispatch(logoutRequest());
  },
  onLoginClick(email, password) {
    dispatch(loginRequest(email, password));
  }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;