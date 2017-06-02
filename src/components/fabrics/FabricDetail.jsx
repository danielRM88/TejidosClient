import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    const { id, code, description, color, unitPrice, loading } = this.props;
    return (
      <div>
        <h1>Tela { code }</h1>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Codigo</label>
            <p className="form-control"> { code } </p>
          </div>
          <div className="form-group">
            <label>description</label>
            <p className="form-control"> { description } </p>
          </div>
          <div className="form-group">
            <label>color</label>
            <p className="form-control"> { color } </p>
          </div>
          <div className="form-group">
            <label>unitPrice</label>
            <p className="form-control"> { unitPrice } </p>
          </div>
          <div className="text-center">
            <Link to="/fabrics/new" className="btn btn-sm btn-success"> Neva Tela </Link>
            &nbsp;
            <Link to="/fabrics" className="btn btn-sm btn-info"> Ver Telas </Link>
            &nbsp;
            <Link to={`/fabrics/${this.props.params.id}/edit`} className="btn btn-sm btn-primary"> Editar </Link>
          </div>
          <p>{loading}</p>
        </div>
      </div>
    )
  }
});