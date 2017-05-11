export const CREATE_SUPPLIER_REQUEST = 'CREATE_SUPPLIER_REQUEST'
export const CREATE_SUPPLIER_SUCCESS = 'CREATE_SUPPLIER_SUCCESS'
export const CREATE_SUPPLIER_FAILURE = 'CREATE_SUPPLIER_FAILURE'

export function createSupplier(supplier) {
  return {
    type: CREATE_SUPPLIER_REQUEST,
    loading: true,
    redirect: true,
    supplier
  }
}

export function createSupplierRequest(supplier) {
  return {
    type: CREATE_SUPPLIER_REQUEST,
    loading: true,
    supplier
  }
}

export function createSupplierSuccess(response) {
  return {
    type: CREATE_SUPPLIER_SUCCESS,
    message: "Suppliere creado exitosamente",
    loading: false
  }
}

export function createSupplierFailure(message) {
  return {
    type: CREATE_SUPPLIER_FAILURE,
    loading: false,
    message
  }
}

export const GET_SUPPLIER_REQUEST = 'GET_SUPPLIER_REQUEST'
export const GET_SUPPLIER_SUCCESS = 'GET_SUPPLIER_SUCCESS'
export const GET_SUPPLIER_FAILURE = 'GET_SUPPLIER_FAILURE'

export function getSupplierRequest(id) {
  return {
    type: GET_SUPPLIER_REQUEST,
    loading: true,
    id: id
  }
}

export function getSupplierSuccess(response) {
  return {
    type: GET_SUPPLIER_SUCCESS,
    supplier: response,
    loading: false
  }
}

export function getSupplierFailure(message) {
  return {
    type: GET_SUPPLIER_FAILURE,
    loading: false,
    message
  }
}

export const UPDATE_SUPPLIER_REQUEST = 'UPDATE_SUPPLIER_REQUEST'
export const UPDATE_SUPPLIER_SUCCESS = 'UPDATE_SUPPLIER_SUCCESS'
export const UPDATE_SUPPLIER_FAILURE = 'UPDATE_SUPPLIER_FAILURE'

export function updateSupplier(supplier) {
  return {
    type: UPDATE_SUPPLIER_REQUEST,
    loading: true,
    redirect: true,
    supplier
  }
}

export function updateSupplierRequest(supplier) {
  return {
    type: UPDATE_SUPPLIER_REQUEST,
    loading: true,
    supplier
  }
}

export function updateSupplierSuccess(response) {
  return {
    type: UPDATE_SUPPLIER_SUCCESS,
    loading: false
  }
}

export function updateSupplierFailure(message) {
  return {
    type: UPDATE_SUPPLIER_FAILURE,
    loading: false,
    message
  }
}

export const GET_SUPPLIERS_REQUEST = 'GET_SUPPLIERS_REQUEST'
export const GET_SUPPLIERS_SUCCESS = 'GET_SUPPLIERS_SUCCESS'
export const GET_SUPPLIERS_FAILURE = 'GET_SUPPLIERS_FAILURE'

export function getSuppliersRequest(page, typeId = null, numberId = null) {
  return {
    type: GET_SUPPLIERS_REQUEST,
    loading: true,
    typeId,
    numberId,
    page
  }
}

export function getSuppliersSuccess(response) {
  return {
    type: GET_SUPPLIERS_SUCCESS,
    suppliers: response.suppliers,
    totalPages: response.total_pages,
    currentPage: response.current_page,
    loading: false
  }
}

export function getSuppliersFailure(message) {
  return {
    type: GET_SUPPLIERS_FAILURE,
    loading: false,
    message
  }
}

export const DELETE_SUPPLIER_REQUEST = 'DELETE_SUPPLIER_REQUEST'
export const DELETE_SUPPLIER_SUCCESS = 'DELETE_SUPPLIER_SUCCESS'
export const DELETE_SUPPLIER_FAILURE = 'DELETE_SUPPLIER_FAILURE'

export function deleteSupplier(supplier_id) {
  return {
    type: DELETE_SUPPLIER_REQUEST,
    loading: true,
    redirect: true,
    supplier_id
  }
}

export function deleteSupplierRequest(supplier_id) {
  return {
    type: DELETE_SUPPLIER_REQUEST,
    loading: true,
    supplier_id
  }
}

export function deleteSupplierSuccess() {
  return {
    type: DELETE_SUPPLIER_SUCCESS,
    loading: false
  }
}

export function deleteSupplierFailure(message) {
  return {
    type: DELETE_SUPPLIER_FAILURE,
    loading: false,
    message
  }
}