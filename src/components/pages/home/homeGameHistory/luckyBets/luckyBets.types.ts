import { BaseResponse } from '@/services/base/request-interface'
import { IGetMineGamesListResponse } from '@/services/games/mine/mine.service.types'

export interface LuckyBetProps {
  data: BaseResponse<IGetMineGamesListResponse> | undefined
}
