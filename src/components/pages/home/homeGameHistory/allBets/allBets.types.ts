import { BaseResponse } from '@/services/base/request-interface'
import { IGetGamesListResponse } from '@/services/games/games.service.types'
import { IGetMineGamesListResponse } from '@/services/games/mine/mine.service.types'

export interface AllBetsProps {
  data: BaseResponse<IGetGamesListResponse> | undefined
}
