import React from 'react';
import {Link} from 'react-router';
import ClientForm from './ClientForm';

export default React.createClass({
  render: function() {
    const { loading, clientName, typeId, numberId, address, email, phone } = this.props
    const { id } = this.props.params
    return (
      <div>
        <h1>Editar Cliente</h1>
        <ClientForm 
          id={id} 
          clientName={clientName} 
          typeId={typeId} 
          numberId={numberId} 
          address={address} 
          email={email}
          phone={phone}
          onActionClick={this.props.onUpdateClick}/>
        <Link to="/clients"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});