import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    const { id, supplierName, typeId, numberId, address, email, loading } = this.props;
    return (
      <div>
        <h1>Proveedor {supplierName}</h1>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Nombre del Proveedor</label>
            <p className="form-control"> { supplierName } </p>
          </div>
          <div className="form-group">
            <label>Tipo de Id.</label>
            <p className="form-control"> { typeId } </p>
          </div>
          <div className="form-group">
            <label>Numero de Id.</label>
            <p className="form-control"> { numberId } </p>
          </div>
          <div className="form-group">
            <label>Direccion</label>
            <p className="form-control"> { address } </p>
          </div>
          <div className="form-group">
            <label>Email</label>
            <p className="form-control"> { email } </p>
          </div>
          <div className="text-center">
            <Link to="/suppliers/new" className="btn btn-sm btn-success"> Nuevo Proveedor </Link>
            &nbsp;
            <Link to="/suppliers" className="btn btn-sm btn-info"> Ver Proveedores </Link>
            &nbsp;
            <Link to={`/suppliers/${this.props.params.id}/edit`} className="btn btn-sm btn-primary"> Editar </Link>
          </div>
          <p>{loading}</p>
        </div>
      </div>
    )
  }
});