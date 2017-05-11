import React from 'react';

const PurchaseForm = React.createClass({
  // componentDidUpdate: function (prevProps, prevState) {
  //   const { id, purchaseNumber, supplierName, supplierTypeNumber, purchaseDate, supplierTypeId, ivaPercentage, subtotal } = this.props
  //   if(purchaseNumber) {
  //     this.refs.purchaseNumber.value = purchaseNumber
  //   }
  //   if(supplierName){
  //     this.refs.supplierName.value = supplierName
  //   }
  //   if(supplierTypeId){
  //     this.refs.supplierTypeId.value = supplierTypeId
  //   }
  //   if(supplierTypeNumber){
  //     this.refs.supplierTypeNumber.value = supplierTypeNumber
  //   }
  //   if(purchaseDate){
  //     this.refs.purchaseDate.value = purchaseDate
  //   }
  //   if(ivaPercentage){
  //     this.refs.ivaPercentage.value = ivaPercentage
  //   }
  //   if(subtotal){
  //     this.refs.subtotal.value = subtotal
  //   }
  // },
  render: function() {
    const { id, fabricId, fabricCode, fabricSalePrice, pieces, amount, unit, unitPrice } = this.props
    return (
        // <form name="inventoryForm" onSubmit={(event) => this.handleClick(event)}>
        <div>
          <input type="text" ref="fabricCode" placeholder="Codigo" defaultValue={fabricCode}/>
          <input type="text" ref="pieces" placeholder="Piezas" defaultValue={pieces}/>
          <input type="text" ref="amount" placeholder="Monto" defaultValue={amount}/>
          <input type="text" ref="unit" placeholder="Unidad" defaultValue={unit}/>
          <input type="text" ref="fabricSalePrice" placeholder="Precio Venta" defaultValue={fabricSalePrice}/>
          <input type="text" ref="unitPrice" placeholder="Precio Costo" defaultValue={unitPrice}/>
        </div>
        // <button type="submit"> { id ? "Actualizar" : "Crear" } </button>
        // </form>
    )
  }
});

export default PurchaseForm