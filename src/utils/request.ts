import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { AdminModule } from '@/store/modules/admin'
import Qs from 'qs'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000
  // withCredentials: true // send cookies when cross-domain requests sandesh read about it
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (AdminModule.token) {
      config.headers.Authorization = 'Bearer ' + AdminModule.token
    }
    // if type get then serialize params
    if (config.method === 'get') {
      // check if filter exist
      if (config.params && config.params.filter && config.params.filter.length > 0) {
        config.paramsSerializer = function(params) {
          return Qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }
    } else if (config.method === 'patch') {
      config.data.updatedBy = AdminModule.id
    } else if (config.method === 'post' && config.data) {
      config.data.createdBy = AdminModule.id
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    return response.data
  },
  (error) => {
    if (!error.response) {
      // network error
      const errorMessage = 'Network error!'
      Message({
        message: errorMessage,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(errorMessage)
    } else if (error.response) {
      if (error.response.data.message) {
        Message({
          message: error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default service
