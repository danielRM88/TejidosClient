import ClientDetail from '../../components/clients/ClientDetail'
import { connect } from 'react-redux';
import { createClientRequest } from '../../actions/clientsActions';

const mapStateToProps = (state) => {

  const clients = state.get('clients');
  const loading = clients.get('loading');
  const client = clients.get('client');

  let clientName = ""
  let typeId = ""
  let numberId = ""
  let address = ""
  let email = ""
  let phone = ""

  if(client) {
    clientName = client.get('client_name');
    typeId = client.get('type_id');
    numberId = client.get('number_id');
    address = client.get('address');
    email = client.get('email');
    phone = {
      country_code: client.get("phone").get("country_code"),
      area_code: client.get("phone").get("area_code"),
      phone_number: client.get("phone").get("phone_number")
    }
  }

  return ({
    loading,
    clientName, 
    typeId, 
    numberId, 
    address,
    email,
    phone
  })
};

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(client) { 
    dispatch(createClientRequest(client));
  }
});

const ClientDetailContainer = connect(mapStateToProps, null)(ClientDetail);
export default ClientDetailContainer;