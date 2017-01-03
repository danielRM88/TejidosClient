import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Navbar from './Navbar';
import Login from './Login';
import { loginRequest, logoutRequest } from '../actions/authActions';

const App = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { isAuthenticated, dispatch } = this.props;
    if(isAuthenticated) {
      return (
        <div>
          <Navbar onLogoutClick={ () => dispatch(logoutRequest()) } />
          {this.props.children}
        </div>
      )
    } else {
      return <Login onLoginClick={ (email, password) => dispatch(loginRequest(email, password)) } />
    }
  }
});

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.get('auth').get('isAuthenticated'),
    token: state.get('auth').get('token')
});

const ConnectedApp = connect(mapStateToProps, null)(App);
export default ConnectedApp;