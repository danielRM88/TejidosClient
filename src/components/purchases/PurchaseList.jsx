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
            <table className="table table-striped table-hover">
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
                  let subtotal = parseFloat(purchase.get('subtotal'));
                  let vat = parseFloat(purchase.get('vat'));
                  return(
                    <tr key={i}>
                      <td>{purchase.get('purchase_number')}</td>
                      <td>{purchase.get('supplier_data').get('supplier_type_id')+'-'+purchase.get('supplier_data').get('supplier_number_id')+' : '+purchase.get('supplier_data').get('supplier_name')}</td>
                      <td>{purchase.get('purchase_date')}</td>
                      <td>{subtotal.toFixed(2)}</td>
                      <td>{vat.toFixed(2)}</td>
                      <td>{(subtotal+(subtotal*vat/100)).toFixed(2)}</td>
                      <td><Link to={`/purchases/${purchase.get('id')}/edit`} className="btn btn-sm btn-primary"> Editar </Link></td>
                      <td><a href="#" onClick={(event) => this.handleClick(event, purchase.get('id'))} className="btn btn-sm btn-danger"> Eliminar </a></td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
            <div className="text-center">
              <Link to="/purchases/new" className="btn btn-sm btn-success"> Nueva Compra </Link>
              <br/>
              <br/>
              <br/>
              <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={ this.props.onPageClick }/>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Compras</h1>
            <h2>No se encontraron compras en el sistema</h2>
            <Link to="/purchases/new" className="btn btn-sm btn-success"> Nueva Compra </Link>
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