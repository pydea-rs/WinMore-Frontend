// Import necessary RTK Query methods
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'
import { setUser } from '@/store/slices/auth/auth.slice'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { IGetUserInfoPayload, IGetUserInfoResponse, IRegisterUserPayload, IRegisterUserResponse } from '@/types/auth/user.types'
import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../base/axiosBaseQuery'

// Define the API service
export const userService = createApi({
  reducerPath: 'userService', // Specify the reducer path
  baseQuery: axiosBaseQuery(), // Replace with your actual base URL
  endpoints: (builder) => ({
    getUserInfo: builder.query<BaseResponse<IGetUserInfoResponse>, IGetUserInfoPayload>({
      query: (params) => {
        const { user } = getApiRoute()
        return {
          url: user.getUser.path,
          method: 'GET',
          sendAuthorization: true,
        }
      },
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          const { email, name, profile, wallet, id } = data.data
          dispatch(
            setUser({
              avatar: profile.avatar,
              email,
              name,
              id,
              wallet: wallet.address,
            }),
          )
          if (!name || !email) {
            dispatch(triggerModal({ modal: 'login', trigger: true }))
          }
        } catch (err) {}
      },
    }),
    registerUser: builder.mutation<BaseResponse<IRegisterUserResponse>, IRegisterUserPayload>({
      query: (args) => {
        const { user } = getApiRoute()
        return {
          url: user.register.path,
          method: 'POST',
          data: args,
          sendAuthorization: true,
        }
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(triggerModal({ modal: 'login', trigger: false }))

          dispatch(userService.endpoints.getUserInfo.initiate({}, { forceRefetch: true }))
        } catch (err) {}
      },
    }),
  }),
})

export const { useGetUserInfoQuery, useRegisterUserMutation } = userService
