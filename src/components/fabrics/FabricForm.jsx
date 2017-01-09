import React from 'react';
import {Link} from 'react-router';

const FabricForm = React.createClass({
  render: function() {
    const { loading, id, code, description, color, unitPrice } = this.props
    return (
      <div>
        <h1>Nueva Tela</h1>
        <form onSubmit={(event) => this.handleClick(event)}>
          <input type="text" ref="code" placeholder="Codigo" defaultValue={code}/>
          <input type="text" ref="description" placeholder="Descripcion" defaultValue={description}/>
          <input type="text" ref="color" placeholder="Color" defaultValue={color}/>
          <input type="number" ref="unitPrice" placeholder="Precio Unitario" defaultValue={unitPrice}/>
          <button type="submit"> { id ? "Actualizar" : "Crear" } </button>
        </form>
        <Link to="/fabrics"> Cancelar </Link>
        { loading ? (<p>Loading...</p>) : "" }
      </div>
    )
  },
  handleClick: function (event) {
    event.preventDefault();
    event.stopPropagation();
    const id = this.props.id;
    const code = this.refs.code.value.trim();
    const description = this.refs.description.value.trim();
    const color = this.refs.color.value.trim();
    const unitPrice = this.refs.unitPrice.value.trim();
    const fabric = { id, code, description, color, unit_price: unitPrice }
    this.props.onCreateClick(fabric);
  }
});

export default FabricForm