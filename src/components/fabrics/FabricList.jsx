import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div>
        <h1>Fabrics</h1>
        <Link to="/fabrics/new"> Nueva Tela </Link>
      </div>
    )
  }
});