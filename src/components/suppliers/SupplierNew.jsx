import React from 'react';
import SupplierForm from './SupplierForm';

export default React.createClass({
  render: function() {
    const { loading } = this.props
    return (
      <div>
        <h1>Nuevo Proveedor</h1>
        <SupplierForm onActionClick={this.props.onCreateClick}/>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});