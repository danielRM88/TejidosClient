import SupplierEdit from '../../components/suppliers/SupplierEdit'
import { connect } from 'react-redux';
import { updateSupplier } from '../../actions/suppliersActions';

const mapStateToProps = (state) => {

  const suppliers = state.get('suppliers');
  const loading = suppliers.get('loading');
  const supplier = suppliers.get('supplier');

  let id = ""
  let supplierName = ""
  let typeId = ""
  let numberId = ""
  let address = ""
  let email = ""

  if(supplier) {
    id = supplier.get('id');
    supplierName = supplier.get('supplier_name');
    typeId = supplier.get('type_id');
    numberId = supplier.get('number_id');
    address = supplier.get('address');
    email = supplier.get('email');
  }

  return ({
    loading,
    id, 
    supplierName, 
    typeId, 
    numberId, 
    address,
    email
  })
};

const mapDispatchToProps = (dispatch) => ({
  onUpdateClick(supplier) {
    dispatch(updateSupplier(supplier));
  }
});

const SupplierEditContainer = connect(mapStateToProps, mapDispatchToProps)(SupplierEdit);
export default SupplierEditContainer