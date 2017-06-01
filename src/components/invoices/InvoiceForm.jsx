import React from 'react';
import {Link} from 'react-router';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

const InvoiceForm = React.createClass({
  getInitialState: function () {
    return { client: null, sales: [], invoiceDate: moment(), subtotal: 0, total: 0, vat: 12 };
  },
  componentDidMount: function () {
    if(this.props.id == undefined) {
      this.addSale(null, 0);
      let that = this;
      fetch(`http://localhost:3000/api/v1/invoices/get_next_invoice_number`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer '+localStorage.getItem('token')
        }
      }).then((response) => response.json())
      .then((json) => {
        // return json.invoice_number;
        that.refs.invoiceNumber.value = json.invoice_number;
      });
    }
  },
  componentWillReceiveProps: function (nextProps) {
    const { id, invoiceNumber, clientTypeId, clientNumberId, clientName, clientId, invoiceDate, vat, subtotal, sales } = nextProps
    if(invoiceNumber != undefined) {
      this.refs.invoiceNumber.value = invoiceNumber
    
      if(invoiceDate){
        this.refs.invoiceDate.value = invoiceDate
      }
      if(vat){
        this.setState({
          vat: vat
        });
      }
      if(subtotal){
        this.refs.subtotal.value = subtotal
      }
      if(clientId && clientTypeId && clientNumberId && clientName) {
        this.setState({
          client: { value: clientId, label: clientTypeId+'-'+clientNumberId+' : '+clientName }
        });
      }
      if(sales != undefined) {
        let invs = sales.map((i) => {
          return {
            index: i.id,
            fabricId: i.fabric_data.fabric_id,
            fabricCode: i.fabric_data.fabric_code,
            fabric: { value: i.fabric_id, label: i.fabric_data.fabric_code, fabric: { id: i.fabric_data.fabric_id, unit_price: i.unit_price } },
            unitPrice: i.unit_price,
            pieces: i.pieces,
            amount: i.amount,
            unit: i.unit
          }
        });
        this.setState({
          sales: invs
        }, this.updateTotals);
      }
    }
  },
  getClients: function(input) {
    let type;
    let number;
    if (!input) {
      return Promise.resolve({ options: [] });
    } else {
      type = input.split("-")[0];
      number = input.split("-")[1];
    }
    return fetch(`http://localhost:3000/api/v1/clients?type_id=${type}&number_id=${number}`, {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '+localStorage.getItem('token')
                  }
                }).then((response) => response.json())
                .then((json) => {
                  const array = json.clients;
                  let clients = [];

                  if (array!=null) {
                    clients = array.map(function(client){
                      return { value: client.id, label: client.type_id+'-'+client.number_id+' : '+client.client_name }
                    });
                  }
                  return { options: clients };
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
  onClientValueChange: function (value) {
    this.setState({
      client: value,
    });
  },
  onDateChange: function (date) {
    this.setState({
      invoiceDate: date,
    });
  },
  render: function() {
    let maxIndex = 1;
    const { id, invoiceNumber, clientTypeId, clientNumberId, clientId, invoiceDate, ivaId, ivaPercentage, subtotal } = this.props;
    const AsyncComponent = Select.Async;
    return (
      <form name="invoiceForm" onSubmit={(event) => this.handleClick(event)}>
        <input type="text" ref="invoiceNumber" placeholder="No. Factura" defaultValue={invoiceNumber} autoFocus/>
        <AsyncComponent multi={false} 
                        value={this.state.client} 
                        onChange={this.onClientValueChange} 
                        valueKey="value" 
                        cache={false}
                        labelKey="label" 
                        loadOptions={this.getClients} 
                        placeholder="Id. del Cliente"
                        backspaceRemoves={true} />
        <Link to="/clients/new" target="_blank"> Nuevo Cliente </Link>
        <br/>
        <DatePicker
          ref="invoiceDate"
          dateFormat="DD/MM/YYYY"
          selected={this.state.invoiceDate}
          onChange={this.onDateChange} />
        <hr/>
        {
          this.state.sales.map((sale, index) => {
            if(sale.index > maxIndex) {
              maxIndex = sale.index;
            }
            let fabricId = sale.fabricId;
            let fabricCode = sale.fabricCode;
            let fabric = sale.fabric;
            let unitPrice = sale.unitPrice;
            let pieces = sale.pieces;
            let amount = sale.amount;
            let unit = sale.unit;
            return (
              <div key={sale.index}>
                <p>{sale.index}</p>
                <div>
                  <AsyncComponent multi={false} 
                        value={sale.fabric} 
                        onChange={ (value) => {
                            let invs = this.state.sales.map( (inv) => {
                              if(inv.index === sale.index) {
                                inv.fabric = value;
                                inv.fabricCode = value.label;
                                inv.fabricId = (value.fabric == undefined ? undefined : value.fabric.id);
                                inv.unitPrice = (value.fabric == undefined ? undefined : value.fabric.unit_price);
                                this.refs[sale.index+"_unitPrice"].value = (value.fabric == undefined ? "" : value.fabric.unit_price);

                              }
                              return inv;
                            });
                            this.setState({
                              sales: invs
                            });
                          }
                        } 
                        valueKey="value" 
                        cache={false}
                        labelKey="label" 
                        loadOptions={this.getFabricCodes} 
                        placeholder="Codigo"
                        backspaceRemoves={true} />
                  {/*<input type="text" ref={sale.index+"_fabricCode"} placeholder="Codigo" defaultValue={fabricCode} onChange={ (event) => this.onFabricCodeChanged(event, sale.index) } onKeyDown={ (event) => this.handleTabFirstField(event, sale.index) }/> */}
                  <input type="text" ref={sale.index+"_pieces"} placeholder="Piezas" defaultValue={pieces} onChange={ (event) => this.onPiecesChanged(event, sale.index) }/>
                  <input type="text" ref={sale.index+"_amount"} placeholder="Cantidad" defaultValue={amount} onChange={ (event) => this.onAmountChanged(event, sale.index) }/>
                  {/*<input type="text" ref={sale.index+"_unit"} placeholder="Unidad" defaultValue={unit} onChange={ (event) => this.onUnitChanged(event, sale.index) }/>*/}
                  <select ref={sale.index+"_unit"} defaultValue={unit} onChange={ (event) => this.onUnitChanged(event, sale.index) }>
                    <option value="m">Metros</option>
                    <option value="kg">Kgs.</option>
                  </select>
                  <input type="text" ref={sale.index+"_unitPrice"} placeholder="Precio" defaultValue={unitPrice} onChange={ (event) => this.onUnitPriceChanged(event, sale.index) }/>
                </div>
                <button type="button" onKeyDown={ (event) => this.handleTabFinalField(event, sale.index) } onClick={ (event) => this.removeSale(event, sale.index) }>Eliminar tela</button>
              </div>
            )
          })
        }
        <hr/>
        <select ref="formOfPayent" defaultValue="transferencia">
          <option value="transferencia">Trasferencia</option>
          <option value="cheque">Cheque</option>
          <option value="deposito">Deposito</option>
          <option value="efectivo">Efectivo</option>
        </select>
        <p ref="subtotal">Subtotal: {this.state.subtotal.toFixed(2)}</p>
        <input type="text" ref="vat" placeholder="% IVA" value={this.state.vat} onChange={ (event) => this.onVatChanged(event) }/>
        <p ref="total">Total: {this.state.total.toFixed(2)}</p>
        <button type="submit"> { id ? "Actualizar" : "Crear" } </button>
        <button onClick={(event) => this.addSale(event, maxIndex+1)}>Agregar tela</button>
      </form>
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
    this.state.sales.map((sale) => {
      let amount = sale.amount;
      let unitPrice = sale.unitPrice;
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
    let sales = this.state.sales.map( (sale) => {
      if(sale.index == index) {
        sale.unitPrice = event.target.value
      }

      return sale;
    });
    this.setState({
      sales
    });
    this.updateTotals();
  },
  onUnitChanged: function (event, index) {
    let sales = this.state.sales.map( (sale) => {
      if(sale.index == index) {
        sale.unit = event.target.value
      }

      return sale;
    });
    this.setState({
      sales
    });
  },
  onAmountChanged: function (event, index) {
    let sales = this.state.sales.map( (sale) => {
      if(sale.index == index) {
        sale.amount = event.target.value
      }

      return sale;
    });
    this.setState({
      sales
    });
    this.updateTotals();
  },
  onPiecesChanged: function (event, index) {
    let sales = this.state.sales.map( (sale) => {
      if(sale.index == index) {
        sale.pieces = event.target.value
      }

      return sale;
    });
    this.setState({
      sales
    });
  },
  onFabricCodeChanged: function (event, index) {
    let sales = this.state.sales.map( (sale) => {
      if(sale.index == index) {
        sale.fabricCode = event.target.value
      }

      return sale;
    });
    this.setState({
      sales
    });
  },
  handleTabFirstField: function (event, index) {
    if( event.which === 9 && event.shiftKey === true && this.state.sales.length > 1 ) {
      let value = this.refs[index+"_fabricCode"].value
      if (value.trim() === "") {
        this.removeSale(event, index);
      }
    }
  },
  handleTabFinalField: function (event, index) {
    if( event.which === 9 && event.shiftKey === false ) {
      let maxIndex = this.getMaxIndex();
      if (maxIndex == index) {
        this.addSale(event, maxIndex+1, false);
      }
    }
  },
  getMaxIndex: function () {
    let maxIndex = 0;
    this.state.sales.map((sale, index) => {
      if (maxIndex < sale.index) {
        maxIndex = sale.index;
      }
    });

    return maxIndex;
  },
  handleClick: function (event) {
    event.preventDefault();
    event.stopPropagation();
    const id = this.props.id;
    const invoiceNumber = this.refs.invoiceNumber.value.trim();
    const clientId = this.state.client == undefined ? undefined : this.state.client.value;
    const invoiceDate = this.state.invoiceDate.toJSON();
    const vat = this.state.vat;
    const formOfPayent = "transferencia";//this.refs.formOfPayent.value;
    const subtotal = this.refs.subtotal.value;

    let sales = this.state.sales.map( (sale) => {
      return { fabric_id: sale.fabricId, fabric_code: sale.fabricCode, pieces: sale.pieces, amount: sale.amount, unit: sale.unit, unit_price: sale.unitPrice }
    });

    const invoice = { id, invoice_number: invoiceNumber, client_id: clientId, invoice_date: invoiceDate, vat: vat, form_of_payment: formOfPayent, subtotal, sales_attributes: sales }
    this.props.onActionClick(invoice);
  },
  addSale: function (event, index, preventDefault = true) {
    if(event != null && preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }
    let sales = this.state.sales;
    sales.push({index: index, unit: "m"});
    this.setState({
      sales
    });
  },
  removeSale: function (event, index) {
    event.preventDefault();
    event.stopPropagation();
    let sales = this.state.sales;
    let filtered = sales.filter((sale) => {
      return ( sale.index !== index );
    });

    this.setState({
      sales: filtered
    }, this.updateTotals);
  }
});

export default InvoiceForm