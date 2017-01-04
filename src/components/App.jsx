import React, { PropTypes } from 'react';
import PureRenderMixin      from 'react-addons-pure-render-mixin';
import Navbar               from './Navbar';
import Login                from '../containers/LoginContainer';

const App = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { isAuthenticated, onLogoutClick, onLoginClick } = this.props;
    if(isAuthenticated) {
      return (
        <div>
          <Navbar onLogoutClick={ () => onLogoutClick() } />
          {this.props.children}
        </div>
      )
    } else {
      return <Login onLoginClick={ (email, password) => onLoginClick(email, password) } />
    }
  }
});

App.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired
}

export default App;