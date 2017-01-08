import FabricDetail from '../../components/fabrics/FabricDetail'
import { connect } from 'react-redux';
import { createFabricRequest } from '../../actions/fabricsActions';

const mapStateToProps = (state) => ({
  loading: state.get('fabrics').get('loading'),
  message: state.get('fabrics').get('message')
});

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(fabric) { 
    dispatch(createFabricRequest(fabric));
  }
});

const FabricDetailContainer = connect(mapStateToProps, null)(FabricDetail);
export default FabricDetailContainer;