import authReducer from './authReducer'
import profileReducer from './profileReducer'
import errorReducer from './errorReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
})

export default rootReducer