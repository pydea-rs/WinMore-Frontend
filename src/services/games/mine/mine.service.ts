import axiosBaseQuery from '@/services/base/axiosBaseQuery'
import { BaseResponse } from '@/services/base/request-interface'
import { getApiRoute } from '@/services/base/routes'
import { updateCoefficients, updateMinConfigMode, updateMineConfig } from '@/store/slices/mine/mine.slice'
import { IBlock, ICurrentMineGame } from '@/store/slices/mine/mine.slice.types'

import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IBackoffMinePayload,
  IBackoffMineResponse,
  IGetMineGamesListPayload,
  IGetMineGamesListResponse,
  IGetMineRulesPayload,
  IGetMineRulesResponse,
  IIsPlayingMinePayload,
  IIsPlayingMineResponse,
  IMineBlockPayload,
  IMineBlockResponse,
  IPlaceMineBetPayload,
} from './mine.service.types'

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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(
          updateMineConfig({
            stake: data.data.stake,
            currentGameStatus: data.data.status,
          }),
        )
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
    mineGamesList: builder.query<BaseResponse<IGetMineGamesListResponse>, IGetMineGamesListPayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.mine.mineGamesList.path,
          params: arg,
          sendAuthorization: true,
        }
      },
    }),
    isPlayingMine: builder.query<BaseResponse<IIsPlayingMineResponse>, IIsPlayingMinePayload>({
      query(arg) {
        const { games } = getApiRoute()
        return {
          method: 'GET',
          url: games.mine.isPlaying.path,
          sendAuthorization: true,
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (!data.data) {
          return
        }
        const currentGame = data.data
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
  }),
})

export const { useGetRulesQuery, usePostMineBetMutation, useMineBlockMutation, useBackoffMineMutation, useIsPlayingMineQuery, useMineGamesListQuery } = MineService
