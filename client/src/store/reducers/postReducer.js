import  * as actionTypes from '../actions/actionTypes'

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST: 
      return {
        ...state,
        posts: [action.post, ...state.posts]
      }

  default:
    return state
  }
}
