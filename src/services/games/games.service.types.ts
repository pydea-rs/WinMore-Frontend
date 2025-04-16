import { IMineGameStatus } from '@/store/slices/mine/mine.slice.types'
import { IPaginationPayload } from '@/types/global.types'
import { ExtraCommonGameStatus } from './common/games.types'
import { IMineGameDetail } from './mine/mine.service.types'
import { IPlinkoGame } from './plinko/plinko.service.types'

export type GeneralGameStatusType = IMineGameStatus | ExtraCommonGameStatus
export interface IGetGamesListPayload extends IPaginationPayload {
  status?: IMineGameStatus
}

export type IGetGamesListResponse = { plinkos: IPlinkoGame[]; dreamMines: IMineGameDetail[] }
