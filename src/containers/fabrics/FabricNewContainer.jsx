import FabricNew from '../../components/fabrics/FabricNew'
import { connect } from 'react-redux';
import { createFabric } from '../../actions/fabricsActions';

const mapStateToProps = (state) => ({
  loading: state.get('fabrics').get('loading')
});

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(fabric) { 
    dispatch(createFabric(fabric));
  }
});

const FabricCreateContainer = connect(mapStateToProps, mapDispatchToProps)(FabricNew);
export default FabricCreateContainer