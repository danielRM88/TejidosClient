import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Login = React.createClass({
  render: function () {
    const { message } = this.props
    return ( 
      <div>
        <h1>Login</h1>
        <form onSubmit={(event) => this.handleClick(event)}>
          <input type="text" ref="email" name="email" placeholder="email"/>
          <input type="password" ref="password" name="password" placeholder="password"/>
          <button type="submit"> Login </button>
        </form>
        <p>{message}</p>
      </div>
    )
  },
  handleClick: function (event) {
    event.preventDefault();
    event.stopPropagation();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    this.props.onLoginClick(email, password);
  }
});

Login.propTypes = {
  message: React.PropTypes.string
}

export default Login