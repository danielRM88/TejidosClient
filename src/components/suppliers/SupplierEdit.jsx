import React from 'react';
import {Link} from 'react-router';
import SupplierForm from './SupplierForm';

export default React.createClass({
  render: function() {
    const { loading, supplierName, typeId, numberId, address, email } = this.props
    const { id } = this.props.params
    return (
      <div>
        <h1>Editar Proveedor</h1>
        <SupplierForm 
          id={id} 
          supplierName={supplierName} 
          typeId={typeId} 
          numberId={numberId} 
          address={address} 
          email={email}
          onActionClick={this.props.onUpdateClick}/>
        <Link to="/suppliers"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});