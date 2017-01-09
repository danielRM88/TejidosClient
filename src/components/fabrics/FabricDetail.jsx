import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    const { code, description, color, unitPrice } = this.props;
    return (
      <div>
        <h1>Fabric {this.props.params.id}</h1>
        <p> { code } </p>
        <p> { description } </p>
        <p> { color } </p>
        <p> { unitPrice } </p>
        <Link to="/fabrics/new"> Neva Tela </Link>
      </div>
    )
  }
});