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
            <h1>Compras</h1>
            <table>
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Proveedor</th>
                  <th>Fecha</th>
                  <th>Subtotal</th>
                  <th>Iva</th>
                  <th>Total</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { list.map((purchase, i) => {
                  return(
                    <tr key={i}>
                      <td>{purchase.get('purchase_number')}</td>
                      <td>{purchase.get('supplier_data').get('supplier_type_id')+'-'+purchase.get('supplier_data').get('supplier_number_id')+' : '+purchase.get('supplier_data').get('supplier_name')}</td>
                      <td>{purchase.get('purchase_date')}</td>
                      <td>{purchase.get('subtotal')}</td>
                      <td>{purchase.get('vat')}</td>
                      <td>{purchase.get('subtotal')+(purchase.get('subtotal')*purchase.get('vat')/100)}</td>
                      <td><Link to={`/purchases/${purchase.get('id')}/edit`}> Editar </Link></td>
                      <td><a href="#" onClick={(event) => this.handleClick(event, purchase.get('id'))}> Eliminar </a></td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
            <Link to="/purchases/new"> Nueva Compra </Link>
            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={ this.props.onPageClick }/>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Compras</h1>
            <h2>No se encontraron compras en el sistema</h2>
            <Link to="/purchases/new"> Nueva Compra </Link>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h1>Compras</h1>
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