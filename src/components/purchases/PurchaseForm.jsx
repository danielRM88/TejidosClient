import React from 'react';
import {Link} from 'react-router';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';
var config = require('config');

const PurchaseForm = React.createClass({
  getInitialState: function () {
    return { supplierId: null, inventories: [], purchaseDate: moment.utc(), subtotal: 0, total: 0, vat: 12 };
  },
  componentDidMount: function () {
    if(this.props.id == undefined) {
      this.addInventory(null, 0);
    }
  },
  componentWillReceiveProps: function (nextProps) {
    const { id, purchaseNumber, supplierTypeId, supplierNumberId, supplierName, supplierId, purchaseDate, vat, subtotal, inventories } = nextProps
    if(purchaseNumber) {
      this.refs.purchaseNumber.value = purchaseNumber
    
      if(purchaseDate){
        this.setState({
          purchaseDate: moment.utc(purchaseDate)
        });
      }
      if(vat){
        this.setState({
          vat: vat
        });
      }
      if(subtotal){
        this.refs.subtotal.value = subtotal
      }
      if(supplierId && supplierTypeId && supplierNumberId && supplierName) {
        this.setState({
          supplierId: { value: supplierId, label: supplierTypeId+'-'+supplierNumberId+' : '+supplierName }
        });
      }
      if(inventories != undefined) {
        let invs = inventories.map((i) => {
          return {
            index: i.id,
            fabricId: i.fabric_id,
            fabricCode: { value: i.fabric_id, label: i.fabric_data.fabric_code, fabric: { id: i.fabric_id, unit_price: i.unit_price } },
            fabricUnitPrice: i.fabric_data.fabric_unit_price,
            unitPrice: i.unit_price,
            pieces: i.pieces,
            amount: i.amount,
            unit: i.unit,
          }
        });
        this.setState({
          inventories: invs
        }, this.updateTotals);
      }
    }
  },
  getSuppliers: function(input) {
    let type;
    let number;
    if (!input) {
      return Promise.resolve({ options: [] });
    } else {
      type = input.split("-")[0];
      number = input.split("-")[1];
    }
    return fetch(config.serverUrl+`/api/v1/suppliers?type_id=${type}&number_id=${number}`, {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '+localStorage.getItem('token')
                  }
                }).then((response) => response.json())
                .then((json) => {
                  const array = json.suppliers;
                  let suppliers = [];

                  if (array!=null) {
                    suppliers = array.map(function(supplier){
                      return { value: supplier.id, label: supplier.type_id+'-'+supplier.number_id+' : '+supplier.supplier_name }
                    });
                  }
                  return { options: suppliers };
                });
  },
  getFabricCodes: function(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return fetch(config.serverUrl+`/api/v1/fabrics?code=${input}`, {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '+localStorage.getItem('token')
                  }
                }).then((response) => response.json())
                .then((json) => {
                  const array = json.fabrics;
                  let fabrics = [];

                  if (array!=null) {
                    fabrics = array.map(function(fabric){
                      return { value: fabric.id, label: fabric.code, fabric: fabric }
                    });
                  }
                  return { options: fabrics };
                });
  },
  onSupplierValueChange: function (value) {
    this.setState({
      supplierId: value,
    });
  },
  onDateChange: function (date) {
    this.setState({
      purchaseDate: date,
    });
  },
  render: function() {
    let maxIndex = 1;
    const { id, purchaseNumber, supplierTypeId, supplierNumberId, supplierId, purchaseDate, ivaId, ivaPercentage, subtotal } = this.props;
    const AsyncComponent = Select.Async;
    return (
      <div className="col-sm-12">
        <form name="purchaseForm" onSubmit={(event) => this.handleClick(event)}>
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-2">
                <div className="form-group">
                  <label>Nro.</label>
                  <input type="text" className="form-control" ref="purchaseNumber" placeholder="No. Compra" defaultValue={purchaseNumber} autoFocus/>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Rif del Proveedor</label>
                  <AsyncComponent multi={false} 
                                  value={this.state.supplierId} 
                                  onChange={this.onSupplierValueChange} 
                                  valueKey="value" 
                                  cache={false}
                                  labelKey="label" 
                                  loadOptions={this.getSuppliers} 
                                  placeholder="Rif del Proveedor"
                                  backspaceRemoves={true} />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Fecha</label>
                  <br/>
                  <DatePicker
                    ref="purchaseDate"
                    dateFormat="DD/MM/YYYY"
                    selected={this.state.purchaseDate}
                    onChange={this.onDateChange}
                    className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <hr/>
            <h2>Telas</h2>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Piezas</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>Precio Costo</th>
                    <th>Precio Venta</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.inventories.map((inventory, index) => {
                      if(inventory.index > maxIndex) {
                        maxIndex = inventory.index;
                      }
                      let fabricId = inventory.fabricId;
                      let fabricCode = inventory.fabricCode;
                      let unitPrice = inventory.unitPrice;
                      let pieces = inventory.pieces;
                      let amount = inventory.amount;
                      let unit = inventory.unit;
                      let fabricUnitPrice = inventory.fabricUnitPrice;
                      return (
                        <tr key={inventory.index}>
                          <td className="col-xs-4">
                            <AsyncComponent multi={false} 
                                  value={inventory.fabricCode} 
                                  onChange={ (value) => {
                                      let invs = this.state.inventories.map( (inv) => {
                                        if(inv.index === inventory.index) {
                                          inv.fabricCode = value;
                                          inv.fabricId = (value.fabric == undefined ? undefined : value.fabric.id);
                                          inv.fabricUnitPrice = (value.fabric == undefined ? undefined : value.fabric.unit_price);
                                          this.refs[inventory.index+"_fabricUnitPrice"].value = (value.fabric == undefined ? "" : value.fabric.unit_price);

                                        }
                                        return inv;
                                      });
                                      this.setState({
                                        inventories: invs
                                      });
                                    }
                                  } 
                                  valueKey="value" 
                                  cache={false}
                                  labelKey="label" 
                                  loadOptions={this.getFabricCodes} 
                                  placeholder="Codigo"
                                  backspaceRemoves={true} />
                          </td>
                            {/*<input type="text" ref={inventory.index+"_fabricCode"} placeholder="Codigo" defaultValue={fabricCode} onChange={ (event) => this.onFabricCodeChanged(event, inventory.index) } onKeyDown={ (event) => this.handleTabFirstField(event, inventory.index) }/> */}
                          <td><input type="text" ref={inventory.index+"_pieces"} className="form-control" placeholder="Piezas" defaultValue={pieces} onChange={ (event) => this.onPiecesChanged(event, inventory.index) }/></td>
                          <td><input type="text" ref={inventory.index+"_amount"} className="form-control" placeholder="Cantidad" defaultValue={amount} onChange={ (event) => this.onAmountChanged(event, inventory.index) }/></td>
                            {/*<input type="text" ref={inventory.index+"_unit"} placeholder="Unidad" defaultValue={unit} onChange={ (event) => this.onUnitChanged(event, inventory.index) }/>*/}
                          <td><select ref={inventory.index+"_unit"} className="form-control" defaultValue={unit} onChange={ (event) => this.onUnitChanged(event, inventory.index) }>
                            <option value="m">Metros</option>
                            <option value="kg">Kgs.</option>
                          </select></td>
                          <td><input type="text" ref={inventory.index+"_unitPrice"} className="form-control" placeholder="Precio Costo" defaultValue={unitPrice} onChange={ (event) => this.onUnitPriceChanged(event, inventory.index) }/></td>
                          <td><input type="text" ref={inventory.index+"_fabricUnitPrice"} className="form-control" placeholder="Precio Venta" defaultValue={fabricUnitPrice} onChange={ (event) => this.onSalePriceChanged(event, inventory.index) }/></td>
                          <td><button type="button"className="btn btn-sm btn-danger" onKeyDown={ (event) => this.handleTabFinalField(event, inventory.index) } onClick={ (event) => this.removeInventory(event, inventory.index) }>Eliminar tela</button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <div className="text-center">
                <button onClick={(event) => this.addInventory(event, maxIndex+1)} className="btn btn-sm btn-default">Agregar tela</button>
              </div>
            </div>
          </div>
          <div className="row">
            <hr/>
          </div>
          {/*<select ref="formOfPayent" defaultValue="transferencia">
            <option value="transferencia">Trasferencia</option>
            <option value="cheque">Cheque</option>
            <option value="deposito">Deposito</option>
            <option value="efectivo">Efectivo</option>
          </select>*/}
          <div className="row">
            <div className="col-sm-3 pull-right">
              <div className="control-group">
                <div className="form-inline">
                  <label>Subtl:</label>
                  &nbsp;
                  &nbsp;
                  <input type="text" className="input-small form-control" disabled ref="subtotal" value={this.state.subtotal.toFixed(2)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3 pull-right">
              <div className="control-group">
                <div className="form-inline">
                  <label>Iva %</label>
                  &nbsp;
                  &nbsp;
                  <input type="text" className="input-small form-control" ref="vat" placeholder="% IVA" value={this.state.vat} onChange={ (event) => this.onVatChanged(event) }/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3 pull-right">
              <div className="control-group">
                <div className="form-inline">
                  <label>Total:</label>
                  &nbsp;
                  &nbsp;
                  <input type="text" className="input-small form-control" disabled ref="total" value={this.state.total.toFixed(2)}/>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div className="col-xs-2 pull-right">
            <button type="submit" className="btn btn-sm btn-success"> { id ? "Actualizar" : "Crear" } </button>
            &nbsp;
            <Link to="/purchases" className="btn btn-sm btn-default"> Cancelar </Link>
          </div>
        </form>
      </div>
    )
  },
  onVatChanged: function (event) {
    this.setState({
      vat: event.target.value
    }, this.updateTotals);
  },
  updateTotals: function () {
    let subtotal = 0;
    let total = 0;
    this.state.inventories.map((inventory) => {
      let amount = inventory.amount;
      let unitPrice = inventory.unitPrice;
      let added = 0;

      if(amount != undefined && unitPrice != undefined) {
        added = amount*unitPrice;
      }

      subtotal += added
    });
    let vat = this.refs.vat.value;

    if(vat != undefined) {
      total = (subtotal+(subtotal*vat/100));
    }

    this.setState({
      subtotal,
      total
    });
  },
  onUnitPriceChanged: function (event, index) {
    let inventories = this.state.inventories.map( (inventory) => {
      if(inventory.index == index) {
        inventory.unitPrice = event.target.value
      }

      return inventory;
    });
    this.setState({
      inventories
    });
    this.updateTotals();
  },
  onSalePriceChanged: function (event, index) {
    let inventories = this.state.inventories.map( (inventory) => {
      if(inventory.index == index) {
        inventory.salePrice = event.target.value
      }

      return inventory;
    });
    this.setState({
      inventories
    });
  },
  onUnitChanged: function (event, index) {
    let inventories = this.state.inventories.map( (inventory) => {
      if(inventory.index == index) {
        inventory.unit = event.target.value
      }

      return inventory;
    });
    this.setState({
      inventories
    });
  },
  onAmountChanged: function (event, index) {
    let inventories = this.state.inventories.map( (inventory) => {
      if(inventory.index == index) {
        inventory.amount = event.target.value
      }

      return inventory;
    });
    this.setState({
      inventories
    });
    this.updateTotals();
  },
  onPiecesChanged: function (event, index) {
    let inventories = this.state.inventories.map( (inventory) => {
      if(inventory.index == index) {
        inventory.pieces = event.target.value
      }

      return inventory;
    });
    this.setState({
      inventories
    });
  },
  onFabricCodeChanged: function (event, index) {
    let inventories = this.state.inventories.map( (inventory) => {
      if(inventory.index == index) {
        inventory.fabricCode = event.target.value
      }

      return inventory;
    });
    this.setState({
      inventories
    });
  },
  handleTabFirstField: function (event, index) {
    if( event.which === 9 && event.shiftKey === true && this.state.inventories.length > 1 ) {
      let value = this.refs[index+"_fabricCode"].value
      if (value.trim() === "") {
        this.removeInventory(event, index);
      }
    }
  },
  handleTabFinalField: function (event, index) {
    if( event.which === 9 && event.shiftKey === false ) {
      let maxIndex = this.getMaxIndex();
      if (maxIndex == index) {
        this.addInventory(event, maxIndex+1, false);
      }
    }
  },
  getMaxIndex: function () {
    let maxIndex = 0;
    this.state.inventories.map((inventory, index) => {
      if (maxIndex < inventory.index) {
        maxIndex = inventory.index;
      }
    });

    return maxIndex;
  },
  handleClick: function (event) {
    event.preventDefault();
    event.stopPropagation();
    const id = this.props.id;
    const purchaseNumber = this.refs.purchaseNumber.value.trim();
    const supplierId = this.state.supplierId == undefined ? undefined : this.state.supplierId.value;
    const purchaseDate = this.state.purchaseDate.toJSON();
    const vat = this.state.vat;
    const formOfPayent = "transferencia";//this.refs.formOfPayent.value;
    const subtotal = this.refs.subtotal.value;

    let inventories = this.state.inventories.map( (inventory) => {
      return { fabric_id: inventory.fabricId, pieces: inventory.pieces, amount: inventory.amount, unit: inventory.unit, unit_price: inventory.unitPrice }
    });

    const purchase = { id, purchase_number: purchaseNumber, supplier_id: supplierId, purchase_date: purchaseDate, vat: vat, form_of_payment: formOfPayent, subtotal, inventories_attributes: inventories }
    this.props.onActionClick(purchase);
  },
  addInventory: function (event, index, preventDefault = true) {
    if(event != null && preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }
    let inventories = this.state.inventories;
    inventories.push({index: index, unit: "m"});
    this.setState({
      inventories
    });
  },
  removeInventory: function (event, index) {
    event.preventDefault();
    event.stopPropagation();
    let inventories = this.state.inventories;
    let filtered = inventories.filter((inventory) => {
      return ( inventory.index !== index );
    });

    this.setState({
      inventories: filtered
    }, this.updateTotals);
  }
});

export default PurchaseForm