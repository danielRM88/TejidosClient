import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    const { id, clientName, typeId, numberId, address, email, phone, loading } = this.props
    let area_code = ""
    let number = ""
    let country_code = "+58"
    if (phone != undefined) {
      country_code = phone.country_code
      area_code = phone.area_code
      number = phone.phone_number
    }
    return (
      <div>
        <h1>Cliente {clientName}</h1>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Nombre del Cliente</label>
            <p className="form-control"> { clientName } </p>
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
          <div className="form-group">
            <label>Telefono</label>
            <p className="form-control"> { country_code+" ("+area_code+") "+number } </p>
          </div>
          <div className="text-center">
            <Link to="/clients/new" className="btn btn-sm btn-success"> Nuevo Cliente </Link>
            &nbsp;
            <Link to="/clients" className="btn btn-sm btn-info"> Ver Clientes </Link>
            &nbsp;
            <Link to={`/clients/${this.props.params.id}/edit`} className="btn btn-sm btn-primary"> Editar </Link>
          </div>
          <p>{loading}</p>
        </div>
      </div>
    )
  }
});