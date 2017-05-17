import React from 'react';
import {Link} from 'react-router';
import PurchaseForm from './PurchaseForm';

export default React.createClass({
  render: function() {
    const { loading, purchaseNumber, supplierTypeId, supplierNumberId, supplierName, supplierId, purchaseDate, vat, subtotal, inventories } = this.props
    const { id } = this.props.params
    return (
      <div>
        <h1>Editar Tela</h1>
        <PurchaseForm 
          id={id} 
          purchaseNumber={purchaseNumber} 
          supplierTypeId={supplierTypeId} 
          supplierNumberId={supplierNumberId} 
          supplierId={supplierId} 
          supplierName={supplierName}
          purchaseDate={purchaseDate}
          vat={vat}
          subtotal={subtotal}
          inventories={inventories}
          onActionClick={this.props.onUpdateClick}/>
        <Link to="/purchases"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});