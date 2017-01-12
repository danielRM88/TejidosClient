import FabricNew from '../../components/fabrics/FabricNew'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  loading: state.get('fabrics').get('loading')
});

const FabricCreateContainer = connect(mapStateToProps, null)(FabricNew);
export default FabricCreateContainer