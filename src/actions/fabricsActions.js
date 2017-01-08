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