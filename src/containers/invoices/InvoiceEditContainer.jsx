import InvoiceEdit from '../../components/invoices/InvoiceEdit'
import { connect } from 'react-redux';
import { updateInvoiceRequest } from '../../actions/invoicesActions';

const mapStateToProps = (state) => {

  const invoices = state.get('invoices');
  const loading = invoices.get('loading');
  const invoice = invoices.get('invoice');

  let id = ""
  let invoiceNumber = ""
  let clientTypeId = ""
  let clientNumberId = ""
  let clientName = ""
  let clientId = ""
  let invoiceDate = ""
  let vat = ""
  let subtotal = ""
  let sales = []
  let clientData = undefined

  if(invoice) {
    id = invoice.get('id');
    invoiceNumber = invoice.get('invoice_number');
    clientData = invoice.get('client_data');
    if(clientData != undefined) {
      clientTypeId = clientData.get('client_type_id');
      clientNumberId = clientData.get('client_number_id');
      clientName = clientData.get('client_name');
    }
    clientId = invoice.get('client_id');
    invoiceDate = invoice.get('invoice_date');
    vat = invoice.get('vat');
    subtotal = invoice.get('subtotal');
    sales = invoice.get('sales').toJS();
  }

  return ({
    loading,
    id, 
    invoiceNumber, 
    clientTypeId, 
    clientNumberId,
    clientName,
    clientId,
    invoiceDate,
    vat,
    subtotal,
    sales
  })

};

const mapDispatchToProps = (dispatch) => ({
  onUpdateClick(invoice) {
    dispatch(updateInvoiceRequest(invoice));
  }
});

const InvoiceEditContainer = connect(mapStateToProps, mapDispatchToProps)(InvoiceEdit);
export default InvoiceEditContainer