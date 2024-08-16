import axios, { AxiosInstance } from 'axios'
import { getCookie } from 'cookies-next'
import { IRequestOption, IResponse } from './request-interface'

export function successHandler<T>(response: IResponse<T>): void {}

export function errorHandler(error: any): void {
  throw error
}

export async function sendRequest<T, D = any>({ headers, ...restOptions }: IRequestOption<D>): Promise<IResponse<T>> {
  const axiosInstance: AxiosInstance = axios.create({ baseURL: process.env.BASE_URL })

  axiosInstance.interceptors.request.use((config) => {
    const access_token = getCookie('session')
    if (access_token) {
      config.headers.set({
        authorization: `Bearer ${access_token}`,
        'Accept-Language': 'fa',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...config.headers,
      })
    } else {
      config.headers.set({
        'Accept-Language': 'fa',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...config.headers,
      })
    }

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

  try {
    const response: IResponse<T> = await axiosInstance({ ...restOptions })
    successHandler<T>(response)
    return response
  } catch (error: any) {
    errorHandler(error)
    return error
  }
}
