import React from 'react';
import {Link} from 'react-router';
import SupplierForm from './SupplierForm';

export default React.createClass({
  render: function() {
    const { loading } = this.props
    return (
      <div>
        <h1>Nuevo Proveedor</h1>
        <SupplierForm onActionClick={this.props.onCreateClick}/>
        <Link to="/suppliers"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});