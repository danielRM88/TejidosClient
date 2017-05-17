import PurchaseList from '../../components/purchases/PurchaseList'
import { getPurchaseRequest } from '../../actions/purchasesActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

  const purchases = state.get('purchases');
  const loading = purchases.get('loading');
  const list = purchases.get('list');

  let purchaseList = [];
  let totalPages = 1;
  let currentPage = 1;
  if(list !== undefined) {
    purchaseList = list.get('purchases');
    totalPages = list.get('totalPages');
    currentPage = list.get('currentPage');
  }

  return ({
    loading,
    list: purchaseList,
    totalPages,
    currentPage
  })
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteClick(purchase_id) { 
    dispatch(deleteFabric(purchase_id));
  },
  onPageClick(page) {
    dispatch(getFabricsRequest(page));
  }
});

const PurchaseListContainer = connect(mapStateToProps, mapDispatchToProps)(PurchaseListContainer);
export default PurchaseListContainer;