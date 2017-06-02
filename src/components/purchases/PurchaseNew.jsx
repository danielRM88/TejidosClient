import React from 'react';
import PurchaseForm from './PurchaseForm';

export default React.createClass({
  render: function() {
    const { loading } = this.props
    return (
      <div>
        <h1>Nueva Compra</h1>
        <PurchaseForm onActionClick={this.props.onCreateClick}/>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});