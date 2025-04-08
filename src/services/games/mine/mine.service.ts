import axiosBaseQuery from '@/services/base/axiosBaseQuery'
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'
import { setDreamMineConfig, setDreamMineMultipliers } from '@/store/slices/mine/mine.slice'
import { ICurrentMineGame } from '@/store/slices/mine/mine.slice.types'

import { IEmptyPayload, IEndpointWithIdParamPayload } from '@/services/base/common.types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IDreamMineRules, IGetMineGamesListPayload, IMineBlockPayload, IMineGameDetail, IPlaceMineBetPayload } from './mine.service.types'

export const MineService = createApi({
  reducerPath: 'mineService',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDreamMineRules: builder.query<BaseResponse<IDreamMineRules[]>, IEmptyPayload>({
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
        dispatch(setDreamMineMultipliers(data.data))
        dispatch(setDreamMineConfig({ rows: data.data[0].rows }))
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
        dispatch(setDreamMineConfig({ currentGameId: data.data.id }))
      },
    }),
    mineBlock: builder.mutation<BaseResponse<IMineGameDetail>, IMineBlockPayload>({
      query(payload) {
        const { games } = getApiRoute()
        return {
          method: 'POST',
          url: games.mine.mineBlock.get(payload.id),
          data: { choice: payload.choice },
          sendAuthorization: true,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(
          setDreamMineConfig({
            stake: data.data.stake,
            currentGameStatus: data.data.status,
          }),
        )
      },
    }),
    backoffMine: builder.mutation<BaseResponse<IMineGameDetail>, IEndpointWithIdParamPayload>({
      query(payload) {
        const { games } = getApiRoute()
        return {
          method: 'POST',
          url: games.mine.backoffMine.get(payload.id),
          sendAuthorization: true,
        }
      },
    }),
    mineGamesList: builder.query<BaseResponse<IMineGameDetail[]>, IGetMineGamesListPayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.mine.history.path,
          params: arg,
          sendAuthorization: true,
        }
      },
    }),
  }),
})

export const { useGetDreamMineRulesQuery, usePostMineBetMutation, useMineBlockMutation, useBackoffMineMutation, useMineGamesListQuery } = MineService
