export const CREATE_CLIENT_REQUEST = 'CREATE_CLIENT_REQUEST'
export const CREATE_CLIENT_SUCCESS = 'CREATE_CLIENT_SUCCESS'
export const CREATE_CLIENT_FAILURE = 'CREATE_CLIENT_FAILURE'

export function createClient(client) {
  return {
    type: CREATE_CLIENT_REQUEST,
    loading: true,
    redirect: true,
    client
  }
}

export function createClientRequest(client) {
  return {
    type: CREATE_CLIENT_REQUEST,
    loading: true,
    client
  }
}

export function createClientSuccess(response) {
  return {
    type: CREATE_CLIENT_SUCCESS,
    message: "Cliente creado exitosamente",
    loading: false
  }
}

export function createClientFailure(message) {
  return {
    type: CREATE_CLIENT_FAILURE,
    loading: false,
    message
  }
}

export const GET_CLIENT_REQUEST = 'GET_CLIENT_REQUEST'
export const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS'
export const GET_CLIENT_FAILURE = 'GET_CLIENT_FAILURE'

export function getClientRequest(id) {
  return {
    type: GET_CLIENT_REQUEST,
    loading: true,
    id: id
  }
}

export function getClientSuccess(response) {
  return {
    type: GET_CLIENT_SUCCESS,
    client: response,
    loading: false
  }
}

export function getClientFailure(message) {
  return {
    type: GET_CLIENT_FAILURE,
    loading: false,
    message
  }
}

export const UPDATE_CLIENT_REQUEST = 'UPDATE_CLIENT_REQUEST'
export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS'
export const UPDATE_CLIENT_FAILURE = 'UPDATE_CLIENT_FAILURE'

export function updateClient(client) {
  return {
    type: UPDATE_CLIENT_REQUEST,
    loading: true,
    redirect: true,
    client
  }
}

export function updateClientRequest(client) {
  return {
    type: UPDATE_CLIENT_REQUEST,
    loading: true,
    client
  }
}

export function updateClientSuccess(response) {
  return {
    type: UPDATE_CLIENT_SUCCESS,
    loading: false
  }
}

export function updateClientFailure(message) {
  return {
    type: UPDATE_CLIENT_FAILURE,
    loading: false,
    message
  }
}

export const GET_CLIENTS_REQUEST = 'GET_CLIENTS_REQUEST'
export const GET_CLIENTS_SUCCESS = 'GET_CLIENTS_SUCCESS'
export const GET_CLIENTS_FAILURE = 'GET_CLIENTS_FAILURE'

export function getClientsRequest(page) {
  return {
    type: GET_CLIENTS_REQUEST,
    loading: true,
    page
  }
}

export function getClientsSuccess(response) {
  return {
    type: GET_CLIENTS_SUCCESS,
    clients: response.clients,
    totalPages: response.total_pages,
    currentPage: response.current_page,
    loading: false
  }
}

export function getClientsFailure(message) {
  return {
    type: GET_CLIENTS_FAILURE,
    loading: false,
    message
  }
}

export const DELETE_CLIENT_REQUEST = 'DELETE_CLIENT_REQUEST'
export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS'
export const DELETE_CLIENT_FAILURE = 'DELETE_CLIENT_FAILURE'

export function deleteClient(client_id) {
  return {
    type: DELETE_CLIENT_REQUEST,
    loading: true,
    redirect: true,
    client_id
  }
}

export function deleteClientRequest(client_id) {
  return {
    type: DELETE_CLIENT_REQUEST,
    loading: true,
    client_id
  }
}

export function deleteClientSuccess() {
  return {
    type: DELETE_CLIENT_SUCCESS,
    loading: false
  }
}

export function deleteClientFailure(message) {
  return {
    type: DELETE_CLIENT_FAILURE,
    loading: false,
    message
  }
}