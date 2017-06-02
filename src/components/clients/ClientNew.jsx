import React from 'react';
import ClientForm from './ClientForm';

export default React.createClass({
  render: function() {
    const { loading } = this.props
    return (
      <div>
        <h1>Nuevo Cliente</h1>
        <ClientForm onActionClick={this.props.onCreateClick}/>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});