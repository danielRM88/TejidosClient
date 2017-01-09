import FabricForm from '../../components/fabrics/FabricForm'
import { connect } from 'react-redux';
import { createFabricRequest } from '../../actions/fabricsActions';

const mapStateToProps = (state) => ({
  loading: state.get('fabrics').get('loading')
});

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(fabric) { 
    dispatch(createFabricRequest(fabric));
  }
});

const FabricFormContainer = connect(mapStateToProps, mapDispatchToProps)(FabricForm);
export default FabricFormContainer;