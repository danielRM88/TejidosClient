import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    const { id, supplierName, typeId, numberId, address, email, loading } = this.props;
    return (
      <div>
        <h1>Proveedor {this.props.params.id}</h1>
        <p> { supplierName } </p>
        <p> { typeId } </p>
        <p> { numberId } </p>
        <p> { address } </p>
        <p> { email } </p>
        <Link to="/suppliers/new"> Nuevo Proveedor </Link>
        <Link to="/suppliers"> Ver Proveedores </Link>
        <Link to={`/suppliers/${this.props.params.id}/edit`}> Editar </Link>
        <p>{loading}</p>
      </div>
    )
  }
});