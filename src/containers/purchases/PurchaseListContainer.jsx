import PurchaseList from '../../components/purchases/PurchaseList'
import { deletePurchaseRequest, getPurchaseRequest } from '../../actions/purchasesActions';
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
    dispatch(deletePurchaseRequest(purchase_id));
  },
  onPageClick(page) {
    dispatch(getPurchaseRequest(page));
  }
});

const PurchaseListContainer = connect(mapStateToProps, mapDispatchToProps)(PurchaseList);
export default PurchaseListContainer;