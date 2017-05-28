import SupplierDetail from '../../components/suppliers/SupplierDetail'
import { connect } from 'react-redux';
import { createSupplierRequest } from '../../actions/suppliersActions';

const mapStateToProps = (state) => {

  const suppliers = state.get('suppliers');
  const loading = suppliers.get('loading');
  const supplier = suppliers.get('supplier');

  let supplierName = ""
  let typeId = ""
  let numberId = ""
  let address = ""
  let email = ""

  if(supplier) {
    supplierName = supplier.get('supplier_name');
    typeId = supplier.get('type_id');
    numberId = supplier.get('number_id');
    address = supplier.get('address');
    email = supplier.get('email');
  }

  return ({
    loading,
    supplierName, 
    typeId, 
    numberId, 
    address,
    email
  })
};

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(supplier) { 
    dispatch(createSupplierRequest(supplier));
  }
});

const SupplierDetailContainer = connect(mapStateToProps, null)(SupplierDetail);
export default SupplierDetailContainer;