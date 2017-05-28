import FabricDetail from '../../components/fabrics/FabricDetail'
import { connect } from 'react-redux';
import { createFabricRequest } from '../../actions/fabricsActions';

const mapStateToProps = (state) => {

  const fabrics = state.get('fabrics');
  const loading = fabrics.get('loading');
  const fabric = fabrics.get('fabric');

  let code = ""
  let description = ""
  let color = ""
  let unitPrice = ""

  if(fabric) {
    code = fabric.get('code');
    description = fabric.get('description');
    color = fabric.get('color');
    unitPrice = fabric.get('unit_price');
  }

  return ({
    loading,
    code, 
    description, 
    color, 
    unitPrice
  })
};

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(fabric) { 
    dispatch(createFabricRequest(fabric));
  }
});

const FabricDetailContainer = connect(mapStateToProps, null)(FabricDetail);
export default FabricDetailContainer;