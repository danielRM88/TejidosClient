import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    const { id, clientName, typeId, numberId, address, email, loading } = this.props;
    return (
      <div>
        <h1>Cliente {this.props.params.id}</h1>
        <p> { clientName } </p>
        <p> { typeId } </p>
        <p> { numberId } </p>
        <p> { address } </p>
        <p> { email } </p>
        <Link to="/clients/new"> Nuevo Cliente </Link>
        <Link to="/clients"> Ver Clientes </Link>
        <Link to={`/clients/${this.props.params.id}/edit`}> Editar </Link>
        <p>{loading}</p>
      </div>
    )
  }
});