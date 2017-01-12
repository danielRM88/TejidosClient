import FabricList from '../../components/fabrics/FabricList'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

  const fabrics = state.get('fabrics');
  const loading = fabrics.get('loading');
  const list = fabrics.get('list');

  console.log("STATE!!!");
  console.log(state);

  return ({
    loading,
    list
  })
};

const FabricListContainer = connect(mapStateToProps, null)(FabricList);
export default FabricListContainer;