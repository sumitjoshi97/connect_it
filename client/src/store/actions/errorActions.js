import * as actionTypes from './actionTypes'

// action returning error
export const getErrors = err => ({
  type: actionTypes.GET_ERRORS,
  err
})

// reset error state
export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
})
