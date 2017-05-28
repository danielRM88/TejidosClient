import React from 'react';
import {Link} from 'react-router';
import InvoiceForm from './InvoiceForm';

export default React.createClass({
  render: function() {
    const { loading } = this.props
    return (
      <div>
        <h1>Nueva Factura</h1>
        <InvoiceForm onActionClick={this.props.onCreateClick}/>
        <Link to="/invoices"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});