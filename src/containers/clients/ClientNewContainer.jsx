import ClientNew from '../../components/clients/ClientNew'
import { connect } from 'react-redux';
import { createClient } from '../../actions/clientsActions';

const mapStateToProps = (state) => ({
  loading: state.get('clients').get('loading')
});

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(client) { 
    dispatch(createClient(client));
  }
});

const ClientCreateContainer = connect(mapStateToProps, mapDispatchToProps)(ClientNew);
export default ClientCreateContainer