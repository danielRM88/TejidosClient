import React from 'react';
import Select from 'react-select';
import InventoryFields from './../inventories/InventoryFields'
import fetch from 'isomorphic-fetch';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const PurchaseForm = React.createClass({
  getInitialState: function () {
    return { supplierId: null, label: null, inventories: [], purchaseDate: moment(), subtotal: 0, total: 0 };
  },
  componentDidMount: function () {
    this.addInventory(null, 0);
  },
  componentDidUpdate: function (prevProps, prevState) {
    const { id, purchaseNumber, supplierTypeId, supplierNumberId, supplierId, purchaseDate, ivaPercentage, subtotal, inventories } = this.props
    if(purchaseNumber) {
      this.refs.purchaseNumber.value = purchaseNumber
    }
    if(purchaseDate){
      this.refs.purchaseDate.value = purchaseDate
    }
    if(ivaPercentage){
      this.refs.ivaPercentage.value = ivaPercentage
    }
    if(subtotal){
      this.refs.subtotal.value = subtotal
    }
    if(supplierId && supplierTypeId && supplierNumberId) {
      this.setState({
        value: { value: supplierId, label: supplierTypeId+'-'+supplierNumberId }
      });
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
    return fetch(`http://localhost:3000/api/v1/suppliers?type_id=${type}&number_id=${number}`, {
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
    return fetch(`http://localhost:3000/api/v1/fabrics?code=${input}`, {
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
      <form name="purchaseForm" onSubmit={(event) => this.handleClick(event)}>
        <input type="text" ref="purchaseNumber" placeholder="No. Compra" defaultValue={purchaseNumber} autoFocus/>
        <AsyncComponent multi={false} 
                        value={this.state.supplierId} 
                        onChange={this.onSupplierValueChange} 
                        valueKey="value" 
                        cache={false}
                        labelKey="label" 
                        loadOptions={this.getSuppliers} 
                        placeholder="Rif del Proveedor"
                        backspaceRemoves={true} />
        <DatePicker
          ref="purchaseDate"
          dateFormat="DD/MM/YYYY"
          selected={this.state.purchaseDate}
          onChange={this.onDateChange} />
        <hr/>
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
              <div key={inventory.index}>
                <p>{inventory.index}</p>
                <div>
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
                  {/*<input type="text" ref={inventory.index+"_fabricCode"} placeholder="Codigo" defaultValue={fabricCode} onChange={ (event) => this.onFabricCodeChanged(event, inventory.index) } onKeyDown={ (event) => this.handleTabFirstField(event, inventory.index) }/> */}
                  <input type="text" ref={inventory.index+"_pieces"} placeholder="Piezas" defaultValue={pieces} onChange={ (event) => this.onPiecesChanged(event, inventory.index) }/>
                  <input type="text" ref={inventory.index+"_amount"} placeholder="Cantidad" defaultValue={amount} onChange={ (event) => this.onAmountChanged(event, inventory.index) }/>
                  {/*<input type="text" ref={inventory.index+"_unit"} placeholder="Unidad" defaultValue={unit} onChange={ (event) => this.onUnitChanged(event, inventory.index) }/>*/}
                  <select ref={inventory.index+"_unit"} defaultValue={unit} onChange={ (event) => this.onUnitChanged(event, inventory.index) }>
                    <option value="m">Metros</option>
                    <option value="kg">Kgs.</option>
                  </select>
                  <input type="text" ref={inventory.index+"_unitPrice"} placeholder="Precio Costo" defaultValue={unitPrice} onChange={ (event) => this.onUnitPriceChanged(event, inventory.index) }/>
                  <input type="text" ref={inventory.index+"_fabricUnitPrice"} placeholder="Precio Venta" defaultValue={fabricUnitPrice} onChange={ (event) => this.onSalePriceChanged(event, inventory.index) }/>
                </div>
                <button type="button" onKeyDown={ (event) => this.handleTabFinalField(event, inventory.index) } onClick={ (event) => this.removeInventory(event, inventory.index) }>Eliminar tela</button>
              </div>
            )
          })
        }
        <hr/>
        {/*<select ref="formOfPayent" defaultValue="transferencia">
          <option value="transferencia">Trasferencia</option>
          <option value="cheque">Cheque</option>
          <option value="deposito">Deposito</option>
          <option value="efectivo">Efectivo</option>
        </select>*/}
        <p ref="subtotal">Subtotal: {this.state.subtotal}</p>
        <input type="text" ref="vat" placeholder="% IVA" defaultValue={12} onChange={ (event) => this.updateTotals() }/>
        <p ref="total">Total: {this.state.total}</p>
        <button type="submit"> { id ? "Actualizar" : "Crear" } </button>
        <button onClick={(event) => this.addInventory(event, maxIndex+1)}>Agregar tela</button>
      </form>
    )
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
    const vat = this.refs.vat.value;
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