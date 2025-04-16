import axiosBaseQuery from '@/services/base/axiosBaseQuery'
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'

import { createApi } from '@reduxjs/toolkit/query/react'
import { IGetGamesListPayload, IGetGamesListResponse } from './games.types'

export const GamesService = createApi({
  reducerPath: 'gamesService',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    gamesList: builder.query<BaseResponse<IGetGamesListResponse>, IGetGamesListPayload>({
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
  }),
})

export const { useGamesListQuery } = GamesService
