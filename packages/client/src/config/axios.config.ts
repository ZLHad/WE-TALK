import axios, { AxiosError } from 'axios'
import { userObservable } from '../context/UserContext'
import { ErrorStatus, response, ResponseType } from '@we-talk/common'
import { jumpToLogin } from '../utils/auth.util'

export const request = axios.create()

request.interceptors.request.use(
  function (config) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[AXIOS] request config: ', config)
    }
    if (userObservable.token) {
      config.headers = {
        Authorization: userObservable.token,
        ...(config.headers ?? {})
      }
    }
    return config
  },
  function (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[AXIOS] request error: ', error)
    }
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (response) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[AXIOS] response value: ', response)
    }
    const data: ResponseType = response.data

    if (data.status === ErrorStatus.Unauthorized) {
      jumpToLogin()
    }

    return Promise.resolve(response)
  },
  function (error: AxiosError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[AXIOS] response error: ', error.response)
    }

    if (error.response) {
      if (error.response.status === 401) {
        jumpToLogin()
      }
      return Promise.resolve({ data: response(error, error.response.status, error.response.statusText) })
    }

    return Promise.reject(error)
  }
)
