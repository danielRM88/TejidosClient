import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';
import { loginUser } from './../actions';

// const isAuthenticated = false;

const App = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    // console.log(this.props);
    const { isAuthenticated } = this.props;
    if(isAuthenticated) {
      return (
        <div>
          <Navbar />
        </div>
      )
    } else {
      return <Login isAuthenticated={isAuthenticated} onLoginClick={ () => this.props.dispatch(loginUser()) } />
    }
  }
});

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired
}

// These props come from the application's
// state when it is started
// function mapStateToProps(state) {

//   const { auth } = state
//   const { isAuthenticated } = auth

//   // console.log(state);

//   return {
//     isAuthenticated
//   };
// }

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

connect(mapStateToProps)(App);
export default App;