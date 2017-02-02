import React from 'react';

const FabricForm = React.createClass({
  componentDidUpdate: function (prevProps, prevState) {
    const { id, clientName, typeId, numberId, address, email } = this.props
    if(clientName) {
      this.refs.clientName.value = clientName
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
    const { id, clientName, typeId, numberId, address, email } = this.props
    return (
        <form onSubmit={(event) => this.handleClick(event)}>
          <input type="text" ref="clientName" placeholder="Client Name" defaultValue={clientName}/>
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
    const clientName = this.refs.clientName.value.trim();
    const typeId = this.refs.typeId.value.trim();
    const numberId = this.refs.numberId.value.trim();
    const address = this.refs.address.value.trim();
    const email = this.refs.email.value.trim();
    const client = { id, client_name: clientName, type_id: typeId, number_id: numberId, address, email }
    this.props.onActionClick(client);
  }
});

export default FabricForm