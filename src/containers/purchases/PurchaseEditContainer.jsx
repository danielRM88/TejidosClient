import PurchaseEdit from '../../components/purchases/PurchaseEdit'
import { connect } from 'react-redux';
import { updatePurchaseRequest } from '../../actions/purchasesActions';

const mapStateToProps = (state) => {

  const purchases = state.get('purchases');
  const loading = purchases.get('loading');
  const purchase = purchases.get('purchase');

  let id = ""
  let purchaseNumber = ""
  let supplierTypeId = ""
  let supplierNumberId = ""
  let supplierName = ""
  let supplierId = ""
  let purchaseDate = ""
  let vat = ""
  let subtotal = ""
  let inventories = []
  let supplierData = undefined

  if(purchase) {
    id = purchase.get('id');
    purchaseNumber = purchase.get('purchase_number');
    supplierData = purchase.get('supplier_data');
    if(supplierData != undefined) {
      supplierTypeId = supplierData.get('supplier_type_id');
      supplierNumberId = supplierData.get('supplier_number_id');
      supplierName = supplierData.get('supplier_name');
    }
    supplierId = purchase.get('supplier_id');
    purchaseDate = purchase.get('purchase_date');
    vat = purchase.get('vat');
    subtotal = purchase.get('subtotal');
    inventories = purchase.get('inventories').toJS();
  }

  return ({
    loading,
    id, 
    purchaseNumber, 
    supplierTypeId, 
    supplierNumberId,
    supplierName,
    supplierId,
    purchaseDate,
    vat,
    subtotal,
    inventories
  })
};

const mapDispatchToProps = (dispatch) => ({
  onUpdateClick(purchase) {
    dispatch(updatePurchaseRequest(purchase));
  }
});

const PurchaseEditContainer = connect(mapStateToProps, mapDispatchToProps)(PurchaseEdit);
export default PurchaseEditContainer