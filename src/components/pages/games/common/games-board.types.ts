import { BaseResponse } from '@/services/base/request-interface'
import { IMineGameDetail } from '@/services/games/mine/mine.service.types'

export interface GamesBoardProps {
  data: BaseResponse<IMineGameDetail[]> | undefined
}
