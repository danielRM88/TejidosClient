import React from 'react';
import {Link} from 'react-router';

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
      <div className="col-sm-6">
        <form onSubmit={(event) => this.handleClick(event)}>
          <div className="form-group">
            <label>Codigo</label>
            <input type="text" className="form-control" ref="code" placeholder="Codigo" defaultValue={code} autoFocus/>
          </div>
          <div className="form-group">
            <label>Descripcion</label>
            <input type="text" className="form-control" ref="description" placeholder="Descripcion" defaultValue={description}/>
          </div>
          <div className="form-group">
            <label>Color</label>
            <input type="text" className="form-control" ref="color" placeholder="Color" defaultValue={color}/>
          </div>
          <div className="form-group">
            <label>Precio Unitario</label>
            <input type="number" className="form-control" ref="unitPrice" placeholder="Precio Unitario" defaultValue={unitPrice}/>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-sm btn-success"> { id ? "Actualizar" : "Crear" } </button>
            &nbsp;
            <Link to="/fabrics" className="btn btn-sm btn-default"> Cancelar </Link>
          </div>
        </form>
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
    this.props.onActionClick(fabric);
  }
});

export default FabricForm