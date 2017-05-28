import SupplierList from '../../components/suppliers/SupplierList'
import { deleteSupplier, getSuppliersRequest } from '../../actions/suppliersActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

  const suppliers = state.get('suppliers');
  const loading = suppliers.get('loading');
  const list = suppliers.get('list');

  let supplierList = [];
  let totalPages = 1;
  let currentPage = 1;
  if(list !== undefined) {
    supplierList = list.get('suppliers');
    totalPages = list.get('totalPages');
    currentPage = list.get('currentPage');
  }

  return ({
    loading,
    list: supplierList,
    totalPages,
    currentPage
  })
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteClick(supplier_id) {
    dispatch(deleteSupplier(supplier_id));
  },
  onPageClick(page) {
    dispatch(getSuppliersRequest(page));
  }
});

const SupplierListContainer = connect(mapStateToProps, mapDispatchToProps)(SupplierList);
export default SupplierListContainer;