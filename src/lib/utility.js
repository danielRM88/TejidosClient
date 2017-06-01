export const processErrorMessages = errorsHash => {

  let msg = "";
  let errors;
  let error;
  let field = null;
  let processedErrors = [];

  for(field in errorsHash){
    msg = ""+mapper(field)+": ";
    errors = errorsHash[field];

    for(error in errors) {
      msg += ""+mapper(errors[error])+", ";
    }
    msg = msg.slice(0, msg.lastIndexOf(","));
    processedErrors.push(msg);
  }

  return processedErrors;
}

export const mapper = string => {
  let translation = string
  if(string == "code") {
    translation = "código";
  } else if(string == "unit_price") {
    translation = "precio unitario";
  } else if(string == "can't be blank") {
    translation = "no puede estar en blanco";
  } else if(string == "is not a number") {
    translation = "debe ser un número";
  } else if(string == "has already been taken") {
    translation = "ya existe";
  } else if(string == "supplier_name") {
    translation = "Nombre del Proveedor";
  } else if(string == "supplier") {
    translation = "El Proveedor";
  } else if(string == "client_name") {
    translation = "Nombre del Cliente";
  } else if(string == "type_id") {
    translation = "Tipo de Id.";
  } else if(string == "number_id") {
    translation = "Número de Id.";
  } else if(string == "is invalid") {
    translation = "Es inválido";
  } else if(string == "inventories.fabric") {
    translation = "El código de la tela";
  } else if(string == "inventories.pieces") {
    translation = "El número de piezas";
  } else if(string == "inventories.amount") {
    translation = "La cantidad de la tela";
  } else if(string == "inventories.unit_price") {
    translation = "El costo de la tela";
  } else if(string == "purchase_number") {
    translation = "El número de la compra";
  } else if(string == "must be greater than 0") {
    translation = "Debe se mayor a zero";
  } else if(string == "client") {
    translation = "El Cliente";
  } else if(string == "sales") {
    translation = "Ventas";
  } else if(string == "Not Enough Existence") {
    translation = "No hay suficiente inventario (Revise que la unidad sea correcta m - kgs.)";
  } else if(string == "phones.area_code") {
    translation = "El código de área";
  } else if(string == "phones.phone_number") {
    translation = "El número de teléfono";
  } else if(string == "sales.amount") {
    translation = "La cantidad de la tela";
  } else if(string == "sales.pieces") {
    translation = "El número de piezas";
  } else if(string == "sales.unit_price") {
    translation = "El precio de la tela";
  }

  return translation;
}