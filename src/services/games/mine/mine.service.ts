import axiosBaseQuery from '@/services/base/axiosBaseQuery'
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'
import { updateCoefficients, updateCurrentGame, updateMineConfig } from '@/store/slices/mine/mine.slice'
import { ICurrentMineGame } from '@/store/slices/mine/mine.slice.types'
import { IGetMineRulesPayload, IGetMineRulesResponse, IPlaceMineBetPayload } from '@/types/games/mine.types'
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
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(updateCurrentGame(data.data))
      },
    }),
  }),
})

export const { useGetRulesQuery, usePostMineBetMutation } = MineService
