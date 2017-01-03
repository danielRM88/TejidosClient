import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Brand</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"> <Link to="/"> Home </Link> {/* <a href="#">Link <span className="sr-only">(current)</span></a> */}</li>
                <li><Link to="/fabrics"> Compras </Link></li>
                <li><Link to="/fabrics"> Facturas </Link></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Catalogo <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><Link to="/fabrics"> Telas </Link></li>
                    <li><Link to="/fabrics"> Clientes </Link></li>
                    <li><Link to="/fabrics"> Proveedores </Link></li>
                  </ul>
                </li>
              </ul>
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search"/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
              <div className="navbar-right navbar-form">
                <button className="btn btn-default" onClick={ () => this.clickHandler() }> Sign out </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  },
  clickHandler: function() {
    this.props.onLogoutClick();
  }
});