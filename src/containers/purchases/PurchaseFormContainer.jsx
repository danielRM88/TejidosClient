import PurchaseForm from '../../components/purchases/PurchaseForm'
import { connect } from 'react-redux';
import { addInventory, removeInventory, addSupplier } from '../../actions/purchasesActions';

const mapStateToProps = (state) => ({
    loading: state.get('purchases').get('loading')
    // inventories: state.get('purchases').get('purchase').get('inventories'),
    // suppliers: state.get('suppliers').get('list')
})

const mapDispatchToProps = (dispatch) => ({
  // onAddInventoryClick(inventory) { 
  //   dispatch(addInventory(inventory));
  // },
  // onRemoveInventoryClick(index) {
  //   dispatch(removeInventory(index));
  // },
  // addSupplier(supplierId) {
  //   dispatch(addSupplier(supplierId));
  // }
});

const PurchaseFormContainer = connect(mapStateToProps, mapDispatchToProps)(PurchaseForm);
export default PurchaseFormContainer;