import * as actionTypes from '../actions/actionTypes'

const initialState = {
  profile: null,
  profiles: null,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_LOADING:
      return { ...state, loading: true }

    case actionTypes.GET_PROFILE:
      return {
        ...state,
        profile: action.profile,
        loading: false
      }

    case actionTypes.GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.profiles
      }

    case actionTypes.CLEAR_CURRENT_PROFILE:
      return { ...state, profile: null }

    default:
      return state
  }
}
