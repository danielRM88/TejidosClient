import React from 'react';
import {Link} from 'react-router';

const FabricForm = React.createClass({
  render: function() {
    const { code } = this.props
    return (
      <div>
        <h1>Nueva Tela</h1>
        <form onSubmit={(event) => this.handleClick(event)}>
          <input type="text" ref="code" placeholder="Codigo"/>
          <input type="text" ref="description" placeholder="Descripcion"/>
          <input type="text" ref="color" placeholder="Color"/>
          <input type="number" ref="unitPrice" placeholder="Precio Unitario"/>
          <button type="submit"> Crear </button>
        </form>
        <Link to="/fabrics"> Cancelar </Link>
      </div>
    )
  },
  handleClick: function (event) {
    event.preventDefault();
    event.stopPropagation();
    const code = this.refs.code.value.trim();
    const description = this.refs.description.value.trim();
    const color = this.refs.color.value.trim();
    const unitPrice = this.refs.unitPrice.value.trim();
    const fabric = { code, description, color, unit_price: unitPrice }
    this.props.onCreateClick(fabric);
  }
});

FabricForm.contextTypes = {
  router: React.PropTypes.object
};

export default FabricForm