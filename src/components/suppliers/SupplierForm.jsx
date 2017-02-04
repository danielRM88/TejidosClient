import React from 'react';

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
        <form onSubmit={(event) => this.handleClick(event)}>
          <input type="text" ref="supplierName" placeholder="Nombre del Proveedor" defaultValue={supplierName}/>
          <input type="text" ref="typeId" placeholder="Tipo de Id." defaultValue={typeId}/>
          <input type="text" ref="numberId" placeholder="Numero de Id." defaultValue={numberId}/>
          <input type="text" ref="address" placeholder="Direccion" defaultValue={address}/>
          <input type="text" ref="email" placeholder="Email" defaultValue={email}/>
          <button type="submit"> { id ? "Actualizar" : "Crear" } </button>
        </form>
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