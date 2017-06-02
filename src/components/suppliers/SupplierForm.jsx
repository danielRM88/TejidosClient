import React from 'react';
import {Link} from 'react-router';

const SupplierForm = React.createClass({
  componentDidUpdate: function (prevProps, prevState) {
    const { id, supplierName, typeId, numberId, address, email } = this.props
    if(supplierName) {
      this.refs.supplierName.value = supplierName
    }
    if(typeId){
      this.refs.typeId.value = typeId
    }
    if(numberId){
      this.refs.numberId.value = numberId
    }
    if(address){
      this.refs.address.value = address
    }
    if(email){
      this.refs.email.value = email
    }
  },
  render: function() {
    const { id, supplierName, typeId, numberId, address, email } = this.props
    return (
      <div className="col-sm-6">
        <form onSubmit={(event) => this.handleClick(event)}>
          <div className="form-group">
            <label>Nombre del Proveedor</label>
            <input type="text" className="form-control" ref="supplierName" placeholder="Nombre del Proveedor" defaultValue={supplierName} autoFocus/>
          </div>
          <div className="form-group">
            <label>Tipo de Id.</label>
            <input type="text" className="form-control" ref="typeId" placeholder="Tipo de Id." defaultValue={typeId}/>
          </div>
          <div className="form-group">
            <label>Numero de Id.</label>
            <input type="text" className="form-control" ref="numberId" placeholder="Numero de Id." defaultValue={numberId}/>
          </div>
          <div className="form-group">
            <label>Direccion</label>
            <input type="text" className="form-control" ref="address" placeholder="Direccion" defaultValue={address}/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" ref="email" placeholder="Email" defaultValue={email}/>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-sm btn-success"> { id ? "Actualizar" : "Crear" } </button>
            &nbsp;
            <Link to="/suppliers" className="btn btn-sm btn-default"> Cancelar </Link>
          </div>
        </form>
      </div>
    )
  },
  handleClick: function (event) {
    event.preventDefault();
    event.stopPropagation();
    const id = this.props.id;
    const supplierName = this.refs.supplierName.value.trim();
    const typeId = this.refs.typeId.value.trim();
    const numberId = this.refs.numberId.value.trim();
    const address = this.refs.address.value.trim();
    const email = this.refs.email.value.trim();
    const supplier = { id, supplier_name: supplierName, type_id: typeId, number_id: numberId, address, email }
    this.props.onActionClick(supplier);
  }
});

export default SupplierForm