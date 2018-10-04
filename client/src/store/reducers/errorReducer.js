import * as actionTypes from '../actions/actionTypes'

const initialState = {
  errors: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return { ...state, errors: action.err }

    case actionTypes.CLEAR_ERRORS: 
      return {...state, errors : {}}
    default:
      return state
  }
}