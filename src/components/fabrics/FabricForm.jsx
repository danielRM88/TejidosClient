import React from 'react';

const FabricForm = React.createClass({
  componentDidUpdate: function (prevProps, prevState) {
    const { id, code, description, color, unitPrice } = this.props
    if(code) {
      this.refs.code.value = code
    }
    if(description){
      this.refs.description.value = description
    }
    if(color){
      this.refs.color.value = color
    }
    if(unitPrice){
      this.refs.unitPrice.value = unitPrice
    }
  },
  render: function() {
    const { id, code, description, color, unitPrice } = this.props
    return (
        <form onSubmit={(event) => this.handleClick(event)}>
          <input type="text" ref="code" placeholder="Codigo" defaultValue={code} autoFocus/>
          <input type="text" ref="description" placeholder="Descripcion" defaultValue={description}/>
          <input type="text" ref="color" placeholder="Color" defaultValue={color}/>
          <input type="number" ref="unitPrice" placeholder="Precio Unitario" defaultValue={unitPrice}/>
          <button type="submit"> { id ? "Actualizar" : "Crear" } </button>
        </form>
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
    this.props.onActionClick(fabric);
  }
});

export default FabricForm