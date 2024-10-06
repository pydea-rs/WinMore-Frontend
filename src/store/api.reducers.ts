import { AuthService } from '@/services/authentication/auth.service'
import { MineService } from '@/services/games/mine/mine.service'
import { UserService } from '@/services/user/user.service'

export const APIsReducers = {
  [AuthService.reducerPath]: AuthService.reducer,
  [UserService.reducerPath]: UserService.reducer,
  [MineService.reducerPath]: MineService.reducer,
}
