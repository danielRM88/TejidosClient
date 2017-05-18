import React from 'react';
import {Link} from 'react-router';
import Pagination from '../Pagination'

export default React.createClass({
  render: function() {
    const { list, loading, totalPages, currentPage } = this.props;
    if (!loading) {
      if (list && list.size > 0) {
        return (
          <div>
            <h1>Facturas</h1>
            <table>
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Subtotal</th>
                  <th>Iva</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                { list.map((invoice, i) => {
                  let subtotal = parseFloat(invoice.get('subtotal'));
                  let vat = parseFloat(invoice.get('vat'));
                  return(
                    <tr key={i}>
                      <td>{invoice.get('invoice_number')}</td>
                      <td>{invoice.get('client_data').get('client_type_id')+'-'+invoice.get('client_data').get('client_number_id')+' : '+invoice.get('client_data').get('client_name')}</td>
                      <td>{invoice.get('invoice_date')}</td>
                      <td>{subtotal.toFixed(2)}</td>
                      <td>{vat.toFixed(2)}</td>
                      <td>{(subtotal+(subtotal*vat/100)).toFixed(2)}</td>
                      <td><Link to={`/invoices/${invoice.get('id')}/edit`}> Editar </Link></td>
                      <td><a href="#" onClick={(event) => this.handleClick(event, invoice.get('id'))}> Eliminar </a></td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
            <Link to="/invoices/new"> Nueva Factura </Link>
            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={ this.props.onPageClick }/>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Facturas</h1>
            <h2>No se encontraron facturas en el sistema</h2>
            <Link to="/invoices/new"> Nueva Factura </Link>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h1>Facturas</h1>
          <p>Loading...</p>
        </div>
      )
    }
  },
  handleClick: function(event, fabric_id) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onDeleteClick(fabric_id);
  }
});