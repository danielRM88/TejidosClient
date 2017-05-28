import React from 'react';
import {Link} from 'react-router';
import FabricForm from './FabricForm';

export default React.createClass({
  render: function() {
    const { loading } = this.props
    return (
      <div>
        <h1>Nueva Tela</h1>
        <FabricForm onActionClick={this.props.onCreateClick}/>
        <Link to="/fabrics"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});