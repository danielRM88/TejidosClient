import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';
import { requestLogin, requestLogout } from './../actions/authActions';

const Container = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { isAuthenticated, token } = this.props.route;
    const props = { isAuthenticated: isAuthenticated, token: token }
    // console.log(this.props.children)
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => { 
        console.log(child);
        React.cloneElement(child, {
          isAuthenticated: true
        })
      }
    );
    return (
      <div>
        { React.cloneElement(this.props.children, { isAuthenticated: true }) }
      </div>
    )
  }
});

export default Container;