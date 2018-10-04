import * as actionTypes from '../actions/actionTypes'

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

    case actionTypes.POST_LOADING:
      return {
        ...state,
        loading: true
      }

    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts: action.posts,
        loading: false
      }

    case actionTypes.GET_POST:
      return {
        ...state,
        post: action.post
      }
      
    case actionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.id)
      }
    default:
      return state
  }
}
