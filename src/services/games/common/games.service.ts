import axiosBaseQuery from '@/services/base/axiosBaseQuery'
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'

import { createApi } from '@reduxjs/toolkit/query/react'
import { IGamesListResponse, IGetGamesListPayload, IMyPlayingGamesListResponse } from './games.types'

export const GamesService = createApi({
  reducerPath: 'gamesService',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAllGamesList: builder.query<BaseResponse<IGamesListResponse>, IGetGamesListPayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.common.list.path,
          params: arg,
          sendAuthorization: false,
        }
      },
    }),
    getMyGamesHistory: builder.query<BaseResponse<IGamesListResponse>, IGetGamesListPayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.common.myHistory.path,
          params: arg,
          sendAuthorization: true,
        }
      },
    }),
    getMyPlayingGames: builder.query<BaseResponse<IMyPlayingGamesListResponse>, IGetGamesListPayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.common.mePlaying.path,
          sendAuthorization: true,
        }
      },
    }),
  }),
})

export const { useGetAllGamesListQuery, useGetMyGamesHistoryQuery, useGetMyPlayingGamesQuery } = GamesService
