import Login from '../components/Login'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  loading: state.get('auth').get('loading')
});

const ConnectedLogin = connect(mapStateToProps, null)(Login);
export default ConnectedLogin