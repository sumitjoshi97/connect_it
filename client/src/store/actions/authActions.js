import * as actionTypes from './actionTypes'
import setAuthToken from '../../utils/setAuthToken'

// import axios library
import axios from 'axios'

// import jwt library to extract user from jwt token
import jwt_decode from 'jwt-decode'

import { getErrors, clearErrors } from './index'

// register user
export const registerUser = (data, history) => dispatch => {
  // clear error state
  dispatch(clearErrors())
  axios
    .post('/api/users/register', data)
    .then(res => history.push('/login'))
    .catch(err => dispatch(getErrors(err.response.data)))
}

// login and get user token
export const loginUser = data => dispatch => {
  // clears error state
  dispatch(clearErrors())
  axios
    .post('/api/users/login', data)
    .then(res => {
      // get token from response
      const { token } = res.data
      // set token to localstorage
      localStorage.setItem('jwtToken', token)
      //   set token to auth token
      setAuthToken(token)

      //   decode token to get user data
      const decoded = jwt_decode(token)
      // dispatch action to set current user
      dispatch(setCurrentUser(decoded))
      // clear error state
      
    })
    .catch(error => dispatch(getErrors(error.response.data)))
}

// action to set current user
export const setCurrentUser = token => ({
  type: actionTypes.SET_CURENT_USER,
  token
})

//logout user
export const logoutUser = () => dispatch => {
  // remove token from localstorage
  localStorage.removeItem('jwtToken')
  //remove auth token for future requests
  setAuthToken(false)
  //set current user to {} an authenticated to false
  dispatch(setCurrentUser({}))
}
