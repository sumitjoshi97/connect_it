import * as actionTypes from './actionTypes'
import { getErrors } from './index'

import axios from 'axios'

//set loading state
export const setPostLoading = () => ({
  type: actionTypes.POST_LOADING
})

//add post
export const addPost = post => dispatch => {
  axios
    .post('/api/posts', post)
    .then(res =>
      dispatch({
        type: actionTypes.ADD_POST,
        post
      })
    )
    .catch(err => dispatch(getErrors(err.response.data)))
}

// get all posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: actionTypes.GET_POSTS,
      posts: res.data
    }))
    .catch(err => dispatch(getErrors(err.response.data)))
}

//delete post
export const deletePost = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch({
      type: actionTypes.DELETE_POST,
      id
    }))
    .catch(err => dispatch(getErrors(err.response.data)))
}