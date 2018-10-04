import * as actionTypes from './actionTypes'
import { getErrors, clearErrors } from './index'

import axios from 'axios'

//set loading state
export const setPostLoading = () => ({
  type: actionTypes.POST_LOADING
})

//add post
export const addPost = post => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/posts', post)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch(getErrors(err.response.data)))
}

// get single post
export const getPost = id => dispatch => {
  dispatch(setPostLoading())
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
        post: res.data
      })
    )
    .catch(err => dispatch(getErrors(err.response.data)))
}

// get all posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: res.data
      })
    )
    .catch(err => dispatch(getErrors(err.response.data)))
}

//delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: actionTypes.DELETE_POST,
        id
      })
    )
    .catch(err => dispatch(getErrors(err.response.data)))
}

//add like
export const addLike = postId => dispatch => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch(getErrors(err.response.data)))
}

//remove like
export const removeLike = postId => dispatch => {
  axios
    .post(`/api/posts/unlike/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch(getErrors(err.response.data)))
}

//add comment
export const addComment = (postId, comment) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, comment)
    .then(res => dispatch(getPost(postId)))
    .catch(err => dispatch(getErrors(err.response.data)))
}

//delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch(getPost(postId)))
    .catch(err =>dispatch(getErrors(err.response.data)))
}