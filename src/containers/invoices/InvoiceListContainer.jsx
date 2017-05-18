import InvoiceList from '../../components/invoices/InvoiceList'
import { deleteInvoiceRequest, getInvoiceRequest } from '../../actions/invoicesActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

  const invoices = state.get('invoices');
  const loading = invoices.get('loading');
  const list = invoices.get('list');

  let invoiceList = [];
  let totalPages = 1;
  let currentPage = 1;
  if(list !== undefined) {
    invoiceList = list.get('invoices');
    totalPages = list.get('totalPages');
    currentPage = list.get('currentPage');
  }

  return ({
    loading,
    list: invoiceList,
    totalPages,
    currentPage
  })
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteClick(invoice_id) { 
    dispatch(deleteInvoiceRequest(invoice_id));
  },
  onPageClick(page) {
    dispatch(getInvoiceRequest(page));
  }
});

const InvoiceListContainer = connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
export default InvoiceListContainer;