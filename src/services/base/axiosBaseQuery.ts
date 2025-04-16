import { RootState } from '@/store/store'
import { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'

export const axiosInstance: AxiosInstance = axios.create({ baseURL: process.env.BASE_URL })
axiosInstance.interceptors.request.use((config) => {
  // const access_token = getCookie('session')
  // if (access_token) {
  //   config.headers.set({
  //     authorization: `Bearer ${access_token}`,
  //     'Accept-Language': 'fa',
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     ...config.headers,
  //   })
  // } else {
  //   config.headers.set({
  //     'Accept-Language': 'fa',
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     ...config.headers,
  //   })
  // }

  return config
})

axiosInstance.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    return Promise.reject(error)
  },
)

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string
      headers?: { 'Content-Type'?: string }
      sendAuthorization?: boolean
      method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, headers = {}, sendAuthorization = true, method, data, params }, { getState }) => {
    try {
      const token: string | null = (getState() as RootState).auth.token || null
      const auth = sendAuthorization ? { Authorization: `Bearer ${token}` } : {}
      const API_URL = baseUrl + url
      const result = await axiosInstance({
        url: API_URL,
        method,
        data,
        params,
        headers: {
          'Access-Control-Allow-Origin': '*',
          ...auth,
          ...headers,
        },
      })
      return {
        data: {
          data: result.data.data,
          message: result.data.message,
          status: result.data.status,
        },
      }
    } catch (axiosError) {
      let err = axiosError as AxiosError<{ data: null; message: string[]; status?: number }>
      console.log(err)
      toast.error(err.response?.data.message)
      throw err
    }
  }

export default axiosBaseQuery
