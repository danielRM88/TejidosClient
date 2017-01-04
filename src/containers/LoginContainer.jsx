import Login from '../components/Login'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  message: state.get('auth').get('message')
});

const ConnectedLogin = connect(mapStateToProps, null)(Login);
export default ConnectedLogin