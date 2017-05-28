import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    const { id, code, description, color, unitPrice, loading } = this.props;
    return (
      <div>
        <h1>Fabric {this.props.params.id}</h1>
        <p> { code } </p>
        <p> { description } </p>
        <p> { color } </p>
        <p> { unitPrice } </p>
        <Link to="/fabrics/new"> Neva Tela </Link>
        <Link to="/fabrics"> Ver Telas </Link>
        <Link to={`/fabrics/${this.props.params.id}/edit`}> Editar </Link>
        <p>{loading}</p>
      </div>
    )
  }
});