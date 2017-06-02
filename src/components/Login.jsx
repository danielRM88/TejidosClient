import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Login = React.createClass({
  render: function () {
    const { loading } = this.props
    return ( 
      <div className="col-sm-4">
        <h1>Login</h1>
        <form onSubmit={(event) => this.handleClick(event)}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" ref="email" name="email" placeholder="email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" ref="password" name="password" placeholder="password"/>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-sm btn-success"> Login </button>
          </div>
        </form>
        { loading ? (<p>Loading...</p>) : "" }
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