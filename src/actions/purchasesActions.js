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

export const GET_PURCHASE_REQUEST = 'GET_PURCHASE_REQUEST'
export const GET_PURCHASE_SUCCESS = 'GET_PURCHASE_SUCCESS'
export const GET_PURCHASE_FAILURE = 'GET_PURCHASE_FAILURE'

export function getPurchaseRequest(id) {
  return {
    type: GET_PURCHASE_REQUEST,
    loading: true,
    id: id
  }
}

export function getPurchaseSuccess(response) {
  return {
    type: GET_PURCHASE_SUCCESS,
    purchase: response,
    loading: false
  }
}

export function getPurchaseFailure(message) {
  return {
    type: GET_PURCHASE_FAILURE,
    loading: false,
    message
  }
}

export const UPDATE_PURCHASE_REQUEST = 'UPDATE_PURCHASE_REQUEST'
export const UPDATE_PURCHASE_SUCCESS = 'UPDATE_PURCHASE_SUCCESS'
export const UPDATE_PURCHASE_FAILURE = 'UPDATE_PURCHASE_FAILURE'

export function updatePurchaseRequest(purchase) {
  return {
    type: UPDATE_PURCHASE_REQUEST,
    loading: true,
    redirect: true,
    purchase
  }
}

export function updatePurchaseSuccess(response) {
  return {
    type: UPDATE_PURCHASE_SUCCESS,
    loading: false
  }
}

export function updatePurchaseFailure(message) {
  return {
    type: UPDATE_PURCHASE_FAILURE,
    loading: false,
    message
  }
}

export const GET_PURCHASES_REQUEST = 'GET_PURCHASES_REQUEST'
export const GET_PURCHASES_SUCCESS = 'GET_PURCHASES_SUCCESS'
export const GET_PURCHASES_FAILURE = 'GET_PURCHASES_FAILURE'

export function getPurchasesRequest(page, code = null) {
  return {
    type: GET_PURCHASES_REQUEST,
    loading: true,
    code,
    page
  }
}

export function getPurchasesSuccess(response) {
  return {
    type: GET_PURCHASES_SUCCESS,
    purchases: response.purchases,
    totalPages: response.total_pages,
    currentPage: response.current_page,
    loading: false
  }
}

export function getPurchasesFailure(message) {
  return {
    type: GET_PURCHASES_FAILURE,
    loading: false,
    message
  }
}

export const DELETE_PURCHASE_REQUEST = 'DELETE_PURCHASE_REQUEST'
export const DELETE_PURCHASE_SUCCESS = 'DELETE_PURCHASE_SUCCESS'
export const DELETE_PURCHASE_FAILURE = 'DELETE_PURCHASE_FAILURE'

export function deletePurchaseRequest(purchase_id) {
  return {
    type: DELETE_PURCHASE_REQUEST,
    loading: true,
    redirect: true,
    purchase_id
  }
}

export function deletePurchaseSuccess() {
  return {
    type: DELETE_PURCHASE_SUCCESS,
    loading: false
  }
}

export function deletePurchaseFailure(message) {
  return {
    type: DELETE_PURCHASE_FAILURE,
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