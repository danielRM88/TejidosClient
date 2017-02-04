import SupplierNew from '../../components/suppliers/SupplierNew'
import { connect } from 'react-redux';
import { createSupplier } from '../../actions/suppliersActions';

const mapStateToProps = (state) => ({
  loading: state.get('suppliers').get('loading')
});

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(client) { 
    dispatch(createSupplier(client));
  }
});

const SupplierCreateContainer = connect(mapStateToProps, mapDispatchToProps)(SupplierNew);
export default SupplierCreateContainer