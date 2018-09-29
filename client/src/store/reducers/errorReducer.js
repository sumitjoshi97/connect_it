import * as actionTypes from '../actions/actionTypes'

const initialState = {
  errors: {}
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return { ...state, errors: action.err }

    default:
      return state
  }
}

export default errorReducer
