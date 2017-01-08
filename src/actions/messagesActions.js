export const SET_MESSAGE = 'SET_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'

export function setMessage(message, type) {
  return {
    type: SET_MESSAGE,
    message: message,
    messageType: type
  }
}

export function removeMessage(response) {
  return {
    type: REMOVE_MESSAGE
  }
}