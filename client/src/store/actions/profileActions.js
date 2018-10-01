import axios from 'axios'
import * as actionTypes from './actionTypes'
import { setCurrentUser, getErrors } from './index'

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile')
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})))
}

// profile loading
export const setProfileLoading = () => ({
  type: actionTypes.PROFILE_LOADING
})

// get user profile
export const getProfile = profile => ({
  type: actionTypes.GET_PROFILE,
  profile
})

// clears profile
export const clearCurrentProfile = () => ({
  type: actionTypes.CLEAR_CURRENT_PROFILE
})

// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(getErrors(err.response.data)))
}

// delete user account
export const deleteProfile = () => dispatch => {
  // set curent user to null by passing token as empty object
  axios
    .delete('/api/profile')
    .then(res => dispatch(setCurrentUser({})))
    .catch(err => dispatch(getErrors(err.response.data)))
}
