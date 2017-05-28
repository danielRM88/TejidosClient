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
            <h1>Telas</h1>
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Descripcion</th>
                  <th>Color</th>
                  <th>Precio Unitario</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { list.map((fabric, i) => {
                  return(
                    <tr key={i}>
                      <td>{fabric.get('code')}</td>
                      <td>{fabric.get('description')}</td>
                      <td>{fabric.get('color')}</td>
                      <td>{fabric.get('unit_price')}</td>
                      <td><Link to={`/fabrics/${fabric.get('id')}/edit`}> Editar </Link></td>
                      <td><a href="#" onClick={(event) => this.handleClick(event, fabric.get('id'))}> Eliminar </a></td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
            <Link to="/fabrics/new"> Nueva Tela </Link>
            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={ this.props.onPageClick }/>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Telas</h1>
            <h2>No se encontraron telas en el sistema</h2>
            <Link to="/fabrics/new"> Nueva Tela </Link>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h1>Telas</h1>
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