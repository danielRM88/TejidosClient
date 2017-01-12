import React from 'react';

const FabricForm = React.createClass({
  componentDidUpdate: function (prevProps, prevState) {
    const { id, code, description, color, unitPrice } = this.props
    this.refs.code.value = code
    this.refs.description.value = description
    this.refs.color.value = color
    this.refs.unitPrice.value = unitPrice
  },
  render: function() {
    const { id, code, description, color, unitPrice } = this.props
    return (
        <form onSubmit={(event) => this.handleClick(event)}>
          <input type="text" ref="code" placeholder="Codigo" defaultValue={code}/>
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
    if(id) {
      this.props.onUpdateClick(fabric);
    } else {
      this.props.onCreateClick(fabric);
    }
  }
});

export default FabricForm