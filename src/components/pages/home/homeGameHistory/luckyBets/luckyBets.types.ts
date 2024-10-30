import { BaseResponse } from '@/services/base/request-interface'
import { IGetGamesListResponse } from '@/services/games/games.service.types'

export interface LuckyBetProps {
  data: BaseResponse<IGetGamesListResponse> | undefined
}
