import { combineReducers } from 'redux-immutable'
import auth from './auth'
import fabrics from './fabrics'

export default combineReducers({
  auth,
  fabrics
})