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

  if(client) {
    clientName = client.get('client_name');
    typeId = client.get('type_id');
    numberId = client.get('number_id');
    address = client.get('address');
    email = client.get('email');
  }

  return ({
    loading,
    clientName, 
    typeId, 
    numberId, 
    address,
    email
  })
};

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(client) { 
    dispatch(createClientRequest(client));
  }
});

const ClientDetailContainer = connect(mapStateToProps, null)(ClientDetail);
export default ClientDetailContainer;