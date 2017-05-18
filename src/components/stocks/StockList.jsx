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
            <h1>Inventario</h1>
            <table>
              <thead>
                <tr>
                  <th>Codigo Tela</th>
                  <th>Piezas</th>
                  <th>Cantidad</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                { list.map((stock, i) => {
                  return(
                    <tr key={i}>
                      <td>{stock.get('fabric_code')}</td>
                      <td>{stock.get('pieces')}</td>
                      <td>{stock.get('amount')}</td>
                      <td>{stock.get('unit')}</td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={ this.props.onPageClick }/>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Inventario</h1>
            <h2>No se encontraron inventarios en el sistema</h2>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h1>Inventario</h1>
          <p>Loading...</p>
        </div>
      )
    }
  },
  handleClick: function(event, stock_id) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onDeleteClick(stock_id);
  }
});