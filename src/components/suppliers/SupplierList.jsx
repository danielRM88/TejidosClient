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
            <h1>Proveedores</h1>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo de Id.</th>
                  <th>Numero de Id.</th>
                  <th>Direccion</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { list.map((supplier, i) => {
                  return(
                    <tr key={i}>
                      <td>{supplier.get('supplier_name')}</td>
                      <td>{supplier.get('type_id')}</td>
                      <td>{supplier.get('number_id')}</td>
                      <td>{supplier.get('address')}</td>
                      <td>{supplier.get('email')}</td>
                      <td><Link to={`/suppliers/${supplier.get('id')}/edit`}> Editar </Link></td>
                      <td><a href="#" onClick={(event) => this.handleClick(event, supplier.get('id'))}> Eliminar </a></td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
            <Link to="/suppliers/new"> Nuevo Proveedor </Link>
            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={ this.props.onPageClick }/>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Proveedores</h1>
            <h2>No se encontraron proveedores en el sistema</h2>
            <Link to="/suppliers/new"> Nuevo Proveedor </Link>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h1>Clientes</h1>
          <p>Loading...</p>
        </div>
      )
    }
  },
  handleClick: function(event, supplier_id) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onDeleteClick(supplier_id);
  }
});