export const CREATE_FABRIC_REQUEST = 'CREATE_FABRIC_REQUEST'
export const CREATE_FABRIC_SUCCESS = 'CREATE_FABRIC_SUCCESS'
export const CREATE_FABRIC_FAILURE = 'CREATE_FABRIC_FAILURE'

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