import React from 'react';

const ClientForm = React.createClass({
  componentDidUpdate: function (prevProps, prevState) {
    const { id, clientName, typeId, numberId, address, email, phone } = this.props
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
    if (phone && phone.country_code && phone.area_code && phone.phone_number) {
      this.refs.country_code.value = phone.country_code
      this.refs.area_code.value = phone.area_code
      this.refs.number.value = phone.phone_number
    }
  },
  render: function() {
    const { id, clientName, typeId, numberId, address, email, phone } = this.props
    let area_code = ""
    let number = ""
    let country_code = "+58"
    if (phone != undefined) {
      country_code = phone.country_code
      area_code = phone.area_code
      number = phone.phone_number
    }
    return (
        <form onSubmit={(event) => this.handleClick(event)}>
          <input type="text" ref="clientName" placeholder="Nombre del Cliente" defaultValue={clientName} autoFocus/>
          <input type="text" ref="typeId" placeholder="Tipo de Id." defaultValue={typeId}/>
          <input type="text" ref="numberId" placeholder="Numero de Id." defaultValue={numberId}/>
          <input type="text" ref="address" placeholder="Direccion" defaultValue={address}/>
          <input type="text" ref="email" placeholder="Email" defaultValue={email}/>
          <input type="text" ref="country_code" placeholder="Código del país" defaultValue={country_code}/>
          <input type="text" ref="area_code" placeholder="Código de area" defaultValue={area_code}/>
          <input type="text" ref="number" placeholder="Teléfono" defaultValue={number}/>
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
    const area_code = this.refs.area_code.value.trim();
    const number = this.refs.number.value.trim();
    const country_code = this.refs.country_code.value.trim();
    const client = { id, client_name: clientName, type_id: typeId, number_id: numberId, address, email, phones_attributes: [{ country_code: country_code, area_code: area_code, phone_number: number }] }
    this.props.onActionClick(client);
  }
});

export default ClientForm