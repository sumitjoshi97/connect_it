import axios from 'axios'
import * as actionTypes from './actionTypes'

// get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile')
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
