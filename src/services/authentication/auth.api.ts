// Import necessary RTK Query methods
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'
import { login } from '@/store/slices/auth/auth.slice'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { IGetNoncePayload, IGetNonceResponse, IGetUserInfoPayload, IGetUserInfoResponse } from '@/types/auth/auth.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCookie } from 'cookies-next'

// Define the API service
export const authService = createApi({
  reducerPath: 'authService', // Specify the reducer path
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Replace with your actual base URL
  endpoints: (builder) => ({
    getNonce: builder.mutation<BaseResponse<IGetNonceResponse>, IGetNoncePayload>({
      query: (params) => {
        const { auth } = getApiRoute() // Use your existing function to get the route
        return {
          url: auth.nonce,
          method: 'GET',
        }
      },
    }),
    getUserInfo: builder.query<BaseResponse<IGetUserInfoResponse>, IGetUserInfoPayload>({
      query: (params) => {
        const { auth } = getApiRoute() // Use your existing function to get the route
        return {
          url: auth.getUser,
          method: 'GET',
          params,
        }
      },
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          // Handle success - e.g., dispatch actions, set cookies, etc.
          setCookie('token', data.data.user.jwt_token)
          dispatch(login({ user: { ...data.data.user, public_key: 'pub' } }))
          dispatch(triggerModal({ modal: 'login', trigger: false }))
        } catch (err) {
          // Handle error if necessary
        }
      },
    }),
  }),
})

// Export the auto-generated hook for the `getNonce` query
export const { useGetNonceMutation, useGetUserInfoQuery } = authService
