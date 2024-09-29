// Import necessary RTK Query methods
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'
import { setToken } from '@/store/slices/auth/auth.slice'
import { IGetMessagePayload, IGetMessageResponse, ILoginPayload, ILoginResponse } from '@/types/auth/auth.types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'
import axiosBaseQuery from '../base/axiosBaseQuery'
import { userService } from '../user/user.api'

// Define the API service
export const authService = createApi({
  reducerPath: 'authService', // Specify the reducer path
  baseQuery: axiosBaseQuery(), // Replace with your actual base URL
  endpoints: (builder) => ({
    getMessage: builder.mutation<BaseResponse<IGetMessageResponse>, IGetMessagePayload>({
      query: (params) => {
        const { auth } = getApiRoute() // Use your existing function to get the route
        return {
          url: auth.message.path,
          method: 'POST',
          data: params,
          sendAuthorization: false,
        }
      },
    }),
    getAuth: builder.mutation<BaseResponse<ILoginResponse>, ILoginPayload>({
      query: (params) => {
        const { auth } = getApiRoute() // Use your existing function to get the route
        return {
          url: auth.auth.path,
          method: 'POST',
          sendAuthorization: false,
          data: params,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setToken(data.data.token))
        toast.success('Logged in Successfully')
        dispatch(userService.endpoints.getUserInfo.initiate({}, { forceRefetch: true }))
      },
    }),
  }),
})

// Export the auto-generated hook for the `getNonce` query
export const { useGetMessageMutation, useGetAuthMutation } = authService
