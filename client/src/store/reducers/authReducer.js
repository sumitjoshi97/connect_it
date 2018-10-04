import * as actionTypes from '../actions/actionTypes'
import isEmpty from '../../utils/isEmpty'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.token),
        user: action.token
      }

    default:
      return state
  }
}
