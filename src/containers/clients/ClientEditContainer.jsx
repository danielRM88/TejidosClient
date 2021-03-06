import ClientEdit from '../../components/clients/ClientEdit'
import { connect } from 'react-redux';
import { updateClient } from '../../actions/clientsActions';

const mapStateToProps = (state) => {

  const clients = state.get('clients');
  const loading = clients.get('loading');
  const client = clients.get('client');

  let id = ""
  let clientName = ""
  let typeId = ""
  let numberId = ""
  let address = ""
  let email = ""
  let phone = ""

  if(client) {
    id = client.get('id');
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
    id, 
    clientName, 
    typeId, 
    numberId, 
    address,
    email,
    phone
  })
};

const mapDispatchToProps = (dispatch) => ({
  onUpdateClick(client) {
    dispatch(updateClient(client));
  }
});

const ClientEditContainer = connect(mapStateToProps, mapDispatchToProps)(ClientEdit);
export default ClientEditContainer