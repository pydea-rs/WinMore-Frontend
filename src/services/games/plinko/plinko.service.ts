import axiosBaseQuery from '@/services/base/axiosBaseQuery'
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'

import { IEmptyPayload, IEndpointWithIdParamPayload } from '@/services/base/common.types'
import { setPlinkoBucketMultipliers, setPlinkoConfig } from '@/store/slices/plinko/plinko.slice'
import { createApi } from '@reduxjs/toolkit/query/react'
import { PlinkoBallType } from './physx.types'
import { IGetPlinkoGamesListPayload, IPlacePlinkoBetPayload, IPlinkoGame, IPlinkoRules } from './plinko.service.types'

export const MineService = createApi({
  reducerPath: 'mineService',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getRules: builder.query<BaseResponse<IPlinkoRules[]>, IEmptyPayload>({
      query: () => {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.mine.rules.path,
          sendAuthorization: true,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setPlinkoBucketMultipliers(data.data))
        dispatch(setPlinkoConfig({ rows: data.data[0].rows }))
      },
    }),
    postPlinkoBet: builder.mutation<BaseResponse<IPlinkoGame>, IPlacePlinkoBetPayload>({
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
        dispatch(setPlinkoConfig({ currentGameId: data.data.id }))
      },
    }),
    dropPlinkoBalls: builder.mutation<BaseResponse<PlinkoBallType[]>, IEndpointWithIdParamPayload>({
      query(payload) {
        const { games } = getApiRoute()
        return {
          method: 'POST',
          url: games.plinko.drop.get(payload.id),
          sendAuthorization: true,
        }
      },
    }),
    getPlinkoGamesList: builder.query<BaseResponse<IPlinkoGame[]>, IGetPlinkoGamesListPayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.plinko.history.path,
          params: arg,
          sendAuthorization: true,
        }
      },
    }),
  }),
})

export const { useGetRulesQuery, usePostPlinkoBetMutation, useDropPlinkoBallsMutation, useGetPlinkoGamesListQuery } = MineService
