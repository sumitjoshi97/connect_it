import axios from 'axios'
import { request } from 'http'

const setAuthToken = token => {
  if (token) {
    // apply to every request
    axios.defaults.headers.common['Authorization'] = token
  } else {
    //   delete auth header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
