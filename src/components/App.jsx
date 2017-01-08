import React, { PropTypes } from 'react';
import PureRenderMixin      from 'react-addons-pure-render-mixin';
import Navbar               from './Navbar';
import Login                from '../containers/LoginContainer';
import Messages             from '../containers/MessagesContainer';

const App = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { isAuthenticated, onLogoutClick, onLoginClick } = this.props;
    if(isAuthenticated) {
      return (
        <div>
          <Navbar onLogoutClick={ () => onLogoutClick() } />
          <Messages />
          {this.props.children}
        </div>
      )
    } else {
      return (
        <div>
          <Messages />
          <Login onLoginClick={ (email, password) => onLoginClick(email, password) } />
        </div>
      )
    }
  }
});

App.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired
}

export default App;