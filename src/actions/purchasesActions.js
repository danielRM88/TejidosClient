export const CREATE_PURCHASE_REQUEST = 'CREATE_PURCHASE_REQUEST'
export const CREATE_PURCHASE_SUCCESS = 'CREATE_PURCHASE_SUCCESS'
export const CREATE_PURCHASE_FAILURE = 'CREATE_PURCHASE_FAILURE'
export const RESET_PURCHASE = 'RESET_PURCHASE'
export const ADD_INVENTORY = 'ADD_INVENTORY'
export const REMOVE_INVENTORY = 'REMOVE_INVENTORY'
export const ADD_SUPPLIER = 'ADD_SUPPLIER'

export function createPurchaseRequest(purchase) {
  return {
    type: CREATE_PURCHASE_REQUEST,
    loading: true,
    redirect: true,
    purchase
  }
}

export function createPurchaseSuccess(response) {
  return {
    type: CREATE_PURCHASE_SUCCESS,
    message: "Compra creada exitosamente",
    loading: false
  }
}

export function createPurchaseFailure(message) {
  return {
    type: CREATE_PURCHASE_FAILURE,
    loading: false,
    message
  }
}

export function resetPurchase() {
  return {
    type: RESET_PURCHASE
  }
}

export function addInventory(inventory) {
  return {
    type: ADD_INVENTORY,
    inventory
  }
}

export function removeInventory(index) {
  return {
    type: REMOVE_INVENTORY,
    index
  }
}

export function addSupplier(supplierId) {
  return {
    type: ADD_SUPPLIER,
    supplierId
  }
}