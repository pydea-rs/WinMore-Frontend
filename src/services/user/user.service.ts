// Import necessary RTK Query methods
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'
import { DREAM_MINE_ROCKS_COUNT } from '@/services/games/mine/mine.service.types'
import { setUser } from '@/store/slices/auth/auth.slice'
import { updateCurrentTokenBalance } from '@/store/slices/currency/currency.slice'
import { setDreamMineConfig, setDreamMineGameMode } from '@/store/slices/mine/mine.slice'
import { IBlock } from '@/store/slices/mine/mine.slice.types'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { setBalances } from '@/store/slices/networks/networks.slice'
import { setPlayingPlinkoGame, setPlinkoConfig } from '@/store/slices/plinko/plinko.slice'
import { RootState } from '@/store/store'
import {
  IEditUserProfilePayload,
  IEditUserProfileResponse,
  IGetUserBalanceResponse,
  IGetUserCurrentBalancePayload,
  IGetUserInfoPayload,
  IGetUserInfoResponse,
  IRegisterUserPayload,
} from '@/types/auth/user.types'
import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../base/axiosBaseQuery'
import { IVoidResponse } from '../base/common.types'
import { IGetMineGamesListPayload, IMineGameDetail } from '../games/mine/mine.service.types'
import { IGetPlinkoGamesListPayload, IPlinkoGame } from '../games/plinko/plinko.service.types'
import {
  IIsUserPlayingPayload,
  IIsUserPlayingResponse,
  IUserTransactionHistoryPayload,
  IUserTransactionHistoryResponse,
  IUserWalletPayload,
  IUserWalletResponse,
  IWithdrawPayload,
  IWithdrawResponse,
} from './user.service.types'

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
              profile,
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
    registerUser: builder.mutation<BaseResponse<IVoidResponse>, IRegisterUserPayload>({
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
    updateUserProfile: builder.mutation<BaseResponse<IEditUserProfileResponse>, IEditUserProfilePayload>({
      query: (args) => {
        const { user } = getApiRoute()
        return {
          url: user.updateProfile.path,
          method: 'PATCH',
          data: args,
          sendAuthorization: true,
        }
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          // dispatch(triggerModal({ modal: 'login', trigger: false }))

          dispatch(UserService.endpoints.getUserInfo.initiate({}, { forceRefetch: true })) // FIXME: Replace with using endpoint response
        } catch (err) {}
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
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        const { data } = await queryFulfilled
        dispatch(updateCurrentTokenBalance(data.data || 0))
      },
    }),
    isPlaying: builder.query<BaseResponse<IIsUserPlayingResponse>, IIsUserPlayingPayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.common.mePlaying.path,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        const { dreamMine, plinko } = data.data ?? {}
        if (dreamMine) {
          const currentGameSelectedBlocks: IBlock[] = dreamMine.nulls.map((nullIndex: number, rowIndex: number) => ({ index: nullIndex, row: rowIndex + 1, status: 'NULL' }))
          dispatch(
            setDreamMineConfig({
              activeRow: dreamMine.currentRow + 1,
              betAmount: dreamMine.initialBet.toString(),
              rows: dreamMine.rowsCount,
              currentGameId: dreamMine.id,
              currentGameStatus: dreamMine.status,
              selectedBlocks: currentGameSelectedBlocks,
              stake: dreamMine.stake,
              isStarted: true,
            }),
          )
          dispatch(setDreamMineGameMode({ label: dreamMine.mode, value: DREAM_MINE_ROCKS_COUNT[dreamMine.mode] }))
        }
        if (plinko) {
          const {} = dispatch(
            setPlinkoConfig({
              betAmount: plinko.initialBet.toString(),
              mode: { label: plinko.mode, value: ['EASY', 'MEDIUM', 'HARD'].findIndex((x) => plinko.mode === x) + 1 },
              numberOfBets: plinko.ballsCount,
              rows: plinko.rowsCount,
            }),
          )
          dispatch(setPlayingPlinkoGame(plinko))
        }
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
    userMineGamesList: builder.query<BaseResponse<IMineGameDetail[]>, IGetMineGamesListPayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.mine.myHistory.path,
          params: arg,
          sendAuthorization: true,
        }
      },
    }),
    userPlinkoGamesList: builder.query<BaseResponse<IPlinkoGame[]>, IGetPlinkoGamesListPayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.plinko.myHistory.path,
          params: arg,
          sendAuthorization: true,
        }
      },
    }),
    userWallet: builder.query<BaseResponse<IUserWalletResponse>, IUserWalletPayload>({
      query(arg) {
        const { user } = getApiRoute()
        return {
          method: 'GET',
          url: user.userWallet.path,
          sendAuthorization: true,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const state = getState() as RootState
          const { network, token } = state.currency
          const { data } = await queryFulfilled
          const currentToken = data.data[network.chainId][token.symbol]
          dispatch(setBalances(data.data))
          dispatch(updateCurrentTokenBalance(currentToken || 0))
        } catch (error) {}
      },
    }),
    userTransactionHistory: builder.query<BaseResponse<IUserTransactionHistoryResponse>, IUserTransactionHistoryPayload>({
      query(arg) {
        const { user } = getApiRoute()
        return {
          url: user.userTransactionHistory.path,
          method: 'GET',
          params: arg,
          sendAuthorization: true,
        }
      },
    }),
  }),
})

export const {
  useGetUserInfoQuery,
  useRegisterUserMutation,
  useUpdateUserProfileMutation,
  useIsPlayingQuery,
  useGetUserTokenBalanceMutation,
  useWithdrawMutation,
  useUserMineGamesListQuery,
  useUserPlinkoGamesListQuery,
  useUserWalletQuery,
  useUserTransactionHistoryQuery,
} = UserService

export const { getUserInfo } = UserService.endpoints
