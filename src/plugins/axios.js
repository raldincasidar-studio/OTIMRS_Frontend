import axios from 'axios'
import Toast from './toast'
import { useAuthStore } from '../stores/auth'
import toast from './toast'

const auth = useAuthStore()

export const makeRequest = axios.create({
  baseURL: 'https://36553951-f574-4d56-8d1d-329977aac7cc-00-2cvydytpsmjsw.picard.replit.dev/api',

  headers: {
    Authorization: auth.admin.session_id || null
  }
})

makeRequest.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.error) {
      Toast.fire({
        title: response.data.error,
        icon: 'error'
      })

      if (response.data.logout) {
        await makeRequest.get('/logout')
        auth.admin = {}

        toast.fire({
          title: 'Logged out',
          icon: 'info'
        })
        router.push('/admin')
      }
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
