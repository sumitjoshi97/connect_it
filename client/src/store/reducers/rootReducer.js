import authReducer from './authReducer'
import profileReducer from './profileReducer'
import errorReducer from './errorReducer'
import postReducer from './postReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
})

export default rootReducer
