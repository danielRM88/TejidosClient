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
            <h1>Clientes</h1>
            <table className="table table-striped table-hover">
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
                { list.map((client, i) => {
                  return(
                    <tr key={i}>
                      <td>{client.get('client_name')}</td>
                      <td>{client.get('type_id')}</td>
                      <td>{client.get('number_id')}</td>
                      <td>{client.get('address')}</td>
                      <td>{client.get('email')}</td>
                      <td><Link to={`/clients/${client.get('id')}/edit`} className="btn btn-sm btn-primary"> Editar </Link></td>
                      <td><a href="#" onClick={(event) => this.handleClick(event, client.get('id'))} className="btn btn-sm btn-danger"> Eliminar </a></td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
            <div className="text-center">
              <Link to="/clients/new" className="btn btn-sm btn-success"> Nuevo Cliente </Link>
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
            <h1>Clientes</h1>
            <h2>No se encontraron clientes en el sistema</h2>
            <Link to="/clients/new" className="btn btn-sm btn-success"> Nuevo Cliente </Link>
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
  handleClick: function(event, client_id) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onDeleteClick(client_id);
  }
});