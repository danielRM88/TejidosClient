import React from 'react';
import InvoiceForm from './InvoiceForm';

export default React.createClass({
  render: function() {
    const { loading } = this.props
    return (
      <div>
        <h1>Nueva Factura</h1>
        <InvoiceForm onActionClick={this.props.onCreateClick}/>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});