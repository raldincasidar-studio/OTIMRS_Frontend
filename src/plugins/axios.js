import axios from 'axios'
import Toast from './toast'

export const makeRequest = axios.create({
  baseURL: 'http://localhost:8000/api'
})

makeRequest.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.error) {
      Toast.fire({
        title: response.data.error,
        icon: 'error'
      })
      return Promise.reject()
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Toast.fire({
      title: error,
      icon: 'error'
    })
    console.error(error)
    return Promise.reject()
  }
)
