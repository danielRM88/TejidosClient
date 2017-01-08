import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div>
        <h1>Fabric {this.props.params.id}</h1>
        <Link to="/fabrics/new"> Neva Tela </Link>
      </div>
    )
  }
});