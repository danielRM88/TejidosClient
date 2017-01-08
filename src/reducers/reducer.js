import { combineReducers } from 'redux-immutable'
import auth from './auth'
import fabrics from './fabrics'
import routerReducer from './routerReducer'
import messages from './messages'

export default combineReducers({
  auth,
  fabrics,
  messages,
  routing: routerReducer
})