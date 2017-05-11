import PurchaseNew from '../../components/purchases/PurchaseNew'
import { connect } from 'react-redux';
import { createPurchaseRequest } from '../../actions/purchasesActions';

const mapStateToProps = (state) => ({
    loading: state.get('purchases').get('loading')
});

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(purchase) { 
    dispatch(createPurchaseRequest(purchase));
  }
});

const PurchaseNewContainer = connect(mapStateToProps, mapDispatchToProps)(PurchaseNew);
export default PurchaseNewContainer