import FabricForm from '../../components/fabrics/FabricForm'
import { connect } from 'react-redux';
import { createFabricRequest, updateFabricRequest } from '../../actions/fabricsActions';

const mapStateToProps = (state) => {

  const fabrics = state.get('fabrics');
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
    id, 
    code, 
    description, 
    color, 
    unitPrice
  })
};

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(fabric) { 
    dispatch(createFabricRequest(fabric));
  }, 
  onUpdateClick(fabric) {
    dispatch(updateFabricRequest(fabric));
  }
});

const FabricFormContainer = connect(mapStateToProps, mapDispatchToProps)(FabricForm);
export default FabricFormContainer;