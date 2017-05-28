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
        <h1>Cliente {this.props.params.id}</h1>
        <p> { clientName } </p>
        <p> { typeId } </p>
        <p> { numberId } </p>
        <p> { address } </p>
        <p> { country_code+" ("+area_code+") "+number } </p>
        <p> { email } </p>
        <Link to="/clients/new"> Nuevo Cliente </Link>
        <Link to="/clients"> Ver Clientes </Link>
        <Link to={`/clients/${this.props.params.id}/edit`}> Editar </Link>
        <p>{loading}</p>
      </div>
    )
  }
});