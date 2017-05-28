import React from 'react';
import {Link} from 'react-router';
import FabricForm from './FabricForm';

export default React.createClass({
  render: function() {
    const { loading, code, description, color, unitPrice } = this.props
    const { id } = this.props.params
    return (
      <div>
        <h1>Editar Tela</h1>
        <FabricForm 
          id={id} 
          code={code} 
          description={description} 
          color={color} 
          unitPrice={unitPrice} 
          onActionClick={this.props.onUpdateClick}/>
        <Link to="/fabrics"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  }
});