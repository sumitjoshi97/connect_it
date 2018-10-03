import * as actionTypes from './actionTypes'
import { getErrors } from './index'

import axios from 'axios'

// add post
export const addPost = post => ({
  type: actionTypes.ADD_POST,
  post
})

export const addPostInit = postData => dispatch => {
  console.log(postData)
  axios
    .post('/api/posts', postData)
    .then(res => dispatch(addPost(postData)))
    .catch(err => dispatch(getErrors(err.response.data)))
}
