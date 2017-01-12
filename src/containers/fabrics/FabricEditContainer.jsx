import FabricEdit from '../../components/fabrics/FabricEdit'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  loading: state.get('fabrics').get('loading')
});

const FabricEditContainer = connect(mapStateToProps, null)(FabricEdit);
export default FabricEditContainer