import ClientList from '../../components/clients/ClientList'
import { deleteClient, getClientsRequest } from '../../actions/clientsActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

  const clients = state.get('clients');
  const loading = clients.get('loading');
  const list = clients.get('list');

  let clientList = [];
  let totalPages = 1;
  let currentPage = 1;
  if(list !== undefined) {
    clientList = list.get('clients');
    totalPages = list.get('totalPages');
    currentPage = list.get('currentPage');
  }

  return ({
    loading,
    list: clientList,
    totalPages,
    currentPage
  })
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteClick(client_id) {
    dispatch(deleteClient(client_id));
  },
  onPageClick(page) {
    dispatch(getClientsRequest(page));
  }
});

const ClientListContainer = connect(mapStateToProps, mapDispatchToProps)(ClientList);
export default ClientListContainer;