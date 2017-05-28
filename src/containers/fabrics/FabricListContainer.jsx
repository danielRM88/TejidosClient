import FabricList from '../../components/fabrics/FabricList'
import { deleteFabric, getFabricsRequest } from '../../actions/fabricsActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

  const fabrics = state.get('fabrics');
  const loading = fabrics.get('loading');
  const list = fabrics.get('list');

  let fabricList = [];
  let totalPages = 1;
  let currentPage = 1;
  if(list !== undefined) {
    fabricList = list.get('fabrics');
    totalPages = list.get('totalPages');
    currentPage = list.get('currentPage');
  }

  return ({
    loading,
    list: fabricList,
    totalPages,
    currentPage
  })
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteClick(fabric_id) { 
    dispatch(deleteFabric(fabric_id));
  },
  onPageClick(page) {
    dispatch(getFabricsRequest(page));
  }
});

const FabricListContainer = connect(mapStateToProps, mapDispatchToProps)(FabricList);
export default FabricListContainer;