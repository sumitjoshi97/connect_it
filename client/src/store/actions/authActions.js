import * as actionTypes from './actionTypes'
import setAuthToken from '../utils/setAuthToken'

// import axios library
import axios from 'axios'

// import jwt library to extract user from jwt token
import jwt_decode from 'jwt-decode'

// action returning error
export const getErrors = err => ({
  type: actionTypes.GET_ERRORS,
  err
})

// register user
export const registerUser = (data, history) => dispatch => {
  axios
    .post('/api/users/register', data)
    .then(res => history.push('/login'))
    .catch(err => dispatch(getErrors(err.response.data)))
}

// login get user token
export const loginUser = data => dispatch => {
  axios
    .post('/api/users/login', userData)
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
    })
    .catch(err => dispatch(getErrors(err.response.data)))
}

// action to set current user
export const setCurrentUser = token => ({
  type: actionTypes.SET_CURENT_USER,
  token
})
