import { combineReducers } from 'redux-immutable'
import auth from './auth'
import fabrics from './fabrics'
import clients from './clients'
import suppliers from './suppliers'
import routerReducer from './routerReducer'
import messages from './messages'

export default combineReducers({
  auth,
  fabrics,
  clients,
  suppliers,
  messages,
  routing: routerReducer
})