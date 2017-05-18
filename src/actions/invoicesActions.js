export const CREATE_INVOICE_REQUEST = 'CREATE_INVOICE_REQUEST'
export const CREATE_INVOICE_SUCCESS = 'CREATE_INVOICE_SUCCESS'
export const CREATE_INVOICE_FAILURE = 'CREATE_INVOICE_FAILURE'
export const RESET_INVOICE = 'RESET_INVOICE'
export const ADD_INVENTORY = 'ADD_INVENTORY'
export const REMOVE_INVENTORY = 'REMOVE_INVENTORY'
export const ADD_SUPPLIER = 'ADD_SUPPLIER'

export function createInvoiceRequest(invoice) {
  return {
    type: CREATE_INVOICE_REQUEST,
    loading: true,
    redirect: true,
    invoice
  }
}

export function createInvoiceSuccess(response) {
  return {
    type: CREATE_INVOICE_SUCCESS,
    message: "Compra creada exitosamente",
    loading: false
  }
}

export function createInvoiceFailure(message) {
  return {
    type: CREATE_INVOICE_FAILURE,
    loading: false,
    message
  }
}

export const GET_INVOICE_REQUEST = 'GET_INVOICE_REQUEST'
export const GET_INVOICE_SUCCESS = 'GET_INVOICE_SUCCESS'
export const GET_INVOICE_FAILURE = 'GET_INVOICE_FAILURE'

export function getInvoiceRequest(id) {
  return {
    type: GET_INVOICE_REQUEST,
    loading: true,
    id: id
  }
}

export function getInvoiceSuccess(response) {
  return {
    type: GET_INVOICE_SUCCESS,
    invoice: response,
    loading: false
  }
}

export function getInvoiceFailure(message) {
  return {
    type: GET_INVOICE_FAILURE,
    loading: false,
    message
  }
}

export const UPDATE_INVOICE_REQUEST = 'UPDATE_INVOICE_REQUEST'
export const UPDATE_INVOICE_SUCCESS = 'UPDATE_INVOICE_SUCCESS'
export const UPDATE_INVOICE_FAILURE = 'UPDATE_INVOICE_FAILURE'

export function updateInvoiceRequest(invoice) {
  return {
    type: UPDATE_INVOICE_REQUEST,
    loading: true,
    redirect: true,
    invoice
  }
}

export function updateInvoiceSuccess(response) {
  return {
    type: UPDATE_INVOICE_SUCCESS,
    loading: false
  }
}

export function updateInvoiceFailure(message) {
  return {
    type: UPDATE_INVOICE_FAILURE,
    loading: false,
    message
  }
}

export const GET_INVOICES_REQUEST = 'GET_INVOICES_REQUEST'
export const GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS'
export const GET_INVOICES_FAILURE = 'GET_INVOICES_FAILURE'

export function getInvoicesRequest(page, code = null) {
  return {
    type: GET_INVOICES_REQUEST,
    loading: true,
    code,
    page
  }
}

export function getInvoicesSuccess(response) {
  return {
    type: GET_INVOICES_SUCCESS,
    invoices: response.invoices,
    totalPages: response.total_pages,
    currentPage: response.current_page,
    loading: false
  }
}

export function getInvoicesFailure(message) {
  return {
    type: GET_INVOICES_FAILURE,
    loading: false,
    message
  }
}

export const DELETE_INVOICE_REQUEST = 'DELETE_INVOICE_REQUEST'
export const DELETE_INVOICE_SUCCESS = 'DELETE_INVOICE_SUCCESS'
export const DELETE_INVOICE_FAILURE = 'DELETE_INVOICE_FAILURE'

export function deleteInvoiceRequest(invoice_id) {
  return {
    type: DELETE_INVOICE_REQUEST,
    loading: true,
    redirect: true,
    invoice_id
  }
}

export function deleteInvoiceSuccess() {
  return {
    type: DELETE_INVOICE_SUCCESS,
    loading: false
  }
}

export function deleteInvoiceFailure(message) {
  return {
    type: DELETE_INVOICE_FAILURE,
    loading: false,
    message
  }
}