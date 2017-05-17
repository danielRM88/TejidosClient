import React from 'react';
import {Link} from 'react-router';
import PurchaseForm from './../../containers/purchases/PurchaseFormContainer';

export default React.createClass({
  render: function() {
    const { loading } = this.props
    return (
      <div>
        <h1>Nueva Compra</h1>
        <PurchaseForm subtotal="10" onActionClick={this.props.onCreateClick}/>
        <Link to="/purchases"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});