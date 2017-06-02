import React from 'react';
import FabricForm from './FabricForm';

export default React.createClass({
  render: function() {
    const { loading } = this.props
    return (
      <div>
        <h1>Nueva Tela</h1>
        <FabricForm onActionClick={this.props.onCreateClick}/>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});