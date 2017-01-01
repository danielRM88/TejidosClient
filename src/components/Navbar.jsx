import React from 'react';

export default React.createClass({
  render: function() {
    return <button className="btn btn-primary" onClick={ () => this.clickHandler() }> Logout </button>;
  },
  clickHandler: function() {
    this.props.onLogoutClick();
  }
});