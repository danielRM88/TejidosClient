import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <h1>Fabric {this.props.params.id}</h1>
    )
  }
});