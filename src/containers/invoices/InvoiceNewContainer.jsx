import InvoiceNew from '../../components/invoices/InvoiceNew'
import { connect } from 'react-redux';
import { createInvoiceRequest } from '../../actions/invoicesActions';

const mapStateToProps = (state) => ({
    loading: state.get('invoices').get('loading')
});

const mapDispatchToProps = (dispatch) => ({
  onCreateClick(invoice) { 
    dispatch(createInvoiceRequest(invoice));
  }
});

const InvoiceNewContainer = connect(mapStateToProps, mapDispatchToProps)(InvoiceNew);
export default InvoiceNewContainer