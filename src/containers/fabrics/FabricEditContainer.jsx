import FabricEdit from '../../components/fabrics/FabricEdit'
import { connect } from 'react-redux';
import { updateFabric } from '../../actions/fabricsActions';

const mapStateToProps = (state) => {

  const fabrics = state.get('fabrics');
  const loading = fabrics.get('loading');
  const fabric = fabrics.get('fabric');

  let id = ""
  let code = ""
  let description = ""
  let color = ""
  let unitPrice = ""

  if(fabric) {
    id = fabric.get('id');
    code = fabric.get('code');
    description = fabric.get('description');
    color = fabric.get('color');
    unitPrice = fabric.get('unit_price');
  }

  return ({
    loading,
    id, 
    code, 
    description, 
    color, 
    unitPrice
  })
};

const mapDispatchToProps = (dispatch) => ({
  onUpdateClick(fabric) {
    dispatch(updateFabric(fabric));
  }
});

const FabricEditContainer = connect(mapStateToProps, mapDispatchToProps)(FabricEdit);
export default FabricEditContainer