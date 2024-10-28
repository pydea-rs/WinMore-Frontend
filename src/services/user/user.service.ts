// Import necessary RTK Query methods
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'
import { setUser } from '@/store/slices/auth/auth.slice'
import { updateCurrentTokenBalance } from '@/store/slices/currency/currency.slice'
import { updateMinConfigMode, updateMineConfig } from '@/store/slices/mine/mine.slice'
import { IBlock } from '@/store/slices/mine/mine.slice.types'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import {
  IGetUserBalanceResponse,
  IGetUserCurrentBalancePayload,
  IGetUserInfoPayload,
  IGetUserInfoResponse,
  IRegisterUserPayload,
  IRegisterUserResponse,
} from '@/types/auth/user.types'
import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../base/axiosBaseQuery'
import { IIsUserPlayingPayload, IIsUserPlayingResponse, IWithdrawPayload, IWithdrawResponse } from './user.service.types'

// Define the API service
export const UserService = createApi({
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

          dispatch(UserService.endpoints.getUserInfo.initiate({}, { forceRefetch: true }))
        } catch (err) {}
      },
    }),
    getUserCurrentBalance: builder.query<BaseResponse<IGetUserBalanceResponse>, IGetUserCurrentBalancePayload>({
      query(arg) {
        const { user } = getApiRoute()
        return {
          method: 'GET',
          url: user.currentBalance.get(arg.token),
          params: {
            chain: arg.chain,
          },
        }
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data, meta } = await queryFulfilled

        dispatch(updateCurrentTokenBalance(data.data))
      },
    }),
    getUserTokenBalance: builder.mutation<BaseResponse<IGetUserBalanceResponse>, IGetUserCurrentBalancePayload>({
      query(arg) {
        const { user } = getApiRoute()
        return {
          method: 'GET',
          url: user.currentBalance.get(arg.token),
          params: {
            chain: arg.chain,
          },
        }
      },
    }),
    isPlaying: builder.query<BaseResponse<IIsUserPlayingResponse>, IIsUserPlayingPayload>({
      query(arg) {
        const { user } = getApiRoute()
        return {
          method: 'GET',
          url: user.isPlaying.path,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (!data.data.dreamMine) {
          return
        }
        const currentGame = data.data.dreamMine
        const currentGameSelectedBlocks: IBlock[] = currentGame.golds.map((gold, rowIndex) => ({ index: gold, row: rowIndex + 1, status: 'GOLD' }))
        dispatch(
          updateMineConfig({
            activeRow: currentGame.currentRow + 1,
            betAmount: currentGame.initialBet.toString(),
            rows: currentGame.rowsCount,
            currentGameId: currentGame.id,
            currentGameStatus: currentGame.status,
            selectedBlocks: currentGameSelectedBlocks,
            stake: currentGame.stake,
            isStarted: true,
          }),
        )
        dispatch(updateMinConfigMode(currentGame.mode))
      },
    }),
    withdraw: builder.mutation<BaseResponse<IWithdrawResponse>, IWithdrawPayload>({
      query(arg) {
        const { user } = getApiRoute()
        return {
          method: 'POST',
          data: arg,
          url: user.withdraw.path,
          sendAuthorization: true,
        }
      },
    }),
  }),
})

export const { useGetUserInfoQuery, useRegisterUserMutation, useGetUserCurrentBalanceQuery, useIsPlayingQuery, useGetUserTokenBalanceMutation, useWithdrawMutation } = UserService
