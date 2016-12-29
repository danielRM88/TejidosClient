import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Home from './Home';
import Navbar from './Navbar';
import { loginUser } from './../actions';

const Login =  React.createClass({
  render: function() {
    console.log(this.props);
    const { isAuthenticated } = this.props
    return ( 
      <div>
        <h1>Login, {isAuthenticated.toString()}</h1> 
        <button onClick={(event) => this.handleClick(event)}> Login </button>
      </div>
    )
  },
  handleClick: function(event) {
    this.props.onLoginClick();
  }
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

connect(mapStateToProps)(Login);
export default Login;