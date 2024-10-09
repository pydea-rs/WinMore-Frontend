import axiosBaseQuery from '@/services/base/axiosBaseQuery'
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'
import { updateCoefficients, updateMineConfig } from '@/store/slices/mine/mine.slice'
import { ICurrentMineGame } from '@/store/slices/mine/mine.slice.types'
import {
  IBackoffMinePayload,
  IBackoffMineResponse,
  IGetMineRulesPayload,
  IGetMineRulesResponse,
  IMineBlockPayload,
  IMineBlockResponse,
  IPlaceMineBetPayload,
} from '@/types/games/mine.types'
import { createApi } from '@reduxjs/toolkit/query/react'

export const MineService = createApi({
  reducerPath: 'mineService',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getRules: builder.query<BaseResponse<IGetMineRulesResponse>, IGetMineRulesPayload>({
      query: (params) => {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.mine.rules.path,
          sendAuthorization: true,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(updateCoefficients(data.data.coefficients))
        dispatch(updateMineConfig({ rows: data.data.minRows }))
      },
    }),
    postMineBet: builder.mutation<BaseResponse<ICurrentMineGame>, IPlaceMineBetPayload>({
      query: (params) => {
        const { games } = getApiRoute()
        return {
          method: 'POST',
          url: games.mine.bet.path,
          data: params,
          sendAuthorization: true,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        // dispatch(updateCurrentGame(data.data))
        dispatch(updateMineConfig({ currentGameId: data.data.id }))
      },
    }),
    mineBlock: builder.mutation<BaseResponse<IMineBlockResponse>, IMineBlockPayload>({
      query(payload) {
        const { games } = getApiRoute()
        return {
          method: 'POST',
          url: games.mine.mineBlock.get(payload.id),
          data: { choice: payload.choice },
          sendAuthorization: true,
        }
      },
    }),
    backoffMine: builder.mutation<BaseResponse<IBackoffMineResponse>, IBackoffMinePayload>({
      query(payload) {
        const { games } = getApiRoute()
        return {
          method: 'POST',
          url: games.mine.backoffMine.get(payload.id),
          sendAuthorization: true,
        }
      },
    }),
  }),
})

export const { useGetRulesQuery, usePostMineBetMutation, useMineBlockMutation, useBackoffMineMutation } = MineService
