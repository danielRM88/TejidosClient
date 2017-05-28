import React from 'react';
import {Link} from 'react-router';
import InvoiceForm from './InvoiceForm';

export default React.createClass({
  render: function() {
    const { loading, invoiceNumber, clientTypeId, clientNumberId, clientName, clientId, invoiceDate, vat, subtotal, sales } = this.props
    const { id } = this.props.params
    return (
      <div>
        <h1>Editar Factura</h1>
        <InvoiceForm 
          id={id} 
          invoiceNumber={invoiceNumber} 
          clientTypeId={clientTypeId} 
          clientNumberId={clientNumberId} 
          clientId={clientId} 
          clientName={clientName}
          invoiceDate={invoiceDate}
          vat={vat}
          subtotal={subtotal}
          sales={sales}
          onActionClick={this.props.onUpdateClick}/>
        <Link to="/invoices"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});