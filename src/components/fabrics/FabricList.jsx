import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    console.log("PROPS!!");
    console.log(this.props);
    const { list, loading } = this.props;
    if (!loading) {
      if (list) {
        return (
          <div>
            <h1>Fabrics</h1>
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Descripcion</th>
                  <th>Color</th>
                  <th>Precio Unitario</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { list.map(function(fabric, i){
                  return(
                    <tr key={i}>
                      <td>{fabric.get('code')}</td>
                      <td>{fabric.get('description')}</td>
                      <td>{fabric.get('color')}</td>
                      <td>{fabric.get('unit_price')}</td>
                      <td><Link to={`/fabrics/${fabric.get('id')}/edit`}> Editar </Link></td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
            <Link to="/fabrics/new"> Nueva Tela </Link>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Fabrics</h1>
            <h2>No se encontraron telas en el sistema</h2>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h1>Fabrics</h1>
          <p>Loading...</p>
        </div>
      )
    }
  }
});