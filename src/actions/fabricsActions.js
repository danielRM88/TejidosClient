export const CREATE_FABRIC_REQUEST = 'CREATE_FABRIC_REQUEST'
export const CREATE_FABRIC_SUCCESS = 'CREATE_FABRIC_SUCCESS'
export const CREATE_FABRIC_FAILURE = 'CREATE_FABRIC_FAILURE'

export function createFabric(fabric) {
  return {
    type: CREATE_FABRIC_REQUEST,
    loading: true,
    redirect: true,
    fabric
  }
}

export function createFabricRequest(fabric) {
  return {
    type: CREATE_FABRIC_REQUEST,
    loading: true,
    fabric
  }
}

export function createFabricSuccess(response) {
  return {
    type: CREATE_FABRIC_SUCCESS,
    message: "Tela creada exitosamente",
    loading: false
  }
}

export function createFabricFailure(message) {
  return {
    type: CREATE_FABRIC_FAILURE,
    loading: false,
    message
  }
}

export const GET_FABRIC_REQUEST = 'GET_FABRIC_REQUEST'
export const GET_FABRIC_SUCCESS = 'GET_FABRIC_SUCCESS'
export const GET_FABRIC_FAILURE = 'GET_FABRIC_FAILURE'

export function getFabricRequest(id) {
  return {
    type: GET_FABRIC_REQUEST,
    loading: true,
    id: id
  }
}

export function getFabricSuccess(response) {
  return {
    type: GET_FABRIC_SUCCESS,
    fabric: response,
    loading: false
  }
}

export function getFabricFailure(message) {
  return {
    type: GET_FABRIC_FAILURE,
    loading: false,
    message
  }
}

export const UPDATE_FABRIC_REQUEST = 'UPDATE_FABRIC_REQUEST'
export const UPDATE_FABRIC_SUCCESS = 'UPDATE_FABRIC_SUCCESS'
export const UPDATE_FABRIC_FAILURE = 'UPDATE_FABRIC_FAILURE'

export function updateFabric(fabric) {
  return {
    type: UPDATE_FABRIC_REQUEST,
    loading: true,
    redirect: true,
    fabric
  }
}

export function updateFabricRequest(fabric) {
  return {
    type: UPDATE_FABRIC_REQUEST,
    loading: true,
    fabric
  }
}

export function updateFabricSuccess(response) {
  return {
    type: UPDATE_FABRIC_SUCCESS,
    loading: false
  }
}

export function updateFabricFailure(message) {
  return {
    type: UPDATE_FABRIC_FAILURE,
    loading: false,
    message
  }
}

export const GET_FABRICS_REQUEST = 'GET_FABRICS_REQUEST'
export const GET_FABRICS_SUCCESS = 'GET_FABRICS_SUCCESS'
export const GET_FABRICS_FAILURE = 'GET_FABRICS_FAILURE'

export function getFabricsRequest(page, code = null) {
  return {
    type: GET_FABRICS_REQUEST,
    loading: true,
    code,
    page
  }
}

export function getFabricsSuccess(response) {
  return {
    type: GET_FABRICS_SUCCESS,
    fabrics: response.fabrics,
    totalPages: response.total_pages,
    currentPage: response.current_page,
    loading: false
  }
}

export function getFabricsFailure(message) {
  return {
    type: GET_FABRICS_FAILURE,
    loading: false,
    message
  }
}

export const DELETE_FABRIC_REQUEST = 'DELETE_FABRIC_REQUEST'
export const DELETE_FABRIC_SUCCESS = 'DELETE_FABRIC_SUCCESS'
export const DELETE_FABRIC_FAILURE = 'DELETE_FABRIC_FAILURE'

export function deleteFabric(fabric_id) {
  return {
    type: DELETE_FABRIC_REQUEST,
    loading: true,
    redirect: true,
    fabric_id
  }
}

export function deleteFabricRequest(fabric_id) {
  return {
    type: DELETE_FABRIC_REQUEST,
    loading: true,
    fabric_id
  }
}

export function deleteFabricSuccess() {
  return {
    type: DELETE_FABRIC_SUCCESS,
    loading: false
  }
}

export function deleteFabricFailure(message) {
  return {
    type: DELETE_FABRIC_FAILURE,
    loading: false,
    message
  }
}